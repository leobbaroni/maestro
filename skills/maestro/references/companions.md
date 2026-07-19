# Companion Skills & Local Assets

*Maestro is self-contained knowledge — but when companion skills are installed alongside it, they carry operational assets (runnable examples, frame presets with embedded fonts, scripts, CLI tooling) that beat re-deriving from prose. Check what's installed, then prefer the real asset.*

## Detection

List the user's skills directory once per session when a task could use companions
(`~/.claude/skills/` on macOS/Linux, `%USERPROFILE%\.claude\skills\` on Windows; project-level
`.claude/skills/` also counts). Everything below is conditional on presence — maestro works
without any of it.

## The HyperFrames suite

If `hyperframes-*` skills are installed, they are the authoritative layer for HyperFrames video
work — maestro's `references/video-hyperframes.md` is the distilled contract; these carry the
full machinery. **Prefer their assets over inventing equivalents:**

| Skill | Operational assets worth loading directly |
|---|---|
| `hyperframes-animation` | ~36 atomic motion **rules** + ~15 scene **blueprints** (each a full recipe) with indexes; a **transition registry** with CSS implementations by family; ~13 runnable example compositions (`examples/*.html`) — working code to adapt, not just read about; 7 runtime **adapters** (GSAP, Lottie, Three.js, anime.js, CSS, WAAPI, TypeGPU) |
| `hyperframes-creative` | ~13 complete **frame presets** (`frame-presets/*/FRAME.md` + caption skins + showcase HTML; some embed real licensed woff2 fonts) — a full art direction ready to apply; 9 named **palettes**; a design-picker template; `scripts/contrast-report.mjs` for programmatic contrast validation |
| `hyperframes-core` | The full composition contract references (data-attributes, sub-compositions, determinism, storyboard/script formats) |
| `hyperframes-cli` | The actual dev loop: init, add, check, snapshot, preview, render, plus cloud/Lambda rendering |
| `hyperframes-keyframes` | Seek-safe keyframe patterns and diagnostics |
| `hyperframes-registry` | Installable blocks/components (`npx hyperframes add`) — check before hand-building a common section |

Routing rule: a HyperFrames render job starts from `/hyperframes` (the router) when installed;
maestro supplies direction, art direction, and motion judgment on top.

## Media & asset pipeline

- **`media-use`** — resolves any media need (BGM, SFX, images, icons, brand logos, voice, LUTs)
  into frozen local files with a ledger, and generates via TTS/music/image models when catalogs
  miss. Prefer it over manual asset hunting whenever it's installed; maestro's toolbox sources
  are the fallback and the "what to pick" judgment layer.
- **`figma`** — imports Figma designs, tokens, and animations into compositions.
- **`mediabunny`** — programmatic media probing/handling (durations, dimensions).
- **Craftwork MCP** (craftwork.design/mcp, Pro) — if connected, natural-language asset search
  over the pack library from inside the session.

## Workflow skills (video production)

`general-video`, `product-launch-video`, `website-to-video`, `faceless-explainer`,
`motion-graphics`, `music-to-video`, `pr-to-video`, `slideshow`, `embedded-captions`,
`talking-head-recut`, `remotion-to-hyperframes` — end-to-end pipelines. When one matches the
request, it owns the workflow; maestro's video-direction/motion modules inform the creative
decisions inside it.

## Upstream toolchains not installed as skills

Worth knowing exist even when absent locally:

- **impeccable** (github.com/pbakaus/impeccable) — beyond the knowledge maestro distilled, the
  upstream ships an operational toolchain: live in-browser design iteration, an automated
  anti-pattern detector, and an OKLCH brand-seed palette picker. Installable alongside maestro
  when live-iteration tooling is wanted.
- **gsap-skills** (github.com/greensock/gsap-skills) — runnable examples beyond the distilled API guidance.

A `~/.claude/skills-retired/` folder, if present, holds previously installed knowledge packs
(kept for rollback) — including, on some setups, impeccable's full `scripts/` toolchain, usable
in place (e.g. `node skills-retired/impeccable/scripts/palette.mjs` for a brand-seed color).
Treat retired packs as an archive: don't route to them as skills, but their scripts and assets
remain fair game when nothing live covers the need.

---
*Companion inventory current as of 2026-07; re-check the skills directory rather than trusting this list blindly.*
