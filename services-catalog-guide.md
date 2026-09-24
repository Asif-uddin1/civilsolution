# Services Catalog Guide

The editable service catalog is `client/src/content/services.json`. Each service record contains its slug, number, English and Bengali titles, bilingual descriptions, icon key, image path, bilingual alt text, service kind, image credit, source URL, and a palette token.

To add a service, add one complete record to the `services` array with a unique kebab-case `slug`. Use an existing icon key from `Home.tsx`, provide both language versions, add a permission-safe image and attribution, and choose `cream`, `mint`, or `sand` for the palette token. The homepage cards, service index, service ordering, detail-page imagery, and related-service image metadata read from this catalog.

For a fully custom detail page, add matching English and Bengali detail copy to `pageData` in `client/src/pages/ServiceDetail.tsx`. If custom detail copy is not added immediately, the route uses a safe generic fallback based on the JSON record rather than crashing. Add the new slug to `relatedServices` only when it should appear as a related recommendation.

Card colors are centralized in `client/src/index.css`. Do not add repeated inline `backgroundColor` styles to nested card elements. The homepage uses a controlled cream/mint/sand rhythm, while active and hover states remain defined by the shared stylesheet.
