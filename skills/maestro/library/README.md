# Library — the depth layer

*Full source corpora, vendored verbatim. The distilled modules in `../references/` are the
judgment layer — they decide WHAT to do; when they point here, load the named file for the
complete recipe, token set, or protocol. Never load a whole corpus — load the one file the
task needs.*

**Every bundled source ships its runnable protocols here.** The distilled layer selects and
resolves; this layer is what makes the selection executable, so a named action runs the
originating project's real procedure instead of maestro's paraphrase of it.
`../references/commands.md` is the intent → protocol router.

## Contents

| Corpus | What it holds | Entry point |
|---|---|---|
| `taste-skill/` | 11 sub-skills: the anti-slop v2 core + brandkit, brutalist, minimalist, soft, redesign, image-to-code, stitch, output, imagegen-frontend web/mobile | `taste-skill/skills/<name>/SKILL.md` |
| `hallmark/` | 21 macrostructures, ~50 component fingerprints, 20 themes across 4 genres, 57 slop-test gates, audit/redesign/study verbs, per-craft references | `hallmark/SKILL.md`, then `hallmark/references/…` |
| `impeccable/` | Per-action design references (typeset, layout, colorize, critique, audit, harden, delight, …) plus the pre-edit quality floor (`craft-floor.md`), the new-surface flow (`new-work.md`), and per-mode depth (`operate.md`) | `impeccable/reference/<action>.md` |
| `genjutsu/` | Two runnable orchestrators — **cast** (motion, micro-interactions, wow-factor on an existing UI) and **paint** (full visual universe: art direction → design system → implementation → audit) — over 14 technique sub-skills spanning web, Compose, and SwiftUI | `genjutsu/cast/SKILL.md`, `genjutsu/paint/SKILL.md`, `genjutsu/_jutsu/<name>/SKILL.md` |
| `gsap-skills/` | GreenSock's own eight-part skill set: core, timeline, plugins, ScrollTrigger, React, frameworks, performance, utils — plus `llms.txt` | `gsap-skills/skills/<name>/` |
| `design-dna/` | The DNA extraction schema and its generation guide — the authoritative shape for reference-UI capture | `design-dna/SKILL.md`, `design-dna/references/schema.md` |
| `motion-design-skill/` | LottieFiles' motion-design skill: principles, timing, and the Lottie handoff | `motion-design-skill/skills/motion-design/` |
| `video-shotcraft/` | 104 product-video shot cards with tuned reference implementations, the eight-stage pipeline, aesthetic-rule precedents, sound design and beat-sync method. Partial vendor | `video-shotcraft/VENDOR-NOTES.md`, then `references/shots/<category>/<card>.md` |
| `higgsfield-directors/` | The two generative-media prompt directors — stills and video — including all five canonical camera blocks and the prompt scaffolds | `higgsfield-directors/VENDOR-NOTES.md` |

## Not vendored, and why

- **threejs-skills** — the upstream declares **no license**, so it cannot be redistributed
  inside this MIT plugin. maestro's `references/threejs.md` distillation stands on its own;
  clone `CloudAI-X/threejs-skills` yourself if you want the source corpus.
- **remotion** and **hyperframes** — both are live toolchains that ship their own agent skills
  through their own CLIs (Remotion's now self-updates during `npx remotion upgrade`). A
  vendored snapshot would be a stale second copy competing with the real one, so
  `references/companions.md` routes to the installed skill instead.
- **genjutsu's `ui-ux-pro-max`** — 1.7 MB of Python tooling and CSV data, four times the size
  of everything else vendored here and needing a Python runtime. Clone genjutsu directly when
  a job actually calls for it.

## Rules of engagement

1. **References first.** The distilled modules route every task; come here when they point
   here, when a task needs exact long-tail detail (a theme's full tokens, a fingerprint's full
   recipe), or when a named protocol should run for real.
2. **Hierarchy on contradiction only:** taste-skill > hallmark > impeccable. Everything
   non-conflicting composes — a typical page job takes hallmark's structure selection,
   taste-skill's component polish and slop kill, impeccable's critique pass. The hierarchy is
   about *design taste*; `video-shotcraft` is authoritative in product video, `gsap-skills` and
   `design-dna` on their own APIs and schema, and none of those compete with the three.
3. **These files speak their authors' voices** — source material, not maestro's guidance. Where
   they disagree with a distilled module, the module already encodes the resolution.
4. **Don't edit vendored files.** They are refreshed wholesale when the drift watcher fires
   (see `../../../UPDATING.md`). Local fixes belong in the distilled modules. Each corpus's
   `VENDOR-NOTES.md`, where present, is maestro-authored and stays.

## Licensing

MIT: `taste-skill/LICENSE` (© Leonxlnx), `hallmark/LICENSE` (© Hallmark contributors /
Together AI), `genjutsu/LICENSE` (© AThevon), `gsap-skills/LICENSE` (© GreenSock),
`design-dna/LICENSE` (© zanwei), `motion-design-skill/LICENSE` (© LottieFiles).
Apache-2.0: `impeccable/LICENSE` (© Paul Bakaus; its upstream `NOTICE.md` carried alongside as
required), `video-shotcraft/LICENSE` (© Wei Yihao). `higgsfield-directors/` is the maestro
author's own material.

Files are unmodified copies; sync provenance is pinned in `upstreams.json` for everything with
a public upstream. Third-party media referenced by `video-shotcraft/assets/audio/ATTRIBUTION.md`
carries its own separate licensing — read that manifest before shipping any of it commercially.
