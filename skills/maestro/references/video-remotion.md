# Remotion

*Author videos as React components rendered deterministically frame-by-frame; `useCurrentFrame()` is the only clock.*

For a product demo or launch promo, `references/video-shotcraft.md` is the craft layer above this one — it brings the mode gate, a 106-card shot vocabulary with tuned implementations, and the production pipeline, while every rule below still governs the code it emits. Audio for any Remotion film: `references/video-sound.md`.

## Mental Model

- A Remotion video is a React component tree. The renderer screenshots it once per frame; frames may render in parallel, out of order, on different threads.
- Therefore every frame must be a **pure function of `useCurrentFrame()`** (plus props). No wall-clock time, no self-running animation, no state accumulated across frames.
- **CSS transitions and CSS animations are FORBIDDEN** — they will not render correctly. Tailwind `animate-*` / `transition-*` classes are equally forbidden. Animate exclusively by mapping the frame number to style values.
- Randomness must be deterministic: use `random(seed)` from `remotion`, never `Math.random()` / `Date.now()` — a value that differs between frames or render threads produces flicker.
- Async work (fetching data, Lottie JSON, captions) must hold the frame open with `delayRender()` / `continueRender()` (or the `useDelayRender()` hook) and `cancelRender(err)` on failure.
- Install packages with `npx remotion add <pkg>` (picks the matching version) for all `@remotion/*` packages, `mediabunny`, and `zod`.

```tsx
import { useCurrentFrame, interpolate, Easing } from "remotion";

export const FadeIn = () => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        opacity: interpolate(frame, [0, 60], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
      }}
    >
      Hello
    </div>
  );
};
```

## Project & Compositions

Scaffold: `npx create-video@latest --yes --blank --no-tailwind my-video && cd my-video && npm i`. Preview: `npx remotion studio --no-open` (long-running; prints URL). Sanity-check a frame: `npx remotion still <comp-id> --scale=0.25 --frame=30` (`--frame` is zero-based; 30 = 1s at 30fps).

A `<Composition>` registers a renderable video: `id`, `component`, `width`, `height`, `fps`, `durationInFrames`.

```tsx
type Props = { readonly title: string }; // `type`, not `interface`, for defaultProps type safety

<Composition
  id="MyComp"
  component={MyComp}
  durationInFrames={150}
  fps={30}
  width={1920}
  height={1080}
  defaultProps={{ title: "Hello World" }} // inline object literal — never a variable/spread/helper
/>;
```

- `defaultProps` must be JSON-serializable (`Date`, `Map`, `Set`, `staticFile()` allowed) and written **inline** on the tag, or Studio cannot save edits back to code.
- Keep component + `<Composition>` registration in the same file when scaffolding.
- `<Still id="Thumb" component={Thumbnail} width={1280} height={720} />` — single-frame images, no fps/duration.
- `<Folder name="Marketing">…</Folder>` organizes the sidebar (letters, numbers, hyphens only).
- Nest one composition inside another: `<Sequence width={W} height={H}><Inner /></Sequence>`.
- Assets live in `public/`; reference via `staticFile("name.ext")`. Remote URLs work directly.
- For Studio editability, wrap elements users should manipulate: `<div>` → `<Interactive.Div>`, and give `Interactive`/`Solid`/`Sequence` a descriptive `name` prop.

## Timing: interpolate, Easing, spring

**Prefer `interpolate()` over `spring()`** unless physics-based motion is explicitly requested. Default easing is linear; values are NOT clamped by default — almost always clamp both sides.

```tsx
const v = interpolate(frame, [0, 45], [0, 1], {
  easing: Easing.bezier(0.16, 1, 0.3, 1), // same params as CSS cubic-bezier
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
});
```

Canonical curves:

| Use | Easing |
|---|---|
| Crisp UI entrance (strong ease-out) | `Easing.bezier(0.16, 1, 0.3, 1)` over ~45f |
| Editorial slow fade (ease-in-out) | `Easing.bezier(0.45, 0, 0.55, 1)` over ~90f |
| Playful overshoot (y > 1 passes target) | `Easing.bezier(0.34, 1.56, 0.64, 1)` over ~30f |
| Preset without custom cubic | `Easing.inOut(Easing.cubic)` |
| Spring feel without spring() | `Easing.spring()` (Remotion helper) |

Named presets, most linear → most curved: `Easing.quad`, `Easing.cubic` (good default), `Easing.sin`, `Easing.exp`, `Easing.circle`. Direction rule: **`Easing.out` for entrances** (arrive with momentum), **`Easing.in` for exits** (leave with gravity).

Studio-editable style: keep the `interpolate()` call **inline in the `style` prop** and prefer individual transform properties:

```tsx
// Good — editable keyframes in Studio
style={{
  scale: interpolate(frame, [0, 100], [0, 1]),
  translate: interpolate(frame, [0, 100], ["0px 0px", "100px 100px"]),
  rotate: interpolate(frame, [0, 100], ["20deg", "90deg"]),
}}
// Bad — hidden values, transform strings become computed
const s = interpolate(frame, [0, 100], [0, 1]);
style={{ transform: `scale(${s})` }}
```

Use `transform` strings only for `skew()`, `perspective()`, or order-sensitive chains.

When several properties share timing and don't need Studio keyframing, separate **timing** from **mapping**: compute one clamped 0→1 progress, derive each property with unclamped `interpolate(progress, [0, 1], [a, b])`. Enter+exit: `progress = slideIn - slideOut`.

Work in seconds via `const { fps } = useVideoConfig()` — write `2 * fps`, not magic frame counts.

## Sequencing

`<Sequence>` shifts and bounds time for its children. **Inside a Sequence, `useCurrentFrame()` is local (starts at 0).**

```tsx
<AbsoluteFill>
  <Sequence name="Background" premountFor={1 * fps}>
    <Background />
  </Sequence>
  <Sequence name="Title" from={1 * fps} durationInFrames={2 * fps} layout="none" premountFor={1 * fps}>
    <Title />
  </Sequence>
</AbsoluteFill>
```

- Default layout is an absolute fill covering the frame; `layout="none"` for inline content.
- **Always premount** sequences (`premountFor={1 * fps}`) so media/assets load before appearing.
- Negative `from` **trims** the start of an animation (`<Sequence from={-15}>` starts 15 frames in). `durationInFrames` trims/unmounts the end. Trim and delay by nesting: outer `from={30}`, inner `from={-15}`.
- Sequences nest for complex timing.

`<Series>` plays children back-to-back: `<Series.Sequence durationInFrames={45}>`, negative `offset` overlaps (`offset={-15}` starts 15 frames before the previous ends).

`<TransitionSeries>` (`npx remotion add @remotion/transitions`) adds transitions/overlays at cut points; children are absolutely positioned:

```tsx
import { TransitionSeries, linearTiming, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";

<TransitionSeries>
  <TransitionSeries.Sequence durationInFrames={60}><SceneA /></TransitionSeries.Sequence>
  <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 15 })} />
  <TransitionSeries.Sequence durationInFrames={60}><SceneB /></TransitionSeries.Sequence>
</TransitionSeries>;
```

- Presentations: `fade()`, `slide({direction: "from-left" | "from-right" | "from-top" | "from-bottom"})`, `wipe()`, `flip()`, `clockWipe()` — each imported from `@remotion/transitions/<name>`.
- Timings: `linearTiming({durationInFrames})`, `springTiming({config: {damping: 200}, durationInFrames})`. Get real length with `timing.getDurationInFrames({fps})` (springs without explicit duration depend on fps).
- **Transitions overlap scenes and SHORTEN total duration**: two 60f scenes + 15f transition = 105f, not 120f. Compute composition duration as `sum(scenes) - sum(transitions)`.
- `<TransitionSeries.Overlay durationInFrames={20}>` renders an effect (e.g. `<LightLeak />` from `@remotion/light-leaks`) over the cut **without** changing duration; optional `offset` shifts it. An overlay cannot be adjacent to a transition or another overlay.

## Layout for Video

Video is glanced at full-frame, not read like a web page:

- One focal point per scene: one main message + one supporting visual + one or two background accents. Reveal features **over time**, not side-by-side — let time solve crowding.
- Safe area: at 1080px wide keep key text ≥80px from sides, ≥100px from top/bottom.
- Text minimums at 1080px width (scale with composition width): headline 84px, supporting 44px, labels 32px. Small text is decorative. Short lines; split long ideas across scenes.
- Put readable content in normal flex/grid flow with `gap`; reserve absolute positioning for backgrounds, glows, decorative layers. Each element gets a layout slot; animate with `opacity`/`transform`/`scale` from its slot — never animate into another element's space. Assume user text wraps.
- Avoid web-UI patterns (many cards, badges, pills, dashboards). Strong contrast; add a backing shape or simplify the background if text is hard to read.
- Pre-render check: is the message readable in <1s, one obvious focal point, nothing overlapping?
- Tailwind is fine if installed (see remotion.dev/docs/tailwind) — but never its animation classes.

## Media

Use `<Video>` / `<Audio>` from `@remotion/media` (`npx remotion add @remotion/media`), `<Img>` / `<AnimatedImage>` from `remotion`. (`<OffthreadVideo>` is the legacy core-package video tag; prefer `@remotion/media`.)

```tsx
import { Audio, Video } from "@remotion/media";
import { Img, staticFile, Sequence } from "remotion";

<Video src={staticFile("video.mp4")} trimBefore={2 * fps} trimAfter={10 * fps} volume={0.5} />
<Sequence from={1 * fps}><Audio src={staticFile("music.mp3")} loop /></Sequence>
<Img src={staticFile("logo.png")} style={{ width: 100 }} />
```

Shared props (Video and Audio):

| Prop | Behavior |
|---|---|
| `trimBefore` / `trimAfter` | Cut media, **values in frames** (`2 * fps` = skip 2s). Media still starts at its Sequence start. |
| `volume` | 0–1 static, or callback `(f) => interpolate(f, [0, fps], [0, 1], {extrapolateRight: "clamp"})`; `f` starts at 0 when the media begins, not the composition frame. |
| `muted` | Boolean, can be frame-dependent. |
| `playbackRate` | Speed (2 = 2x). **Reverse playback not supported.** |
| `loop` | Loop indefinitely. `loopVolumeCurveBehavior`: `"repeat"` (volume `f` resets each loop, default) or `"extend"` (keeps counting — enables fade over loops). |
| `toneFrequency` | Pitch 0.01–2 without speed change. **Server-side render only** — silent in Studio preview and `<Player>`. |

Delay any media by wrapping in `<Sequence from={...}>`. Layer audio tracks with multiple `<Audio>` tags. Video sizing/position via `style` + `objectFit`.

- **Images**: `style` for size/position; dynamic paths via template literals (`staticFile(\`frames/frame${frame}.png\`)` for image sequences); `getImageDimensions()` for aspect-aware compositions.
- **GIF/APNG/AVIF/WebP**: `<AnimatedImage src width height fit="cover" playbackRate loopBehavior="loop"|"pause-after-finish"|"clear-after-finish" />` — synced to the timeline. Fallback: `<Gif>` from `@remotion/gif`. `getGifDurationInSeconds()` sizes the composition.
- **Lottie** (`@remotion/lottie`): fetch JSON in `useEffect` guarded by `delayRender()`/`continueRender()`/`cancelRender()`, store in state, render `<Lottie animationData={data} style={{width: 400}} />`.
- **SFX**: `<Audio>` from `@remotion/sfx` with hosted files, e.g. `https://remotion.media/whoosh.wav`, `whip.wav`, `ding.wav`, `mouse-click.wav`, `record-scratch.wav`, `page-turn.wav`, `switch.wav`.
- **Voiceover**: generate TTS per scene (e.g. ElevenLabs `POST /v1/text-to-speech/{voiceId}` with `xi-api-key`), write MP3s to `public/`, then measure durations in `calculateMetadata` to size the composition; subtract transition overlaps if using `<TransitionSeries>`.
- **Silence trimming**: `npx remotion ffmpeg -i public/video.mov -map 0:a -af loudnorm=print_format=json -f null /dev/null` → take `input_thresh`; then `-af "silencedetect=noise=${THRESH}dB:d=0.5"` → parse `silence_start`/`silence_end` pairs; apply as `trimBefore={Math.floor(leadingEnd * fps)}` / `trimAfter={Math.ceil(trailingStart * fps)}`.
- **3D** (`@remotion/three`): wrap in `<ThreeCanvas width={width} height={height}>` with lighting. **`useFrame()` from `@react-three/fiber` is forbidden**; shaders/models must not self-animate — drive all motion from `useCurrentFrame()` (`rotation={[0, frame * 0.02, 0]}`). Any `<Sequence>` inside `<ThreeCanvas>` needs `layout="none"`.

## Captions

All captions are JSON in the `Caption` type from `@remotion/captions`:

```ts
type Caption = { text: string; startMs: number; endMs: number; timestampMs: number | null; confidence: number | null };
```

**Transcribe** (`@remotion/install-whisper-cpp`): Node script — `installWhisperCpp({to, version: "1.5.5"})` → `downloadWhisperModel({model: "medium.en", folder})` → convert audio to 16kHz wav (`ffmpeg -i in.mp4 -ar 16000 out.wav -y`) → `transcribe({model, whisperPath, inputPath, tokenLevelTimestamps: true})` → `toCaptions({whisperCppOutput})` → write JSON to `public/`. Transcribe each clip individually, one JSON per video. Existing `.srt`: fetch text and `parseSrt({input})`.

**Display** (`@remotion/captions`), in a dedicated component file:

1. Fetch the JSON with `useDelayRender()` (`delayRender`/`continueRender`/`cancelRender`).
2. Page it: `createTikTokStyleCaptions({captions, combineTokensWithinMilliseconds: 1200})` — higher = more words per page, lower = word-by-word.
3. Render each page in a `<Sequence from={(page.startMs / 1000) * fps} durationInFrames={...}>`, capping duration at the next page's start.
4. Highlight the active word: inside the page component, `absoluteTimeMs = page.startMs + (frame / fps) * 1000`; a token is active when `token.fromMs <= absoluteTimeMs && token.toMs > absoluteTimeMs`.
5. Captions are whitespace-sensitive — keep the leading space in each token's `text` and use `whiteSpace: "pre"`.
6. Render captions alongside the `<Video>` in the same tree so they stay in sync.

## Fonts & Text Measurement

**Google Fonts** (recommended; type-safe, blocks render until ready): `npx remotion add @remotion/google-fonts`, then per family:

```tsx
import { loadFont } from "@remotion/google-fonts/Roboto";
const { fontFamily } = loadFont("normal", { weights: ["400", "700"], subsets: ["latin"] });
// <div style={{ fontFamily }}> — call loadFont() at module top level
```

**Local fonts** (`@remotion/fonts`): file in `public/`, `await loadFont({family: "Inter", url: staticFile("Inter-Regular.woff2"), weight: "400"})`; load each weight separately with the same family name.

**Measuring** (`@remotion/layout-utils`): `measureText({text, fontFamily, fontSize, fontWeight})` (cached), `fitText({text, withinWidth, fontFamily, fontWeight})` → optimal `fontSize` (cap it: `Math.min(fontSize, 80)`), `fillTextBox({maxBoxWidth, maxLines})` → `.add({text}).exceedsBox` for overflow. Rules: measure only **after** fonts load (`await waitUntilDone()`; pass `validateFontIsLoaded: true` to throw early); use identical font properties for measuring and rendering; avoid padding/border on measured text — use `outline` instead of `border`.

## Dynamic Metadata & Parameters

`calculateMetadata` on `<Composition>` computes metadata before render from props / fetched data / asset metadata. All return fields optional and override the tag's props: `durationInFrames`, `width`, `height`, `fps`, `props` (transformed), `defaultOutName` (`.mp4` appended), `defaultCodec`.

```tsx
const calculateMetadata: CalculateMetadataFunction<Props> = async ({ props, abortSignal }) => {
  const durationInSeconds = await getVideoDuration(props.videoSrc); // e.g. via mediabunny
  const data = await (await fetch(props.dataUrl, { signal: abortSignal })).json();
  return {
    durationInFrames: Math.ceil(durationInSeconds * 30),
    props: { ...props, fetchedData: data },
  };
};
```

For static values, inline them on `<Composition>` instead. `abortSignal` cancels stale fetches when props change in Studio.

**Parameterized videos**: attach a Zod schema so props are editable in the Studio sidebar and settable per render:

```tsx
export const schema = z.object({ title: z.string(), color: zColor() }); // zColor from @remotion/zod-types → color picker
const MyComp: React.FC<z.infer<typeof schema>> = ({ title, color }) => …;
<Composition … schema={schema} defaultProps={{ title: "Hi", color: "#fff" }} />;
```

Top-level type must be `z.object()`. Pass props at render time: `npx remotion render MyComp out.mp4 --props='{"title":"Hello"}'`.

## Effects & Audio Visualization

**Effects** are functions in the `effects` prop of canvas-based components (`<Video>` from `@remotion/media`, `<Solid>`, `<CanvasImage>`, `<HtmlInCanvas>`):

```tsx
import { blur } from "@remotion/effects/blur";
<Video src={src} effects={[blur({ radius: 8 })]} />;
```

`npx remotion add @remotion/effects`. Large catalog: color (`brightness`, `contrast`, `duotone`, `grayscale`, `hue`, `saturation`, `tint`, `invert`, `colorKey`, `thermalVision`), blur (`blur`, `zoomBlur`, `linearProgressiveBlur`, `radialProgressiveBlur`), light (`glow`, `dropShadow`, `shine`, `lightTrail`, `vignette`, `lightLeak` from `@remotion/light-leaks`, `starburst` from `@remotion/starburst`), distortion (`barrelDistortion`, `chromaticAberration`, `fisheye`, `wave`, `mirror`, `cornerPin`, `noiseDisplacement`), texture (`halftone`, `pixelate`, `scanlines`, `noise`, `paper`, `dotGrid`, `pattern`, `roughenEdges`), and more. Most import from `@remotion/effects/<slug>`. Effects use WebGL2 — enable for renders with `Config.setChromiumOpenGlRenderer('angle')` in `remotion.config.ts` (or `--gl=angle`).

Custom reusable effects: `createEffect()` from `remotion` (`type` reverse-DNS id, `backend: "2d" | "webgl2" | "webgpu"`, `calculateKey`, `setup`/`apply`/`cleanup`, `schema`, `validateParams`). Prefer `"2d"` unless shader math is needed. Preference order for any visual effect: plain HTML/CSS/SVG/filter/blend animation → catalog effect → `createEffect()` → custom `<HtmlInCanvas onPaint>` (Chrome 149+ with a flag; never nest `<HtmlInCanvas>`).

**Audio visualization** (`@remotion/media-utils`):

```tsx
const { audioData, dataOffsetInSeconds } = useWindowedAudioData({ src, frame, fps, windowInSeconds: 30 });
if (!audioData) return null;
const frequencies = visualizeAudio({ fps, frame, audioData, numberOfSamples: 256, optimizeFor: "speed", dataOffsetInSeconds });
```

- `numberOfSamples` must be a power of 2. Values 0–1; array left = bass, right = highs.
- **Pass the parent's `frame` down to child components** — calling `useCurrentFrame()` in children inside offset `<Sequence>`s makes the visualization discontinuous.
- Bass-reactive: average `frequencies.slice(0, 32)` → drive `scale`/`opacity`.
- Waveforms: `visualizeAudioWaveform()` + `createSmoothSvgPath()` for oscilloscope SVG paths; `getWaveformPortion()` for simple volume bars.
- Low frequencies dominate — rescale in dB for visual balance: `(20 * Math.log10(v) - minDb) / (maxDb - minDb)` with e.g. −100/−30.

## Rendering

```bash
npx remotion render                      # render (interactive comp pick) — or: npx remotion render MyComp out.mp4
npx remotion still MyComp --frame=30     # single frame
npx remotion render MyComp --props='{"title":"Hi"}'
```

| Target | Command |
|---|---|
| Transparent ProRes (video editors) | `npx remotion render --image-format=png --pixel-format=yuva444p10le --codec=prores --prores-profile=4444 MyComp out.mov` |
| Transparent WebM (browsers) | `npx remotion render --image-format=png --pixel-format=yuva420p --codec=vp9 MyComp out.webm` |
| WebGL effects / 3D | add `--gl=angle` (or `Config.setChromiumOpenGlRenderer('angle')`) |

Persist defaults in `remotion.config.ts` (`Config.setCodec`, `setPixelFormat`, `setVideoImageFormat`, `setProResProfile` — restart Studio after changes) or per-composition via `calculateMetadata` returning `defaultCodec`, `defaultVideoImageFormat`, `defaultPixelFormat`, `defaultProResProfile`.

## Player & SaaS Embedding

Interactive in-app preview with `@remotion/player` — no rendering involved:

```tsx
<Player component={MyVideo} durationInFrames={120} compositionWidth={1920} compositionHeight={1080} fps={30} controls />
```

If metadata is dynamic, reuse the composition's `calculateMetadata` logic to derive Player props. Programmatic rendering options: **Lambda** (`@remotion/lambda` — fastest/most scalable; deploy function + site, credentials in `.env` as `REMOTION_AWS_ACCESS_KEY_ID`/`REMOTION_AWS_SECRET_ACCESS_KEY`; redeploy function on Remotion upgrades and site on source changes), **Node/Bun SSR** (`@remotion/renderer` on long-running servers), **Vercel Sandbox**, or the Express render-server template. Official starter templates exist for Next.js (App/Pages router), React Router 7, and an Express render server.

## Common Mistakes

Failure modes not already covered by the rules above (determinism, `interpolate()`-over-`spring()`, inline `defaultProps`, `type` over `interface`, `staticFile()`, `delayRender()`, frame-unit trimming, `toneFrequency`, and text-size minimums are stated once, in Mental Model / Timing / Compositions / Layout above — not repeated here):

| Mistake | Rule |
|---|---|
| `useFrame()` (@react-three/fiber), self-animating shaders/models | Forbidden — causes flicker; drive 3D from `useCurrentFrame()` |
| Expecting global frame inside `<Sequence>` | `useCurrentFrame()` is local — starts at 0 per sequence |
| Summing scene durations with `TransitionSeries` | Transitions overlap: total = scenes − transitions; overlays change nothing |
| Unpremounted sequences | Always `premountFor={1 * fps}` on `<Sequence>` |
| `useCurrentFrame()` in audio-viz child components | Pass the parent's `frame` down, or visualization jumps at sequence offsets |
| Rendering WebGL effects/3D without ANGLE | `--gl=angle` or `Config.setChromiumOpenGlRenderer('angle')` |
| Measuring text before fonts load | `await waitUntilDone()` first; `validateFontIsLoaded: true`; identical font props for measure and render; `outline`, not `border` |
| Overlay adjacent to a transition/overlay | Not allowed in `TransitionSeries` — separate with a sequence |

---
*Distilled from: remotion (official skills).*
