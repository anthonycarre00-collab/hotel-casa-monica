// web-search.js
// Web search script using z-ai-web-dev-sdk.
// Usage:
//   node scripts/web-search.js "single query" [num]
//   node scripts/web-search.js --batch
//   node scripts/web-search.js --file queries.txt   (one query per line)
//
// Results are pretty-printed to stdout AND saved to
// /home/z/my-project/research/search-<slug>-<timestamp>.json

import ZAI from 'z-ai-web-dev-sdk';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const RESEARCH_DIR = '/home/z/my-project/research';

if (!fs.existsSync(RESEARCH_DIR)) {
  fs.mkdirSync(RESEARCH_DIR, { recursive: true });
}

function slugify(s) {
  return s.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'query';
}

function stamp() {
  const d = new Date();
  return d.toISOString().replace(/[:.]/g, '-').slice(0, 19);
}

// Default batch of queries covering the hotel, the town, and surrounding area.
// All hotel queries are scoped with "Mompox Colombia" to disambiguate from the
// unrelated Casa Monica Resort & Spa in St. Augustine, Florida.
const BATCH_QUERIES = [
  // Hotel specific (disambiguated)
  '"Casa Monica" Mompox Colombia hotel',
  '"Casa Monica" Mompos Bolivar hotel habitaciones',
  'casamonicamompox Instagram Mompox',
  'Hotel Casa Monica Mompos Colombia precio contacto',
  '"Casa Monica" Mompox Booking.com hotel',
  '"Casa Monica" Mompox Expedia hotel',
  'hotelesbeijing.com.co "Casa Monica" Mompos',
  'Casa Monica Mompox dueños propietarios historia',
  'Casa Monica Mompox reseñas huéspedes opiniones',
  'Mompox hoteles coloniales boutique recomendados',
  // Town / region
  'Mompos Colombia turismo guía',
  'Mompox Bolivar Colombia historia colonial',
  'Mompox UNESCO World Heritage 1995',
  'Mompox Colombia arquitectura colonial iglesias',
  'Mompox Magdalena River attractions things to do',
  'Mompox Colombia climate weather when to visit',
  'how to get to Mompox Colombia bus transport',
  'Mompox Semana Santa festivals culture',
  'Mompox gastronomy comida típica platos',
  'Mompox música tradicional porro cumbia folklore',
  // Surrounding area / day trips
  'Mompox day trips Pijiño swamp Ciénaga',
  'Ciénaga de Pijiño Mompox naturaleza paseo',
  'Isla de Salamanca Mompox nearby',
  'Mompox alrededores paseos río tours',
  'Mompox mangroves birdwatching nature',
];

async function searchOne(zai, query, num = 10) {
  try {
    const results = await zai.functions.invoke('web_search', {
      query,
      num,
    });
    return { query, num, ok: true, results: Array.isArray(results) ? results : [] };
  } catch (e) {
    return { query, num, ok: false, error: e?.message || String(e), results: [] };
  }
}

async function runQueries(queries, num) {
  const zai = await ZAI.create();
  const out = [];
  for (const q of queries) {
    process.stderr.write(`\n>>> Searching: ${q}\n`);
    const res = await searchOne(zai, q, num);
    out.push(res);
    // Print compact summary to stdout
    console.log(`\n===== QUERY: ${q} =====`);
    if (!res.ok) {
      console.log(`  ERROR: ${res.error}`);
      continue;
    }
    res.results.forEach((item, i) => {
      console.log(`  ${i + 1}. ${item.name}`);
      console.log(`     URL : ${item.url}`);
      console.log(`     Host: ${item.host_name} | Date: ${item.date}`);
      console.log(`     Snip: ${(item.snippet || '').replace(/\s+/g, ' ').slice(0, 300)}`);
    });
    console.log(`  (total: ${res.results.length})`);
  }
  return out;
}

async function main() {
  const argv = process.argv.slice(2);

  let queries = [];
  let num = 10;

  if (argv.length === 0) {
    queries = BATCH_QUERIES;
  } else if (argv[0] === '--batch') {
    queries = BATCH_QUERIES;
    if (argv[1]) num = parseInt(argv[1], 10) || 10;
  } else if (argv[0] === '--file') {
    const file = argv[1];
    if (!file) {
      console.error('--file requires a path argument');
      process.exit(1);
    }
    queries = fs.readFileSync(file, 'utf8')
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);
    if (argv[2]) num = parseInt(argv[2], 10) || 10;
  } else {
    // single query mode
    queries = [argv.join(' ')];
  }

  const results = await runQueries(queries, num);

  // Save consolidated JSON
  const summaryFile = path.join(RESEARCH_DIR, `search-results-${stamp()}.json`);
  fs.writeFileSync(summaryFile, JSON.stringify(results, null, 2));
  console.log(`\n\nSaved consolidated results -> ${summaryFile}`);

  // Also save one file per query for easy downstream reading
  for (const r of results) {
    const fn = path.join(RESEARCH_DIR, `search-${slugify(r.query)}-${stamp()}.json`);
    fs.writeFileSync(fn, JSON.stringify(r, null, 2));
  }
  console.log(`Saved ${results.length} per-query JSON files to ${RESEARCH_DIR}`);
}

main().catch((e) => {
  console.error('Fatal:', e?.message || e);
  process.exit(1);
});
