# maestro

**One super skill for the full visual stack: design → motion → 3D → video.**

Maestro merges eight of the strongest public design/motion/video skill projects — plus a
grill-first working process — into a single skill for AI coding agents. Not a bundle of
copies: every module is **distilled**, deduplicated, and conflict-resolved into one voice,
so an agent loads exactly the knowledge a task needs and nothing else. And it's
**self-updating aware**: it pins the upstream sources it was distilled from and tells you
when they drift.

## Requirements

| To… | You need |
|---|---|
| Use the skill | [Claude Code](https://claude.com/claude-code) (any recent version), or any AI agent that can read markdown ([AGENTS.md](AGENTS.md) covers non-Claude harnesses) |
| Run the upstream drift checker | Node.js 18+ (no packages to install) |
| Get automatic weekly drift issues | Push this repo to GitHub — the bundled Action does the rest |

No API keys, no build step, no dependencies.

## Install

**Option A — plugin (recommended).** In Claude Code:

```
/plugin marketplace add TugaPlayz/maestro
/plugin install maestro@maestro
```

**Option B — personal skill.** Copy the skill folder into your user skills directory:

```bash
# macOS / Linux
cp -r skills/maestro ~/.claude/skills/maestro

# Windows (PowerShell)
Copy-Item -Recurse skills\maestro "$env:USERPROFILE\.claude\skills\maestro"
```

**Option C — project skill.** Copy `skills/maestro` into a repo as
`.claude/skills/maestro` — it auto-loads for anyone who opens that project in Claude Code.

**Any other agent** (Cursor, Codex, etc.): point it at [AGENTS.md](AGENTS.md), which tells
it how to use `skills/maestro/SKILL.md` as a router without skill support.

### Or let your AI do it — paste this prompt

```text
Set up the "maestro" skill from https://github.com/TugaPlayz/maestro so it's active for
me. Steps: (1) clone the repo (or use this checkout if I'm already in it); (2) install
it the best way my harness supports — Claude Code plugin via
"/plugin marketplace add TugaPlayz/maestro" + "/plugin install maestro@maestro" if
available to me as a user command (tell me to run those two commands), otherwise copy
skills/maestro into my user skills directory (~/.claude/skills/maestro on macOS/Linux,
%USERPROFILE%\.claude\skills\maestro on Windows); (3) verify the install by listing the
skill and confirming skills/maestro/references contains 15 modules; (4) tell me the two
ways to trigger it (just asking for design/motion/video work, or /maestro) and that
substantial requests start with a short interview (the Grill Gate) — that's by design;
(5) optionally run "node scripts/check-upstreams.mjs" and tell me if the upstream
sources have changed since this copy was distilled.
```

## What's inside

```
maestro/
├── .claude-plugin/              ← plugin + marketplace manifests
├── skills/maestro/
│   ├── SKILL.md                 ← the brain: routing, engine choosers, the constitution
│   ├── templates/BRIEF.md       ← the brief-lock template the Grill Gate fills
│   └── references/
│       ├── process.md           ← The Maestro Method: grill gate, brief lock, mockup fan-out, verification
│       ├── design-foundations.md← typography, layout, color, hierarchy, polish
│       ├── design-direction.md  ← art direction, style catalog, boldness dial, brand, asset sourcing
│       ├── design-dna.md        ← extract quantified Design DNA from reference UIs; generate from it
│       ├── design-audit.md      ← critique, anti-patterns, accessibility, hardening
│       ├── motion-principles.md ← timing, easing, choreography, Disney principles for UI
│       ├── motion-web.md        ← CSS, WAAPI, Motion/Framer Motion, anime.js, springs, perf
│       ├── gsap.md              ← GSAP core, timelines, ScrollTrigger, plugins, React
│       ├── threejs.md           ← Three.js fundamentals → shaders → postprocessing → R3F
│       ├── creative-coding.md   ← generative canvas: noise, particles, flow fields, seeding
│       ├── video-direction.md   ← story spine, beats, pacing, kinetic type, transitions
│       ├── video-hyperframes.md ← the HTML-to-video engine: composition contract + CLI loop
│       ├── video-remotion.md    ← the React-to-video engine: timing, sequencing, rendering
│       ├── platform-native.md   ← iOS/Android/desktop: gestures, SwiftUI/Compose motion
│       └── toolbox.md           ← vetted libraries, galleries, asset/easing tools — and what to avoid
├── upstreams.json               ← pinned source commits + module map
├── scripts/check-upstreams.mjs  ← drift checker / re-pinner
├── .github/workflows/           ← weekly upstream watch → issue on drift
├── UPDATING.md                  ← re-distillation playbook (with a paste-ready AI prompt)
├── CLAUDE.md · AGENTS.md        ← agents pick the skill up from a bare clone
└── NOTICE.md · LICENSE · CHANGELOG.md
```

## The method

Maestro doesn't start building. For substantial work it **grills first**: one question at
a time, each with a recommended answer, walking the design tree until the brief is locked
into `templates/BRIEF.md`. Then it commits to one art direction, builds with the right
engine, and refuses to declare done until it has rendered the result and critiqued it
against the brief.

Video engines are peers: **HyperFrames** (write HTML, render video) and **Remotion**
(write React, render video), with an explicit chooser instead of a default.

## Staying current

Maestro was distilled from living projects, and it knows which commits it was distilled
at. Check drift anytime:

```bash
node scripts/check-upstreams.mjs        # what changed upstream since distillation?
```

If this repo lives on GitHub, the bundled **upstream-watch** Action runs that check every
Monday and opens an issue listing exactly which maestro modules are affected. To absorb
changes, follow [UPDATING.md](UPDATING.md) — it contains a paste-ready prompt that walks
an AI agent through diffing the drifted sources, re-distilling only the affected modules,
and re-pinning.

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
