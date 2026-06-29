// research-filigree-v2.js
// Robust v2 of the filigree research: sequential, rate-limited, with retry
// on 429 errors. Also fetches detailed content from a couple of authoritative
// pages via the z-ai-web-dev-sdk web_reader function (if available) so we can
// extract rich visual descriptions of Mompox filigree for SVG inspiration.
//
// Usage: node scripts/research-filigree-v2.js
// Output: stdout + /home/z/my-project/research/filigree-results-v2.json

import ZAI from 'z-ai-web-dev-sdk';
import fs from 'node:fs';

const RESEARCH_DIR = '/home/z/my-project/research';
if (!fs.existsSync(RESEARCH_DIR)) fs.mkdirSync(RESEARCH_DIR, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const QUERIES = [
  'filigrana momposina técnica tradicional descripción',
  'Mompox filigree jewelry technique spiral design',
  'filigrana momposina oro hilo trenza espiral',
  'filigrana Mompox patrones motivos visuales',
  'Mompox filigree history goldsmith artisan',
  'filigrana colombiana Mompox joyería característica',
  'filigrana Mompox "hilo de oro" "granulado" técnica',
  'Mompox filigree floral motifs scroll work',
  'filigrana Mompox piezas tradicionales dormilona cadena',
  'Mompox filigree UNESCO patrimonio inmaterial Colombia',
  'filigrana Mompox cordoncillo filamento técnica',
  'filigrana momposina pasos elaboración hilo dorado',
  'filigrana momposina mariposa flor corazón motivos',
  'Mompox joyería artesanal descripción turística',
];

// Pages we want to read in full for rich description
const READ_URLS = [
  'https://joyasdelavilla.com/mompox/', // Joyas de la Villa — Mompox filigree specialist
  'https://selvadeoro.com/pages/filigrana-momposina', // background
];

async function searchOneWithRetry(zai, query, num = 6, maxRetries = 4) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const results = await zai.functions.invoke('web_search', { query, num });
      return { query, ok: true, attempts: attempt, results: Array.isArray(results) ? results : [] };
    } catch (e) {
      const msg = e?.message || String(e);
      if (msg.includes('429') && attempt < maxRetries) {
        const wait = 4000 * attempt;
        process.stderr.write(`  [429] retry in ${wait}ms (attempt ${attempt}/${maxRetries})\n`);
        await sleep(wait);
        continue;
      }
      return { query, ok: false, error: msg, attempts: attempt, results: [] };
    }
  }
}

async function readUrlWithRetry(zai, url, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const res = await zai.functions.invoke('web_reader', { url });
      return { url, ok: true, attempts: attempt, result: res };
    } catch (e) {
      const msg = e?.message || String(e);
      if (msg.includes('429') && attempt < maxRetries) {
        const wait = 4000 * attempt;
        process.stderr.write(`  [429] retry in ${wait}ms (attempt ${attempt}/${maxRetries})\n`);
        await sleep(wait);
        continue;
      }
      return { url, ok: false, error: msg, attempts: attempt };
    }
  }
}

async function main() {
  console.log('=== Filigree research v2 ===\n');

  const zai = await ZAI.create();
  const searchResults = [];
  for (const q of QUERIES) {
    process.stderr.write(`\n>>> SEARCH: ${q}\n`);
    const r = await searchOneWithRetry(zai, q, 6);
    searchResults.push(r);
    console.log(`\n===== ${q} =====`);
    if (!r.ok) { console.log('  ERROR:', r.error); }
    r.results.forEach((it, i) => {
      console.log(`  ${i + 1}. ${it.name}`);
      console.log(`     ${it.url}`);
      console.log(`     ${(it.snippet || '').replace(/\s+/g, ' ').slice(0, 350)}`);
    });
    await sleep(2500);
  }

  // Read 2 authoritative pages in full
  console.log('\n\n=== Web reader (full pages) ===\n');
  const readResults = [];
  for (const url of READ_URLS) {
    process.stderr.write(`\n>>> READ: ${url}\n`);
    const r = await readUrlWithRetry(zai, url);
    readResults.push(r);
    console.log(`\n--- ${url} ---`);
    if (!r.ok) { console.log('  ERROR:', r.error); continue; }
    // web_reader returns rich object; print a preview
    const content = r.result?.content || r.result?.markdown || r.result?.text || '';
    const title = r.result?.title || '';
    console.log(`  Title: ${title}`);
    console.log(`  Content preview (first 2000 chars):\n${(typeof content === 'string' ? content : JSON.stringify(content)).slice(0, 2000)}`);
    await sleep(2500);
  }

  const out = { ranAt: new Date().toISOString(), searchResults, readResults };
  const outPath = `${RESEARCH_DIR}/filigree-results-v2.json`;
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
  console.log(`\nSaved -> ${outPath}`);
}

main().catch((e) => { console.error('Fatal:', e?.message || e); process.exit(1); });
