import { FormEvent, useEffect, useMemo, useState } from "react";
import { ArrowLeft, Languages, LogOut, Plus, RefreshCw, Search, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLanguage } from "@/hooks/useLanguage";
import { filterInquiries } from "@/lib/inquiryFilters";
import { Inquiry, InquiryStatus, isAdminUser, isSupabaseConfigured, supabase } from "@/lib/supabase";

type CareerPost = { id: string; title_en: string; title_bn: string; location_en: string; location_bn: string; type_en: string; type_bn: string; description_en: string; description_bn: string; apply_email: string; is_active: boolean; created_at: string };
type CareerForm = Omit<CareerPost, "id" | "created_at">;
const blankCareer: CareerForm = { title_en: "", title_bn: "", location_en: "Chattogram, Bangladesh", location_bn: "চট্টগ্রাম, বাংলাদেশ", type_en: "Full-time", type_bn: "ফুল-টাইম", description_en: "", description_bn: "", apply_email: "civilsolution0@gmail.com", is_active: true };

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { isBn, toggleLanguage } = useLanguage();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [careers, setCareers] = useState<CareerPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | InquiryStatus>("all");
  const [service, setService] = useState("all");
  const [careerForm, setCareerForm] = useState<CareerForm>(blankCareer);
  const [editingCareerId, setEditingCareerId] = useState<string | null>(null);
  const [savingCareer, setSavingCareer] = useState(false);

  async function loadData() {
    if (!supabase) return;
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !isAdminUser(user)) { navigate("/admin/login", { replace: true }); return; }
    const [inquiryResult, careerResult] = await Promise.all([
      supabase.from("inquiries").select("*").order("created_at", { ascending: false }),
      supabase.from("career_posts").select("*").order("created_at", { ascending: false }),
    ]);
    if (inquiryResult.error) toast.error(inquiryResult.error.message);
    if (careerResult.error) toast.error(careerResult.error.message);
    setInquiries((inquiryResult.data as Inquiry[] | null) ?? []);
    setCareers((careerResult.data as CareerPost[] | null) ?? []);
    setLoading(false);
  }

  useEffect(() => { void loadData(); }, []);

  const services = useMemo(() => Array.from(new Set(inquiries.map((item) => item.service).filter((value): value is string => Boolean(value)))).sort(), [inquiries]);
  const filteredInquiries = useMemo(() => filterInquiries(inquiries, { query, status, service }), [inquiries, query, status, service]);

  async function updateStatus(id: string, nextStatus: InquiryStatus) {
    if (!supabase) return;
    const { error } = await supabase.from("inquiries").update({ status: nextStatus }).eq("id", id);
    if (error) { toast.error(error.message); return; }
    setInquiries((current) => current.map((item) => item.id === id ? { ...item, status: nextStatus } : item));
    toast.success(isBn ? "অবস্থা আপডেট হয়েছে" : "Status updated");
  }

  async function saveCareer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;
    setSavingCareer(true);
    const result = editingCareerId ? await supabase.from("career_posts").update(careerForm).eq("id", editingCareerId).select().single() : await supabase.from("career_posts").insert(careerForm).select().single();
    setSavingCareer(false);
    if (result.error) { toast.error(result.error.message); return; }
    toast.success(isBn ? "ক্যারিয়ার পোস্ট সংরক্ষিত হয়েছে" : "Career post saved");
    setCareerForm(blankCareer); setEditingCareerId(null); void loadData();
  }

  async function deleteCareer(id: string) {
    if (!supabase || !window.confirm(isBn ? "এই পোস্টটি মুছে ফেলবেন?" : "Delete this career post?")) return;
    const { error } = await supabase.from("career_posts").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    setCareers((current) => current.filter((item) => item.id !== id));
    toast.success(isBn ? "পোস্ট মুছে ফেলা হয়েছে" : "Post deleted");
  }

  async function signOut() { await supabase?.auth.signOut(); navigate("/", { replace: true }); }
  const field = (key: keyof CareerForm, label: string, multiline = false) => <label key={key}>{label}{multiline ? <textarea rows={3} value={String(careerForm[key])} onChange={(event) => setCareerForm({ ...careerForm, [key]: event.target.value })} required /> : <input value={String(careerForm[key])} onChange={(event) => setCareerForm({ ...careerForm, [key]: event.target.value })} required />}</label>;

  if (!isSupabaseConfigured) return <main className="auth-page"><div className="auth-card"><Link className="auth-back" to="/"><ArrowLeft size={16} /> {isBn ? "হোমে ফিরুন" : "Back to website"}</Link><h1>{isBn ? "কনফিগারেশন প্রয়োজন" : "Configuration required"}</h1><p>{isBn ? "অ্যাডমিন ড্যাশবোর্ড চালু করতে Supabase পরিবেশ ভেরিয়েবল যোগ করুন।" : "Add the Supabase environment variables to enable the admin dashboard."}</p></div></main>;

  return <main className="admin-page">
    <header className="admin-header"><div><span className="section-label">{isBn ? "ইনবক্স / অ্যাডমিন" : "INBOX / ADMIN"}</span><h1>{isBn ? "ম্যানেজমেন্ট" : "Management"}</h1></div><div className="admin-actions"><button className="language-toggle" type="button" onClick={toggleLanguage}><Languages size={14} /> {isBn ? "EN" : "বাংলা"}</button><button className="button button--small button--sand" onClick={() => void loadData()}><RefreshCw size={15} /> {isBn ? "রিফ্রেশ" : "Refresh"}</button><button className="button button--small button--brown" onClick={() => void signOut()}><LogOut size={15} /> {isBn ? "বের হন" : "Sign out"}</button></div></header>
    <div className="admin-toolbar"><div className="admin-page-links"><Link className="text-link" to="/"><ArrowLeft size={16} /> {isBn ? "ওয়েবসাইটে ফিরুন" : "Back to website"}</Link><Link className="text-link" to="/admin/inquiries">{isBn ? "সব ইনকোয়ারি" : "All inquiries"}</Link><Link className="text-link" to="/completed-projects">{isBn ? "প্রকল্প দেখুন" : "View completed projects"}</Link></div><span>{filteredInquiries.length}/{inquiries.length} {isBn ? "টি অনুরোধ" : filteredInquiries.length === 1 ? "inquiry" : "inquiries"}</span></div>
    <section className="admin-section"><div className="admin-section-heading"><div><span className="section-label">{isBn ? "অনুরোধ / অনুসন্ধান" : "INQUIRIES / FIND"}</span><h2>{isBn ? "ইনকোয়ারি" : "Inquiries"}</h2></div></div><div className="inquiry-filters"><label className="search-field"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={isBn ? "নাম, ফোন, ইমেইল বা বার্তা খুঁজুন" : "Search name, phone, email, or message"} /></label><select value={status} onChange={(event) => setStatus(event.target.value as "all" | InquiryStatus)}><option value="all">{isBn ? "সব অবস্থা" : "All statuses"}</option><option value="new">{isBn ? "নতুন" : "New"}</option><option value="in_progress">{isBn ? "চলমান" : "In progress"}</option><option value="closed">{isBn ? "বন্ধ" : "Closed"}</option></select><select value={service} onChange={(event) => setService(event.target.value)}><option value="all">{isBn ? "সব সেবা" : "All services"}</option>{services.map((item) => <option key={item}>{item}</option>)}</select></div>{loading ? <div className="admin-empty">{isBn ? "ইনকোয়ারি লোড হচ্ছে…" : "Loading inquiries…"}</div> : filteredInquiries.length === 0 ? <div className="admin-empty"><h2>{isBn ? "কোনো মিল পাওয়া যায়নি" : "No matching inquiries"}</h2><p>{isBn ? "অনুসন্ধান বা ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।" : "Try changing the search or filters."}</p></div> : <div className="inquiry-list">{filteredInquiries.map((inquiry) => <article className="inquiry-card" key={inquiry.id}><div className="inquiry-card-top"><div><span className="inquiry-date">{new Date(inquiry.created_at).toLocaleString()}</span><h2>{inquiry.name}</h2></div><select value={inquiry.status} onChange={(event) => void updateStatus(inquiry.id, event.target.value as InquiryStatus)} aria-label={isBn ? "অনুরোধের অবস্থা" : "Inquiry status"}><option value="new">{isBn ? "নতুন" : "New"}</option><option value="in_progress">{isBn ? "চলমান" : "In progress"}</option><option value="closed">{isBn ? "বন্ধ" : "Closed"}</option></select></div><div className="inquiry-contact"><a href={`tel:${inquiry.phone}`}>{inquiry.phone}</a>{inquiry.email && <a href={`mailto:${inquiry.email}`}>{inquiry.email}</a>}{inquiry.service && <span>{inquiry.service}</span>}</div><p>{inquiry.message}</p></article>)}</div>}</section>
    <section className="admin-section careers-admin"><div className="admin-section-heading"><div><span className="section-label">{isBn ? "ক্যারিয়ার / পোস্ট" : "CAREERS / POSTS"}</span><h2>{isBn ? "চাকরির পোস্ট" : "Job posts"}</h2></div></div><form className="career-admin-form" onSubmit={saveCareer}><div className="form-grid">{field("title_en", "Title (English)")}{field("title_bn", "Title (বাংলা)")}{field("location_en", "Location (English)")}{field("location_bn", "Location (বাংলা)")}{field("type_en", "Type (English)")}{field("type_bn", "Type (বাংলা)")}{field("apply_email", "Apply email")}</div>{field("description_en", "Description (English)", true)}{field("description_bn", "Description (বাংলা)", true)}<label className="career-checkbox"><input type="checkbox" checked={careerForm.is_active} onChange={(event) => setCareerForm({ ...careerForm, is_active: event.target.checked })} />{isBn ? "সক্রিয় পোস্ট হিসেবে দেখান" : "Show as active opening"}</label><div className="admin-form-actions"><button className="button button--turquoise" disabled={savingCareer}>{savingCareer ? (isBn ? "সংরক্ষণ হচ্ছে…" : "Saving…") : <><Plus size={16} /> {editingCareerId ? (isBn ? "আপডেট করুন" : "Update post") : (isBn ? "পোস্ট তৈরি করুন" : "Create post")}</>}</button>{editingCareerId && <button type="button" className="text-link" onClick={() => { setEditingCareerId(null); setCareerForm(blankCareer); }}>{isBn ? "বাতিল" : "Cancel"}</button>}</div></form><div className="career-admin-list">{careers.map((post) => <article className="career-admin-card" key={post.id}><div><strong>{isBn ? post.title_bn : post.title_en}</strong><span>{post.is_active ? (isBn ? "সক্রিয়" : "Active") : (isBn ? "নিষ্ক্রিয়" : "Inactive")}</span></div><div><button className="text-link" onClick={() => { setEditingCareerId(post.id); setCareerForm({ title_en: post.title_en, title_bn: post.title_bn, location_en: post.location_en, location_bn: post.location_bn, type_en: post.type_en, type_bn: post.type_bn, description_en: post.description_en, description_bn: post.description_bn, apply_email: post.apply_email, is_active: post.is_active }); }}>{isBn ? "সম্পাদনা" : "Edit"}</button><button className="icon-danger" onClick={() => void deleteCareer(post.id)} aria-label={isBn ? "পোস্ট মুছুন" : "Delete post"}><Trash2 size={16} /></button></div></article>)}</div></section>
  </main>;
}
