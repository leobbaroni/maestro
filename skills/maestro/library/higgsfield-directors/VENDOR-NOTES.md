# higgsfield-directors — vendor notes (maestro-authored)

*This file is maestro's manifest, not source material — the two files beside it are unmodified copies. Excluded from any re-vendoring pass.*

Source: two author-written Claude Code skills, `banana-pro-director` and `cinema-worldbuilder`, supplied by the maestro author from their own working setup. **No upstream repository** — they are not tracked in `upstreams.json` and the drift checker does not watch them; when the author revises their originals, re-copy by hand and re-distill.

Distilled judgment layer: `../../references/generative-direction.md` (the shared grammar), `../../references/generative-stills.md`, `../../references/generative-video.md`.

## What's here

| File | What it is |
|---|---|
| `banana-pro-director.md` | The still-image director: character lock, base reference via two paths, the 6-panel sheet, scene and environment plates, detail portraits. Carries the full worked prompt scaffolds and the pre-prompt check formats |
| `cinema-worldbuilder.md` | The video director: the five cinema modes with **all five paste-ready camera blocks**, the Seedance output format, runtime discipline, per-shot timing, diegetic audio rules, mode stacking |

## Why both are kept whole

Two things in these files are quoted rather than summarized, so the originals have to stay readable:

- **The five canonical camera blocks** in `cinema-worldbuilder.md`. Each is a single tuned sentence naming body, lens, filtration, movement, grade, palette, grain, shutter, and runtime. The distilled module carries the mode *table* and tells you to paste the block whole — a paraphrased camera block is a different instruction to the model.
- **The prompt scaffolds** in both files. They are templates with slots, not prose to be reworded.

## What the distilled layer changed

The two originals overlapped heavily — the five cinema modes, the whole reference-reading section, and the naming/brand/age-blind/no-invention/no-aspect-ratio rules appeared in both, near-verbatim. maestro states each once in `generative-direction.md` and the two surface modules inherit them. Four things were added that neither original had: a **continuity ledger** (`CHARACTERS.md` / `WORLD.md`) so an identity lock survives a context reset, a **batch manifest** that locks the cinema mode across every asset in a brief before the first prompt is composed, **palette derivation** for the mode that demands hex values, and a **failure-recovery table** mapping generative misbehaviour to its actual cause.

Read these originals when you need a scaffold verbatim or want the author's own phrasing on a rule the module compressed. Don't edit them — local judgment belongs in the distilled modules.
