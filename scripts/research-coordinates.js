// research-coordinates.js
// Search the web for GPS coordinates of key Mompox historic-center landmarks.
//
// Usage: node scripts/research-coordinates.js
// Output: stdout + /home/z/my-project/research/coordinates-results.json

import ZAI from 'z-ai-web-dev-sdk';
import fs from 'node:fs';

const RESEARCH_DIR = '/home/z/my-project/research';
if (!fs.existsSync(RESEARCH_DIR)) fs.mkdirSync(RESEARCH_DIR, { recursive: true });

const QUERIES = [
  'Iglesia Santa Bárbara Mompox coordenadas GPS latitud longitud',
  'Iglesia Santa Bárbara Mompox Bolívar Colombia ubicación',
  'Iglesia Inmaculada Concepción Mompox coordenadas GPS',
  'Iglesia San Francisco Mompox coordenadas GPS ubicación',
  'Plaza Bolívar Mompox coordenadas GPS',
  'Cementerio de Mompox coordenadas GPS ubicación',
  'Albarrada Mompox coordenadas muro río',
  'Portales de la Marquesa Mompox coordenadas GPS',
  'Casa de la Cultura Mompox coordenadas GPS',
  'Mompox iglesias patrimonio UNESCO lista coordenadas',
  'Mompox historic center map landmarks coordinates',
  'Iglesia Sagrado Corazón Mompox coordenadas',
  'Iglesia de la Concepción Mompox Bolívar ubicación',
  'Mompox convento San Agustín San Carlos coordenadas',
  'Casa del Portal de la Marquesa Mompox Bolívar',
  'Mompox centro histórico mapa turístico iglesias',
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
  const outPath = `${RESEARCH_DIR}/coordinates-results.json`;
  fs.writeFileSync(outPath, JSON.stringify(all, null, 2));
  console.log(`\nSaved -> ${outPath}`);
}

main().catch((e) => { console.error('Fatal:', e?.message || e); process.exit(1); });
