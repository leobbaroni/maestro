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
| `hyperframes-animation` | 48 atomic motion **rules** + 22 scene **blueprints** (each a full recipe) with indexes; a **transition registry** with CSS implementations by family; ~13 runnable example compositions (`examples/*.html`) — working code to adapt, not just read about; 7 runtime **adapters** (GSAP, Lottie, Three.js, anime.js, CSS, WAAPI, TypeGPU) |
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
request, it owns the workflow *mechanics*; maestro's `video-direction.md`, `motion-*`,
`video-shotcraft.md`, and `video-sound.md` inform the creative decisions inside it.

**One overlap needs calling out.** `product-launch-video` matches the same brief
(`references/video-shotcraft.md`) leads: a product demo or promo. They aren't rivals —
the workflow skill is a HyperFrames pipeline, shotcraft is a Remotion shot vocabulary and
production method. Resolve by engine and by what the user already has: an existing
HyperFrames project or a request naming that workflow → it owns the run, with shotcraft's
mode gate, energy skeleton, and sound discipline informing the choices inside it. A
greenfield product film with no engine committed → shotcraft leads and picks the engine.
Never run both pipelines over one brief; say which is driving.

## Upstream toolchains not installed as skills

Worth knowing exist even when absent locally:

- **impeccable** (github.com/pbakaus/impeccable) — beyond the knowledge maestro distilled, the
  upstream ships an operational toolchain: live in-browser design iteration, an automated
  anti-pattern detector, and an OKLCH brand-seed palette picker. Installable alongside maestro
  when live-iteration tooling is wanted.
- **gsap-skills** (github.com/greensock/gsap-skills) — runnable examples beyond the distilled API guidance.
- **remotion-maps** (in remotion-dev/remotion under `packages/skills`) — map-driven video: Cesium 3D flyovers, Mapbox/MapLibre/MapTiler vector reveals, static-map fallbacks, each with render-stability rules for deterministic headless capture, plus geo-prep scripts and sample data. Needs the map SDK and usually an API token, so it isn't distilled here; pull the technique folder when a brief actually calls for maps.
- **video-shotcraft** (github.com/Vincentwei1021/video-shotcraft) — the shot cards, pipeline, and reference implementations are vendored (`library/video-shotcraft/`), but three heavy pieces are not: the **hosted gallery** at <https://vincentwei1021.github.io/video-shotcraft/library.html> (161 motion samples — the right way to let a user watch shots and pick by name, no install needed; the preview clips now live in a release rather than the repo, so a local gallery must fetch its media first), the **full Remotion template project** needed for template mode, and the **SFX/BGM binaries** (~30 MB; the manifest is vendored, the files aren't). Clone the repo when a job needs the template or the audio.

- **Higgsfield** (higgsfield.ai) — a hosted generative-media platform, not an installable skill: a
  browser UI where the user pastes a prompt, attaches reference images, and picks the aspect
  ratio. maestro composes the text; the platform runs it. Nothing here shells out to it, no
  credential is ever needed on this side, and generation costs the user credits — so name the
  asset count before a batch runs. `generative-stills.md` and `generative-video.md` carry the
  per-surface adapters (Banana Pro, Soul Cinema, GPT-2, Seedance); the grammar above them is
  engine-neutral and holds for any comparable platform.

A `~/.claude/skills-retired/` folder, if present, holds previously installed knowledge packs
(kept for rollback) — including, on some setups, impeccable's full `scripts/` toolchain, usable
in place (e.g. `node skills-retired/impeccable/scripts/palette.mjs` for a brand-seed color).
Treat retired packs as an archive: don't route to them as skills, but their scripts and assets
remain fair game when nothing live covers the need.

---
*Distilled from: the local skill ecosystem (HyperFrames suite, media-use, figma, upstream toolchains). Inventory current as of 2026-07; re-check the skills directory rather than trusting this list blindly.*
