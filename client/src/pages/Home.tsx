import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  CircleDot,
  ClipboardCheck,
  Compass,
  FileText,
  FlaskConical,
  Languages,
  Mail,
  Menu,
  MessageCircle,
  MoveRight,
  Phone,
  Ruler,
  ScanLine,
  ShieldCheck,
  Share2,
  Link2,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { AboutSection } from "@/components/home/AboutSection";
import { WhyChooseUsSection } from "@/components/home/WhyChooseUsSection";
import { QuickClientPathsSection } from "@/components/home/QuickClientPathsSection";
import projectsCatalog from "@/content/projects.json";
import servicesCatalog from "@/content/services.json";
import { bangladeshAreas, OTHER_AREA_VALUE } from "@/content/areas";
import { buildInquiryText, hasRequiredInquiryFields, resolveInquiryProjectLocation } from "@/lib/inquiry";
import { buildShareLinks } from "@/lib/share";
import { EMAIL_URL, FACEBOOK_PAGE_URL, WHATSAPP_CHAT_URL } from "@/lib/contactLinks";
import { useLanguage } from "@/hooks/useLanguage";
import SeoHead from "@/components/SeoHead";
import PrivacyImage from "@/components/PrivacyImage";
import { getSupabaseSetupMessage, supabase } from "@/lib/supabase";

const serviceIcons = { FlaskConical, Ruler, ScanLine, ShieldCheck, CircleDot, ClipboardCheck, Compass, FileText } as const;
const services = servicesCatalog.services.map((service) => ({ ...service, icon: serviceIcons[service.icon as keyof typeof serviceIcons] }));
const projects = projectsCatalog.projects;

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <div className={`section-label ${light ? "section-label--light" : ""}`} style={{ fontSize: "12px" }}><span />{children}</div>;
}

function Logo({ compact = false, isBn = false, footer = false }: { compact?: boolean; isBn?: boolean; footer?: boolean }) {
  return (
    <a className={`brand ${compact ? "brand--compact" : ""} ${footer ? "brand--footer" : ""}`} href="#top" aria-label={isBn ? "সিভিল সলিউশন হোম" : "Civil Solution home"} style={{ fontWeight: 700, fontSize: "17px" }}>
      <img className={footer ? "brand-logo--footer" : ""} src={footer ? "/netlify-assets/supplied-work/civil-solution-footer-logo-clean.webp" : "/netlify-assets/civil-solution-mark.webp"} alt="Civil Solution structural mark" />
      <span><strong>CIVIL</strong><em>SOLUTION</em></span>
    </a>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { isBn, toggleLanguage } = useLanguage();
  const navItems = isBn ? [["পরিচিতি", "about"], ["কেন আমরা", "why-us"], ["সেবাসমূহ", "services"], ["প্রকল্প", "projects"], ["যোগাযোগ", "contact"]] : [["About", "about"], ["Why us", "why-us"], ["Services", "services"], ["Projects", "projects"], ["Contact", "contact"]];
  const localized = isBn ? { label: "সিভিল ও স্ট্রাকচারাল ইঞ্জিনিয়ারিং পরামর্শ", hero: <>অবস্থা বুঝে শুরু করি। <span>প্রমাণের ভিত্তিতে নির্মাণ করি।</span></>, lede: "সারা বাংলাদেশের ক্লায়েন্টদের জন্য ব্যবহারিক পরীক্ষা, জরিপ, স্ট্রাকচারাল অ্যাসেসমেন্ট এবং নির্মাণ পরামর্শ।", primary: "পরামর্শের জন্য যোগাযোগ করুন", secondary: "সেবাসমূহ দেখুন", contactLabel: "আলোচনা শুরু করুন", contactTitle: "আপনার সাইটের কথা বলুন।", based: "প্রধান কার্যালয়: চট্টগ্রাম, বাংলাদেশ", next: "স্পষ্ট কারিগরি পরবর্তী ধাপ", trustLabel: "প্রথম ধাপের গুরুত্ব", trustTitle: "সাইট থেকেই শুরু হয় সঠিক কারিগরি নির্দেশনা।", aboutMarker: "পরিচিতি / ০২", signature: "ব্যবহারিক প্রকৌশল সহায়তা", serviceType: "কারিগরি সেবা", serviceCta: "পরিধি দেখুন", processLabel: "আমাদের কাজের পদ্ধতি", processTitle: "প্রশ্ন থেকে পরবর্তী সিদ্ধান্ত পর্যন্ত একটি সুসংগঠিত পথ।", selectedLabel: "নির্বাচিত কাজ", projectTitle: "প্রমাণভিত্তিক প্রকল্পের গল্প।", contactBody: "আপনার প্রকল্প, সমস্যা বা পরিকল্পিত কাজের সংক্ষিপ্ত বিবরণ দিন। পরবর্তী ধাপের জন্য কোন তথ্য প্রয়োজন তা নির্ধারণে আমরা সহায়তা করব।", phoneLabel: "ফোন / হোয়াটসঅ্যাপ", emailLabel: "ইমেইল", officeLabel: "অফিস", office: "এ.কে. ট্রেড সেন্টার, ৭ সিডিএ অ্যাভিনিউ, চট্টগ্রাম ৪০০০", mapLabel: "অবস্থান / এ.কে. ট্রেড সেন্টার", mapLink: "গুগল ম্যাপে খুলুন", formName: "নাম", formPhone: "ফোন", formEmail: "ইমেইল", formService: "আগ্রহের সেবা", formMessage: "প্রকল্পের বার্তা", formNamePlaceholder: "আপনার নাম", formPhonePlaceholder: "০১৭xx-xxxxxx", formEmailPlaceholder: "আপনার ইমেইল", formMessagePlaceholder: "সাইট, কাঠামো বা প্রশ্ন সম্পর্কে জানান", formSend: "অনুরোধ পাঠান", footerCopy: "সারা বাংলাদেশে পরীক্ষা, জরিপ, মূল্যায়ন এবং নির্মাণ-সংক্রান্ত সিদ্ধান্তের জন্য সিভিল ও স্ট্রাকচারাল ইঞ্জিনিয়ারিং সহায়তা। প্রধান কার্যালয় চট্টগ্রামে।", backTop: "উপরে ফিরে যান", footerService: "সিভিল ও স্ট্রাকচারাল ইঞ্জিনিয়ারিং পরামর্শ", whatsapp: "হোয়াটসঅ্যাপ", modalCta: "অনুরূপ প্রয়োজন নিয়ে আলোচনা করুন" } : { label: "Structural & civil engineering consultancy", hero: <>Start with the condition. <span>Build from the evidence.</span></>, lede: "Practical testing, surveying, structural assessment, and construction consultancy for clients across Bangladesh, with head office in Chattogram.", primary: "Request a consultation", secondary: "Explore services", contactLabel: "Start a conversation", contactTitle: "Tell us what the site is asking.", based: "Head office: Chattogram, Bangladesh", next: "Clear technical next steps", trustLabel: "Why the first step matters", trustTitle: "Technical guidance that starts with the site.", aboutMarker: "ABOUT / 02", signature: "Practical engineering support", serviceType: "Technical service", serviceCta: "View scope", processLabel: "How we work", processTitle: "A measured path from question to next step.", selectedLabel: "Selected work", projectTitle: "Project stories with room for the evidence.", contactBody: "Share a short description of your project, concern, or planned work. We will help identify the information needed for the next step.", phoneLabel: "Call / WhatsApp", emailLabel: "Email", officeLabel: "Office", office: "A.K. Trade Center, 7 CDA Ave, Chattogram 4000, Bangladesh", mapLabel: "LOCATION / A.K. TRADE CENTER", mapLink: "Open in Google Maps", formName: "Name", formPhone: "Phone", formEmail: "Email", formService: "Service of interest", formMessage: "Project message", formNamePlaceholder: "Your name", formPhonePlaceholder: "017xx-xxxxxx", formEmailPlaceholder: "you@example.com", formMessagePlaceholder: "Tell us about the site, structure, or question...", formSend: "Send inquiry", footerCopy: "Civil and structural engineering support for testing, surveying, assessment, and construction-related decisions across Bangladesh. Head office in Chattogram.", backTop: "Back to top", footerService: "Structural & civil engineering consultancy", whatsapp: "WhatsApp", modalCta: "Discuss a similar requirement" };
  const [activeProject, setActiveProject] = useState<typeof projects[number] | null>(null);
  const [activeService, setActiveService] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [inquiryText, setInquiryText] = useState("");
  const [shareCopied, setShareCopied] = useState(false);
  const [footerBubbleBottom, setFooterBubbleBottom] = useState(24);
  const [form, setForm] = useState({ name: "", phone: "", projectLocation: "", email: "", service: "", message: "" });
  const [customProjectLocation, setCustomProjectLocation] = useState("");
  useLayoutEffect(() => { window.history.scrollRestoration = "manual"; document.documentElement.scrollTop = 0; document.body.scrollTop = 0; window.scrollTo(0, 0); }, []);
  useEffect(() => {
    const footer = document.querySelector<HTMLElement>(".site-footer");
    if (!footer) return;
    let frame = 0;
    const updateBubblePosition = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const footerTop = footer.getBoundingClientRect().top;
        setFooterBubbleBottom(Math.max(24, window.innerHeight - footerTop + 20));
      });
    };
    updateBubblePosition();
    window.addEventListener("scroll", updateBubblePosition, { passive: true });
    window.addEventListener("resize", updateBubblePosition);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateBubblePosition);
      window.removeEventListener("resize", updateBubblePosition);
    };
  }, []);

  const selectedService = useMemo(() => services.find((item) => item.title === activeService), [activeService]);
  const processSteps = isBn ? [["০১", "প্রয়োজনীয়তা নিয়ে আলোচনা", "প্রকল্পের অবস্থান, বর্তমান সমস্যা, নকশা বা উপলব্ধ নথি আমাদের জানান।"], ["০২", "মূল্যায়নের পরিকল্পনা", "সেবা, সাইটে প্রবেশ, প্রয়োজনীয় তথ্য এবং প্রত্যাশিত ডেলিভারেবল নির্ধারণ করা হয়।"], ["০৩", "কাজ সম্পন্ন করা", "সম্মত জরিপ, পরীক্ষা, পরিদর্শন বা পরামর্শ নির্ধারিত পরিসরের মধ্যে সম্পন্ন করা হয়।"], ["০৪", "ফলাফল ব্যাখ্যা করা", "সুসংগঠিত নথিপত্র ও পরবর্তী সিদ্ধান্তের ব্যবহারিক ব্যাখ্যা প্রদান করা হয়।"]] : [["01", "Discuss the requirement", "Share the project location, current concern, drawings, or available documents."], ["02", "Plan the assessment", "We clarify the service, site access, information required, and expected deliverables."], ["03", "Conduct the work", "The agreed survey, test, inspection, or consultancy activity is carried out within scope."], ["04", "Explain the findings", "Receive organized documentation and a practical explanation of the next decision."]];
  const goTo = (id: string) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };
  const sharePageUrl = typeof window !== "undefined" ? window.location.href : "https://civilsolutionbd.com";
  const shareMessage = isBn ? "সিভিল সলিউশন — সিভিল ও স্ট্রাকচারাল ইঞ্জিনিয়ারিং পরামর্শ" : "Civil Solution — Civil & Structural Engineering Consultancy";
  const shareLinks = buildShareLinks(sharePageUrl, shareMessage);
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(sharePageUrl);
      setShareCopied(true);
      toast.success(isBn ? "লিংক কপি হয়েছে" : "Website link copied");
      window.setTimeout(() => setShareCopied(false), 1800);
    } catch {
      toast.error(isBn ? "লিংক কপি করা যায়নি" : "Could not copy the link");
    }
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const effectiveForm = { ...form, projectLocation: resolveInquiryProjectLocation(form.projectLocation, customProjectLocation, OTHER_AREA_VALUE) };
    if (!hasRequiredInquiryFields(effectiveForm)) {
      toast.error(isBn ? "আপনার নাম, ফোন নম্বর, প্রকল্পের অবস্থান এবং বার্তা যোগ করুন।" : "Please add your name, phone number, project location, and message.");
      return;
    }
    setSubmitting(true);
    if (supabase) {
      const { error } = await supabase.from("inquiries").insert({
        name: effectiveForm.name.trim(),
        phone: effectiveForm.phone.trim(),
        project_location: effectiveForm.projectLocation.trim(),
        email: effectiveForm.email.trim() || null,
        service: effectiveForm.service.trim() || null,
        message: effectiveForm.message.trim(),
      });
      if (error) {
        setSubmitting(false);
        console.error("[Inquiry submission]", error);
        toast.error(isBn ? `অনুরোধ সংরক্ষণ করা যায়নি। ${error.message}` : `We could not save your inquiry: ${error.message}`);
        return;
      }
    } else {
      toast.warning(getSupabaseSetupMessage(isBn));
    }
    const summary = buildInquiryText(effectiveForm);
    setInquiryText(summary);
    setSubmitted(true);
    setSubmitting(false);
    toast.success(supabase ? (isBn ? "অনুরোধ সংরক্ষিত হয়েছে।" : "Inquiry saved successfully.") : (isBn ? "বার্তাটি প্রস্তুত। ইমেইল বা হোয়াটসঅ্যাপে পাঠান।" : "Message ready. Send it by Gmail or WhatsApp."));
  }

  return (
    <>
      <SeoHead
        title={isBn ? "সিভিল সলিউশন — সারা বাংলাদেশের সিভিল ও স্ট্রাকচারাল ইঞ্জিনিয়ারিং" : "Civil Solution — Civil & Structural Engineering Across Bangladesh"}
        description={isBn ? "সারা বাংলাদেশের জন্য মাটি পরীক্ষা, ল্যান্ড সার্ভে, স্ট্রাকচারাল অ্যাসেসমেন্ট এবং নির্মাণ পরামর্শ; প্রধান কার্যালয় চট্টগ্রামে।" : "Civil Solution provides soil testing, land surveying, structural assessment, and construction consultancy across Bangladesh, with head office in Chattogram."}
        locale={isBn ? "bn" : "en"}
        keywords={isBn ? ["সিভিল ইঞ্জিনিয়ারিং বাংলাদেশ", "মাটি পরীক্ষা বাংলাদেশ", "ল্যান্ড সার্ভে বাংলাদেশ", "স্ট্রাকচারাল অ্যাসেসমেন্ট"] : ["civil engineering Bangladesh", "soil testing Bangladesh", "land survey Bangladesh", "structural assessment Bangladesh"]}
      />
      <div className="site-shell" id="top">
      <header className="site-header">
        <div className="container header-inner">
          <Logo isBn={isBn} />
<nav className="desktop-nav" aria-label={isBn ? "প্রধান নেভিগেশন" : "Primary navigation"}>
            {navItems.map(([label, id]) => <button key={id} onClick={() => goTo(id)}>{label}</button>)}<Link className="nav-page-link" to="/blog">{isBn ? "ব্লগ" : "Blog"}</Link><Link className="nav-page-link" to="/careers">{isBn ? "ক্যারিয়ার" : "Careers"}</Link>
          </nav>
          <div className="header-actions">
            <button className="language-toggle" aria-label={isBn ? "ইংরেজিতে পরিবর্তন করুন" : "বাংলায় পরিবর্তন করুন"} onClick={toggleLanguage}><Languages size={15} /><span className={!isBn ? "is-active" : ""}>EN</span><i>/</i><span className={isBn ? "is-active" : ""}>বাংলা</span></button>
            <a className="header-phone" href="tel:+8801723663908"><Phone size={15} />01723-663908</a>
            <button className="button button--small button--brown" onClick={() => goTo("contact")}>{localized.primary} <ArrowUpRight size={15} /></button>
            <button className="menu-toggle" aria-label={menuOpen ? (isBn ? "মেনু বন্ধ করুন" : "Close menu") : (isBn ? "মেনু খুলুন" : "Open menu")} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
          </div>
        </div>
        {menuOpen && <nav className="mobile-nav" aria-label={isBn ? "মোবাইল নেভিগেশন" : "Mobile navigation"}><button className="mobile-language" onClick={toggleLanguage}><Languages size={15} /> {isBn ? "ইংরেজিতে দেখুন" : "বাংলায় দেখুন"}</button>{navItems.map(([label, id]) => <button key={id} onClick={() => goTo(id)}>{label}<ArrowUpRight size={15} /></button>)}<Link className="mobile-nav-link" to="/blog" onClick={() => setMenuOpen(false)}>{isBn ? "ব্লগ" : "Blog"}<ArrowUpRight size={15} /></Link><Link className="mobile-nav-link" to="/careers" onClick={() => setMenuOpen(false)}>{isBn ? "ক্যারিয়ার / নিয়োগ" : "Careers / Hiring"}<ArrowUpRight size={15} /></Link></nav>}
      </header>

      <main>
<section className="hero-section">
          <div className="hero-grid" />
          <div className="container hero-layout">
            <div className="hero-copy">
              <SectionLabel>{localized.label}</SectionLabel>
              <h1>{localized.hero}</h1>
              <p className="hero-lede">{localized.lede}</p>
              <div className="hero-actions"><button className="button button--turquoise" onClick={() => goTo("contact")}>{localized.primary} <ArrowUpRight size={17} /></button><button className="text-link" onClick={() => goTo("services")}>{localized.secondary} <MoveRight size={17} /></button></div>
              <div className="hero-note"><span className="datum-mark" /> {localized.based} <span className="hero-note-dot" /> {localized.next}
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-image-wrap"><PrivacyImage src="/netlify-assets/privacy-blurred/civil-solution-hero.webp" alt={isBn ? "নির্মাণ সাইটে নকশা পর্যালোচনা করছেন প্রকৌশলী" : "Engineer reviewing plans at a construction site"} /><div className="hero-image-caption"><span>{isBn ? "মাঠ নোট / ০১" : "FIELD NOTE / 01"}</span><strong>{isBn ? "সাইটভিত্তিক কারিগরি সহায়তা" : "Site-first technical support"}</strong></div></div>
              <div className="hero-coordinate">22°21'N<br />91°49'E</div>
              <div className="hero-corner hero-corner--top" /><div className="hero-corner hero-corner--bottom" />
            </div>
          </div>
          <div className="hero-bottom-rule container" style={{fontSize: '11px'}}><span style={{fontSize: '11px'}}>{isBn ? "প্রতিষ্ঠিত / সিভিল সলিউশন" : "EST. / CIVIL SOLUTION"}</span><span style={{fontSize: '11px'}}>{isBn ? "পরীক্ষা · জরিপ · মূল্যায়ন · পরামর্শ" : "TEST · SURVEY · ASSESS · ADVISE"}</span></div>
        </section>

<QuickClientPathsSection isBn={isBn} onNavigate={goTo} />

<section className="trust-section"><div className="container trust-grid"><div className="trust-intro"><SectionLabel>{localized.trustLabel}</SectionLabel><h2>{localized.trustTitle}</h2></div><div className="trust-statement"><p>{isBn ? "শুরুতেই প্রকল্পের বাস্তব অবস্থা বোঝা গেলে এবং ফলাফল স্পষ্টভাবে জানানো হলে প্রকৌশলগত সিদ্ধান্ত নেওয়া সহজ হয়।" : "Engineering decisions become easier to manage when the conditions are understood early and the findings are communicated clearly."}</p><div className="trust-points"><span><Check size={15} /> {isBn ? "সাইটভিত্তিক" : "Site-focused"}</span><span><Check size={15} /> {isBn ? "পরিসরনির্ভর" : "Scope-aware"}</span><span><Check size={15} /> {isBn ? "সুস্পষ্ট নথিপত্র" : "Clearly documented"}</span></div></div></div></section>
<AboutSection isBn={isBn} signature={localized.signature} />

<WhyChooseUsSection isBn={isBn} />

<section className="services-section section-pad" id="services"><div className="container"><div className="section-heading-row"><div><SectionLabel>{isBn ? "আমাদের সেবা" : "What we do"}</SectionLabel><h2>{isBn ? "সঠিক নির্মাণ সিদ্ধান্তের জন্য কারিগরি সেবা।" : "Services for better-informed construction decisions."}</h2></div><p>{isBn ? "প্রাথমিক তদন্ত থেকে বিদ্যমান কাঠামো পর্যালোচনা পর্যন্ত, আপনার প্রকল্পের প্রশ্নের সঙ্গে সামঞ্জস্যপূর্ণ সেবা নির্বাচন করুন।" : "From early investigation to existing-structure review, choose the technical service that matches the question your project needs to answer."}</p></div><div className="services-grid">{services.map((service) => { const Icon = service.icon; return <button type="button" className={`service-card ${activeService === service.title ? "is-active" : ""}`} key={service.title} aria-label={isBn ? `${service.bnTitle} বিস্তারিত দেখুন` : `View details for ${service.title}`} onClick={() => { navigate(`/services/${service.slug}`); }}><div className="service-card-image"><img src={service.image} alt={isBn ? service.altBn : service.altEn} /><span className="service-card-image-tag">{isBn ? "ইলাস্ট্রেটিভ রেফারেন্স" : "ILLUSTRATIVE REFERENCE"}</span></div><div className="service-card-top"><span className="service-number">{service.number}</span><Icon size={22} /></div><div className="service-meta"><span>{isBn ? service.kindBn : service.kind}</span><span>{localized.serviceType}</span></div><h3>{isBn ? service.bnTitle : service.title}</h3><p>{isBn ? service.bnBody : service.body}</p><span className="service-card-cta">{localized.serviceCta}<ArrowUpRight size={15} /></span></button>; })}</div>{selectedService && <div className="service-detail"><div><SectionLabel>{isBn ? `সেবা / ${selectedService.number}` : `SERVICE NOTE / ${selectedService.number}`}</SectionLabel><h3>{isBn ? selectedService.bnTitle : selectedService.title}</h3></div><p>{isBn ? selectedService.bnBody : selectedService.body} {isBn ? "পদ্ধতি, সাইটের প্রয়োজনীয়তা ও ডেলিভারেবল নিয়ে আলোচনা করতে যোগাযোগ করুন।" : "Contact us to confirm the method, site requirements, and deliverables for your project."}</p><button className="text-link" onClick={() => goTo("contact")}>{isBn ? "এই সেবা নিয়ে আলোচনা করুন" : "Discuss this service"} <MoveRight size={17} /></button></div>}</div></section>

<section className="process-section section-pad"><div className="container"><div className="process-heading"><SectionLabel>{localized.processLabel}</SectionLabel><h2>{localized.processTitle}</h2></div><div className="process-list">{processSteps.map(([num, title, body]) => <div className="process-item" key={num}><span className="process-num">{num}</span><div><h3>{title}</h3><p>{body}</p></div><ArrowDownRight size={20} /></div>)}</div></div></section>

<section className="projects-section section-pad" id="projects"><div className="container"><div className="section-heading-row projects-heading"><div><SectionLabel>{localized.selectedLabel}</SectionLabel><h2>{localized.projectTitle}</h2></div><p>{isBn ? "অনেক কাজ ব্যক্তিগত সম্পত্তি ও ক্লায়েন্টের গোপনীয় সিদ্ধান্তের সঙ্গে যুক্ত। অনুমতি ছাড়া আমরা প্রকল্পের পরিচয়, কারিগরি নথি বা সাইটের ছবি প্রকাশ করি না। এখানে অনুমোদিত কাজের প্রোফাইল ও ইলাস্ট্রেটিভ সেবা প্রোফাইল আলাদাভাবে চিহ্নিত করা হয়েছে।" : "Many assignments involve private properties and confidential client decisions. We do not publish project identities, technical documents, or site images without permission. Authorized work profiles and illustrative service profiles are labeled separately here."}</p><p>{isBn ? "প্রতিটি কার্ডে কাজের পরিধি ও কারিগরি ফলাফলের সারাংশ দেওয়া হয়েছে; গোপনীয়তার কারণে ক্লায়েন্ট পরিচয় ও ব্যক্তিগত তথ্য প্রকাশ করা হয় না।" : "Each card summarizes the work scope and technical outcome; client identities and private details are not published for confidentiality."}</p></div><div className="project-grid">{projects.map((project, index) => <button className={`project-card project-card--${index + 1}`} key={project.id} onClick={() => setActiveProject(project)}><div className="project-image"><PrivacyImage src={project.image} alt="" /><span className="project-tag">{isBn ? project.bnTag : project.tag}</span><span className="project-open"><ArrowUpRight size={18} /></span></div><div className="project-info"><span className="project-category">{isBn ? project.bnCategory : project.category}</span><h3>{isBn ? project.bnTitle : project.title}</h3><p>{isBn ? project.bnSubtitle : project.subtitle}</p></div></button>)}</div></div></section>

<section className="contact-section section-pad" id="contact"><div className="container contact-layout"><div className="contact-copy"><SectionLabel light>{localized.contactLabel}</SectionLabel><h2>{localized.contactTitle}</h2><p>{localized.contactBody}</p><div className="contact-details"><a href="tel:+8801723663908"><span><Phone size={17} /></span><div><small>{localized.phoneLabel}</small><strong>01723-663908</strong></div></a><a href={EMAIL_URL}><span><MessageCircle size={17} /></span><div><small>{localized.emailLabel}</small><strong>civilsolution0@gmail.com</strong></div></a><div><span><Compass size={17} /></span><div><small>{localized.officeLabel}</small><strong>{localized.office}</strong></div></div></div><div className="map-panel"><div className="map-panel-top"><span>{localized.mapLabel}</span><a href="https://maps.app.goo.gl/S2gwm5UR9q1Bx7zV7" target="_blank" rel="noreferrer">{localized.mapLink} <ArrowUpRight size={14} /></a></div><iframe title={isBn ? "সিভিল সলিউশনের অফিস এলাকার মানচিত্র" : "Civil Solution office area map"} src="https://www.google.com/maps?q=9R8H%2BX4Q%20A.K.%20TRADE%20CENTER%2C%207%20CDA%20Ave%2C%20Chattogram%204000%2C%20Bangladesh&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div><a className="contact-facebook-cta" href={FACEBOOK_PAGE_URL} target="_blank" rel="noreferrer" aria-label={isBn ? "সিভিল সলিউশনের ফেসবুক পেজ দেখুন" : "Visit the Civil Solution Facebook page"}><span className="contact-facebook-cta-icon"><FaFacebookF aria-hidden="true" /></span><span><strong>{isBn ? "ফেসবুকে আমাদের কাজ দেখুন" : "See more of our work on Facebook"}</strong><small>{isBn ? "সিভিল সলিউশনের অফিসিয়াল পেজ দেখুন" : "Visit the official Civil Solution page"}</small></span><ArrowUpRight size={17} /></a></div><form className="contact-form" onSubmit={handleSubmit}><div className="form-top"><span>{isBn ? "পরামর্শের অনুরোধ / ০৪" : "CONSULTATION REQUEST / 04"}</span><span>{isBn ? "কোনো বাধ্যবাধকতা নেই" : "NO COMMITMENT REQUIRED"}</span></div>{submitted ? <div className="form-success"><div className="success-icon"><Check /></div><h3>{isBn ? `ধন্যবাদ, ${form.name}।` : `Thank you, ${form.name}.`}</h3><p>{isBn ? "আপনার অনুরোধ সংরক্ষিত হয়েছে। প্রয়োজনে ইমেইল বা হোয়াটসঅ্যাপেও পাঠাতে পারেন।" : "Your inquiry is saved. You can also send the details by email or WhatsApp."}</p><div className="inquiry-actions"><a className="button button--sand button--small inquiry-action inquiry-action--gmail" href={`https://mail.google.com/mail/?view=cm&fs=1&to=civilsolution0@gmail.com&su=${encodeURIComponent(`${isBn ? "সিভিল সলিউশন অনুসন্ধান — " : "Civil Solution inquiry — "}${form.service || (isBn ? "প্রকল্প পরামর্শ" : "Project consultation")}`)}&body=${encodeURIComponent(inquiryText)}`} target="_blank" rel="noreferrer">{isBn ? "জিমেইল খুলুন" : "Open Gmail"} <ArrowUpRight size={16} /></a><a className="button button--turquoise button--small inquiry-action inquiry-action--whatsapp" href={`https://wa.me/8801723663908?text=${encodeURIComponent(inquiryText)}`} target="_blank" rel="noreferrer">{isBn ? "হোয়াটসঅ্যাপে পাঠান" : "Send by WhatsApp"} <MessageCircle size={16} /></a></div><button type="button" className="text-link" onClick={() => { setSubmitted(false); setInquiryText(""); setForm({ name: "", phone: "", projectLocation: "", email: "", service: "", message: "" }); setCustomProjectLocation(""); }}>{isBn ? "আরেকটি অনুরোধ পাঠান" : "Start another inquiry"} <MoveRight size={17} /></button></div> : <><div className="form-grid"><label>{localized.formName} *<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder={localized.formNamePlaceholder} /></label><label>{localized.formPhone} *<input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder={localized.formPhonePlaceholder} /></label></div><label>{isBn ? "প্রকল্পের এলাকা / জেলা" : "Project area / district"} *<select required value={form.projectLocation} onChange={(e) => { const value = e.target.value; setForm({ ...form, projectLocation: value }); if (value !== OTHER_AREA_VALUE) setCustomProjectLocation(""); }}><option value="" disabled>{isBn ? "এলাকা বা জেলা নির্বাচন করুন" : "Select an area or district"}</option>{bangladeshAreas.map((area) => <option key={area.en} value={area.en}>{isBn ? area.bn : area.en}</option>)}</select></label>{form.projectLocation === OTHER_AREA_VALUE && <label>{isBn ? "আপনার এলাকার নাম" : "Your area name"} *<input required value={customProjectLocation} onChange={(e) => setCustomProjectLocation(e.target.value)} placeholder={isBn ? "এলাকা, উপজেলা বা জেলার নাম লিখুন" : "Enter the area, upazila, or district name"} /></label>}<label>{isBn ? "ইমেইল (ঐচ্ছিক)" : "Email (optional)"}<input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder={localized.formEmailPlaceholder} /></label><label>{localized.formService}<select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}><option value="">{isBn ? "একটি সেবা নির্বাচন করুন" : "Select a service"}</option>{services.map((item) => <option key={item.title}>{isBn ? item.bnTitle : item.title}</option>)}</select></label><label>{localized.formMessage} *<textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder={localized.formMessagePlaceholder} rows={4} /></label><button className="button button--turquoise button--full" type="submit" disabled={submitting}>{submitting ? (isBn ? "সংরক্ষণ করা হচ্ছে…" : "Saving…") : (isBn ? "অনুরোধ পাঠান" : "Send inquiry")} <ArrowUpRight size={17} /></button><p className="form-note">{isBn ? "ফর্ম জমা দিলে আপনি সম্মত হচ্ছেন যে সিভিল সলিউশন আপনার অনুরোধের উত্তর দিতে এই তথ্য ব্যবহার করতে পারবে।" : "By submitting, you agree that Civil Solution may use these details to respond to your inquiry."}</p></>}</form></div></section>
      </main>

<footer className="site-footer">
        <div className="container footer-top">
          <div className="footer-brand-column"><Logo compact isBn={isBn} footer /><span className="footer-bengali">{isBn ? "সিভিল সলিউশন" : "CIVIL SOLUTION"}</span><p className="footer-copy">{localized.footerCopy}</p><span className="footer-location"><span className="datum-mark" />{isBn ? "চট্টগ্রাম থেকে সারা বাংলাদেশ" : "Chattogram to all Bangladesh"}</span></div>
          <nav className="footer-column" aria-label={isBn ? "ওয়েবসাইট অন্বেষণ" : "Explore the website"}><span className="footer-column-label">{isBn ? "অন্বেষণ" : "Explore"}</span><Link to="/blog">{isBn ? "কারিগরি ব্লগ" : "Technical blog"}<ArrowUpRight size={14} /></Link><Link to="/careers">{isBn ? "ক্যারিয়ার / নিয়োগ" : "Careers / Hiring"}<ArrowUpRight size={14} /></Link><button type="button" onClick={() => goTo("services")}>{isBn ? "সেবাসমূহ" : "Services"}<ArrowUpRight size={14} /></button><button type="button" onClick={() => goTo("projects")}>{isBn ? "প্রকল্প" : "Projects"}<ArrowUpRight size={14} /></button></nav>
          <div className="footer-column footer-contact-column"><span className="footer-column-label">{isBn ? "সরাসরি যোগাযোগ" : "Direct contact"}</span><a href="tel:+8801723663908"><Phone size={15} />01723-663908</a><a href={EMAIL_URL}><Mail size={15} />civilsolution0@gmail.com</a><a href={WHATSAPP_CHAT_URL} target="_blank" rel="noreferrer"><FaWhatsapp aria-hidden="true" />{isBn ? "হোয়াটসঅ্যাপে কথা বলুন" : "Chat on WhatsApp"}</a><a className="footer-facebook-page-link" href={FACEBOOK_PAGE_URL} target="_blank" rel="noreferrer"><FaFacebookF aria-hidden="true" />{isBn ? "ফেসবুক পেজ দেখুন" : "Visit Facebook page"}<ArrowUpRight size={13} /></a></div>
          <div className="footer-share-column"><span className="footer-column-label">{isBn ? "শেয়ার করুন" : "Share"}</span><p>{isBn ? "কাউকে সিভিল সলিউশনের সঙ্গে যুক্ত করুন।" : "Send Civil Solution to someone planning a project."}</p><div className="footer-share"><a className="footer-share-link" href={shareLinks.facebook} target="_blank" rel="noreferrer" aria-label={isBn ? "ফেসবুকে শেয়ার করুন" : "Share on Facebook"}><FaFacebookF aria-hidden="true" /></a><a className="footer-share-link footer-share-link--whatsapp" href={shareLinks.whatsapp} target="_blank" rel="noreferrer" aria-label={isBn ? "হোয়াটসঅ্যাপে শেয়ার করুন" : "Share on WhatsApp"}><FaWhatsapp aria-hidden="true" /></a><button className={`footer-share-link footer-share-link--copy ${shareCopied ? "is-copied" : ""}`} type="button" onClick={handleCopyLink} aria-label={shareCopied ? (isBn ? "লিংক কপি হয়েছে" : "Link copied") : (isBn ? "লিংক কপি করুন" : "Copy website link")}><Link2 size={15} /></button></div></div>
        </div>
        <div className="container footer-bottom"><span>{isBn ? "© ২০২৬ সিভিল সলিউশন। সর্বস্বত্ব সংরক্ষিত।" : "© 2026 Civil Solution. All rights reserved."}</span><span>{localized.footerService}</span><button className="text-link text-link--light" onClick={() => goTo("top")}>{localized.backTop} <ChevronDown size={16} className="rotate-180" /></button></div>
      </footer>

      <a className="floating-whatsapp" style={{ bottom: `${footerBubbleBottom}px` }} href={`https://wa.me/8801723663908?text=${encodeURIComponent(isBn ? "সিভিল সলিউশন, আমি একটি প্রকল্পের প্রয়োজন নিয়ে আলোচনা করতে চাই।" : "Hello Civil Solution, I would like to discuss a project requirement.")}`} target="_blank" rel="noreferrer" aria-label={isBn ? "সিভিল সলিউশনের সঙ্গে হোয়াটসঅ্যাপে কথা বলুন" : "Chat with Civil Solution on WhatsApp"}><MessageCircle size={23} /><span>{localized.whatsapp}</span><span className="floating-whatsapp-tooltip" role="tooltip">{isBn ? "আমাদের সঙ্গে কথা বলুন" : "Chat with us"}</span></a>

      {activeProject && <div className="modal-backdrop" role="presentation" onClick={() => setActiveProject(null)}><article className="project-modal" role="dialog" aria-modal="true" aria-label={isBn ? activeProject.bnTitle : activeProject.title} onClick={(e) => e.stopPropagation()}><button className="modal-close" aria-label={isBn ? "কেস স্টাডি বন্ধ করুন" : "Close case study"} onClick={() => setActiveProject(null)}><X /></button><PrivacyImage src={activeProject.image} alt="" /><div className="modal-content"><span className="project-tag">{isBn ? activeProject.bnTag : activeProject.tag}</span><span className="project-category">{isBn ? activeProject.bnCategory : activeProject.category}</span><h2>{isBn ? activeProject.bnTitle : activeProject.title}</h2><p>{isBn ? activeProject.bnCopy : activeProject.copy}</p><ul>{(isBn ? activeProject.bnDetails : activeProject.details).map((detail) => <li key={detail}><Check size={15} />{detail}</li>)}</ul><button className="button button--brown" onClick={() => { setActiveProject(null); goTo("contact"); }}>{localized.modalCta} <ArrowUpRight size={16} /></button></div></article></div>}
      </div>
    </>
  );
}
