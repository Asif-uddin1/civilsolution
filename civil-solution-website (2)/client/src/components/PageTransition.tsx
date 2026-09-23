import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";

export default function PageTransition() {
  const { pathname } = useLocation();
  const { isBn } = useLanguage();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    setVisible(true);
    const timer = window.setTimeout(() => setVisible(false), 360);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  return (
    <div className={`page-transition ${visible ? "is-visible" : ""}`} aria-hidden="true">
      <div className="page-transition-mark">
        <span>CS</span>
        <i />
      </div>
      <strong>{isBn ? "সিভিল সলিউশন" : "CIVIL SOLUTION"}</strong>
    </div>
  );
}
