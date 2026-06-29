# 📸 Uploads Folder — Hotel Casa Mónica

This is where you drop raw photos and videos for the site. The clever analyzer script will scan this folder, classify each image using AI vision, and recommend where it should go on the website.

## How to use this folder

1. **Drop files into the appropriate subfolder below** (or into `99-to-review/` if you're not sure)
2. **Filenames don't matter** — the analyzer uses AI to identify what's in each image
3. **Commit and push** to GitHub (`git add uploads/ && git commit -m "Add new photos" && git push`)
4. **Tell the assistant** you've added new files — they'll run the analyzer, process the good ones, and update the site

## Subfolders

| Folder | What goes here |
|--------|----------------|
| `01-owners-portraits/` | Solo shots of Fredy, Mónica, and family members. **Especially needed: a solo portrait of Sra Mónica.** |
| `02-family-moments/` | Family group photos, everyday moments at the hotel, hosts with guests |
| `03-hotel-rooms/` | Room interiors — beds, bathrooms, details |
| `04-hotel-exterior/` | Facade, patio, balcony, doorway, terrace, parking |
| `05-mompox-scenery/` | Streets, churches, river, sunsets, drone shots, colonial architecture |
| `06-events-festivals/` | Jazz festival, Semana Santa, Christmas, cumbia, processions, concerts |
| `07-food/` | Momposina dishes, restaurants, drinks, corozo, casabito |
| `08-guests-reviews/` | Guest photos, screenshots of reviews, testimonials |
| `90-videos/` | Video files (.mp4, .mov, .webm, .3gp) — see `90-videos/README.md` |
| `99-to-review/` | Anything you're not sure about — the analyzer will figure it out |

## What makes a good photo for this site

✅ **Use these:**
- Warm, natural light (golden hour is magic)
- Real people, candid moments (not posed stock photos)
- Authentic Mompox details: cobblestones, wrought iron, colonial facades, river
- Vertical portraits for owner cards (4:5 ratio is ideal)
- Wide landscape shots for hero backgrounds and section headers

❌ **Avoid these:**
- Blurry or low-resolution images
- Photos with visible text/watermarks (unless it's the hotel's own signage)
- Anything that could embarrass a guest or family member
- Heavily filtered / over-edited images

## After uploading

The assistant will:
1. Run `bun run scripts/analyze-image-pool.ts` — VLM classifies each image
2. Review the report with you
3. Process the good ones with `bun run scripts/process-images.ts` (crops, resizes, optimizes)
4. Swap them into the site (replacing AI placeholders where possible)
5. Browser-verify the result

## File format notes

- **Images**: `.jpg`, `.jpeg`, `.png`, `.webp` all work
- **Videos**: `.mp4`, `.mov`, `.webm`, `.3gp` — see `90-videos/README.md` for important notes
- **Raw camera files** (`.cr2`, `.nef`, `.arw`): please convert to `.jpg` first
- **No size limit** but try to keep individual files under 20MB

---

*This folder is included in the GitHub repo but its contents are NOT served on the website directly — only the processed versions in `/public/` appear on the site.*
