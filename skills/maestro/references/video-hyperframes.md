# HyperFrames

*The write-HTML-render-video engine: composition contract, determinism rules, media handling, and the build loop.*

Sound design for a HyperFrames film follows `references/video-sound.md` — the pin-table discipline is engine-neutral, with one adaptation: the framework owns playback, so cues are declared and seeked, never `.play()`ed. Individual shot recipes from `references/video-shotcraft.md` adapt here too; its pipeline assumes Remotion, its motion vocabulary doesn't.

## Mental model

HyperFrames renders video from HTML. A composition is an HTML file whose DOM declares timing with `data-*` attributes, whose animation runtime is seekable, and whose media playback is owned by the framework. The renderer takes a time value and produces a pixel buffer — there is no "playback." Every frame is a fresh seek, possibly sampled out of order or in parallel, so every frame must be reproducible from its time value alone: same input time → same pixels.

Consequences:

- Each composition registers **exactly one** `gsap.timeline({ paused: true })` on `window.__timelines["<id>"]`, where the key equals the root's `data-composition-id`. Built synchronously at page load — never inside `async`, `Promise`, `setTimeout`, or event handlers (the renderer can sample before they finish).
- Never call `tl.play()`, `video.play()`, or `audio.play()`. The framework seeks the timeline and drives all media.
- Render duration comes from the root `data-duration`, not the GSAP timeline length.
- If you reach for `setTimeout`, `requestAnimationFrame`, or `addEventListener` to drive a visual, rebuild it as a tween on the timeline instead.

## Minimal composition

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
  <style>
    body { margin: 0; background: #0b0f14; color: #fff; font-family: Inter, sans-serif; }
    #root { position: relative; width: 1920px; height: 1080px; overflow: hidden; }
    .clip { position: absolute; inset: 0; display: grid; place-items: center; }
  </style>
</head>
<body>
  <div id="root" data-composition-id="main" data-start="0"
       data-width="1920" data-height="1080" data-duration="5">
    <section id="title-card" class="clip" data-start="0" data-duration="5" data-track-index="1">
      <h1 id="title">Hello HyperFrames</h1>
    </section>
  </div>
  <script>
    window.__timelines = window.__timelines || {};
    const tl = gsap.timeline({ paused: true });
    tl.from("#title", { y: 48, opacity: 0, duration: 0.6, ease: "power3.out" }, 0.2);
    window.__timelines["main"] = tl;
  </script>
</body>
</html>
```

Required: a sized root `<div>` with `data-composition-id` / `data-start="0"` / `data-width` / `data-height` / `data-duration`; at least one clip; a paused GSAP timeline registered under the composition id. The root needs explicit pixel dimensions — an unsized root silently collapses flex/`100%` children into the top-left corner, and no validator catches it. Fonts: just write the `font-family`; the compiler embeds supported fonts automatically (no `<link>`/`@import` needed).

## Data attributes

### Composition root

| Attribute | Required | Meaning |
|---|---|---|
| `data-composition-id` | Yes | Unique ID; must match the `window.__timelines` key. |
| `data-width` / `data-height` | Yes | Pixel frame size (`1920x1080`, `1080x1920`, `1080x1080`). |
| `data-duration` | Conditional | Render length in seconds. **Read once at compile time** — scripts or variables cannot change the root's render length; author it directly. Optional only when the runtime can infer duration (a registered GSAP timeline, finite CSS/WAAPI animation, or Lottie); required for Three.js, infinite animations, or no animation signal. |
| `data-fps` | No | Frame-rate hint; render flags can override. |
| `data-composition-variables` | No | JSON array of variable declarations — on `<html>`, not the root div. |

### Clips (timed children)

A clip is any element with `data-start`, `data-duration` (where required), and `data-track-index`. **`class="clip"` is required on visible timed elements** (`<div>`, `<img>`, …) — without it the runtime keeps the element visible for the whole composition. Omit it on `<video>` (framework manages visibility) and `<audio>` (no visual). **Clips must be DIRECT children of the composition root** — a clip nested in a wrapper `<div>` is not registered (a wrapped `<video>` renders black). To wrap or transform a clip, put the wrapper *inside* the clip.

| Attribute | Required | Meaning |
|---|---|---|
| `id` | Yes | Stable DOM id, unique across the **assembled** page (inside a sub-comp, prefix ids with the composition id — duplicate `<video>`/`<img>` ids render blank). |
| `data-start` | Yes | Start time in seconds, or a clip reference (below). |
| `data-duration` | For `div`, `img`, sub-comps | Duration in seconds. Video/audio can default to media length. |
| `data-track-index` | Yes | Timeline track; same-track clips must not overlap in time. |
| `data-media-start` | No | Offset into the media source, in seconds (skip intro without trimming the file). |
| `data-volume` | No | Static volume 0–1 (default 1). For fades, tween `volume` on the timeline instead. |
| `data-has-audio` | No | `<video>` only: `"true"` declares an audio track when auto-detection misses it. |

The visibility window is inclusive of both ends (`start ≤ t ≤ start + duration`), so the final frame holds the animation's resolved end state — a reveal landing exactly on `data-duration` still renders.

Authoring hints: `data-hidden` hides an element in both preview and render (non-destructive toggle); `data-layout-allow-overflow` marks intentional overflow for `check` (inherited down the subtree — scope it narrowly); `data-layout-ignore` excludes an element from layout audits. Legacy aliases: `data-layer` → `data-track-index`, `data-end` → `data-duration`.

### Tracks — temporal, not visual

`data-track-index` controls **temporal overlap only**: two clips on the same track must not overlap in time (lint flags it; render is undefined). Front/back stacking is CSS `z-index`, never track index. Convention: track 0 = base video, 1+ = visual scenes/overlays/captions, 10+ = audio.

### Relative timing

`data-start` accepts a clip id meaning "start when that clip ends", with optional `+ N` / `- N` offset (negative = overlap, which then requires different tracks):

```html
<video id="intro" data-start="0" data-duration="10" data-track-index="0" src="..."></video>
<video id="main"  data-start="intro"       data-duration="20" data-track-index="0" src="..."></video>
<video id="tail"  data-start="intro + 2"   data-duration="20" data-track-index="1" src="..."></video>
```

References resolve within the same composition only, the referenced clip needs a known duration, cycles are rejected, and a value that parses as a number is always absolute seconds.

## Sub-compositions

A sub-composition is a separate HTML file embedded in a host. The host wires it as a clip:

```html
<div id="chart" data-composition-id="data-chart"
     data-composition-src="compositions/data-chart.html"
     data-start="2" data-duration="8" data-track-index="2"
     data-width="1920" data-height="1080"></div>
```

Host attributes: `data-composition-id` (must exactly equal the file's internal id — no `-mount`/`-slot` renames), `data-composition-src`, plus its own `data-start`/`data-duration`/`data-track-index`/`data-width`/`data-height`. Optional: `data-variable-values` (per-instance JSON overrides), `data-var-src` / `data-var-text` bindings.

**The `<template>` is the transport container.** The runtime fetches the file, finds the `<template>`, and clones ONLY its contents — everything outside, including the entire `<head>`, is discarded. Sub-composition file shape:

```html
<body>
  <template>
    <style>
      #root { position: absolute; inset: 0; }  /* style the root by #root, never a class */
      .title { font-size: 120px; }
    </style>
    <div id="root" data-composition-id="data-chart" data-width="1920" data-height="1080">…</div>
    <script>
      window.__timelines = window.__timelines || {};
      const tl = gsap.timeline({ paused: true });
      window.__timelines["data-chart"] = tl;
    </script>
  </template>
</body>
```

Standalone top-level `index.html` is the opposite: root directly in `<body>`, **no** `<template>` wrapper (wrapping it hides everything).

Three pitfalls that pass static checks but break the render:

1. **`<style>`/`<script>` in `<head>` instead of inside `<template>`** → CSS/JS never reaches the live DOM; symptom is tiny unstyled text in the top-left and canvas-sized SVGs.
2. **Host id ≠ template id ≠ timeline key** → render logs `Sub-composition timelines not registered after 45000ms` and captures static initial-state frames.
3. **Styling the root by a class** → at render, each file's CSS is scoped to `[data-composition-id] S` (a descendant selector), so rules keyed on the root's own class silently drop. `#root` is special-cased and keeps matching. Symptom identical to pitfall 1 — and it looks perfect in preview.

Semantics: HyperFrames seeks each sub-composition's timeline independently — never `master.add(child)` a sub-timeline into the host (double-seeks). The host clip's `data-duration` is the slot's visible window: a shorter internal timeline holds its final frame; a slot shorter than the host goes blank when it ends. Inside sub-comps, prefer `gsap.fromTo()` over `gsap.from()` for entrances — `from()` records start state at registration and desyncs on re-seek.

## Sequencing scenes

Two valid architectures — don't mix them blindly:

**A. Timed clips / sub-compositions (modular).** Each scene is a clip (or sub-comp host) with its own `data-start`/`data-duration`; the framework mounts and unmounts scenes on time. Best for longer multi-scene videos, per-scene files, and reuse.

**B. Single-file GSAP-owned scenes (standalone).** All scenes are plain `<div class="scene">` children living in the DOM for the whole composition — **no `class="clip"` and no `data-*` on scene divs**; only the root carries `data-composition-id`/`data-start`/`data-duration`. Scene 1 is visible by default; scenes 2+ start with `opacity: 0` on the container, and GSAP reveals them. Best for choreographed scene *transitions*, where outgoing and incoming content must animate simultaneously.

Transition discipline (why: `references/video-direction.md`) in architecture B: every transition follows *position new scene → animate outgoing → swap → animate incoming → clean up overlays*, both halves at the same timeline position:

```js
const T = 4.0;
tl.to("#s1",   { yPercent: -100, filter: "blur(8px)", duration: 0.5, ease: "power3.in"  }, T);
tl.fromTo("#s2", { yPercent: 100 }, { yPercent: 0,    duration: 0.5, ease: "power3.out" }, T);
```

GPU shader transitions (domain-warp, whip-pan, sdf-iris, glitch, light-leak, …) come from the `@hyperframes/shader-transitions` package, installed via `npx hyperframes add <block>`; CSS and shader transitions can mix in one composition. Shader compositions capture DOM to WebGL textures, which adds CSS constraints (no `transparent` keyword in gradients — use the color at zero alpha; no `var()` on captured elements; explicit `background-color` on every scene matching the config's `bgColor`; `data-no-capture` to skip uncapturable decoratives).

## Determinism rules

Banned for visual state (breaks renders):

- `Date.now()`, `performance.now()`, any render-time clock.
- Unseeded `Math.random()` — use a seeded PRNG if you need random-looking placement.
- Render-time network fetches for required assets — inline or pre-bundle.
- Hover / scroll / pointer / focus state — the renderer has no input events.
- Autoplaying or looping media, and any manual `play()`/`pause()`/seek — the framework owns playback. (Lottie players likewise: `autoplay: false`, `loop: false`, registered so the framework seeks them.)
- `repeat: -1`. Compute a finite count: `repeat: Math.max(0, Math.floor(duration / cycleDuration) - 1)` — `floor`, not `ceil`.

Also avoid:

- Animating outside the visual-property allowlist: `opacity`, `x`, `y`, `scale`, `rotation`, `color`, `backgroundColor`, `borderRadius`, transforms. Never animate `display` or `visibility`. Never tween `width`/`height`/`top`/`left` for layout moves.
- `gsap.set()` on clip elements from later scenes (not in the DOM at load) — use `tl.set(selector, vars, time)` at or after the clip's `data-start`.
- Two timelines animating the same property on the same element at once (overwrite order can flip between renders).
- Measuring the DOM at tween time (`getBoundingClientRect()` in `onUpdate`) — compute layout constants once at setup.

Layout contract: build the visible end-state in static HTML/CSS first, then animate from/to it. Use padding/flex/grid, not hardcoded offsets, for main content; `position: absolute` for layers and decoratives. No `<br>` in body text — let text wrap via `max-width`. Transformed elements must be block-level and sized (transforms are a no-op on inline spans; scaling a 0-width element shows nothing). A full-screen scene fill goes on a full-bleed child (`position:absolute; inset:0`), never on the composition root itself — the compositor can drop the root's own background and render black.

Deterministic "randomness" and per-frame procedural visuals are fine when driven from timeline time: tween a proxy object (`tl.to(proxy, { time: 5, ease: "none", onUpdate: draw })`) and derive everything inside `draw` from `proxy.time` plus a seeded hash — same time, same pixels.

### Other runtimes

GSAP is the default for ~95% of motion. Others coexist by registering so the framework can seek them: Lottie players are created with `autoplay: false, loop: false` and pushed to `window.__hfLottie` (anything left autoplaying runs in wall-clock and renders non-deterministically); Three.js receives time via the `hf-seek` event and **requires** an explicit root `data-duration` (duration is not inferable); finite CSS keyframes and WAAPI `element.animate()` calls are auto-inferred, but infinite iteration counts are not — give the root a `data-duration`.

## Variables & media

**Variables** are declared on `<html>` as an **array of declarations**; values are supplied as an **object keyed by id** (don't confuse the two shapes):

```html
<html data-composition-variables='[
  {"id":"title","type":"string","label":"Title","default":"Hello"},
  {"id":"accent","type":"color","label":"Accent","default":"#66d9ef"}
]'>
```

Types: `string`, `number`, `color`, `boolean`, `enum` (requires `options`). Always set useful defaults. Prefer declarative bindings — `data-var-src="id"` substitutes an element's `src` (authored `src` = fallback), `data-var-text="id"` substitutes its text (children preserved) — and every scalar variable is auto-applied as a `--{id}` CSS custom property on the root, so `var(--accent)` just works. For logic beyond substitution, read once at init via `window.__hyperframes.getVariables()` — variables don't change mid-render. Override per render with `render --variables '{"title":"Q4"}'` / `--variables-file`, per sub-comp instance with `data-variable-values`.

**Media.** `<video>`/`<audio>` must be a **direct child of the host composition root** (`index.html`) — never inside a sub-comp `<template>` or any wrapper `<div>`, or it is never seeked/decoded and renders blank/black, and no validator catches it. Video is `muted playsinline`; sound always travels on a separate `<audio>` element, even from the same source file:

```html
<video id="a-roll" class="clip" src="assets/demo.mp4"
       data-start="0" data-duration="12" data-track-index="0" muted playsinline></video>
<audio id="a-roll-audio" src="assets/demo.mp4"
       data-start="0" data-duration="12" data-track-index="10" data-volume="1"></audio>
```

Rules: never call play/pause/seek; never animate a timed media element's dimensions (animate an untimed wrapper positioned around it — the framework forces `opacity: 1` on active timed elements, so opacity tricks also go on a wrapper); a sub-comp timeline cannot reach host elements, so all motion on host media is authored on the main timeline at global time; trim with `data-media-start`; fade volume by tweening `volume` on the timeline (`tl.to("#bgm", { volume: 0, duration: 1 }, t)`), keeping `data-volume` as the static baseline; add `crossorigin="anonymous"` for external media needing canvas capture.

### Recurring patterns

- **Picture-in-picture:** the `<video>` (with its `data-*` timing) fills an untimed wrapper div; GSAP animates the wrapper's position/size/borderRadius. The wrapper carries NO data attributes.
- **Hidden-then-revealed media:** the framework forces `opacity: 1` on any active timed element, so CSS/GSAP opacity on the media element itself is silently overwritten — put the opacity on an untimed wrapper div.
- **Synchronized overlay cutout** (text behind a subject): base mp4 at z1, headline at z2, transparent-webm cutout of the subject at z3 in an opacity-0 wrapper flipped visible at the cut. Start both videos at the same `data-start` so they decode in sync — late-mounting the overlay causes a one-frame jitter at the cut.
- **Slideshow:** sibling elements on the same track, each with its own consecutive `data-start`/`data-duration` window — the framework handles mount/unmount; no transition code needed for hard cuts.

## Storyboard → build workflow

Plan in `STORYBOARD.md` — one markdown file Studio renders as a contact sheet. YAML frontmatter carries global direction (`format`, `message`, `arc`, `audience`); one `## Frame N — Title` section per frame with `- key: value` bullets (`status`: outline → built → animated, `src`, `duration`, `transition_in`, `scene`, `voiceover`, `poster`) and free-form narrative below. Unknown keys are preserved; the parser is lenient and never throws.

```markdown
---
format: 1920x1080
message: "Ship a launch video in an afternoon"
arc: Hook → Problem → Solution → Proof → CTA
---

## Frame 1 — Hook
- scene: Big type punches in on the beat
- duration: 3s
- transition_in: cut
- voiceover: "Ship a launch video in an afternoon."
- src: compositions/frames/01-hook.html
```

Locked narration for TTS lives in a separate free-form `SCRIPT.md` (only when the video has VO).

The loop: scaffold → write the storyboard and get it approved → build each frame as a sub-composition (`status` advancing as you go) → wire frames into `index.html` → check → preview → render. Editing an existing composition: read files first; preserve unrelated timing, tracks, ids, variables, and media paths; new clips go on non-overlapping tracks.

## CLI loop

Everything runs through `npx hyperframes` (Node ≥ 22 + FFmpeg).

| Command | One line |
|---|---|
| `npx hyperframes init my-video` | Scaffold a project (or `capture <url>` to seed from a site). |
| `npx hyperframes add <name>` | Install a registry block/component (shader transitions, prebuilt scenes). |
| `npx hyperframes lint` | Fast static checks — run early and often while writing. |
| `npx hyperframes check` | The browser gate: lint + runtime errors + layout/overflow + motion verification + contrast in one seek pass; must pass with 0 findings. |
| `npx hyperframes snapshot --at <t1>,<t2>,…` | Capture frames at chosen timestamps; required eyeball pass when sub-compositions exist (catches the three mount pitfalls nothing else does). |
| `npx hyperframes preview` | Open Studio — the user can edit anything on the timeline; pause here and ask before rendering. |
| `npx hyperframes render --quality draft\|high --output out.mp4` | Render the MP4 — only after the user approves; verify the output file exists and has plausible size. |

Render is user-gated: never auto-render just because checks pass.

---

*Distilled from: hyperframes-core, hyperframes-cli, hyperframes-creative, hyperframes-animation.*
