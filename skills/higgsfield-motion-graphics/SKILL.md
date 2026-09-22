---
name: higgsfield-motion-graphics
description: >
  Generate image, video, and audio assets with the Higgsfield REST API (pay-per-use
  API credits from the project .env, NOT the web-app subscription) and drop them into
  the Remotion project for Jaime's motion graphics. Use whenever Jaime asks to
  generate a background, texture, still, b-roll clip, or other asset for a motion
  graphic, reel, or Remotion composition, or says "use Higgsfield", "generate with
  the API", or "make the visuals for this motion graphic". Handles credential
  check, cost estimate and spend guard, submit and poll, download into
  motion-studio/public/higgsfield/, and wiring into a composition. Remotion builds
  the text, charts, and timing; Higgsfield only supplies generated plates.
---

# Higgsfield Motion Graphics (API)

Motion graphics in this project are built in **Remotion** (`motion-studio/`). This skill is how we get generated assets from **Higgsfield** into it, billing the **API balance** instead of the Higgsfield subscription credits.

**Use this skill, not the global `higgsfield-*` skills or the `higgsfield` CLI.** Those go through the CLI, which only supports browser login and spends the subscription credits on the logged-in Higgsfield account. Use the CLI only if Jaime explicitly asks for it (for example, to use a model the API does not have).

Everything runs through one script: [scripts/hf-api.mjs](scripts/hf-api.mjs) (Node 18+, no dependencies). Endpoints, prices, and parameters are in [references/api.md](references/api.md). The commands below assume the project root as the working directory; the script finds `.env` and the output folder from its own location, but relative `--param` file paths and `--out` resolve from where you run it.

## 1. Preflight (every session)

```bash
node skills/higgsfield-motion-graphics/scripts/hf-api.mjs check
```

- It reads the key from the project `.env` (`HF_API_KEY_ID` + `HF_API_KEY_SECRET`, or `HF_CREDENTIALS=id:secret`; other accepted names are listed by the script's error message) and asks the API to verify it. No cost.
- If the key is missing, tell Jaime to save it in `.env` and stop. Never ask Jaime to paste the key into chat.
- **Never** `cat`, print, echo, log, or commit `.env` or the key. The script redacts it from its own output; keep it that way.
- `check` cannot show the balance (the API has no documented balance endpoint). Jaime reads the balance in the Higgsfield console. A `403` on a generation means the balance is empty.

## 2. Decide what to generate (and what NOT to)

| Build in Remotion (code) | Generate with Higgsfield |
| --- | --- |
| All text, numbers, captions, labels | Background plates and textures, with empty space left for the text |
| Charts, counters, progress bars, lower thirds | Illustrated or 3D-looking hero objects, metaphor stills |
| Logo, shapes, masks, transitions, timing | Short b-roll or background loops |
| Anything that must stay editable or pixel-crisp | Music beds or sound effects, when a suitable endpoint exists |

Rules that follow from this:

- **No baked-in text.** Prompt for "no text, no letters, no logos, no watermark" and add live text in Remotion. Generated type is blurry and misspelled, and cannot be edited.
- **Match the frame.** For reels and TikToks the composition is 1080x1920 at 30 fps and the asset should be `9:16`. The scaffold's `MyComp` is 1280x720, so set the size on any new composition.
- **Resolution.** Seedance 2.5 tops out at 720p and Soul 2 at 1080p. That is fine for background plates. Keep the sharp foreground (type, shapes) in Remotion.
- **No transparency.** API outputs are opaque. Design layers as full-frame plates, or use masks and blend modes in Remotion. Do not promise cut-outs.
- **Style.** Every prompt starts from [../../_config/style-string.md](../../_config/style-string.md) (paste-ready string plus standard negative) and follows [../../_config/broll-dna.md](../../_config/broll-dna.md) for the look. Drop or adapt the parts that clash with a pure graphic look, and say which you changed.
- Clips are for **motion**, stills are for everything else. A still plus Remotion animation (zoom, parallax, wipe) is far cheaper than a clip (a $0.035 Recraft still versus about $0.21 for a 5 s Kling clip, or about $0.72 to $1.60 for 5 s of Seedance 2.5) and usually reads better for graphics.

## 3. Pick a model

Prices are list prices per image or per second (see [references/api.md](references/api.md) for all endpoints).

| Need | Endpoint | Price |
| --- | --- | --- |
| Cheap photoreal or textured still | `higgsfield-ai/soul/v2/standard` | $0.0032/img |
| Graphic, illustration, clean-shape still | `recraft/v4.1/text-to-image` | $0.035/img |
| Still that must contain readable type (rare) | `ideogram/v4.0` | $0.03/img |
| Fast draft while exploring a look | `z-image/turbo` | $0.015/img |
| Cheapest video loop | `alibaba/wan-3.0/text-to-video` | $0.03/s |
| Good-quality video, low cost | `kling-video/v3.0/std/text-to-video` | $0.042/s |
| Best motion and audio (720p max) | `bytedance/seedance-2.5/text-to-video` | $0.144 to $0.32/s |
| Animate an existing still | `bytedance/seedance-2.5/image-to-video` | price not listed |

Run `node .../hf-api.mjs models` for the full priced list. **Before the first call to an endpoint you have not used, read its parameters** on `https://open.higgsfield.ai/models/<endpoint>/playground` (WebFetch) instead of guessing; only Soul 2 and Seedance 2.5 are documented in the reference file.

## 4. Workflow

1. **Plan the asset list** from the composition or storyboard: one line per asset (what, still or clip, aspect ratio, duration, where it goes). Prefer stills. If a `reel-visual-board` or `reel-broll-director` plan exists, take prompts from it.
2. **Dry run** each new kind of call. It prints the request and the cost estimate and spends nothing:
   ```bash
   node skills/higgsfield-motion-graphics/scripts/hf-api.mjs run higgsfield-ai/soul/v2/standard \
     --prompt "<style string> + the scene, no text, empty upper third" \
     --param aspect_ratio=9:16 --param resolution=1080p --name hook-bg --dry-run
   ```
3. **State the cost** to Jaime in one line before spending. Tell him first and wait for a yes when the total is above **$0.50**, when you are generating more than 4 assets in one go, or when the price is unknown. The script enforces a **$1.00 per-call guard** and refuses above it; raise it with `--max-usd` only after Jaime agrees.
4. **Generate** (same command without `--dry-run`). The script uploads local files passed as `--param image_url=./ref.png`, submits, polls, and saves to `motion-studio/public/higgsfield/<name>.<ext>`. It also appends the prompt, endpoint, request id, and cost estimate to `motion-studio/public/higgsfield/manifest.jsonl`.
5. **Look at every result** before using it. View stills with the Read tool. For clips, pull a frame first: `ffmpeg -i clip.mp4 -vf "select=eq(n\,30)" -frames:v 1 frame.png`. Regenerate only if it is clearly wrong, and say what you changed in the prompt.
6. **Wire it into the composition** (below), then render a still to check the layout: `cd motion-studio && npx remotion still <CompositionId> out/check.png`.
7. **Report**: files created, endpoints, actual count of generations, and the estimated total in USD. Mention that Jaime can see the exact charge in the console.

Long requests: the script waits up to 15 minutes (`--timeout`). If it times out or is interrupted, the request keeps running; resume with `node .../hf-api.mjs status <request_id> --download`. Do not resubmit, or you pay twice.

## 5. Wiring assets into Remotion

Files in `motion-studio/public/` are referenced with `staticFile()`. Stills use the image component (`<Img>`; see [remotion-markup/images.md](../remotion-markup/images.md)). Clips use `<Video>` from `@remotion/media`, which is **not installed yet**. Install it once, the first time a clip is needed:

```bash
cd motion-studio && npx remotion add @remotion/media
```

```tsx
import { AbsoluteFill, Img, staticFile } from "remotion";
import { Video } from "@remotion/media";

<AbsoluteFill>
  <Img src={staticFile("higgsfield/hook-bg.png")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
  {/* or a clip: <Video src={staticFile("higgsfield/loop.mp4")} objectFit="cover" /> */}
  {/* live text, charts, and shapes go on top, in code */}
</AbsoluteFill>
```

For trimming, volume, speed, and looping of clips see [remotion-markup/embedding-videos.md](../remotion-markup/embedding-videos.md). For motion on stills (zoom, parallax) and transitions between plates see [remotion-markup/transitions.md](../remotion-markup/transitions.md) and [remotion-markup/sequencing.md](../remotion-markup/sequencing.md). Read [remotion-create](../remotion-create/SKILL.md) before making a new composition.

When generating clips for background use, pass `generate_audio=false` if the endpoint has that parameter; Remotion handles the audio.

## 6. When something goes wrong

| Symptom | Meaning and fix |
| --- | --- |
| `401 Invalid credentials` | Wrong or unsaved key in `.env`. Ask Jaime to check it. |
| `403 Insufficient credits` | API balance is empty. Jaime tops up in the console. |
| `422 Validation failed` | Parameter name or value is wrong for this endpoint. Read its playground page. |
| `423` / `503` | Model blocked or unavailable. Try again later or use another endpoint. |
| Ended as `nsfw` or `failed` | Not charged. Soften or rewrite the prompt, then retry once. |
| Timed out | Still running. Use `status <id> --download`. |
| Output looks off-style | Re-read `style-string.md`, tighten the negative prompt, and change one thing at a time. |

## Limits of this skill

- The 2026-09-21 build was tested against a local mock of the API and against the real API with a wrong key (which correctly returned `401`). It had not yet been run with a real key. If the first real generation behaves differently from [references/api.md](references/api.md), fix the script or the reference and note it there.
- Prices in the script are list prices and may lag the console. The console is the source of truth for charges.
