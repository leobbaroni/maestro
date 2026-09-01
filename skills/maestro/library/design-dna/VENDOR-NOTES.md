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
| `scripts/measure-colors.mjs` | **Deterministic colour measurement.** Clusters a reference image into a palette with per-entry `hex`, `coverage` (0–1) and `role`. Run it instead of estimating hex by eye — eyeballed colour drifts by a ΔE of 10+ |
| `scripts/verify.mjs` | **The verify loop.** Scores a screenshot of the rebuild against a DNA file (or a standalone measurement) and reports per-colour ΔE and coverage drift with PASS/FAIL thresholds |
| `scripts/color-math.mjs` · `scripts/package.json` | The ΔE/colour-space helpers the two scripts import, and their dependency manifest — `npm install --prefix <this dir>` before first use |

Use it for extracting a reference UI into a structured profile, applying a profile to new work,
or deriving a palette when another module asks for one (`generative-direction.md` routes here).

Both scripts resolve paths relative to **their own directory**, not the project you are working in
— pass absolute paths for the reference image and the output, and give each reference its own
uniquely named measurement file.

Left upstream: the translated READMEs, the doc screenshots, and `scripts/test/`. Don't edit
vendored files.
