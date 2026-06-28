// Generate atmospheric images for Hotel Casa Mónica showcase
// All saved to /home/z/my-project/public/
import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = '/home/z/my-project/public';

const images = [
  {
    name: 'magdalena-sunset.png',
    size: '1344x768' as const,
    prompt: 'Magdalena River at golden-hour sunset in Mompox Colombia, wide cinematic river view, slow reflective green water, a traditional wooden champán boat with palm-leaf roof drifting silhouetted against orange and amber sky, distant colonial whitewashed facades with red-tile roofs along the albarrada riverside wall, warm humid tropical atmosphere, soft mist rising from the water, painterly travel photography, fine art quality, depth, no text'
  },
  {
    name: 'mompox-street.png',
    size: '1344x768' as const,
    prompt: 'Colonial street in Mompox Colombia at morning golden light, whitewashed adobe facades with red clay tile roofs, black wrought-iron window grilles and door hardware, cobblestone street, tall wooden doors, deep green ceiba tree casting shadow, hanging potted plants, a single wooden rocking chair on a porch, warm cream and terracotta palette, atmospheric travel photography, no people, no text'
  },
  {
    name: 'santa-barbara-tower.png',
    size: '864x1152' as const,
    prompt: 'Baroque octagonal bell tower of Iglesia de Santa Bárbara in Mompox Colombia, white stucco with moldings of palm trees flowers and lion heads, ornate colonial architecture, blue sky with wispy clouds, framed against lush green foliage, dramatic low angle architectural photography, golden late afternoon light, fine art, no text'
  },
  {
    name: 'filigree-artisan.png',
    size: '864x1152' as const,
    prompt: 'Close-up of a Mompox filigree artisan\'s hands weaving fine silver threads into a delicate spiral jewel, warm lamplight on dark hardwood workbench, tiny silver spirals and gold threads arranged on leather mat, magnifying loupe, traditional Colombian filigree jewelry craft, shallow depth of field, intimate documentary photography, warm brown and silver tones, no text'
  },
  {
    name: 'momposina-food.png',
    size: '1344x768' as const,
    prompt: 'Rustic wooden table spread of momposina Caribbean Colombian food, grilled bocachico river fish, arroz de chorizo, carimañolas cassava fritters, arepa de huevo, glass of deep red vino de corozo, white plate with queso de capa stretched cheese, tropical fruit, clay pottery, woven palm placemat, warm natural window light from the side, overhead food photography, no text'
  },
  {
    name: 'cienaga-pijino.png',
    size: '1344x768' as const,
    prompt: 'Ciénaga de Pijiño lagoon near Mompox Colombia at dawn, mirror-still water reflecting pastel pink sky, white heron wading in foreground, cormorants perched on submerged branch, lush tropical vegetation along banks, soft morning mist, eco-tourism nature photography, golden water reflections, serene, no text'
  },
  {
    name: 'rocking-chair-porch.png',
    size: '1024x1024' as const,
    prompt: 'Two traditional wooden silla mecedora momposina rocking chairs on a colonial porch in Mompox Colombia, dark tropical hardwood, white stucco wall behind, red clay tile floor, potted tropical plant, soft late afternoon light casting long shadows, intimate cozy atmosphere, no people, no text'
  },
  {
    name: 'ceiba-tree.png',
    size: '864x1152' as const,
    prompt: 'Massive ancient ceiba tree in a colonial plaza in Mompox Colombia, thick buttressed trunk, spreading canopy of green leaves, white-washed colonial church facade in soft-focus background, cobblestones, dappled golden afternoon light filtering through branches, fine art travel photography, no text'
  },
  {
    name: 'cumbia-dancer.png',
    size: '864x1152' as const,
    prompt: 'Colombian cumbia dancer in flowing white cotton dress with red trim, holding candle, mid-twirl at dusk on a colonial street in Mompox, motion blur in skirt, warm lantern light, festive cultural atmosphere, rumba caribeña energy, vibrant but warm, documentary photography, no text'
  },
  {
    name: 'corozo-fruit.png',
    size: '1024x1024' as const,
    prompt: 'Cluster of deep red corozo palm berries in a small terracotta bowl on a wooden table, glass of ruby-red vino de corozo beside it, tropical Colombian setting, soft natural window light, macro food photography, rich saturated reds against warm wood, no text'
  },
  {
    name: 'mompox-night.png',
    size: '1344x768' as const,
    prompt: 'Colonial street in Mompox Colombia at night, warm yellow streetlamps illuminating whitewashed facades, black wrought-iron grilles casting shadows, red-tile roofs under deep blue twilight sky, cobblestones glistening from evening rain, single warm light in an upper window, atmospheric moody travel photography, no people, no text'
  },
  {
    name: 'hotel-patio.png',
    size: '1024x1024' as const,
    prompt: 'Intimate colonial interior patio of a small family-run posada in Mompox Colombia, potted tropical plants and ferns, terracotta tile floor, white stucco walls, dark wood balcony above, traditional wooden rocking chair, hanging lantern, soft daylight filtering through, warm and welcoming family atmosphere, no people, no text'
  },
  {
    name: 'champan-boat.png',
    size: '1344x768' as const,
    prompt: 'Traditional wooden champán river boat with palm-leaf canopy on the Magdalena River near Mompox Colombia, lone boatman poling with a long pole, calm reflective water, golden hour sunset light, distant silhouettes of trees along the bank, serene atmospheric travel photography, warm gold and amber tones, no text'
  },
  {
    name: 'momposino-family.png',
    size: '864x1152' as const,
    prompt: 'Warm portrait of a Colombian family of three generations — grandmother, mother, and child — standing in the doorway of their colonial home in Mompox, smiling genuinely, traditional simple clothing, white stucco doorway with black iron grille, soft natural light, authentic documentary family photography, warm earthy palette, no text'
  }
];

async function generateAll() {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const zai = await ZAI.create();
  const results: { name: string; ok: boolean; error?: string }[] = [];

  // Generate in parallel batches of 3 to avoid rate limits
  const BATCH = 3;
  for (let i = 0; i < images.length; i += BATCH) {
    const batch = images.slice(i, i + BATCH);
    const settled = await Promise.allSettled(
      batch.map(async (img) => {
        const out = path.join(OUTPUT_DIR, img.name);
        if (fs.existsSync(out) && fs.statSync(out).size > 10000) {
          return { name: img.name, ok: true };
        }
        const resp = await zai.images.generations.create({
          prompt: img.prompt,
          size: img.size,
        });
        const b64 = resp.data[0].base64;
        const buf = Buffer.from(b64, 'base64');
        fs.writeFileSync(out, buf);
        return { name: img.name, ok: true };
      })
    );
    for (let j = 0; j < settled.length; j++) {
      const r = settled[j];
      if (r.status === 'fulfilled') results.push(r.value);
      else results.push({ name: batch[j].name, ok: false, error: String(r.reason) });
    }
    console.log(`Batch ${i / BATCH + 1} done`);
  }

  console.log('\n=== Results ===');
  for (const r of results) {
    console.log(`${r.ok ? '✓' : '✗'} ${r.name}${r.error ? ' — ' + r.error : ''}`);
  }
}

generateAll().catch(e => {
  console.error(e);
  process.exit(1);
});
