---
name: maestro
description: Unified design, motion, 3D, and video super skill. Use for designing or improving any UI (websites, landing pages, dashboards, product UI, components), art direction and design systems, extracting Design DNA from reference UIs, UI critique/audit/accessibility hardening, motion design and animation (CSS, WAAPI, Motion/Framer Motion, GSAP, ScrollTrigger), Three.js/WebGL/R3F scenes, generative art, and authoring videos (HyperFrames or Remotion) — promos, explainers, kinetic typography, motion graphics. Also use when the user says "maestro", wants design options/mockups, or wants a design plan stress-tested before building.
---

# Maestro

One skill for the full visual stack: **design → motion → 3D → video**. It merges eleven design/motion/video skill projects into one voice — deduplicated, conflicts resolved (full list in the footer).

Two layers. `references/` is the **judgment layer** — distilled, one voice, decides everything. `library/` is the **depth layer** — four source corpora (taste-skill, hallmark, impeccable verbatim; video-shotcraft as a partial vendor); the judgment layer points into it for exact recipes, theme token sets, and long-tail protocols (rules of engagement: `library/README.md`). On genuine contradictions between sources the resolution is already encoded in the references, per the hierarchy **taste-skill > hallmark > impeccable**; everything non-conflicting composes. This file is the brain: it decides *what to load* and *how to work*. Load only what the task needs.

## Rule 0 — The Grill Gate

Before any **substantial** design/build/redesign work, interview the user first: **one question at a time, each with a recommended answer**, walking the design tree until the brief is locked. Full ritual, skip conditions, and the brief-lock checklist: `references/process.md`.

- Substantial = new page/screen/site/video, redesign, brand work, anything where taste decisions multiply.
- Skip when: the request is a small tweak, the brief is already fully specified, or you're mid-iteration on a locked brief.
- **The design authority is the user's pick, not yours.** Maestro carries three houses with different instincts; ask early which one leads — by look and feel, never by skill name — recommend one, push once past "whatever looks best", and lock the answer into the brief (`references/process.md` §1a). A named house ends the question and decides which protocol runs when verbs overlap.
- Significant new surfaces also get the **mockup fan-out gate**: N divergent options, the user picks before implementation (`references/process.md`). When the authority is genuinely undecided, spend the fan-out on it — one option per house.

## Operating loop

1. **Grill** — lock the brief, including whose design instincts lead (Rule 0).
2. **Direct** — commit to one art direction before touching code: `references/design-direction.md`. If reference UIs exist, extract their DNA first: `references/design-dna.md`.
3. **Build** — load the modules for the medium (routing table below). Foundations always apply: `references/design-foundations.md`.
4. **Verify** — render/screenshot and critique against the locked brief before declaring done: `references/design-audit.md`. Never ship unseen work.

## Routing table

| Task | Load |
|---|---|
| Any UI build or redesign | `design-foundations.md` + `design-direction.md` |
| Page-scale work: picking the page shape, section/nav/footer archetypes, theme, hero enrichment | `page-anatomy.md` (full recipes on demand: `library/hallmark/…`) |
| Match an existing style / reference image / URL | `design-dna.md` |
| Critique, audit, accessibility, edge-case hardening | `design-audit.md` |
| Any animation decision (timing, easing, choreography) | `motion-principles.md` |
| Implementing web motion (CSS, WAAPI, Motion/Framer, anime.js) | `motion-web.md` |
| GSAP, ScrollTrigger, SplitText, Flip, scroll stories | `gsap.md` |
| 3D scenes, WebGL, shaders, R3F | `threejs.md` |
| Generative art, canvas experiments, particles, noise | `creative-coding.md` |
| Planning any video (story, beats, pacing, transitions) | `video-direction.md` |
| **Product demo / launch promo from a real app or site** | `video-shotcraft.md` — the lead: mode gate, 104 shot cards, eight-stage pipeline |
| One cinematic moment inside any video, any engine | `video-shotcraft.md` (pull a single shot card) |
| Sound design, SFX pin tables, music beat-sync — any engine | `video-sound.md` |
| Rendering video from HTML | `video-hyperframes.md` |
| Rendering video from React | `video-remotion.md` |
| Choosing a component library, flair kit, gallery, icon/font/asset source, or easing tool | `toolbox.md` (long tail: `toolbox-corpus.md`) |
| iOS / Android / desktop-native design or motion | `platform-native.md` |
| Process questions (grilling, mockups, phases, verification) | `process.md` |
| Running a named protocol — audit, critique, redesign, study, polish, bolder, typeset, brandkit, image-to-code… | `commands.md` — routes the intent to the exact vendored protocol; run the real procedure, not a lookalike |
| Before any video render, media sourcing, or when companion skills may be installed | `companions.md` — prefer installed machinery (frame presets, animation rules, media resolution) over re-deriving |

Load combinations freely — a scroll-driven 3D landing page needs `design-foundations` + `design-direction` + `page-anatomy` + `gsap` + `threejs`; a kinetic-type promo needs `video-direction` + `motion-principles` + one engine module.

A typical page job composes the absorbed sources: hallmark's layer picks the structure (`page-anatomy.md`), taste-skill's layer polishes components and kills slop (`design-foundations.md`, `design-audit.md`), impeccable's layer runs process and critique (`process.md`, `design-audit.md`). They operate at different grain sizes — structure → component → line-level tell — so they stack, not compete. The brief's locked design authority says which one leads when they'd diverge.

The library is not only knowledge — each corpus ships **runnable protocols** (impeccable's ~23 named actions, hallmark's default design flow plus three verbs, taste-skill's 11 sub-skills). `references/commands.md` maps an intent to the exact one and resolves overlapping verbs; run the real procedure and honor its output contract rather than approximating it. Load the single file the references point to — never a whole corpus.

## Engine choosers

**Web motion** (details in `motion-web.md`):

| Situation | Engine |
|---|---|
| Simple state/entrance transitions | CSS (transitions, keyframes, view transitions) |
| React app, layout/gesture/spring animations | Motion — prev. Framer Motion; install `motion`, import `motion/react` |
| Timeline choreography, scroll-driven stories, text splitting, SVG morph | GSAP |
| One-off programmatic tween, no dependency budget | WAAPI |

**Video** — ask what the film *is* before asking which engine renders it.

Product demo or launch promo built from a real app or site → **shotcraft leads** (`video-shotcraft.md`): it gates the mode, supplies the shot vocabulary and the pipeline, and renders through Remotion, so `video-remotion.md` still governs the API and determinism underneath it. For everything else HyperFrames and Remotion remain peers, chosen by project shape:

| Signal | Engine |
|---|---|
| Standalone video, HTML/CSS comfort, agent-driven CLI loop | HyperFrames |
| Existing React codebase, reuse of app components in video | Remotion |
| Video embedded in a product (Player, per-user renders, SaaS) | Remotion |
| Composition authored mostly by an agent from a storyboard | HyperFrames |
| Team already invested in one of them | That one |

Nothing here is displaced by shotcraft: `video-direction.md` still plans story and beats for any engine, `video-sound.md` scores any engine, and a single shot card is worth pulling into a HyperFrames composition as readily as a Remotion one — adapt it, don't transplant it.

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

*Maestro unifies: [impeccable](https://github.com/pbakaus/impeccable), [genjutsu](https://github.com/AThevon/genjutsu), [gsap-skills](https://github.com/greensock/gsap-skills), [threejs-skills](https://github.com/CloudAI-X/threejs-skills), [design-dna](https://github.com/zanwei/design-dna), [motion-design-skill](https://github.com/lottiefiles/motion-design-skill), [remotion](https://github.com/remotion-dev/remotion), [hyperframes](https://github.com/heygen-com/hyperframes), [taste-skill](https://github.com/Leonxlnx/taste-skill), [hallmark](https://github.com/nutlope/hallmark), [video-shotcraft](https://github.com/Vincentwei1021/video-shotcraft), plus design-kit and the grilling/pilot/mockups process rituals. See NOTICE.md.*
