# Maestro

**A unified design, motion, 3D, and video skill for AI coding agents.**

Maestro consolidates eight established design and motion knowledge bases — [impeccable](https://github.com/pbakaus/impeccable), [genjutsu](https://github.com/AThevon/genjutsu), [gsap-skills](https://github.com/greensock/gsap-skills), [threejs-skills](https://github.com/CloudAI-X/threejs-skills), [design-dna](https://github.com/zanwei/design-dna), [motion-design-skill](https://github.com/lottiefiles/motion-design-skill), [remotion](https://github.com/remotion-dev/remotion), and [hyperframes](https://github.com/heygen-com/hyperframes) — into a single skill. Every module is distilled and editorially reconciled rather than copied: duplicate guidance is merged, conflicting recommendations are resolved, and the result speaks with one voice.

## Capabilities

- **Design** — typography, layout, color, and hierarchy foundations; art direction with a named style catalog; Design DNA extraction from reference UIs; systematic critique, accessibility auditing, and edge-case hardening
- **Motion** — engine-agnostic motion principles (timing, easing, choreography); implementation guidance for modern CSS, WAAPI, Motion, and anime.js; a full GSAP reference including ScrollTrigger and plugins
- **3D and generative** — Three.js from scene fundamentals through shaders, postprocessing, and React Three Fiber; canvas-based generative techniques
- **Video** — engine-neutral video direction (story structure, beat planning, pacing, transitions) with dedicated modules for both HyperFrames (HTML-to-video) and Remotion (React-to-video)
- **Process** — a brief-locking interview ritual (the Grill Gate), a mockup fan-out with a hard user-approval gate, phase-appropriate workflows, and mandatory rendered verification
- **Ecosystem** — a live-verified toolbox of component libraries, inspiration galleries, asset sources, and helper tools, including an explicit exclusion list with reasons

## Installation

| Requirement | Needed for |
|---|---|
| [Claude Code](https://claude.com/claude-code) or any agent that reads Markdown | Using the skill ([AGENTS.md](AGENTS.md) covers non-Claude harnesses) |
| Node.js 18+ | The upstream drift checker (optional; no dependencies) |
| A GitHub fork/host | Automated weekly drift monitoring (optional) |

**Option A — Claude Code plugin (recommended)**

```
/plugin marketplace add leobbaroni/maestro
/plugin install maestro@maestro
```

**Option B — personal skill**

```bash
# macOS / Linux
cp -r skills/maestro ~/.claude/skills/maestro

# Windows (PowerShell)
Copy-Item -Recurse skills\maestro "$env:USERPROFILE\.claude\skills\maestro"
```

**Option C — project skill**

Copy `skills/maestro` into a repository as `.claude/skills/maestro`; it loads automatically for anyone who opens that project in Claude Code.

**Agent-assisted setup** — paste the following into any capable coding agent:

```text
Set up the "maestro" skill from https://github.com/leobbaroni/maestro so it's active for
me. Steps: (1) clone the repo (or use this checkout if I'm already in it); (2) install
it the best way my harness supports — Claude Code plugin via
"/plugin marketplace add leobbaroni/maestro" + "/plugin install maestro@maestro" if
available to me as a user command (tell me to run those two commands), otherwise copy
skills/maestro into my user skills directory (~/.claude/skills/maestro on macOS/Linux,
%USERPROFILE%\.claude\skills\maestro on Windows); (3) verify the install by listing the
skill and confirming skills/maestro/references contains 17 modules; (4) tell me the two
ways to trigger it (just asking for design/motion/video work, or /maestro) and that
substantial requests start with a short interview (the Grill Gate) — that's by design;
(5) optionally run "node scripts/check-upstreams.mjs" and tell me if the upstream
sources have changed since this copy was distilled.
```

## Usage

Maestro activates automatically for design, motion, 3D, and video work, or explicitly via `/maestro`. Two behaviors are intentional:

- **Substantial requests begin with a short interview.** The Grill Gate asks one question at a time, each with a recommended answer, until the brief is locked into a written spec. Small tweaks and fully specified requests skip it.
- **Work is not reported done until rendered and reviewed.** Screenshots or rendered frames are compared against the locked brief before completion is claimed.

Video engines are treated as peers: HyperFrames and Remotion each have a dedicated module, selected by project shape rather than by default.

## Repository layout

```
maestro/
├── .claude-plugin/              Plugin and marketplace manifests
├── skills/maestro/
│   ├── SKILL.md                 Router: task→module table, engine choosers, core rules
│   ├── templates/BRIEF.md       The brief template the Grill Gate fills
│   └── references/              17 modules (design, motion, 3D, video, process, toolbox, companions)
├── upstreams.json               Pinned source commits and module map
├── scripts/check-upstreams.mjs  Drift checker / re-pinner (Node 18+, zero dependencies)
├── .github/workflows/           Weekly upstream watch — opens an issue on drift
├── UPDATING.md                  Re-distillation playbook and authoring specification
└── NOTICE.md · LICENSE · CHANGELOG.md
```

## Staying current

Maestro records the exact upstream commits it was distilled from. To check for drift:

```bash
node scripts/check-upstreams.mjs        # exit 1 + affected-module list on drift
node scripts/check-upstreams.mjs --pin  # re-pin after absorbing changes
```

When hosted on GitHub, the bundled workflow runs this check every Monday and opens an issue naming the affected modules. [UPDATING.md](UPDATING.md) contains the full re-distillation playbook, including a paste-ready prompt that walks an agent through diffing drifted sources, updating only the affected modules, and re-pinning. Ecosystem facts (library licensing, maintenance status) carry a verification date and a separate re-verification procedure.

## License and attribution

Maestro's own text is released under the [MIT License](LICENSE). It is a distillation: no upstream files are redistributed verbatim, and per-project attribution with license notes is maintained in [NOTICE.md](NOTICE.md). Modules that track a single authoritative source closely (the Design DNA schema, the HyperFrames contract, the Remotion API surface) name that source in their footers.
