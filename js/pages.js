/* =====================================================================
   GOLDATA — EXTRA PAGES (registered into GD.routes)
   #/quote · #/languages · #/join · #/trust · #/rfp · #/resources
   #/resources/<slug> · #/privacy · #/terms
   + shared sections used by core pages: presence, catalog, planner,
     reach-us widget, newsletter form.
   Behaviour (validation, filtering, PDFs) lives in js/features.js.
   ===================================================================== */
(function () {
  "use strict";
  const CFG = window.CFG, K = window.CONTENT, GD = window.GD, ILLO = window.ILLO;
  const { esc, live, t, sv, lines, world, slot, ribbon } = GD;
  const S = K.SERVICES;
  const B = (...a) => GD.btn(...a);
  const label = (s) => sv(s, "label");
  const err = '<span class="err" aria-live="polite"></span>';
  const opt = () => `<span class="opt">${esc(t("f.optional"))}</span>`;
  const hero = (scene, eyebrow, title, lead, extra = "", media = "") => `
      <section class="page-hero page-hero--short" ${world(scene, "ink", "-2.7,0,9", "-2.7,0,0")}>
        <div class="container grid page-hero__grid">
          <div style="grid-column:1 / span 7">
            <p class="eyebrow" data-reveal>${esc(eyebrow)}</p>
            <h1 class="display" data-split>${lines(title)}</h1>
            ${lead ? `<p class="lead" data-reveal>${esc(lead)}</p>` : ""}
            ${extra}
          </div>
          ${media ? `<div class="page-hero__media" style="grid-column:9 / span 4">${media}</div>` : ""}
        </div>
      </section>`;
  const words = (s) => String(s).trim().split(/\s+/).length;
  const minutes = (txt) => Math.max(1, Math.round(words(txt) / 220));
  GD.readTime = minutes;

  /* ---------------- shared sections ---------------- */
  GD.presenceSection = () => {
    const pts = Array.isArray(CFG.presence) ? CFG.presence.filter((p) => isFinite(p.lat) && isFinite(p.lon)) : [];
    if (!pts.length) return "";
    const map = `<svg class="flatmap" viewBox="0 0 360 180" role="img" aria-label="${esc(t("pr.map", { brand: CFG.brand }))}"><rect width="360" height="180" rx="8" class="flatmap__bg"/>${[30, 60, 90, 120, 150].map((y) => `<path d="M0 ${y}H360" class="flatmap__grid"/>`).join("")}${[60, 120, 180, 240, 300].map((x) => `<path d="M${x} 0V180" class="flatmap__grid"/>`).join("")}${pts.map((p) => `<g><circle cx="${(p.lon + 180).toFixed(1)}" cy="${(90 - p.lat).toFixed(1)}" r="3.4" class="flatmap__pt"/><circle cx="${(p.lon + 180).toFixed(1)}" cy="${(90 - p.lat).toFixed(1)}" r="8" class="flatmap__pulse"/></g>`).join("")}</svg>`;
    return `
      <section class="section presence" ${world("presence", "deep", "2.6,0,8.5", "2.6,0,0")} aria-labelledby="pr-title">
        <div class="container grid">
          <div class="presence__text">
            <p class="eyebrow" data-reveal>${esc(t("pr.eyebrow"))}</p>
            <h2 id="pr-title" class="display-2" data-split>${lines([t("pr.t1"), t("pr.t2")])}</h2>
            <ul class="presence__list" data-reveal>${pts.map((p) => `<li><b>${esc(p.city)}</b><span>${esc(p.country)}${p.note ? ` · ${esc(p.note)}` : ""}</span></li>`).join("")}</ul>
            <div class="presence__map" data-reveal>${map}</div>
          </div>
        </div>
      </section>`;
  };

  GD.catalogSection = (s) => {
    const real = Array.isArray(CFG.datasets) && CFG.datasets.length;
    const items = real ? CFG.datasets : CFG.demo ? K.SAMPLE_DATASETS : null;
    if (!items) return "";
    const mods = K.DATASET_MODALITIES;
    return `
      <section class="section section--tight" aria-labelledby="cat-title" data-catalog>
        <div class="container">
          <div class="section-head"><p class="eyebrow" data-reveal>${esc(t("sd.catalog.eyebrow"))}</p><h2 id="cat-title" class="display-2" data-split>${lines([t("sd.catalog.t")])}</h2></div>
          <div class="filters" role="group" aria-label="${esc(t("sd.catalog.filter"))}" data-reveal>
            <button data-mod="all" aria-pressed="true">${esc(t("sd.catalog.all"))}</button>${mods.map((m) => `<button data-mod="${m}" aria-pressed="false">${esc(t(`mod.${m}`))}</button>`).join("")}
          </div>
          <p class="results" aria-live="polite" data-cat-count></p>
          <div class="ds-grid has-demo">${real ? "" : ribbon(true)}${items.map((d) => `
            <article class="ds" data-mod="${esc(d.modality)}" data-reveal${real ? "" : GD.enAttr()}>
              ${slot(d.slot || `ds-${d.modality}`, "slot--frame")}
              <div class="ds__body"><span class="pill pill--${esc(d.modality)}">${esc(t(`mod.${d.modality}`))}</span>${real ? "" : `<span class="pill">${esc(t("demo.sample"))}</span>`}
                <h3 class="h3">${esc(d.title)}</h3>
                <dl class="ds__meta"><div><dt>${esc(t("sd.catalog.task"))}</dt><dd>${esc(d.task)}</dd></div><div><dt>${esc(t("sd.catalog.languages"))}</dt><dd>${esc(d.languages || "—")}</dd></div><div><dt>${esc(t("sd.catalog.volume"))}</dt><dd>${esc(d.volume || "—")}</dd></div><div><dt>${esc(t("sd.catalog.license"))}</dt><dd>${esc(d.license || "—")}</dd></div></dl>
                <a class="link-arrow" href="#/quote?service=${s.slug}&mod=${esc(d.modality)}">${esc(t("sd.catalog.req"))} ${GD.ICON.arrow}</a>
              </div>
            </article>`).join("")}
          </div>
          <div class="empty" data-cat-empty hidden>${ILLO.spot("shelf")}<p>${esc(t("sd.catalog.empty"))}</p></div>
        </div>
      </section>`;
  };

  GD.plannerSection = (s) => {
    const P = CFG.pilot; if (!P) return "";
    const u = P.units[s.unit] || P.units.items;
    return `
      <section class="section section--tight planner-sec no-print" aria-labelledby="pp-title">
        <div class="container grid split">
          <div><p class="eyebrow" data-reveal>${esc(t("pp.eyebrow"))}</p><h2 id="pp-title" class="display-3" data-split style="margin-block:1.25rem">${lines([t("pp.t")])}</h2><p class="body-soft" data-reveal>${esc(t("pp.lead"))}</p></div>
          <form class="planner" data-planner data-service="${s.slug}" data-unit="${s.unit}" data-reveal onsubmit="return false">
            <div class="range"><label for="pp-vol">${esc(t(`unit.${s.unit}`))}</label><input id="pp-vol" type="range" name="volume" min="${u.min}" max="${u.max}" step="${u.step}" value="${u.value}" /><output for="pp-vol" data-out="volume">${GD.fmt(u.value)}</output></div>
            <div class="range"><label for="pp-langs">${esc(t("pp.langs"))}</label><input id="pp-langs" type="range" name="langs" min="1" max="20" step="1" value="2" /><output for="pp-langs" data-out="langs">${GD.fmt(2)}</output></div>
            <fieldset class="seg"><legend>${esc(t("pp.review"))}</legend>${Object.keys(P.review).map((k, i) => `<label><input type="radio" name="review" value="${k}" ${i === 0 ? "checked" : ""} /><span>${esc(t(`pp.review.${k}`))}</span></label>`).join("")}</fieldset>
            <fieldset class="seg"><legend>${esc(t("pp.complexity"))}</legend>${Object.keys(P.complexity).map((k) => `<label><input type="radio" name="cx" value="${k}" ${k === "typical" ? "checked" : ""} /><span>${esc(t(`pp.cx.${k}`))}</span></label>`).join("")}</fieldset>
            <div class="planner__out" aria-live="polite"><small>${esc(t("pp.out"))}</small><b data-band>—</b><div class="band" aria-hidden="true"><i data-band-bar></i></div></div>
            <p class="planner__note">${esc(t("pp.note"))}</p>
            <a class="btn btn--primary magnetic" data-pilot-link href="#/quote?type=pilot&service=${s.slug}"><span class="btn__label">${esc(t("pp.cta"))}</span><span class="btn__icon" aria-hidden="true">${GD.ICON.arrow}</span></a>
          </form>
        </div>
      </section>`;
  };

  GD.reachWidget = () => {
    const real = CFG.hours && CFG.hours.tz;
    if (!real && !CFG.demo) return live(CFG.responseTime) ? `<div class="reach"><p class="reach__h">${esc(t("reach.t"))}</p><p>${esc(t("reach.resp", { v: CFG.responseTime }))}</p></div>` : "";
    const h = real ? CFG.hours : { tz: "UTC", days: [1, 2, 3, 4, 5], open: "09:00", close: "17:00" };
    return `<div class="reach has-demo" data-reach='${esc(JSON.stringify(h))}'>${real ? "" : ribbon(true)}<p class="reach__h">${esc(t("reach.t"))}</p><p class="reach__state"><i aria-hidden="true"></i><span data-reach-state>—</span></p><p class="body-soft" data-reach-time></p><p class="body-soft">${esc(t("reach.hours", { open: h.open, close: h.close, tz: h.tz }))}</p>${live(CFG.responseTime) ? `<p class="body-soft">${esc(t("reach.resp", { v: CFG.responseTime }))}</p>` : ""}${live(CFG.bookingUrl) ? `<a class="link-arrow" href="${esc(CFG.bookingUrl)}" target="_blank" rel="noopener">${esc(t("cta.book"))} ${GD.ICON.arrow}</a>` : ""}</div>`;
  };

  GD.newsletterForm = () => `
    <form class="nl" data-newsletter novalidate>
      <p class="nl__t">${esc(t("nl.t"))}</p><p class="nl__b">${esc(t("nl.body"))}</p>
      <div class="nl__row"><label class="sr-only" for="nl-email">${esc(t("nl.email"))}</label><input id="nl-email" name="email" type="email" autocomplete="email" required maxlength="160" placeholder="${esc(t("nl.email"))}" /><button class="btn btn--sm btn--primary" type="submit"><span class="btn__label">${esc(t("nl.send"))}</span></button></div>
      <div class="hp" aria-hidden="true"><label for="nl-web">${esc(t("f.website"))}</label><input id="nl-web" name="website" tabindex="-1" autocomplete="off" /></div>
      <p class="nl__note">${esc(t("nl.note"))}</p>
      <p class="nl__status" role="status" aria-live="polite"></p>
    </form>`;

  /* ---------------- Request-a-Quote wizard ---------------- */
  function quote(m, q) {
    const type = q.get("type") === "pilot" ? "pilot" : "quote";
    const preS = (q.get("service") || "").split(",").filter(Boolean), preL = (q.get("lang") || "").split(",").filter(Boolean), preM = q.get("mod") || "";
    const steps = ["q.s1", "q.s2", "q.s3", "q.s4", "q.s5"];
    const mods = ["text", "audio", "image", "video"];
    return {
      title: `${t(type === "pilot" ? "q.eyebrowPilot" : "q.eyebrow")} — ${CFG.brand}`, desc: t("q.lead"), sticky: null,
      html: `
      ${hero("cubes", t(type === "pilot" ? "q.eyebrowPilot" : "q.eyebrow"), [t("q.t1"), t("q.t2")], t("q.lead"), "", slot("quote", "slot--frame"))}
      <section class="section section--tight" ${world("ambient", "ink", "0,0,9")}>
        <div class="container">
          <form class="wizard" data-wizard data-type="${type}" data-pre-q="${esc(JSON.stringify({ volume: q.get("volume") || "", langs: q.get("langs") || "", review: q.get("review") || "" }))}" novalidate>
            <ol class="wizard__steps" aria-label="${esc(t("q.step", { n: 1, total: 5 }))}">${steps.map((k, i) => `<li data-step-dot="${i}" ${i === 0 ? 'aria-current="step"' : ""}><span>${i + 1}</span>${esc(t(k))}</li>`).join("")}</ol>
            <div class="wizard__bar" aria-hidden="true"><i></i></div>
            <p class="sr-only" aria-live="polite" data-step-live></p>

            <fieldset class="wizard__step" data-step="0">
              <legend class="h3">${esc(t("q.s1.h"))}</legend>
              <div class="seg seg--type"><span class="seg__l">${esc(t("q.typeLabel"))}</span>${["quote", "pilot"].map((k) => `<label><input type="radio" name="kind" value="${k}" ${k === type ? "checked" : ""} /><span>${esc(t(`q.type.${k}`))}</span></label>`).join("")}</div>
              <div class="opt-grid">${S.map((s) => `<label class="opt-card"><input type="checkbox" name="services" value="${s.slug}" ${preS.includes(s.slug) ? "checked" : ""} /><span class="opt-card__ico">${ILLO.icon(s.icon, 22)}</span><span class="opt-card__t">${esc(label(s))}</span></label>`).join("")}</div>
              <span class="err" aria-live="polite" data-err="services"></span>
            </fieldset>

            <fieldset class="wizard__step" data-step="1" hidden>
              <legend class="h3">${esc(t("q.s2.h"))}</legend>
              <div class="ms" data-ms data-pre="${esc(preL.join(","))}">
                <div class="ms__chips" data-ms-chips></div>
                <label class="sr-only" for="ms-input">${esc(t("q.s2.search"))}</label>
                <div class="search search--wide">${GD.ICON.search}<input id="ms-input" type="text" role="combobox" aria-autocomplete="list" aria-expanded="true" aria-controls="ms-list" placeholder="${esc(t("q.s2.search"))}" autocomplete="off" /></div>
                <p class="results" aria-live="polite" data-ms-count></p>
                <ul class="ms__list" id="ms-list" role="listbox" aria-multiselectable="true" aria-label="${esc(t("q.s2.h"))}"></ul>
                <p class="ms__none" data-ms-none hidden></p>
              </div>
              <span class="err" aria-live="polite" data-err="languages"></span>
              <div class="form form--plain" style="margin-block-start:var(--s-6)">
                <div class="field field--full"><label for="q-dialects">${esc(t("q.dialects"))} ${opt()}</label><textarea id="q-dialects" name="language_notes" maxlength="300" placeholder="${esc(t("q.dialects.ph"))}"></textarea>${err}</div>
              </div>
            </fieldset>

            <fieldset class="wizard__step" data-step="2" hidden>
              <legend class="h3">${esc(t("q.s3.h"))}</legend>
              <div class="form form--plain">
                <div class="field field--full"><label for="q-usecase">${esc(t("q.usecase"))}</label><textarea id="q-usecase" name="use_case" required maxlength="1000" placeholder="${esc(t("q.usecase.ph"))}"></textarea>${err}</div>
                <fieldset class="field field--full seg"><legend>${esc(t("q.type"))}</legend>${mods.map((md) => `<label><input type="checkbox" name="data_types" value="${md}" ${preM === md ? "checked" : ""} /><span>${esc(t(`mod.${md}`))}</span></label>`).join("")}</fieldset>
                <div class="field"><label for="q-volume">${esc(t("q.volume"))}</label><input id="q-volume" name="volume" maxlength="120" placeholder="${esc(t("f.volume.ph"))}" />${err}</div>
                <div class="field"><label for="q-timeline">${esc(t("q.timeline"))}</label><select id="q-timeline" name="timeline"><option value="">—</option>${["asap", "1m", "3m", "later"].map((k) => `<option value="${k}">${esc(t(`f.tl.${k}`))}</option>`).join("")}</select>${err}</div>
                <div class="field"><label for="q-deadline">${esc(t("q.deadline"))} ${opt()}</label><input id="q-deadline" name="deadline" type="date" />${err}</div>
                <div class="field field--full"><label for="q-quality">${esc(t("q.quality"))} ${opt()}</label><textarea id="q-quality" name="quality_target" maxlength="500" placeholder="${esc(t("q.quality.ph"))}"></textarea>${err}</div>
                <div class="field field--full"><label for="q-privacy">${esc(t("q.privacy"))} ${opt()}</label><textarea id="q-privacy" name="privacy_constraints" maxlength="1000" placeholder="${esc(t("q.privacy.ph"))}"></textarea>${err}</div>
                <div class="field field--full"><label for="q-tools">${esc(t("q.tools"))} ${opt()}</label><input id="q-tools" name="existing_tools" maxlength="500" placeholder="${esc(t("q.tools.ph"))}" />${err}</div>
                <label class="check field--full"><input type="checkbox" name="nda" value="yes" /><span>${esc(t("q.nda"))}</span></label>
                <div class="field field--full"><label for="q-notes">${esc(t("q.notes"))} ${opt()}</label><textarea id="q-notes" name="notes" maxlength="4000"></textarea>${err}</div>
              </div>
            </fieldset>

            <fieldset class="wizard__step" data-step="3" hidden>
              <legend class="h3">${esc(t("q.s4.h"))}</legend>
              <div class="form form--plain">
                <div class="field"><label for="q-name">${esc(t("q.name"))}</label><input id="q-name" name="name" autocomplete="name" required maxlength="160" />${err}</div>
                <div class="field"><label for="q-email">${esc(t("f.email"))}</label><input id="q-email" name="email" type="email" autocomplete="email" required maxlength="160" />${err}</div>
                <div class="field"><label for="q-company">${esc(t("f.company"))} ${opt()}</label><input id="q-company" name="company" autocomplete="organization" maxlength="120" />${err}</div>
                <div class="field"><label for="q-phone">${esc(t("f.mobile"))} ${opt()}</label><input id="q-phone" name="phone" type="tel" autocomplete="tel" maxlength="40" dir="ltr" />${err}</div>
                <label class="check field--full"><input type="checkbox" name="consent" value="yes" required /><span>${esc(t("q.consent"))} <a href="#/privacy">${esc(t("lg.privacy"))}</a></span></label>
                <span class="err field--full" aria-live="polite" data-err="consent"></span>
                <div class="hp" aria-hidden="true"><label for="q-web">${esc(t("f.website"))}</label><input id="q-web" name="website" tabindex="-1" autocomplete="off" /></div>
              </div>
            </fieldset>

            <fieldset class="wizard__step" data-step="4" hidden>
              <legend class="h3">${esc(t("q.s5.h"))}</legend>
              <dl class="review" data-review></dl>
              <div class="form__status" role="status" aria-live="polite"></div>
            </fieldset>

            <div class="wizard__nav">
              <button type="button" class="btn btn--ghost" data-prev hidden><span class="btn__label">${esc(t("cta.prev"))}</span></button>
              <span class="wizard__count" data-count></span>
              <button type="button" class="btn btn--primary magnetic" data-next><span class="btn__label">${esc(t("cta.next"))}</span><span class="btn__icon" aria-hidden="true">${GD.ICON.arrow}</span></button>
              <button type="submit" class="btn btn--primary magnetic" data-submit hidden><span class="btn__label">${esc(t("q.send"))}</span><span class="btn__icon" aria-hidden="true">${GD.ICON.arrow}</span></button>
            </div>
          </form>
          <div class="wizard__done" data-done hidden tabindex="-1">
            ${ILLO.spot("shield")}
            <h2 class="display-3">${esc(t("q.okT"))}</h2>
            <p class="lead" data-done-msg></p>
            <p class="ref"><small>${esc(t("q.okRef"))}</small><b data-ref></b></p>
            <div class="cta-row"><a class="btn btn--ghost" href="#/quote" data-again><span class="btn__label">${esc(t("q.another"))}</span></a>${B(t("cta.back"), "#/home")}</div>
          </div>
        </div>
      </section>`,
    };
  }

  /* ---------------- Language Explorer ---------------- */
  function languages() {
    const L = Array.isArray(CFG.languages) ? CFG.languages : [];
    const regions = Array.from(new Set(L.map((l) => l.region).filter(Boolean)));
    return {
      title: `${t("lx.eyebrow")} — ${CFG.brand}`, desc: t("lx.lead"), sticky: { label: t("cta.quote"), href: "#/quote" },
      html: `
      ${hero("loc", t("lx.eyebrow"), [t("lx.t1"), t("lx.t2")], t("lx.lead"))}
      <section class="section section--tight" ${world("ambient", "ink", "0,0,9")}>
        <div class="container" data-lx>
          <div class="lx__banner" data-clip>${slot("languages", "slot--frame")}</div>
          <div class="toolbar">
            <label class="search search--wide"><span class="sr-only">${esc(t("lx.search"))}</span>${GD.ICON.search}<input type="search" data-lx-search placeholder="${esc(t("lx.search"))}" autocomplete="off" /></label>
          </div>
          <div class="toolbar">
            <div class="filters" role="group" aria-label="${esc(t("lx.region"))}"><button data-region="all" aria-pressed="true">${esc(t("lx.all"))}</button>${regions.map((r) => `<button data-region="${esc(r)}" aria-pressed="false">${esc(GD.hasT(`region.${r}`) ? t(`region.${r}`) : r)}</button>`).join("")}</div>
            <div class="filters filters--mods" role="group" aria-label="${esc(t("lx.need"))}"><span class="filters__l">${esc(t("lx.need"))}</span>${["text", "speech", "image", "video"].map((md) => `<button data-need="${md}" aria-pressed="false">${esc(t(`mod.${md}`))}</button>`).join("")}</div>
          </div>
          <p class="results" aria-live="polite" data-lx-count></p>
          <ul class="lx-grid">${L.map((l) => {
            const dm = /\(([^)]+)\)/.exec(l.name), dialect = dm ? dm[1] : "";
            const conf = Array.isArray(l.modalities) && l.modalities.length;
            return `<li class="lx-item"><a class="lx" href="#/quote?lang=${encodeURIComponent(l.code)}" data-code="${esc(l.code)}" data-region="${esc(l.region || "")}" data-text="${esc(`${l.name} ${l.native} ${l.script} ${l.code}`.toLowerCase())}" aria-label="${esc(t("lx.request", { x: l.name }))}">
            <span class="lx__native" lang="${esc(l.code)}">${esc(l.native)}</span><span class="lx__name">${esc(l.name)}</span>
            <span class="lx__meta"><span>${esc(t("lx.locale"))}: <code>${esc(l.code)}</code></span><span>${esc(t("lx.dialect"))}: ${esc(dialect || t("lx.dialect.std"))}</span><span>${esc(l.script)}</span></span>
            <span class="lx__status ${conf ? "is-ok" : ""}"><b>${esc(t("lx.status"))}:</b> ${conf ? `${esc(t("lx.confirmed"))}: ${l.modalities.map((md) => esc(t(`mod.${md}`))).join(" · ")}` : esc(t("lx.requestable"))}</span>
          </a><a class="lx__pilot link-arrow" href="#/quote?type=pilot&lang=${encodeURIComponent(l.code)}" aria-label="${esc(t("lx.pilotFor", { x: l.name }))}">${esc(t("lx.pilot"))} ${GD.ICON.arrow}</a></li>`;
          }).join("")}</ul>
          <div class="empty" data-lx-empty hidden>${ILLO.spot("orbit")}<p>${esc(t("lx.empty"))}</p>${B(t("cta.quote"), "#/quote", "ghost")}</div>
          <p class="notice" data-reveal>${esc(t("lx.note"))}</p>
        </div>
      </section>
      ${GD.finalCta()}`,
    };
  }

  /* ---------------- Join as a Contributor ---------------- */
  function join(m, q) {
    const roles = GD.T2("role", K.ROLES);
    return {
      title: `${t("j.eyebrow")} — ${CFG.brand}`, desc: t("j.lead"), sticky: null,
      html: `
      ${hero("network", t("j.eyebrow"), [t("j.t1"), t("j.t2")], t("j.lead"), `<p class="badge-line" data-reveal>${esc(t("j.note"))}</p>`, slot("join", "slot--frame"))}
      <section class="section section--tight" ${world("ambient", "ink", "0,0,9")}>
        <div class="container">
          <div class="section-head"><p class="eyebrow" data-reveal>${esc(t("j.roles"))}</p></div>
          <div class="roles">${roles.map(([ti, d, ic], i) => `<button type="button" class="role" data-role="${esc(K.ROLES[i][0])}" data-reveal><span class="card__icon">${ILLO.icon(ic, 24)}</span><span class="h3">${esc(ti)}</span><span>${esc(d)}</span></button>`).join("")}</div>
        </div>
      </section>
      <section class="section section--tight">
        <div class="container grid split">
          <div><p class="eyebrow" data-reveal>${esc(t("j.form"))}</p><div class="spot-wrap" data-reveal>${ILLO.spot("workflow")}</div></div>
          <form class="form" data-join novalidate>
            <div class="field"><label for="j-first">${esc(t("f.first"))}</label><input id="j-first" name="first_name" autocomplete="given-name" required maxlength="80" />${err}</div>
            <div class="field"><label for="j-last">${esc(t("f.last"))}</label><input id="j-last" name="last_name" autocomplete="family-name" required maxlength="80" />${err}</div>
            <div class="field"><label for="j-email">${esc(t("f.emailPlain"))}</label><input id="j-email" name="email" type="email" autocomplete="email" required maxlength="160" />${err}</div>
            <div class="field"><label for="j-phone">${esc(t("f.mobile"))} ${opt()}</label><input id="j-phone" name="phone" type="tel" autocomplete="tel" maxlength="40" dir="ltr" />${err}</div>
            <div class="field"><label for="j-role">${esc(t("j.role"))}</label><select id="j-role" name="role" required>${K.ROLES.map(([r], i) => `<option value="${esc(r)}">${esc(roles[i][0])}</option>`).join("")}</select>${err}</div>
            <div class="field"><label for="j-country">${esc(t("j.country"))}</label><input id="j-country" name="country" autocomplete="country-name" required maxlength="80" />${err}</div>
            <div class="field"><label for="j-native">${esc(t("j.langs"))}</label><input id="j-native" name="native_languages" required maxlength="200" />${err}</div>
            <div class="field"><label for="j-other">${esc(t("j.other"))} ${opt()}</label><input id="j-other" name="other_languages" maxlength="200" />${err}</div>
            <div class="field field--full"><label for="j-exp">${esc(t("j.exp"))} ${opt()}</label><textarea id="j-exp" name="experience" maxlength="2000"></textarea>${err}</div>
            <div class="field"><label for="j-hours">${esc(t("j.avail"))}</label><select id="j-hours" name="hours_per_week"><option value="lt10">&lt; 10</option><option value="10-20">10–20</option><option value="20-30">20–30</option><option value="30plus">30+</option></select>${err}</div>
            <label class="check field--full"><input type="checkbox" name="consent" value="yes" required /><span>${esc(t("j.consent"))} <a href="#/privacy">${esc(t("lg.privacy"))}</a></span></label><span class="err field--full" aria-live="polite" data-err="consent"></span>
            <div class="hp" aria-hidden="true"><label for="j-web">${esc(t("f.website"))}</label><input id="j-web" name="website" tabindex="-1" autocomplete="off" /></div>
            <div class="form__status" role="status" aria-live="polite"></div>
            <div class="form__foot"><p class="form__note">${esc(GD.apiUrl("contributor") ? t("f.note.api") : t("f.note.mail"))}</p><button class="btn btn--primary magnetic" type="submit"><span class="btn__label">${esc(t("j.send"))}</span><span class="btn__icon" aria-hidden="true">${GD.ICON.arrow}</span></button></div>
          </form>
        </div>
      </section>`,
    };
  }

  /* ---------------- Trust Center ---------------- */
  function trust() {
    const certs = Array.isArray(CFG.certs) && CFG.certs.length ? CFG.certs : null;
    const subs = Array.isArray(CFG.subprocessors) ? CFG.subprocessors : [];
    const incident = live(CFG.incidentEmail) ? CFG.incidentEmail : CFG.email;
    return {
      title: `${t("tr.eyebrow")} — ${CFG.brand}`, desc: t("tr.lead"), sticky: { label: t("tr.q"), href: "#/contact?topic=security" }, print: true,
      html: `
      ${hero("qa", t("tr.eyebrow"), [t("tr.t1"), t("tr.t2")], t("tr.lead"), `<div class="cta-row" data-reveal style="margin-block-start:2rem"><button class="btn btn--primary magnetic" data-pdf="security"><span class="btn__label">${esc(t("tr.pdf"))}</span></button>${B(t("tr.q"), "#/contact?topic=security", "ghost")}</div>`, slot("trust", "slot--frame"))}
      <section class="section" ${world("ambient", "ink", "0,0,9")}>
        <div class="container">
          ${GD.enNotice()}
          <div class="trust-grid"${GD.enAttr()}>${K.TRUST.map(([ti, d, ic]) => `<article class="card" data-reveal><span class="card__icon">${ILLO.icon(ic, 24)}</span><h2 class="h3">${esc(ti)}</h2><p>${esc(d)}</p></article>`).join("")}</div>
        </div>
      </section>
      <section class="section section--tight">
        <div class="container grid split">
          <div><p class="eyebrow" data-reveal>${esc(t("tr.certs"))}</p></div>
          <div data-reveal>${certs ? `<div class="certs certs--list">${certs.map((c) => `<div class="cert"><b>${esc(c.name)}</b><span>${esc(c.note || "")}</span>${live(c.url) ? `<a class="link-arrow" href="${esc(c.url)}" target="_blank" rel="noopener">${esc(t("cta.learn"))}</a>` : ""}</div>`).join("")}</div>` : `<p class="statement statement--sm">${esc(t("tr.certsNone"))}</p>`}</div>
        </div>
      </section>
      <section class="section section--tight">
        <div class="container grid split">
          <div><p class="eyebrow" data-reveal>${esc(t("tr.sub"))}</p></div>
          <div data-reveal>${subs.length ? `<div class="table-wrap"><table class="table"><thead><tr><th scope="col">${esc(t("tr.sub.name"))}</th><th scope="col">${esc(t("tr.sub.purpose"))}</th><th scope="col">${esc(t("tr.sub.loc"))}</th></tr></thead><tbody>${subs.map((x) => `<tr><td>${esc(x.name)}</td><td>${esc(x.purpose)}</td><td>${esc(x.location)}</td></tr>`).join("")}</tbody></table></div>` : `<div class="empty empty--inline">${ILLO.icon("document", 28)}<p>${esc(t("tr.subNone"))}</p></div>`}</div>
        </div>
      </section>
      <section class="section section--tight">
        <div class="container grid split">
          <div><p class="eyebrow" data-reveal>${esc(t("tr.incident"))}</p></div>
          <div data-reveal><p class="lead">${t("tr.incidentBody", { email: `<a class="link-arrow" href="mailto:${esc(incident)}">${esc(incident)}</a>` })}</p></div>
        </div>
      </section>
      ${GD.finalCta()}`,
    };
  }

  /* ---------------- Enterprise / RFP ---------------- */
  function rfp() {
    const C = CFG.contract || {};
    const onb = GD.T2("rfp.onb", K.RFP.onboarding), pil = GD.T2("rfp.pil", K.RFP.pilot);
    return {
      title: `${t("rfp.eyebrow")} — ${CFG.brand}`, desc: t("rfp.lead"), sticky: { label: t("rfp.cap"), href: "#/rfp", pdf: "capability" }, print: true,
      html: `
      ${hero("grid", t("rfp.eyebrow"), [t("rfp.t1"), t("rfp.t2")], t("rfp.lead"), `<div class="cta-row" data-reveal style="margin-block-start:2rem"><button class="btn btn--primary magnetic" data-pdf="capability"><span class="btn__label">${esc(t("rfp.cap"))}</span></button>${B(t("tr.eyebrow"), "#/trust", "ghost")}</div>`, slot("rfp", "slot--frame"))}
      <section class="section" ${world("ambient", "ink", "0,0,9")}>
        <div class="container">
          <div class="section-head"><p class="eyebrow" data-reveal>${esc(t("rfp.onb"))}</p></div>
          <ol class="timeline">${onb.map(([ti, d], i) => `<li data-reveal><span class="timeline__n">0${i + 1}</span><h3 class="h3">${esc(ti)}</h3><p>${esc(d)}</p></li>`).join("")}</ol>
        </div>
      </section>
      <section class="section section--tight">
        <div class="container">
          <div class="section-head"><p class="eyebrow" data-reveal>${esc(t("rfp.pilot"))}</p></div>
          <div class="steps4">${pil.map(([ti, d]) => `<div data-reveal><h3 class="h3">${esc(ti)}</h3><p>${esc(d)}</p></div>`).join("")}</div>
        </div>
      </section>
      <section class="section section--tight">
        <div class="container">
          <div class="section-head"><p class="eyebrow" data-reveal>${esc(t("rfp.sla"))}</p><p class="notice" data-reveal>${esc(t("rfp.slaNote"))}</p></div>
          <div class="table-wrap" data-reveal><table class="table"${GD.enAttr()}><thead><tr><th scope="col">${esc(t("rfp.sla.area"))}</th><th scope="col">${esc(t("rfp.sla.target"))}</th><th scope="col">${esc(t("rfp.sla.note"))}</th></tr></thead><tbody>${(CFG.sla || []).map((r) => `<tr><td>${esc(r.area)}</td><td>${esc(r.target)}</td><td>${esc(r.note)}</td></tr>`).join("")}</tbody></table></div>
        </div>
      </section>
      <section class="section section--tight">
        <div class="container grid split">
          <div><p class="eyebrow" data-reveal>${esc(t("rfp.contract"))}</p></div>
          <dl class="kv" data-reveal>${Object.keys(C).map((k) => `<div><dt>${esc(t(`rfp.c.${k}`))}</dt><dd>${live(C[k]) ? esc(C[k]) : `<span class="muted">${esc(t("rfp.pending"))}</span>`}</dd></div>`).join("")}</dl>
        </div>
      </section>
      ${GD.finalCta()}`,
    };
  }

  /* ---------------- Resources hub ---------------- */
  const caseText = (c) => [c.summary, c.challenge, c.approach.map((a) => a.join(" ")).join(" "), c.outcome, c.takeaways.join(" ")].join(" ");
  const artText = (a) => [a.summary, a.sections.map((s) => s.join(" ")).join(" ")].join(" ");
  function resItems() {
    const cs = GD.cases();
    const arts = K.ARTICLES.map((a) => ({ kind: "article", slug: a.slug, href: `#/resources/${a.slug}`, title: a.title, summary: a.summary, tags: a.tags, slot: a.slot, min: minutes(artText(a)), date: a.date }));
    const cases = cs ? cs.items.map((c) => ({ kind: "case", slug: c.slug, href: `#/case-studies/${c.slug}`, title: c.title, summary: c.summary, tags: c.cats || [c.tag], slot: c.slot, min: minutes(caseText(c)), demo: cs.demo })) : [];
    return arts.concat(cases);
  }
  GD.resItems = resItems;
  const card = (x) => `
    <a class="res" href="${x.href}" data-kind="${x.kind}" data-text="${esc(`${x.title} ${x.summary} ${x.tags.join(" ")}`.toLowerCase())}" data-reveal data-cursor="read"${GD.enAttr()}>
      ${slot(x.slot, "slot--frame")}
      <div class="res__meta"><span class="pill">${esc(t(`res.type.${x.kind}`))}</span>${x.demo ? `<span class="pill">${esc(t("cs.illustrative"))}</span>` : ""}<span>${esc(t("res.min", { n: x.min }))}</span></div>
      <h3 class="h3">${esc(x.title)}</h3><p>${esc(x.summary)}</p>
      <div class="tags">${x.tags.map((tg) => `<span>${esc(GD.catName(tg))}</span>`).join("")}</div>
    </a>`;
  function resources(m, q) {
    const items = resItems();
    const G = K.GLOSSARY.slice().sort((a, b) => a[0].localeCompare(b[0]));
    return {
      title: `${t("res.eyebrow")} — ${CFG.brand}`, desc: t("res.lead"), sticky: { label: t("cta.quote"), href: "#/quote" },
      html: `
      ${hero("loc", t("res.eyebrow"), [t("res.t1"), t("res.t2")], t("res.lead"), "", slot("resources", "slot--frame"))}
      <section class="section section--tight" ${world("ambient", "ink", "0,0,9")} data-res>
        <div class="container">
          <div class="toolbar">
            <div class="filters" role="group" aria-label="${esc(t("res.filter"))}"><button data-kind="all" aria-pressed="true">${esc(t("res.all"))}</button><button data-kind="article" aria-pressed="false">${esc(t("res.articles"))}</button><button data-kind="case" aria-pressed="false">${esc(t("res.cases"))}</button></div>
            <label class="search"><span class="sr-only">${esc(t("res.search"))}</span>${GD.ICON.search}<input type="search" data-res-search placeholder="${esc(t("res.search"))}" value="${esc(q.get("q") || "")}" autocomplete="off" /></label>
          </div>
          <p class="results" aria-live="polite" data-res-count></p>
          <div class="res-grid">${items.map(card).join("")}</div>
          <div class="empty" data-res-empty hidden>${ILLO.spot("orbit")}<p>${esc(t("res.empty"))}</p></div>
        </div>
      </section>
      <section class="section section--tight" aria-labelledby="gl-title" data-gloss>
        <div class="container grid split">
          <div class="gloss__head"><p class="eyebrow" data-reveal>${esc(t("res.glossary"))}</p><h2 id="gl-title" class="display-3" data-split style="margin-block:1.25rem">${lines([t("res.terms", { n: G.length })])}</h2>
            <label class="search search--wide" data-reveal><span class="sr-only">${esc(t("res.glossSearch"))}</span>${GD.ICON.search}<input type="search" data-gloss-search placeholder="${esc(t("res.glossSearch"))}" autocomplete="off" /></label>
            <p class="results" aria-live="polite" data-gloss-count></p>
          </div>
          <dl class="gloss"${GD.enAttr()}>${G.map(([term, d]) => `<div data-text="${esc(`${term} ${d}`.toLowerCase())}"><dt>${esc(term)}</dt><dd>${esc(d)}</dd></div>`).join("")}</dl>
        </div>
      </section>
      <section class="section section--tight" aria-labelledby="ck-title">
        <div class="container">
          <div class="section-head"><p class="eyebrow" data-reveal>${esc(t("res.checklists"))}</p></div>
          <div class="cards cards--3">${K.CHECKLISTS.map((c) => `<article class="card" data-reveal${GD.enAttr()}><span class="card__icon">${ILLO.icon("dataeval", 22)}</span><h3 class="h3">${esc(c.title)}</h3><ul class="ticks">${c.items.slice(0, 4).map((i) => `<li>${esc(i)}</li>`).join("")}</ul><button class="btn btn--ghost btn--sm" data-pdf="checklist" data-slug="${c.slug}"><span class="btn__label">${esc(t("res.dl"))}</span></button></article>`).join("")}</div>
        </div>
      </section>
      ${GD.finalCta()}`,
    };
  }

  function article(m) {
    const a = K.ARTICLES.find((x) => x.slug === m[1]); if (!a) return null;
    const all = resItems().filter((x) => x.slug !== a.slug);
    const related = all.map((x) => ({ x, s: x.tags.filter((tg) => a.tags.includes(tg)).length })).sort((p, q2) => q2.s - p.s).slice(0, 3).map((r) => r.x);
    const url = `${GD.siteUrl()}#/resources/${a.slug}`;
    const enc = encodeURIComponent;
    return {
      title: `${a.title} — ${CFG.brand}`, desc: a.summary, print: true, sticky: { label: t("cta.talk"), href: "#/contact" },
      jsonld: { "@context": "https://schema.org", "@type": "Article", headline: a.title, description: a.summary, datePublished: a.date, author: { "@type": "Organization", name: CFG.brand }, publisher: { "@type": "Organization", name: CFG.brand }, keywords: a.tags.join(", "), mainEntityOfPage: url },
      html: `
      <section class="page-hero page-hero--article" ${world("ambient", "deep", "0,0,10")}>
        <div class="container"${GD.enAttr()}>
          <nav class="crumbs" aria-label="Breadcrumb" data-reveal><a href="#/resources">${esc(t("res.eyebrow"))}</a><span aria-hidden="true">/</span><span aria-current="page">${esc(t("res.type.article"))}</span></nav>
          <div class="res__meta" data-reveal><span>${esc(t("res.published", { date: GD.fmtDate(a.date) }))}</span><span>${esc(t("res.min", { n: minutes(artText(a)) }))}</span></div>
          <h1 class="display-2" data-split style="margin-block:1.5rem;max-inline-size:20ch">${lines([a.title])}</h1>
          <p class="lead" data-reveal>${esc(a.summary)}</p>
          <div class="tags" data-reveal>${a.tags.map((tg) => `<span>${esc(GD.catName(tg))}</span>`).join("")}</div>
        </div>
      </section>
      <div class="container"><div class="media-wide" data-clip>${slot(a.slot, "slot--frame")}</div></div>
      <section class="section">
        <article class="container article article--long"${GD.enAttr()}>
          ${a.sections.map(([h, p]) => `<div data-reveal><h2>${esc(h)}</h2><p class="prose">${esc(p)}</p></div>`).join("")}
          <div class="share no-print" data-reveal><span class="eyebrow">${esc(t("res.share"))}</span>
            <a href="https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}" target="_blank" rel="noopener">LinkedIn</a>
            <a href="https://x.com/intent/post?url=${enc(url)}&text=${enc(a.title)}" target="_blank" rel="noopener">X</a>
            <a href="mailto:?subject=${enc(a.title)}&body=${enc(url)}">Email</a>
            <button type="button" data-copy="${esc(url)}">${esc(t("res.copy"))}</button>
          </div>
        </article>
      </section>
      <section class="section section--tight no-print">
        <div class="container"><p class="eyebrow" data-reveal style="margin-block-end:2rem">${esc(t("res.related"))}</p><div class="res-grid">${related.map(card).join("")}</div></div>
      </section>
      ${GD.finalCta()}`,
    };
  }

  /* ---------------- Legal ---------------- */
  const legal = (key, titleKey) => () => ({
    title: `${t(titleKey)} — ${CFG.brand}`, desc: t(titleKey), print: true, sticky: null,
    html: `
      <section class="page-hero page-hero--short" ${world("ambient", "deep", "0,0,10")}>
        <div class="container"><p class="eyebrow" data-reveal>${esc(CFG.brand)}</p><h1 class="display-2" data-split>${lines([t(titleKey)])}</h1>
          <p class="notice" data-reveal style="margin-block-start:2rem">${ribbon(true, t("lg.review"))}</p>
          <p class="body-soft" data-reveal style="margin-block-start:1rem">${esc(t("lg.updated", { date: GD.fmtDate(K.LEGAL.updated || "2026-11-13") }))}</p></div>
      </section>
      <section class="section section--tight"><article class="container article"${GD.enAttr()}>${K.LEGAL[key].map(([h, p]) => `<div data-reveal><h2>${esc(h)}</h2><p class="prose">${esc(p)}</p></div>`).join("")}</article></section>`,
  });

  GD.routes.push(
    [/^\/quote$/, (m, q) => quote(m, q), "quote"],
    [/^\/languages$/, () => languages(), "languages"],
    [/^\/join$/, (m, q) => join(m, q), "join"],
    [/^\/trust$/, () => trust(), "trust"],
    [/^\/rfp$/, () => rfp(), "rfp"],
    [/^\/resources$/, (m, q) => resources(m, q), "resources"],
    [/^\/resources\/([\w-]+)$/, (m) => article(m), "resources"],
    [/^\/privacy$/, legal("privacy", "lg.privacy"), "privacy"],
    [/^\/terms$/, legal("terms", "lg.terms"), "terms"],
  );
})();
