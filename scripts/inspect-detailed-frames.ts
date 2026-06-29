// Closely inspect the detailed frames to find a clear Mónica portrait
import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

const frames = fs.readdirSync('/home/z/my-project/scripts/video-frames-detailed')
  .filter(f => f.endsWith('.jpg'))
  .sort()
  .map(f => `/home/z/my-project/scripts/video-frames-detailed/${f}`);

async function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  const zai = await ZAI.create();
  for (const f of frames) {
    const buf = fs.readFileSync(f);
    const b64 = buf.toString('base64');
    try {
      const resp = await zai.chat.completions.createVision({
        model: 'glm-4v-flash',
        messages: [{
          role: 'user',
          content: [
            { type: 'text', text: 'Describe who is in this frame. Is there a middle-aged Latina woman (50s-60s) who could be a hotel owner? Describe her appearance, expression, what she is doing. Is the frame sharp and well-lit enough to use as a portrait? Rate the frame quality 1-10 for use as a website portrait. Under 80 words.' },
            { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${b64}` } }
          ]
        }]
      });
      console.log(`\n=== ${f.split('/').pop()} ===`);
      console.log(resp.choices[0].message.content);
    } catch (e: any) {
      console.log(`\n=== ${f.split('/').pop()} === ERROR: ${e.message}`);
    }
    await sleep(2500); // 2.5s between calls to avoid rate limit
  }
}
main().catch(e => { console.error(e); process.exit(1); });
