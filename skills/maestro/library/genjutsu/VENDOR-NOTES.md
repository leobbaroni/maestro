# genjutsu — vendor notes (maestro-authored)

*maestro's manifest, not upstream material. Everything else in this tree is an unmodified copy.*

Source: [AThevon/genjutsu](https://github.com/AThevon/genjutsu), MIT (`LICENSE` carried).
Distilled into `../../references/design-direction.md`, `design-audit.md`, `motion-principles.md`,
`motion-web.md`, `gsap.md`, `threejs.md`, `creative-coding.md`, `platform-native.md`.

## Two runnable orchestrators

These are genjutsu's headline capabilities — run them rather than approximating them:

| Protocol | What it does | Path |
|---|---|---|
| **cast** | Motion, micro-interactions, and wow-factor on an *existing* UI. Scans the stack, proposes an interaction thesis, loads the sub-skills it needs, implements the illusion | `cast/SKILL.md` |
| **paint** | A complete visual universe: art-direction brainstorm → design system → implementation → audit. The anti-AI-slop design pipeline | `paint/SKILL.md` |

Both adapt to web, Android (Jetpack Compose), and Apple (SwiftUI) — that cross-platform reach is
genjutsu's distinguishing property and the reason `platform-native.md` exists.

## The 14 technique sub-skills

`_jutsu/<name>/` — each with its own `SKILL.md` plus references. `cast` and `paint` load these
on demand, and they are directly loadable when a task needs one technique rather than a pipeline:

`canvas-generative` · `compose-graphics` · `compose-motion` · `compose-multiplatform` ·
`css-native` · `design-audit` · `desktop-principles` · `framer-motion` · `gsap` ·
`mobile-principles` · `motion-principles` · `swiftui-graphics` · `swiftui-motion` · `threejs-r3f`

## Deliberately not vendored

`_jutsu/ui-ux-pro-max` — 1.7 MB of Python tooling and CSV datasets, four times the size of
everything else in this library, and it needs a Python runtime to do anything. Clone genjutsu
directly when a job actually calls for it. It is also excluded from the drift watch in
`upstreams.json`, where it was 93% of the churn and produced zero maestro edits.

Don't edit vendored files — local judgment belongs in the distilled modules.
