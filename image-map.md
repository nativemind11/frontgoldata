# Image map

The site uses the 20 supplied photos (plus one alternate crop). Each asset ships as `images/<asset>.webp` (1280 w fallback) and `images/<asset>-640|1280|1920.webp` for `srcset`. Alt text lives in `CFG.assets` (`js/config.js`); slots map to assets in `CFG.images`.

To swap a photo: replace the four files of that asset (same name) — no code change. To point a slot at another photo: change its `asset`.

| Asset | Size | Used by slots | Alt text |
|---|---|---|---|
| `hero_multilingual_ai_lab` | 1920×823 | `hero-fallback` (7/3) | Multilingual AI data specialists reviewing speech and annotation workflows in an operations studio. |
| `team_quality_review` | 1920×1080 | `about-team` (4/3), `global-trio` (16/9), `resources` (16/9) | AI data operations team reviewing quality controls and dataset handoff materials. |
| `process_pilot_workflow` | 1920×1280 | `hl-3` (4/3), `flow` (16/9) | Client and operations team planning a small AI data pilot with sample tasks and a delivery checklist. |
| `case_voice_collection` | 1920×1280 | `svc-1` (4/3), `case-voice` (16/9), `art-3` (16/9) | Contributor recording a consented voice prompt inside a parked car for speech data collection. |
| `service_data_collection` | 1920×1280 | `svc-2` (4/3) | Contributors recording consented text and speech data during a controlled collection session. |
| `service_annotation_workspace` | 1920×1440 | `svc-3` (4/3), `art-1` (16/9) | Annotator reviewing an AI data labelling workflow beside a quality checklist. |
| `service_model_evaluation` | 1920×1080 | `svc-4` (4/3) | Reviewers comparing anonymized AI model responses against a structured evaluation rubric. |
| `service_data_evaluation_crop` | 1920×1332 | `svc-10` (4/3) | Reviewer checking anonymized records against a structured evaluation rubric on a wall display. |
| `quality_qa_checkpoint` | 1920×1280 | `svc-5` (4/3), `art-2` (16/9) | Reviewers checking a sample batch as part of an AI data quality checkpoint. |
| `industry_healthcare_ai` | 1920×1280 | `svc-6` (4/3) | Healthcare and data specialists reviewing anonymized AI workflow material. |
| `industry_retail_search` | 1920×1280 | `industries` (4/3) | Retail operations team reviewing anonymized product search and relevance data. |
| `service_localization` | 1920×1280 | `svc-7` (4/3) | Multilingual reviewers comparing regional language variations during a localization workflow. |
| `case_localization_review` | 1920×1280 | `hl-1` (4/3), `languages` (21/9), `case-localization` (16/9) | Linguistic reviewers comparing multilingual interface phrases during a localization review. |
| `service_genai_safety` | 1920×1280 | `svc-8` (4/3), `art-4` (16/9) | Team reviewing anonymized generative AI responses and safety categories. |
| `service_dataset_library` | 1920×1440 | `svc-9` (4/3), `ds-text` (16/10) | Curated AI dataset library materials organized for secure handoff. |
| `service_speech_transcription` | 1920×1440 | `svc-11` (4/3), `hl-2` (4/3), `ds-audio` (16/10) | Speech specialist reviewing audio waveforms and transcription timestamps. |
| `privacy_data_governance` | 1920×1440 | `trust` (16/9) | Team reviewing anonymized records and access permissions for data governance. |
| `service_digital_systems` | 1920×1080 | `services-hero` (16/9), `about-mission` (3/4), `presence` (21/9), `join` (4/3), `ds-video` (16/10) | Operations team reviewing a dependable workflow system for multilingual data delivery. |
| `case_visual_annotation` | 1920×1080 | `ds-image` (16/10), `case-visual` (16/9) | Computer vision specialist reviewing anonymized street-scene frames with object annotations. |
| `delivery_handoff` | 1920×1280 | `rfp` (16/9) | Client and delivery team reviewing a structured AI dataset handoff package. |
| `contact_brief_session` | 1920×1440 | `contact-globe` (1/1), `quote` (4/3) | Client and consultant discussing the first brief for an AI data project. |

`service_data_evaluation_crop` is a different crop of `service_model_evaluation`, so Data Evaluation and AI Model Evaluation do not show the same frame.

Evidence captions: the voice-collection photo carries "Representative workflow — not a verified client result" and the visual-annotation photo "Illustrative concept — not a client result" as real HTML text (`ev.cap.*` in the i18n files), never baked into the image.
