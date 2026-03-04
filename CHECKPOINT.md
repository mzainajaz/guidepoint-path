# Checkpoint v1 — GuidePoint Path

**Date:** March 5, 2026
**Git Tag:** `checkpoint-v1`
**Commit:** `6832cac`

---

## Live Deployments

| Platform | URL | Status |
|---|---|---|
| **Netlify (Primary)** | https://guidepoint-path.netlify.app | ✅ Live |
| **GitHub Pages (Fallback)** | https://mzainajaz.github.io/guidepoint-path/ | ✅ Live |
| **GitHub Repository** | https://github.com/mzainajaz/guidepoint-path | ✅ Public |

---

## Project Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS + shadcn/ui (Radix UI) |
| Backend/Auth | Supabase |
| Routing | React Router DOM v6 |
| State/Data | TanStack React Query |
| Animations | Framer Motion |
| Fonts | Sora (display) + Inter (body) via Google Fonts |

---

## Design System

| Token | Value |
|---|---|
| Primary Navy | `#111D3C` |
| Deep Navy (sections) | `#080F1E` |
| Gold/Amber | `#F5A623` (Tailwind `amber-400`) |
| Background (warm off-white) | `#FAF8F5` |
| Text (dark) | `#1A1A2E` |
| Display Font | Sora |
| Body Font | Inter |

---

## Pages (20 total)

- `/` — Homepage (Index)
- `/free-zones` — Free Zones overview
- `/mainland` — Mainland setup
- `/relocation` — Relocation guide
- `/tax` — Tax & compliance
- `/tools` — Business tools
- `/tools/cost-estimator` — Cost estimator
- `/tools/free-zone-comparison` — Free zone comparison
- `/tools/setup-snapshot` — Setup snapshot quiz
- `/tools/activity-finder` — Business activity finder
- `/tools/visa-calculator` — Visa calculator
- `/admin` — Admin dashboard
- `/blog` — Blog
- `/contact` — Contact
- `/faq` — FAQ
- `/glossary` — Glossary
- `/guides` — Guides
- `/partner` — Partner program
- `/pricing` — Pricing
- `/privacy` — Privacy policy

---

## Key Components

| Component | Description |
|---|---|
| `HeroSection.tsx` | Full-screen Dubai video background hero with amber CTA |
| `Header.tsx` | Fixed transparent header (white on hero, solid on scroll) |
| `TrustStrip.tsx` | Navy strip with gold icons and trust metrics |
| `RouteCards.tsx` | Setup path cards (Free Zone / Mainland / Relocation) |
| `WhyFoundersSection.tsx` | Navy section with gold checklist |
| `SetupPathsOverview.tsx` | White cards on warm background |
| `FeaturedTools.tsx` | Tools showcase with amber icon boxes |
| `CustomerReels.tsx` | 4 AI-animated portrait video testimonials |
| `ReviewsSection.tsx` | 6 reviewer cards with star ratings |
| `FinalCTA.tsx` | Dubai street image background CTA section |
| `FAQSection.tsx` | Accordion FAQ with amber badge |
| `Footer.tsx` | Deep navy footer with gold headings |
| `LeadGate.tsx` | Lead capture modal |

---

## Assets

| Asset | Location |
|---|---|
| Dubai hero video | `public/videos/dubai-hero.mp4` |
| Dubai alt video | `public/videos/dubai-alt.mp4` |
| Hero image (poster) | `public/images/hero-dubai.jpg` |
| Free zone section image | `public/images/section-freezone.jpg` |
| Mainland section image | `public/images/section-mainland.jpg` |
| Tools section image | `public/images/section-tools.jpg` |
| Customer reel 1 (James Mitchell) | `public/reels/reel1.mp4` |
| Customer reel 2 (Priya Sharma) | `public/reels/reel2.mp4` |
| Customer reel 3 (Marcus Weber) | `public/reels/reel3.mp4` |
| Customer reel 4 (Sarah Al-Rashid) | `public/reels/reel4.mp4` |

---

## Customer Reels

| Reel | Person | Background | Duration |
|---|---|---|---|
| reel1.mp4 | James Mitchell — Tech Startup Founder 🇬🇧 | Dubai office, Burj Khalifa view | 26s |
| reel2.mp4 | Priya Sharma — E-commerce Entrepreneur 🇮🇳 | Dubai co-working space | 28s |
| reel3.mp4 | Marcus Weber — Consulting Agency Owner 🇩🇪 | DIFC boardroom | 28s |
| reel4.mp4 | Sarah Al-Rashid — Marketing Consultant 🇦🇺 | Dubai Marina cafe | 27s |

All reels: AI-animated portrait (nano banana) + gTTS voiceover, looped 8s animation to full audio duration via ffmpeg.

---

## Netlify Deployment

| Property | Value |
|---|---|
| Site ID | `7e7bb557-eaaa-4e17-b7d0-b9989d62e378` |
| Site Name | `guidepoint-path` |
| Auth Token | Stored in Netlify dashboard |
| Deploy Command | `npm run build` |
| Publish Directory | `dist` |
| SPA Redirect | `dist/_redirects` → `/* /index.html 200` |

**To redeploy:**
```bash
cd /home/ubuntu/guidepoint-path
npm run build
cp -r public/reels dist/reels
cp -r public/videos dist/videos
cp -r public/images dist/images
echo "/* /index.html 200" > dist/_redirects
NETLIFY_AUTH_TOKEN=<token> netlify deploy --dir=dist --prod --site=7e7bb557-eaaa-4e17-b7d0-b9989d62e378
```

---

## Git History (key commits)

| Commit | Description |
|---|---|
| `6832cac` | feat: replace static reel videos with AI-animated portrait videos + voiceover audio |
| `60f5bfa` | feat: add 4 AI-generated customer testimonial reel videos |
| `99e94d4` | feat: restore Dubai video background on hero section |
| `2f8d88e` | fix: fixed header (transparent over hero), page-offset for all pages, improved text contrast |
| `ed59e49` | feat: full visual redesign — navy/gold palette, new hero image, modern components, contrast fixes |
| `d45e055` | feat: modern redesign - video hero, customer reels, reviews section |
