# Civil Solution Homepage Redesign Plan

## Redesign direction

The homepage will follow a client decision journey rather than a service catalogue sequence. A visitor should first understand what Civil Solution does, then see why the consultancy is credible, then choose a service, understand the working method, review evidence-safe project examples, and finally submit an inquiry.

The visual direction remains **Warm Technical Atelier**: cream paper surfaces, structural brown, Civil Turquoise actions, orange datum markers, left-aligned editorial hierarchy, drafting rules, and restrained motion.

## New sequence from start to finish

| Step | Section | Anchor or component | Move and purpose |
|---:|---|---|---|
| 1 | Header | Global header | Remains first. Keeps brand mark, language toggle, phone number, and consultation CTA immediately visible. |
| 2 | Hero | `hero-section` | Remains first in the page body. Leads with the core proposition, supporting image, Chattogram context, and primary consultation action. |
| 3 | Quick client paths | `client-route` | Remains directly after the hero. Gives three clear next actions: talk about a project, find a service, or review project evidence. |
| 4 | Trust statement | `trust-section` | Remains early, but now acts as the credibility bridge between the hero and the deeper content. It explains why site conditions and clear documentation matter. |
| 5 | About Us | `AboutSection` / `#about` | Moves before Services. Visitors learn who Civil Solution is and how the consultancy approaches site and structural questions before choosing a technical scope. |
| 6 | Why Choose Us | `WhyChooseUsSection` / `#why-us` | Remains directly below About Us. Four evidence-safe benefit cards reinforce the consultancy’s working style without inventing client counts, awards, or outcomes. |
| 7 | Services | `services-section` / `#services` | Moves after credibility. The eight services now answer the visitor’s next question: “Which technical scope fits my project?” |
| 8 | Process | `process-section` | Remains after Services. It explains what happens after a visitor selects a service: discuss, plan, conduct, and explain. |
| 9 | Project evidence | `projects-section` / `#projects` | Remains after Process. Sample-draft labels make the evidence status clear while showing the type of deliverables and project stories the client can later approve. |
| 10 | Contact | `contact-section` / `#contact` | Remains last in the main content. The map, phone, email, WhatsApp, and inquiry form become the final conversion step after context has been established. |
| 11 | Footer | Global footer | Remains final. Provides the compact brand lockup, service summary, return-to-top action, and domain placeholder. |

## Visual hierarchy changes

The first screen should prioritize the hero proposition and practical CTA. About Us and Why Choose Us should use the existing reveal treatment as a credibility sequence. Services should become the main decision index after credibility, with numbered service metadata and direct detail-page links. Process and Projects should feel like supporting evidence rather than competing hero sections. The contact area should remain visually strong but appear only after the visitor understands the consultancy and its scope.

## Navigation behavior

The existing anchors remain stable: `#about`, `#why-us`, `#services`, `#projects`, and `#contact`. Only the document order changes. English and Bengali labels continue to switch together, and service-detail routes remain `/services/:slug`.

## Content safety

No client totals, project outcomes, credentials, testimonials, or technical guarantees are added. Existing sample project content remains explicitly marked for verification before publication. The new order changes hierarchy and scanning, not factual claims.

## Validation checklist

The redesign will be checked at desktop and mobile widths, in English and Bengali, with special attention to the first viewport, anchor scrolling, section spacing, card alignment, service links, service-detail escape routes, reduced-motion behavior, and production build output.
