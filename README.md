# Adesh Singh — Portfolio

Personal portfolio of Adesh Singh, Qt QML Engineer & founder of [TechCoderHub](https://techcoderhub.com). React + Vite, with a working contact form (Resend), project case-study pages, live GitHub stats, and a futuristic animation system.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173  (contact form falls back to mailto locally)
npm run build    # production build → dist/
```

To test the contact API locally: `npm i -g vercel && vercel dev`

## Deploy — free forever (Vercel)

1. Push this repo to GitHub.
2. Go to [vercel.com](https://vercel.com) → sign in with GitHub → **Add New Project** → import the repo. Vercel auto-detects Vite; just click Deploy.
3. Add environment variables (Project → Settings → Environment Variables):

| Variable | Value |
|---|---|
| `RESEND_API_KEY` | from [resend.com/api-keys](https://resend.com/api-keys) (free: 100 emails/day) |
| `CONTACT_EMAIL` | `adeshworkmail@gmail.com` |
| `FROM_EMAIL` | `Adesh Singh <contact@techcoderhub.com>` |
| `SITE_URL` | your deployed URL |

Every `git push` auto-deploys. Hobby plan is free permanently.

### Email sender (FROM_EMAIL)

- `techcoderhub.com` is verified in Resend, so use `FROM_EMAIL="Adesh Singh <contact@techcoderhub.com>"`.
- Do not use Resend's `onboarding@resend.dev` for the portfolio form. It can only send to the Resend account email and fails when sending to `adeshworkmail@gmail.com`.

### Domain options

- `adesh-singh.vercel.app` — free forever, automatic.
- `adesh.is-a.dev` — free forever subdomain for developers: [github.com/is-a-dev/register](https://github.com/is-a-dev/register) (submit a small PR).
- `adeshsingh.dev` / `.in` — ~₹800–1000/yr (Namecheap/Porkbun/Cloudflare). No legit "free lifetime" real TLD exists; anything claiming that (e.g. old Freenom) is unreliable.

After choosing a domain, update the URLs in `index.html` (canonical/OG), `public/robots.txt`, and `public/sitemap.xml`.

## Editing content

Everything lives in `src/data.js` — profile, experience, projects (+ case-study details), skills.

- **Photo**: put `avatar.png` in `public/`, swap the `</>` placeholder in `src/components/About.jsx`.
- **Résumé**: drop `resume.pdf` into `public/`.
- **Email templates**: `api/_emails.js` (owner notification + auto-reply).

## Features

Light/dark theme · live IST clock · rotating hero scenes (waves/network/rain/warp/radar) · site-wide cursor-reactive hexgrid · custom cursor · terminal boot screen · UI sounds with mute (♪ in nav) · physics skills graph (drag nodes!) · live GitHub repos/stats · project case-study pages · working contact form with styled emails · SEO/OG tags · reduced-motion safe.
