# Cutting Grammar

## Table of contents

1. Pacing profiles
2. Silence decisions
3. Corrections and repeated takes
4. Fillers, breaths, and micro-pauses
5. Visual and audio cut points
6. Quality-control checklist
7. Cut manifest example

## 1. Pacing profiles

Choose a profile from the content, platform, and user request. Thresholds are starting points, not automatic rules.

| Profile | Typical use | Preserve | Usually tighten |
|---|---|---|---|
| Conversational | Founder story, opinion, personal update | breaths, emotion, short thought pauses | dead starts, redundant clauses, long searches |
| Energetic | Reels, Shorts, strong hook | decisive delivery, purposeful emphasis | weak lead-ins, setup latency, most empty pauses |
| Educational | Tutorials, explainers, demos | comprehension pauses, definitions | repeated instructions, navigation delays, failed demonstrations |
| Reflective | Personal or emotional story | silence that carries feeling | technical resets, obvious errors, unrelated detours |
| Interview | Dialogue and testimonials | reaction timing, turn-taking | interviewer setup, duplicated answers, production chatter |

Use silence candidates roughly as follows, then listen in context:

- under 180 ms: usually speech rhythm; do not touch automatically
- 180–450 ms: often useful articulation or emphasis
- 450–900 ms: inspect semantically; shorten only if energy drags
- over 900 ms: likely trim candidate unless reflective, instructional, or turn-taking context justifies it
- multi-second silence: normally remove or compress, while retaining room tone and a believable pause

## 2. Silence decisions

Distinguish:

- breath pause: supports delivery; usually keep
- thought pause: supports comprehension or emotion; keep or shorten
- search pause: speaker is looking for wording; shorten or remove if the sentence can join naturally
- production pause: waiting for direction, checking notes, resetting equipment; remove
- transition pause: may help a section change; preserve a shortened beat
- interruption gap: remove with surrounding repair or flag for coverage

Never use a single dB threshold across different microphones, noise floors, or speakers without checking results.

## 3. Corrections and repeated takes

Common correction patterns include:

- incomplete phrase followed by a fresh start
- “sorry,” “let me say that again,” “I mean,” or “rather” followed by a replacement
- repeated opening words until a clean sentence begins
- factual statement immediately corrected by a new value or name
- clap, snap, or deliberate pause used as an edit marker

Keep the correct complete take. If the correction itself is charming, transparent, or important to credibility, consider keeping it. Never join fragments that change scope, causality, certainty, or attribution.

## 4. Fillers, breaths, and micro-pauses

Remove a filler only if all are true:

1. It adds no meaning or personality.
2. The sentence remains grammatical.
3. The audio join does not click, pump, or truncate a phoneme.
4. The visual jump is acceptable or covered.
5. The result does not sound unnaturally accelerated.

Do not remove every “um,” “like,” repetition, or breath. Over-cleaning makes a founder sound synthetic and can reduce trust.

## 5. Visual and audio cut points

Favor pauses between clauses, closed-mouth frames, blinks, head turns, the end of a gesture, camera or body movement, and stable room tone.

Avoid visible position teleportation, jump cuts too short to parse, chopped phonemes, untreated exposure changes, and cutting every sentence at an identical rhythm.

Retain handles of at least several frames; retain more for noisy audio, crossfades, or uncertain joins.

## 6. Quality-control checklist

- Meaning and factual qualifiers remain intact.
- The strongest take was selected.
- The first useful line arrives quickly.
- No accidental repeated phrase remains.
- No clipped phoneme, click, or abrupt noise-floor change is audible.
- Room tone remains believable.
- Gestures and eye lines do not jump distractingly.
- Pauses vary with thought and emotion.
- The ending lands cleanly without empty tail.
- Source and output sync remain stable.
- Export frame rate, resolution, color, and audio loudness match the target.

## 7. Cut manifest example

```json
{
  "source": "A001.mp4",
  "source_in": "00:01:12.480",
  "source_out": "00:01:16.920",
  "action": "drop_error",
  "reason": "False start followed by a complete corrected take",
  "confidence": "high",
  "coverage": "Punch in on the retained take if the position jump is visible"
}
```
