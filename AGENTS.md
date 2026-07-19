# maestro — for AI coding agents

This repo contains **maestro**, a unified design / motion / 3D / video skill.

If your harness supports Claude-style skills, install `skills/maestro/` (see README.md).
If it doesn't, do this instead:

1. Read `skills/maestro/SKILL.md` — it is the brain: a routing table from task type to
   knowledge module, engine choosers (web motion; HyperFrames vs Remotion for video), and
   14 always-on rules.
2. When a task matches a row in its routing table, read the matching file(s) under
   `skills/maestro/references/` before doing the work. Load only what the task needs.
3. Honor Rule 0 (the Grill Gate): for substantial design work, interview the user —
   one question at a time, each with a recommended answer — until the brief is locked.
   Full method: `skills/maestro/references/process.md`.

Contributors: follow the AUTHORING SPEC in `UPDATING.md` for any module edit.
