/* Warm Technical Atelier: three numbered client paths form a compact action index beneath the hero. */
import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

type QuickPath = [num: string, tag: string, title: string, description: string, destination: string];

export function QuickClientPathsSection({ isBn, onNavigate }: { isBn: boolean; onNavigate: (id: string) => void }) {
  const { ref, isVisible } = useReveal<HTMLElement>();
  const paths: QuickPath[] = isBn
    ? [
        ["০১", "পরামর্শ / ০১", "আপনার প্রকল্প নিয়ে কথা বলুন", "সরাসরি পরামর্শের অনুরোধ পাঠান", "contact"],
        ["০২", "পরিধি / ০২", "সঠিক সেবা নির্বাচন করুন", "আপনার প্রশ্নের সঙ্গে আমাদের কাজের পরিধি মিলিয়ে দেখুন", "services"],
        ["০৩", "প্রমাণ / ০৩", "প্রকল্পের ধরন দেখুন", "ডেলিভারেবল ও কাজের ধরন সম্পর্কে ধারণা নিন", "projects"],
      ]
    : [
        ["01", "CONSULTATION / 01", "Talk about your project", "Send a direct consultation request", "contact"],
        ["02", "SCOPE / 02", "Find the right service", "Match your question to our technical scope", "services"],
        ["03", "EVIDENCE / 03", "Review project evidence", "See project types and typical deliverables", "projects"],
      ];

  return (
    <section ref={ref} className={`client-route reveal-section ${isVisible ? "is-visible" : ""}`} aria-label={isBn ? "দ্রুত পথ" : "Quick client paths"}>
      <div className="container client-route-grid">
        {paths.map(([num, tag, title, description, destination], index) => (
          <button
            className={`client-route-card client-route-card--editorial ${index === 0 ? "client-route-card--primary" : ""} reveal-item`}
            style={{ "--reveal-delay": `${80 + index * 70}ms` } as CSSProperties}
            key={num}
            onClick={() => onNavigate(destination)}
          >
            <span className="route-number">{num}</span>
            <span className="client-route-card-copy">
              <small className="route-tag" style={{ fontSize: "10px" }}>{tag}</small>
              <strong>{title}</strong>
              <small>{description}</small>
            </span>
            <ArrowUpRight size={18} aria-hidden="true" />
          </button>
        ))}
      </div>
    </section>
  );
}
