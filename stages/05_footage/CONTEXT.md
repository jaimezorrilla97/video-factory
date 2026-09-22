# Stage 05 — Footage

Jaime films. This stage turns his raw clips into an approved rough cut of the spoken content — nothing visual, no decoration.

## Inputs

- Layer 4 (working): `reels/<slug>/05_footage/raw/` — Jaime's clips exactly as shot
- Layer 4 (working): `reels/<slug>/02_script/script.md` — what he meant to say
- Layer 4 (working): `reels/<slug>/04_shot_direction/shot_list.md` — which lines were meant to be FACE
- Layer 3 (skill): [cut-talking-head-footage](../../skills/cut-talking-head-footage/SKILL.md)
- Layer 3 (reference): [cutting-grammar.md](../../skills/cut-talking-head-footage/references/cutting-grammar.md) — pacing profiles and correction patterns. Read it for every cut.

## Process

Run the skill. In short:

1. Probe every source for duration, frame rate, resolution, audio layout, and variable-frame-rate risk. Make a low-res proxy for long footage and keep the time mapping.
2. Get a word-level transcript of what he actually said, which will differ from `script.md`.
3. Build a semantic take map: `KEEP`, `ALT`, `DROP_ERROR`, `DROP_DEAD`, `DROP_REDUNDANT`, `REVIEW`.
4. Cut in order: whole bad takes → long pauses → false starts → redundant filler → intros and endings.
5. Choose phoneme-safe boundaries. Preserve room tone; use short equal-power crossfades.
6. Review in passes — for meaning, for audio with eyes closed, for visual discontinuity muted.

Three rules worth repeating:

- **Silence detection is evidence, never the edit decision.**
- **Never cut just because a filler word exists.** Keep it when removal damages syntax, emotion, or lip motion.
- **`raw/` is read-only.** Never transcode, trim, or overwrite the only copy.

Where a cut cannot be made invisible, flag it as needing coverage. Do not invent decorative b-roll to hide it — stage 06 decides that.

## Outputs

- `cut/` → `reels/<slug>/05_footage/cut/` — the rough cut, plus proxies
- `cut_plan.md` → `reels/<slug>/05_footage/` — per change: source in/out, output in/out, action, reason, confidence (`high` / `medium` / `review`), and coverage needed

## Gate

Jaime watches the rough cut and approves it. Editorial decisions are settled here; stage 06 decorates an approved cut and does not re-edit it.
