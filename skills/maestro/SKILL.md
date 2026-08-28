---
name: maestro
description: Unified design, motion, 3D, and video super skill. Use for designing or improving any UI (websites, landing pages, dashboards, product UI, components), art direction and design systems, extracting Design DNA from reference UIs, UI critique/audit/accessibility hardening, motion design and animation (CSS, WAAPI, Motion/Framer Motion, GSAP, ScrollTrigger), Three.js/WebGL/R3F scenes, generative art, and authoring videos (HyperFrames or Remotion) — promos, explainers, kinetic typography, motion graphics. Also use when the user says "maestro", wants design options/mockups, or wants a design plan stress-tested before building.
---

# Maestro

One skill for the full visual stack: **design → motion → 3D → video**. It merges eleven design/motion/video skill projects into one voice — deduplicated, conflicts resolved (full list in the footer).

Two layers. `references/` is the **judgment layer** — distilled, one voice, decides everything. `library/` is the **depth layer** — nine source corpora vendored verbatim, so every bundled tool stays runnable at full capability rather than only summarized; the judgment layer points into it for exact recipes, theme token sets, and long-tail protocols (rules of engagement: `library/README.md`). On genuine contradictions between sources the resolution is already encoded in the references, per the hierarchy **taste-skill > hallmark > impeccable**; everything non-conflicting composes. This file is the brain: it decides *what to load* and *how to work*. Load only what the task needs.

## Rule 0 — The Grill Gate

Before any **substantial** design/build/redesign work, interview the user first: **one question at a time, each with a recommended answer**, walking the design tree until the brief is locked. Full ritual, skip conditions, and the brief-lock checklist: `references/process.md`.

- Substantial = new page/screen/site/video, redesign, brand work, anything where taste decisions multiply.
- Skip when: the request is a small tweak, the brief is already fully specified, or you're mid-iteration on a locked brief.
- **The design authority is the user's pick, not yours.** Maestro carries three houses with different instincts; ask early which one leads — by look and feel, never by skill name — recommend one, push once past "whatever looks best", and lock the answer into the brief (`references/process.md` §1a). A named house ends the question and decides which protocol runs when verbs overlap.
- Significant new surfaces go through **the direction round** (`references/process.md` §3), and it runs **by the roll**: the lead direction is **dealt, not ranked**, because your top-ranked direction is what every run would ship and one taste function converges on the category default. Challengers are fused, then judged on two axes and given a verdict — and **a declined challenger still donates** the one discipline the lead lacks, written in as a named line. Exactly one card carries your own pick, and it never takes the lead position. When the authority is genuinely undecided, spend the round on it — one option per house.
- **impeccable owns this round.** When it is installed, hand off to `new-work` and its `concept-seed` roll — the decision page, per-card comps, and the re-roll pool are the procedure, not decoration. Without it, §3's mechanics are the same discipline at lower fidelity. Presenting your own ranking and calling it the round is the lookalike this exists to prevent.
- **For any video, the film's *kind* is the user's pick too, and it comes before the engine** (`references/process.md` §1b). Ask what appears on screen — their real product · abstract light and type · designed frames of words and data · filmed-looking people and places, *generated rather than shot* · footage they already have, packaged — **never which engine renders it**, which is a question about our implementation that they cannot answer. That answer selects the engine; the signal table in the chooser below is only a tiebreaker within it, and it is where production constraints like an existing React codebase live. Films then gate through §3a, which climbs a ladder: **free text directions first, a styleframe only for the finalist, nothing rendered before the pick.**
- **A locked style is a pre-answered brief — build first, don't interview.** When the look is already committed (a named house style, a brand system, a prior film in the same series), it has *already* answered design authority, register, banned qualities, and motion feel — which is the entire thing this gate exists to establish, so the interview buys nothing but a round-trip. Take only what nothing can infer (duration, aspect ratio, brand colour), emit the **beat sheet**, and build: a cut communicates better than a storyboard, and the user redirects from something real. Two limits — a paid, long, or remote render is still a paid action and gets approval first (`references/process.md`), and this exception is about a *locked* style, never about an open one. When the look is genuinely undecided the gate applies in full, because that is a taste decision and it is the user's.
- **The rendering engine is the user's pick too, whenever frames come out of a model rather than out of code.** Never assume an image or video model, and never inherit one from an example in these modules — every model name in maestro is a filled-in adapter, not a default, and engine lineups turn over faster than this skill can track. Ask which engines are actually reachable, map the job to capabilities rather than to names, and for a load-bearing asset offer a **bake-off**: same prompt across several engines, scored on axes named in advance, then synthesized — the winner is rarely one engine on every axis. Full gate and comparison protocol: `references/generative-direction.md`; the reachability probe, the OSS-vs-paid route gate, and the local-hardware check are `references/generative-engines.md`.

## Operating loop

1. **Grill** — lock the brief, including whose design instincts lead (Rule 0).
2. **Direct** — commit to one art direction before touching code: `references/design-direction.md`. If reference UIs exist, extract their DNA first: `references/design-dna.md`.
3. **Build** — load the modules for the medium (routing table below). Foundations always apply: `references/design-foundations.md`.
4. **Verify** — render/screenshot and critique against the locked brief before declaring done: `references/design-audit.md`. Never ship unseen work.

## Routing table

| Task | Load |
|---|---|
| **A new surface, mockups, or "deal me directions" / "roll" / "the hand"** | **`process.md` §3 — the direction round.** Dealt lead + challengers with verdicts; hands off to impeccable's `new-work` roll when installed |
| "world", "the visual world", "lock the world" | `design-direction.md` § The world — the locked identity that governs everything built inside it |
| Any UI build or redesign | `design-foundations.md` + `design-direction.md` |
| Page-scale work: picking the page shape, section/nav/footer archetypes, theme, hero enrichment | `page-anatomy.md` (full recipes on demand: `library/hallmark/…`) |
| Match an existing style / reference image / URL | `design-dna.md` |
| Critique, audit, accessibility, edge-case hardening | `design-audit.md` |
| Any animation decision (timing, easing, choreography) | `motion-principles.md` |
| Implementing web motion (CSS, WAAPI, Motion/Framer, anime.js) | `motion-web.md` |
| GSAP, ScrollTrigger, SplitText, Flip, scroll stories | `gsap.md` |
| 3D scenes, WebGL, shaders, R3F | `threejs.md` |
| Generative art, canvas experiments, particles, noise | `creative-coding.md` |
| **Any video — before routing** | **`process.md` §1b first: the user picks what the film *is*; that answer selects the row below.** Then §3a's direction round gates on beat sheets, styleframe only for the finalist |
| Planning any video (story, beats, pacing, transitions) | `video-direction.md` |
| **Product demo / launch promo from a real app or site** | `video-shotcraft.md` — the lead: mode gate, 152 shot cards, eight-stage pipeline |
| One cinematic moment inside any video, any engine | `video-shotcraft.md` (pull a single shot card) |
| Sound design, SFX pin tables, music beat-sync — any engine | `video-sound.md` |
| **Which engine runs this, and who pays** — before any generation | **`generative-engines.md` first.** Probe what is reachable (ComfyUI local + partners, Higgsfield, or neither), gate OSS against paid, check the GPU. Upstream corpora are the baseline for all mechanics |
| **Prompting an image or video model** — character references, model sheets, plates, prompted shots | `generative-direction.md` (grammar, prompt construction, ledger, model gate, pre-flight), then `generative-stills.md` or `generative-video.md` |
| **Brand identity, product imagery, thumbnails, listing cards** — generated assets that make claims for a company | `brand-systems.md` — request classification, the Brand Lock, slot minimalism, and the truth constraints that surface demands |
| **Generated assets inside a shipped page** — asset kits, scroll journeys, the wow bar | `generative-web.md` |
| **A generated piece with more than one shot** — a sequence, a recurring character, an arc | `generative-production.md` — the phased pipeline. **Storyboard the whole thing and get it approved before generating anything**; composing shot-by-shot is how continuity is lost |
| **Motion-graphics promo, brand film, title sequence, animated ad — a film made of light rather than of UI** | `video-canvas.md` — **the lead once the user picks this kind (§1b).** One pure `drawFrame(ctx, t)` producing a scrubbable HTML player and an MP4 from one source, no browser at render time |
| Rendering video from HTML | `video-hyperframes.md` |
| Rendering video from React | `video-remotion.md` |
| Choosing a component library, flair kit, gallery, icon/font/asset source, or easing tool | `toolbox.md` (long tail: `toolbox-corpus.md`) |
| iOS / Android / desktop-native design or motion | `platform-native.md` |
| Process questions (grilling, mockups, phases, verification) | `process.md` |
| Running a named protocol — audit, critique, redesign, study, polish, bolder, typeset, brandkit, image-to-code… | `commands.md` — routes the intent to the exact vendored protocol; run the real procedure, not a lookalike |
| Before any video render, media sourcing, or when companion skills may be installed | `companions.md` — prefer installed machinery (frame presets, animation rules, media resolution) over re-deriving |

Load combinations freely — a scroll-driven 3D landing page needs `design-foundations` + `design-direction` + `page-anatomy` + `gsap` + `threejs`; a kinetic-type promo needs `video-direction` + `motion-principles` + one engine module.

A typical page job composes the absorbed sources: hallmark's layer picks the structure (`page-anatomy.md`), taste-skill's layer polishes components and kills slop (`design-foundations.md`, `design-audit.md`), impeccable's layer runs process and critique (`process.md`, `design-audit.md`). They operate at different grain sizes — structure → component → line-level tell — so they stack, not compete. The brief's locked design authority says which one leads when they'd diverge.

The library is not only knowledge — **every bundled source ships its runnable protocols there**: impeccable's ~23 named actions, hallmark's default design flow plus three verbs, taste-skill's 11 sub-skills, genjutsu's `cast` and `paint` orchestrators over 14 technique jutsu, GreenSock's eight GSAP skills, design-dna's schema, LottieFiles' motion-design skill, shotcraft's modes, the two generative-media directors, and — for generative work — **Higgsfield's eight first-party skills and Comfy's twelve, which are the baseline rather than a reference**: their CLI syntax, model IDs, flags, and error strings outrank maestro's prose wherever the two differ. `references/commands.md` maps an intent to the exact one and resolves overlapping verbs; run the real procedure and honor its output contract rather than approximating it. Load the single file the references point to — never a whole corpus.

Two sources are deliberately *not* vendored, and the reason matters when routing: **threejs-skills** declares no license, so it can't be redistributed here (the distillation in `threejs.md` stands alone; clone the repo for the corpus), and **remotion** and **hyperframes** ship their own agent skills through their own CLIs — Remotion's now self-updates on upgrade — so a vendored snapshot would be a stale competitor to the live one. `companions.md` routes to the installed skill instead.

## Engine choosers

**Web motion** (details in `motion-web.md`):

| Situation | Engine |
|---|---|
| Simple state/entrance transitions | CSS (transitions, keyframes, view transitions) |
| React app, layout/gesture/spring animations | Motion — prev. Framer Motion; install `motion`, import `motion/react` |
| Timeline choreography, scroll-driven stories, text splitting, SVG morph | GSAP |
| One-off programmatic tween, no dependency budget | WAAPI |

**Video** — **the user picks what the film is; you pick how it renders.**

Ask the film-kind question first (`process.md` §1b) — what appears on screen, phrased as a film rather than as an engine. That answer selects the path:

| The user picked | Path |
|---|---|
| Their real product, shown as it is | **shotcraft** (`video-shotcraft.md`) — gates the mode, supplies the shot vocabulary and pipeline, renders through Remotion, so `video-remotion.md` still governs the API and determinism underneath |
| Abstract — light, type, shape, no UI | **canvas** (`video-canvas.md`) |
| Designed frames — words, numbers, steps to read | **HyperFrames** (`video-hyperframes.md`) |
| Filmed — real people, places, texture | **generative** (`generative-direction.md`, then its production pipeline) — a different axis entirely, see below |
| Inside their existing React app | **Remotion** (`video-remotion.md`) |

**The table below is a tiebreaker inside that pick, never a substitute for it.** Use it when the kind leaves two engines open, or when the environment forecloses one — not to overrule what the user chose:

| Signal | Engine |
|---|---|
| The frame is *drawn as light* — glows, blooms, shaped falloff, additive compositing | **Canvas** |
| The deliverable is both a scrubbable player and a video file | **Canvas** — one source, identical by construction |
| Headless Chromium unavailable, or a render that must survive a shell killing long commands | **Canvas** — no browser, resumable frame-per-file |
| Standalone video, HTML/CSS comfort, agent-driven CLI loop | HyperFrames |
| The frame is fundamentally a laid-out page — flex/grid typography, cards, tables | HyperFrames |
| Existing React codebase, reuse of app components in video | Remotion |
| Video embedded in a product (Player, per-user renders, SaaS) | Remotion |
| Composition authored mostly by an agent from a storyboard | HyperFrames |
| Real screenshots, captions, voiceover, or a scored soundtrack | Remotion / shotcraft — **not** canvas |
| Team already invested in one of them | That one |

Nothing here is displaced by shotcraft: `video-direction.md` still plans story and beats for any engine, `video-sound.md` scores any engine, and a single shot card is worth pulling into a HyperFrames composition as readily as a Remotion one — adapt it, don't transplant it.

**Generated, not rendered** is a different axis from all of the above. When the frames come out of an image or video *model* rather than out of code, the engine chooser doesn't apply — `generative-direction.md` and its two surface modules do, and **the choice of which model moves from your judgment to the user's** (Rule 0): the chooser below picks a renderer on technical grounds you can evaluate, while a generative engine is picked on output quality nobody can predict from a spec sheet, which is what makes it a question and a bake-off rather than a decision. The trade is exact: a renderer hits a spec twice and a model never does, so anything that must be frame-exact, versionable, or re-renderable stays in code, while photoreal humans, real-world locations, and material texture are what generation is for. The two compose — a generated plate makes an establishing shot inside a Remotion or HyperFrames edit, and a locked character sheet is art direction no renderer produces.

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
