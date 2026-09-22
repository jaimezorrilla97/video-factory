# Higgsfield API reference

Facts about the Higgsfield REST API that `scripts/hf-api.mjs` relies on. Checked 2026-09-21 against [docs.higgsfield.ai](https://docs.higgsfield.ai/docs/llms.txt) and [open.higgsfield.ai/explore](https://open.higgsfield.ai/explore). Prices and models change; when in doubt, trust the live docs and the console over this file.

## Basics

- Base URL: `https://api.higgsfield.ai`. Server-side use only (never from browser code).
- Auth header: `Authorization: Key <KEY_ID>:<KEY_SECRET>`. Keys are created in the Higgsfield console (linked from the docs). A wrong key returns `401 {"detail": "Invalid credentials"}`.
- Credentials in `.env`: `HF_API_KEY_ID` + `HF_API_KEY_SECRET` (official). The script also accepts `HF_CREDENTIALS` / `HF_KEY` (`id:secret`) and `HF_API_KEY` + `HF_API_SECRET`.
- One endpoint per model and workflow: `POST /<vendor>/<model>/<workflow>`, JSON body.
- Test-only override: `HF_API_BASE` changes the base URL (used to test the script against a mock).

## Request lifecycle

1. `POST /<endpoint>` returns `{"status":"queued","request_id":"...","status_url":"...","cancel_url":"..."}`.
2. Poll `GET /requests/{request_id}/status` until a terminal status.
3. Download the outputs. URLs stay valid for **at least 7 days**, so download right away and never reference remote URLs from a composition.

| Status | Terminal | Charged | Notes |
| --- | --- | --- | --- |
| `queued`, `in_progress` | no | | Cancel only works while every job is still `queued`. |
| `completed` | yes | yes | Output in `images[].url`, `video.url`, or `audio.url` / `audios[].url`. |
| `failed` | yes | no | `error` field has the reason. |
| `nsfw` | yes | no | Blocked by moderation; rewrite the prompt. |
| `canceled` | yes | refunded | `POST /requests/{id}/cancel` returns `202` with an empty body. |

## Errors

| HTTP | Meaning | What to do |
| --- | --- | --- |
| 400 | Bad parameters, or the concurrency limit | Fix parameters or wait for running jobs. |
| 401 | Invalid credentials | Fix `.env`. Do not retry. |
| 403 | Insufficient credits | Top up the API balance in the console. |
| 404 | Endpoint or request not found | Check the path. |
| 422 | Validation failed (`detail` may be a list) | Check parameter names and values on the model's page. |
| 423 | Model temporarily blocked | Try later or another model. |
| 5xx | Server error | The script retries status polls with backoff. It never retries a `POST` (no idempotency key, so a retry could bill twice). |

Include the `X-Correlation-ID` response header when contacting support.

## Uploading input media

For image-to-video, references and similar, inputs must be public URLs. To use a local file:

1. `POST /files/generate-upload-url` with `{"content_type": "image/png"}` returns `upload_url`, `public_url`, `upload_headers`.
2. `PUT` the file bytes to `upload_url` with `upload_headers`. **Do not send API credentials to this URL.**
3. Pass `public_url` as the model's `image_url` / `video_url` / `audio_url`.

Formats: JPEG, PNG, WebP, GIF, WAV, MP4. The upload URL expires after 1 hour. The script does all of this when a `--param` value is a local path (`./x.png`, `/abs/x.png`, `~/x.png`).

## Billing

- Pay-per-generation with **prepaid credits that are separate from the higgsfield.ai web-app subscription** (per [higgsfield.ai/higgsfield-api](https://higgsfield.ai/higgsfield-api)). Credits expire one year after they are added. Manual top-up and auto top-up are in the console.
- Only `completed` requests are charged.
- There is **no documented balance endpoint** in the public docs. Read the balance and spend in the console. `hf-api.mjs check` verifies the key but cannot show a balance.
- Docs mention a cost-estimate endpoint but do not document its path, so the script estimates from the list prices below instead.

## Model catalog (list prices, USD)

Video, priced per second of output:

| Endpoint | Price/s | Notes |
| --- | --- | --- |
| `/bytedance/seedance-2.5/text-to-video` | 0.144 to 0.3236 | 4-30 s, 480p or 720p only. Price rises with resolution and duration. `/bytedance/seedance-2.5/image-to-video` also exists (price not listed). |
| `/bytedance/seedance-2.0/text-to-video` | 0.0985 | |
| `/kling-video/v3.0/std/text-to-video` | 0.042 | Cheapest good-quality option. |
| `/alibaba/wan-3.0/text-to-video` | 0.03 | Cheapest. |
| `/alibaba/wan-3.0-prime/text-to-video` | 0.0476 | |
| `/minimax/h3/text-to-video` | 0.0715 | |
| `/alibaba/happy-horse/v1.1/text-to-video`, `/alibaba/happy-horse/text-to-video` | 0.077 | |
| `/lightricks/ltx-2.5/text-to-video/fast`, `.../pro` | 0.09, 0.12 | |
| `/wan/v2.7/text-to-video` | 0.10 | |
| `/xai/grok-imagine-video/v1.5/reference-to-video` | 0.08 | |
| `/higgsfield/cinema-studio/4.0` | 0.2057 | |
| Genjutsu motion transfer | 0.159 | Listed under a path that looks misspelled (`/higgsfiled/...`); confirm on its model page before use. |

Also documented in the OpenAPI spec, price not listed: `/kling-video/v2.5-turbo/{pro,standard}/{text,image}-to-video`, `/minimax/hailuo-2.3/standard/{text,image}-to-video`.

Images, priced per image:

| Endpoint | Price/img | Good for |
| --- | --- | --- |
| `/higgsfield-ai/soul/v2/standard` | 0.0032 | Cheap photoreal stills and textures. |
| `/z-image/turbo` | 0.015 | Fast drafts. |
| `/ideogram/v4.0` | 0.03 | Images that must contain readable type. |
| `/recraft/v4.1/text-to-image` | 0.035 | Graphic and illustration looks, clean shapes. |
| `/alibaba/qwen-image-3/text-to-image` | 0.04 | |
| `/xai/grok-imagine-image-2.0` | 0.04 | Editing and refinement. |
| `/marketing-studio/image` | 0.0121 | Campaign graphics. |
| `/workflows/product-shots`, `/workflows/graphic-ads`, `/workflows/marketplace-design` | 0.0121 | Workflows. |
| `/higgsfield-ai/soul/standard` | 0.0938 | Older Soul; pricey next to Soul 2. |

The API catalog is not the same list as the CLI's. It has no GPT Image 2.5 or Nano Banana, and model names and paths differ (CLI `seedance_2_5` is API `/bytedance/seedance-2.5/text-to-video`). Do not assume a CLI model name works here.

## Known request parameters

Only these are confirmed. For any other endpoint, open `https://open.higgsfield.ai/models/<endpoint>/playground` (or the docs page under `docs.higgsfield.ai/docs/models/`) and read the parameters before the first call. Guessing wastes credits on `422`s.

**`/higgsfield-ai/soul/v2/standard`**: `prompt` (required); `aspect_ratio` (`9:16` `16:9` `4:3` `3:4` `1:1` `2:3` `3:2`, default `4:3`); `resolution` (`720p` default, `1080p`); `batch_size` (`1` default, `4`); `enhance_prompt` (bool, default true); `style_id`; `seed` (1 to 1000000).

**`/bytedance/seedance-2.5/text-to-video`**: `prompt`; `duration` (4-30, seconds); `resolution` (`480p` or `720p`); `aspect_ratio` (e.g. `9:16`); `bitrate_mode` (e.g. `high`); `output_format` (`mp4`); `generate_audio` (bool). Image-to-video takes `image_url` and has no `aspect_ratio` (framing comes from the image).

**`/kling-video/v2.5-turbo/*/text-to-video`**: `prompt`, `duration`, `cfg_scale`, `negative_prompt`. Image-to-video adds required `image_url`.

**`/minimax/hailuo-2.3/standard/*`**: `prompt`, `duration`, `prompt_optimizer`; image-to-video adds required `image_url`.

**`/higgsfield-ai/soul/standard`**: `prompt`, `num_images`, `resolution`, `aspect_ratio`.

## Official SDKs (not used here)

`npm i @higgsfield/client` (env `HF_CREDENTIALS`) and `pip install higgsfield-client` (env `HF_KEY`). The helper script talks to the REST API directly so the project needs no extra dependency.
