# Motion on the Web

*Choosing and using the implementation layer — modern CSS, WAAPI, Motion (prev. Framer Motion), anime.js — for the motion designed in `references/motion-principles.md`.*

## Choosing the Engine

| Job | Engine |
|---|---|
| < 3 animations on the page; single-element motion | CSS native |
| Scroll-driven reveal / parallax / progress | CSS `animation-timeline` (fallback: IntersectionObserver) |
| Enter/exit from `display: none` (dialogs, popovers) | CSS `@starting-style` + `transition-behavior: allow-discrete` |
| Page transitions (SPA or MPA) | View Transitions API |
| Tooltip / popover positioning | Popover API + CSS anchor positioning |
| JS-generated keyframes without a library | WAAPI (`element.animate`) |
| React UI: exit animations, shared layout, gestures, springs | Motion (`motion/react`) |
| Vanilla JS springs / independent transforms / scroll-linked without React | Motion vanilla (`import { animate, scroll } from "motion"`) |
| Complex multi-step timelines (5+ tweens), cinematic scroll scenes, SVG morphing | GSAP — see `references/gsap.md` |
| Compact SVG/DOM flourishes, imported anime.js examples | anime.js |
| Physics-based spring with interruption | Motion (React) or GSAP |

Rule of thumb: if it fits in `@keyframes` + one `animation-timeline`, stay in CSS. The moment you need imperative control, sequence coordination, or runtime values, reach for a library. Motion for React component UI; GSAP for timeline-shaped work.

## Modern CSS

### Transitions & keyframes

```css
/* Never `transition: all` — it fires on every property change and blocks optimization */
.card { transition: opacity 300ms cubic-bezier(0.2, 0, 0, 1),
                    transform 300ms cubic-bezier(0.2, 0, 0, 1); }
```

- Prefer the individual `translate`, `scale`, `rotate` properties over the `transform` shorthand when axes animate independently — they transition separately without clobbering each other.
- Enter/exit pairs: define both keyframes; exit ≈ 70% of enter duration with ease-in.
- Stagger with custom properties instead of duplicated rules:

```css
.item { animation: fade-up 300ms ease-out both;
        animation-delay: calc(var(--i, 0) * 50ms); }
/* <li style="--i: 0">, <li style="--i: 1">, ... */
```

### linear() easing — springs in pure CSS

`linear(0, 0.25, ..., 1.017, 1)` approximates spring/bounce curves with sampled stops. Generate stops from a spring config with a linear-easing generator (Easing Wizard, easing.dev — see `references/toolbox.md`); use for one-off bouncy entrances without JS.

### @starting-style — animate from display:none

```css
.dialog {
  opacity: 1; transform: translateY(0);
  transition: opacity 300ms ease, transform 300ms ease,
              display 300ms allow-discrete, overlay 300ms allow-discrete;
  @starting-style { opacity: 0; transform: translateY(-1rem); }
}
.dialog:not([open]) { opacity: 0; transform: translateY(-1rem); display: none; }
```

- `@starting-style` defines the "from" state on first render; `allow-discrete` makes `display`/`overlay` transitionable (exit animation completes before removal).
- Combine with `<dialog>` / `[popover]` for fully native animated modals — zero JS animation code. Popovers get light-dismiss, top-layer stacking (no z-index wars), and accessibility for free.
- Baseline-supported; guard only the `allow-discrete` part with `@supports (transition-behavior: allow-discrete)`.

### Scroll-driven animations

```css
/* Scroll progress: page-level (progress bars, header effects) */
.progress { animation: grow linear both; animation-timeline: scroll(root block); }

/* View progress: element enters/exits the scrollport (reveals) */
.reveal {
  animation: fade-in linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;   /* animate during entry only */
}
@keyframes fade-in { from { opacity: 0; transform: translateY(2rem); } }
```

- `animation-range` named ranges: `cover`, `contain`, `entry`, `exit`; mix, e.g. `entry 25% exit 75%`.
- Use `animation-fill-mode: both`, not `forwards` — `forwards` can lock the final state when scrolling back.
- The animation's easing must be `linear` — scroll position is the easing.
- **Always progressive:** content visible by default, animation added inside `@supports (animation-timeline: scroll())`. Never hide content behind a scroll animation. Legacy fallback: IntersectionObserver toggling a class (unobserve after firing once).

### View Transitions API

```js
// SPA: wrap the DOM update
document.startViewTransition
  ? document.startViewTransition(updateDOM)
  : updateDOM();
```

```css
::view-transition-old(root) { animation: fade-out 200ms ease-in; }
::view-transition-new(root) { animation: fade-in 300ms ease-out; }

/* Shared-element morph: same view-transition-name on both states */
.card-thumb  { view-transition-name: hero; }   /* outgoing */
.detail-hero { view-transition-name: hero; }   /* incoming */
::view-transition-group(hero) { animation-duration: 400ms;
                                animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }
```

- MPA: add `@view-transition { navigation: auto; }` to both pages — unknown rule is safely ignored by older browsers.
- `view-transition-class` styles groups of transitions at once (`::view-transition-group(*.card)`).
- Guard styles with `@supports (view-transition-name: none)`; always feature-detect `startViewTransition`. Include a reduced-motion kill for `::view-transition-*` pseudo-elements.

### Popover + anchor positioning

```css
.trigger { anchor-name: --trigger; }
.tooltip[popover] {
  position: fixed;                 /* escapes overflow clipping */
  position-anchor: --trigger;
  position-area: top center;
  position-try-fallbacks: --bottom;  /* always define — avoids viewport clipping */
}
@position-try --bottom { position-area: bottom center; }
```

Combine with `@starting-style` for animated tooltips. Anchor positioning is not yet universal — guard with `@supports (anchor-name: --a)` and fall back to `position: absolute` in a relative wrapper (or Floating UI in JS-heavy apps). Portals (`createPortal` / `<Teleport>`) remain the framework escape hatch for overflow-clipped dropdowns.

## WAAPI

Native browser keyframes with JS-created timing — no dependency, fully seekable (`animation.currentTime`), good for generated animations from data.

```js
const anim = el.animate(
  [ { transform: "translateY(24px)", opacity: 0 },
    { transform: "translateY(0)",    opacity: 1 } ],
  { duration: 250, easing: "cubic-bezier(0.2, 0, 0, 1)", fill: "both" }
);

// Stagger
items.forEach((item, i) =>
  item.animate(keyframes, { duration: 250, delay: i * 50, easing: "ease-out", fill: "both" }));
```

- `fill: "both"` so the element holds its end states; keyframe `offset` (0-1) positions intermediate frames.
- `document.getAnimations()` returns every running animation (CSS ones included) for global control — pause, seek, or speed-shift everything at once.
- Control: `anim.pause() / play() / reverse() / finish()`; `anim.finished` is a promise — fine for chaining polish, but don't gate critical UI state on it.
- For deterministic/seekable contexts (renderers, scrubbed timelines): finite `duration` and `iterations` always; infinite iterations have no computable end time.

## Motion (prev. Framer Motion)

Framer Motion became independent in Nov 2024 and is now **Motion** (repo `motiondivision/motion`, MIT, v12+): one library serving React, vanilla JS, and Vue.

- **Install `motion`, never `framer-motion`.** React: `import { motion, AnimatePresence } from "motion/react"` (RSC entry: `"motion/react-client"`). The `framer-motion` package still publishes in lockstep and `motion` wraps it — existing code isn't broken, but new code uses `motion`.
- **Vanilla is first-class**: `import { animate, scroll, inView, hover, press, stagger } from "motion"` — springs and independent transforms (`x`, `rotateY`) work without React. `motion/mini` is a ~2.3kb WAAPI-only `animate()` (no springs/independent transforms).
- **Vue**: `npm install motion-v` (`<motion.div />`).
- **No API renames in the rebrand** — `AnimatePresence`, `layoutId`, `useAnimate`, `useScroll` keep their names; v12 has zero React breaking changes. Legacy migrations that DO apply: `AnimateSharedLayout` is long removed (use `layoutId` + `LayoutGroup`); `exitBeforeEnter` → `mode="wait"`.
- **Motion+ components are paid** — `Cursor`, `Ticker`, `AnimateNumber`, `Carousel`, `Typewriter`, `ScrambleText`, `splitText`, `Curtains` are NOT in the free package; never generate imports for them. (GSAP's SplitText/ScrambleText are free — route text-splitting there: `references/gsap.md`.)

### Basics

```tsx
<motion.div
  initial={{ opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ type: "spring", stiffness: 300, damping: 25 }}
/>
```

- Changing `animate` re-animates automatically. `initial={false}` skips the mount animation.
- Transition types: `spring` (default for transforms), `tween` (`{ duration, ease }` — presets `"easeOut"` etc. or `[0.2, 0, 0, 1]`), `inertia` (drag momentum). Per-value configs: `transition={{ x: { type: "spring" }, opacity: { duration: 0.2 } }}`.

### AnimatePresence — exit animations

```tsx
<AnimatePresence mode="wait">
  {isOpen && (
    <motion.div key="modal"            /* REQUIRED — no key, no exit */
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.15, ease: "easeIn" }} />
  )}
</AnimatePresence>
```

Modes: `sync` (default, enter+exit together), `wait` (exit finishes first — page transitions), `popLayout` (exiting element leaves the flow immediately — lists). `onExitComplete` fires when all exits finish.

### Variants — orchestration & stagger

```tsx
const container = { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

<motion.ul variants={container} initial="hidden" animate="show">
  {items.map(i => <motion.li key={i.id} variants={item} />)}
</motion.ul>
```

Variant labels propagate to motion children automatically — children need only `variants`. Orchestration keys: `staggerChildren`, `delayChildren`, `staggerDirection: -1` (reverse), `when: "beforeChildren" | "afterChildren"`.

### Layout animations

```tsx
<motion.div layout />                      /* animates position/size on layout change */
<motion.div layoutId="tab-highlight" />    /* shared element — morphs between components */
```

- `layout="position" | "size"` restricts what animates. Layout animations FLIP under the hood — layout changes animate via transforms, no reflow per frame.
- Requires a **stable key** (`key={item.id}`, never `Math.random()`).

### Gestures & scroll

```tsx
<motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
  transition={{ type: "spring", stiffness: 400, damping: 30 }} />

<motion.div drag="x" dragConstraints={{ left: -100, right: 100 }} dragElastic={0.2}
  onDragEnd={(e, info) => info.offset.x > 100 && onSwipe("right")} />

<motion.div whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} />
```

### Motion values — reactive without re-render

```tsx
const x = useMotionValue(0);
const opacity = useTransform(x, [-200, 0, 200], [0, 1, 0]);
const smooth = useSpring(x, { stiffness: 300, damping: 30 });

const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -300]);

useMotionValueEvent(x, "change", latest => { /* no re-render */ });
<motion.div style={{ x, opacity }} />
```

Motion values update the DOM directly, bypassing React renders — the tool for scroll effects, cursor followers, and parallax. `useInView(ref, { once: true, amount: 0.5 })` for booleans; `useAnimate()` for imperative sequences (`await animate("li", { opacity: 1 }, { delay: stagger(0.1, { from: "center" }) })`); `useReducedMotion()` — always branch on it for non-essential motion.

### Forbidden patterns (React / continuous values)

- **`window.addEventListener('scroll', …)` is banned** — fires every frame, unbatched, jank-prone. Use `useScroll()`, GSAP ScrollTrigger, IntersectionObserver, or CSS `animation-timeline: view()`.
- **Never drive continuous input values through `useState`** (mouse position, scroll progress, pointer physics, magnetic hover) — it re-renders the tree every frame and collapses on mobile. Use `useMotionValue` / `useTransform` / `useScroll` outside the render cycle; same for `requestAnimationFrame` loops touching React state.
- **Isolate motion in client leaves:** any component using Motion, scroll observation, or pointer physics is an isolated `'use client'` leaf; Server Components render static layout only. `staggerChildren` needs parent `variants` with children in the same client tree.
- **Claimed motion must ship working:** cut-off ScrollTriggers, jumpy entrances, and missing cleanups are worse than no motion — if the motion tier can't be built properly in scope, drop the tier and ship clean static. Reduced-motion handling is mandatory for anything beyond subtle transitions.

Microinteraction details worth stealing: copy-to-clipboard = the button label swaps to "Copied" for ~1.5s, **no toast** (silent success — a visible effect needs no announcement); command-palette arrow-nav moves a highlight indicator (~120ms) behind stationary items, not the items; a blinking caret lives only inside a typed command line, never as a floating hero cursor.

### Pitfalls

- No `key` on an `AnimatePresence` child = exit never runs.
- Unstable `layout` keys break FLIP tracking.
- Don't nest two `motion` components animating the same transform axis — transforms conflict; split axes or coordinate with variants.
- Don't `setState` in `onUpdate` per frame — use motion values / `useMotionValueEvent`.

## anime.js

Compact syntax for SVG/DOM flourishes and micro-animations; use GSAP for complex scene sequencing.

```js
// v4 module API
import { animate, createTimeline, stagger } from "animejs";
animate(".chip", { x: "18rem", opacity: [0, 1], duration: 900, ease: "outExpo" });

// Timelines: positions are absolute ms or relative ("<", "+=250")
const tl = createTimeline({ defaults: { ease: "outCubic" } });
tl.add(".title", { y: [40, 0], opacity: [0, 1], duration: 650 })
  .add(".accent", { scaleX: [0, 1], duration: 450 }, 250);

// Stagger helper
animate(".dot", { y: [12, 0], delay: stagger(80, { from: "center" }) });
```

- Value arrays `[from, to]` define both ends inline. Legacy v3 global: `anime({ targets, ... })` with `easing: "easeOutExpo"` names.
- Instances expose `pause() / play() / seek(ms)` — set `autoplay: false` and drive `seek()` for scrubbed or deterministically rendered timelines; keep durations and loop counts finite there.

## Spring Physics

Springs resolve on physics (stiffness/damping/mass), not fixed duration — natural, interruptible motion. Damping meaning: too low = oscillates; critically damped = fastest settle without overshoot; too high = sluggish crawl.

| Feel | Stiffness | Damping | Use |
|---|---|---|---|
| Snappy, no overshoot | 400+ | 28-30 | Buttons, toggles, menus — the interactive default |
| Standard UI | 250-350 | 18-25 | Modals, cards entering |
| Gentle | 100-150 | 14-25 | Soft landings, large surfaces |
| Bouncy | 150-250 | 10-15 | Playful entrances (personality-gated) |
| Very bouncy | 600 | 15 | Attention-grabbing pops |
| Heavy | 200 | 20 (mass 2) | Drag-and-drop, weighty objects |

- Motion shorthand: `{ type: "spring", duration: 0.4, bounce: 0.2 }` (bounce 0 = none, 1 = max).
- CSS: approximate with `linear()` stops or `cubic-bezier(0.34, 1.56, 0.64, 1)` for slight overshoot.
- GSAP: no true springs — `back.out(1.4)` (subtle) or `elastic.out(1, 0.4)` (wobble); see `references/gsap.md`.
- Native parity: `cubic-bezier(0.2, 0, 0, 1)` ≈ SwiftUI `.snappy` ≈ Compose `spring(StiffnessMedium, 0.85f)`.

## Performance

| Property | Cost | GPU composited |
|---|---|---|
| `transform`, `opacity` | Low | Yes — the default palette |
| `filter` / `backdrop-filter` | Medium | Yes — keep areas small |
| `clip-path` | Medium | Mostly |
| `color` / `background` | Medium | No — repaint |
| `width` / `height` / `top` / `left` / margins | High | No — reflow every frame |
| `box-shadow` | High | No — expensive repaint |

Rules:
- **Never animate layout properties.** Slide with `transform: translate*`, not `top/left`; expand with `grid-template-rows: 0fr → 1fr`, FLIP, or scale — not `height`.
- **`will-change` discipline:** apply only to elements about to animate (on `:hover` or an `.animating` class), remove after; never preemptively across many elements. Scroll-driven CSS animations self-optimize — no `will-change` needed.
- Bound expensive effects (blur, shadows, backdrop-filter) to small, isolated areas; use `contain` where appropriate.
- <20 animated elements per viewport; stagger to spread load instead of starting everything on one frame.
- Scroll triggers: CSS `animation-timeline` > IntersectionObserver > scroll listeners (never). JS loops: `requestAnimationFrame`, never `setTimeout`.
- Verify: 60fps on target devices, CPU throttled 4x in DevTools; Rendering panel → check compositing layers.

**Perceived performance:** under ~80ms feels instant — target that for micro-feedback. Start transitions preemptively while loading (skeletons); show content progressively; optimistic UI for low-stakes actions only. Too-fast responses can cheapen heavy operations — a brief delay can signal real work.

## Reduced Motion

Ship both layers in every project:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .reveal { animation: none; opacity: 1; transform: none; }  /* scroll-driven: content stays visible */
}
```

```js
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches; // gate JS animations
// React: const reduced = useReducedMotion();  →  swap spatial motion for opacity-only, duration 0
```

Design rules for the reduced variant are in `references/motion-principles.md` (Accessibility).

---
*Distilled from: genjutsu (css-native, framer-motion), hyperframes-animation adapters, impeccable, LottieFiles motion-design-skill, taste-skill (React forbidden patterns), hallmark (microinteractions).*
