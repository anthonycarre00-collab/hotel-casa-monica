// research-dialect.js
// Search the web for Momposino / Bolívar / Colombian-Caribbean regional Spanish
// vocabulary for a mini-dictionary feature.
//
// Usage: node scripts/research-dialect.js
// Output: stdout + /home/z/my-project/research/dialect-results.json

import ZAI from 'z-ai-web-dev-sdk';
import fs from 'node:fs';

const RESEARCH_DIR = '/home/z/my-project/research';
if (!fs.existsSync(RESEARCH_DIR)) fs.mkdirSync(RESEARCH_DIR, { recursive: true });

const QUERIES = [
  'momposino dialecto palabras regionalismo diccionario',
  'Mompox palabras típicas vocabulario local',
  'dialecto costeño Bolívar Colombia palabras',
  'Mompox gastronomía vocabulario casabito quesito capa butifarra',
  'Mompox corozo butifarra casabito comida típica',
  'champán Mompox embarcación río Magdalena',
  'Mompox comida típica postres dulce nombre',
  'regionalismos Bolívar Colombia "casabito" "queso de capa" "butifarra"',
  'costeñol palabras propias Caribe colombiano',
  'Mompox plantas frutas regionales corozo mamón',
  'Mompox "albarrada" "portales" arquitectura palabras',
  'vocabulario pescadores Mompox río Magdalena',
  'dialecto Mompox "di" "jeva" "corroncho" significado',
  'Mompox Semana Santa palabras tradicionales',
  'colombianismos Caribe "chévere" "acosar" "piango" significado',
  'Mompox "queso de capa" "dulce de leche" "cabecita"',
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
  const outPath = `${RESEARCH_DIR}/dialect-results.json`;
  fs.writeFileSync(outPath, JSON.stringify(all, null, 2));
  console.log(`\nSaved -> ${outPath}`);
}

main().catch((e) => { console.error('Fatal:', e?.message || e); process.exit(1); });
