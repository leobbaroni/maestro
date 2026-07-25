# video-shotcraft — vendored subset

Source: [Vincentwei1021/video-shotcraft](https://github.com/Vincentwei1021/video-shotcraft), Apache-2.0 (`LICENSE` carried alongside). Distilled judgment layer: `../../references/video-shotcraft.md` and `../../references/video-sound.md`.

The upstream project is ~164 MB, most of it preview video and a full Remotion project. What ships here is the part an agent reads; the heavy assets stay upstream and are fetched only when a job needs them.

## Vendored here

| Path | What it is |
|---|---|
| `references/shots/` | **106 shot cards** — the vocabulary. Frontmatter (name · one-liner · when to use · duration · energy), then intent, motion core, parameter table with tuning feel, sound notes, known traps |
| `references/pipeline.md` | The eight-stage production pipeline (autonomous mode runs it end to end) |
| `references/guided-free-creation.md` | Co-creation mode: the same pipeline with user sign-off gates at stages 0–3 |
| `references/aesthetic-rules.md` | The quality standard as precedents — R rhythm · Q texture/camera/composition · S sound · C copy · P process |
| `references/sound-design.md` · `references/music-beat-sync.md` | Sound methodology and the beat-grid analysis method |
| `references/final-review.md` | The independent pre-delivery review checklist |
| `references/sequences/` | Whole-film energy skeletons to fill in before picking cards |
| `demos/` | The **tuned reference implementation per card** — the parameter truth the cards point at. Copy into a Remotion project and run |
| `assets/lib/` | Components to copy (not import): `PageCam`, `DigitRoll`, `FlashCut`, `Caption`, `FlatPanel`, `VerticalTicker`, `helpers/` |
| `assets/audio/ATTRIBUTION.md` | Manifest of the SFX/BGM library — names, durations, uses, licensing, and its known gaps |
| `SKILL.md` | The upstream router, kept for provenance |

## Deliberately upstream

| Not here | Why, and how to get it |
|---|---|
| `gallery/` (163 preview clips, 108 MB) | Browse the hosted gallery instead: <https://vincentwei1021.github.io/video-shotcraft/> — it's the right way to let a user *watch* shots and pick by name |
| `template/` (full Remotion project, 23 MB) | Clone the repo when running template mode |
| `assets/audio/*.mp3` (~30 MB of SFX + BGM) | Clone the repo, or source equivalents per the licensing guidance in `../../references/video-sound.md`. The manifest above tells you what exists |
| `demos/_textures/` (real-page captures) | Nine demos import these and won't run standalone without them; their card documentation is still complete. Clone the repo if you need those demos executable |

## Notes

- **Everything here is Chinese-language source material.** The distilled modules are maestro's English voice; these files are the authors' own. Read them directly — don't translate a card and then work from the translation, since the parameter tables and traps are where the value is.
- Card names resolve to `references/shots/<name>.md` and its implementation in `demos/<name>/`. The upstream `gallery/api/library.json` (not vendored) is the canonical name/style-key index; the hosted gallery exposes the same names.
- Don't edit vendored files. Local judgment belongs in the distilled modules; this tree is refreshed wholesale from upstream (`../../../../UPDATING.md`).
