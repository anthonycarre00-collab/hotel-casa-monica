// research-filigree.js
// Search the web for descriptions of traditional Mompox filigree jewelry,
// focusing on visual structure (spiral motifs, thread patterns, techniques)
// for SVG divider inspiration.
//
// Usage: node scripts/research-filigree.js
// Output: stdout + /home/z/my-project/research/filigree-results.json

import ZAI from 'z-ai-web-dev-sdk';
import fs from 'node:fs';

const RESEARCH_DIR = '/home/z/my-project/research';
if (!fs.existsSync(RESEARCH_DIR)) fs.mkdirSync(RESEARCH_DIR, { recursive: true });

const QUERIES = [
  'filigrana Mompox técnica tradicional descripción',
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
  'Mompox joyería artesanal descripción turística',
  'filigree spiral gold thread jewelry description',
  'Mompox filigrana dendritas plumas mariposa motivos',
];

async function searchOne(zai, query, num = 10) {
  try {
    const results = await zai.functions.invoke('web_search', { query, num });
    return { query, ok: true, results: Array.isArray(results) ? results : [] };
  } catch (e) {
    return { query, ok: false, error: e?.message || String(e), results: [] };
  }
}

async function main() {
  const zai = await ZAI.create();
  const all = [];
  for (const q of QUERIES) {
    process.stderr.write(`\n>>> ${q}\n`);
    const r = await searchOne(zai, q, 8);
    all.push(r);
    console.log(`\n===== ${q} =====`);
    if (!r.ok) { console.log('  ERROR:', r.error); continue; }
    r.results.forEach((it, i) => {
      console.log(`  ${i + 1}. ${it.name}`);
      console.log(`     ${it.url}`);
      console.log(`     ${(it.snippet || '').replace(/\s+/g, ' ').slice(0, 400)}`);
    });
  }
  const outPath = `${RESEARCH_DIR}/filigree-results.json`;
  fs.writeFileSync(outPath, JSON.stringify(all, null, 2));
  console.log(`\nSaved -> ${outPath}`);
}

main().catch((e) => { console.error('Fatal:', e?.message || e); process.exit(1); });
