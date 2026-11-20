/* =====================================================================
   Questverse — SITE CONFIG (CFG)
   Every brand value lives here. Edit this block, save, redeploy.
   NO-FAKE-PROOF: only put real, publishable facts in the proof fields.
   Anything left null/empty is either hidden or shown as SAMPLE content
   under a yellow DEMO ribbon while `demo` is true.
   ===================================================================== */
window.CFG = {
  brand: "Questverse",
  tagline: "Human fluency, engineered into AI data.",
  story: "Human expertise in every language, turned into the data that trains better AI.",
  hero: { lines: ["Fluent humans.", "Smarter machines."] },

  /* Absolute public URL of the site, WITH trailing slash (live reference: https://nativemind11.github.io/frontgoldata/).
     Used for canonical links, hreflang, sitemap, OG image and PDFs.
     e.g. "https://USER.github.io/goldata-site/" — empty = current location. */
  siteUrl: "https://nativemind11.github.io/frontgoldata/",

  email: "nativemind.contact@gmail.com",
  phone: "+201558126147",
  whatsapp: "201558126147",          // digits only, no + or spaces
  whatsappText: "Hi Questverse, I'd like to talk about a data project.",
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
  demo: false,

  /* Real proof. Leave null until you have it. Shapes:
     stats:        [{ value: "40+", label: "Languages delivered" }]   (numbers count up)
                   optional { key: "locales" } marks the transcription locale count
     testimonials: [{ quote: "...", name: "Jane Doe", role: "Head of Data, Company" }]
     rating:       { value: 4.9, source: "Clutch", url: "https://..." }
     certs:        [{ name: "<certificate name>", note: "<issuer, year>", url: "<verification link>" }]   (only with client-approved evidence)
     team:         [{ name: "...", role: "...", photo: "images/team-1.webp" }]
     cases:        same shape as SAMPLE_CASES in js/content.js
     datasets:     [{ id, title, modality: "text|audio|image|video", task, languages, volume, license, url }] */
  /* Metric row (Home, after "The difference"). Static text — no counters. Items marked pending:true are the owner's
     proposed figures: they show while showPendingStats is true (review build); set it to false to hide them until approved. */
  stats: null,                        // hidden until you have verified numbers
  showPendingStats: false,
  /* Testimonials supplied by the owner. */
  testimonials: null,                 // hidden until you have real, approved quotes
  rating: null,                       // keep hidden until a current, verifiable review source exists (never raise the 4.9)
  certs: null,
  team: null,
  cases: null,
  datasets: null,

  /* ISO badge strip (exact legacy artwork, not redrawn). Shown on Home + Trust Center ONLY when every standard below has
     verified:true AND a verifyUrl (and no past expires date). Add ?review=1 to the URL to preview it before verification
     (marked "internal preview"). The image is a badge row, not a certificate: fill issuer/certId/scope/expires/verifyUrl. */
  iso: {
    image: "images/legacy_iso_badge_trio.png", w: 2508, h: 355,
    ownerApproved: false,   // owner chose to show the badges; set false to hide them until each standard is verified below
    standards: [
      { name: "ISO 18587:2017", issuer: "", certId: "", scope: "", expires: "", verifyUrl: "", verified: false },
      { name: "ISO 9001:2015",  issuer: "", certId: "", scope: "", expires: "", verifyUrl: "", verified: false },
      { name: "ISO 17100:2015", issuer: "", certId: "", scope: "", expires: "", verifyUrl: "", verified: false },
    ],
  },

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

  i18n: { default: "en", available: ["en"] },

  /* Image formats you have uploaded for EVERY slot. ["avif","webp"] adds AVIF with WebP fallback. */
  imageFormats: ["webp"],

  /* Image assets (supplied set, 21 files incl. one alternate crop). Files: images/<asset>.webp (1280w fallback)
     plus images/<asset>-640.webp / -1280.webp / -1920.webp for srcset. Alt text lives here, once per asset. */
  assets: {
    "hero_multilingual_ai_lab": { w: 1920, h: 823, alt: "Multilingual AI data specialists reviewing speech and annotation workflows in an operations studio." },
    "team_quality_review": { w: 1920, h: 1080, alt: "AI data operations colleagues reviewing sample quality instructions at a shared worktable." },
    "process_pilot_workflow": { w: 1920, h: 1280, alt: "A client and data operations coordinator planning a small pilot and reviewing an unmarked checklist." },
    "case_voice_collection": { w: 1920, h: 1280, alt: "A contributor recording a voice prompt in a parked car for an illustrative speech-data workflow." },
    "service_data_collection": { w: 1920, h: 1280, alt: "Contributors preparing a controlled text and speech data collection session." },
    "service_annotation_workspace": { w: 1920, h: 1440, alt: "An annotator reviewing object labels on an anonymized sample frame." },
    "service_model_evaluation": { w: 1920, h: 1080, alt: "Language evaluators comparing anonymized model responses against a written rubric." },
    "service_data_evaluation_crop": { w: 1920, h: 1332, alt: "Reviewer checking anonymized records against a structured evaluation rubric on a wall display." },
    "quality_qa_checkpoint": { w: 1920, h: 1280, alt: "A quality reviewer inspecting a sample batch against an unmarked checklist." },
    "industry_healthcare_ai": { w: 1920, h: 1280, alt: "Healthcare and data specialists reviewing an anonymized workflow without patient records." },
    "industry_retail_search": { w: 1920, h: 1280, alt: "Retail search analysts comparing anonymized product examples in a real operations office." },
    "service_localization": { w: 1920, h: 1280, alt: "Native-language reviewers comparing localized interface examples." },
    "case_localization_review": { w: 1920, h: 1280, alt: "Linguists reviewing locale-specific terminology and tone for an illustrative support workflow." },
    "service_genai_safety": { w: 1920, h: 1280, alt: "Reviewers checking anonymized generative AI examples against a safety rubric." },
    "service_dataset_library": { w: 1920, h: 1440, alt: "A data specialist preparing an organized dataset package and documentation for handoff." },
    "service_speech_transcription": { w: 1920, h: 1440, alt: "A transcription specialist reviewing an audio waveform with headphones." },
    "privacy_data_governance": { w: 1920, h: 1440, alt: "A team discussing access control and data-retention procedures using anonymized materials." },
    "service_digital_systems": { w: 1920, h: 1080, alt: "Operations colleagues coordinating a multilingual data workflow across workstations." },
    "case_visual_annotation": { w: 1920, h: 1080, alt: "A computer-vision annotator reviewing a sample street-scene frame with illustrative object boxes." },
    "delivery_handoff": { w: 1920, h: 1280, alt: "A client and data operations specialist reviewing an anonymized dataset handoff package." },
    "contact_brief_session": { w: 1920, h: 1440, alt: "A client and consultant discussing the first brief for a multilingual AI data project." },
  },

  /* Image slots → asset. ar = frame aspect ratio the photo is cropped to (object-fit: cover), pos = optional focal point.
     A slot with no asset renders no <img> (no 404s). */
  images: {
    "hero-fallback": { asset: "hero_multilingual_ai_lab", ar: "7/3", w: 1920, h: 823, pos: "50% 40%" },
    "svc-1": { asset: "case_voice_collection", ar: "4/3", w: 1920, h: 1280 },
    "svc-2": { asset: "service_data_collection", ar: "4/3", w: 1920, h: 1280 },
    "svc-3": { asset: "service_annotation_workspace", ar: "4/3", w: 1920, h: 1440 },
    "svc-4": { asset: "service_model_evaluation", ar: "4/3", w: 1920, h: 1080 },
    "svc-5": { asset: "quality_qa_checkpoint", ar: "4/3", w: 1920, h: 1280 },
    "svc-6": { asset: "industry_healthcare_ai", ar: "4/3", w: 1920, h: 1280 },
    "svc-7": { asset: "service_localization", ar: "4/3", w: 1920, h: 1280 },
    "svc-8": { asset: "service_genai_safety", ar: "4/3", w: 1920, h: 1280 },
    "svc-9": { asset: "service_dataset_library", ar: "4/3", w: 1920, h: 1440 },
    "svc-10": { asset: "service_data_evaluation_crop", ar: "4/3", w: 1920, h: 1332 },
    "svc-11": { asset: "service_speech_transcription", ar: "4/3", w: 1920, h: 1440 },
    "services-hero": { asset: "service_digital_systems", ar: "16/9", w: 1920, h: 1080 },
    "hl-1": { asset: "case_localization_review", ar: "4/3", w: 1920, h: 1280 },
    "hl-2": { asset: "service_speech_transcription", ar: "4/3", w: 1920, h: 1440 },
    "hl-3": { asset: "process_pilot_workflow", ar: "4/3", w: 1920, h: 1280 },
    "flow": { asset: "process_pilot_workflow", ar: "16/9", w: 1920, h: 1280 },
    "about-team": { asset: "team_quality_review", ar: "4/3", w: 1920, h: 1080 },
    "about-mission": { asset: "service_digital_systems", ar: "3/4", w: 1920, h: 1080, pos: "70% 40%" },
    "global-trio": { asset: "team_quality_review", ar: "16/9", w: 1920, h: 1080 },
    "industries": { asset: "industry_retail_search", ar: "4/3", w: 1920, h: 1280 },
    "contact-globe": { asset: "contact_brief_session", ar: "1/1", w: 1920, h: 1440 },
    "trust": { asset: "privacy_data_governance", ar: "16/9", w: 1920, h: 1440 },
    "rfp": { asset: "delivery_handoff", ar: "16/9", w: 1920, h: 1280 },
    "resources": { asset: "team_quality_review", ar: "16/9", w: 1920, h: 1080 },
    "presence": { asset: "service_digital_systems", ar: "21/9", w: 1920, h: 1080, pos: "50% 45%" },
    "languages": { asset: "case_localization_review", ar: "21/9", w: 1920, h: 1280, pos: "50% 55%" },
    "join": { asset: "service_digital_systems", ar: "4/3", w: 1920, h: 1080 },
    "quote": { asset: "contact_brief_session", ar: "4/3", w: 1920, h: 1440 },
    "ds-text": { asset: "service_dataset_library", ar: "16/10", w: 1920, h: 1440 },
    "ds-audio": { asset: "service_speech_transcription", ar: "16/10", w: 1920, h: 1440 },
    "ds-image": { asset: "case_visual_annotation", ar: "16/10", w: 1920, h: 1080 },
    "ds-video": { asset: "service_digital_systems", ar: "16/10", w: 1920, h: 1080 },
    "case-voice": { asset: "case_voice_collection", ar: "16/9", w: 1920, h: 1280 },
    "case-localization": { asset: "case_localization_review", ar: "16/9", w: 1920, h: 1280 },
    "case-visual": { asset: "case_visual_annotation", ar: "16/9", w: 1920, h: 1080 },
    "art-1": { asset: "service_annotation_workspace", ar: "16/9", w: 1920, h: 1440 },
    "art-2": { asset: "quality_qa_checkpoint", ar: "16/9", w: 1920, h: 1280 },
    "art-3": { asset: "case_voice_collection", ar: "16/9", w: 1920, h: 1280 },
    "art-4": { asset: "service_genai_safety", ar: "16/9", w: 1920, h: 1280 },
    "notfound": { ar: "1/1", w: 1200, h: 1200, alt: "" },
    "og": { ar: "1200/630", w: 1200, h: 630, alt: "Questverse logo and tagline on a dark background" },
  },

  showSlotLabels: false,              // dev only: dashed "image slot" tag on empty frames
  year: new Date().getFullYear(),
};
