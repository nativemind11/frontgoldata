/* =====================================================================
   Questverse — ILLUSTRATION KIT (all drawn in code, no files)
   • logo(): original Questverse mark — a "Q" ring with voice bars, a node and a
     satellite in the gap. Legible at 16px, scales to any size.
   • icon(): 18 line icons (24px grid). spot(): 8 spot illustrations.
     Every stroke uses pathLength="1" so CSS can draw it in (.draw → .is-drawn).
   • demo(): 5 interactive illustrations, always labelled as illustrations.
   ===================================================================== */
(function () {
  "use strict";
  const GD = window.GD, t = (k, v) => GD.t(k, v), esc = GD.esc;
  const PL = 'pathLength="1"';

  /* ---------- logo ---------- */
  // Questverse mark: a "Q" ring (quest loop) holding three voice bars, a tail ending in a node, and a quest-star.
  const MARK = `<path class="lm-ring" ${PL} d="M40 47.32A20 20 0 1 1 47.32 40" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><path class="lm-bar lm-b1" d="M23.5 26.5v7" fill="none" stroke="var(--blue, #3D7BFF)" stroke-width="4" stroke-linecap="round"/><path class="lm-bar lm-b2" d="M30 21v18" fill="none" stroke="var(--teal, #2EE6C5)" stroke-width="4" stroke-linecap="round"/><path class="lm-bar lm-b3" d="M36.5 25v10" fill="none" stroke="var(--blue, #3D7BFF)" stroke-width="4" stroke-linecap="round"/><path class="lm-tail" ${PL} d="M43 43L51 51" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round"/><circle class="lm-node" cx="55" cy="55" r="4.6" fill="var(--teal, #2EE6C5)"/><circle class="lm-sat" cx="47" cy="13.5" r="3" fill="var(--blue, #3D7BFF)"/>`;
  function logo(o = {}) {
    const s = o.size || 28;
    return `<svg class="logo-mark ${o.cls || ""}" width="${s}" height="${s}" viewBox="0 0 64 64" aria-hidden="true" focusable="false">${o.bg ? '<rect width="64" height="64" rx="14" fill="#070B18"/>' : ""}${MARK}</svg>`;
  }
  function wordmark(brand, o = {}) {
    const letters = Array.from(brand).map((c, i) => `<span class="wm-l" style="--i:${i}">${esc(c)}</span>`).join("");
    return `${logo({ size: o.size || 26, cls: "wm-mark" })}<span class="wm-text" aria-hidden="true">${letters}</span><span class="sr-only">${esc(brand)}</span>`;
  }

  /* ---------- icons ---------- */
  const I = {
    speech: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M8.5 21h7"/>',
    collection: '<ellipse cx="12" cy="6" rx="7" ry="2.5"/><path d="M5 6v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6M5 12v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-6"/>',
    annotation: '<rect x="4" y="5" width="12" height="10" rx="1"/><path d="M8 19h12V9"/><circle cx="4" cy="5" r="1.4"/><circle cx="16" cy="15" r="1.4"/>',
    evaluation: '<path d="M4 16a8 8 0 1 1 16 0"/><path d="M12 16l4-5"/><path d="M4 20h16"/>',
    quality: '<circle cx="12" cy="12" r="8"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
    industry: '<path d="M3 21V10l6 3V9l6 3V5l6 3v13Z"/><path d="M7 17h2M12 17h2M17 17h2"/>',
    localization: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z"/>',
    genai: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8Z"/><path d="M19 16l.7 1.8 1.8.7-1.8.7L19 21l-.7-1.8-1.8-.7 1.8-.7Z"/>',
    datasets: '<path d="M3 20h18M3 4h18"/><rect x="5" y="7" width="3" height="10"/><rect x="10" y="9" width="3" height="8"/><path d="m15.5 8 3 9"/>',
    dataeval: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1M8.5 11l1.5 1.5 3-3M8.5 16h7"/>',
    transcription: '<path d="M3 12h1M6 9v6M9 6v12M12 9v6"/><path d="M15 8h6M15 12h6M15 16h4"/>',
    languages: '<path d="M4 5h10v7H8l-3 3v-3H4Z"/><path d="M14 9h6v7h-1v3l-3-3h-4v-3"/>',
    security: '<rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v2"/>',
    workflow: '<circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="12" cy="18" r="2"/><path d="M7 6h10M6 8l5 8.3M18 8l-5 8.3"/>',
    contributor: '<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="17" cy="9" r="2.4"/><path d="M15.5 14.2A5 5 0 0 1 21 19"/>',
    document: '<path d="M6 3h8l4 4v14H6Z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
    shield: '<path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3Z"/><path d="m9 12 2 2 4-4"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 9h18M3 15h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z"/>',
  };
  const addPL = (svg) => svg.replace(/<(path|rect|circle|ellipse|line|polyline|polygon)(\s)/g, `<$1 ${PL}$2`);
  function icon(name, s = 22, cls = "") {
    return `<svg class="ico draw ${cls}" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${addPL(I[name] || I.quality)}</svg>`;
  }

  /* ---------- spot illustrations (240×180) ---------- */
  function bars(n, x0, w, cy, amp, seed) { let d = ""; for (let i = 0; i < n; i++) { const h = 6 + Math.abs(Math.sin(i * 0.55 + seed) * Math.cos(i * 0.21)) * amp; d += `M${x0 + i * w} ${cy - h}V${cy + h}`; } return d; }
  const S = {
    waveform: () => `<path d="M20 90h200" opacity=".35"/><path class="accent" d="${bars(30, 32, 6, 90, 52, 0.4)}"/><circle cx="120" cy="90" r="70" opacity=".25"/>`,
    bbox: () => `<rect x="20" y="24" width="200" height="132" rx="8" opacity=".4"/><path d="M20 128l60-34 40 22 50-40 50 30" opacity=".35"/><rect class="accent" x="44" y="70" width="64" height="58" rx="2"/><rect x="132" y="48" width="70" height="44" rx="2"/><path class="accent" d="M44 62h34M132 40h28"/><circle cx="44" cy="70" r="3"/><circle cx="108" cy="128" r="3"/>`,
    globe: () => `<circle cx="120" cy="90" r="64"/><ellipse cx="120" cy="90" rx="26" ry="64" opacity=".6"/><ellipse class="accent" cx="120" cy="90" rx="50" ry="64" opacity=".8"/><path d="M58 70h124M58 110h124M56 90h128" opacity=".5"/><path class="accent" d="M72 52c30 18 66 18 96 0"/>`,
    shield: () => `<path d="M120 22 68 40v40c0 32 22 58 52 66 30-8 52-34 52-66V40Z"/><path class="accent" d="m98 86 16 16 30-32"/><circle cx="120" cy="84" r="80" opacity=".18"/><circle cx="120" cy="84" r="62" opacity=".25"/>`,
    scorecards: () => `<rect x="30" y="40" width="56" height="100" rx="8" opacity=".6"/><rect x="92" y="26" width="56" height="114" rx="8"/><rect x="154" y="40" width="56" height="100" rx="8" opacity=".6"/><path class="accent" d="M102 96h30M102 108h22M102 120h34M40 96h26M40 110h18M164 96h30M164 110h22"/><circle class="accent" cx="120" cy="58" r="12"/><path d="m115 58 4 4 7-8"/>`,
    orbit: () => `<circle cx="120" cy="90" r="16" class="accent"/><ellipse cx="120" cy="90" rx="96" ry="34" opacity=".55"/><ellipse cx="120" cy="90" rx="70" ry="60" opacity=".35" transform="rotate(-24 120 90)"/><circle cx="26" cy="92" r="4"/><circle cx="196" cy="70" r="4" class="accent"/><circle cx="150" cy="140" r="4"/><text x="18" y="74" class="glyph">A</text><text x="200" y="58" class="glyph">ع</text><text x="156" y="166" class="glyph">中</text><text x="70" y="40" class="glyph">ह</text>`,
    shelf: () => `<path d="M24 52h192M24 106h192M24 160h192" opacity=".55"/><rect x="40" y="24" width="20" height="28"/><rect x="66" y="16" width="20" height="36" class="accent"/><rect x="92" y="28" width="20" height="24"/><path d="m124 52 10-34 12 4-10 30"/><rect x="40" y="76" width="34" height="30" class="accent"/><rect x="82" y="70" width="20" height="36"/><rect x="150" y="78" width="40" height="28"/><rect x="58" y="128" width="26" height="32"/><rect x="92" y="132" width="60" height="28" class="accent"/>`,
    workflow: () => `<circle cx="40" cy="90" r="14"/><circle class="accent" cx="120" cy="44" r="14"/><circle cx="120" cy="136" r="14"/><circle class="accent" cx="200" cy="90" r="14"/><path d="M54 84c20-24 40-36 52-38M54 96c20 24 40 36 52 38M134 46c24 4 44 20 54 36M134 134c24-4 44-20 54-36" opacity=".7"/><path class="accent" d="M120 58v64" opacity=".5"/>`,
  };
  function spot(name, cls = "") {
    const body = (S[name] || S.workflow)();
    return `<svg class="spot draw ${cls}" viewBox="0 0 240 180" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${addPL(body)}</svg>`;
  }

  /* ---------- interactive demos ---------- */
  const cap = (k) => `<figcaption class="demo__cap"><span class="demo__tag">${esc(t("demo.illustration"))}</span><span>${esc(t(`demo.${k}.d`))}</span></figcaption>`;
  const TRANSCRIPT = [
    ["00:01.2", "S1", "Hi, I'd like to book a table for four, um, around eight?"],
    ["00:04.8", "S2", "Of course. Indoors or on the terrace?"],
    ["00:07.1", "S1", "The terrace, if it's not too cold. [laughs]"],
    ["00:09.6", "S2", "[noise: traffic] Noted — terrace, four guests, eight o'clock."],
  ];
  const ORBIT = ["Hello", "مرحبا", "Bonjour", "Hola", "Hallo", "こんにちは", "你好", "नमस्ते", "Привет", "Olá", "Merhaba", "안녕하세요"];
  function demo(name) {
    if (name === "waveform") return `<figure class="demo demo--wave" data-demo="waveform"><div class="demo__stage"><canvas width="800" height="300" aria-hidden="true"></canvas></div>${cap("waveform")}</figure>`;
    if (name === "annotate") return `<figure class="demo demo--annotate" data-demo="annotate"><div class="demo__stage"><svg viewBox="0 0 400 250" aria-hidden="true">
        <defs><linearGradient id="dg-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a2a63"/><stop offset="1" stop-color="#070b18"/></linearGradient></defs>
        <rect width="400" height="250" rx="12" fill="url(#dg-sky)"/><path d="M0 250 170 140h60l170 110Z" fill="#0a1230"/><path d="M200 142v108" stroke="rgba(234,240,255,.3)" stroke-dasharray="10 10"/>
        <g fill="rgba(61,123,255,.18)"><rect x="20" y="60" width="30" height="80"/><rect x="60" y="40" width="40" height="100"/><rect x="300" y="50" width="34" height="90"/><rect x="345" y="70" width="40" height="70"/></g>
        <g fill="#3d7bff"><rect x="62" y="182" width="86" height="30" rx="9"/><rect x="78" y="166" width="52" height="22" rx="7"/></g>
        <g fill="#9fc1ff"><rect x="236" y="156" width="56" height="20" rx="6"/><rect x="246" y="146" width="34" height="14" rx="5"/></g>
        <g fill="#eaf0ff"><circle cx="338" cy="160" r="6"/><rect x="331" y="168" width="14" height="34" rx="5"/></g>
        <g class="boxes" fill="none" stroke-width="2"><rect ${PL} class="bx" style="--d:0s" x="56" y="160" width="98" height="58" stroke="#2ee6c5"/><rect ${PL} class="bx" style="--d:.6s" x="230" y="140" width="68" height="40" stroke="#3d7bff"/><rect ${PL} class="bx" style="--d:1.2s" x="324" y="148" width="28" height="58" stroke="#eaf0ff"/></g>
        <g class="tags" font-size="10" font-family="inherit" font-weight="600"><g class="tg" style="--d:.5s"><rect x="56" y="146" width="44" height="14" fill="#2ee6c5"/><text x="60" y="156" fill="#070b18">vehicle</text></g><g class="tg" style="--d:1.1s"><rect x="230" y="126" width="44" height="14" fill="#3d7bff"/><text x="234" y="136" fill="#fff">vehicle</text></g><g class="tg" style="--d:1.7s"><rect x="324" y="134" width="40" height="14" fill="#eaf0ff"/><text x="328" y="144" fill="#070b18">person</text></g></g>
        <rect class="scan" x="0" y="0" width="3" height="250" fill="#2ee6c5" opacity=".8"/></svg></div>${cap("annotate")}</figure>`;
    if (name === "typewriter") return `<figure class="demo demo--type" data-demo="typewriter"><div class="demo__stage"><ol class="tw" aria-hidden="true">${TRANSCRIPT.map(([ts, sp]) => `<li><span class="tw__ts">${ts}</span><span class="tw__sp tw__sp--${sp.toLowerCase()}">${sp}</span><span class="tw__tx"></span></li>`).join("")}</ol><p class="sr-only">${esc(TRANSCRIPT.map((l) => `${l[1]} ${l[0]}: ${l[2]}`).join(" "))}</p></div>${cap("typewriter")}</figure>`;
    if (name === "funnel") {
      const st = [1, 2, 3, 4, 5].map((i) => t(`demo.funnel.s${i}`));
      return `<figure class="demo demo--funnel" data-demo="funnel"><div class="demo__stage"><svg viewBox="0 0 400 260" aria-hidden="true"><g class="fn-stages">${st.map((s, i) => { const w = 360 - i * 56, x = (400 - w) / 2, y = 14 + i * 48; return `<rect x="${x}" y="${y}" width="${w}" height="38" rx="10" class="fn-st" style="--i:${i}"/><text x="200" y="${y + 24}" text-anchor="middle" class="fn-tx">${esc(s)}</text>`; }).join("")}</g><g class="fn-dots"></g></svg></div>${cap("funnel")}</figure>`;
    }
    if (name === "orbit") return `<figure class="demo demo--orbit" data-demo="orbit"><div class="demo__stage"><div class="orb" aria-hidden="true"><span class="orb__core">${icon("languages", 34)}</span>${[0, 1, 2].map((r) => `<div class="orb__ring orb__ring--${r}">${ORBIT.slice(r * 4, r * 4 + 4).map((w, i) => `<span class="orb__w" style="--a:${i * 90 + r * 30}deg"><b><i>${esc(w)}</i></b></span>`).join("")}</div>`).join("")}</div></div>${cap("orbit")}</figure>`;
    return "";
  }

  /* demo behaviours — each returns a cleanup fn; heavy loops run only while visible */
  function visible(el, cb) {
    if (!("IntersectionObserver" in window)) { cb(true); return () => {}; }
    const io = new IntersectionObserver((es) => es.forEach((e) => cb(e.isIntersecting)), { threshold: 0.15 });
    io.observe(el); return () => io.disconnect();
  }
  const INIT = {
    waveform(el) {
      const c = el.querySelector("canvas"), g = c.getContext("2d"); let raf = 0, on = false, px = 0.5, py = 0.5, energy = 0.2, lastY = window.scrollY, tt = 0;
      const css = getComputedStyle(document.documentElement);
      const blue = css.getPropertyValue("--blue").trim() || "#3d7bff", teal = css.getPropertyValue("--teal").trim() || "#2ee6c5";
      const move = (e) => { const r = c.getBoundingClientRect(); px = (e.clientX - r.left) / r.width; py = (e.clientY - r.top) / r.height; energy = Math.min(1, energy + 0.08); };
      const scroll = () => { energy = Math.min(1, energy + Math.abs(window.scrollY - lastY) / 600); lastY = window.scrollY; };
      const draw = () => {
        tt += 0.016; energy += (0.18 - energy) * 0.02;
        const w = c.width, h = c.height, n = 96, bw = w / n; g.clearRect(0, 0, w, h);
        const grad = g.createLinearGradient(0, 0, w, 0); grad.addColorStop(0, blue); grad.addColorStop(1, teal); g.fillStyle = grad;
        for (let i = 0; i < n; i++) {
          const x = i / n, near = Math.exp(-Math.pow((x - px) * 6, 2));
          const a = (0.15 + energy * 0.6 + near * (1 - py) * 0.8) * Math.abs(Math.sin(i * 0.45 + tt * 3) * Math.cos(i * 0.13 - tt * 1.7));
          const bh = Math.max(3, a * h * 0.9); g.globalAlpha = 0.35 + near * 0.65;
          g.fillRect(i * bw + bw * 0.2, (h - bh) / 2, bw * 0.6, bh);
        }
        g.globalAlpha = 1; if (on && !GD.reduced) raf = requestAnimationFrame(draw);
      };
      c.addEventListener("pointermove", move); window.addEventListener("scroll", scroll, { passive: true });
      const stop = visible(el, (v) => { on = v; cancelAnimationFrame(raf); if (v) draw(); });
      draw();
      return () => { stop(); cancelAnimationFrame(raf); window.removeEventListener("scroll", scroll); };
    },
    annotate(el) {
      let timer = 0;
      const stop = visible(el, (v) => {
        clearInterval(timer); el.classList.toggle("is-on", v);
        if (v && !GD.reduced) timer = setInterval(() => { el.classList.remove("is-on"); void el.offsetWidth; el.classList.add("is-on"); }, 6500);
      });
      return () => { stop(); clearInterval(timer); };
    },
    typewriter(el) {
      const rows = Array.from(el.querySelectorAll(".tw__tx")); let tm = 0, alive = true, running = false;
      const run = () => {
        if (running) return; running = true; rows.forEach((r) => { r.textContent = ""; r.parentElement.classList.remove("is-on"); });
        let li = 0, ci = 0;
        const step = () => {
          if (!alive) return;
          if (li >= rows.length) { tm = setTimeout(() => { running = false; run(); }, 2600); return; }
          const full = TRANSCRIPT[li][2]; rows[li].parentElement.classList.add("is-on");
          if (GD.reduced) { rows[li].textContent = full; li++; return step(); }
          ci++; rows[li].textContent = full.slice(0, ci);
          if (ci >= full.length) { li++; ci = 0; tm = setTimeout(step, 520); } else tm = setTimeout(step, 22 + Math.random() * 40);
        };
        step();
      };
      const stop = visible(el, (v) => { if (v) run(); });
      return () => { alive = false; stop(); clearTimeout(tm); };
    },
    funnel(el) {
      const host = el.querySelector(".fn-dots"), NS = "http://www.w3.org/2000/svg"; let raf = 0, on = false; const dots = [];
      const widthAt = (y) => { const i = Math.min(4, Math.max(0, Math.floor((y - 14) / 48))); return (360 - i * 56) / 2 - 14; };
      const spawn = () => { const c = document.createElementNS(NS, "circle"); c.setAttribute("r", "3.2"); host.appendChild(c); const w = widthAt(20); dots.push({ c, x: 200 + (Math.random() * 2 - 1) * w, y: 8, vx: 0, out: false, life: 1 }); };
      const tick = () => {
        if (dots.length < 46 && Math.random() < 0.35) spawn();
        for (let i = dots.length - 1; i >= 0; i--) {
          const d = dots[i];
          if (!d.out) {
            d.y += 0.9; const w = widthAt(d.y);
            if (Math.abs(d.x - 200) > w) { if (Math.random() < 0.012) { d.out = true; d.vx = d.x > 200 ? 1.6 : -1.6; d.c.classList.add("is-out"); } else d.x += (200 - d.x) * 0.06; }
          } else { d.x += d.vx; d.life -= 0.02; d.y += 0.3; }
          d.c.setAttribute("cx", d.x.toFixed(1)); d.c.setAttribute("cy", d.y.toFixed(1)); d.c.style.opacity = d.life;
          if (d.y > 252 || d.life <= 0) { d.c.remove(); dots.splice(i, 1); }
        }
        if (on) raf = requestAnimationFrame(tick);
      };
      if (GD.reduced) { for (let i = 0; i < 18; i++) { spawn(); const d = dots[i]; d.y = 20 + i * 12; d.x = 200 + (Math.random() * 2 - 1) * widthAt(d.y); d.c.setAttribute("cx", d.x); d.c.setAttribute("cy", d.y); } return () => {}; }
      const stop = visible(el, (v) => { on = v; cancelAnimationFrame(raf); if (v) tick(); });
      return () => { stop(); cancelAnimationFrame(raf); };
    },
    orbit(el) { const stop = visible(el, (v) => el.classList.toggle("is-on", v)); return stop; },
  };
  function initDemos(root) {
    return Array.from(root.querySelectorAll("[data-demo]")).map((el) => (INIT[el.dataset.demo] ? INIT[el.dataset.demo](el) : null)).filter(Boolean);
  }
  /* stroke-draw when visible */
  function observeDraw(root) {
    const els = Array.from(root.querySelectorAll(".draw"));
    if (GD.reduced || !("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("is-drawn")); return () => {}; }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-drawn"); io.unobserve(e.target); } }), { threshold: 0.2 });
    els.forEach((e) => io.observe(e)); return () => io.disconnect();
  }

  window.ILLO = { logo, wordmark, icon, spot, demo, initDemos, observeDraw, ICONS: Object.keys(I), SPOTS: Object.keys(S), DEMOS: Object.keys(INIT), MARK };
})();
