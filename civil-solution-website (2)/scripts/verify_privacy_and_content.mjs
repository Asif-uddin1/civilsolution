import fs from 'node:fs';

const services = JSON.parse(fs.readFileSync('client/src/content/services.json', 'utf8'));
const projects = JSON.parse(fs.readFileSync('client/src/content/projects.json', 'utf8'));
const refs = [
  ...services.services.map((service) => service.image),
  ...projects.projects.map((project) => project.image),
];
const missing = refs.filter((assetPath) => !fs.existsSync(`client/public${assetPath}`));
if (missing.length) {
  console.error('Missing assets:', missing);
  process.exit(1);
}

const stale = refs.filter((assetPath) =>
  /manus-storage|soil-investigation-bangladesh-field\.webp$|digital-land-survey-bangladesh-field\.webp$/.test(assetPath),
);
if (stale.length) {
  console.error('Unexpected stale references:', stale);
  process.exit(1);
}

const story = projects.projects.find((project) => project.id === 'soil-investigation-workflow');
if (!story || !/Concrete core/i.test(story.title) || !/কংক্রিট কোর/.test(story.bnTitle)) {
  console.error('Concrete core story check failed');
  process.exit(1);
}

console.log(`Catalog checks passed: ${refs.length} referenced images; concrete core story is correctly labeled.`);
