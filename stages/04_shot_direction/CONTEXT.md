# Stage 04 — Shot Direction

Split the script into what Jaime films and what gets generated, time the cuts, and write one generation-ready prompt per insert.

This is the last stage before the camera comes out. Its shot list tells Jaime what to shoot; its prompts tell stage 07 what to generate.

## Inputs

- Layer 4 (working): `reels/<slug>/02_script/script.md`
- Layer 4 (working): `reels/<slug>/03_visual_board/visual_board.md` — **Jaime's picks**, not the full menu
- Layer 3 (skill): [reel-broll-director](../../skills/reel-broll-director/SKILL.md) — follow it exactly, including its self-critique loop
- Layer 3 (reference): [../../_config/broll-dna.md](../../_config/broll-dna.md) — signature devices (§4), motion signature (§5), caption identity (§6), anti-patterns (§7)
- Layer 3 (reference): [broll-style.md](../../skills/reel-broll-director/references/broll-style.md) — the shared prompt grammar and template library

## Process

Run the skill. It produces three things, always:

1. **The complete script** with FACE / B-ROLL markers and in/out timecodes
2. **A b-roll shot list**
3. **One rich, copy-paste, generation-ready prompt per b-roll**

Then it self-critiques against its rubric and revises **before** presenting.

Carry the anchor from stage 03 through every prompt. If a prompt does not serve the anchor, either fix it or drop the b-roll — a decorative insert is worse than a clean cut back to Jaime's face.

Prompts must specify no text, no letters, no logos, no watermark. All type is added in code at stage 08.

## Outputs

- `shot_list.md` → `reels/<slug>/04_shot_direction/` — the marked-up script plus the FACE/B-ROLL shot list
- `broll_prompts.md` → `reels/<slug>/04_shot_direction/` — one prompt per insert, each tagged with the shot it belongs to

## Gate

Jaime approves the shot list before he films, and approves the prompts before stage 07 spends money on them.
