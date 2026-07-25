# video-shotcraft — vendor notes (maestro-authored)

*This file is maestro's manifest, not upstream material — everything else in this tree is an unmodified copy. Named `VENDOR-NOTES.md` rather than `README.md` so it never occupies the authors' own README path, and excluded from re-vendoring (`../../../../UPDATING.md`).*

Source: [Vincentwei1021/video-shotcraft](https://github.com/Vincentwei1021/video-shotcraft), Apache-2.0 (`LICENSE` carried alongside; upstream ships no NOTICE file). Distilled judgment layer: `../../references/video-shotcraft.md` and `../../references/video-sound.md`.

The upstream project is ~164 MB, most of it rendered video and captured textures. What ships here is everything an agent reads; only heavy binaries are left behind.

## Vendored here

| Path | What it is |
|---|---|
| `references/shots/` | **106 shot cards** — the vocabulary. Frontmatter (name · one-liner · when to use · duration · energy), then intent, motion core, a parameter table with tuning feel, sound notes, known traps |
| `references/pipeline.md` | The eight-stage production pipeline (autonomous mode runs it end to end) |
| `references/guided-free-creation.md` | Co-creation mode: the same pipeline with user sign-off gates at stages 0–3 |
| `references/aesthetic-rules.md` | The quality standard as precedents — R rhythm · Q texture/camera/composition · S sound · C copy · P process |
| `references/sound-design.md` · `references/music-beat-sync.md` | Sound methodology and the beat-grid analysis method |
| `references/final-review.md` | The independent pre-delivery review checklist |
| `references/sequences/` | Whole-film energy skeletons to fill in before picking cards |
| `demos/` | The tuned reference implementation for **96 of the 106 cards** — copy into a Remotion project and run |
| `template/src/` | The reference film's source: the implementations the **other 10 cards** point at, plus `aifl/Main.tsx` — the central SFX pin table the whole sound methodology is drawn from |
| `template/TEMPLATE.md` | The replace-guide template mode follows |
| `assets/lib/` | Components to copy (not import): `PageCam`, `DigitRoll`, `FlashCut`, `Caption`, `FlatPanel`, `VerticalTicker`, `helpers/` |
| `assets/scripts/capture-template.mjs` | The page-capture script `pipeline.md` stage 4 says to copy and configure |
| `assets/audio/ATTRIBUTION.md` | Manifest of the SFX/BGM library — names, durations, uses, licensing, and its known gaps |
| `SKILL.md` | The upstream router, kept for provenance |

**Every card's implementation resolves.** 96 resolve to `demos/<name>/`; these ten live in the template instead — `brand-ink-open`, `spotlight-hero-card`, `deck-deal-flyin`, `type-and-filter`, `list-stack-press`, `row-embed`, `document-typewriter-reveal`, `paper-title-card`, `outro-group-photo-launch`, `hires-rasterize-3d-text` — and each card's own *参考实现* section names the exact `template/src/...` file. That set covers most of the default energy-arc picks, which is why the template source is vendored rather than left upstream.

## Deliberately upstream

| Not here | Why, and how to get it |
|---|---|
| `gallery/` (161 preview clips, 108 MB) | Browse the hosted gallery instead: <https://vincentwei1021.github.io/video-shotcraft/> — the right way to let a user *watch* shots and pick by name |
| `template/out/` (15 MB rendered film) · `template/public/` (7.6 MB page textures) | The template's **source** is vendored and readable, but without its textures and output the project won't render as-is. Clone upstream to run it |
| `assets/audio/*.mp3` (~30 MB of SFX + BGM) | Clone upstream, or source equivalents per the licensing guidance in `../../references/video-sound.md`. The manifest above says what exists |
| `demos/_textures/` (real-page captures) | Nine demos import these and won't run standalone without them; their card documentation is still complete |

## Notes

- **Every file here except this one is Chinese-language source material.** The distilled modules carry maestro's English voice; these are the authors' own. Read them directly — don't translate a card and then work from the translation, since the parameter tables and the known-traps sections are where the value is.
- Card names resolve to `references/shots/<name>.md` plus the implementation that card names. The upstream `gallery/api/library.json` (not vendored) is the canonical name/style-key index; the hosted gallery exposes the same names.
- Don't edit vendored files. Local judgment belongs in the distilled modules; this tree is refreshed wholesale from upstream.
