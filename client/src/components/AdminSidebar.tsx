import { Activity, ArrowLeft, Bell, FileText, Languages, LogOut, RefreshCw, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { useRealtimeInquiries } from "@/hooks/useRealtimeInquiries";

type AdminSidebarProps = {
  isBn: boolean;
  toggleLanguage: () => void;
  collapsed: boolean;
  onToggle: () => void;
  onRefresh?: () => void;
  onSignOut: () => void;
  active: "overview" | "inquiries" | "blog" | "applications" | "account";
  displayName?: string;
  newRequestCount?: number;
};

const initials = (name: string) => name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "AD";

export default function AdminSidebar({ isBn, toggleLanguage, collapsed, onToggle, onRefresh, onSignOut, active, displayName = "Admin", newRequestCount = 0 }: AdminSidebarProps) {
  const { newInquiryCount } = useRealtimeInquiries();
  const liveCount = newRequestCount + newInquiryCount;
  const closeOnMobile = () => { if (window.matchMedia("(max-width: 900px)").matches && !collapsed) onToggle(); };
  const linkClass = (key: AdminSidebarProps["active"]) => `text-link admin-sidebar-link${active === key ? " admin-sidebar-link--active" : ""}`;
  return <>
    <div className={`admin-sidebar-overlay${collapsed ? " admin-sidebar-overlay--hidden" : ""}`} onClick={onToggle} aria-hidden="true" />
    <aside className={`admin-toolbar admin-toolbar--redesigned admin-shared-sidebar${collapsed ? " admin-shared-sidebar--collapsed" : ""}`} aria-label={isBn ? "অ্যাডমিন নেভিগেশন" : "Admin navigation"}>
      <div className="admin-shared-brand">Civil Solution</div>
      <nav className="admin-page-links">
        <Link className={linkClass("overview")} to="/admin" onClick={closeOnMobile}><Activity size={16} /> {isBn ? "ওভারভিউ" : "Overview"}</Link>
        <Link className={linkClass("inquiries")} to="/admin/inquiries" onClick={closeOnMobile}><Bell size={16} /> {isBn ? "সব ইনকোয়ারি" : "All inquiries"}{liveCount > 0 && <strong className="admin-sidebar-badge">{liveCount}</strong>}</Link>
        <Link className={linkClass("blog")} to="/admin/blog" onClick={closeOnMobile}><FileText size={16} /> {isBn ? "ব্লগ" : "Blog"}</Link>
        <Link className={linkClass("applications")} to="/admin/applications" onClick={closeOnMobile}><FileText size={16} /> {isBn ? "আবেদন" : "Applications"}</Link>
      </nav>
      <div className="admin-sidebar-actions">
        <Link className="text-link admin-sidebar-link" to="/"><ArrowLeft size={16} /> {isBn ? "ওয়েবসাইট" : "Website"}</Link>
        <button className="admin-sidebar-action" type="button" onClick={toggleLanguage}><Languages size={14} /> <span>{isBn ? "English" : "বাংলা"}</span></button>
        {onRefresh && <button className="admin-sidebar-action" type="button" onClick={onRefresh}><RefreshCw size={14} /> <span>{isBn ? "রিফ্রেশ" : "Refresh"}</span></button>}
        <button className="admin-sidebar-action admin-sidebar-action--danger" type="button" onClick={onSignOut}><LogOut size={14} /> <span>{isBn ? "বের হন" : "Sign out"}</span></button>
      </div>
      <Link className={`admin-sidebar-profile${active === "account" ? " admin-sidebar-profile--active" : ""}`} to="/admin/account" onClick={closeOnMobile}><span className="admin-sidebar-avatar">{initials(displayName)}</span><span><strong>{displayName}</strong><small>{isBn ? "অ্যাডমিন অ্যাকাউন্ট" : "Admin account"}</small></span><UserRound size={14} /></Link>
      <button className="admin-sidebar-mobile-close" type="button" onClick={onToggle} aria-label={isBn ? "মেনু বন্ধ করুন" : "Close menu"}>×</button>
    </aside>
  </>;
}
