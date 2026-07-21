# Art Direction
*Pick one visual direction, prove it against the brief, freeze it into tokens — before producing any pixel or frame.*

## Core stance

- Art direction is ONE committed idea executed everywhere, not a menu of effects. If every element is louder, the composition is flatter, not bolder.
- **The slop test**: if a viewer could say "AI made that" without hesitation, the direction failed. The bar is distinctiveness — "how was this made?", not "which AI made this?". Average is no longer findable; restraint without intent reads as mediocre, not refined.
- **The competitor-sentence test**: describe what you're about to build the way a competitor would describe theirs. If the sentence fits the modal product in the category, restart.
- **The aesthetic-lane test**: name the reference lane before committing (e.g. "Klim-specimen", "Stripe-minimal", "Liquid-Death acid-maximalism"). Unnamed ambition becomes beige. Don't drift into editorial-magazine aesthetics on a brief that isn't editorial.
- **Register decides the dial.** Brand surfaces (landing pages, campaigns, portfolios, videos — design IS the product) get ambitious motion, drenched color, art direction per section. Product surfaces (dashboards, tools, forms) get boldness through hierarchy, density, and decisiveness — theatrics undermine trust.
- Category is not a recipe. "Restaurant → serif", "dev tool → mono", "editorial → drop caps" is first-order pattern matching. The most distinctive choice often contradicts the category expectation.

## Decision procedure: brief → direction

Run this every time. Never skip discovery, even (especially) when told "just make it look good."

0. **The Design Read** (landing/portfolio/redesign fast pre-commit). One line the whole team can agree on before anything else: *"Reading this as: `<page kind>` for `<audience>`, with a `<vibe>` language, leaning toward `<design system or aesthetic family>`."* If the read genuinely forks, ask exactly one clarifying fork ("clean-minimal or experimental?") — never a question dump; if you can infer confidently, declare it and proceed. The fuller theses below still follow for anything substantial.
1. **Extract five facts** from the brief: product (what is it), audience (who uses/watches it), mood (3–5 adjectives), references (sites, screenshots, films), constraints (stack, existing brand, deadline, format). If any is missing, ask — one question at a time; each answer reshapes the next question. Never bundle questions.
2. **Handle vague answers.** "Modern/clean/nice" is not an answer. Offer concrete forks ("clean like Stripe's editorial whitespace, Linear's dense-but-organized, or Apple's dramatic minimalism?"), or invert ("what would feel WRONG? what makes you cringe?"). "Yeah, something like that" is not confirmation — ask which part resonates. If the user insists on skipping, state your assumptions explicitly and proceed.
3. **Name the feeling.** One sentence: what should the viewer FEEL in the first 3 seconds? Mood first, content second.
4. **Write three voice words.** Physical-object words, not adjectives-of-quality: "warm, mechanical, opinionated" or "calm, clinical, careful" — never "modern" or "elegant."
5. **Name a real reference** for palette and lane: "Klim #ff4500 orange drench", "Vercel pure-black monochrome", "Mailchimp yellow full-palette". A named reference anchors every downstream choice.
6. **Pick from the catalog below** (or compose a custom direction the same way: name it after a designer/movement, define tokens, write one paragraph of feel). Check it against the reflex-reject lanes.
7. **Write two theses and get explicit sign-off** before building:
   - **Visual thesis** — one sentence covering all four: color direction (dark/light, family, accent), typography spirit (serif/sans/mono, weight usage), spacing philosophy (dense/airy), component style (rounded/sharp, flat/elevated). Example: "Dark neo-brutalist interface with bold monospace type, fluorescent chartreuse accents, generous whitespace, raw-edged components with offset shadows."
   - **Interaction/motion thesis** — one sentence covering all four: timing range (fast 100–200ms / medium 200–400ms / slow 400ms+), hover or entrance behavior, scroll/sequence behavior, forbidden patterns (what this project will NOT do). If you can't derive concrete CSS/easing values from the thesis, it's too vague — rewrite.
8. **Freeze into tokens.** Write the direction as a single source-of-truth design spec (design.md / MASTER.md / DESIGN.md): colors, type scales, spacing, radii, shadows, motion tokens (duration scale, easing names, stagger), plus a Do's/Don'ts section. Every downstream decision references it — no magic numbers, no rogue hex values. The thesis is law; to break it, re-validate with the user first.
9. **Work and validate incrementally** — page by page or scene by scene, never everything at once.

## Style catalog

Named directions grounded in real design traditions. Match mood first, content second. Font names are placeholders for *character* — substitute per the typography rules below.

| Direction | Lineage | Mood | Best for | Signature moves |
|---|---|---|---|---|
| **Swiss Pulse** | Müller-Brockmann | Clinical, precise | SaaS, data, dev tools, metrics | 12-col grid lock, numbers at 80–120px, count-up counters, hard cuts, nothing floats |
| **Velvet Standard** | Vignelli | Premium, timeless | Luxury, enterprise, keynotes, investor decks | Generous negative space, thin all-caps wide-tracked type, sequential reveals, long holds, nothing snaps |
| **Deconstructed** | Brody | Industrial, raw | Tech launches, security, punk energy | Type at angles escaping frames, scan-lines/glitch baked in, letters scramble then snap, intentional irregularity |
| **Maximalist Type** | Scher | Loud, kinetic | Big launches, hype, milestones | Text IS the visual, overlapping layers at 50–80% of frame, saturated color blocks, 2–3s rapid-fire pacing, hard stops |
| **Data Drift** | Anadol | Futuristic, immersive | AI/ML, data platforms, speculative tech | Thin weightless sans, particles coalescing into numbers, extreme micro→macro scale shifts, continuous organic motion |
| **Soft Signal** | Sagmeister | Intimate, warm | Wellness, personal stories, lifestyle | Humanist serif/handwritten, lowercase, close-up single-element framing, slow drifts, warm grain, never corporate |
| **Folk Frequency** | Terrazas | Cultural, vivid | Consumer apps, food, communities, festive | Rounded warm type, pattern/repetition density, bounce-and-pop entrances with intentional overshoot |
| **Shadow Cut** | Hillmann | Dark, cinematic | Security, exposé, dramatic reveals | Near-monochrome + one blood accent, noir title-card type, elements emerge from darkness, slow push-ins, the pause before the hit |

### Motion grammar per direction

Each direction implies a motion energy, easing family, pacing, and atmosphere layer. Keep all four consistent with the pick — a Velvet layout with Deconstructed easing is an unnamed direction, i.e. no direction.

| Direction | Energy | Entry easing | Pacing (enter / hold) | Atmosphere |
|---|---|---|---|---|
| Swiss Pulse | High | `expo.out`, exits `power4.in` | 0.4s / 1.5s, hard cuts | Grid lines, registration marks |
| Velvet Standard | Calm | `sine.inOut` glides | 1.2s / 3s, long holds | Subtle grain, hairline rules |
| Deconstructed | High | `back.out(2.5)`, exits `steps()` | 0.3s / 1s, slams | Scan lines, glitch artifacts, grain |
| Maximalist Type | High | `expo.out` + `back.out` stops | 0.3s / 0.8s, rapid-fire | Type layers, color blocks |
| Data Drift | Moderate | `sine.inOut`, continuous | 1s / 2.5s, no hard edges | Particle field, light traces, glow |
| Soft Signal | Calm | `sine.inOut` drifts | 1s / 3s, unhurried | Soft gradient, warm grain |
| Folk Frequency | High | `back.out(1.6)` / `elastic` pops | 0.5s / 1.5s, joyful | Pattern tiles, confetti, color blocks |
| Shadow Cut | Moderate | `power3.out`, exits `power4.in` | 0.8s / 2.5s, creeping push-ins | Deep shadow, vignette, grain |

### Mood → direction routing

| The content feels… | Reach for |
|---|---|
| Data-driven, analytical, technical | Swiss Pulse |
| Premium, enterprise, luxury | Velvet Standard |
| Raw, punk, aggressive, rebellious | Deconstructed |
| Hype, loud, high-energy launch | Maximalist Type |
| AI, speculative, futuristic | Data Drift |
| Human, warm, personal, wellness | Soft Signal |
| Cultural, fun, consumer, festive | Folk Frequency |
| Dark, dramatic, intense, cinematic | Shadow Cut |

Web-UI style families (glassmorphism, neumorphism, claymorphism, brutalism, bento grid, flat, skeuomorphic) are treatments, not directions — pick a direction above first, then use a treatment only if it serves it. Page-shape and theme selection (macrostructures, component fingerprints, the 20-theme catalog) is its own layer: `references/page-anatomy.md`.

### Aesthetic recipes — pre-committed treatments with exact tokens

Ready palettes for four proven lanes; full component specs in the library. A recipe serves a direction — pick the mood-matched direction first, then reach for the recipe; never let the recipe become the direction.

| Recipe | Tokens / signature | Depth |
|---|---|---|
| **Swiss industrial (light brutalist)** | bg `#F4F4F0`/`#EAE8E3`, ink `#050505`–`#111111`, one hazard-red accent `#E61919`/`#FF2A2A`. Macro type `clamp(4rem,10vw,15rem)`, tracking −0.03→−0.06em, leading 0.85–0.95, uppercase; micro mono 10–14px tracked +0.05–0.1em. Zero radius. Hairline grid: `display:grid; gap:1px` on contrasting parent/child backgrounds | `library/taste-skill/skills/brutalist-skill/SKILL.md` |
| **Tactical telemetry (dark brutalist)** | bg `#0A0A0A`/`#121212` (never `#000`), phosphor text `#EAEAEA`, red accent `#E61919`, optionally ONE terminal-green `#4AF626` element. CRT scanlines: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)`. Pick one brutalist archetype per project, never both | same |
| **Editorial minimal (document UI)** | canvas `#FFFFFF`/`#F7F6F3`/`#FBFBFA`, ink `#111111`/`#2F3437`, secondary `#787774`, borders `#EAEAEA`/`rgba(0,0,0,0.06)`; muted-pastel accent pairs red `#FDEBEC`/`#9F2F2D`, blue `#E1F3FE`/`#1F6C9F`, green `#EDF3EC`/`#346538`, yellow `#FBF3DB`/`#956400`. Flat bento 1px borders, radius 8–12px, padding 24–40px. CTA `#111`→`#333` hover | `library/taste-skill/skills/minimalist-skill/SKILL.md` |
| **Soft premium (nested-bezel)** | The nested-bezel card: outer shell `bg-black/5` (or `white/5`), `ring-1 ring-black/5`, `p-1.5`–`p-2`, `rounded-[2rem]`; inner core with own bg, inset top highlight `shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]`, concentric `rounded-[calc(2rem-0.375rem)]`. Button-in-button trailing icon in its own `w-8 h-8 rounded-full`. Motion `cubic-bezier(0.32,0.72,0,1)` ~700ms; `backdrop-blur` only on fixed/sticky | `library/taste-skill/skills/soft-skill/SKILL.md` |

### Generate-first (image → analysis → code)

When an image-gen tool is available and visual quality is central (hero, landing, redesign), an alternative to reference-collection: (1) generate the design image yourself — **one image per section**, never one compressed board, never crop a section out of a larger render; (2) deep-analyze each as a spec — extract copy, type-scale relationships, spacing, palette, component logic; (3) implement faithfully. **Anti-drift is the failure mode:** the coded result must stay the same site as the reference — don't simplify distinctive sections into generic rows or compress generous spacing. Reference-board generators (per-section web comps, mobile flow boards, brand-identity boards): `references/toolbox.md`; depth: `library/taste-skill/skills/image-to-code-skill/SKILL.md`.

### Presenting options (fan-out)

When generating multiple candidate directions for a user to pick from:

- Every option must be contextual to THIS brief; generic options that could appear on any picker are a failure.
- Each mood board tells a genuinely different STORY about the product (playful chaos vs premium vs cozy vs sensory), not the same layout with a different font.
- Palettes: 5–6, named after the brand's world, always mixing dark + light + tinted backgrounds — even for calm briefs. Every palette must be visually distinct at 14px-swatch size; same background lightness + similar accent hue = duplicate, cut one.
- Type pairings: 5–6, discovered fresh per brief (see typography procedure), always crossing classification boundaries — never two sans-serifs.
- Previews show the user's actual headline and content, not lorem placeholders.

### Saturated lanes — reject by default

Second-order training reflexes. Use only when the brief literally requires them (a literal magazine, a literal terminal):

- **Editorial-typographic**: display serif (often italic) + small mono labels + ruled separators + monochrome restraint + three rule-separated columns + lowercase tracked metadata, no imagery. Every Stripe/Notion-adjacent brand landed here; it is the modal AI landing page.
- **"Bold" AI defaults**: cyan/purple gradients, glassmorphism on dark, neon accents, gradient text on metrics, scroll-fade-rise on every section.
- **Costume mono**: monospace as shorthand for "technical" on a brand that isn't.
- **Template grammar**: repeated tiny uppercase tracked kicker above every section; large rounded icon above every heading.

Exception: identity preservation wins. If an existing brand already committed to a lane or font, don't second-guess it on variants — reject lists apply to greenfield decisions.

## The boldness dial

Four positions: **Quieter ← Default → Bolder → Overdrive.** Pick position from register and brief, then push with the levers below. Set a risk budget first: how far can this push while still feeling like the same product?

| Position | When | The move | Failure mode |
|---|---|---|---|
| Quieter | Reading surfaces, dense tools, over-designed input | Desaturate, lighten weights, remove ornament — keep the POV | Generic; personality stripped with the noise |
| Default | Established system, incremental work | Execute the existing thesis more consistently | Drift; unexamined defaults |
| Bolder | Bland/timid work, brand surfaces without a POV | Sharpen hierarchy, commit to one visual idea | "More effects" instead of more decisive |
| Overdrive | An earned signature moment, award-tier ambition | One technically extraordinary moment, user-approved | Embarrassing misfire; effect without context |

### Bolder (bland → decisive)

Bold means distinctive, not "more effects." Amplify the existing language before adding new language:

- **Focal point**: pick ONE thing the viewer should remember; make everything else support it. Contrast is the point — if everything is bold, nothing is.
- **Hierarchy**: increase contrast between primary/secondary/tertiary. Dominant text meaningfully dominant (video: 300 vs 900 weight, not 400 vs 700); supporting text quieter.
- **Proportion & pacing**: dense evidence vs open air; layout tension; sequencing; one committed visual idea per fold.
- **Color**: use the existing palette more decisively (proportion, placement) before adding colors. On brand surfaces, Committed/Full/Drenched strategies are permission, not excess — commit, don't hedge with neutrals at the edges.
- **Design-system lock**: if tokens/DESIGN.md exist, treat them as the boundary. New colors, fonts, radii, shadows, or effects require explicit user approval and a documented system update.
- **Motion**: one meaningful moment of emphasis, not scroll-fade on every section.
- Verify: "if I said 'AI made this bolder,' would they believe me instantly?" Yes = failed.

### Quieter (loud → refined)

Quiet is harder than bold; subtlety needs precision. Reduce intensity, keep the POV:

- Desaturate to 70–85%; fewer colors; neutrals dominant with color as ~10% accent; tinted grays (warm/cool), never pure gray; never gray text on a colored background — use a darker shade of that color or transparency.
- Drop weights one step (900→600, 700→500); hierarchy via size/space/weight instead of color and boldness; more whitespace; thinner or removed borders.
- Motion: shorter distances (10–20px, not 40px), gentle `ease-out` (quart), never bounce/elastic; delete decorative animation entirely.
- Remove: purposeless gradients, glows, multi-shadows, patterns; flatten layering; even out spacing rhythm.
- Never: uniform sizes (hierarchy still matters), grayscale-everything, zero personality, small-and-light-everything. Restrained ≠ absent — the POV must survive the cuts.

### Overdrive (push past conventional limits)

Highest misfire risk. Context defines "extraordinary": a shader hero on a portfolio is impressive; the same shader on a settings page is embarrassing — but a settings page with instant optimistic saves and animated state transitions is also extraordinary.

- **Propose 2–3 directions with trade-offs and get a pick before building.** Never jump straight to code.
- Choose the wow per surface: marketing → sensory (scroll-driven reveals, shaders, cinematic transitions); functional UI → feel (View-Transition morphs, virtualized 100k-row tables, streaming validation, spring physics); data UI → fluidity (GPU rendering, morphing chart states); performance UI → invisible speed.
- Discipline: progressive enhancement always (`@supports`, WebGL2 fallback, good-without-the-effect baseline); 60fps target, simplify below 50; respect `prefers-reduced-motion` with a beautiful static alternative; lazy-init heavy contexts; pause off-screen; one extraordinary moment per surface, never several competing.
- Iterate visually in a browser — ambitious effects never look right on the first try; "technically works" → "looks extraordinary" is closed by looking, not by code.
- Verify: wow test (does a fresh viewer react?), removal test (is it missed?), device test (mid-range phone), reduced-motion test, context test (right for THIS brand?).

## The three dials (brand-surface calibration)

Three orthogonal 1–10 dials calibrate landing/portfolio/marketing surfaces — a finer-grained complement to the boldness dial and the motion tier, not a replacement. Declare values (with the reason) at direction time; never silently run the baseline. Keep the literal token names — the library cross-references them.

- **DESIGN_VARIANCE** (1 = perfect symmetry → 10 = artful chaos). Baseline **8**.
- **MOTION_INTENSITY** (1 = static → 10 = cinematic/physics). Baseline **6**.
- **VISUAL_DENSITY** (1 = art-gallery airy → 10 = cockpit-packed). Baseline **4**.

Crosswalk so the systems compose: MOTION_INTENSITY 1–3 ≈ motion tier *calm*, 4–7 ≈ *lively*, 8–10 ≈ *showpiece* (`references/process.md`); DESIGN_VARIANCE tracks the boldness dial (1–3 ≈ Quieter, 8–10 ≈ Bolder); VISUAL_DENSITY is a genuinely new axis — it drives the spacing bands in `references/design-foundations.md` and belongs in the brief lock.

Dial inference — read the brief's vibe words into values:

| Signal | VARIANCE | MOTION | DENSITY |
|---|---|---|---|
| minimalist / clean / calm / editorial / document-UI | 5–6 | 3–4 | 2–3 |
| premium consumer / luxury / brand-led | 7–8 | 5–7 | 3–4 |
| playful / award-tier / experimental / agency | 9–10 | 8–10 | 3–4 |
| landing / portfolio / marketing (default) | 7–9 | 6–8 | 3–5 |
| trust-first / public-sector / regulated / a11y-critical | 3–4 | 2–3 | 4–5 |
| redesign — preserve | match existing | +1 | match |
| redesign — overhaul | +2 | +2 | match |

Variance mechanics: 1–3 symmetric 12-col, equal padding, centered; 4–7 offset overlaps (`margin-top:-2rem`), mixed aspect ratios, left-aligned headers over centered data; 8–10 masonry, fractional grids (`2fr 1fr 1fr`), massive deliberate empty zones. **Mobile override:** asymmetric layouts at VARIANCE ≥4 collapse to a strict single column below 768px. **Anti-center bias:** a centered hero is banned at VARIANCE >4 (exception: editorial/manifesto/launch where the message is the design). If a page claims MOTION_INTENSITY >4 it must actually move — a static page claiming 7 is broken; can't ship working motion in scope → drop the dial to 3 and ship clean static (`references/motion-web.md`).

## Delight & signature moments

Delight is earned per-moment, never distributed everywhere. Brand register: delight can live in copy voice, transitions, discovery rewards across the surface. Product register: delight only at completion, first-time actions, error recovery, milestones — reliability carries the rest.

- **Natural slots and matching techniques**:

| Moment | Technique |
|---|---|
| Success / completion | Checkmark draw, gentle scale+fade, confetti reserved for major milestones only |
| First-time / empty states | Encouraging copy + custom illustration (never stock icons), canvas-awaits framing |
| Loading / waiting | Skeletons with subtle motion, rotating product-specific messages, progress with personality |
| Hover / press | Lift on hover (`translateY(-2px)`, ease-out-quart), press-down on active, icon micro-animation |
| Error recovery | Empathetic softening copy, undo affordance, never harsh sounds or blame |
| Milestones / streaks | Count-ups, badge unlock animation, personalized copy ("your 10th article") |
| Easter eggs | Console messages, hover reveals on logos, alt-text jokes, hidden shortcuts — never announced |

- **Rules**: <1s, never blocks or delays the task, skippable, appropriate to emotional moment (celebrate success, empathize with errors — never playful during critical failures), fresh on the 100th repeat (vary responses), accessible (reduced-motion alternatives). Delight must never hide poor UX or cost performance.
- **Signature moment**: design one per surface — a checkmark draw, a morphing dialog, a physics toggle, one confetti-worthy milestone. One well-orchestrated page-load beats scattered micro-interactions; some brands skip entrance motion entirely and the restraint IS the voice.
- **Copy is a delight surface**: playful 404s, encouraging empty states — matched to brand (banks warm, not wacky). Write product-specific loading messages ("Syncing your team's changes…"), never generic AI filler ("Herding pixels", "Teaching robots to dance") — instantly recognizable slop.
- Verify: still pleasant after 100 uses; users notice the goal, not the garnish; performant; shareable.

## Brand systems

A brand system = voice + tokens + distinctive assets, all downstream of the thesis.

- **Voice**: the three physical-object words govern palette mechanics, type character, motion energy, and copy tone simultaneously. Palette IS voice — a calm brand and a restless brand must not share palette mechanics. Don't converge across projects; each surface differentiates from the last — operationalized: read the previous build's structure stamp and log before picking, and differ on macrostructure, theme (≥1 of 3 axes), nav, footer, and enrichment (`references/page-anatomy.md`). When a cultural-symbol palette is the obvious pull, reach past it; let culture come from type, imagery, copy.
- **Tokens**: one canonical spec file; generated code (CSS variables / Tailwind config / Theme.kt / Color+App.swift) are children of it. Interactive elements define all five states: default, hover, focus, active, disabled. Minimal skeleton:

```yaml
name: <direction name>
colors: { primary, on-primary, accent }          # 2–5 tokens, semantic set if product UI
typography: { headline: {family, size, weight}, body: {…}, stat: {…} }
rounded: { none: 0px, sm, md }                    # sharp vs soft IS voice
spacing: { sm, md, lg }                           # dense vs airy IS voice
motion:
  energy: calm|moderate|high
  easing: { entry, exit, ambient }
  duration: { entrance, hold, transition }
  atmosphere: [grain, grid-lines, …]
```

  Follow with prose: Overview, per-token rationale, Components, Do's and Don'ts. The pattern is *tokens (what) → rationale (why) → components (how they combine)*.
- **Distinctive assets**:
  - **Imagery is mandatory when the brief implies it** (restaurant, hotel, travel, fashion, food, photography). Zero images is a bug, not restraint; colored divs where a hero photo belongs is the failure mode. Imagery = photos, product screenshots, custom data-viz, generated SVG, canvas/WebGL scenes. One decisive photo beats five mediocre ones. Never hand-build UI chrome (browser bars, phone frames, code windows, terminals) in CSS/SVG — real screenshots in a `<figure>`, real device renders, or nothing. Search for the brand's physical object ("handmade pasta on a scratched wooden table"), not the category ("Italian food"). Alt text is part of the voice.
  - **Icons**: one set per project, consistent stroke width (1.5px reads more refined than the 2px default). Custom-draw the 3–4 that matter (nav, logo-adjacent); library for the rest.
  - **Texture**: inline SVG `feTurbulence` grain is the cheapest "expensive" texture — no asset download:

    ```css
    .grain::after {
      content: ""; position: fixed; inset: 0; pointer-events: none; z-index: 50;
      opacity: .05; mix-blend-mode: overlay;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    }
    ```

    Keep opacity 0.03–0.07; over 0.1 it reads as dirt, not film.
  - Full ship-set: SVG favicon (+ dark-scheme variant), 180px apple-touch icon, 192/512 manifest icons, 1200×630 og:image — pages without an OG card look broken when linked.
- **Bans**: all-caps body copy; timid palettes ("safe = invisible"); single font family picked by reflex (chosen deliberately is fine).

## Typography as art direction

The single highest-leverage decision. Google-Fonts defaults are the #1 tell of template work.

**Headers are roman — globally.** Italic on any heading or display element (including a single italicized emphasis word inside an upright headline) is among the most reliable AI tells. Emphasis in headers comes from weight, accent color, or a drawn underline; italic survives only in body copy. Sole exception: a *preserved existing brand* whose identity is genuinely italic-led (redesign-preserve mode) — never a greenfield choice.

### Selection procedure (every project, never skip)

1. Write the three voice words (from the decision procedure).
2. List the three fonts you'd reach for by reflex. If any is on the reject list, reject it.
3. Browse a real catalog (Google Fonts, Fontshare, Pangram Pangram, Future Fonts, Klim, ABC Dinamo, Velvetyne, Uncut.wtf) with the voice words. Find the font as a *physical object*: a museum caption, a 1970s terminal manual, a fabric label, a concert poster, a diner receipt. Reject the first thing that "looks designy."
4. Cross-check: "elegant" ≠ serif, "technical" ≠ sans, "warm" ≠ Fraunces, luxury might want a grotesque instead of the expected Didone. If the final pick matches your original reflex, start over.

For programmatic discovery, filter the Google Fonts metadata API (`https://fonts.google.com/metadata/fonts`) by category + `dateAdded` + popularity band, exclude the reject list, and shuffle the top results so you don't pick the same first hit every time.

### Reflex-reject list

Training-data defaults; produce monoculture. Greenfield ban (existing brand identity overrides):

Inter · Roboto · Open Sans · Noto Sans · Lato · Nunito · Poppins · Outfit · Sora · Arimo · PT Sans · Source Sans · DM Sans · DM Serif Display/Text · Plus Jakarta Sans · Instrument Sans/Serif · Space Grotesk · Space Mono · IBM Plex (all) · Fraunces · Newsreader · Lora · Crimson (all) · Playfair Display · Cormorant (all) · Bodoni Moda · Cinzel · Prata · **Syne** (the single most overused "distinctive" pick — instant AI tell) · Fredoka · Bricolage Grotesque · Archivo Black-as-default

Deterministic render pipelines that pre-bundle fonts constrain this: bundled-and-still-distinctive picks include Montserrat, Oswald, League Gothic, Archivo Black, JetBrains Mono; otherwise embed your own `@font-face`.

### Pairing rules

- One voice, one workhorse: a characterful display at ≤2 sizes + a neutral grotesk/serif for everything else. Never two display faces. A single family with committed weight contrast beats a timid pair.
- Never pair two similar-but-not-identical fonts (two geometric sans, two transitional serifs) — friction without hierarchy. Contrast on a clear axis: serif+sans, sans+mono, condensed+wide, geometric+humanist.
- The pairing tension should mean something (mechanical vs human, institutional vs personal). If you can't articulate it, it's arbitrary. Two expressive fonts can coexist only when they share an attitude.
- Advanced: register switching (one voice for statements, one for data, one for attribution — voices in a conversation, not hierarchy on a page); tension inside a single font; one-variable contrast (mono vs proportional of the same design).

### Scale & mechanics

- Modular scale, ≥1.25 ratio between steps, fluid `clamp()` headings. 1.1×-apart scales read as uncommitted.
- Light-on-dark: reads heavier and tighter — drop body to ~350 weight, add 0.05–0.1 line-height, +0.01em letter-spacing at display sizes.
- Video: body ≥20px, headlines ≥60px full-screen; in-feed (X/LinkedIn/IG) body ≥32px, headlines ≥90px. Track display type −0.03 to −0.05em (encoding eats letter detail). 3s on screen = readable in 2 — fewer words, larger type. In motion, sequence is hierarchy: first to appear = most important; how a word enters (0.1s slam vs 2s fade) carries as much meaning as the font.
- Data: `font-variant-numeric: tabular-nums` whenever digits stack (stats, timers, tables); `all-small-caps` for abbreviations; ligatures off in code.

## Legal sourcing

License quick-scan: **CC0/MIT/OFL/ITF-FFL → use freely · CC-BY → add a credits line · "personal use"/"trial"/NC → replace or buy.** One unlicensed trial font can disqualify otherwise award-grade work.

### Fonts

| Source | License | Notes |
|---|---|---|
| Fontshare | ITF-FFL, free commercial | Satoshi, General Sans, Clash Display, Cabinet Grotesk, Boska — best free foundry-quality tier |
| Uncut.wtf / Free Faces | varies (mostly OFL) | Curated indexes; check each font's page |
| Collletttivo / Velvetyne | OFL | Characterful/experimental libre display faces |
| ATIPO | pay-what-you-want | €1 minimum gets legit weights |
| Pangram Pangram | free = trial/personal only | Buy before shipping production |
| Klim / Grilli / Commercial Type / Dinamo / Displaay | paid | The tier award winners actually use; trials are mockup-only |
| Fontsource | OFL via npm | `@fontsource-variable/*` for zero-config self-hosting |

Gotchas: paid web licenses are priced by pageviews and separate from desktop — a desktop purchase does not permit `@font-face`. OFL is fully embeddable but forbids reselling files. Always self-host woff2 (never hotlink foundry CDNs). Serviceable license-safe downgrades: Söhne → General Sans, GT Walsheim → Satoshi.

Self-host + subset (a 300KB display font used only in a hero is malpractice):

```css
@font-face {
  font-family: "Clash Display";
  src: url("/fonts/ClashDisplay-Variable.woff2") format("woff2");
  font-weight: 200 700;
  font-display: swap;
}
```

```bash
pyftsubset ClashDisplay-Variable.ttf --flavor=woff2 \
  --unicodes="U+0000-00FF,U+2013-2014,U+2018-201D,U+2026,U+20AC" \
  --layout-features="*" --output-file=ClashDisplay-Variable.woff2
```

### Icons

All MIT/ISC, commercial-OK: Lucide (neutral default), Phosphor (6 weights — weight-morphing is free micro-delight), Heroicons, Tabler (dashboard coverage), Iconoir (thinner, editorial). One set per project; inline SVG components, not icon fonts.

### Textures, illustration, gradients

- fffuel (free SVG generators: noise, flux gradients, dot grids) · Haikei (waves/blobs — recolor to your palette, never ship the default blob) · gradient.style (OKLCH-interpolated gradients, avoids the sRGB gray dead-zone) · Lost & Taken + Texture Labs (scanned paper/film, free commercial; use as low-opacity `multiply` overlays).
- Stock illustration systems (unDraw, Blush, Open Peeps, Humaaans) are license-safe but **anti-award** — juries clock unDraw in one second. Go typographic, photographic, or generated instead.
- **Cohesive paid packs — Craftwork (craftwork.design)**: human-made illustration/mockup/UI packs with a commercial + client-work license (no resale, no physical products, asset can't be the primary component of a product for sale). Free entry: the *Ultima* bundle (750+ illustrations); flagship UI kit: *Blank* (3,200+ components, Figma/Framer/Webflow). Pro subscribers get an official MCP server — agents can query assets in natural language. A distinct tier above stock-illustration systems; below custom-drawn.

### Photos & video

- Free stock: Unsplash, Pexels, Coverr (hero loops), Mixkit — fine for placeholder, dangerous for final: the top results are on ten thousand other sites. If shipping stock: search page 5+, crop aggressively, duotone/recolor to the palette. **Verify every hotlinked URL resolves** — guessed image IDs 404 as broken placeholders; fewer confirmed photos beat more guessed ones.
- Generated beats stock for committed work: exact palette (state hex values in the prompt), reserved negative space where the headline sits ("subject occupies right third, empty left third"), background hex matched to the page for seamless cutouts, one frozen style paragraph varied only by subject for series consistency. Generate at 2× then compress to AVIF/WebP.

### 3D, motion assets, sound

- Poly Haven: HDRIs/PBR/models, all CC0 — the only 3D source with zero license anxiety. Sketchfab: license varies per model (CC-BY needs a visible credit; NC = skip). LottieFiles: free files under Lottie Simple License; prefer dotLottie (much smaller). Spline/Rive community files: verify per file.
- Sound: mute by default, opt-in via visible toggle, play only after user gesture, persist choice. CC0 via Freesound/Pixabay. Files <20KB, volume 0.2–0.35, pitch-vary repeats.

## Reference workflow (before designing)

1. 20 minutes max: collect 6–12 references from curated galleries — Awwwards (read judging notes, not just screenshots), Godly, Minimal Gallery (the antidote when a design gets loud), Mobbin (real app flows — app UX ≠ marketing-site patterns), Refero (real web-product screens), Saaspo + Land-book (landing pages, section-level filtering), Craftwork Curated (the former curated.design, now at craftwork.design/curated/websites), Cosmos. Niche fills: dark.design, footer.design. Full gallery roles: `references/toolbox.md`.
2. Save refs with filenames that name the steal (`01-type-scale-hero.png`) plus one line each: "steal this / NOT this."
3. When fanning out multiple design options, give each variant divergent references (one editorial, one brutalist…) — referenced fan-out beats blind fan-out; agents anchor on concrete taste instead of the training-data median.
4. Keep the refs; later critique passes cite them as the taste bar.

---
*Distilled from: impeccable, design-kit, hyperframes, genjutsu, taste-skill (dials, Design Read, aesthetic recipes, generate-first), hallmark (roman headers, diversification).*
