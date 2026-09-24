import { ArrowLeft, ArrowUpRight, Check, Languages } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import projectsCatalog from "@/content/projects.json";

export default function CompletedProjects() {
  const { isBn, toggleLanguage } = useLanguage();
  const projects = projectsCatalog.projects;

  return (
    <main className="blog-page completed-projects-page">
      <header className="careers-header">
        <Link className="auth-back" to="/"><ArrowLeft size={16} /> {isBn ? "হোমে ফিরুন" : "Back to website"}</Link>
        <button className="language-toggle" type="button" onClick={toggleLanguage}><Languages size={14} /> {isBn ? "EN" : "বাংলা"}</button>
      </header>
      <section className="blog-hero">
        <span className="section-label">{isBn ? "সম্পন্ন প্রকল্প / কাজের রেকর্ড" : "COMPLETED PROJECTS / WORK RECORD"}</span>
        <h1>{isBn ? "কাজের পরিসর, প্রমাণের সঙ্গে।" : "Completed work, with room for the evidence."}</h1>
        <p>{isBn ? "ক্লায়েন্টের পরিচয় বা ব্যক্তিগত তথ্য প্রকাশ না করে সিভিল সলিউশনের সম্পন্ন কাজের পরিসর ও কারিগরি ফলাফল দেখুন।" : "Explore Civil Solution work profiles without revealing client identities or private project details."}</p>
      </section>
      <section className="blog-list">
        <div className="blog-grid">
          {projects.map((project) => (
            <article className="blog-card completed-project-card" key={project.id}>
              <img src={project.image} alt="" />
              <span className="blog-category">{isBn ? project.bnCategory : project.category}</span>
              <h2>{isBn ? project.bnTitle : project.title}</h2>
              <p>{isBn ? project.bnCopy : project.copy}</p>
              <ul className="completed-project-details">
                {(isBn ? project.bnDetails : project.details).map((detail) => <li key={detail}><Check size={14} />{detail}</li>)}
              </ul>
              <span className="text-link">{isBn ? "কাজের পরিসর দেখুন" : "View work scope"} <ArrowUpRight size={15} /></span>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
