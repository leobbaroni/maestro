# Maestro

**A unified design, motion, 3D, and video skill for AI coding agents.**

Maestro consolidates eleven established design, motion, and video knowledge bases — [impeccable](https://github.com/pbakaus/impeccable), [genjutsu](https://github.com/AThevon/genjutsu), [gsap-skills](https://github.com/greensock/gsap-skills), [threejs-skills](https://github.com/CloudAI-X/threejs-skills), [design-dna](https://github.com/zanwei/design-dna), [motion-design-skill](https://github.com/lottiefiles/motion-design-skill), [remotion](https://github.com/remotion-dev/remotion), [hyperframes](https://github.com/heygen-com/hyperframes), [taste-skill](https://github.com/Leonxlnx/taste-skill), [hallmark](https://github.com/nutlope/hallmark), and [video-shotcraft](https://github.com/Vincentwei1021/video-shotcraft) — into a single skill with two layers. The **judgment layer** (`references/`, 24 modules) is distilled and editorially reconciled: duplicate guidance merged, conflicting recommendations resolved (design-taste conflicts by the standing hierarchy taste-skill > hallmark > impeccable), one voice throughout. The **depth layer** (`library/`) vendors **nine source corpora verbatim** — taste-skill's 11 sub-skills, hallmark's macrostructure/fingerprint/theme catalog, impeccable's per-action references, genjutsu's `cast`/`paint` orchestrators over 14 technique sub-skills, GreenSock's eight GSAP skills, design-dna's schema, LottieFiles' motion-design skill, video-shotcraft's shot cards with their tuned implementations, and the author's own two Higgsfield prompt directors — so nothing is lost to summarization: the judgment layer selects, then points at the exact library file when a task needs a full recipe, theme token set, shot parameter table, or protocol.

## Capabilities

- **Design** — typography, layout, color, and hierarchy foundations; art direction with a named style catalog and calibration dials; whole-page structure selection (21 macrostructures, ~50 component fingerprints, a 20-theme catalog); Design DNA extraction from reference UIs; systematic critique, an extensive anti-slop gate catalog, accessibility auditing, and edge-case hardening
- **Motion** — engine-agnostic motion principles (timing, easing, choreography); implementation guidance for modern CSS, WAAPI, Motion, and anime.js; a full GSAP reference including ScrollTrigger and plugins
- **3D and generative** — Three.js from scene fundamentals through shaders, postprocessing, and React Three Fiber; canvas-based generative techniques
- **Video** — engine-neutral direction (story structure, beat planning, pacing, transitions); **product demo and promo film led by a 104-card shot vocabulary** with tuned reference implementations, a mode gate, and an eight-stage pipeline; dedicated engine modules for HyperFrames (HTML-to-video) and Remotion (React-to-video)
- **Generative media** — the other way to get frames: prompting image and video models for character references, multi-angle sheets, environment plates, and prompted shots. One cinematography grammar shared across stills and video, a continuity ledger so an identity lock survives a context reset, a batch manifest that fixes the look before the first prompt, a moderation pre-flight, and a failure table that maps generative misbehaviour to its actual cause
- **Sound** — the audio layer as a first-class module: one declarative SFX pin table authored after picture lock, relative frame pinning, genre-not-event vocabulary, anti-machine-gun technique, and a music beat-sync method that fits the grid, pins slams to real kick accents, and verifies the render to a ≤3-frame tolerance
- **Process** — a brief-locking interview ritual (the Grill Gate) that puts the choice of design house in the user's hands, a mockup fan-out with a hard user-approval gate, phase-appropriate workflows, and mandatory rendered verification
- **Protocols** — the absorbed projects' named actions stay runnable: ~23 refinement and craft actions, a page design flow plus three page verbs (audit / redesign / study), and 11 style and generation sub-skills, each routed from intent to the exact vendored procedure
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

Maestro is also served by the [cockpit](https://github.com/leobbaroni/cockpit) marketplace — the companion process pack (planning, orchestration, review, debugging, delivery). `/plugin marketplace add leobbaroni/cockpit` gets both from one place.

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
skill and confirming skills/maestro/references contains 24 modules and skills/maestro/library
exists (the vendored depth layer); (4) tell me the two
ways to trigger it (just asking for design/motion/video work, or /maestro) and that
substantial requests start with a short interview (the Grill Gate) — that's by design;
(5) optionally run "node scripts/check-upstreams.mjs" and tell me if the upstream
sources have changed since this copy was distilled.
```

## Full capabilities: engine and companion dependencies

Maestro itself has no runtime dependencies — install nothing beyond the skill to get design judgment, motion principles, and critique. The table below is what each rendering engine or companion tool needs, and only matters once a task actually reaches for it:

| Capability | Install | Notes |
|---|---|---|
| GSAP animation | `npm install gsap` (+ `npm install @gsap/react` for the React hook) | Or CDN: `https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js` |
| Three.js / React Three Fiber | `npm install three` (+ `@react-three/fiber @react-three/drei` for React) | |
| Remotion video | `npx create-video@latest --yes --blank --no-tailwind my-video && cd my-video && npm i` | Scaffolds a fresh project per video; nothing to install globally |
| HyperFrames video | Node.js **≥ 22** and [FFmpeg](https://ffmpeg.org/download.html) on PATH, then `npx hyperframes init my-video` | The full dev loop (`lint`, `check`, `snapshot`, `preview`, `render`) runs through `npx hyperframes ...` inside that project |
| Product-video shot previews, template mode, or the SFX/BGM library | Clone [Vincentwei1021/video-shotcraft](https://github.com/Vincentwei1021/video-shotcraft) | Optional. The shot cards, tuned demos, and components are vendored; the 108 MB preview gallery, the full template project, and the audio binaries are not. Browse shots online instead at [the hosted gallery](https://vincentwei1021.github.io/video-shotcraft/library.html) |
| Music beat-sync analysis | Python with `librosa` + `scipy` (e.g. `uv run --with librosa --with scipy --python 3.11`), FFmpeg for post-render verification | Only for films cut to a music track |
| HyperFrames deep skills (`hyperframes-animation`, `-creative`, `-core`, `-cli`, `-keyframes`, `-registry`) **plus `media-use` and `figma`** | `/plugin install hyperframes@claude-plugins-official` — the suite is in Anthropic's official marketplace, so all 19 skills arrive in one command. Outside the plugin system: `npx skills add heygen-com/hyperframes --full-depth`, which additionally ships `website-to-video` (the plugin carries that one as a docs guide, not a skill) | Optional. Maestro works without them but prefers their frame presets, motion rules, and CLI when present — see `references/companions.md`. Measured at ~2,540 always-on tokens for 19 descriptions against maestro's own ~180, so install it when you render video and skip it when you don't |
| `mediabunny`, Craftwork MCP | Install per each tool's own source/docs (`mediabunny` also arrives with Remotion) | Optional companions for media probing — maestro detects and defers to them when installed, see `references/companions.md` |

Maestro checks what's actually installed before reaching for any of the above; a design or motion conversation needs none of it.

## Usage

Maestro activates automatically for design, motion, 3D, and video work, or explicitly via `/maestro`. Three behaviors are intentional:

- **Substantial requests begin with a short interview.** The Grill Gate asks one question at a time, each with a recommended answer, until the brief is locked into a written spec. Small tweaks and fully specified requests skip it.
- **You choose which design house leads.** Maestro carries three with different instincts — structure-led, polish-led, and craft-led — and they produce visibly different work from the same brief. The interview asks early, in terms of what the result looks like rather than which project it came from, recommends one for your register, and locks your answer into the brief. Naming a house outright ends the question and overrides every internal default. Undecided is fine: the mockup fan-out can spend its options on that question, one per house.
- **Work is not reported done until rendered and reviewed.** Screenshots or rendered frames are compared against the locked brief before completion is claimed.

Named design actions run the originating project's real procedure, not a paraphrase of it: ask for an audit, a critique, a redesign, a study of a reference you admire, a polish pass, "make it bolder", a typography pass, or a brand kit, and maestro routes to that protocol in the vendored library and honors its output contract (report-only protocols do not edit).

Video engines are treated as peers: HyperFrames and Remotion each have a dedicated module, selected by project shape rather than by default.

## Repository layout

```
maestro/
├── .claude-plugin/              Plugin and marketplace manifests
├── skills/maestro/
│   ├── SKILL.md                 Router: task→module table, engine choosers, core rules
│   ├── templates/BRIEF.md       The brief template the Grill Gate fills
│   ├── references/              24 modules (design, page anatomy, commands, motion, 3D, video + shotcraft/sound, generative media, process, toolbox, companions)
│   └── library/                 Depth layer: 9 vendored corpora + per-corpus licenses and vendor notes
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

Maestro's own text is released under the [MIT License](LICENSE). The judgment layer is a distillation — no verbatim redistribution; modules that track a single authoritative source closely (the Design DNA schema, the HyperFrames contract, the Remotion API surface, the hallmark macrostructure catalog) name that source in their footers. The depth layer (`skills/maestro/library/`) redistributes three permissively licensed corpora verbatim, each with its own license file carried alongside (taste-skill MIT, hallmark MIT, impeccable Apache-2.0 with its NOTICE). Per-project attribution: [NOTICE.md](NOTICE.md).
