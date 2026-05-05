# Portfolio Handoff Brief — Caio Henrique (chdevsec)

> Self-contained brief for picking this project up cold. Read top to bottom.

---

## 1) Who is this for and why

- **Owner / persona:** Caio Henrique — **Senior Security Engineer** with 7+ years experience.
- **Goal of the site:** Land a senior security role abroad (US-first targeting), and convert visitors into leads (recruiters / consulting clients).
- **Target audience:** US-based recruiters, hiring managers and CTOs. Bilingual support: **English (default)** at `/`, **Portuguese (BR)** at `/pt/`.
- **Vibe:** Pixel-art / CRT terminal aesthetic — comedido (subtle pixel only on identity, body content remains legible).
- **Currently:** 8.5/10 functionally complete. Owner is **NOT happy with the visual/layout polish yet**. Has explicitly said "you broke the layout" after my last hero rewrite. Wants a frontend specialist to take over.

---

## 2) Tech stack

| Area | Choice |
|---|---|
| Framework | **Astro 5.x** (static, MDX content collections) |
| Styling | **Tailwind CSS 3** (custom theme, no PostCSS extras) |
| Content | **MDX** (project case studies + blog posts) bilingual (`en/`, `pt/`) |
| Fonts | Google Fonts: `Press Start 2P` (titles), `VT323` (CRT subtitles), `JetBrains Mono` (code/mono), `Inter` (body) |
| Deploy target | Not deployed yet. Vercel/Cloudflare Pages planned |
| Dev server | `npm run dev` → `http://localhost:4321` |
| Build | `npm run build` → `dist/`, 25 pages, ~1.5s |
| Node | 25.2.1 / npm 11.6.2 |

```bash
# Run locally
cd /home/caio/Documents/Portfolio-projetc-main/v2
npm install
npm run dev
```

---

## 3) Repo location

`/home/caio/Documents/Portfolio-projetc-main/v2/` (Astro project)

There is also a legacy `index.html` at `/home/caio/Documents/Portfolio-projetc-main/index.html` (~3107 lines, old Bootstrap site) — **DO NOT TOUCH**, kept as backup.

---

## 4) File structure (Astro project root: `v2/`)

```
v2/
├── astro.config.mjs              # Astro config (Tailwind, MDX, Sitemap)
├── tailwind.config.mjs           # Custom theme (colors, fonts, shadows, animations)
├── tsconfig.json                 # @/ alias → src/
├── package.json
├── vercel.json                   # Vercel deploy config (security headers, caching)
├── public/
│   ├── favicon.svg               # 16x16 pixel shield "C"
│   ├── robots.txt
│   ├── images/
│   │   ├── profile/
│   │   │   ├── perfil3.jpg       # Old hero photo (no longer used)
│   │   │   ├── profile_1.png     # CURRENT hero photo (1.3MB)
│   │   │   └── profile-banner.jpg
│   │   ├── wallpapers/           # 23 pixel-art wallpapers (security-themed)
│   │   │   # devsecops, red_team, blue_team, soc, hardening, etc.
│   │   └── og/
│   │       ├── og-default.svg    # Custom OG (name + 4 stat cards)
│   │       └── og-default.png    # Rendered 1200×630
│   └── cv/
│       ├── CV-CaioHenrique-PT.pdf
│       └── Profile-LinkedIn.pdf
└── src/
    ├── styles/global.css         # @tailwind + custom components (pixel-frame, pixel-btn, etc.)
    ├── data/                     # Single source of truth — see section 5
    │   ├── i18n.ts               # ALL UI strings EN+PT + lang routing helpers
    │   ├── profile.ts            # Name, contacts, links, bio
    │   ├── stats.ts              # Hero stats + deep stats
    │   ├── experience.ts         # 5 jobs with bilingual bullets
    │   ├── skills.ts             # 8 skill groups
    │   ├── certs.ts              # 18 certs + 3 educations
    │   └── testimonials.ts       # Empty (was removed from page; file kept for future)
    ├── layouts/
    │   ├── Base.astro            # <html>, <head>, Nav, Footer, JSON-LD
    │   └── Project.astro         # Project case study page wrapper
    ├── components/
    │   ├── icons/PixelIcon.astro # 18 inline SVG pixel icons (16×16)
    │   ├── Nav.astro             # Sticky nav + LangSwitcher + mobile menu
    │   ├── Footer.astro          # 3-col + bottom strip
    │   ├── LangSwitcher.astro    # 🇺🇸/🇧🇷 pixel SVG flag toggle
    │   ├── Terminal.astro        # Animated terminal demo (typing effect)
    │   ├── Hero.astro            # ⚠ THIS IS WHERE OWNER IS UNHAPPY — see section 9
    │   ├── CompaniesBar.astro    # Thin bar: FRETE.COM · VOLT SPORT · etc.
    │   ├── ExperienceSection.astro    # 1 dramatic + 4 compressed
    │   ├── HowIWorkSection.astro      # 3-principle methodology
    │   ├── HighlightBand.astro        # Full-bleed "569k → 318k" moment
    │   ├── ProjectsSection.astro      # 3 featured + divider + 4 more
    │   ├── ProjectCard.astro          # Pixel cover + metrics
    │   ├── SkillsSection.astro        # Asymmetric: sticky left + 2-col right
    │   ├── CertsSection.astro         # Education + Completed grid + collapsed in-progress
    │   ├── ContactSection.astro       # Direct + Lead magnet
    │   ├── HomePage.astro             # Composes the home page (used by both langs)
    │   ├── BlogIndex.astro            # Composes blog index (used by both langs)
    │   └── TestimonialsSection.astro  # Removed from page but file still exists
    ├── content/
    │   ├── config.ts              # Astro content schema (zod)
    │   ├── projects/
    │   │   ├── en/  # 7 .mdx case studies
    │   │   └── pt/  # 7 .mdx case studies (mirror)
    │   └── posts/
    │       ├── en/  # 3 .mdx posts
    │       └── pt/  # 3 .mdx posts (mirror)
    └── pages/
        ├── index.astro              # EN home → <HomePage lang="en" />
        ├── 404.astro                # Lang-aware 404
        ├── projects/[...slug].astro # EN project pages (uses content slug starting with en/)
        ├── blog/
        │   ├── index.astro          # EN blog index
        │   └── [...slug].astro      # EN blog post
        └── pt/
            ├── index.astro          # PT home
            ├── projects/[...slug].astro
            └── blog/
                ├── index.astro
                └── [...slug].astro
```

---

## 5) Data layer (single source of truth)

### `src/data/profile.ts`
```ts
export const profile = {
  name: 'Caio Henrique',
  handle: 'chdevsec',
  title: 'Senior Security Engineer',
  pitch: 'DevSecOps · Cloud Security · Vulnerability Management',
  tagline: '7+ years reducing risk at scale',
  location: 'Joinville, SC · Brasil',
  email: 'caiohenriquesinger@gmail.com',
  phone: '+55 (47) 99665-1207',
  links: {
    linkedin: 'https://www.linkedin.com/in/caio-henrique-security',
    github: 'https://github.com/chdevsec',
    cv: '/cv/CV-CaioHenrique-PT.pdf',
  },
};
```

### `src/data/i18n.ts`
- Exports `Lang = 'en' | 'pt'`, `defaultLang = 'en'`
- `localizedUrl(path, lang)` → `/` for EN, `/pt/...` for PT
- `t.<key>[lang]` → translated UI string. ~80+ keys covering nav, hero, sections, contact, blog, 404.

### `src/data/stats.ts`
- `heroStats`: 4 stats (7+, −44%, 60%+, 70%)
- `deepStats`: 6 stats (500+, 400+, 16, ~70%, 5, 15+)

### `src/data/experience.ts`
- Type: `{ company, initials, sector, role, period, current?, location, tone, bullets, stack }`
- All text fields bilingual: `{ en, pt }`
- 5 jobs in order: CHDevSec (current), frete.com, Volt Sport, Evolution, Global Estratégias
- `experienceFor(lang)` returns flat array for that language

### `src/data/skills.ts`
- 8 skill groups: DevSecOps · Cloud Security · AppSec · Vuln Mgmt · SIEM & Detection · Automation · Frameworks · OS & Infra
- Items kept in EN (cyber terms preserved per owner's request)
- `highlight: true` flag on 4 primary groups

### `src/data/certs.ts`
- 18 certifications (13 completed + 5 in-progress)
- 3 educations (UNINTER bachelor in progress, 2 Senac completed)

---

## 6) Design system

### Colors (`tailwind.config.mjs`)
```js
bg:        '#0A0E14' (primary), '#0F141C' (raised), '#141A24' (card), '#080B10' (inset)
ink:       '#E6E6E6' (default), '#9AA2B1' (dim), '#5A6373' (mute)
phosphor:  '#00FF9C' (primary accent), '#00B36F' (dim), '#3DFFB6' (glow)
amber:     '#FFB000' (secondary accent), '#B37A00' (dim), '#FFC73D' (glow)
alert:     '#FF3864' (rare red highlights)
line:      '#1F2632' (borders)
```

### Fonts
- `font-pixel` → Press Start 2P (h1, badges, hero)
- `font-crt` → VT323 (section titles — bigger, more legible than Press Start 2P)
- `font-mono` → JetBrains Mono (terminal, body labels)
- `font-sans` → Inter (long body copy, bullets)

### Component primitives (`global.css`)
- `.pixel-frame` → bordered card with hard 2px border, no radius
- `.pixel-btn-primary` (phosphor), `.pixel-btn-amber`, `.pixel-btn-ghost`
- `.pixel-badge-success` / `-amber` / `-alert` / `-mute`
- `.section`, `.section-eyebrow`, `.section-title`, `.section-subtitle`
- `.terminal`, `.terminal-header`, `.terminal-dot`
- `.hr-pixel` → glowing phosphor line
- `.scanlines::after` → CRT scanline overlay
- `.text-glow-phosphor`, `.text-glow-amber`

### Animations
- `crt-flicker` (subtle), `cursor-blink` (1s), `scan` (8s linear), `idle-bounce`

### Pixel icons (`PixelIcon.astro`)
18 names: `shield`, `lock`, `key`, `terminal`, `server`, `cloud`, `bug`, `eye`, `pipe`, `book`, `chip`, `gear`, `fingerprint`, `cert`, `sword`, `skull`, `flag`, `heart`. Inline SVG, takes `name`, `size`, `color`.

### Wallpapers
23 high-quality pixel-art images at `/public/images/wallpapers/`. Used as project covers (with phosphor-tinted filter applied via CSS) and the highlight band background. Filter recipe in `global.css`:
```css
.project-cover-img { filter: saturate(0.55) brightness(0.85) contrast(1.05); }
/* + multiply gradient phosphor overlay + scanlines + bottom fade */
```

---

## 7) Page composition (home page top→bottom)

`src/components/HomePage.astro`:

```
<Hero />                ← OWNER IS UNHAPPY HERE
<CompaniesBar />        ← thin marquee bar (replaced testimonials)
<DeepStatsBand />       ← inline section (6-col grid, bg-bg-inset)
<ExperienceSection />   ← 1 dramatic CHDevSec card + "Previous chapters" + 4 compressed
<HowIWorkSection />     ← 3 principles methodology (bg-bg-inset)
<HighlightBand />       ← full-bleed "569k → 318k" moment with wallpaper bg
<ProjectsSection />     ← 3 featured (3-col) + "MORE WORK · 4" divider + 4 more (4-col)
<SkillsSection />       ← asymmetric: sticky left intro + 2-col grid right
<CertsSection />        ← education 3-col + completed certs grid + collapsed in-progress
<ContactSection />      ← direct contact (copy buttons) + lead magnet (mailto fallback)
```

---

## 8) i18n routing model

- EN at root: `/`, `/projects/secscan`, `/blog/linux-hardening-7-cis-controls`
- PT at `/pt/`: `/pt/`, `/pt/projects/secscan`, `/pt/blog/linux-hardening-7-cis-controls`
- Switcher in nav (top-right) swaps URL between languages keeping the same logical page
- `<html lang>` is `en` or `pt-BR`; `og:locale` matches; `<link rel="alternate" hreflang>` set
- Content collections use `en/` and `pt/` prefix in slug; pages filter by prefix

---

## 9) ⚠ What the owner is UNHAPPY with (priority for next iteration)

**Most recent feedback (verbatim):**
> "Mano, vc quebrou o layout todo ... agora ficou tudo estranho"

The user wanted the Hero to be more **welcoming** — specifically:
- A "Welcome to my portfolio" intro at the top (✅ added)
- Photo card was **too big** — needed smaller (attempted: avatar 96–112px)
- New photo file: `/public/images/profile/profile_1.png` (✅ swapped)

My latest Hero attempt (`Hero.astro`) put a small avatar (96px) on the LEFT with status pill below, then greeting + name + title + bio + CTAs in a flex row to the right. Owner says this **broke the layout** — likely because:
- The compact avatar feels disconnected from the heavy text block
- The proportions don't read "professional senior" anymore — they read "casual blog"
- Lost the visual anchor that the bigger photo provided

### Open hero design problem
**Need a hero that simultaneously:**
1. Says "Welcome" warmly (receptive, not corporate-cold)
2. Has a smaller / more proportioned photo (NOT a giant pixel-frame card)
3. Sells "Senior Security Engineer" with weight
4. Keeps the pixel-CRT identity
5. Doesn't feel "broken" or thrown together

This is the single biggest unblocked design problem.

### Other things owner already flagged or I noticed
1. Sections still feel similar despite Onda 5 fixes
2. Career timeline: 1 dramatic CHDevSec + 4 compressed is OK but maybe could vary more
3. Skills asymmetric is better but still 8 cards on the right
4. Press Start 2P fatigue persists in nav, badges
5. Mobile experience is very long (12+ screens of scroll)
6. No real testimonials yet (removed the placeholder section per owner request)
7. No GitHub stats / HTB / activity ticker
8. Lead magnet form is mailto fallback (not real Formspree/Resend)
9. No analytics
10. No Cal.com booking
11. Domain not registered, not deployed

---

## 10) Real metrics extracted from CV (use these — they're verified)

| Metric | Context |
|---|---|
| **7+ years** | Total Sec Eng experience |
| **−44%** | Vulns at frete.com (569k → 318k Ubuntu) |
| **60%+** | SecScan adoption across Go stack |
| **70%** | CIS-Auditor benchmark coverage |
| **500+** | Users IAM lifecycle (fintech regulated) |
| **400+** | Assets in Wazuh SOC environment |
| **~80%** | Visibility on critical assets |
| **16** | Critical CVEs from infra pentest |
| **~70%** | Attack vector reduction (pfSense+Suricata) |
| **5** | Companies (CHDevSec → frete.com → Volt Sport → Evolution → Global Estratégias) |

**Two custom-built tools:**
- **SecScan** (Go) — vulnerability scanner wrapping Snyk with reachability analysis
- **CIS-Auditor** (Go) — continuous CIS Benchmark with drift detection

---

## 11) Constraints / things NOT to change

- ✅ Keep cyber/security terminology in **English** even on PT pages (user's explicit request): DevSecOps, SAST, SCA, SIEM, EDR, IaC, CIS, MITRE ATT&CK, OWASP, NIST, ISO 27001, Pentest, Vulnerability Management, Threat Hunting, Hardening, Zero Trust, etc.
- ✅ Keep the bilingual EN/PT routing model
- ✅ Keep Astro + Tailwind + MDX
- ✅ Keep the pixel-CRT identity (phosphor + amber palette)
- ✅ Keep the i18n flag toggle in nav
- ✅ Don't touch the legacy `index.html` at the parent directory
- ✅ Don't break SEO (canonical, hreflang, JSON-LD Person already wired)

---

## 12) What's working well (don't regress)

- ✅ Build passes in ~1.5s, 25 static pages
- ✅ TypeScript strict, no errors
- ✅ Bilingual routes mirror cleanly
- ✅ All 7 project case studies have rich bilingual MDX content
- ✅ All 3 blog posts have rich bilingual MDX content
- ✅ Lighthouse-friendly (no JS frameworks, fonts preconnected, images lazy)
- ✅ Companies bar
- ✅ Highlight band is genuinely a "wow moment"
- ✅ Method section (3 principles) reads as substance
- ✅ Project covers visually unified (phosphor-tint filter)
- ✅ CHDevSec card has dramatic treatment in Experience
- ✅ OG image generated and looks professional
- ✅ JSON-LD Person schema, sitemap, robots.txt all wired
- ✅ Mobile responsive (with caveats — long scroll)
- ✅ Tablet (md:) breakpoint works after recent fix

---

## 13) Suggested next steps (ranked)

1. **Redesign Hero** to satisfy "welcoming + senior + smaller photo" (primary blocker)
2. Polish remaining section variety / typography fatigue
3. Add real testimonials when collected (data file `testimonials.ts` ready, just plug in)
4. Add Plausible/Umami analytics
5. Replace mailto lead magnet with Formspree or Resend
6. Add Cal.com booking
7. Register domain (`caiohenrique.dev` suggested) and deploy on Vercel
8. Optionally: GitHub stats embed, HTB rank, search for blog/projects, RSS feed

---

## 14) Important commands

```bash
# Install
cd /home/caio/Documents/Portfolio-projetc-main/v2
npm install

# Dev (port 4321)
npm run dev

# Build
npm run build

# Preview built output
npm run preview

# Type check
npx astro check
```

---

## 15) Final note for the next AI / dev

The biggest psychological state to internalize:
- Owner is **frustrated by the current hero**.
- Owner has **shown patience with iteration**, but specifically asked to be told "I'll just give you changes and you do them" — so **execute changes, don't propose menus**.
- The visual identity (pixel + phosphor + CRT) is **load-bearing** — don't introduce a clean modernist look.
- Real CV metrics matter: don't invent numbers. Everything in `data/` is sourced from the CVs at `/home/caio/Documents/Portfolio-projetc-main/img/CV-CaioHenrique-PT.pdf` and `Profile (3).pdf`.
- The user is BR-based, prefers English-first targeting, and is genuinely a Senior Security Engineer with 7 years experience — copy should be assertive, not humble-bragging.

Good luck.
