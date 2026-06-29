// Extract the best still frames from promising videos for Gallery use
import sharp from 'sharp';
import fs from 'fs';
import { execSync } from 'child_process';

const VIDEOS = '/home/z/my-project/uploads/99-to-review';
const PUBLIC = '/home/z/my-project/public';
const TEMP = '/home/z/my-project/scripts/best-frames';

if (!fs.existsSync(TEMP)) fs.mkdirSync(TEMP, { recursive: true });

// Best video candidates with the timestamp to extract (chosen from analysis)
const candidates = [
  { video: 'WhatsApp Video 2026-06-28 at 8.07.02 PM.mp4', seek: 8, dest: 'hotel-garden-coffee.jpg', caption: { es: 'Jardín de Casa Mónica con flores y cafetería', en: 'Casa Mónica garden with flowers and coffee stand' } },
  { video: 'WhatsApp Video 2026-06-28 at 8.08.36 PM.mp4', seek: 6, dest: 'mompox-musicians.jpg', caption: { es: 'Músicos en la plaza de Mompox', en: 'Musicians in the plaza of Mompox' } },
  { video: 'WhatsApp Video 2026-06-28 at 8.08.17 PM.mp4', seek: 5, dest: 'mompox-night-event.jpg', caption: { es: 'Noche de fiesta en Mompox', en: 'Festival night in Mompox' } },
  { video: 'WhatsApp Video 2026-06-28 at 8.07.21 PM.mp4', seek: 10, dest: 'mompox-riverbank-nature.jpg', caption: { es: 'Riverbank cerca de Mompox', en: 'Riverbank near Mompox' } },
  { video: 'WhatsApp Video 2026-06-28 at 8.08.40 PM.mp4', seek: 5, dest: 'mompox-street-banners.jpg', caption: { es: 'Calle de Mompox con banderines', en: 'Mompox street with pennant banners' } },
  { video: 'WhatsApp Video 2026-06-28 at 8.08.42 PM.mp4', seek: 7, dest: 'mompox-food-prep.jpg', caption: { es: 'Preparación de comida momposina', en: 'Preparing momposino food' } },
];

async function main() {
  for (const c of candidates) {
    const src = `${VIDEOS}/${c.video}`;
    if (!fs.existsSync(src)) {
      console.log(`✗ ${c.video} not found`);
      continue;
    }
    const rawFrame = `${TEMP}/${c.dest.replace('.jpg', '-raw.jpg')}`;
    try {
      // Extract frame at seek position with high quality
      execSync(`ffmpeg -ss ${c.seek} -i "${src}" -frames:v 1 -q:v 2 -y "${rawFrame}" 2>/dev/null`);
      // Process with sharp: resize to max 1200px wide, optimize
      await sharp(rawFrame)
        .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 85, mozjpeg: true })
        .toFile(`${PUBLIC}/${c.dest}`);
      const stat = fs.statSync(`${PUBLIC}/${c.dest}`);
      console.log(`✓ ${c.dest} — ${(stat.size / 1024).toFixed(0)} KB`);
      // Clean up raw frame
      fs.unlinkSync(rawFrame);
    } catch (e: any) {
      console.log(`✗ ${c.dest}: ${e.message}`);
    }
  }
  console.log('\nDone.');
}
main().catch(e => { console.error(e); process.exit(1); });
