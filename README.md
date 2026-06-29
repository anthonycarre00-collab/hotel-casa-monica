# Hotel Casa Mónica — Mompox, Bolívar, Colombia

> *Siéntete como en casa, en el corazón patrimonial de Mompox.*

A warm, vibrant showcase website for **Hotel Casa Mónica** — a small family-run posada in the UNESCO World Heritage town of Mompox, on the Magdalena River in Colombia. Built with Next.js 16, TypeScript, Tailwind CSS 4, and shadcn/ui.

![Hotel Casa Mónica](public/hotel-exterior-day.png)

---

## ✨ Features

- **Bilingual** — Spanish-first with one-click English toggle (persisted via localStorage + URL)
- **12 sections** — Hero, About (with Fredy & Mónica owner cards), Rooms, Location (Google Maps embed), Mompox story, Things to do, Sabores momposinos, Cómo llegar, Clima, Gallery (with lightbox), Reviews, Contact
- **Direct booking focus** — WhatsApp +57 300 310 0299, no Booking/Expedia middlemen
- **Subtle motion** — Ken Burns hero zoom, gentle "boat-drift" parallax on section backgrounds, "window-zoom" reveal on first paint, scroll-driven reveals
- **Authentic photography** — real images of the hotel, Mompox scenery, and the owners; AI-generated atmospheric images only where no real photo exists yet
- **Mobile-first responsive** — sticky header with mobile drawer nav, touch-friendly targets
- **Accessible** — semantic HTML, ARIA labels, keyboard navigation, alt text
- **SEO-optimized** — Spanish metadata, Open Graph, JSON-LD-ready

## 🎨 Design system

- **Palette**: warm colonial — cream `#FDF6E8`, terracotta `#C8542A`, brick red `#B22222`, forest green `#2E5D3A`, gold `#C9A961`, dark wood `#3D2817` (extracted from the hotel's logo)
- **Typography**: Playfair Display (serif headings) + Inter (sans body) + Dancing Script (script accents)
- **Textures**: cal (whitewash) background, filigree-inspired SVG dividers, sunset-wash gradients

## 🛠 Tech stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 + shadcn/ui (New York) |
| Icons | lucide-react |
| Animation | CSS keyframes + Framer Motion available |
| Fonts | next/font (Google Fonts) |
| Package manager | Bun |

## 🚀 Getting started

```bash
# Install dependencies
bun install

# Start dev server on http://localhost:3000
bun run dev

# Lint
bun run lint
```

## 📁 Project structure

```
.
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout, fonts, SEO metadata
│   │   ├── page.tsx            # Single-page assembly of all sections
│   │   └── globals.css         # Tailwind theme + custom palette + animations
│   ├── lib/
│   │   └── i18n.tsx            # Spanish/English dictionary + LangProvider + WhatsApp helpers
│   └── components/
│       ├── ui/                 # shadcn/ui primitives
│       └── site/               # Casa Mónica-specific components
│           ├── Nav.tsx
│           ├── Hero.tsx
│           ├── About.tsx       # Includes Fredy & Mónica owner cards
│           ├── Rooms.tsx
│           ├── Location.tsx
│           ├── MompoxStory.tsx
│           ├── ThingsToDo.tsx
│           ├── Food.tsx
│           ├── GettingThere.tsx # Getting there + Climate sections
│           ├── Gallery.tsx      # 12-image masonry + lightbox
│           ├── Reviews.tsx
│           ├── Contact.tsx
│           ├── Footer.tsx
│           ├── WhatsAppFloat.tsx
│           └── Reveal.tsx       # Scroll-reveal + FiligreeDivider + Eyebrow
├── public/                     # Processed images served by the site
│   ├── casa-monica-logo.png
│   ├── hotel-exterior-day.png
│   ├── hotel-exterior-night.png
│   ├── owner-fredy-real.jpg    # Real photo of Sr Fredy
│   ├── owner-monica.png        # Illustrated placeholder for Sra Mónica (replace with real photo)
│   ├── owners-couple.jpg       # Real photo of Fredy & Mónica at hotel
│   ├── room-*.png              # Room interior photos
│   ├── mompox-*.jpg            # Real Mompox scenery (drone, river, churches, streets)
│   └── *.png                   # AI-generated atmospheric images (filigree, food, etc.)
├── uploads/                    # Raw user uploads — see uploads/README.md
├── scripts/                    # Image analysis + processing scripts
│   ├── analyze-image-pool.ts   # VLM classifies each image, recommends placement
│   ├── process-images.ts       # Crops, resizes, optimizes with sharp
│   └── generate-images.ts      # Generates AI atmospheric images via z-ai-web-dev-sdk
└── package.json
```

## 📸 Adding new photos

The `uploads/` folder is organized by category — drop raw photos into the appropriate subfolder and ask the assistant to analyze them. The clever analyzer (`scripts/analyze-image-pool.ts`) will:

1. Scan the uploads folder for new images
2. Classify each one using AI vision (owner portrait / room / scenery / event / food / etc.)
3. Recommend where each should appear on the site
4. Process the good ones (crop, resize, optimize) and swap them in

See [`uploads/README.md`](uploads/README.md) for the full guide.

## 🌐 Deploy to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import the GitHub repo: `anthonycarre00-collab/hotel-casa-monica`
3. Framework preset: **Next.js** (auto-detected)
4. Click **Deploy**

The site will be live on `*.vercel.app` within ~60 seconds. To use a custom domain (e.g. `hotelcasamonica.com`), add it in the Vercel dashboard → Settings → Domains.

## 📞 Hotel contact

- **Address**: Calle 14 #2 74, Santa Cruz de Mompox, Bolívar, Colombia
- **WhatsApp**: +57 300 310 0299
- **Instagram**: [@casamonicamompox](https://www.instagram.com/casamonicamompox/)
- **Directory listing**: [hotelesbeijing.com.co](https://hotelesbeijing.com.co/hotel/hotel-casa-monica/)

## 📜 License

© Hotel Casa Mónica. All rights reserved.

---

*Hecho con cariño desde Mompox.*
