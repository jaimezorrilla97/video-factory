# Stage 01 — Inspiration

Capture someone else's reel or video and work out *why it works*, so stage 02 can borrow the mechanics without copying the content.

Skip this stage when the idea is Jaime's own. Start at [02_script](../02_script/CONTEXT.md) instead.

## Inputs

- Layer 4 (working): the URL Jaime pasted, and any one-line context he gave with it
- Layer 3 (skill): [instagram-transcriber](../../skills/instagram-transcriber/SKILL.md) — for `instagram.com` and LinkedIn URLs
- Layer 3 (skill): [youtube-ingest](../../skills/youtube-ingest/SKILL.md) — for `youtube.com` / `youtu.be` URLs
- Layer 3 (reference): [../../_config/broll-dna.md](../../_config/broll-dna.md) — read §8 only, to know which visual mechanics are worth noting

## Process

1. Pick the skill by URL host. Do not try to "watch" the video by fetching page HTML — the transcript is not there.
2. Run the skill's script and write `transcript.md` verbatim. Never truncate or paraphrase it.
3. Write `teardown.md`: what makes this piece work, in the terms stage 02 and stage 03 need.
   - **Hook** — the first line and why it holds
   - **Structure** — the beats in order, with rough timings
   - **Message** — the single argument
   - **CTA** — how it closes
   - **Visual mechanics** — formats, animations, motion-graphic devices worth stealing. This is the half Jaime asks for most; be specific about *how* a thing was done, not that it looked good.
4. Propose **2–4 distinct angles** Jaime could take on the same idea with his own spin. Do not draft a script yet.

Report the file paths and a one-line summary. Do not paste the transcript into chat.

## Outputs

- `transcript.md` → `reels/<slug>/01_inspiration/`
- `teardown.md` → `reels/<slug>/01_inspiration/`

## Gate

Jaime picks one angle before stage 02 runs. He may edit `teardown.md` first; read the edited version.

## Known breakage

`yt-dlp` is installed but broken (`bad interpreter` — its Python 3.13 was removed), so **neither skill can download anything**. Fix with `brew install yt-dlp`. `youtube-ingest` additionally calls `./ingest.sh`, which does not exist in this project. `instagram-transcriber` needs `GROQ_API_KEY` in `.env`, which is not set. See [../../CLAUDE.md](../../CLAUDE.md#known-gaps-and-broken-pieces).

Until those are fixed, ask Jaime to paste the transcript and write `teardown.md` from that.
