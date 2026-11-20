# Questverse front — update notes

- Home: hero body + "Start with a pilot" CTA; 3-card metric row (90,000+ Projects completed · 750+ Clients · 210+ Languages served across projects) after "The difference", static text, localized in 5 languages, with the "availability confirmed per project" note.
- 750+ and 210+ are marked `pending: true` in `js/config.js` (`stats`). Set `showPendingStats: false` to hide them until the owner approves.
- ISO badge strip (`images/legacy_iso_badge_trio.png`, original artwork): Home (links to Trust Center) + Trust Center "Certifications". Shown because `iso.ownerApproved: true` (owner decision); set it to false to hide until every standard is verified.
- `demo: false`: no sample metrics, testimonials, team or placeholder certifications are shown. The three cases stay, each with its evidence label.
- Alt text for the 20 images updated to the handoff wording (`CFG.assets`, `image-map.md`).
- 4.9/5 rating stays hidden (`rating: null`) until a current review source exists.
