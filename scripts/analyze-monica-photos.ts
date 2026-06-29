// Analyze the 6 Mónica photos to pick the best portrait
import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

const files = [
  '/home/z/my-project/upload/pasted_image_1782705628242.jpg',
  '/home/z/my-project/upload/pasted_image_1782705645723.jpg',
  '/home/z/my-project/upload/pasted_image_1782705667534.jpg',
  '/home/z/my-project/upload/pasted_image_1782705732311.jpg',
  '/home/z/my-project/upload/pasted_image_1782705754058.jpg',
  '/home/z/my-project/upload/pasted_image_1782705767107.jpg',
];

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

async function main() {
  const zai = await ZAI.create();
  const results = [];
  for (const f of files) {
    const buf = fs.readFileSync(f);
    const b64 = buf.toString('base64');
    try {
      const resp = await zai.chat.completions.createVision({
        model: 'glm-4v-flash',
        messages: [{
          role: 'user',
          content: [
            { type: 'text', text: 'This is a photo that may contain Sra Mónica, the female owner of a small family hotel in Mompox, Colombia. Please analyze: (1) Is there a woman in the photo who could be Mónica (likely 50s-60s Latina)? (2) Describe her appearance, expression, what she is doing. (3) Is her face clearly visible? (4) Is the photo sharp and well-lit? (5) Rate 1-10 as a portrait for a hotel website owner card (4:5 vertical crop). (6) Where in the frame is she (left/center/right, top/bottom)? (7) Would cropping to 4:5 vertical work well? Under 120 words.' },
            { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${b64}` } }
          ]
        }]
      });
      const text = resp.choices[0].message.content;
      results.push({ file: f, analysis: text });
      console.log(`\n=== ${f.split('/').pop()} ===`);
      console.log(text);
    } catch (e: any) {
      console.log(`\n=== ${f.split('/').pop()} === ERROR: ${e.message}`);
      results.push({ file: f, error: e.message });
      await sleep(10000);
    }
    fs.writeFileSync('/home/z/my-project/scripts/monica-photos-analysis.json', JSON.stringify(results, null, 2));
    await sleep(4000);
  }
  console.log('\n=== DONE ===');
}
main().catch(e => { console.error(e); process.exit(1); });
