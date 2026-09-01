# maestro — for AI coding agents

This repo contains **maestro**, a unified design / motion / 3D / video skill.

If your harness supports Claude-style skills, install `skills/maestro/` (see README.md).
If it doesn't, do this instead:

1. Read `skills/maestro/SKILL.md` — it is the brain: a routing table from task type to
   knowledge module, engine choosers (web motion; HyperFrames vs Remotion for video), and
   14 always-on rules.
2. When a task matches a row in its routing table, read the matching file(s) under
   `skills/maestro/references/` (29 modules) before doing the work. Load only what the
   task needs — reading them all defeats the point of the router.
3. Honor Rule 0 (the Grill Gate): for substantial design work, interview the user —
   one question at a time, each with a recommended answer — until the brief is locked.
   Full method: `skills/maestro/references/process.md`.

4. **Generative work is harness-independent.** Image and video generation runs through
   CLIs and MCP servers, not through Claude-specific machinery, so it works the same on
   Codex or any harness that can run a shell command. Read
   `skills/maestro/references/generative-engines.md` first: it probes what this machine
   can actually reach, gates open-weight models against paid endpoints so the paid path
   is never taken silently, and checks the GPU before a local run. The full mechanics
   live in `skills/maestro/library/higgsfield-skills/` and `library/comfy-skills/` —
   vendored, and authoritative over the prose on anything mechanical.

Contributors: follow the AUTHORING SPEC in `UPDATING.md` for any module edit.
