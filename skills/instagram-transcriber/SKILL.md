---
name: instagram-transcriber
description: >
  Transcribe another creator's Instagram reel (or LinkedIn post) into a clean
  markdown file inside the Creator Analysis swipe file. Use this whenever Jaime
  sends an instagram.com URL — even if he doesn't say "transcribe" — to capture
  the creator's content for study. The output is a single .md per piece holding
  only three things: a content-based title/id, a short summary at the top, and
  the full literal transcript. Files land in
  "Creator Analysis/<creator-handle>/Instagram/" (or ".../LinkedIn/").

  Instagram has NO downloadable caption track, so this downloads the reel's
  audio via yt-dlp and transcribes it through the Groq API
  (whisper-large-v3-turbo). The creator's @handle and display name are pulled
  from yt-dlp metadata (no login needed for public reels).

  Trigger when Jaime says any of: "transcribe this reel", "add this creator",
  "save this to the swipe file", "grab this creator's reel", or simply pastes an
  instagram.com/reel/... or instagram.com/p/... URL with no other context. For
  a LinkedIn post URL, use the LinkedIn (manual-paste) path below.

  Do NOT trigger for YouTube URLs (use youtube-ingest). This skill is for
  studying OTHER creators — it is NOT for ingesting Jaime's own ideas into the
  drafts pipeline.
---

# Instagram Transcriber (Creator Analysis)

Captures **another creator's** content into the **Creator Analysis swipe file**
as a clean, minimal markdown file — one per reel/post. This is a study library,
**separate from Jaime's own `brainstorming → drafts → ready → posted` pipeline**
and **never** touched by the Google Sheet sync.

This skill produces **two kinds of files**:

1. **The transcript file** (one per reel/post, under `Instagram/` or `LinkedIn/`).
   It holds exactly three things, nothing else:
   - **A content-based title / `id`** — `<creator-handle>-<date>-<content-slug>`
     (handle first, then the date we captured it, then a short topic slug —
     e.g. `theliberationprotocol-2026-06-06-be-do-get-to-be-use-get`).
   - **A short summary** of the reel at the top (2–4 sentences).
   - **The full, literal transcript.**
2. **The creator profile** (`profile.md`, ONE per creator, at the creator root —
   `Creator Analysis/<handle>/profile.md`). Created the first time we add a
   creator. It is **about the creator** — who they are, niche, what they're known
   for — built from **independent research** (web search of their handle/name).
   **It must NOT summarize the reel.** The reel is just what brought us here; the
   profile is the person. Don't derive the profile from the transcript.

No "My Take", no pillars, no analysis, no draft scaffolding.

**This is Step 1 of a two-step pipeline.** This skill only captures the raw
material (the transcript). The deeper dissection — hook, format, content
structure, message, storytelling, CTA — is **Step 2**, handled by the separate
`creator-analysis` skill, which reads the transcript this skill produces and
writes an `<id>-analysis.md` alongside it. If Jaime asks to "analyze" / "dissect"
/ "break down" a creator (not just "transcribe"), do Step 1 then continue into
`creator-analysis`.

---

## Where files go

```
Creator Analysis/
└── <creator-handle>/          # the @handle, no "@" (e.g. dr.patricio.ochoa)
    ├── profile.md             # researched profile of the creator (NOT a reel summary)
    ├── broll-dna.md           # style + soul + Signature Devices (owned by reel-vision synthesis)
    ├── patterns/              # per-creator hooks/structures/storytelling/ctas
    └── Instagram/             # (or LinkedIn/)
        └── <N>. <Title> — <date>/   # one FOLDER per post
            └── transcript.md  # this skill writes THIS file
```

- One folder per creator (handle, lowercase, keep dots).
- Each post is its own **folder** named `<N>. <Title> — <date>` — N counts up from
  the last post in that platform folder; Title is a short content-derived title.
  This skill writes **`transcript.md`** inside it (siblings `visual.md` /
  `analysis.md` come from `reel-vision` / `creator-analysis`).
- `profile.md` lives at the **creator root** (spans all platforms).
- See `Creator Analysis/CLAUDE.md` for the full convention. Scaffold any missing
  folder on first capture.

---

## Transcript file format

```markdown
---
id: theliberationprotocol-2026-06-06-be-do-get-to-be-use-get
creator: theliberationprotocol
creator_name: Cypherian | Identity & Influence
platform: instagram                 # instagram | linkedin
source_url: https://www.instagram.com/reel/DVODjpHCEOV
created: 2026-06-06
length_sec: 216                     # omit for LinkedIn text posts
---

## Summary

2–4 sentences capturing what the piece is actually about and its core argument.
Written by Claude after reading the transcript — not a hook teaser, a real
summary so future-you can scan the library without replaying every reel.

## Transcript

The full, literal transcript exactly as transcribed. Do not paraphrase, trim,
or "clean up" the ideas — only fix obvious transcription artifacts if clearly
wrong. This is the ground truth.
```

The file is always **`transcript.md`** inside the post folder. The `id` frontmatter
field = the post folder name (`<N>. <Title> — <date>`).

**Naming the post folder:** `<N>. <Title> — <date>` — N is the next number after the
highest existing post in that platform folder; Title is a short, content-derived
Title-Case title (read the transcript, then title it for what it's about);
date is the capture date. Example: `3. AI Subliminal Learning — 2026-06-06`.

## Profile file format (`profile.md`, once per creator)

Created on the **first** capture for a creator, from independent research — NOT
from the reel. Never write a reel summary here.

```markdown
---
type: creator-profile
creator: theliberationprotocol
creator_name: Cypherian | Identity & Influence
niche:                              # what they're about, in a few words
platforms:                         # links you find via research
  instagram:
  tiktok:
  youtube:
followers_instagram:               # approximate, with the date
last_updated: 2026-06-06
---

# <Display name> (@<handle>)

_Researched profile — about the creator, independent of any single captured reel._

## Snapshot
[Who they are, audience size, what they post about.]

## Positioning & niche
[Their lane, angle, who they serve.]

## What they're known for
[Signature themes, notable results/growth, formats they lean on.]

## Why worth studying
[The transferable lessons for Jaime — hook style, clarity, CTA loop, etc.]

## Captured pieces
- [link to each transcript file as it's added]
```

---

## When to use

Trigger the first time Jaime drops a creator's Instagram link, unless he
explicitly says he just wants an inline summary (rare). The usual flow:

1. Jaime pastes a URL like `https://www.instagram.com/reel/...` / `.../p/...` (or a LinkedIn post URL).
2. He may add one line of context ("look at this creator's hook" / "save this one").
3. You transcribe + file it. **Don't** try to summarize from the URL alone — you can't watch the reel.

**Disambiguation:** this skill is for studying *other* creators (Creator
Analysis swipe file). It is NOT for turning Jaime's *own* ideas into drafts —
that path is unchanged and lives in the root `CLAUDE.md` pipeline.

---

## Pre-flight checks

1. **Confirm the URL + platform.**
   - `instagram.com` → Instagram path (audio transcription below).
   - `linkedin.com` → LinkedIn path (manual paste below).
   - YouTube → use `youtube-ingest` instead.
2. **Instagram deps:** `GROQ_API_KEY` in `.env`, plus `yt-dlp` + `ffmpeg` on PATH.
   - Missing key → get one at https://console.groq.com/keys.
   - Missing `yt-dlp`: `pip3 install --user yt-dlp`. Missing `ffmpeg`: `brew install ffmpeg`.
3. **Confirm the creator handle.** The script extracts it automatically; if it
   comes back empty (rare), ask Jaime for the handle.

---

## How to run — Instagram

From the project root, call the helper script (it does NOT write a file — it
prints metadata + transcript to stdout so you can compose the final doc):

```bash
./skills/instagram-transcriber/transcribe.sh "<instagram-url>"
```

It prints:

```
CREATOR_HANDLE: theliberationprotocol
CREATOR_NAME: Cypherian | Identity & Influence
SOURCE_URL: https://www.instagram.com/reel/DVODjpHCEOV
DURATION_SEC: 215.733
---TRANSCRIPT---
<full transcript text...>
```

Then **you (Claude)**:

1. Parse the header (handle, name, url, duration) and the transcript that follows `---TRANSCRIPT---`.
2. Read the transcript and write a **2–4 sentence summary** of the reel.
3. Pick the post folder name: `<N>. <Title> — <today>` (next N after the last post
   in that creator's `Instagram/`; Title content-derived).
4. Create `Creator Analysis/<handle>/Instagram/<N>. <Title> — <today>/` if needed.
5. Write `transcript.md` inside that folder using the transcript-file format above
   (round `DURATION_SEC` to a whole number for `length_sec`). Paste the **full**
   transcript verbatim — never truncate it.
6. **If this is a new creator** (no `Creator Analysis/<handle>/profile.md` yet):
   do a quick **web search** on the handle/display name and write `profile.md`
   using the profile format above. Research the *person*, not the reel — do not
   summarize the transcript here. (Add a "Captured pieces" link to this reel.)
   If a `profile.md` already exists, just append this reel to its "Captured pieces".

If the script **exits non-zero** (empty transcript after `---TRANSCRIPT---`),
the reel couldn't be downloaded — fall back to the manual path: tell Jaime the
reel isn't reachable and ask him to paste the caption/spoken content, then write
the file with what he provides.

---

## How to run — LinkedIn

LinkedIn posts are text (no audio to transcribe), and most aren't downloadable.
So this path is manual:

1. Ask Jaime to **paste the post text** (and confirm the creator's handle if it
   isn't obvious from the URL — the LinkedIn vanity slug, e.g. `in/janedoe` → `janedoe`).
2. Write the **summary** (2–4 sentences) from the pasted text.
3. Pick the post folder name: `<N>. <Title> — <today>` (next N in that creator's `LinkedIn/`).
4. Write `transcript.md` inside `Creator Analysis/<handle>/LinkedIn/<N>. <Title> — <today>/`
   — same format, with `platform: linkedin`, `source_url:` the post URL, and **omit
   `length_sec`**. Put the pasted post text under `## Transcript` verbatim.

(If a LinkedIn URL is actually a *video* post, you can try
`./skills/instagram-transcriber/transcribe.sh "<url>"` — yt-dlp supports some
LinkedIn videos — but expect manual paste to be the norm.)

---

## After it runs

1. **Verify the file** — summary present, transcript is clean prose, frontmatter complete.
2. **Confirm the title is meaningful** — the content-slug should describe the idea, not the URL.
3. **Report briefly:** the creator, the file path, and a one-line note of what
   the piece is about. **Do NOT paste the full transcript into chat** — it's long;
   reference the file path.

---

## Edge cases & gotchas

- **Instagram blocks anonymous downloads inconsistently.** Some public reels
  return `Instagram API is not granting access` / empty media. The script exits
  non-zero with an empty transcript → fall back to manual paste.
- **Login-walled / private reels** won't download (no cookie auth wired in by
  design — public-only). If Jaime needs these, `yt-dlp --cookies-from-browser`
  is a small addition.
- **Transient Groq timeout** (`curl (56) Recv failure`): retry flags usually
  absorb it; if it still fails, just re-run — it's network, not content.
- **Image-only posts** (no audio) produce an empty/garbage transcript. If empty,
  tell Jaime there's nothing to transcribe.
- **Re-capturing the same reel:** write a new file only if it's a different
  piece; don't overwrite an existing transcript.
- **Cost:** negligible. Groq `whisper-large-v3-turbo` is ~$0.04/hr of audio;
  a reel rounds to a fraction of a cent.

---

## What NOT to do

- Don't write into `brainstorming/`, `drafts/`, `ready/`, or `posted/` — this is
  the Creator Analysis library, a separate study folder.
- Don't add "My Take", pillars, intent, or any pipeline frontmatter — the
  transcript file holds only id + summary + transcript.
- Don't put a reel summary in `profile.md`, and don't build the profile from the
  transcript — the profile is researched, about the creator across all platforms.
- Don't truncate the transcript — paste the full thing verbatim.
- Don't run the Sheet sync — Creator Analysis is filesystem-only, never synced.
- Don't run this on YouTube URLs — use `youtube-ingest`.
- Don't "watch" the reel by fetching page HTML — the transcript isn't there.
- Don't paste the full transcript into your reply — reference the file path.
- Don't add cookie/login handling unless Jaime explicitly asks (public-only is deliberate).
