#!/usr/bin/env python3
"""
overpass_mompox.py — Query the OpenStreetMap Overpass API for all churches,
cemeteries, museums, monuments, hotels, and civic buildings inside the Mompox
historic-center bounding box. Save results to JSON and print a compact table.
"""
import json, urllib.parse, urllib.request, sys, time

BBOX = "9.22,-74.45,9.27,-74.40"  # south,west,north,east
UA = "hotel-casa-monica-research/1.0 (research)"

QUERIES = {
    "churches": '''
[out:json][timeout:60];
(
  node["amenity"="place_of_worship"](%(b)s);
  way["amenity"="place_of_worship"](%(b)s);
  relation["amenity"="place_of_worship"](%(b)s);
);
out center tags 80;
''' % {"b": BBOX},
    "cemeteries": '''
[out:json][timeout:60];
(
  node["amenity"="grave_yard"](%(b)s);
  way["amenity"="grave_yard"](%(b)s);
  node["landuse"="cemetery"](%(b)s);
  way["landuse"="cemetery"](%(b)s);
);
out center tags 30;
''' % {"b": BBOX},
    "museums_civic_monuments": '''
[out:json][timeout:60];
(
  node["tourism"="museum"](%(b)s);
  way["tourism"="museum"](%(b)s);
  node["historic"="monument"](%(b)s);
  way["historic"="monument"](%(b)s);
  node["historic"="building"](%(b)s);
  way["historic"="building"](%(b)s);
  node["building"="civic"](%(b)s);
  way["building"="civic"](%(b)s);
);
out center tags 60;
''' % {"b": BBOX},
}

def fetch(query):
    url = "https://overpass-api.de/api/interpreter"
    data = urllib.parse.urlencode({"data": query}).encode("utf-8")
    req = urllib.request.Request(url, data=data, headers={"User-Agent": UA})
    for attempt in range(1, 4):
        try:
            with urllib.request.urlopen(req, timeout=90) as r:
                body = r.read().decode("utf-8", errors="replace")
            return json.loads(body)
        except Exception as e:
            print(f"  [attempt {attempt}] error: {e}", file=sys.stderr)
            time.sleep(3 * attempt)
    return None

def summarize(el):
    t = el.get("tags", {})
    name = t.get("name") or t.get("name:es") or "(sin nombre)"
    if el.get("type") == "way" or el.get("type") == "relation":
        c = el.get("center", {})
        lat, lon = c.get("lat"), c.get("lon")
    else:
        lat, lon = el.get("lat"), el.get("lon")
    return {
        "name": name,
        "lat": lat,
        "lon": lon,
        "type": el.get("type"),
        "amenity": t.get("amenity", ""),
        "religion": t.get("religion", ""),
        "denomination": t.get("denomination", ""),
        "building": t.get("building", ""),
        "tourism": t.get("tourism", ""),
        "historic": t.get("historic", ""),
        "landuse": t.get("landuse", ""),
        "alt_name": t.get("alt_name", ""),
        "description": t.get("description", ""),
        "wikidata": t.get("wikidata", ""),
        "wikipedia": t.get("wikipedia", ""),
    }

def main():
    all_results = {}
    for key, q in QUERIES.items():
        print(f"\n=== {key} ===", file=sys.stderr)
        data = fetch(q)
        if data is None:
            print(f"  FAILED to fetch {key}")
            continue
        els = data.get("elements", [])
        print(f"  Got {len(els)} elements")
        rows = [summarize(e) for e in els]
        all_results[key] = rows
        for r in rows:
            print(f"  lat={r['lat']} lon={r['lon']}  name={r['name']!r}  amenity={r['amenity']}  building={r['building']}  tourism={r['tourism']}  historic={r['historic']}  landuse={r['landuse']}  religion={r['religion']}  wikidata={r['wikidata']}")
        time.sleep(2)

    out_path = "/home/z/my-project/research/mompox-osm-landmarks.json"
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(all_results, f, ensure_ascii=False, indent=2)
    print(f"\nSaved -> {out_path}")

if __name__ == "__main__":
    main()
