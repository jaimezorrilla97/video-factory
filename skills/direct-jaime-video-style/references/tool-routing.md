# Tool Routing and Hybrid Workflows

## Table of contents

1. Routing matrix
2. Recommended hybrid pipeline
3. Hyperframes
4. Remotion
5. After Effects
6. CapCut
7. Higgsfield
8. Reliability rules
9. Current capability sources

## 1. Routing matrix

| Need | Best starting point | Why |
|---|---|---|
| Dialogue rough cut | NLE or deterministic FFmpeg workflow | Precise source-time editing and audio control |
| Fast captions and social finish | CapCut | Rapid manual review and accessible finishing |
| Bespoke composite or tracked element | After Effects | Layer-level control, masks, roto, tracking, expressions |
| Reusable branded videos from structured inputs | Remotion | React components, programmatic timelines, scalable variants |
| Agent-built browser motion graphic | Hyperframes | HTML/CSS/JS composition and deterministic frame capture |
| Generated cinematic insert or visual transformation | Higgsfield | Reference-driven and generative video capabilities |
| Final narrative assembly | NLE or available video-editing system | Editorial timing, audio mix, review, and export |

## 2. Recommended hybrid pipeline

1. Cut and approve spoken content.
2. Lock the transcript and word-level time mapping.
3. Create the visual beat sheet and evidence ledger.
4. Build deterministic UI, diagrams, typography, and data scenes in Remotion, Hyperframes, or After Effects.
5. Generate only the illustrative inserts that genuinely need Higgsfield or another video model.
6. Assemble and mix in the final editor.
7. Render format variants from a shared manifest where practical.
8. Run technical and editorial QC on the actual renders.

This separates semantic decisions from expensive generation and prevents late timing changes from invalidating motion work.

## 3. Hyperframes

Use for code-authored motion graphics based on web technologies, including animated explainers, kinetic layouts, branded title sequences, charts, UI simulations, and URL/data-driven scenes.

Prefer Hyperframes when an agent can express the scene cleanly in HTML/CSS/JavaScript, deterministic frame capture matters, the scene should be reusable from structured inputs, or a browser-native prototype already exists.

Do not use it as the default dialogue editor. Verify font loading, asset paths, frame determinism, and browser rendering before the final export.

## 4. Remotion

Use for React-based compositions, reusable component libraries, captions, data-bound graphics, multi-format rendering, and products that generate many videos from inputs.

Prefer Remotion when React components and schemas provide useful reuse, the same visual system must produce multiple ratios or datasets, frame-level logic matters, or an interactive preview is valuable.

Keep components small, use shared timing constants, and avoid coupling every animation to absolute frame numbers when sequences can express intent.

## 5. After Effects

Use for hero moments that require exact typography, advanced compositing, masks, tracking, roto, particles, or hand-tuned curves. Use expressions and templates for repeated properties, but keep the final project understandable to a human editor.

Prefer it for a few high-value shots rather than rebuilding an entire straightforward edit. Render with handles and alpha where downstream flexibility is needed.

## 6. CapCut

Use for quick manual assembly, caption review, reframing, lightweight effects, and social exports. It is a finishing surface, not the source of truth for complex generative or data-driven graphics.

Review automated filler-word removal and silence trimming manually. Preserve a copy of the source timeline before applying bulk operations.

## 7. Higgsfield

Use for reference-driven generated video, cinematic inserts, motion transfer, product or environment variations, and visual concepts that cannot be captured economically.

Prefer real footage for Jaime, clients, products, dashboards, messages, and results. Label generated illustrative content in the project manifest. Match aspect ratio, motion direction, lighting, lens feel, and cut energy to adjacent real footage.

Do not ask generative video to render accuracy-critical text, numbers, interfaces, logos, or charts. Composite deterministic elements afterward.

## 8. Reliability rules

- Choose the minimum number of tools needed.
- Keep a canonical transcript, timeline, asset inventory, and brand-token file.
- Record prompts, seeds, models, source references, and licenses for generated assets when available.
- Render short probes before full-resolution sequences.
- Cache approved generations and never regenerate them accidentally during a batch export.
- Use proxies for editorial work and relink to masters for delivery.
- Keep colors, frame rates, audio sample rates, and aspect ratios explicit across handoffs.
- Inspect the actual render, not just the editor preview.

## 9. Current capability sources

Use these sources only when current tool behavior matters; verify them again because product capabilities change:

- Hyperframes overview: https://hyperframes.app/
- Hyperframes agent installation page: https://hyperframes.heygen.com/
- Remotion documentation: https://www.remotion.dev/docs/
- Remotion Studio: https://www.remotion.dev/docs/studio
- Remotion asset handling: https://www.remotion.dev/docs/assets
- Remotion scaling: https://www.remotion.dev/docs/scaling
- Higgsfield product overview: https://higgsfield.ai/
- Higgsfield API/model explorer: https://open.higgsfield.ai/explore
- Adobe After Effects help: https://helpx.adobe.com/after-effects/
- CapCut tools and resources: https://www.capcut.com/tools/
