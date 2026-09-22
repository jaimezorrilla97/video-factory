---
name: reel-visual-board
description: >
  Turn a finished reel script into a VISUAL BOARD — the art-direction layer that
  sits BEFORE `reel-broll-director`. It does NOT write generation prompts. It
  proposes, grounded in meaning and in the studied-creator library, the four
  things that decide how a reel looks: (1) a storytelling METAPHOR/analogy
  (seasoning, mostly verbal), (2) the visual ANCHOR (the one evolving visual that
  carries the reel, tested against TRACK + FEEL), (3) the CHART (how the reel's
  key number/data is rendered in-world), and (4) per-beat DESIGNS (the best-fit
  device for each beat, each passed through a Says/Reads-as fidelity check, marked
  FACE or B-ROLL). Output is a curatable MENU for Jaime to pick from, not prompts.

  Use whenever Jaime has a reel script and asks any of: "art-direct this reel",
  "what should the visuals be", "give me anchor ideas / a visual anchor", "what's
  the metaphor for this", "ideas for the chart / designs", "do the visual board",
  "visualize this before the prompts", or wants the creative visual plan BEFORE the
  b-roll prompts exist.

  Creator inspiration is a SOURCE, not a cage — invent an original anchor / chart /
  design whenever it fits the script better than anything studied. Never writes
  generation prompts (that's `reel-broll-director`), never rewrites the script,
  never touches the Sheet.
---

# Reel Visual Board (the art-direction phase)

The phase between a written script and the b-roll prompts. Where
`reel-broll-director` writes generation-ready prompts, **this skill decides what the
reel should LOOK like as a set of grounded ideas** — and stops there, handing Jaime
a menu to curate. He drives the creative; this skill matches and grounds.

**The mental model:** an art director reads the script, finds what each beat is
*trying to say and feel*, and proposes the visual ideas that say it most accurately —
pulling from the devices that worked for the creators we studied, or inventing a
better one. The output is a **Visual Board**, not footage and not prompts.

```
script → [VISUAL BOARD: metaphor + anchor + chart + designs] → Jaime curates → reel-broll-director (prompts) → CapCut
              ↑ this skill
```

---

## When to use

Trigger when Jaime has a reel script (usually in `drafts/instagram/` or
`ready/instagram/`, sometimes pasted) and wants the **creative visual plan** before
any prompt exists: "art-direct this," "what's the anchor," "what's the metaphor,"
"give me visual/chart/design ideas," "do the visual board."

Do NOT trigger to:
- **Write generation prompts** — that's `reel-broll-director` (this is the step before).
- **Write or edit the script** — that's the drafts pipeline in the root `CLAUDE.md`.

---

## Inputs

- A reel script (path or pasted) — the spoken lines and their beats.
- If no script is provided, ask for one (or the draft id). Don't invent a script.

---

## What it produces — the four elements

A **Visual Board** with exactly these four, in this order of importance:

1. **METAPHOR / analogy (storytelling — seasoning, not spine).** ONE coherent analogy
   the narration can lean on for storytelling. It lives mostly in the *words* (a line
   or two), may optionally echo into ONE visual beat, and must never compete with the
   anchor. It has to be coherent with the whole spine (reinforce the thesis, not add a
   second idea). Default: **verbal-only**; flag if a visual surfacing is worth a shot.
2. **ANCHOR (the visual spine).** The ONE evolving visual that carries the reel as its
   main character and updates across beats. Chosen via the TRACK + FEEL test (below).
   The single most important visual decision — propose 1 recommended + 1–2 rejected
   alternatives with *why*.
3. **CHART (the data render).** How the reel's key number / progression / comparison is
   rendered **in-world** (tactile, warm, diegetic — never a neon dashboard). The render
   must encode the data honestly (e.g. a "4×" is a slope literally 4× steeper).
4. **DESIGNS (per beat).** For each beat: the best-fit device + concrete design, a
   **Says / Reads-as** fidelity line, **FACE or B-ROLL**, and the **source** (which
   creator/frame it's adapted from, or "ours" if invented).

---

## The process (follow in order)

1. **Read the script fully.** Identify the spoken lines, the sections, and the beats
   (one beat = one idea the visual can attach to).
2. **Read the identity FIRST.** **`_config/broll-dna.md`** (the locked world, the
   palette, the signature devices, the anti-patterns) and **`_config/style-string.md`** (the
   pocket version). Everything proposed must live in this identity and clear its
   anti-patterns.
3. **Find the spine + the thesis.** In two lines: what is the ONE throughline the
   viewer must follow (the info), and what is the emotional thesis (the feeling —
   acceleration? accumulation? a fork? a hidden cost? a reframe?). The thesis drives
   the anchor.
4. **Propose the METAPHOR.** One coherent analogy that reinforces the thesis; keep it
   seasoning (verbal-first). Offer one alternative; recommend one. Check it doesn't
   duplicate the anchor's idea.
5. **Choose the ANCHOR — run the TRACK + FEEL test (see below).** Propose a recommended
   anchor + 1–2 rejected alternatives with the reason each fails. **Criticize your
   first pick until it serves BOTH track and feel.** Invent an original anchor if it
   beats every studied device — say so.
6. **Design the CHART.** Find the reel's load-bearing number/comparison and render it
   in-world, encoding the data honestly.
7. **Map the beats → DESIGNS.** Classify each beat (data → chart; enumeration →
   deal-in; emotional turn → in-shot reveal; named cite → proof page; "most vs one" →
   hero-amid-mass; personal/credibility → FACE). For each, the device + design, the
   **Says / Reads-as** fidelity check, FACE/B-ROLL, and the source (creator/frame or
   "ours"). Hang each design off the anchor.
8. **SELF-CRITIQUE (mandatory).** Run the Rubric below; revise. Do a second pass if any
   axis still fails — especially fidelity (the #1 failure mode).
9. **Present the Board** in the Output Format. Then **offer** to (a) save it as a
   `## Visual Board` section in the draft so it travels to `reel-broll-director`, or
   (b) hand the picked board straight to `reel-broll-director` for prompts.

---

## The TRACK + FEEL test (how to choose the anchor)

The anchor must do two jobs at once (from `broll-dna.md` §1B):

- **TRACK** — carry the information the viewer must follow (years, names, steps,
  numbers) so the piece stays legible.
- **FEEL** — embody the emotional thesis in its very shape/behavior (acceleration,
  accumulation, collapse, growth, a fork) so the point is *seen*, not just narrated.

The first idea is usually a *stage* (a flat timeline = only shows *when*, fails FEEL)
or a *metaphor* (a creature = hides the data, fails TRACK). **Attack the first pick
until one concept does both.** Name the rejected candidates and why each failed — that
reasoning is part of the value.

Anchor archetypes to draw from (a starting palette, not a limit — invent freely):
The Climb (a ladder/curve that steepens = acceleration) · The Walking Tally (cards
advancing = running math) · The Assembling System (parts snap together = how-it-works)
· The Filling/Draining Vessel (accumulation/depletion) · The Route on a Map (a
journey) · The Branching Web (scale/complexity) · The Fork (one input, two paths,
opposite ends = "it's not the tool, it's the use").

---

## The Fidelity Gate — accurate, not decorative (run on EVERY design)

The #1 failure mode is a beautiful idea that means the wrong thing. For each design,
write:

- **Says:** the exact idea this beat must land (the idea, not the noun).
- **Reads-as:** what a viewer who knows the topic would actually decode it as.

If Reads-as ≠ Says (a pun, a loose association, a generic mood), **reject and re-pick.**
Then the soul check: is it still evocative and on-vibe, or did it become a literal
infographic / on-the-nose cliché (a red "ERROR" popup, a lightbulb for "idea")? It
must be **faithful AND soulful**. (Full method: `reel-broll-director/references/broll-style.md` §1b.)

---

## Grounding — the creator library is a source, not a cage

- **Source material:** the studied creators in `Creator Analysis/<handle>/` — their
  `broll-dna.md` (signature devices), the per-post `visual.md` teardowns, and the
  saved **frames** (`<post>/frames/full/*.jpg` + contact sheets) when present. Cite a
  real frame as the seed for an idea whenever one exists — a grounded suggestion beats
  an abstract one.
- **Not mandatory:** if an original anchor / chart / design fits the script better than
  anything studied, invent it and label it **"ours."** A good mix of adapted + invented
  is the goal, not maximal borrowing.
- **Replicate the device, not the props.** Steal the *move* (deal-in, hand-as-cursor,
  hero-amid-the-mass, motif bookend), reinvent the elements for Jaime's world.

---

## SELF-CRITIQUE — the mandatory revision loop

Grade your own Board against this rubric before presenting. Be a tough editor; revise
what fails; second pass if needed. State the verdict briefly so Jaime sees the thinking.

1. **Spine read right?** Is the stated thesis actually the reel's center, or did I
   mis-read it? (If the anchor is wrong, it's usually because the thesis was wrong.)
2. **Anchor serves TRACK + FEEL?** Does it carry the info AND embody the feeling? Did I
   name the rejected alternatives and why?
3. **Metaphor is seasoning, not spine?** One coherent analogy, verbal-first, reinforcing
   (not duplicating) the thesis — not crowding the anchor?
4. **Chart encodes data honestly?** Is the number rendered in-world and faithfully
   (the 4× is actually 4× steeper), not a decorative graph?
5. **Every design passes the Fidelity Gate?** Says/Reads-as written for each? Any
   decorative/off-meaning shot? (Most common failure — be ruthless.)
6. **Identity honored?** Everything in The Operator's Tabletop world, warm + one teal
   accent = the AI, clears the `broll-dna.md` §7 anti-patterns?
7. **FACE protected?** Personal/vulnerable/credibility/CTA beats kept on FACE, not
   over-b-rolled?
8. **Grounded?** Adapted ideas cite a creator/frame; invented ideas labeled "ours"?
9. **It's a board, not prompts?** No generation-prompt paragraphs leaked in — this is
   the curate-from menu.

---

## Output Format

Present, in this order:

1. **The read** — 2 lines: the spine (info throughline) + the emotional thesis. Plus a
   one-line self-critique verdict (what you caught and fixed).
2. **Metaphor** — the recommended analogy (+ one alt), where it sits, verbal-only vs
   one-insert call.
3. **Anchor** — the recommended anchor with its TRACK + FEEL lines and source
   (creator/frame or "ours"), then the rejected alternatives with why each failed.
4. **Chart** — the in-world render of the key number, with the honesty note.
5. **The per-beat board** — a compact table: Beat · FACE/B-ROLL · Suggested design ·
   Says → Reads-as · Source.
6. **Ours vs. borrowed** — one line tallying what's invented vs adapted.
7. **Hand-off options** — offer to (a) save as a `## Visual Board` section in the draft,
   or (b) pass the picked board to `reel-broll-director` for prompts.

---

## Hand-off to `reel-broll-director`

This skill's Board is the *input* to `reel-broll-director`. When the director runs
after a board exists, it should **consume** the chosen anchor + per-beat designs
(steps 3 and 6 of its process) rather than re-deriving them, and spend its effort on
the FACE/B-ROLL timing and the generation prompts. If no board exists, the director
still works standalone (it derives a lighter version internally).

---

## What NOT to do
- **Don't write generation prompts.** No Omni/Kling/NBP paragraphs. This is the menu;
  prompts are the next skill.
- **Don't ship a decorative design** — every idea must pass Says/Reads-as.
- **Don't let the metaphor become the spine** — it's seasoning, verbal-first, one analogy.
- **Don't force a borrowed device** — invent "ours" when it fits better; don't maximize borrowing.
- **Don't pick a flat anchor** — a stage that only tracks or a metaphor that only feels.
  Criticize until one concept does both.
- **Don't over-b-roll the personal beats** — protect FACE on credibility/vulnerable/CTA lines.
- **Don't break identity** — everything in The Operator's Tabletop, warm + one teal accent;
  clear the anti-patterns.
- **Don't present before the self-critique loop.**
- **Don't edit the script's words** — this is the visual layer.
- **Don't touch the Google Sheet** — this is a directing artifact, not a pipeline step.
