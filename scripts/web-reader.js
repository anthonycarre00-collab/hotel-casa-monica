// web-reader.js
// Web page content extraction script using z-ai-web-dev-sdk.
//
// Usage:
//   node scripts/web-reader.js <url>
//   node scripts/web-reader.js --batch
//   node scripts/web-reader.js --file urls.txt        (one URL per line)
//
// For each URL, fetches the page, strips HTML to plain text, and saves:
//   - research/page-<slug>-<stamp>.txt   (plain text body)
//   - research/page-<slug>-<stamp>.meta.json (title, url, publishedTime, raw html path)
//   - research/page-<slug>-<stamp>.html    (raw html, optional via --keep-html)
//
// Also prints a short preview to stdout.

import ZAI from 'z-ai-web-dev-sdk';
import fs from 'node:fs';
import path from 'node:path';

const RESEARCH_DIR = '/home/z/my-project/research';
if (!fs.existsSync(RESEARCH_DIR)) fs.mkdirSync(RESEARCH_DIR, { recursive: true });

function slugify(s) {
  try {
    const u = new URL(s);
    return (u.hostname.replace(/^www\./, '') + u.pathname)
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 80) || 'page';
  } catch {
    return 'page';
  }
}

function stamp() {
  return new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
}

// Minimal HTML -> text conversion (no external deps).
function htmlToText(html) {
  if (!html) return '';
  let t = html;
  // Drop script/style/noscript blocks entirely
  t = t.replace(/<script[\s\S]*?<\/script>/gi, ' ');
  t = t.replace(/<style[\s\S]*?<\/style>/gi, ' ');
  t = t.replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ');
  t = t.replace(/<!--[\s\S]*?-->/g, ' ');
  // Turn block-level tags into newlines so structure survives
  t = t.replace(/<\/(p|div|section|article|li|h[1-6]|tr|br|header|footer|main|nav|aside|figure|figcaption|blockquote)>/gi, '\n');
  t = t.replace(/<br\s*\/?>/gi, '\n');
  // Strip remaining tags
  t = t.replace(/<[^>]+>/g, ' ');
  // Decode a handful of common HTML entities
  const entities = {
    '&nbsp;': ' ', '&amp;': '&', '&lt;': '<', '&gt;': '>',
    '&quot;': '"', '&#39;': "'", '&apos;': "'",
    '&aacute;': 'á', '&eacute;': 'é', '&iacute;': 'í', '&oacute;': 'ó', '&uacute;': 'ú',
    '&ntilde;': 'ñ', '&Aacute;': 'Á', '&Eacute;': 'É', '&Iacute;': 'Í',
    '&Oacute;': 'Ó', '&Uacute;': 'Ú', '&Ntilde;': 'Ñ',
    '&laquo;': '«', '&raquo;': '»', '&mdash;': '—', '&ndash;': '–',
    '&hellip;': '…', '&deg;': '°', '&copy;': '©', '&reg;': '®',
  };
  t = t.replace(/&[a-z#0-9]+;/gi, (m) => entities[m.toLowerCase()] || m);
  // Collapse whitespace per line, drop empty lines
  t = t.split('\n').map((l) => l.replace(/[ \t\f\v]+/g, ' ').trim()).filter(Boolean).join('\n');
  // Collapse 3+ newlines to 2
  t = t.replace(/\n{3,}/g, '\n\n');
  return t.trim();
}

// Priority URLs to read in --batch mode. Ordered by importance for the
// Casa Monica Mompox research project.
const BATCH_URLS = [
  // === Hotel Casa Monica ===
  'https://hotelesbeijing.com.co/hotel/hotel-casa-monica/',
  'https://www.instagram.com/casamonicamompox/',
  'https://www.instagram.com/casamonicamompox/reels/',
  'https://www.revistalabarra.com/bolivar/restaurantes?page=58',
  // === Town / UNESCO / history ===
  'https://whc.unesco.org/en/list/742',
  'https://en.wikipedia.org/wiki/Santa_Cruz_de_Mompox',
  'https://es.wikipedia.org/wiki/Santa_Cruz_de_Mompox',
  'https://aventurecolombia.com/es/mompox-guia-de-viaje',
  'https://www.tomplanmytrip.com/es/blog-colombia/destinos/costa-caribe-este/santa-cruz-de-mompox',
  'https://uncovercolombia.com/es/blog/mompox-colombia-timeless-colonial-gem-for-culture-and-history-lovers',
  'https://colombia.travel/en/blog/mompox-colonial-island-in-magdalena-river',
  // === Attractions / culture / gastronomy ===
  'https://www.hotelkarakali.com/restaurantes-en-mompox',
  'https://colombia.travel/en/blog/holy-week-mompox',
  'https://www.bioma.co/es/post/descubriendo-los-tesoros-arquitect%C3%B3nicos-de-una-ciudad-colonial',
  'https://joyasdelavilla.com/mompox/',
  // === Nature / day trips ===
  'https://colombia.travel/es/mompox/ir-la-cienaga-de-pijino',
  'https://nomadicniko.com/colombia/cienaga-de-pijino',
  'https://turismomompox.com/producto/ruta-cienaga-de-pijino',
  // === Climate ===
  'https://weatherspark.com/y/23442/Average-Weather-in-Momp%C3%B3s-Colombia-Year-Round',
];

async function readOne(zai, url, keepHtml) {
  try {
    const result = await zai.functions.invoke('page_reader', { url });
    const data = result?.data || {};
    const title = data.title || '(no title)';
    const html = data.html || '';
    const text = htmlToText(html);
    const publishedTime = data.publishedTime || '';
    const finalUrl = data.url || url;

    const slug = slugify(url);
    const s = stamp();
    const txtPath = path.join(RESEARCH_DIR, `page-${slug}-${s}.txt`);
    const metaPath = path.join(RESEARCH_DIR, `page-${slug}-${s}.meta.json`);
    fs.writeFileSync(txtPath, text);
    const meta = {
      requestedUrl: url,
      finalUrl,
      title,
      publishedTime,
      textFile: txtPath,
      textLength: text.length,
      htmlLength: html.length,
      usage: result?.meta?.usage || result?.data?.usage || null,
      fetchedAt: new Date().toISOString(),
    };
    if (keepHtml) {
      const htmlPath = path.join(RESEARCH_DIR, `page-${slug}-${s}.html`);
      fs.writeFileSync(htmlPath, html);
      meta.htmlFile = htmlPath;
    }
    fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2));
    return { ok: true, url, finalUrl, title, publishedTime, text, textFile: txtPath, metaFile: metaPath, textLength: text.length };
  } catch (e) {
    return { ok: false, url, error: e?.message || String(e) };
  }
}

async function main() {
  const argv = process.argv.slice(2);
  let urls = [];
  let keepHtml = false;

  if (argv.length === 0) {
    urls = BATCH_URLS;
  } else if (argv[0] === '--batch') {
    urls = BATCH_URLS;
    if (argv.includes('--keep-html')) keepHtml = true;
  } else if (argv[0] === '--file') {
    const file = argv[1];
    if (!file) { console.error('--file requires a path'); process.exit(1); }
    urls = fs.readFileSync(file, 'utf8').split('\n').map((l) => l.trim()).filter(Boolean);
    if (argv.includes('--keep-html')) keepHtml = true;
  } else {
    // single url mode
    urls = [argv[0]];
    if (argv.includes('--keep-html')) keepHtml = true;
  }

  const zai = await ZAI.create();
  const results = [];
  for (const url of urls) {
    process.stderr.write(`\n>>> Reading: ${url}\n`);
    const r = await readOne(zai, url, keepHtml);
    results.push(r);
    console.log(`\n===== ${url} =====`);
    if (!r.ok) {
      console.log(`  ERROR: ${r.error}`);
      continue;
    }
    console.log(`  Title : ${r.title}`);
    console.log(`  Final : ${r.finalUrl}`);
    console.log(`  Pub   : ${r.publishedTime || '(n/a)'}`);
    console.log(`  Length: ${r.textLength} chars`);
    console.log(`  Saved : ${r.textFile}`);
    console.log('--- preview (first 1200 chars) ---');
    console.log(r.text.slice(0, 1200));
    console.log('--- end preview ---');
  }

  // Save consolidated index
  const indexFile = path.join(RESEARCH_DIR, `pages-index-${stamp()}.json`);
  fs.writeFileSync(indexFile, JSON.stringify(results.map((r) => ({
    ok: r.ok,
    url: r.url,
    finalUrl: r.finalUrl,
    title: r.title,
    publishedTime: r.publishedTime,
    textFile: r.textFile,
    metaFile: r.metaFile,
    textLength: r.textLength,
    error: r.error,
  })), null, 2));
  console.log(`\nSaved page index -> ${indexFile}`);
}

main().catch((e) => {
  console.error('Fatal:', e?.message || e);
  process.exit(1);
});
