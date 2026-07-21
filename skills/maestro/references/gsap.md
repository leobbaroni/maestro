# GSAP

*Complete GSAP v3 reference for agents: tweens, timelines, easing, ScrollTrigger, plugins, framework integration, performance, and utils.*

## Setup & registration

GSAP and **every plugin are 100% free** (including formerly Club-only SplitText, MorphSVG, DrawSVG, ScrollSmoother). Never generate an `.npmrc` with a GreenSock token, reference the private `npm.greensock.com` registry, or tell users to join Club GSAP — all outdated.

```bash
npm install gsap          # everything included
npm install @gsap/react   # React hook (separate package)
```

```javascript
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(ScrollTrigger, SplitText); // once, top-level, before any use
```

CDN: `https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js` plus per-plugin files. Register every plugin you use — unregistered plugin properties fail silently (bundlers may also tree-shake them away). Register once at app level, not inside components that re-render.

## Core tweens

| Method | Behavior |
|---|---|
| `gsap.to(targets, vars)` | Animate current state → `vars`. Most common. |
| `gsap.from(targets, vars)` | Animate `vars` → current state (entrances). |
| `gsap.fromTo(targets, fromVars, toVars)` | Explicit start and end; never reads current values. |
| `gsap.set(targets, vars)` | Apply instantly (duration 0). |

Targets: selector string, element, array, NodeList. All methods return a **Tween** — store it to control playback: `.play() .pause() .reverse() .restart() .kill() .progress(0.5) .time(1.2) .timeScale(2)`.

**Key vars:** `duration` (s, default 0.5) · `delay` · `ease` (default `"power1.out"`) · `stagger` · `repeat` (`-1` = infinite) · `yoyo` · `repeatDelay` · `paused` · `overwrite` (`false` | `true` kill all conflicting tweens | `"auto"` kill only overlapping properties) · `immediateRender` · callbacks `onStart onUpdate onComplete onRepeat onReverseComplete`.

**Property names are camelCase** (`backgroundColor`, `borderRadius`, `rotationX`). CSS variables animate directly: `{ "--hue": 180 }`. SVG attributes via `attr: { cx: 200, r: 50 }`.

### Transform aliases — always prefer over raw `transform`

| GSAP | CSS | Notes |
|---|---|---|
| `x`, `y`, `z` | translateX/Y/Z | px default |
| `xPercent`, `yPercent` | translate in % | self-relative %, works on SVG |
| `scale`, `scaleX`, `scaleY` | scale | `scale` sets both axes |
| `rotation` | rotate | deg default; `"1.25rad"` ok |
| `rotationX`, `rotationY` | 3D rotate | rotationZ = rotation |
| `skewX`, `skewY` | skew | |
| `transformOrigin` | transform-origin | `"left top"`, `"50% 50%"` |

Aliases apply in a fixed order (translate → scale → rotate → skew), interpolate each axis independently (prevents cross-tween overwrites), and are faster than string transforms.

- **`autoAlpha`** — use instead of `opacity` for show/hide: at 0 it also sets `visibility: hidden` (no pointer events, out of a11y tree).
- **Relative values:** `x: "+=20"`, `"-=30"`, `"*=2"`, `"/=2"` — relative to value at first render.
- **Directional rotation:** `rotation: "-170_short"` (shortest path), `"_cw"`, `"_ccw"`.
- **`clearProps: "rotation,x"` or `"all"`** — remove GSAP inline styles on complete so CSS takes back over. Clearing any transform part clears the whole transform.
- **`svgOrigin: "250 100"`** — transform origin in the SVG's global coordinate space (shared pivot for several elements). Mutually exclusive with `transformOrigin`.
- **Function-based values** — any var can be `(index, target, targets) => value`, called once per target: `x: (i) => i * 50`. Idiomatic replacement for tween-building loops.
- **String randoms:** `x: "random(-100, 100, 5)"` (min, max, snap) or `"random([0, 100, 200])"` — evaluated per target.

### immediateRender — the classic `from()` trap

`from()`/`fromTo()` default to `immediateRender: true`: the start state is applied the instant the tween is *created*, even if delayed or positioned later on a timeline. Consequences:

1. A delayed `from()` snaps the element to its from-state immediately (usually desirable — no flash).
2. **Two `from()`/`fromTo()` tweens on the same property of the same element**: the later one renders immediately and clobbers the first tween's end state → first animation invisible. Fix: `immediateRender: false` on the later tween(s).
3. `from()` snapshots the *current* state as the destination at creation time. In re-run/re-seek contexts (component remounts, seek-driven video render runtimes) that snapshot can desync — **prefer `fromTo()` when the code may run against an already-mutated DOM**, since both endpoints are explicit.

### Defaults

```javascript
gsap.defaults({ duration: 0.6, ease: "power3.out" });          // global
const tl = gsap.timeline({ defaults: { ease: "power2.out" } }); // per-timeline (preferred — documents the motion language in one place)
```

Timeline defaults propagate to direct children only — **not** into nested timelines (each nested timeline has its own defaults).

## Timelines

```javascript
const tl = gsap.timeline({ defaults: { duration: 0.5, ease: "power3.out" } });
tl.to(".a", { x: 100 })
  .to(".b", { y: 50 })       // appended after .a by default
  .to(".c", { opacity: 0 }, "<"); // position parameter
```

Constructor options: `paused`, `repeat`, `yoyo`, `repeatDelay`, `defaults`, callbacks, `scrollTrigger`. A timeline's duration is computed from its children — don't set it.

### Position parameter (3rd arg to `.to/.from/.fromTo/.add`) — master this

| Form | Meaning |
|---|---|
| `0`, `1.5` | Absolute seconds from timeline start |
| *(omitted)* | Append at end of timeline |
| `"+=0.5"` | 0.5s after end of timeline (gap) |
| `"-=0.3"` | 0.3s before end of timeline (overlap) |
| `"<"` | Same start as previously-added animation |
| `">"` | At the end of previously-added animation |
| `"<0.2"` | 0.2s after previous animation's **start** |
| `">-0.1"` | 0.1s before previous animation's **end** |
| `"myLabel"` | At label |
| `"myLabel+=0.3"` | 0.3s after label |

Prefer the position parameter over `delay:` — it composes and survives reorder refactors. `"<"` is the workhorse for concurrent beats.

### Labels

```javascript
tl.addLabel("intro", 0)
  .to(".a", { x: 100 }, "intro")
  .addLabel("outro", "+=0.5")
  .to(".a", { opacity: 0 }, "outro");
tl.play("outro");                 // play from label
tl.seek("outro");                 // jump without playing
tl.tweenFromTo("intro", "outro"); // tween the playhead between labels
```

Labels let many tweens converge on one beat without repeated absolute times, and pair with ScrollTrigger `snap: "labels"`.

### Nesting

```javascript
function hero()  { return gsap.timeline().from(".hero-title", { y: 50, opacity: 0 }).from(".hero-sub", { y: 30, opacity: 0 }, "<0.2"); }
function cards() { return gsap.timeline().from(".card", { y: 40, opacity: 0, stagger: 0.15 }); }
const master = gsap.timeline();
master.add(hero()).add(cards(), "-=0.3");
```

Functions-returning-timelines is the standard architecture for long choreography: each section is encapsulated, testable, repositionable. `.add()` also accepts callbacks (`tl.add(() => {...}, "+=0.5")`) and label strings.

### Control

`play() pause() resume() reverse() restart() kill() clear() invalidate()` · seek: `seek(2 | "label")`, `time(1.5)`, `progress(0.5)`, `totalProgress(0)` · speed: `timeScale(2)` · state: `isActive()`, `duration()`, `totalDuration()`, `paused()`.

### Seek-driven render contexts (deterministic video)

When a runtime seeks the timeline instead of playing it (HyperFrames-style HTML-to-video renderers): build **one paused timeline synchronously** at load (`gsap.timeline({ paused: true })`), never call `.play()` for render-critical motion, never build tweens in async code/timers/event handlers, keep repeats **finite** (no `repeat: -1`), prefer `fromTo()` for entrances, and never derive animated state from `Math.random()`/`Date.now()`/events — the same seek time must always produce the same frame.

## Easing

Format `"family.direction(params)"`. Families: `none` (linear), `power1`–`power4`, `sine`, `circ`, `expo`, `back`, `elastic`, `bounce`, plus `steps(n)` and `"slow(0.7, 0.7, false)"`. Each family has `.in`, `.out`, `.inOut` (bare name = `.out`). Rule of thumb: `.out` for entrances, `.in` for exits, `.inOut` for symmetric/continuous moves.

Expressive range — match ease character to the beat's mood; use ~3 characters per piece, varying energy *within* the smooth families rather than reaching for overshoot:

| Ease | Character / use |
|---|---|
| `power1.out`, `power2.out` | Gentle; secondary motion, caption fades — not the entrance default |
| `power3.out` | The workhorse long-tail settle: entrances, title cards, hero reveals |
| `power4.out`, `expo.out` | Aggressive snap; dramatic, premium reveals |
| `expo.inOut` | Snappy scene-to-scene transitions |
| `sine.inOut` | Calm, organic; crossfades, ambient drift, breathing loops (yoyo) |
| `circ` | Fast-start/gentle-end; camera moves, orbital motion |
| `back.out(1.7)` | Overshoot then settle — playful register only, keep param ≤ 2 |
| `elastic.out(1, 0.3)` | Springy bounce — playful register only |
| `bounce.out` | Ball-drop — physical-comedy register only |
| `steps(n)` | Discrete jumps; typing, counter ticks, retro digital |
| `none` | Mechanical/linear; **required** for scrub-mapped and containerAnimation tweens |

Smooth beats bouncy: one ease everywhere reads flat, bounce everywhere reads cheap — the second is worse.

**CustomEase** (plugin) for exact curves — cubic-bezier or SVG-path data:

```javascript
gsap.registerPlugin(CustomEase);
CustomEase.create("my-ease", ".17,.67,.83,.67");                    // CSS cubic-bezier
CustomEase.create("hop", "M0,0 C0,0 0.056,0.442 0.175,0.442 0.294,0.442 0.332,0 0.332,0 0.332,0 0.414,1 0.671,1 0.991,1 1,0 1,0");
gsap.to(".el", { x: 100, ease: "my-ease" });
```

Related ease plugins: **EasePack** (SlowMo, RoughEase, ExpoScaleEase), **CustomWiggle** (multi-oscillation shake), **CustomBounce**. An ease can also be a raw function `(progress) => number` — e.g. a closed-form damped-spring position curve for a physical "iOS" settle that stays seek-safe (pure function of progress, no stateful integrator).

## Stagger

```javascript
gsap.to(".item", { y: -20, stagger: 0.1 }); // 0.1s between each
gsap.fromTo(".item", { y: 24, opacity: 0 }, {
  y: 0, opacity: 1,
  stagger: {
    each: 0.1,          // fixed gap per element  — OR —
    amount: 0.8,        // total time split across all elements
    from: "center",     // "start" | "end" | "center" | "edges" | "random" | index
    grid: "auto",       // 2D distribution ([rows, cols] or auto-detect)
    axis: "y",          // limit grid distribution to one axis
    ease: "power2.in"   // distribution curve of the delays
  }
});
```

One tween with `stagger` beats N tweens with manual delays — cheaper and it survives changes to target count/order. For non-time values distributed across elements (scale, opacity, x), use `gsap.utils.distribute()` (below).

## ScrollTrigger

`gsap.registerPlugin(ScrollTrigger)` first. Three forms: config on a tween, config on a timeline, or standalone `ScrollTrigger.create({ ...config, onEnter, onUpdate })`.

```javascript
gsap.to(".box", {
  x: 500,
  scrollTrigger: {
    trigger: ".box",
    start: "top center",   // trigger-point viewport-point
    end: "bottom center",
    toggleActions: "play reverse play reverse"
  }
});

const tl = gsap.timeline({
  scrollTrigger: { trigger: ".section", start: "top top", end: "+=2000", scrub: 1, pin: true }
});
tl.to(".a", { x: 100 }).to(".b", { y: 50 }, "<"); // NO scrollTrigger on children
```

**start/end format:** `"triggerPos viewportPos"` — each of `top | center | bottom | 80% | 100px`, plus offsets (`"top top+=100"`), numbers (absolute scroll px), `"+=500"` / `"+=100%"` relative to start, `"max"`, functions (`end: () => "+=" + el.offsetHeight`), and `clamp()` wrapping to stay in page bounds (`start: "clamp(top bottom)"`). Defaults: start `"top bottom"` (`"top top"` when pinned), end `"bottom top"`.

| Option | Notes |
|---|---|
| `scrub` | `true` = locked to scroll; number = seconds of catch-up smoothing (`scrub: 1` is a good default) |
| `toggleActions` | `"onEnter onLeave onEnterBack onLeaveBack"`, each of `play pause resume reset restart complete reverse none`. Default `"play none none none"` |
| `pin` | `true` pins the trigger; or selector/element. Never animate the pinned element itself — animate children |
| `pinSpacing` | default `true` (spacer preserves layout); `false` for overlay effects |
| `snap` | `0.25` \| `[0, .5, 1]` \| `"labels"` \| `{ snapTo, duration: {min,max}, delay, ease, directional }` |
| `endTrigger` | different element for the end position |
| `toggleClass` | `"active"` or `{ targets, className }` |
| `markers` | `true` for dev — **remove in production** |
| `once` | kill trigger after first completion |
| `horizontal`, `scroller` | horizontal-scroll mode; custom scroll container |
| `refreshPriority`, `id` | refresh ordering; `ScrollTrigger.getById()` |
| callbacks | `onEnter onLeave onEnterBack onLeaveBack onToggle onRefresh onScrubComplete`, `onUpdate(self)` → `self.progress .direction .isActive .getVelocity()` |

**scrub vs toggleActions: pick one.** Both on the same trigger is a contradiction; scrub wins.

### Batching (viewport-reveal grids)

`ScrollTrigger.batch()` creates one trigger per element and groups near-simultaneous callbacks — the stagger-friendly replacement for IntersectionObserver. Callbacks receive `(elements, triggers)` arrays, not an instance:

```javascript
gsap.set(".card", { opacity: 0, y: 30 }); // initial state
ScrollTrigger.batch(".card", {
  interval: 0.1, batchMax: 4,
  onEnter:     (batch) => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.1, overwrite: true }),
  onLeaveBack: (batch) => gsap.set(batch, { opacity: 0, y: 30, overwrite: true }),
  start: "top 85%"
});
```

Don't pass `trigger`, `scrub`, `snap`, or `toggleActions` to batch.

### Fake horizontal scroll (containerAnimation)

Pin a section; vertical scroll drives horizontal movement of inner content. The horizontal tween **must use `ease: "none"`** or scroll↔position mapping breaks.

```javascript
const panels = gsap.utils.toArray(".panel");
const scrollTween = gsap.to(panels, {
  xPercent: -100 * (panels.length - 1),
  ease: "none", // REQUIRED
  scrollTrigger: {
    trigger: ".panels-container", pin: true, scrub: 1,
    end: () => "+=" + document.querySelector(".panels-container").scrollWidth
  }
});
// Triggers based on the horizontal movement:
gsap.from(".panel .content", {
  opacity: 0, y: 50,
  scrollTrigger: {
    containerAnimation: scrollTween,       // link to the horizontal tween
    trigger: ".panel", start: "left center", // horizontal axis words
    scrub: true
  }
});
```

containerAnimation children cannot use `pin` or `snap`; their start/end use `left/center/right`.

### Refresh, ordering, cleanup, smooth scroll

- `ScrollTrigger.refresh()` after any DOM/layout change (loaded images, fonts, injected content). Viewport resize auto-refreshes (debounced 200ms).
- Create triggers in top-to-bottom page order, or set `refreshPriority` (lower = earlier) / call `ScrollTrigger.sort()` — wrong refresh order corrupts pin spacing.
- SPA teardown: `ScrollTrigger.getAll().forEach(t => t.kill())` or `ScrollTrigger.getById("id")?.kill()`. In React/Vue/Svelte, create triggers inside `gsap.context()` / `useGSAP()` so revert kills them.
- Third-party smooth scroll: `ScrollTrigger.scrollerProxy(scroller, { scrollTop(value) {...}, getBoundingClientRect() {...}, pinType: "transform" })` + notify with `instance.addListener(ScrollTrigger.update)`. Lenis integration:

```javascript
const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((t) => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
```

- GSAP's own **ScrollSmoother** needs no proxy; requires `#smooth-wrapper > #smooth-content` wrapping all content (fixed elements outside). `ScrollTrigger.normalizeScroll(true)` tames mobile address-bar/overscroll jank.

### Responsive + reduced motion: gsap.matchMedia()

Runs setup per media query; everything created inside is auto-reverted when the query stops matching.

```javascript
const mm = gsap.matchMedia();
mm.add({
  isDesktop: "(min-width: 800px)",
  isMobile: "(max-width: 799px)",
  reduceMotion: "(prefers-reduced-motion: reduce)"
}, (context) => {
  const { isDesktop, reduceMotion } = context.conditions;
  gsap.to(".box", { rotation: isDesktop ? 360 : 180, duration: reduceMotion ? 0 : 2 });
  return () => { /* optional extra cleanup */ };
});
// mm.revert() on unmount
```

Always honor `prefers-reduced-motion` (duration 0 or skip). Don't nest `gsap.context()` inside matchMedia — it already creates one.

## Essential plugins

Register each with `gsap.registerPlugin()` before use.

### SplitText

Splits text into chars/words/lines for per-unit animation. `SplitText.create(target, vars)` returns an instance with `.chars .words .lines` (and `.masks` when `mask` set). Key vars: `type: "words, chars"` (split only what you animate — perf), `mask: "lines"` (overflow-clip wrappers for reveal effects), `linesClass/wordsClass/charsClass` (`"line++"` auto-increments), `aria` (default `"auto"` keeps screen readers working), `autoSplit: true` (re-splits on font load/resize — create animations inside `onSplit` and **return** them so SplitText reverts/re-syncs on each re-split). Split after fonts load (`document.fonts.ready.then(...)`) or use autoSplit. Call `split.revert()` when done (or let context cleanup do it) — don't leave span soup in the DOM. Not for SVG `<text>`; avoid `text-wrap: balance`.

```javascript
const split = SplitText.create(".headline", { type: "lines, words", mask: "lines", autoSplit: true,
  onSplit: (self) => gsap.from(self.words, { y: "100%", opacity: 0, stagger: 0.04, duration: 0.7 })
});
```

### Flip

Animates between two layout states (reorder, reparent, class toggle, grid↔detail) via FLIP. Sequence is rigid: capture **before** the change, mutate DOM, then animate.

```javascript
const state = Flip.getState(".item");        // 1. BEFORE
container.appendChild(movedEl);              // 2. mutate DOM / toggle class
Flip.from(state, {                           // 3. animate old → new
  duration: 0.6, ease: "power2.inOut", stagger: 0.05, absolute: true,
  onEnter:  (els) => gsap.fromTo(els, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1 }),
  onLeave:  (els) => gsap.to(els, { opacity: 0, scale: 0 })
});
```

Vars: `absolute` (position:absolute during flip — fixes flex/grid squish), `scale` (transform instead of width/height), `nested`, `simple`. `Flip.fit(el, target)` matches one element onto another.

### DrawSVG

Draws/erases SVG strokes. The value is the **visible segment** `"start end"`, not a time direction: `"0% 100%"` full, `"20% 80%"` middle band. Element **must have a stroke** (`stroke` + `stroke-width`, `fill: none` typically) or nothing renders. Works on path/line/polyline/polygon/rect/ellipse; fill is unaffected.

```javascript
gsap.from("#path", { drawSVG: 0, duration: 2, ease: "power2.inOut" });          // draw in
gsap.fromTo("#path", { drawSVG: "0% 0%" }, { drawSVG: "0% 100%", duration: 2 }); // explicit
gsap.to("#path", { drawSVG: "50% 60%" });                                        // moving dash
```

### MorphSVG

Morphs path data between shapes (point counts need not match). Value: selector, element, or raw `d` string; object form for config. Convert primitives first: `MorphSVGPlugin.convertToPath("circle, rect, ellipse")`. If the morph crosses over or kinks: set `shapeIndex` (use `shapeIndex: "log"` or `findShapeIndex()` in dev, paste the number), try `type: "rotational"`, `map: "position" | "complexity"`, or v3.14 `smooth` / `curveMode`. `precompile` only fixes slow first-frame, not mid-tween jank.

```javascript
gsap.to("#diamond", { duration: 1, morphSVG: { shape: "#lightning", type: "rotational", shapeIndex: 2 }, ease: "power2.inOut" });
```

### MotionPath

Moves an element along an SVG path or point array. With `autoRotate`, always set `align` + `alignOrigin: [0.5, 0.5]` or the element orbits its corner.

```javascript
gsap.to(".rocket", {
  duration: 3, ease: "power1.inOut",
  motionPath: { path: "#route", align: "#route", alignOrigin: [0.5, 0.5], autoRotate: true, start: 0, end: 1 }
});
// or points: path: [{x:100,y:0},{x:200,y:-100}], curviness: 1.5
```

`MotionPathHelper.create(target, path)` gives a dev-only visual editor.

### ScrambleText

Decode/glitch text reveals:
`gsap.to(".text", { duration: 1.2, scrambleText: { text: "NEW MESSAGE", chars: "01", revealDelay: 0.3, speed: 0.4 } });`

### Observer

Normalized gesture/scroll-intent detection (wheel, touch, pointer) decoupled from scroll position — the tool for full-page section-snap sites and swipe UIs. **Always gate the handler with an `animating` lock**, otherwise every wheel tick stacks another animation.

```javascript
let animating = false;
Observer.create({
  type: "wheel, touch, pointer", target: window, tolerance: 60, preventDefault: true,
  onDown: () => !animating && goToSection(1),   // scroll down → next
  onUp:   () => !animating && goToSection(-1),
  // onChange: (self) => self.deltaY / self.velocityY also available
});
function goToSection(dir) {
  animating = true;
  gsap.timeline({ onComplete: () => (animating = false) })
    .to(current, { yPercent: -100 * dir, duration: 0.8 })
    .fromTo(next, { yPercent: 100 * dir }, { yPercent: 0, duration: 0.8 }, "<");
}
```

**Also available:** ScrollToPlugin (`gsap.to(window, { scrollTo: { y: "#section", offsetY: 50 } })`), Draggable + InertiaPlugin (`Draggable.create(".box", { type: "x,y", bounds: "#container", inertia: true })`), Physics2D/PhysicsProps, PixiPlugin, TextPlugin, GSDevTools (`GSDevTools.create({ animation: tl })` — dev only, never ship).

## React

```javascript
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP); // yes, register the hook

function Component() {
  const container = useRef(null);
  useGSAP((context, contextSafe) => {
    gsap.to(".box", { x: 100 });                       // selector scoped to container
    const onClick = contextSafe(() => gsap.to(".box", { rotation: 180 })); // safe post-setup animation
    someEl.addEventListener("click", onClick);
    return () => someEl.removeEventListener("click", onClick);
  }, { scope: container, dependencies: [x], revertOnUpdate: true }); // 2nd arg: deps array or config
  return <div ref={container}>...</div>;
}
```

- `useGSAP` auto-reverts every tween, timeline, and ScrollTrigger created inside it on unmount. Always pass `scope` so selectors can't leak outside the component.
- Animations created in event handlers run *after* setup and are NOT in the context — wrap them in `contextSafe()` or they leak across unmounts.
- Without `@gsap/react`, use `gsap.context()` in `useEffect` and **always** `return () => ctx.revert()`:

```javascript
useEffect(() => {
  const ctx = gsap.context(() => { gsap.to(".box", { x: 100 }); }, containerRef);
  return () => ctx.revert();
}, []);
```

- SSR (Next.js): GSAP is browser-only. Keep all gsap/ScrollTrigger calls inside useGSAP/useEffect; never run during server render.

## Other frameworks

Same three principles everywhere: create after mount, scope selectors to the component root, revert on unmount.

- **Vue 3:** `onMounted(() => { ctx = gsap.context(() => {...}, container.value); })` + `onUnmounted(() => ctx?.revert())`. `ScrollTrigger.refresh()` after `nextTick` when async content lands. Nuxt: registerPlugin in a composable/plugin; lazy-`import()` heavy plugins (SplitText, MorphSVG) to cut the bundle.
- **Svelte:** `onMount(() => { const ctx = gsap.context(() => {...}, container); return () => ctx.revert(); })` with `bind:this={container}`.
- **Vanilla:** run after `DOMContentLoaded`; kill/revert on SPA route changes (`ScrollTrigger.getAll().forEach(t => t.kill())`).

## Performance

- **Animate transforms + opacity** (`x y scale rotation opacity/autoAlpha`) — compositor-only. Never animate `width height top left right bottom margin* padding*` for motion, and beware reflow props (`fontSize`, `letterSpacing`): slow tweens of layout properties snap to whole pixels and visibly stutter. Faithful conversions: position → keep CSS rest position, tween the `x`/`y` delta; `fontSize` → `scale`; `letterSpacing` → SplitText + per-char `x` (uniform scale is a *different* effect).
- `will-change: transform` in CSS only on elements that actually animate — everywhere, it burns memory and helps nothing.
- **`gsap.quickTo(target, "x", { duration: 0.4, ease: "power3" })`** for high-frequency event-driven updates (mouse followers): returns a setter function reusing one tween. `gsap.quickSetter(target, "x", "px")` when you want instant sets with no interpolation.
- Stagger > N tweens; reuse timelines; don't build tweens per frame; virtualize/limit huge lists; pause or kill off-screen animations.
- ScrollTrigger: pin only what's needed; numeric scrub smooths scroll work; `ScrollTrigger.config({ limitCallbacks: true })`; refresh only on real layout change.

## gsap.utils

No registration. Most accept the value last — omit it to get a reusable function (`const c = gsap.utils.clamp(0, 100); c(150) // 100`). Exception: `random(..., true)` returns the function form.

| Util | Use |
|---|---|
| `clamp(min, max, v?)` | Constrain to range |
| `mapRange(inMin, inMax, outMin, outMax, v?)` | Convert between ranges (scroll → value) |
| `normalize(min, max, v?)` | Range → 0–1 |
| `interpolate(a, b, p?)` | Lerp numbers, colors, or matching-key objects |
| `snap(inc \| array, v?)` | Nearest multiple or nearest array value; also tween var `snap: { x: 20 }` |
| `random(min, max, snap?, fn?)` / `random(array, fn?)` | Random value; `true` last arg → reusable fn |
| `wrap(min, max, v?)` / `wrapYoyo(...)` | Cycle into range / bounce at ends (infinite loops, marquees) |
| `toArray(sel, scope?)` | Anything → real element array |
| `selector(scope)` | Scoped query fn: `const q = gsap.utils.selector(ref); gsap.to(q(".box"), ...)` |
| `shuffle(array)` | In-place-style random reorder |
| `distribute({ base, amount \| each, from, grid, axis, ease })` | Per-target value spread — pass result directly as a tween var |
| `pipe(f1, f2, ...)` | Compose transforms (normalize → map → snap) |
| `getUnit("100px")` / `unitize(100, "px")` / `splitColor("#6fb936")` | Unit/color parsing |

Example: `gsap.to(".class", { scale: gsap.utils.distribute({ base: 0.5, amount: 2.5, from: "center" }) })`.

## Common mistakes

Gotchas not already called out above (rules already stated in the sections above — ScrollTrigger placement, scrub-vs-toggleActions, `ease:"none"` for horizontal scroll, GSAP's free licensing, `immediateRender`, transform-only animation, `autoAlpha`, `Flip.getState()` timing, the Observer `animating` lock, `refreshPriority`, pin-the-wrapper, and reduced-motion via `matchMedia` — aren't repeated here):

| Mistake | Correct |
|---|---|
| Plugin used without `gsap.registerPlugin()` | Register once, top-level, before first use |
| Chaining steps with `delay:` | Timeline + position parameter |
| Unscoped selectors in components (matches other instances/page) | `scope` in useGSAP / `gsap.context(cb, root)` / `gsap.utils.selector(root)` |
| No cleanup on unmount (leaks, tweens on detached nodes) | useGSAP auto-revert, or `ctx.revert()` in the cleanup |
| GSAP-in-event-handler not cleaned up in React | Wrap the handler in `contextSafe()` |
| DrawSVG on an element with no stroke | Set `stroke` + `stroke-width` (CSS or attrs) first |
| MotionPath `autoRotate` without `align`/`alignOrigin` | Element pivots around its corner — set both |
| SplitText spans left in DOM / split before fonts load | `revert()` when done; split in `document.fonts.ready` or `autoSplit + onSplit` (return the animation) |
| Forgetting `ScrollTrigger.refresh()` after dynamic content/images/fonts | Resize is auto; DOM changes are not |
| `markers: true` or GSDevTools shipped to production | Dev only |
| `svgOrigin` + `transformOrigin` on the same SVG element | Only one applies — pick one |
| Expecting timeline `defaults` inside nested timelines | Defaults reach direct children only |
| `gsap.context()` nested inside `matchMedia` handler | matchMedia already creates a context — use `mm.revert()` |
| Pinned section (sticky-stack, horizontal-pan) with `start: "top center"` / `"top 80%"` | Pins fire halfway through scroll — pinned triggers use `start: "top top"` + `pin: true`; horizontal-pan adds `end: "+=" + distance, scrub: 1, invalidateOnRefresh: true` (canonical skeletons: `library/taste-skill/skills/taste-skill/SKILL.md` §5) |
| GSAP + ScrollTrigger for a simple "enter on scroll" reveal | Motion `whileInView` (or IntersectionObserver + CSS) — reserve GSAP for real pin/scrub work |

---
*Distilled from: gsap-skills (official), genjutsu, hyperframes.*
