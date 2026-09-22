# Stage 06 — Edit Plan

Decide what the viewer sees at every moment of the approved cut, and which tool builds it.

Stage 03 decided the look in the abstract. This stage commits it to timecodes against real footage.

## Inputs

- Layer 4 (working): `reels/<slug>/05_footage/cut/` and `cut_plan.md` — the approved cut, including the discontinuities that need coverage
- Layer 4 (working): `reels/<slug>/03_visual_board/visual_board.md` — the chosen anchor, metaphor, chart
- Layer 4 (working): `reels/<slug>/04_shot_direction/shot_list.md` — the planned FACE/B-ROLL split
- Layer 3 (skill): [direct-jaime-video-style](../../skills/direct-jaime-video-style/SKILL.md)
- Layer 3 (reference): [visual-grammar.md](../../skills/direct-jaime-video-style/references/visual-grammar.md) — read for every visual edit
- Layer 3 (reference): [tool-routing.md](../../skills/direct-jaime-video-style/references/tool-routing.md) — read when choosing tools
- Layer 3 (reference): [../../_config/broll-dna.md](../../_config/broll-dna.md) — motion signature (§5), caption identity (§6), anti-patterns (§7)

## Process

1. Map the cut semantically: hook, claims, proof, comparisons, process explanations, emotional beats, section changes, CTA. Assign visuals only after that map exists.
2. Pick a treatment per beat from the hierarchy, cheapest first: full-screen A-roll → A-roll with restrained overlay → half split screen → picture-in-picture → full-screen source or screen recording → full-screen motion graphic → b-roll or generated insert.
3. Write the visual beat sheet. Per visual: timecode, spoken phrase, goal (`clarify` / `prove` / `compare` / `orient` / `emphasize` / `reset`), treatment, asset source, layout and safe zones, entrance/hold/exit timing, on-screen copy, sound cue, fallback.
4. Apply the restraint budget. Return to clean A-roll after dense visuals. Reserve the most elaborate animation for the idea most worth remembering.
5. Reconcile against stage 04. Where the footage differs from the plan, the footage wins. Note any b-roll from `broll_prompts.md` that is now unnecessary so stage 07 does not generate it.

**If a visual has no clear communication goal, remove it.**

Route work as the skill's matrix says, with one project-specific override: **this project builds in Remotion.** The skill also names CapCut, After Effects, and Hyperframes; treat those as available only if Jaime says so. Generated inserts go to stage 07, everything else to stage 08.

## Outputs

- `edit_plan.md` → `reels/<slug>/06_edit_plan/` — the timecoded visual beat sheet
- `asset_list.md` → `reels/<slug>/06_edit_plan/` — every asset needed, with its source and whether stage 07 must generate it

## Gate

Jaime approves the beat sheet. Stage 07 spends money against `asset_list.md`, so the list must be final.
