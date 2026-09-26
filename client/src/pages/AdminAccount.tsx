import { FormEvent, useEffect, useState } from "react";
import { ArrowLeft, AtSign, CalendarClock, CheckCircle2, Languages, LogOut, Mail, PanelLeftClose, PanelLeftOpen, Save, ShieldCheck, UserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AdminSidebar from "@/components/AdminSidebar";
import { toast } from "sonner";
import { useLanguage } from "@/hooks/useLanguage";
import { AdminAuditLog, AdminProfile, defaultAdminProfile, logAdminEvent } from "@/lib/admin";
import { isAdminUser, isSupabaseConfigured, supabase } from "@/lib/supabase";

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "AD";
}

const auditLabels: Record<AdminAuditLog["action"], { en: string; bn: string }> = {
  login: { en: "Signed in", bn: "লগইন করেছেন" },
  logout: { en: "Signed out", bn: "লগআউট করেছেন" },
  profile_updated: { en: "Profile updated", bn: "প্রোফাইল আপডেট" },
  inquiry_status_updated: { en: "Inquiry status changed", bn: "ইনকোয়ারির অবস্থা পরিবর্তন" },
  career_created: { en: "Career post created", bn: "ক্যারিয়ার পোস্ট তৈরি" },
  career_updated: { en: "Career post updated", bn: "ক্যারিয়ার পোস্ট আপডেট" },
  career_deleted: { en: "Career post deleted", bn: "ক্যারিয়ার পোস্ট মুছে ফেলা" },
  inquiries_exported: { en: "Inquiry report exported", bn: "ইনকোয়ারি রিপোর্ট এক্সপোর্ট" },
};

export default function AdminAccount() {
  const navigate = useNavigate();
  const { isBn, toggleLanguage } = useLanguage();
  const [user, setUser] = useState<Awaited<ReturnType<NonNullable<typeof supabase>["auth"]["getUser"]>>["data"]["user"]>(null);
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [draft, setDraft] = useState<Omit<AdminProfile, "updated_at"> | null>(null);
  const [activity, setActivity] = useState<AdminAuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => typeof window !== "undefined" && window.matchMedia("(max-width: 900px)").matches);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    async function loadAccount() {
      if (!supabase) return;
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (!currentUser || !isAdminUser(currentUser)) { navigate("/admin/login", { replace: true }); return; }
      setUser(currentUser);
      const [profileResult, activityResult] = await Promise.all([
        supabase.from("admin_profiles").select("*").eq("id", currentUser.id).maybeSingle(),
        supabase.from("admin_audit_logs").select("*").eq("actor_id", currentUser.id).order("created_at", { ascending: false }).limit(10),
      ]);
      const loadedProfile = (profileResult.data as AdminProfile | null) ?? { ...defaultAdminProfile(currentUser), updated_at: new Date().toISOString() };
      setProfile(loadedProfile);
      setDraft({ id: loadedProfile.id, display_name: loadedProfile.display_name, job_title: loadedProfile.job_title, phone: loadedProfile.phone, avatar_url: loadedProfile.avatar_url });
      setActivity((activityResult.data as AdminAuditLog[] | null) ?? []);
      if (profileResult.error) toast.error(profileResult.error.message);
      if (activityResult.error) toast.error(activityResult.error.message);
      setLoading(false);
    }
    void loadAccount();
  }, [navigate]);

  async function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase || !user || !draft) return;
    setSaving(true);
    const result = await supabase.from("admin_profiles").upsert({ ...draft, id: user.id, updated_at: new Date().toISOString() }).select().single();
    setSaving(false);
    if (result.error) { toast.error(result.error.message); return; }
    setProfile(result.data as AdminProfile);
    await logAdminEvent(user, "profile_updated", "Admin profile details updated", "admin_profile", user.id);
    toast.success(isBn ? "প্রোফাইল আপডেট হয়েছে" : "Profile updated successfully");
  }

  async function changePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase || !user || !currentPassword || newPassword.length < 8 || newPassword !== confirmPassword) {
      toast.error(isBn ? "বর্তমান পাসওয়ার্ড দিন এবং নতুন পাসওয়ার্ড ৮ অক্ষরের হতে হবে" : "Enter the current password and a matching new password of at least 8 characters");
      return;
    }
    setChangingPassword(true);
    const reauth = await supabase.auth.signInWithPassword({ email: user.email ?? "", password: currentPassword });
    if (reauth.error) { setChangingPassword(false); toast.error(isBn ? "বর্তমান পাসওয়ার্ড সঠিক নয়" : "Current password is incorrect"); return; }
    const result = await supabase.auth.updateUser({ password: newPassword });
    setChangingPassword(false);
    if (result.error) { toast.error(result.error.message); return; }
    setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
    toast.success(isBn ? "পাসওয়ার্ড নিরাপদভাবে পরিবর্তন হয়েছে" : "Password changed securely");
  }

  async function signOut() {
    if (user) await logAdminEvent(user, "logout", "Admin signed out", "session");
    await supabase?.auth.signOut();
    navigate("/", { replace: true });
  }

  const displayName = profile?.display_name || user?.email?.split("@")[0] || "Admin";
  if (!isSupabaseConfigured) return <main className="auth-page"><div className="auth-card"><Link className="auth-back" to="/"><ArrowLeft size={16} /> {isBn ? "হোমে ফিরুন" : "Back to website"}</Link><h1>{isBn ? "কনফিগারেশন প্রয়োজন" : "Configuration required"}</h1><p>{isBn ? "অ্যাকাউন্ট পেজ চালু করতে Supabase পরিবেশ ভেরিয়েবল যোগ করুন।" : "Add Supabase environment variables to enable the account page."}</p></div></main>;

  return <main className={`admin-page admin-page--redesigned admin-account-page admin-shared-page${sidebarCollapsed ? " admin-sidebar-collapsed" : ""}`}>
    <header className="admin-header admin-header--redesigned"><button className="admin-sidebar-toggle admin-navbar-toggle" type="button" onClick={() => setSidebarCollapsed((current) => !current)} aria-label={sidebarCollapsed ? "Open sidebar" : "Hide sidebar"}>{sidebarCollapsed ? <PanelLeftOpen size={17} /> : <PanelLeftClose size={17} />}<span>{isBn ? "মেনু" : "Menu"}</span></button><div className="admin-identity"><div className="admin-avatar">{initials(displayName)}</div><div><span className="section-label"><UserRound size={13} /> {isBn ? "অ্যাকাউন্ট / প্রোফাইল" : "ACCOUNT / PROFILE"}</span><h1>{isBn ? "আপনার অ্যাকাউন্ট" : "Your account"}</h1><p>{isBn ? "আপনার পরিচয়, যোগাযোগের তথ্য এবং অ্যাডমিন কার্যকলাপ পরিচালনা করুন।" : "Manage your identity, contact details, and admin activity."}</p></div></div></header>
    <AdminSidebar isBn={isBn} toggleLanguage={toggleLanguage} collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed((current) => !current)} onRefresh={() => void window.location.reload()} onSignOut={() => void signOut()} active="account" displayName={displayName} />
    {loading || !draft ? <section className="admin-section admin-account-loading"><p>{isBn ? "অ্যাকাউন্ট লোড হচ্ছে…" : "Loading account…"}</p></section> : <div className="admin-account-grid"><section className="admin-section admin-account-form-section"><div className="admin-section-heading"><span className="section-label"><UserRound size={13} /> {isBn ? "ব্যক্তিগত তথ্য" : "PERSONAL DETAILS"}</span><h2>{isBn ? "প্রোফাইল সম্পাদনা করুন" : "Edit your profile"}</h2><p>{isBn ? "এই তথ্য শুধু অ্যাডমিন ড্যাশবোর্ডের পরিচয় ও রেকর্ডে ব্যবহৃত হবে।" : "These details personalize the admin workspace and identify your changes."}</p></div><form className="admin-account-form" onSubmit={saveProfile}><div className="account-profile-preview"><div className="profile-card-avatar">{initials(draft.display_name || displayName)}</div><div><strong>{draft.display_name || displayName}</strong><span>{draft.job_title || "Administrator"}</span></div></div><label><span>{isBn ? "প্রদর্শিত নাম" : "Display name"}<small>{isBn ? "ড্যাশবোর্ডে প্রদর্শিত হবে" : "Shown across the dashboard"}</small></span><input value={draft.display_name} onChange={(event) => setDraft({ ...draft, display_name: event.target.value })} required /></label><label><span>{isBn ? "পদবি" : "Job title"}<small>{isBn ? "আপনার দায়িত্বের সংক্ষিপ্ত নাম" : "Your role in the workspace"}</small></span><input value={draft.job_title} onChange={(event) => setDraft({ ...draft, job_title: event.target.value })} required /></label><label><span>{isBn ? "ফোন নম্বর" : "Phone number"}<small>{isBn ? "ঐচ্ছিক যোগাযোগ তথ্য" : "Optional contact detail"}</small></span><input type="tel" value={draft.phone} onChange={(event) => setDraft({ ...draft, phone: event.target.value })} /></label><button className="button button--turquoise" type="submit" disabled={saving}><Save size={16} /> {saving ? (isBn ? "সংরক্ষণ হচ্ছে…" : "Saving…") : (isBn ? "প্রোফাইল সংরক্ষণ" : "Save profile")}</button></form></section><aside className="admin-account-side"><section className="admin-section account-details-card"><div className="admin-section-heading"><span className="section-label"><ShieldCheck size={13} /> {isBn ? "অ্যাকাউন্ট তথ্য" : "ACCOUNT DETAILS"}</span><h2>{isBn ? "অ্যাক্সেস ও সেশন" : "Access & session"}</h2></div><dl><div><dt><Mail size={14} /> {isBn ? "ইমেইল" : "Email"}</dt><dd>{user?.email || "—"}</dd></div><div><dt><AtSign size={14} /> {isBn ? "ইউজার আইডি" : "User ID"}</dt><dd className="account-id">{user?.id || "—"}</dd></div><div><dt><CalendarClock size={14} /> {isBn ? "সর্বশেষ লগইন" : "Last sign-in"}</dt><dd>{user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : "—"}</dd></div><div><dt><CheckCircle2 size={14} /> {isBn ? "অ্যাক্সেস স্তর" : "Access level"}</dt><dd>{isBn ? "সুপার অ্যাডমিন" : "Administrator"}</dd></div></dl><p className="account-security-note"><ShieldCheck size={16} /> {isBn ? "অ্যাক্সেস পরিবর্তন করতে Supabase Auth সেটিংস ব্যবহার করুন।" : "Access permissions are managed through Supabase Auth."}</p></section><section className="admin-section account-password-card"><div className="admin-section-heading"><span className="section-label"><ShieldCheck size={13} /> {isBn ? "নিরাপত্তা" : "SECURITY"}</span><h2>{isBn ? "পাসওয়ার্ড পরিবর্তন" : "Change password"}</h2></div><form className="admin-password-form" onSubmit={changePassword}><label>{isBn ? "বর্তমান পাসওয়ার্ড" : "Current password"}<input type="password" autoComplete="current-password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} required /></label><label>{isBn ? "নতুন পাসওয়ার্ড" : "New password"}<input type="password" autoComplete="new-password" minLength={8} value={newPassword} onChange={(event) => setNewPassword(event.target.value)} required /></label><label>{isBn ? "নতুন পাসওয়ার্ড নিশ্চিত করুন" : "Confirm new password"}<input type="password" autoComplete="new-password" minLength={8} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required /></label><button className="button button--turquoise" type="submit" disabled={changingPassword}><Save size={16} /> {changingPassword ? (isBn ? "পরিবর্তন হচ্ছে…" : "Changing…") : (isBn ? "পাসওয়ার্ড আপডেট" : "Update password")}</button></form></section><section className="admin-section account-activity-card"><div className="admin-section-heading"><span className="section-label"><CalendarClock size={13} /> {isBn ? "আপনার ইতিহাস" : "YOUR HISTORY"}</span><h2>{isBn ? "সাম্প্রতিক কার্যকলাপ" : "Recent activity"}</h2></div><div className="audit-list">{activity.length === 0 ? <p className="admin-empty-copy">{isBn ? "এখনও কোনো কার্যকলাপ নেই।" : "No activity recorded yet."}</p> : activity.slice(0, 6).map((entry) => <article className="audit-item" key={entry.id}><span className={`audit-dot audit-dot--${entry.action}`} /><div><strong>{isBn ? auditLabels[entry.action].bn : auditLabels[entry.action].en}</strong><p>{entry.summary}</p><small>{new Date(entry.created_at).toLocaleString()}</small></div></article>)}</div></section></aside></div>}
  </main>;
}
