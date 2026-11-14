/* =====================================================================
   GOLDATA — APP: hash router, pages, chrome (nav + mega menu, footer),
   motion (GSAP master timeline + ScrollTrigger + Lenis), intro, forms.
   Brand values: js/config.js (CFG). Strings: js/i18n/*.js via GD.t().
   Extra pages: js/pages.js. Interactive features: js/features.js.
   ===================================================================== */
(function () {
  "use strict";
  const CFG = window.CFG, K = window.CONTENT, World = window.World || {}, GD = window.GD, ILLO = window.ILLO;
  const { $, $$, esc, live, t, sv, tx, lines, world, slot, ribbon } = GD;
  const html = document.documentElement, body = document.body;
  const hasGsap = GD.hasGsap, reduced = GD.reduced, fine = GD.fine;
  html.classList.add("js");
  if (reduced) html.classList.add("reduced");
  if (CFG.showSlotLabels) html.classList.add("show-slots");
  if (hasGsap) gsap.registerPlugin(ScrollTrigger);

  /* ---------- icons ---------- */
  const svg = (d, o = {}) => `<svg width="${o.s || 20}" height="${o.s || 20}" viewBox="0 0 24 24" fill="${o.fill ? "currentColor" : "none"}" stroke="${o.fill ? "none" : "currentColor"}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${d}</svg>`;
  const ICON = {
    arrow: svg('<path d="M4 12h15M14 6l6 6-6 6"/>', { s: 16 }),
    back: svg('<path d="M20 12H5M10 6l-6 6 6 6"/>', { s: 18 }),
    next: svg('<path d="M4 12h15M14 6l6 6-6 6"/>', { s: 18 }),
    chevron: svg('<path d="m6 9 6 6 6-6"/>', { s: 14 }),
    search: svg('<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>', { s: 18 }),
    lang: svg('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z"/>', { s: 18 }),
    close: svg('<path d="M6 6l12 12M18 6 6 18"/>', { s: 18 }),
    wa: svg('<path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 2s.8 2.3 1 2.5c.1.2 1.6 2.5 4 3.5 1.5.6 2 .7 2.8.6.4-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.5-.3Z"/>', { fill: true, s: 28 }),
    facebook: svg('<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H8v4h2v8h4v-8h3l1-4h-4V8.5c0-.3.2-.5.5-.5Z"/>', { fill: true, s: 18 }),
    x: svg('<path d="M17.5 3h3.2l-7 8 8.3 10h-6.5l-5-6.2L5 21H1.8l7.5-8.6L1.4 3H8l4.6 5.7L17.5 3Zm-1.1 16h1.8L7.7 4.9H5.8L16.4 19Z"/>', { fill: true, s: 18 }),
    youtube: svg('<path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12a31 31 0 0 0 .4 3.8 3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.3-1.2.4-2.5.4-3.8s-.1-2.6-.4-3.8ZM10 15V9l5.2 3L10 15Z"/>', { fill: true, s: 18 }),
    linkedin: svg('<path d="M4.5 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM3 8.5h3V21H3V8.5Zm5.5 0h2.9v1.7h.1c.4-.8 1.4-1.7 3-1.7 3.1 0 3.7 2 3.7 4.7V21h-3v-6.9c0-1.6 0-3.7-2.3-3.7s-2.6 1.8-2.6 3.6v7H8.5V8.5Z"/>', { fill: true, s: 18 }),
    instagram: svg('<path d="M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4Zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm6-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0ZM12 3.6c2.7 0 3 0 4.1.1 2.7.1 4 1.4 4.1 4.1.1 1.1.1 1.4.1 4.1s0 3-.1 4.1c-.1 2.7-1.4 4-4.1 4.1-1.1.1-1.4.1-4.1.1s-3 0-4.1-.1c-2.7-.1-4-1.4-4.1-4.1C3.7 15 3.6 14.7 3.6 12s0-3 .1-4.1C3.8 5.2 5.1 3.9 7.9 3.8 9 3.7 9.3 3.6 12 3.6Z"/>', { fill: true, s: 18 }),
  };
  const SOCIAL_NAMES = { facebook: "Facebook", x: "X", youtube: "YouTube", linkedin: "LinkedIn", instagram: "Instagram" };
  GD.ICON = ICON;

  /* ---------- markup helpers ---------- */
  const cases = () => GD.proof("cases", K.SAMPLE_CASES);
  const btn = (label, href, v = "primary", extra = "") => `<a class="btn btn--${v} magnetic" href="${href}" ${extra}><span class="btn__label">${esc(label)}</span><span class="btn__icon" aria-hidden="true">${ICON.arrow}</span></a>`;
  const waBtn = (label = t("cta.wa")) => (GD.digits ? `<a class="btn btn--wa magnetic" href="${GD.waLink()}" target="_blank" rel="noopener"><span class="btn__label">${esc(label)}</span><span class="sr-only"> ${esc(t("a11y.newTab"))}</span></a>` : "");
  const faqItems = (list, id) => list.map(([q, a], i) => `
    <div class="faq__item" data-reveal${GD.enAttr()}>
      <h3><button class="faq__q" id="${id}-q${i}" aria-expanded="false" aria-controls="${id}-a${i}">${esc(q)}<i aria-hidden="true"></i></button></h3>
      <div class="faq__a" id="${id}-a${i}" role="region" aria-labelledby="${id}-q${i}" hidden><p>${esc(a)}</p></div>
    </div>`).join("");
  /* Count-up only for real numbers in CFG.stats; sample values ("00+") stay static. */
  const statsBlock = (st) => (st ? `<div class="stats has-demo" data-reveal>${ribbon(st.demo)}${st.items.map((s) => `<div><div class="stat__v" ${!st.demo && /\d/.test(s.value) && !/^0+\D*$/.test(s.value) ? `data-count="${esc(s.value)}"` : ""}>${esc(s.value)}</div><div class="stat__l">${esc(s.label)}</div></div>`).join("")}</div>` : "");
  const finalCta = (title = [t("final.t1"), t("final.t2")]) => `
    <section class="final" ${world("ambient", "navy", "0,0,6", "0,0,-6")}>
      <div class="final__glow" aria-hidden="true"></div>
      <div class="container final__inner">
        <p class="eyebrow" data-reveal>${esc(t("final.eyebrow"))}</p>
        <h2 class="display" data-split>${lines(title)}</h2>
        <p class="lead" data-reveal>${esc(t("final.lead"))}</p>
        <div class="cta-row" data-reveal>${btn(t("cta.quote"), "#/quote")}${btn(t("cta.talk"), "#/contact", "ghost")}${waBtn()}</div>
      </div>
    </section>`;
  const enNotice = () => (GD.lang() === "en" ? "" : `<p class="i18n-note" data-reveal>${esc(t("i18n.enNotice"))}</p>`);
  Object.assign(GD, { btn, waBtn, faqItems, finalCta, statsBlock, cases, enNotice });

  const S = K.SERVICES;
  const svcHref = (s) => `#/services/${s.slug}`;
  const label = (s) => sv(s, "label");
  const T2 = (pfx, arr) => arr.map(([a, b, ...rest], i) => [GD.hasT(`${pfx}.${i}.t`) ? t(`${pfx}.${i}.t`) : a, GD.hasT(`${pfx}.${i}.d`) ? t(`${pfx}.${i}.d`) : b, ...rest]);
  GD.T2 = T2;

  /* ---------- pages ---------- */
  function trioSection(eyebrowKey = "home.trio.eyebrow") {
    const items = T2("trio", K.GLOBAL_TRIO), icons = ["languages", "contributor", "quality"];
    return `
      <section class="section trio" ${world("trio", "navy", "0,0.2,9", "0,0,0")} aria-labelledby="trio-title">
        <div class="container">
          <div class="section-head section-head--split">
            <div><p class="eyebrow" data-reveal>${esc(t(eyebrowKey))}</p><h2 id="trio-title" class="display-2" data-split>${lines([t("home.trio.t1"), t("home.trio.t2")])}</h2></div>
            <div data-reveal>${slot("global-trio", "slot--frame slot--soft")}</div>
          </div>
          <div class="trio__cards">${items.map(([ti, d], i) => `<button type="button" class="trio__card" data-focus="${i}" data-reveal aria-describedby="trio-d${i}"><span class="card__icon">${ILLO.icon(icons[i], 24)}</span><span class="h3">${esc(ti)}</span><span class="trio__d" id="trio-d${i}">${esc(d)}</span></button>`).join("")}</div>
        </div>
      </section>`;
  }

  function demosSection() {
    const ds = ["waveform", "annotate", "typewriter", "funnel", "orbit"];
    return `
      <section class="section demos" ${world("ambient", "ink", "0,0,9")} aria-labelledby="demos-title">
        <div class="container">
          <div class="section-head section-head--split">
            <div><p class="eyebrow" data-reveal>${esc(t("home.demos.eyebrow"))}</p><h2 id="demos-title" class="display-2" data-split>${lines([t("home.demos.t1"), t("home.demos.t2")])}</h2></div>
            <p class="lead" data-reveal>${esc(t("home.demos.lead"))}</p>
          </div>
          <div class="demos__tabs" role="tablist" aria-label="${esc(t("demo.tabs"))}" data-reveal>${ds.map((d, i) => `<button role="tab" id="dt-${d}" aria-controls="dp-${d}" aria-selected="${i === 0}" tabindex="${i ? -1 : 0}">${esc(t(`demo.${d}`))}</button>`).join("")}</div>
          <div class="demos__panels" data-reveal>${ds.map((d, i) => `<div role="tabpanel" id="dp-${d}" aria-labelledby="dt-${d}" ${i ? "hidden" : ""} data-cursor="explore">${ILLO.demo(d)}</div>`).join("")}</div>
        </div>
      </section>`;
  }

  function home() {
    const st = GD.proof("stats", K.SAMPLE.stats), tm = GD.proof("testimonials", K.SAMPLE.testimonials), ce = GD.proof("certs", K.SAMPLE.certs);
    const vals = T2("values", K.VALUES), icons = ["quality", "collection", "security", "localization"];
    return {
      title: t("meta.title"), desc: GD.cfgT("brand.story", CFG.story), sticky: { label: t("cta.quote"), href: "#/quote" },
      jsonld: { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: K.FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
      html: `
      <section class="hero" ${world("portal", "ink", "0,0,10", "0,0,-7")} aria-labelledby="hero-title">
        <div class="hero__fallback" aria-hidden="true">${ILLO.spot("globe", "hero__svg")}${ILLO.spot("orbit", "hero__svg hero__svg--2")}</div>
        <div class="hero__sticky">
          <div class="container hero__inner" data-hero>
            <p class="eyebrow">${esc(GD.cfgT("brand.tagline", CFG.tagline))}</p>
            <h1 id="hero-title" class="display hero__title">${lines([GD.cfgT("hero.l1", CFG.hero.lines[0])])}${lines([GD.cfgT("hero.l2", CFG.hero.lines[1])], "accent")}</h1>
            <div class="hero__meta">
              <div class="hero__inner">
                <p class="lead">${esc(GD.cfgT("brand.story", CFG.story))}</p>
                <div class="cta-row">${btn(t("cta.quote"), "#/quote")}${btn(t("cta.explore"), "#/services", "ghost")}</div>
              </div>
              <span class="hero__scroll"><i></i>${esc(t("hero.scroll"))}</span>
            </div>
          </div>
        </div>
        <div class="world-mark" style="inset-block-start:56%" ${world("portal", "ink", "0,0,-1.4", "0,0,-7")}></div>
      </section>

      <section class="section tone-light" ${world("light", "light", "0,0,11", "0,0,0")}>
        <div class="container grid">
          <div class="intro__head">
            <p class="eyebrow" data-reveal>${esc(t("intro.eyebrow"))}</p>
            <h2 class="display-2" data-split>${lines([t("intro.title")])}</h2>
          </div>
          <div class="intro__body" data-reveal>
            <p class="lead">${esc(t("intro.body"))}</p>
          </div>
          <div class="intro__cap">
            <p class="eyebrow" data-reveal>${esc(t("home.cap.eyebrow"))}</p>
            <h3 class="display-3" data-split>${lines([t("home.cap.t1"), t("home.cap.t2")])}</h3>
            <p class="body-soft" data-reveal>${esc(t("home.cap.lead"))}</p>
            <div data-reveal>${btn(t("cta.explore"), "#/services", "ghost")}</div>
          </div>
          <div class="chips" data-reveal>${S.map((s) => `<a class="chip" href="${svcHref(s)}" data-vt="svc-label"><span class="chip__ico">${ILLO.icon(s.icon, 16)}</span><b>${s.n}</b><span class="chip__l">${esc(label(s))}</span></a>`).join("")}</div>
        </div>
      </section>

      <section class="section tone-light" ${world("light", "light", "0,0.3,5", "0,0,-5")}>
        <div class="container">
          <div class="section-head section-head--split">
            <div><p class="eyebrow" data-reveal>${esc(t("home.diff.eyebrow"))}</p><h2 class="display-2" data-split>${lines([t("home.diff.t1"), t("home.diff.t2")])}</h2></div>
            <p class="lead" data-reveal>${esc(t("home.diff.lead"))}</p>
          </div>
          <div class="cards">${vals.map(([ti, d], i) => `<article class="card" data-reveal><span class="card__icon">${ILLO.icon(icons[i], 22)}</span><span class="card__n">0${i + 1}</span><h3 class="h3">${esc(ti)}</h3><p>${esc(d)}</p></article>`).join("")}</div>
          ${statsBlock(st)}
        </div>
      </section>

      ${trioSection()}

      <section class="flow" ${world("flow", "navy", "0,0.6,13", "0,0,0", 'data-flow="0"')} data-flow-section aria-labelledby="flow-title">
        <div class="flow__sticky">
          <div class="flow__bg">${slot("flow", "slot--fill")}</div>
          <div class="container flow__head">
            <div><p class="eyebrow">${esc(t("home.flow.eyebrow"))}</p><h2 id="flow-title" class="display-2" data-split>${lines([t("home.flow.t1"), t("home.flow.t2")])}</h2></div>
            ${btn(t("cta.talk"), "#/contact", "ghost")}
          </div>
          <div class="container flow__steps">${T2("flow", K.FLOW).map(([ti, d], i) => `<div class="step" data-step="${i}"><span class="step__n">0${i + 1}</span><h3 class="h3">${esc(ti)}</h3><p>${esc(d)}</p></div>`).join("")}</div>
        </div>
        <div class="world-mark" style="inset-block-start:20%" ${world("flow", "navy", "-3.4,0,6.6", "-3.4,0,0", 'data-flow="0"')}></div>
        <div class="world-mark" style="inset-block-start:45%" ${world("flow", "navy", "0,0,6.6", "0,0,0", 'data-flow="1"')}></div>
        <div class="world-mark" style="inset-block-start:70%" ${world("flow", "navy", "3.4,0,6.6", "3.4,0,0", 'data-flow="2"')}></div>
      </section>

      ${demosSection()}

      <section class="chapters-intro">
        <div class="container section-head section-head--split">
          <div><p class="eyebrow" data-reveal>${esc(t("home.svc.eyebrow"))}</p><h2 class="display-2" data-split>${lines([t("home.svc.t1", { n: GD.fmt(S.length) }), t("home.svc.t2")])}</h2></div>
          <p class="lead" data-reveal>${esc(t("home.svc.lead"))}</p>
        </div>
      </section>

      ${S.map((s, i) => {
        const x = i % 2 ? 2.7 : -2.7;
        return `
      <section class="chapter ${i % 2 ? "chapter--flip" : ""}" ${world(s.scene, i % 2 ? "navy" : "ink", `${x},0,9`, `${x},0,0`)} data-chapter="${s.n}" data-label="${esc(label(s))}" aria-labelledby="ch-${s.slug}">
        <div class="container grid chapter__grid">
          <div class="chapter__text">
            <p class="chapter__label" data-reveal><span class="chapter__ico">${ILLO.icon(s.icon, 18)}</span><span>${s.n}</span>${esc(label(s))}</p>
            <h2 id="ch-${s.slug}" class="display-2" data-split>${lines([sv(s, "headline")])}</h2>
            <p data-reveal>${esc(sv(s, "line"))}</p>
            <ul class="bullets" data-reveal${GD.enAttr()}>${s.subs.map((x2) => `<li>${esc(x2)}</li>`).join("")}</ul>
            <div data-reveal>${btn(t("cta.exploreX", { x: label(s) }), svcHref(s), "ghost", 'data-vt="svc-label"')}</div>
          </div>
          <div class="chapter__media" data-parallax-wrap>${slot(s.slot)}</div>
        </div>
      </section>`;
      }).join("")}
      <div class="chapter__count" data-chapter-count aria-hidden="true"></div>

      <section class="section" ${world("network", "ink", "-2.8,0,9.5", "-2.8,0,0")}>
        <div class="container grid why__grid">
          <div class="why__text">
            <p class="eyebrow" data-reveal>${esc(t("home.why.eyebrow", { brand: CFG.brand }))}</p>
            <h2 class="display-2" data-split>${lines([t("home.why.t1"), t("home.why.t2")])}</h2>
            <div class="why__list">${T2("why", K.WHY).map(([ti, d]) => `<div data-reveal><h3>${esc(ti)}</h3><p>${esc(d)}</p></div>`).join("")}</div>
          </div>
        </div>
      </section>

      <section class="network" ${world("network", "deep", "0,0,9.6", "0,0,0")} aria-labelledby="net-title">
        <div class="bigword" aria-hidden="true" data-parallax="-0.12"><span>NATIVE</span></div>
        <div class="container network__caption">
          <div><p class="eyebrow" data-reveal>${esc(t("home.net.eyebrow"))}</p><h2 id="net-title" class="display-2" data-split>${lines([t("home.net.t1"), t("home.net.t2"), t("home.net.t3")])}</h2></div>
          <div data-reveal><p class="body-soft" style="margin-block-end:1.5rem">${esc(t("home.net.body"))}</p><div class="cta-row">${btn(t("cta.languages"), "#/languages")}${btn(t("nav.join"), "#/join", "ghost")}</div></div>
        </div>
      </section>

      ${tm ? `
      <section class="section" ${world("ambient", "ink", "0,0,9")} aria-labelledby="tm-title">
        <div class="container">
          <div class="section-head"><p class="eyebrow" data-reveal>${esc(t("home.tm.eyebrow"))}</p><h2 id="tm-title" class="display-2" data-split>${lines([t("home.tm.t1"), t("home.tm.t2")])}</h2></div>
          <div class="quotes has-demo" data-slider aria-live="polite" data-reveal>${ribbon(tm.demo)}
            ${tm.items.map((q, i) => `<figure class="quote" ${i ? "hidden" : ""} aria-roledescription="slide" aria-label="${esc(t("home.tm.of", { i: i + 1, n: tm.items.length }))}"><blockquote${tm.demo ? GD.enAttr() : ""}>“${esc(q.quote)}”</blockquote><figcaption><b>${esc(q.name)}</b>${esc(q.role)}</figcaption></figure>`).join("")}
          </div>
          <div class="quotes__ctrl">
            <button class="round-btn" data-prev aria-label="${esc(t("home.tm.prev"))}">${ICON.back}</button>
            <button class="round-btn" data-next aria-label="${esc(t("home.tm.next"))}">${ICON.next}</button>
            <div class="dots">${tm.items.map((_, i) => `<button aria-label="${esc(t("home.tm.show", { n: i + 1 }))}" aria-current="${i === 0}"></button>`).join("")}</div>
          </div>
          ${CFG.rating ? `<p class="body-soft" style="margin-block-start:2rem">${esc(t("home.rated", { v: CFG.rating.value, src: "" }))}${live(CFG.rating.url) ? `<a class="link-arrow" href="${esc(CFG.rating.url)}" target="_blank" rel="noopener">${esc(CFG.rating.source)}</a>` : esc(CFG.rating.source)}</p>` : ""}
        </div>
      </section>` : ""}

      ${ce ? `
      <section class="section section--tight" ${world("ambient", "deep", "0,0,8")} aria-labelledby="ce-title">
        <div class="container">
          <div class="section-head"><p class="eyebrow" data-reveal>${esc(t("home.ce.eyebrow"))}</p><h2 id="ce-title" class="h3" data-reveal>${esc(t("home.ce.title"))} ${ribbon(ce.demo, t("demo.placeholders"))}</h2></div>
          <div class="certs" data-reveal>${ce.items.map((c) => `<div class="cert"><b>${esc(c.name)}</b><span>${esc(c.note || "")}</span></div>`).join("")}</div>
        </div>
      </section>` : ""}

      <section class="section" ${world("ambient", "ink", "0,0,9")} aria-labelledby="faq-title">
        <div class="container grid faq__grid">
          <div class="faq__head">
            <p class="eyebrow" data-reveal>${esc(t("home.faq.eyebrow"))}</p>
            <h2 id="faq-title" class="display-2" data-split>${lines([t("home.faq.t1"), t("home.faq.t2")])}</h2>
            <p class="body-soft" data-reveal>${esc(t("home.faq.body"))}</p>
            <div data-reveal>${btn(t("cta.talk"), "#/contact", "ghost")}</div>
          </div>
          <div class="faq__list">${enNotice()}${faqItems(K.FAQ, "home-faq")}</div>
        </div>
      </section>
      ${finalCta()}`,
    };
  }

  function about() {
    const team = GD.proof("team", K.SAMPLE.team), A = K.ABOUT;
    const appr = A.approach, qual = A.quality, vals = A.values;
    return {
      title: `${t("nav.about")} — ${CFG.brand}`, desc: t("about.missionText"), sticky: { label: t("cta.talk"), href: "#/contact" },
      html: `
      <section class="page-hero" ${world("network", "ink", "-2.8,0,9.5", "-2.8,0,0")}>
        <div class="container grid page-hero__grid">
          <div style="grid-column:1 / span 7">
            <p class="eyebrow" data-reveal>${esc(t("about.eyebrow", { brand: CFG.brand }))}</p>
            <h1 class="display" data-split>${lines([t("about.t1"), t("about.t2")])}</h1>
            <p class="lead" data-reveal>${esc(t("about.missionText"))}</p>
          </div>
          <div class="page-hero__media" style="grid-column:9 / span 4">${slot("about-mission", "slot--frame")}</div>
        </div>
      </section>
      <section class="section tone-light" ${world("light", "light", "0,0,11", "0,0,0")}>
        <div class="container grid split">
          <div><p class="eyebrow" data-reveal>${esc(t("intro.eyebrow"))}</p><h2 class="display-2" data-split style="margin-block:1.25rem">${lines([t("intro.title")])}</h2><p class="lead" data-reveal>${esc(t("intro.body"))}</p><p class="statement" data-reveal style="margin-block-start:2.5rem">${esc(GD.cfgT("brand.story", CFG.story))}</p></div>
          <div class="media-4x3" data-clip>${slot("about-team", "slot--frame")}</div>
        </div>
      </section>
      <section class="section tone-light" ${world("light", "light", "0,0.3,5", "0,0,-5")}>
        <div class="container">
          <div class="section-head"><p class="eyebrow" data-reveal>${esc(t("about.approach"))}</p><h2 class="display-2" data-split>${lines([t("about.approach.t1"), t("about.approach.t2")])}</h2></div>
          <div class="cards cards--3"${GD.enAttr()}>${appr.map(([ti, d], i) => `<article class="card" data-reveal><span class="card__n">0${i + 1}</span><h3 class="h3">${esc(ti)}</h3><p>${esc(d)}</p></article>`).join("")}</div>
        </div>
      </section>
      ${trioSection()}
      <section class="section" ${world("qa", "navy", "2.7,0,9", "2.7,0,0")}>
        <div class="container grid">
          <div class="about__quality">
            <p class="eyebrow" data-reveal>${esc(t("about.quality"))}</p>
            <h2 class="display-2" data-split>${lines([t("about.quality.t1"), t("about.quality.t2")])}</h2>
            <div class="steps4 steps4--2"${GD.enAttr()}>${qual.map(([ti, d]) => `<div data-reveal><h3 class="h3">${esc(ti)}</h3><p>${esc(d)}</p></div>`).join("")}</div>
          </div>
        </div>
      </section>
      <section class="network" ${world("network", "deep", "0,0,9.6", "0,0,0")}>
        <div class="bigword" aria-hidden="true" data-parallax="-0.12"><span>HUMAN</span></div>
        <div class="container network__caption">
          <div><p class="eyebrow" data-reveal>${esc(t("about.net.eyebrow"))}</p><h2 class="display-2" data-split>${lines([t("about.net.t1"), t("about.net.t2")])}</h2></div>
          <div data-reveal><p class="body-soft" style="margin-block-end:1.5rem">${esc(t("about.net.body"))}</p>${btn(t("nav.join"), "#/join", "ghost")}</div>
        </div>
      </section>
      <section class="section" ${world("ambient", "ink", "0,0,9")}>
        <div class="container">
          <div class="section-head"><p class="eyebrow" data-reveal>${esc(t("about.values"))}</p><h2 class="display-2" data-split>${lines([t("about.values.t1"), t("about.values.t2")])}</h2></div>
          <div class="rows rows--values"${GD.enAttr()}>${vals.map(([ti, d], i) => `<div class="row" data-reveal><span class="row__n">0${i + 1}</span><span class="row__t">${esc(ti)}</span><span class="row__d">${esc(d)}</span></div>`).join("")}</div>
        </div>
      </section>
      ${team ? `
      <section class="section section--tight" ${world("ambient", "deep", "0,0,8")}>
        <div class="container">
          <div class="section-head"><p class="eyebrow" data-reveal>${esc(t("about.team"))}</p><h2 class="h3" data-reveal>${esc(t("about.team.title"))} ${ribbon(team.demo, t("demo.roles"))}</h2></div>
          <div class="team">${team.items.map((m) => `<article class="card" data-reveal>${m.photo ? `<img src="${esc(/^(https?:)?\/\//.test(m.photo) ? m.photo : GD.base + m.photo)}" alt="${esc(m.name)}" width="56" height="56" class="avatar-img" loading="lazy">` : `<span class="avatar" aria-hidden="true">—</span>`}<h3 class="h3">${esc(m.name)}</h3><p>${esc(m.role)}</p></article>`).join("")}</div>
        </div>
      </section>` : ""}
      ${GD.presenceSection ? GD.presenceSection() : ""}
      ${finalCta([t("about.final1"), t("about.final2")])}`,
    };
  }

  function servicesPage() {
    const hl = T2("hl", K.HIGHLIGHTS), ad = T2("ad", K.APPROACH_DIFF), ind = S.find((s) => s.slug === "industry-solutions");
    return {
      title: `${t("nav.services")} — ${CFG.brand}`, desc: t("svcs.lead"), sticky: { label: t("cta.quote"), href: "#/quote" },
      html: `
      <section class="page-hero" ${world("cubes", "ink", "-2.7,0,9", "-2.7,0,0")}>
        <div class="container grid page-hero__grid">
          <div style="grid-column:1 / span 7">
            <p class="eyebrow" data-reveal>${esc(t("svcs.eyebrow"))}</p>
            <h1 class="display" data-split>${lines([t("svcs.t1"), t("svcs.t2")])}</h1>
            <p class="lead" data-reveal>${esc(t("svcs.lead"))}</p>
            <div class="cta-row" data-reveal style="margin-block-start:2rem">${btn(t("cta.quote"), "#/quote")}${btn(t("cta.talk"), "#/contact", "ghost")}</div>
          </div>
        </div>
      </section>
      <section class="section" ${world("ambient", "ink", "0,0,9")}>
        <div class="container">
          <div class="rows">${S.map((s) => `<a class="row row--svc" href="${svcHref(s)}" data-reveal data-vt="svc-label"><span class="row__n">${s.n}</span><span class="row__t"><span class="row__ico">${ILLO.icon(s.icon, 22)}</span>${esc(label(s))}</span><span class="row__d">${esc(sv(s, "line"))}</span><span class="row__a" aria-hidden="true">${ICON.arrow}</span></a>`).join("")}</div>
        </div>
      </section>
      <section class="section" ${world("ambient", "deep", "0,0,8")} aria-labelledby="hl-title">
        <div class="container">
          <div class="section-head"><p class="eyebrow" data-reveal>${esc(t("svcs.hl.eyebrow"))}</p><h2 id="hl-title" class="display-2" data-split>${lines([t("svcs.hl.t1"), t("svcs.hl.t2")])}</h2></div>
          <div class="hl-grid">${hl.map(([ti, d, sl, ic]) => `<article class="hl" data-reveal><div class="hl__media" data-clip>${slot(sl, "slot--frame")}</div><span class="card__icon">${ILLO.icon(ic, 22)}</span><h3 class="h3">${esc(ti)}</h3><p>${esc(d)}</p></article>`).join("")}</div>
        </div>
      </section>
      <section class="section" ${world("grid", "navy", "2.7,0,9", "2.7,0,0")} aria-labelledby="ad-title">
        <div class="container">
          <div class="section-head"><p class="eyebrow" data-reveal>${esc(t("svcs.ad.eyebrow"))}</p><h2 id="ad-title" class="display-2" data-split>${lines([t("svcs.ad.t1"), t("svcs.ad.t2")])}</h2></div>
          <div class="cards">${ad.map(([ti, d, ic], i) => `<article class="card" data-reveal><span class="card__icon">${ILLO.icon(ic, 22)}</span><span class="card__n">0${i + 1}</span><h3 class="h3">${esc(ti)}</h3><p>${esc(d)}</p></article>`).join("")}</div>
        </div>
      </section>
      <section class="section" ${world("grid", "navy", "2.7,0,9", "2.7,0,0")}>
        <div class="container grid" style="align-items:center">
          <div style="grid-column:1 / span 6" class="media-4x3" data-clip>${slot("industries", "slot--frame")}</div>
          <div style="grid-column:8 / span 5;display:grid;gap:1.5rem">
            <p class="eyebrow" data-reveal>${esc(t("svcs.ind.eyebrow"))}</p>
            <h2 class="display-2" data-split>${lines([t("svcs.ind.t1"), t("svcs.ind.t2")])}</h2>
            <ul class="bullets" data-reveal${GD.enAttr()}>${ind.subs.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
            <div data-reveal>${btn(label(ind), svcHref(ind), "ghost")}</div>
          </div>
        </div>
      </section>
      <section class="section" ${world("ambient", "deep", "0,0,8")}>
        <div class="container">
          <div class="section-head"><p class="eyebrow" data-reveal>${esc(t("svcs.proc.eyebrow"))}</p><h2 class="display-2" data-split>${lines([t("svcs.proc.t1"), t("svcs.proc.t2")])}</h2></div>
          <div class="steps4">${T2("process", K.PROCESS).map(([ti, d]) => `<div data-reveal><h3 class="h3">${esc(ti)}</h3><p>${esc(d)}</p></div>`).join("")}</div>
        </div>
      </section>
      ${finalCta()}`,
    };
  }

  function serviceDetail(slug) {
    const i = S.findIndex((s) => s.slug === slug); if (i < 0) return null;
    const s = S[i], nx = S[(i + 1) % S.length];
    const locales = Array.isArray(CFG.stats) ? CFG.stats.find((x) => x.key === "locales") : null;
    return {
      title: `${label(s)} — ${CFG.brand}`, desc: sv(s, "line"), print: true,
      sticky: { label: t("cta.pilot"), href: `#/quote?type=pilot&service=${s.slug}` },
      jsonld: { "@context": "https://schema.org", "@type": "Service", name: s.label, description: s.line, serviceType: s.label, provider: { "@type": "Organization", name: CFG.brand }, areaServed: "Worldwide" },
      html: `
      <section class="page-hero" ${world(s.scene, "ink", "-2.7,0,9", "-2.7,0,0")}>
        <div class="container grid page-hero__grid">
          <div style="grid-column:1 / span 6">
            <nav class="crumbs" aria-label="Breadcrumb" data-reveal><a href="#/services">${esc(t("nav.services"))}</a><span aria-hidden="true">/</span><span aria-current="page">${esc(label(s))}</span></nav>
            <p class="chapter__label" data-reveal style="view-transition-name:svc-label"><span class="chapter__ico">${ILLO.icon(s.icon, 18)}</span><span>${s.n}</span>${esc(label(s))}</p>
            <h1 class="display-2" data-split style="margin-block-start:1.25rem">${lines([sv(s, "headline")])}</h1>
            <p class="lead" data-reveal>${esc(sv(s, "line"))}</p>
            ${locales ? `<p class="badge-line" data-reveal>${esc(t("sd.locales", { v: locales.value }))}</p>` : ""}
            <div class="cta-row" data-reveal style="margin-block-start:2rem">${btn(t("cta.quote"), `#/quote?service=${s.slug}`)}${btn(t("cta.pilot"), `#/quote?type=pilot&service=${s.slug}`, "ghost")}${waBtn()}</div>
          </div>
          <div class="page-hero__media" style="grid-column:7 / span 6">${slot(s.slot)}</div>
        </div>
      </section>
      <section class="section" ${world("ambient", "ink", "0,0,9")}>
        <div class="container grid split">
          <div><p class="eyebrow" data-reveal>${esc(t("sd.what"))}</p><h2 class="display-2" data-split style="margin-block:1.25rem">${lines([t("sd.what.t1"), t("sd.what.t2")])}</h2><div class="spot-wrap" data-reveal>${ILLO.spot(s.illo)}</div></div>
          <div class="prose" data-reveal${GD.enAttr()}><p>${esc(s.what)}</p><ul class="ticks">${s.subs.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
        </div>
      </section>
      ${s.demo ? `
      <section class="section section--tight">
        <div class="container grid split">
          <div><p class="eyebrow" data-reveal>${esc(t("demo.illustration"))}</p><h2 class="display-3" data-split style="margin-block-start:1.25rem">${lines([t("sd.demo.t")])}</h2></div>
          <div data-reveal data-cursor="explore">${ILLO.demo(s.demo)}</div>
        </div>
      </section>` : ""}
      <section class="section section--tight">
        <div class="container">
          <div class="section-head"><p class="eyebrow" data-reveal>${esc(t("sd.subs"))}</p><h2 class="display-2" data-split>${lines([t("sd.subs.t")])}</h2></div>
          <div class="detail-grid"${GD.enAttr()}>${s.details.map(([ti, d], k) => `<article class="card" data-reveal><span class="card__n">${s.n}.${k + 1}</span><h3 class="h3">${esc(ti)}</h3><p>${esc(d)}</p></article>`).join("")}</div>
        </div>
      </section>
      ${s.catalog && GD.catalogSection ? GD.catalogSection(s) : ""}
      ${GD.plannerSection ? GD.plannerSection(s) : ""}
      <section class="section" ${world("ambient", "deep", "0,0,8")}>
        <div class="container">
          <div class="section-head"><p class="eyebrow" data-reveal>${esc(t("svcs.proc.eyebrow"))}</p><h2 class="display-2" data-split>${lines([t("sd.proc.t1"), t("sd.proc.t2")])}</h2></div>
          <div class="steps4">${T2("process", K.PROCESS).map(([ti, d]) => `<div data-reveal><h3 class="h3">${esc(ti)}</h3><p>${esc(d)}</p></div>`).join("")}</div>
        </div>
      </section>
      <section class="section section--tight">
        <div class="container grid split">
          <div><p class="eyebrow" data-reveal>${esc(t("sd.deliv"))}</p><h2 class="display-2" data-split style="margin-block-start:1.25rem">${lines([t("sd.deliv.t1"), t("sd.deliv.t2")])}</h2></div>
          <ul class="ticks prose" data-reveal${GD.enAttr()}>${s.deliverables.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
        </div>
      </section>
      <section class="section" ${world("ambient", "ink", "0,0,9")}>
        <div class="container grid faq__grid">
          <div class="faq__head"><p class="eyebrow" data-reveal>${esc(t("home.faq.eyebrow"))}</p><h2 class="display-2" data-split>${lines([`${label(s)},`, t("sd.faq.t2")])}</h2></div>
          <div class="faq__list">${faqItems(s.faq, `faq-${s.slug}`)}</div>
        </div>
      </section>
      <section class="section section--tight no-print">
        <div class="container"><a class="row" href="${svcHref(nx)}" data-reveal data-vt="svc-label"><span class="row__n">${nx.n}</span><span class="row__t">${esc(t("sd.next", { x: label(nx) }))}</span><span class="row__d">${esc(sv(nx, "line"))}</span><span class="row__a" aria-hidden="true">${ICON.arrow}</span></a></div>
      </section>
      ${finalCta([t("sd.final1"), `${label(s)} ${t("sd.final2")}`])}`,
    };
  }

  const catName = (c) => { const s = S.find((x) => x.label === c); return s ? label(s) : c; };
  GD.catName = catName;

  function casesPage() {
    const c = cases();
    if (!c) return {
      title: `${t("nav.cases")} — ${CFG.brand}`, desc: t("cs.none.lead"),
      html: `<section class="page-hero" ${world("loc", "ink", "-2.7,0,9.5", "-2.7,0,0")}><div class="container"><p class="eyebrow">${esc(t("cs.eyebrow"))}</p><h1 class="display" data-split>${lines([t("cs.none.t1"), t("cs.none.t2")])}</h1><p class="lead" data-reveal>${esc(t("cs.none.lead"))}</p><div class="cta-row" style="margin-block-start:2rem">${btn(t("cta.talk"), "#/contact")}</div></div></section>`,
    };
    return {
      title: `${t("nav.cases")} — ${CFG.brand}`, desc: t("cs.lead"), sticky: { label: t("cta.talk"), href: "#/contact" },
      html: `
      <section class="page-hero" ${world("loc", "ink", "-2.7,0,9.5", "-2.7,0,0")}>
        <div class="container grid page-hero__grid">
          <div style="grid-column:1 / span 7">
            <p class="eyebrow" data-reveal>${esc(t("cs.eyebrow"))}</p>
            <h1 class="display" data-split>${lines([t("cs.t1"), t("cs.t2")])}</h1>
            <p class="lead" data-reveal>${esc(t("cs.lead"))}</p>
            ${c.demo ? `<p class="notice" data-reveal style="margin-block-start:2rem">${ribbon(true)} ${esc(t("cs.sampleNotice"))}</p>` : ""}
          </div>
        </div>
      </section>
      <section class="section" ${world("ambient", "ink", "0,0,9")}>
        <div class="container" data-case-browser>
          <div class="toolbar">
            <div class="filters" data-filters role="group" aria-label="${esc(t("cs.filter"))}">
              <button data-f="all" aria-pressed="true">${esc(t("cs.all"))}</button>${K.CASE_CATEGORIES.map((x) => `<button data-f="${esc(x)}" aria-pressed="false">${esc(catName(x))}</button>`).join("")}
            </div>
            <label class="search"><span class="sr-only">${esc(t("cs.search"))}</span>${ICON.search}<input type="search" data-case-search placeholder="${esc(t("cs.search"))}" autocomplete="off" /></label>
          </div>
          <p class="results" aria-live="polite" data-case-count></p>
          <div class="case-grid">${c.items.map((x) => `
            <a class="case" href="#/case-studies/${x.slug}" data-tags="${esc((x.cats || [x.tag]).join("|"))}" data-text="${esc(`${x.title} ${x.summary} ${x.industry} ${x.tag}`.toLowerCase())}" data-reveal data-cursor="view"${GD.enAttr()}>
              ${slot(x.slot, "slot--frame")}
              <div class="case__meta"><b>${esc(catName(x.tag))}</b><span>${esc(x.industry)}</span>${c.demo ? `<span class="pill">${esc(t("cs.illustrative"))}</span>` : ""}</div>
              <h3>${esc(x.title)}</h3><p>${esc(x.summary)}</p>
              <span class="link-arrow">${esc(t("cs.read"))} ${ICON.arrow}</span>
            </a>`).join("")}
          </div>
          <div class="empty" data-case-empty hidden>${ILLO.spot("bbox")}<p>${esc(t("cs.empty"))}</p>${btn(t("cta.talk"), "#/contact", "ghost")}</div>
        </div>
      </section>
      ${finalCta()}`,
    };
  }

  function caseDetail(slug) {
    const c = cases(); if (!c) return null;
    const x = c.items.find((y) => y.slug === slug); if (!x) return null;
    const others = c.items.filter((y) => y.slug !== slug).slice(0, 2);
    return {
      title: `${x.title} — ${CFG.brand}`, desc: x.summary, sticky: { label: t("cta.talk"), href: "#/contact" },
      html: `
      <section class="page-hero" ${world("ambient", "deep", "0,0,10")} style="min-block-size:85vh">
        <div class="container"${GD.enAttr()}>
          <nav class="crumbs" aria-label="Breadcrumb" data-reveal><a href="#/case-studies">${esc(t("nav.cases"))}</a><span aria-hidden="true">/</span><span aria-current="page">${esc(catName(x.tag))}</span></nav>
          <div class="case__meta" data-reveal><b>${esc(catName(x.tag))}</b><span>${esc(x.industry)}</span></div>
          <h1 class="display-2" data-split style="margin-block:1.5rem;max-inline-size:18ch">${lines([x.title])}</h1>
          <p class="lead" data-reveal>${esc(x.summary)}</p>
          ${c.demo ? `<p class="notice" data-reveal style="margin-block-start:2rem">${ribbon(true)} ${esc(t("cd.notice"))}</p>` : ""}
        </div>
      </section>
      <div class="container"><div class="media-wide" data-clip>${slot(x.slot, "slot--frame")}</div></div>
      <section class="section">
        <article class="container article"${GD.enAttr()}>
          <div data-reveal><h2>${esc(t("cd.challenge"))}</h2><p class="prose">${esc(x.challenge)}</p></div>
          <div><h2 data-reveal>${esc(t("cd.approach"))}</h2><div class="steps4 steps4--2">${x.approach.map(([ti, d]) => `<div data-reveal><h3 class="h3">${esc(ti)}</h3><p>${esc(d)}</p></div>`).join("")}</div></div>
          <div data-reveal><h2>${esc(t("cd.outcome"))}</h2><p class="prose">${esc(x.outcome)}</p></div>
          <div data-reveal><h2>${esc(t("cd.takeaways"))}</h2><ul class="ticks prose">${x.takeaways.map((y) => `<li>${esc(y)}</li>`).join("")}</ul></div>
        </article>
      </section>
      <section class="section section--tight">
        <div class="container"><p class="eyebrow" data-reveal style="margin-block-end:2rem">${esc(t("cd.more"))}</p>
          <div class="case-grid">${others.map((y) => `<a class="case" href="#/case-studies/${y.slug}" data-reveal data-cursor="view"${GD.enAttr()}>${slot(y.slot, "slot--frame")}<div class="case__meta"><b>${esc(catName(y.tag))}</b><span>${esc(y.industry)}</span></div><h3>${esc(y.title)}</h3></a>`).join("")}</div>
        </div>
      </section>
      ${finalCta()}`,
    };
  }

  function contact() {
    const map = live(CFG.mapQ) ? `<div class="map" data-reveal><iframe title="Map: ${esc(CFG.mapQ)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=${encodeURIComponent(CFG.mapQ)}&output=embed"></iframe></div>` : "";
    const opt = `<span class="opt">${esc(t("f.optional"))}</span>`;
    const err = '<span class="err" aria-live="polite"></span>';
    return {
      title: `${t("nav.contact")} — ${CFG.brand}`, desc: t("ct.lead"), sticky: null,
      html: `
      <section class="section contact" ${world("network", "deep", "-3.4,0.4,10.5", "-3.4,0.4,0")} style="padding-block-start:clamp(8rem,18vh,12rem)">
        <div class="container grid">
          <div style="grid-column:1 / span 8">
            <p class="eyebrow" data-reveal>${esc(t("ct.eyebrow"))}</p>
            <h1 class="display" data-split>${lines([t("ct.t1")])}</h1>
            <p class="display-3 accent-soft" data-split>${lines([t("ct.sub")])}</p>
            <p class="lead" data-reveal style="margin-block-start:1.5rem">${esc(t("ct.lead"))}</p>
          </div>
          <div class="contact__globe" style="grid-column:9 / span 4">${slot("contact-globe")}</div>
        </div>
        <div class="container grid contact__grid" style="margin-block-start:clamp(3rem,8vw,6rem)">
          <div class="contact__info" data-reveal>
            <div class="info-list">
              <a href="${GD.mailLink}"><small>${esc(t("ct.email"))}</small><span>${esc(CFG.email)}</span></a>
              <a href="${GD.telLink}"><small>${esc(t("ct.phone"))}</small><span dir="ltr">${esc(CFG.phone)}</span></a>
              ${live(CFG.address) ? `<div><small>${esc(t("ct.address"))}</small><span>${esc(CFG.address)}</span></div>` : ""}
            </div>
            <div class="cta-row">${waBtn(t("cta.waChat"))}${live(CFG.bookingUrl) ? `<a class="btn btn--ghost magnetic" href="${esc(CFG.bookingUrl)}" target="_blank" rel="noopener"><span class="btn__label">${esc(t("cta.book"))}</span></a>` : ""}</div>
            ${GD.reachWidget ? GD.reachWidget() : ""}
            <p class="body-soft">${esc(t("ct.quoteHint"))} <a class="link-arrow" href="#/quote">${esc(t("cta.quote"))} ${ICON.arrow}</a></p>
          </div>
          <div class="contact__form" data-reveal>
            <form class="form" data-contact novalidate aria-describedby="form-note">
              <div class="field"><label for="f-first">${esc(t("f.first"))}</label><input id="f-first" name="first_name" autocomplete="given-name" required maxlength="80" />${err}</div>
              <div class="field"><label for="f-last">${esc(t("f.last"))}</label><input id="f-last" name="last_name" autocomplete="family-name" required maxlength="80" />${err}</div>
              <div class="field"><label for="f-email">${esc(t("f.email"))}</label><input id="f-email" name="email" type="email" autocomplete="email" required maxlength="160" />${err}</div>
              <div class="field"><label for="f-phone">${esc(t("f.mobile"))} ${opt}</label><input id="f-phone" name="phone" type="tel" autocomplete="tel" maxlength="40" dir="ltr" />${err}</div>
              <div class="field"><label for="f-company">${esc(t("f.company"))} ${opt}</label><input id="f-company" name="company" autocomplete="organization" maxlength="120" />${err}</div>
              <div class="field"><label for="f-service">${esc(t("f.service"))}</label><select id="f-service" name="service"><option value="">${esc(t("f.service.any"))}</option>${S.map((s) => `<option value="${s.slug}">${esc(label(s))}</option>`).join("")}</select>${err}</div>
              <div class="field"><label for="f-langs">${esc(t("f.languages"))} ${opt}</label><input id="f-langs" name="languages" maxlength="300" placeholder="${esc(t("f.languages.ph"))}" />${err}</div>
              <div class="field"><label for="f-volume">${esc(t("f.volume"))} ${opt}</label><input id="f-volume" name="volume" maxlength="120" placeholder="${esc(t("f.volume.ph"))}" />${err}</div>
              <div class="field field--full"><label for="f-timeline">${esc(t("f.timeline"))}</label><select id="f-timeline" name="timeline"><option value="">—</option>${["asap", "1m", "3m", "later"].map((k) => `<option value="${k}">${esc(t(`f.tl.${k}`))}</option>`).join("")}</select>${err}</div>
              <div class="field field--full"><label for="f-msg">${esc(t("f.message"))}</label><textarea id="f-msg" name="message" required maxlength="4000" placeholder="${esc(t("f.message.ph"))}"></textarea>${err}</div>
              <div class="hp" aria-hidden="true"><label for="f-web">${esc(t("f.website"))}</label><input id="f-web" name="website" tabindex="-1" autocomplete="off" /></div>
              <div class="form__status" role="status" aria-live="polite"></div>
              <div class="form__foot">
                <p class="form__note" id="form-note">${esc(GD.apiUrl("contact") ? t("f.note.api") : t("f.note.mail"))}</p>
                <button class="btn btn--primary magnetic" type="submit"><span class="btn__label">${esc(t("f.send"))}</span><span class="btn__icon" aria-hidden="true">${ICON.arrow}</span></button>
              </div>
            </form>
          </div>
        </div>
        <div class="container">${map}</div>
      </section>
      ${GD.presenceSection ? GD.presenceSection() : ""}`,
    };
  }

  function notFound() {
    return {
      title: `404 — ${CFG.brand}`, desc: t("nf.lead"), noindex: true,
      html: `<section class="not-found" ${world("lost", "ink", "0,0,9", "0,0,0")}><div class="container nf__inner"><p class="eyebrow">${esc(t("nf.eyebrow"))}</p><h1 class="display" data-split>${lines([t("nf.t1"), t("nf.t2")])}</h1><p class="lead">${esc(t("nf.lead"))}</p><div class="cta-row">${btn(t("cta.back"), "#/home")}${btn(t("nav.search"), "#/home", "ghost", "data-open-palette")}</div></div></section>`,
    };
  }

  const CORE_ROUTES = [
    [/^\/?(home)?$/, () => home(), "home"],
    [/^\/about$/, () => about(), "about"],
    [/^\/services$/, () => servicesPage(), "services"],
    [/^\/services\/([\w-]+)$/, (m) => serviceDetail(m[1]), "services"],
    [/^\/case-studies$/, () => casesPage(), "case-studies"],
    [/^\/case-studies\/([\w-]+)$/, (m) => caseDetail(m[1]), "case-studies"],
    [/^\/contact$/, () => contact(), "contact"],
  ];
  function parseHash() {
    const raw = location.hash.replace(/^#/, "") || "/home";
    const [p, q = ""] = raw.split("?");
    return { path: p.replace(/\/+$/, "") || "/", query: new URLSearchParams(q) };
  }
  function resolve() {
    const { path, query } = parseHash();
    for (const [re, fn, nav] of CORE_ROUTES.concat(GD.routes)) { const m = path.match(re); if (m) { const p = fn(m, query); if (p) return { page: p, nav, path, query }; break; } }
    return { page: notFound(), nav: "", path, query };
  }
  GD.parseHash = parseHash;

  /* ---------- motion system ---------- */
  const view = $("#view");
  let lenis = null, master = null, cleanups = [], rebuildTimer = 0;
  let readyResolve; const whenReady = new Promise((r) => (readyResolve = r));
  GD.whenReady = whenReady;

  if (!reduced && window.Lenis) {
    lenis = new window.Lenis({ duration: 1.15, easing: (x) => Math.min(1, 1.001 - Math.pow(2, -10 * x)), smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((x) => lenis.raf(x * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  GD.lenis = () => lenis;
  /* Smooth in-page scrolling with header offset (no hash anchors: the hash is the router). */
  GD.scrollToEl = (el) => { if (!el) return; const y = el.getBoundingClientRect().top + window.scrollY - 96; lenis ? lenis.scrollTo(y) : window.scrollTo({ top: y, behavior: reduced ? "auto" : "smooth" }); };

  function readPreset(el, prev) {
    const p = prev ? JSON.parse(JSON.stringify(prev)) : { flow: 0 };
    const scene = el.dataset.scene || p.scene || "ambient";
    const tone = (World.TONES && World.TONES[el.dataset.tone]) ? el.dataset.tone : p.tone || "ink";
    const anchor = (World.ANCHOR && World.ANCHOR[scene]) || 0;
    const c = (el.dataset.cam || "0,0,9").split(",").map(Number);
    const l = el.dataset.look ? el.dataset.look.split(",").map(Number) : [c[0], 0, 0];
    const Tn = World.TONES[tone];
    Object.assign(p, {
      scene, tone, cam: { x: c[0] || 0, y: c[1] || 0, z: anchor + (c[2] == null ? 9 : c[2]) },
      look: { x: l[0] || 0, y: l[1] || 0, z: anchor + (l[2] || 0) },
      bg: { ...Tn.bg }, fog: { ...Tn.fog }, light: { ...Tn.light }, fogD: Tn.fogD,
    });
    if (el.dataset.flow != null) p.flow = +el.dataset.flow;
    return p;
  }
  function applyPreset(p) {
    const W = World.W;
    Object.assign(W.cam, p.cam); Object.assign(W.look, p.look); Object.assign(W.bg, p.bg); Object.assign(W.fog, p.fog); Object.assign(W.light, p.light);
    W.fogD = p.fogD; W.flow = p.flow;
    Object.keys(W.a).forEach((k) => (W.a[k] = k === p.scene ? 1 : 0));
  }
  const docTop = (el) => el.getBoundingClientRect().top + window.scrollY;

  /* One master timeline per page, scrubbed by the whole document scroll. Each
     [data-world] element is a keyframe; transitions run while it enters view. */
  function buildMaster() {
    if (!World.supported) return;
    if (master) { master.scrollTrigger && master.scrollTrigger.kill(); master.kill(); master = null; }
    const els = $$("[data-world]", view); if (!els.length) return;
    const keys = []; let prev = null;
    els.forEach((el) => { prev = readPreset(el, prev); keys.push({ el, p: prev }); });
    if (!hasGsap) { applyPreset(keys[0].p); return; }
    const W = World.W, vh = window.innerHeight, max = Math.max(1, document.documentElement.scrollHeight - vh);
    const scroll = window.scrollY;
    applyPreset(keys[0].p);
    const tl = gsap.timeline({ paused: true, defaults: { ease: "sine.inOut", immediateRender: false } });
    let cursor = 0;
    for (let i = 1; i < keys.length; i++) {
      const a = keys[i - 1].p, b = keys[i].p, top = docTop(keys[i].el);
      const s = Math.max(0, top - vh * 0.95, cursor), e = Math.max(top - vh * 0.2, s + vh * 0.2);
      cursor = e;
      const fs = Math.min(s / max, 1), fd = Math.max((e - s) / max, 0.0001);
      tl.fromTo(W.cam, { ...a.cam }, { ...b.cam, duration: fd }, fs)
        .fromTo(W.look, { ...a.look }, { ...b.look, duration: fd }, fs)
        .fromTo(W.bg, { ...a.bg }, { ...b.bg, duration: fd }, fs)
        .fromTo(W.fog, { ...a.fog }, { ...b.fog, duration: fd }, fs)
        .fromTo(W.light, { ...a.light }, { ...b.light, duration: fd }, fs)
        .fromTo(W, { fogD: a.fogD, flow: a.flow }, { fogD: b.fogD, flow: b.flow, duration: fd }, fs);
      if (a.scene !== b.scene) {
        tl.fromTo(W.a, { [a.scene]: 1 }, { [a.scene]: 0, duration: fd * 0.6, ease: "power1.in" }, fs)
          .fromTo(W.a, { [b.scene]: 0 }, { [b.scene]: 1, duration: fd * 0.65, ease: "power1.out" }, fs + fd * 0.35);
      }
    }
    tl.to({}, { duration: 0 }, 1);
    master = tl;
    ScrollTrigger.create({ trigger: document.documentElement, start: 0, end: () => "max", scrub: reduced ? true : 1.1, animation: tl, invalidateOnRefresh: false });
    tl.progress(Math.min(scroll / max, 1));
  }
  function scheduleRebuild() {
    clearTimeout(rebuildTimer);
    rebuildTimer = setTimeout(() => { if (!hasGsap) return; ScrollTrigger.refresh(); buildMaster(); }, 220);
  }
  GD.scheduleRebuild = scheduleRebuild;

  function reveals(root) {
    if (reduced) return;
    $$("[data-split]", root).forEach((h) => {
      const inner = $$(".line__inner", h); gsap.set(inner, { yPercent: 112 });
      ScrollTrigger.create({ trigger: h, start: "top 90%", once: true, onEnter: () => gsap.to(inner, { yPercent: 0, duration: 1.4, ease: "expo.out", stagger: 0.09 }) });
    });
    ScrollTrigger.batch($$("[data-reveal]", root), { start: "top 92%", once: true, onEnter: (b) => gsap.to(b, { opacity: 1, y: 0, duration: 1.2, ease: "expo.out", stagger: 0.08, overwrite: true }) });
    $$("[data-clip]", root).forEach((el) => ScrollTrigger.create({ trigger: el, start: "top 88%", once: true, onEnter: () => gsap.to(el, { clipPath: "inset(0% 0 0 0)", duration: 1.6, ease: "expo.out" }) }));
    $$("[data-parallax]", root).forEach((el) => gsap.to(el, { y: () => window.innerHeight * parseFloat(el.dataset.parallax), ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } }));
    // image parallax inside art-directed slots
    $$(".slot:not(.slot--fill) img", root).forEach((img) => gsap.fromTo(img, { yPercent: -6 }, { yPercent: 6, ease: "none", scrollTrigger: { trigger: img.closest(".slot"), start: "top bottom", end: "bottom top", scrub: true } }));
  }

  /* ---------- hero intro (~3 s, skippable, once per session) ---------- */
  let heroTl = null;
  function heroMotion(root, intro) {
    const h = $("[data-hero]", root); if (!h || reduced) return;
    const lines2 = $$(".line__inner", h), rest = [$(".eyebrow", h), $(".lead", h), $(".cta-row", h), $(".hero__scroll", h)].filter(Boolean);
    if (intro) {
      gsap.set(lines2, { yPercent: 112 }); gsap.set(rest, { opacity: 0, y: 30 });
      whenReady.then(() => {
        let seen = false; try { seen = sessionStorage.getItem("gd-intro") === "1"; } catch (e) { /* ignore */ }
        const tl = gsap.timeline(); heroTl = tl;
        const ov = $("#intro");
        if (!seen && ov && window.scrollY < 20) {
          try { sessionStorage.setItem("gd-intro", "1"); } catch (e) { /* ignore */ }
          ov.hidden = false; ov.querySelector(".intro__wm").innerHTML = ILLO.wordmark(CFG.brand, { size: 64 });
          const skip = $("#intro-skip"); skip.textContent = t("hero.skip");
          const lettersEl = $$(".wm-l", ov);
          tl.fromTo(ov, { opacity: 1 }, { opacity: 1, duration: 0.01 })
            .fromTo($(".lm-ring", ov), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.1, ease: "expo.inOut" }, 0)
            .fromTo([$(".lm-node", ov), $(".lm-sat", ov)], { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.7, ease: "back.out(2)", stagger: 0.12 }, 0.6)
            .fromTo(lettersEl, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.9, ease: "expo.out", stagger: 0.05 }, 0.5)
            .to(ov, { opacity: 0, duration: 0.8, ease: "power2.inOut" }, 2.3)
            .add(() => { ov.hidden = true; }, 3.1);
          skip.focus({ preventScroll: true });
          skip.onclick = () => { tl.progress(1); ov.hidden = true; };
        }
        const off = tl.duration() ? 2.1 : 0.1;
        tl.to(lines2, { yPercent: 0, duration: 1.7, ease: "expo.out", stagger: 0.12 }, off)
          .to(rest, { opacity: 1, y: 0, duration: 1.4, ease: "expo.out", stagger: 0.08 }, off + 0.35);
        if (World.supported && window.scrollY < 20) {
          const W = World.W; W.a.portal = 0;
          tl.fromTo(W.cam, { z: tl.duration() > 3 ? 24 : 17 }, { z: 10, duration: 2.8, ease: "expo.out" }, 0.2)
            .to(W.a, { portal: 1, duration: 2, ease: "power2.out" }, 0.2);
        }
      });
    }
    gsap.to(h, { opacity: 0, y: -90, ease: "none", scrollTrigger: { trigger: h.closest(".hero"), start: "top top", end: "40% top", scrub: true } });
  }

  function toneTriggers(root) {
    const secs = $$("[data-world][data-tone]:not(.world-mark)", root);
    if (secs[0]) body.dataset.tone = secs[0].dataset.tone;
    if (!hasGsap) return;
    secs.forEach((el) => ScrollTrigger.create({ trigger: el, start: "top 55%", end: "bottom 55%", onToggle: (st) => st.isActive && (body.dataset.tone = el.dataset.tone) }));
  }

  function flowSteps(root) {
    const sec = $("[data-flow-section]", root); if (!sec || !hasGsap) { $$(".step", root).forEach((s) => s.classList.add("is-active")); return; }
    const steps = $$(".step", sec);
    const set = (idx) => steps.forEach((st, i) => { st.classList.toggle("is-active", i === idx); st.classList.toggle("is-done", i < idx); });
    set(0);
    ScrollTrigger.create({ trigger: sec, start: "top top", end: "bottom bottom", onUpdate: (s) => set(Math.min(2, Math.floor(s.progress * 3.05))) });
  }

  function chapterCounter(root) {
    const el = $("[data-chapter-count]", root); if (!el || !hasGsap) return;
    let onc = 0;
    $$("[data-chapter]", root).forEach((ch) => ScrollTrigger.create({
      trigger: ch, start: "top 50%", end: "bottom 50%",
      onToggle: (st) => { onc += st.isActive ? 1 : -1; if (st.isActive) el.textContent = `${ch.dataset.chapter} / ${String(S.length).padStart(2, "0")} — ${ch.dataset.label}`; el.classList.toggle("is-on", onc > 0); },
    }));
  }

  function accordion(root) {
    $$(".faq__q", root).forEach((b) => b.addEventListener("click", () => {
      const open = b.getAttribute("aria-expanded") === "true", panel = document.getElementById(b.getAttribute("aria-controls"));
      b.setAttribute("aria-expanded", String(!open));
      if (!open) {
        panel.hidden = false;
        if (!reduced) gsap.fromTo(panel, { height: 0 }, { height: "auto", duration: 0.8, ease: "expo.out", onComplete: scheduleRebuild }); else scheduleRebuild();
      } else if (!reduced) {
        gsap.to(panel, { height: 0, duration: 0.55, ease: "expo.out", onComplete: () => { panel.hidden = true; panel.style.height = ""; scheduleRebuild(); } });
      } else { panel.hidden = true; scheduleRebuild(); }
    }));
  }

  function slider(root) {
    const el = $("[data-slider]", root); if (!el) return;
    const slides = $$(".quote", el), dots = $$(".dots button", root); let i = 0, timer = 0;
    const show = (n) => {
      const next = (n + slides.length) % slides.length; if (next === i) return;
      slides[i].hidden = true; i = next; slides[i].hidden = false;
      if (!reduced) gsap.fromTo(slides[i].children, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1, ease: "expo.out", stagger: 0.08 });
      dots.forEach((d, k) => d.setAttribute("aria-current", String(k === i)));
    };
    $("[data-prev]", root).addEventListener("click", () => show(i - 1));
    $("[data-next]", root).addEventListener("click", () => show(i + 1));
    dots.forEach((d, k) => d.addEventListener("click", () => show(k)));
    const play = () => { if (reduced) return; clearInterval(timer); timer = setInterval(() => show(i + 1), 7000); };
    const pause = () => clearInterval(timer);
    el.addEventListener("pointerenter", pause); el.addEventListener("pointerleave", play);
    el.addEventListener("focusin", pause); el.addEventListener("focusout", play);
    play(); cleanups.push(pause);
  }

  function contactForm(root) {
    const f = $("form[data-contact]", root); if (!f) return;
    const status = $(".form__status", f), submit = $("button[type=submit]", f);
    const RULES = {
      first_name: (v) => (v.length >= 1 && v.length <= 80) || t("err.first"),
      last_name: (v) => (v.length >= 1 && v.length <= 80) || t("err.last"),
      email: (v) => (GD.RX.email.test(v) && v.length <= 160) || t("err.email"),
      phone: (v) => v === "" || GD.RX.phone.test(v) || t("err.phone"),
      message: (v) => (v.length >= 10 && v.length <= 4000) || t("err.message"),
    };
    const setStatus = (kind, msg) => { status.className = `form__status ${kind ? `is-${kind}` : ""}`; status.innerHTML = msg || ""; };
    f.addEventListener("submit", async (e) => {
      e.preventDefault(); setStatus("", "");
      const data = {}; new FormData(f).forEach((v, k) => (data[k] = String(v).trim()));
      let firstBad = null;
      Object.entries(RULES).forEach(([k, rule]) => {
        const input = f.elements[k], res = rule(data[k] || ""), er = input.parentElement.querySelector(".err");
        const bad = res !== true; input.setAttribute("aria-invalid", String(bad)); er.textContent = bad ? res : "";
        if (bad && !firstBad) firstBad = input;
      });
      if (firstBad) { firstBad.focus(); return; }
      if (data.website) { f.reset(); setStatus("ok", esc(t("st.okHp"))); return; }
      const mailA = `<a class="link-arrow" href="${GD.mailLink}">${esc(CFG.email)}</a>`;
      if (!GD.apiUrl("contact")) {
        const name = `${data.first_name} ${data.last_name}`;
        GD.mailto(`Project inquiry — ${name}`, [`Name: ${name}`, `Email: ${data.email}`, `Mobile: ${data.phone || "-"}`, `Company: ${data.company || "-"}`, `Service: ${data.service || "-"}`, `Languages: ${data.languages || "-"}`, `Volume: ${data.volume || "-"}`, `Timeline: ${data.timeline || "-"}`, "", data.message]);
        setStatus("ok", t("st.mail", { email: mailA }));
        return;
      }
      submit.setAttribute("aria-busy", "true"); GD.announce(t("st.sending"));
      try {
        const j = await GD.post("contact", data);
        f.reset(); setStatus("ok", `${esc(t("st.ok"))}${j.ref ? ` <b>${esc(t("st.ref", { ref: j.ref }))}</b>` : ""}`);
      } catch (er) {
        setStatus("err", t("st.err", { msg: esc(er.message), email: mailA }));
      } finally { submit.removeAttribute("aria-busy"); }
    });
  }

  /* lazy, blur-up image slots */
  function slots(root) {
    const load = (img) => {
      const wrap = img.closest(".slot"); if (img.dataset.loaded) return; img.dataset.loaded = "1";
      img.addEventListener("load", () => { wrap.classList.add("has-img"); wrap.classList.remove("is-empty"); }, { once: true });
      img.addEventListener("error", () => wrap.classList.add("is-empty"), { once: true });
      $$("source[data-srcset]", wrap).forEach((s) => (s.srcset = s.dataset.srcset));
      img.src = img.dataset.src;
    };
    const imgs = $$("img[data-slot]", root);
    if (!("IntersectionObserver" in window)) { imgs.forEach(load); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { load(e.target); io.unobserve(e.target); } }), { rootMargin: "600px 0px" });
    imgs.forEach((i) => io.observe(i)); cleanups.push(() => io.disconnect());
  }

  function magnetic(root) {
    if (!fine || reduced) return;
    $$(".magnetic", root).forEach((el) => {
      if (el._mag) return; el._mag = true;
      const xTo = gsap.quickTo(el, "x", { duration: 0.9, ease: "expo.out" }), yTo = gsap.quickTo(el, "y", { duration: 0.9, ease: "expo.out" });
      el.addEventListener("pointermove", (e) => { const r = el.getBoundingClientRect(); xTo((e.clientX - r.left - r.width / 2) * 0.28); yTo((e.clientY - r.top - r.height / 2) * 0.32); });
      el.addEventListener("pointerleave", () => { xTo(0); yTo(0); });
    });
  }
  GD.magnetic = magnetic;

  /* ---------- chrome: nav, mega menu, mobile accordion, footer ---------- */
  const groups = () => K.SERVICE_GROUPS.map(([g, slugs], gi) => [GD.hasT(`group.${gi}`) ? t(`group.${gi}`) : g, slugs.map((sl) => S.find((x) => x.slug === sl)).filter(Boolean)]);
  const companyLinks = () => [["#/about", "nav.about", "about"], ["#/trust", "nav.trust", "trust"], ["#/rfp", "nav.enterprise", "rfp"], ["#/join", "nav.join", "join"], ["#/contact", "nav.contact", "contact"]];
  function langSwitcher(id) {
    return `<div class="lang"><label class="sr-only" for="${id}">${esc(t("nav.lang"))}</label><span class="lang__ico" aria-hidden="true">${ICON.lang}</span><select id="${id}" data-lang-select>${GD.AVAIL.map((l) => `<option value="${l}" ${l === GD.lang() ? "selected" : ""} lang="${l}">${esc((GD.LANG_META[l] || { name: l }).name)}</option>`).join("")}</select></div>`;
  }
  function renderNav() {
    const c = cases();
    $("#nav").innerHTML = `
      <div class="nav__inner">
        <a class="wordmark" href="#/home" aria-label="${esc(t("brand.home", { brand: CFG.brand }))}">${ILLO.wordmark(CFG.brand, { size: 26 })}</a>
        <nav class="nav__links" aria-label="${esc(t("nav.primary"))}">
          <div class="dd" data-dd>
            <button class="dd__btn" aria-expanded="false" aria-controls="mega" data-nav="services"><span class="scr" data-scramble>${esc(t("nav.services"))}</span>${ICON.chevron}</button>
            <div class="mega" id="mega" hidden>
              <div class="mega__inner">
                ${groups().map(([g, list]) => `<div class="mega__col"><p class="mega__h">${esc(g)}</p>${list.map((s) => `<a href="${svcHref(s)}" data-vt="svc-label"><span class="mega__ico">${ILLO.icon(s.icon, 18)}</span><span><b>${esc(label(s))}</b><small>${esc(sv(s, "headline"))}</small></span></a>`).join("")}</div>`).join("")}
                <div class="mega__aside"><p class="mega__h">${esc(t("nav.languages"))}</p><p>${esc(t("lx.lead"))}</p>${btn(t("cta.languages"), "#/languages", "ghost")}<a class="link-arrow" href="#/services">${esc(t("nav.allServices"))} ${ICON.arrow}</a></div>
              </div>
            </div>
          </div>
          <a href="#/languages" data-nav="languages"><span class="scr" data-scramble>${esc(t("nav.languages"))}</span></a>
          ${c ? `<a href="#/case-studies" data-nav="case-studies"><span class="scr" data-scramble>${esc(t("nav.cases"))}</span></a>` : ""}
          <a href="#/resources" data-nav="resources"><span class="scr" data-scramble>${esc(t("nav.resources"))}</span></a>
          <div class="dd" data-dd>
            <button class="dd__btn" aria-expanded="false" aria-controls="dd-company" data-nav-group="about trust rfp join contact"><span class="scr" data-scramble>${esc(t("nav.company"))}</span>${ICON.chevron}</button>
            <div class="dd__panel" id="dd-company" hidden>${companyLinks().map(([h, k, n]) => `<a href="${h}" data-nav="${n}">${esc(t(k))}</a>`).join("")}</div>
          </div>
        </nav>
        <div class="nav__tools">
          <button class="icon-btn" data-open-palette aria-label="${esc(t("nav.search"))}" aria-keyshortcuts="Control+K Meta+K">${ICON.search}<kbd>⌘K</kbd></button>
          ${langSwitcher("lang-nav")}
          <a class="btn btn--primary btn--sm magnetic nav__cta" href="#/quote"><span class="btn__label">${esc(t("nav.quote"))}</span></a>
        </div>
        <button class="nav__toggle" id="nav-toggle" aria-expanded="false" aria-controls="menu" aria-label="${esc(t("nav.menu.open"))}"><span></span><span></span></button>
      </div>`;
    $("#menu").innerHTML = `
      <nav class="menu__links" aria-label="${esc(t("nav.mobile"))}">
        <a href="#/home" data-nav="home">${esc(t("nav.home"))}</a>
        <div class="acc">
          <button class="acc__btn" aria-expanded="false" aria-controls="acc-svc">${esc(t("nav.services"))}${ICON.chevron}</button>
          <div class="acc__panel" id="acc-svc" hidden>${S.map((s) => `<a href="${svcHref(s)}">${ILLO.icon(s.icon, 18)}${esc(label(s))}</a>`).join("")}<a href="#/services">${esc(t("nav.allServices"))}</a></div>
        </div>
        <a href="#/languages" data-nav="languages">${esc(t("nav.languages"))}</a>
        ${c ? `<a href="#/case-studies" data-nav="case-studies">${esc(t("nav.cases"))}</a>` : ""}
        <a href="#/resources" data-nav="resources">${esc(t("nav.resources"))}</a>
        <div class="acc">
          <button class="acc__btn" aria-expanded="false" aria-controls="acc-co">${esc(t("nav.company"))}${ICON.chevron}</button>
          <div class="acc__panel" id="acc-co" hidden>${companyLinks().map(([h, k]) => `<a href="${h}">${esc(t(k))}</a>`).join("")}</div>
        </div>
      </nav>
      <div class="menu__foot">${btn(t("nav.quote"), "#/quote")}<button class="icon-btn" data-open-palette aria-label="${esc(t("nav.search"))}">${ICON.search}</button>${langSwitcher("lang-menu")}</div>`;
    wireNav();
  }

  let navWired = false;
  function wireNav() {
    const nav = $("#nav"), toggle = $("#nav-toggle"), menu = $("#menu");
    let untrap = null;
    // desktop dropdowns: click / Enter / Escape; hover opens on fine pointers
    $$("[data-dd]", nav).forEach((dd) => {
      const b = $(".dd__btn", dd), panel = document.getElementById(b.getAttribute("aria-controls"));
      let hideT = 0;
      const set = (o) => {
        clearTimeout(hideT); b.setAttribute("aria-expanded", String(o));
        if (o) { $$("[data-dd] .dd__btn[aria-expanded=true]", nav).forEach((x) => x !== b && x.click()); panel.hidden = false; requestAnimationFrame(() => panel.classList.add("is-open")); }
        else { panel.classList.remove("is-open"); hideT = setTimeout(() => (panel.hidden = true), 250); }
      };
      b.addEventListener("click", () => set(b.getAttribute("aria-expanded") !== "true"));
      if (fine) { dd.addEventListener("pointerenter", () => set(true)); dd.addEventListener("pointerleave", () => set(false)); }
      dd.addEventListener("keydown", (e) => { if (e.key === "Escape" && b.getAttribute("aria-expanded") === "true") { set(false); b.focus(); } });
      dd.addEventListener("focusout", (e) => { if (!dd.contains(e.relatedTarget)) set(false); });
      panel.addEventListener("click", (e) => { if (e.target.closest("a")) set(false); });
    });
    $$(".acc__btn", menu).forEach((b) => b.addEventListener("click", () => { const o = b.getAttribute("aria-expanded") !== "true"; b.setAttribute("aria-expanded", String(o)); document.getElementById(b.getAttribute("aria-controls")).hidden = !o; }));
    const setMenu = (open) => {
      toggle.setAttribute("aria-expanded", String(open)); toggle.setAttribute("aria-label", t(open ? "nav.menu.close" : "nav.menu.open"));
      if (open) { menu.hidden = false; requestAnimationFrame(() => menu.classList.add("is-open")); lenis && lenis.stop(); body.style.overflow = "hidden"; untrap = GD.trap(document.body, () => { setMenu(false); toggle.focus(); }); const f = $("a,button", menu); f && f.focus(); }
      else { menu.classList.remove("is-open"); setTimeout(() => { if (!menu.classList.contains("is-open")) menu.hidden = true; }, 800); lenis && lenis.start(); body.style.overflow = ""; untrap && untrap(); untrap = null; }
    };
    GD.closeMenu = () => toggle.getAttribute("aria-expanded") === "true" && setMenu(false);
    toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
    $$("[data-lang-select]").forEach((sel) => sel.addEventListener("change", () => GD.setLang(sel.value)));
    if (navWired) return; navWired = true;
    const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  }

  function renderFooter() {
    const socials = Object.entries(CFG.socials || {}).filter(([, u]) => live(u));
    const c = cases();
    $("#footer").innerHTML = `
      <div class="container">
        <div class="footer__top">
          <div class="footer__brand"><a class="wordmark" href="#/home" aria-label="${esc(t("brand.home", { brand: CFG.brand }))}">${ILLO.wordmark(CFG.brand, { size: 34 })}</a><p>${esc(GD.cfgT("brand.tagline", CFG.tagline))}</p><div>${btn(t("cta.quote"), "#/quote")}</div>${GD.newsletterForm ? GD.newsletterForm() : ""}</div>
          <nav class="footer__col" aria-label="${esc(t("ft.nav"))}"><h2>${esc(t("ft.nav"))}</h2>
            <a href="#/home">${esc(t("nav.home"))}</a><a href="#/services">${esc(t("nav.services"))}</a><a href="#/languages">${esc(t("nav.languages"))}</a>${c ? `<a href="#/case-studies">${esc(t("nav.cases"))}</a>` : ""}<a href="#/resources">${esc(t("nav.resources"))}</a><a href="#/quote">${esc(t("nav.quote"))}</a>
          </nav>
          <nav class="footer__col" aria-label="${esc(t("ft.services"))}"><h2>${esc(t("ft.services"))}</h2>
            ${S.map((s) => `<a href="${svcHref(s)}">${esc(label(s))}</a>`).join("")}
          </nav>
          <nav class="footer__col" aria-label="${esc(t("ft.company"))}"><h2>${esc(t("ft.company"))}</h2>
            ${companyLinks().map(([h, k]) => `<a href="${h}">${esc(t(k))}</a>`).join("")}<a href="#/privacy">${esc(t("lg.privacy"))}</a><a href="#/terms">${esc(t("lg.terms"))}</a><button class="linklike" data-consent-open>${esc(t("cn.settings"))}</button>
          </nav>
          <div class="footer__col footer__col--wide"><h2>${esc(t("ft.contact"))}</h2>
            <a href="${GD.mailLink}">${esc(CFG.email)}</a>
            <a href="${GD.telLink}" dir="ltr">${esc(CFG.phone)}</a>
            ${GD.digits ? `<a href="${GD.waLink()}" target="_blank" rel="noopener">WhatsApp</a>` : ""}
            ${live(CFG.address) ? `<span class="muted">${esc(CFG.address)}</span>` : ""}
            ${socials.length ? `<div class="socials" style="margin-block-start:1rem">${socials.map(([k, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener" aria-label="${SOCIAL_NAMES[k] || k}">${ICON[k] || ""}</a>`).join("")}</div>` : ""}
            ${langSwitcher("lang-foot")}
          </div>
        </div>
        <div class="footer__bottom"><span>${esc(t("ft.rights", { year: CFG.year, brand: CFG.brand }))}</span>${GD.lang() !== "en" ? `<span>${esc(t("ft.machine"))}</span>` : ""}${CFG.demo ? `<span>${esc(t("demo.footer"))}</span>` : ""}</div>
      </div>`;
    $$("[data-lang-select]", $("#footer")).forEach((sel) => sel.addEventListener("change", () => GD.setLang(sel.value)));
    magnetic($("#footer"));
    GD.mounters.forEach((m) => m.footer && m.footer($("#footer")));
  }

  function chrome() {
    const wa = $("#wa-float");
    if (GD.digits) { wa.href = GD.waLink(); wa.innerHTML = ICON.wa; wa.setAttribute("aria-label", t("cta.waAria", { brand: CFG.brand })); } else wa.hidden = true;
    $(".skip-link").textContent = t("skip");
    renderNav(); renderFooter();
    document.addEventListener("click", (e) => {
      const a = e.target.closest('a[href^="#/"]'); if (!a) return;
      GD.closeMenu && GD.closeMenu();
      if (a.dataset.vt && document.startViewTransition && !reduced) { a.style.viewTransitionName = a.dataset.vt; pendingVT = a; }
      if (a.getAttribute("href") === location.hash) { e.preventDefault(); lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" }); }
    });
    window.addEventListener("pointermove", (e) => World.pointer && World.pointer((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1), { passive: true });
    // gyro parallax on phones (no permission prompt; silently unavailable on iOS without it)
    if (!fine && !reduced) window.addEventListener("deviceorientation", (e) => { if (e.gamma == null) return; World.pointer && World.pointer(Math.max(-1, Math.min(1, e.gamma / 30)), Math.max(-1, Math.min(1, (e.beta - 45) / 30))); }, { passive: true });
    let lastW = window.innerWidth;
    window.addEventListener("resize", () => { if (Math.abs(window.innerWidth - lastW) > 40 || !fine) { lastW = window.innerWidth; scheduleRebuild(); } });
    GD.mounters.forEach((m) => m.chrome && m.chrome());
  }

  function cursor() {
    if (!fine || reduced) return;
    html.classList.add("has-cursor");
    const c = $(".cursor"), dot = $(".cursor__dot"), ring = $(".cursor__ring"), lab = $(".cursor__label");
    let x = -100, y = -100, rx = x, ry = y;
    window.addEventListener("pointermove", (e) => { x = e.clientX; y = e.clientY; }, { passive: true });
    const LABELS = { view: () => t("cta.learn"), explore: () => t("demo.illustration").split("·")[0].trim(), read: () => t("cta.learn") };
    document.addEventListener("pointerover", (e) => {
      const st = e.target.closest("[data-cursor]");
      c.classList.toggle("is-hover", !!e.target.closest("a,button,input,textarea,select,label,[role=button]"));
      c.dataset.state = st ? st.dataset.cursor : ""; lab.textContent = st && LABELS[st.dataset.cursor] ? LABELS[st.dataset.cursor]() : "";
      c.classList.toggle("is-text", !!e.target.closest("input,textarea"));
    });
    document.addEventListener("pointerleave", () => { x = y = -100; });
    gsap.ticker.add(() => {
      rx += (x - rx) * 0.18; ry += (y - ry) * 0.18;
      dot.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%)`;
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
    });
  }

  /* ---------- curtain + router ---------- */
  const curtain = $("#curtain");
  let pendingVT = null;
  const curtainIn = () => new Promise((r) => gsap.fromTo(curtain, { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", duration: 0.75, ease: "expo.inOut", onComplete: r }));
  const curtainOut = () => new Promise((r) => gsap.fromTo(curtain, { clipPath: "inset(0 0 0% 0)" }, { clipPath: "inset(0 0 100% 0)", duration: 0.9, ease: "expo.inOut", onComplete: r }));

  function teardown() {
    cleanups.forEach((f) => f()); cleanups = [];
    if (heroTl) { heroTl.kill(); heroTl = null; const ov = $("#intro"); if (ov) ov.hidden = true; }
    if (hasGsap) { ScrollTrigger.getAll().forEach((tr) => tr.kill()); if (master) { master.kill(); master = null; } }
  }

  function setMeta(page, nav, path) {
    document.title = page.title;
    const set = (sel, v) => { const m = $(sel); if (m) m.setAttribute("content", v); };
    set('meta[name="description"]', page.desc); set('meta[property="og:title"]', page.title); set('meta[property="og:description"]', page.desc);
    set('meta[name="robots"]', page.noindex ? "noindex" : "index,follow");
    const base = GD.siteUrl(), slug = path === "/" || path === "/home" ? "" : `${path.replace(/^\//, "")}/`;
    const canon = $("#canonical"); if (canon) canon.href = `${base}${slug}`;
    $$("link[data-hreflang], link[data-static-hreflang]").forEach((l) => l.remove());
    GD.AVAIL.concat(["x-default"]).forEach((l) => { const el = document.createElement("link"); el.rel = "alternate"; el.hreflang = l; el.dataset.hreflang = "1"; el.href = `${base}${slug}${l === "x-default" || l === "en" ? "" : `?lang=${l}`}`; document.head.appendChild(el); });
    const ld = $("#ld-page"); if (ld) ld.textContent = page.jsonld ? JSON.stringify(page.jsonld) : "{}";
    body.classList.toggle("is-printable", !!page.print);
    $$("[data-nav]").forEach((a) => (a.dataset.nav === nav ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current")));
    $$("[data-nav-group]").forEach((b) => b.classList.toggle("is-current", b.dataset.navGroup.split(" ").includes(nav)));
    GD.emit("page", { page, nav, path });
  }

  function mount(r) {
    const root = view;
    slots(root); accordion(root); slider(root); contactForm(root); magnetic(root);
    cleanups.push(...ILLO.initDemos(root), ILLO.observeDraw(root));
    GD.mounters.forEach((m) => { if (m.page) { const c = m.page(root, r); if (typeof c === "function") cleanups.push(c); } });
    const scenes = Array.from(new Set($$("[data-world]", root).map((e) => e.dataset.scene)));
    if (World.supported) { World.use(scenes); World.prewarm(scenes.slice(0, 2)); }
    toneTriggers(root);
    if (hasGsap) {
      heroMotion(root, true);
      flowSteps(root); chapterCounter(root);
      whenReady.then(() => reveals(root));
      buildMaster();
    } else { flowSteps(root); }
  }

  let busy = false, queued = false, firstNav = true;
  async function go() {
    if (busy) { queued = true; return; }
    busy = true;
    const r = resolve(), first = firstNav;
    const render = () => {
      teardown();
      view.innerHTML = r.page.html;
      setMeta(r.page, r.nav, r.path);
      if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
      window.scrollTo(0, 0);
      mount(r);
    };
    const vt = !first && pendingVT && document.startViewTransition && !reduced;
    if (vt) {
      const tr = document.startViewTransition(render);
      try { await tr.finished; } catch (e) { /* ignore */ }
      if (pendingVT) pendingVT.style.viewTransitionName = "";
    } else {
      if (!first && hasGsap && !reduced) await curtainIn();
      render();
      if (!first && hasGsap && !reduced) await curtainOut();
    }
    pendingVT = null;
    if (!first) { const h1 = $("h1", view); if (h1) { h1.setAttribute("tabindex", "-1"); h1.focus({ preventScroll: true }); } }
    firstNav = false; busy = false;
    if (queued) { queued = false; go(); }
  }
  GD.go = go;

  /* ---------- preloader: animated logo mark with real progress ---------- */
  function preloader() {
    const el = $("#preloader"), ring = $("#preloader .lm-ring"), count = $("#preloader-count");
    el.setAttribute("aria-label", t("a11y.loading", { brand: CFG.brand }));
    const st = { v: 0, target: 10 }; let done = false;
    const bump = (n) => (st.target = Math.max(st.target, n));
    const finish = () => {
      if (done) return; done = true;
      const end = () => { el.remove(); readyResolve(); scheduleRebuild(); };
      if (hasGsap && !reduced) gsap.to(el, { clipPath: "inset(0 0 100% 0)", duration: 1.1, ease: "expo.inOut", onComplete: end, onStart: () => setTimeout(readyResolve, 350) });
      else end();
    };
    let lastT = performance.now();
    const tick = (now) => {
      const dt = Math.min(200, (now || performance.now()) - lastT); lastT = now || performance.now();
      st.v += (st.target - st.v) * Math.min(1, dt * 0.012); if (st.target - st.v < 1.5) st.v = st.target;
      count.textContent = Math.round(st.v); if (ring) ring.style.strokeDashoffset = String(1 - st.v / 100);
      if (st.v >= 100) return finish();
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    // Real milestones: libraries parsed, dictionary, fonts, WebGL init, first page, window load.
    bump(10 + (window.THREE ? 8 : 0) + (window.gsap ? 6 : 0) + (window.Lenis ? 4 : 0));
    (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(() => bump(55));
    const onLoad = () => bump(100);
    if (document.readyState === "complete") setTimeout(onLoad, 300); else window.addEventListener("load", onLoad);
    setTimeout(() => bump(100), 6000);
    return bump;
  }

  /* ---------- language change: re-render everything in place ---------- */
  GD.on("lang", () => {
    World.setDir && World.setDir(GD.isRTL() ? -1 : 1);
    renderNav(); renderFooter();
    GD.mounters.forEach((m) => m.lang && m.lang());
    firstNav = true; go();
  });

  /* ---------- boot ---------- */
  const bump = preloader();
  GD.dictReady.then(() => {
    bump(35);
    const ok = !!(World.init && World.init($("#world")));
    if (!ok) html.classList.add("no-webgl"); else { World.setReduced(reduced); World.setDir(GD.isRTL() ? -1 : 1); World.onQuality = () => html.classList.add("q-low"); }
    bump(45);
    chrome(); cursor();
    window.addEventListener("hashchange", go);
    go().then(() => bump(80));
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(scheduleRebuild);
    window.addEventListener("load", scheduleRebuild);
  });
})();
