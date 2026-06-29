// Process the top 3 Mónica candidates with smart cropping
import sharp from 'sharp';
import fs from 'fs';

const UPLOAD = '/home/z/my-project/upload';
const PUBLIC = '/home/z/my-project/public';

async function processCandidate(src: string, dest: string, extract?: { left: number; top: number; width: number; height: number }) {
  let p = sharp(src);
  if (extract) {
    p = p.extract(extract);
  }
  // Resize to 800x1000 (4:5) with cover
  await p
    .resize(800, 1000, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(dest);
  const stat = fs.statSync(dest);
  console.log(`✓ ${dest.split('/').pop()} — ${(stat.size / 1024).toFixed(0)} KB`);
}

async function main() {
  // Candidate 1: 750x1334 (vertical) — Mónica holding child, center frame
  // She's center, mid-section. Crop center to 4:5 = 750x937, from top=200 to focus on faces
  await processCandidate(
    `${UPLOAD}/pasted_image_1782705628242.jpg`,
    `${PUBLIC}/owner-monica-candidate-1.jpg`,
    { left: 0, top: 200, width: 750, height: 937 }
  );

  // Candidate 2: 750x1334 (vertical) — Mónica white lace top with another person
  // She's on the right. Crop right portion: left=200, width=550, top=150, height=688
  await processCandidate(
    `${UPLOAD}/pasted_image_1782705645723.jpg`,
    `${PUBLIC}/owner-monica-candidate-2.jpg`,
    { left: 200, top: 150, width: 550, height: 688 }
  );

  // Candidate 3: 1599x899 (horizontal) — Mónica green polo touching tree, left/center
  // Crop left portion to 4:5 vertical. 720x900 fits within 1599x899? height is 899, need 900.
  // Use 719x899 (close to 4:5)
  await processCandidate(
    `${UPLOAD}/pasted_image_1782705667534.jpg`,
    `${PUBLIC}/owner-monica-candidate-3.jpg`,
    { left: 0, top: 0, width: 719, height: 899 }
  );

  console.log('\nDone. All 3 candidates processed.');
}
main().catch(e => { console.error(e); process.exit(1); });
