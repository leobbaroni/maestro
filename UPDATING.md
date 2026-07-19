# Keeping maestro current

Maestro is a **distillation** of eight living upstream projects. When those projects
change, maestro should absorb the changes — without losing its single voice. This file is
the complete playbook; an AI agent can run it end-to-end.

## How drift is detected

- [`upstreams.json`](upstreams.json) pins the last-seen commit for every watched upstream
  path and maps each upstream to the maestro modules it feeds.
- `node scripts/check-upstreams.mjs` compares pins against the live repos and prints a
  drift report (exit code 1 on drift). `--pin` re-pins after you've absorbed changes.
- The [upstream-watch GitHub Action](.github/workflows/upstream-watch.yml) runs the check
  weekly and opens/updates an issue when drift appears — so a pushed copy of this repo
  keeps itself honest with zero attention.

## The re-distillation prompt

Paste this into Claude Code (or any capable coding agent) opened at the repo root:

```text
Update the maestro skill from its upstream sources.

1. Run `node scripts/check-upstreams.mjs` (set GITHUB_TOKEN if rate-limited). If nothing
   drifted, stop and say so.
2. For each drifted upstream, shallow-clone it to a temp directory and diff the watched
   paths against the pinned commit in upstreams.json
   (`git diff <pinned-sha>..HEAD -- <watched-path>`), so you see exactly what changed
   rather than re-reading everything.
3. For each affected maestro module (the drift report lists them), read the module, then
   merge in what changed upstream: new APIs, corrected guidance, new patterns, removed
   features. Follow the AUTHORING SPEC in UPDATING.md exactly — maestro stays one voice,
   150–500 lines per module, no verbatim wholesale copying.
4. Conflicts: official sources win on API facts (gsap-skills for GSAP, remotion for
   Remotion, hyperframes for HyperFrames, design-dna for the DNA schema). Maestro's
   editorial voice wins on style and structure.
5. Run `node scripts/check-upstreams.mjs --pin` to record the new pins.
6. Bump the version in .claude-plugin/plugin.json (minor for new guidance, patch for
   corrections), add a CHANGELOG.md entry naming which modules changed and why, and
   commit everything.
7. If the user has maestro installed at ~/.claude/skills/maestro, offer to refresh that
   copy from skills/maestro.
```

## AUTHORING SPEC (for anyone editing modules)

- Audience: an AI coding agent doing design/motion/video work. Modules load on demand.
  Write for machine consumption: imperative, dense, zero fluff, no marketing language.
- Format: `# Title`, one-line purpose in italics, `##` sections, tables for lookup data,
  short load-bearing code snippets only where a rule can't be stated in prose.
- Length: 150–500 lines per module. Distill hard; resolve conflicts into ONE
  recommendation (one line for a genuinely contested alternative).
- Self-contained: no local file paths, no source-repo internals. Cross-reference sibling
  modules as `references/<name>.md` only when it helps routing.
- Every module ends with `---` then `*Distilled from: <project names>.*`
- Never invent APIs. Never delete a hard warning (the "common mistakes" entries) without
  upstream evidence it's obsolete.

## Module → upstream map

| Module | Fed by |
|---|---|
| process.md | impeccable (+ the grilling/pilot/mockups rituals, which have no public upstream) |
| design-foundations.md | impeccable |
| design-direction.md | impeccable, genjutsu, hyperframes |
| design-dna.md | design-dna (authoritative), impeccable |
| design-audit.md | impeccable, genjutsu |
| motion-principles.md | motion-design-skill, genjutsu, impeccable |
| motion-web.md | genjutsu, hyperframes |
| gsap.md | gsap-skills (authoritative), genjutsu, hyperframes |
| threejs.md | threejs-skills, genjutsu |
| creative-coding.md | genjutsu |
| video-direction.md | hyperframes |
| video-hyperframes.md | hyperframes (authoritative) |
| video-remotion.md | remotion (authoritative) |
| platform-native.md | genjutsu |
| toolbox.md | live web verification — no git upstream; see below |
| toolbox-corpus.md | frozen curation-feed sample (2026-07) — historical record, only pruned |
| companions.md | the local skill ecosystem — re-check against an actual skills directory |

Two local-only source layers (design-kit references, hyperframes deep-skill content) have
no public repo to watch; their guidance only changes when you change it deliberately.

## Ecosystem facts (toolbox.md, motion-web.md)

`toolbox.md` and the Motion facts in `motion-web.md` encode **time-sensitive ecosystem
state** (library licensing, acquisitions, maintenance status) that no git pin can watch.
They carry a "verified" date. When it's ~6 months old, or any recommendation looks off,
run this prompt:

```text
Re-verify the ecosystem facts in skills/maestro/references/toolbox.md and the Motion
section of motion-web.md via web research: for each named library/tool/gallery, confirm
it is alive, its license/pricing tier, its maintenance status, and any
acquisition/rename. Update the modules per the AUTHORING SPEC (move dead or
newly-paywalled entries to the Excluded table with a reason; update the verified date),
bump the plugin version, add a CHANGELOG entry, commit.
```
