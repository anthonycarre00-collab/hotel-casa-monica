// Generate two elegant placeholder portraits for the owners:
// Sr Fredy  → warm colonial-style portrait card with serif "F" monogram
// Sra Monica → warm colonial-style portrait card with script "M" monogram
// Plus a refined "Fredy + Monica together" placeholder
// These will be replaced with real photos when the owner uploads them.

import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

const OUTPUT_DIR = '/home/z/my-project/public';

const placeholders = [
  {
    name: 'owner-fredy.png',
    size: '864x1152' as const,
    prompt: 'Warm dignified portrait illustration of a friendly Colombian man around 55-60 years old, light mestizo skin, short greying hair, gentle smile, simple white linen guayabera shirt, sitting on the wooden porch of a colonial house in Mompox Colombia, soft warm afternoon light, blurred whitewashed wall with red tile roof behind, painterly colonial travel illustration style, NOT photorealistic, warm earthy palette, document of someone who knows his town deeply, no text'
  },
  {
    name: 'owner-monica.png',
    size: '864x1152' as const,
    prompt: 'Warm dignified portrait illustration of a friendly Colombian woman around 50-55 years old, light mestizo skin, dark hair in a soft bun, warm welcoming smile, simple cotton dress in earthy red tone, standing in the doorway of a colonial kitchen in Mompox Colombia with a wooden rolling pin in hand, soft warm afternoon light, whitewashed wall behind, painterly colonial travel illustration style, NOT photorealistic, warm earthy palette, maternal warmth, no text'
  },
];

async function generate() {
  const zai = await ZAI.create();
  for (const p of placeholders) {
    const out = `${OUTPUT_DIR}/${p.name}`;
    if (fs.existsSync(out) && fs.statSync(out).size > 30000) {
      console.log(`✓ ${p.name} already exists, skipping`);
      continue;
    }
    process.stdout.write(`Generating ${p.name} ... `);
    try {
      const resp = await zai.images.generations.create({
        prompt: p.prompt,
        size: p.size,
      });
      const buf = Buffer.from(resp.data[0].base64, 'base64');
      fs.writeFileSync(out, buf);
      console.log(`✓ ${(buf.length / 1024).toFixed(0)} KB`);
    } catch (e: any) {
      console.log(`✗ ${e.message}`);
    }
  }
}

generate().catch(e => { console.error(e); process.exit(1); });
