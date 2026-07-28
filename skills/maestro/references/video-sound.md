# Video Sound

*Sound is a timeline-level asset, not a shot-level one: one central pin table, authored after the picture locks, cut to the beat when there's a beat. Engine-neutral — the discipline is the same for HyperFrames, Remotion, and shotcraft; only the playback primitive differs.*

## The order is the rule

**Picture structure locks → lay BGM for the energy skeleton → pin SFX beat by beat.** Not negotiable, and the most expensive lesson in the source material: one reference film re-pinned its entire SFX table three times, and two of those were pure downstream cost of the picture not being locked (a total-length change shifted every cue; adding animation to one segment invalidated that segment's cues). Any edit that changes a shot's duration or order carries a mandatory closing step: **re-verify the whole SFX table**. Never bundle a BGM swap and a picture rebuild into the same round.

Corollary for planning: audio work belongs near the end of the schedule, not woven through it. In shotcraft's pipeline it is stage 6, after implementation and before acceptance.

## The pin table — the audio storyboard

Keep every cue in **one declarative registry**, next to the shot table, with a comment per entry naming the on-screen action it serves. Scene components contain no audio code at all.

```ts
// One source of truth. Each entry names the action it marks.
const SFX = [
  { from: SHOTS.hero.from + 12, src: "whoosh-big.mp3",   volume: 0.45 }, // hero card pops up
  { from: SHOTS.hero.from + 46, src: "transition-snap.mp3", volume: 0.5 }, // card reseats
  { from: SHOTS.outro.from,      src: "riser-cine.mp3",  volume: 0.5 }, // finale assembly begins
];
```

Two hard rules about that table:

- **Pin relative to the shot, never to a bare absolute frame.** Write `SHOTS.<shot>.from + offset` (or `beatF(n)` on a beat-synced film). Absolute numbers mean zero structural reuse: change one shot's length and every later cue is silently wrong. With relative pinning, a length change upstream updates one entry in the shot table and the audio follows. Start every project this way — retrofitting is the re-pin you were trying to avoid.
- **Truncate long samples with the timeline, don't cut audio files.** Give a 19s keyboard sample a 24-frame or 44-frame window per context. Audio length matches action length strictly; a cue that outlives its gesture reads as a mistake. A blanket default window (the reference film uses 90 frames, enough for any ≤3s sample to finish naturally) covers most cues, but **every sample longer than about 5 seconds needs an explicit one** — 21 files in the shipped library qualify, and a missed window leaves the sound ringing into the next shot. Window by kind: room tone and loops (ambience, hum, projector) run the length of the shot; action samples (typing, page-flipping, assembly) run the length of the gesture; and impacts with long reverb tails are the exception that should *not* be cut tight — let the tail decay or the hit reads dry.

## Choose the vocabulary by genre, not by event

The single most common failure: picking sounds semantically per UI event (click, drop, confirm) and shipping something that sounds like a mobile game. Real feedback on that first attempt was immediate and fatal.

**Product film vocabulary:** `whoosh` (camera moves) · `impact` (landings) · `riser` (build-ups) · `sparkle` (light effects) · `transition` (scene changes). **Banned:** the timbre of game audio packs — synth plucks and bloops, cartoon bounces, game-over runs — regardless of how well an individual sample seems to fit an individual moment. Judge by closing your eyes: the track alone should sound like a product launch, not like an app.

**The ban is on timbre, not on actions.** If something on screen genuinely clicks, switches, or shatters, it gets that object's foley — that is the custom-foley rule below, not a violation of this one. The reference film's own loudest cue is a real camera shutter on a click. The test question: does this sound like *the real-world object* (a shutter, a mechanical switch, glass, paper), or like *a game engine's feedback tone*? Use the first, drop the second.

Which makes one folder a trap. A `ui/` category is the one place where both live side by side: real switch foley and synthesized confirmation tones filed together. **Audition it file by file — never clear the folder wholesale.** The original sample names give it away: `tone`, `bleep`, `alert`, `notification`, and semantic names like "success" are synthesized feedback, exactly what this rule excludes; "light switch", "shutter", "glass" are objects. Apply the same per-file discipline to `data/` and `scifi/`, where synthesis is the point but the line still matters. The one exception is a film that deliberately wants *the system talking* — HUD readouts, an AI confirmation receipt, an error demo. That is a stated style choice, and per the aesthetic rules a deliberate rule break gets written into the project notes rather than made silently.

Beyond that base vocabulary, keep slots for **custom foley on distinctive actions** — typing gets a keyboard, items dropping in get a pop. A generic swoosh cannot cover an action the audience recognizes.

### Reusable phrases

| Phrase | Shape |
|---|---|
| **Finale (the reliable one)** | `riser` as assembly begins → ~35 frames later `impact` on the lockup landing, the peak of the closing phrase → ~25 frames later `sparkle` as the resonance |
| Scene change | one soft `transition`, once per new scene |
| Title card | one unified `swoosh-quick` across every card in the film |
| Click / confirm | `click-camera`, given the highest SFX volume |

### Cue lookup — moment to sound

The working vocabulary of a product film, as actually deployed in the reference cut. Treat as semantic mapping, not fixed filenames.

| On-screen moment | Cue | Notes |
|---|---|---|
| Enter a new scene | soft `transition` | Once per scene change, all film long |
| Fast camera move, batch of elements flying out | `whoosh-fast` | The acceleration passages |
| Big move — pop up, pull back, swing back | `whoosh-big` | Reserve for genuine scale |
| Element snaps back into place | `transition-snap` | Short, percussive |
| Title card appears | one `swoosh-quick` | Same cue for every title card in the film — consistency reads as intent |
| Light sweep, reveal beam, closing flash | `sparkle` | The resonance, not the hit |
| Typing on screen | `keyboard` foley | Long sample, windowed to the typed span |
| Click / confirm / capture | `click-camera` | Loudest SFX in the film (~0.6) — a deliberate choice: the moment the user "acts" outranks the brand landing |
| List items dropping in | short `pop` ×N | Apply the anti-machine-gun treatment below |
| Finale assembly begins | `riser` | Opens the three-part closing phrase |
| Lockup lands | `impact` | Peak of the closing phrase (~0.55) — the film's second-loudest cue |

Two cautions carried from the source: a film's audio folder accumulates **dead assets** (downloaded, never wired) — prune or label them rather than leaving ambiguity about what's live; and any cue whose provenance you can't name is a licensing risk, not a stylistic one.

### The library — pick the category, then the timbre

shotcraft ships a curated library at `library/video-shotcraft/assets/audio/`: `bgm/` (5 percussive candidates) and `sfx/<category>/` — **149 sounds across 16 categories**. Find a sound by naming the on-screen action first, entering that category, then auditioning inside it. (The manifest is vendored; the mp3s stay upstream — `companions.md` has the retrieval route.)

| Category | n | Holds | Reach for it when |
|---|---|---|---|
| `transition/` | 23 | whoosh · sweep · swoosh · wind | Camera moves, scene cuts, elements flying in or out |
| `ui/` | 18 | clicks, switches, notifications, pops | UI feedback, theme toggles, list drops — **audition file by file** |
| `impact/` | 14 | impact · thud · stomp · bass hit | Landings, downbeats, slams |
| `text/` | 13 | typewriter, keyboard, writing | Typed reveals, stroke-on, underlines |
| `data/` | 13 | glitch, electricity, data | HUDs, streaming output, skeletons, faults |
| `camera/` | 10 | shutters, lenses, zooms | Photo beats, crash zooms, focus pulls, iris |
| `paper/` | 10 | paper, page turns, print | Page-turn transitions, tearing, paper craft, riso |
| `light/` | 10 | sparkle, light effects | **This is where `sparkle` lives** — sweeps, ignitions, resonance flashes |
| `film/` | 8 | projector, film, tape, vinyl | Trailer grammar, film strips, rewind ramps |
| `mech/` | 8 | machinery, industry, locks | Parts assembling, locking, deformation |
| `scifi/` | 5 | tech, space, room tone | Space moves, system beds (long samples) |
| `fluid/` | 5 | ink, water, particles | Ink openers, particle fills, bubbles |
| `glass/` | 4 | glass, shattering | Shatter transitions, hard-cut hits — real material, not banned |
| `counter/` | 4 | counters, dials, clocks, countdowns | Number rolls, readouts, timelines |
| `crowd/` | 3 | crowds, applause, breath, heartbeat | Group-photo endings, launch-event feel, tension |
| `riser/` | 1 | build-ups | Into the finale or ahead of a big move |

Two mappings that are not guessable: **the vocabulary's `sparkle` is filed under `light/`** — there is no `sparkle/` directory — and **whoosh shares `transition/`** with scene changes, since camera-move and cut timbres genuinely overlap. The other eleven categories sit outside the base vocabulary entirely: they are the custom-foley layer.

Categories are an index for *finding*, not a licence for *using*. Selection still runs through the genre discipline above: generic seams take `transition/` and `impact/`, while the material categories are the foley slot for actions the audience recognizes.

Two library hazards worth checking before you rely on either:

- **Byte-identical duplicates.** The same asset can arrive twice under two names — four such pairs exist in the shipped library. Alternating between a pair is not alternating, so the anti-machine-gun move below silently does nothing. Verify by hash rather than by filename when ingesting new sounds (`find … -name '*.mp3' -exec md5 -r {} \; | sort | awk '{print $1}' | uniq -d`), and pull genuine two-sample pairs from *different* files in the same category.
- **Retired files.** Cues named in older notes may no longer exist; the library documents its own replacements (a deleted `impact-cine` is byte-identical to the surviving `impact-deep-whoosh`). Resolve a filename against the library before pinning it.

### Mixing — the level is a multiplier, not a target

BGM sits around **0.34** to leave headroom; SFX range **0.2–0.6**, with the level itself carrying meaning — the confirm click at 0.6 is the loudest thing, a trailing pop at 0.25 the quietest. Envelope the BGM with a ~1s fade-in and ~1.7s fade-out.

**That 0.2–0.6 range assumes the sample itself peaks near 0 dB.** `volume` multiplies the source; it does not normalize it. A sample recorded at −24.6 dB played at `volume={1}` is still −24.6 dB, while BGM peaking near 0 dB at 0.34 sits around −9.4 dB — so the cue stays 15 dB *under the drums* even at what looks like maximum. Seven files in the shipped library peak below −12 dB, which is why "just turn it up to 1.0" is not a fix. Three routes, in order:

1. **Swap the sample.** Most categories hold a dozen alternatives recorded near 0 dB. Lifting a quiet sample lifts its noise floor with it; picking a well-recorded one costs nothing.
2. **Pre-normalize on ingest** when you need that specific timbre — `ffmpeg -i in.mp3 -af "loudnorm=I=-16:TP=-1.5" out.mp3` — after which the normal 0.2–0.6 range works again.
3. **Gain above 1.** Remotion genuinely amplifies (`validateMediaProps` rejects only negative values; the Web Audio path writes the value straight into the gain node) — measured, 4× ≈ +12 dB and 16× ≈ +24 dB. Two caveats make this the last resort: **the preview clamps to 1.0** on the legacy `<audio>` fallback path, so what you hear while iterating can be quieter than the render, and gain lifts the noise floor and can clip. Judge on the rendered file and check it: `ffmpeg -i out.mp4 -af volumedetect -f null /dev/null` and read `max_volume`.

Record each new sample's peak at ingest and pin by measured level, not by copying a number out of a table.

### Rapid repeats — defeating the machine-gun

When one element type fires many times in a row, three moves in combination (no pitch-shifting required):

1. **Alternate two near-identical samples** across the sequence.
2. **Ladder the volume down** linearly for distance (e.g. 0.40 / 0.37 / 0.34 / 0.31 / 0.28 / 0.25).
3. **Let the interval follow the animation's own acceleration** (8 frames tightening to 3).

When the repeats get dense enough to blur, stop scoring them individually and **let the sound fade into a single swoosh** — the ear loses individual events exactly like the eye does. Target: a run you can count, not a mechanical stutter.

## Beat sync — when there's music

Enable when the user has picked a track *before* storyboarding. If they haven't, choose BGM at the sound stage and pace motion by content rhythm instead — don't force cuts onto a grid that doesn't exist yet.

**1. Fit the grid; don't trust the tempo scalar.** Beat trackers return a usable *sequence of beat times* but a tempo number that can be off by 2%+ (129.2 reported against a true 131.97). Least-squares-fit the whole beat sequence to a uniform grid `tᵢ = t₀ + i·T`, and take BPM from `60/T`. Residual **≤ ±15ms** (inside half a frame) means a machine-tight grid you can trust; larger means tempo changes — fit per segment.

**2. Find the accents that deserve the big hits.** Band-pass the kick range (~40–160 Hz), take onset strength, and read the energy at each integer beat. Two artifacts go into the design spec: a **music structure table** (which beat the energy tops out at, where the breakdowns and silences are — a breakdown is a natural home for the brand breath) and a **list of the strongest hits**, on which the film's 2–3 biggest slams must land. Real trap: a slam pinned on a half-beat while the strongest kick sat on the integer beat rendered 5.75 frames off. On strong-beat tracks the accents are almost always on integer beats — a half-beat pin needs onset data, not a hunch.

**3. Write the timeline in beats, not frames.**

```ts
export const FPS = 30;
export const BEAT0 = 0.2244;    // t₀ seconds, from the fit
export const BEAT_INT = 0.45465; // T seconds, from the fit
export const beatT = (n: number) => BEAT0 + n * BEAT_INT;
export const beatF = (n: number) => Math.round(beatT(n) * FPS);

export const SHOTS = {
  s0_open: { from: 0,        to: beatF(8) },
  s1_slam: { from: beatF(8), to: beatF(16) },
};
```

Shot lengths in whole beats (4 or 8 per shot); acceleration passages may step through half and quarter beats. Step-style shots (list items, mosaic cells) map one action per beat. Swapping the track or a section then means editing two constants. The SFX table uses `beatF(n)` from the same source of truth, so audio and picture can't drift apart.

**When the BGM's own drums are already dense, hold back:** pin only sounds unique to the picture, give the big slams to 2–3 moments, and let the track's kick carry the rest.

**4. Verify against the render — closed loop, mandatory.** Extract the audio *from the finished file* (not the source track — this catches encode and alignment offsets too), re-run the grid fit, and compare every designed cut against the nearest measured beat.

| Verdict | Error |
|---|---|
| Pass | ≤3 frames (perceptual threshold) |
| Ideal | ≤1.5 frames |
| Must fix | any cut >3 frames |

A 70s, 18-shot, 131.97 BPM film built this way measured ≤2.2 frames on every cut.

## Per-engine playback

The discipline above is identical everywhere; only the primitive changes.

| Engine | How cues play |
|---|---|
| **Remotion / shotcraft** | Wrap each table entry in a `<Sequence from={cue.from}>` around an `<Audio>`; the `durationInFrames` does the truncation. Frame-accurate by construction |
| **HyperFrames** | Three adaptations. **Time is seconds, not frames** — divide every frame figure here by the fps before use (35 frames ≈ 1.17s at 30fps). Relative pinning has a native primitive: `data-start="<clip-id> + N"` references another clip's start plus an offset, which is exactly the `SHOTS.<shot>.from + offset` discipline expressed in the composition contract — use it rather than computing absolute times. And the framework owns playback: declare the audio with `data-volume` for levels and let the renderer seek it; never call `.play()`, since a self-driving media element breaks deterministic rendering. Envelope fades are volume tweens on the timeline (`video-hyperframes.md`) |
| **Any engine** | Cues are data, not code in components. If a scene component contains an audio call, it's in the wrong place |

## Delivery — a scored film ships as two cuts

Any film that carries BGM delivers **two files: with music, and without music but with SFX intact**. The no-music cut is what lets the recipient drop the film into a platform that scores its own content, or lay their own track under it — and it costs nothing if you plan for it at the sound stage rather than after.

Build it into the composition, not into post: wrap only the BGM's audio element in a boolean input prop (`bgm`, defaulting to true), leaving the SFX table outside the switch. Then both cuts render **from the same timeline**, which is the whole point — picture and SFX are frame-identical by construction rather than by careful re-export.

```bash
npx remotion render src/index.ts Promo out/promo.mp4
npx remotion render src/index.ts Promo out/promo-nobgm.mp4 --props=props-nobgm.json   # {"bgm": false}
```

**Pass the props as a file, not inline.** `--props='{"bgm":false}'` works on macOS and Linux but breaks on Windows, where the shell strips the inner quotes and Remotion receives malformed JSON. A one-line file is portable everywhere. Render both at the acceptance stage — not only at final delivery — so the reviewer can confirm the two cuts actually match, and name them distinguishably (`promo.mp4` / `promo-nobgm.mp4`). Never build a second project for this, and never strip the music track with ffmpeg afterwards.

## Sourcing and licensing

Free-for-commercial libraries with no attribution requirement are the safe default for BGM and the cinematic SFX families; CC-BY libraries are fine but carry a real attribution obligation. Record the track name and URL **at download time** — batch downloads routinely strip metadata, and a file you can't trace is a file you can't clear for commercial use. Verify licensing per file before shipping commercially rather than trusting a batch-level assumption. The vendored manifest of what shotcraft ships, with per-file licensing notes and known gaps, is `library/video-shotcraft/assets/audio/ATTRIBUTION.md`; alongside it, `AUDITION-2026-07-27.md` carries the per-file audition data — duration, measured peak, and a suggested pin point for every sound — which is what makes the windowing and level rules above actionable without opening the binaries. The binaries themselves stay upstream (`companions.md`).

Selecting BGM: audition candidates **inside the cut**, never standalone — a track chosen in isolation gets replaced. Match the film's energy curve (low open → mid climb → peak finale); a steady percussive bed layers with SFX where a melodic lead fights them.

---
*Distilled from: video-shotcraft (sound-design, music-beat-sync), hyperframes, remotion.*
