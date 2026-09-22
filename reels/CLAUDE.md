# Reels

**Layer 4 — working artifacts.** One folder per reel. Each subfolder is named after the stage that wrote it, so a handoff is literal: stage 06 reads `05_footage/`, stage 08 reads `06_edit_plan/`.

Routing: [../CONTEXT.md](../CONTEXT.md). Stage contracts: [../stages/](../stages/).

## Layout

```
reels/
└── 01-ai-agents-roi/           <- <NN>-<slug>, NN counts up, slug is the topic
    ├── README.md               <- status, premise, links. Read this first.
    ├── 01_inspiration/
    │   ├── transcript.md
    │   └── teardown.md
    ├── 02_script/
    │   └── script.md
    ├── 03_visual_board/
    │   └── visual_board.md
    ├── 04_shot_direction/
    │   ├── shot_list.md
    │   └── broll_prompts.md
    ├── 05_footage/
    │   ├── raw/                <- Jaime's clips, read-only
    │   ├── cut/                <- rough cuts and proxies
    │   └── cut_plan.md
    ├── 06_edit_plan/
    │   ├── edit_plan.md
    │   └── asset_list.md
    ├── 07_assets/
    │   └── assets.md           <- which plate serves which beat, and cost
    └── 08_build/               <- notes; the composition lives in motion-studio/
```

Create only the stage folders a reel actually uses. An empty `07_assets/` on a reel with no generated plates is noise.

## Rules

- **`NN`** is the next number after the highest existing folder. The slug is lowercase, hyphenated, and describes the topic, not the format.
- **`05_footage/raw/` is read-only.** Never transcode, trim, or overwrite the only copy. Cuts and proxies go in `cut/`.
- **Filenames are the interface.** Stage contracts look for `script.md`, `edit_plan.md`, and so on by name. Renaming one breaks the handoff.
- **Generated plates live in [`../motion-studio/public/higgsfield/`](../motion-studio/public/higgsfield/)**, not in the reel folder — they are reusable and Remotion resolves them with `staticFile()`. `07_assets/assets.md` records which plate serves which beat. Reel-specific material that was *not* generated (screenshots, logos, screen recordings) does go in `07_assets/`.
- **Compositions live in `../motion-studio/src/reels/<slug>/`** and register in `src/Root.tsx`. `08_build/` holds notes only.
- **Every file is an edit surface.** Jaime can open any of these, change it, and the next stage reads his version. That is the point of the structure — do not treat a file as final just because a stage wrote it.

## README.md format

```markdown
---
id: 01-ai-agents-roi
status: 02_script        # the stage currently in progress, or `posted`
platform: instagram      # instagram | tiktok | youtube | linkedin
format: reel             # reel | tiktok | long-form
created: 2026-09-21
---

# <Title>

**Premise:** one line — what this reel argues.

**Source:** link to `01_inspiration/transcript.md`, or "Jaime's own idea".

**Objective:** what this reel is for.

## Status log
- 2026-09-21 — script drafted, waiting on Jaime's pass
```

`status` holds the **stage folder name**, so a fresh session reads it and knows exactly which contract to open next.

## Conventions

- Create the folder as soon as a reel has a premise, even before the script exists.
- Update `status` and append to the status log whenever a stage completes. It is the fastest way for a new session to pick up the work.
- `02_script/script.md` is the single source of truth for the spoken words. Later stages reference its beats; they never re-transcribe it.
- Do not delete a reel folder after posting. Set `status: posted` and leave it — it becomes the reference library of what has already worked.
