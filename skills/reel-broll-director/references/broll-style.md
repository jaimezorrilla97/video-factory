# B-roll Style DNA + Prompt Craft

The reusable knowledge behind Jaime's b-rolls: the **shared core grammar**, an
element-agnostic **template library**, the **craft subsystems** (camera, captions,
transitions, economy), and the **prompt template** for AI video generators.

This file is the shared spine. It is **read** by the `reel-broll-director` skill
(to direct reels) and **updated** by the `reel-vision` skill (when studying a new
creator surfaces a technique worth keeping, behind an approval gate). The
*grammar* is stable; the *library* grows as we study more creators.

**Seed research:** 8 reels across two creators — @itsemilyhiggins (5, tactile
tabletop, ~1 min) and @dr.patricio.ochoa (3, draw-it-live, ~2 min), analyzed
2026-06 via `reel-vision`. Full report: `Creator Analysis/patterns/broll-dna.md`;
per-video teardowns in `Creator Analysis/<handle>/Instagram/*-visual.md`.

---

## 0. First move — the Running Anchor, then per-beat visual mode

Before the Shared DNA, before any prompt: **choose the reel's Running Anchor** (see
`broll-dna.md` §1B). Name the ONE evolving visual that will carry the reel as its main
character, and **criticize the first pick until it serves BOTH** what the viewer must TRACK
(the information) and what they must FEEL (the thesis). A *stage* (a flat timeline) or a
*metaphor* (a creature) usually fails one of the two — keep revising until one concept does
both.

Then assign **each beat a visual mode**, hung off that anchor:
- **Illustrative** — a labeled, in-world graphic (timeline, curve, named cards, drawn
  diagram). *The default for explainer / timeline / data content.* Render it tactile and warm
  (carved, branded, printed on the surface), never as flat neon UI.
- **Metaphor** — an iconic tactile object standing in for the idea. *Reserved for emotional or
  iconic beats* — seasoning, not the spine.
- **Hybrid** — an illustrative anchor with a metaphor punctuating one moment.

Steal the *moves*, not the elements, from the inspiration library
(`Creator Analysis/<handle>/`): **deal-in reveals** (items enter one-by-one in sync with the
VO), **hand-as-cursor** (a real hand performs the verb — plant, slide, pull, open — instead of
an animated arrow), **live hand inside a flat hand-drawn diagram**, **one macro rack-focus per
section** as the emphasis beat.

---

## 1. The Shared DNA (non-negotiable — applies to EVERY reel)

This is the core grammar both creators share. Honor all of it regardless of the
reel's production approach.

1. **Two-world contrast is the engine.** A warm "narrator / present-tense human"
   register vs a distinct "idea / concept" register. *Trading between them on the
   voice beat is the primary pacing device* — the cut self-explains because the eye
   instantly knows: **face = trust, other-world = the lesson.**
2. **The edit is voice-locked, never beat-grid-locked.** Cuts land on clause/word
   boundaries; the inserted visual names the exact noun just spoken (audio-led, not
   montage-led).
3. **Make the abstract physical — and EXPLANATIVE, not decorative.** Render
   invisible ideas as tangible objects — but the object must *decode back to the
   exact idea the script is making*, in this reel's domain. Never UI/charts/stock.
   (This is the #1 failure mode — see the Fidelity Gate below.)
4. **One concept = one visual element = one beat.** The visual self-explains while
   the VO rides over it; the face never explains the visual.
5. **Captions are the de-facto cut track + metronome.** Word-by-word / short-phrase
   kinetic captions, hard-synced to the VO, carry felt rhythm — especially across a
   single long static shot.
6. **Camera restraint with ONE reserved big move.** Default to locked or
   locked-but-breathing; save the single slow push-in / macro reveal for the
   climactic or most emotional beat so it earns its weight.
7. **Hero-amid-the-mass.** Mass-produce near-identical units to convey "many /
   scale," then mark / focus / point at ONE exception to convey meaning.
8. **Bookend with a recurring object or beat.** Plant something early, pay it off
   at the close — the piece feels finished without an outro card.
9. **Authority-prop staging.** A visible podcast mic, uniform/credential, or
   signature accessory stays in frame as a silent, persistent trust signal — show
   credibility, don't argue it.
10. **Density-follows-story.** Sparse single-element frames at open/close, peak
    visual density during the mechanism/argument middle.
11. **Diegetic over graphic.** Pointers, data, transitions, and even text live
    *inside* the scene (drawn arrows, real book-flips, chalk numbers, text lit on
    the surface), not pasted on top.
12. **Typography encodes meaning, not just style.** A two-register type system
    (bold sans for normal/structure; serif-italic OR a reserved color for key
    terms/brands/punch words) silently flags what to remember.

---

## 1b. The Fidelity Gate — explanative, not decorative (read before every prompt)

**The #1 failure mode is a beautiful shot that means the wrong thing.** A "bug" is
a software flaw, not an insect; rendering an insect-in-amber is a *pun* that
decodes as "nature/fossil" and actively misleads. The object's job is to make the
*idea* land — beauty is second.

Before writing any b-roll prompt, pass it through this gate:

1. **Says (the idea):** in one line, the exact idea this beat must communicate
   (not the noun — the idea). *e.g. "a trusted, ultra-secure system had a hidden
   weakness sitting unnoticed for decades."*
2. **Metaphor:** the physical scene that encodes that idea.
3. **Fidelity check:** *"Would a viewer who knows this reel's topic decode this
   scene as the idea above — or as something else?"* If it can read as the wrong
   thing (a pun, a loose association, a generic mood), **reject it and pick again.**
4. **Soul check (don't overkill it):** is it still *evocative and on-vibe*, or did
   I make it a literal infographic / on-the-nose cliché? A red "ERROR" popup
   explains but is soulless slop. The target is **faithful AND cinematic** — the
   vault-with-a-hidden-crack explains the idea *and* keeps the premium, mysterious
   soul. Explanative ≠ literal.

A shot must pass **both** 3 and 4. Faithful-but-ugly and pretty-but-meaningless
are both failures.

**Detail ≠ cramming.** Be deeply specific about *meaning, composition, and motion*
— but keep it ONE coherent scene. Many loosely-related props is what makes the
generator morph; one precise, richly-described metaphor is what makes it sing.

---

## 2. Production approach (pick what the script needs — no fixed mode)

The Shared DNA above is constant. The *production approach* — how the b-roll is
actually made — flexes per reel. Pull techniques freely from the Template Library
(§3) and from the per-creator DNA files (`Creator Analysis/<handle>/broll-dna.md`),
which hold each studied creator's full look/soul/signature devices. Don't force a
single house style; let the script and the reel's vibe decide, and keep ONE
coherent look within a given reel.

**The one hard production fact (it changes which tool to use):**
- **Tactile/object shots** — real props, real light, a moving camera (handcrafted
  tabletop, dioramas, prop demos) — **generate well with text-to-video** (Omni
  Flash). Generate them.
- **Continuous hand-drawing + lots of on-screen text** (a hand drawing the whole
  argument live) is **AI-hostile** — text-to-video garbles long text, desyncs the
  pen, and morphs. **Film it yourself** (overhead phone, sped up in edit) or heavily
  **keyframe** it. See §5 "Keyframe mode."

---

## 3. The Template Library (element-agnostic — map a script beat to a pattern)

Named, reusable patterns. Each has *what it is*, *how to apply it to any script
beat*, and *the motion that animates it*. Reinvent the props per script — these are
recipes, not elements.

1. **Two-Temperature World Split** — shoot "me talking to you" and "here is the
   concept" in visibly different registers; alternate on the voice beat. The
   world-flip is your transition and pacing engine. *Motion:* hard cut on the
   emphasized word; face beats 2–4s, b-roll beats 3–8s.
2. **One Noun, One Object, One Beat** — every load-bearing noun gets exactly one
   placed/drawn visual that literalizes it, introduced as the word is spoken.
   *Motion:* stop-motion hand places/draws it on the word; caption syncs.
3. **Build-The-World Drawing Explainer** — one locked overhead; a hand
   draws the whole concept from empty to dense across the VO. *Motion:* camera
   bolted; speed-ramp/blur through dull stretches, snap to real-time on key strokes;
   bouncing diegetic arrow drops onto whatever is named.
4. **Explainer Sandwich (10/80/10)** — warm face HOOK → long concept BODY → warm
   face PAYOFF/CTA. Essential past ~90s. *Motion:* micro-jump-cut face on the
   bookends; continuous/build motion in the middle.
5. **Hero-Amid-The-Mass** — fill frame with identical units for scale, isolate ONE
   marked exception for meaning. *Motion:* slow lateral glide/parallax past the
   mass, then push-in / rack-focus onto the single accent.
6. **In-Shot Reveal** — deliver the "aha" inside one continuous shot (rack-focus to
   a hidden element, a word morphs under a lens, something uncoils/lights up) — the
   motion is the punchline. *Motion:* rack pull / in-frame morph / finding push.
7. **Hero-Object / Motif Bookend** — one object embodies the topic; open and close
   on it, resolving without an outro card. *Motion:* push-to-lens / rotate / catch
   light at open and close.
8. **Locked-But-Breathing Camera** — ban static tripod and fast whips; give every
   b-roll a slow 5–8% creep/drift/parallax. *Motion:* 5–8% push/drift over 3–5s;
   foreground parallax; shadows shifting over flat art.
9. **Anthropomorphize-The-Abstract** — give the forces in your topic
   faces: a hero, ONE clear villain, background extras. Humor/story ride the visuals
   while the VO stays factual. *Motion:* drawn faces/anger-marks added on the word;
   motion lines; slow push on the emotional "pain" character.
10. **Caption-As-Metronome (Two-Font)** — word-by-word / 2–4 word captions drive the
    felt edit; two-register type encodes meaning (bold sans = normal/structure;
    italic serif OR scene-matched color + trailing period = key term/brand/punch).
    *Motion:* words punch in/swap on the VO; on static shots the caption is the only
    animation.
11. **Diegetic Everything** — hand-drawn data (chalk number lines, scattered cards),
    drawn/bouncing pointers, real book-flips/whip-pans as transitions, text lit on
    the surface. *Motion:* whip-pan into a "proof page," notebook flip as a portal,
    marker swaps as free transitions.
12. **Reserved Hero Beat (Concentrate Budget)** — spend production value on ONE
    short high-impact shot (cinematic render, macro reveal, single VFX sting); keep
    everything else cheap/analog. The contrast makes it hit and can signal the
    emotional turn. *Motion:* the only big push-in / macro push-to-lens in the piece.
13. **Authority-Prop / Credential Staging** — one persistent trust object (mic in
    lower third, uniform, signature accessory) in every face shot. *Motion:* static
    lower-third placement; hands entering around it; face as the calm counterpoint.
14. **Density Curve (Sparse-Dense-Sparse)** — empty single-element frames at
    open/close, peak density in the mechanism middle; frame fullness mirrors argument
    completeness. *Motion:* accretive composition that never clears, then a settling
    pass at resolution.

---

## 4. Craft subsystems (apply to every reel)

**Camera Policy.** Ban static tripod and fast whips. Default to *locked-but-
breathing* (5–8% slow move) OR *fully bolted with in-frame motion* (e.g. a live
drawing build). Reserve the single slow push-in / macro push-to-lens for the climax
or most emotional beat.

**Caption System.** Word-by-word or short 2–4 word phrases, hard-synced
to the VO as the de-facto cut track. Two-register typography: bold sans for
normal/structure; a reserved style (italic serif, or a color matching the scene's
light, or ending a key word with a period) for terms to remember. On a static shot,
the caption is the ONLY animation.

**Transitions & Diegesis.** Prefer diegetic transitions (real book-flip, whip-pan
off a flat-lay, marker swap) and in-scene data/pointers/text over software wipes and
UI overlays. Keep everything in one believable world.

**Production Economy.** Concentrate budget into ONE hero beat (a render, a macro
reveal, a single VFX sting); let a cheap continuous device (handmade props or a
growing drawing) carry the body. Contrast makes the hero beat land harder.

---

## 5. Writing the prompt — design spec → copy-paste block (for Omni Flash)

Two layers per b-roll. The **design spec** is internal scaffolding (so Jaime can
see *why* the shot is faithful); the **prompt block** is the clean copy-paste text
that goes into the video generator (Google **Omni Flash**). Never paste the
scaffolding labels into the generator — only the block.

### Layer 1 — Design spec (internal; this is the Fidelity Gate, written out)
For each b-roll, state briefly:
- **Says:** the exact idea the beat communicates (the fidelity anchor).
- **Reads as:** one line on why a viewer decodes it correctly (passes gate #3).
- **Soul:** one line confirming it's evocative/on-vibe, not a literal infographic.

### Layer 2 — The Omni Flash prompt block (what gets pasted)
Omni Flash (Google's video model) responds best to **one flowing, concrete,
natural-language paragraph that is RICH and LONG** — pack in real specificity, no
bullet labels, no jargon it won't parse. More detail = more control; a thin prompt
lets the model improvise (and drift). Describe, in roughly this order of ideas:

1. **Shot + subject + setting** — frame type, lens feel, the subject, and the
   surface/world in concrete material detail (what it's made of, its texture, age,
   wear, what surrounds it).
2. **The motion, start → end** — what physically happens across the clip, as a clear
   arc (it begins like X, then Y happens, ending on Z). This is the most important
   part for Omni Flash — be explicit and granular about the change over time.
3. **Camera** — the move (or "locked, no camera movement"), tied to the moment.
4. **Lighting + palette + the single accent** — temperature, direction, how the
   light behaves and shifts, where the one accent colour sits and what it marks.
5. **Texture & atmosphere** — dust, particles, reflections, grain, depth haze —
   the small real details that read as "shot, not generated."
6. **Focus + mood** — depth of field / rack focus, and the emotional register.
7. **Tech tag** — "photoreal, cinematic, vertical 9:16, ~Ns."

Don't be terse to be "clean" — a longer, well-ordered, concrete paragraph
out-performs a short one here. (Just keep it ONE coherent scene; length should add
*detail*, not *more objects*.)

Then a **separate `Negative prompt:` line** (Omni Flash takes a distinct negative
field). Default negatives target real failure modes, NOT text:
`gibberish text, misspelled words, distorted lettering, warped numbers, watermark,
morphing or warping, extra objects appearing or vanishing, style change` — plus any
shot-specific ban (e.g. `no insect`). Add `people` only when the shot has no hand.

**Text & numbers ARE allowed — encouraged when they carry the message.** Short,
meaningful text/numbers ("27", "99%", "$0", a single word) are a feature, not a
risk to ban — they make the point land. Make them **diegetic** (stamped on a plate,
etched into the surface, glowing in the crack) so they live in-world. Keep them
short; banning *gibberish/misspelled* text (above) pushes the model to render them
cleanly. For mission-critical or longer text, lock it via **keyframe** (bake the
text into the first-frame image) or reinforce with a crisp edit overlay. Don't ban
text wholesale — that strips the meaning out of the shot.

**Levers, not rules** (reach for these only when a shot needs them / is failing):
- **Lock the camera** when stillness serves the shot; let it move when motion is
  the point. Don't bolt everything.
- **Duration** is set by the beat (how long the VO sits on it) — not a fixed number.
- **One coherent scene, one motion idea.** Splitting a multi-step idea across two
  clips beats cramming and morphing.

### Keyframe mode (for transformation or text shots — the hard ones)
Omni Flash supports **first-frame** (and first+last-frame) conditioning. When a shot
must transform one thing into another, or must contain crisp text, **don't trust
text-to-video** — instead output: (a) a **first-frame image prompt** (compose/style/
text locked), optionally (b) a **last-frame** for the end state, and (c) a short
**motion prompt** describing only the movement between them. This removes the model's
freedom to hallucinate content, killing morph/text-garble. Use it for hero beats and
anything with letters/numbers.

### Tool matching (validated by testing)
- **Tactile objects + light + camera** generate beautifully in Omni Flash — real
  objects, real light, real motion. **Generate it.** Short diegetic text/numbers on
  the objects are fine and welcome.
- **Draw-it-live (continuous hand-drawing + pen-sync + lots of text)** is AI-hostile
  — garbles long text, desyncs the pen, morphs. **Film it yourself** (overhead phone,
  speed up in edit) or heavily keyframe it.

### Worked example — the Fidelity Gate + rich, text-inclusive prompt
Beat: *"destapó una falla que llevaba 27 años, dormida, en código de los más seguros."*

❌ **Decorative (what fails):** "a beautiful insect frozen in amber." → decodes as
*nature / fossil.* Pretty, wrong reel.

✅ **Explanative + soulful + detailed (the standard):**
> **Says:** a trusted, ultra-secure system held a hidden weakness, unnoticed for
> decades, now exposed. **Reads as:** vault = max security, dust-filled hidden crack
> = the dormant flaw, the "27" plate = the years it hid, the find = "destapó."
> **Soul:** cinematic, ominous, premium — not a literal error icon.
>
> **Omni Flash prompt:** Extreme macro shot, vertical 9:16, of the brushed-steel
> seam of a massive antique high-security bank-vault door — thick cold steel with a
> fine machined grain, rows of heavy riveted bolts running along the seam, a small
> tarnished brass inspection plate stamped with the number "27" bolted to the lower
> frame, a faint grey cobweb strung across one corner and a thin film of decades-old
> dust settled into every groove. Cool desaturated slate-blue grade, a single hard
> low-key light raking across the metal from the left so the texture and rivets cast
> long shadows. The camera begins on the flawless polished steel and slowly pushes in
> along the seam; as it reaches the center a fine hairline crack splits open deep in
> the metal, a thin warm-amber glow seeping out from within and a small puff of dust
> dislodging into the light, the focus racking from the cold steel surface onto the
> glowing fracture as it settles. Fine dust motes drift through the raking light;
> subtle reflections crawl along the brushed metal. Calm, ominous, weighty mood; a
> single warm-amber accent (the glowing crack) against an otherwise all-cold frame;
> shallow depth of field, the background bolts melting into soft bokeh. Photoreal,
> cinematic, vertical 9:16, ~6s.
> **Negative prompt:** gibberish text, misspelled words, distorted lettering, warped
> numbers, watermark, people, insect, morphing or warping, extra objects appearing,
> style change.

Note: faithful (vault+crack = the idea), soulful (not an ERROR popup), **rich and
long** (materials, rivets, dust, light behaviour, motes), **includes meaningful
diegetic text** (the "27" plate) with gibberish/distortion banned instead of text
itself, one coherent scene, motion as an arc, separate negative line.
