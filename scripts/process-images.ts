/**
 * Casa Mónica — Image Processing Pipeline
 *
 * Takes the real uploaded images from /upload/ and processes them into
 * production-ready assets in /public/ using sharp.
 *
 * - Crops/resizes owner portraits to 4:5 (800x1000) for card display
 * - Crops the couple photo to extract Mónica (left side)
 * - Copies scenery images with clean filenames for gallery/feature use
 * - Optimizes/compresses all outputs
 *
 * Run: bun run /home/z/my-project/scripts/process-images.ts
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const UPLOAD = '/home/z/my-project/upload';
const PUBLIC = '/home/z/my-project/public';

async function processOwnerPortrait(src: string, dest: string, extract?: { left: number; top: number; width: number; height: number }) {
  let pipeline = sharp(src);
  if (extract) {
    pipeline = pipeline.extract(extract);
  }
  // Resize to 800x1000 (4:5) with cover, then optimize
  await pipeline
    .resize(800, 1000, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(dest);
  const stat = fs.statSync(dest);
  console.log(`✓ ${path.basename(dest)} — ${(stat.size / 1024).toFixed(0)} KB`);
}

async function processScenery(src: string, dest: string, maxSize = 1200) {
  await sharp(src)
    .resize(maxSize, maxSize, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(dest);
  const stat = fs.statSync(dest);
  console.log(`✓ ${path.basename(dest)} — ${(stat.size / 1024).toFixed(0)} KB`);
}

async function processFeature(src: string, dest: string, w: number, h: number) {
  await sharp(src)
    .resize(w, h, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(dest);
  const stat = fs.statSync(dest);
  console.log(`✓ ${path.basename(dest)} — ${(stat.size / 1024).toFixed(0)} KB`);
}

async function main() {
  console.log('Processing owner portraits...\n');

  // 1. Couple photo (WhatsApp 2) — full 4:5 feature crop for About section centerpiece
  // Image is 750x1334. Crop center to 4:5 = 750x937, then resize to 800x1000
  await processFeature(
    `${UPLOAD}/WhatsApp Image 2026-06-28 at 7.13.39 PM (2).jpeg`,
    `${PUBLIC}/owners-couple.jpg`,
    800, 1000
  );

  // 2. Fredy — WhatsApp (1) man by statue. 750x1334. Crop to 4:5 = 750x937
  // The man is centered, so center-crop works
  await processFeature(
    `${UPLOAD}/WhatsApp Image 2026-06-28 at 7.13.39 PM (1).jpeg`,
    `${PUBLIC}/owner-fredy-real.jpg`,
    800, 1000
  );

  // 3. Mónica — crop from couple photo (WhatsApp 2). Woman is on LEFT ~45% of width.
  // Image is 750x1334. Left 50% = 0-375px. But she's close to center, so let's take
  // left 55% = 0-412px, full height, then crop to 4:5.
  // Extract: left=0, top=100, width=412, height=1030 (4:5 ratio of 412 is 515, but we
  // want to keep her face centered — take from y=100 down)
  await processOwnerPortrait(
    `${UPLOAD}/WhatsApp Image 2026-06-28 at 7.13.39 PM (2).jpeg`,
    `${PUBLIC}/owner-monica-real.jpg`,
    { left: 0, top: 80, width: 412, height: 1030 }
  );

  // 4. Couple under floral arch (WhatsApp.jpeg) — for gallery or secondary feature
  await processFeature(
    `${UPLOAD}/WhatsApp Image 2026-06-28 at 7.13.39 PM.jpeg`,
    `${PUBLIC}/owners-arch.jpg`,
    800, 1000
  );

  console.log('\nProcessing scenery images...\n');

  // 5. Drone views — for gallery (real aerial shots of Mompox)
  await processScenery(`${UPLOAD}/casa monica drone view.jpg`,  `${PUBLIC}/mompox-drone-1.jpg`, 800);
  await processScenery(`${UPLOAD}/casa monica drone view3.jpg`, `${PUBLIC}/mompox-drone-2.jpg`, 800);

  // 6. River / colonial building by river — for gallery + Things to Do
  await processScenery(`${UPLOAD}/casa monica river.jpg`, `${PUBLIC}/mompox-river-colonial.jpg`, 1000);

  // 7. Churches — for gallery
  await processScenery(`${UPLOAD}/chruch.jpg`, `${PUBLIC}/mompox-church-red.jpg`, 800);
  await processScenery(`${UPLOAD}/santa barbara iglesia.jpg`, `${PUBLIC}/mompox-santa-barbara-night.jpg`, 800);

  // 8. Streets — streets.jpg is the evening patio (hotel ambiance), streets2.jpg is colonial street
  await processScenery(`${UPLOAD}/streets.jpg`,  `${PUBLIC}/hotel-patio-evening.jpg`, 1000);
  await processScenery(`${UPLOAD}/streets2.jpg`, `${PUBLIC}/mompox-street-colonial.jpg`, 800);

  console.log('\nDone. All images processed.');
}

main().catch(e => { console.error(e); process.exit(1); });
