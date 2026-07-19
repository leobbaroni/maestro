# maestro repo

This repository ships a single Claude Code skill: `skills/maestro/SKILL.md` (design /
motion / 3D / video). If you're here to **use** the skill, install it per README.md.

If you're **working on this repo**:

- `skills/maestro/SKILL.md` is the router; the knowledge lives in
  `skills/maestro/references/`. Read a module before editing it.
- Any edit to a reference module must follow the AUTHORING SPEC in `UPDATING.md`
  (voice, format, length, attribution footer).
- Upstream sync: `node scripts/check-upstreams.mjs` reports drift against the pinned
  sources in `upstreams.json`; the full re-distillation playbook is in `UPDATING.md`.
- Bump `.claude-plugin/plugin.json` version and add a `CHANGELOG.md` entry with every
  content change.
