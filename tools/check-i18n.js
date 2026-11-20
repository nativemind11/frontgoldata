#!/usr/bin/env node
/* GOLDATA — tools/check-i18n.js (Node 18+, no dependencies)
   Compares every dictionary in js/i18n/ with en.js: missing keys, extra keys, {placeholder} mismatches.
   Usage (from front/): node tools/check-i18n.js        Exit code 1 if anything is wrong. */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");
const DIR = path.resolve(__dirname, "../js/i18n");
const ctx = { window: {} }; ctx.window.window = ctx.window; vm.createContext(ctx);
const langs = fs.readdirSync(DIR).filter((f) => f.endsWith(".js")).map((f) => f.slice(0, -3));
for (const l of langs) vm.runInContext(fs.readFileSync(path.join(DIR, `${l}.js`), "utf8"), ctx, { filename: `${l}.js` });
const D = ctx.window.I18N, EN = D.en, ph = (s) => (String(s).match(/\{\w+\}/g) || []).sort().join(",");
const optional = new Set(["brand.tagline", "brand.story", "hero.l1", "hero.l2"]); // English reads these from CFG
let bad = 0;
for (const l of langs.filter((x) => x !== "en")) {
  const d = D[l] || {};
  const missing = Object.keys(EN).filter((k) => !(k in d));
  const extra = Object.keys(d).filter((k) => !(k in EN) && !optional.has(k));
  const mism = Object.keys(EN).filter((k) => k in d && ph(EN[k]) !== ph(d[k]));
  bad += missing.length + extra.length + mism.length;
  console.log(`${l}: ${Object.keys(d).length} keys · missing ${missing.length} · extra ${extra.length} · placeholder mismatches ${mism.length}`);
  [...missing.map((k) => `  missing  ${k}`), ...extra.map((k) => `  extra    ${k}`), ...mism.map((k) => `  {…}      ${k}`)].slice(0, 30).forEach((x) => console.log(x));
}
console.log(bad ? `✗ ${bad} issue(s)` : "✓ all dictionaries match en.js");
process.exit(bad ? 1 : 0);
