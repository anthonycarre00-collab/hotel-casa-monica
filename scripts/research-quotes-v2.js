// research-quotes-v2.js
// Verify exact wording of García Márquez quotes and gather additional ones by
// reading authoritative pages in full via the z-ai web_reader function.
//
// Usage: node scripts/research-quotes-v2.js
// Output: stdout + /home/z/my-project/research/quotes-results-v2.json

import ZAI from 'z-ai-web-dev-sdk';
import fs from 'node:fs';

const RESEARCH_DIR = '/home/z/my-project/research';
if (!fs.existsSync(RESEARCH_DIR)) fs.mkdirSync(RESEARCH_DIR, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Authoritative / high-signal pages to read in full
const READ_URLS = [
  // Centro Gabo article: 13 phrases of García Márquez on the Caribbean
  'https://centrogabo.org/gabo/hablemos-de-gabo/el-caribe-en-13-frases-de-gabriel-garcia-marquez',
  // Centro Gabo article on magical realism in 7 reflections
  'https://centrogabo.org/gabo/contemos-gabo/el-realismo-magico-en-7-reflexiones-de-gabriel-garcia-marquez',
  // Smithsonian magazine on Mompox and García Márquez (English)
  'https://www.smithsonianmag.com/smart-news/mompox-does-exist-town-captured-marquez-rediscovered-180951318',
  // Bradt Guides: García Márquez, The Liberator and me — journey to Mompox
  'https://www.bradtguides.com/garcia-marquez-mompox',
  // Colombia.travel Mompox page (official tourism board)
  'https://colombia.travel/es/mompox',
  // Lonely Planet Mompox / Macondo piece
  'https://www.lonelyplanet.es/blog/escapadas/mompox-un-viaje-al-realismo-magico',
];

async function readUrlWithRetry(zai, url, maxRetries = 4) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const res = await zai.functions.invoke('web_reader', { url });
      return { url, ok: true, attempts: attempt, result: res };
    } catch (e) {
      const msg = e?.message || String(e);
      if (msg.includes('429') && attempt < maxRetries) {
        const wait = 5000 * attempt;
        process.stderr.write(`  [429] retry in ${wait}ms (attempt ${attempt}/${maxRetries})\n`);
        await sleep(wait);
        continue;
      }
      return { url, ok: false, error: msg, attempts: attempt };
    }
  }
}

function extractContent(res) {
  if (!res) return '';
  if (typeof res === 'string') return res;
  if (typeof res.content === 'string') return res.content;
  if (typeof res.markdown === 'string') return res.markdown;
  if (typeof res.text === 'string') return res.text;
  if (typeof res.html === 'string') return res.html;
  try { return JSON.stringify(res); } catch { return ''; }
}

async function main() {
  console.log('=== Quotes research v2 (web reader) ===\n');
  const zai = await ZAI.create();
  const readResults = [];
  for (const url of READ_URLS) {
    process.stderr.write(`\n>>> READ: ${url}\n`);
    const r = await readUrlWithRetry(zai, url);
    readResults.push(r);
    console.log(`\n===== ${url} =====`);
    if (!r.ok) { console.log('  ERROR:', r.error); continue; }
    const content = extractContent(r.result);
    const title = r.result?.title || '(no title)';
    console.log(`  Title: ${title}`);
    console.log(`  Length: ${content.length} chars`);
    console.log(`  --- First 2500 chars ---`);
    console.log(content.slice(0, 2500));
    console.log(`  --- ... ---`);
    await sleep(2500);
  }
  const out = { ranAt: new Date().toISOString(), readResults };
  const outPath = `${RESEARCH_DIR}/quotes-results-v2.json`;
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
  console.log(`\nSaved -> ${outPath}`);
}

main().catch((e) => { console.error('Fatal:', e?.message || e); process.exit(1); });
