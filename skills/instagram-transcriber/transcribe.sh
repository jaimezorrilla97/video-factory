#!/usr/bin/env bash
# transcribe.sh — Fetch an Instagram reel's creator metadata + full audio
# transcript for the Creator Analysis swipe file.
#
# This does NOT write a markdown file. It prints a structured block to stdout
# that the `instagram-transcriber` skill parses, then Claude composes the final
# transcript .md (content-based title + summary) in one pass.
#
# Usage:
#   ./transcribe.sh "<instagram-url>"
#
# Output on success (stdout):
#   CREATOR_HANDLE: theliberationprotocol
#   CREATOR_NAME: Cypherian | Identity & Influence
#   SOURCE_URL: https://www.instagram.com/reel/XXXX
#   DURATION_SEC: 60
#   ---TRANSCRIPT---
#   <full literal transcript text>
#
# On a transcription failure (private/login-walled reel, no GROQ_API_KEY, etc.)
# it still prints whatever metadata it could fetch, prints an empty transcript,
# and exits non-zero so the skill falls back to the manual-paste flow.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# Augment PATH for tools commonly installed via `pip install --user` (yt-dlp)
# and Homebrew (ffmpeg). Mirrors ingest.sh so the skill behaves identically.
for d in \
  "$HOME/Library/Python/3.13/bin" \
  "$HOME/Library/Python/3.12/bin" \
  "$HOME/Library/Python/3.11/bin" \
  "$HOME/.local/bin" \
  "/opt/homebrew/bin"; do
  if [[ -d "$d" && ":$PATH:" != *":$d:"* ]]; then
    PATH="$d:$PATH"
  fi
done
export PATH

# Load local secrets (.env) so GROQ_API_KEY is available for transcription.
if [[ -f "$PROJECT_ROOT/.env" ]]; then
  set -a
  # shellcheck disable=SC1091
  source "$PROJECT_ROOT/.env"
  set +a
fi

URL="${1:-}"
if [[ -z "$URL" ]]; then
  echo "Usage: transcribe.sh <instagram-url>" >&2
  exit 2
fi

if ! command -v yt-dlp >/dev/null 2>&1; then
  echo "Error: 'yt-dlp' not installed. Install with: pip3 install --user yt-dlp" >&2
  exit 2
fi

# --- 1) Creator metadata (best-effort, no download) --------------------------
# %(channel)s   → the @handle/username (e.g. theliberationprotocol)
# %(uploader)s  → the display name (e.g. "Cypherian | Identity & Influence")
# %(duration)s  → length in seconds
# Single --print line with a delimiter keeps parsing trivial. yt-dlp emits "NA"
# for missing fields; we clean those up below.
HANDLE="" ; NAME="" ; DURATION=""
if META="$(yt-dlp --no-warnings --skip-download \
    --print "%(channel)s|||%(uploader)s|||%(duration)s|||%(title)s" \
    "$URL" 2>/dev/null | head -1)"; then
  HANDLE="${META%%|||*}"
  rest="${META#*|||}"
  NAME="${rest%%|||*}"
  rest="${rest#*|||}"
  DURATION="${rest%%|||*}"
  TITLE="${rest#*|||}"
  # Fallbacks: Instagram's title is usually "Video by <handle>" — mine it if the
  # channel field came back empty/NA.
  if [[ -z "$HANDLE" || "$HANDLE" == "NA" ]]; then
    if [[ "$TITLE" =~ ^Video\ by\ (.+)$ ]]; then
      HANDLE="${BASH_REMATCH[1]}"
    fi
  fi
fi
[[ "$HANDLE" == "NA" ]] && HANDLE=""
[[ "$NAME" == "NA" ]] && NAME=""
[[ "$DURATION" == "NA" ]] && DURATION=""

emit_header() {
  echo "CREATOR_HANDLE: ${HANDLE}"
  echo "CREATOR_NAME: ${NAME}"
  echo "SOURCE_URL: ${URL}"
  echo "DURATION_SEC: ${DURATION}"
}

# --- 2) Download audio + transcribe via Groq ---------------------------------
TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

transcribe() {
  if [[ -z "${GROQ_API_KEY:-}" ]]; then
    echo "Error: GROQ_API_KEY not set in .env — cannot transcribe reel audio." >&2
    return 1
  fi

  echo "Downloading reel audio..." >&2
  if ! yt-dlp \
    -f "bestaudio/best" \
    -x --audio-format mp3 --audio-quality 5 \
    -o "${TMP_DIR}/audio.%(ext)s" \
    "$URL" >&2; then
    echo "Error: yt-dlp could not download audio (private/login-walled reel?)." >&2
    return 1
  fi

  local audio
  audio="$(find "$TMP_DIR" -name "audio.mp3" -print -quit 2>/dev/null || true)"
  if [[ -z "$audio" || ! -s "$audio" ]]; then
    echo "Error: no audio file produced by yt-dlp." >&2
    return 1
  fi

  echo "Transcribing with Groq whisper-large-v3-turbo..." >&2
  local resp
  if ! resp="$(curl -sS --fail-with-body \
    --connect-timeout 20 --max-time 180 \
    --retry 3 --retry-delay 2 --retry-all-errors \
    https://api.groq.com/openai/v1/audio/transcriptions \
    -H "Authorization: Bearer ${GROQ_API_KEY}" \
    -F "file=@${audio}" \
    -F "model=whisper-large-v3-turbo" \
    -F "response_format=text" 2>&1)"; then
    echo "Error: Groq API request failed: ${resp}" >&2
    return 1
  fi

  printf '%s' "$resp"
}

if TRANSCRIPT="$(transcribe)" && [[ -n "$TRANSCRIPT" ]]; then
  emit_header
  echo "---TRANSCRIPT---"
  printf '%s\n' "$TRANSCRIPT"
  exit 0
else
  # Degrade gracefully: still hand back the metadata so the skill can scaffold
  # the file and let Jaime paste the transcript manually.
  emit_header
  echo "---TRANSCRIPT---"
  exit 1
fi
