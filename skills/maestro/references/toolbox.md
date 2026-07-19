# Toolbox

*Vetted component libraries, animation resources, inspiration galleries, and asset sources — what to reach for, what to avoid, and the license traps. Facts verified 2026-07; re-verify per UPDATING.md when stale.*

## Rules of engagement

1. **Prefer owned code.** Copy-paste/registry components (shadcn model) beat npm dependencies for anything you'll restyle — the code lands in the project and bends to the design spec.
2. **Check the license per component, not per site.** Free tiers sit next to paid tiers everywhere; never generate imports for a paid tier's components.
3. **Flair libraries are ingredients, not directions.** Pick the art direction first (`references/design-direction.md`); pull a component only when it serves the thesis. A page assembled from Aceternity/Magic UI defaults is instantly recognizable slop.
4. **Audit what you paste.** Community components ship without `prefers-reduced-motion` guards, focus states, or semantic markup more often than not — run pasted code through the `references/design-audit.md` bar.
5. **Restyle to the tokens.** Swap default palettes, radii, and fonts for the project's design spec before shipping; defaults are a tell.

## Component libraries — React + Tailwind

| Library | Role | Stack / license | Notes |
|---|---|---|---|
| **shadcn/ui** | The backbone: accessible product UI, forms, app shells — and the registry protocol everything else installs through | React, Tailwind v4; MIT | 2026 state: CLI v4, registry namespaces, `registry:base` full-design-system installs; **Base UI is the default primitive base since Jul 2026** (Radix and React Aria still supported). Theme it with **tweakcn** (free OSS visual theme editor) |
| **Origin UI** | ~600 free copy-paste components — the primitive catalog beyond shadcn defaults (54 buttons, 59 inputs, tables, date pickers) | React/Next, Tailwind; MIT | Acquired by Cal.com; now at coss.com/origin in **maintenance mode** — fine to copy from, don't expect new work (successor: coss ui "Particles") |
| **HeroUI** (ex-NextUI) | Versioned npm dependency alternative; v3 rewritten on React Aria + Tailwind v4; React Native sibling | React (+RN); MIT (Pro templates paid) | When a maintained dependency beats owned code, or RN parity matters |
| **PrimeUI** (PrimeReact/Vue/NG) | Enterprise data-heavy UI: DataTable/TreeTable, filtering, editing, pickers; the Angular default | npm dependency | **Licensing changed Jun 2026**: MIT only up to PrimeReact 10 / PrimeVue 4 / PrimeNG 21 — new majors are commercial (free Community tier is registration-gated, org-size limits). Pin the MIT versions for unrestricted use. **Volt** (volt.primevue.org) = their free MIT shadcn-style copy-paste variant, Vue only. PrimeBlocks is paid |
| **Tremor** | Dashboards, charts, KPI blocks (35 components + 300 blocks) | React, Tailwind, Radix; MIT | Vercel-owned; former Pro blocks now all free |
| **Magic UI** | Animated marketing components (marquees, number tickers, heroes); installs via shadcn CLI | React, Tailwind, Motion; MIT (Pro templates paid) | Ships its own agent skill in-repo |
| **ReactBits** | Animated text/backgrounds/effects; 4 variants (JS/TS × CSS/Tailwind); per-component CSS/GSAP/Three.js | React; **MIT + Commons Clause** | License nuance: free in client/commercial sites, can't resell as components. The most reduced-motion-conscious of the flair libraries |
| **Aceternity UI** | Maximal award-site effects: spotlights, 3D cards, parallax | React, Tailwind, Motion; free tier MIT, Pro $199 | Copy-paste only (no CLI); **no reduced-motion handling by default** — add guards yourself |
| **Lightswind UI** | Animated marketing components with 3D/WebGL shader flourishes (aurora text, 3D pins, 25 background effects, animated cursors) | React, Tailwind v3/v4, Motion + GSAP + Three.js; MIT core, Pro paid | CLI copies source into the project (`npx lightswind@latest init`); single-maintainer — judge visual quality per component |

Also: **Uiverse** (6,700+ community CSS micro-elements, MIT, framework-agnostic — quality varies) and **Animata** (copy-paste animation snippets, MIT).

**Vue / Svelte:** `shadcn-vue` and `shadcn-svelte` are the maintained registry ports and the safe defaults. **Inspira UI** fills the animated-flair role for Vue/Nuxt. Svelte has no established flair library — shadcn-svelte + hand-rolled Svelte transitions.

## UI transition snippets

**transitions.dev** (Jakub Antalik) — curated, live-demoed copy-paste **CSS transitions for app UI**: modals, dropdowns, badges, text swaps, icon swaps, success/error states, skeletons, tabs. Dependency-free CSS namespaced under `t-*` classes, themed via custom properties, with `prefers-reduced-motion` guards built in. Free core; Pro (paid) adds the full 33+ set and React/TS variants; first-party agent skill: `npx skills add Jakubantalik/transitions.dev`.

Scope facts: element/component transitions, **not** page transitions or a View Transitions API tool. Repo has **no OSS license** — link and learn from it; don't vendor its snippets into redistributed work. Young project (2026) — expect churn.

## Animation helper tools

| Tool | Reach for it when |
|---|---|
| **easings.net** | Naming/looking up a standard curve with its CSS/math |
| **cubic-bezier.com** | Hand-tuning one bezier |
| **easing.dev** | Picking a tasteful production-grade preset fast — cubic AND spring curves, copyable |
| **Easing Wizard** (easingwizard.com) | Springs in pure CSS via `linear()` output |
| **Rive** | Interactive/stateful vector animation assets (reactive icons, characters); freemium editor, OSS runtimes |
| **LottieFiles** | Drop-in decorative/loader animations; prefer dotLottie (40–70% smaller); check per-asset license |

GSAP and all its plugins are fully free (post-Webflow) — no paid-plugin caveats. **Theatre.js is dormant** (no releases since ~2024) — do not recommend it.

## Inspiration galleries

| Gallery | Role | Access |
|---|---|---|
| **Awwwards** | Award-grade full-site craft and motion — the ceiling reference | Free |
| **Godly** (godly.website) | Tighter, experimental curation; daily updates | Free |
| **Mobbin** | Real shipped-product UX flows, 586k+ screens (iOS/Android/Web) | Freemium; full library paid |
| **Refero** (refero.design) | Real web-app screens by page type and component — "Mobbin for web" | Freemium |
| **Land-book** | Broad landing-page gallery, filter by style/color | Free |
| **Saaspo** | 1,300+ SaaS landing pages with section-type filtering (hero, pricing, footer) | Free |
| **Craftwork Curated** | The former curated.design — hand-picked sites + section-level patterns, now at craftwork.design/curated/websites | Free |
| **dark.design / footer.design** | Niche fills: dark themes; footers | Free |

Routing logic: Awwwards/Godly for visual+motion ambition · Mobbin/Refero for real-product UX evidence · Land-book/Saaspo for landing-page and section reference. `curated.design` as a standalone is gone (301s to Craftwork).

## Asset sources

**Craftwork (craftwork.design)** — curated human-made asset packs: illustrations (the reputation core), device mockups, UI kits (*Blank*: 3,200+ components for Figma/Framer/Webflow), gradients, 3D. License allows commercial + client work; bans resale, physical products, and being the primary component of a product for sale. Free entry: *Ultima* (750+ illustrations). Pro ($199/yr) unlocks the catalog and an **official MCP server** (craftwork.design/mcp) — agents query assets in natural language. Use it for cohesive pack-quality assets; use dedicated font sources for fonts.

**Fonts** (deep guidance in `references/design-direction.md`): Fontshare (ITF-FFL foundry quality) · Fontsource (2,000+ OFL fonts as versioned npm packages — deterministic, self-hosted, agent-ideal) · UNCUT.wtf (163 display-forward free faces, check per-font license).

**Icons**: Lucide (ISC — the shadcn default) · Phosphor (MIT, 9,000 icons × 6 weights — weight variety as art direction) · **Iconify** (224 sets / ~330k icons behind one API with per-set licenses surfaced — one dependency, every style). One set per project.

## Excluded — and why

| Resource | Reason |
|---|---|
| **originkit.dev** | API-gated (free key, 10 component fetches/day), ~50 components, no license published for the component code, negligible track record. Not confusable with Origin UI (above) |
| **Theatre.js** | Dormant: development moved private years ago, no releases since early 2024 |
| **21st.dev / Magic MCP** | Paid-quota hosted API, uneven community quality, and documented recurring prompt-injection issues filed against its MCP — do not wire it into agent workflows |
| **curated.design** (standalone) | Absorbed into Craftwork; use Craftwork Curated |
| **Radix Themes** | Slowed maintenance; shadcn defaulted to Base UI (Jul 2026). Radix *primitives* remain fine where already in use |

---
*Compiled from live web verification (2026-07) of each project's site, repo, npm, and licensing pages.*
