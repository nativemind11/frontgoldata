/* =====================================================================
   GOLDATA — SITE CONFIG (CFG)
   Every brand value lives here. Edit this block, save, redeploy.
   NO-FAKE-PROOF: only put real, publishable facts in the proof fields.
   Anything left null/empty is either hidden or shown as SAMPLE content
   under a yellow DEMO ribbon while `demo` is true.
   ===================================================================== */
window.CFG = {
  brand: "GOLDATA",
  tagline: "Human fluency, engineered into AI data.",
  story: "Human expertise in every language, turned into the data that trains better AI.",
  hero: { lines: ["Fluent humans.", "Smarter machines."] },

  /* Absolute public URL of the site, WITH trailing slash.
     Used for canonical links, hreflang, sitemap, OG image and PDFs.
     e.g. "https://USER.github.io/goldata-site/" — empty = current location. */
  siteUrl: "",

  email: "nativemind.contact@gmail.com",
  phone: "+201558126147",
  whatsapp: "201558126147",          // digits only, no + or spaces
  whatsappText: "Hi GOLDATA, I'd like to talk about a data project.",
  address: "",                        // shown in contact details when filled
  mapQ: "",                           // Google Maps search text; empty = map hidden
  incidentEmail: "",                  // security incident contact; empty = uses `email`

  socials: {                          // any link left as "#" is hidden
    facebook: "#",
    x: "#",
    youtube: "#",
    linkedin: "#",
    instagram: "#",
  },

  /* Back end. After deploying back/ on Vercel set e.g.
     apiBase: "https://goldata-back.vercel.app/api"
     → forms post to /contact, /quote, /pilot, /contributor, /subscriber.
     Empty = mailto fallback (newsletter + contributor forms then open email). */
  apiBase: "",

  /* DEMO MODE — true shows clearly ribboned SAMPLE content. false hides every empty block. */
  demo: true,

  /* Real proof. Leave null until you have it. Shapes:
     stats:        [{ value: "40+", label: "Languages delivered" }]   (numbers count up)
                   optional { key: "locales" } marks the transcription locale count
     testimonials: [{ quote: "...", name: "Jane Doe", role: "Head of Data, Company" }]
     rating:       { value: 4.9, source: "Clutch", url: "https://..." }
     certs:        [{ name: "ISO/IEC 27001", note: "Certified 2026", url: "" }]
     team:         [{ name: "...", role: "...", photo: "images/team-1.webp" }]
     cases:        same shape as SAMPLE_CASES in js/content.js
     datasets:     [{ id, title, modality: "text|audio|image|video", task, languages, volume, license, url }] */
  stats: null,
  testimonials: null,
  rating: null,
  certs: null,
  team: null,
  cases: null,
  datasets: null,

  /* Languages a visitor can REQUEST (Language Explorer + quote wizard).
     Listing a language is not a coverage claim. Add `modalities: ["text","speech","image","video"]`
     to an entry ONLY when you have confirmed delivery capacity for it. */
  languages: [
    { code: "ar", name: "Arabic (Modern Standard)", native: "العربية", script: "Arabic", region: "MENA" },
    { code: "ar-EG", name: "Arabic (Egyptian)", native: "مصري", script: "Arabic", region: "MENA" },
    { code: "ar-SA", name: "Arabic (Gulf)", native: "خليجي", script: "Arabic", region: "MENA" },
    { code: "ar-MA", name: "Arabic (Maghrebi)", native: "دارجة", script: "Arabic", region: "MENA" },
    { code: "ar-LB", name: "Arabic (Levantine)", native: "شامي", script: "Arabic", region: "MENA" },
    { code: "en-US", name: "English (US)", native: "English", script: "Latin", region: "Americas" },
    { code: "en-GB", name: "English (UK)", native: "English", script: "Latin", region: "Europe" },
    { code: "en-IN", name: "English (India)", native: "English", script: "Latin", region: "Asia" },
    { code: "en-NG", name: "English (Nigeria)", native: "English", script: "Latin", region: "Africa" },
    { code: "fr-FR", name: "French (France)", native: "Français", script: "Latin", region: "Europe" },
    { code: "fr-CA", name: "French (Canada)", native: "Français", script: "Latin", region: "Americas" },
    { code: "es-ES", name: "Spanish (Spain)", native: "Español", script: "Latin", region: "Europe" },
    { code: "es-MX", name: "Spanish (Mexico)", native: "Español", script: "Latin", region: "Americas" },
    { code: "pt-BR", name: "Portuguese (Brazil)", native: "Português", script: "Latin", region: "Americas" },
    { code: "pt-PT", name: "Portuguese (Portugal)", native: "Português", script: "Latin", region: "Europe" },
    { code: "de", name: "German", native: "Deutsch", script: "Latin", region: "Europe" },
    { code: "it", name: "Italian", native: "Italiano", script: "Latin", region: "Europe" },
    { code: "nl", name: "Dutch", native: "Nederlands", script: "Latin", region: "Europe" },
    { code: "sv", name: "Swedish", native: "Svenska", script: "Latin", region: "Europe" },
    { code: "no", name: "Norwegian", native: "Norsk", script: "Latin", region: "Europe" },
    { code: "da", name: "Danish", native: "Dansk", script: "Latin", region: "Europe" },
    { code: "fi", name: "Finnish", native: "Suomi", script: "Latin", region: "Europe" },
    { code: "pl", name: "Polish", native: "Polski", script: "Latin", region: "Europe" },
    { code: "cs", name: "Czech", native: "Čeština", script: "Latin", region: "Europe" },
    { code: "ro", name: "Romanian", native: "Română", script: "Latin", region: "Europe" },
    { code: "hu", name: "Hungarian", native: "Magyar", script: "Latin", region: "Europe" },
    { code: "el", name: "Greek", native: "Ελληνικά", script: "Greek", region: "Europe" },
    { code: "tr", name: "Turkish", native: "Türkçe", script: "Latin", region: "Europe" },
    { code: "ru", name: "Russian", native: "Русский", script: "Cyrillic", region: "Europe" },
    { code: "uk", name: "Ukrainian", native: "Українська", script: "Cyrillic", region: "Europe" },
    { code: "bg", name: "Bulgarian", native: "Български", script: "Cyrillic", region: "Europe" },
    { code: "sr", name: "Serbian", native: "Српски", script: "Cyrillic", region: "Europe" },
    { code: "he", name: "Hebrew", native: "עברית", script: "Hebrew", region: "MENA" },
    { code: "fa", name: "Persian", native: "فارسی", script: "Arabic", region: "MENA" },
    { code: "ur", name: "Urdu", native: "اردو", script: "Arabic", region: "Asia" },
    { code: "ku", name: "Kurdish (Kurmanji)", native: "Kurmancî", script: "Latin", region: "MENA" },
    { code: "hi", name: "Hindi", native: "हिन्दी", script: "Devanagari", region: "Asia" },
    { code: "bn", name: "Bengali", native: "বাংলা", script: "Bengali", region: "Asia" },
    { code: "pa", name: "Punjabi", native: "ਪੰਜਾਬੀ", script: "Gurmukhi", region: "Asia" },
    { code: "mr", name: "Marathi", native: "मराठी", script: "Devanagari", region: "Asia" },
    { code: "ta", name: "Tamil", native: "தமிழ்", script: "Tamil", region: "Asia" },
    { code: "te", name: "Telugu", native: "తెలుగు", script: "Telugu", region: "Asia" },
    { code: "gu", name: "Gujarati", native: "ગુજરાતી", script: "Gujarati", region: "Asia" },
    { code: "zh-CN", name: "Chinese (Mandarin, Simplified)", native: "中文", script: "Han", region: "Asia" },
    { code: "zh-TW", name: "Chinese (Traditional)", native: "中文", script: "Han", region: "Asia" },
    { code: "yue", name: "Cantonese", native: "粵語", script: "Han", region: "Asia" },
    { code: "ja", name: "Japanese", native: "日本語", script: "Japanese", region: "Asia" },
    { code: "ko", name: "Korean", native: "한국어", script: "Hangul", region: "Asia" },
    { code: "vi", name: "Vietnamese", native: "Tiếng Việt", script: "Latin", region: "Asia" },
    { code: "th", name: "Thai", native: "ไทย", script: "Thai", region: "Asia" },
    { code: "id", name: "Indonesian", native: "Bahasa Indonesia", script: "Latin", region: "Asia" },
    { code: "ms", name: "Malay", native: "Bahasa Melayu", script: "Latin", region: "Asia" },
    { code: "tl", name: "Filipino (Tagalog)", native: "Filipino", script: "Latin", region: "Asia" },
    { code: "sw", name: "Swahili", native: "Kiswahili", script: "Latin", region: "Africa" },
    { code: "am", name: "Amharic", native: "አማርኛ", script: "Ethiopic", region: "Africa" },
    { code: "ha", name: "Hausa", native: "Hausa", script: "Latin", region: "Africa" },
    { code: "yo", name: "Yoruba", native: "Yorùbá", script: "Latin", region: "Africa" },
    { code: "ig", name: "Igbo", native: "Igbo", script: "Latin", region: "Africa" },
    { code: "zu", name: "Zulu", native: "isiZulu", script: "Latin", region: "Africa" },
    { code: "so", name: "Somali", native: "Soomaali", script: "Latin", region: "Africa" },
    { code: "ber", name: "Berber (Tamazight)", native: "ⵜⴰⵎⴰⵣⵉⵖⵜ", script: "Tifinagh", region: "Africa" },
    { code: "qu", name: "Quechua", native: "Runa Simi", script: "Latin", region: "Americas" },
  ],

  /* Global presence — ONLY real locations. Empty array = the presence globe/map is hidden.
     [{ city: "Cairo", country: "Egypt", lat: 30.04, lon: 31.24, note: "Head office" }] */
  presence: [],

  /* "Reach us" widget. null = hidden (demo mode shows a ribboned sample).
     hours: { tz: "Africa/Cairo", days: [0,1,2,3,4], open: "09:00", close: "17:00" }  (0 = Sunday)
     responseTime: "within one business day" */
  hours: null,
  responseTime: "",
  bookingUrl: "",                     // e.g. a free Cal.com / Google appointment link; empty = button hidden

  /* Trust Center */
  subprocessors: [],                  // [{ name: "Supabase", purpose: "Lead storage", location: "EU" }]
  /* Example SLA outline (Enterprise page). Wording only — real terms are agreed per contract. */
  sla: [
    { area: "Scope confirmation", target: "Written scope after the brief call", note: "Timing agreed per project" },
    { area: "Pilot delivery", target: "Pilot batch delivered on the agreed date", note: "Date set in the pilot plan" },
    { area: "Quality acceptance", target: "Acceptance criteria defined per task before production", note: "Measured on every batch" },
    { area: "Rework", target: "Batches below acceptance are reworked", note: "Terms in the contract" },
    { area: "Reporting", target: "Regular quality and progress reports", note: "Cadence agreed at kickoff" },
    { area: "Data deletion", target: "Client data deleted or returned at project end", note: "Method and timing in the DPA" },
  ],
  /* Contract & invoicing placeholders. Empty = "Provided during onboarding". */
  contract: { legalEntity: "", registration: "", taxId: "", invoicing: "", paymentTerms: "", currencies: "" },

  /* Pilot Planner (service pages) — produces an ILLUSTRATIVE effort band in team-days.
     Never a price. effort = (setup + volume × perUnit × reviewFactor × complexityFactor) × (1 + (languages − 1) × langFactor) */
  pilot: {
    setup: [2, 4],
    langFactor: 0.35,
    review: { standard: 1, double: 1.35, expert: 1.7 },
    complexity: { simple: 0.8, typical: 1, complex: 1.5 },
    units: {
      audio:  { label: "Hours of audio", min: 1, max: 200, step: 1, value: 10, perUnit: [0.12, 0.25] },
      items:  { label: "Items (thousands)", min: 1, max: 100, step: 1, value: 5, perUnit: [0.4, 0.8] },
      words:  { label: "Words (thousands)", min: 5, max: 500, step: 5, value: 50, perUnit: [0.05, 0.1] },
      tasks:  { label: "Evaluation tasks (hundreds)", min: 1, max: 100, step: 1, value: 10, perUnit: [0.3, 0.6] },
    },
  },

  /* Privacy-first analytics hook — OFF by default. Loaded only after the visitor
     opts in on the consent banner. e.g. { src: "https://cloud.umami.is/script.js", attrs: { "data-website-id": "..." } } */
  analytics: null,

  i18n: { default: "en", available: ["en", "ar", "fr", "es", "de"] },

  /* Image formats you have uploaded for EVERY slot. ["avif","webp"] adds AVIF with WebP fallback. */
  imageFormats: ["webp"],

  /* Image slots: images/<slot>.<format>. alt = accessible description, ar = aspect ratio, w/h = intrinsic size (prevents layout shift). */
  images: {
    "hero-fallback": { alt: "Glowing data globe seen through a ring of light", ar: "16/9", w: 1920, h: 1080 },
    "svc-1": { alt: "Studio microphone in a dark recording booth with a ring of teal light", ar: "1/1", w: 1600, h: 1600 },
    "svc-2": { alt: "Hands recording a city street on a phone at dusk", ar: "1/1", w: 1600, h: 1600 },
    "svc-3": { alt: "Monitor showing an abstract street scene with bounding boxes", ar: "1/1", w: 1600, h: 1600 },
    "svc-4": { alt: "Hand choosing between two translucent evaluation cards", ar: "1/1", w: 1600, h: 1600 },
    "svc-5": { alt: "Magnifying loupe on printed waveform sheets under a desk lamp", ar: "1/1", w: 1600, h: 1600 },
    "svc-6": { alt: "Car cabin at night lit in blue and teal", ar: "1/1", w: 1600, h: 1600 },
    "svc-7": { alt: "Abstract handwritten strokes in several scripts on layered paper", ar: "1/1", w: 1600, h: 1600 },
    "svc-8": { alt: "Faceted glass polyhedron glowing from within", ar: "1/1", w: 1600, h: 1600 },
    "svc-9": { alt: "Shelves of glowing data blocks in a dark archive", ar: "1/1", w: 1600, h: 1600 },
    "svc-10": { alt: "Translucent checklist panels with light gauges", ar: "1/1", w: 1600, h: 1600 },
    "svc-11": { alt: "Headphones beside a screen showing a waveform turning into lines of text", ar: "1/1", w: 1600, h: 1600 },
    "services-hero": { alt: "Wide abstract composition of light panels representing data services", ar: "16/9", w: 1920, h: 1080 },
    "hl-1": { alt: "Abstract layered text glyphs in soft light", ar: "4/3", w: 1600, h: 1200 },
    "hl-2": { alt: "Sound waves rendered as thin teal lines", ar: "4/3", w: 1600, h: 1200 },
    "hl-3": { alt: "Modular blocks rearranging on a dark surface", ar: "4/3", w: 1600, h: 1200 },
    "flow": { alt: "Three glass panels joined by lines of light", ar: "16/9", w: 1920, h: 1080 },
    "about-team": { alt: "A small team working around a table in a dim studio", ar: "4/3", w: 1600, h: 1200 },
    "about-mission": { alt: "A person listening closely with headphones, face turned away", ar: "3/4", w: 1200, h: 1600 },
    "global-trio": { alt: "Three glowing objects representing languages, people and quality", ar: "16/9", w: 1920, h: 1080 },
    "industries": { alt: "Composite of a car dashboard, hospital corridor, headset and shelf", ar: "4/3", w: 1600, h: 1200 },
    "contact-globe": { alt: "Glowing glass globe on a dark plinth", ar: "1/1", w: 1600, h: 1600 },
    "trust": { alt: "Abstract shield of light over a dark data room", ar: "16/9", w: 1920, h: 1080 },
    "rfp": { alt: "Neatly stacked documents and a pen under cool light", ar: "16/9", w: 1920, h: 1080 },
    "resources": { alt: "Open notebook with abstract diagrams under a desk lamp", ar: "16/9", w: 1920, h: 1080 },
    "presence": { alt: "Dotted world map glowing on a dark wall", ar: "21/9", w: 1920, h: 823 },
    "languages": { alt: "Many writing scripts floating as soft light glyphs", ar: "21/9", w: 1920, h: 823 },
    "join": { alt: "Contributor at home with headphones and a laptop, seen from behind", ar: "4/3", w: 1600, h: 1200 },
    "quote": { alt: "Abstract light path with four checkpoints", ar: "4/3", w: 1600, h: 1200 },
    "newsletter": { alt: "Envelope outline drawn in teal light", ar: "1/1", w: 800, h: 800 },
    "notfound": { alt: "Small globe drifting off its orbit", ar: "1/1", w: 1200, h: 1200 },
    "ds-text": { alt: "Abstract text lines representing a text dataset", ar: "16/10", w: 1600, h: 1000 },
    "ds-audio": { alt: "Abstract waveform representing an audio dataset", ar: "16/10", w: 1600, h: 1000 },
    "ds-image": { alt: "Abstract grid of frames representing an image dataset", ar: "16/10", w: 1600, h: 1000 },
    "ds-video": { alt: "Abstract film strip representing a video dataset", ar: "16/10", w: 1600, h: 1000 },
    "case-1": { alt: "Driver's hands on a wheel at night, dashboard glowing teal", ar: "16/9", w: 1920, h: 1080 },
    "case-2": { alt: "World map of light points projected on a wall", ar: "16/9", w: 1920, h: 1080 },
    "case-3": { alt: "Rows of monitors with abstract labelled shapes", ar: "16/9", w: 1920, h: 1080 },
    "case-4": { alt: "Headphones beside a notebook and a laptop showing a waveform", ar: "16/9", w: 1920, h: 1080 },
    "art-1": { alt: "Annotation guideline pages with highlighted examples", ar: "16/9", w: 1920, h: 1080 },
    "art-2": { alt: "Two hands placing matching cards side by side", ar: "16/9", w: 1920, h: 1080 },
    "art-3": { alt: "Planning board with a microphone and sticky notes, no text", ar: "16/9", w: 1920, h: 1080 },
    "art-4": { alt: "Speech bubbles in several scripts compared on a screen", ar: "16/9", w: 1920, h: 1080 },
    "og": { alt: "GOLDATA logo and tagline on a dark background", ar: "1200/630", w: 1200, h: 630 },
  },

  showSlotLabels: true,               // small "image slot" tag on empty image frames
  year: new Date().getFullYear(),
};
