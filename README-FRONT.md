# RESONARA — front end (static site)

A cinematic, scroll-driven 3D website. Plain HTML/CSS/JS — **no build step**.
Works on any static host, including a GitHub Pages project URL such as
`https://USER.github.io/REPO/` (all paths are relative; routes are hash-based).
Everything is free: no paid libraries, no API keys in the browser.

## Files

```
front/
  index.html            shell: preloader (animated logo + real progress), skippable intro, nav, canvas,
                        dialogs (search palette, consent), sticky CTA, footer, JSON-LD
  css/style.css         design system: tokens, type scale, grid, components, RTL, print, high-contrast
  js/config.js          ← CFG: every brand value, proof field, image slot. Edit this first.
  js/content.js         all long-form copy: 11 services, highlights, FAQ, about, sample cases,
                        4 articles, 46-term glossary, checklists, trust, enterprise, legal templates
  js/core.js            shared helpers: i18n engine, image slots, API posting, validation, focus traps
  js/illustrations.js   SVG logo mark + wordmark, 18 line icons, 8 spot illustrations, 5 interactive demos
  js/scene.js           three.js r128 world: one canvas, 19 procedural scenes, adaptive quality
  js/app.js             router, core pages, nav + mega-menu, motion system, intro, forms, SEO meta
  js/pages.js           quote wizard, language explorer, join, trust, enterprise, resources, legal
  js/features.js        wizard/explorer logic, ⌘K palette, consent + analytics hook, sticky CTA,
                        pilot planner, filters, client-side PDFs (jsPDF, lazy-loaded)
  js/i18n/en.js         English dictionary (source of truth)
  js/i18n/ar|fr|es|de.js MACHINE DRAFTS — need native review (see js/i18n/REVIEW.md)
  tools/prerender.js    generates per-route static pages + sitemap.xml + robots.txt (Node, no deps)
  tools/check-i18n.js   checks every dictionary against en.js
  images/               the 20 supplied photos as responsive webp sets (see image-map.md). og.png + logo-mark.svg ship.
  favicon.svg, favicon-32.png, apple-touch-icon.png, icon-192/512.png, site.webmanifest
  sitemap.xml, robots.txt  (regenerate with tools/prerender.js after setting CFG.siteUrl)
  image-map.md          which photo feeds which slot, with alt text
  .nojekyll             tells GitHub Pages to serve files as-is
```

### Routes

`#/home` · `#/about` · `#/services` · `#/services/<slug>` · `#/case-studies` ·
`#/case-studies/<slug>` · `#/contact` · `#/quote` (`?type=pilot&service=<slug>` supported) ·
`#/languages` · `#/join` · `#/trust` · `#/rfp` · `#/resources` · `#/resources/<slug>` ·
`#/privacy` · `#/terms` · anything else → 404 (3D lost globe).

Service slugs (11): `speech-voice`, `data-collection`, `data-annotation`, `ai-model-evaluation`,
`quality-assurance`, `industry-solutions`, `translation-localization`, `generative-ai`,
`off-the-shelf-datasets`, `data-evaluation`, `transcription`.

## Run locally

```bash
cd front
python3 -m http.server 5500     # open http://localhost:5500
```

## Deploy on GitHub Pages (free)

1. Create a **public** repository, e.g. `resonara-site`.
2. Upload the **contents** of `front/` to the repo root (`index.html` at the top level).
3. **Settings → Pages** → *Deploy from a branch* → `main` / `(root)` → Save.
4. Live in 1–2 minutes at `https://USER.github.io/resonara-site/`.
5. Set `CFG.siteUrl` to that URL, run `node tools/prerender.js`, commit the generated folders (see **SEO**).

## Filling CFG (`js/config.js`) — every field

| Key | What to put | Empty / null means |
| --- | --- | --- |
| `brand`, `tagline`, `story`, `hero.lines` | Wordmark text, tagline, one-sentence story, 2-line hero | — (required). Other languages may override via `brand.tagline`, `brand.story`, `hero.l1`, `hero.l2` in their dictionary |
| `siteUrl` | Absolute URL **with trailing slash** | Canonical/hreflang use the current address; prerender skips page stubs |
| `email`, `phone` | Public contact details | — |
| `whatsapp`, `whatsappText` | Digits only (e.g. `201558126147`) + prefilled message | Empty `whatsapp` hides the WhatsApp button/links |
| `address`, `mapQ` | Address text; Google Maps search text | Hidden |
| `incidentEmail` | Security-incident inbox (Trust Center) | Uses `email` |
| `socials` | Full profile URLs | Any `"#"` is hidden; all `"#"` hides the row |
| `apiBase` | Your Vercel base, e.g. `https://resonara-back.vercel.app/api` | Forms fall back to opening the visitor's email app |
| `demo` | `true` shows SAMPLE blocks under a yellow **DEMO** ribbon | `false` hides every block with no real data |
| `stats` | `[{ value: "40+", label: "…" }]` — numbers count up. Add `key: "locales"` to the entry that should show on Transcription | Hidden (demo: ribboned sample) |
| `testimonials`, `rating`, `certs`, `team`, `cases` | Real, permitted proof only (shapes in config comments) | Hidden / ribboned samples. Trust Center shows "Documentation available on request" when `certs` is empty |
| `datasets` | Real catalog entries `{ id, title, modality, task, languages, volume, license, url }` | Demo shows SAMPLE cards; otherwise the catalog block is hidden |
| `languages` | Languages a visitor can **request** (62 ship). Add `modalities` only when delivery is confirmed | Explorer and wizard empty |
| `presence` | Real locations `{ city, country, lat, lon, note }` | Presence globe/map hidden |
| `hours`, `responseTime` | `{ tz, days, open, close }` + text like "within one business day" | "Reach us" widget hidden |
| `bookingUrl` | Free scheduling link (Cal.com, Google appointment) | Button hidden |
| `subprocessors` | `[{ name, purpose, location }]` | Trust Center says "List provided on request" |
| `sla` | Example SLA rows (wording only) | Empty table — keep at least one row or remove the rows you don't want |
| `contract` | Legal entity, registration, tax ID, invoicing, payment terms, currencies | "Provided during onboarding" |
| `pilot` | Planner formula (setup, per-unit ranges, factors). Output = **team-days band, never a price** | — |
| `analytics` | Privacy-first script `{ src, attrs }` (e.g. Umami / GoatCounter free tier) | Off. Even when set, loads only after the visitor opts in |
| `i18n` | `default` + `available` languages | — |
| `imageFormats` | Formats uploaded for every slot, e.g. `["avif","webp"]` | — |
| `assets` / `images` | `assets`: per-photo `alt`, `w`/`h`. `images`: slot → `asset`, `ar` (aspect ratio), optional `pos` | — |
| `showSlotLabels` | Small dashed "Image slot" tag on empty frames | Set `false` before launch |

**No fake proof:** never put certifications, client names, logos, people or numbers in
these fields unless they are true and you may publish them.

## Images

Each slot loads `images/<asset>.webp` with a 640/1280/1920 `srcset`, lazily, with width/height set (no layout shift),
a blur-up placeholder, clip-path reveal and gentle parallax. Missing files keep the
placeholder/3D scene — a 404 per missing image in the console is expected.
Slot → photo map and alt text: **image-map.md**.
`images/og.png` (1200×630) is a brand-only social card generated from the logo — replace it when you have final art.

## Translations

- Switcher in nav + footer; the choice persists (localStorage, guarded with try/catch).
- First visit picks the browser language if available — **no redirect**, URL unchanged; `?lang=xx` also works.
- Arabic switches the whole layout to RTL (logical CSS, mirrored arrows, mirrored 3D drift) and loads
  Noto Kufi Arabic + IBM Plex Sans Arabic (free, Google Fonts) with system fallbacks.
- Numbers, dates and plurals use `Intl`.
- Non-English files are **machine drafts**. Run `node tools/check-i18n.js` after editing. Checklist: `js/i18n/REVIEW.md`.

## SEO (important on GitHub Pages)

Hash routes (`#/about`) are invisible to search engines: everything after `#` is ignored,
so without help every page shares one URL, title and description.
`node tools/prerender.js` fixes most of this **without a build step**:

- writes `about/index.html`, `services/transcription/index.html`, … (32 pages) — each with its own
  title, description, canonical, hreflang, Open Graph image, JSON-LD (Organization, Service, FAQPage,
  Article) and the page's main text as real HTML, readable without JavaScript;
- the stub loads the same app, which opens the matching route automatically;
- fills the home text into `index.html`, and writes `sitemap.xml` + `robots.txt`.

It refuses to write page stubs while `CFG.siteUrl` is empty (a wrong canonical URL would hurt
indexing). Re-run after any content change and commit the output.
Then submit `sitemap.xml` in Google Search Console (free).
Limits that remain: links inside the app still use `#/…`; language versions share a URL with `?lang=`.

## Built-in behaviour

- **Intro:** ~3 s portal → data globe with glowing language arcs → camera push-through. Skippable, shown once per session, off for reduced motion.
- **Adaptive quality:** FPS is measured; low FPS lowers particle count, pixel ratio and glow automatically. At most 2 heavy scenes alive; scenes build only when visible and are disposed after. Phones get simplified scenes.
- **Fallbacks:** no WebGL → CSS/SVG hero; `prefers-reduced-motion` → no smooth scroll, no reveals, slowed 3D.
- **Accessibility:** real DOM text, visible brand-colour focus rings, focus traps in menu/palette/dialogs, `aria-live` for form and async states, keyboard paths for wizard, explorer, filters and palette (⌘/Ctrl+K), `prefers-contrast: more` tokens.
- **Light/dark toggle: skipped on purpose.** The brand is built on deep-ink 3D lighting, fog and glow; a light theme would flatten the scenes and halve the visual identity. Sections already switch nav tone automatically for light-background areas.

## Libraries (free, pinned, CDN)

- three.js r128 — cdnjs (MIT) · GSAP 3.12.5 + ScrollTrigger — cdnjs (free GSAP licence; see gsap.com/licensing)
- Lenis 1.1.13 — jsDelivr (MIT) · jsPDF 2.5.1 — cdnjs (MIT), loaded only when a PDF button is clicked
- Fonts — Google Fonts (SIL OFL): Syne 700, Instrument Sans 400–600; Arabic: Noto Kufi Arabic, IBM Plex Sans Arabic

Bundle notes: ~320 KB of first-party JS unminified (≈ 105 KB gzipped incl. the English dictionary; GitHub Pages compresses automatically), three.js ≈ 600 KB, GSAP ≈ 70 KB. Dictionaries
other than English load only when chosen. Minifying is optional (e.g. free `esbuild --minify`).

## Smoke-test checklist (after every deploy)

- [ ] Home loads: preloader counts to 100, intro plays once and **Skip** works, globe + arcs render.
- [ ] Nav: Services mega-menu (desktop) and accordion (phone) list all 11 services; ⌘/Ctrl+K opens search.
- [ ] Each of the 11 service pages opens; planner sliders change the band; "estimate, not a quote" visible.
- [ ] Quote wizard: all steps, language search, review, submit → reference ID shown (needs `apiBase`).
- [ ] Contact, Join and newsletter forms submit; rows appear in Supabase.
- [ ] Trust → "Security overview" PDF and Enterprise → "Capability statement" PDF download.
- [ ] Switch to العربية: layout flips RTL; reload keeps the language. Switch back to English.
- [ ] Case-study filters + search; resources search; glossary.
- [ ] Phone (≈390 px wide): no sideways scroll; sticky CTA and WhatsApp button do not overlap.
- [ ] Unknown URL (`#/nope`) shows the 404 globe.
- [ ] Console: no errors other than expected 404s for missing images.

## Before launch — what to replace

- [ ] `demo: false` (or replace every sample with real, approved content)
- [ ] `showSlotLabels: false`; real images in `images/` (and `images/og.png` if you want new art)
- [ ] `siteUrl` set → `node tools/prerender.js` → commit
- [ ] `apiBase` set and a real test submission received for each form
- [ ] Contact details, socials, WhatsApp, `hours`, `responseTime`, `bookingUrl`, `contract`
- [ ] Privacy notice + Terms reviewed **by a lawyer** (the templates are generic)
- [ ] Translations reviewed by native speakers (or remove languages from `i18n.available`)

## Free-tier limits

- **GitHub Pages:** public repo on free plans, ~1 GB site, soft 100 GB/month bandwidth, not for commercial SaaS/e-commerce. Check docs.github.com/pages.
- **CDNs / Google Fonts:** free, no account. If blocked, content still shows (without 3D/animation).
- **Google Maps embed:** keyless `output=embed` iframe; Google may change this.

Confirm all terms on each provider's own page — they change.


## Production upgrade (this release)
- Real photos, evidence labels (Verified / Representative workflow / Demo illustration), service briefs, 3 case studies, expanded quote form (use case, dialects, deadline, quality target, privacy, tools, consent), language availability + pilot request, pausable motion.
- Run `003_brief_fields.sql` in Supabase before deploying the new front end (the quote form now sends those fields).
- Client voices, standards and numbers stay sample placeholders until the client approves evidence.
