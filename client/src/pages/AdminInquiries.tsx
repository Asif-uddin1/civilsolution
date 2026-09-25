import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, CalendarDays, Download, Languages, LogOut, RefreshCw, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLanguage } from "@/hooks/useLanguage";
import { bangladeshAreas } from "@/content/areas";
import { downloadInquiryCsv } from "@/lib/inquiryCsv";
import { logAdminEvent } from "@/lib/admin";
import { filterInquiries } from "@/lib/inquiryFilters";
import { Inquiry, InquiryStatus, isAdminUser, isSupabaseConfigured, supabase } from "@/lib/supabase";

export default function AdminInquiries() {
  const navigate = useNavigate();
  const { isBn, toggleLanguage } = useLanguage();
  const [items, setItems] = useState<Inquiry[]>([]);
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | InquiryStatus>("all");
  const [service, setService] = useState("all");
  const [district, setDistrict] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  async function load() {
    if (!supabase) return;
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !isAdminUser(user)) { navigate("/admin/login", { replace: true }); return; }
    setUser({ id: user.id, email: user.email });
    const { data, error } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setItems((data as Inquiry[] | null) ?? []); setLoading(false);
  }
  useEffect(() => { void load(); }, []);
  const services = useMemo(() => Array.from(new Set(items.map((item) => item.service).filter((value): value is string => Boolean(value)))).sort(), [items]);
  const districts = useMemo(() => Array.from(new Set([...bangladeshAreas.filter((item) => item.en !== "Other area / district").map((item) => item.en), ...items.map((item) => item.district).filter((value): value is string => Boolean(value))])).sort(), [items]);
  const filtered = useMemo(() => filterInquiries(items, { query, status, service, district: district === "all" ? "" : district, dateFrom, dateTo }), [items, query, status, service, district, dateFrom, dateTo]);
  async function exportFiltered() {
    downloadInquiryCsv(filtered, `civil-solution-inquiries-${new Date().toISOString().slice(0, 10)}.csv`);
    if (supabase && user) await logAdminEvent(user, "inquiries_exported", `Exported ${filtered.length} filtered inquiries`, "inquiry_report", null, { count: filtered.length, date_from: dateFrom, date_to: dateTo, district });
    toast.success(isBn ? "CSV রিপোর্ট ডাউনলোড হচ্ছে" : "CSV report downloaded");
  }
  async function updateStatus(id: string, nextStatus: InquiryStatus) {
    if (!supabase) return;
    const { error } = await supabase.from("inquiries").update({ status: nextStatus }).eq("id", id);
    if (error) { toast.error(error.message); return; }
    setItems((current) => current.map((item) => item.id === id ? { ...item, status: nextStatus } : item));
    toast.success(isBn ? "অবস্থা আপডেট হয়েছে" : "Status updated");
  }
  async function signOut() { await supabase?.auth.signOut(); navigate("/", { replace: true }); }
  if (!isSupabaseConfigured) return <main className="auth-page"><div className="auth-card"><Link className="auth-back" to="/"><ArrowLeft size={16} /> {isBn ? "হোমে ফিরুন" : "Back to website"}</Link><h1>{isBn ? "কনফিগারেশন প্রয়োজন" : "Configuration required"}</h1><p>{isBn ? "Supabase পরিবেশ ভেরিয়েবল যোগ করুন।" : "Add the Supabase environment variables to enable inquiries."}</p></div></main>;
  return <main className="admin-page"><header className="admin-header"><div><span className="section-label">{isBn ? "অ্যাডমিন / ইনবক্স" : "ADMIN / INBOX"}</span><h1>{isBn ? "ইনকোয়ারি" : "Inquiries"}</h1></div><div className="admin-actions"><button className="language-toggle" type="button" onClick={toggleLanguage}><Languages size={14} /> {isBn ? "EN" : "বাংলা"}</button><button className="button button--small button--sand" onClick={() => void load()}><RefreshCw size={15} /> {isBn ? "রিফ্রেশ" : "Refresh"}</button><button className="button button--small button--brown" onClick={() => void signOut()}><LogOut size={15} /> {isBn ? "বের হন" : "Sign out"}</button></div></header><div className="admin-toolbar"><Link className="text-link" to="/admin"><ArrowLeft size={16} /> {isBn ? "অ্যাডমিন হাবে ফিরুন" : "Back to admin hub"}</Link><span>{filtered.length}/{items.length} {isBn ? "টি অনুরোধ" : filtered.length === 1 ? "inquiry" : "inquiries"}</span></div><section className="admin-section"><div className="inquiry-filters"><label className="search-field"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={isBn ? "নাম, ফোন, অবস্থান, ইমেইল বা বার্তা খুঁজুন" : "Search name, phone, location, email, or message"} /></label><select value={status} onChange={(event) => setStatus(event.target.value as "all" | InquiryStatus)}><option value="all">{isBn ? "সব অবস্থা" : "All statuses"}</option><option value="new">{isBn ? "নতুন" : "New"}</option><option value="in_progress">{isBn ? "চলমান" : "In progress"}</option><option value="closed">{isBn ? "বন্ধ" : "Closed"}</option></select><select value={service} onChange={(event) => setService(event.target.value)}><option value="all">{isBn ? "সব সেবা" : "All services"}</option>{services.map((item) => <option key={item}>{item}</option>)}</select><select value={district} onChange={(event) => setDistrict(event.target.value)}><option value="all">{isBn ? "সব জেলা" : "All districts"}</option>{districts.map((item) => <option key={item} value={item}>{item}</option>)}</select><label className="date-filter"><CalendarDays size={15} /><input type="date" value={dateFrom} onChange={(event) => setDateFrom(event.target.value)} aria-label={isBn ? "শুরুর তারিখ" : "Start date"} /></label><label className="date-filter"><CalendarDays size={15} /><input type="date" value={dateTo} onChange={(event) => setDateTo(event.target.value)} aria-label={isBn ? "শেষের তারিখ" : "End date"} /></label><button className="button button--turquoise button--small" type="button" onClick={() => void exportFiltered()}><Download size={15} /> {isBn ? "CSV" : "Export CSV"}</button></div>{loading ? <div className="admin-empty">{isBn ? "ইনকোয়ারি লোড হচ্ছে…" : "Loading inquiries…"}</div> : filtered.length === 0 ? <div className="admin-empty"><h2>{isBn ? "কোনো মিল পাওয়া যায়নি" : "No matching inquiries"}</h2><p>{isBn ? "অনুসন্ধান বা ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।" : "Try changing the search or filters."}</p></div> : <div className="inquiry-list">{filtered.map((inquiry) => <article className="inquiry-card" key={inquiry.id}><div className="inquiry-card-top"><div><span className="inquiry-date">{new Date(inquiry.created_at).toLocaleString()}</span><h2>{inquiry.name}</h2></div><select value={inquiry.status} onChange={(event) => void updateStatus(inquiry.id, event.target.value as InquiryStatus)} aria-label={isBn ? "অনুরোধের অবস্থা" : "Inquiry status"}><option value="new">{isBn ? "নতুন" : "New"}</option><option value="in_progress">{isBn ? "চলমান" : "In progress"}</option><option value="closed">{isBn ? "বন্ধ" : "Closed"}</option></select></div><div className="inquiry-contact"><a href={`tel:${inquiry.phone}`}>{inquiry.phone}</a>{(inquiry.district || inquiry.area_name || inquiry.project_location) && <span className="inquiry-location"><strong>{isBn ? "জেলা: " : "District: "}</strong>{inquiry.district || "Not recorded"}{inquiry.area_name && <><strong>{isBn ? " · এলাকা: " : " · Area: "}</strong>{inquiry.area_name}</>}{!inquiry.area_name && inquiry.project_location && <><strong>{isBn ? " · পুরোনো লোকেশন: " : " · Legacy location: "}</strong>{inquiry.project_location}</>}</span>}{inquiry.email && <a href={`mailto:${inquiry.email}`}>{inquiry.email}</a>}{inquiry.service && <span>{inquiry.service}</span>}</div><p>{inquiry.message}</p></article>)}</div>}</section></main>;
}
