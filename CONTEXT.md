# CONTEXT.md

**Layer 1 — routing.** Given what Jaime just asked for, which stage handles it and what shared resources exist.

Workspace identity and the folder tree: [CLAUDE.md](CLAUDE.md).

## Route the request

Match what Jaime said to a stage, open that stage's `CONTEXT.md`, and load only what it names.

| Jaime says something like... | Stage |
| --- | --- |
| pastes an **instagram.com** or **youtube.com** link — "transcribe this", "look at this creator", "this gave me an idea" | [01_inspiration](stages/01_inspiration/CONTEXT.md) |
| "I want to make a reel about X", "here's the idea", "let's write the script", "change that line" | [02_script](stages/02_script/CONTEXT.md) |
| "what should this look like", "give me the visual ideas", "what's the metaphor", "art-direct this" | [03_visual_board](stages/03_visual_board/CONTEXT.md) |
| "where do the b-rolls go", "face or b-roll", "give me the prompts", "what do I need to film" | [04_shot_direction](stages/04_shot_direction/CONTEXT.md) |
| "here's the raw footage", "cut this", "clean up the takes" | [05_footage](stages/05_footage/CONTEXT.md) |
| "how should this be edited", "plan the edit", "what goes on screen when" | [06_edit_plan](stages/06_edit_plan/CONTEXT.md) |
| "generate the backgrounds", "make the visuals", "use Higgsfield" | [07_assets](stages/07_assets/CONTEXT.md) |
| "build it", "animate this", "make the motion graphic", "render it", "open Studio" | [08_build](stages/08_build/CONTEXT.md) |

**If the request does not name a stage**, find the reel's folder in [`reels/`](reels/), read its `README.md` status field, and continue from the next stage. If there is no reel folder yet, the request is stage 01 or 02.

## The three ways work arrives

All three converge after stage 02.

1. **Instagram reel as inspiration** — transcribe it, tear down why it works, then build Jaime's own version with his topic and his spin. Starts at 01.
2. **YouTube video as inspiration** — same. Starts at 01.
3. **Jaime's own idea** — he gives the premise, we bounce the script until ready, he films. Starts at 02, skips 01.

## Stage flow

```
01_inspiration ─┐
                ├─→ 02_script ─→ 03_visual_board ─→ 04_shot_direction ─┐
  (own idea) ───┘                                                      │
                                                    ┌──────────────────┘
                                                    ↓
                                    05_footage ─→ 06_edit_plan ─→ 07_assets ─→ 08_build
```

Every arrow is a **human review gate**. Jaime reads and may edit the output file before the next stage runs; the edited version is what the next stage reads.

**Skipping stages** is normal:
- His own idea → skip 01.
- Pure motion graphic, no camera → skip 05.
- No generated plates needed → skip 07.
- Fixing a render → re-run 08. Changing what the reel says → back to 02 and forward again, because 03 and 04 both re-time against the wording.

## Shared resources

Available to every stage. Do not load them unless the stage contract names them.

| Resource | Path | What it is |
| --- | --- | --- |
| Style string | [_config/style-string.md](_config/style-string.md) | Paste-ready prompt string, the one-sentence soul, the hard nos. Used by stages 03, 04, 07. |
| Visual identity | [_config/broll-dna.md](_config/broll-dna.md) | The full look: soul, concept world, signature devices, motion signature, caption identity, anti-patterns. Used by stages 03, 04, 06, 08. |
| Skill library | [skills/CLAUDE.md](skills/CLAUDE.md) | Every skill, what it does, when to reach for it. Stage contracts name the ones they need. |
| Reel workspaces | [reels/CLAUDE.md](reels/CLAUDE.md) | How a run is laid out and how to name a new one. |
| Remotion project | [motion-studio/](motion-studio/) | Shared components, `public/higgsfield/` plates, renders. |

## Before you start

- A stage contract names its inputs. **Load those, not the workspace.** Pulling in everything is what this structure exists to prevent.
- Write outputs to `reels/<slug>/NN_stage/` using the filenames the contract specifies. Downstream stages look for those names.
- Stop at the gate and say what Jaime should look at.
- Blocked by something broken? Check [Known gaps](CLAUDE.md#known-gaps-and-broken-pieces) before debugging — stage 01 in particular is known-broken right now.
