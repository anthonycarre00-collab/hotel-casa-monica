// research-quotes.js
// Search the web for García Márquez / magical-realism quotes tied to Mompox,
// Macondo, the Río Magdalena, and the Colombian Caribbean.
//
// Usage: node scripts/research-quotes.js
// Output: stdout + /home/z/my-project/research/quotes-results.json

import ZAI from 'z-ai-web-dev-sdk';
import fs from 'node:fs';

const RESEARCH_DIR = '/home/z/my-project/research';
if (!fs.existsSync(RESEARCH_DIR)) fs.mkdirSync(RESEARCH_DIR, { recursive: true });

const QUERIES = [
  'García Márquez Mompox cita frase',
  'García Márquez Macondo cita realismo mágico',
  'Gabriel García Márquez Río Magdalena cita',
  '"García Márquez" Mompox Macondo inspiración',
  'García Márquez Cien Años Soledad Macondo fundación cita',
  'García Márquez El amor en los tiempos del cólera Magdalena cita',
  'Simón Bolívar Mompox gloria cita',
  '"Por Mompox no se pasa, a Mompox se llega" origen',
  'García Márquez Caribe colombiano cita calor',
  'García Márquez Mompox Memoria de mis putas tristes',
  'García Márquez MomposViaje largo cita',
  'realismo mágico Mompox Macondo diferencias historia',
  'García Márquez abuelos Aracataca Mompox infancia',
  'García Márquez "la vida no es la que uno vivió" Mompox',
  'cita Mompox pueblo colonial tranquilo río',
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
  const outPath = `${RESEARCH_DIR}/quotes-results.json`;
  fs.writeFileSync(outPath, JSON.stringify(all, null, 2));
  console.log(`\nSaved -> ${outPath}`);
}

main().catch((e) => { console.error('Fatal:', e?.message || e); process.exit(1); });
