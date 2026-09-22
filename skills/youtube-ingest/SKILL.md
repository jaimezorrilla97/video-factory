---
name: youtube-ingest
description: >
  Ingest a YouTube video into brainstorming/ as a clean, draftable markdown
  file. Use this whenever Jaime sends a YouTube URL — even if he doesn't say
  "ingest" — and the implicit ask is to capture the video's ideas as a
  brainstorming entry. Pulls auto-captions via yt-dlp, strips VTT timing and
  duplicate phrasing, writes a markdown file with frontmatter and an empty
  "My Take" section. Always proposes a target platform (linkedin or
  instagram); defaults to linkedin if Jaime hasn't signaled which one.

  Trigger when Jaime says any of: "transcribe this", "ingest this video",
  "pull this YouTube link", "save this video to brainstorming", "make a draft
  from this video", or simply pastes a youtube.com / youtu.be URL with no
  other context.

  Do NOT trigger for non-YouTube URLs (Instagram, Twitter, blog posts) —
  ingest.sh has a different code path for those, and only YouTube reliably
  returns auto-captions.
---

# YouTube Ingest

Drops a YouTube video into `brainstorming/{platform}/` as a clean markdown
file ready to be turned into a draft. The transcript is post-processed so
there's no VTT timing junk, no duplicated phrases (auto-captions repeat
across overlapping cues), and no inline `<...>` tags — just spoken prose.

This is a thin wrapper around `./ingest.sh`. The script does the real work;
this skill exists so future-you (or a fresh Claude session) knows when and how
to invoke it without re-discovering the gotchas.

---

## When to use

Trigger this skill the first time Jaime drops a YouTube link in a message,
unless he explicitly says he just wants you to summarize it inline (rare).
The usual flow:

1. Jaime pastes a URL like `https://www.youtube.com/watch?v=...` or `https://youtu.be/...`.
2. He says something like "create a script from this" / "this gave me an idea" / "transcribe this" — or sometimes just sends the URL with one line of context.
3. You ingest first, *then* draft. Don't try to draft from the YouTube URL alone — Claude can't watch the video.

---

## Pre-flight checks

1. **Confirm it's a YouTube URL.** Match `youtube.com` or `youtu.be`. If it's an Instagram / Twitter / blog URL, fall back to `./ingest.sh <url>` directly (which scaffolds a manual-paste file) or ask Jaime to paste the caption.
2. **Decide target platform.** Default `linkedin`. If Jaime mentions reels, IG, "for instagram", "in Spanish for IG", or anything reel-shaped, use `instagram`. If he says nothing about platform, ask one short question: *"LinkedIn or Instagram?"*
3. **Verify yt-dlp is on PATH.** `ingest.sh` augments PATH for common Python user-install dirs; if it still fails, point Jaime at: `pip3 install --user yt-dlp`.

---

## How to invoke

From the project root, with the platform you decided on as the second arg:

```bash
./ingest.sh "<youtube-url>" instagram
# or
./ingest.sh "<youtube-url>" linkedin
```

The script:
- Downloads auto-captions (English first, then Spanish) — does NOT download the video.
- Strips VTT cue timing, headers, inline tags, dedupes overlapping cue phrases.
- Writes `brainstorming/{platform}/YYYY-MM-DD-HHMMSS-<slug>.md` with frontmatter, source link, transcript, and empty `## My Take` / `## Notes` sections.
- Returns the path of the file it created on stdout.

---

## After it runs

1. **Read the file** and verify the transcript is clean prose. If it looks like garbage (rare — usually means the video has no auto-captions, or yt-dlp got rate-limited), tell Jaime and fall back to manual paste of caption / video summary.
2. **Optionally rename the file.** The default filename uses the URL slug, which is ugly. If you can already tell what the video is about, rename to something semantic:
   ```bash
   mv brainstorming/instagram/2026-04-30-163402-www-youtube-com-watch-v-mkn-ss2nl10.md \
      brainstorming/instagram/2026-04-30-folders-as-architecture.md
   ```
   Update the `id:` field in the frontmatter to match the new filename stem.
3. **Surface 2–4 distinct angles** drawn from the transcript that map to Jaime's pillars (`content-strategy.md`). Don't just summarize — propose specific reel/post ideas with pillar + content type tags. Let Jaime pick which to develop.
4. **Don't draft yet.** Wait for Jaime to say which angle to develop into a script. Then jump into the standard draft flow (read `me.md`, `content-strategy.md`, etc., per the root `CLAUDE.md`).

---

## Edge cases

- **No captions available:** yt-dlp returns nothing. The script falls back to a "manual paste" scaffold. Tell Jaime there's no transcript and ask him to summarize the video or paste key quotes.
- **Wrong language:** The script asks yt-dlp for English subs, then Spanish. If it's a French/Portuguese video, captions may not match — read the file, and if the transcript is empty, re-run with explicit subs (edit the `--sub-lang` line in `ingest.sh` only as a last resort).
- **Very long video (1+ hour):** Transcript can hit ~30K+ words. Don't paste the whole thing into your context — read with `Read` and `limit:` if you only need the first portion to identify ideas.
- **Rate-limited:** yt-dlp may get rate-limited by YouTube. Wait a minute and retry. If persistent, ask Jaime to paste a transcript he generated himself (via `youtube-transcript` extensions, etc.).

---

## What NOT to do

- Don't try to "watch" the video by fetching the page HTML — the transcript isn't there.
- Don't drop the file directly into `drafts/` — it always lands in `brainstorming/` first. Drafting is a separate step that consumes the brainstorming file.
- Don't run this on Instagram or other URLs — `ingest.sh` has different behavior for those, and YouTube is the only platform with reliable auto-caption fetching.
- Don't include the transcript in your reply to Jaime — it's long. Reference the file path and mention key ideas only.
