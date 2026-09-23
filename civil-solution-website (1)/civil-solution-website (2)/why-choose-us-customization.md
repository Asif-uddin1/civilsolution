# Why Choose Us Card Customization

## Purpose

The Why Choose Us section remains directly below About Us and now works as a visual credibility panel rather than four interchangeable cards. The content remains bilingual and evidence-safe: it explains the consultancy’s working approach without adding testimonials, awards, client totals, project outcomes, or unsupported guarantees.

## Changes made

| Area | Previous treatment | New treatment |
|---|---|---|
| Hierarchy | Four visually similar benefit cards | One featured lead card for site-focused assessment plus three compact supporting cards |
| Lead card | Shared card rhythm | Civil Turquoise-soft field-note panel with larger heading, larger body copy, and a closing drafting rule |
| Supporting cards | Equal visual weight | Smaller decision-support panels for reporting, requirement-led guidance, and communication |
| Metadata | Number only | Number plus bilingual field-note tag such as “Start with the site” or “সাইট থেকেই শুরু” |
| Interaction | Basic hover lift | Turquoise edge reveal, subtle lift/translation, shadow, focus-within state, and reduced-motion fallback |
| Mobile behavior | Four cards in a compressed grid | Featured card becomes the first full-width panel, followed by a clean single-column stack |

## Content principles

The first card leads with the firm’s site-first approach because it connects most directly to the brand proposition. The remaining cards describe how information is documented, how the scope follows the client’s question, and how the next conversation can continue. These are process-oriented benefits, not claims about scale or performance.

## Validation

The section was checked in English and in the existing bilingual layout system. Desktop and mobile full-page previews show the featured card, supporting stack, service section, process, projects, and contact area without visible overflow. TypeScript validation passes; the production build should be rerun before the checkpoint is published.

## Second redesign pass

The previous lead-card grid was replaced with a more distinctive surveyed composition. A left-side `WHY / 03` rail now carries the section identity and the right side presents one lead benefit row followed by three numbered evidence rows. Each row uses a field-note tag, a compact title/body pair, and an arrow marker. The structure now reads more like an engineering review sheet than a conventional feature-card grid.

The rail collapses into a compact stacked intro on mobile. Benefit rows remain full-width, bilingual strings retain readable wrapping, and hover/focus behavior adds a quiet turquoise edge and directional arrow response without changing the content claims.
