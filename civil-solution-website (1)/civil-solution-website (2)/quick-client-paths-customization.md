# Quick Client Paths Card Customization

## Purpose

The three cards immediately below the hero are now a compact action index. They help a visitor choose a next step without reading the full page: start a consultation, identify a technical scope, or review project evidence.

## Changes made

| Area | Treatment |
|---|---|
| Card 01 | Primary Civil Turquoise-soft card for consultation, with `CONSULTATION / 01` metadata and the clearest action hierarchy. |
| Card 02 | Supporting scope card for finding the appropriate service, with `SCOPE / 02` metadata. |
| Card 03 | Supporting evidence card for reviewing project types and deliverables, with `EVIDENCE / 03` metadata. |
| Layout | Extracted from Home.tsx into reusable `QuickClientPathsSection.tsx`. Desktop uses an editorial three-column index; tablet gives the primary card more width; mobile stacks the cards. |
| Interaction | Added reveal timing through the shared reduced-motion-aware hook, subtle lift, focus-visible treatment, turquoise edge response, and drafting-rule reveal. |
| Language | English and Bengali titles, tags, descriptions, and section labels switch together without changing the destinations. |

## Content safety

The cards describe actions and content types, not verified project outcomes. The evidence card continues to lead visitors toward sample/project material that must be approved before publication.

## Validation

The reusable `civil-engineering-website-refinement` skill was updated with the architecture, card-refinement, bilingual, motion, documentation, and validation workflow and passed the skill validator. The website TypeScript check and production build pass. Desktop and mobile top-viewport previews were checked after the Quick Client Paths extraction and redesign.
