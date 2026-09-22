---
name: reel-broll-director
description: >
  Turn a finished reel script into a shot-by-shot FACE vs B-ROLL breakdown plus
  fully-detailed, generation-ready b-roll prompts for AI video platforms
  (Seedance, Veo, Sora, Kling, Runway). Use whenever Jaime has a reel script and
  asks any of: "do the b-roll breakdown", "what should be face vs b-roll",
  "where do the b-rolls go", "give me the b-roll prompts", "make these into
  b-rolls", "direct this reel", or pastes/points to a reel script and wants it
  turned into something shootable/generatable.

  The output is three things, always: (1) the COMPLETE script with FACE/B-ROLL
  markers and in/out timecodes, (2) a b-roll shot list, and (3) one rich,
  copy-paste, generation-ready prompt per b-roll. Then Claude self-critiques the
  breakdown once or twice (against a fixed rubric) and revises BEFORE presenting,
  so the first thing Jaime sees is already the best version.

  This is the directing/visualization layer on top of a written reel. It does NOT
  write the script (that's the drafts pipeline) and does NOT touch the Sheet.
---

# Reel B-roll Director

Takes a written reel script and directs it: decides what the viewer sees
moment-to-moment (Jaime's face vs. a b-roll insert), times the cuts, and writes
detailed prompts that an AI video generator can turn into real footage — in a
deliberate, premium, *animated* style, not flat stock-looking clips.

**The mental model:** the voiceover plays continuously and uninterrupted. The
only thing that changes is the *visual* — either Jaime on camera or a b-roll clip
laid over his voice. The job is to choose which, when, and exactly what each
b-roll looks like and how it MOVES.

---

## When to use

Trigger when Jaime has a reel script (usually in `drafts/instagram/` or
`ready/instagram/`, sometimes pasted inline) and wants it turned into a
shootable / generatable visual plan. Typical asks: "do the b-roll breakdown for
X", "where should the b-rolls go", "give me the prompts for the b-rolls",
"direct this reel."

Do NOT trigger to *write or edit the script itself* — that's the drafts pipeline
in the root `CLAUDE.md`. This skill starts from a script that already exists.

---

## Inputs

- A reel script (path or pasted). It usually already has sections, spoken lines,
  and maybe rough on-screen-text overlays. Ignore any pre-existing b-roll
  suggestions in the script unless Jaime says to keep them — reinterpret them in
  the house style below.
- If no script is provided, ask for one (or the draft id). Don't invent a script.
- **Check for a `## Visual Board` section** (from the `reel-visual-board` skill) in
  the draft, or a board Jaime pasted. If one exists, **consume it** — its metaphor,
  anchor, chart, and per-beat designs are the creative decisions already made; don't
  re-derive them. Spend your effort on FACE/B-ROLL timing and the generation prompts.
  If no board exists, derive the anchor + designs yourself as below (the standalone path).

---

## The process (follow in order)

1. **Read the script fully.** Identify the spoken lines, the sections, and the
   beats (one beat = one idea/sentence the visual can attach to).
2. **Load Jaime's visual identity FIRST.** Read **`_config/broll-dna.md`** —
   Jaime's own locked b-roll DNA (the soul, the one concept world "The Operator's
   Tabletop", the signature devices, the palette, and the visual anti-patterns). This
   is the identity layer; everything below serves it. Every b-roll must be staged in
   that world (warm tabletop + one cool accent = the AI), using one of its devices, and
   must clear its §7 anti-patterns. _(Distinct from the per-creator
   `Creator Analysis/<handle>/broll-dna.md` files, which are study/inspiration only.)_
3. **Choose the Running Anchor FIRST** (`broll-dna.md` §1B). Name the ONE evolving visual that
   will be the reel's main character, and **criticize the first pick until it serves BOTH what
   the viewer must TRACK (the info) and what they must FEEL (the thesis).** A flat timeline
   (stage) or a creature (metaphor) usually fails one — revise until one concept does both.
   Everything below hangs off this.
4. **Lock the production approach.** Within that identity, decide each shot's execution —
   confirm whether it'll be **generated** (tactile/object shots — the default for Jaime)
   or **filmed/keyframed** (live hand-drawing + heavy text), per
   `references/broll-style.md` §2. Keep ONE coherent look per reel.
5. **Classify each beat: FACE or B-ROLL** using the decision rules below.
6. **Pick each B-ROLL beat's visual MODE — illustrative / metaphor / hybrid — hung off the
   anchor** (`references/broll-style.md` §0), THEN map it to a Template pattern + concept and
   run the **FIDELITY GATE** (`references/broll-style.md` §1b). Default to **illustrative** (a
   labeled, in-world graphic) for explainer/timeline beats; reserve **metaphor** for
   emotional/iconic beats (seasoning, not the spine). For each shot write *Says / Reads as /
   Soul* and confirm it decodes to the EXACT idea AND stays evocative (not a literal
   infographic, not a forced metaphor). Reject and re-pick anything that fails. Reinvent
   elements per script.
7. **Write each b-roll prompt** in the §5 format: the internal design spec, then a
   clean **copy-paste Omni Flash block** (motion as a start→end arc) + a separate
   `Negative prompt:` line. Use **keyframe mode** for transformation/text shots.
   Match tool to shot: generate tactile/object shots; film or keyframe
   live-drawing / heavy-text shots (`references/broll-style.md` §2).
8. **SELF-CRITIQUE pass (mandatory).** Run the breakdown against the Rubric — including: *is
   the Running Anchor present and serving both TRACK and FEEL? Is each beat's mode
   (illustrative vs metaphor) the right call, or did I force a metaphor where a clearer
   illustrative graphic belonged?* Revise. If still weak on any axis, do one more pass.
9. **Present** the three deliverables in the Output Format. Offer to fold the
   shot list into the script file.

---

## FACE vs B-ROLL — decision rules

Default instinct: **face for the emotional/personal/credibility beats, b-roll for
the abstract/conceptual beats.** Specifically —

**Keep it on FACE when the line is:**
- A personal confession, origin story, or vulnerable admission ("me corrieron",
  "no sabía qué era un API"). The face IS the credibility — don't bury it.
- The direct-to-camera reframe or CTA.
- Emotionally loaded — the viewer needs to read it on a human face.

**Cut to B-ROLL when the line is:**
- Abstract, conceptual, or a number/quantity ("1 mañana = 1 semana", "1x vs 5x").
- A contrast, comparison, or "imagine X" setup.
- A vivid noun or metaphor that has an obvious physical analog.

**Hard rules (these are what separate a good cut from a tacky one):**
- **No face block longer than ~6–8 seconds without a visual change.** A long face
  stretch is the #1 retention killer. Break it with a 1–2s b-roll *insert* or a
  *punch-in* (same take, tighter crop) — NOT necessarily a full b-roll handoff.
- **There is a third mode: the INSERT.** A 1–2s b-roll laid over a continuing
  face take (voice + presence stay). Use inserts to break long face blocks
  without surrendering the personal beats. Don't treat it as binary.
- **Hook (first ~3s):** for a personal-story/confession hook, lead with the FACE
  (human + vulnerability stops the scroll). For a stat/claim hook, lead with a
  striking b-roll. When unsure, lead with face and propose the b-roll-first as an
  A/B variant.
- **Match the visual to the intent.** A Relatability reel must keep the face
  present on the vulnerable beats; don't over-b-roll it into a faceless ad. A
  Visibility/educational reel can lean more b-roll.
- **Percentages (~50–60% b-roll) are a GUIDE, not a target.** Never sacrifice a
  needed face beat or invent a weak b-roll just to hit a number. Let the script
  decide; report the rough mix but don't force it.

---

## The style, the animation vocabulary, and the prompt template

These live in **[`references/broll-style.md`](references/broll-style.md)** — read
it before locking the look, mapping beats, or writing any prompt. It is the shared
spine (also fed by the `reel-vision` skill). In short, it covers:

- **The Shared DNA** — 12 non-negotiable core principles true of EVERY reel
  (two-world contrast, voice-locked cuts, make-the-abstract-physical, one-noun-
  one-visual, caption-as-metronome, reserved big move, hero-amid-the-mass, motif
  bookend, authority-prop, density curve, diegetic-over-graphic, meaning-encoding
  typography).
- **Production approach** — no fixed house mode; pick the look the script needs
  (pull from the Template Library + per-creator DNA files). The one hard rule is
  tool-matching: generate tactile/object shots, film/keyframe live-drawing + heavy
  text.
- **The Template Library** — 14 named, element-agnostic patterns (what / how to
  apply / motion) for mapping any script beat to a shot.
- **Craft subsystems** — Camera Policy, Caption System, Transitions & Diegesis,
  Production Economy.
- **The Prompt Template** — the 10-part structure + worked example for one rich,
  copy-paste, generation-ready paragraph per b-roll (5–8s, "no text" by default,
  in the reel's chosen look). Every prompt names a camera move + in-scene
  motion/light + focus behavior; one motion idea per clip — premium, not tacky.

Do not duplicate that content here — cite and apply it.

---

## SELF-CRITIQUE — the mandatory revision loop

Before presenting, grade your own breakdown against this rubric. Be a tough
editor, not a defender. Revise anything that fails. Do a second pass if needed.
State the verdict briefly to Jaime (what you caught and fixed) so he sees the
thinking.

**Rubric:**
1. **Look cohesion.** Is the visual approach right for this script, and is the WHOLE
   breakdown one coherent look (no clashing styles within the reel)?
2. **Shared DNA honored.** Is the two-world contrast present? Cuts voice-locked?
   Abstract made physical? One-noun-one-visual? Captions as metronome? Reserved
   big move (not blown early)? Any core principle violated?
3. **No over-long face blocks.** Any face stretch >~6–8s without an insert or
   punch-in? Fix it.
4. **Right beats on face.** Are the personal/vulnerable/CTA lines on FACE? Are
   abstract/number/contrast lines on B-ROLL? Any misassigned?
5. **Hook strength.** Does the first 3s stop the scroll? Is face-vs-b-roll-first
   the right call for THIS hook type? Offer the A/B variant if borderline.
6. **Animation richness.** Does EVERY prompt have camera move + in-scene
   motion/light + focus behavior? Any flat/static ones? Any tacky/overloaded
   ones (>1 motion idea)? Fix both directions.
7. **Cohesion.** Consistent look + caption system across all clips? Will the
   clips cut together as one piece?
8. **Fidelity Gate (the big one).** Does EACH b-roll decode to the *exact* idea of
   its beat — not a pun (insect = "bug"), not a loose association, not generic mood?
   Wrote *Says / Reads as* for each? Reject any decorative shot.
9. **Soul check.** Is each shot still evocative and on-vibe — not a literal
   infographic / on-the-nose cliché (a red "ERROR" popup)? Faithful AND cinematic.
10. **Animation richness.** Does EVERY prompt describe motion as a start→end arc +
    camera + light/focus? Any flat/static or tacky/overloaded (>1 motion idea)?
11. **Cohesion.** Consistent look + caption system across all clips? Will they
    cut together as one piece?
12. **Intent match.** Does the face/b-roll balance serve the reel's intent
    (Relatability keeps face present; Visibility/education can lean b-roll)?
13. **Mix sanity check.** Report the rough face/b-roll split as INFO — but never
    force a number at the cost of a needed beat.

Only present once the breakdown passes all thirteen (or you've flagged the one
remaining judgment call for Jaime to decide). The Fidelity Gate (#8) is the one
that most often fails — be ruthless there.

---

## Output Format

Present, in this order:

1. **Quick framing note** — the locked look + accent color, and the one-line
   self-critique verdict (what you caught and fixed).
2. **The complete script with markers.** Every spoken line in order, each block
   tagged 🎥 FACE or 🅱️ B-ROLL with in/out timecodes. Make explicit that the
   voice runs continuously. Include INSERTS and PUNCH-INS where used.
3. **B-roll shot list** — a compact table: number, timecode, concept, and **Says**
   (the idea it must communicate), so the fidelity logic is visible at a glance.
4. **The b-roll prompts** — per b-roll, numbered to match the shot list: a 3-line
   design spec (**Says / Reads as / Soul**) then the **copy-paste Omni Flash block**
   + a separate **`Negative prompt:`** line. For transformation/text shots, give the
   keyframe package (first-frame [+ last-frame] image prompt + motion prompt).
   Make the copy-paste block visually obvious (its own quote/code block).
5. **Closing options** — offer to (a) fold a `## B-roll Shot List` section into the
   script file so it travels with the draft, (b) produce keyframe images for the
   hard shots, or (c) iterate on any single prompt.

---

## What NOT to do
- **Don't ship a decorative shot** — a pretty object loosely tied to a noun (an
  insect for a software "bug"). It must decode to the exact idea (Fidelity Gate).
- **Don't overkill explanative either** — no literal infographics / "ERROR popup"
  slop. Faithful AND soulful.
- Don't paste the internal design-spec labels into the generator — only the clean
  Omni Flash block + its negative line.
- Don't brute-force live hand-drawing / heavy on-screen text with text-to-video — film it or keyframe.
- Don't write static, one-line, prop-only b-roll descriptions. Always describe the
  motion as a start→end arc.
- Don't reuse the seed reel's exact props (pawns, clipboards) by default —
  reinvent per script.
- Don't make it tacky: one motion idea per clip, slow and premium, no flare spam.
- Don't over-b-roll a Relatability/personal reel — protect the face beats.
- Don't force the b-roll percentage — it's a guide.
- Don't present before running the self-critique loop at least once.
- Don't edit the script's words — this is the visual layer, not a rewrite.
- Don't touch the Google Sheet — this is a directing artifact, not a pipeline step.
