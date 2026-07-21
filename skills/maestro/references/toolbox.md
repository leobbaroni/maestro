# Toolbox

*Vetted component libraries, animation resources, inspiration galleries, and asset sources — what to reach for, what to avoid, and the license traps. Facts verified 2026-07; re-verify per UPDATING.md when stale.*

## Rules of engagement

1. **Prefer owned code.** Copy-paste/registry components (shadcn model) beat npm dependencies for anything you'll restyle — the code lands in the project and bends to the design spec.
2. **Check the license per component, not per site.** Free tiers sit next to paid tiers everywhere; never generate imports for a paid tier's components.
3. **Flair libraries are ingredients, not directions.** Pick the art direction first (`references/design-direction.md`); pull a component only when it serves the thesis. A page assembled from Aceternity/Magic UI defaults is instantly recognizable slop.
4. **Audit what you paste.** Community components ship without `prefers-reduced-motion` guards, focus states, or semantic markup more often than not — run pasted code through the `references/design-audit.md` bar.
5. **Restyle to the tokens.** Swap default palettes, radii, and fonts for the project's design spec before shipping; defaults are a tell.
6. **Curation-sourced entries** (marked °) come from a design-curation social feed (2026-07) with spot-verification only — confirm a small tool is alive before making it load-bearing in a deliverable. The full raw pool (fonts, templates, packs, Mac apps not curated here) is in `references/toolbox-corpus.md`.

## Brief → official design system

When a brief reads as one of these verticals, install and use the **official** package — don't recreate its CSS by hand, don't import tokens then override 90%, and run one design system per project (never two in one tree):

| Brief reads as | Reach for | Note |
|---|---|---|
| Microsoft / enterprise SaaS | `@fluentui/react-components` | Official Fluent, a11y done |
| Google-ish / Material product | `@material/web` + Material 3 tokens | Theme via Material Theming |
| IBM-style B2B analytics | `@carbon/react` + `@carbon/styles` | Mature data-density patterns |
| Shopify app surfaces | Polaris (web components / React) | Required for Shopify admin |
| Atlassian / Jira-style | `@atlaskit/*` + `@atlaskit/tokens` | Official Atlassian DS |
| GitHub-style devtool | `@primer/css` / `@primer/react-brand` | Brand variant for marketing |
| UK public-sector service | `govuk-frontend` | Regulatorily expected |
| US public-sector / trust-first | `uswds` | Same |
| Fast local-business MVP | Bootstrap 5.3 | Boring, fast, works |
| Accessible React foundation | `@radix-ui/themes` | Primitives + polished theme |
| Modern SaaS, own the components | shadcn/ui (`npx shadcn@latest add …`) | Never ship default state |
| Tailwind-based SaaS / indie | Tailwind v4 + `dark:` | Default for small teams |

When the brief is an **aesthetic, not a system** (glassmorphism, bento, brutalism, editorial, kinetic type), there is no official package — build with native CSS + Tailwind + a maintained library, and label borrowed vs official honestly in comments. Apple's Liquid Glass is documented for Apple platforms only; web versions are `backdrop-filter` approximations — label them as such and provide a `prefers-reduced-transparency` solid fallback. Install commands + a labelled approximation skeleton: `library/taste-skill/skills/taste-skill/SKILL.md` appendices.

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

Also: **Preline** and **TailGrids** (large free Tailwind component/block sets), **Untitled UI** (Figma + React kit, free tier), **Uiverse** (6,700+ community CSS micro-elements, MIT — quality varies by contributor), **Animata** (copy-paste animation snippets, MIT), and smaller flair kits°: Skiper UI (motion blocks), Cult UI (polished visual patterns), Align UI, ReUI, Oxbow UI (component sets), termcn (terminal-styled React).

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

GSAP and all its plugins are fully free (post-Webflow) — no paid-plugin caveats. (Theatre.js is excluded — see below.)

## Generative visual & texture tools

- **Unicorn Studio**° — no-code interactive WebGL motion scenes embeddable on the web; a corpus recurrer for "sites that add depth" hero effects.
- **ShaderGradient**° — animated shader-gradient backgrounds (web, Figma, Framer embeds); a corpus recurrer.
- Grain/dither/texture generators°: **Ditther** (dithering textures), **Granient** / **Granirad** (grainy gradients) — plus fffuel and the inline `feTurbulence` recipe in `references/design-direction.md`.
- **Photopea** — free in-browser Photoshop-class editor; the no-install raster answer.
- Browser creative-coding playgrounds: **Cables**, **Hydra**, **NodeToy**°, **Constraint Systems** — prototype shader/generative ideas before committing code (`references/creative-coding.md`).
- AI media generation, when the brief commits to generated imagery (rules in `references/design-direction.md`): **Recraft** (vector/brand-consistent), **Ideogram** (reliable text-in-image), **Runway**/**Krea** (video/image).

## Agent-native design resources

Complements (and competitors) to this skill — worth knowing when a user asks:

- Design skills for coding agents°: **Frontend Design** (Anthropic's original), **Agent Skills** (Addy Osmani's production pack), **Taste Skill** (Leon Lin, anti-slop), **Hallmark** (anti-slop with theme gates), **Figma Implement Design** (OpenAI, Figma→code), **Awesome Claude Design** (living index of design skills), **retro** (MIT; mines session transcripts into CLAUDE.md rules).
- **MiroMiro** — Chrome extension extracting rendered-DOM design tokens + HTML/Tailwind from any live site (freemium, €9/mo or €69 lifetime); a practical feeder for the `references/design-dna.md` workflow.
- **Ship Studio** — free MIT desktop app (Tauri) wrapping Claude Code/Codex with live preview, visual editing, and deploys; macOS + Windows.
- **Craftwork MCP** — natural-language asset search over Craftwork's library (see Asset sources below for the fuller Craftwork entry).
- Market benchmark, not a usable resource: **primeui.com**° — closed AI website builder ($99 one-time, Next.js+Tailwind export, curated design system, anonymous team, no API/free tier). Not PrimeTek's PrimeUI (above) — a genuine name collision.
- **Reference-board generators** (vendored, pair with an image model — they output reference *images*, not code): per-section website comps (`library/taste-skill/skills/imagegen-frontend-web/SKILL.md`), mobile app screen/flow boards (`…/imagegen-frontend-mobile/SKILL.md`), brand-identity boards with five logo-concept methods (`…/brandkit/SKILL.md`). Their load-bearing judgment: one image per section; left-text/right-image is the overused AI hero anchor — vary it; lock one palette across the set. Hand renders to the generate-first pipeline in `references/design-direction.md`.

## Learning & eye training

Durable references: **Refactoring UI** · **Laws of UX** · **Checklist Design** · **Motion by Zajno** (motion breakdowns) · **Framer University**. Eye-training games (good taste calibration): **Kern Type** (kerning) · **The Bezier Game** · **The Boolean Game** · **Can't Unsee** (UI details) · **What the Hex?** (color).

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

More, by role°:

- **Motion-first**: 60fps — motion/interaction web inspiration archive; the gallery to open for animation reference.
- **Section-level**: Landingfolio, CTA.gallery, Navbar Design, Supahero (heroes), Landing Love — when the brief needs one great section, not a whole site.
- **UI patterns from shipped products**: Interfaces, Spotted in Prod, Page Flows (UX flows), Component Gallery (how real design systems name/build each component).
- **Brand & identity archives**: BP&O, Logo Archive, Rebrand Gallery, Brand Archive, World Brand Design, Mindsparkle Mag, Abduzeedo.
- **Type in context**: Fonts In Use, Typewolf — what a typeface actually looks like shipped; consult during the `references/design-direction.md` font procedure.
- **Research boards**: Are.na, Cosmos — moodboard collection and visual research.
- **Mobile marketing**: Before (before.click) — real App Store screenshot/paywall/onboarding designs.
- **Meta-feed**: Muzli — broad daily design stream.

Routing logic: Awwwards/Godly for visual+motion ambition · 60fps for motion specifics · Mobbin/Refero for real-product UX evidence · Land-book/Saaspo for landing-page and section reference · the role list above for everything narrower. `curated.design` as a standalone is gone (301s to Craftwork).

## Asset sources

**Craftwork (craftwork.design)** — curated human-made asset packs: illustrations (the reputation core), device mockups, UI kits (*Blank*: 3,200+ components for Figma/Framer/Webflow), gradients, 3D. License allows commercial + client work; bans resale, physical products, and being the primary component of a product for sale. Free entry: *Ultima* (750+ illustrations). Pro ($199/yr) adds the full catalog and an official MCP server (craftwork.design/mcp) for natural-language asset search. Use it for cohesive pack-quality assets; use dedicated font sources for fonts.

**Fonts** (deep guidance in `references/design-direction.md`): Fontshare (ITF-FFL foundry quality) · Fontsource (2,000+ OFL fonts as versioned npm packages — deterministic, self-hosted, agent-ideal) · UNCUT.wtf (163 display-forward free faces, check per-font license). Type helpers: Typescale (scale generator) · Font Pair / Fontjoy (pairing ideas — validate against the pairing rules, don't outsource the decision) · Fonts In Use + Typewolf (see the face shipped before committing).

**Device mockups & showcasing**: Rotato (3D device renders/video) · Mockuuups Studio · Shots° · LS Graphics / Mr.Mockup° (libraries) · Craftwork's mockup packs (above). Screen capture for case studies: CleanShot, Screen Studio (macOS). These produce *real rendered* mockups — sanctioned; hand-building fake browser/phone chrome in CSS/SVG is the banned pattern (`references/design-audit.md`).

**Icons**: for brand-surface distinctiveness prefer **Phosphor** (MIT, 9,000 icons × 6 weights — weight variety as art direction) · HugeIcons · Radix Icons · Tabler; treat **Lucide** (ISC) as acceptable-when-asked or when the project already runs on it (it is the shadcn default, hence the most recognizable). **Iconify** (224 sets / ~330k icons behind one API with per-set licenses surfaced) when one dependency must cover every style. One family per project; standardize `strokeWidth` globally (1.5 reads more refined than 2.0); never hand-roll SVG icon paths. Logos for social proof: `cdn.simpleicons.org/{slug}` or devicon — real SVG marks, never text wordmarks.

## Excluded — and why

| Resource | Reason |
|---|---|
| **originkit.dev** | API-gated (free key, 10 component fetches/day), ~50 components, no license published for the component code, negligible track record. Not confusable with Origin UI (above) |
| **Theatre.js** | Dormant: development moved private years ago, no releases since early 2024 |
| **21st.dev / Magic MCP** | Paid-quota hosted API, uneven community quality, and documented recurring prompt-injection issues filed against its MCP — do not wire it into agent workflows. (Widely recommended in curation feeds regardless; the injection issues stand) |
| **curated.design** (standalone) | Absorbed into Craftwork; use Craftwork Curated |
| **Radix Themes** | Slowed maintenance; shadcn defaulted to Base UI instead (see shadcn/ui row above). Radix *primitives* remain fine where already in use |

---
*Compiled from live web verification (2026-07) of each project's site, repo, npm, and licensing pages, plus a design-curation social feed (82-post sample, Dec 2025–Jul 2026).*
