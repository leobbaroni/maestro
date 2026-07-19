# maestro

**One super skill for the full visual stack: design → motion → 3D → video.**

Maestro merges eight of the strongest public design/motion/video skill projects — plus a
grill-first working process — into a single Claude Code skill. Not a bundle of copies:
every module is **distilled**, deduplicated, and conflict-resolved into one voice, so an
agent loads exactly the knowledge a task needs and nothing else.

## What's inside

```
skills/maestro/
├── SKILL.md                     ← the brain: routing, engine choosers, the constitution
└── references/
    ├── process.md               ← The Maestro Method: grill gate, brief lock, mockup fan-out, verification
    ├── design-foundations.md    ← typography, layout, color, hierarchy, polish
    ├── design-direction.md      ← art direction, style catalog, boldness dial, brand, asset sourcing
    ├── design-dna.md            ← extract quantified Design DNA from reference UIs; generate from it
    ├── design-audit.md          ← critique, anti-patterns, accessibility, hardening
    ├── motion-principles.md     ← timing, easing, choreography, Disney principles for UI
    ├── motion-web.md            ← CSS, WAAPI, Motion/Framer Motion, anime.js, springs, perf
    ├── gsap.md                  ← GSAP core, timelines, ScrollTrigger, plugins, React
    ├── threejs.md               ← Three.js fundamentals → shaders → postprocessing → R3F
    ├── creative-coding.md       ← generative canvas: noise, particles, flow fields, seeding
    ├── video-direction.md       ← story spine, beats, pacing, kinetic type, transitions
    ├── video-hyperframes.md     ← the HTML-to-video engine: composition contract + CLI loop
    ├── video-remotion.md        ← the React-to-video engine: timing, sequencing, rendering
    └── platform-native.md       ← iOS/Android/desktop: gestures, SwiftUI/Compose motion
```

## The method

Maestro doesn't start building. For substantial work it **grills first**: one question at
a time, each with a recommended answer, walking the design tree until the brief is locked.
Then it commits to one art direction, builds with the right engine, and refuses to declare
done until it has rendered the result and critiqued it against the brief.

Video engines are peers: **HyperFrames** (write HTML, render video) and **Remotion**
(write React, render video), with an explicit chooser instead of a default.

## Install

**As a plugin** — add this repo as a marketplace/plugin source in Claude Code, or:

**As a bare skill** — copy the skill folder into your user skills directory:

```bash
cp -r skills/maestro ~/.claude/skills/maestro
```

Then just ask for design/motion/video work, or invoke it explicitly with `/maestro`.

## Sources

Maestro unifies and rewrites guidance from:
[impeccable](https://github.com/pbakaus/impeccable) ·
[genjutsu](https://github.com/AThevon/genjutsu) ·
[gsap-skills](https://github.com/greensock/gsap-skills) ·
[threejs-skills](https://github.com/CloudAI-X/threejs-skills) ·
[design-dna](https://github.com/zanwei/design-dna) ·
[motion-design-skill](https://github.com/lottiefiles/motion-design-skill) ·
[remotion](https://github.com/remotion-dev/remotion) ·
[hyperframes](https://github.com/heygen-com/hyperframes)

Full attribution and license notes: [NOTICE.md](NOTICE.md). Maestro's own text is MIT.
