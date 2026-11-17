#!/usr/bin/env node
/* =====================================================================
   GOLDATA — tools/prerender.js  (Node 18+, NO dependencies)
   Why: GitHub Pages serves one index.html and the site routes with #hash
   URLs. Search engines ignore everything after "#", so every page would
   share one URL, one title and one description.
   What this does:
     1. Writes a static stub per route, e.g. about/index.html,
        services/transcription/index.html — each with its own <title>,
        description, canonical, hreflang alternates, Open Graph tags,
        JSON-LD and the page's main text as real HTML (crawlable without JS).
        The stub loads the same app; on load it opens the matching #/route.
     2. Fills the home content into index.html (between prerender markers).
     3. Writes sitemap.xml (with hreflang) and robots.txt.
   Usage (from front/):  node tools/prerender.js
   Set CFG.siteUrl in js/config.js first (absolute URL with trailing slash).
   Re-run after every content change. Commit the generated folders.
   ===================================================================== */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");
const ROOT = path.resolve(__dirname, "..");
const ctx = { window: {}, console };
ctx.window.window = ctx.window;
vm.createContext(ctx);
for (const f of ["js/config.js", "js/i18n/en.js", "js/content.js"]) vm.runInContext(fs.readFileSync(path.join(ROOT, f), "utf8"), ctx, { filename: f });
const CFG = ctx.window.CFG, K = ctx.window.CONTENT, EN = ctx.window.I18N.en;
const SITE = (CFG.siteUrl || "https://USER.github.io/REPO/").replace(/\/?$/, "/");
const PLACEHOLDER = !CFG.siteUrl;
if (PLACEHOLDER) console.warn("⚠  CFG.siteUrl is empty. Writing sitemap.xml + robots.txt with the placeholder https://USER.github.io/REPO/ only.\n   Page stubs are SKIPPED (a wrong canonical URL would hurt indexing). Set CFG.siteUrl in js/config.js and re-run.");
const LANGS = (CFG.i18n && CFG.i18n.available) || ["en"];
const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const t = (k, v = {}) => String(EN[k] || k).replace(/\{(\w+)\}/g, (m, x) => (v[x] != null ? v[x] : m));
const P = (s) => `<p>${esc(s)}</p>`, H2 = (s) => `<h2>${esc(s)}</h2>`, UL = (a) => `<ul>${a.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;
const cases = Array.isArray(CFG.cases) && CFG.cases.length ? CFG.cases : K.SAMPLE_CASES;
const org = { "@context": "https://schema.org", "@type": "Organization", name: CFG.brand, url: SITE, description: CFG.story, email: CFG.email, telephone: CFG.phone, sameAs: Object.values(CFG.socials || {}).filter((u) => u && u !== "#") };

/* ---------- route table: [path, title, description, bodyHtml, jsonld?] ---------- */
const R = [];
R.push(["", EN["meta.title"], CFG.story, `<h1>${esc(CFG.hero.lines.join(" "))}</h1>${P(CFG.story)}${H2(t("intro.title"))}${P(t("intro.body"))}${H2(t("home.svc.t1", { n: K.SERVICES.length }))}${UL(K.SERVICES.map((s) => `${s.label} — ${s.line}`))}${H2(t("home.faq.eyebrow"))}${K.FAQ.map(([q, a]) => `<h3>${esc(q)}</h3>${P(a)}`).join("")}`,
  { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: K.FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) }]);
R.push(["about", `${t("nav.about")} — ${CFG.brand}`, t("about.missionText"), `<h1>${esc(t("about.t1"))} ${esc(t("about.t2"))}</h1>${P(t("about.missionText"))}${H2(t("about.approach"))}${UL(K.ABOUT.approach.map((a) => a.join(": ")))}${H2(t("about.quality"))}${UL(K.ABOUT.quality.map((a) => a.join(": ")))}${H2(t("about.values"))}${UL(K.ABOUT.values.map((a) => a.join(": ")))}`]);
R.push(["services", `${t("nav.services")} — ${CFG.brand}`, t("svcs.lead"), `<h1>${esc(t("svcs.t1"))} ${esc(t("svcs.t2"))}</h1>${P(t("svcs.lead"))}${K.SERVICES.map((s) => `<h2><a href="${SITE}services/${s.slug}/">${esc(s.label)}</a></h2>${P(s.line)}`).join("")}${H2(t("svcs.hl.eyebrow"))}${UL(K.HIGHLIGHTS.map((h) => `${h[0]}: ${h[1]}`))}${H2(t("svcs.ad.eyebrow"))}${UL(K.APPROACH_DIFF.map((h) => `${h[0]}: ${h[1]}`))}`]);
K.SERVICES.forEach((s) => R.push([`services/${s.slug}`, `${s.label} — ${CFG.brand}`, s.line,
  `<h1>${esc(s.headline)}</h1>${P(s.line)}${H2(t("sd.what"))}${P(s.what)}${UL(s.subs)}${H2(t("sd.subs"))}${s.details.map(([a, b]) => `<h3>${esc(a)}</h3>${P(b)}`).join("")}${H2(t("sd.deliv"))}${UL(s.deliverables)}${H2(t("home.faq.eyebrow"))}${s.faq.map(([q, a]) => `<h3>${esc(q)}</h3>${P(a)}`).join("")}`,
  { "@context": "https://schema.org", "@type": "Service", name: s.label, description: s.line, serviceType: s.label, provider: { "@type": "Organization", name: CFG.brand, url: SITE }, areaServed: "Worldwide" }]));
if (cases.length) {
  R.push(["case-studies", `${t("nav.cases")} — ${CFG.brand}`, t("cs.lead"), `<h1>${esc(t("cs.t1"))} ${esc(t("cs.t2"))}</h1>${P(t("cs.lead"))}${CFG.cases ? "" : P(t("cs.sampleNotice"))}${cases.map((c) => `<h2><a href="${SITE}case-studies/${c.slug}/">${esc(c.title)}</a></h2>${P(c.summary)}`).join("")}`]);
  cases.forEach((c) => R.push([`case-studies/${c.slug}`, `${c.title} — ${CFG.brand}`, c.summary, `<h1>${esc(c.title)}</h1>${P(c.summary)}${CFG.cases ? "" : P(t("cd.notice"))}${H2(t("cd.challenge"))}${P(c.challenge)}${H2(t("cd.approach"))}${UL(c.approach.map((a) => a.join(": ")))}${H2(t("cd.outcome"))}${P(c.outcome)}${H2(t("cd.takeaways"))}${UL(c.takeaways)}`]));
}
R.push(["contact", `${t("nav.contact")} — ${CFG.brand}`, t("ct.lead"), `<h1>${esc(t("ct.t1"))} ${esc(t("ct.sub"))}</h1>${P(t("ct.lead"))}<p><a href="mailto:${esc(CFG.email)}">${esc(CFG.email)}</a> · ${esc(CFG.phone)}</p>`]);
R.push(["quote", `${t("q.eyebrow")} — ${CFG.brand}`, t("q.lead"), `<h1>${esc(t("q.t1"))} ${esc(t("q.t2"))}</h1>${P(t("q.lead"))}`]);
R.push(["languages", `${t("lx.eyebrow")} — ${CFG.brand}`, t("lx.lead"), `<h1>${esc(t("lx.t1"))} ${esc(t("lx.t2"))}</h1>${P(t("lx.lead"))}${UL((CFG.languages || []).map((l) => `${l.name} (${l.native}) — ${l.code}`))}${P(t("lx.note"))}`]);
R.push(["join", `${t("j.eyebrow")} — ${CFG.brand}`, t("j.lead"), `<h1>${esc(t("j.t1"))} ${esc(t("j.t2"))}</h1>${P(t("j.lead"))}${UL(K.ROLES.map((r) => `${r[0]}: ${r[1]}`))}${P(t("j.note"))}`]);
R.push(["trust", `${t("tr.eyebrow")} — ${CFG.brand}`, t("tr.lead"), `<h1>${esc(t("tr.t1"))} ${esc(t("tr.t2"))}</h1>${P(t("tr.lead"))}${K.TRUST.map(([a, b]) => `${H2(a)}${P(b)}`).join("")}${H2(t("tr.certs"))}${Array.isArray(CFG.certs) && CFG.certs.length ? UL(CFG.certs.map((c) => c.name)) : P(t("tr.certsNone"))}`]);
R.push(["rfp", `${t("rfp.eyebrow")} — ${CFG.brand}`, t("rfp.lead"), `<h1>${esc(t("rfp.t1"))} ${esc(t("rfp.t2"))}</h1>${P(t("rfp.lead"))}${H2(t("rfp.onb"))}${UL(K.RFP.onboarding.map((a) => a.join(": ")))}${H2(t("rfp.pilot"))}${UL(K.RFP.pilot.map((a) => a.join(": ")))}${H2(t("rfp.sla"))}${P(t("rfp.slaNote"))}${UL((CFG.sla || []).map((r) => `${r.area}: ${r.target}`))}`]);
R.push(["resources", `${t("res.eyebrow")} — ${CFG.brand}`, t("res.lead"), `<h1>${esc(t("res.t1"))} ${esc(t("res.t2"))}</h1>${P(t("res.lead"))}${K.ARTICLES.map((a) => `<h2><a href="${SITE}resources/${a.slug}/">${esc(a.title)}</a></h2>${P(a.summary)}`).join("")}${H2(t("res.glossary"))}<dl>${K.GLOSSARY.map(([a, b]) => `<dt>${esc(a)}</dt><dd>${esc(b)}</dd>`).join("")}</dl>`]);
K.ARTICLES.forEach((a) => R.push([`resources/${a.slug}`, `${a.title} — ${CFG.brand}`, a.summary, `<h1>${esc(a.title)}</h1>${P(a.summary)}${a.sections.map(([h, p]) => `${H2(h)}${P(p)}`).join("")}`,
  { "@context": "https://schema.org", "@type": "Article", headline: a.title, description: a.summary, datePublished: a.date, author: { "@type": "Organization", name: CFG.brand }, publisher: { "@type": "Organization", name: CFG.brand }, mainEntityOfPage: `${SITE}resources/${a.slug}/` }]));
R.push(["privacy", `${t("lg.privacy")} — ${CFG.brand}`, t("lg.privacy"), `<h1>${esc(t("lg.privacy"))}</h1>${K.LEGAL.privacy.map(([h, p]) => `${H2(h)}${P(p)}`).join("")}`]);
R.push(["terms", `${t("lg.terms")} — ${CFG.brand}`, t("lg.terms"), `<h1>${esc(t("lg.terms"))}</h1>${K.LEGAL.terms.map(([h, p]) => `${H2(h)}${P(p)}`).join("")}`]);

/* ---------- write stubs ---------- */
const indexPath = path.join(ROOT, "index.html");
const tpl = fs.readFileSync(indexPath, "utf8");
const setMeta = (html, { title, desc, canon, depth, route, ld, body }) => {
  const up = "../".repeat(depth);
  // Idempotent: drop tags a previous run generated so they are not stacked on every run.
  let h = html
    .replace(/[ \t]*<link rel="alternate" hreflang="[^"]*"[^>]*data-static-hreflang \/>\r?\n?/g, "")
    .replace(/[ \t]*<meta property="og:url" content="[^"]*" \/>\r?\n?/g, "")
    .replace(/[ \t]*<meta property="og:image" content="https:\/\/(?!USER\.)[^"]*" \/>\r?\n?/g, "")
    .replace(/[ \t]*<meta name="twitter:image" content="https:\/\/(?!USER\.)[^"]*" \/>\r?\n?/g, "")
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(desc)}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(desc)}$2`)
    .replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" id="canonical" href="${canon}" />\n  ${LANGS.concat(["x-default"]).map((l) => `<link rel="alternate" hreflang="${l}" href="${canon}${l === "en" || l === "x-default" ? "" : `?lang=${l}`}" data-static-hreflang />`).join("\n  ")}\n  <meta property="og:url" content="${canon}" />\n  <meta property="og:image" content="${SITE}images/og.png" />\n  <meta name="twitter:image" content="${SITE}images/og.png" />`)
    .replace(/(<script type="application\/ld\+json" id="ld-org">)[\s\S]*?(<\/script>)/, `$1${JSON.stringify(org)}$2`)
    .replace(/(<script type="application\/ld\+json" id="ld-page">)[\s\S]*?(<\/script>)/, `$1${ld ? JSON.stringify(ld) : "{}"}$2`)
    .replace(/<!--prerender:start-->[\s\S]*?<!--prerender:end-->/, `<!--prerender:start--><div class="container prerendered">${body}</div><!--prerender:end-->`);
  if (depth) {
    h = h.replace(/(href|src)="(css|js|images)\//g, `$1="${up}$2/`).replace(/href="(favicon[^"]*|apple-touch-icon\.png|site\.webmanifest)"/g, `href="${up}$1"`)
      .replace("<!-- Pinned, free libraries -->", `<script>window.GD_BASE = "${up}"; if (!location.hash) history.replaceState(null, "", location.pathname + location.search + "#/${route}");</script>\n  <!-- Pinned, free libraries -->`);
  }
  return h;
};
let count = 0;
for (const [route, title, desc, body, ld] of PLACEHOLDER ? [] : R) {
  const canon = `${SITE}${route ? `${route}/` : ""}`;
  const depth = route ? route.split("/").length : 0;
  const html = setMeta(tpl, { title, desc, canon, depth, route, ld, body });
  const out = route ? path.join(ROOT, route, "index.html") : indexPath;
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html); count++;
}

/* ---------- sitemap + robots ---------- */
const today = new Date().toISOString().slice(0, 10);
const sm = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${R.map(([route]) => { const u = `${SITE}${route ? `${route}/` : ""}`; return `  <url>\n    <loc>${u}</loc>\n    <lastmod>${today}</lastmod>\n${LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${u}${l === "en" ? "" : `?lang=${l}`}"/>`).join("\n")}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${u}"/>\n  </url>`; }).join("\n")}\n</urlset>\n`;
fs.writeFileSync(path.join(ROOT, "sitemap.xml"), sm);
fs.writeFileSync(path.join(ROOT, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}sitemap.xml\n`);
console.log(`✓ ${count} pages pre-rendered (incl. index.html), sitemap.xml (${R.length} URLs × ${LANGS.length} languages) and robots.txt written for ${SITE}`);
