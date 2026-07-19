# Changelog

## 2.0.0 — 2026-07-19

- New module `toolbox.md`: live-verified (2026-07) catalog of component libraries
  (shadcn/ui Base-UI era, Origin UI post-acquisition, HeroUI v3, PrimeUI's Jun-2026
  licensing restructure + Volt, Tremor, Magic UI, ReactBits, Aceternity, Lightswind),
  transitions.dev, animation helper tools (easing.dev, Easing Wizard, Rive, LottieFiles),
  inspiration galleries (Awwwards, Godly, Mobbin, Refero, Saaspo, Craftwork Curated),
  asset sources (Craftwork + MCP, Fontshare/Fontsource/UNCUT, Lucide/Phosphor/Iconify) —
  plus an explicit Excluded table (originkit.dev, Theatre.js, 21st.dev Magic MCP,
  standalone curated.design, Radix Themes) with reasons.
- `motion-web.md`: Motion rebrand corrections — install `motion` not `framer-motion`,
  `motion/react` imports, first-class vanilla + `motion-v`, `motion/mini`, Motion+
  paid-component warning, migration notes.
- `design-direction.md`: Craftwork added to legal sourcing; reference-workflow galleries
  updated (curated.design → Craftwork Curated, + Refero/Saaspo/niche galleries).
- `UPDATING.md`: ecosystem-facts re-verification loop for content no git pin can watch.

## 1.1.0 — 2026-07-19

- Single-repo marketplace (`.claude-plugin/marketplace.json`) — install is now two commands.
- Dynamic upstream tracking: `upstreams.json` (pinned source commits + module map),
  `scripts/check-upstreams.mjs` (drift checker / re-pinner), and a weekly
  `upstream-watch` GitHub Action that opens an issue when sources change.
- `UPDATING.md`: full re-distillation playbook with a paste-ready AI prompt and the
  authoring spec.
- Recipient onboarding: README rewritten with requirements, three install paths, and an
  AI setup prompt; root `CLAUDE.md` + `AGENTS.md` so any agent picks the skill up from a
  bare clone.
- `skills/maestro/templates/BRIEF.md`: the brief-lock template the Grill Gate freezes
  answers into.

## 1.0.0 — 2026-07-19

- Initial distillation: SKILL.md brain + 14 reference modules from impeccable, genjutsu,
  gsap-skills, threejs-skills, design-dna, motion-design-skill, remotion, hyperframes,
  plus the grilling/pilot/mockups process rituals and design-kit references.
