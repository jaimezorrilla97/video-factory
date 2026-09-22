# Stage 02 — Script

Turn an angle into the words Jaime will actually say. This is a conversation stage: draft, Jaime reacts, revise, repeat until he says it is ready.

## Inputs

- Layer 4 (working): `reels/<slug>/01_inspiration/teardown.md` — if the idea came from a reference piece
- Layer 4 (working): whatever Jaime said the reel should be about, if the idea is his own
- Layer 3 (reference): `../../_config/voice.md` — **does not exist yet**; see Gaps below

## Process

1. Confirm the premise in one line before drafting. If Jaime's idea is loose, ask one question, not five.
2. Draft the script as spoken words only — no shot descriptions, no visual notes. Those belong to stages 03–06.
3. Mark the beats inline with `<!-- beat: hook -->`-style comments so later stages can reference them. Suggested beats: hook, problem, turn, proof, payoff, CTA.
4. Keep the length honest against the format. Reels and TikToks run 30–60 seconds, which is roughly 80–150 spoken words.
5. Read it back the way he would say it. If a line only works written down, rewrite it.
6. Revise on his notes. Keep the whole script in `script.md`; do not scatter versions across files.

## Outputs

- `script.md` → `reels/<slug>/02_script/`

## Gate

Jaime says the script is ready. Nothing downstream runs against a draft — stages 03 and 04 both re-time and re-plan when wording changes, so an early start is wasted work.

## Gaps

**No skill owns this stage.** [reel-visual-board](../../skills/reel-visual-board/SKILL.md) and [reel-broll-director](../../skills/reel-broll-director/SKILL.md) both say the script comes from a "drafts pipeline"; that pipeline lives in Jaime's other project, not here.

There is also no `_config/voice.md`, so there is no written record of his voice, his pillars, or his recurring angles — it is reconstructed from conversation each time. Writing that file is the single highest-value thing that would improve this stage.
