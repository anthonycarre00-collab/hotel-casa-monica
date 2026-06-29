// Analyze all 21 video frames to classify each video and find a Mónica portrait candidate
import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const FRAMES_DIR = '/home/z/my-project/scripts/video-frames';
const REPORT = '/home/z/my-project/scripts/video-analysis.json';

type VidInfo = {
  file: string;
  frame: string;
  category: string;
  subject: string;
  isMonica: boolean;
  isFredy: boolean;
  isOwnerScene: boolean;
  isEventFestival: boolean;
  isScenery: boolean;
  isMusic: boolean;
  isFood: boolean;
  isSuitable: boolean;
  notes: string;
  warmthScore: number;
};

async function classify(zai: any, framePath: string): Promise<VidInfo> {
  const buf = fs.readFileSync(framePath);
  const b64 = buf.toString('base64');
  const prompt = `You are analyzing a still frame extracted from a video taken in Mompox, Colombia — a small family-run hotel called "Casa Mónica" run by Fredy (the husband) and Mónica (the wife). The hotel wants to use video clips and still frames on its website.

Classify this frame and respond STRICTLY as JSON (no markdown, no commentary) with these fields:
{
  "category": "owner-portrait" | "family-moment" | "hotel-exterior" | "hotel-interior" | "scenery-town" | "scenery-river" | "event-festival" | "music-performance" | "food" | "guests" | "religious-ceremony" | "other",
  "subject": "8-15 word description of what's happening in the frame",
  "isMonica": true | false  (true if a woman matching Sra Mónica's profile — typically 50s-60s Latina, dark hair, warm demeanor — is clearly visible),
  "isFredy": true | false   (true if a man matching Sr Fredy's profile — typically 50s-60s Latino, possibly with greying hair — is clearly visible),
  "isOwnerScene": true | false  (true if this is clearly at or around the hotel, with owners),
  "isEventFestival": true | false  (true if this shows a public cultural event: jazz festival, Semana Santa, cumbia, Christmas festivities, procession, concert),
  "isScenery": true | false  (true if this is mostly scenery with no people as main subject),
  "isMusic": true | false  (true if musicians/instruments/live performance is the main subject),
  "isFood": true | false,
  "isSuitable": true | false  (true if this frame would be appropriate to use on a small family hotel website — not blurry, not embarrassing, not personal private event),
  "warmthScore": <0-10>,
  "notes": "specific recommendation: use as background video? use as gallery clip? extract still frame? skip? why?"
}

Only output the JSON. No prose.`;

  const resp = await zai.chat.completions.createVision({
    model: 'glm-4v-flash',
    messages: [{
      role: 'user',
      content: [
        { type: 'text', text: prompt },
        { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${b64}` } },
      ],
    }],
  });

  let raw = resp.choices[0].message.content.trim();
  raw = raw.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '').trim();
  const m = raw.match(/\{[\s\S]*\}/);
  if (m) raw = m[0];

  let parsed: any;
  try {
    parsed = JSON.parse(raw);
  } catch {
    parsed = {
      category: 'other',
      subject: '(classification failed)',
      isMonica: false, isFredy: false, isOwnerScene: false,
      isEventFestival: false, isScenery: false, isMusic: false, isFood: false,
      isSuitable: false, warmthScore: 0, notes: 'VLM did not return parseable JSON',
    };
  }

  return {
    file: framePath.replace('scripts/video-frames/', 'uploads/99-to-review/').replace('.jpg', '.mp4').replace(/_/g, ' ').replace('8_06', '8.06').replace('8_07', '8.07').replace('8_08', '8.08').replace('8_09', '8.09').replace('PM_', 'PM ').replace('_1_', '(1)'),
    frame: framePath,
    category: parsed.category || 'other',
    subject: parsed.subject || '',
    isMonica: !!parsed.isMonica,
    isFredy: !!parsed.isFredy,
    isOwnerScene: !!parsed.isOwnerScene,
    isEventFestival: !!parsed.isEventFestival,
    isScenery: !!parsed.isScenery,
    isMusic: !!parsed.isMusic,
    isFood: !!parsed.isFood,
    isSuitable: !!parsed.isSuitable,
    notes: parsed.notes || '',
    warmthScore: parsed.warmthScore || 0,
  };
}

async function main() {
  const zai = await ZAI.create();
  const frames = fs.readdirSync(FRAMES_DIR)
    .filter(f => f.endsWith('.jpg'))
    .sort()
    .map(f => path.join(FRAMES_DIR, f));

  console.log(`Found ${frames.length} video frames to analyze.\n`);

  const results: VidInfo[] = [];
  for (const f of frames) {
    process.stdout.write(`Analyzing ${path.basename(f)} ... `);
    try {
      const info = await classify(zai, f);
      results.push(info);
      console.log(`${info.category} | monica=${info.isMonica} | fredy=${info.isFredy} | suitable=${info.isSuitable} | ${info.subject.slice(0,60)}`);
      // Save progress after each
      fs.writeFileSync(REPORT, JSON.stringify(results, null, 2));
    } catch (e: any) {
      console.log(`ERROR: ${e.message}`);
      results.push({
        file: f, frame: f, category: 'error', subject: String(e.message),
        isMonica: false, isFredy: false, isOwnerScene: false,
        isEventFestival: false, isScenery: false, isMusic: false, isFood: false,
        isSuitable: false, warmthScore: 0, notes: 'classification failed',
      });
    }
  }

  // Summary
  console.log('\n=== SUMMARY ===');
  console.log(`Total videos analyzed: ${results.length}`);
  console.log(`Monica visible: ${results.filter(r => r.isMonica).length}`);
  console.log(`Fredy visible: ${results.filter(r => r.isFredy).length}`);
  console.log(`Suitable for site: ${results.filter(r => r.isSuitable).length}`);
  console.log(`Events/festivals: ${results.filter(r => r.isEventFestival).length}`);
  console.log(`Music: ${results.filter(r => r.isMusic).length}`);
  console.log(`Scenery: ${results.filter(r => r.isScenery).length}`);

  console.log('\n=== MONICA CANDIDATES ===');
  for (const r of results.filter(r => r.isMonica)) {
    console.log(`  ★ ${path.basename(r.frame)}`);
    console.log(`    ${r.subject}`);
    console.log(`    notes: ${r.notes}`);
    console.log();
  }
}

main().catch(e => { console.error(e); process.exit(1); });
