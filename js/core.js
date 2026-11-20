/* =====================================================================
   RESONARA — CORE: shared helpers, i18n engine (t, plurals, Intl), image
   slots, API posting, reference IDs, live announcements. Exposed as
   window.GD so app.js, pages.js and features.js share one toolbox.
   ===================================================================== */
(function () {
  "use strict";
  const CFG = window.CFG, I18N = window.I18N || {};
  const GD = (window.GD = { routes: [], mounters: [], listeners: {} });
  /* Pre-rendered route stubs (tools/prerender.js) live in sub-folders and set window.GD_BASE = "../". */
  GD.base = typeof window.GD_BASE === "string" ? window.GD_BASE : "";

  /* ---------- tiny utils ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const live = (u) => typeof u === "string" && u.trim() !== "" && u.trim() !== "#";
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* private mode */ } },
  };
  const on = (ev, fn) => (GD.listeners[ev] = GD.listeners[ev] || []).push(fn);
  const emit = (ev, d) => (GD.listeners[ev] || []).forEach((fn) => fn(d));
  Object.assign(GD, { $, $$, esc, live, store, on, emit });

  /* ---------- i18n ---------- */
  const AVAIL = (CFG.i18n && CFG.i18n.available) || ["en"];
  const LANG_META = {
    en: { name: "English", dir: "ltr" }, ar: { name: "العربية", dir: "rtl" }, fr: { name: "Français", dir: "ltr" },
    es: { name: "Español", dir: "ltr" }, de: { name: "Deutsch", dir: "ltr" },
  };
  function detect() {
    const q = new URLSearchParams(location.search).get("lang");
    if (q && AVAIL.includes(q)) return q;
    const saved = store.get("gd-lang");
    if (saved && AVAIL.includes(saved)) return saved;
    // Browser preference is a suggestion only: no redirect, just the initial UI language.
    const prefs = navigator.languages || [navigator.language || ""];
    for (const p of prefs) { const b = String(p).slice(0, 2).toLowerCase(); if (AVAIL.includes(b)) return b; }
    return (CFG.i18n && CFG.i18n.default) || "en";
  }
  let lang = detect();
  const pr = () => new Intl.PluralRules(lang);
  function t(key, vars) {
    let s = I18N[lang] && I18N[lang][key];
    if (s == null) s = I18N.en && I18N.en[key];
    if (s == null) return key;
    if (typeof s === "object") { const n = vars && vars.n != null ? Number(vars.n) : 0; s = s[pr().select(n)] || s.other || ""; }
    if (vars) s = s.replace(/\{(\w+)\}/g, (m, k) => (vars[k] != null ? (k === "n" ? fmt(vars[k]) : vars[k]) : m));
    return s;
  }
  const hasT = (key) => !!((I18N[lang] && I18N[lang][key] != null) || (I18N.en && I18N.en[key] != null));
  const fmt = (n, o) => { try { return new Intl.NumberFormat(lang, o).format(n); } catch (e) { return String(n); } };
  const fmtDate = (d, o = { year: "numeric", month: "long", day: "numeric" }) => { try { return new Intl.DateTimeFormat(lang, o).format(new Date(d)); } catch (e) { return String(d); } };
  const fmtList = (arr) => { try { return new Intl.ListFormat(lang, { style: "short", type: "conjunction" }).format(arr); } catch (e) { return arr.join(", "); } };
  /* Long-form copy that only exists in English: mark it so screen readers switch voice. */
  const enAttr = () => (lang === "en" ? "" : ' lang="en" dir="ltr"');
  const isRTL = () => (LANG_META[lang] || {}).dir === "rtl";
  function applyLang() {
    const h = document.documentElement;
    h.lang = lang; h.dir = isRTL() ? "rtl" : "ltr";
    if (lang === "ar" && !document.getElementById("font-ar")) {
      const l = document.createElement("link"); l.id = "font-ar"; l.rel = "stylesheet";
      l.href = "https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@600;700&family=IBM+Plex+Sans+Arabic:wght@400;500;600&display=swap";
      document.head.appendChild(l);
    }
  }
  /* Dictionaries other than English load on demand (js/i18n/<lang>.js). */
  const loadDict = (l) => (l === "en" || I18N[l] ? Promise.resolve() : GD.loadScript(`${GD.base}js/i18n/${l}.js`));
  async function setLang(l) {
    if (!AVAIL.includes(l) || l === lang) return;
    try { await loadDict(l); } catch (e) { return; }
    lang = l; store.set("gd-lang", l); applyLang(); emit("lang", l);
  }
  applyLang();
  /* Service fields with dictionary overrides (label/headline/line). */
  const sv = (s, f) => { const k = `svc.${s.slug}.${f}`; return I18N[lang] && I18N[lang][k] != null ? I18N[lang][k] : s[f]; };
  /* Index-based dictionary overrides for short content arrays (values.0.t …). */
  const tx = (prefix, i, fallback) => { const k = `${prefix}.${i}`; return hasT(k) ? t(k) : fallback; };
  /* Brand copy lives in CFG (English source). Other languages may override it with dictionary keys
     brand.tagline / brand.story / hero.l1 / hero.l2 — English always uses CFG so your edits win. */
  const cfgT = (key, cfgValue) => (lang !== "en" && I18N[lang] && I18N[lang][key] != null ? I18N[lang][key] : cfgValue);
  Object.assign(GD, { cfgT, t, hasT, fmt, fmtDate, fmtList, enAttr, isRTL, setLang, sv, tx, AVAIL, LANG_META, lang: () => lang });

  /* ---------- environment ---------- */
  GD.hasGsap = !!(window.gsap && window.ScrollTrigger);
  GD.osReduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  GD.motionOff = (() => { try { return localStorage.getItem("gd-motion") === "off"; } catch (e) { return false; } })();
  GD.reduced = GD.osReduced || GD.motionOff || !GD.hasGsap;
  GD.fine = matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------- links ---------- */
  const digits = String(CFG.whatsapp || "").replace(/\D/g, "");
  Object.assign(GD, {
    digits,
    waLink: (txt = CFG.whatsappText) => `https://wa.me/${digits}?text=${encodeURIComponent(txt || "")}`,
    telLink: `tel:${String(CFG.phone || "").replace(/[^\d+]/g, "")}`,
    mailLink: `mailto:${CFG.email}`,
    siteUrl: () => (live(CFG.siteUrl) ? CFG.siteUrl.replace(/\/?$/, "/") : new URL(GD.base || "./", location.href).href.split("#")[0].split("?")[0]),
  });

  /* ---------- proof helpers (NO-FAKE-PROOF) ---------- */
  GD.proof = (key, sample) => {
    if (Array.isArray(CFG[key]) && CFG[key].length) return { items: CFG[key], demo: false };
    if (CFG.demo && sample && sample.length) return { items: sample, demo: true };
    return null;
  };
  GD.REVIEW = /[?&]review=1/.test(location.search);
  GD.isoState = () => {
    const I = CFG.iso; if (!I || !Array.isArray(I.standards) || !I.standards.length) return null;
    const now = Date.now();
    const verified = I.standards.every((x) => x.verified === true && live(x.verifyUrl) && !(x.expires && new Date(x.expires).getTime() < now));
    return verified || I.ownerApproved || GD.REVIEW ? { I, verified: verified || !!I.ownerApproved } : null;
  };
  /* ISO badge row. compact = Home strip (links to Trust Center); full = Trust Center block with standards list. */
  GD.isoBlock = (compact) => {
    const st = GD.isoState(); if (!st) return "";
    const { I, verified } = st;
    const img = `<img src="${GD.base}${esc(I.image)}" alt="${esc(t("iso.alt"))}" width="${I.w}" height="${I.h}" loading="lazy" decoding="async" />`;
    const tag = verified ? "" : `<p class="iso__review" lang="en" dir="ltr">Internal preview — certificates not yet verified. Not shown publicly.</p>`;
    if (compact) return `<div class="iso iso--compact" data-reveal>${tag}<a class="iso__link" href="#/trust"><span class="iso__img">${img}</span><span class="link-arrow">${esc(t("iso.link"))}</span></a></div>`;
    return `<div class="iso" data-reveal>${tag}<div class="iso__img">${img}</div><ul class="iso__list">${I.standards.map((x) => `<li><b>${esc(x.name)}</b>${x.issuer ? ` <span>${esc(x.issuer)}</span>` : ""}${live(x.verifyUrl) ? ` <a class="link-arrow" href="${esc(x.verifyUrl)}" target="_blank" rel="noopener">${esc(t("iso.verify"))}</a>` : ""}</li>`).join("")}</ul></div>`;
  };
  GD.ribbon = (onOff, label) => (onOff ? `<span class="demo-ribbon">${esc(label || t("demo.ribbon"))}</span>` : "");

  /* ---------- markup helpers ---------- */
  GD.lines = (arr, cls = "") => arr.map((x) => `<span class="line"><span class="line__inner ${cls}">${esc(x)}</span></span>`).join("");
  GD.world = (scene, tone, cam, look = "", extra = "") => `data-world data-scene="${scene}" data-tone="${tone}" data-cam="${cam}"${look ? ` data-look="${look}"` : ""} ${extra}`;

  /* Art-directed image slot. Resolves the slot to a supplied asset (CFG.assets), keeps the frame ratio from
     CFG.images (no layout shift), lazy-loads a responsive srcset (640/1280/1920 w) with a blur-up, and takes its
     alt text from the asset. Optional caption (evidence label) is real HTML text over the image, never baked in.
     A slot without an asset renders an empty frame and requests no file. */
  GD.slot = (name, cls = "", altOverride, caption = "") => {
    const m = (CFG.images && CFG.images[name]) || { ar: "4/3", w: 1600, h: 1200 };
    const a = m.asset && CFG.assets ? CFG.assets[m.asset] : null;
    const cap = caption ? `<figcaption class="slot__cap">${esc(caption)}</figcaption>` : "";
    if (!a) return `<figure class="slot is-empty ${cls}" style="--ar:${m.ar}" data-slot-name="${name}">${cap}</figure>`;
    const base = `${GD.base}images/${m.asset}`, alt = altOverride != null ? altOverride : a.alt;
    const srcset = [640, 1280, 1920].filter((w) => w <= a.w).map((w) => `${base}-${w}.webp ${w}w`).join(", ");
    const wide = /fill/.test(cls) || /^(21|16)\//.test(m.ar);
    const sizes = wide ? "(min-width: 1100px) 1100px, 100vw" : "(min-width: 1100px) 560px, (min-width: 700px) 50vw, 100vw";
    const pos = m.pos ? ` style="object-position:${esc(m.pos)}"` : "";
    return `<figure class="slot ${cls}" style="--ar:${m.ar}" data-slot-name="${name}"><img data-slot="${name}" data-src="${base}.webp" data-srcset="${srcset}" sizes="${sizes}" alt="${esc(alt)}" width="${a.w}" height="${a.h}" decoding="async"${pos} /><span class="slot__ph" aria-hidden="true"></span>${cap}${CFG.showSlotLabels ? `<span class="slot__tag" aria-hidden="true">${esc(name)} → ${esc(m.asset)}</span>` : ""}</figure>`;
  };

  /* ---------- live region ---------- */
  GD.announce = (msg) => { const r = $("#live"); if (!r) return; r.textContent = ""; setTimeout(() => (r.textContent = msg), 40); };

  /* ---------- reference IDs (client fallback only; the server issues its own) ---------- */
  GD.refId = (prefix = "GD") => {
    const d = new Date(), ymd = `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, "0")}${String(d.getUTCDate()).padStart(2, "0")}`;
    const a = new Uint8Array(4); (window.crypto || {}).getRandomValues ? crypto.getRandomValues(a) : a.forEach((_, i) => (a[i] = Math.random() * 256));
    const r = Array.from(a).map((b) => "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[b % 32]).join("");
    return `${prefix}-${ymd}-${r}`;
  };

  /* ---------- API ---------- */
  GD.apiUrl = (kind) => {
    let base = CFG.apiBase;
    if (!live(base) && live(CFG.api)) base = String(CFG.api).replace(/\/contact\/?$/, ""); // legacy `api` string
    return live(base) ? `${base.replace(/\/+$/, "")}/${kind}` : "";
  };
  GD.post = async (kind, data) => {
    const url = GD.apiUrl(kind); if (!url) return { ok: false, mail: true };
    const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, source: location.href, lang }) });
    const j = await res.json().catch(() => ({}));
    if (!res.ok || !j.ok) { const e = new Error(j.error || `Request failed (${res.status})`); e.fields = j.fields; throw e; }
    return j;
  };
  GD.mailto = (subject, lines) => { window.location.href = `mailto:${CFG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`; };

  /* ---------- validation shared by every form ---------- */
  GD.RX = { email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, phone: /^[+\d][\d\s().-]{5,39}$/ };

  /* ---------- focus trap for dialogs/menus ---------- */
  GD.trap = (el, onEsc) => {
    const sel = 'a[href],button:not([disabled]),input:not([disabled]):not([type=hidden]),select,textarea,[tabindex]:not([tabindex="-1"])';
    const h = (e) => {
      if (e.key === "Escape") { onEsc && onEsc(); return; }
      if (e.key !== "Tab") return;
      const f = $$(sel, el).filter((x) => x.offsetParent !== null || x === document.activeElement); if (!f.length) return;
      const first = f[0], lastEl = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); lastEl.focus(); }
      else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); first.focus(); }
    };
    el.addEventListener("keydown", h);
    return () => el.removeEventListener("keydown", h);
  };

  /* ---------- lazy script loader (jsPDF etc.) ---------- */
  const loaded = {};
  GD.loadScript = (src) => loaded[src] || (loaded[src] = new Promise((res, rej) => {
    const s = document.createElement("script"); s.src = src; s.async = true; s.crossOrigin = "anonymous";
    s.onload = res; s.onerror = () => { delete loaded[src]; rej(new Error("load failed")); }; document.head.appendChild(s);
  }));

  /* App boot waits for the initial dictionary (preloader covers the wait). */
  GD.dictReady = loadDict(lang).catch(() => { lang = "en"; applyLang(); });
})();
