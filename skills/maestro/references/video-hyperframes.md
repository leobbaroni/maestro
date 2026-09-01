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

**`data-start` is what makes an element a clip.** The runtime collects `[data-start]` and drives visibility from it, so any element carrying it is timed — that attribute alone, nothing else.

**`class="clip"` is a convention, not a requirement**; the runtime never reads it. Keep writing it anyway, for three reasons that are not visibility: the scaffold's shared `.clip { position: absolute; inset: 0 }` is what gives a scene its full-frame box, Studio uses it as an edit hint, and `lint` warns (`timed_element_missing_clip_class`) when a timed element lacks it. Drop the class and you owe that layout yourself. Omit it on `<video>` and `<audio>`.

**Nesting is allowed.** A timed element inside a wrapper is still timed, and a timed ancestor **clamps** its descendants — a child cannot be visible while its timed ancestor is hidden, which is the useful part. The real difference is layout, not registration: **direct children of the composition root get automatic layout** (the runtime forces `position: absolute`, anchors them at `top: 0; left: 0`, and sizes them to 100% when they have no computed size, so scenes stack in one viewport layer), while **nested clips get none and must position themselves.** An element *without* `data-start` is skipped by that pass entirely, so an untimed full-bleed background needs its own `position: absolute; inset: 0` or it collapses to zero height.

| Attribute | Required | Meaning |
|---|---|---|
| `id` | **Yes on `<video>`/`<audio>`**, recommended elsewhere | Stable DOM id, unique across the **assembled** page (inside a sub-comp, prefix ids with the composition id — duplicate `<video>`/`<img>` ids render blank). Media without one is a `lint` **error** (`media_missing_id`), and an id-less `<audio>` is never mixed — **the render comes out silent**. Elsewhere it is a warning (`studio_missing_editable_id`): Studio needs a stable edit target. |
| `data-start` | Yes | Start time in seconds, or a clip reference (below). |
| `data-duration` | For `div`, `img`, sub-comps | Duration in seconds. Video/audio can default to media length. With no resolvable duration the element has no end and stays visible for the rest of the composition. |
| `data-track-index` | **No** | Studio timeline lane, **display only** — see below. |
| `data-media-start` | No | Offset into the media source, in seconds (skip intro without trimming the file). |
| `data-volume` | No | Static gain, default `1` (0 dB). `0` is silence; values above `1` boost, up to **`3.98`** (+12 dB) — Studio's fader writes this. For fades, tween `volume` on the timeline instead; a tween's values replace this baseline entirely. |
| `data-has-audio` | No | `<video>` only: `"true"` declares an audio track when auto-detection misses it. |

**The visibility window is half-open: `[start, start + duration)`.** A clip shows while `start ≤ t < start + duration` and is **hidden at exactly `t = start + duration`**. So land an animation's resolved end state slightly *before* `data-duration`, never on it — a reveal that finishes exactly on the boundary has its last frame dropped, and the failure is silent because every other frame looks right. The compensation is that two clips can be authored back to back (`b.start === a.start + a.duration`) with no overlapping frame at all.

Authoring hints: `data-hidden` hides an element in both preview and render (non-destructive toggle); `data-layout-ignore` excludes an element from layout audits. Legacy aliases: `data-layer` → `data-track-index`, `data-end` → `data-duration`.

**Layout waivers are per-defect, not general.** `check` treats a layout error as a defect unless a snapshot proves the layering is deliberate, and then you mark it with the *specific* waiver: `data-layout-allow-overflow`, `data-layout-allow-overlap`, `data-layout-allow-occlusion`, or `data-layout-allow-caption-zone` for intentional lower-third and caption-band copy sitting inside `--caption-zone`. Each silences only its own audit — the caption waiver does not excuse overflow — so pair them when a region genuinely needs two. All apply to the marked element and every descendant, so scope them to the narrowest wrapper that owns the intentional behavior.

**Declare a WebGPU dependency.** A composition that cannot render without WebGPU gets `data-requires-webgpu` on its composition root; without it, local capture silently screenshots the no-GPU fallback when auto-detection picks software rendering, and you get a clean-looking render of the wrong thing. With it, capture fails loudly instead. Inside a WebGPU adapter, register queue completion **synchronously** in the seek handler — `e.detail.waitUntil(device.queue.onSubmittedWorkDone())` — so the framework waits for submitted GPU work before screenshotting. And handle a repeated seek at the same time as a re-render of that exact time, never as a step forward: while Studio is paused the same timestamp is re-dispatched to keep the swapchain presented, and advancing simulation state on it is how a paused composition drifts.

### Tracks — a display lane, and nothing else

**`data-track-index` is the row a clip occupies in Studio's timeline. The render never reads it, and it constrains nothing.** Two clips on the same track may overlap in time — nothing rejects it and the result is well defined: both are visible, painted in CSS order. Omitting the attribute is fine; the parser defaults it and Studio gives each clip its own lane. A clip on track `5` is not "above" one on track `1`: **layering is CSS `z-index`, sequencing is `data-start`/`data-duration`**, and track index is neither.

The one place the value carries meaning: two `<audio>` elements sharing a track index **and** overlapping in time raise a `lint` warning (`duplicate_audio_track`) — a useful nudge that you are about to double up a bed.

So picking an index is purely a readability choice for whoever opens the file in Studio. The usual convention still reads well — track 0 for base video, 1+ for scenes, overlays and captions, 10+ for audio — but when adding a clip you never need to hunt for a free lane, and you never need to renumber after a retime.

### Relative timing

`data-start` accepts a clip id meaning "start when that clip ends", with optional `+ N` / `- N` offset — a negative one produces overlap, which is exactly how a crossfade is authored and needs no separate track:

```html
<video id="intro" data-start="0" data-duration="10" data-track-index="0" src="..."></video>
<video id="main"  data-start="intro"       data-duration="20" data-track-index="0" src="..."></video>
<video id="tail"  data-start="intro + 2"   data-duration="20" data-track-index="1" src="..."></video>
```

References resolve within the same composition only, the referenced clip needs a known duration, cycles are rejected, and a value that parses as a number is always absolute seconds.

### Cutting one source into several ranges

A hard cut, trim, splice, or reorder is **not** a keyframe problem — do not try to animate source cutting. Duplicate the same video source into several clip elements; each copy picks its range with `data-media-start` + `data-duration` and places that range on the authored timeline with `data-start`. Reordering the cut means changing those offsets, nothing more.

When audio is authored separately, give each audio copy the **identical** source range and timing as its matching video clip (`data-media-start`, `data-duration`, `data-start`), keep the video muted, and let the audio elements carry the sound. A mismatch here is the classic drift where picture and sound diverge a few cuts in.

**Constant `data-playback-rate` is render-safe** for both picture and pitch-preserved sound. It does **not** make source speed ramps keyframeable — a ramp or a mid-source freeze is preprocessed in the media, not expressed on the timeline.

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

- CSS `transition` on any element the timeline animates — transitions interpolate on wall-clock time independently of the seek and flicker under out-of-order sampling. Hint the compositor with `will-change: transform` instead when many tweens run at once.

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

**Media.** `<video>`/`<audio>` seek and decode at **any nesting depth** — host root, a wrapper `<div>`, or inside a sub-comp `<template>`. The runtime finds media with a flat document query, resolves each element's owning composition, and rebases its local `data-start` by the accumulated start of every ancestor composition. Placement is a **timeline** decision, not a correctness one: media at the host root is animated by the main timeline at global time; media inside a scene's sub-comp is animated by that sub-comp's own timeline at scene-local time — and a sub-comp timeline can never reach host elements. A blank or black panel is a real bug, not a placement symptom — treat it as render-blocking. Video is `muted playsinline`; sound always travels on a separate `<audio>` element, even from the same source file:

```html
<video id="a-roll" class="clip" src="assets/demo.mp4"
       data-start="0" data-duration="12" data-track-index="0" muted playsinline></video>
<audio id="a-roll-audio" src="assets/demo.mp4"
       data-start="0" data-duration="12" data-track-index="10" data-volume="1"></audio>
```

Rules: never call play/pause/seek; never animate a timed media element's dimensions (animate an untimed wrapper positioned around it — the framework forces `opacity: 1` on active timed elements, so opacity tricks also go on a wrapper); a sub-comp timeline cannot reach host elements, so motion on host-root media is authored on the main timeline at global time — or keep the media inside the sub-comp whose timeline drives it, at scene-local time; trim with `data-media-start`; fade volume by tweening `volume` on the timeline (`tl.to("#bgm", { volume: 0, duration: 1 }, t)`), keeping `data-volume` as the static baseline; add `crossorigin="anonymous"` for external media needing canvas capture.

### Recurring patterns

- **Picture-in-picture:** the `<video>` (with its `data-*` timing) fills an untimed wrapper div; GSAP animates the wrapper's position/size/borderRadius. The wrapper carries NO data attributes.
- **Hidden-then-revealed media:** the framework forces `opacity: 1` on any active timed element, so CSS/GSAP opacity on the media element itself is silently overwritten — put the opacity on an untimed wrapper div.
- **Synchronized overlay cutout** (text behind a subject): base mp4 at z1, headline at z2, transparent-webm cutout of the subject at z3 in an opacity-0 wrapper flipped visible at the cut. Start both videos at the same `data-start` so they decode in sync — late-mounting the overlay causes a one-frame jitter at the cut.
- **Slideshow:** sibling elements on the same track, each with its own consecutive `data-start`/`data-duration` window — the framework handles mount/unmount; no transition code needed for hard cuts.

## Storyboard → build workflow

Plan in `STORYBOARD.md` — one markdown file Studio renders as a contact sheet. YAML frontmatter carries global direction (`format`, `duration`, `message`, `arc`, `audience` — `duration` is the brief's advisory length expectation that assembly reports the actual cut against, not a gate); one `## Frame N — Title` section per frame with `- key: value` bullets (`status`: outline → built → animated, `src`, `duration`, `transition_in`, `scene`, `voiceover`, `poster`) and free-form narrative below. Unknown keys are preserved; the parser is lenient and never throws.

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
| `npx hyperframes init my-video` | Scaffold a project (or `capture <url>` to seed from a site). Set the aspect at scaffold time with `--resolution landscape\|portrait\|square` (or their `-4k` variants) rather than resizing later. |
| `npx hyperframes catalog --query "<what the beat should do>"` | **Rank the registry against a plain-language description.** No positional argument — the query is a flag. Default tier is **`words`**: shared vocabulary against each item's name, title, description, and tags, so phrasing that shares no words with the entry misses. `--on-device` opts into meaning-ranking locally. |
| `npx hyperframes add <name>` | Install a registry block/component (shader transitions, prebuilt scenes) — including whatever the search surfaced. |
| `npx hyperframes lint` | Fast static checks — run early and often while writing. |
| `npx hyperframes check` | The browser gate: lint + runtime errors + layout/overflow + motion verification + contrast in one seek pass; must pass with 0 findings. |
| `npx hyperframes snapshot --at <t1>,<t2>,…` | Capture frames at chosen timestamps; required eyeball pass when sub-compositions exist (catches the three mount pitfalls nothing else does). |
| `npx hyperframes preview` | Open Studio — the user can edit anything on the timeline; pause here and ask before rendering. |
| `npx hyperframes render --quality draft\|high --output out.mp4` | Render the MP4 — only after the user approves; verify the output file exists and has plausible size. |

**Search before you hand-build.** The catalog is now queryable in plain language on this machine — by shared vocabulary out of the box, and by meaning under `--on-device` — which removes the last excuse for reimplementing a section that already exists: the old failure was not knowing the block's name, and naming is exactly what the query removes. Because the default tier is lexical, a miss is often a vocabulary mismatch rather than an absent block; re-word once before concluding nothing fits. When the on-device tier answered and nothing in the top hits does the job, report the gap rather than silently hand-building: `npx hyperframes feedback --search-miss "<the query you ran>" --wanted "<the move you needed>" --tier on-device`. It is the only route that transmits a query anywhere, so treat it as outbound and keep the wording generic. Make it step two of the loop, after `init` and before authoring: a block you find is tuned, tested, and rendered deterministically; the one you write at 2am is none of those.

Render is user-gated: never auto-render just because checks pass.

**Three different timeouts, and only one is a wall clock.** `--timeout` bounds page navigation and render-readiness (defaults 10000 / 3000 ms). `--capture-budget` is a separate *cooperative* budget for the work after navigation — fonts, assets, vision, contact sheets — and it cannot interrupt native work already in flight. Whatever deadline the caller wraps around the command is a third one, and when it fires the capture's result is simply unknown: it does not prove the capture failed. Raise `--timeout` for a slow site and `--capture-budget` for a heavy page, rather than shortening an outer deadline and reading the timeout as a verdict.

---

*Distilled from: hyperframes-core, hyperframes-cli, hyperframes-creative, hyperframes-animation.*
