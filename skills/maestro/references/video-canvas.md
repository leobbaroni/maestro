# Video — Canvas Engine

*The third rendering path: one pure `drawFrame(ctx, t)` that paints any frame from time alone, driving a scrubbable HTML player and an encoded MP4 from the same source. No React, no DOM, no browser at render time. Story and beats still come from `video-direction.md`, sound from `video-sound.md`, motion feel from `motion-principles.md`.*

## When this engine wins

Reach for it when the frame is **drawn as light** rather than laid out as a page: abstract, glow-driven motion graphics with no real UI, footage, or text layout to reproduce, where silhouette bloom, falloff, and additive compositing are one 2D call instead of a stack of DOM layers or a WebGL pass.

| Signal | Why canvas |
|---|---|
| Light *is* the subject — glows, blooms, shaped falloff, additive compositing | Native to a 2D context. CSS fights you and React inserts a layer between you and the pixel |
| The deliverable is **both** a scrubbable player and a video file | One file serves both, identical by construction |
| Headless Chromium is unavailable or blocked | The only engine here that renders with **no browser at all** |
| A long render inside an agent shell that kills commands at ~45s | Frame-per-file output is trivially resumable and parallelisable; a browser-driven render is not |
| No React in the project and none wanted | One JS file and a canvas |

**It loses** to Remotion or shotcraft the moment real product screenshots, captions, voiceover, or a scored soundtrack are involved, and to HyperFrames whenever the frame is fundamentally a laid-out page — flex/grid typography, cards, tables — that CSS gives you for free. Canvas text metrics are manual; reimplementing flexbox by hand is the failure this engine invites.

## The architecture contract

**One file exposes one pure function.** `drawFrame(ctx, tSeconds)` paints the complete frame for that instant and returns nothing.

- **No global mutable state.** `t = 9.37` in isolation must produce identical pixels every time, in any order, in any process. The renderer resumes mid-sequence and runs several ranges in parallel — frame N computed from frames 0…N−1 produces different pixels in a resumed run than in a fresh one, and the discontinuity lands wherever the shell happened to die.
- **No `requestAnimationFrame`, wall clock, or playback state inside the engine.** Those live only in the HTML shell. The caller owns the clock: the player drives it from a rAF loop and a scrub bar, the renderer from a frame index.
- **No randomness at draw time.** Seed a PRNG inside the frame and consume it a fixed number of times. A module-scope generator advances once per call, so its output becomes a function of *how many frames you have already drawn* — the preview looks right on first playback and changes on the second.
- **Never fork the drawing code between preview and render.** What the user scrubs is what encodes. Two paths is how a beat looks right in the browser and wrong in the MP4, with no way to tell which file is correct.

### The timeline model

Scenes dispatch off a `TIMELINE` of `{ name, end, fn }` entries carrying **cumulative absolute end times**, strictly increasing; total duration is the last entry's `end`. The loop accumulates `start`, finds the first entry where `t < end`, calls `fn(ctx, t - start, end - start)`, and **breaks** — exactly one scene draws per frame.

Two consequences worth internalising:

- **Scenes receive local time.** `t` starts at 0 for every scene, so retiming a beat is one number in `TIMELINE` rather than a hand-edit of every later scene's internals.
- **Each scene owns its own fade in and out.** The master never cross-dissolves. A scene that omits its fades pops at the boundary, and two scenes that must overlap have to be drawn inside one scene function.

Writing durations instead of absolute ends — or letting two entries share an `end` — makes `dur` zero or negative, every normalised-progress division blows up, and the scene renders as `NaN`.

### Clearing and state hygiene

The frame clear is an **opaque black `fillRect`**, and the composite mode and global alpha are reset *before* it. There is no `clearRect`. The renderer reuses one canvas and one context for every frame, so a scene that leaks `globalCompositeOperation = 'lighter'` turns the black clear into an additive no-op and the previous frame never goes away.

Every helper that touches context state brackets itself in `save()` / `restore()`. Canvas state is global and sticky: a leaked alpha fades the next scene, a leaked `filter` blurs everything downstream, a leaked `shadowBlur` silently multiplies render cost.

**Cull invisible work early.** Bloom stacks perform five or six large blurred fills; drawing them at alpha 0.001 costs full price and shows nothing. Gate on a small alpha epsilon and on off-screen progress.

## Silent failures — the diagnostic table

Canvas fails quietly. An invalid colour string assigned to `fillStyle` is **ignored** and the previous value silently persists; the same string handed to a gradient stop **throws**. Identical root cause, two completely different presentations. This table is the fastest route from symptom to cause:

| Symptom | Actual cause |
|---|---|
| A glow renders pure black, or vanishes under additive blending | A colour helper was fed something that is not full 6-digit `#rrggbb`. Parsing yields `NaN`, the shifts produce zeros, and the result is a **syntactically valid** black — no exception, no warning |
| A white glow renders blue | Shorthand hex. `#fff` parses as `0x000FFF` |
| A colour that should be near-white comes out near-black, mid-transition only | An unclamped progress value reached a colour mixer. Channels exceed 255, the hex-padding trick overflows to seven characters, and the wrong digit gets chopped. Overshoot easings are the usual source |
| A shape stops rendering entirely after a timing edit | A zero-length window divides by zero → `NaN` → an invalid `fillStyle` that is silently ignored |
| Soft bloom becomes a chunky stepped halo | The blur filter is unsupported or no-ops, leaving the bloom layers as hard-edged stacked silhouettes |
| A muddy dark ring bleeds outside a glowing panel, and render time jumps | `shadowBlur` was not reset before the interior fill, so the near-black interior also casts a shadow |
| A neon rim looks thin and detached from its glow | Paint order. Path, then **shadowed stroke**, then reset blur, then fill — fill first and the opaque interior covers the inner half of the stroke |
| One of two shapes randomly disappears | A path helper calls `beginPath()` internally; calling it twice then filling once discards the first path |
| Text you set to a lighter weight comes out bold | A typing helper sets its own font internally, overwriting what you set before the call |
| Text sits a few pixels off-centre | Measured with letter-spacing applied but drawn without it, or vice versa. Per-character advance also ignores kerning and ligatures, so it disagrees with whole-string measurement |
| A "live typing" flash smears on long beats and is invisible on short ones | The flash decay was driven by normalised progress instead of absolute seconds, so its duration scales with beat length |
| A frame re-renders on every invocation, forever | The resume gate uses a file-size threshold, and a legitimately near-black frame compresses below it |
| Everything after one scene sits half a cap-height off vertically | A scene set `textBaseline` and never restored it — including for elements drawn outside the timeline |

**Set the font before measuring**, and measure with the same spacing you will draw with. Canvas measures against the currently-set font and defaults to a tiny system font, so measuring first sizes a panel roughly four times too small.

**Do not make the background clear semi-transparent** to get motion trails. Trails need frame-to-frame history, which breaks purity: the resume pass regenerates a gap frame with no history, and each parallel worker starts blank.

## The build pipeline

1. **Beat sheet first**, in the reply, before any code.
2. **Author config and timeline** — dimensions, frame rate, brand object, then the timeline with its cumulative ends.
3. **One scene function per beat**, opening with its own fade envelope.
4. **Build the player** by inlining the engine into the shell at its marker. Output is one self-contained HTML file.
5. **Scrub and iterate** in the browser.
6. **Spot-check exact frames** — render stills at named seconds, aimed at beat boundaries and snap moments, then tile them into a contact sheet and *look at it*.
7. **Render all frames**, resumably, in parallel ranges.
8. **Audit gaps** with a `missing` mode that reports what is not yet on disk.
9. **Encode**, then verify.

**Never render 500 frames to find out beat two is mistimed.** The contact sheet costs seconds and catches what costs minutes.

### Resumability is not optional

Agent shells cap a single command well under a minute; a full render takes several, and background processes do not survive between tool calls. So the renderer **skips any frame already on disk** and gets called repeatedly, in parallel chunks, until nothing is missing. A renderer without resume cannot finish a film in an agent session at all.

Give it a `missing` mode, so "is it done?" has an answer rather than a guess. Gate resume on file existence *plus* a sanity threshold — and know that the threshold is what makes a legitimately near-black frame re-render forever.

**The player shows sub-frame times the export will never contain.** A snap tuned while scrubbing continuously can land on two encoded frames and read as a hard cut. Often that is the intent — confirm it deliberately rather than discovering it.

## Turning a script into a beat sheet

Do this before any code, and show the result in the reply.

1. **Extract the beats** — hook, what it does, proof, ask. Most scripts have 4–6. **You are cutting, not summarising.**
2. **Reduce each beat to ≤5 words on screen.** "Our platform helps teams collaborate faster across time zones" becomes "Work across time zones", or just "No lag".
3. **Assign a shot** from the vocabulary. Open strong, brand moment about a third in, close on a hero moment.
4. **Time it.** 15s → 4 beats · 20s → 5 · 30s → 6–7 · 60s → 10–12. Hook and close get more room than the middle.
5. **Plan the hue arc** — cool at the open, through the middle, warm or hot at the close. A film that stays one colour looks static even when everything is moving.

```
DURATION 20.0s · 1080×1920 · 30fps
BRAND    Acme · accent #7a2bff

0.00–4.20  LIT-FORM   dark chevron on a cyan canopy, slow push-in
                      0.3–1.1  type "Ship faster" · last letter flashes mint
                      3.5–4.2  form flattens and fires · whip blur · hard cut
4.20–7.60  SHOCKWAVE  violet ring from centre; mark ember-red
           +WORDMARK  5.0 SNAP white as the card sweeps in from lower-left
7.60–12.0  QUERY-PILL three lines typed: "Deploy" / "Monitor" / "Scale"
12.0–16.4  SLAB-RING  8 tiles expanding · centre copy "Any stack"
16.4–20.0  HERO-PEEL  one tile centres, glow blue→violet→magenta
```

**Beat length is 1.5–4s for beats made of light** — anything the eye reads instantly. **Lift the ceiling for any beat carrying evidence** a viewer must parse: a statistic, a UI panel, a demo, a claim. `video-direction.md`'s longer holds govern those, and its hero-reveal-gets-the-longest-hold rule still applies.

## Shot vocabulary

Compose from these; mix them, never repeat one twice in a row. Each is one beat.

| Shot | What it is | Use for |
|---|---|---|
| **LIT-FORM** | A dark form with light blasting from behind — bloom concentrated beneath its edges, a light cone falling from it, contrasting spill either side, falling to black below. Slow push-in | The signature opener |
| **ORB** | A huge gradient sphere filling the top of frame, cropped by the edges, lower half dissolving to black; a brighter offset shell reads as a crescent; one hard rim arc | Opening, or a held statement |
| **SHOCKWAVE** | A soft ring expanding from an impact point at a *constant* rate, fading as it grows | Opening a beat after a hard cut |
| **CARD-SWEEP** | A giant rounded panel sweeping in from a lower corner, face a drifting multi-point gradient, brand lockup near its top-left | The brand moment |
| **QUERY-PILL** | A glossy pill with text typing inside it, rim a rotating multi-stop gradient; line swaps are a vertical carousel | A sequence of short phrases |
| **SLAB-RING** | 8 rounded-squircle glass tiles on a ring, clustered at centre then expanding while growing and rotating; copy held at centre | Breadth — integrations, coverage |
| **HERO-PEEL** | One object from the previous shot does not leave: it drifts to centre, swells, and its glow runs a colour progression | Closing a film |
| **SYMBOL-MORPH** | The container holds still and only its contents crossfade | Pairs with HERO-PEEL |
| **WORDMARK-SNAP** | The mark holds small and ember-hot, then **snaps** in 2–3 frames to full size and white as something lands behind | The logo reveal |
| **STAT-SLAM** | A large number arriving hard with a bloom, digits rolling to their value, label beneath | Metrics and proof points |
| **LINE-DRAW** | A path drawing itself with a bright leading dot and a trailing glow | Process, journeys, routes |
| **PANEL** | A floating glass rectangle with simplified UI inside, tilted, lit from behind | "Here's the product" |
| **STATEMENT** | Full-bleed type on a slow gradient field | A manifesto or closing claim — at most once |

## The craft rules

Each names the artifact you will actually see when it is broken.

1. **Bloom takes the shape of the object.** A soft oval behind something is the single biggest tell of a cheap render. Draw 4–5 blurred, progressively larger copies of the object's *own silhouette*.
2. **Light breathes.** Glow amplitude swells across a beat — in, peak around two-thirds through, ease off before the next thing lands. Constant-intensity glow looks dead.
3. **Light comes from behind**, never as a stroke on the object. Dark objects lit from behind read as physical; neon outlines read as clip art.
4. **Colour moves.** No glow holds one hue longer than ~1.5s.
5. **Cut hard.** Where a beat ends, cut. Never soften a cut into a dissolve.
6. **Snaps snap** — 2–3 frames, not half a second. Interpolating what should be a cut is exactly what produces smeared, doubled, glitchy branding.
7. **Easing carries the feel.** Smoothstep general, ease-out arrivals, ease-in exits. **Never put a long move on cubic ease-in** — nothing happens and then it lurches, which reads as dropped frames and is the number one cause of "it looks laggy".
8. **The last character typed flashes** the accent colour and cools to white over ~0.25s, driven by absolute seconds. Tiny, and it is what makes typing feel live rather than pasted.
9. **Arrange, don't scatter.** Rings, grids, and arcs read as designed. Random diagonal fly-bys read as filler.
10. **Things persist.** When one element becomes the next, keep the container and change only its contents. Nothing pops in from nowhere — least of all at the end.
11. **Colour helpers take *and return* hex** so they compose. A mixer returning `rgb()` silently breaks every alpha builder downstream.
12. **Type sits on darkness.** If a headline lands on a bright part of the frame, put a soft radial scrim behind it rather than moving the type.

**On frame density**, this engine is the exception to the "3 elements looks empty, 8–10 feels alive" floor in `video-direction.md` — count visual *incident*, not objects. That floor is written against flat type-on-a-field beats, where one word centred in a void genuinely reads unfinished. A lit volumetric subject already carries incident in its bloom layers, spill, rim, and falloff, so **one object per beat, big and centred** is correct here and a busy composite is the failure.

**Pure black `#000` is right for video** and does not contradict `creative-coding.md`'s near-black advice, which is about interactive canvas art on desktop LCDs where pure black flattens low-alpha additive accumulation. In an encoded film `#000` costs nothing and gives the glow its full range.

## Style, and when to ask

A committed house style — the palette, the type family, the ground rules — is a **brief field, not an engine default**. Ask for it once, record it, then stop asking.

**When a style is locked, build first.** A fixed style has already answered design authority, register, banned qualities, and motion feel, which is exactly what the Grill Gate exists to establish — so the interview buys nothing and the beat sheet in your reply is the better review artifact. Take duration and aspect ratio, which nothing can infer, plus a brand colour if one exists, then produce the beat sheet and build. Everything after the first cut is conversation.

**When the style is genuinely open**, Rule 0 applies normally: it is a taste decision and it is the user's.

Two boundaries on building without approval:

- **Render cost draws the line.** A short local canvas render is minutes of free CPU, and the cut communicates better than any storyboard — so build it. A long, paid, or remote render is a paid action and gets approval first, per `process.md`.
- **Real product UI in frame means shotcraft leads**, not this engine's house style. House tokens sitting next to captured screenshots is exactly the mismatch that reads broken; `video-shotcraft.md`'s doctrine of growing the visual language from the product wins whenever the product is actually on screen.

## Sound, and the player

**Audio is a mux step, not a render step.** The frame renderer is silent by construction. Author cues as a declarative table pinned in seconds against the timeline's entries — the direct analogue of the pinning method in `video-sound.md` — then mux at encode time. Cues pinned to a beat's start survive retiming; cues pinned to absolute seconds do not.

**The film is exempt from reduced-motion; the player chrome is not.** You cannot reduced-motion a movie any more than a video embed. But under `prefers-reduced-motion: reduce` the player **must not autoplay** — open paused, with the scrub bar available. That satisfies the constitution's rule 9 without pretending the content is the problem.

## Verify before handing over

- **Look at your own contact sheet.** Would you ship it?
- **Profile frame differences** — the mean absolute delta between consecutive frames, then the delta of *that*. Any spike that is not a deliberate cut is a stutter.
- **Grep the output** for placeholder text and any wrong brand name.
- **Confirm the encoded frame count and duration** match the beat sheet.
- **Check available fonts before choosing a family.** There is no managed loader here, unlike every other engine maestro routes to.

Then present the files, clean up frame directories, and keep the reply short: the beat sheet you used and anything you would flag. Not a tour of the code.

## Refinement — notes map to causes

Treat each note as a timeline or style edit and **re-render only the affected frame range** — delete that range from the frame cache and leave the rest. A one-beat change is under a minute, not a rebuild.

| They say | You change |
|---|---|
| "it lags" / "stutters" | An easing curve — almost always a long move on ease-in |
| "make it pop" | Bloom swell amplitude, plus a colour shift |
| "too busy" | Fewer objects per beat, longer holds |
| "the logo looks glitchy" | You interpolated a snap — make it 2–3 frames |
| "slower" | Stretch beat durations; keep transitions the same length |
| "different vibe" | Shift the palette's hue arc, keep the structure |

---
*Distilled from: the motion-promo skill by keemfinity — method, craft rules, and architecture only; its engine source ships no licence and is not redistributed here. Frame density, pacing, sound, and approval rules reconciled against `video-direction.md`, `video-shotcraft.md`, `video-sound.md`, and `creative-coding.md`.*
