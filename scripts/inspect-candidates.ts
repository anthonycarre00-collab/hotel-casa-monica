// Close inspection of the 2 Monica candidates + event photos to decide what to use
import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

const candidates = [
  '/home/z/my-project/upload/batch2/WhatsApp Image 2026-06-28 at 8.07.25 PM (1).jpeg',
  '/home/z/my-project/upload/batch2/WhatsApp Image 2026-06-28 at 8.07.25 PM.jpeg',
  '/home/z/my-project/upload/batch2/WhatsApp Image 2026-06-28 at 8.07.22 PM.jpeg',
  '/home/z/my-project/upload/batch2/WhatsApp Image 2026-06-28 at 8.07.24 PM (1).jpeg',
  '/home/z/my-project/upload/batch2/WhatsApp Image 2026-06-28 at 8.07.24 PM (2).jpeg',
  '/home/z/my-project/upload/batch2/WhatsApp Image 2026-06-28 at 8.07.21 PM.jpeg',
];

async function main() {
  const zai = await ZAI.create();
  for (const f of candidates) {
    const buf = fs.readFileSync(f);
    const b64 = buf.toString('base64');
    const resp = await zai.chat.completions.createVision({
      model: 'glm-4v-flash',
      messages: [{
        role: 'user',
        content: [
          { type: 'text', text: 'Describe this photo in detail. (1) Who is in it (gender, age, role)? (2) Is this suitable for a small family hotel website — why or why not? (3) Is anyone identifiable as a "mother figure" or "boss of the house" type? (4) Is this a festive/event photo or everyday moment? (5) Image quality: sharp/blurry? lighting? Under 120 words.' },
          { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${b64}` } }
        ]
      }]
    });
    console.log(`\n=== ${f.split('/').pop()} ===`);
    console.log(resp.choices[0].message.content);
  }
}
main().catch(e => { console.error(e); process.exit(1); });
