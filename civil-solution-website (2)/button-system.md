# Creative Architectural Button System

## Design intent

Buttons now use a measured architectural language rather than generic rounded UI. The system uses squared frames, small drafting-corner marks, structural shadows, restrained orange datum accents, directional arrows, and turquoise/brown contrast aligned with the Warm Technical Atelier identity.

## Variant behavior

| Variant | Use | Treatment |
|---|---|---|
| Turquoise primary | Consultation and main form actions | Turquoise field, brown text, brown structural fill on hover, corner datum mark, directional lift |
| Brown primary | Dark-surface or modal actions | Brown field, turquoise hover fill, cream/brown contrast |
| Text link | Secondary navigation and footer actions | Underline rule, orange starting datum, turquoise rule expansion on hover/focus |
| Language toggle | EN / বাংলা control | Framed bilingual control with top-right drafting corner |
| Menu toggle | Mobile navigation | Compact framed control with architectural corner marker |
| WhatsApp | Floating contact action | Turquoise framed action with offset structural shadow and non-obstructive mobile sizing |
| Service/related cards | Navigation cards | Square geometry and visible orange focus outline for keyboard navigation |

## Accessibility and responsive rules

Visible focus states use a high-contrast outline or edge treatment. Buttons retain minimum touch-friendly heights, support bilingual wrapping, and avoid layout-breaking uppercase transformations in body copy. Hover movement is disabled under `prefers-reduced-motion: reduce`; active states remain immediate. The production build and desktop/mobile previews were checked after the update.

## Playful CTA pass

The first architectural pass was intentionally restrained. This follow-up makes the buttons more inviting by adding asymmetric rounded corners, brighter orange hover sweeps, animated arrow movement, stronger offset color shadows, and slightly friendlier sentence-case labels. The WhatsApp control now uses a recognizable WhatsApp-green treatment while retaining the architectural frame. Motion remains disabled or neutralized under reduced-motion preferences.
