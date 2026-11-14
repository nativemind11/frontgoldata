# Translation review checklist

`en.js` is the **source of truth**. `ar.js`, `fr.js`, `es.js` and `de.js` are
**MACHINE DRAFTS** (each file header says `MACHINE-DRAFT: needs native review`).
The site never claims professional translation; Trust/footer pages show a
"machine draft" notice in non-English languages.

What is translated: every interface string (nav, buttons, forms, wizard,
headings, notices, errors) plus the brand hero lines/tagline/story
(`hero.l1`, `hero.l2`, `brand.tagline`, `brand.story`).
What stays in English with an "English" marker: long-form service details,
case studies, articles, glossary and legal templates (from `js/content.js`).

## For each language, a native reviewer should

- [ ] Read every key in the file next to `en.js` (same key order).
- [ ] Keep `{placeholders}` exactly as they are (e.g. `{n}`, `{brand}`, `{ref}`).
- [ ] Check tone: confident, plain, no hype; formal "you" where the language expects it (fr: *vous*, de: *Sie*, es: *usted* or neutral).
- [ ] Check brand claims did not grow in translation (no "leading", "certified", "guaranteed").
- [ ] Check form error messages are short and polite.
- [ ] Check legal-ish strings (consent banner, contributor consent, privacy) — these need **legal** review too.
- [ ] Arabic only: check RTL in the browser — menus, wizard, sticky bar, sliders, arrows, numbers (Western vs. Arabic-Indic digits — set by the browser locale), mixed English terms (e.g. "QA", "LLM").
- [ ] Check plural forms (`Intl.PluralRules` is used where counts appear).
- [ ] Mark the file reviewed: replace `MACHINE-DRAFT: needs native review` with `REVIEWED by <name>, <date>` and once ALL languages are reviewed, you may delete the `ft.machine` notice text.

## After review

- Run the consistency check from `front/` (reports missing/extra keys and placeholder mismatches):
  `node tools/check-i18n.js`
- Smoke-test: switch language in the nav, reload (choice persists), open Quote, Join, Trust and a service page.
