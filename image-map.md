# Image map

The site uses the 20 supplied photos (plus one alternate crop). Each asset ships as `images/<asset>.webp` (1280 w fallback) and `images/<asset>-640|1280|1920.webp` for `srcset`. Alt text lives in `CFG.assets` (`js/config.js`); slots map to assets in `CFG.images`.

To swap a photo: replace the four files of that asset (same name) — no code change. To point a slot at another photo: change its `asset`.

| Asset | Size | Used by slots | Alt text |
|---|---|---|---|
| `hero_multilingual_ai_lab` | 1920×823 | `hero-fallback` (7/3) | Multilingual AI data specialists reviewing speech and annotation workflows in an operations studio. |
| `team_quality_review` | 1920×1080 | `about-team` (4/3), `global-trio` (16/9), `resources` (16/9) | AI data operations colleagues reviewing sample quality instructions at a shared worktable. |
| `process_pilot_workflow` | 1920×1280 | `hl-3` (4/3), `flow` (16/9) | A client and data operations coordinator planning a small pilot and reviewing an unmarked checklist. |
| `case_voice_collection` | 1920×1280 | `svc-1` (4/3), `case-voice` (16/9), `art-3` (16/9) | A contributor recording a voice prompt in a parked car for an illustrative speech-data workflow. |
| `service_data_collection` | 1920×1280 | `svc-2` (4/3) | Contributors preparing a controlled text and speech data collection session. |
| `service_annotation_workspace` | 1920×1440 | `svc-3` (4/3), `art-1` (16/9) | An annotator reviewing object labels on an anonymized sample frame. |
| `service_model_evaluation` | 1920×1080 | `svc-4` (4/3) | Language evaluators comparing anonymized model responses against a written rubric. |
| `service_data_evaluation_crop` | 1920×1332 | `svc-10` (4/3) | Reviewer checking anonymized records against a structured evaluation rubric on a wall display. |
| `quality_qa_checkpoint` | 1920×1280 | `svc-5` (4/3), `art-2` (16/9) | A quality reviewer inspecting a sample batch against an unmarked checklist. |
| `industry_healthcare_ai` | 1920×1280 | `svc-6` (4/3) | Healthcare and data specialists reviewing an anonymized workflow without patient records. |
| `industry_retail_search` | 1920×1280 | `industries` (4/3) | Retail search analysts comparing anonymized product examples in a real operations office. |
| `service_localization` | 1920×1280 | `svc-7` (4/3) | Native-language reviewers comparing localized interface examples. |
| `case_localization_review` | 1920×1280 | `hl-1` (4/3), `languages` (21/9), `case-localization` (16/9) | Linguists reviewing locale-specific terminology and tone for an illustrative support workflow. |
| `service_genai_safety` | 1920×1280 | `svc-8` (4/3), `art-4` (16/9) | Reviewers checking anonymized generative AI examples against a safety rubric. |
| `service_dataset_library` | 1920×1440 | `svc-9` (4/3), `ds-text` (16/10) | A data specialist preparing an organized dataset package and documentation for handoff. |
| `service_speech_transcription` | 1920×1440 | `svc-11` (4/3), `hl-2` (4/3), `ds-audio` (16/10) | A transcription specialist reviewing an audio waveform with headphones. |
| `privacy_data_governance` | 1920×1440 | `trust` (16/9) | A team discussing access control and data-retention procedures using anonymized materials. |
| `service_digital_systems` | 1920×1080 | `services-hero` (16/9), `about-mission` (3/4), `presence` (21/9), `join` (4/3), `ds-video` (16/10) | Operations colleagues coordinating a multilingual data workflow across workstations. |
| `case_visual_annotation` | 1920×1080 | `ds-image` (16/10), `case-visual` (16/9) | A computer-vision annotator reviewing a sample street-scene frame with illustrative object boxes. |
| `delivery_handoff` | 1920×1280 | `rfp` (16/9) | A client and data operations specialist reviewing an anonymized dataset handoff package. |
| `contact_brief_session` | 1920×1440 | `contact-globe` (1/1), `quote` (4/3) | A client and consultant discussing the first brief for a multilingual AI data project. |

`service_data_evaluation_crop` is a different crop of `service_model_evaluation`, so Data Evaluation and AI Model Evaluation do not show the same frame.

Evidence captions: the voice-collection photo carries "Representative workflow — not a verified client result" and the visual-annotation photo "Illustrative concept — not a client result" as real HTML text (`ev.cap.*` in the i18n files), never baked into the image.

`legacy_iso_badge_trio.png` (2508×355, original PNG, not redrawn) is the ISO 18587:2017 / 9001:2015 / 17100:2015 badge row from the previous site. It renders on Home (compact, links to the Trust Center) and in the Trust Center "Certifications" block only when `CFG.iso.standards` are all verified (see `js/config.js`); add `?review=1` to preview. It is a badge strip, not a certificate.
