# Questverse — image shot list (44 slots)

Drop each final image into `front/images/` named exactly as in **File**. Formats: the site requests `webp` (set `CFG.imageFormats`; e.g. `["avif","webp"]` adds AVIF with WebP fallback — then upload BOTH files per slot). Missing files fall back to the procedural 3D scene / blur placeholder, so add them one at a time.

Alt text and aspect ratio below are read from `CFG.images` in `js/config.js` — if you change a picture's content, update its `alt` there.

## Rules

- **No fake proof.** No invented clients, staff, testimonials or offices. People are anonymous contributors or staged scenes; faces turned away or out of focus unless you hold model releases.
- **No real logos, brand marks, licence plates or readable screens.**
- Case-study and article covers illustrate *sample* content — keep them generic.
- **Check each free generator's limits and commercial-use terms on its own site** (image count, resolution, commercial rights, attribution). Note the tool and terms used.
- Export at the listed pixel size, WebP quality ~75–80, ideally under 300 KB (free: Squoosh.app, `cwebp`, `avifenc`).

## Slots

### `hero-fallback` — Home hero, shown only when 3D is unavailable

- **Subject:** A luminous glass sphere of fine dotted continents floating inside a thin ring of light, faint arcs of light connecting points on its surface, deep haze around it
- **Lens:** 35 mm, f/2.8, centred, slight low angle
- **Lighting:** internal teal glow, blue rim light from behind, volumetric haze
- **Palette:** ink navy field, blue rim, teal arcs
- **Mood:** awe, calm confidence
- **Aspect ratio / size:** 16:9 · 1920×1080 px
- **File:** `images/hero-fallback.webp`
- **Alt text:** Glowing data globe seen through a ring of light
- **Negative prompt:** text, letters, watermark, logo, brand marks, licence plates, readable screens, stock-photo clichés (handshakes, pointing at holograms), identifiable faces without a model release, extra fingers, oversaturated neon, purple cast, no planets, no stars clipart

### `svc-1` — Speech & Voice chapter + service hero

- **Subject:** Close-up of a studio condenser microphone with mesh grille in a dark recording booth, a thin ring of teal light reflected in the metal, acoustic foam blurred behind
- **Lens:** 85 mm, f/2
- **Lighting:** low-key rim light from the left, blue practical glow behind
- **Palette:** ink navy, steel, teal reflection
- **Mood:** intimate, attentive
- **Aspect ratio / size:** 1:1 · 1600×1600 px
- **File:** `images/svc-1.webp`
- **Alt text:** Studio microphone in a dark recording booth with a ring of teal light
- **Negative prompt:** text, letters, watermark, logo, brand marks, licence plates, readable screens, stock-photo clichés (handshakes, pointing at holograms), identifiable faces without a model release, extra fingers, oversaturated neon, purple cast, no brand names on the microphone

### `svc-2` — Data Collection chapter + service hero

- **Subject:** A contributor's hands holding a smartphone recording a city street at dusk, screen glow on the fingers, bokeh of street lights
- **Lens:** 50 mm, f/1.8
- **Lighting:** cool ambient dusk, teal reflection on the phone edge
- **Palette:** navy dusk, warm street bokeh muted, teal edge
- **Mood:** real-world, purposeful
- **Aspect ratio / size:** 1:1 · 1600×1600 px
- **File:** `images/svc-2.webp`
- **Alt text:** Hands recording a city street on a phone at dusk
- **Negative prompt:** text, letters, watermark, logo, brand marks, licence plates, readable screens, stock-photo clichés (handshakes, pointing at holograms), identifiable faces without a model release, extra fingers, oversaturated neon, purple cast, no readable screen UI, no faces

### `svc-3` — Data Annotation chapter + service hero

- **Subject:** Over-the-shoulder view of a monitor showing an abstract street photo with clean geometric bounding-box outlines, annotator softly out of focus
- **Lens:** 35 mm, f/2.8
- **Lighting:** monitor as key light, blue spill on the desk
- **Palette:** ink navy, signal-blue boxes, teal highlights
- **Mood:** precise, focused
- **Aspect ratio / size:** 1:1 · 1600×1600 px
- **File:** `images/svc-3.webp`
- **Alt text:** Monitor showing an abstract street scene with bounding boxes
- **Negative prompt:** text, letters, watermark, logo, brand marks, licence plates, readable screens, stock-photo clichés (handshakes, pointing at holograms), identifiable faces without a model release, extra fingers, oversaturated neon, purple cast, no text labels, no software UI chrome

### `svc-4` — AI Model Evaluation chapter + service hero

- **Subject:** Two blank translucent cards side by side on a dark glass desk with subtle bar-shaped light patterns, a hand hovering between them as if choosing
- **Lens:** 65 mm, f/2.2
- **Lighting:** overhead soft box, teal edge light
- **Palette:** navy glass, mist highlights, teal edge
- **Mood:** careful judgment
- **Aspect ratio / size:** 1:1 · 1600×1600 px
- **File:** `images/svc-4.webp`
- **Alt text:** Hand choosing between two translucent evaluation cards
- **Negative prompt:** text, letters, watermark, logo, brand marks, licence plates, readable screens, stock-photo clichés (handshakes, pointing at holograms), identifiable faces without a model release, extra fingers, oversaturated neon, purple cast, no charts with numbers

### `svc-5` — Quality Assurance chapter + service hero

- **Subject:** A magnifying loupe resting on stacked printed waveform and grid sheets, single desk lamp, deep shadows
- **Lens:** macro 100 mm, f/4
- **Lighting:** warm-neutral key, cool blue fill
- **Palette:** ink shadows, paper mist, blue fill
- **Mood:** meticulous, calm
- **Aspect ratio / size:** 1:1 · 1600×1600 px
- **File:** `images/svc-5.webp`
- **Alt text:** Magnifying loupe on printed waveform sheets under a desk lamp
- **Negative prompt:** text, letters, watermark, logo, brand marks, licence plates, readable screens, stock-photo clichés (handshakes, pointing at holograms), identifiable faces without a model release, extra fingers, oversaturated neon, purple cast, no legible text on the sheets

### `svc-6` — Industry Solutions chapter + service hero

- **Subject:** Night interior of a modern car cabin, dashboard ambient light in blue and teal, a passenger silhouette speaking toward the centre console
- **Lens:** 24 mm, f/2
- **Lighting:** practical cabin lights only
- **Palette:** navy cabin, blue and teal ambient strips
- **Mood:** quiet, premium
- **Aspect ratio / size:** 1:1 · 1600×1600 px
- **File:** `images/svc-6.webp`
- **Alt text:** Car cabin at night lit in blue and teal
- **Negative prompt:** text, letters, watermark, logo, brand marks, licence plates, readable screens, stock-photo clichés (handshakes, pointing at holograms), identifiable faces without a model release, extra fingers, oversaturated neon, purple cast, no car brand badges, no readable displays

### `svc-7` — Translation & Localization chapter + service hero

- **Subject:** Abstract hand-written strokes in several scripts (Arabic, Devanagari, Hangul, Latin forms, not real sentences) on layered translucent paper, a thin teal light line crossing them
- **Lens:** 50 mm, f/2.8
- **Lighting:** raking side light
- **Palette:** paper mist on ink desk, teal line
- **Mood:** thoughtful, cultural
- **Aspect ratio / size:** 1:1 · 1600×1600 px
- **File:** `images/svc-7.webp`
- **Alt text:** Abstract handwritten strokes in several scripts on layered paper
- **Negative prompt:** text, letters, watermark, logo, brand marks, licence plates, readable screens, stock-photo clichés (handshakes, pointing at holograms), identifiable faces without a model release, extra fingers, oversaturated neon, purple cast, no readable words

### `svc-8` — Generative AI Services chapter + service hero

- **Subject:** A faceted glass polyhedron glowing softly from within, floating above a dark reflective surface, faint speech-bubble-shaped light reflections around it
- **Lens:** 85 mm, f/2.8
- **Lighting:** internal teal glow, blue rim
- **Palette:** ink, teal core, blue rim
- **Mood:** intelligent, restrained
- **Aspect ratio / size:** 1:1 · 1600×1600 px
- **File:** `images/svc-8.webp`
- **Alt text:** Faceted glass polyhedron glowing from within
- **Negative prompt:** text, letters, watermark, logo, brand marks, licence plates, readable screens, stock-photo clichés (handshakes, pointing at holograms), identifiable faces without a model release, extra fingers, oversaturated neon, purple cast, no robots, no brains, no circuit-board clichés

### `svc-9` — Off-the-Shelf Datasets chapter + service hero

- **Subject:** A dark archive of shelves holding softly glowing translucent blocks of different sizes, one block slightly pulled forward
- **Lens:** 35 mm, f/2.8, one-point perspective
- **Lighting:** glow from within the blocks, faint haze
- **Palette:** navy shelves, mist blocks, one teal block
- **Mood:** ready, organised abundance
- **Aspect ratio / size:** 1:1 · 1600×1600 px
- **File:** `images/svc-9.webp`
- **Alt text:** Shelves of glowing data blocks in a dark archive
- **Negative prompt:** text, letters, watermark, logo, brand marks, licence plates, readable screens, stock-photo clichés (handshakes, pointing at holograms), identifiable faces without a model release, extra fingers, oversaturated neon, purple cast, no labels, no barcodes

### `svc-10` — Data Evaluation chapter + service hero

- **Subject:** Translucent checklist panels standing in a row, each with a thin gauge of light at a different level, a fine scan line passing across them
- **Lens:** 50 mm, f/4
- **Lighting:** backlit panels, low key
- **Palette:** navy, mist panels, blue and teal gauges
- **Mood:** rigorous, measured
- **Aspect ratio / size:** 1:1 · 1600×1600 px
- **File:** `images/svc-10.webp`
- **Alt text:** Translucent checklist panels with light gauges
- **Negative prompt:** text, letters, watermark, logo, brand marks, licence plates, readable screens, stock-photo clichés (handshakes, pointing at holograms), identifiable faces without a model release, extra fingers, oversaturated neon, purple cast, no numbers, no ticks with text

### `svc-11` — Transcription chapter + service hero

- **Subject:** Over-ear headphones beside a screen where a waveform gradually becomes neat abstract lines of text-like marks
- **Lens:** 50 mm, f/2
- **Lighting:** cool screen light, warm desk lamp edge
- **Palette:** ink, mist screen, teal waveform
- **Mood:** patient precision
- **Aspect ratio / size:** 1:1 · 1600×1600 px
- **File:** `images/svc-11.webp`
- **Alt text:** Headphones beside a screen showing a waveform turning into lines of text
- **Negative prompt:** text, letters, watermark, logo, brand marks, licence plates, readable screens, stock-photo clichés (handshakes, pointing at holograms), identifiable faces without a model release, extra fingers, oversaturated neon, purple cast, no readable text

### `services-hero` — Services overview header

- **Subject:** Wide composition of floating light panels at different depths, each with a different abstract pattern (wave, grid, glyph, box)
- **Lens:** 24 mm, f/4
- **Lighting:** haze lit from below, rim lights
- **Palette:** navy depth, blue and teal panels
- **Mood:** breadth, order
- **Aspect ratio / size:** 16:9 · 1920×1080 px
- **File:** `images/services-hero.webp`
- **Alt text:** Wide abstract composition of light panels representing data services
- **Negative prompt:** text, letters, watermark, logo, brand marks, licence plates, readable screens, stock-photo clichés (handshakes, pointing at holograms), identifiable faces without a model release, extra fingers, oversaturated neon, purple cast, no UI, no text

### `hl-1` — Services → Text & Language Data highlight

- **Subject:** Layered abstract glyphs from several scripts drifting in soft light, shallow focus on one layer
- **Lens:** 85 mm, f/2
- **Lighting:** soft top light
- **Palette:** mist glyphs on ink, teal accent
- **Mood:** literate, calm
- **Aspect ratio / size:** 4:3 · 1600×1200 px
- **File:** `images/hl-1.webp`
- **Alt text:** Abstract layered text glyphs in soft light
- **Negative prompt:** text, letters, watermark, logo, brand marks, licence plates, readable screens, stock-photo clichés (handshakes, pointing at holograms), identifiable faces without a model release, extra fingers, oversaturated neon, purple cast, no real words

### `hl-2` — Services → Speech & Audio highlight

- **Subject:** Sound waves rendered as thin teal light lines bending through haze
- **Lens:** 50 mm, f/2.8
- **Lighting:** backlit haze
- **Palette:** ink haze, teal lines
- **Mood:** rhythmic, alive
- **Aspect ratio / size:** 4:3 · 1600×1200 px
- **File:** `images/hl-2.webp`
- **Alt text:** Sound waves rendered as thin teal lines
- **Negative prompt:** text, letters, watermark, logo, brand marks, licence plates, readable screens, stock-photo clichés (handshakes, pointing at holograms), identifiable faces without a model release, extra fingers, oversaturated neon, purple cast, no equaliser clipart

### `hl-3` — Services → Flexible Project Execution highlight

- **Subject:** Modular translucent blocks rearranging on a dark surface, motion trail on one block
- **Lens:** 35 mm, f/4
- **Lighting:** low raking light
- **Palette:** ink surface, mist blocks, blue trail
- **Mood:** adaptable
- **Aspect ratio / size:** 4:3 · 1600×1200 px
- **File:** `images/hl-3.webp`
- **Alt text:** Modular blocks rearranging on a dark surface
- **Negative prompt:** text, letters, watermark, logo, brand marks, licence plates, readable screens, stock-photo clichés (handshakes, pointing at holograms), identifiable faces without a model release, extra fingers, oversaturated neon, purple cast, no gears

### `flow` — Home workflow chapter background

- **Subject:** Wide minimalist night workspace: three translucent glass panels on a dark floor joined by thin lines of light, haze in the air
- **Lens:** 35 mm, f/4
- **Lighting:** low practical lights
- **Palette:** ink, mist panels, teal links
- **Mood:** orderly, calm
- **Aspect ratio / size:** 16:9 · 1920×1080 px
- **File:** `images/flow.webp`
- **Alt text:** Three glass panels joined by lines of light
- **Negative prompt:** text, letters, watermark, logo, brand marks, licence plates, readable screens, stock-photo clichés (handshakes, pointing at holograms), identifiable faces without a model release, extra fingers, oversaturated neon, purple cast, keep centre clear for text

### `about-team` — About → Mission

- **Subject:** A small diverse team around a table in a dim studio, faces turned away or out of focus, laptops and headphones, blue dusk window
- **Lens:** 35 mm, f/2
- **Lighting:** window light plus warm desk lamps
- **Palette:** navy dusk, warm lamps muted, teal accent
- **Mood:** human, collaborative
- **Aspect ratio / size:** 4:3 · 1600×1200 px
- **File:** `images/about-team.webp`
- **Alt text:** A small team working around a table in a dim studio
- **Negative prompt:** text, letters, watermark, logo, brand marks, licence plates, readable screens, stock-photo clichés (handshakes, pointing at holograms), identifiable faces without a model release, extra fingers, oversaturated neon, purple cast, no recognisable faces without releases, no fake staff

### `about-mission` — About story (portrait)

- **Subject:** A person listening closely with headphones, face turned away, hand near the ear cup, dark background
- **Lens:** 85 mm, f/1.8, portrait framing
- **Lighting:** single soft key from the side, teal rim
- **Palette:** ink, skin tones natural, teal rim
- **Mood:** attentive, human
- **Aspect ratio / size:** 3:4 · 1200×1600 px
- **File:** `images/about-mission.webp`
- **Alt text:** A person listening closely with headphones, face turned away
- **Negative prompt:** text, letters, watermark, logo, brand marks, licence plates, readable screens, stock-photo clichés (handshakes, pointing at holograms), identifiable faces without a model release, extra fingers, oversaturated neon, purple cast, face not identifiable

### `global-trio` — Home/About Global Data Expertise trio

- **Subject:** Three glowing objects on a dark plinth: a glyph orb, a human hand silhouette of light, a faceted shield
- **Lens:** 50 mm, f/4
- **Lighting:** each object lit from within
- **Palette:** blue orb, mist hand, teal shield
- **Mood:** balance of language, people, quality
- **Aspect ratio / size:** 16:9 · 1920×1080 px
- **File:** `images/global-trio.webp`
- **Alt text:** Three glowing objects representing languages, people and quality
- **Negative prompt:** text, letters, watermark, logo, brand marks, licence plates, readable screens, stock-photo clichés (handshakes, pointing at holograms), identifiable faces without a model release, extra fingers, oversaturated neon, purple cast, no logos

### `industries` — Services → Industries

- **Subject:** Four-part composition: car dashboard, hospital corridor, a headset on a desk, a retail shelf — unified night grade
- **Lens:** 50 mm, f/2.8
- **Lighting:** practical lights in each scene
- **Palette:** shared navy/teal grade
- **Mood:** breadth, coherence
- **Aspect ratio / size:** 4:3 · 1600×1200 px
- **File:** `images/industries.webp`
- **Alt text:** Composite of a car dashboard, hospital corridor, headset and shelf
- **Negative prompt:** text, letters, watermark, logo, brand marks, licence plates, readable screens, stock-photo clichés (handshakes, pointing at holograms), identifiable faces without a model release, extra fingers, oversaturated neon, purple cast, no brands, no patients

### `contact-globe` — Contact hero

- **Subject:** A softly glowing glass globe on a dark plinth, fine dotted continents, one teal point of light on its surface
- **Lens:** 85 mm, f/2.8
- **Lighting:** internal glow, rim light
- **Palette:** ink plinth, mist globe, teal point
- **Mood:** welcoming, global
- **Aspect ratio / size:** 1:1 · 1600×1600 px
- **File:** `images/contact-globe.webp`
- **Alt text:** Glowing glass globe on a dark plinth
- **Negative prompt:** text, letters, watermark, logo, brand marks, licence plates, readable screens, stock-photo clichés (handshakes, pointing at holograms), identifiable faces without a model release, extra fingers, oversaturated neon, purple cast, the point must not imply a real office

### `trust` — Trust Center header

- **Subject:** An abstract shield of fine light lines standing in a dark data room, server racks blurred far behind
- **Lens:** 35 mm, f/2.8
- **Lighting:** shield self-lit, cool haze
- **Palette:** navy room, mist shield, teal edge
- **Mood:** secure, transparent
- **Aspect ratio / size:** 16:9 · 1920×1080 px
- **File:** `images/trust.webp`
- **Alt text:** Abstract shield of light over a dark data room
- **Negative prompt:** text, letters, watermark, logo, brand marks, licence plates, readable screens, stock-photo clichés (handshakes, pointing at holograms), identifiable faces without a model release, extra fingers, oversaturated neon, purple cast, no padlock clipart, no certification marks

### `rfp` — Enterprise page header

- **Subject:** Neatly stacked blank documents and a pen on a dark desk under cool light, a thin teal ruler line
- **Lens:** 50 mm, f/4
- **Lighting:** top soft light
- **Palette:** ink desk, mist paper, teal line
- **Mood:** prepared, professional
- **Aspect ratio / size:** 16:9 · 1920×1080 px
- **File:** `images/rfp.webp`
- **Alt text:** Neatly stacked documents and a pen under cool light
- **Negative prompt:** text, letters, watermark, logo, brand marks, licence plates, readable screens, stock-photo clichés (handshakes, pointing at holograms), identifiable faces without a model release, extra fingers, oversaturated neon, purple cast, no legible text, no signatures

### `resources` — Resources hub header

- **Subject:** An open notebook with abstract diagrams (boxes, arrows, waves) under a desk lamp
- **Lens:** 50 mm, f/2.8
- **Lighting:** warm lamp key, cool fill
- **Palette:** ink, paper mist, blue ink lines
- **Mood:** curious, generous
- **Aspect ratio / size:** 16:9 · 1920×1080 px
- **File:** `images/resources.webp`
- **Alt text:** Open notebook with abstract diagrams under a desk lamp
- **Negative prompt:** text, letters, watermark, logo, brand marks, licence plates, readable screens, stock-photo clichés (handshakes, pointing at holograms), identifiable faces without a model release, extra fingers, oversaturated neon, purple cast, no readable handwriting

### `presence` — Global presence band (only if CFG.presence is filled)

- **Subject:** A dotted world map glowing on a dark wall, no highlighted cities
- **Lens:** 28 mm, f/4
- **Lighting:** wall self-lit dots, haze
- **Palette:** navy wall, mist dots
- **Mood:** global reach without claims
- **Aspect ratio / size:** 21:9 · 1920×823 px
- **File:** `images/presence.webp`
- **Alt text:** Dotted world map glowing on a dark wall
- **Negative prompt:** text, letters, watermark, logo, brand marks, licence plates, readable screens, stock-photo clichés (handshakes, pointing at holograms), identifiable faces without a model release, extra fingers, oversaturated neon, purple cast, no pins, no city markers

### `languages` — Language Explorer header

- **Subject:** Many writing scripts floating as soft light glyphs across a dark wide space
- **Lens:** 24 mm, f/4
- **Lighting:** glyphs self-lit
- **Palette:** ink, mist and teal glyphs
- **Mood:** plural, open
- **Aspect ratio / size:** 21:9 · 1920×823 px
- **File:** `images/languages.webp`
- **Alt text:** Many writing scripts floating as soft light glyphs
- **Negative prompt:** text, letters, watermark, logo, brand marks, licence plates, readable screens, stock-photo clichés (handshakes, pointing at holograms), identifiable faces without a model release, extra fingers, oversaturated neon, purple cast, no readable words, no flags

### `join` — Join as a Contributor

- **Subject:** A contributor at home with headphones and a laptop, seen from behind, warm room with a blue dusk window
- **Lens:** 35 mm, f/2
- **Lighting:** window dusk light plus lamp
- **Palette:** navy dusk, warm interior muted
- **Mood:** flexible, welcoming
- **Aspect ratio / size:** 4:3 · 1600×1200 px
- **File:** `images/join.webp`
- **Alt text:** Contributor at home with headphones and a laptop, seen from behind
- **Negative prompt:** text, letters, watermark, logo, brand marks, licence plates, readable screens, stock-photo clichés (handshakes, pointing at holograms), identifiable faces without a model release, extra fingers, oversaturated neon, purple cast, face not shown

### `quote` — Quote wizard aside

- **Subject:** An abstract path of light across a dark surface with four glowing checkpoints
- **Lens:** 35 mm, f/4, high angle
- **Lighting:** path self-lit
- **Palette:** ink surface, blue path, teal checkpoints
- **Mood:** guided, simple
- **Aspect ratio / size:** 4:3 · 1600×1200 px
- **File:** `images/quote.webp`
- **Alt text:** Abstract light path with four checkpoints
- **Negative prompt:** text, letters, watermark, logo, brand marks, licence plates, readable screens, stock-photo clichés (handshakes, pointing at holograms), identifiable faces without a model release, extra fingers, oversaturated neon, purple cast, no arrows with text

### `newsletter` — Newsletter block (small)

- **Subject:** An envelope outline drawn in teal light floating in haze
- **Lens:** 50 mm, f/2.8
- **Lighting:** self-lit line
- **Palette:** ink, teal line
- **Mood:** light, unobtrusive
- **Aspect ratio / size:** 1:1 · 800×800 px
- **File:** `images/newsletter.webp`
- **Alt text:** Envelope outline drawn in teal light
- **Negative prompt:** text, letters, watermark, logo, brand marks, licence plates, readable screens, stock-photo clichés (handshakes, pointing at holograms), identifiable faces without a model release, extra fingers, oversaturated neon, purple cast, no @ symbols, no brand marks

### `notfound` — 404 page

- **Subject:** A small globe drifting off its orbit ring in a dark void
- **Lens:** 85 mm, f/2.8
- **Lighting:** rim light only
- **Palette:** ink, mist globe, blue ring
- **Mood:** playful, calm
- **Aspect ratio / size:** 1:1 · 1200×1200 px
- **File:** `images/notfound.webp`
- **Alt text:** Small globe drifting off its orbit
- **Negative prompt:** text, letters, watermark, logo, brand marks, licence plates, readable screens, stock-photo clichés (handshakes, pointing at holograms), identifiable faces without a model release, extra fingers, oversaturated neon, purple cast, no sad faces

### `ds-text` — Dataset catalog → Text card

- **Subject:** Abstract horizontal lines of light like lines of text on a dark plane
- **Lens:** 50 mm, f/4
- **Lighting:** self-lit lines
- **Palette:** ink, mist lines
- **Mood:** structured
- **Aspect ratio / size:** 16:10 · 1600×1000 px
- **File:** `images/ds-text.webp`
- **Alt text:** Abstract text lines representing a text dataset
- **Negative prompt:** text, letters, watermark, logo, brand marks, licence plates, readable screens, stock-photo clichés (handshakes, pointing at holograms), identifiable faces without a model release, extra fingers, oversaturated neon, purple cast, no readable text

### `ds-audio` — Dataset catalog → Audio card

- **Subject:** An abstract waveform of light stretched across a dark plane
- **Lens:** 50 mm, f/4
- **Lighting:** self-lit wave
- **Palette:** ink, teal wave
- **Mood:** rhythmic
- **Aspect ratio / size:** 16:10 · 1600×1000 px
- **File:** `images/ds-audio.webp`
- **Alt text:** Abstract waveform representing an audio dataset
- **Negative prompt:** text, letters, watermark, logo, brand marks, licence plates, readable screens, stock-photo clichés (handshakes, pointing at holograms), identifiable faces without a model release, extra fingers, oversaturated neon, purple cast, no player UI

### `ds-image` — Dataset catalog → Image card

- **Subject:** An abstract grid of empty frames floating in perspective
- **Lens:** 35 mm, f/4
- **Lighting:** frames edge-lit
- **Palette:** ink, mist frames, blue edge
- **Mood:** orderly variety
- **Aspect ratio / size:** 16:10 · 1600×1000 px
- **File:** `images/ds-image.webp`
- **Alt text:** Abstract grid of frames representing an image dataset
- **Negative prompt:** text, letters, watermark, logo, brand marks, licence plates, readable screens, stock-photo clichés (handshakes, pointing at holograms), identifiable faces without a model release, extra fingers, oversaturated neon, purple cast, no real photos inside frames

### `ds-video` — Dataset catalog → Video card

- **Subject:** An abstract film strip of light curving through haze
- **Lens:** 35 mm, f/2.8
- **Lighting:** self-lit strip
- **Palette:** ink, blue strip, teal sprocket glow
- **Mood:** motion
- **Aspect ratio / size:** 16:10 · 1600×1000 px
- **File:** `images/ds-video.webp`
- **Alt text:** Abstract film strip representing a video dataset
- **Negative prompt:** text, letters, watermark, logo, brand marks, licence plates, readable screens, stock-photo clichés (handshakes, pointing at holograms), identifiable faces without a model release, extra fingers, oversaturated neon, purple cast, no brand film marks

### `case-1` — Sample case: in-car voice (illustrative)

- **Subject:** Driver's hands on a wheel at night on a highway, dashboard glowing teal, rain droplets, city bokeh
- **Lens:** 35 mm, f/2
- **Lighting:** practical dashboard light
- **Palette:** navy night, teal dash
- **Mood:** cinematic, real
- **Aspect ratio / size:** 16:9 · 1920×1080 px
- **File:** `images/case-1.webp`
- **Alt text:** Driver's hands on a wheel at night, dashboard glowing teal
- **Negative prompt:** text, letters, watermark, logo, brand marks, licence plates, readable screens, stock-photo clichés (handshakes, pointing at holograms), identifiable faces without a model release, extra fingers, oversaturated neon, purple cast, no car badges, no faces

### `case-2` — Sample case: localization (illustrative)

- **Subject:** A world map of fine light points projected on a dark wall, a silhouette in front
- **Lens:** 28 mm, f/2.8
- **Lighting:** projector light, haze
- **Palette:** navy, mist dots
- **Mood:** global, curious
- **Aspect ratio / size:** 16:9 · 1920×1080 px
- **File:** `images/case-2.webp`
- **Alt text:** World map of light points projected on a wall
- **Negative prompt:** text, letters, watermark, logo, brand marks, licence plates, readable screens, stock-photo clichés (handshakes, pointing at holograms), identifiable faces without a model release, extra fingers, oversaturated neon, purple cast, no highlighted countries

### `case-3` — Sample case: annotation at scale (illustrative)

- **Subject:** Rows of monitors in a dark room showing abstract labelled shapes, receding in perspective, haze
- **Lens:** 24 mm, f/4
- **Lighting:** screen light
- **Palette:** ink room, blue screens
- **Mood:** scale with order
- **Aspect ratio / size:** 16:9 · 1920×1080 px
- **File:** `images/case-3.webp`
- **Alt text:** Rows of monitors with abstract labelled shapes
- **Negative prompt:** text, letters, watermark, logo, brand marks, licence plates, readable screens, stock-photo clichés (handshakes, pointing at holograms), identifiable faces without a model release, extra fingers, oversaturated neon, purple cast, no text, no people's faces

### `case-4` — Sample case: low-resource transcription (illustrative)

- **Subject:** Over-ear headphones on a wooden desk beside a notebook with abstract marks, laptop showing a waveform
- **Lens:** 50 mm, f/2
- **Lighting:** warm lamp plus cool screen
- **Palette:** ink, wood muted, teal wave
- **Mood:** patient craft
- **Aspect ratio / size:** 16:9 · 1920×1080 px
- **File:** `images/case-4.webp`
- **Alt text:** Headphones beside a notebook and a laptop showing a waveform
- **Negative prompt:** text, letters, watermark, logo, brand marks, licence plates, readable screens, stock-photo clichés (handshakes, pointing at holograms), identifiable faces without a model release, extra fingers, oversaturated neon, purple cast, no readable text

### `art-1` — Article: annotation guidelines

- **Subject:** Guideline pages with highlighted example boxes, abstract marks instead of words
- **Lens:** 50 mm, f/2.8
- **Lighting:** top soft light
- **Palette:** paper mist, blue highlights
- **Mood:** clarity
- **Aspect ratio / size:** 16:9 · 1920×1080 px
- **File:** `images/art-1.webp`
- **Alt text:** Annotation guideline pages with highlighted examples
- **Negative prompt:** text, letters, watermark, logo, brand marks, licence plates, readable screens, stock-photo clichés (handshakes, pointing at holograms), identifiable faces without a model release, extra fingers, oversaturated neon, purple cast, no readable text

### `art-2` — Article: inter-annotator agreement

- **Subject:** Two hands placing matching translucent cards side by side on a dark table
- **Lens:** 65 mm, f/2.2
- **Lighting:** soft overhead light
- **Palette:** ink, mist cards, teal match glow
- **Mood:** agreement, care
- **Aspect ratio / size:** 16:9 · 1920×1080 px
- **File:** `images/art-2.webp`
- **Alt text:** Two hands placing matching cards side by side
- **Negative prompt:** text, letters, watermark, logo, brand marks, licence plates, readable screens, stock-photo clichés (handshakes, pointing at holograms), identifiable faces without a model release, extra fingers, oversaturated neon, purple cast, no faces

### `art-3` — Article: speech collection plan

- **Subject:** A planning board with a microphone and blank sticky notes
- **Lens:** 35 mm, f/2.8
- **Lighting:** cool key, warm accent
- **Palette:** ink board, mist notes, teal mic ring
- **Mood:** planned, practical
- **Aspect ratio / size:** 16:9 · 1920×1080 px
- **File:** `images/art-3.webp`
- **Alt text:** Planning board with a microphone and sticky notes, no text
- **Negative prompt:** text, letters, watermark, logo, brand marks, licence plates, readable screens, stock-photo clichés (handshakes, pointing at holograms), identifiable faces without a model release, extra fingers, oversaturated neon, purple cast, no text on notes

### `art-4` — Article: evaluating multilingual LLM outputs

- **Subject:** Speech bubbles in several scripts compared side by side on a dark screen
- **Lens:** 50 mm, f/2.8
- **Lighting:** screen light
- **Palette:** ink, mist bubbles, blue/teal outlines
- **Mood:** comparative, fair
- **Aspect ratio / size:** 16:9 · 1920×1080 px
- **File:** `images/art-4.webp`
- **Alt text:** Speech bubbles in several scripts compared on a screen
- **Negative prompt:** text, letters, watermark, logo, brand marks, licence plates, readable screens, stock-photo clichés (handshakes, pointing at holograms), identifiable faces without a model release, extra fingers, oversaturated neon, purple cast, no readable words, no chatbot logos

### `og` — Social sharing card (images/og.png ships as a brand-only placeholder)

- **Subject:** The Questverse mark and wordmark on the left, a glowing wireframe globe on the right, generous negative space
- **Lens:** flat graphic / 50 mm render
- **Lighting:** soft blue glow behind the globe
- **Palette:** ink background, mist type, teal underline
- **Mood:** premium, recognisable
- **Aspect ratio / size:** 1200:630 · 1200×630 px
- **File:** `images/og.png` (Open Graph needs PNG or JPG; keep 1200×630)
- **Alt text:** Questverse logo and tagline on a dark background
- **Negative prompt:** text, letters, watermark, logo, brand marks, licence plates, readable screens, stock-photo clichés (handshakes, pointing at holograms), identifiable faces without a model release, extra fingers, oversaturated neon, purple cast, no extra text beyond brand + tagline

## Shared style line — append to EVERY prompt

> cinematic editorial photography, deep ink-navy shadows (#070B18, #0C1430), cool mist highlights (#EAF0FF), accents of signal blue (#3D7BFF) and aurora teal (#54c8ff) from practical light sources only, soft volumetric haze, gentle film grain, calm and premium, shallow depth of field, no text, no logos, no watermarks
