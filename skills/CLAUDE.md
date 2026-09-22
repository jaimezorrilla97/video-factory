# Skills

**Layer 3 — domain knowledge.** The skill library: stable, reusable instructions that stage contracts name as inputs. Skills do not decide *when* they run; the [stage contracts](../stages/) do that.

Read this to find the right skill, then open that skill's own file.

Workspace identity: [../CLAUDE.md](../CLAUDE.md). Routing: [../CONTEXT.md](../CONTEXT.md). Where a reel's files live: [../reels/CLAUDE.md](../reels/CLAUDE.md).

Each section below maps to the stage that uses it. **If you are working a stage, open its contract first** — it names the skills and references to load, and skips the rest.

## Which Skill Do I Need?

| If the task is... | Use |
| --- | --- |
| Jaime pasted an **instagram.com** reel link | [instagram-transcriber](instagram-transcriber/SKILL.md) |
| Jaime pasted a **youtube.com / youtu.be** link | [youtube-ingest](youtube-ingest/SKILL.md) |
| Writing or polishing the spoken script | **no skill yet** — see [Gaps](#gaps) |
| Deciding what a reel should *look* like: metaphor, visual anchor, how the data is drawn, a design per beat | [reel-visual-board](reel-visual-board/SKILL.md) |
| Splitting a script into FACE vs B-ROLL and writing generation prompts for the inserts | [reel-broll-director](reel-broll-director/SKILL.md) |
| Rough-cutting raw talking-head footage — bad takes, false starts, dead air | [cut-talking-head-footage](cut-talking-head-footage/SKILL.md) |
| Planning the final visual edit: overlays, split screens, screen recordings, punch-ins, tool routing | [direct-jaime-video-style](direct-jaime-video-style/SKILL.md) |
| Generating a background, still, or b-roll clip with Higgsfield (API, not subscription credits) | [higgsfield-motion-graphics](higgsfield-motion-graphics/SKILL.md) |
| Creating a new Remotion project or composition | [remotion-create](remotion-create/SKILL.md) |
| Writing or editing Remotion composition code (animation, layout, text, media, effects, transitions, fonts) | [remotion-markup](remotion-markup/SKILL.md) |
| Adding captions or subtitles in Remotion (transcribe, import `.srt`, display) | [remotion-captions](remotion-captions/SKILL.md) |
| Previewing a video in Remotion Studio | [remotion-studio](remotion-studio/SKILL.md) |
| Rendering a video or still, including transparent video | [remotion-render](remotion-render/SKILL.md) |
| Trimming, cropping, or reading duration/dimensions of media in the browser | [remotion-multimedia](remotion-multimedia/SKILL.md) |
| Making elements selectable, draggable, and editable in Studio | [remotion-interactivity](remotion-interactivity/SKILL.md) |
| Map animations (routes, markers, geographic explainers, 3D flyovers) | [remotion-maps](remotion-maps/SKILL.md) |
| Looking up Remotion APIs or current docs | [remotion-docs](remotion-docs/SKILL.md) |
| Upgrading Remotion or its packages | [remotion-upgrade](remotion-upgrade/SKILL.md) |
| Building an app or SaaS on top of Remotion | [remotion-saas](remotion-saas/SKILL.md) |
| A Remotion task and you are unsure which skill applies | [remotion-best-practices](remotion-best-practices/SKILL.md) |

## Skill Registry

**Status values:** `active` (ready to use), `draft` (being built, do not rely on it), `blocked` (correct but cannot run — see [Gaps](#gaps)), `deprecated` (replaced or retired).

Sections follow the [stage flow](../CONTEXT.md#stage-flow).

### Stage 01 — Inspiration · [contract](../stages/01_inspiration/CONTEXT.md)

Capture someone else's reel or video so it can be studied. These skills study **other creators**; they never write Jaime's own scripts.

| Skill | Path | What it does / when to use it | Status |
| --- | --- | --- | --- |
| instagram-transcriber | [instagram-transcriber](instagram-transcriber/SKILL.md) | Downloads a public Instagram reel's audio with `yt-dlp` and transcribes it through the Groq API (`whisper-large-v3-turbo`), then writes a `transcript.md` (id + summary + literal transcript) and a researched `profile.md` into a `Creator Analysis/<handle>/` swipe file. Also has a manual-paste path for LinkedIn posts. Trigger on any `instagram.com` URL, even with no other instruction. | `blocked` — `yt-dlp` is broken and `GROQ_API_KEY` is missing |
| youtube-ingest | [youtube-ingest](youtube-ingest/SKILL.md) | Pulls a YouTube video's auto-captions with `yt-dlp`, strips VTT timing and duplicate cues, and writes a clean markdown file with an empty "My Take" section. Then surfaces 2–4 angles for Jaime to pick from before drafting. Trigger on any `youtube.com` / `youtu.be` URL. | `blocked` — calls `./ingest.sh`, which does not exist here; `yt-dlp` is broken |

### Stage 02 — Script · [contract](../stages/02_script/CONTEXT.md)

**No skill owns this stage.** Scripts are written in conversation. See [Gaps](#gaps).

### Stage 03 — Visual Board · [contract](../stages/03_visual_board/CONTEXT.md)

| Skill | Path | What it does / when to use it | Status |
| --- | --- | --- | --- |
| reel-visual-board | [reel-visual-board](reel-visual-board/SKILL.md) | From a finished script, proposes a curatable menu of four things: a storytelling metaphor, the visual anchor (tested against TRACK + FEEL), how the key number is charted, and a design per beat (each passed through a Says/Reads-as fidelity check and marked FACE or B-ROLL). Self-critiques before presenting. Does not write generation prompts or rewrite the script. Hands off to `reel-broll-director`. | `active` |

### Stage 04 — Shot Direction · [contract](../stages/04_shot_direction/CONTEXT.md)

| Skill | Path | What it does / when to use it | Status |
| --- | --- | --- | --- |
| reel-broll-director | [reel-broll-director](reel-broll-director/SKILL.md) | Turns a finished script into three things: the full script with FACE/B-ROLL markers and timecodes, a b-roll shot list, and one rich generation-ready prompt per b-roll (Seedance, Veo, Sora, Kling, Runway). Self-critiques against a rubric and revises before presenting. Reads [references/broll-style.md](reel-broll-director/references/broll-style.md) for the shared prompt grammar. | `active` |

### Stage 05 — Footage · [contract](../stages/05_footage/CONTEXT.md)

| Skill | Path | What it does / when to use it | Status |
| --- | --- | --- | --- |
| cut-talking-head-footage | [cut-talking-head-footage](cut-talking-head-footage/SKILL.md) | Rough-cuts raw talking-head, interview, tutorial, or screen-recording footage. Builds a semantic take map (`KEEP` / `ALT` / `DROP_ERROR` / `DROP_DEAD` / `DROP_REDUNDANT` / `REVIEW`), picks phoneme-safe cut points, and delivers a cut plan, EDL, or rendered rough cut with a per-change manifest. Treats silence detection as evidence, never as the decision. Hands off to `direct-jaime-video-style`. Reads [references/cutting-grammar.md](cut-talking-head-footage/references/cutting-grammar.md). | `active` |

### Stage 06 — Edit Plan · [contract](../stages/06_edit_plan/CONTEXT.md)

| Skill | Path | What it does / when to use it | Status |
| --- | --- | --- | --- |
| direct-jaime-video-style | [direct-jaime-video-style](direct-jaime-video-style/SKILL.md) | Designs the visual editing language on top of an approved cut: a treatment per beat from a 7-level hierarchy (full-screen A-roll → overlay → split screen → PiP → full-screen source → motion graphic → generated insert), a timecoded visual beat sheet, a restraint budget, and aspect-ratio variants. Routes work between CapCut, After Effects, Remotion, Hyperframes, and Higgsfield via [references/tool-routing.md](direct-jaime-video-style/references/tool-routing.md); visual rules in [references/visual-grammar.md](direct-jaime-video-style/references/visual-grammar.md). Written for Codex, so it names tools this project does not use — the contract overrides it toward Remotion. | `active` |

> **Stages 03–04 and 05–06 come from different sources and do not cross-reference each other.** `reel-visual-board` and `reel-broll-director` work from a script *before footage exists* and output prompts for AI generators. `cut-talking-head-footage` and `direct-jaime-video-style` work from footage that *already exists*. They chain rather than compete. Where their advice conflicts, the one matching the material in hand wins.

### Stage 07 — Assets · [contract](../stages/07_assets/CONTEXT.md)

Produces the generated plates the compositions use. Pairs with the Remotion skills below: this one makes the files, `remotion-markup` puts them on screen. **The only stage that spends money.**

| Skill | Path | What it does / when to use it | Status |
| --- | --- | --- | --- |
| higgsfield-motion-graphics | [higgsfield-motion-graphics](higgsfield-motion-graphics/SKILL.md) | Generates images, video clips, and audio with the **Higgsfield REST API** using `HIGGSFIELD_API_KEY` from the project `.env` (API balance, not the web-app subscription credits), then saves them to `motion-studio/public/higgsfield/` with a `manifest.jsonl` log. Includes [hf-api.mjs](higgsfield-motion-graphics/scripts/hf-api.mjs) (key check, cost estimate, spend guard, submit, poll, download) and an [API reference](higgsfield-motion-graphics/references/api.md) with endpoints and prices. Styles every prompt from [style-string.md](../_config/style-string.md) and [broll-dna.md](../_config/broll-dna.md). Use instead of the global `higgsfield-*` skills and the `higgsfield` CLI, which spend subscription credits. | `active` — credentials verified 2026-09-21 |

### Stage 08 — Build · [contract](../stages/08_build/CONTEXT.md)

Third-party skills from the Remotion team. See [Sources](#sources-for-third-party-skills) for version and local changes.

| Skill | Path | What it does / when to use it | Status |
| --- | --- | --- | --- |
| remotion-best-practices | [remotion-best-practices](remotion-best-practices/SKILL.md) | Router only. Use it when unsure which Remotion skill applies; it points to all the others. | `active` |
| remotion-create | [remotion-create](remotion-create/SKILL.md) | Scaffold a new Remotion project and first composition. Includes [video-layout.md](remotion-create/video-layout.md) (video-first layout and text sizing) and [tailwind.md](remotion-create/tailwind.md). Hands off to `remotion-markup`, `remotion-studio`, `remotion-render`. | `active` |
| remotion-markup | [remotion-markup](remotion-markup/SKILL.md) | Main authoring guide for Remotion React code: `useCurrentFrame`/`interpolate` animation, media components, sequencing, transitions, effects, fonts, audio, 3D. Its `SKILL.md` indexes 28 sub-docs (see [Common Remotion Topics](#common-remotion-topics)). Links to `remotion-maps` and `remotion-captions`. | `active` |
| remotion-captions | [remotion-captions](remotion-captions/SKILL.md) | Captions and subtitles as JSON: [transcribe](remotion-captions/transcribe-captions.md), [display and animate](remotion-captions/display-captions.md), [import `.srt`](remotion-captions/import-srt-captions.md). | `active` |
| remotion-studio | [remotion-studio](remotion-studio/SKILL.md) | Launch Remotion Studio (`npx remotion studio --no-open`) to preview a video at its local URL. | `active` |
| remotion-render | [remotion-render](remotion-render/SKILL.md) | Render to video or still (`npx remotion render`), advanced rendering, and [transparent videos](remotion-render/transparent-videos.md). | `active` |
| remotion-multimedia | [remotion-multimedia](remotion-multimedia/SKILL.md) | Mediabunny in the browser: [audio duration](remotion-multimedia/get-audio-duration.md), [video duration](remotion-multimedia/get-video-duration.md), [video dimensions](remotion-multimedia/get-video-dimensions.md). Used by `calculateMetadata` and `voiceover` patterns in `remotion-markup`. | `active` |
| remotion-interactivity | [remotion-interactivity](remotion-interactivity/SKILL.md) | Structure markup with `Interactive` elements, inline styles, and inline `interpolate()` so Studio can select, drag, resize, and edit keyframes. Use when elements are not selectable or editable. | `active` |
| remotion-maps | [remotion-maps](remotion-maps/SKILL.md) | Map animation knowledge. Pick exactly one technique and load only its `TECHNIQUE.md`: [static-map](remotion-maps/techniques/static-map/TECHNIQUE.md), [mapbox](remotion-maps/techniques/mapbox/TECHNIQUE.md), [maplibre](remotion-maps/techniques/maplibre/TECHNIQUE.md), [maptiler](remotion-maps/techniques/maptiler/TECHNIQUE.md), [cesium](remotion-maps/techniques/cesium/TECHNIQUE.md) (3D flyovers). | `active` |
| remotion-docs | [remotion-docs](remotion-docs/SKILL.md) | Search current Remotion documentation (Algolia search API) and fetch a doc page as Markdown. Use when a skill does not cover an API. | `active` |
| remotion-upgrade | [remotion-upgrade](remotion-upgrade/SKILL.md) | Upgrade Remotion, related `@remotion/*` packages, compatible Mediabunny packages, and installed Remotion skills. | `active` |
| remotion-saas | [remotion-saas](remotion-saas/SKILL.md) | Building apps on Remotion: choosing a template/framework, the `<Player>`, client-side and server-side rendering (Lambda, Vercel, Node.js, Cloudflare). Probably not needed unless the project becomes a video app. | `active` |

### Common Remotion Topics

Deep links into `remotion-markup` for topics most likely to matter for reels and TikToks. The full list is in [remotion-markup/SKILL.md](remotion-markup/SKILL.md).

| Topic | File |
| --- | --- |
| Multi-scene videos | [multi-scene-video.md](remotion-markup/multi-scene-video.md) |
| Scene transitions | [transitions.md](remotion-markup/transitions.md) |
| Text highlights, underlines, circles, strike-throughs | [text-highlights.md](remotion-markup/text-highlights.md) |
| Sequencing, delaying, trimming | [sequencing.md](remotion-markup/sequencing.md) |
| Editable video timelines in Studio | [video-editing.md](remotion-markup/video-editing.md) |
| Embedding and trimming video clips | [embedding-videos.md](remotion-markup/embedding-videos.md) |
| Audio (trim, volume, speed, pitch) | [audio.md](remotion-markup/audio.md) |
| Sound effects | [sfx.md](remotion-markup/sfx.md) |
| AI voiceover (ElevenLabs) | [voiceover.md](remotion-markup/voiceover.md) |
| Silence detection and trimming | [silence-detection.md](remotion-markup/silence-detection.md) |
| Audio visualization (waveforms, bars) | [audio-visualization.md](remotion-markup/audio-visualization.md) |
| Visual and pixel effects | [effects.md](remotion-markup/effects.md) |
| Light leaks | [light-leaks.md](remotion-markup/light-leaks.md) |
| Google Fonts / local fonts | [google-fonts.md](remotion-markup/google-fonts.md), [local-fonts.md](remotion-markup/local-fonts.md) |
| Dynamic duration and dimensions | [calculate-metadata.md](remotion-markup/calculate-metadata.md) |
| Parameterized videos (Zod) | [parameters.md](remotion-markup/parameters.md) |

## Gaps

Missing pieces that affect which skill an agent can reach for. The full list, including environment breakage, is in [../CLAUDE.md](../CLAUDE.md#known-gaps-and-broken-pieces).

- **No skill owns stage 02 (the script), and there is no `_config/voice.md`.** `reel-visual-board` and `reel-broll-director` both say the script comes from a "drafts pipeline"; that pipeline is not in this project. Scripts are written in conversation for now.
- **Skills reference things that live in another project.** `reel-vision` (visual dissection of a studied reel), `creator-analysis` (hook/format/CTA dissection), `Creator Analysis/CLAUDE.md`, `me.md`, `content-strategy.md`, and the `brainstorming → drafts → ready → posted` folders are all named by the skills above but absent here. Do not follow those links; ask or port them first.
- **No `.claude/skills/`**, so none of these are slash commands. Agents find them through this registry.

## Skill Structure

Each skill lives in its own folder:

```
skills/
├── CLAUDE.md              <- this registry
└── <skill-name>/
    ├── SKILL.md           <- the skill itself
    ├── references/        <- supporting docs, linked from SKILL.md
    └── scripts/           <- helper scripts
```

- Folder names are lowercase and hyphenated, e.g. `reel-broll-director`.
- `SKILL.md` starts with frontmatter containing `name` and a `description` that says *when to use the skill*.
- Supporting files go inside the skill's folder and are linked from its `SKILL.md`.
- Some skills also ship `agents/openai.yaml` and `assets/icon.svg`. These are metadata for other agent tools and can be ignored.

## Sources for Third-Party Skills

### Remotion

- **Source:** [github.com/remotion-dev/skills](https://github.com/remotion-dev/skills) (mirror of `packages/skills` in [remotion-dev/remotion](https://github.com/remotion-dev/remotion)). Docs: [remotion.dev/docs/ai/skills](https://www.remotion.dev/docs/ai/skills).
- **Version:** 4.0.526, commit `bbb139d`, downloaded 2026-09-21.
- **Local changes** (re-apply after any update):
  1. `remotion-best-practices` keeps only its router `SKILL.md`. Upstream also bundles a full copy of every other skill inside it; those copies are omitted.
  2. The copy of `remotion-maps` nested inside `remotion-markup` is omitted.
  3. Cross-skill links in those two `SKILL.md` files now point to the sibling folders (`../remotion-maps/SKILL.md`) instead of the bundled copies (`./remotion-maps/REFERENCE.md`).
- **Updating:** re-fetch from the source repo and repeat the three changes above, then bump the version and commit here. The `remotion-upgrade` skill also covers upgrading installed Remotion skills.

### Skills ported from Jaime's other projects

`instagram-transcriber`, `youtube-ingest`, `reel-visual-board`, and `reel-broll-director` came from Jaime's content project and still assume its folder layout. `cut-talking-head-footage` and `direct-jaime-video-style` were written for Codex. All six work here, but see [Gaps](#gaps) before following a path they mention.

Local changes on import: `instagram_transcriber` was renamed to `instagram-transcriber` and its script path corrected from `./Skills/instagram_transcriber/transcribe.sh` to `./skills/instagram-transcriber/transcribe.sh`.

## Keeping the Registry Current

- Whenever a skill is added, renamed, or removed, update the registry table in the same change.
- Use a relative link in the Path column, e.g. `[reel-visual-board](reel-visual-board/SKILL.md)`.
- Write the description as *when to reach for this skill*, so an agent can pick the right one without opening every file.
- Put a new skill in the stage section it belongs to, and name it in that stage's contract under `## Inputs` — a skill nothing routes to will never be loaded. A genuinely new step needs a new `stages/NN_name/` folder, a row in [../CONTEXT.md](../CONTEXT.md#route-the-request), and a new section here.
- Add new skills to the [Which Skill Do I Need?](#which-skill-do-i-need) table as well.
- If a skill depends on or hands off to another skill, mention it in its row.
- When a skill stops working, set its status to `blocked` and add the reason to [Gaps](#gaps) and the root [Known gaps](../CLAUDE.md#known-gaps-and-broken-pieces) table.
- For third-party or ported skills, record the source, version, and any local changes under [Sources](#sources-for-third-party-skills).
