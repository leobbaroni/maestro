---
name: maestro
description: Unified design, motion, 3D, and video super skill. Use for designing or improving any UI (websites, landing pages, dashboards, product UI, components), art direction and design systems, extracting Design DNA from reference UIs, UI critique/audit/accessibility hardening, motion design and animation (CSS, WAAPI, Motion/Framer Motion, GSAP, ScrollTrigger), Three.js/WebGL/R3F scenes, generative art, and authoring videos (HyperFrames or Remotion) — promos, explainers, kinetic typography, motion graphics. Also use when the user says "maestro", wants design options/mockups, or wants a design plan stress-tested before building.
---

# Maestro

One skill for the full visual stack: **design → motion → 3D → video**. It merges the craft of impeccable, design-kit, genjutsu, design-dna, the official GSAP and Remotion skills, threejs-skills, LottieFiles' motion-design principles, and HyperFrames — deduplicated, conflicts resolved, one voice.

Everything deep lives in `references/`. This file is the brain: it decides *what to load* and *how to work*. Load only the modules the task needs.

## Rule 0 — The Grill Gate

Before any **substantial** design/build/redesign work, interview the user first: **one question at a time, each with a recommended answer**, walking the design tree until the brief is locked. Full ritual, skip conditions, and the brief-lock checklist: `references/process.md`.

- Substantial = new page/screen/site/video, redesign, brand work, anything where taste decisions multiply.
- Skip when: the request is a small tweak, the brief is already fully specified, or you're mid-iteration on a locked brief.
- Significant new surfaces also get the **mockup fan-out gate**: N divergent options, the user picks before implementation (`references/process.md`).

## Operating loop

1. **Grill** — lock the brief (Rule 0).
2. **Direct** — commit to one art direction before touching code: `references/design-direction.md`. If reference UIs exist, extract their DNA first: `references/design-dna.md`.
3. **Build** — load the modules for the medium (routing table below). Foundations always apply: `references/design-foundations.md`.
4. **Verify** — render/screenshot and critique against the locked brief before declaring done: `references/design-audit.md`. Never ship unseen work.

## Routing table

| Task | Load |
|---|---|
| Any UI build or redesign | `design-foundations.md` + `design-direction.md` |
| Match an existing style / reference image / URL | `design-dna.md` |
| Critique, audit, accessibility, edge-case hardening | `design-audit.md` |
| Any animation decision (timing, easing, choreography) | `motion-principles.md` |
| Implementing web motion (CSS, WAAPI, Motion/Framer, anime.js) | `motion-web.md` |
| GSAP, ScrollTrigger, SplitText, Flip, scroll stories | `gsap.md` |
| 3D scenes, WebGL, shaders, R3F | `threejs.md` |
| Generative art, canvas experiments, particles, noise | `creative-coding.md` |
| Planning any video (story, beats, pacing, transitions) | `video-direction.md` |
| Rendering video from HTML | `video-hyperframes.md` |
| Rendering video from React | `video-remotion.md` |
| iOS / Android / desktop-native design or motion | `platform-native.md` |
| Process questions (grilling, mockups, phases, verification) | `process.md` |

Load combinations freely — a scroll-driven 3D landing page needs `design-foundations` + `design-direction` + `gsap` + `threejs`; a kinetic-type promo needs `video-direction` + `motion-principles` + one engine module.

## Engine choosers

**Web motion** (details in `motion-web.md`):

| Situation | Engine |
|---|---|
| Simple state/entrance transitions | CSS (transitions, keyframes, view transitions) |
| React app, layout/gesture/spring animations | Motion (Framer Motion) |
| Timeline choreography, scroll-driven stories, text splitting, SVG morph | GSAP |
| One-off programmatic tween, no dependency budget | WAAPI |

**Video** — HyperFrames and Remotion are peers; choose by project shape:

| Signal | Engine |
|---|---|
| Standalone video, HTML/CSS comfort, agent-driven CLI loop | HyperFrames |
| Existing React codebase, reuse of app components in video | Remotion |
| Video embedded in a product (Player, per-user renders, SaaS) | Remotion |
| Composition authored mostly by an agent from a storyboard | HyperFrames |
| Team already invested in one of them | That one |

Both demand **determinism**: no `Date.now()`, no `Math.random()` without a seeded/framework source, no free-running media or CSS animations that ignore the frame clock. Each engine module states its own rules — respect them exactly.

**Rendering surface** for graphics work: DOM/CSS for UI, SVG for resolution-independent line art and morphing, Canvas 2D for generative/particle work (>~200 animated elements), WebGL/Three.js for 3D and shader effects.

## The constitution

Always-on rules, regardless of module:

1. **Intentionality beats intensity.** One committed art direction outperforms three hedged ones. Pick, then push it.
2. **Hierarchy first.** If everything is bold, nothing is. Establish size/weight/color hierarchy before decorating.
3. **Real content pressure.** Design with realistic text lengths, empty states, and worst-case data — not lorem ipsum.
4. **Motion has a job.** Every animation orients, gives feedback, or directs attention. Decoration without purpose is removed.
5. **Transform and opacity only** for anything that moves 60fps; layout properties never animate.
6. **Timing discipline.** Micro-interactions 100–200ms, standard transitions 200–400ms, scene-scale moves 400–800ms. Ease-out for entrances, ease-in-out for moves. Springs for physical UI.
7. **Choreograph, don't synchronize.** Staggers 30–80ms; one hero element leads, the rest support.
8. **Contrast is law.** 4.5:1 body text, 3:1 large text/UI components. Check it, don't eyeball it.
9. **Respect `prefers-reduced-motion`** in every web/UI deliverable — reduce to opacity/instant states.
10. **Accessible by construction:** semantic markup, focus states, keyboard paths, touch targets ≥44px.
11. **Deterministic video.** A frame rendered twice must be identical. Seed all randomness; the frame clock is the only clock.
12. **Verify visually.** Screenshot or render before claiming completion; critique against the brief, fix, re-verify.
13. **Steal structure, not pixels.** From references, extract systems (spacing, type scale, palette logic) — never copy a design wholesale.
14. **Performance is design.** Jank destroys craft: budget draw calls, dispose GPU resources, lazy-load heavy scenes.

---

*Maestro unifies: [impeccable](https://github.com/pbakaus/impeccable), [genjutsu](https://github.com/AThevon/genjutsu), [gsap-skills](https://github.com/greensock/gsap-skills), [threejs-skills](https://github.com/CloudAI-X/threejs-skills), [design-dna](https://github.com/zanwei/design-dna), [motion-design-skill](https://github.com/lottiefiles/motion-design-skill), [remotion](https://github.com/remotion-dev/remotion), [hyperframes](https://github.com/heygen-com/hyperframes), plus design-kit and the grilling/pilot/mockups process rituals. See NOTICE.md.*
