// Process the 3 good scenery images from batch2
import sharp from 'sharp';
import fs from 'fs';

const UPLOAD = '/home/z/my-project/upload/batch2';
const PUBLIC = '/home/z/my-project/public';

async function process(src: string, dest: string, w: number, h: number | null, quality = 82) {
  let p = sharp(src);
  if (h) {
    p = p.resize(w, h, { fit: 'cover', position: 'center' });
  } else {
    p = p.resize(w, w, { fit: 'inside', withoutEnlargement: true });
  }
  await p.jpeg({ quality, mozjpeg: true }).toFile(dest);
  const stat = fs.statSync(dest);
  console.log(`✓ ${dest.split('/').pop()} — ${(stat.size / 1024).toFixed(0)} KB`);
}

async function main() {
  // 1. River sunset with boat — excellent for gallery (real Magdalena sunset)
  await process(
    `${UPLOAD}/WhatsApp Image 2026-06-28 at 8.07.02 PM.jpeg`,
    `${PUBLIC}/mompox-river-sunset-real.jpg`,
    1200, 800
  );

  // 2. Riverfront patio with sunset, floral arch, string lights — great for gallery/About
  await process(
    `${UPLOAD}/WhatsApp Image 2026-06-28 at 8.07.03 PM.jpeg`,
    `${PUBLIC}/mompox-patio-sunset-real.jpg`,
    1200, 800
  );

  // 3. Town plaza with colonial buildings — gallery
  await process(
    `${UPLOAD}/WhatsApp Image 2026-06-28 at 8.07.24 PM.jpeg`,
    `${PUBLIC}/mompox-plaza-real.jpg`,
    1200, 800
  );

  console.log('\nDone.');
}
main().catch(e => { console.error(e); process.exit(1); });
