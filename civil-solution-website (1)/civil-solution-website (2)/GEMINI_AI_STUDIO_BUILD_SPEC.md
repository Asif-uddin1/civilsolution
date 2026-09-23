# Civil Solution Website — Gemini AI Studio Build Specification

## 1. Purpose of this document

This document is a complete reconstruction brief for Gemini AI Studio or another coding agent. It explains what the Civil Solution website is, why it was designed this way, what content and interactions it must contain, how the implementation should be structured, and how the finished result should be tested. Use it as the primary product, design, content, and engineering specification when rebuilding the site from scratch.

The final product is a professional bilingual website for a civil and structural engineering consultancy serving clients in Chattogram and surrounding areas in Bangladesh. The website must communicate trust, technical competence, clear services, project evidence handled with confidentiality, and easy consultation contact. It is a public marketing and inquiry website, not an internal dashboard and not a database application.

> **Important content rule:** Never invent client names, testimonials, ratings, project addresses, awards, credentials, measured results, structural guarantees, or confidential project details. If information is not verified, label it as a placeholder or omit it.

## 2. Business and audience context

The company is named **Civil Solution**. It is a civil and structural engineering consultancy associated with Chattogram, Bangladesh. Approved company facts used in the current content include that the firm has operated since 2017, has a team of approximately 10 people, has completed more than 40 site assignments, has served more than 30 clients, and works across Chattogram. These figures must be confirmed with the owner before public release and should be presented as company-provided facts rather than independent certification.

The primary audiences are property owners, building clients, developers, contractors, architects, and people who need technical advice before construction, testing, assessment, repair, or structural decision-making. Many visitors may not know the exact engineering service they need. The website therefore needs a direct consultation CTA, a service finder, plain-language explanations, and visible phone, email, WhatsApp, and map actions.

The website should feel credible to a technical professional but understandable to a non-engineer. It must not resemble a generic construction template, a government portal, or a dark corporate dashboard.

## 3. Product goals

The website must establish the company identity immediately, explain the service offering quickly, demonstrate a careful and evidence-based working approach, protect client confidentiality, and make it easy to start an inquiry. The desired visitor journey is:

```text
Recognize the firm → understand the promise → find a relevant service → see evidence-safe work stories → understand the process → contact the firm
```

The website should support the following measurable experience outcomes:

| Goal | Required implementation |
|---|---|
| Immediate identity | Logo, company name, service category, Chattogram context, and consultation CTA visible in the header or hero |
| Fast service discovery | Services section with matched imagery, short descriptions, categories, and links to detail routes |
| Technical trust | About Us, verified company facts, Why Choose Us, process explanation, and privacy-safe project stories |
| Low-friction contact | Phone, email, Gmail, WhatsApp, Google Maps, and inquiry handoff actions |
| Local accessibility | English/Bengali toggle with complete translation of the conversion path |
| Maintainability | JSON content catalogs separated from layout and reusable React components |
| Portability | Standard React/Vite project with no platform-specific runtime, database, authentication, or external build service |

## 4. Visual direction: Warm Technical Atelier

Use a design language called **Warm Technical Atelier**. It combines the warmth of architectural paper and material samples with the precision of technical drawings, field notes, survey lines, and structural grids.

The page background is a warm cream or pale paper tone. Structural brown is the main authority color for headings, navigation, borders, and strong text. Turquoise is the primary action color for buttons and selected states. Restrained orange is used for datum lines, small highlights, and directional marks. Blue or green may be used for WhatsApp or communication affordances, but communication colors must not overpower the engineering brand.

Use a restrained palette similar to the existing implementation:

| Token | Approximate role | Example value |
|---|---|---|
| `cream` | Main page canvas | `#FFF9D6` |
| `cream-deep` | Soft panels and separators | `#F5EDC2` |
| `brown` | Primary headings and authority | `#8A4B08` |
| `brown-dark` | Deep text and dark controls | `#4A2506` |
| `turquoise` | Primary action and active card | `#8DD6C9` |
| `orange` | Technical datum accents | `#E88B19` |
| `charcoal` | Body copy | `#5F5A4F` |
| `white` | Card surfaces and image frames | `#FFFEF5` |

Use a modern sans-serif display face with strong large headings and a Bengali-capable sans-serif for Bengali paragraphs and labels. Headings should be compact and editorial rather than decorative. Body copy must have comfortable line-height, especially in Bengali. Do not use overly thin text, low-contrast cream-on-cream copy, or dense all-caps paragraphs.

Use low-opacity background grids, thin drafting rules, corner marks, field-note labels, numbered metadata, and geometric button details. These elements should support hierarchy rather than become decoration. Maintain visible focus states and ensure every text/background combination passes practical contrast review.

## 5. Site map and routing

Use React Router DOM. The application has a homepage route and dynamic service-detail routes:

```text
/                         Homepage
/services/:slug           Dynamic service detail page
*                         Redirect to homepage or render a clear not-found state
```

The homepage should use stable section IDs so header links and CTA anchors work:

```text
#about
#why-us
#services
#projects
#contact
```

Every service-detail page must include a clear path back to the homepage, a breadcrumb, a service index, the active service state, a consultation CTA, and related services. Direct refreshes of `/services/soil-test` and every other valid slug must render correctly.

## 6. Homepage structure from top to bottom

### 6.1 Header and navigation

Create a responsive site header with the Civil Solution logo on the left. Desktop navigation should expose About, Why Us, Services, Projects, and Contact. Include a visible English/Bengali toggle labelled `EN / বাংলা`, a phone action, and a high-priority `Request a consultation` button. On mobile, collapse the navigation into an accessible menu while keeping the language toggle and consultation path easy to find.

The header must remain readable against the cream background, support keyboard navigation, and not become crowded when Bengali labels are active.

### 6.2 Hero

The hero is the first content visitors see. Use the central proposition:

> **Start with the condition. Build from the evidence.**

Support it with a concise description similar to: practical testing, surveying, structural assessment, and construction consultancy for clients in Chattogram and surrounding areas.

Provide two prominent actions: `Request a consultation` and `Explore services`. The hero image should show a relevant construction or survey scene, framed with architectural corner marks and a field-note overlay such as `FIELD NOTE / 01` and `Site-first technical support`. The image must have useful alt text and must not be presented as a verified Civil Solution project unless it is approved as such.

Add a small credibility line near the lower hero edge, such as the Chattogram location and a phrase about clear technical next steps. Keep the hero asymmetric on desktop and stacked on mobile.

### 6.3 Quick Client Paths

Create three or more action cards that help visitors choose a direction without understanding the full service taxonomy. Recommended paths are:

| Path | Purpose | Action |
|---|---|---|
| Discuss a project | For visitors who are unsure what they need | Jump to contact or inquiry |
| Find a service | For visitors who know the problem or test | Jump to services |
| Review project evidence | For visitors who want to understand prior work | Jump to projects |

Use the same editorial card system throughout the site: short metadata, clear title, one-sentence purpose, icon or visual mark, hover/focus treatment, and an arrow or directional CTA. Cards must stack cleanly on mobile.

### 6.4 About Us

Explain that Civil Solution provides practical civil and structural engineering support through testing, surveying, assessment, construction consultancy, and related technical services. The copy should communicate a site-first and evidence-based approach without promising guaranteed structural outcomes.

Place a verified-company-facts block after the About introduction. Current owner-provided facts are:

| Fact | Approved-style presentation |
|---|---|
| Established | Since 2017 |
| Team | About 10 people |
| Site work | More than 40 site assignments |
| Clients | More than 30 clients served |
| Coverage | Chattogram and surrounding areas |

Add a visible note that company figures are provided facts and should be confirmed before publication. Do not duplicate this statistics block inside Why Choose Us.

### 6.5 Why Choose Us

Place Why Choose Us directly after About Us. It should explain how Civil Solution works rather than repeat statistics. Use four evidence-safe benefit cards, for example:

1. **Start with the actual condition:** clarify what is known before recommending a next step.
2. **Keep the scope practical:** align testing, surveying, assessment, or consultancy with the project question.
3. **Document the decision:** organize observations and technical information so clients can discuss the next move.
4. **Respect private work:** describe confidential assignments without exposing client identities or sensitive details.

Use one featured lead card and three supporting cards if that produces a stronger hierarchy. Keep all claims defensible and bilingual.

### 6.6 Services

The homepage services section is a scannable catalog. Each card must include a matched image, category metadata, number, bilingual title, short bilingual description, and a link to `/services/:slug`. Cards must have equal height at desktop widths and balanced internal spacing. Images must be relevant to the service subject.

The current service catalog contains nine services:

| Slug | English title | Category |
|---|---|---|
| `soil-test` | Soil Test | Testing |
| `digital-land-survey` | Digital Land Survey | Survey |
| `integrity-test` | Integrity Test | Testing |
| `pile-load-test` | Pile Load Test | Testing |
| `core-cutting-scanning` | Core Cutting & Scanning | Assessment |
| `construction-consultancy` | Construction Consultancy | Advice |
| `retrofitting` | Retrofitting | Advice |
| `load-checking` | Load Checking | Assessment |
| `detailed-engineering-assessment` | Detailed Engineering Assessment | Assessment |

DEA must be described as a detailed technical evaluation of a building or structure to assess its structural condition, strength, defects, safety, and necessary repair or retrofitting requirements. Avoid presenting DEA as a guarantee or regulated certification unless the engineer confirms the exact scope.

### 6.7 Process

Explain a simple client journey:

```text
01 Understand the question
02 Review available information
03 Define the appropriate scope
04 Conduct the agreed technical work
05 Organize findings and discuss next steps
```

The process should communicate clarity without implying that every service follows the same field or laboratory method. Use wording such as “as agreed,” “within the confirmed scope,” and “where applicable.”

### 6.8 Projects and work stories

Use six privacy-safe project stories. Each record should describe the work, related service, general project type, and approved end-result wording without naming the client, revealing a private address, or publishing confidential deal details.

The project section must clearly distinguish between:

- **Authorized Civil Solution imagery or work reference:** retain source and permission notes.
- **Illustrative reference imagery:** label it clearly as illustrative and never imply that the image proves a Civil Solution assignment.
- **Confidential work story:** describe only the engineering scope and approved outcome.

Use a JSON catalog for project records. Each record should include a stable ID, localized title, localized summary, service relation, image path, alt text, status or confidentiality label, source URL, and permission note. Do not add fabricated testimonials, star ratings, client logos, or “happy client” quotes.

### 6.9 Contact and inquiry handoff

The contact section must be a strong conversion point. Include a short explanation, phone number, email address, WhatsApp action, Google Maps link, and inquiry form.

The form should require name, phone, and project message. Email should remain optional unless the client specifically requires it. On submission, build one consistent inquiry message and offer these handoff options:

1. Open the visitor’s default email application with a prefilled message.
2. Open a prefilled Gmail compose window.
3. Open WhatsApp with a prefilled message.

No backend or database is required for this visitor flow. Show clear validation and success feedback. Do not claim that the message was received by the company unless the handoff action actually completed. Include an accessible Google Maps fallback link so the contact information remains usable if a map embed fails.

The floating WhatsApp button must be fixed, accessible, mobile-safe, visually recognizable, and positioned so it does not cover the form submit button or important content.

### 6.10 Footer and sharing

The footer should repeat the Civil Solution identity, useful contact actions, location context, and navigation escape routes. Include bilingual social share actions for Facebook, WhatsApp, and copy-link. Share controls should use the current page URL and provide feedback when a link is copied. Avoid external social SDKs unless they are genuinely required.

## 7. Service-detail page specification

Each service page uses the same reusable layout with localized content:

1. Back-to-home control and language toggle.
2. Breadcrumb: Home → Services → current service.
3. Scrollable or compact service index listing all services.
4. Active service highlighted with a clear selected state.
5. Hero title, service category, short introduction, matched image, and consultation CTA.
6. Scope section explaining what the service supports.
7. Useful-when section explaining the client situation it addresses.
8. Working-plan section with four localized steps.
9. Deliverables section stating what the client may receive within the agreed scope.
10. Preparation note explaining what information the client should provide.
11. Contact actions for phone and WhatsApp.
12. Related-services section with two or three genuinely adjacent services.
13. Footer escape route back to the service list or homepage.

Suggested service relationships:

| Service | Related services |
|---|---|
| Soil Test | Pile Load Test, Digital Land Survey |
| Digital Land Survey | Soil Test, Construction Consultancy |
| Integrity Test | Core Cutting & Scanning, Retrofitting |
| Pile Load Test | Soil Test, Load Checking |
| Core Cutting & Scanning | Integrity Test, Retrofitting |
| Construction Consultancy | Digital Land Survey, Load Checking |
| Retrofitting | Integrity Test, Core Cutting & Scanning |
| Load Checking | Pile Load Test, Construction Consultancy |
| Detailed Engineering Assessment | Integrity Test, Retrofitting |

The service detail content must be evidence-safe. Explain that the exact method, testing scope, access, safety arrangement, and deliverables are confirmed according to the site and project requirement.

## 8. Bilingual behavior

Implement language state in React and persist it in `localStorage` under `civil-language`. The toggle must switch the complete conversion path, not only headings. Translate navigation, hero, buttons, About, verified facts, Why Choose Us, service cards, service detail pages, project labels, process, form fields, validation messages, contact actions, footer, share controls, and confidentiality notes.

English and Bengali must be semantically equivalent. Do not mix languages unpredictably. Keep technical terms in English parentheses when that improves clarity, for example `Detailed Engineering Assessment (DEA)`. Test long Bengali strings on 390px-wide screens. The language toggle must have an accessible label that states the destination language and must not reset the current route or form values.

## 9. Motion and interaction requirements

Use restrained motion only. Implement route-aware loading feedback, scroll-reveal animations, service-card hover states, button press feedback, arrow movement, share-control transitions, and floating WhatsApp interaction states. Animate opacity and transform rather than layout dimensions. Keep normal interactions under approximately 300 milliseconds.

Respect `prefers-reduced-motion`. When reduced motion is enabled, content must appear immediately, route transitions must not create disorientation, and hover effects should not be essential for understanding. Every interactive card must also have a visible keyboard focus state.

## 10. Recommended implementation architecture

Use a standard React/Vite project with TypeScript and React Router DOM. Do not use a database, Express server, OAuth, tRPC, Drizzle, proprietary runtime plugin, or platform-specific storage proxy.

Recommended package scripts:

```json
{
  "dev": "vite --host",
  "build": "vite build",
  "preview": "vite preview",
  "check": "tsc --noEmit",
  "test": "vitest run"
}
```

Recommended source structure:

```text
client/
  index.html
  public/
    netlify-assets/       local WebP image assets
  src/
    App.tsx               React Router routes
    main.tsx              React entry point
    index.css             Tailwind, DaisyUI, tokens, responsive CSS
    components/
      PageTransition.tsx
      home/
        AboutSection.tsx
        QuickClientPathsSection.tsx
        SectionLabel.tsx
        WhyChooseUsSection.tsx
    content/
      home-content.json
      services.json
      projects.json
    hooks/
      useReveal.ts
    lib/
      inquiry.ts
      inquiry.test.ts
      share.ts
      share.test.ts
    pages/
      Home.tsx
      ServiceDetail.tsx
vite.config.ts
vitest.config.ts
README.md
```

Use the `@` alias for `client/src`. Store content in JSON where practical, but map icon-name strings to Lucide React components in the UI layer rather than attempting to serialize React components. Keep service slugs stable because they are route identifiers.

Use local direct image paths such as `/netlify-assets/soil-testing-laboratory-india.webp`. Do not use platform storage paths such as `/manus-storage/...`. Keep images compressed, provide meaningful localized alt text, and retain source/credit metadata in the content record or project source notes.

## 11. Build process for Gemini AI Studio

Follow this implementation order rather than generating one giant page first.

### Step 1: Establish the project

Create a React 19 or current React + Vite + TypeScript project. Install React Router DOM, Tailwind CSS 4, DaisyUI, Lucide React, Sonner, Vitest, and the required Vite plugins. Configure Vite with the `client` directory as the root, a `client/src` alias, and a normal local development server. Do not add a backend or platform integration.

### Step 2: Create the visual system

Implement the cream, brown, turquoise, orange, charcoal, and white design tokens in `client/src/index.css`. Add the paper grid, architectural rules, card surfaces, button corner details, responsive containers, focus styles, and reduced-motion rules before building page sections.

### Step 3: Create the content catalogs

Create `services.json`, `projects.json`, and `home-content.json` with bilingual records. Validate that every service has a slug, title, Bengali title, description, image, alt text, category, and related-service mapping. Validate that every project has a privacy status and source/permission note.

### Step 4: Build reusable components

Create SectionLabel, PageTransition, AboutSection, QuickClientPathsSection, and WhyChooseUsSection. Keep the page component responsible for language state, route navigation, form state, and section composition. Pass localized content and narrow callbacks into child components.

### Step 5: Build the homepage

Implement the header, hero, quick paths, About, verified facts, Why Choose Us, services, process, project stories, contact, footer, share controls, and WhatsApp action in the approved order. Keep section IDs stable.

### Step 6: Build service routes

Implement `ServiceDetail.tsx` with `useParams` and `useNavigate`. Create the breadcrumb, service index, active state, localized scope/process/deliverables/preparation content, related-service map, image credit, and consultation actions. Test every service slug.

### Step 7: Add handoff interactions

Implement `buildInquiryText` and validate required fields. Build email-app, Gmail, and WhatsApp handoff URLs. Implement share-link helpers for Facebook, WhatsApp, and copy-link. Add bilingual toast feedback without claiming backend receipt.

### Step 8: Add accessibility and responsive behavior

Test keyboard navigation, focus rings, menu behavior, language switching, alt text, button labels, form errors, contrast, reduced motion, and mobile safe-area spacing. Test at approximately 390px, 768px, and 1280px widths.

### Step 9: Validate and package

Run the following commands:

```bash
pnpm install
pnpm check
pnpm test
pnpm build
pnpm preview
```

Confirm that the homepage, every service route, language toggle, contact handoffs, map link, WhatsApp link, share controls, and local images work. Inspect the browser console for errors. Confirm that no source file imports `wouter`, `@shared`, `trpc`, `server`, `drizzle`, OAuth, Manus storage, or platform runtime packages.

## 12. Acceptance checklist

| Area | Acceptance condition |
|---|---|
| Routing | Homepage and all nine service slugs work on direct navigation and refresh |
| Language | English and Bengali are complete, equivalent, persistent, and mobile-safe |
| Services | Cards are balanced, images are relevant, and every card reaches the correct detail page |
| Service details | Breadcrumb, active index, scope, process, deliverables, preparation, related services, and CTA exist on every route |
| Evidence | Project stories are privacy-safe and images are authorized or clearly illustrative |
| Contact | Phone, email, Gmail, WhatsApp, map, and inquiry validation work without a backend |
| Design | Warm Technical Atelier direction is consistent across desktop and mobile |
| Accessibility | Focus states, labels, alt text, contrast, keyboard access, and reduced motion are present |
| Portability | No Manus, database, server, OAuth, tRPC, Drizzle, or proprietary storage dependency remains |
| Quality | `pnpm check`, `pnpm test`, and `pnpm build` pass |

## 13. Information that still requires owner confirmation

Before public publication, confirm the company logo file, phone number, email address, office map location, WhatsApp number, Bengali translations, company statistics, project-image permissions, project status labels, and whether each project story represents completed work, ongoing work, or illustrative content. Confirm that any public Facebook image may be reused on the website and preserve the source URL and permission record.

Do not add a CMS, admin panel, online payment system, customer login, or database unless the owner requests a separate phase. The current website is intentionally a static client-side marketing and inquiry experience.

## 14. Final instruction for Gemini AI Studio

Build the website as a polished, responsive, bilingual React/Vite application following every requirement in this document. Prioritize clarity, verified content, direct consultation actions, and maintainable code. Do not simplify the site into a generic landing page. Do not invent missing evidence. Keep the homepage modular, keep the content in JSON catalogs, use React Router for service pages, use local direct image files, and provide a complete README with setup and validation commands.
