// research-coordinates-v2.js
// Robust v2 of the coordinates research: uses a sequential, rate-limited loop
// with retry/backoff for the z-ai web_search function, AND falls back to the
// public OpenStreetMap Nominatim geocoder to get authoritative lat/lon for each
// landmark. Output is a merged table.
//
// Usage: node scripts/research-coordinates-v2.js
// Output: stdout + /home/z/my-project/research/coordinates-results-v2.json

import ZAI from 'z-ai-web-dev-sdk';
import fs from 'node:fs';

const RESEARCH_DIR = '/home/z/my-project/research';
if (!fs.existsSync(RESEARCH_DIR)) fs.mkdirSync(RESEARCH_DIR, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Landmark queries for web search
const QUERIES = [
  'Iglesia Santa Bárbara Mompox coordenadas GPS ubicación',
  'Iglesia Inmaculada Concepción Mompox coordenadas GPS',
  'Iglesia San Francisco Mompox coordenadas GPS ubicación',
  'Plaza Bolívar Mompox coordenadas GPS',
  'Cementerio de Mompox coordenadas GPS ubicación',
  'Albarrada Mompox coordenadas muro río',
  'Portales de la Marquesa Mompox coordenadas GPS',
  'Casa de la Cultura Mompox coordenadas GPS',
  'Mompox centro histórico iglesias lista patrimonio UNESCO',
];

// Nominatim searches — q is the free-text query. We bias the search by
// viewbox around Mompox historic center (roughly lat 9.23-9.26, lon -74.44 to -74.41)
const NOMINATIM_LOOKUPS = [
  { label: 'Iglesia de Santa Bárbara', q: 'Iglesia Santa Barbara, Mompox, Bolívar, Colombia' },
  { label: 'Iglesia de la Inmaculada Concepción', q: 'Iglesia Inmaculada Concepción, Mompox, Bolívar, Colombia' },
  { label: 'Iglesia de San Francisco', q: 'Iglesia San Francisco, Mompox, Bolívar, Colombia' },
  { label: 'Iglesia del Sagrado Corazón', q: 'Iglesia Sagrado Corazón, Mompox, Bolívar, Colombia' },
  { label: 'Iglesia San Carlos', q: 'Iglesia San Carlos, Mompox, Bolívar, Colombia' },
  { label: 'Plaza Bolívar', q: 'Parque Central Simón Bolívar, Mompox, Bolívar, Colombia' },
  { label: 'Cementerio de Mompox', q: 'Cementerio, Mompox, Bolívar, Colombia' },
  { label: 'Albarrada de Mompox', q: 'Albarrada, Mompox, Bolívar, Colombia' },
  { label: 'Portales de la Marquesa', q: 'Portales de la Marquesa, Mompox, Bolívar, Colombia' },
  { label: 'Casa de la Cultura', q: 'Casa de la Cultura, Mompox, Bolívar, Colombia' },
];

// Viewbox = left,top,right,bottom (lon,lat,lon,lat) around Mompox
const VIEWBOX = '-74.45,9.27,-74.40,9.22';

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

async function nominatim(q) {
  const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(q)}&viewbox=${encodeURIComponent(VIEWBOX)}&bounded=1&limit=3&accept-language=es`;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'hotel-casa-monica-research/1.0 (research)' } });
      if (res.status === 429) { await sleep(3000 * attempt); continue; }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      if (attempt === 3) return { error: e.message };
      await sleep(2000 * attempt);
    }
  }
  return { error: 'unknown' };
}

async function main() {
  console.log('=== Coordinates research v2 ===\n');

  // Part 1: Web search (rate-limited, sequential)
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
    await sleep(2500); // be polite to the API
  }

  // Part 2: Nominatim lookups
  console.log('\n\n=== Nominatim (OpenStreetMap) lookups ===\n');
  const nominatimResults = [];
  for (const lookup of NOMINATIM_LOOKUPS) {
    process.stderr.write(`\n>>> NOMINATIM: ${lookup.label} (${lookup.q})\n`);
    const hits = await nominatim(lookup.q);
    nominatimResults.push({ label: lookup.label, q: lookup.q, hits });
    console.log(`\n--- ${lookup.label} ---`);
    if (Array.isArray(hits)) {
      hits.forEach((h, i) => {
        console.log(`  ${i + 1}. ${h.display_name}`);
        console.log(`     lat=${h.lat}  lon=${h.lon}  type=${h.type}  class=${h.class}  osm_type=${h.osm_type}`);
      });
      if (hits.length === 0) console.log('  (no hits within viewbox)');
    } else {
      console.log('  ERROR:', hits.error);
    }
    await sleep(1500); // Nominatim usage policy: max 1 req/sec
  }

  const out = { ranAt: new Date().toISOString(), searchResults, nominatimResults };
  const outPath = `${RESEARCH_DIR}/coordinates-results-v2.json`;
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
  console.log(`\nSaved -> ${outPath}`);
}

main().catch((e) => { console.error('Fatal:', e?.message || e); process.exit(1); });
