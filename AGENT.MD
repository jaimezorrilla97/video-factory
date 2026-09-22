# CLAUDE.md

**Layer 0 — workspace identity.** Where you are, what exists, and how the project is organized. For *which stage handles the request in front of you*, read [CONTEXT.md](CONTEXT.md).

## What this workspace is

A video factory for Jaime's personal brand — reels, TikToks, and longer videos. The work is end-to-end: find or shape an idea, write the script, art-direct the look, cut the raw footage, generate the plates, build the motion graphics in code, render.

## How it is organized

This workspace follows **ICM (Interpretable Context Methodology)** — folder structure as agent architecture. Instead of an orchestration framework, the pipeline *is* the folder tree: numbered stage folders, each with a plain-markdown contract, each reading the previous stage's output and writing its own.

Five layers of context, loaded only as needed:

| Layer | What | Where |
| --- | --- | --- |
| 0 | Workspace identity | this file |
| 1 | Routing — which stage handles which request | [CONTEXT.md](CONTEXT.md) |
| 2 | Stage contracts — inputs, process, outputs | `stages/NN_name/CONTEXT.md` |
| 3 | Stable rules — style, identity, skills | [`_config/`](_config/), [`skills/`](skills/), `stages/*/references/` |
| 4 | Per-run artifacts | `reels/<slug>/` |

The five rules this rests on:

1. **One stage, one job.** A stage folder handles a single step.
2. **Plain text interfaces.** Stages hand off through markdown files, not function calls.
3. **Layered context loading.** Load the stage contract and the references it names — not the whole workspace.
4. **Every output is an edit surface.** Jaime can open, read, and edit any intermediate file before the next stage reads it. If he edits it, that edited version is the input.
5. **Configure the factory, not the product.** `stages/` and `_config/` are set up once. Every reel reuses them.

### The deviation from the paper

The paper puts per-run artifacts in `stages/NN_name/output/`, which assumes one run at a time. Jaime has several reels in flight at once, so **runs live in `reels/<slug>/` instead**, with subfolders named after the stages that wrote them. `stages/` holds the contracts (the factory), `reels/` holds the work (the products). Everything else follows the paper.

## The tree

```
├── AGENT.md              <- Layer 0: you are here
├── CONTEXT.md             <- Layer 1: routing. Read this next.
├── stages/                <- Layer 2: one contract per stage
│   ├── 01_inspiration/    <- transcribe a reference reel, tear down why it works
│   ├── 02_script/         <- the words Jaime says
│   ├── 03_visual_board/   <- metaphor, anchor, chart, per-beat designs
│   ├── 04_shot_direction/ <- FACE vs B-ROLL, timecodes, generation prompts
│   ├── 05_footage/        <- rough cut of the raw clips
│   ├── 06_edit_plan/      <- timecoded visual beat sheet
│   ├── 07_assets/         <- generate the plates (costs money)
│   └── 08_build/          <- Remotion composition, preview, render
├── _config/               <- Layer 3: shared identity
│   ├── style-string.md    <- paste-ready prompt string + standard negative
│   └── broll-dna.md       <- full visual identity: soul, world, devices, anti-patterns
├── skills/                <- Layer 3: the skill library (see skills/CLAUDE.md)
├── reels/                 <- Layer 4: one folder per reel (see reels/CLAUDE.md)
└── motion-studio/         <- the Remotion project: shared components, public assets, renders
```

## How to work here

1. Read [CONTEXT.md](CONTEXT.md) and pick the stage.
2. Read that stage's `CONTEXT.md`. It names its inputs; load those and nothing else.
3. Do the work. Write the named outputs into `reels/<slug>/NN_stage/`.
4. Stop at the gate. Every stage boundary is a human review point — Jaime looks at the file before the next stage runs.

Skipping stages is fine when the situation calls for it (his own idea skips 01; a pure motion graphic with no camera skips 05). Skipping *gates* is not.

## Working notes

- Not a git repository. No tests. The only code is `motion-studio/` and the helper scripts inside skills.
- Secrets are in the project-root `.env`. Never print, echo, log, or commit it.

### Remotion (`motion-studio/`)

- Remotion 4.0.526, React 19, Node 22. Run every command from inside `motion-studio/`. Compositions register in `src/Root.tsx`; the scaffold ships one blank `MyComp` (1280x720, 30 fps, 2 s).
- Preview: `npm run dev`. Render: `npx remotion render <CompositionId> out/<name>.mp4`. Still: `npx remotion still <CompositionId> out/<name>.png`. Only render when asked.
- Details in [stages/08_build/CONTEXT.md](stages/08_build/CONTEXT.md).
- The scaffold has Tailwind v4 enabled even though `--no-tailwind` was passed. Harmless; ignore unless Tailwind is wanted.
- Remotion is free for teams of up to 3 and needs a paid license for larger companies.

### Higgsfield

- **Default: the REST API**, via [higgsfield-motion-graphics](skills/higgsfield-motion-graphics/SKILL.md). Billed to the prepaid API balance, not the web-app subscription. Key is `HIGGSFIELD_API_KEY=<id>:<secret>` in `.env`; verified working 2026-09-21.
- The `higgsfield` CLI (`higgs`, `hf`) is also installed, logged in as the Higgsfield account (run `higgs whoami` to check), and spends **subscription credits** (7.64 left on 2026-09-21, free plan). Use only when Jaime explicitly asks — for example, for a model the API lacks.
- The API and CLI catalogs differ (the API has no GPT Image 2.5 or Nano Banana). See the [API reference](skills/higgsfield-motion-graphics/references/api.md).
- Usage rules in [stages/07_assets/CONTEXT.md](stages/07_assets/CONTEXT.md).

## Known gaps and broken pieces

An agent that hits one of these should find it here first.

| Issue | Effect | Fix |
| --- | --- | --- |
| `yt-dlp` is installed but broken (`bad interpreter` — its Python 3.13 was removed) | **Blocks stage 01 entirely.** Neither ingest skill can download anything. | `brew install yt-dlp` |
| `youtube-ingest` calls `./ingest.sh`, which does not exist here | The skill cannot run even once yt-dlp works. | Write `ingest.sh`, or port it from the project it came from. |
| `GROQ_API_KEY` is not in `.env` | `instagram-transcriber` cannot transcribe reel audio. | Get a key at <https://console.groq.com/keys>, add it to `.env`. |
| **No skill owns stage 02**, and there is no `_config/voice.md` | Scripts are written in conversation with no record of Jaime's voice, pillars, or angles. Two skills reference a "drafts pipeline" that is not here. | Write `_config/voice.md`; then a `reel-script` skill, or port the drafts pipeline. |
| Skills name files from another project | `reel-vision`, `creator-analysis`, `Creator Analysis/CLAUDE.md`, `me.md`, `content-strategy.md`, and `brainstorming → drafts → ready → posted` are referenced but absent. | Port them, or edit the skills to drop the references. |
| No `.claude/skills/` | No skill is slash-invokable. Agents find them through [skills/CLAUDE.md](skills/CLAUDE.md). | Symlink or move project skills into `.claude/skills/` if slash commands are wanted. |
