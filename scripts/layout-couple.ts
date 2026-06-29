// Determine spatial layout of the couple photo for cropping
import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

async function main() {
  const zai = await ZAI.create();
  const f = '/home/z/my-project/upload/WhatsApp Image 2026-06-28 at 7.13.39 PM (2).jpeg';
  const buf = fs.readFileSync(f);
  const b64 = buf.toString('base64');
  const resp = await zai.chat.completions.createVision({
    model: 'glm-4v-flash',
    messages: [{
      role: 'user',
      content: [
        { type: 'text', text: 'This is a photo of a couple standing in front of a hotel. I need to crop it into two separate portraits. Please tell me: (1) Is the man on the LEFT or RIGHT side of the image? (2) Is the woman on the LEFT or RIGHT side? (3) Approximately what percentage of the image width does each person occupy? (4) Are they standing close together or far apart? (5) Is there anything in the background above/behind them that I should preserve? Answer in under 100 words, be precise about left/right positions.' },
        { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${b64}` } }
      ]
    }]
  });
  console.log(resp.choices[0].message.content);
}
main().catch(e => { console.error(e); process.exit(1); });
