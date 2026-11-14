/* =====================================================================
   GOLDATA — FEATURES (behaviour for pages.js + chrome extras)
   Command palette · consent banner + analytics hook · sticky contextual CTA
   · scroll rail · nav text-scramble · quote wizard · language explorer
   · join / newsletter forms · pilot planner · filters & search · count-up
   · reach-us clock · trio focus · demo tabs · client-side PDFs (jsPDF).
   Every component: keyboard path, focus handling, aria-live for async states.
   ===================================================================== */
(function () {
  "use strict";
  const CFG = window.CFG, K = window.CONTENT, GD = window.GD, World = window.World || {};
  const { $, $$, esc, live, t } = GD;
  const S = K.SERVICES;
  const JSPDF = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
  const norm = (s) => String(s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const press = (bar, b) => $$("button", bar).forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
  const label = (s) => GD.sv(s, "label");

  /* ================= chrome-level ================= */
  /* ---- command palette ---- */
  function buildIndex() {
    const P = [["#/home", t("nav.home")], ["#/services", t("nav.services")], ["#/languages", t("nav.languages")], ["#/case-studies", t("nav.cases")], ["#/resources", t("nav.resources")], ["#/about", t("nav.about")], ["#/trust", t("nav.trust")], ["#/rfp", t("nav.enterprise")], ["#/join", t("nav.join")], ["#/contact", t("nav.contact")], ["#/quote", t("cta.quote")], ["#/quote?type=pilot", t("cta.pilot")], ["#/privacy", t("lg.privacy")], ["#/terms", t("lg.terms")]];
    const idx = P.map(([h, l]) => ({ g: "pages", h, l, s: "" }));
    S.forEach((s) => idx.push({ g: "services", h: `#/services/${s.slug}`, l: label(s), s: GD.sv(s, "headline"), k: `${s.label} ${s.subs.join(" ")}` }));
    const cs = GD.cases(); if (cs) cs.items.forEach((c) => idx.push({ g: "cases", h: `#/case-studies/${c.slug}`, l: c.title, s: c.summary }));
    K.ARTICLES.forEach((a) => idx.push({ g: "resources", h: `#/resources/${a.slug}`, l: a.title, s: a.summary }));
    K.GLOSSARY.forEach(([term, d]) => idx.push({ g: "resources", h: `#/resources?q=${encodeURIComponent(term)}`, l: term, s: d }));
    K.FAQ.forEach(([q, a]) => idx.push({ g: "faq", h: "#/home", l: q, s: a }));
    S.forEach((s) => s.faq.forEach(([q, a]) => idx.push({ g: "faq", h: `#/services/${s.slug}`, l: q, s: a })));
    (CFG.languages || []).forEach((l) => idx.push({ g: "languages", h: `#/quote?lang=${encodeURIComponent(l.code)}`, l: `${l.name} · ${l.native}`, s: l.code }));
    idx.forEach((x) => (x.n = norm(`${x.l} ${x.s} ${x.k || ""}`)));
    return idx;
  }
  let INDEX = null, paletteUntrap = null, paletteOpener = null;
  function palette() {
    const el = $("#palette"), input = $("#cp-input"), list = $("#cp-list"), empty = $("#cp-empty");
    $("#cp-title").textContent = t("cp.title"); input.placeholder = t("cp.ph"); empty.textContent = t("cp.empty"); $("#cp-hint").textContent = t("cp.hint");
    let active = 0, results = [];
    const render = () => {
      const q = norm(input.value).trim(), toks = q.split(/\s+/).filter(Boolean);
      results = (toks.length ? INDEX.filter((x) => toks.every((tk) => x.n.includes(tk))).map((x) => ({ x, sc: norm(x.l).startsWith(toks[0]) ? 0 : norm(x.l).includes(toks[0]) ? 1 : 2 })).sort((a, b) => a.sc - b.sc).map((r) => r.x) : INDEX.filter((x) => x.g === "pages" || x.g === "services")).slice(0, 40);
      active = 0; let lastG = "";
      list.innerHTML = results.map((r, i) => { const head = r.g !== lastG ? `<li class="cp__g" role="presentation">${esc(t(`cp.g.${r.g}`))}</li>` : ""; lastG = r.g; return `${head}<li role="option" id="cp-o${i}" aria-selected="${i === 0}" data-i="${i}"><b>${esc(r.l)}</b>${r.s ? `<small>${esc(r.s.slice(0, 90))}</small>` : ""}</li>`; }).join("");
      empty.hidden = results.length > 0; input.setAttribute("aria-activedescendant", results.length ? "cp-o0" : "");
    };
    const setActive = (i) => { if (!results.length) return; active = (i + results.length) % results.length; $$("[role=option]", list).forEach((o) => o.setAttribute("aria-selected", String(+o.dataset.i === active))); const o = $(`#cp-o${active}`); input.setAttribute("aria-activedescendant", o.id); o.scrollIntoView({ block: "nearest" }); };
    const open = (opener) => {
      INDEX = INDEX || buildIndex(); paletteOpener = opener || document.activeElement;
      el.hidden = false; requestAnimationFrame(() => el.classList.add("is-open")); input.value = ""; render(); input.focus();
      GD.lenis() && GD.lenis().stop(); paletteUntrap = GD.trap(el, close);
    };
    const close = () => { el.classList.remove("is-open"); el.hidden = true; GD.lenis() && GD.lenis().start(); paletteUntrap && paletteUntrap(); paletteOpener && paletteOpener.focus && paletteOpener.focus(); };
    const go = (i) => { const r = results[i]; if (!r) return; close(); if (location.hash === r.h) GD.go(); else location.hash = r.h; };
    input.oninput = render;
    input.onkeydown = (e) => { if (e.key === "ArrowDown") { e.preventDefault(); setActive(active + 1); } else if (e.key === "ArrowUp") { e.preventDefault(); setActive(active - 1); } else if (e.key === "Enter") { e.preventDefault(); go(active); } };
    list.onclick = (e) => { const o = e.target.closest("[role=option]"); if (o) go(+o.dataset.i); };
    el.onclick = (e) => { if (e.target === el) close(); };
    GD.openPalette = open;
  }

  /* ---- consent banner (necessary-only default; analytics hook off unless configured + accepted) ---- */
  function loadAnalytics() {
    const A = CFG.analytics; if (!A || !live(A.src) || document.getElementById("gd-analytics")) return;
    const s = document.createElement("script"); s.id = "gd-analytics"; s.defer = true; s.src = A.src;
    Object.entries(A.attrs || {}).forEach(([k, v]) => s.setAttribute(k, v)); document.head.appendChild(s);
  }
  function consent(force) {
    const el = $("#consent"), choice = GD.store.get("gd-consent"), hasA = !!(CFG.analytics && live(CFG.analytics.src));
    if (choice === "analytics" && hasA) loadAnalytics();
    if (choice && !force) { el.hidden = true; return; }
    el.innerHTML = `<div class="consent__inner"><p class="consent__t">${esc(t("cn.t"))}</p><p>${esc(hasA ? t("cn.body") : t("cn.bodyNoAnalytics"))} <a href="#/privacy" class="link-arrow">${esc(t("cn.more"))}</a></p><div class="cta-row">${hasA ? `<button class="btn btn--sm btn--ghost" data-c="necessary"><span class="btn__label">${esc(t("cn.necessary"))}</span></button><button class="btn btn--sm btn--primary" data-c="analytics"><span class="btn__label">${esc(t("cn.accept"))}</span></button>` : `<button class="btn btn--sm btn--primary" data-c="necessary"><span class="btn__label">${esc(t("cn.ok"))}</span></button>`}</div></div>`;
    el.hidden = false;
    $$("[data-c]", el).forEach((b) => b.addEventListener("click", () => { GD.store.set("gd-consent", b.dataset.c); el.hidden = true; if (b.dataset.c === "analytics") loadAnalytics(); }));
    if (force) $("button", el).focus();
  }

  /* ---- sticky contextual CTA ---- */
  let stickyCfg = null, stickyClosed = false;
  function sticky() {
    const el = $("#sticky"); if (!el) return;
    const show = () => { const on = !!stickyCfg && !stickyClosed && window.scrollY > window.innerHeight * 0.7 && !footerVisible; el.classList.toggle("is-on", on); el.inert = !on; el.setAttribute("aria-hidden", String(!on)); };
    let footerVisible = false;
    if ("IntersectionObserver" in window) new IntersectionObserver((es) => { footerVisible = es[0].isIntersecting; show(); }).observe($("#footer"));
    window.addEventListener("scroll", show, { passive: true });
    GD.on("page", ({ page }) => {
      stickyCfg = page.sticky === undefined ? { label: t("cta.quote"), href: "#/quote" } : page.sticky;
      if (stickyCfg) {
        el.innerHTML = `<span class="sticky__dot" aria-hidden="true"></span>${stickyCfg.pdf ? `<button class="sticky__cta" data-pdf="${stickyCfg.pdf}">${esc(stickyCfg.label)}</button>` : `<a class="sticky__cta" href="${stickyCfg.href}">${esc(stickyCfg.label)}</a>`}<button class="sticky__x" aria-label="${esc(t("sticky.close"))}">${GD.ICON.close}</button>`;
        $(".sticky__x", el).onclick = () => { stickyClosed = true; show(); };
        const pdfB = $("[data-pdf]", el); if (pdfB) pdfB.onclick = () => makePdf(pdfB.dataset.pdf, null, pdfB);
      }
      show();
    });
  }

  /* ---- scroll rail ---- */
  function rail() {
    const fill = $("#rail i"); if (!fill) return; let raf = 0;
    const upd = () => { raf = 0; const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight); fill.style.transform = `scaleY(${Math.min(1, window.scrollY / max)})`; };
    window.addEventListener("scroll", () => { if (!raf) raf = requestAnimationFrame(upd); }, { passive: true }); GD.on("page", () => setTimeout(upd, 50));
  }

  /* ---- subtle text scramble (nav only) ---- */
  function scramble(root) {
    if (GD.reduced || !GD.fine) return;
    const CH = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&";
    $$("[data-scramble]", root).forEach((el) => {
      const host = el.closest("a,button"), orig = el.textContent; if (host && !host.getAttribute("aria-label")) host.setAttribute("aria-label", orig);
      let raf = 0;
      host.addEventListener("pointerenter", () => {
        cancelAnimationFrame(raf); let f = 0; const total = 14;
        const step = () => { f++; el.textContent = Array.from(orig).map((c, i) => (c === " " || i < (f / total) * orig.length ? c : CH[(Math.random() * CH.length) | 0])).join(""); if (f < total) raf = requestAnimationFrame(step); else el.textContent = orig; };
        step();
      });
      host.addEventListener("pointerleave", () => { cancelAnimationFrame(raf); el.textContent = orig; });
    });
  }

  /* ================= page-level ================= */
  /* ---- quote wizard ---- */
  function wizard(root) {
    const f = $("[data-wizard]", root); if (!f) return;
    const stepsEl = $$(".wizard__step", f), dots = $$("[data-step-dot]", f), bar = $(".wizard__bar i", f);
    const prev = $("[data-prev]", f), next = $("[data-next]", f), submit = $("[data-submit]", f), count = $("[data-count]", f), liveEl = $("[data-step-live]", f);
    const status = $(".form__status", f), done = $("[data-done]", root);
    const LANGS = CFG.languages || [], byCode = Object.fromEntries(LANGS.map((l) => [l.code, l]));
    const ms = $("[data-ms]", f), msInput = $("#ms-input", f), msList = $("#ms-list", f), msChips = $("[data-ms-chips]", f), msCount = $("[data-ms-count]", f), msNone = $("[data-ms-none]", f);
    const sel = new Set((ms.dataset.pre || "").split(",").filter((c) => byCode[c]));
    let step = 0, act = -1, shown = [];
    const NAMES = ["q.s1", "q.s2", "q.s3", "q.s4", "q.s5"];

    const renderChips = () => {
      msChips.innerHTML = Array.from(sel).map((c) => `<span class="chip chip--sel"><span lang="${esc(c)}">${esc(byCode[c].name)}</span><button type="button" data-rm="${esc(c)}" aria-label="${esc(t("q.s2.remove", { x: byCode[c].name }))}">${GD.ICON.close}</button></span>`).join("");
      msCount.textContent = t("q.s2.selected", { n: sel.size });
    };
    const renderList = () => {
      const q = norm(msInput.value).trim();
      shown = LANGS.filter((l) => !q || norm(`${l.name} ${l.native} ${l.code} ${l.script}`).includes(q)).slice(0, 80);
      msList.innerHTML = shown.map((l, i) => `<li role="option" id="ms-o${i}" data-code="${esc(l.code)}" aria-selected="${sel.has(l.code)}"><span class="ms__tick" aria-hidden="true"></span><b>${esc(l.name)}</b><span lang="${esc(l.code)}">${esc(l.native)}</span><code>${esc(l.code)}</code></li>`).join("");
      msNone.hidden = shown.length > 0; if (!shown.length) msNone.textContent = t("q.s2.none", { q: msInput.value });
      act = -1; msInput.removeAttribute("aria-activedescendant");
    };
    const toggle = (code) => { sel.has(code) ? sel.delete(code) : sel.add(code); renderChips(); const o = $(`[data-code="${CSS.escape(code)}"]`, msList); if (o) o.setAttribute("aria-selected", String(sel.has(code))); GD.announce(t("q.s2.selected", { n: sel.size })); };
    const setAct = (i) => { if (!shown.length) return; act = (i + shown.length) % shown.length; $$("[role=option]", msList).forEach((o, k) => o.classList.toggle("is-active", k === act)); const o = $(`#ms-o${act}`, msList); msInput.setAttribute("aria-activedescendant", o.id); o.scrollIntoView({ block: "nearest" }); };
    msInput.addEventListener("input", renderList);
    msInput.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") { e.preventDefault(); setAct(act + 1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setAct(act - 1); }
      else if (e.key === "Enter") { e.preventDefault(); if (act >= 0) toggle(shown[act].code); }
      else if (e.key === "Backspace" && !msInput.value && sel.size) { toggle(Array.from(sel).pop()); }
    });
    msList.addEventListener("click", (e) => { const o = e.target.closest("[role=option]"); if (o) toggle(o.dataset.code); });
    msChips.addEventListener("click", (e) => { const b = e.target.closest("[data-rm]"); if (b) { toggle(b.dataset.rm); msInput.focus(); } });
    renderChips(); renderList();

    const val = () => {
      const fd = new FormData(f), get = (k) => String(fd.get(k) || "").trim();
      return { kind: get("kind") || "quote", services: fd.getAll("services"), languages: Array.from(sel), data_types: fd.getAll("data_types"), volume: get("volume"), timeline: get("timeline"), nda: fd.get("nda") === "yes", notes: get("notes"), name: get("name"), email: get("email"), company: get("company"), phone: get("phone"), website: get("website"), planner: JSON.parse(f.dataset.preQ || "{}") };
    };
    const setErr = (name, msg) => { const e2 = $(`[data-err="${name}"]`, f); if (e2) e2.textContent = msg || ""; };
    const fieldErr = (input, msg) => { input.setAttribute("aria-invalid", String(!!msg)); const e2 = input.parentElement.querySelector(".err"); if (e2) e2.textContent = msg || ""; return !msg; };
    const validate = (i) => {
      const v = val();
      if (i === 0) { const ok = v.services.length > 0; setErr("services", ok ? "" : t("err.pick")); if (!ok) $("input[name=services]", f).focus(); return ok; }
      if (i === 1) { const ok = v.languages.length > 0; setErr("languages", ok ? "" : t("err.pick")); if (!ok) msInput.focus(); return ok; }
      if (i === 3) {
        const a = fieldErr(f.elements.name, v.name.length >= 2 ? "" : t("err.name")), b = fieldErr(f.elements.email, GD.RX.email.test(v.email) ? "" : t("err.email")), c = fieldErr(f.elements.phone, !v.phone || GD.RX.phone.test(v.phone) ? "" : t("err.phone"));
        if (!a) f.elements.name.focus(); else if (!b) f.elements.email.focus(); else if (!c) f.elements.phone.focus();
        return a && b && c;
      }
      return true;
    };
    const review = () => {
      const v = val(), none = t("q.none"), tl = v.timeline ? t(`f.tl.${v.timeline}`) : none;
      const rows = [
        [0, t("q.typeLabel"), t(`q.type.${v.kind}`)],
        [0, t("q.services"), GD.fmtList(v.services.map((s) => label(S.find((x) => x.slug === s))))],
        [1, t("q.languages"), GD.fmtList(v.languages.map((c) => byCode[c].name))],
        [2, t("q.type"), v.data_types.length ? GD.fmtList(v.data_types.map((m) => t(`mod.${m}`))) : none],
        [2, t("q.volume"), v.volume || none], [2, t("q.timeline"), tl], [2, t("q.nda"), v.nda ? t("q.yes") : t("q.no")], [2, t("q.notes"), v.notes || none],
        [3, t("q.name"), v.name], [3, t("f.email"), v.email], [3, t("f.company"), v.company || none], [3, t("f.mobile"), v.phone || none],
      ];
      $("[data-review]", f).innerHTML = rows.map(([s, k, x]) => `<div><dt>${esc(k)}</dt><dd>${esc(x)}</dd><button type="button" class="linklike" data-edit="${s}">${esc(t("q.edit"))}<span class="sr-only"> ${esc(k)}</span></button></div>`).join("");
    };
    const show = (i, focus = true) => {
      step = i; stepsEl.forEach((s, k) => (s.hidden = k !== i));
      dots.forEach((d, k) => { d.toggleAttribute("aria-current", k === i); if (k === i) d.setAttribute("aria-current", "step"); d.classList.toggle("is-done", k < i); });
      bar.style.transform = `scaleX(${(i + 1) / 5})`;
      prev.hidden = i === 0; next.hidden = i === 4; submit.hidden = i !== 4;
      count.textContent = t("q.step", { n: GD.fmt(i + 1), total: GD.fmt(5) });
      liveEl.textContent = `${t("q.step", { n: i + 1, total: 5 })}: ${t(NAMES[i])}`;
      if (i === 4) review();
      if (focus) { const lg = $("legend", stepsEl[i]); lg.setAttribute("tabindex", "-1"); lg.focus({ preventScroll: true }); GD.scrollToEl(f); }
      GD.scheduleRebuild();
    };
    next.addEventListener("click", () => { if (validate(step)) show(step + 1); });
    prev.addEventListener("click", () => show(step - 1));
    f.addEventListener("click", (e) => { const b = e.target.closest("[data-edit]"); if (b) show(+b.dataset.edit); });
    f.addEventListener("keydown", (e) => { if (e.key === "Enter" && e.target.tagName === "INPUT" && e.target !== msInput && step < 4) { e.preventDefault(); next.click(); } });
    f.addEventListener("submit", async (e) => {
      e.preventDefault(); if (step !== 4) return;
      const v = val(); status.className = "form__status"; status.textContent = "";
      const finish = (ref, mailed) => { f.hidden = true; done.hidden = false; $("[data-ref]", done).textContent = ref; $("[data-done-msg]", done).textContent = mailed ? t("q.okMail") : t("q.okBody"); done.focus(); GD.announce(`${t("q.okT")} ${ref}`); GD.scheduleRebuild(); };
      if (v.website) return finish(GD.refId("GD"), false);
      if (!GD.apiUrl(v.kind)) {
        const ref = GD.refId(v.kind === "pilot" ? "GD-P" : "GD-Q");
        GD.mailto(`${v.kind === "pilot" ? "Pilot" : "Quote"} request ${ref} — ${v.name}`, [`Reference: ${ref}`, `Type: ${v.kind}`, `Services: ${v.services.join(", ")}`, `Languages: ${v.languages.join(", ")}`, `Data types: ${v.data_types.join(", ") || "-"}`, `Volume: ${v.volume || "-"}`, `Timeline: ${v.timeline || "-"}`, `NDA first: ${v.nda ? "yes" : "no"}`, `Planner: ${JSON.stringify(v.planner)}`, "", `Name: ${v.name}`, `Email: ${v.email}`, `Company: ${v.company || "-"}`, `Mobile: ${v.phone || "-"}`, "", v.notes]);
        return finish(ref, true);
      }
      submit.setAttribute("aria-busy", "true"); GD.announce(t("st.sending"));
      try { const j = await GD.post(v.kind, v); finish(j.ref || "—", false); }
      catch (er) { status.className = "form__status is-err"; status.innerHTML = t("st.err", { msg: esc(er.message), email: `<a class="link-arrow" href="${GD.mailLink}">${esc(CFG.email)}</a>` }); }
      finally { submit.removeAttribute("aria-busy"); }
    });
    show(0, false);
  }

  /* ---- language explorer ---- */
  function explorer(root) {
    const box = $("[data-lx]", root); if (!box) return;
    const input = $("[data-lx-search]", box), cards = $$(".lx", box), count = $("[data-lx-count]", box), empty = $("[data-lx-empty]", box);
    let region = "all", need = "";
    const apply = () => {
      const q = norm(input.value).trim(); let n = 0;
      cards.forEach((c) => { const ok = (region === "all" || c.dataset.region === region) && (!q || norm(c.dataset.text).includes(q)); c.parentElement.hidden = !ok; if (ok) n++; c.href = `#/quote?lang=${encodeURIComponent(c.dataset.code)}${need ? `&mod=${need === "speech" ? "audio" : need}` : ""}`; });
      count.textContent = t("lx.count", { n }); empty.hidden = n > 0; GD.scheduleRebuild();
    };
    input.addEventListener("input", apply);
    box.addEventListener("click", (e) => {
      const r = e.target.closest("[data-region]"); if (r) { region = r.dataset.region; press(r.parentElement, r); apply(); }
      const nd = e.target.closest("[data-need]"); if (nd) { need = need === nd.dataset.need ? "" : nd.dataset.need; $$("[data-need]", box).forEach((x) => x.setAttribute("aria-pressed", String(x.dataset.need === need))); apply(); }
    });
    apply();
  }

  /* ---- generic list filter (cases, resources, catalog, glossary) ---- */
  function listFilter({ box, items, search, chips, attr, countEl, countKey, empty, match }) {
    let cur = "all";
    const apply = () => {
      const q = search ? norm(search.value).trim() : ""; let n = 0;
      items.forEach((it) => { const ok = (cur === "all" || match(it, cur)) && (!q || norm(it.dataset.text || it.textContent).includes(q)); it.classList.toggle("is-hidden", !ok); it.hidden = !ok; if (ok) n++; });
      if (countEl) countEl.textContent = t(countKey, { n }); if (empty) empty.hidden = n > 0; GD.scheduleRebuild();
    };
    if (search) search.addEventListener("input", apply);
    if (chips) chips.addEventListener("click", (e) => { const b = e.target.closest(`button[${attr}]`); if (!b) return; cur = b.getAttribute(attr); press(chips, b); apply(); });
    apply();
  }
  function filters(root) {
    const cb = $("[data-case-browser]", root);
    if (cb) listFilter({ box: cb, items: $$(".case", cb), search: $("[data-case-search]", cb), chips: $("[data-filters]", cb), attr: "data-f", countEl: $("[data-case-count]", cb), countKey: "cs.results", empty: $("[data-case-empty]", cb), match: (it, c) => it.dataset.tags.split("|").includes(c) });
    const rs = $("[data-res]", root);
    if (rs) listFilter({ box: rs, items: $$(".res", rs), search: $("[data-res-search]", rs), chips: $(".filters", rs), attr: "data-kind", countEl: $("[data-res-count]", rs), countKey: "res.count", empty: $("[data-res-empty]", rs), match: (it, c) => it.dataset.kind === c });
    const gl = $("[data-gloss]", root);
    if (gl) listFilter({ box: gl, items: $$(".gloss > div", gl), search: $("[data-gloss-search]", gl), countEl: $("[data-gloss-count]", gl), countKey: "res.terms", match: () => true });
    const ct = $("[data-catalog]", root);
    if (ct) listFilter({ box: ct, items: $$(".ds", ct), chips: $(".filters", ct), attr: "data-mod", countEl: $("[data-cat-count]", ct), countKey: "cs.results", empty: $("[data-cat-empty]", ct), match: (it, c) => it.dataset.mod === c });
  }

  /* ---- pilot planner (illustrative, never a price) ---- */
  function planner(root) {
    const f = $("[data-planner]", root); if (!f) return;
    const P = CFG.pilot, u = P.units[f.dataset.unit] || P.units.items, band = $("[data-band]", f), barEl = $("[data-band-bar]", f), link = $("[data-pilot-link]", f);
    const calc = () => {
      const vol = +f.elements.volume.value, langs = +f.elements.langs.value, rv = f.elements.review.value, cx = f.elements.cx.value;
      const k = (P.review[rv] || 1) * (P.complexity[cx] || 1), m = 1 + (langs - 1) * P.langFactor;
      const lo = Math.max(1, Math.round((P.setup[0] + vol * u.perUnit[0] * k) * m)), hi = Math.max(lo + 1, Math.round((P.setup[1] + vol * u.perUnit[1] * k) * m));
      $("[data-out=volume]", f).textContent = GD.fmt(vol); $("[data-out=langs]", f).textContent = GD.fmt(langs);
      band.textContent = t("pp.days", { a: GD.fmt(lo), b: GD.fmt(hi) });
      const sc = (x) => Math.min(100, (Math.log10(x + 1) / Math.log10(400)) * 100); barEl.style.insetInlineStart = `${sc(lo)}%`; barEl.style.inlineSize = `${Math.max(2, sc(hi) - sc(lo))}%`;
      link.href = `#/quote?type=pilot&service=${f.dataset.service}&volume=${vol}&langs=${langs}&review=${rv}`;
    };
    f.addEventListener("input", calc); calc();
  }

  /* ---- forms: join + newsletter ---- */
  function joinForm(root) {
    const f = $("form[data-join]", root); if (!f) return;
    const status = $(".form__status", f), submit = $("button[type=submit]", f);
    const R = { first_name: (v) => v.length >= 1 || t("err.first"), last_name: (v) => v.length >= 1 || t("err.last"), email: (v) => GD.RX.email.test(v) || t("err.email"), phone: (v) => !v || GD.RX.phone.test(v) || t("err.phone"), country: (v) => v.length >= 2 || t("err.required"), native_languages: (v) => v.length >= 2 || t("err.required") };
    $$("[data-role]", root).forEach((b) => b.addEventListener("click", () => { f.elements.role.value = b.dataset.role; GD.scrollToEl(f); setTimeout(() => f.elements.role.focus({ preventScroll: true }), 400); }));
    f.addEventListener("submit", async (e) => {
      e.preventDefault(); status.className = "form__status"; status.textContent = "";
      const d = {}; new FormData(f).forEach((v, k) => (d[k] = String(v).trim()));
      let bad = null;
      Object.entries(R).forEach(([k, r]) => { const inp = f.elements[k], res = r(d[k] || ""), er = inp.parentElement.querySelector(".err"); inp.setAttribute("aria-invalid", String(res !== true)); er.textContent = res === true ? "" : res; if (res !== true && !bad) bad = inp; });
      const cOk = d.consent === "yes"; $("[data-err=consent]", f).textContent = cOk ? "" : t("err.consent"); if (!cOk && !bad) bad = f.elements.consent;
      if (bad) { bad.focus(); return; }
      if (d.website) { f.reset(); status.className = "form__status is-ok"; status.textContent = t("j.ok"); return; }
      if (!GD.apiUrl("contributor")) { GD.mailto(`Contributor application — ${d.first_name} ${d.last_name}`, Object.entries(d).filter(([k]) => k !== "website").map(([k, v]) => `${k}: ${v}`)); status.className = "form__status is-ok"; status.innerHTML = t("st.mail", { email: `<a class="link-arrow" href="${GD.mailLink}">${esc(CFG.email)}</a>` }); return; }
      submit.setAttribute("aria-busy", "true"); GD.announce(t("st.sending"));
      try { const j = await GD.post("contributor", { ...d, consent: true }); f.reset(); status.className = "form__status is-ok"; status.innerHTML = `${esc(t("j.ok"))}${j.ref ? ` <b>${esc(t("st.ref", { ref: j.ref }))}</b>` : ""}`; }
      catch (er) { status.className = "form__status is-err"; status.innerHTML = t("st.err", { msg: esc(er.message), email: `<a class="link-arrow" href="${GD.mailLink}">${esc(CFG.email)}</a>` }); }
      finally { submit.removeAttribute("aria-busy"); }
    });
  }
  function newsletter(root) {
    const f = $("form[data-newsletter]", root); if (!f || f._wired) return; f._wired = true;
    const st = $(".nl__status", f), inp = f.elements.email;
    f.addEventListener("submit", async (e) => {
      e.preventDefault(); const email = inp.value.trim();
      if (!GD.RX.email.test(email)) { inp.setAttribute("aria-invalid", "true"); st.textContent = t("err.email"); inp.focus(); return; }
      inp.setAttribute("aria-invalid", "false");
      if (f.elements.website.value) { f.reset(); st.textContent = t("nl.ok"); return; }
      if (!GD.apiUrl("subscriber")) { GD.mailto("Newsletter subscription request", [`Please add ${email} to the GOLDATA newsletter (double opt-in).`]); st.textContent = t("nl.mail"); return; }
      st.textContent = t("st.sending");
      try { await GD.post("subscriber", { email, website: "" }); f.reset(); st.textContent = t("nl.ok"); } catch (er) { st.textContent = t("st.err", { msg: er.message, email: CFG.email }); }
    });
  }

  /* ---- misc page bits ---- */
  function countUp(root) {
    const els = $$("[data-count]", root); if (!els.length) return;
    const run = (el) => {
      const m = String(el.dataset.count).match(/^(\D*)([\d.,]+)(.*)$/); if (!m) return;
      const target = parseFloat(m[2].replace(/,/g, "")), dec = (m[2].split(".")[1] || "").length;
      if (GD.reduced) { el.textContent = `${m[1]}${GD.fmt(target, { minimumFractionDigits: dec, maximumFractionDigits: dec })}${m[3]}`; return; }
      const t0 = performance.now(), dur = 1600;
      const tick = (now) => { const p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 4); el.textContent = `${m[1]}${GD.fmt(target * e, { minimumFractionDigits: dec, maximumFractionDigits: dec })}${m[3]}`; if (p < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } }), { threshold: 0.6 });
    els.forEach((e) => io.observe(e)); return () => io.disconnect();
  }
  function reach(root) {
    const el = $("[data-reach]", root); if (!el) return;
    const h = JSON.parse(el.dataset.reach), st = $("[data-reach-state]", el), tm = $("[data-reach-time]", el);
    const upd = () => {
      try {
        const parts = new Intl.DateTimeFormat("en-US", { timeZone: h.tz, hour: "2-digit", minute: "2-digit", hour12: false, weekday: "short" }).formatToParts(new Date());
        const g = (k) => (parts.find((p) => p.type === k) || {}).value; const wd = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(g("weekday"));
        const mins = (+g("hour") % 24) * 60 + +g("minute"), [oh, om] = h.open.split(":").map(Number), [ch, cm] = h.close.split(":").map(Number);
        const open = h.days.includes(wd) && mins >= oh * 60 + om && mins < ch * 60 + cm;
        el.classList.toggle("is-open", open); st.textContent = t(open ? "reach.open" : "reach.closed");
        tm.textContent = t("reach.local", { time: new Intl.DateTimeFormat(GD.lang(), { timeZone: h.tz, hour: "2-digit", minute: "2-digit", weekday: "long" }).format(new Date()) });
      } catch (e) { st.textContent = ""; }
    };
    upd(); const iv = setInterval(upd, 30000); return () => clearInterval(iv);
  }
  function trioFocus(root) {
    $$("[data-focus]", root).forEach((b) => {
      const i = +b.dataset.focus, on = () => World.W && (World.W.focus = i), off = () => World.W && !b.classList.contains("is-pinned") && (World.W.focus = -1);
      b.addEventListener("pointerenter", on); b.addEventListener("focus", on); b.addEventListener("pointerleave", off); b.addEventListener("blur", off);
      b.addEventListener("click", () => { const p = !b.classList.contains("is-pinned"); $$("[data-focus]", root).forEach((x) => { x.classList.remove("is-pinned"); x.setAttribute("aria-pressed", "false"); }); b.classList.toggle("is-pinned", p); b.setAttribute("aria-pressed", String(p)); if (World.W) World.W.focus = p ? i : -1; });
      b.setAttribute("aria-pressed", "false");
    });
    return () => { if (World.W) World.W.focus = -1; };
  }
  function demoTabs(root) {
    const list = $(".demos__tabs", root); if (!list) return;
    const tabs = $$("[role=tab]", list);
    const sel = (tab, focus) => { tabs.forEach((x) => { const on = x === tab; x.setAttribute("aria-selected", String(on)); x.tabIndex = on ? 0 : -1; document.getElementById(x.getAttribute("aria-controls")).hidden = !on; }); if (focus) tab.focus(); GD.scheduleRebuild(); };
    list.addEventListener("click", (e) => { const tb = e.target.closest("[role=tab]"); if (tb) sel(tb); });
    list.addEventListener("keydown", (e) => { const i = tabs.indexOf(document.activeElement); if (i < 0) return; const rtl = GD.isRTL(); let n = null; if (e.key === (rtl ? "ArrowLeft" : "ArrowRight")) n = i + 1; if (e.key === (rtl ? "ArrowRight" : "ArrowLeft")) n = i - 1; if (e.key === "Home") n = 0; if (e.key === "End") n = tabs.length - 1; if (n != null) { e.preventDefault(); sel(tabs[(n + tabs.length) % tabs.length], true); } });
  }
  function prefill(root, r) {
    const f = $("form[data-contact]", root); if (!f || !r.query) return;
    if (r.query.get("topic") === "security") f.elements.message.value = t("tr.qMsg");
    const sv2 = r.query.get("service"); if (sv2 && S.find((s) => s.slug === sv2)) f.elements.service.value = sv2;
  }
  function copyBtns(root) { $$("[data-copy]", root).forEach((b) => b.addEventListener("click", async () => { try { await navigator.clipboard.writeText(b.dataset.copy); GD.announce(t("res.copied")); b.textContent = t("res.copied"); setTimeout(() => (b.textContent = t("res.copy")), 2000); } catch (e) { window.prompt(t("res.copy"), b.dataset.copy); } })); }

  /* ================= client-side PDFs (jsPDF, pinned, loaded on demand) ================= */
  async function makePdf(kind, slug, btnEl) {
    const lab = btnEl && $(".btn__label", btnEl), orig = lab ? lab.textContent : "";
    if (lab) lab.textContent = t("tr.pdfBusy"); btnEl && btnEl.setAttribute("aria-busy", "true"); GD.announce(t("tr.pdfBusy"));
    try { await GD.loadScript(JSPDF); } catch (e) { if (lab) lab.textContent = orig; btnEl && btnEl.removeAttribute("aria-busy"); GD.announce(t("tr.pdfErr")); alert(t("tr.pdfErr")); return; }
    const doc = new window.jspdf.jsPDF({ unit: "pt", format: "a4" }), W = doc.internal.pageSize.getWidth(), H = doc.internal.pageSize.getHeight(), M = 56;
    let y = 0;
    const head = (title) => {
      doc.setFillColor(7, 11, 24); doc.rect(0, 0, W, 96, "F");
      doc.setDrawColor(234, 240, 255); doc.setLineWidth(3); doc.circle(M + 12, 48, 12, "S"); doc.setFillColor(61, 123, 255); doc.circle(M + 12, 48, 4, "F"); doc.setFillColor(46, 230, 197); doc.circle(M + 22, 40, 3, "F");
      doc.setTextColor(234, 240, 255); doc.setFont("helvetica", "bold"); doc.setFontSize(18); doc.text(CFG.brand, M + 34, 54);
      doc.setFont("helvetica", "normal"); doc.setFontSize(10); doc.text(title, W - M, 54, { align: "right" });
      doc.setTextColor(20, 24, 40); y = 136;
    };
    const ensure = (h) => { if (y + h > H - 64) { foot(); doc.addPage(); head(""); } };
    const foot = () => { doc.setFontSize(8); doc.setTextColor(120, 128, 150); doc.text(`${GD.siteUrl()}  ·  ${CFG.email}  ·  ${new Date().toISOString().slice(0, 10)}`, M, H - 32); doc.setTextColor(20, 24, 40); };
    const h1 = (s) => { ensure(40); doc.setFont("helvetica", "bold"); doc.setFontSize(22); doc.splitTextToSize(s, W - 2 * M).forEach((l) => { doc.text(l, M, y); y += 26; }); y += 6; };
    const h2 = (s) => { ensure(30); doc.setFont("helvetica", "bold"); doc.setFontSize(12.5); doc.setTextColor(42, 95, 224); doc.text(s, M, y); doc.setTextColor(20, 24, 40); y += 18; };
    const p = (s, size = 10.5) => { doc.setFont("helvetica", "normal"); doc.setFontSize(size); doc.splitTextToSize(String(s), W - 2 * M).forEach((l) => { ensure(15); doc.text(l, M, y); y += 15; }); y += 6; };
    const li = (s, box) => { doc.setFont("helvetica", "normal"); doc.setFontSize(10.5); const ls = doc.splitTextToSize(String(s), W - 2 * M - 20); ensure(ls.length * 15 + 4); if (box) doc.rect(M, y - 9, 10, 10, "S"); else doc.circle(M + 4, y - 4, 1.8, "F"); ls.forEach((l) => { doc.text(l, M + 20, y); y += 15; }); y += 3; };
    const certs = Array.isArray(CFG.certs) && CFG.certs.length ? CFG.certs : null, subs = CFG.subprocessors || [];
    let name = "goldata.pdf";
    if (kind === "security") {
      head("Security overview"); name = "goldata-security-overview.pdf";
      h1("Security overview"); p("How GOLDATA protects client data, contributors and models. This overview describes practices; it does not claim certifications unless listed below.");
      K.TRUST.forEach(([ti, d]) => { h2(ti); p(d); });
      h2("Certifications & audits"); certs ? certs.forEach((c) => li(`${c.name}${c.note ? ` — ${c.note}` : ""}`)) : p("Documentation available on request.");
      h2("Subprocessors"); subs.length ? subs.forEach((x) => li(`${x.name} — ${x.purpose} (${x.location})`)) : p("A current list is available on request.");
      h2("Security incident contact"); p(live(CFG.incidentEmail) ? CFG.incidentEmail : CFG.email);
    } else if (kind === "capability") {
      head("Capability statement"); name = "goldata-capability-statement.pdf";
      h1(`${CFG.brand} — Capability statement`); p(CFG.tagline, 12); p(CFG.story);
      h2("Core services"); S.forEach((s) => li(`${s.label}: ${s.line}`));
      h2("How we work"); K.PROCESS.forEach(([ti, d]) => li(`${ti} — ${d}`));
      h2("Quality system"); K.ABOUT.quality.forEach(([ti, d]) => li(`${ti} — ${d}`));
      h2("Languages"); p("Teams are built per project around the target locales, including dialects and lower-resource languages. Contributor availability is confirmed during scoping.");
      if (Array.isArray(CFG.stats) && CFG.stats.length) { h2("Figures"); CFG.stats.forEach((s) => li(`${s.value} ${s.label}`)); }
      h2("Certifications"); certs ? certs.forEach((c) => li(`${c.name}${c.note ? ` — ${c.note}` : ""}`)) : p("Documentation available on request.");
      h2("Company & invoicing"); const C = CFG.contract || {}; Object.keys(C).forEach((k) => li(`${GD.t(`rfp.c.${k}`)}: ${live(C[k]) ? C[k] : "Provided during onboarding"}`));
      h2("Contact"); li(`Email: ${CFG.email}`); li(`Phone: ${CFG.phone}`); if (live(CFG.address)) li(`Address: ${CFG.address}`);
    } else if (kind === "checklist") {
      const c = K.CHECKLISTS.find((x) => x.slug === slug) || K.CHECKLISTS[0]; head("Checklist"); name = `goldata-${c.slug}.pdf`;
      h1(c.title); p("Tick each item before you move on. Original GOLDATA resource — free to use and share."); y += 6; c.items.forEach((i) => li(i, true));
    }
    foot(); doc.save(name);
    if (lab) lab.textContent = orig; btnEl && btnEl.removeAttribute("aria-busy");
  }
  function pdfBtns(root) { $$("[data-pdf]", root).forEach((b) => b.addEventListener("click", (e) => { e.preventDefault(); makePdf(b.dataset.pdf, b.dataset.slug, b); })); }

  /* ================= register ================= */
  GD.mounters.push({
    chrome() {
      palette(); sticky(); rail(); consent(false); scramble($("#nav"));
      document.addEventListener("keydown", (e) => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); $("#palette").hidden ? GD.openPalette() : $("#palette").click(); } });
      document.addEventListener("click", (e) => {
        const o = e.target.closest("[data-open-palette]"); if (o) { e.preventDefault(); GD.closeMenu && GD.closeMenu(); GD.openPalette(o); }
        if (e.target.closest("[data-consent-open]")) consent(true);
      });
    },
    footer(el) { newsletter(el); },
    lang() { INDEX = null; palette(); scramble($("#nav")); if (!$("#consent").hidden) consent(true); },
    page(root, r) {
      const c = [];
      wizard(root); explorer(root); filters(root); planner(root); joinForm(root); demoTabs(root); prefill(root, r); copyBtns(root); pdfBtns(root);
      [countUp(root), reach(root), trioFocus(root)].forEach((x) => typeof x === "function" && c.push(x));
      return () => c.forEach((f) => f());
    },
  });
})();
