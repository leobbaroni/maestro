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
- **Truncate long samples with the timeline, don't cut audio files.** Give a 19s keyboard sample a 24-frame or 44-frame window per context. Audio length matches action length strictly; a cue that outlives its gesture reads as a mistake.

## Choose the vocabulary by genre, not by event

The single most common failure: picking sounds semantically per UI event (click, drop, confirm) and shipping something that sounds like a mobile game. Real feedback on that first attempt was immediate and fatal.

**Product film vocabulary:** `whoosh` (camera moves) · `impact` (landings) · `riser` (build-ups) · `sparkle` (light effects) · `transition` (scene changes). **Banned:** game UI packs — click/pluck/glass tap families — regardless of how well an individual sample seems to fit an individual moment. Judge by closing your eyes: the track alone should sound like a product launch, not like an app.

Beyond that base vocabulary, keep slots for **custom foley on distinctive actions** — typing gets a keyboard, items dropping in get a pop. A generic swoosh cannot cover an action the audience recognizes.

### Reusable phrases

| Phrase | Shape |
|---|---|
| **Finale (the reliable one)** | `riser` as assembly begins → ~35 frames later `impact` on the lockup landing, the loudest cue in the film → ~25 frames later `sparkle` as the resonance |
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
| Click / confirm / capture | `click-camera` | Loudest SFX in the film |
| List items dropping in | short `pop` ×N | Apply the anti-machine-gun treatment below |
| Finale assembly begins | `riser` | Opens the three-part closing phrase |
| Lockup lands | `impact` | Peak loudness of the whole film |

Two cautions carried from the source: a film's audio folder accumulates **dead assets** (downloaded, never wired) — prune or label them rather than leaving ambiguity about what's live; and any cue whose provenance you can't name is a licensing risk, not a stylistic one.

### Mixing

BGM sits around **0.34** to leave headroom; SFX range **0.2–0.6**, with the level itself carrying meaning — the confirm click at 0.6 is the loudest thing, a trailing pop at 0.25 the quietest. Envelope the BGM with a ~1s fade-in and ~1.7s fade-out.

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
| **HyperFrames** | The framework owns media playback — declare the audio and let the renderer seek it. Never call `.play()`; a self-driving media element breaks deterministic rendering (`video-hyperframes.md`) |
| **Any engine** | Cues are data, not code in components. If a scene component contains an audio call, it's in the wrong place |

## Sourcing and licensing

Free-for-commercial libraries with no attribution requirement are the safe default for BGM and the cinematic SFX families; CC-BY libraries are fine but carry a real attribution obligation. Record the track name and URL **at download time** — batch downloads routinely strip metadata, and a file you can't trace is a file you can't clear for commercial use. Verify licensing per file before shipping commercially rather than trusting a batch-level assumption. The vendored manifest of what shotcraft ships, with per-file licensing notes and known gaps, is `library/video-shotcraft/assets/audio/ATTRIBUTION.md`; the binaries themselves stay upstream (`companions.md`).

Selecting BGM: audition candidates **inside the cut**, never standalone — a track chosen in isolation gets replaced. Match the film's energy curve (low open → mid climb → peak finale); a steady percussive bed layers with SFX where a melodic lead fights them.

---
*Distilled from: video-shotcraft (sound-design, music-beat-sync), hyperframes, remotion.*
