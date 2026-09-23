# Implementation checklist

- [x] Update the reusable civil-engineering website-refinement skill with bilingual UX, map integration, and WhatsApp guidance.
- [x] Add translation workflow guidance and validate the skill again.
- [x] Validate the updated skill package.
- [x] Add English/Bengali language state and navigation toggle.
- [x] Add bilingual labels for the primary navigation and key contact CTA content.
- [x] Translate all remaining service descriptions, About Us content, process labels, and contact/form microcopy into Bengali.
- [x] Add an interactive Google Maps pin in the contact section using the existing project MapView component.
- [x] Add a floating WhatsApp button with an approved client number and prefilled inquiry message.
- [x] Add responsive and accessibility states for the toggle, map, and floating action.
- [x] Test longer Bengali strings at mobile widths and preserve language state across interactions.
- [x] Run TypeScript checks and production build.
- [x] Capture desktop and mobile screenshots for final verification.
- [x] Save a new checkpoint and deliver the updated project and skill.
- [x] Define the client-first section order and visual priority.
- [x] Make the hero contact actions, services, portfolio, About Us, and location more prominent.
- [x] Improve section labels, CTA hierarchy, service scanning, project evidence, and contact visibility.
- [x] Validate desktop and mobile ordering, accessibility, and production build.
- [x] Improve service-card scanability, hierarchy, and click affordance.
- [x] Add clearer service metadata and a consistent detail interaction.
- [x] Validate the services section at desktop and mobile widths.
- [x] Provide three service-section recommendations to the client.
- [x] Audit all hardcoded English strings and mixed-language interface elements.
- [x] Add complete Bangla and English states for services, About, process, projects, contact, forms, footer, and modal content.
- [x] Ensure service metadata, technical labels, and action text switch with the active language.
- [x] Validate English-only and Bangla-only screenshots and production build.
- [x] Define the dedicated service-detail page content model and routes.
- [x] Draft bilingual scope, client need, process, deliverables, preparation, and CTA content for each major service.
- [x] Implement responsive service-detail pages with shared navigation and language toggle.
- [x] Link service cards and service finder actions to the correct detail pages.
- [x] Validate service-page navigation, language switching, mobile layout, and production build.
- [x] Shortlist free-to-use Bangladesh or Chattogram-relevant supporting image sources.
- [x] Record source URLs, license notes, and attribution requirements.
- [x] Upload approved image assets to webdev storage and avoid repeated imagery.
- [x] Integrate distinct imagery into the service-detail pages with responsive crops and accessible alt text.
- [x] Validate image loading, image contrast, mobile layout, and production build.
- [x] Map each service to a visually relevant image subject.
- [x] Source and verify free-to-use service-specific images with licensing notes.
- [x] Replace generic service imagery with matched soil, survey, concrete, pile, retrofit, and supervision visuals.
- [x] Add bilingual alt text and source credits for every service image.
- [x] Validate image relevance, licensing, responsive crops, and production build.
- [x] Extend the reusable skill with breadcrumb and related-service navigation guidance.
- [x] Validate the updated reusable skill package.
- [x] Add bilingual breadcrumbs to every service-detail page.
- [x] Add bilingual related-services sections with correct route links to every service-detail page.
- [x] Validate navigation, language switching, responsive layout, TypeScript, and production build.
- [x] Add a bilingual service-index sidebar listing all services on every service-detail page.
- [x] Highlight the active service and provide accessible keyboard/focus states.
- [x] Add relevant service-specific thumbnails to related-service cards.
- [x] Validate desktop sidebar, mobile collapse/stacking, card imagery, language switching, and production build.
- [x] Audit service-detail dimensions, spacing, dividers, and typography at desktop/mobile widths.
- [x] Normalize hero, sidebar, content, related-card, and footer spacing.
- [x] Improve English and Bangla font sizing, line-height, letter spacing, and wrapping.
- [x] Tune divider lines and avoid awkward gaps or visual collisions.
- [x] Validate readability in both languages and run TypeScript/production build checks.
- [x] Make the desktop service index independently scrollable with a usable max height.
- [x] Preserve active-service visibility, keyboard focus, and scrollbar styling.
- [x] Keep the mobile service index compact and non-obstructive.
- [x] Validate desktop/mobile scrolling and run TypeScript/production build checks.
- [x] Audit the homepage service-card markup and available matched service images.
- [x] Add relevant images to all homepage service cards.
- [x] Strengthen homepage card hierarchy, metadata, and detail-page links.
- [x] Validate English/Bangla card content and desktop/mobile spacing.
- [x] Audit homepage service-card height, image, content, and CTA alignment.
- [x] Normalize all service cards to equal height with consistent internal spacing.
- [x] Align metadata, titles, descriptions, and CTAs across the card grid.
- [x] Validate evenly matched cards at desktop and mobile widths.
- [x] Define evidence-safe Why Choose Us content without unverified claims.
- [x] Audit current homepage, Why Choose Us section, service cards, service pages, and contact section for visible defects.
- [x] Identify mixed-language, incorrect-contact, spacing, navigation, image, and responsive issues.
- [x] Repair confirmed problems without inventing client, project, or experience numbers.
- [x] Add safe credibility-stat placeholders or verified wording only after client confirmation.
- [x] Re-run TypeScript/build checks and desktop/mobile visual validation.
- [x] Audit homepage and service-detail section order, alignment, and scroll behavior.
- [x] Align hero, Why Us, About, service cards, project cards, contact, sidebar, and related cards.
- [x] Remove any unintended scroll-position or viewport artifacts in preview and fresh loads.
- [x] Validate English/Bangla typography and responsive alignment at desktop and mobile widths.
- [x] Run final TypeScript/build checks and save an aligned checkpoint.
- [x] Add a bilingual Why Choose Us section directly after About Us.
- [x] Validate section order, English/Bangla content, responsive layout, and production build.
- [x] Verify the Why Choose Us JSX section order directly after About Us.
- [x] Confirm rendered placement and manually correct the section if needed.
- [x] Run final checks and save a new checkpoint for the placement correction.
- [x] Remove the unsupported Why Us statistics strip.
- [x] Redesign Why Choose Us as four benefit cards directly below About Us.
- [x] Preserve complete English/Bangla content and responsive alignment.
- [x] Run TypeScript/build checks and save the redesigned-section checkpoint.
- [x] Audit the monolithic Home.tsx component and current routes.
- [x] Define reusable homepage section components and shared content boundaries.
- [x] Extract hero, quick paths, services, About, Why Us, process, projects, contact, and footer sections.
- [x] Preserve bilingual state and route navigation after extraction.
- [x] Run TypeScript/build checks and responsive validation before saving a refactor checkpoint.
- [x] Run TypeScript and production build checks for the current revision.
- [x] Audit homepage and service-detail routes for runtime and navigation errors.
- [x] Test English/Bangla consistency and language persistence.
- [x] Test service-detail images, source links, map, WhatsApp, and contact form behavior.
- [x] Check desktop/mobile layouts and browser console/network errors.
- [x] Fix confirmed bugs, re-test, and save a bug-fix checkpoint.

Audit note: No current blocking bugs were reproduced. The production build reports only a non-blocking bundle-size warning; historical HMR CSS errors remain in logs from earlier edits but are not present in the current build or screenshots.

- [x] Extract bilingual service and project data into a dedicated JSON-backed content module.
- [x] Update homepage and service-detail consumers to use the structured content module.
- [x] Add reduced-motion-safe scroll-reveal animations to About Us and Why Choose Us.
- [x] Add restrained hover and focus effects to the extracted About Us and Why Choose Us cards.
- [x] Validate desktop/mobile rendering, language switching, TypeScript, production build, and save a checkpoint.

- [x] Audit the current homepage order against the client decision journey.
- [x] Document the redesigned start-to-finish section sequence and rationale.
- [x] Re-arrange the homepage sections and update navigation anchors without losing bilingual behavior.
- [x] Refine visual hierarchy, spacing, and CTA progression across the redesigned flow.
- [x] Validate desktop/mobile alignment, English/Bangla rendering, build checks, and save a redesign checkpoint.

- [x] Audit homepage sections by client purpose and conversion value.
- [x] Prepare a keep-combine-move recommendation for homepage content.
- [x] Confirm the selected homepage sections before implementation.
- [x] Implement the approved simplified homepage layout and validate responsive bilingual behavior.

- [x] Identify the newly introduced homepage card groups and their current content contracts.
- [x] Define the card hierarchy, bilingual labels, metadata, and interaction treatment.
- [x] Customize the selected homepage cards without breaking service-detail navigation.
- [x] Validate desktop/mobile card alignment, English/Bangla rendering, hover/focus states, and build checks.

- [x] Audit the current Why Choose Us card structure and styling.
- [x] Define the lead-card hierarchy and bilingual benefit-card treatment.
- [x] Customize Why Choose Us cards while preserving evidence-safe claims and section order.
- [x] Validate responsive, bilingual, hover/focus, reduced-motion, and build behavior.

- [x] Initialize or update the reusable civil-engineering website-refinement skill package.
- [x] Document the reusable workflow, evidence-safe content rules, bilingual patterns, card patterns, and validation steps.
- [x] Validate the reusable skill package with the skill validation script.
- [x] Audit and customize the Quick Client Paths cards using the Why Choose Us editorial system.
- [x] Validate bilingual card rendering, responsive interactions, TypeScript, production build, and save a checkpoint.

- [x] Audit the current Why Choose Us composition after the previous card customization.
- [x] Define a new bilingual section structure and visual hierarchy.
- [x] Implement the redesigned Why Choose Us section without adding unsupported claims.
- [x] Validate desktop/mobile, English/Bengali, focus, reduced motion, and production build behavior.

- [x] Verify the supplied Google Maps firm location and extract only confirmed address details.
- [x] Audit all current address, map, footer, and contact references.
- [x] Update confirmed address text and map-opening links consistently.
- [x] Validate the contact section and save an address-update checkpoint.

- [x] Audit all button variants and key button usage across homepage and service pages.
- [x] Define the creative architectural button language and hierarchy.
- [x] Implement primary, secondary, text, card, language, and floating-action states.
- [x] Validate bilingual wrapping, keyboard focus, reduced motion, responsive sizing, and production build.

- [x] Audit the current button appearance and click feedback after the architectural pass.
- [x] Define a friendlier, more playful CTA treatment that still fits the engineering brand.
- [x] Implement brighter hover states, arrow motion, corner details, and stronger click affordance.
- [x] Validate English/Bengali labels, mobile sizing, keyboard focus, reduced motion, and production build.

- [x] Audit source comments and code notes for redundancy.
- [x] Remove unnecessary notes while retaining concise architecture, design, content-safety, and integration markers.
- [x] Validate TypeScript, production build, and unchanged runtime behavior.

- [x] Audit current homepage credibility/statistics, DEA content, and confidentiality messaging.
- [x] Define an evidence-safe stats strip and DEA/confidentiality presentation.
- [x] Confirm public approval for the supplied firm figures before publishing them as claims.
- [x] Implement approved homepage updates and validate bilingual responsive behavior.

- [x] Audit the existing inquiry form, email link, WhatsApp link, and floating WhatsApp action.
- [x] Define email and WhatsApp submission behavior without storing visitor data in a database.
- [x] Implement the dual-contact inquiry flow with bilingual labels and privacy-safe messaging.
- [x] Validate links, mobile behavior, language switching, TypeScript, production build, and save a checkpoint.

- [x] Review the firm’s public Facebook imagery and confirm whether images are authorized for website reuse.
- [x] Draft five or six Chattogram-relevant illustrative project stories tied to approved Civil Solution services.
- [x] Add explicit illustrative/confidentiality labels and bilingual project-story copy.
- [x] Replace or assign only permission-safe, attributed images and validate the project section.

- [x] Draft six work-only project stories with no client names, addresses, identities, or private details.
- [x] Describe only the engineering work, service scope, and approved end result for each story.

- [x] Upgrade the static project with backend, database, and user-management capability.
- [x] Define a privacy-conscious inquiry schema and server endpoint.
- [x] Replace prototype-only inquiry handling with persistent submission storage.
- [x] Validate database writes, error states, bilingual UI, production build, and document setup.

- [x] Audit why the current mailto inquiry action is not working in the visitor’s environment.
- [x] Clarify email behavior and provide a reliable WhatsApp fallback without unnecessary database dependence.
- [x] Fix or document the email handoff, validate bilingual contact states, and run the production build.

- [x] Remove database persistence as a prerequisite for the visitor email/WhatsApp handoff while preserving any existing database tables.
- [x] Validate the updated success state in English and Bengali, including email-app, Gmail, and WhatsApp actions.
- [x] Capture responsive evidence and save a checkpoint only after the non-database contact flow is confirmed.

- [x] Add approved company credibility figures: established 2017, team of about 10, 40+ site assignments, 30+ clients served, and Chattogram coverage.
- [x] Add DEA — Detailed Engineering Assessment as an official bilingual service.
- [x] Replace project placeholders with six work-only Chattogram-relevant stories using authorized Civil Solution imagery.
- [x] Add confidentiality-safe labels, work descriptions, and approved end-result wording.
- [x] Validate images, bilingual rendering, responsive layout, tests, production build, and save a checkpoint.

- [x] Move CS / VERIFIED COMPANY FACTS into the About Us section after its introduction.
- [x] Keep Why Choose Us focused on working approach and evidence-safe benefits without duplicate statistics.
- [x] Validate About Us placement, bilingual wrapping, mobile layout, build, and checkpoint.

- [x] Audit desktop and mobile fit for section widths, spacing, card heights, image crops, buttons, navigation, and floating WhatsApp action.
- [x] Audit English and Bengali wrapping for the homepage, About Us facts, service index, and DEA detail route.
- [x] Apply only necessary responsive, spacing, overflow, or alignment corrections; preserve approved content and visual direction.
- [x] Re-run TypeScript, tests, production build, and responsive route validation after the minimal corrections.
- [x] Document the minimal fit-and-alignment changes and save a new checkpoint.

- [x] Fix English Chattogram overflow in the About Us verified-company-facts cell without breaking Bengali rendering.
- [x] Validate the facts grid at desktop and mobile widths in both English and Bengali modes.
- [x] Save a checkpoint for the facts-grid fit correction.

- [x] Audit whether the current Soil Test image clearly shows laboratory soil testing with proper equipment.
- [x] Source a credible online reference image with a clear license or attribution record.
- [x] Replace the Soil Test image and update English/Bengali alt text, credit, and source URL.
- [x] Validate all service-section image mappings and responsive crops after the replacement.
- [x] Save a checkpoint for the approved Soil Test image update.

- [x] Verify the latest visual-editor typography and footer edits against the intended design.
- [x] Remove duplicated inline style props and invalid component props while preserving intended font-size and font-weight changes.
- [x] Re-run TypeScript, tests, production build, and desktop/mobile visual checks.
- [x] Save a checkpoint for the verified visual-editor cleanup.

- [x] Verify the latest Quick Client Paths, About Us, Why Choose Us, and Services visual-editor changes against the intended design.
- [x] Remove duplicated inline styles and invalid props while preserving intended card colors and label font sizes.
- [x] Scope service-section color changes to the intended cards or section only, not every nested element.
- [x] Re-run TypeScript, tests, production build, and desktop/mobile visual checks.
- [x] Save a checkpoint for the verified color and typography cleanup.

- [x] Audit conflicting card-color overrides across Quick Client Paths, Why Choose Us, and Services.
- [x] Define one conflict-free palette using section classes or data-driven variants rather than repeated inline overrides.
- [x] Create a dedicated editable services JSON module containing bilingual copy, slugs, icons, images, metadata, and detail-page content.
- [x] Reconnect homepage service cards, service index, detail routes, and related services to the JSON catalog.
- [x] Validate bilingual rendering, card colors, service routes, and future-service data extensibility.
- [x] Document how the owner can add a service and save a checkpoint.

- [x] Fix inquiry text so line breaks render as separate lines in email, Gmail, and WhatsApp handoffs.
- [x] Keep the email field optional while retaining name, phone, and project message as required fields.
- [x] Validate subject, recipient, encoded body, and all three inquiry handoff actions.
- [x] Save a checkpoint for the inquiry-formatting fix.

- [x] Add a Netlify-compatible client-only build command that does not bundle the Express server.
- [x] Add SPA fallback and Netlify deployment configuration for homepage and service-detail routes.
- [x] Create a client handoff guide explaining Netlify import, build settings, and current frontend-only limitations.
- [x] Validate the Netlify build output, service routes, bilingual toggle, inquiry handoffs, and mobile layout.
- [x] Save a checkpoint for the Netlify-ready client package.

- [x] Optimize Netlify public assets below the checkpoint size limit and update all source references.
- [x] Rebuild and revalidate the Netlify publish directory after asset optimization.

- [x] Add a smooth page-loading transition with reduced-motion support and no route blocking.
- [x] Add bilingual footer share actions for Facebook, WhatsApp, and copying the website link.
- [x] Validate share URLs, copy feedback, loading behavior, footer responsiveness, and Netlify build compatibility.
- [x] Save a checkpoint for the loading and social-share additions.

- [x] Fix the Netlify missing `client/src/_core/hooks/useAuth` build dependency without requiring Manus authentication.
- [x] Remove or neutralize unresolved Manus analytics placeholders for standalone Netlify builds.
- [x] Add the requested smooth loading transition and bilingual footer share actions after the build fix.
- [x] Re-run Netlify client build, route, responsive, and interaction validation.
- [x] Save a checkpoint for the Netlify build fix and UX additions.

- [x] Audit all image references for downloaded-project and Netlify reliability.
- [x] Ensure homepage, service catalog, project stories, and detail routes use direct deployable image files.
- [x] Validate image loading and save a checkpoint for the direct-image fix.

- [x] Review the client-authorized Facebook project imagery and record source URLs and attribution notes.
- [x] Create a dedicated editable project-stories JSON module with privacy-safe bilingual scope and result fields.
- [x] Replace generic project-proof images with approved Facebook imagery where suitable.
- [x] Validate project cards, modal details, image loading, bilingual labels, and responsive layout.
- [x] Save a checkpoint for the Facebook project-proof and JSON refactor.

- [x] Audit public homepage, project cards, modals, and bilingual content for internal draft-instruction text.
- [x] Remove placeholder comments such as “Sample project layout — replace with verified project information and publication permission.”
- [x] Preserve legitimate illustrative-reference and confidentiality wording while keeping public copy client-facing.
- [x] Validate English/Bengali rendering, build, tests, and save a cleanup checkpoint.

- [x] Verify whether the reported project-section sentence remains in Home.tsx after the prior public-copy cleanup.
- [x] Remove it manually only if still present, without removing the legitimate confidentiality notice.
- [x] Re-run checks and save a checkpoint for the verified cleanup state.

- [x] Verify the two reported project-section no-change edits against the current Home.tsx source.
- [x] Keep the approved confidentiality and work-scope wording only if it remains intentionally public-facing.
- [x] Re-run checks and save a checkpoint for the verified editor state.

- [x] Audit current reveal, hover, button, and route-transition motion for duplication or conflicts.
- [x] Add restrained section reveals, service/project card hover motion, and clearer button feedback.
- [x] Preserve reduced-motion behavior and avoid layout-shifting animations.
- [x] Validate desktop/mobile rendering, TypeScript, tests, and Netlify client build.
- [x] Document the animation pass and save a checkpoint.

- [x] Audit all Manus-specific imports, packages, env variables, storage paths, auth, analytics, and runtime plugins.
- [x] Define a standalone React/Vite entry with ordinary JSX components and local JSON content catalogs.
- [x] Move all website images into local public assets and remove Manus storage references.
- [x] Configure Tailwind and DaisyUI-compatible styling without Manus build/runtime dependencies.
- [x] Preserve bilingual toggle, routes, inquiry handoffs, animations, service/project JSON, and Netlify deployment.
- [x] Validate the portable build and document VS Code setup and handoff steps.
- [x] Save a checkpoint for the standalone portable project.

- [x] Replace the current routing approach with standard react-router-dom routes for home and service-detail pages.
- [x] Preserve service slug navigation, direct route refreshes, bilingual state, and Netlify SPA fallback.

- [x] Remove Netlify-specific configuration, redirects, handoff files, and deployment-only references from the standalone rebuild.
- [x] Remove remaining Manus runtime, auth, analytics, storage, server, and connector dependencies from the active project.
- [x] Use standard React Router DOM routes with local JSX, JSON, and image assets.
- [x] Configure ordinary Node.js scripts, Tailwind CSS, DaisyUI, and Vite for VS Code development.
- [x] Validate the standalone app and document `npm`/`pnpm` setup for the client.
- [x] Save a checkpoint for the standalone VS Code project.


## Standalone VS Code handoff

- [x] Remove remaining Manus-specific infrastructure and unused template files
- [x] Confirm React Router migration in ServiceDetail
- [x] Ensure Tailwind CSS and DaisyUI are configured for the portable Vite project
- [x] Add a clean VS Code setup README with scripts and project structure
- [x] Run TypeScript check, production build, and Vitest suite
- [x] Verify desktop and mobile routes in the browser preview
- [x] Save a client-handoff checkpoint

Handoff scope: frontend-only React/Vite project with no database, server API, OAuth, tRPC, Drizzle, or Manus runtime services.

- [x] Fix Vite shared-preview host blocking for the current `5173-io5limayoabad86vd6sy5-88f4c4d9.us3.manus.computer` hostname
- [x] Restart and validate the preview URL after the Vite configuration fix

- [x] Remove Manus-specific preview host configuration from the standalone Vite project
- [x] Validate `pnpm dev`, `pnpm check`, `pnpm test`, and `pnpm build` in normal local-project mode
- [x] Update README instructions to clarify that no Manus preview URL or host allowlist is required

- [x] Inventory the finished Civil Solution website for the Gemini AI Studio handoff
- [x] Write a complete from-head-to-tail Gemini AI Studio build specification
- [x] Review the document for technical completeness, content safety, and implementation accuracy
- [x] Deliver the documentation file to the user

- [x] Identify the intended connected GitHub repository for the Civil Solution website
- [x] Prepare the standalone project commit without secrets or generated artifacts
- [x] Push the project to GitHub and verify the remote repository

- [x] Restore the Manus preview by allowing the temporary `.manus.computer` Vite host
- [x] Keep localhost development behavior unchanged
- [x] Restart and verify the Manus preview URL

- [x] Audit all visible English/Bengali strings across homepage and service-detail routes
- [x] Fix any incomplete or mixed-language labels in both modes
- [x] Add Vercel SPA fallback so service-detail links do not return `404: NOT_FOUND`
- [x] Validate every service route and both language modes after deployment configuration changes

- [x] Reset scroll position to the top whenever a service-detail route changes
- [x] Validate homepage-to-service, sidebar, and related-service navigation after the fix

- [x] Keep the mobile service index expanded and visibly scannable instead of hamburger-like
- [x] Validate the mobile service index and route interactions after the responsive style fix

- [x] Audit all route-level language state and Bengali-mode visible labels
- [x] Persist and synchronize the selected language across homepage and service-detail routes
- [x] Ensure Bengali mode has no remaining English UI labels except intentional brand names and technical terms
- [x] Validate language persistence when navigating between homepage, service index, related services, and back links

- [x] Read and map the attached website specification requirements
- [x] Apply the requested specification changes to the Civil Solution website
- [x] Validate content, bilingual routes, responsive behavior, and production build
- [x] Save and deliver the updated implementation checkpoint

- [x] Map each of the 11 services to a distinct, topic-matched image
- [x] Source and prepare 11 distinct local service images with attribution metadata
- [x] Update the service catalog and verify every card/detail route uses its own image
- [x] Validate image loading and responsive cropping on desktop, tablet, and mobile

- [x] Audit every visible company-name surface in header, hero, footer, mobile navigation, and service pages
- [x] Show the Bengali company name in Bengali mode while preserving official brand attribution where needed
- [x] Validate the localized company name in English and Bengali modes on desktop and mobile

- [x] Replace visible Facebook and WhatsApp share-button marks with the original Civil Solution app logo image (superseded by the clarified platform-logo requirement)
- [x] Preserve correct social destinations, accessible labels, and responsive button sizing (superseded duplicate; final controls validated below)

- [x] Use a recognizable Facebook logo for the Facebook share link
- [x] Use a recognizable WhatsApp logo for the WhatsApp share link
- [x] Preserve correct share URLs, accessible labels, and responsive sizing

- [x] Verify the footer uses the correct Facebook platform logo
- [x] Verify the footer uses the correct WhatsApp platform logo
- [x] Verify both icons preserve their correct links, accessible labels, and responsive appearance

- [x] Make the floating WhatsApp bubble stop above the footer instead of overlapping it
- [x] Validate the footer-aware bubble position on desktop and mobile scroll states

- [x] Verify the Soil Test card and detail image visibly show soil analysis with appropriate field or laboratory equipment
- [x] Audit every service-card image against its exact service topic and civil-engineering context
- [x] Replace any mismatched service image and preserve source/license metadata
- [x] Validate corrected images on homepage cards and service-detail routes

- [x] Map each supplied photo to the most relevant project or service card
- [x] Blur identifiable faces in supplied photos before public use
- [x] Optimize and add the anonymized supplied photos as local assets
- [x] Update service/project JSON metadata and validate image rendering

- [x] Optimize six anonymized supplied field photos into lightweight local WebP assets
- [x] Assign distinct anonymized supplied photos to topic-matched service cards
- [x] Replace selected illustrative project imagery with anonymized supplied work references
- [x] Validate supplied-photo catalog paths, bilingual content, tests, and production build
- [x] Push final supplied-photo changes to the connected GitHub repository

- [x] Add the user-supplied structural strengthening image to the Retrofitting asset set
- [x] Update the bilingual Retrofitting service catalog metadata and image source note
- [x] Validate the Retrofitting card/detail rendering and save a new checkpoint

- [x] Remove the Open Email App action from the Send Message contact flow
- [x] Preserve Gmail and WhatsApp inquiry options with bilingual labels
- [x] Validate contact-flow rendering and save a new checkpoint

- [x] Add smooth hover animations to the Gmail and WhatsApp inquiry buttons
- [x] Prevent form submission when the project message is empty
- [x] Show a clear bilingual success toast after valid inquiry submission
- [x] Add tests and validate the updated inquiry flow before checkpoint

- [x] Resolve the reported GitHub push not reaching the remote repository
- [x] Verify the remote main branch contains the latest website revision

- [x] Add the user-supplied Soil Test field photo to the local asset set
- [x] Update the bilingual Soil Test service image metadata and source note
- [x] Validate the Soil Test card/detail rendering and save a new checkpoint

- [x] Select a relevant free-to-use Land Survey image from Bangladesh or a clearly Bangladesh-context source
- [x] Document source and license for the Land Survey image
- [x] Replace the bilingual Land Survey catalog asset and validate rendering

- [x] Select a distinct free-to-use geotechnical image for Soil Investigation
- [x] Add source and license metadata for the selected image
- [x] Update the bilingual Soil Investigation catalog and validate rendering

- [x] Select a Soil Investigation image that visibly reflects Bangladesh field conditions (superseded by the later Bangladesh-focused Land Survey request)
- [x] Document source and license for the Bangladesh-context image (superseded by the later Bangladesh-focused Land Survey request)
- [x] Replace the catalog asset and validate desktop/mobile rendering (superseded by the later Bangladesh-focused Land Survey request)

- [x] Add the supplied Civil Solution logo to the footer asset set
- [x] Replace the footer logo reference and preserve correct proportions
- [x] Validate footer logo rendering on desktop/mobile and save a checkpoint

- [x] Prepare the newly supplied CS logo with a clean transparent background
- [x] Replace the footer logo asset with the newly supplied CS mark
- [x] Validate the new footer logo on desktop/mobile and save a checkpoint

- [x] Remove all green background pixels from the supplied CS footer logo
- [x] Replace the footer reference with the fully transparent logo export
- [x] Validate transparency and responsive footer rendering before checkpoint

- [x] Change the footer background to a lighter warm shade
- [x] Retune footer text, borders, and logo contrast for the lighter background
- [x] Validate footer contrast and responsive rendering before checkpoint

- [x] Restore the footer to the cohesive dark-brown palette
- [x] Retain the transparent CS logo and readable footer controls
- [x] Validate the corrected footer on desktop/mobile before checkpoint

- [x] Push the latest Civil Solution website state to the connected GitHub repository
- [x] Verify the remote main branch matches the pushed project revision

- [x] Prepare the supplied Civil Solution mark as a favicon asset
- [x] Add the logo favicon reference to the document head
- [x] Validate favicon output and save a checkpoint

- [x] Add a realistic SEO foundation without promising permanent top ranking
- [x] Add bilingual metadata, canonical URLs, structured data, sitemap, and robots directives
- [x] Replace Digital Land Survey imagery with a Bangladesh-context person-at-work scene
- [x] Replace Soil Investigation imagery with a Bangladesh-context person-at-work scene
- [x] Validate SEO output, image rendering, tests, build, and responsive layouts
- [x] Update localization tests to accept generated lifecycle-managed image URLs
- [x] Add the Vite storage proxy required by the managed image paths

- [x] Investigate and verify the reported GitHub push synchronization issue
- [x] Correct the GitHub remote/branch sync and confirm the latest commit is visible remotely

- [x] Diagnose why Soil Investigation and Digital Land Survey images are missing
- [x] Fix the missing service-image paths or serving configuration
- [x] Validate both service images on homepage and detail routes, then push the fix

- [x] Audit all public service and project images for identifiable faces
- [x] Blur identifiable faces and preserve privacy-safe image metadata
- [x] Validate the image privacy update and push the revised assets

- [x] Correct the project story currently labeled “Soil core sample record” to concrete core cutting
- [x] Update the affected project story’s English and Bengali category, title, copy, and details
- [x] Validate and push the corrected concrete core-cutting project story

- [x] Update service-area messaging to cover all of Bangladesh
- [x] Identify Chittagong/Chattogram as the Civil Solution head office in English and Bengali
- [x] Validate the coverage and head-office wording across visible copy and SEO metadata, then push the update

- [x] Combine Soil Test and Soil Investigation into one bilingual service entry
- [x] Remove duplicate soil-service cards and repair all related-service references
- [x] Validate the merged soil service route, language modes, tests, build, and GitHub push

- [x] Use the supplied Soil Test image for the consolidated soil service
- [x] Repair the ServiceDetail syntax regression introduced during the soil-service merge
- [x] Revalidate and push the corrected merged soil service

- [x] Remove the internal “verified content required” note from the project file
- [x] Preserve public project descriptions, privacy wording, and bilingual content
- [x] Validate the cleanup and push the updated project file

- [x] Add a direct Facebook page link to the footer beside WhatsApp and email
- [x] Preserve bilingual labels, correct destinations, platform icons, and accessible names
- [x] Validate the footer contact links on desktop/mobile, then push the update

- [x] Audit and refine footer layout for desktop, tablet, and mobile devices
- [x] Preserve clear bilingual contact, sharing, branding, and navigation controls
- [x] Validate footer responsiveness and push the refinement

- [x] Add a dedicated bilingual Facebook page button near the main contact form
- [x] Add smooth hover and focus animations to footer social icons
- [x] Validate the new CTA and social interactions responsively, then push the update

- [x] Identify the missing visiting-card services; request expanded by user to all three
- [x] Superseded by user confirmation to add all three missing card services
- [x] Superseded by validation and push of all three card services

- [x] Add bilingual Integrity Test service from the visiting card
- [x] Add bilingual Pile Load Test service from the visiting card
- [x] Add bilingual Re-bar Fixing service from the visiting card
- [x] Add matched images, route mappings, validation, and GitHub push for the three added services

- [x] Source a relevant licensed online image for Integrity Test
- [x] Source a relevant licensed online image for Pile Load Test
- [x] Source a relevant licensed online image for Re-bar Fixing
- [x] Install the three portable assets, update metadata, validate, and push the image replacements
