// research-weather.js
// Verify the Open-Meteo API endpoint for Mompox weather (lat 9.2414, lon -74.4258).
// Calls the API directly (no SDK needed) and pretty-prints the JSON structure.
//
// Usage: node scripts/research-weather.js
// Output: stdout + /home/z/my-project/research/weather-api-response.json

import fs from 'node:fs';

const LAT = 9.2414;
const LON = -74.4258;
const TZ = 'America/Bogota';

const RESEARCH_DIR = '/home/z/my-project/research';
if (!fs.existsSync(RESEARCH_DIR)) fs.mkdirSync(RESEARCH_DIR, { recursive: true });

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText} for ${url}`);
  return res.json();
}

async function main() {
  console.log('=== Open-Meteo API Verification for Mompox ===\n');

  // 1. The exact URL the user asked to verify (current weather only).
  const currentOnlyUrl = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,relative_humidity_2m,weather_code&timezone=${TZ}`;
  console.log('URL (current only):');
  console.log(currentOnlyUrl, '\n');

  const currentOnly = await fetchJson(currentOnlyUrl);
  console.log('--- Response (current only) ---');
  console.log(JSON.stringify(currentOnly, null, 2));
  console.log();

  // 2. A richer URL we recommend for v2.0 (adds apparent temp, wind, is_day, precipitation).
  const richUrl = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=${TZ}&forecast_days=3`;
  console.log('URL (rich, recommended for v2.0):');
  console.log(richUrl, '\n');

  const rich = await fetchJson(richUrl);
  console.log('--- Response (rich) ---');
  console.log(JSON.stringify(rich, null, 2));
  console.log();

  // 3. Geocoding sanity check — what does Open-Meteo think "Mompox" resolves to?
  const geoUrl = 'https://geocoding-api.open-meteo.com/v1/search?name=Mompox&count=5&language=es&format=json';
  console.log('Geocoding URL:', geoUrl, '\n');
  try {
    const geo = await fetchJson(geoUrl);
    console.log('--- Geocoding Response (Mompox) ---');
    console.log(JSON.stringify(geo, null, 2));
  } catch (e) {
    console.log('Geocoding failed:', e.message);
  }
  console.log();

  // 4. Save consolidated response
  const out = {
    verifiedAt: new Date().toISOString(),
    coordinatesRequested: { latitude: LAT, longitude: LON },
    coordinatesReturnedByApi: { latitude: currentOnly.latitude, longitude: currentOnly.longitude },
    note: 'Open-Meteo snaps the requested lon/lat to its nearest grid cell (lon -74.389 vs requested -74.426), which is normal and within ~4 km of Mompox historic center.',
    timezone: currentOnly.timezone,
    elevation_m: currentOnly.elevation,
    currentOnlyUrl,
    currentOnlyResponse: currentOnly,
    richUrl,
    richResponse: rich,
  };
  const outPath = `${RESEARCH_DIR}/weather-api-response.json`;
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
  console.log(`\nSaved -> ${outPath}`);

  // 5. Summary of available fields
  console.log('\n=== FIELD SUMMARY ===');
  console.log('current_units keys:', Object.keys(currentOnly.current_units));
  console.log('current keys:', Object.keys(currentOnly.current));
  console.log('Rich current_units keys:', Object.keys(rich.current_units));
  console.log('Rich daily keys:', Object.keys(rich.daily || {}));
  console.log('Rich daily_units keys:', Object.keys(rich.daily_units || {}));
}

main().catch((e) => { console.error('Fatal:', e?.message || e); process.exit(1); });
