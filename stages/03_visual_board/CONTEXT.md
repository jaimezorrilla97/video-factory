# Stage 03 — Visual Board

Decide what the reel *looks* like, as a menu of options for Jaime to pick from. This stage proposes; it does not commit and it does not write generation prompts.

## Inputs

- Layer 4 (working): `reels/<slug>/02_script/script.md`
- Layer 4 (working): `reels/<slug>/01_inspiration/teardown.md` — the visual-mechanics section, if it exists
- Layer 3 (skill): [reel-visual-board](../../skills/reel-visual-board/SKILL.md) — follow it exactly, including its self-critique loop
- Layer 3 (reference): [../../_config/broll-dna.md](../../_config/broll-dna.md) — the locked world, palette, signature devices, anti-patterns. Read this **first**.
- Layer 3 (reference): [../../_config/style-string.md](../../_config/style-string.md) — the one-sentence soul and the hard nos

## Process

Run the skill. It produces four things:

1. **Metaphor** — the storytelling analogy, mostly verbal seasoning
2. **Anchor** — the one evolving visual that carries the reel, tested against TRACK + FEEL
3. **Chart** — how the reel's key number or data is rendered in-world
4. **Designs** — the best-fit device per beat, each passed through the Says/Reads-as fidelity check and marked FACE or B-ROLL

Two rules the skill insists on, repeated here because they are the ones most often skipped:

- **Pick the anchor first.** Everything else is chosen to serve it.
- **Self-critique before presenting.** Revise once or twice against the rubric so the first version Jaime sees is already the best one.

The creator library is a source, not a cage. Invent an original anchor, chart, or design whenever it fits the script better than anything studied.

## Outputs

- `visual_board.md` → `reels/<slug>/03_visual_board/`

Present it as a **menu**, not a decision. Options Jaime can choose between, with your recommendation marked.

## Gate

Jaime picks the metaphor, the anchor, the chart treatment, and the per-beat designs. His picks go straight into `visual_board.md` — edit the file so stage 04 reads the chosen version, not the full menu.
