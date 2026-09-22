---
name: cut-talking-head-footage
description: Create or execute precise rough cuts from raw talking-head, interview, podcast, tutorial, screen-recording, or personal-brand footage. Use when Codex must inspect video/audio, remove true dead space, false starts, repeated takes, corrections, interruptions, unusable filler, or off-topic material; choose natural cut points; preserve meaning and personality; produce a cut plan, timeline, EDL, or rendered rough cut; or diagnose why an automated silence cut feels unnatural. Do not use for visual styling, motion graphics, B-roll design, or captions-only work.
---

# Cut Talking-Head Footage

Build the spoken-content edit before adding visual decoration. Optimize for clarity, momentum, credibility, and a human cadence—not maximum compression.

## Non-negotiables

- Preserve the speaker's intended meaning, tone, and strongest complete take.
- Treat silence detection as evidence, never as the edit decision.
- Remove mistakes and redundant setup before removing useful breaths or emphasis.
- Never cut solely because a filler word exists. Keep it when removal damages syntax, emotion, lip motion, or audio continuity.
- Never fabricate words or reorder claims in a misleading way.
- Work non-destructively. Keep source files unchanged and retain handles around every approved cut.
- If the footage, transcript, or intended platform is missing, ask only for what blocks the requested deliverable.

## Workflow

### 1. Establish the edit target

Determine the platform, aspect ratio, target duration, audience, desired energy, and whether the deliverable is a cut plan, editable timeline, or rendered rough cut. Infer sensible defaults from the source and request when possible; state consequential assumptions.

### 2. Inspect before cutting

Probe every source for duration, frame rate, resolution, audio layout, variable-frame-rate risk, and sync issues. Generate or obtain a word-level transcript. Inspect the waveform and representative frames around candidate cuts.

For long footage, make a low-resolution proxy and retain a source-to-proxy time mapping. Do not transcode the only copy.

### 3. Build a semantic take map

Segment the transcript into ideas and label each span:

- `KEEP`: clear, useful, correct delivery
- `ALT`: duplicate or alternate take
- `DROP_ERROR`: false start, correction, factual slip, broken sentence
- `DROP_DEAD`: setup, waiting, prolonged silence, empty tail, interruption
- `DROP_REDUNDANT`: repetition that adds no emphasis or nuance
- `REVIEW`: ambiguity, possible jump in meaning, poor audio, or uncertain best take

Resolve repeated takes by selecting the most complete and natural delivery, not automatically the last take. Keep intentional repetition used for rhetoric.

### 4. Choose cut points in this order

1. Cut whole bad takes or off-topic spans at idea boundaries.
2. Collapse long empty pauses while preserving a natural thought pause.
3. Remove false starts and explicit corrections; keep the final correct formulation.
4. Remove redundant phrases and filler only when the surrounding sentence remains natural.
5. Tighten intros, transitions, and endings after the body makes sense.

Use the pacing profiles and correction patterns in [references/cutting-grammar.md](references/cutting-grammar.md). Read that file for every actual cut or cut-plan task.

### 5. Make cuts invisible or motivated

- Prefer phoneme-safe boundaries, closed-mouth frames, blinks, head turns, gesture changes, or camera motion.
- Preserve room tone and use short equal-power audio crossfades where needed.
- Keep enough pre-roll for consonant attacks and enough post-roll for word endings.
- Avoid cutting on a plosive, sibilant, breath intake, or mid-gesture unless another visual covers it.
- Hide unavoidable discontinuities with a motivated punch-in, angle change, B-roll, screenshot, or graphic. Flag the need; do not invent decorative coverage.
- Use J-cuts or L-cuts when picture and speech benefit from entering at different times.

### 6. Review in passes

Review once for meaning without looking at the timeline, once for audio continuity with eyes closed, and once for visual discontinuities muted. Then review at normal speed from at least five seconds before each edit.

Do not approve a cut merely because it looks correct frame by frame. The sequence must sound like something the speaker would naturally say.

### 7. Deliver reproducibly

When the user requests execution, provide the rendered rough cut plus an editable or machine-readable cut manifest when the environment allows it. Otherwise provide a timestamped cut plan.

Record for each change:

- source file and source in/out
- output in/out
- action and reason
- confidence: `high`, `medium`, or `review`
- coverage or audio repair required

Keep low-confidence edits reversible and call them out succinctly. Include source duration, output duration, time removed, and unresolved review points.

## Tool behavior

Use available media inspection, transcription, and editing tools. Prefer a deterministic timeline or EDL over destructive source rewrites. If a requested editor or project format is available, preserve its native editability. If only FFmpeg is available, render through an explicit filter graph or concat plan and retain the manifest used to create it.

Do not claim that a cut was reviewed unless the rendered result was actually inspected. Do not claim frame accuracy from transcript timestamps alone.

## Hand-off to the style skill

After the rough cut is approved, invoke `direct-jaime-video-style` for visual treatment when the request also includes B-roll, split screens, images, motion graphics, overlays, or branded finishing. Keep editorial decisions and visual decoration as separate passes.
