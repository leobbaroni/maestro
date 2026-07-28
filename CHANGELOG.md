# Changelog

## 3.4.0 — 2026-07-28

Absorbed the drift in video-shotcraft (four watched paths), remotion, and hyperframes-cli.
**The shot library reorganized itself under maestro's feet**, and the sound library grew from
a flat folder into a categorized one — both of which invalidate paths maestro told agents to
read.

### Paths that stopped resolving

- **Shot cards and demos are now filed under ten functional categories** (`opening`,
  `typography`, `ui-entrance`, `camera`, `data`, `interaction`, `transition`, `rhythm`,
  `effects`, `outro`). Every path maestro published gained a segment: cards live at
  `references/shots/<category>/<name>.md`, implementations at `demos/<category>/<name>/`.
  The frontmatter-harvest recipe (`shots/*.md`) matched nothing after the move and is fixed;
  the category table is now in the module, since picking a narrative slot now picks a
  directory.
- **Two cards were retired upstream** — `hires-rasterize-3d-text` and `scene-locked-title`
  (plus the `snorricam-lock` style). The count is **104 cards, 95 with demo implementations,
  nine implemented in the reference film** — and the nine are now exactly the default
  energy-arc picks, which is the cleanest that split has ever been.
- **The preview clips left git.** The hosted gallery is now the only zero-setup way to let a
  user watch shots and pick by name; a local gallery has to fetch its media first. maestro
  links `…/library.html` and says so in three places.

### Sound — the module nearly doubled

The upstream sound library was restructured into `bgm/` plus **149 sounds across 16
categories**, and audited file by file. What that produced is the kind of specific,
hard-won material the distilled layer exists to carry:

- **The category map, with the two mappings nobody guesses**: the vocabulary's `sparkle`
  is filed under `light/` (there is no `sparkle/`), and whoosh shares `transition/` with
  scene changes. The other eleven categories are the custom-foley layer.
- **`ui/` is a trap and now says so.** It is the one category holding both real switch foley
  and synthesized confirmation tones — the latter being exactly what the genre rule excludes.
  Audition it file by file; the original sample names (`tone`, `bleep`, `alert`,
  `notification`) give the synthetic ones away.
- **Corrected: maestro banned the wrong thing.** The old text banned "click/pluck/glass tap
  families", which reads as banning *actions* — while the source bans a *timbre* and the
  reference film's own loudest cue is a real camera shutter on a click, and `glass/` is real
  material. The rule is now stated as written upstream, with the discriminating question
  (does it sound like the object, or like a game engine's feedback tone?) — and maestro's own
  cue table no longer contradicts its own ban.
- **`volume` is a multiplier, not a target level.** A sample peaking at −24.6 dB played at
  `volume={1}` is still −24.6 dB, while BGM at 0.34 sits near −9.4 dB — so "turn it up to 1.0"
  is not a fix for the seven quiet files in the library. Three routes in order: swap the
  sample, pre-normalize on ingest, or gain above 1 (Remotion genuinely amplifies — but the
  *preview clamps to 1.0* on the legacy audio path, so judge on the render and check for
  clipping).
- **Long samples need explicit windows** — 21 files exceed 5s — with the windowing criteria:
  room tone runs the shot, action samples run the gesture, and impacts with long reverb tails
  are the exception that should *not* be cut tight.
- **Byte-identical duplicates defeat the anti-machine-gun move.** Four pairs in the library
  are the same asset under two names; alternating between a pair is not alternating. Hash on
  ingest rather than trusting filenames.
- **A scored film ships two cuts** — with BGM, and without BGM but with SFX intact — rendered
  from the same timeline via a boolean `bgm` input prop, at the acceptance stage rather than
  at final delivery. Not a second project, and not an ffmpeg track-strip afterwards.

### Legibility, in two modules

- **Minimum effective text height**, new in `video-shotcraft.md` as the source's Q11 and in
  `video-direction.md` as an engine-neutral floor: captions ≥5% of frame height, secondary
  text ≥3%, measured as `fontSize × ancestor scale × perspective compression` **on the
  rendered frame**, not read out of the code. Type has exactly two honest states — texture
  (deliberately unreadable) or meant-to-be-read; the middle state, reflowed "for legibility"
  but still under the floor, is the failure that survives review because it looks handled.
- Remotion's own layout floors (84px headline, 44px supporting at 1080 wide) were checked
  against maestro's frame-craft table and **match exactly** — no edit, verified rather than
  assumed.

### Remotion

- **Studio interactivity is a code-shape contract**, and the upstream skill went from a stub
  to a full specification. maestro now carries it: styles as inline object literals,
  `interpolate()` written inline on the animated property with only `frame` as input,
  hardcoded output range/easing/extrapolation, `scale`/`translate`/`rotate` instead of
  `transform`, composition metadata and `defaultProps` inline, effects arrays literal and
  never conditional, fixed copy inline rather than extracted. Stated with its tradeoff:
  this fights the usual DRY instincts, so it's a per-project decision — anything the Studio
  can't read literally goes grey and stops being editable.
- **Corrected: `lightLeak` and `starburst` moved into `@remotion/effects`.** maestro told
  agents to import them from `@remotion/light-leaks` and `@remotion/starburst`, which would
  now fail for the effect functions. The standalone package still ships the `<LightLeak>`
  *component* for transition overlays (4.0.415+) — a different thing with the same name.
- **`--props` as a file, not inline JSON**, wherever a render command is written down:
  Windows shells strip the inner quotes and Remotion receives malformed JSON. The same
  finding drives the no-music cut above.
- Studio: open a composition directly at `/<composition-id>`; re-running `studio` reprints
  the URL of the server already up.

### Also

- `--resolution landscape|portrait|square` at HyperFrames scaffold time, rather than resizing
  a project later.
- HyperFrames CLI's drift was skill-attribution telemetry (`--skill` now persists in
  `hyperframes.json`); nothing maestro documents changed. Verified, not absorbed.
- Vendored corpus refreshed wholesale: `template/`'s project config restored,
  `assets/audio/AUDITION-2026-07-27.md` added (per-file duration, measured peak, suggested
  pin point — what makes the windowing and level rules usable without the binaries), and the
  `_textures` dependency count corrected from nine demos to four.

## 3.3.0 — 2026-07-25

Absorbed four drifted upstreams (impeccable, genjutsu, remotion, hyperframes) and fixed the
3.2.0 review findings. **Two live correctness bugs, both found by re-reading the sources
rather than by inspection.**

### Correctness

- **HyperFrames reversed its media-placement rule.** maestro said `<video>`/`<audio>` must be
  a direct child of the host composition root or it "renders blank/black and no validator
  catches it." Upstream now seeks media at any nesting depth, resolving each element's owning
  composition and rebasing its start. Placement is a *timeline* decision (which timeline
  animates it), not a correctness one — and a blank panel is now a real bug rather than a
  placement symptom. Three edits in `video-hyperframes.md`, plus a new determinism rule: CSS
  `transition` on any timeline-animated element flickers under out-of-order sampling.
- **impeccable dropped the halt-and-report rule** that 3.1.1 had just added to `commands.md`.
  `typeset` and `layout` no longer refuse to run without the detector, so maestro was
  refusing two protocols that no longer refuse. They move to "degrades cleanly".
- **Three platform-native API errors** (genjutsu): Android reduce-motion should prefer
  `ValueAnimator.areAnimatorsEnabled()` (API 26+) over `areTransitionsEnabled()` (API 34+,
  wrong in two places); the `@Animatable` macro is iOS 26+, not 17+; `.snappy` approximates
  `response: 0.5`, not 0.3 — maestro's own table already listed its siblings at 0.5.

### Dead citations from impeccable's restructure

It deleted `brand`, `codex`, and `interaction-design`, renamed `product` → `operate`, and
turned `craft` into a deprecation stub. `commands.md` cited four of those. Fixed, plus:
`init` writes PRODUCT.md only (never DESIGN.md), `new-work` replaces `craft` as the
build-a-surface protocol, and `doctor` is documented as user-invocable outside the table.
Re-vendored the corpus (32 → 34 reference files).

**The recurrence mechanism is now closed:** `commands.md` was absent from every vendored
corpus's `feeds` list, so drift reports never named the one module a verb rename breaks
hardest. Added to impeccable, taste-skill, and hallmark.

### New guidance absorbed

- Two more surface modes beyond Brand/Product — **Read** (docs, guides: structure for
  comprehension first) and **Experience** (portfolios: the artifact leads, the interface
  recedes), picked from the surface rather than the product (`design-foundations.md`).
- The blanket `prefers-reduced-motion` kill is a safety net for third-party CSS, not the
  answer for your own — it strips the state feedback those users still need
  (`motion-principles.md`, `design-audit.md`).
- Nielsen heuristics may score `n/a` and renormalize (`24/32`, never `/40` over a partial
  set); working-memory limits extended to docs sidebars, long-form reading paths, and
  gallery indexes (`design-audit.md`).
- Three calibration corrections and "truth binds claims, not demonstrations"
  (`design-direction.md`); the standing canon exit in every options round (`process.md`).
- Five new scene blueprints for the AI-product-demo family — prompt-and-answer, agent
  working theater, panel live-sync, scroll-to-artifact, zoom-out reveal — plus two corrected
  duration/role bands (`video-direction.md`). Rule and blueprint counts corrected to 48/22.
- Remotion's new maps technique family is routed, not distilled (`companions.md`) —
  dependency-heavy and token-gated, matching how maestro already treats bulk add-ons.

### 3.2.0 review fixes (1 P0 · 4 P1 · 10 P2 · 6 P3)

- **P0:** ten shot cards — including most of the default energy arc — had implementations
  only in the un-vendored template, so the module's own read-the-implementation rule was
  unsatisfiable on its recommended path. Vendored `template/src` (147 KB of the template's
  23 MB; the bulk is rendered output and textures), which also brings `Main.tsx`, the SFX pin
  table the sound module is drawn from. **All 106 cards now resolve.**
- SKILL.md still said ten upstreams and three corpora; README's licensing paragraph omitted
  a redistributed Apache-2.0 corpus; UPDATING contradicted itself in one section.
- `impact` and `click-camera` were both declared the film's loudest cue — the source's own
  numbers (0.55 vs 0.6) settle it for click-camera.
- `video-sound.md`'s engine-neutrality claim now handles HyperFrames properly: seconds not
  frames, and `data-start="<clip> + N"` as the native relative-pinning primitive.
- companions.md and SKILL.md handed the same product-promo job to different owners — now
  resolved by engine and by what the user already has.
- The vendor manifest was a maestro-authored file sitting at the upstream README's path
  inside a tree documented as unmodified copies → renamed `VENDOR-NOTES.md` and excluded
  from re-vendoring. Preview-clip count corrected 163 → 161; `capture-template.mjs` vendored.

### Watch scopes narrowed

genjutsu now watches its 14 fed sub-skills individually (excluding the Python tooling and
orchestrator plumbing that were 93% of its drift and produced zero edits); hyperframes
watches the six core skills plus the router's SKILL.md, which is the one file any workflow
add/rename must touch — preserving the companions signal while dropping 44% of the diff
surface; remotion drops one segment to `packages/skills/skills`, whose parent carries a
`package.json` that version-bumps every release.

## 3.2.0 — 2026-07-25

Eleventh upstream: **[video-shotcraft](https://github.com/Vincentwei1021/video-shotcraft)**
(Wei Yihao, Apache-2.0) becomes the lead for product demo and promo film — without
displacing anything.

- **New `references/video-shotcraft.md`** — the lead module for product/demo video: the
  three-mode gate (template / autonomous / co-creation) that must be settled before any
  production work and is the user's to pick; the 106-card shot vocabulary with a
  one-pass frontmatter harvest so selection doesn't mean opening 106 files; the
  proven per-segment energy skeleton; the real-screenshot doctrine and its
  three-piece capture set (full-page 2× texture, per-element cutouts, `layout.json`);
  the read-the-exact-demo rule; and still-frame acceptance per shot.
- **New `references/video-sound.md`** — sound as a first-class, **engine-neutral** module,
  because the discipline is identical for HyperFrames, Remotion, and shotcraft and only
  the playback primitive differs. Covers the picture-locks-first ordering (and why: three
  full re-pins, two of them pure downstream cost), the central declarative SFX pin table,
  **relative pinning** (`SHOTS.<shot>.from + offset`, never bare frames), vocabulary
  chosen by genre rather than by UI event, a moment→cue lookup, the riser→impact→sparkle
  finale phrase, mixing levels, the three-move anti-machine-gun treatment, and the full
  beat-sync method — least-squares grid fit (don't trust the tempo scalar), kick-band
  accent detection for slam placement, `beatF()` timelines, and mandatory post-render
  verification to ≤3 frames.
- **Nothing is obsoleted.** `video-direction.md` still plans story and beats for any
  engine and now points at the sound module for production discipline; `video-remotion.md`
  still governs the API and determinism that shotcraft renders through, and says so;
  `video-hyperframes.md` gains the sound module with its framework-owned-playback caveat;
  a single shot card is explicitly portable into a HyperFrames composition. SKILL.md's
  video chooser now asks what the film *is* before which engine renders it.
- **Partial vendor** at `library/video-shotcraft/` (2.1 MB of 164 MB upstream): the 106
  shot cards, the tuned reference implementation per card, the pipeline/aesthetic-rules/
  final-review/beat-sync/sound-design references, the copy-in components, and the audio
  manifest. Deliberately not redistributed — the 108 MB preview gallery (browse it hosted
  instead), the 23 MB template project, and the ~30 MB of audio binaries; the split and
  its reasons are documented in that library's own README and in the re-vendor policy.
- `commands.md` gains the mode gate; `companions.md` gains the upstream retrieval routes;
  upstreams.json watches and pins it; NOTICE/README/UPDATING updated (21 modules, eleven
  upstreams, four vendored corpora, plus the optional librosa/FFmpeg tooling for beat sync).

*Known deviation:* both new modules run under the AUTHORING SPEC's 150-line floor (114 and
134) while sitting mid-pack on substance (2291 and 1760 words, against design-dna's 2397) —
they use long prose lines rather than many short table rows. Padding them to clear a line
count would make them worse, so they ship as-is.

## 3.1.1 — 2026-07-20

Adversarial-review fixes on 3.1.0 — maestro's share of a 0 P0 / 4 P1 / 4 P2 / 3 P3 pass.

- **`commands.md` flagged the wrong protocols.** `typeset` and `layout` require impeccable's
  detector script and their own text forbids proceeding without it, but carried no caveat —
  maestro would have promised a judgment-only fallback the source prohibits. Meanwhile `init`
  was flagged as needing the upstream install when the deliverable it names (PRODUCT.md /
  DESIGN.md) runs fine vendored; only its optional live-mode step doesn't. The caveat is now
  three honest cases: blocked, partly blocked, degrades cleanly.
- The overlap table said impeccable's `audit` scores usability heuristics; the source calls
  itself "a code-level audit, not a design critique" (heuristics belong to `critique`) —
  corrected, and it no longer contradicts commands.md's own table sixty lines above.
- `ios` / `android` / `interaction-design` / `product` moved out of the protocol table: the
  source loads them automatically by platform, so they are references, not invocable commands.
- "hallmark's four verbs" was wrong in SKILL.md, README, and the 3.1.0 entry — hallmark has a
  default design flow plus three verbs; there is no `build` verb to type.
- §1a offered Blend as the "recommended default" while the recommendation rule mapped every
  register to a single house, leaving it unreachable; blend now has a real trigger (mixed
  register, or a brief pulling both ways).
- Scoped the "a named house overrides the hierarchy" claim. A named house ends the question and
  decides which protocol runs — but the source hierarchy was applied at distillation time and is
  baked into the reference prose; it was never a runtime dial to override.

## 3.1.0 — 2026-07-20

The absorbed projects stay *usable*, not just readable, and the user picks whose taste leads.

- **New `references/commands.md`** — the vendored corpora ship runnable protocols, not
  only knowledge. This module maps an intent to the exact one: impeccable's ~23 named
  actions (critique, audit, polish, bolder, quieter, distill, harden, onboard, animate,
  colorize, typeset, layout, delight, overdrive, clarify, adapt, optimize, craft, shape,
  document, extract…), hallmark's default design flow plus its three verbs (audit /
  redesign / study), and taste-skill's 11 sub-skills. It also resolves **overlapping verbs** — impeccable's
  `audit`, hallmark's `audit`, and taste-skill's slop sweep ask different questions and
  return different artifacts, so the module says which to run and when running several is
  the right answer. Protocols needing upstream scripts (`live`, `hooks`, `init` capture)
  are flagged as such rather than silently half-running.
- **The design authority is now the user's call** (`process.md` §1a, wired into SKILL.md
  Rule 0 and the brief lock). Maestro carries three houses with different instincts;
  the grill asks early which one leads — offered by look and feel, never by skill name —
  recommends one for the register, pushes once past "whatever looks best", and locks the
  answer. A named house overrides every default and the standing hierarchy. When the user
  can't decide from description, the mockup fan-out spends its options on the question,
  one per house, labeled by look and revealed after the pick.
- README/AGENTS/UPDATING updated: 19 modules, the protocol capability, the authority pick,
  a re-vendor step that re-checks commands.md against each corpus's own verb list, and a
  line-floor exemption for routing modules.

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
