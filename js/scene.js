/* =====================================================================
   Questverse — 3D WORLD (three.js r128)
   One fixed canvas. Procedural scenes are built lazily the first time
   they become visible and disposed when a page no longer uses them.
   All per-frame state lives in World.W, which the master GSAP timeline
   (js/app.js) tweens: camera, look target, fog, light, background, alphas.
   ===================================================================== */
(function () {
  "use strict";
  const T = window.THREE;
  const World = { supported: false, W: null };
  window.World = World;
  if (!T) return;

  const C = { ink: 0x070b18, navy: 0x0c1430, mist: 0xeaf0ff, blue: 0x3d7bff, teal: 0x2ee6c5, sky: 0x9fc1ff };
  const ADD = T.AdditiveBlending;
  const TAU = Math.PI * 2;

  /* Scene anchors along the journey (forward = -z). Services share one stage. */
  const ANCHOR = {
    portal: 0, lost: 0, light: -12, trio: -21, flow: -30,
    mic: -50, cubes: -50, bbox: -50, score: -50, qa: -50, grid: -50, loc: -50, core: -50, shelf: -50, evalx: -50, transcript: -50,
    network: -70, presence: -79, ambient: -88,
  };
  World.ANCHOR = ANCHOR;

  const hex = (h) => { const c = new T.Color(h); return { r: c.r, g: c.g, b: c.b }; };
  World.TONES = {
    ink:   { bg: hex(C.ink),     fog: hex(C.ink),     light: hex(C.blue),  fogD: 0.034 },
    navy:  { bg: hex(C.navy),    fog: hex(C.navy),    light: hex(C.teal),  fogD: 0.03 },
    deep:  { bg: hex(0x05070f),  fog: hex(0x05070f),  light: hex(C.sky),   fogD: 0.04 },
    light: { bg: hex(C.mist),    fog: hex(C.mist),    light: hex(0xffffff), fogD: 0.028 },
  };

  const W = {
    bg: { ...World.TONES.ink.bg }, fog: { ...World.TONES.ink.fog }, light: { ...World.TONES.ink.light }, fogD: 0.034,
    cam: { x: 0, y: 0, z: 10 }, look: { x: 0, y: 0, z: -7 }, flow: 0, focus: -1, a: {},
  };
  Object.keys(ANCHOR).forEach((k) => (W.a[k] = 0));
  World.W = W;

  let renderer, scene, camera, hemi, key, point, canvasEl;
  let low = false, reduced = false, portrait = false, running = false, last = 0, time = 0, dir = 1, tier = 0, forcedLow = false;
  const HEAVY_LIMIT = 2, LIGHTWEIGHT = { ambient: 1, light: 1 }, lastVis = {};
  let fpsAcc = 0, fpsN = 0, warm = 0;
  const pointer = { x: 0, y: 0, sx: 0, sy: 0 };
  const stages = {};
  const tmpColor = new T.Color();

  /* ---------- shared textures ---------- */
  const TEX = {};
  function canvasTex(w, h, draw) {
    const c = document.createElement("canvas"); c.width = w; c.height = h;
    draw(c.getContext("2d"), w, h);
    const t = new T.CanvasTexture(c); t.anisotropy = 4; return t;
  }
  function radial(stops) {
    return canvasTex(128, 128, (g) => {
      const r = g.createRadialGradient(64, 64, 0, 64, 64, 64);
      stops.forEach(([o, a]) => r.addColorStop(o, `rgba(255,255,255,${a})`));
      g.fillStyle = r; g.fillRect(0, 0, 128, 128);
    });
  }
  const glowTex = () => TEX.glow || (TEX.glow = radial([[0, 1], [0.22, 0.5], [0.55, 0.12], [1, 0]]));
  const dotTex = () => TEX.dot || (TEX.dot = radial([[0, 1], [0.45, 0.95], [0.7, 0.25], [1, 0]]));
  const ringTex = () => TEX.ring || (TEX.ring = radial([[0, 0], [0.55, 0], [0.66, 0.65], [0.7, 1], [0.76, 0.4], [0.9, 0.06], [1, 0]]));
  function roundRect(g, x, y, w, h, r) {
    g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r);
    g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath();
  }
  function glyphTex(ch) {
    return canvasTex(128, 128, (g) => {
      g.fillStyle = "#fff"; g.textAlign = "center"; g.textBaseline = "middle";
      g.font = '600 78px "Instrument Sans", "Noto Sans", "Segoe UI", system-ui, sans-serif';
      g.shadowColor = "rgba(160,200,255,.9)"; g.shadowBlur = 14; g.fillText(ch, 64, 68);
    });
  }
  const GLYPHS = ["A", "ع", "あ", "中", "Ж", "ह", "한", "ñ", "ß", "Ω", "ת", "ก", "ç", "ü", "Я", "語", "ک", "é"];

  /* ---------- geometry helpers ---------- */
  function fib(n, r) {
    const out = [], g = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2, rr = Math.sqrt(1 - y * y), th = g * i;
      out.push(new T.Vector3(Math.cos(th) * rr * r, y * r, Math.sin(th) * rr * r));
    }
    return out;
  }
  function pointsGeo(vs) { const g = new T.BufferGeometry().setFromPoints(vs); return g; }
  function latLong(r, lats, longs, seg = 96) {
    const p = [];
    for (let i = 1; i < lats; i++) {
      const la = -Math.PI / 2 + (i / lats) * Math.PI, y = Math.sin(la) * r, rr = Math.cos(la) * r;
      for (let s = 0; s < seg; s++) {
        const a0 = (s / seg) * TAU, a1 = ((s + 1) / seg) * TAU;
        p.push(new T.Vector3(Math.cos(a0) * rr, y, Math.sin(a0) * rr), new T.Vector3(Math.cos(a1) * rr, y, Math.sin(a1) * rr));
      }
    }
    for (let j = 0; j < longs; j++) {
      const lo = (j / longs) * Math.PI;
      for (let s = 0; s < seg; s++) {
        const a0 = (s / seg) * TAU, a1 = ((s + 1) / seg) * TAU;
        const v0 = new T.Vector3(Math.cos(a0) * r, Math.sin(a0) * r, 0).applyAxisAngle(new T.Vector3(0, 1, 0), lo);
        const v1 = new T.Vector3(Math.cos(a1) * r, Math.sin(a1) * r, 0).applyAxisAngle(new T.Vector3(0, 1, 0), lo);
        p.push(v0, v1);
      }
    }
    return pointsGeo(p);
  }
  function ll2v(lat, lon, r) {
    const phi = ((90 - lat) * Math.PI) / 180, th = ((lon + 180) * Math.PI) / 180;
    return new T.Vector3(-r * Math.sin(phi) * Math.cos(th), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(th));
  }
  function arcCurve(a, b, lift) {
    const mid = a.clone().add(b).multiplyScalar(0.5); const len = mid.length() || 1;
    mid.multiplyScalar((a.length() * lift) / len);
    return new T.QuadraticBezierCurve3(a, mid, b);
  }
  const rand = (a, b) => a + Math.random() * (b - a);

  /* ---------- stage base ---------- */
  function Stage(name) {
    const s = {
      name, group: new T.Group(), mats: [], trash: [], alpha: 0, low,
      m(mat, base) { mat.transparent = true; s.mats.push([mat, base == null ? mat.opacity : base]); s.trash.push(mat); return mat; },
      g(geo) { s.trash.push(geo); return geo; },
      t(tex) { s.trash.push(tex); return tex; },
      update() {},
    };
    s.group.position.z = ANCHOR[name];
    return s;
  }
  const basic = (color, extra = {}) => new T.MeshBasicMaterial({ color, blending: ADD, depthWrite: false, ...extra });
  const lineMat = (color, extra = {}) => new T.LineBasicMaterial({ color, blending: ADD, depthWrite: false, ...extra });
  const ptsMat = (color, size, extra = {}) => new T.PointsMaterial({ color, size, map: dotTex(), blending: ADD, depthWrite: false, sizeAttenuation: true, ...extra });
  const sprite = (s, color, scale, base, map = glowTex(), blending = ADD) => {
    const sp = new T.Sprite(s.m(new T.SpriteMaterial({ map, color, blending, depthWrite: false }), base));
    sp.scale.set(scale, scale, 1); return sp;
  };
  function occluder(s, r, tint = 0.16) {
    const m = s.m(new T.MeshBasicMaterial({ color: C.ink, depthWrite: true }), 1);
    const o = new T.Mesh(s.g(new T.SphereGeometry(r, 40, 28)), m); o.renderOrder = -1;
    o.userData.follow = m; o.userData.tint = tint; return o;
  }

  const BLUE = new T.Color(0x1b2c66);
  function tintOcc(o) { o.userData.follow.color.setRGB(W.bg.r, W.bg.g, W.bg.b).lerp(BLUE, o.userData.tint); }
  const B = {};

  /* 1 — PORTAL: data globe seen through a ring, glyphs + waveforms orbiting */
  B.portal = (s) => {
    const G = s.group;
    const portal = new T.Group(); G.add(portal);
    portal.add(new T.Mesh(s.g(new T.TorusGeometry(3.2, 0.02, 10, 220)), s.m(basic(C.mist), 0.95)));
    portal.add(new T.Mesh(s.g(new T.TorusGeometry(3.36, 0.007, 6, 220)), s.m(basic(C.teal), 0.7)));
    const halo = new T.Mesh(s.g(new T.PlaneGeometry(10.5, 10.5)), s.m(basic(C.blue, { map: ringTex() }), 0.6));
    portal.add(halo);
    const dashes = new T.InstancedMesh(s.g(new T.BoxGeometry(0.018, 0.15, 0.018)), s.m(basic(C.sky), 0.75), 144);
    const d = new T.Object3D();
    for (let i = 0; i < 144; i++) {
      const a = (i / 144) * TAU; d.position.set(Math.cos(a) * 3.64, Math.sin(a) * 3.64, 0); d.rotation.set(0, 0, a + Math.PI / 2);
      d.scale.set(1, i % 6 === 0 ? 2.4 : 1, 1); d.updateMatrix(); dashes.setMatrixAt(i, d.matrix);
    }
    portal.add(dashes);

    const globe = new T.Group(); globe.position.z = -7; G.add(globe);
    const spin = new T.Group(); globe.add(spin); spin.rotation.z = 0.32;
    const occ = occluder(s, 2.36); spin.add(occ);
    spin.add(new T.Points(s.g(pointsGeo(fib(low ? 1500 : 2800, 2.4))), s.m(ptsMat(C.mist, 0.05), 0.9)));
    spin.add(new T.LineSegments(s.g(latLong(2.42, 9, 8)), s.m(lineMat(C.blue), 0.28)));
    const atm = sprite(s, C.teal, 8.4, 0.32); atm.position.z = -0.6; globe.add(atm);
    const core = sprite(s, C.blue, 5.2, 0.4); globe.add(core);

    const waves = [];
    [[3.0, 0.5, 0.2, 6, 0.9], [3.35, -0.35, 0.6, 9, -0.7], [3.75, 0.15, -0.5, 4, 0.5]].forEach(([r, tx, tz, k, sp], i) => {
      const n = 240, geo = s.g(new T.BufferGeometry());
      geo.setAttribute("position", new T.BufferAttribute(new Float32Array(n * 3), 3));
      const line = new T.LineLoop(geo, s.m(lineMat(i === 1 ? C.teal : C.sky), 0.55));
      const holder = new T.Group(); holder.rotation.set(Math.PI / 2 + tx, 0, tz); holder.add(line); globe.add(holder);
      waves.push({ geo, n, r, k, sp });
    });

    const glyphs = [];
    GLYPHS.slice(0, low ? 10 : 16).forEach((ch, i) => {
      const pivot = new T.Group(); pivot.rotation.set(rand(-0.9, 0.9), rand(0, TAU), rand(-0.6, 0.6));
      const sp = new T.Sprite(s.m(new T.SpriteMaterial({ map: s.t(glyphTex(ch)), color: i % 3 ? C.mist : C.teal, blending: ADD, depthWrite: false }), 0.9));
      const r = rand(3.1, 4.4); sp.position.set(r, rand(-0.3, 0.3), 0); sp.scale.setScalar(rand(0.42, 0.62));
      pivot.add(sp); globe.add(pivot); glyphs.push({ pivot, sp: rand(0.08, 0.22) * (i % 2 ? 1 : -1) });
    });

    const nodes = [];
    for (let i = 0; i < (low ? 200 : 420); i++) {
      const v = new T.Vector3().randomDirection ? new T.Vector3().randomDirection() : new T.Vector3(rand(-1, 1), rand(-1, 1), rand(-1, 1)).normalize();
      nodes.push(v.multiplyScalar(rand(2.8, 4.6)));
    }
    const nodePts = new T.Points(s.g(pointsGeo(nodes)), s.m(ptsMat(C.teal, 0.045), 0.7)); globe.add(nodePts);

    const stars = [];
    for (let i = 0; i < (low ? 700 : 1400); i++) stars.push(new T.Vector3(rand(-34, 34), rand(-20, 20), rand(-40, 14)));
    G.add(new T.Points(s.g(pointsGeo(stars)), s.m(ptsMat(C.sky, 0.06), 0.35)));

    s.update = (t, dt) => {
      portal.rotation.z += dt * 0.03; dashes.rotation.z -= dt * 0.05;
      spin.rotation.y += dt * 0.07; nodePts.rotation.y -= dt * 0.03;
      halo.material.opacity = (0.5 + Math.sin(t * 0.8) * 0.1) * s.alpha;
      tintOcc(occ);
      waves.forEach((w, wi) => {
        const p = w.geo.attributes.position.array;
        for (let i = 0; i < w.n; i++) {
          const a = (i / w.n) * TAU, env = Math.pow(Math.sin(a * 0.5 + t * 0.2 * (wi + 1)), 2);
          const rr = w.r + Math.sin(a * w.k * 4 + t * 3 * w.sp) * 0.12 * env + Math.sin(a * w.k + t) * 0.05;
          p[i * 3] = Math.cos(a) * rr; p[i * 3 + 1] = Math.sin(a) * rr; p[i * 3 + 2] = 0;
        }
        w.geo.attributes.position.needsUpdate = true;
      });
      glyphs.forEach((g) => (g.pivot.rotation.y += dt * g.sp));
    };
    /* shader glow: fresnel atmosphere + glowing arcs between language nodes */
    const atmo = new T.Mesh(s.g(new T.SphereGeometry(2.62, 48, 32)), s.m(fresnelMat(C.teal, 2.2), 0.9)); spin.add(atmo);
    const nodesOnGlobe = fib(64, 2.42), arcMats = [];
    for (let i = 0; i < (low ? 6 : 12); i++) {
      const a = nodesOnGlobe[(i * 7) % 64], b = nodesOnGlobe[(i * 19 + 11) % 64], curve = arcCurve(a, b, 1.38);
      const mat = s.m(arcMat(i % 2 ? C.blue : C.sky, C.teal, i / 12), 1); arcMats.push(mat);
      spin.add(new T.Mesh(s.g(new T.TubeGeometry(curve, 64, 0.011, 6, false)), mat));
      [a, b].forEach((p) => { const e = sprite(s, C.teal, 0.2, 0.9, dotTex()); e.position.copy(p); spin.add(e); });
    }
    const baseUpdate = s.update;
    s.update = (t, dt) => { baseUpdate(t, dt); arcMats.forEach(syncShader); syncShader(atmo.material); };
  };

  /* 2 — LIGHT: what you find on the other side of the portal */
  B.light = (s) => {
    const G = s.group, vs = [], cols = [];
    const pal = [new T.Color(C.blue), new T.Color(C.teal), new T.Color(0x6b8fe0), new T.Color(C.navy)];
    for (let i = 0; i < (low ? 700 : 1500); i++) {
      vs.push(new T.Vector3(rand(-15, 15), rand(-9, 9), rand(-22, 12)));
      const c = pal[i % 4]; cols.push(c.r, c.g, c.b);
    }
    const geo = s.g(pointsGeo(vs)); geo.setAttribute("color", new T.Float32BufferAttribute(cols, 3));
    const pts = new T.Points(geo, s.m(new T.PointsMaterial({ size: 0.07, map: dotTex(), vertexColors: true, depthWrite: false, sizeAttenuation: true }), 0.6));
    G.add(pts);
    const orbs = [];
    [[C.blue, 11, -4, 2, -6], [C.teal, 9, 5, -2, -9], [0x7aa2ff, 13, 0, 4, -16], [C.teal, 7, -6, -4, -2]].forEach(([c, sc, x, y, z]) => {
      const o = sprite(s, c, sc, 0.22, glowTex(), T.NormalBlending); o.position.set(x, y, z); G.add(o); orbs.push(o);
    });
    const ribbons = [];
    for (let i = 0; i < 4; i++) {
      const pts2 = []; for (let k = 0; k < 7; k++) pts2.push(new T.Vector3(-16 + k * 5.3, rand(-3, 3), rand(-14, 2)));
      const curve = new T.CatmullRomCurve3(pts2);
      const l = new T.Line(s.g(pointsGeo(curve.getPoints(160))), s.m(new T.LineBasicMaterial({ color: i % 2 ? C.blue : C.teal, depthWrite: false }), 0.4));
      G.add(l); ribbons.push(l);
    }
    s.update = (t, dt) => {
      pts.rotation.y += dt * 0.012; pts.position.y = Math.sin(t * 0.2) * 0.4;
      orbs.forEach((o, i) => (o.position.y += Math.sin(t * 0.3 + i) * 0.002));
      ribbons.forEach((r, i) => { r.rotation.x = Math.sin(t * 0.15 + i) * 0.08; r.position.y = Math.sin(t * 0.25 + i * 2) * 0.5; });
    };
  };

  /* 3 — FLOW: three glass panels joined by glowing lines */
  B.flow = (s) => {
    const G = s.group, X = [-3.4, 0, 3.4], panels = [];
    const glassGeo = s.g(new T.BoxGeometry(2.3, 3.1, 0.06)), edgeGeo = s.g(new T.EdgesGeometry(glassGeo));
    X.forEach((x, i) => {
      const p = new T.Group(); p.position.x = x; G.add(p);
      const glass = new T.Mesh(glassGeo, s.m(new T.MeshStandardMaterial({ color: 0x7f9cff, metalness: 0.2, roughness: 0.15, emissive: C.navy, depthWrite: false }), 0.16));
      const edges = new T.LineSegments(edgeGeo, s.m(lineMat(C.mist), 0.5));
      const glow = sprite(s, C.teal, 5, 0); glow.position.z = -0.4;
      const icon = [];
      if (i === 0) { for (let r = 0; r < 4; r++) { const y = 0.8 - r * 0.5; icon.push([-0.7, y, 0.75, y], [-0.85, y - 0.08, -0.85, y + 0.08]); } }
      if (i === 1) { for (let k = 0; k < 28; k++) { const x0 = -0.8 + k * 0.06, h = Math.abs(Math.sin(k * 0.7)) * 0.5 + 0.05; icon.push([x0, -h, x0, h]); } }
      if (i === 2) { const n = 48; for (let k = 0; k < n; k++) { const a0 = (k / n) * TAU, a1 = ((k + 1) / n) * TAU; icon.push([Math.cos(a0) * 0.7, Math.sin(a0) * 0.7, Math.cos(a1) * 0.7, Math.sin(a1) * 0.7]); } icon.push([-0.32, 0, -0.08, -0.26], [-0.08, -0.26, 0.36, 0.26]); }
      const ip = []; icon.forEach(([a, b, c, d2]) => ip.push(new T.Vector3(a, b, 0.05), new T.Vector3(c, d2, 0.05)));
      const iconLines = new T.LineSegments(s.g(pointsGeo(ip)), s.m(lineMat(C.sky), 0.7));
      p.add(glow, glass, edges, iconLines);
      panels.push({ p, edges, glow, iconLines, glass });
    });
    const pulses = [];
    for (let i = 0; i < 2; i++) {
      const a = new T.Vector3(X[i] + 1.2, 0, 0), b = new T.Vector3(X[i + 1] - 1.2, 0, 0);
      const curve = new T.QuadraticBezierCurve3(a, new T.Vector3((a.x + b.x) / 2, 0.55, 0.9), b);
      G.add(new T.Mesh(s.g(new T.TubeGeometry(curve, 48, 0.012, 6, false)), s.m(basic(C.blue), 0.7)));
      for (let k = 0; k < 4; k++) { const sp = sprite(s, C.teal, 0.42, 0.9); G.add(sp); pulses.push({ sp, curve, off: k / 4 }); }
    }
    const grid = []; for (let k = -12; k <= 12; k++) { grid.push(new T.Vector3(k, -2.3, -8), new T.Vector3(k, -2.3, 6), new T.Vector3(-12, -2.3, k * 0.6 - 1), new T.Vector3(12, -2.3, k * 0.6 - 1)); }
    G.add(new T.LineSegments(s.g(pointsGeo(grid)), s.m(lineMat(C.blue), 0.12)));
    const teal = new T.Color(C.teal), mist = new T.Color(C.mist);
    s.update = (t) => {
      panels.forEach((o, i) => {
        const k = Math.max(0, 1 - Math.abs(W.flow - i));
        o.edges.material.opacity = (0.3 + 0.65 * k) * s.alpha;
        o.edges.material.color.copy(mist).lerp(teal, k);
        o.glow.material.opacity = 0.55 * k * s.alpha;
        o.iconLines.material.opacity = (0.35 + 0.6 * k) * s.alpha;
        o.glass.material.opacity = (0.1 + 0.14 * k) * s.alpha;
        o.p.position.y = Math.sin(t * 0.6 + i) * 0.08 + k * 0.15;
        o.p.rotation.y = Math.sin(t * 0.3 + i) * 0.06;
        o.p.scale.setScalar(1 + 0.05 * k);
      });
      pulses.forEach((q) => { const u = (t * 0.22 + q.off) % 1; q.sp.position.copy(q.curve.getPoint(u)); q.sp.material.opacity = Math.sin(u * Math.PI) * 0.9 * s.alpha; });
    };
  };

  /* 4a — MIC: microphone wrapped in a live waveform ring */
  B.mic = (s) => {
    const G = s.group, mic = new T.Group(); G.add(mic);
    const metal = s.m(new T.MeshStandardMaterial({ color: 0x1c2a5c, metalness: 0.85, roughness: 0.32, emissive: 0x050a1c }), 1);
    const head = new T.Mesh(s.g(new T.SphereGeometry(0.72, 32, 24)), metal); head.position.y = 0.95;
    const grille = new T.LineSegments(s.g(new T.WireframeGeometry(new T.SphereGeometry(0.75, 20, 14))), s.m(lineMat(C.mist), 0.32)); grille.position.y = 0.95;
    const body = new T.Mesh(s.g(new T.CylinderGeometry(0.44, 0.3, 1.5, 40)), metal); body.position.y = -0.15;
    const band = new T.Mesh(s.g(new T.TorusGeometry(0.47, 0.035, 10, 60)), s.m(basic(C.teal), 1)); band.rotation.x = Math.PI / 2; band.position.y = 0.42;
    const yoke = new T.Mesh(s.g(new T.TorusGeometry(0.95, 0.035, 10, 60, Math.PI)), metal); yoke.rotation.z = Math.PI; yoke.position.y = 0.25;
    const pole = new T.Mesh(s.g(new T.CylinderGeometry(0.05, 0.05, 1.4, 12)), metal); pole.position.y = -1.4;
    const base = new T.Mesh(s.g(new T.CylinderGeometry(0.7, 0.8, 0.1, 40)), metal); base.position.y = -2.1;
    const glow = sprite(s, C.blue, 4.2, 0.45); glow.position.set(0, 0.9, -0.6);
    mic.add(glow, head, grille, body, band, yoke, pole, base);
    const N = low ? 72 : 120, ring = new T.Group(); ring.rotation.x = -0.32; G.add(ring);
    const bars = new T.InstancedMesh(s.g(new T.BoxGeometry(0.05, 1, 0.05)), s.m(basic(0xffffff), 0.9), N);
    const c = new T.Color(), cb = new T.Color(C.blue), ct = new T.Color(C.teal);
    for (let i = 0; i < N; i++) bars.setColorAt(i, c.copy(cb).lerp(ct, (Math.sin((i / N) * TAU) + 1) / 2));
    ring.add(bars);
    const circ = []; for (let k = 0; k <= 128; k++) { const a = (k / 128) * TAU; circ.push(new T.Vector3(Math.cos(a) * 2.35, 0, Math.sin(a) * 2.35)); }
    ring.add(new T.Line(s.g(pointsGeo(circ)), s.m(lineMat(C.teal), 0.4)));
    const d = new T.Object3D();
    s.update = (t, dt) => {
      mic.rotation.y = Math.sin(t * 0.35) * 0.45; mic.position.y = Math.sin(t * 0.7) * 0.06;
      ring.rotation.y += dt * 0.12;
      for (let i = 0; i < N; i++) {
        const a = (i / N) * TAU, h = 0.1 + Math.abs(Math.sin(i * 0.33 + t * 2.1) * Math.cos(i * 0.12 - t * 1.25)) * 0.95;
        d.position.set(Math.cos(a) * 2.35, 0, Math.sin(a) * 2.35); d.rotation.set(0, -a, 0); d.scale.set(1, h, 1); d.updateMatrix(); bars.setMatrixAt(i, d.matrix);
      }
      bars.instanceMatrix.needsUpdate = true;
    };
  };

  /* 4b — CUBES: data cubes spiralling into a central dataset */
  B.cubes = (s) => {
    const G = s.group, N = low ? 90 : 180;
    const core = new T.LineSegments(s.g(new T.EdgesGeometry(new T.BoxGeometry(1.3, 1.3, 1.3))), s.m(lineMat(C.mist), 0.8));
    const inner = new T.Mesh(s.g(new T.BoxGeometry(0.8, 0.8, 0.8)), s.m(new T.MeshStandardMaterial({ color: C.blue, emissive: 0x112a77, metalness: 0.4, roughness: 0.3 }), 0.95));
    G.add(sprite(s, C.teal, 5, 0.4), core, inner);
    const cubes = new T.InstancedMesh(s.g(new T.BoxGeometry(0.15, 0.15, 0.15)), s.m(new T.MeshStandardMaterial({ color: 0xffffff, metalness: 0.3, roughness: 0.35, emissive: 0x0a1433 }), 1), N);
    const pal = [C.mist, C.blue, C.teal, C.sky].map((h) => new T.Color(h));
    const rings = [new T.Euler(0.4, 0, 0.2), new T.Euler(-0.5, 0, -0.4), new T.Euler(1.2, 0, 0.6)].map((e) => new T.Matrix4().makeRotationFromEuler(e));
    const data = [];
    for (let i = 0; i < N; i++) { cubes.setColorAt(i, pal[i % 4]); data.push({ ring: i % 3, ph: Math.random(), a0: rand(0, TAU), spin: rand(0.5, 2) }); }
    G.add(cubes);
    const d = new T.Object3D(), v = new T.Vector3();
    s.update = (t, dt) => {
      core.rotation.y += dt * 0.25; core.rotation.x += dt * 0.12; inner.rotation.y -= dt * 0.4; inner.rotation.z += dt * 0.2;
      data.forEach((c, i) => {
        const u = (c.ph + t * 0.045) % 1, r = 4.2 - u * 3.4, a = c.a0 + t * (0.9 / r);
        v.set(Math.cos(a) * r, Math.sin(a * 3) * 0.12, Math.sin(a) * r).applyMatrix4(rings[c.ring]);
        d.position.copy(v); d.rotation.set(t * c.spin, t * c.spin * 0.7, 0); d.scale.setScalar(Math.min(1, (r - 0.8) * 1.2) * (1 - 0.3 * u));
        d.updateMatrix(); cubes.setMatrixAt(i, d.matrix);
      });
      cubes.instanceMatrix.needsUpdate = true;
    };
  };

  /* 4c — BBOX: an annotation plane with boxes, handles, tags and a scanline */
  B.bbox = (s) => {
    const G = s.group, board = new T.Group(); board.rotation.set(-0.16, -0.34, 0.02); G.add(board);
    const tex = s.t(canvasTex(1024, 640, (g, w, h) => {
      const bg = g.createLinearGradient(0, 0, 0, h); bg.addColorStop(0, "#1a2a63"); bg.addColorStop(0.55, "#0f1a3f"); bg.addColorStop(1, "#070b18");
      g.fillStyle = bg; g.fillRect(0, 0, w, h);
      g.fillStyle = "rgba(61,123,255,.18)"; for (let i = 0; i < 14; i++) { const bw = 40 + (i * 37) % 70, bh = 120 + (i * 53) % 180; g.fillRect(i * 76, 360 - bh, bw, bh); }
      g.fillStyle = "rgba(234,240,255,.25)"; for (let i = 0; i < 160; i++) g.fillRect((i * 97) % 1024, 200 + ((i * 31) % 150), 4, 6);
      g.fillStyle = "#0a1230"; g.beginPath(); g.moveTo(0, h); g.lineTo(420, 360); g.lineTo(604, 360); g.lineTo(w, h); g.fill();
      g.strokeStyle = "rgba(234,240,255,.35)"; g.lineWidth = 4; g.setLineDash([28, 26]); g.beginPath(); g.moveTo(512, 362); g.lineTo(512, h); g.stroke(); g.setLineDash([]);
      const car = (x, y, s2, col) => { g.fillStyle = col; roundRect(g, x, y, 170 * s2, 62 * s2, 18 * s2); g.fill(); roundRect(g, x + 32 * s2, y - 34 * s2, 100 * s2, 44 * s2, 14 * s2); g.fill(); g.fillStyle = "#05070f"; [x + 36 * s2, x + 134 * s2].forEach((cx) => { g.beginPath(); g.arc(cx, y + 62 * s2, 18 * s2, 0, TAU); g.fill(); }); };
      car(170, 470, 1.25, "#3d7bff"); car(640, 410, 0.9, "#9fc1ff"); car(470, 380, 0.55, "#2ee6c5");
      const person = (x, y, s2) => { g.fillStyle = "#eaf0ff"; g.beginPath(); g.arc(x, y, 14 * s2, 0, TAU); g.fill(); roundRect(g, x - 16 * s2, y + 18 * s2, 32 * s2, 76 * s2, 12 * s2); g.fill(); };
      person(880, 420, 1.15); person(930, 436, 1);
    }));
    board.add(new T.Mesh(s.g(new T.PlaneGeometry(4.8, 3)), s.m(new T.MeshBasicMaterial({ map: tex, depthWrite: false }), 1)));
    const frame = new T.LineSegments(s.g(new T.EdgesGeometry(new T.PlaneGeometry(4.86, 3.06))), s.m(lineMat(C.mist), 0.45)); board.add(frame);
    const px = (x, y) => [(x / 1024 - 0.5) * 4.8, (0.5 - y / 640) * 3];
    const boxDefs = [[160, 420, 380, 570, C.teal], [626, 370, 800, 470, C.blue], [458, 352, 562, 408, C.teal], [856, 396, 960, 540, C.mist]];
    const unit = s.g(pointsGeo([new T.Vector3(-0.5, -0.5, 0), new T.Vector3(0.5, -0.5, 0), new T.Vector3(0.5, 0.5, 0), new T.Vector3(-0.5, 0.5, 0)]));
    const boxes = boxDefs.map(([x0, y0, x1, y1, col], i) => {
      const [ax, ay] = px(x0, y0), [bx, by] = px(x1, y1), cx = (ax + bx) / 2, cy = (ay + by) / 2, w = Math.abs(bx - ax), h = Math.abs(by - ay);
      const grp = new T.Group(); grp.position.set(cx, cy, 0.02); board.add(grp);
      const rect = new T.LineLoop(unit, s.m(lineMat(col), 1)); rect.scale.set(w, h, 1); grp.add(rect);
      const fill = new T.Mesh(s.g(new T.PlaneGeometry(w, h)), s.m(basic(col), 0.08)); grp.add(fill);
      const handles = [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([sx, sy]) => { const hs = sprite(s, col, 0.12, 1, dotTex()); hs.position.set((sx * w) / 2, (sy * h) / 2, 0.01); grp.add(hs); return hs; });
      const tag = new T.Mesh(s.g(new T.PlaneGeometry(0.46, 0.11)), s.m(basic(col), 0.85)); tag.position.set(-w / 2 + 0.23, h / 2 + 0.08, 0.01); grp.add(tag);
      const parts = []; grp.traverse((ch) => { if (ch.material) { const m = s.mats.find((x) => x[0] === ch.material); if (m) parts.push(m); } });
      return { grp, w, h, i, parts };
    });
    const scan = new T.Mesh(s.g(new T.PlaneGeometry(0.04, 3)), s.m(basic(C.teal), 0.8)); scan.position.z = 0.03; board.add(scan);
    const scanGlow = new T.Mesh(s.g(new T.PlaneGeometry(0.6, 3)), s.m(basic(C.teal, { map: glowTex() }), 0.25)); scanGlow.position.z = 0.025; board.add(scanGlow);
    G.add(sprite(s, C.blue, 9, 0.18));
    s.update = (t) => {
      const cyc = (t % 7) / 7;
      boxes.forEach((b) => {
        const local = Math.min(1, Math.max(0, (cyc - b.i * 0.12) * 5)), e = 1 - Math.pow(1 - local, 3);
        b.grp.visible = local > 0;
        b.grp.scale.set(0.6 + 0.4 * e, 0.6 + 0.4 * e, 1);
        b.parts.forEach(([m, base]) => (m.opacity = base * e * s.alpha));
      });
      const sx = Math.sin(t * 0.45) * 2.3; scan.position.x = sx; scanGlow.position.x = sx;
      board.rotation.y = -0.34 + Math.sin(t * 0.25) * 0.06;
    };
  };

  /* 4d — SCORE / QA: evaluation scorecards; the QA variant adds an inspecting lens */
  function cardTex(seed, qa) {
    return canvasTex(320, 420, (g, w, h) => {
      roundRect(g, 6, 6, w - 12, h - 12, 26); g.fillStyle = qa ? "rgba(14,26,58,.92)" : "rgba(12,20,48,.92)"; g.fill();
      g.strokeStyle = "rgba(234,240,255,.35)"; g.lineWidth = 3; g.stroke();
      g.fillStyle = "rgba(234,240,255,.8)"; roundRect(g, 32, 40, 140, 16, 8); g.fill();
      g.fillStyle = "rgba(234,240,255,.3)"; roundRect(g, 32, 68, 90, 10, 5); g.fill();
      for (let r = 0; r < 5; r++) {
        const y = 140 + r * 52, len = 70 + ((seed * 37 + r * 53) % 150);
        g.fillStyle = "rgba(234,240,255,.14)"; roundRect(g, 32, y, w - 64, 14, 7); g.fill();
        g.fillStyle = r % 2 ? "#2ee6c5" : "#3d7bff"; roundRect(g, 32, y, len, 14, 7); g.fill();
        g.fillStyle = "rgba(234,240,255,.35)"; roundRect(g, 32, y - 18, 60 + ((seed + r) * 17) % 60, 8, 4); g.fill();
      }
    });
  }
  function buildCards(s, qa) {
    const G = s.group, cards = [], ringGeo = s.g(new T.RingGeometry(0.15, 0.2, 64, 1));
    const total = ringGeo.index.count;
    for (let i = 0; i < 5; i++) {
      const c = new T.Group(), k = i - 2; c.position.set(k * 1.02, 0, -Math.abs(k) * 0.6); c.rotation.y = -k * 0.24; G.add(c);
      c.add(new T.Mesh(s.g(new T.PlaneGeometry(1.5, 1.97)), s.m(new T.MeshBasicMaterial({ map: s.t(cardTex(i + 1, qa)), depthWrite: false }), 1)));
      const ringG = ringGeo.clone(); s.g(ringG);
      const ring = new T.Mesh(ringG, s.m(basic(C.teal, { side: T.DoubleSide }), 1)); ring.position.set(0.47, 0.7, 0.01); ring.rotation.z = Math.PI / 2; ring.scale.x = -1; c.add(ring);
      const track = new T.Mesh(ringGeo, s.m(basic(C.mist), 0.15)); track.position.copy(ring.position); c.add(track);
      const tick = new T.LineSegments(s.g(pointsGeo([new T.Vector3(-0.08, 0, 0), new T.Vector3(-0.02, -0.06, 0), new T.Vector3(-0.02, -0.06, 0), new T.Vector3(0.09, 0.07, 0)])), s.m(lineMat(C.teal), 1));
      tick.position.set(0.47, 0.7, 0.02); c.add(tick);
      cards.push({ c, ringG, tick, i });
    }
    G.add(sprite(s, qa ? C.teal : C.blue, 9, 0.2));
    return { cards, total };
  }
  B.score = (s) => {
    const { cards, total } = buildCards(s, false);
    s.update = (t) => cards.forEach((o) => {
      const u = Math.min(1, ((t * 0.18 + o.i * 0.13) % 1) * 1.6);
      o.ringG.setDrawRange(0, Math.floor((total * u) / 3) * 3);
      o.tick.material.opacity = (u >= 1 ? 1 : 0) * s.alpha;
      o.c.position.y = Math.sin(t * 0.8 + o.i * 0.9) * 0.12 + (u >= 1 ? 0.12 : 0);
    });
  };
  B.qa = (s) => {
    const { cards, total } = buildCards(s, true);
    const lens = new T.Group(); lens.position.z = 0.9; s.group.add(lens);
    const metal = s.m(new T.MeshStandardMaterial({ color: 0xc9d6ff, metalness: 0.9, roughness: 0.25 }), 1);
    lens.add(new T.Mesh(s.g(new T.TorusGeometry(0.58, 0.05, 12, 64)), metal));
    lens.add(new T.Mesh(s.g(new T.CircleGeometry(0.56, 48)), s.m(basic(C.teal), 0.12)));
    const handle = new T.Mesh(s.g(new T.CylinderGeometry(0.06, 0.07, 0.9, 16)), metal); handle.position.set(0.62, -0.62, 0); handle.rotation.z = Math.PI / 4; lens.add(handle);
    s.update = (t) => {
      const lx = Math.sin(t * 0.4) * 2.2; lens.position.set(lx, Math.cos(t * 0.8) * 0.25, 0.9);
      cards.forEach((o) => {
        const near = Math.max(0, 1 - Math.abs(lx - o.c.position.x) / 0.9);
        o.ringG.setDrawRange(0, Math.floor((total * Math.min(1, near * 1.4)) / 3) * 3);
        o.tick.material.opacity = (near > 0.6 ? 1 : 0.15) * s.alpha;
        o.c.position.y = Math.sin(t * 0.7 + o.i) * 0.1 + near * 0.18;
      });
    };
  };

  /* 4e — GRID: industry sectors as data towers on a turning disc */
  B.grid = (s) => {
    const G = s.group, disc = new T.Group(); disc.rotation.x = 0.42; G.add(disc);
    const per = low ? 16 : 25, side = Math.sqrt(per), N = per * 4;
    const towers = new T.InstancedMesh(s.g(new T.BoxGeometry(0.2, 1, 0.2)), s.m(new T.MeshStandardMaterial({ color: 0xffffff, metalness: 0.35, roughness: 0.35, emissive: 0x0a1433 }), 1), N);
    const pal = [C.blue, C.teal, C.sky, C.mist].map((h) => new T.Color(h)), info = [];
    for (let q = 0; q < 4; q++) {
      const a = (q / 4) * TAU + Math.PI / 4, cx = Math.cos(a) * 2.1, cz = Math.sin(a) * 2.1;
      for (let i = 0; i < per; i++) { const gx = (i % side) - (side - 1) / 2, gz = Math.floor(i / side) - (side - 1) / 2; info.push({ x: cx + gx * 0.28, z: cz + gz * 0.28, ph: Math.random() * TAU, q }); towers.setColorAt(info.length - 1, pal[q]); }
    }
    disc.add(towers);
    const circ = (r) => { const p = []; for (let k = 0; k <= 128; k++) { const a = (k / 128) * TAU; p.push(new T.Vector3(Math.cos(a) * r, 0, Math.sin(a) * r)); } return pointsGeo(p); };
    disc.add(new T.Line(s.g(circ(3.4)), s.m(lineMat(C.mist), 0.3)), new T.Line(s.g(circ(1.0)), s.m(lineMat(C.teal), 0.6)));
    const spokes = []; for (let q = 0; q < 4; q++) { const a = (q / 4) * TAU + Math.PI / 4; spokes.push(new T.Vector3(Math.cos(a), 0, Math.sin(a)), new T.Vector3(Math.cos(a) * 1.6, 0, Math.sin(a) * 1.6)); }
    disc.add(new T.LineSegments(s.g(pointsGeo(spokes)), s.m(lineMat(C.teal), 0.6)));
    const sweep = new T.Mesh(s.g(new T.RingGeometry(1.05, 3.4, 48, 1, 0, 0.5)), s.m(basic(C.teal, { side: T.DoubleSide }), 0.12)); sweep.rotation.x = -Math.PI / 2; disc.add(sweep);
    disc.add(sprite(s, C.blue, 3.2, 0.5));
    const d = new T.Object3D();
    s.update = (t, dt) => {
      disc.rotation.y += dt * 0.08; sweep.rotation.z -= dt * 0.6;
      info.forEach((o, i) => { const h = 0.25 + (Math.sin(t * 0.9 + o.ph) * 0.5 + 0.5) * 1.1; d.position.set(o.x, h / 2, o.z); d.scale.set(1, h, 1); d.updateMatrix(); towers.setMatrixAt(i, d.matrix); });
      towers.instanceMatrix.needsUpdate = true;
    };
  };

  /* globe helper for loc + network */
  function globeBase(s, r, landOnly) {
    const globe = new T.Group(), spin = new T.Group(); globe.add(spin);
    const occ = occluder(s, r * 0.985); spin.add(occ);
    const atm = sprite(s, C.teal, r * 3.3, 0.28); atm.position.z = -0.4; globe.add(atm);
    if (landOnly) {
      const land = [[50, -100, 22, 34], [-15, -60, 22, 15], [53, 15, 11, 22], [5, 20, 30, 20], [27, 45, 10, 14], [48, 90, 20, 48], [21, 78, 10, 8], [5, 110, 9, 16], [-25, 135, 11, 17], [72, -40, 7, 12], [36, 138, 6, 4], [64, 100, 10, 50]];
      const isLand = (lat, lon) => land.some(([a, b, ra, rb]) => { let dl = lon - b; if (dl > 180) dl -= 360; if (dl < -180) dl += 360; const v = ((lat - a) / ra) ** 2 + (dl / rb) ** 2; return v < 1 + Math.sin(lat * 0.4 + lon * 0.3) * 0.22; });
      const lp = [], op = [];
      fib(low ? 9000 : 18000, r).forEach((v) => { const lat = 90 - (Math.acos(v.y / r) * 180) / Math.PI, lon = ((Math.atan2(v.z, -v.x) * 180) / Math.PI) - 180; const L = lon < -180 ? lon + 360 : lon; (isLand(lat, L) ? lp : op).push(v); });
      spin.add(new T.Points(s.g(pointsGeo(lp)), s.m(ptsMat(C.mist, 0.04), 0.9)));
      spin.add(new T.Points(s.g(pointsGeo(op.filter((_, i) => i % 5 === 0))), s.m(ptsMat(C.blue, 0.03), 0.35)));
    } else {
      spin.add(new T.Points(s.g(pointsGeo(fib(low ? 700 : 1300, r))), s.m(ptsMat(C.mist, 0.04), 0.6)));
      spin.add(new T.LineSegments(s.g(latLong(r * 1.005, 10, 10)), s.m(lineMat(C.blue), 0.3)));
    }
    return { globe, spin, occ };
  }

  /* 4f — LOC: a localization globe with glyphs flying along arcs */
  B.loc = (s) => {
    const { globe, spin, occ } = globeBase(s, 2.1, false); s.group.add(globe); globe.rotation.z = 0.3;
    const arcs = [];
    for (let i = 0; i < (low ? 5 : 8); i++) {
      const a = ll2v(rand(-50, 60), rand(-180, 180), 2.12), b = ll2v(rand(-50, 60), rand(-180, 180), 2.12), curve = arcCurve(a, b, 1.45);
      spin.add(new T.Line(s.g(pointsGeo(curve.getPoints(64))), s.m(lineMat(i % 2 ? C.teal : C.sky), 0.5)));
      [a, b].forEach((p) => { const e = sprite(s, C.teal, 0.22, 1, dotTex()); e.position.copy(p); spin.add(e); });
      const g = new T.Sprite(s.m(new T.SpriteMaterial({ map: s.t(glyphTex(GLYPHS[i])), color: C.mist, blending: ADD, depthWrite: false }), 1)); g.scale.setScalar(0.42); spin.add(g);
      arcs.push({ curve, g, off: Math.random() });
    }
    s.update = (t, dt) => {
      spin.rotation.y += dt * 0.09; tintOcc(occ);
      arcs.forEach((o) => { const u = (t * 0.12 + o.off) % 1; o.g.position.copy(o.curve.getPoint(u)); o.g.material.opacity = Math.sin(u * Math.PI) * s.alpha; });
    };
  };

  /* 4g — CORE: a neural core surrounded by prompt bubbles */
  function bubbleTex(seed) {
    return canvasTex(256, 160, (g) => {
      g.fillStyle = "rgba(14,24,58,.9)"; roundRect(g, 8, 8, 240, 112, 26); g.fill();
      g.beginPath(); g.moveTo(52, 118); g.lineTo(40, 150); g.lineTo(84, 118); g.fill();
      g.strokeStyle = "rgba(46,230,197,.7)"; g.lineWidth = 3; roundRect(g, 8, 8, 240, 112, 26); g.stroke();
      [[30, 36, 150 + (seed * 23) % 60], [30, 62, 120 + (seed * 41) % 70], [30, 88, 70 + (seed * 13) % 60]].forEach(([x, y, w], i) => { g.fillStyle = i ? "rgba(234,240,255,.45)" : "rgba(234,240,255,.85)"; roundRect(g, x, y, w, 12, 6); g.fill(); });
    });
  }
  B.core = (s) => {
    const G = s.group, core = new T.Group(); G.add(core);
    core.add(sprite(s, C.teal, 4.5, 0.5));
    const shell = new T.LineSegments(s.g(new T.EdgesGeometry(new T.IcosahedronGeometry(1.15, 1))), s.m(lineMat(C.sky), 0.7));
    const inner = new T.Mesh(s.g(new T.IcosahedronGeometry(0.72, 0)), s.m(new T.MeshStandardMaterial({ color: C.teal, emissive: 0x0b5a52, metalness: 0.3, roughness: 0.25, flatShading: true }), 0.95));
    core.add(shell, inner);
    const nodes = []; for (let i = 0; i < (low ? 40 : 70); i++) nodes.push(new T.Vector3(rand(-1, 1), rand(-1, 1), rand(-1, 1)).normalize().multiplyScalar(rand(2.1, 3.4)));
    const net = new T.Group(); G.add(net);
    net.add(new T.Points(s.g(pointsGeo(nodes)), s.m(ptsMat(C.mist, 0.08), 0.9)));
    const syn = []; nodes.forEach((n, i) => { syn.push(n, i % 3 ? nodes[(i * 7) % nodes.length] : new T.Vector3()); });
    const synLines = new T.LineSegments(s.g(pointsGeo(syn)), s.m(lineMat(C.blue), 0.25)); net.add(synLines);
    const bubbles = [];
    for (let i = 0; i < (low ? 4 : 6); i++) {
      const pivot = new T.Group(); pivot.rotation.set(rand(-0.5, 0.5), (i / 6) * TAU, rand(-0.3, 0.3)); G.add(pivot);
      const sp = new T.Sprite(s.m(new T.SpriteMaterial({ map: s.t(bubbleTex(i + 2)), depthWrite: false }), 0.95)); sp.scale.set(0.9, 0.56, 1); sp.position.set(2.7, 0, 0); pivot.add(sp);
      bubbles.push({ pivot, sp, i });
    }
    s.update = (t, dt) => {
      shell.rotation.y += dt * 0.2; shell.rotation.x += dt * 0.08; inner.rotation.y -= dt * 0.35; inner.rotation.x += dt * 0.15;
      core.scale.setScalar(1 + Math.sin(t * 1.4) * 0.03); net.rotation.y += dt * 0.05;
      synLines.material.opacity = (0.18 + Math.sin(t * 1.1) * 0.08) * s.alpha;
      bubbles.forEach((b) => { b.pivot.rotation.y += dt * 0.1; b.sp.position.y = Math.sin(t * 0.8 + b.i) * 0.18; });
    };
  };

  /* 5 — NETWORK: contributor globe with pulsing hubs and travelling arcs */
  B.network = (s) => {
    const r = 2.6, { globe, spin, occ } = globeBase(s, r, true); s.group.add(globe); globe.rotation.set(0.35, 0, 0.2);
    const hubs = [[30, 31], [6, 3], [-1, 37], [51, 0], [52, 13], [40, -4], [-23, -46], [19, -99], [40, -74], [19, 73], [-6, 107], [35, 139], [37, 127], [24, 46], [41, 29], [14, 121], [-34, 18], [55, 37]];
    const pulses = [], ringGeo = s.g(new T.RingGeometry(0.06, 0.085, 32));
    hubs.forEach(([la, lo], i) => {
      const p = ll2v(la, lo, r * 1.01), dot = sprite(s, C.teal, 0.2, 1, dotTex()); dot.position.copy(p); spin.add(dot);
      const ring = new T.Mesh(ringGeo, s.m(basic(C.teal, { side: T.DoubleSide }), 0.8)); ring.position.copy(p); ring.lookAt(p.clone().multiplyScalar(2)); spin.add(ring);
      pulses.push({ ring, off: i * 0.37 });
    });
    const travellers = [];
    for (let i = 0; i < (low ? 8 : 14); i++) {
      const a = ll2v(...hubs[i % hubs.length], r), b = ll2v(...hubs[(i * 5 + 3) % hubs.length], r), curve = arcCurve(a, b, 1.32);
      spin.add(new T.Line(s.g(pointsGeo(curve.getPoints(64))), s.m(lineMat(C.blue), 0.35)));
      const sp = sprite(s, C.mist, 0.16, 1, dotTex()); spin.add(sp); travellers.push({ curve, sp, off: Math.random() });
    }
    s.update = (t, dt) => {
      spin.rotation.y += dt * 0.06; tintOcc(occ);
      pulses.forEach((p) => { const u = (t * 0.5 + p.off) % 1; p.ring.scale.setScalar(1 + u * 2.2); p.ring.material.opacity = (1 - u) * 0.8 * s.alpha; });
      travellers.forEach((o) => { const u = (t * 0.16 + o.off) % 1; o.sp.position.copy(o.curve.getPoint(u)); o.sp.material.opacity = Math.sin(u * Math.PI) * s.alpha; });
    };
  };

  /* 6 — AMBIENT: calm dust for long reading sections */
  B.ambient = (s) => {
    const vs = []; for (let i = 0; i < (low ? 400 : 900); i++) vs.push(new T.Vector3(rand(-16, 16), rand(-10, 10), rand(-14, 10)));
    const pts = new T.Points(s.g(pointsGeo(vs)), s.m(ptsMat(C.sky, 0.05), 0.4)); s.group.add(pts);
    const o1 = sprite(s, C.blue, 14, 0.12); o1.position.set(-5, 2, -6); const o2 = sprite(s, C.teal, 10, 0.1); o2.position.set(6, -3, -4);
    s.group.add(o1, o2);
    s.update = (t, dt) => { pts.rotation.y += dt * 0.01; pts.rotation.x = Math.sin(t * 0.1) * 0.05; };
  };

  /* ---------- custom shader glow (hero globe atmosphere + travelling arcs) ---------- */
  const uTime = { value: 0 };
  function fresnelMat(color, power = 2.4) {
    return new T.ShaderMaterial({
      uniforms: { uColor: { value: new T.Color(color) }, uOpacity: { value: 1 }, uPower: { value: power } },
      vertexShader: "varying vec3 vN; varying vec3 vV; void main(){ vec4 mv = modelViewMatrix * vec4(position,1.0); vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }",
      fragmentShader: "uniform vec3 uColor; uniform float uOpacity; uniform float uPower; varying vec3 vN; varying vec3 vV; void main(){ float f = pow(1.0 - max(dot(vN, vV), 0.0), uPower); gl_FragColor = vec4(uColor, f * uOpacity); }",
      blending: ADD, depthWrite: false, transparent: true,
    });
  }
  function arcMat(color, head, off) {
    return new T.ShaderMaterial({
      uniforms: { uTime, uOff: { value: off }, uOpacity: { value: 1 }, uColor: { value: new T.Color(color) }, uHead: { value: new T.Color(head) } },
      vertexShader: "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",
      fragmentShader: "uniform float uTime; uniform float uOff; uniform float uOpacity; uniform vec3 uColor; uniform vec3 uHead; varying vec2 vUv; void main(){ float h = fract(uTime * 0.16 + uOff) * 1.4 - 0.2; float d = vUv.x - h; float trail = smoothstep(-0.32, 0.0, d) * (1.0 - smoothstep(0.0, 0.015, d)); float edge = 1.0 - abs(vUv.y - 0.5) * 2.0; float a = (0.14 + trail * 1.3) * uOpacity * (0.55 + 0.45 * edge); gl_FragColor = vec4(mix(uColor, uHead, trail), a); }",
      blending: ADD, depthWrite: false, transparent: true,
    });
  }
  const syncShader = (m) => { if (m.uniforms && m.uniforms.uOpacity) m.uniforms.uOpacity.value = m.opacity; };

  /* 7 — SHELF: off-the-shelf datasets as blocks on a rack, a selector lifts one out */
  B.shelf = (s) => {
    const G = s.group, rack = new T.Group(); rack.rotation.set(0.14, -0.46, 0); G.add(rack);
    const levels = 3, per = low ? 12 : 20, N = levels * per, W0 = 6.2;
    for (let l = 0; l < levels; l++) {
      const y = -1.5 + l * 1.45;
      const shelf = new T.LineSegments(s.g(new T.EdgesGeometry(new T.BoxGeometry(W0 + 0.4, 0.05, 1.3))), s.m(lineMat(C.mist), 0.45)); shelf.position.y = y; rack.add(shelf);
    }
    const blocks = new T.InstancedMesh(s.g(new T.BoxGeometry(1, 1, 1)), s.m(new T.MeshStandardMaterial({ color: 0xffffff, metalness: 0.35, roughness: 0.3, emissive: 0x0a1433 }), 1), N);
    const pal = [C.blue, C.teal, C.sky, C.mist].map((h) => new T.Color(h)), info = [];
    for (let l = 0; l < levels; l++) { let x = -W0 / 2 + 0.15; for (let i = 0; i < per; i++) { const w = 0.16 + ((i * 7 + l * 3) % 5) * 0.035, h = 0.55 + ((i * 11 + l * 5) % 7) * 0.08; info.push({ x: x + w / 2, y: -1.5 + l * 1.45 + 0.03 + h / 2, w, h, lift: 0 }); blocks.setColorAt(info.length - 1, pal[(i + l) % 4]); x += w + 0.06 + ((i * 13) % 3) * 0.02; if (x > W0 / 2 - 0.3) break; } }
    rack.add(blocks);
    const sel = sprite(s, C.teal, 2.2, 0.55); rack.add(sel);
    const beam = new T.Mesh(s.g(new T.PlaneGeometry(0.05, 4.6)), s.m(basic(C.teal), 0.35)); beam.position.z = 0.7; rack.add(beam);
    G.add(sprite(s, C.blue, 9, 0.16));
    const d = new T.Object3D();
    s.update = (t) => {
      const target = Math.floor(t / 1.6) % info.length, sx = Math.sin(t * 0.35) * (W0 / 2 - 0.3);
      beam.position.x = sx; rack.rotation.y = -0.46 + Math.sin(t * 0.2) * 0.08;
      info.forEach((b, i) => {
        const near = Math.max(0, 1 - Math.abs(b.x - sx) / 0.35), pick = i === target ? 1 : 0;
        b.lift += ((near * 0.25 + pick * 0.45) - b.lift) * 0.08;
        d.position.set(b.x, b.y + b.lift * 0.2, b.lift); d.scale.set(b.w, b.h, 0.8); d.rotation.set(0, 0, 0); d.updateMatrix(); blocks.setMatrixAt(i, d.matrix);
        if (pick) sel.position.set(b.x, b.y + 0.2, b.lift + 0.4);
      });
      blocks.instanceMatrix.needsUpdate = true;
    };
  };

  /* 8 — EVALX: data evaluation — a particle stream passes validation gates; failures drop away */
  B.evalx = (s) => {
    const G = s.group, gates = [], X = [-2.4, -0.8, 0.8, 2.4];
    X.forEach((x, i) => {
      const g = new T.Mesh(s.g(new T.TorusGeometry(0.95 - i * 0.1, 0.018, 10, 90)), s.m(basic(i % 2 ? C.teal : C.sky), 0.8)); g.position.x = x; g.rotation.y = Math.PI / 2; G.add(g);
      const halo = sprite(s, C.teal, 2.4, 0.22); halo.position.x = x; G.add(halo); gates.push({ g, halo });
    });
    const N = low ? 160 : 320, pos = new Float32Array(N * 3), col = new Float32Array(N * 3), P = [];
    const cA = new T.Color(C.mist), cOk = new T.Color(C.teal), cBad = new T.Color(0x6b7bb0);
    for (let i = 0; i < N; i++) P.push({ x: rand(-4.5, 4.5), r: rand(0, 0.8), a: rand(0, TAU), v: rand(0.6, 1.2), bad: Math.random() < 0.22, drop: 0 });
    const geo = s.g(new T.BufferGeometry()); geo.setAttribute("position", new T.BufferAttribute(pos, 3)); geo.setAttribute("color", new T.BufferAttribute(col, 3));
    G.add(new T.Points(geo, s.m(new T.PointsMaterial({ size: 0.075, map: dotTex(), vertexColors: true, blending: ADD, depthWrite: false }), 0.95)));
    const tc = new T.Color();
    s.update = (t, dt) => {
      P.forEach((p, i) => {
        p.x += dt * p.v; p.a += dt * 0.8;
        const passed = X.filter((x) => p.x > x).length;
        if (p.bad && passed >= 2) p.drop += dt * 1.6;
        if (p.x > 4.6 || p.drop > 3) { p.x = -4.6; p.drop = 0; p.bad = Math.random() < 0.22; }
        const rr = p.r * (1 - Math.min(1, passed * 0.2)) + p.drop * 0.2;
        pos[i * 3] = p.x; pos[i * 3 + 1] = Math.sin(p.a) * rr - p.drop * p.drop * 0.35; pos[i * 3 + 2] = Math.cos(p.a) * rr;
        tc.copy(cA).lerp(p.bad && passed >= 2 ? cBad : cOk, Math.min(1, passed / 4)); col[i * 3] = tc.r; col[i * 3 + 1] = tc.g; col[i * 3 + 2] = tc.b;
      });
      geo.attributes.position.needsUpdate = true; geo.attributes.color.needsUpdate = true;
      gates.forEach((o, i) => { o.g.rotation.x = t * (0.3 + i * 0.1); o.halo.material.opacity = (0.15 + Math.max(0, Math.sin(t * 1.5 - i)) * 0.25) * s.alpha; });
      G.rotation.y = -0.35 + Math.sin(t * 0.2) * 0.12;
    };
  };

  /* 9 — TRANSCRIPT: a waveform is scanned and becomes lines of timed text */
  function lineTex(seed) {
    return canvasTex(512, 64, (g) => {
      g.fillStyle = "rgba(46,230,197,.95)"; roundRect(g, 4, 18, 64, 28, 8); g.fill();
      let x = 84; for (let k = 0; k < 6; k++) { const w = 30 + ((seed * 31 + k * 47) % 70); g.fillStyle = k % 3 ? "rgba(234,240,255,.55)" : "rgba(234,240,255,.9)"; roundRect(g, x, 22, w, 20, 10); g.fill(); x += w + 12; if (x > 480) break; }
    });
  }
  B.transcript = (s) => {
    const G = s.group, wave = new T.Group(); wave.position.x = -1.5; G.add(wave); G.scale.setScalar(0.9);
    const N = low ? 60 : 96, bars = new T.InstancedMesh(s.g(new T.BoxGeometry(0.035, 1, 0.035)), s.m(basic(0xffffff), 0.9), N);
    const cb = new T.Color(C.blue), ct = new T.Color(C.teal), c = new T.Color();
    for (let i = 0; i < N; i++) bars.setColorAt(i, c.copy(cb).lerp(ct, i / N));
    wave.add(bars);
    const head = new T.Mesh(s.g(new T.PlaneGeometry(0.03, 2.4)), s.m(basic(C.teal), 0.9)); head.position.z = 0.05; wave.add(head);
    const headGlow = sprite(s, C.teal, 1.4, 0.5); wave.add(headGlow);
    const lines = [];
    for (let i = 0; i < 6; i++) {
      const m = new T.Mesh(s.g(new T.PlaneGeometry(2.2, 0.27)), s.m(new T.MeshBasicMaterial({ map: s.t(lineTex(i + 3)), depthWrite: false }), 1));
      m.position.set(1.5, 1.2 - i * 0.48, 0); G.add(m); lines.push(m);
    }
    const link = new T.Line(s.g(pointsGeo([new T.Vector3(-0.2, 0, 0), new T.Vector3(0.6, 0, 0)])), s.m(lineMat(C.sky), 0.5)); G.add(link);
    const d = new T.Object3D(), span = 2.6;
    s.update = (t) => {
      const u = (t * 0.12) % 1, hx = -span / 2 + u * span; head.position.x = hx; headGlow.position.x = hx;
      for (let i = 0; i < N; i++) {
        const x = -span / 2 + (i / (N - 1)) * span, near = Math.max(0, 1 - Math.abs(x - hx) / 0.4);
        const h = 0.08 + Math.abs(Math.sin(i * 0.37 + t * 1.6) * Math.cos(i * 0.11 + t * 0.4)) * 1.6 * (0.5 + near * 0.6);
        d.position.set(x, 0, 0); d.scale.set(1, h, 1); d.updateMatrix(); bars.setMatrixAt(i, d.matrix);
      }
      bars.instanceMatrix.needsUpdate = true;
      lines.forEach((m, i) => { const k = Math.min(1, Math.max(0, u * 6.5 - i)); m.material.opacity = k * s.alpha; m.position.x = 1.5 + (1 - k) * 0.4; });
      G.rotation.y = -0.25 + Math.sin(t * 0.2) * 0.08;
    };
  };

  /* 10 — TRIO: Global Data Expertise — glyph orb, human-in-the-loop ring, QA gyroscope.
     W.focus (0,1,2 or -1) is set by hovering the matching DOM card. */
  B.trio = (s) => {
    const G = s.group, items = [];
    const a = new T.Group(); a.position.x = -2.8; G.add(a);
    fib(low ? 10 : 16, 0.95).forEach((v, i) => { const sp = new T.Sprite(s.m(new T.SpriteMaterial({ map: s.t(glyphTex(GLYPHS[i % GLYPHS.length])), color: i % 3 ? C.mist : C.teal, blending: ADD, depthWrite: false }), 0.95)); sp.position.copy(v); sp.scale.setScalar(0.34); a.add(sp); });
    a.add(new T.LineSegments(s.g(latLong(0.8, 6, 6, 48)), s.m(lineMat(C.blue), 0.3))); a.add(sprite(s, C.blue, 3, 0.35)); items.push(a);
    const b = new T.Group(); G.add(b);
    b.add(new T.Mesh(s.g(new T.TorusGeometry(1.0, 0.016, 8, 120)), s.m(basic(C.mist), 0.7)));
    const nodes = []; for (let i = 0; i < 7; i++) { const n = sprite(s, i % 2 ? C.teal : C.mist, 0.3, 1, dotTex()); b.add(n); nodes.push(n); }
    const core = new T.Mesh(s.g(new T.IcosahedronGeometry(0.34, 0)), s.m(new T.MeshStandardMaterial({ color: C.teal, emissive: 0x0b5a52, flatShading: true, roughness: 0.3 }), 0.95)); b.add(core, sprite(s, C.teal, 2.6, 0.3)); items.push(b);
    const c = new T.Group(); c.position.x = 2.8; G.add(c);
    const gy = [0, 1, 2].map((k) => { const r = new T.Mesh(s.g(new T.TorusGeometry(0.85 - k * 0.12, 0.014, 8, 100)), s.m(basic(k === 1 ? C.teal : C.sky), 0.75)); c.add(r); return r; });
    c.add(new T.LineSegments(s.g(new T.EdgesGeometry(new T.OctahedronGeometry(0.42, 0))), s.m(lineMat(C.mist), 0.9)), sprite(s, C.sky, 2.6, 0.3)); items.push(c);
    const sc = [1, 1, 1];
    s.update = (t, dt) => {
      a.rotation.y += dt * 0.35; b.rotation.x = 0.9 + Math.sin(t * 0.4) * 0.15; core.rotation.y += dt * 0.6;
      nodes.forEach((n, i) => { const ang = t * 0.5 + (i / nodes.length) * TAU; n.position.set(Math.cos(ang), Math.sin(ang), 0); });
      gy[0].rotation.x = t * 0.6; gy[1].rotation.y = t * 0.8; gy[2].rotation.z = t * 0.4; gy[2].rotation.x = t * 0.3;
      items.forEach((it, i) => { const f = W.focus < 0 ? 1 : W.focus === i ? 1.28 : 0.82; sc[i] += (f - sc[i]) * 0.08; it.scale.setScalar(sc[i]); it.position.y = Math.sin(t * 0.7 + i) * 0.08; });
    };
  };

  /* 11 — LOST: the 404 globe drifting away from a broken orbit */
  B.lost = (s) => {
    const { globe, spin, occ } = globeBase(s, 1.5, false); s.group.add(globe);
    const ring = []; for (let k = 0; k <= 160; k++) { if (k % 20 > 15) continue; const a = (k / 160) * TAU; ring.push(new T.Vector3(Math.cos(a) * 3, 0, Math.sin(a) * 3)); }
    const orbit = new T.Points(s.g(pointsGeo(ring)), s.m(ptsMat(C.sky, 0.06), 0.7)); orbit.rotation.x = 0.4; s.group.add(orbit);
    const sat = sprite(s, C.teal, 0.5, 1, dotTex()); s.group.add(sat);
    const q = new T.Sprite(s.m(new T.SpriteMaterial({ map: s.t(glyphTex("?")), color: C.mist, blending: ADD, depthWrite: false }), 0.9)); q.scale.setScalar(0.9); s.group.add(q);
    const stars = []; for (let i = 0; i < (low ? 300 : 700); i++) stars.push(new T.Vector3(rand(-20, 20), rand(-12, 12), rand(-20, 4)));
    s.group.add(new T.Points(s.g(pointsGeo(stars)), s.m(ptsMat(C.sky, 0.05), 0.35)));
    s.update = (t, dt) => {
      spin.rotation.y += dt * 0.1; tintOcc(occ); globe.position.set(Math.sin(t * 0.3) * 0.6, Math.cos(t * 0.23) * 0.3, 0); globe.rotation.z = Math.sin(t * 0.2) * 0.3;
      const u = (t * 0.07) % 1, r = 3 + u * 5; sat.position.set(Math.cos(t * 0.4) * r, Math.sin(t * 0.9) * 0.6 + u * 2, Math.sin(t * 0.4) * r * 0.4); sat.material.opacity = (1 - u) * s.alpha;
      q.position.set(1.9 + Math.sin(t * 0.6) * 0.2, 1.5 + Math.cos(t * 0.5) * 0.2, 0.5); orbit.rotation.y += dt * 0.05;
    };
  };

  /* 12 — PRESENCE: globe that shows ONLY CFG.presence locations */
  B.presence = (s) => {
    const r = 2.4, { globe, spin, occ } = globeBase(s, r, true); s.group.add(globe); globe.rotation.set(0.3, 0, 0.15);
    const pts = (window.CFG && Array.isArray(window.CFG.presence) ? window.CFG.presence : []).filter((p) => isFinite(p.lat) && isFinite(p.lon));
    const ringGeo = s.g(new T.RingGeometry(0.07, 0.095, 32)), pulses = [];
    pts.forEach((p, i) => {
      const v = ll2v(p.lat, p.lon, r * 1.01), dot = sprite(s, C.teal, 0.26, 1, dotTex()); dot.position.copy(v); spin.add(dot);
      const ring = new T.Mesh(ringGeo, s.m(basic(C.teal, { side: T.DoubleSide }), 0.8)); ring.position.copy(v); ring.lookAt(v.clone().multiplyScalar(2)); spin.add(ring); pulses.push({ ring, off: i * 0.3 });
    });
    if (pts.length) spin.rotation.y = -((pts[0].lon + 90) * Math.PI) / 180;
    s.update = (t, dt) => { spin.rotation.y += dt * 0.04; tintOcc(occ); pulses.forEach((p) => { const u = (t * 0.5 + p.off) % 1; p.ring.scale.setScalar(1 + u * 2); p.ring.material.opacity = (1 - u) * 0.8 * s.alpha; }); };
  };

  /* ---------- lifecycle ---------- */
  function ensure(name) {
    if (stages[name] || !B[name]) return stages[name];
    const s = Stage(name); B[name](s); s.group.visible = false; scene.add(s.group); stages[name] = s;
    return s;
  }
  function dispose(name) {
    const s = stages[name]; if (!s) return;
    scene.remove(s.group); s.trash.forEach((x) => x.dispose && x.dispose()); delete stages[name]; delete lastVis[name];
  }
  World.ensure = ensure;
  World.use = (names) => { Object.keys(stages).forEach((n) => { if (!names.includes(n)) { dispose(n); W.a[n] = 0; } }); };
  /* Keep at most HEAVY_LIMIT heavy stages in memory: dispose the least recently visible hidden ones. */
  function enforceHeavyLimit() {
    const heavy = Object.keys(stages).filter((n) => !LIGHTWEIGHT[n]);
    if (heavy.length <= HEAVY_LIMIT) return;
    heavy.filter((n) => !stages[n].group.visible).sort((a, b) => (lastVis[a] || 0) - (lastVis[b] || 0))
      .slice(0, heavy.length - HEAVY_LIMIT).forEach(dispose);
  }
  /* Adaptive quality: thin particles + lower DPR when FPS stays low. */
  function thin(s2) { s2.group.traverse((o) => { if (o.isPoints && o.geometry.attributes.position) { const c = o.geometry.attributes.position.count; o.geometry.setDrawRange(0, Math.floor(c * 0.5)); } }); }
  function degrade() {
    if (tier >= 2) return; tier++; low = true;
    renderer.setPixelRatio(tier === 1 ? 1 : 0.75);
    Object.values(stages).forEach(thin);
    document.documentElement.classList.add(`q-low`, `q-tier-${tier}`);
    World.onQuality && World.onQuality(tier);
  }
  World.setDir = (d) => (dir = d < 0 ? -1 : 1);
  World.setLow = (v) => { forcedLow = !!v; resize(); };
  World.tier = () => tier;
  World.prewarm = (names) => {
    const queue = names.filter((n) => !stages[n]);
    const step = () => { const n = queue.shift(); if (!n) return; ensure(n); (window.requestIdleCallback || setTimeout)(step, { timeout: 400 }); };
    step();
  };
  World.pointer = (x, y) => { pointer.x = x; pointer.y = y; };
  World.setReduced = (v) => (reduced = v);
  World.isLow = () => low;

  function resize() {
    if (!renderer) return;
    const w = window.innerWidth, h = window.innerHeight;
    portrait = h > w; low = forcedLow || tier > 0 || Math.min(w, h) < 700 || (navigator.hardwareConcurrency || 8) <= 4;
    renderer.setPixelRatio(tier ? (tier === 1 ? 1 : 0.75) : Math.min(window.devicePixelRatio || 1, low ? 1.5 : 2));
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.fov = portrait ? 62 : 45; camera.updateProjectionMatrix();
  }

  let lastBg = "";
  function frame(now) {
    const raw = now - last, dt = Math.min(raw / 1000 || 0.016, 0.05); last = now;
    time += dt * (reduced ? 0.25 : 1);
    pointer.sx += (pointer.x - pointer.sx) * 0.04; pointer.sy += (pointer.y - pointer.sy) * 0.04;
    const px = portrait || reduced ? 0 : pointer.sx * 0.35, py = portrait || reduced ? 0 : pointer.sy * 0.22;
    const xs = (portrait ? 0.12 : 1) * dir; // dir = -1 mirrors every sideways drift for RTL
    camera.position.set(W.cam.x * xs + px, W.cam.y - py, W.cam.z);
    camera.lookAt(W.look.x * xs, W.look.y, W.look.z);
    uTime.value = time;
    // FPS sampling (after a warm-up, ignoring long frames from tab switches)
    warm += dt; if (warm > 3 && raw < 250 && !reduced) { fpsAcc += dt; fpsN++; if (fpsAcc >= 2) { const fps = fpsN / fpsAcc; fpsAcc = 0; fpsN = 0; if (fps < 40) degrade(); } }

    const bgCss = `rgb(${(W.bg.r * 255) | 0},${(W.bg.g * 255) | 0},${(W.bg.b * 255) | 0})`;
    if (bgCss !== lastBg) { document.documentElement.style.setProperty("--world-bg", bgCss); lastBg = bgCss; }
    scene.fog.color.setRGB(W.fog.r, W.fog.g, W.fog.b); scene.fog.density = W.fogD;
    point.color.setRGB(W.light.r, W.light.g, W.light.b); point.position.set(camera.position.x + 2, camera.position.y + 3, camera.position.z - 2);

    for (const n in W.a) {
      const a = W.a[n];
      if (a > 0.003 && !stages[n]) ensure(n);
      const s = stages[n]; if (!s) continue;
      const vis = a > 0.003; s.group.visible = vis; if (!vis) { s.alpha = 0; continue; }
      lastVis[n] = time;
      if (Math.abs(s.alpha - a) > 0.0005) { s.alpha = a; s.mats.forEach(([m, b]) => (m.opacity = b * a)); }
      s.group.scale.setScalar(0.9 + 0.1 * a);
      s.update(time, dt * (reduced ? 0.25 : 1));
    }
    if ((frameN = (frameN + 1) % 30) === 0) enforceHeavyLimit();
    renderer.render(scene, camera);
  }
  let frameN = 0;

  function start() { if (running || !renderer) return; running = true; last = performance.now(); renderer.setAnimationLoop(frame); }
  function stop() { running = false; renderer && renderer.setAnimationLoop(null); }
  World.start = start; World.stop = stop;

  World.init = (canvas) => {
    canvasEl = canvas;
    try {
      const probe = document.createElement("canvas");
      if (!(probe.getContext("webgl2") || probe.getContext("webgl"))) return false;
      renderer = new T.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch (e) { return false; }
    renderer.setClearColor(0x000000, 0);
    scene = new T.Scene(); scene.fog = new T.FogExp2(C.ink, 0.034);
    camera = new T.PerspectiveCamera(45, 1, 0.1, 140);
    hemi = new T.HemisphereLight(C.sky, C.ink, 0.7); key = new T.DirectionalLight(C.mist, 0.9); key.position.set(3, 5, 6);
    point = new T.PointLight(C.blue, 1.6, 30);
    scene.add(hemi, key, point);
    resize(); window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));
    canvas.addEventListener("webglcontextlost", (e) => { e.preventDefault(); stop(); document.documentElement.classList.add("no-webgl"); });
    World.supported = true; start();
    return true;
  };
})();
