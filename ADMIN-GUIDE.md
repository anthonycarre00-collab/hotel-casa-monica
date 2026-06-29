# Admin Panel — Hotel Casa Mónica

A simple, secure admin panel for editing site content. No external services, no databases, no CMS platforms. Just a password-protected page that edits content via GitHub.

## 🎯 What can be edited

- **Portada (Hero)** — title, subtitle, button labels
- **Nosotros (About)** — title, 3 paragraphs
- **Sr Fredy** — name, role, tagline, bio, photo
- **Sra Mónica** — name, role, tagline, bio, photo
- **Contacto** — WhatsApp, Instagram, address

## 🚀 Setup (5 minutes, one time only)

You need to add **3 environment variables** in Vercel:

### Step 1: Get a GitHub token (for editing files)

1. Go to **[github.com/settings/tokens](https://github.com/settings/tokens)**
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Settings:
   - **Note:** `casa-monica-admin`
   - **Expiration:** 90 days (or "No expiration" if you prefer)
   - **Scopes:** check **only** `repo` (full control of private repositories)
4. Click **"Generate token"**
5. **Copy the token** (starts with `ghp_`) — you'll paste it in Vercel

### Step 2: Choose a password

Make up a strong password. This is what you'll use to log into `/admin`. Write it down somewhere safe — there's no "forgot password" feature (by design — fewer moving parts).

**Example of a good password:** `Mompox2026!FredyMonica`

### Step 3: Add environment variables in Vercel

1. Go to **[vercel.com](https://vercel.com)** → your `hotel-casa-monica` project
2. **Settings** → **Environment Variables** (or Build & Deployment → Environment Variables)
3. Add these 3 variables:

| Name | Value |
|------|-------|
| `GITHUB_TOKEN` | *(your GitHub token from Step 1, e.g. `ghp_xxxx...`)* |
| `GITHUB_REPO` | `anthonycarre00-collab/hotel-casa-monica` |
| `ADMIN_PASSWORD` | *(your chosen password from Step 2)* |

4. For each: select **all 3 environments** (Production, Preview, Development) → **Save**

### Step 4: Redeploy

1. Go to **Deployments** tab
2. Click **⋮** on the latest → **Redeploy** → confirm
3. Wait ~2-3 minutes for green ✓

## ✏️ Using the editor (daily)

1. Go to **`https://your-site.vercel.app/admin`**
2. Enter your password → click **Entrar**
3. Click any section (e.g., "Sra Mónica")
4. Edit the text fields
5. Click **"Guardar cambios"**
6. Wait ~60 seconds — Vercel auto-deploys the change

That's it. No GitHub, no code, no terminal.

## 🔒 Security features

- **Password-protected** — the password is stored as an environment variable, never in the code
- **Rate limiting** — max 5 login attempts per 15 minutes per IP (blocks brute force)
- **Constant-time password comparison** — prevents timing attacks
- **GitHub token never exposed** — it stays on the server, the browser never sees it
- **Path validation** — only files in `content/` directory can be edited (no path traversal)
- **SessionStorage** — password is cleared when you close the browser tab
- **All changes go through GitHub** — full audit trail, can revert anytime

## 🆘 Troubleshooting

**"Login failed" when entering password**
→ Check the `ADMIN_PASSWORD` env var is set correctly in Vercel and matches what you typed

**"GitHub API error" when saving**
→ Check `GITHUB_TOKEN` and `GITHUB_REPO` env vars are set in Vercel
→ Make sure the token hasn't expired
→ Make sure the token has `repo` scope

**"Server not configured" message**
→ The env vars aren't set. Go back to Step 3 above.

**Changes don't appear on the site**
→ Wait 60 seconds for Vercel to redeploy
→ Check Vercel dashboard for build errors

## 🔧 Technical details (for developers)

- **Admin route:** `/admin` (Next.js page)
- **API route:** `/api/admin/content` (handles read/write via GitHub API)
- **Content files:** `content/*.json` (JSON files in the repo)
- **Env vars:** `GITHUB_TOKEN`, `GITHUB_REPO`, `ADMIN_PASSWORD`
- **Auth:** password compared with `crypto.timingSafeEqual`
- **Rate limiting:** in-memory map (resets on serverless cold start — acceptable for this use case)
- **No database, no external services, no OAuth**

## ⚠️ To change the password

1. Update the `ADMIN_PASSWORD` env var in Vercel
2. Redeploy
3. Use the new password next time you log in

## ⚠️ To revoke access

If the password is compromised:
1. Change `ADMIN_PASSWORD` in Vercel
2. Redeploy
3. (Optional) Revoke the GitHub token at github.com/settings/tokens and generate a new one
