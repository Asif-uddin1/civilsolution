/* Warm Technical Atelier: shared field-note label for extracted homepage sections. */
import type { ReactNode } from "react";

export function SectionLabel({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <div className={`section-label ${light ? "section-label--light" : ""}`} style={{ fontSize: "12px" }}><span />{children}</div>;
}
