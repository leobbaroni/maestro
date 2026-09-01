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
| `hyperframes-audio` | Mixing audio already placed in a composition — voiceover carve against a music bed, effect chains (EQ, compressor, limiter), ducking and bus structure |
| `hyperframes-registry` | Installable blocks/components — search with `npx hyperframes catalog --query "<what it should do>"` (the query is a flag, not a positional; `--on-device` upgrades lexical matching to meaning-ranking). **Query in English whatever language the video is in** — the catalog and both index tiers are English, and the on-device model is English-only, so another script returns nothing rather than nothing *relevant*. Then `npx hyperframes add`. When the results genuinely do not cover the move, **report the gap before hand-authoring it** (`npx hyperframes feedback --search-miss "<query>" --wanted "<the move>"`; `catalog --query` prints the line pre-filled) — that signal is the only way a missing block gets built, since install counts cannot see a move nobody could install. Offline, search still works from cached manifests but `add` always needs the network |

Routing rule: a HyperFrames render job starts from `/hyperframes` (the router) when installed;
maestro supplies direction, art direction, and motion judgment on top.

## Media & asset pipeline

- **`media-use`** — resolves any media need (BGM, SFX, images, icons, brand logos, voice, LUTs)
  into frozen local files with a ledger, and generates via TTS/music/image models when catalogs
  miss. Prefer it over manual asset hunting whenever it's installed; maestro's toolbox sources
  are the fallback and the "what to pick" judgment layer.
- **`figma`** — imports Figma designs, tokens, and animations into compositions.
- **`mediabunny`** — programmatic media probing/handling (durations, dimensions).
- **Media treatments are a resolved primitive, not an improvisation.** When `media-use` is installed, vague footage feedback and named looks (grades, LUTs, film treatments, effects) resolve through its treatment references *before* editing. Don't substitute a generic LUT, a CSS filter, an overlay, or an opacity tween for a canonical treatment that exists — and keep text, layout, and motion edits in their own domain rather than smuggling them into a treatment.
- **Craftwork MCP** (craftwork.design/mcp, Pro) — if connected, natural-language asset search
  over the pack library from inside the session.

## Workflow skills (video production)

`general-video`, `product-launch-video`, `faceless-explainer`, `motion-graphics`,
`music-to-video`, `pr-to-video`, `slideshow`, `embedded-captions`, `talking-head-recut`,
`remotion-to-hyperframes` — end-to-end pipelines. When one matches the request, it owns the
workflow *mechanics*; maestro's `video-direction.md`, `motion-*`, `video-shotcraft.md`, and
`video-sound.md` inform the creative decisions inside it.

`website-to-video` is a **conditional** eleventh: it ships with upstream's `npx skills add`
route but not with the `hyperframes@claude-plugins-official` plugin, which carries it as a
documentation guide instead. Check that it is installed before routing to it, and when it is
absent, drive the capture through `hyperframes-cli` and direct the result here rather than
naming a skill that will not resolve.

**One overlap needs calling out.** `product-launch-video` matches the same brief
(`references/video-shotcraft.md`) leads: a product demo or promo. They aren't rivals —
the workflow skill is a HyperFrames pipeline, shotcraft is a Remotion shot vocabulary and
production method. Resolve by engine and by what the user already has: an existing
HyperFrames project or a request naming that workflow → it owns the run, with shotcraft's
mode gate, energy skeleton, and sound discipline informing the choices inside it. A
greenfield product film with no engine committed → **run the film-kind pick first**
(`process.md` §1b). If the user chooses the product film, shotcraft leads; choosing between the
workflow skill and the module is then a tiebreaker inside that pick, never a substitute for it.
Never run both pipelines over one brief; say which is driving.

## Generative engines — first-party skills and MCPs

Both major generative platforms ship installable skills **and** MCP servers, and both corpora are
vendored into `library/`. `references/generative-engines.md` is the routing layer over them; it
carries the reachability probe, the OSS-vs-paid gate, and the three places maestro overrides
upstream. Read it before composing a generative prompt — not this section, which only says what
exists.

| Platform | Reach it by | maestro's layer |
|---|---|---|
| **ComfyUI** (comfy.org) | Local install driven by comfy-cli + the first-party **comfy-mcp** (`pip install comfy-mcp`, needs Python ≥ 3.10, comfy-cli ≥ 1.14, and a running ComfyUI). Cloud variant at `https://cloud.comfy.org/mcp`, installable as `/plugin install comfy-cloud@comfy-skills` after `/plugin marketplace add Comfy-Org/comfy-skills` — it runs workflows on Comfy's GPUs, so it needs a subscription and sees a standard catalog rather than the user's own nodes. Skills: the same marketplace | `library/comfy-skills/` (MIT) — workflow mechanics, template vs node routing, the OSS/partner split |
| **Higgsfield** (higgsfield.ai) | The `higgsfield` CLI (`curl -fsSL https://raw.githubusercontent.com/higgsfield-ai/cli/main/install.sh \| sh`, then `higgsfield auth login`); the MCP at `https://mcp.higgsfield.ai/mcp`; or REST at `api.higgsfield.ai`. Skills: `/plugin marketplace add higgsfield-ai/skills` then `/plugin install higgsfield@higgsfield`, or `npx skills add higgsfield-ai/skills` | `library/higgsfield-skills/` (MIT) — 8 skills covering generation, Soul ID, brandkit, product photoshoot, explainers, thumbnails, marketplace cards, websites |

**Both are paid surfaces**, and each meters differently — Higgsfield bills credits per generation;
ComfyUI is free on the user's own GPU and billed per run on partner models or Comfy Cloud. That
difference is the whole reason `generative-engines.md` has a route gate: never pick between them
silently.

`library/higgsfield-directors/` (the two hand-written prompt directors) is **no longer the
authority on Higgsfield mechanics** — the vendored skills are. The directors remain the source for
the six cinema modes and their paste-ready camera blocks, which upstream has no equivalent of.

## Upstream toolchains not installed as skills

Worth knowing exist even when absent locally:

- **impeccable** (github.com/pbakaus/impeccable) — beyond the knowledge maestro distilled, the
  upstream ships an operational toolchain: live in-browser design iteration, an OKLCH brand-seed
  palette picker, the `concept-seed` roll `process.md` §3 hands off to, and a measured build state
  machine for the comp-led path. Its **anti-pattern detector runs as an edit hook on Claude Code,
  Codex, and GitHub Copilot alike** — not a Claude-only convenience — firing on design-relevant
  edits (`.tsx` `.jsx` `.html` `.vue` `.svelte` `.astro` `.css` `.scss` `.ts` `.js`) and surfacing
  only the mechanical, unambiguous tier: broken images, clipped or overflowing content, contrast
  and legibility failures. The deeper tier stays out of the per-edit path deliberately, so the hook
  interrupts an edit only for things that are unarguably wrong. Installable alongside maestro
  whenever live-iteration tooling or that hook is wanted.
- **threejs-skills** (github.com/CloudAI-X/threejs-skills) — ten Three.js skills (fundamentals, geometry, materials, lighting, textures, shaders, postprocessing, animation, loaders, interaction). **The only bundled source not vendored into `library/`**, because the upstream declares no license and can't be redistributed inside an MIT plugin. `threejs.md` is a complete distillation and stands alone; clone the repo yourself if you want the corpus.
- **gsap-skills** (github.com/greensock/gsap-skills) — the skills themselves are vendored (`library/gsap-skills/`); what stays upstream is the framework `examples/` tree (Nuxt, React, Vue, vanilla starters) and its assets.
- **genjutsu's `ui-ux-pro-max`** (github.com/AThevon/genjutsu) — 1.7 MB of Python tooling and CSV datasets, excluded from the vendor for size and its Python dependency. The other 14 sub-skills plus the `cast` and `paint` orchestrators are vendored.
- **remotion-maps** (in remotion-dev/remotion under `packages/skills`) — map-driven video: Cesium 3D flyovers, Mapbox/MapLibre/MapTiler vector reveals, static-map fallbacks, each with render-stability rules for deterministic headless capture, plus geo-prep scripts and sample data. Needs the map SDK and usually an API token, so it isn't distilled here; pull the technique folder when a brief actually calls for maps.
- **video-shotcraft** (github.com/Vincentwei1021/video-shotcraft) — the shot cards, pipeline, and reference implementations are vendored (`library/video-shotcraft/`), but three heavy pieces are not: the **hosted gallery** at <https://vincentwei1021.github.io/video-shotcraft/library.html> (161 motion samples — the right way to let a user watch shots and pick by name, no install needed; the preview clips now live in a release rather than the repo, so a local gallery must fetch its media first), the **full Remotion template project** needed for template mode, and the **SFX/BGM binaries** (~30 MB; the manifest is vendored, the files aren't). Clone the repo when a job needs the template or the audio.

A `~/.claude/skills-retired/` folder, if present, holds previously installed knowledge packs
(kept for rollback) — including, on some setups, impeccable's full `scripts/` toolchain, usable
in place (e.g. `node skills-retired/impeccable/scripts/palette.mjs` for a brand-seed color).
Treat retired packs as an archive: don't route to them as skills, but their scripts and assets
remain fair game when nothing live covers the need.

---
*Distilled from: the local skill ecosystem (HyperFrames suite, media-use, figma, upstream toolchains). Inventory current as of 2026-07; re-check the skills directory rather than trusting this list blindly.*
