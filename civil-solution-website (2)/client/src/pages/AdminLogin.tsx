import { FormEvent, useState } from "react";
import { ArrowLeft, Languages, LockKeyhole } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLanguage } from "@/hooks/useLanguage";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { isBn, toggleLanguage } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) {
      toast.error(isBn ? "সুপাবেস কনফিগার করা হয়নি।" : "Supabase is not configured yet.");
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    if (data.user?.app_metadata?.role !== "admin") {
      await supabase.auth.signOut();
      toast.error(isBn ? "এই অ্যাকাউন্টের অ্যাডমিন অনুমতি নেই।" : "This account does not have admin access.");
      return;
    }
    navigate("/admin", { replace: true });
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-toolbar"><Link className="auth-back" to="/"><ArrowLeft size={16} /> {isBn ? "হোমে ফিরুন" : "Back to website"}</Link><button className="language-toggle" type="button" onClick={toggleLanguage}><Languages size={14} /> {isBn ? "EN" : "বাংলা"}</button></div>
        <div className="auth-mark"><LockKeyhole size={22} /></div>
        <span className="section-label">{isBn ? "অ্যাডমিন প্রবেশ" : "ADMIN ACCESS"}</span>
        <h1>{isBn ? "ইনকোয়ারি দেখুন" : "View inquiries"}</h1>
        <p>{isBn ? "সিভিল সলিউশনের অনুমোদিত অ্যাডমিন অ্যাকাউন্ট দিয়ে প্রবেশ করুন।" : "Sign in with an authorized Civil Solution admin account."}</p>
        {!isSupabaseConfigured && <div className="auth-notice">{isBn ? "Supabase পরিবেশ ভেরিয়েবল যোগ না করা পর্যন্ত লগইন চালু হবে না।" : "Login is disabled until the Supabase environment variables are added."}</div>}
        <form onSubmit={handleSubmit} className="auth-form">
          <label>{isBn ? "ইমেইল" : "Email"}<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" /></label>
          <label>{isBn ? "পাসওয়ার্ড" : "Password"}<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required autoComplete="current-password" /></label>
          <button className="button button--brown button--full" disabled={loading || !isSupabaseConfigured}>{loading ? (isBn ? "প্রবেশ করা হচ্ছে…" : "Signing in…") : (isBn ? "প্রবেশ করুন" : "Sign in")}</button>
        </form>
      </div>
    </main>
  );
}
