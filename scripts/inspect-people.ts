// Closer look at the 3 WhatsApp people images to determine which (if any) are Fredy & Monica
import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

const files = [
  '/home/z/my-project/upload/WhatsApp Image 2026-06-28 at 7.13.39 PM.jpeg',
  '/home/z/my-project/upload/WhatsApp Image 2026-06-28 at 7.13.39 PM (1).jpeg',
  '/home/z/my-project/upload/WhatsApp Image 2026-06-28 at 7.13.39 PM (2).jpeg',
];

async function main() {
  const zai = await ZAI.create();
  for (const f of files) {
    const buf = fs.readFileSync(f);
    const b64 = buf.toString('base64');
    const resp = await zai.chat.completions.createVision({
      model: 'glm-4v-flash',
      messages: [{
        role: 'user',
        content: [
          { type: 'text', text: 'Describe this image in detail. Who is in it (age, gender, role, relationship if multiple people)? What are they wearing? Where is this (hotel lobby, town square, terrace)? Is this likely the OWNER of a small family hotel, a GUEST, or a local personality? Is there any visible text or signage? Under 150 words.' },
          { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${b64}` } }
        ]
      }]
    });
    console.log(`\n=== ${f.split('/').pop()} ===`);
    console.log(resp.choices[0].message.content);
  }
}
main().catch(e => { console.error(e); process.exit(1); });
