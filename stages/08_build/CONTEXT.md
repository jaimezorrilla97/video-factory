# Stage 08 — Build

Write the Remotion composition, preview it, render it.

## Inputs

- Layer 4 (working): `reels/<slug>/06_edit_plan/edit_plan.md` — the timecoded beat sheet this stage implements
- Layer 4 (working): `reels/<slug>/05_footage/cut/` — the approved A-roll
- Layer 4 (working): `reels/<slug>/07_assets/assets.md` and `motion-studio/public/higgsfield/` — the plates
- Layer 3 (skill): [remotion-markup](../../skills/remotion-markup/SKILL.md) — the main authoring guide. Read before writing composition code.
- Layer 3 (skill): [remotion-captions](../../skills/remotion-captions/SKILL.md), [remotion-studio](../../skills/remotion-studio/SKILL.md), [remotion-render](../../skills/remotion-render/SKILL.md), [remotion-interactivity](../../skills/remotion-interactivity/SKILL.md)
- Layer 3 (skill): [remotion-best-practices](../../skills/remotion-best-practices/SKILL.md) — the router, when unsure which applies
- Layer 3 (reference): [../../_config/broll-dna.md](../../_config/broll-dna.md) — motion signature (§5) and caption identity (§6) govern easing, timing, and caption style

## Process

Run every command from inside `motion-studio/`.

1. Create the composition at 1080x1920, 30 fps. The scaffold's `MyComp` is 1280x720, so set the size explicitly. Register it in `src/Root.tsx`.
2. Build the beat sheet in order. Drive everything from `useCurrentFrame()` and `interpolate()` — CSS `transition`, CSS `animation`, and Tailwind animation classes do not render.
3. Follow [remotion-interactivity](../../skills/remotion-interactivity/SKILL.md): `Interactive.*` elements, inline styles, inline `interpolate()`, named elements. It is what makes the composition editable in Studio instead of only in code.
4. Reference assets with `staticFile("higgsfield/<name>.<ext>")` — `<Img>` or `<CanvasImage>` for stills, `<Video>` from `@remotion/media` for clips. Install once with `npx remotion add @remotion/media`.
5. Preview: `npm run dev`. Check on a phone-size viewport, not just the desktop preview.
6. Validate before rendering: once with no audio for visual comprehension, once with no picture for spoken continuity. Confirm on-screen copy can be read once at normal speed, captions do not fight other text, and no placeholder or debug layer survives.

## Outputs

- Composition files → `motion-studio/src/reels/<slug>/`, registered in `src/Root.tsx`
- `out/<slug>.mp4` → rendered with `npx remotion render <CompositionId> out/<slug>.mp4`

**Only render when Jaime asks.** Rendering is slow and he usually wants to see Studio first.

## Gate

Jaime watches the render. Fixes loop back to this stage; a change of intent loops back to stage 06.
