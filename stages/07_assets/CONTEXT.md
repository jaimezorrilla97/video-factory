# Stage 07 — Assets

Generate the plates the composition needs. This is the only stage that spends money, so it is the one with the strictest gate.

## Inputs

- Layer 4 (working): `reels/<slug>/06_edit_plan/asset_list.md` — what is actually needed
- Layer 4 (working): `reels/<slug>/04_shot_direction/broll_prompts.md` — the prompts, minus anything stage 06 dropped
- Layer 3 (skill): [higgsfield-motion-graphics](../../skills/higgsfield-motion-graphics/SKILL.md)
- Layer 3 (reference): [../../_config/style-string.md](../../_config/style-string.md) — the paste-ready style string and the standard negative. **Every prompt starts here.**
- Layer 3 (reference): [../../_config/broll-dna.md](../../_config/broll-dna.md) — the full look
- Layer 3 (reference): [api.md](../../skills/higgsfield-motion-graphics/references/api.md) — endpoints, prices, parameters

## Process

1. **Preflight:** `node skills/higgsfield-motion-graphics/scripts/hf-api.mjs check`. Free, and it catches a dead key before you queue work.
2. **Decide what not to generate.** Text, numbers, captions, charts, counters, logos, shapes, masks, and transitions are all built in code at stage 08. Higgsfield supplies background plates, textures, hero objects, metaphor stills, and short b-roll loops.
3. **Prefer stills.** A still plus a Remotion move (zoom, parallax, wipe) costs about $0.0032–$0.035 against roughly $0.21–$1.60 for five seconds of clip, and usually reads better for graphics. Generate a clip only when the motion itself is the point.
4. **Match the frame.** Reels and TikToks are 1080x1920 at 30 fps, so ask for `9:16`.
5. **Dry run first, state the cost to Jaime, wait, then generate.**
6. Outputs are opaque and carry no transparency. Design them as full-frame plates and mask in code.

**Never `cat`, print, echo, log, or commit `.env` or the API key.** The script redacts it from its own output; keep it that way.

## Outputs

- Generated files → `motion-studio/public/higgsfield/`, logged to `manifest.jsonl` there
- `assets.md` → `reels/<slug>/07_assets/` — which file serves which beat of `edit_plan.md`, and what it cost

Reusable plates stay in `motion-studio/public/higgsfield/`. Reel-specific source material that was not generated — screenshots, logos, screen recordings — goes in `reels/<slug>/07_assets/`.

## Gate

Jaime approves the spend before generation, and looks at the results before stage 08 builds against them. A `403` on a generation means the API balance is empty; he reads the balance in the Higgsfield console.
