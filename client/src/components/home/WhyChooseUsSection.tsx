/* Warm Technical Atelier: Why Choose Us is a surveyed field-note panel, not a uniform feature grid. */
import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "../SectionLabel";
import { useReveal } from "@/hooks/useReveal";

type Benefit = [num: string, title: string, body: string, tag: string];

export function WhyChooseUsSection({ isBn }: { isBn: boolean }) {
  const { ref, isVisible } = useReveal<HTMLElement>();
  const benefits: Benefit[] = isBn
    ? [
        ["০১", "সাইটভিত্তিক মূল্যায়ন", "বাস্তব সাইট পরিস্থিতি বোঝার মাধ্যমে উপযুক্ত পরীক্ষা, জরিপ বা পর্যালোচনার পরিধি নির্ধারণে সহায়তা করি।", "সাইট থেকেই শুরু"],
        ["০২", "সুস্পষ্ট কারিগরি রিপোর্ট", "পর্যবেক্ষণ ও ফলাফলকে প্রকল্প পর্যালোচনা এবং পরবর্তী সিদ্ধান্তের জন্য সহজবোধ্যভাবে সাজানো হয়।", "ফলাফল / নথি"],
        ["০৩", "প্রয়োজনভিত্তিক পরামর্শ", "একটি পদ্ধতি সব প্রকল্পে প্রয়োগ না করে আপনার নির্দিষ্ট প্রশ্ন অনুযায়ী কাজের পরিধি নিয়ে আলোচনা করা হয়।", "প্রশ্ন / পরিধি"],
        ["০৪", "সহজ যোগাযোগ", "ফোন, হোয়াটসঅ্যাপ বা ইমেইলে প্রকল্পের পরবর্তী তথ্য ও প্রস্তুতি নিয়ে আলোচনা করা সহজ।", "পরবর্তী ধাপ"],
      ]
    : [
        ["01", "Site-focused assessment", "We help define the right testing, survey, or review scope by starting with the actual site condition.", "Start with the site"],
        ["02", "Clear technical reporting", "Observations and findings are organized for practical project review and next-step decisions.", "Findings / record"],
        ["03", "Requirement-led guidance", "Rather than applying one method to every project, we discuss the scope around your specific question.", "Question / scope"],
        ["04", "Responsive communication", "Phone, WhatsApp, and email make it easier to discuss project information and preparation for the next step.", "Next conversation"],
      ];

  return (
    <section ref={ref} className={`why-section why-section--redesigned section-pad reveal-section ${isVisible ? "is-visible" : ""}`} id="why-us">
      <div className="container why-section-layout">
        <div className="why-section-intro reveal-item" style={{ "--reveal-delay": "60ms" } as CSSProperties}>
          <div className="why-section-rail"><span>{isBn ? "কেন / ০৩" : "WHY / 03"}</span><i /></div>
          <div>
            <SectionLabel>{isBn ? "কেন সিভিল সলিউশন" : "Why choose us"}</SectionLabel>
            <h2>{isBn ? "সঠিক তথ্য থেকে বাস্তব সিদ্ধান্ত পর্যন্ত।" : "From dependable information to practical decisions."}</h2>
            <p>{isBn ? "প্রতিটি কাজের পদ্ধতি প্রকল্পের প্রশ্ন, সাইটের অবস্থা এবং প্রয়োজনীয় ডেলিভারেবলের সঙ্গে সামঞ্জস্য করে নির্ধারণ করা হয়।" : "Each engagement is shaped around the project question, site condition, and deliverables needed for the next decision."}</p>
            <span className="why-section-note">{isBn ? "নির্ভরযোগ্যতা / ০৪" : "RELIABILITY / 04"}</span>
          </div>
        </div>
        <div className="why-benefit-list" aria-label={isBn ? "সিভিল সলিউশনের সুবিধাসমূহ" : "Civil Solution benefits"}>
          {benefits.map(([num, title, body, tag], index) => (
            <article
              className={`why-benefit-card reveal-item ${index === 0 ? "why-benefit-card--lead" : ""}`}
              style={{ "--reveal-delay": `${130 + index * 70}ms` } as CSSProperties}
              key={num}
            >
              <span className="why-benefit-index">{num}</span>
              <div className="why-benefit-copy">
                <span className="why-benefit-tag" style={{ fontSize: "10px" }}>{tag}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
              <ArrowUpRight className="why-benefit-arrow" size={18} aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
