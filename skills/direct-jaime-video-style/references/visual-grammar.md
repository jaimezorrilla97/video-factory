# Jaime Visual Grammar

## Table of contents

1. Visual hierarchy
2. Layout decision matrix
3. Asset choice
4. Motion and transitions
5. Captions and typography
6. Sound and music
7. Modern agentic patterns
8. Anti-patterns

## 1. Visual hierarchy

Use visuals in this priority order:

1. Jaime speaking clearly
2. Authentic proof or real product footage
3. Purpose-built diagram, UI callout, or chart
4. Relevant licensed photo or video
5. Clearly illustrative AI-generated content

The stronger the claim, the more authentic the supporting asset should be.

## 2. Layout decision matrix

| Layout | Use when | Avoid when |
|---|---|---|
| Full-screen A-roll | Opinion, trust, emotion, hook, CTA, transition | Viewer must read or inspect detailed proof |
| A-roll + overlay | One short fact, label, logo, quote, or artifact supports the sentence | The overlay needs sustained reading |
| Half split screen | Face and demo/comparison are both necessary; commentary benefits from visible presence | Either side becomes too small, especially on mobile |
| Picture-in-picture | Screen/demo is primary and Jaime guides or reacts | Face adds no information or blocks important UI |
| Full-screen screen capture | A process, UI, document, message, or result must be inspected | The screen contains irrelevant clutter or illegible detail |
| Full-screen animation | Explain systems, flow, hierarchy, causality, timelines, invisible AI processes | Real footage or a simple label would communicate better |
| Image over video | A person, product, place, headline, or static artifact needs brief identification | The image is generic decoration |
| Video over video | Demonstrate an action, before/after, workflow, output, or parallel event | Motion competes with the spoken point |
| B-roll replacement | Context is more important than facial connection for a short span | The audience needs to judge Jaime's sincerity or emotion |

### Half split-screen rules

- Use it for comparison, guided walkthrough, reaction, or proof-plus-explanation.
- Give the evidence more area when reading or inspection matters.
- Keep the face side visually quiet.
- Match eyeline and visual direction so Jaime appears to address the evidence.
- Collapse to full-screen evidence if the mobile preview is illegible.

### Full-screen animation rules

- Use it to reveal one model or relationship, not to wallpaper narration.
- Build in narrative order: establish, transform, resolve.
- Synchronize major changes to meaning, not every spoken word.
- Return to A-roll after the concept lands.

## 3. Asset choice

Use screenshots for proof, screen recordings for process, photos for identity or place, diagrams for relationships, charts for magnitude or trend, and generated visuals for metaphor or impossible scenes.

For web or product footage:

- crop tightly to the relevant action
- remove personal data and unrelated notifications
- add cursor emphasis only when it aids orientation
- zoom to readable scale before expecting the viewer to read
- keep UI text accurate; never recreate proof with generated pixels

For B-roll, favor specific footage that advances the claim. Avoid cliché robots, glowing brains, random code, handshakes, rockets, and city timelapses unless the subject literally requires them.

## 4. Motion and transitions

- Prefer direct cuts, position-matched transitions, masks, and simple spatial continuity.
- Use easing with a decisive entrance and calm settle.
- Animate properties that explain hierarchy: position, scale, opacity, crop, focus, and connection.
- Use camera movement sparingly; do not fake depth without a compositional reason.
- Use motion blur consistently.
- Keep transition duration proportional to energy and information density.
- Use punch-ins to emphasize or cover a cut, not at every sentence.

## 5. Captions and typography

- Use sentence-aware caption chunks, not one word per frame by default.
- Emphasize only meaningful keywords.
- Keep captions away from UI labels, faces, platform controls, and lower thirds.
- Use at most two typographic roles in a frame: primary statement and support.
- Favor readable size, strong contrast, and consistent line breaks over novelty.
- Treat numbers, product names, and client names as accuracy-critical.

## 6. Sound and music

- Dialogue is primary.
- Use subtle risers, impacts, ticks, or whooshes only when they clarify a real visual event.
- Avoid a sound effect on every text entrance.
- Duck music for dense explanations and emotional nuance.
- Use silence intentionally before a key line or reveal.
- Match ambience across cuts and preserve natural room tone.

## 7. Modern agentic patterns

Use these patterns when they improve repeatability or quality:

- transcript-to-beat-sheet mapping with word-level timestamps
- a source-of-truth edit manifest shared by the NLE and code-generated scenes
- reusable brand tokens for typography, color, spacing, easing, shadows, and safe areas
- reusable components for hooks, lower thirds, proof cards, charts, comparisons, and CTAs
- data-bound graphics so displayed numbers come from validated structured data
- semantic asset search and an evidence ledger recording origin, rights, and whether an asset is real or generated
- reference-frame matching before generating a family of scenes
- deterministic previews at exact frames for visual regression checks
- batch variants for aspect ratio, language, hook, CTA, and platform length
- automated checks for black frames, clipped audio, caption overflow, missing assets, unsafe crops, and incorrect duration
- human approval gates after the story cut, style frame, and final preview

## 8. Anti-patterns

- constant zooms or layout changes without semantic motivation
- split screen used only to fill empty space
- captions, headline, lower third, and UI competing simultaneously
- full-screen animation for a trivial sentence
- AI-generated fake dashboards, testimonials, analytics, messages, or client work presented as evidence
- generic “tech” B-roll unrelated to the spoken claim
- transitions chosen because they are available rather than meaningful
- tiny websites or screenshots shown without a legible crop
- over-smoothed faces or altered identity
- cloning another creator's signature style instead of extracting high-level principles
