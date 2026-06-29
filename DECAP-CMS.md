# Decap CMS — Visual Editor for Hotel Casa Mónica

Decap CMS lets Fredy & Mónica edit the website via a simple web dashboard. No code needed.

## 🎯 What can be edited

| Section | What you can change |
|---------|---------------------|
| **Portada (Hero)** | Title, subtitle, button labels |
| **Nosotros (About)** | Title, 3 paragraphs of text |
| **Sr Fredy** | Name, role, tagline, bio, photo |
| **Sra Mónica** | Name, role, tagline, bio, photo |
| **Contacto** | WhatsApp number, Instagram, address |
| **Opiniones** | Add/edit/delete guest reviews |
| **Festivales** | Add/edit/delete festival entries |

---

## 🚀 Setup (one-time, ~10 minutes)

Decap CMS needs an authentication service to know who's allowed to edit. We use **Netlify Identity** — it's free, works on any host (including Vercel), and takes 5 minutes to set up.

### Step 1: Create a free Netlify account

1. Go to **[netlify.com](https://app.netlify.com/signup)**
2. Sign up with your GitHub account (same one you use for the repo)
3. You don't need to deploy anything on Netlify — we just need the Identity service

### Step 2: Create a "site" in Netlify (for Identity only)

1. In Netlify dashboard, click **"Add new site"** → **"Deploy manually"**
2. Drag any folder (even empty) to the upload area — we're not actually deploying
3. Give it a name like `casa-monica-identity`
4. Click into the new site

### Step 3: Enable Identity

1. In the site dashboard, click **"Identity"** in the top nav
2. Click **"Enable Identity"**
3. Under **"Registration"** → set to **"Invite only"** (so strangers can't sign up)
4. Under **"Services"** → **"Git Gateway"** → click **"Enable Git Gateway"**
5. Connect your GitHub account when prompted
6. Select the `anthonycarre00-collab/hotel-casa-monica` repo

### Step 4: Invite yourself (and Fredy/Mónica)

1. Still in Identity, click **"Invite users"**
2. Enter your email address → click **Send**
3. Check your email → click the invite link → set a password
4. You're now an admin!

### Step 5: Set the Identity URL in your site

1. In Netlify, go to **Settings** → **Identity**
2. Copy the **URL** (looks like `https://casa-monica-identity.netlify.app/.netlify/identity`)
3. That's it — Decap CMS automatically finds it because of the script in `/admin/index.html`

---

## ✏️ Using the editor (daily, ~30 seconds)

### For Fredy & Mónica:

1. Go to **`https://your-site.vercel.app/admin`**
2. Log in with the email + password you set up
3. Click any section (e.g., "Sra Mónica")
4. Edit the text or upload a new photo
5. Click **"Save"** → then **"Publish"**
6. Wait ~60 seconds — Vercel auto-deploys the change

### That's it. No code, no GitHub, no commands.

---

## 🔒 Security

- **Only invited users can log in** — you control who has access
- **Registration is "Invite only"** — strangers can't sign up
- **All changes go through GitHub** — there's a full audit trail
- **You can revoke access** anytime from Netlify → Identity → Users
- **The /admin page is public** but shows a login screen to anyone not invited

---

## 📸 Changing photos

1. In the editor, find the "Foto" field
2. Click **"Choose an image"** → upload from your computer
3. The image saves to `/public/` automatically
4. Save + Publish → the new photo appears on the site

---

## 🆘 Troubleshooting

**"I get a blank page at /admin"**
→ Wait 10 seconds — Decap CMS loads from a CDN

**"Login popup doesn't appear"**
→ Check you completed Step 3 (Enable Identity) and Step 4 (invite yourself)

**"I can log in but can't save"**
→ Check Git Gateway is enabled (Step 3.4) and connected to the right repo

**"I get 'Permission denied'"**
→ You need to be invited as a user in Netlify Identity first

---

## 🔧 Technical details (for developers)

- **Admin route**: `/admin` (static HTML, no server needed)
- **Config**: `public/admin/config.yml`
- **Content files**: `content/*.json` (JSON for site settings, Markdown for reviews/festivals)
- **Auth**: Netlify Identity + Git Gateway (free, works on Vercel)
- **No build step** — Decap CMS is loaded from CDN
- **No packages installed** — zero dependency bloat

To add a new editable field:
1. Add it to `public/admin/config.yml` in the appropriate collection
2. Add the corresponding field to the JSON file in `content/`
3. The site reads from the JSON (or falls back to i18n defaults)
