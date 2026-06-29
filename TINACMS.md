# TinaCMS — Visual Editor for Hotel Casa Mónica

TinaCMS lets Fredy & Mónica edit the website visually — no code, no GitHub, no technical knowledge needed.

## 🎯 What can be edited

| Section | What you can change |
|---------|---------------------|
| **Portada (Hero)** | Title, subtitle, button labels |
| **Nosotros (About)** | Title, 3 paragraphs of text |
| **Sr Fredy** | Name, role, tagline, bio, photo |
| **Sra Mónica** | Name, role, tagline, bio, photo |
| **Habitaciones** | Subtitle text |
| **Contacto** | WhatsApp number, Instagram, address |
| **Opiniones** | Add/edit/delete guest reviews |
| **Festivales** | Add/edit/delete festival entries |

## 🚀 How to use TinaCMS (3 ways)

### Option A — Local dev (free, for testing)

```bash
# Run the site with TinaCMS enabled
bun run tina
```

Then open **http://localhost:3000/admin** in your browser.

- You'll see the TinaCMS visual editor
- Click any editable field to change it
- Changes save to files in `/content/` locally
- To push changes live, commit and push to GitHub

### Option B — TinaCMS Cloud (recommended for owners)

This is the **best option for Fredy & Mónica** — they edit live without touching code.

1. **Sign up** at [tina.io](https://tina.io) (free for 2 users)
2. **Connect your GitHub repo** (anthonycarre00-collab/hotel-casa-monica)
3. **Get your credentials**:
   - Client ID (public, goes in `.env`)
   - Token (secret, goes in `.env`)
4. **Add to `.env`**:
   ```
   NEXT_PUBLIC_TINA_CLIENT_ID=your_client_id_here
   TINA_TOKEN=your_token_here
   ```
5. **Deploy to Vercel** — add the same env vars in Vercel settings
6. **Owners visit**: `https://your-domain.vercel.app/admin`
7. They log in with their TinaCMS account
8. Edit visually → changes auto-commit to GitHub → Vercel auto-deploys

### Option C — Self-hosted (advanced, free forever)

Run TinaCMS on your own server. More setup, no monthly fees. See [TinaCMS self-hosted docs](https://tina.io/docs/self-hosted/overview/).

## 📝 Step-by-step: Editing content

1. **Go to** `your-site.com/admin`
2. **Log in** with your TinaCMS account
3. **Click** "Contenido del sitio" (Site content)
4. **Edit** any field — you'll see a live preview
5. **Click Save** — changes are committed to GitHub
6. **Wait ~60 seconds** — Vercel auto-deploys the changes

## 📸 Changing photos

1. In the editor, find the "Foto" field
2. **Click Upload** → select a new image from your computer
3. The image is saved to `/public/` automatically
4. Save → the new photo appears on the site

## ⚠️ Important notes

- **Always preview before saving** — the live preview shows exactly how changes will look
- **Changes go to GitHub** — they're version-controlled, so you can always revert
- **No code knowledge needed** — if you can use a word processor, you can use TinaCMS
- **Works on mobile** — Fredy & Mónica can edit from their phones

## 🔧 Technical details (for developers)

- **Config**: `tina.config.ts` — defines the content schema
- **Content**: `content/` — JSON files with the actual content
- **Admin route**: `/admin` — TinaCMS visual editor
- **Env vars**: `NEXT_PUBLIC_TINA_CLIENT_ID`, `TINA_TOKEN`

To add a new editable field:
1. Add it to `tina.config.ts` in the appropriate collection
2. Add the corresponding field to the JSON in `content/site/site_content.json`
3. The component reads from the JSON (or falls back to i18n defaults)

## 💰 Pricing

- **Free tier**: 2 users, unlimited edits — perfect for Fredy & Mónica
- **Pro**: $99/mo for more users (not needed for this site)
- **Self-hosted**: Free forever, requires your own server

---

*For help, see [TinaCMS docs](https://tina.io/docs/) or contact your developer.*
