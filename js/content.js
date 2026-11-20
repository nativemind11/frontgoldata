/* =====================================================================
   Questverse — CONTENT (original copy). Brand values live in js/config.js.
   ===================================================================== */
(function () {
  const SERVICES = [
    {
      slug: "speech-voice", n: "01", label: "Speech & Voice", scene: "mic", slot: "svc-1",
      headline: "Voices with context. Accents with nuance.",
      line: "Scripted and spontaneous speech, recorded and labeled by native speakers in the rooms, cars and streets your users actually live in.",
      subs: ["Scripted & spontaneous speech", "Wake-word & command sets", "Transcription & diarization", "Accent, dialect & code-switching"],
      what: "We design recording programs around the way people really speak: regional accents, mixed languages, background noise, hesitations and all. Native-speaker contributors record to your script or speak freely, and trained transcribers turn every clip into clean, time-aligned text with speaker turns and event tags.",
      details: [
        ["Scripted speech", "Prompt lists, read sentences and domain phrases balanced for phonetic coverage."],
        ["Conversational audio", "Two-party and multi-party dialogues with natural turn-taking and overlap."],
        ["Wake words & commands", "Short utterances captured across distances, devices and noise profiles."],
        ["Transcription", "Verbatim or clean-read transcripts with timestamps, speaker labels and tags."],
        ["Diarization", "Who spoke when, segmented precisely for multi-speaker recordings."],
        ["Dialect coverage", "Speaker demographics and dialects balanced to your target population."],
      ],
      deliverables: ["WAV/FLAC audio at your sample rate", "Time-aligned transcripts (JSON, TextGrid, SRT)", "Speaker & session metadata", "Consent records per contributor", "QA report with sampling results"],
      faq: [
        ["Can you record in specific acoustic environments?", "Yes. We plan sessions for quiet rooms, home settings, vehicles, outdoor spaces or call-center lines, and document the setup for every file."],
        ["Do you support code-switching?", "Yes. We recruit speakers who naturally mix languages and write guidelines so transcribers tag every switch consistently."],
        ["Which transcription formats do you deliver?", "Whatever your pipeline ingests: JSON, CSV, TextGrid, SRT, VTT or a custom schema we agree on up front."],
      ],
    },
    {
      slug: "data-collection", n: "02", label: "Data Collection", scene: "cubes", slot: "svc-2",
      headline: "Fresh data, gathered with intent.",
      line: "Text, audio, image and video captured to your specification by vetted contributors, with consent and metadata attached to every file.",
      subs: ["Text corpora & dialogues", "Audio in real environments", "Image capture to spec", "Video & multimodal sessions"],
      what: "Off-the-shelf datasets rarely match your product. We build collection programs from a spec: who contributes, what they capture, on which devices, in which conditions. Every file arrives with structured metadata and documented consent, ready to train on.",
      details: [
        ["Text", "Prompts, dialogues, reviews, queries and domain writing produced by native writers."],
        ["Audio", "Speech and sound captured across devices, rooms and noise conditions."],
        ["Image", "Objects, scenes, documents and handwriting photographed to your shot list."],
        ["Video", "Gestures, activities and multimodal sessions recorded with clear protocols."],
        ["Demographic balance", "Quotas by locale, age band, gender and device so your data is representative."],
        ["Consent & privacy", "Contributor agreements, de-identification and retention rules defined before capture."],
      ],
      deliverables: ["Raw and processed files in agreed formats", "Per-file metadata (JSON/CSV)", "Contributor consent documentation", "Coverage report against quotas", "Data card describing the dataset"],
      faq: [
        ["Can you collect data in a specific country?", "Usually, yes. Tell us the locale and we confirm contributor availability, local requirements and a realistic timeline before starting."],
        ["Who owns the collected data?", "Ownership terms are set in the contract. In most projects the client owns the delivered dataset outright."],
        ["How do you make sure data is diverse?", "We agree quotas up front and track them live during collection, so gaps are closed before delivery, not after."],
      ],
    },
    {
      slug: "data-annotation", n: "03", label: "Data Annotation", scene: "bbox", slot: "svc-3",
      headline: "Precise labels. Every pixel, every phoneme.",
      line: "Text, audio, image and video annotated by trained specialists who understand the language and the culture behind the content.",
      subs: ["Text: entities, intent, sentiment", "Audio: segments & events", "Image: boxes, polygons, keypoints", "Video: tracking & temporal events"],
      what: "Good labels come from people who understand what they are looking at. Our annotators are trained on your guidelines, calibrated against gold examples and reviewed in layers, so the hundredth thousand label is as careful as the first.",
      details: [
        ["Text annotation", "Named entities, intent, sentiment, toxicity, relations and classification."],
        ["Audio annotation", "Segmentation, sound events, emotion, speaker attributes and phonetic labels."],
        ["Image annotation", "Bounding boxes, polygons, semantic masks, keypoints and attributes."],
        ["Video annotation", "Object tracking, action recognition and frame-accurate event tagging."],
        ["Guideline design", "We help write or refine guidelines with edge cases and examples."],
        ["Tool flexibility", "Work in your tool, an open-source tool, or one we configure for the project."],
      ],
      deliverables: ["Labels in COCO, YOLO, Pascal VOC, JSONL or custom schema", "Guideline document with edge-case log", "Agreement & accuracy metrics", "Reviewer notes on ambiguous items"],
      faq: [
        ["Can you work inside our annotation tool?", "Yes. We regularly work in client platforms and in common open-source tools, and adapt our QA layer to fit."],
        ["How do you handle ambiguous items?", "Annotators flag them, leads resolve them, and the decision is added to the guideline so it never repeats."],
        ["Can we start with a small batch?", "Yes. A pilot batch is the best way to align guidelines, quality targets and throughput."],
      ],
    },
    {
      slug: "ai-model-evaluation", n: "04", label: "AI Model Evaluation", scene: "score", slot: "svc-4",
      headline: "Know how your model behaves before your users do.",
      line: "Native-speaker evaluators rate accuracy, fluency, safety and cultural fit, so you ship with evidence instead of hope.",
      subs: ["Side-by-side preference ranking", "Accuracy, fluency & cultural fit", "Benchmark & golden-set design", "Safety & bias review"],
      what: "Automatic metrics miss what people notice first: awkward phrasing, wrong register, cultural misses and unsafe answers. We build evaluation programs with clear rubrics and calibrated raters, then report results you can act on.",
      details: [
        ["Preference ranking", "A/B and side-by-side comparisons with reasoned judgments."],
        ["Rubric scoring", "Accuracy, helpfulness, fluency and tone rated on agreed scales."],
        ["Cultural fit", "Native evaluators check idiom, register and local appropriateness."],
        ["Golden sets", "Curated, verified reference sets for regression testing."],
        ["Safety review", "Harmful, biased or policy-violating outputs found and categorized."],
        ["Speech model checks", "Word-error review, pronunciation and naturalness for voice models."],
      ],
      deliverables: ["Scored datasets with rater rationale", "Rubric & calibration documentation", "Per-locale results summary", "Issue taxonomy with examples"],
      faq: [
        ["How do you keep raters consistent?", "Calibration rounds against gold items, ongoing agreement tracking and regular re-calibration."],
        ["Can you evaluate several languages at once?", "Yes. We run parallel rater pools per locale with one shared rubric and per-locale notes."],
        ["Do you evaluate speech and voice models?", "Yes, including recognition accuracy review and naturalness ratings for synthesized voices."],
      ],
    },
    {
      slug: "quality-assurance", n: "05", label: "Quality Assurance", scene: "qa", slot: "svc-5",
      headline: "Quality you can audit, not just trust.",
      line: "Quality is designed before production: gold examples, calibration, layered review, issue taxonomy and a delivery report that separates accepted work from open questions.",
      subs: ["Multi-pass review workflows", "Gold-standard & consensus checks", "Agreement reporting", "Linguist-led spot audits"],
      what: "Quality is a system, not a promise. We combine qualified contributors, calibrated guidelines, multi-pass review and statistical sampling, then show you the numbers. We can also audit existing datasets and fix what we find.",
      details: [
        ["Multi-pass review", "Second-pass and expert review tiers sized to the risk of each task."],
        ["Gold checks", "Hidden reference items measure accuracy continuously."],
        ["Consensus labeling", "Multiple independent judgments where ambiguity is high."],
        ["Agreement metrics", "Inter-annotator agreement tracked and shared through the project."],
        ["Dataset audits", "Sampling and review of third-party or legacy data with a fix plan."],
        ["Root-cause loops", "Errors traced back to guidelines or training and corrected at the source."],
      ],
      deliverables: ["QA plan & acceptance criteria", "Sampling methodology", "Accuracy & agreement reports", "Corrected dataset with change log"],
      faq: [
        ["Can you audit data another vendor produced?", "Yes. We sample, review, report and, if you want, correct the dataset."],
        ["What accuracy target do you work to?", "The one we agree with you. We set acceptance criteria per task before work begins and report against them."],
        ["Do we see quality results during the project?", "Yes. You receive regular quality reports, not just a final summary."],
      ],
    },
    {
      slug: "industry-solutions", n: "06", label: "Industry Solutions", scene: "grid", slot: "svc-6",
      headline: "Data shaped to your domain.",
      line: "Programs built around the vocabulary, regulation and edge cases of your industry, with contributors who know the field.",
      subs: ["Automotive & in-car voice", "Healthcare & life sciences", "Finance & customer support", "Retail, media & e-commerce"],
      what: "Every industry has its own words, risks and rules. We match subject-aware contributors to your domain, adapt guidelines to its edge cases and handle data under the confidentiality it demands.",
      details: [
        ["Automotive", "In-car commands, cabin noise conditions and multi-occupant speech."],
        ["Healthcare", "Clinical terminology handled by qualified reviewers under strict controls."],
        ["Finance", "Support dialogues, documents and intent data with sensitive-data handling."],
        ["Retail & e-commerce", "Product data, search queries, reviews and catalog localization."],
        ["Media", "Subtitling data, content tagging and audio-visual annotation."],
        ["Public sector & education", "Accessible, multilingual datasets for citizen-facing services."],
      ],
      deliverables: ["Domain-adapted guidelines & glossaries", "Specialist contributor profiles", "Datasets in your formats", "Compliance & handling summary"],
      faq: [
        ["Do you work with regulated data?", "We scope handling requirements first and only start once security and access controls are agreed in writing."],
        ["Can you supply subject-matter experts?", "For many domains, yes. We confirm specialist availability during scoping."],
        ["Is my industry covered?", "If it is not listed, ask. Most programs are custom and we will tell you plainly if it is not a fit."],
      ],
    },
    {
      slug: "translation-localization", n: "07", label: "Translation & Localization", scene: "loc", slot: "svc-7",
      headline: "Meaning that travels intact.",
      line: "Datasets, prompts and products translated and adapted by native linguists, so your AI sounds local everywhere it speaks.",
      subs: ["Dataset & prompt translation", "Transcreation & cultural adaptation", "Locale-specific terminology", "Linguistic validation & LQA"],
      what: "Literal translation produces literal models. Our linguists adapt meaning, tone and cultural reference for each locale, keep terminology consistent and validate the result, whether it is a training set, an eval suite or a product interface.",
      details: [
        ["Dataset translation", "Training and evaluation data translated with label consistency preserved."],
        ["Prompt localization", "Prompts and instructions adapted so intent survives across languages."],
        ["Transcreation", "Creative copy re-written for local impact, not just translated."],
        ["Terminology", "Glossaries and style guides built and enforced per locale."],
        ["Linguistic QA", "Native review of fluency, accuracy and locale conventions."],
        ["Product localization", "UI strings, help content and voice-assistant responses."],
      ],
      deliverables: ["Translated files in source format", "Glossary & style guide per locale", "LQA scorecards", "Query log with resolutions"],
      faq: [
        ["Do you use machine translation?", "Only if you want it. When MT is used, native linguists post-edit and we label it clearly in delivery."],
        ["Can you localize into dialects, not just languages?", "Yes. We distinguish regional variants and staff linguists for the specific locale you target."],
        ["How do you keep terminology consistent?", "Shared glossaries, style guides and automated checks run on every batch."],
      ],
    },
    {
      slug: "generative-ai", n: "08", label: "Generative AI Services", scene: "core", slot: "svc-8",
      headline: "Human judgment, where generative models need it most.",
      line: "RLHF, red-teaming, fine-tuning data and prompt evaluation from skilled, native-speaking experts in every language you serve.",
      subs: ["RLHF & preference data", "LLM red-teaming", "Supervised fine-tuning data", "Prompt engineering & evaluation"],
      what: "Large models learn taste from people. We supply the humans behind that loop: writers who craft demonstration data, raters who judge preference with reasons, and red-teamers who probe for failure across languages and cultures.",
      details: [
        ["RLHF", "Ranked responses with rationales to train reward models."],
        ["Red-teaming", "Adversarial prompts across safety categories, languages and cultural contexts."],
        ["SFT data", "High-quality prompt–response pairs written by domain-aware experts."],
        ["Prompt engineering", "Prompt libraries designed, tested and scored for consistency."],
        ["Multilingual alignment", "Native experts check that behavior holds outside English."],
        ["Conversation data", "Multi-turn dialogues with persona, tone and task variety."],
      ],
      deliverables: ["Preference & ranking datasets (JSONL)", "SFT pairs with metadata", "Red-team findings with severity", "Prompt library & evaluation scores"],
      faq: [
        ["Can you red-team in languages other than English?", "Yes. Multilingual red-teaming is a core reason teams come to us: failure modes differ by language and culture."],
        ["Do your writers have domain expertise?", "We staff by task. For specialist domains we recruit and test contributors with relevant background."],
        ["How is sensitive red-team content handled?", "Under agreed wellbeing and access protocols, with restricted teams and secure storage."],
      ],
    },
    {
      slug: "off-the-shelf-datasets", n: "09", label: "Off-the-Shelf Datasets", scene: "shelf", slot: "svc-9", unit: "items", catalog: true,
      headline: "Ready-made data, held to custom standards.",
      line: "Licensable datasets for object detection, instruction tuning, speech recognition and image classification, documented so you know exactly what you are buying.",
      subs: ["Object Detection", "Instruction Tuning", "Speech Recognition", "Image Classification"],
      what: "Sometimes a project needs to start this week, not next quarter. Off-the-shelf datasets give your team a documented starting point: clear provenance, consent records, a data card and a sample you can inspect before you license. When a catalog set is close but not exact, we extend it with custom collection under the same quality system.",
      details: [
        ["Object Detection", "Images with boxes, classes and attributes in common formats, plus the guideline used to label them."],
        ["Instruction Tuning", "Prompt and response pairs written and reviewed by native speakers, organized by task and register."],
        ["Speech Recognition", "Transcribed audio with speaker metadata and recording conditions described per file."],
        ["Image Classification", "Labelled image sets with class definitions, edge-case notes and balance information."],
        ["Inspect before you license", "Request a sample and a data card first, so fit is proven before any commitment."],
        ["Extend on demand", "Close a coverage gap with custom collection that matches the existing schema."],
      ],
      deliverables: ["Dataset files in documented formats", "Data card: provenance, consent, composition, known limits", "Sample pack for evaluation", "License terms in writing", "Optional custom extension plan"],
      faq: [
        ["Can we see a sample before licensing?", "Yes. Every catalog set has a sample and a data card you can review before any agreement."],
        ["What if a dataset is close but not exact?", "We can extend it with custom collection or annotation that follows the same schema and guidelines."],
        ["How is consent documented?", "Each dataset's data card explains how contributors were recruited, what they agreed to and how the data may be used."],
      ],
    },
    {
      slug: "data-evaluation", n: "10", label: "Data Evaluation", scene: "evalx", slot: "svc-10", unit: "tasks",
      headline: "Proof that your data, and your model, hold up.",
      line: "Training data validation, AI model evaluation, audio and speech data review and search relevance judgments by calibrated human raters.",
      subs: ["Training Data Validation", "AI Model Evaluation", "Audio & Speech Data Evaluation", "Search Relevance"],
      what: "Before data trains a model, and before a model meets users, someone should check it with care. Our evaluators work to written rubrics, calibrate against reference items and report findings in a form your team can act on: what is wrong, how often, and where it comes from.",
      details: [
        ["Training Data Validation", "Sampling and review of datasets for label accuracy, coverage gaps, duplicates and leakage."],
        ["AI Model Evaluation", "Rubric scoring and side-by-side comparisons by native-speaking raters."],
        ["Audio & Speech Data Evaluation", "Transcript accuracy, audio quality, speaker metadata and consent completeness checked."],
        ["Search Relevance", "Query-result judgments on graded scales, with locale-aware raters and clear guidelines."],
        ["Calibrated raters", "Agreement tracked against reference items, with re-calibration when drift appears."],
        ["Actionable reporting", "Findings grouped by root cause, with examples and suggested fixes."],
      ],
      deliverables: ["Evaluation plan and rubric", "Scored items with rationale", "Findings report by category and locale", "Rater agreement summary", "Recommended fixes"],
      faq: [
        ["Can you evaluate data we already have?", "Yes. We sample your dataset, agree acceptance criteria and report what we find, with an optional fix plan."],
        ["How are search relevance raters trained?", "On your guidelines and a graded reference set, with calibration rounds before production judgments."],
        ["Do you evaluate speech data specifically?", "Yes: transcript accuracy, segmentation, audio quality and metadata completeness."],
      ],
    },
    {
      slug: "transcription", n: "11", label: "Transcription", scene: "transcript", slot: "svc-11", unit: "audio",
      headline: "Every word, timed and attributed.",
      line: "Audio, image and video transcription by trained native transcribers, with secure handling for high-volume programs.",
      subs: ["Audio Transcription", "Image Transcription", "Video Transcription", "Secure High-Volume Delivery"],
      what: "Transcripts are only useful when they are consistent. We agree a style guide with you up front: verbatim or clean read, how to mark noise, overlaps, hesitations and code-switching, which timestamp granularity you need. Then trained native transcribers apply it, and reviewers check it, batch after batch.",
      details: [
        ["Audio Transcription", "Verbatim or clean-read transcripts with timestamps, speaker labels and event tags."],
        ["Image Transcription", "Text in photos, documents and handwriting captured with layout and reading order."],
        ["Video Transcription", "Speech and on-screen text transcribed with frame-accurate timing for subtitles or training."],
        ["Secure High-Volume Delivery", "Restricted teams, controlled access and agreed retention for large, sensitive programs."],
        ["Style guide first", "Conventions for noise, overlap, numbers and code-switching agreed before work starts."],
        ["Layered review", "Second-pass review and spot audits measured against your acceptance criteria."],
      ],
      deliverables: ["Transcripts in JSON, TXT, SRT, VTT or TextGrid", "Style guide and edge-case log", "Speaker and segment metadata", "QA sampling report"],
      faq: [
        ["Verbatim or clean read?", "Either. We agree the convention with you and document it in the style guide."],
        ["Can you handle sensitive recordings?", "Yes, under restricted access, signed confidentiality agreements and retention rules agreed in writing."],
        ["Which locales do you cover?", "Share your list. We confirm transcriber availability per locale before quoting a timeline."],
      ],
    },
  ];

  const PROCESS = [
    ["Scope", "We agree goals, locales, formats, quality targets and timelines in writing."],
    ["Pilot", "A small batch aligns guidelines and proves quality before scaling."],
    ["Produce", "Trained, calibrated teams work in layered review with live quality tracking."],
    ["Deliver", "Data, metadata and quality reports land in your format, on schedule."],
  ];

  const VALUES = [
    ["Quality by design", "Calibrated contributors, layered review and measurable acceptance criteria on every project."],
    ["Multi-format fluency", "Text, audio, image and video handled by one team that understands how they connect."],
    ["Secure delivery", "Least-privilege access, NDAs and controlled environments agreed before any data moves."],
    ["Global, locally native", "Native speakers who know the culture behind the language, wherever your users are."],
  ];

  const FLOW = [
    ["Define your data needs", "Tell us the model, the languages and the outcome. We turn it into a clear spec with quotas, formats and quality targets."],
    ["Collect & process", "Native contributors capture and label your data inside guided workflows, with every step tracked and every file traceable."],
    ["Review & deliver", "Layered review and gold checks clear each batch before it ships, with a quality report you can actually read."],
  ];

  const WHY = [
    ["Native expertise", "Contributors work in their own language and culture, not a learned one."],
    ["Linguist-led QA", "Quality is owned by language specialists, not left to automated checks alone."],
    ["Your formats, your tools", "We fit your pipeline instead of asking you to fit ours."],
    ["One accountable team", "A single project lead from scoping to final delivery."],
  ];

  const FAQ = [
    ["Which languages and dialects do you cover?", "We build teams around your target locales, including regional dialects and lower-resource languages. Share your list and we confirm coverage, contributor availability and timelines before any work starts."],
    ["How do you keep our data secure?", "Access is limited to the people who need it, contributors sign confidentiality agreements, and we agree storage, transfer and deletion rules with you before any data moves. We can work inside your environment when required."],
    ["How do you control quality?", "Contributors are qualified and calibrated against gold examples, work passes through layered review, and accuracy is measured continuously. You see quality reports throughout the project, not just at the end."],
    ["What is a typical turnaround?", "It depends on volume, languages and complexity. After scoping we give you a written schedule with milestones; pilots typically come first so the timeline rests on real throughput."],
    ["Can we start with a pilot?", "Yes, and we recommend it. A pilot aligns guidelines and quality targets on a small batch before you commit to full volume."],
    ["How is pricing structured?", "Per unit (hour of audio, item, label or word), per evaluator hour, or a fixed project fee — whichever fits the work. Every quote is itemized so you know exactly what you pay for."],
    ["Which tools do you work with?", "Your own platform, common open-source annotation tools, or a setup we configure for the project. Delivery formats follow your pipeline."],
    ["Will you sign our NDA?", "Yes. We are happy to sign your NDA before scoping, or provide ours. Contributor confidentiality agreements apply to every project."],
  ];

  const ABOUT = {
    mission: "We exist to make AI understand people as they really are: every language, every accent, every culture. That takes humans, and it takes discipline. We bring both.",
    approach: [
      ["Start from the outcome", "We begin with what your model must do in the real world, then work back to the data it needs."],
      ["Native by default", "Work is done by people living the language, so nuance is captured, not approximated."],
      ["Measure everything", "Quality targets are agreed in writing and reported openly from the first batch."],
    ],
    quality: [
      ["Qualify", "Contributors are tested for language skill and task aptitude before they touch your data."],
      ["Calibrate", "Teams train on your guidelines and gold examples until agreement is consistent."],
      ["Review", "Every batch passes layered review, sized to the risk of the task."],
      ["Report", "Accuracy, agreement and issues are shared with you, with fixes traced to the root."],
    ],
    values: [
      ["Respect for people", "Fair work, clear guidelines and care for the contributors behind every dataset."],
      ["Honesty", "If a request is not a fit, or a timeline is unrealistic, we say so early."],
      ["Precision", "Small details decide model behavior. We sweat them."],
      ["Curiosity", "Every language teaches us something. We stay students of all of them."],
      ["Confidentiality", "Your data, your models and your roadmap stay yours."],
    ],
  };

  /* SAMPLE content — only shown when CFG.demo is true, always under a DEMO ribbon. */
  const SAMPLE = {   /* intentionally empty: no placeholder proof ships. Real proof goes in CFG (js/config.js). */
    stats: [], testimonials: [], certs: [], team: [],
  };

  /* Three case studies, each labelled by evidence state:
       "verified"       – client-approved, evidence on file (none yet)
       "representative" – a workflow we run, described without client names or results
       "illustration"   – a concept written to show structure
     No speaker counts, utterance counts, accuracy or improvement figures appear until a client approves them. */
  const SAMPLE_CASES = [
    {
      slug: "voice-data-in-car-assistant", slot: "case-voice", evidence: "representative",
      caption: "Representative workflow — not a verified client result.",
      tag: "Speech & Voice", cats: ["Speech & Voice", "Data Collection", "Industry Solutions"], industry: "Automotive",
      title: "Voice data for an in-car assistant",
      summary: "How voice commands can be recorded under realistic cabin conditions, with consent, transcription, segmentation, metadata and QA built in.",
      challenge: "An in-car assistant trained on studio speech struggles once a real driver speaks: road noise, a fan at full blast, a passenger talking over the command, an accent the model has rarely heard. The data has to be recorded where the product will be used, and every recording has to arrive with consent and context attached.",
      approach: [
        ["Recording under real conditions", "Sessions are planned for parked, city and highway conditions, with window, fan and media states logged for every file."],
        ["Consent first", "Each contributor agrees to the recording and its purpose before the session starts, and the record travels with the audio."],
        ["Transcription", "Native transcribers write what was said, tag noise events, overlaps and language switches, and follow one written guideline."],
        ["Segmentation", "Long takes are cut into utterances with timestamps so each command can be used on its own."],
        ["Metadata", "Speaker profile fields, device, seat position and acoustic conditions are stored as structured fields, not free text."],
        ["QA", "A second reviewer checks a sample of every batch against the guideline; issues are logged and fixed before handoff."],
      ],
      outcome: "What the team receives: audio with consent records, aligned transcripts, structured metadata and a delivery report that separates accepted work from open questions. This page does not publish speaker or utterance counts; those appear only after the client approves them.",
      takeaways: ["Record where the product lives, not where it is convenient.", "Attach consent and conditions to every file.", "Keep transcription, segmentation and QA in one traceable flow."],
    },
    {
      slug: "localization-multilingual-support-assistant", slot: "case-localization", evidence: "representative",
      caption: "Representative workflow — not a verified client result.",
      tag: "Translation & Localization", cats: ["Translation & Localization", "AI Model Evaluation"], industry: "Customer support AI",
      title: "Localization for a multilingual support assistant",
      summary: "What changes when native reviewers adapt support content for each locale instead of translating it word for word.",
      challenge: "A support assistant that is translated rather than localized reads as foreign: the intent shifts, the tone is too stiff or too casual, and edge cases such as formal address or regional wording are missed. The team needs content that works for each locale, with a way to show it was checked.",
      approach: [
        ["Glossary", "Product terms and fixed phrases are agreed once per locale and shared with every reviewer."],
        ["Native review", "Reviewers who live the locale read each item for meaning, fluency and regional fit."],
        ["Intent", "Each phrase is checked against the intent behind it, so a reply still does what the source reply does."],
        ["Tone", "A short locale brief sets register and formality; reviewers flag any drift from it."],
        ["Edge cases", "Dialect words, mixed-language input, numbers, dates and polite forms are collected as a running list."],
        ["LQA", "A linguistic quality pass scores a sample with a written error taxonomy, and corrections go back into the glossary."],
      ],
      outcome: "What the team receives: localized content per locale, the glossary and tone brief behind it, an issue log by category and a delivery report. No improvement figure or percentage is shown here; any such claim needs client evidence.",
      takeaways: ["Separate translation from adaptation in the plan.", "Write the tone brief before the first item.", "Evaluate each locale with native reviewers."],
    },
    {
      slug: "annotation-evaluation-visual-ai", slot: "case-visual", evidence: "illustration",
      caption: "Illustrative concept — not a client result.",
      tag: "Data Annotation", cats: ["Data Annotation", "Quality Assurance", "AI Model Evaluation"], industry: "Computer vision",
      title: "Annotation and evaluation for visual AI",
      summary: "A concept for how object labels on street-scene frames can be defined, piloted, reviewed and exported in a schema the model team can load.",
      challenge: "Labels drift when guidelines are loose: two annotators draw the same object two ways, and a category boundary nobody wrote down becomes noise in the training set. The team needs rules, evidence of agreement and a clean export before volume starts.",
      approach: [
        ["Guidelines", "Written rules with pictured examples for every class, including what does not count."],
        ["Pilot batch", "A small batch is labelled first to find unclear rules while they are cheap to fix."],
        ["Category boundaries", "Confusing pairs such as occluded objects or similar classes get a decision rule and an example each."],
        ["Disagreement report", "Items where annotators differ are listed and resolved by a lead, and the rule is updated."],
        ["Review sample", "A sample of finished work is reviewed by a second person before the batch is accepted."],
        ["Export schema", "Labels are delivered in the format and field names the model team agreed, with a version note."],
      ],
      outcome: "What the team would receive: a guideline document, a pilot report with the disagreement list, reviewed batches and an export that matches the agreed schema. This is a concept written to show structure, not a client engagement.",
      takeaways: ["Pilot before volume.", "Turn every disagreement into a written rule.", "Agree the export schema before labelling starts."],
    },
  ];

  /* Per-service brief: the problem it solves, how the work runs, the gates a batch must pass and the limits we state up front.
     Evidence status for every brief is "representative": it describes how we run the service, not a client result. */
  const SERVICE_BRIEF = {
    "speech-voice": {
      problem: "Speech models fail on the voices, accents and rooms they never heard. Recordings made in a quiet studio say little about how people really talk.",
      steps: [["Scope the speakers", "Agree locales, dialects, age bands and recording conditions."], ["Brief and consent", "Contributors get prompts and agree to the recording and its use."], ["Record", "Sessions run in the agreed environments with a logged setup."], ["Review", "Native reviewers check audio and transcripts against the guideline."], ["Hand off", "Audio, transcripts, metadata and the QA report are delivered."]],
      gates: ["Consent record present for every contributor", "Audio checked for clipping, noise and truncation", "Transcript sample reviewed against the written guideline"],
      limits: ["Locale and dialect availability is confirmed per project, not assumed.", "Speaker and hour counts are agreed in the scope, not promised in advance."],
    },
    "data-collection": {
      problem: "Public or scraped data rarely matches the task. Models need text, audio, image or video gathered to a specification, with a clear record of where it came from.",
      steps: [["Write the specification", "Define content, quotas, formats and exclusions."], ["Recruit and brief", "Select contributors for the locale and task and brief them."], ["Collect", "Capture under the agreed protocol with metadata on every file."], ["Check", "Reviewers sample each batch against the specification."], ["Hand off", "Deliver files, metadata, consent records and a batch report."]],
      gates: ["Every file carries consent and source metadata", "Quota coverage reported against the specification", "Duplicates and out-of-scope items removed before delivery"],
      limits: ["We collect only what contributors have agreed to share.", "Sensitive categories need an extra written agreement before work starts."],
    },
    "data-annotation": {
      problem: "Labels decide what a model learns. Loose guidelines produce labels that disagree with each other, and that disagreement becomes noise in training.",
      steps: [["Write guidelines", "Rules with examples for every label, including edge cases."], ["Pilot batch", "Label a small batch to find unclear rules early."], ["Calibrate", "Align annotators on disagreements and update the rules."], ["Produce", "Label at volume with review layers sized to the risk."], ["Export", "Deliver labels in the agreed schema with a version note."]],
      gates: ["Pilot batch accepted before production starts", "Disagreements logged and resolved into written rules", "Review sample passed before each batch ships"],
      limits: ["Guideline changes after production starts can need rework, and we flag that early.", "Label taxonomy is agreed with you; we do not invent classes."],
    },
    "ai-model-evaluation": {
      problem: "Automatic metrics miss what users notice: tone, fluency, correctness in context. Teams need structured human judgement they can repeat.",
      steps: [["Define the rubric", "Agree criteria, scales and what each score means."], ["Calibrate raters", "Raters score shared examples until they agree on the rubric."], ["Rate", "Raters score model outputs, blind to the system where possible."], ["Reconcile", "Disagreements are reviewed and the rubric is tightened."], ["Report", "Scores, comments and a list of failure patterns are delivered."]],
      gates: ["Raters pass a calibration set before live work", "Agreement between raters is measured and reported", "Rubric version recorded with every score"],
      limits: ["Human ratings describe the sample reviewed, not the whole model.", "Reviewer panels are matched to the locale and domain per project."],
    },
    "quality-assurance": {
      problem: "Quality that is checked only at the end arrives too late. Teams need to know what was accepted, what was fixed and what is still open.",
      steps: [["Set acceptance criteria", "Write what a passing item looks like for each task."], ["Seed gold examples", "Add reference items with known answers to the stream."], ["Review in layers", "Sample and second-review work by risk."], ["Log issues", "Classify problems with an issue taxonomy."], ["Report", "Deliver a report that separates accepted work from open questions."]],
      gates: ["Acceptance criteria signed off before production", "Gold-item results tracked per batch", "Open issues listed in the delivery report"],
      limits: ["Sampling shows the quality of the sample, and the report states the sample size used.", "We do not publish accuracy figures without client-approved evidence."],
    },
    "industry-solutions": {
      problem: "Domain data carries domain risk. Healthcare, retail, automotive and search each need reviewers who know the field and handling that respects it.",
      steps: [["Understand the domain", "Agree vocabulary, risks and what must never appear in data."], ["Match specialists", "Select reviewers with relevant background."], ["Set handling rules", "Define anonymization and access limits up front."], ["Run the workflow", "Produce and review under those rules."], ["Hand off", "Deliver data and a record of the handling applied."]],
      gates: ["Anonymization rules agreed in writing", "Domain reviewer sign-off on guidelines", "Access limited to named team members"],
      limits: ["We do not work with identifiable patient records in demos or samples.", "Regulated work needs a signed agreement that covers your regulator's rules."],
    },
    "translation-localization": {
      problem: "Translated text that ignores register, culture and regional wording makes products feel foreign and trains models to sound that way.",
      steps: [["Locale brief", "Set register, formality and sensitive topics per locale."], ["Glossary", "Agree product terms and fixed phrases."], ["Adapt", "Native linguists adapt content rather than convert it."], ["Review", "A second linguist reviews meaning, fluency and fit."], ["LQA", "Score a sample with an error taxonomy and feed fixes back."]],
      gates: ["Glossary applied consistently across reviewers", "Second linguist review on every batch", "LQA error categories reported"],
      limits: ["A locale is listed as requestable, not as ready-made coverage.", "Reviewer availability by dialect is confirmed per project."],
    },
    "generative-ai": {
      problem: "Generative models need human-written examples, preference judgements and safety review that reflect the people and places they will serve.",
      steps: [["Define the task", "Agree prompts, response style and safety categories."], ["Write or collect", "Contributors write prompts and reference answers."], ["Rate and compare", "Reviewers rank outputs against a rubric."], ["Safety review", "Check outputs against agreed categories."], ["Deliver", "Hand over data with the rubric and a review report."]],
      gates: ["Safety categories defined before review starts", "Anonymized outputs only in review material", "Sample re-reviewed by a second person"],
      limits: ["Reviewers see the material the scope allows and no more.", "Human review reduces risk; it does not guarantee a model's behaviour."],
    },
    "off-the-shelf-datasets": {
      problem: "Starting from scratch costs time. Existing datasets help only if scope, licence and format are clear before you commit.",
      steps: [["Share your need", "Describe task, languages, modality and format."], ["Match", "We check what exists against that need."], ["Review the terms", "Scope, licence and format are written down."], ["Sample", "Where possible, you see a sample before you decide."], ["Deliver", "Data is handed over securely with its documentation."]],
      gates: ["Scope, licence, format and last-reviewed date stated", "Sample available before purchase where the licence allows", "Source and consent status documented"],
      limits: ["The catalog lists only real datasets; sample cards in demo mode are placeholders.", "Licence terms vary by dataset and are agreed in writing."],
    },
    "data-evaluation": {
      problem: "A dataset can look complete and still be wrong in places. Teams need an independent review of existing data before they train on it.",
      steps: [["Define checks", "Agree what to look for: errors, gaps, bias, duplicates."], ["Draw a sample", "Select items that represent the whole set."], ["Review", "Reviewers check items against a rubric."], ["Summarize", "Group findings by type and severity."], ["Report", "Deliver findings with suggested fixes."]],
      gates: ["Sampling method written down", "Findings grouped by a defined issue taxonomy", "Reviewer agreement measured"],
      limits: ["Findings describe the sample reviewed; the report states its size.", "We review data you provide and do not alter the original files."],
    },
    "transcription": {
      problem: "Speech models and search need accurate, time-aligned text. Accents, overlap and noise are where automatic transcripts break.",
      steps: [["Set the style", "Choose verbatim or clean-read, and the tags to use."], ["Segment", "Cut audio into units with timestamps."], ["Transcribe", "Native transcribers write each segment."], ["Review", "A second reviewer checks a sample against the guideline."], ["Deliver", "Hand over transcripts in your format with a QA note."]],
      gates: ["Style guide agreed before work begins", "Timestamps checked on a sample", "Second-pass review on difficult audio"],
      limits: ["Locale availability is confirmed per project and not assumed.", "Very poor audio can limit accuracy; we flag it rather than guess."],
    },
  };
  SERVICES.forEach((s) => Object.assign(s, { brief: SERVICE_BRIEF[s.slug] }));

  /* Per-service presentation extras: icon + spot illustration + interactive demo + planner unit. */
  const SERVICE_EXTRAS = {
    "speech-voice": { icon: "speech", illo: "waveform", demo: "waveform", unit: "audio" },
    "data-collection": { icon: "collection", illo: "shelf", demo: "waveform", unit: "items" },
    "data-annotation": { icon: "annotation", illo: "bbox", demo: "annotate", unit: "items" },
    "ai-model-evaluation": { icon: "evaluation", illo: "scorecards", demo: "funnel", unit: "tasks" },
    "quality-assurance": { icon: "quality", illo: "shield", demo: "funnel", unit: "items" },
    "industry-solutions": { icon: "industry", illo: "workflow", demo: "annotate", unit: "items" },
    "translation-localization": { icon: "localization", illo: "orbit", demo: "orbit", unit: "words" },
    "generative-ai": { icon: "genai", illo: "workflow", demo: "typewriter", unit: "tasks" },
    "off-the-shelf-datasets": { icon: "datasets", illo: "shelf", demo: "annotate", unit: "items" },
    "data-evaluation": { icon: "dataeval", illo: "scorecards", demo: "funnel", unit: "tasks" },
    "transcription": { icon: "transcription", illo: "waveform", demo: "typewriter", unit: "audio" },
  };
  SERVICES.forEach((s) => Object.assign(s, SERVICE_EXTRAS[s.slug] || {}, { unit: s.unit || (SERVICE_EXTRAS[s.slug] || {}).unit || "items" }));

  /* Service groups for the mega menu */
  const SERVICE_GROUPS = [
    ["Create data", ["data-collection", "speech-voice", "transcription", "off-the-shelf-datasets"]],
    ["Label & adapt", ["data-annotation", "translation-localization", "industry-solutions"]],
    ["Evaluate & align", ["ai-model-evaluation", "data-evaluation", "quality-assurance", "generative-ai"]],
  ];

  const INTRO = {
    title: "Smart Data, Human Expertise",
    body: "AI is only as good as what it learns from. We combine trained native-speaking people with disciplined workflows, so the data behind your model is accurate, representative and ready to use.",
  };

  const GLOBAL_TRIO = [
    ["Multilingual Data", "Text, speech and evaluation work in the languages and dialects your users speak, staffed per locale."],
    ["Human in the Loop", "People where judgment matters: writing, rating, reviewing and correcting what automation gets wrong."],
    ["Quality Assurance", "Quality is designed before production: gold examples, calibration, layered review, issue taxonomy and a delivery report that separates accepted work from open questions."],
  ];

  const HIGHLIGHTS = [
    ["Text & Language Data", "Prompts, dialogues, classification and translation work produced and reviewed by native speakers.", "hl-1", "languages"],
    ["Speech & Audio Workflows", "Recording, transcription, segmentation and evaluation run as one connected pipeline.", "hl-2", "speech"],
    ["Flexible Project Execution", "From a small pilot batch to a long-running program, with the team sized to the work.", "hl-3", "workflow"],
  ];

  const APPROACH_DIFF = [
    ["Project-Specific Workflows", "Each program gets its own guidelines, quotas and review depth instead of a generic template.", "workflow"],
    ["Contributor Matching", "People are selected for language, dialect, domain and task aptitude, then tested before they start.", "contributor"],
    ["Built-In Quality Review", "Review layers and reference checks are designed into the workflow, not added at the end.", "quality"],
    ["Multi-Format Expertise", "Text, audio, image and video handled by one team that understands how they connect.", "collection"],
  ];

  const CASE_CATEGORIES = ["AI Model Evaluation", "Data Annotation", "Data Collection", "Industry Solutions", "Quality Assurance", "Speech & Voice", "Translation & Localization"];

  const DATASET_MODALITIES = ["text", "audio", "image", "video"];
  /* SAMPLE catalog cards (demo mode only) — structure only, no invented volumes or clients. */
  const SAMPLE_DATASETS = [
    { id: "s-text-1", title: "Instruction-tuning pairs (sample card)", modality: "text", task: "Instruction Tuning", languages: "To be listed", volume: "To be listed", license: "To be agreed", slot: "ds-text" },
    { id: "s-text-2", title: "Intent-labelled queries (sample card)", modality: "text", task: "Text Classification", languages: "To be listed", volume: "To be listed", license: "To be agreed", slot: "ds-text" },
    { id: "s-audio-1", title: "Read speech set (sample card)", modality: "audio", task: "Speech Recognition", languages: "To be listed", volume: "To be listed", license: "To be agreed", slot: "ds-audio" },
    { id: "s-audio-2", title: "Conversational audio (sample card)", modality: "audio", task: "Speech Recognition", languages: "To be listed", volume: "To be listed", license: "To be agreed", slot: "ds-audio" },
    { id: "s-image-1", title: "Street-scene objects (sample card)", modality: "image", task: "Object Detection", languages: "n/a", volume: "To be listed", license: "To be agreed", slot: "ds-image" },
    { id: "s-image-2", title: "Product photos by class (sample card)", modality: "image", task: "Image Classification", languages: "n/a", volume: "To be listed", license: "To be agreed", slot: "ds-image" },
    { id: "s-video-1", title: "Gesture clips (sample card)", modality: "video", task: "Action Recognition", languages: "n/a", volume: "To be listed", license: "To be agreed", slot: "ds-video" },
    { id: "s-video-2", title: "Talking-head video (sample card)", modality: "video", task: "Audio-visual Speech", languages: "To be listed", volume: "To be listed", license: "To be agreed", slot: "ds-video" },
  ];

  const ROLES = [
    ["Transcribers", "Turn speech into accurate, consistently formatted text in your native language.", "transcription"],
    ["Speakers", "Record scripted or natural speech from home or in guided sessions.", "speech"],
    ["Annotators", "Label text, images, audio or video carefully against written guidelines.", "annotation"],
    ["Linguists", "Translate, adapt, write and review language data with cultural precision.", "languages"],
    ["QA Reviewers", "Check others' work against acceptance criteria and explain what to fix.", "quality"],
  ];

  const TRUST = [
    ["Security approach", "Least-privilege access, separate project workspaces and access removed when a contributor's work ends. Storage, transfer and deletion rules are agreed with you before any data moves, and we can work inside your environment when required.", "security"],
    ["NDA & consent handling", "We sign client NDAs before scoping. Every contributor signs a confidentiality agreement, and data collection uses written, purpose-specific consent that is kept with the dataset.", "document"],
    ["Contributor vetting", "Contributors are verified, tested for language and task skill, trained on your guidelines and monitored with hidden reference items throughout the project.", "contributor"],
    ["QA stages", "Qualify, calibrate, produce with layered review, measure against written acceptance criteria and report, with errors traced back to their root cause.", "quality"],
    ["Retention & deletion", "Client data is kept only as long as the project needs it, then deleted or returned using the method and timing set in your agreement.", "shield"],
    ["GDPR-aware handling", "We collect the minimum personal data needed, document the purpose, support data-subject requests and can sign a data processing agreement. Our setup is described honestly on request; we do not claim certifications we do not hold.", "globe"],
  ];

  const RFP = {
    onboarding: [
      ["Introduce", "A call to understand your model, languages, data types and constraints."],
      ["Paperwork", "NDA, security questionnaire, vendor forms and any data processing agreement."],
      ["Scope", "A written scope with formats, quotas, quality targets and timeline."],
      ["Pilot", "A small paid or agreed batch that proves fit before full commitment."],
      ["Scale", "Production with regular reporting and a single accountable lead."],
    ],
    pilot: [
      ["Scope", "One task, a few locales, clear acceptance criteria and a fixed sample size."],
      ["Sample", "We produce the pilot batch under production conditions, not a showcase."],
      ["Review", "You review the batch against the criteria; we share our own QA results alongside."],
      ["Scale", "Guidelines and throughput are locked in, then volume increases with the same team."],
    ],
  };

  const ARTICLES = [
    {
      slug: "writing-annotation-guidelines", slot: "art-1", tags: ["Data Annotation", "Quality Assurance"], date: "2026-11-01",
      title: "Writing annotation guidelines people can actually follow",
      summary: "Guidelines decide label quality long before anyone draws a box. A practical structure for writing them, testing them and keeping them alive.",
      sections: [
        ["Start from the decision, not the tool", "A guideline exists to make many people take the same decision on the same item. Before describing buttons and shortcuts, write down the decision itself: what question does the annotator answer for each item, and what are the allowed answers? If two experienced people cannot agree on that question in one sentence, the project is not ready for volume."],
        ["Define every label with a boundary", "For each label give a one-line definition, a clear positive example, a near-miss that is NOT this label, and the rule that separates them. Near-misses do more work than positives: they show where the line is. Keep examples visual for images and video, and quote real snippets for text and audio."],
        ["Write the edge-case log on day one", "Ambiguity is guaranteed. Create a running log where annotators submit unclear items, a lead decides, and the decision becomes a numbered rule with an example. Version the guideline so everyone knows which rules apply to which batch."],
        ["Test before you scale", "Run a calibration round: several annotators label the same small set, then compare. Disagreements point straight at weak definitions. Fix the text, rerun, and only move to production when agreement is stable."],
        ["Keep it short at the top", "Put a one-page summary first: the decision, the labels, the five most common mistakes. Detail goes underneath. People re-read summaries; they rarely re-read forty pages."],
      ],
    },
    {
      slug: "inter-annotator-agreement", slot: "art-2", tags: ["Quality Assurance", "AI Model Evaluation"], date: "2026-10-18",
      title: "Inter-annotator agreement, explained without the math anxiety",
      summary: "What agreement metrics tell you, what they hide, and how to use them to improve data instead of just reporting a number.",
      sections: [
        ["Why agreement matters", "If independent people label the same item differently, the model learns noise. Agreement measures how often qualified annotators reach the same answer. Low agreement usually means the task or the guideline is unclear, not that people are careless."],
        ["Raw agreement versus chance-corrected scores", "Raw percent agreement is easy to read but flatters tasks where one label dominates. Chance-corrected measures such as Cohen's kappa (two raters) or Krippendorff's alpha (many raters, missing data) adjust for agreement that would happen by luck. Use raw agreement for intuition and a corrected score for decisions."],
        ["Look per label, not just overall", "A single overall score can hide one label that nobody agrees on. Break agreement down by label, by locale and by annotator. The weakest slice is where your next guideline fix should go."],
        ["Agreement is not accuracy", "A team can agree consistently on the wrong answer. Pair agreement with hidden reference items that have verified answers, so you measure both consistency and correctness."],
        ["Turn the number into action", "Every agreement report should end with changes: rules added to the guideline, examples updated, annotators recalibrated. A metric that does not change the work is decoration."],
      ],
    },
    {
      slug: "designing-a-speech-collection-plan", slot: "art-3", tags: ["Speech & Voice", "Data Collection"], date: "2026-10-02",
      title: "Designing a speech collection plan",
      summary: "Who speaks, what they say, where they record and how you will know the data is balanced: a planning checklist for speech data.",
      sections: [
        ["Describe the target population", "Start from the people who will use the product: languages, dialects, age bands, genders, accents and devices. Turn that description into quotas. A plan without quotas tends to over-represent whoever is easiest to recruit."],
        ["Choose the speech style", "Read speech gives control and phonetic coverage; spontaneous speech gives realism. Many plans mix both: scripted prompts for coverage, guided conversations for natural turn-taking, hesitations and code-switching."],
        ["Specify the acoustic conditions", "List the environments that matter (quiet room, home, car, street, call line), the devices and the microphone distance. Log these as structured metadata per file so you can filter and balance later."],
        ["Settle consent and privacy early", "Decide what contributors agree to, how long recordings are kept, whether personal details may appear in speech and how they are removed. Write it down before the first session."],
        ["Plan quality checks", "Define audio checks (clipping, silence, sample rate), content checks (did they say the prompt?) and transcript checks. Track quota fill live so gaps close during collection, not after."],
      ],
    },
    {
      slug: "evaluating-multilingual-llm-outputs", slot: "art-4", tags: ["AI Model Evaluation", "Translation & Localization"], date: "2026-09-20",
      title: "Evaluating multilingual LLM outputs",
      summary: "Why English-only evaluation misleads, and how to design rubrics and rater pools that work across languages and cultures.",
      sections: [
        ["Do not translate your English eval set and stop", "Translated prompts carry English assumptions about politeness, humor and context. Native writers should adapt or author prompts per locale so you test the situations real users create."],
        ["One rubric, local notes", "Keep a shared rubric so results compare across languages, then add per-locale notes: register, honorifics, script conventions, culturally sensitive topics. Raters need both."],
        ["Rate what users notice", "Accuracy and helpfulness matter, but so do fluency, tone and cultural fit. A correct answer in the wrong register still feels broken to a native speaker."],
        ["Calibrate every pool", "Run calibration rounds per language against reference items. Agreement can differ a lot between locales; a weak pool produces misleading results no matter how good the rubric is."],
        ["Report per locale", "Averages across languages hide failures in smaller markets. Report each locale separately, with examples of typical issues, so teams can fix what matters where it matters."],
      ],
    },
  ];

  const GLOSSARY = [
    ["Active learning", "Selecting the most informative unlabeled items for humans to label next."],
    ["Annotation", "Adding labels or structure to raw data so a model can learn from it."],
    ["ASR", "Automatic speech recognition: converting speech audio into text."],
    ["Benchmark", "A fixed dataset and procedure used to compare models consistently."],
    ["Bounding box", "A rectangle drawn around an object in an image or video frame."],
    ["Calibration round", "A session where raters label the same items and align on disagreements."],
    ["Clean read", "A transcript style that removes hesitations and false starts while keeping meaning."],
    ["Code-switching", "Moving between two or more languages within one conversation or sentence."],
    ["Cohen's kappa", "An agreement score for two raters that corrects for chance agreement."],
    ["Consensus labeling", "Combining several independent judgments into one final label."],
    ["Consent record", "Documentation of what a contributor agreed to and how their data may be used."],
    ["Data card", "A short document describing a dataset's origin, composition, intended use and limits."],
    ["Data leakage", "When evaluation data also appears in training data, inflating results."],
    ["Diarization", "Segmenting audio by speaker to show who spoke when."],
    ["Dialect", "A regional or social variety of a language with its own vocabulary or pronunciation."],
    ["Edge case", "An unusual item the guideline does not clearly cover."],
    ["Gold item", "A reference item with a verified answer used to measure accuracy."],
    ["Guideline", "The written rules annotators follow to make consistent decisions."],
    ["Hallucination", "A model output that is fluent but not supported by facts or input."],
    ["Human in the loop", "A workflow where people review, correct or guide automated output."],
    ["Inter-annotator agreement", "How often independent annotators give the same answer to the same item."],
    ["Instruction tuning", "Fine-tuning a model on prompt and response pairs so it follows instructions."],
    ["Intent", "The goal behind a user's request, such as booking, cancelling or asking."],
    ["Keypoint", "A labelled point on an object, such as a joint on a human pose."],
    ["Krippendorff's alpha", "An agreement measure for any number of raters, tolerant of missing data."],
    ["Locale", "A language plus region combination, such as Arabic (Egypt) or French (Canada)."],
    ["Low-resource language", "A language with little digital text, audio or tooling available."],
    ["LQA", "Linguistic quality assurance: native review of translated or localized content."],
    ["Named entity", "A real-world item in text, such as a person, place, organization or date."],
    ["Orthography", "The agreed spelling and writing conventions of a language."],
    ["Pilot", "A small batch produced under real conditions to prove fit before scaling."],
    ["Polygon", "A many-sided shape traced tightly around an object's outline."],
    ["Preference data", "Pairs or rankings of model outputs judged by people, used to train reward models."],
    ["Prompt", "The input text or instruction given to a generative model."],
    ["Quota", "A target count for a group in a dataset, such as speakers per dialect."],
    ["Red-teaming", "Deliberately probing a model to find unsafe or unwanted behavior."],
    ["RLHF", "Reinforcement learning from human feedback: training models using human preferences."],
    ["Rubric", "A scoring guide that defines what each rating level means."],
    ["Search relevance", "How well a search result answers the intent of a query."],
    ["Segmentation", "Dividing data into meaningful parts, such as pixels by class or audio by utterance."],
    ["SFT", "Supervised fine-tuning on examples of desired model behavior."],
    ["Style guide", "Conventions for formatting, terminology and tone in transcripts or translations."],
    ["Transcreation", "Re-creating content for another culture rather than translating it literally."],
    ["Verbatim", "A transcript style that keeps every hesitation, repetition and filler word."],
    ["Wake word", "A short phrase that activates a voice assistant."],
    ["WER", "Word error rate: the share of words a speech recognizer gets wrong."],
  ];

  const CHECKLISTS = [
    { slug: "annotation-guideline-checklist", title: "Annotation guideline checklist", items: ["The core decision is written in one sentence", "Every label has a definition, a positive example and a near-miss", "Rules separate each pair of confusable labels", "An edge-case log exists with an owner", "The guideline is versioned and dated", "A one-page summary sits at the top", "A calibration round is scheduled before production", "Acceptance criteria are written and measurable"] },
    { slug: "speech-collection-checklist", title: "Speech collection plan checklist", items: ["Target languages, dialects and demographics are listed", "Quotas are set per group", "Speech style (read, guided, spontaneous) is chosen", "Acoustic environments and devices are specified", "Metadata fields are defined per file", "Consent wording and retention rules are approved", "Audio, content and transcript checks are defined", "Quota fill is tracked live during collection"] },
    { slug: "vendor-security-checklist", title: "Data vendor security checklist", items: ["NDA signed before scoping", "Contributor confidentiality agreements in place", "Least-privilege access and removal process described", "Storage location and transfer method agreed", "Retention period and deletion method written down", "Incident contact and notification process named", "Subprocessors listed", "Certifications claimed are verified, or documentation requested"] },
  ];

  const LEGAL = {
    updated: "2026-11-13",
    privacy: [
      ["Who we are", "This website is operated by Questverse. Contact us at the email address shown on the Contact page for any privacy question."],
      ["What we collect", "Only what you send us through forms (such as your name, email, mobile number, company and project details) and the minimum technical data needed to deliver the site. We do not use advertising or tracking cookies."],
      ["Why we use it", "To reply to your request, prepare a scope or quote, assess contributor applications, and, if you subscribed, send updates you asked for."],
      ["Where it is stored", "Form submissions are stored in a database operated by our hosting providers, listed in the Trust Center when configured. Access is limited to people who need it."],
      ["How long we keep it", "We keep inquiries and applications only as long as needed for the purpose above, then delete them. You can ask us to delete your data at any time."],
      ["Your rights", "Depending on where you live, you may have the right to access, correct, delete or export your data, and to object to or restrict processing. Contact us to exercise these rights."],
      ["Cookies and local storage", "We store your language and consent choice in your browser so the site remembers them. Optional analytics run only if you turn them on."],
      ["Changes", "We may update this notice. The date at the top shows the latest version."],
    ],
    terms: [
      ["Use of this site", "This website describes Questverse's services. You may browse and share links to it. Do not misuse the site, attempt to break its security, or submit false information."],
      ["No offer", "Content on this site, including estimates, examples and sample material, is informational. Services are provided only under a signed agreement."],
      ["Illustrations and samples", "Anything marked as an illustration, sample or demo is not a description of real clients, results or data."],
      ["Intellectual property", "Text, graphics and code on this site belong to Questverse or their licensors unless stated otherwise."],
      ["Third-party links", "Links to other websites are provided for convenience. We are not responsible for their content."],
      ["Liability", "The site is provided as is. To the extent allowed by law, we are not liable for losses arising from its use."],
      ["Governing law", "These terms are governed by the law stated in your service agreement, or otherwise by the law of the place where Questverse is established."],
    ],
  };

  window.CONTENT = { SERVICES, SERVICE_GROUPS, PROCESS, VALUES, FLOW, WHY, FAQ, ABOUT, SAMPLE, SAMPLE_CASES, INTRO, GLOBAL_TRIO, HIGHLIGHTS, APPROACH_DIFF, CASE_CATEGORIES, DATASET_MODALITIES, SAMPLE_DATASETS, ROLES, TRUST, RFP, ARTICLES, GLOSSARY, CHECKLISTS, LEGAL };
})();
