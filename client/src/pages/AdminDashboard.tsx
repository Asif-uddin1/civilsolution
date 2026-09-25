import { FormEvent, useEffect, useMemo, useState } from "react";
import { Activity, ArrowLeft, CalendarDays, Download, FileText, Languages, LogOut, Mail, Pencil, Plus, RefreshCw, Search, ShieldCheck, Trash2, UserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLanguage } from "@/hooks/useLanguage";
import { bangladeshAreas } from "@/content/areas";
import { downloadInquiryCsv } from "@/lib/inquiryCsv";
import { filterInquiries } from "@/lib/inquiryFilters";
import { AdminAuditLog, AdminProfile, defaultAdminProfile, logAdminEvent } from "@/lib/admin";
import { Inquiry, InquiryStatus, isAdminUser, isSupabaseConfigured, supabase } from "@/lib/supabase";

type CareerPost = { id: string; title_en: string; title_bn: string; location_en: string; location_bn: string; type_en: string; type_bn: string; description_en: string; description_bn: string; apply_email: string; is_active: boolean; created_at: string };
type CareerForm = Omit<CareerPost, "id" | "created_at">;
type ProfileForm = Omit<AdminProfile, "updated_at">;
const blankCareer: CareerForm = { title_en: "", title_bn: "", location_en: "Chattogram, Bangladesh", location_bn: "চট্টগ্রাম, বাংলাদেশ", type_en: "Full-time", type_bn: "ফুল-টাইম", description_en: "", description_bn: "", apply_email: "civilsolution0@gmail.com", is_active: true };

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "AD";
}

function auditLabel(action: AdminAuditLog["action"], isBn: boolean) {
  const labels: Record<AdminAuditLog["action"], string> = { login: isBn ? "অ্যাডমিন লগইন" : "Admin signed in", logout: isBn ? "অ্যাডমিন লগআউট" : "Admin signed out", profile_updated: isBn ? "প্রোফাইল আপডেট" : "Profile updated", inquiry_status_updated: isBn ? "ইনকোয়ারির অবস্থা পরিবর্তন" : "Inquiry status updated", career_created: isBn ? "ক্যারিয়ার পোস্ট তৈরি" : "Career post created", career_updated: isBn ? "ক্যারিয়ার পোস্ট আপডেট" : "Career post updated", career_deleted: isBn ? "ক্যারিয়ার পোস্ট মুছে ফেলা" : "Career post deleted", inquiries_exported: isBn ? "ইনকোয়ারি রিপোর্ট এক্সপোর্ট" : "Inquiry report exported" };
  return labels[action];
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { isBn, toggleLanguage } = useLanguage();
  const [user, setUser] = useState<NonNullable<Awaited<ReturnType<NonNullable<typeof supabase>["auth"]["getUser"]>>["data"]["user"]> | null>(null);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [careers, setCareers] = useState<CareerPost[]>([]);
  const [audit, setAudit] = useState<AdminAuditLog[]>([]);
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [profileDraft, setProfileDraft] = useState<ProfileForm | null>(null);
  const [editingProfile, setEditingProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | InquiryStatus>("all");
  const [service, setService] = useState("all");
  const [district, setDistrict] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [careerForm, setCareerForm] = useState<CareerForm>(blankCareer);
  const [editingCareerId, setEditingCareerId] = useState<string | null>(null);
  const [savingCareer, setSavingCareer] = useState(false);

  async function loadData() {
    if (!supabase) return;
    setLoading(true);
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    if (!currentUser || !isAdminUser(currentUser)) { navigate("/admin/login", { replace: true }); return; }
    setUser(currentUser);
    const [inquiryResult, careerResult, profileResult, auditResult] = await Promise.all([
      supabase.from("inquiries").select("*").order("created_at", { ascending: false }),
      supabase.from("career_posts").select("*").order("created_at", { ascending: false }),
      supabase.from("admin_profiles").select("*").eq("id", currentUser.id).maybeSingle(),
      supabase.from("admin_audit_logs").select("*").order("created_at", { ascending: false }).limit(24),
    ]);
    if (inquiryResult.error) toast.error(inquiryResult.error.message);
    if (careerResult.error) toast.error(careerResult.error.message);
    if (profileResult.error) toast.error(profileResult.error.message);
    if (auditResult.error) toast.error(auditResult.error.message);
    const loadedProfile = (profileResult.data as AdminProfile | null) ?? { ...defaultAdminProfile(currentUser), updated_at: new Date().toISOString() };
    setInquiries((inquiryResult.data as Inquiry[] | null) ?? []);
    setCareers((careerResult.data as CareerPost[] | null) ?? []);
    setProfile(loadedProfile);
    setProfileDraft({ id: loadedProfile.id, display_name: loadedProfile.display_name, job_title: loadedProfile.job_title, phone: loadedProfile.phone, avatar_url: loadedProfile.avatar_url });
    setAudit((auditResult.data as AdminAuditLog[] | null) ?? []);
    setLoading(false);
  }

  useEffect(() => { void loadData(); }, []);

  const services = useMemo(() => Array.from(new Set(inquiries.map((item) => item.service).filter((value): value is string => Boolean(value)))).sort(), [inquiries]);
  const districts = useMemo(() => Array.from(new Set([...bangladeshAreas.filter((item) => item.en !== "Other area / district").map((item) => item.en), ...inquiries.map((item) => item.district).filter((value): value is string => Boolean(value))])).sort(), [inquiries]);
  const filteredInquiries = useMemo(() => filterInquiries(inquiries, { query, status, service, district: district === "all" ? "" : district, dateFrom, dateTo }), [inquiries, query, status, service, district, dateFrom, dateTo]);
  const today = new Date().toISOString().slice(0, 10);
  const metrics = { total: inquiries.length, newCount: inquiries.filter((item) => item.status === "new").length, active: inquiries.filter((item) => item.status === "in_progress").length, today: inquiries.filter((item) => item.created_at.slice(0, 10) === today).length };

  async function updateStatus(id: string, nextStatus: InquiryStatus) {
    if (!supabase || !user) return;
    const previous = inquiries.find((item) => item.id === id)?.status;
    const { error } = await supabase.from("inquiries").update({ status: nextStatus }).eq("id", id);
    if (error) { toast.error(error.message); return; }
    setInquiries((current) => current.map((item) => item.id === id ? { ...item, status: nextStatus } : item));
    await logAdminEvent(user, "inquiry_status_updated", `Inquiry ${id} changed from ${previous ?? "unknown"} to ${nextStatus}`, "inquiry", id, { previous_status: previous, next_status: nextStatus });
    toast.success(isBn ? "অবস্থা আপডেট হয়েছে" : "Status updated");
  }

  async function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase || !user || !profileDraft) return;
    setSavingProfile(true);
    const result = await supabase.from("admin_profiles").upsert({ ...profileDraft, id: user.id, updated_at: new Date().toISOString() }).select().single();
    setSavingProfile(false);
    if (result.error) { toast.error(result.error.message); return; }
    const saved = result.data as AdminProfile;
    setProfile(saved); setProfileDraft({ id: saved.id, display_name: saved.display_name, job_title: saved.job_title, phone: saved.phone, avatar_url: saved.avatar_url }); setEditingProfile(false);
    await logAdminEvent(user, "profile_updated", "Admin profile details updated", "admin_profile", user.id);
    toast.success(isBn ? "প্রোফাইল আপডেট হয়েছে" : "Profile updated");
    void loadData();
  }

  async function exportFiltered() {
    if (!user) return;
    downloadInquiryCsv(filteredInquiries, `civil-solution-inquiries-${new Date().toISOString().slice(0, 10)}.csv`);
    await logAdminEvent(user, "inquiries_exported", `Exported ${filteredInquiries.length} filtered inquiries`, "inquiry_report", null, { count: filteredInquiries.length, date_from: dateFrom, date_to: dateTo, district });
    toast.success(isBn ? "CSV রিপোর্ট ডাউনলোড হচ্ছে" : "CSV report downloaded");
  }

  async function saveCareer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase || !user) return;
    setSavingCareer(true);
    const result = editingCareerId ? await supabase.from("career_posts").update(careerForm).eq("id", editingCareerId).select().single() : await supabase.from("career_posts").insert(careerForm).select().single();
    setSavingCareer(false);
    if (result.error) { toast.error(result.error.message); return; }
    await logAdminEvent(user, editingCareerId ? "career_updated" : "career_created", editingCareerId ? `Career post ${editingCareerId} updated` : "Career post created", "career_post", editingCareerId);
    toast.success(isBn ? "ক্যারিয়ার পোস্ট সংরক্ষিত হয়েছে" : "Career post saved");
    setCareerForm(blankCareer); setEditingCareerId(null); void loadData();
  }

  async function deleteCareer(id: string) {
    if (!supabase || !user || !window.confirm(isBn ? "এই পোস্টটি মুছে ফেলবেন?" : "Delete this career post?")) return;
    const { error } = await supabase.from("career_posts").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    await logAdminEvent(user, "career_deleted", `Career post ${id} deleted`, "career_post", id);
    setCareers((current) => current.filter((item) => item.id !== id));
    toast.success(isBn ? "পোস্টটি মুছে ফেলা হয়েছে" : "Post deleted");
  }

  async function signOut() { if (user) await logAdminEvent(user, "logout", "Admin signed out", "session"); await supabase?.auth.signOut(); navigate("/", { replace: true }); }
  const field = (key: keyof CareerForm, label: string, multiline = false) => <label key={key}>{label}{multiline ? <textarea rows={3} value={String(careerForm[key])} onChange={(event) => setCareerForm({ ...careerForm, [key]: event.target.value })} required /> : <input value={String(careerForm[key])} onChange={(event) => setCareerForm({ ...careerForm, [key]: event.target.value })} required />}</label>;
  const profileName = profile?.display_name || user?.email || "Admin";

  if (!isSupabaseConfigured) return <main className="auth-page"><div className="auth-card"><Link className="auth-back" to="/"><ArrowLeft size={16} /> {isBn ? "হোমে ফিরুন" : "Back to website"}</Link><h1>{isBn ? "কনফিগারেশন প্রয়োজন" : "Configuration required"}</h1><p>{isBn ? "অ্যাডমিন ড্যাশবোর্ড চালু করতে Supabase পরিবেশ ভেরিয়েবল যোগ করুন।" : "Add the Supabase environment variables to enable the admin dashboard."}</p></div></main>;

  return <main className="admin-page admin-page--redesigned">
    <header className="admin-header admin-header--redesigned"><div className="admin-identity"><div className="admin-avatar">{initials(profileName)}</div><div><span className="section-label"><ShieldCheck size={13} /> {isBn ? "অপারেশনস সেন্টার" : "OPERATIONS CENTER"}</span><h1>{isBn ? `স্বাগতম, ${profileName}` : `Welcome, ${profileName}`}</h1><p>{isBn ? "সিভিল সলিউশনের ইনকোয়ারি, প্রোফাইল এবং পরিবর্তন ইতিহাস এক জায়গায়।" : "A focused workspace for inquiries, profile details, and change history."}</p></div></div><div className="admin-actions"><button className="language-toggle" type="button" onClick={toggleLanguage}><Languages size={14} /> {isBn ? "EN" : "বাংলা"}</button><button className="button button--small button--sand" onClick={() => void loadData()}><RefreshCw size={15} /> {isBn ? "রিফ্রেশ" : "Refresh"}</button><button className="button button--small button--brown" onClick={() => void signOut()}><LogOut size={15} /> {isBn ? "বের হন" : "Sign out"}</button></div></header>
    <div className="admin-toolbar admin-toolbar--redesigned"><div className="admin-page-links"><Link className="text-link" to="/"><ArrowLeft size={16} /> {isBn ? "ওয়েবসাইট" : "Website"}</Link><Link className="text-link" to="/admin/inquiries"><FileText size={16} /> {isBn ? "সব ইনকোয়ারি" : "All inquiries"}</Link><Link className="text-link" to="/admin/blog">{isBn ? "ব্লগ" : "Blog"}</Link><Link className="text-link" to="/admin/applications">{isBn ? "আবেদন" : "Applications"}</Link><Link className="text-link" to="/admin/account"><UserRound size={16} /> {isBn ? "অ্যাকাউন্ট" : "Account"}</Link></div><span><Activity size={13} /> {filteredInquiries.length}/{inquiries.length} {isBn ? "টি ফলাফল" : "results"}</span></div>
    <section className="admin-metrics"><article><span><FileText size={16} /> {isBn ? "মোট ইনকোয়ারি" : "Total inquiries"}</span><strong>{metrics.total}</strong><small>{isBn ? "সব রেকর্ড" : "All records"}</small></article><article><span><Activity size={16} /> {isBn ? "নতুন" : "New"}</span><strong>{metrics.newCount}</strong><small>{isBn ? "অ্যাকশন প্রয়োজন" : "Needs action"}</small></article><article><span><RefreshCw size={16} /> {isBn ? "চলমান" : "In progress"}</span><strong>{metrics.active}</strong><small>{isBn ? "টিমে সক্রিয়" : "Active with team"}</small></article><article><span><CalendarDays size={16} /> {isBn ? "আজ" : "Today"}</span><strong>{metrics.today}</strong><small>{isBn ? "আজকের আগমন" : "Received today"}</small></article></section>
    <div className="admin-dashboard-grid">
      <section className="admin-section admin-section--inquiries"><div className="admin-section-heading admin-section-heading--split"><div><span className="section-label">{isBn ? "অনুরোধ / রিপোর্ট" : "INQUIRIES / REPORTING"}</span><h2>{isBn ? "ইনকোয়ারি ইনবক্স" : "Inquiry inbox"}</h2><p>{isBn ? "ফিল্টার করে রিপোর্ট ডাউনলোড করুন এবং প্রতিটি অবস্থার পরিবর্তন ট্র্যাক করুন।" : "Filter the inbox, download an offline report, and track every status change."}</p></div><button className="button button--turquoise" onClick={() => void exportFiltered()} disabled={loading}><Download size={16} /> {isBn ? "CSV ডাউনলোড" : "Export CSV"}</button></div><div className="inquiry-filters inquiry-filters--dashboard"><label className="search-field"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={isBn ? "নাম, ফোন, এলাকা বা বার্তা খুঁজুন" : "Search name, phone, area, or message"} /></label><select value={status} onChange={(event) => setStatus(event.target.value as "all" | InquiryStatus)}><option value="all">{isBn ? "সব অবস্থা" : "All statuses"}</option><option value="new">{isBn ? "নতুন" : "New"}</option><option value="in_progress">{isBn ? "চলমান" : "In progress"}</option><option value="closed">{isBn ? "বন্ধ" : "Closed"}</option></select><select value={district} onChange={(event) => setDistrict(event.target.value)}><option value="all">{isBn ? "সব জেলা" : "All districts"}</option>{districts.map((item) => <option key={item} value={item}>{item}</option>)}</select><label className="date-filter"><CalendarDays size={15} /><input type="date" value={dateFrom} onChange={(event) => setDateFrom(event.target.value)} aria-label={isBn ? "শুরুর তারিখ" : "Start date"} /></label><label className="date-filter"><CalendarDays size={15} /><input type="date" value={dateTo} onChange={(event) => setDateTo(event.target.value)} aria-label={isBn ? "শেষের তারিখ" : "End date"} /></label></div>{loading ? <div className="admin-empty">{isBn ? "ইনকোয়ারি লোড হচ্ছে…" : "Loading inquiries…"}</div> : filteredInquiries.length === 0 ? <div className="admin-empty"><h3>{isBn ? "কোনো মিল পাওয়া যায়নি" : "No matching inquiries"}</h3><p>{isBn ? "সার্চ বা তারিখের পরিসর পরিবর্তন করে আবার চেষ্টা করুন।" : "Try changing your search or date range."}</p></div> : <div className="inquiry-list">{filteredInquiries.slice(0, 8).map((inquiry) => <article className="inquiry-card" key={inquiry.id}><div className="inquiry-card-top"><div><span className="inquiry-date">{new Date(inquiry.created_at).toLocaleString()}</span><h3>{inquiry.name}</h3></div><select value={inquiry.status} onChange={(event) => void updateStatus(inquiry.id, event.target.value as InquiryStatus)} aria-label={isBn ? "ইনকোয়ারির অবস্থা" : "Inquiry status"}><option value="new">{isBn ? "নতুন" : "New"}</option><option value="in_progress">{isBn ? "চলমান" : "In progress"}</option><option value="closed">{isBn ? "বন্ধ" : "Closed"}</option></select></div><div className="inquiry-contact"><span>{inquiry.district || "District not recorded"}</span><span>{inquiry.area_name || inquiry.project_location || "Area not recorded"}</span><a href={`tel:${inquiry.phone}`}>{inquiry.phone}</a></div><p>{inquiry.message}</p></article>)}</div>}{filteredInquiries.length > 8 && <Link className="admin-more-link" to="/admin/inquiries">{isBn ? `আরও ${filteredInquiries.length - 8} টি দেখুন` : `View ${filteredInquiries.length - 8} more inquiries`} <ArrowLeft size={15} /></Link>}</section>
      <aside className="admin-side-stack">
        <section className="admin-section admin-section--profile"><div className="admin-section-heading"><span className="section-label"><UserRound size={13} /> {isBn ? "অ্যাডমিন / প্রোফাইল" : "ADMIN / PROFILE"}</span><h2>{isBn ? "আপনার পরিচয়" : "Your identity"}</h2></div>{editingProfile && profileDraft ? <form className="profile-form" onSubmit={saveProfile}><label>{isBn ? "নাম" : "Display name"}<input value={profileDraft.display_name} onChange={(event) => setProfileDraft({ ...profileDraft, display_name: event.target.value })} required /></label><label>{isBn ? "পদবি" : "Job title"}<input value={profileDraft.job_title} onChange={(event) => setProfileDraft({ ...profileDraft, job_title: event.target.value })} required /></label><label>{isBn ? "ফোন" : "Phone"}<input value={profileDraft.phone} onChange={(event) => setProfileDraft({ ...profileDraft, phone: event.target.value })} /></label><div className="admin-form-actions"><button className="button button--turquoise" disabled={savingProfile}>{savingProfile ? (isBn ? "সংরক্ষণ…" : "Saving…") : (isBn ? "সংরক্ষণ করুন" : "Save profile")}</button><button type="button" className="text-link" onClick={() => setEditingProfile(false)}>{isBn ? "বাতিল" : "Cancel"}</button></div></form> : <><div className="profile-card"><div className="profile-card-avatar">{initials(profileName)}</div><div><h3>{profileName}</h3><p>{profile?.job_title || "Administrator"}</p><span><Mail size={13} /> {user?.email}</span>{profile?.phone && <span>{profile.phone}</span>}</div></div><Link className="profile-edit-button" to="/admin/account"><Pencil size={14} /> {isBn ? "অ্যাকাউন্ট খুলুন" : "Open account"}</Link><div className="profile-meta"><span>USER ID</span><code>{user?.id.slice(0, 14)}…</code><span>{isBn ? "সর্বশেষ সাইন-ইন" : "Last sign-in"}</span><strong>{user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : "—"}</strong></div></>}</section>
        <section className="admin-section admin-section--history"><div className="admin-section-heading admin-section-heading--split"><div><span className="section-label"><Activity size={13} /> {isBn ? "ইতিহাস / লগ" : "HISTORY / LOG"}</span><h2>{isBn ? "সাম্প্রতিক পরিবর্তন" : "Recent activity"}</h2></div><span className="history-count">{audit.length}</span></div><div className="audit-list">{audit.length === 0 ? <p className="admin-empty-copy">{isBn ? "এখনও কোনো পরিবর্তন লগ হয়নি।" : "No changes logged yet."}</p> : audit.slice(0, 8).map((entry) => <article className="audit-item" key={entry.id}><span className={`audit-dot audit-dot--${entry.action}`} /><div><strong>{auditLabel(entry.action, isBn)}</strong><p>{entry.summary}</p><small>{entry.actor_email} · {new Date(entry.created_at).toLocaleString()}</small></div></article>)}</div></section>
      </aside>
    </div>
    <section className="admin-section careers-admin"><div className="admin-section-heading"><div><span className="section-label">{isBn ? "ক্যারিয়ার / পোস্ট" : "CAREERS / POSTS"}</span><h2>{isBn ? "চাকরির পোস্ট" : "Job posts"}</h2></div></div><form className="career-admin-form" onSubmit={saveCareer}><div className="form-grid">{field("title_en", "Title (English)")}{field("title_bn", "Title (বাংলা)")}{field("location_en", "Location (English)")}{field("location_bn", "Location (বাংলা)")}{field("type_en", "Type (English)")}{field("type_bn", "Type (বাংলা)")}{field("apply_email", "Apply email")}</div>{field("description_en", "Description (English)", true)}{field("description_bn", "Description (বাংলা)", true)}<label className="career-checkbox"><input type="checkbox" checked={careerForm.is_active} onChange={(event) => setCareerForm({ ...careerForm, is_active: event.target.checked })} />{isBn ? "সক্রিয় পোস্ট হিসেবে দেখান" : "Show as active opening"}</label><div className="admin-form-actions"><button className="button button--turquoise" disabled={savingCareer}>{savingCareer ? (isBn ? "সংরক্ষণ হচ্ছে…" : "Saving…") : <><Plus size={16} /> {editingCareerId ? (isBn ? "আপডেট করুন" : "Update post") : (isBn ? "পোস্ট তৈরি করুন" : "Create post")}</>}</button>{editingCareerId && <button type="button" className="text-link" onClick={() => { setEditingCareerId(null); setCareerForm(blankCareer); }}>{isBn ? "বাতিল" : "Cancel"}</button>}</div></form><div className="career-admin-list">{careers.map((post) => <article className="career-admin-card" key={post.id}><div><strong>{isBn ? post.title_bn : post.title_en}</strong><span>{post.is_active ? (isBn ? "সক্রিয়" : "Active") : (isBn ? "নিষ্ক্রিয়" : "Inactive")}</span></div><div><button className="text-link" onClick={() => { setEditingCareerId(post.id); setCareerForm({ title_en: post.title_en, title_bn: post.title_bn, location_en: post.location_en, location_bn: post.location_bn, type_en: post.type_en, type_bn: post.type_bn, description_en: post.description_en, description_bn: post.description_bn, apply_email: post.apply_email, is_active: post.is_active }); }}>{isBn ? "সম্পাদনা" : "Edit"}</button><button className="icon-danger" onClick={() => void deleteCareer(post.id)} aria-label={isBn ? "পোস্ট মুছুন" : "Delete post"}><Trash2 size={16} /></button></div></article>)}</div></section>
  </main>;
}
