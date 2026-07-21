# Changelog

## 3.0.1 — 2026-07-20

Adversarial-review fixes (fresh reviewer over the 3.0.0 integration; 0 P0 / 1 P1 /
2 P2 / 6 P3, all fixed):

- **Lucide demotion completed** — design-direction's icon roster still led with
  "Lucide (neutral default)"; now matches toolbox/design-audit (Phosphor et al.
  preferred; Lucide when asked or already present).
- **Italic-display rule made coherent** — the global roman rule now targets
  headings/headlines and explicitly carves out quote-voice display idioms
  (pull-quote heroes, letter salutations), matching hallmark's own internal logic;
  design-audit's gate and page-anatomy's Quote-Led/Letter shapes now agree.
- UPDATING.md's opening said "eight" upstreams (ten everywhere else); Riso/Carnival
  paper-band labels corrected to match the module's own thresholds; companions.md
  gained its attribution footer; gsap.md's footer credits taste-skill; index modules
  exempted from the 150-line floor in the AUTHORING SPEC; library README sub-skill
  count wording; one banned-word ("seamless") reword in prose.

## 3.0.0 — 2026-07-20

Two new upstream sources and a new two-layer architecture.

- **Absorbed [taste-skill](https://github.com/Leonxlnx/taste-skill)** (Leonxlnx, MIT): the
  anti-slop core (em-dash ban, eyebrow caps, premium-palette ban, copy self-audit, CTA
  hygiene, layout-repetition caps) into design-audit; hero discipline, consistency locks,
  density bands, and image/asset strategy into design-foundations; the three calibration
  dials, the Design Read, four aesthetic recipes, and the generate-first pipeline into
  design-direction; Brief→official-design-system routing and the icon-priority correction
  (Lucide demoted to when-already-present; Phosphor et al. preferred) into toolbox; React
  forbidden-motion patterns into motion-web; the Redesign Protocol and no-placeholder
  output rule into process.
- **Absorbed [hallmark](https://github.com/nutlope/hallmark)** (Together AI, MIT): NEW
  module `references/page-anatomy.md` — the structure-selection brain (21 macrostructures,
  ~50 component fingerprints, 20-theme catalog, genre scoping, enrichment tiers,
  diversification stamp); ~19 new mechanical gates into design-audit (roman headers,
  re-drawn-chrome ban, overflow-x clip, input-state discipline, nav/footer fingerprints…);
  accent ≤3%, the 2+1 font rule, and hero size-by-length brackets into design-foundations;
  the motion budget (≤3 primitives/page, default-on/off shapes, tooltip asymmetry) into
  motion-principles; study-verb structure extraction + URL-safety into design-dna;
  structure grilling + honest-copy pause into process.
- **New depth layer `skills/maestro/library/`** — three corpora vendored verbatim with
  their licenses (taste-skill 11 sub-skills; hallmark complete incl. the 20-theme
  `tokens.css`; impeccable's reference corpus + Apache NOTICE). The judgment layer points
  into it for exact recipes; `library/README.md` holds the rules of engagement. First
  verbatim redistribution — NOTICE.md and README licensing rewritten accordingly.
- **Standing conflict hierarchy: taste-skill > hallmark > impeccable** (contradictions
  only; everything else composes: hallmark structures → taste polish → impeccable
  critique). Applied resolutions: Lucide demotion (taste over maestro-current), global
  roman-header rule and accent ≤3% (hallmark over impeccable-derived values), OKLCH
  authoring vs hex extraction split, one easing vocabulary (hallmark tokens mapped to
  maestro's named curves).
- upstreams.json: both sources watched and pinned; UPDATING.md gains the re-vendor
  policy and the hierarchy rule; the setup prompt now verifies 18 modules + library.



## 2.3.3 — 2026-07-20

- README: maestro is now also served by the [cockpit](https://github.com/leobbaroni/cockpit)
  marketplace — the companion process pack (pilot, grilling, orchestrate, handoff,
  diagnosing-bugs, domain-modeling). One marketplace add installs the full stack.

## 2.3.2 — 2026-07-20

Upstream sync run. **No reference module changed** — the only drifted upstream
(impeccable, `331540d → d146d20`) moved entirely in its Live in-browser iteration
toolchain: 16 files under `skill/scripts/` plus `reference/live.md` (harness poll
policy, `event.scaffold` reuse, source locks, accept-error modes). That is operational
protocol for a tool maestro points at but does not distill; no design guidance,
API fact, or process rule in maestro was affected.

- `upstreams.json`: narrowed impeccable's watch from `skill` to `skill/reference` +
  `skill/SKILL.src.md`, so tooling churn no longer raises drift alarms that resolve to
  no work. Re-pinned all paths; the checker is clean.
- `UPDATING.md`: documented the watch-the-knowledge-layer rule and this precedent, so a
  future run narrows a noisy watch instead of re-absorbing the noise.

## 2.3.1 — 2026-07-20

- README gains a "Full capabilities: engine and companion dependencies" table: install
  commands for GSAP, Three.js/R3F, Remotion, and HyperFrames (Node ≥ 22 + FFmpeg), plus
  how to add the optional HyperFrames deep-skill suite and companion tools
  (`media-use`, `figma`, `mediabunny`, Craftwork MCP) that `references/companions.md`
  detects and prefers when present. Makes explicit that maestro's own knowledge has zero
  runtime dependencies — these are only needed once a task reaches for that capability.

## 2.3.0 — 2026-07-20

- New `references/companions.md`: maps the operational assets of companion skills
  (HyperFrames suite frame presets/animation rules/examples, media-use resolution, figma,
  Craftwork MCP, upstream toolchains) so maestro reaches for installed machinery instead
  of re-deriving from prose. Wired into the SKILL.md routing table.
- Restored the curation-feed corpus as a shipped module (`references/toolbox-corpus.md`)
  — the long tail behind toolbox.md's ° entries now installs with the skill, fixing the
  2.1.1 removal that made it unreachable.
- README/setup-prompt module counts updated (17 references).

## 2.2.0 — 2026-07-19

- Repository ownership and links moved to `leobbaroni` (plugin manifest, marketplace
  manifest, README install commands and setup prompt).
- README rewritten in a professional register: capabilities, installation matrix,
  usage contract (Grill Gate + rendered verification), repository layout, maintenance.

## 2.1.1 — 2026-07-19

Anti-slop / weight pass — 4 parallel adversarial reviews (design, motion/3D, video/native,
toolbox/meta clusters) against the skill's own design-audit.md standard. No marketing-voice
slop found in the prose; fixes below are broken references, one factual error, one
cross-file numeric contradiction, and redundancy cut for weight.

- **Fixed**: `design-foundations.md` linked to a nonexistent `references/motion.md` —
  pointed to `motion-principles.md`.
- **Fixed**: `platform-native.md`'s Compose spring stiffness/damping constants were
  shifted a tier off the real `androidx.compose.animation.core.Spring` values
  (VeryLow was 200, should be 50; etc.) — corrected. Softened the SwiftUI
  `.snappy`/`.smooth`/`.bouncy` table from exact-equals to approximation (those presets
  are natively duration/extraBounce-based, not response/dampingFraction).
- **Fixed**: `video-direction.md`'s video text-size floors (28–42px body, 18–24px labels)
  sat entirely below `video-remotion.md`'s stated hard minimums (44px/32px) — raised to
  match so the two modules no longer disagree when both are loaded for a Remotion job.
- **Fixed**: `toolbox.md` cited `research/craftwork-curation-2026-07.md` for provenance,
  but that file was never packaged by any install path (plugin manifest and both copy
  methods only touch `skills/`) — a dead reference in every real install. Deleted the file
  (fully absorbed into toolbox.md already; not consulted by the re-verification loop) and
  cut the reference. Also: removed the banned AI-tell word "unlock" from the file that
  teaches agents to avoid it; deduplicated three facts stated twice in the same file
  (Theatre.js dormancy, Craftwork MCP, Base UI default); fixed an unsupported "three-way
  name collision" claim that only named two parties.
- **Tightened for weight**: `gsap.md`'s and `video-remotion.md`'s "Common mistakes" tables
  each had ~half their rows just restating rules already given earlier in the same file —
  cut to the non-redundant rows only. Consolidated the same AI-slop-tells checklist that
  had drifted into three files down to one canonical copy in `design-audit.md`. Merged
  `process.md`'s two overlapping routing tables into one. Cut `SKILL.md`'s upstream-project
  list from twice to once (footer only). Cross-referenced instead of restating a shared
  spring-physics snippet in `threejs.md`/`creative-coding.md` and a transition-discipline
  rule in `video-hyperframes.md`/`video-direction.md`.

## 2.1.0 — 2026-07-19

- Mined @craftwork.design's Instagram curation feed (82 posts, Dec 2025–Jul 2026) via
  logged-in browser scrape; raw corpus archived in `research/craftwork-curation-2026-07.md`.
- `toolbox.md` gains: Generative visual & texture tools (Unicorn Studio, ShaderGradient,
  dither/grain generators, Photopea, browser creative-coding playgrounds, AI media gen);
  Agent-native design resources (Anthropic/Osmani/Taste/Hallmark skills, retro, MiroMiro,
  Ship Studio, Craftwork MCP, primeui.com benchmark); Learning & eye training; expanded
  gallery roles (60fps, section-level, brand archives, type-in-context, Before); type
  helpers and device-mockup/showcase tools; expanded component-library "also" tier.
- primeui disambiguated: the curated tool is primeui.com (closed AI site builder), a
  three-way name collision with PrimeTek's PrimeUI and primeui.store.
- New rule of engagement: curation-sourced entries (°) are spot-verified only.

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
