/**
 * Casa Mónica — Clever Image Pool Analyzer
 *
 * Scans /home/z/my-project/upload/ (and a secondary drop folder) for any
 * images the user has uploaded, classifies each one using the Z-AI VLM,
 * and recommends:
 *   • WHERE on the site it should appear
 *   • WHETHER effects (ken-burns, parallax, duotone, etc.) should be applied
 *   • WHAT filename to copy it to in /public/ for drop-in use
 *
 * Output: /home/z/my-project/scripts/image-pool-report.json (and human-readable .md)
 *
 * Usage:
 *   bun run /home/z/my-project/scripts/analyze-image-pool.ts
 *
 * Re-run it any time you add new images to the upload folder.
 */

import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const UPLOAD_DIR   = '/home/z/my-project/upload';
const PUBLIC_DIR   = '/home/z/my-project/public';
const DROP_DIRS    = [UPLOAD_DIR, '/home/z/my-project/drop', '/home/z/my-project/new-images'];
const REPORT_JSON  = '/home/z/my-project/scripts/image-pool-report.json';
const REPORT_MD    = '/home/z/my-project/scripts/image-pool-report.md';

// The "slots" the website knows about — drop-in filenames in /public/
// Each slot has a recommended treatment and a current state
const SLOTS: { file: string; role: string; treatment: string; currentSource?: string }[] = [
  { file: 'casa-monica-logo.png',         role: 'logo / brand mark',                       treatment: 'none — keep as-is' },
  { file: 'hotel-exterior-day.png',       role: 'About section — facade daytime',          treatment: 'subtle lift on hover' },
  { file: 'hotel-exterior-night.png',     role: 'About section — facade nighttime',        treatment: 'subtle lift on hover' },
  { file: 'room-triple.png',              role: 'Rooms — triple room',                     treatment: 'hover zoom' },
  { file: 'room-twin.png',                role: 'Rooms — twin room',                       treatment: 'hover zoom' },
  { file: 'room-twin-amenities.png',      role: 'Rooms — twin with amenities',             treatment: 'hover zoom' },
  { file: 'owner-fredy.png',              role: 'About — portrait of Sr Fredy',            treatment: 'soft warm vignette, no filter', currentSource: 'PLACEHOLDER' },
  { file: 'owner-monica.png',             role: 'About — portrait of Sra Monica',          treatment: 'soft warm vignette, no filter', currentSource: 'PLACEHOLDER' },
  { file: 'mompox-church.png',            role: 'Gallery — colonial church',               treatment: 'lightbox' },
  { file: 'magdalena-sunset.png',         role: 'Hero background',                         treatment: 'ken-burns slow zoom', currentSource: 'AI-generated' },
  { file: 'mompox-street.png',            role: 'Mompox section background',               treatment: 'fixed parallax + dark overlay', currentSource: 'AI-generated' },
  { file: 'mompox-night.png',             role: 'Contact section background',              treatment: 'fixed parallax + dark overlay', currentSource: 'AI-generated' },
  { file: 'santa-barbara-tower.png',      role: 'Mompox section feature image',            treatment: 'lift on hover', currentSource: 'AI-generated' },
  { file: 'filigree-artisan.png',         role: 'Things to do — filigree workshop',        treatment: 'card hover zoom', currentSource: 'AI-generated' },
  { file: 'cienaga-pijino.png',           role: 'Things to do — Ciénaga de Pijiño',        treatment: 'card hover zoom', currentSource: 'AI-generated' },
  { file: 'champan-boat.png',             role: 'Things to do — champán river boat',       treatment: 'card hover zoom', currentSource: 'AI-generated' },
  { file: 'momposina-food.png',           role: 'Food section — table spread',             treatment: 'corner accent badge', currentSource: 'AI-generated' },
  { file: 'corozo-fruit.png',             role: 'Food section — corozo spotlight',         treatment: 'rounded card', currentSource: 'AI-generated' },
  { file: 'ceiba-tree.png',               role: 'Gallery',                                 treatment: 'lightbox', currentSource: 'AI-generated' },
  { file: 'rocking-chair-porch.png',      role: 'UNUSED — was About section, removed',     treatment: 'n/a', currentSource: 'AI-generated — to be replaced' },
  { file: 'hotel-patio.png',              role: 'UNUSED — was About section, removed',     treatment: 'n/a', currentSource: 'AI-generated — to be replaced' },
];

const VALID_EXTS = ['.png', '.jpg', '.jpeg', '.webp'];

function findImageFiles(): string[] {
  const found: string[] = [];
  for (const dir of DROP_DIRS) {
    if (!fs.existsSync(dir)) continue;
    const stat = fs.statSync(dir);
    if (stat.isDirectory()) {
      for (const f of fs.readdirSync(dir)) {
        const ext = path.extname(f).toLowerCase();
        if (VALID_EXTS.includes(ext)) {
          found.push(path.join(dir, f));
        }
      }
    }
  }
  // Dedupe
  return Array.from(new Set(found));
}

type Classification = {
  file: string;
  size: number;
  category: string;        // owner-portrait | room-interior | hotel-exterior | scenery-town | scenery-river | food | craft | event | other
  subject: string;         // short description
  isOwnerPortrait: boolean;
  ownerNameGuess: string;  // 'fredy' | 'monica' | 'unknown'
  peopleCount: number;
  hasText: boolean;
  isLowQuality: boolean;
  isVertical: boolean;
  recommendedSlot: string; // matches SLOTS[].file
  recommendedTreatment: string;
  notes: string;
};

async function classifyImage(zai: any, filePath: string): Promise<Classification> {
  const buf = fs.readFileSync(filePath);
  const b64 = buf.toString('base64');
  const ext = path.extname(filePath).slice(1).toLowerCase();
  const mime = ext === 'jpg' ? 'jpeg' : ext;

  const prompt = `You are analyzing an image for a small family-run hotel website in Mompox, Colombia called "Hotel Casa Mónica". The site is a warm, colonial, Spanish-first showcase.

Classify this image and respond STRICTLY as JSON (no markdown, no commentary) with these fields:
{
  "category": "owner-portrait" | "room-interior" | "hotel-exterior" | "scenery-town" | "scenery-river" | "food" | "craft" | "event" | "people-guests" | "other",
  "subject": "short 6-12 word description of what's in the image",
  "isOwnerPortrait": true | false,
  "ownerNameGuess": "fredy" | "monica" | "unknown"  (guess based on whether subject looks like an older latino man or woman; only guess if isOwnerPortrait=true),
  "peopleCount": <integer>,
  "hasText": true | false,
  "isLowQuality": true | false,
  "isVertical": true | false,
  "warmthScore": <0-10 — how warm/cordial/authentic does it feel for a family hotel site>,
  "notes": "any specific recommendation (e.g. 'crop tighter', 'good for hero', 'too dark', 'shows real room')"
}

Only output the JSON. No prose.`;

  const resp = await zai.chat.completions.createVision({
    model: 'glm-4v-flash',
    messages: [{
      role: 'user',
      content: [
        { type: 'text', text: prompt },
        { type: 'image_url', image_url: { url: `data:image/${mime};base64,${b64}` } },
      ],
    }],
  });

  let raw = resp.choices[0].message.content.trim();
  // Strip any markdown fences just in case
  raw = raw.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '').trim();
  // Try to extract first {...} block
  const m = raw.match(/\{[\s\S]*\}/);
  if (m) raw = m[0];

  let parsed: any;
  try {
    parsed = JSON.parse(raw);
  } catch {
    parsed = {
      category: 'other',
      subject: '(classification failed)',
      isOwnerPortrait: false,
      ownerNameGuess: 'unknown',
      peopleCount: 0,
      hasText: false,
      isLowQuality: false,
      isVertical: false,
      warmthScore: 5,
      notes: 'VLM did not return parseable JSON',
    };
  }

  // Determine recommended slot based on category
  let recommendedSlot = '';
  let recommendedTreatment = '';
  if (parsed.isOwnerPortrait) {
    if (parsed.ownerNameGuess === 'fredy') {
      recommendedSlot = 'owner-fredy.png';
      recommendedTreatment = 'soft warm vignette, no filter';
    } else if (parsed.ownerNameGuess === 'monica') {
      recommendedSlot = 'owner-monica.png';
      recommendedTreatment = 'soft warm vignette, no filter';
    } else {
      recommendedSlot = '(owner portrait — name unclear, ask user)';
      recommendedTreatment = 'soft warm vignette';
    }
  } else if (parsed.category === 'room-interior') {
    // Pick first empty room slot
    const roomSlots = ['room-triple.png', 'room-twin.png', 'room-twin-amenities.png'];
    recommendedSlot = roomSlots.find(s => !fs.existsSync(path.join(PUBLIC_DIR, s))) || 'room-extra-' + Date.now() + '.png';
    recommendedTreatment = 'hover zoom';
  } else if (parsed.category === 'hotel-exterior') {
    recommendedSlot = fs.existsSync(path.join(PUBLIC_DIR, 'hotel-exterior-day.png')) ? 'hotel-exterior-extra.png' : 'hotel-exterior-day.png';
    recommendedTreatment = 'subtle lift on hover';
  } else if (parsed.category === 'scenery-town') {
    recommendedSlot = 'gallery-extra-' + Date.now() + '.png';
    recommendedTreatment = 'lightbox + optional parallax bg';
  } else if (parsed.category === 'scenery-river') {
    recommendedSlot = 'gallery-extra-' + Date.now() + '.png';
    recommendedTreatment = 'lightbox + optional hero bg';
  } else if (parsed.category === 'food') {
    recommendedSlot = 'gallery-extra-' + Date.now() + '.png';
    recommendedTreatment = 'rounded card';
  } else if (parsed.category === 'craft') {
    recommendedSlot = 'gallery-extra-' + Date.now() + '.png';
    recommendedTreatment = 'lightbox';
  } else {
    recommendedSlot = 'gallery-extra-' + Date.now() + '.png';
    recommendedTreatment = 'lightbox (review manually)';
  }

  return {
    file: filePath,
    size: buf.length,
    category: parsed.category || 'other',
    subject: parsed.subject || '',
    isOwnerPortrait: !!parsed.isOwnerPortrait,
    ownerNameGuess: parsed.ownerNameGuess || 'unknown',
    peopleCount: parsed.peopleCount || 0,
    hasText: !!parsed.hasText,
    isLowQuality: !!parsed.isLowQuality,
    isVertical: !!parsed.isVertical,
    recommendedSlot,
    recommendedTreatment,
    notes: parsed.notes || '',
  };
}

async function main() {
  console.log('Scanning for images...');
  const files = findImageFiles();
  console.log(`Found ${files.length} image(s):`);
  files.forEach(f => console.log('  -', f));

  if (files.length === 0) {
    console.log('\nNo images found. Drop files into /home/z/my-project/upload/ and re-run.');
    return;
  }

  const zai = await ZAI.create();
  const classifications: Classification[] = [];

  // Classify sequentially to avoid rate limits
  for (const f of files) {
    process.stdout.write(`Classifying ${path.basename(f)} ... `);
    try {
      const c = await classifyImage(zai, f);
      classifications.push(c);
      console.log(`${c.category} → ${c.recommendedSlot}`);
    } catch (e: any) {
      console.log(`ERROR: ${e.message}`);
      classifications.push({
        file: f,
        size: fs.statSync(f).size,
        category: 'error',
        subject: String(e.message),
        isOwnerPortrait: false,
        ownerNameGuess: 'unknown',
        peopleCount: 0,
        hasText: false,
        isLowQuality: false,
        isVertical: false,
        recommendedSlot: '',
        recommendedTreatment: '',
        notes: 'classification failed',
      });
    }
  }

  // Write JSON report
  fs.writeFileSync(REPORT_JSON, JSON.stringify(classifications, null, 2));
  console.log(`\nJSON report: ${REPORT_JSON}`);

  // Write human-readable markdown report
  const lines: string[] = [
    '# Casa Mónica — Image Pool Analysis Report',
    '',
    `Generated: ${new Date().toISOString()}`,
    '',
    '## Summary',
    `- ${classifications.length} image(s) analyzed`,
    `- ${classifications.filter(c => c.isOwnerPortrait).length} owner portrait(s) detected`,
    `- ${classifications.filter(c => c.category === 'room-interior').length} room interior(s)`,
    `- ${classifications.filter(c => c.category === 'hotel-exterior').length} hotel exterior(s)`,
    `- ${classifications.filter(c => c.category === 'scenery-town').length} town scenery`,
    `- ${classifications.filter(c => c.category === 'scenery-river').length} river scenery`,
    `- ${classifications.filter(c => c.category === 'food').length} food photo(s)`,
    '',
    '## Recommendations',
    '',
  ];

  for (const c of classifications) {
    lines.push(`### ${path.basename(c.file)}`);
    lines.push(`- **Path:** ${c.file}`);
    lines.push(`- **Size:** ${(c.size / 1024).toFixed(0)} KB`);
    lines.push(`- **Category:** ${c.category}`);
    lines.push(`- **Subject:** ${c.subject}`);
    lines.push(`- **People in image:** ${c.peopleCount}`);
    lines.push(`- **Owner portrait?** ${c.isOwnerPortrait ? `yes — guessed: ${c.ownerNameGuess}` : 'no'}`);
    lines.push(`- **Has visible text?** ${c.hasText ? 'yes (avoid using as background)' : 'no'}`);
    lines.push(`- **Vertical orientation?** ${c.isVertical ? 'yes' : 'no'}`);
    lines.push(`- **Low quality?** ${c.isLowQuality ? 'yes — use small/thumbnail only' : 'no'}`);
    lines.push(`- **Recommended slot:** \`${c.recommendedSlot}\``);
    lines.push(`- **Recommended treatment:** ${c.recommendedTreatment}`);
    lines.push(`- **Notes:** ${c.notes}`);
    lines.push('');
  }

  // Suggested copy commands
  lines.push('## Suggested copy commands');
  lines.push('');
  lines.push('```bash');
  for (const c of classifications) {
    if (c.recommendedSlot && !c.recommendedSlot.startsWith('(') && !c.recommendedSlot.includes('extra-')) {
      lines.push(`cp "${c.file}" /home/z/my-project/public/${c.recommendedSlot}`);
    } else if (c.recommendedSlot.includes('extra-')) {
      lines.push(`# Manual review needed: ${path.basename(c.file)} → ${c.recommendedSlot}`);
    }
  }
  lines.push('```');
  lines.push('');
  lines.push('After copying, restart the dev server (or it will hot-reload automatically).');

  fs.writeFileSync(REPORT_MD, lines.join('\n'));
  console.log(`Markdown report: ${REPORT_MD}`);
  console.log('\nDone.');
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
