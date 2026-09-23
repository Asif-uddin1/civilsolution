# Image privacy audit

The public asset inventory was reviewed using a labeled contact sheet. Most supplied-work images are already anonymized or show workers from behind. The images requiring face treatment or a closer individual review are:

- `client/public/netlify-assets/service-land-surveyor.jpg` — visible surveyor face beside a total station.
- `client/public/netlify-assets/service-total-station-survey.webp` — visible worker faces in a survey scene.
- `client/public/netlify-assets/service-soil-test.webp` — multiple visible laboratory faces.
- `client/public/netlify-assets/soil-testing-laboratory-india.webp` — visible laboratory faces.
- `client/public/netlify-assets/civil-solution-project.webp` — person visible beside the total station.
- `client/public/netlify-assets/bangladesh-construction-worker-wikimedia.webp` — worker may have a visible face; review before publication.
- `client/public/netlify-assets/facebook-projects/facebook-project-111915208625902.jpg` — person visible in the project photo; review before publication.
- `client/public/netlify-assets/supplied-work/digital-land-survey-bangladesh-field.webp` — generated surveyor scene; review for any recognizable facial detail.
- `client/public/netlify-assets/supplied-work/soil-investigation-bangladesh-field.webp` — generated drilling scene; review for any recognizable facial detail.
- `client/public/netlify-assets/supplied-work/land-survey-bangladesh-pid.webp` — public event image with multiple people; treat visible faces before reuse.

The remaining public assets either contain no people, show people too far away to identify, or are already anonymized supplied-work references. The intended edit is to blur identifiable faces only and preserve the scene, equipment, composition, and attribution metadata.


## Full-resolution findings

`service-land-surveyor.jpg` contains one clearly identifiable adult face beside the total station and should be blurred before public use.

`service-soil-test.webp` contains five clearly visible adult faces in a laboratory scene and should have all five faces blurred before public use. The laboratory equipment and soil-testing context can be preserved.


## Active catalog findings

`service-total-station-survey.webp` contains two workers. Both faces are partially covered by masks, but facial and eye-region details remain visible, so both should be blurred for conservative privacy treatment.

`facebook-project-111915208625902.jpg` contains one worker with a clearly visible side profile while operating a total station. The face should be blurred before public display. The project image is currently used by the `survey-total-station` story.


`facebook-project-111923098625113.jpg` shows a total-station setup with two distant people in the background. Their faces are small but still visible enough to warrant conservative blurring if the image remains public.

`digital-land-survey-bangladesh-field.webp` contains one foreground surveyor whose face is partly occluded by the total station but still shows visible facial detail, plus one distant worker whose face is small. Both should be blurred in the public version.


`service-construction-chemicals.webp` shows a worker in full protective clothing with the face covered and no identifiable facial detail; no edit is needed.

`service-landscape-gardening.webp` contains distant figures whose faces are not identifiable at the displayed scale; no edit is needed.


`civil-solution-project.webp` is an equipment-and-structure scene with no visible person; no edit is needed.

`bangladesh-construction-worker-wikimedia.webp` contains a clearly visible construction worker face plus additional partially visible workers. It is not referenced by the active catalog, so it will remain excluded from the shipped website rather than being added to the public image set without privacy treatment.
