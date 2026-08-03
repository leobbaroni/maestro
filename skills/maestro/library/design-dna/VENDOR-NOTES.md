# design-dna — vendor notes (maestro-authored)

*maestro's manifest, not upstream material. Everything else in this tree is an unmodified copy.*

Source: [zanwei/design-dna](https://github.com/zanwei/design-dna), MIT (`LICENSE` carried).
**Authoritative on the DNA schema** — `../../references/design-dna.md` distils the workflow, but
the exact JSON shape lives here and the schema wins on any disagreement.

## Contents

| File | What it is |
|---|---|
| `SKILL.md` | The three-dimension model — design system (tokens), design style (qualitative feel), visual effects (Canvas, WebGL, 3D, particles, shaders, scroll) — and when each phase runs |
| `references/schema.md` | The full JSON profile shape. Read this before writing or consuming a DNA file |
| `references/generation-guide.md` | Going the other way: generating a design from an existing DNA profile |

Use it for extracting a reference UI into a structured profile, applying a profile to new work,
or deriving a palette when another module asks for one (`generative-direction.md` routes here).

Left upstream: the translated READMEs. Don't edit vendored files.
