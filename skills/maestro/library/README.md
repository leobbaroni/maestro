# Library — the depth layer

*Full source corpora, vendored verbatim. The distilled modules in `../references/` are the
judgment layer — they decide WHAT to do; when they point here, load the named file for the
complete recipe, token set, or protocol. Never load a whole corpus — load the one file the
task needs.*

## Contents

| Corpus | What it holds | Entry point |
|---|---|---|
| `taste-skill/` | 11 sub-skills: the anti-slop v2 core + brandkit, brutalist, minimalist, soft, redesign, image-to-code, stitch, output, imagegen-frontend web/mobile | `taste-skill/skills/<name>/SKILL.md` |
| `hallmark/` | 21 macrostructures, ~50 component fingerprints, 20 themes across 4 genres, 57 slop-test gates, audit/redesign/study verbs, per-craft references | `hallmark/SKILL.md`, then `hallmark/references/...` |
| `impeccable/` | Per-action design references (typeset, layout, colorize, critique, audit, harden, delight, brand, …) | `impeccable/reference/<action>.md` |
| `video-shotcraft/` | 106 product-video shot cards with tuned reference implementations, the eight-stage pipeline, aesthetic-rule precedents, sound design and beat-sync method. Partial vendor — see its own README for what stays upstream | `video-shotcraft/README.md`, then `references/shots/<card>.md` |

## Rules of engagement

1. **References first.** The distilled modules route every task; come here only when they
   point here or when a task needs exact long-tail detail (a theme's full tokens, a
   fingerprint's full recipe, a sub-skill's complete protocol).
2. **Hierarchy on contradiction only:** taste-skill > hallmark > impeccable. Everything
   non-conflicting composes — a typical page job takes hallmark's structure selection,
   taste-skill's component polish and slop kill, impeccable's critique pass. The hierarchy
   is about *design taste*; `video-shotcraft` is the authority in its own domain (product
   video) and doesn't compete with the three.
3. **These files speak their authors' voices** — treat them as source material, not as
   maestro's own guidance. Where they disagree with a distilled module, the distilled
   module already encodes the resolution; follow it.
4. **Don't edit vendored files.** They are refreshed wholesale from upstream when the
   drift watcher fires (see `../../../UPDATING.md`). Local fixes belong in the distilled
   modules.

## Licensing

Each corpus carries its own license file: `taste-skill/LICENSE` (MIT, © Leonxlnx),
`hallmark/LICENSE` (MIT, © Hallmark contributors / Together AI), `impeccable/LICENSE`
(Apache-2.0, © Paul Bakaus; its upstream `NOTICE.md` is carried alongside as required),
`video-shotcraft/LICENSE` (Apache-2.0, © Wei Yihao). Files are unmodified copies; sync
provenance is pinned in `upstreams.json`. Third-party media referenced by
`video-shotcraft/assets/audio/ATTRIBUTION.md` carries its own separate licensing — read
that manifest before shipping any of it commercially.
