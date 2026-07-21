# Page Anatomy

*Select a whole-page shape, its section fingerprints, its theme, and its enrichment — one named choice per slot — so two pages for two briefs read as different sites, not colour-swaps of one template.*

Structural sameness is the AI fingerprint, not visual sameness. This module is the selection brain: pick a macrostructure, then fingerprints, then a theme, then enrichment. Full per-choice recipes live in the vendored library (`library/hallmark/references/…`); load one only after the pick. Sits above `design-foundations.md` (craft) and `design-direction.md` (art direction); obeys every gate in `design-audit.md`.

## Order of operations

1. Detect **genre** (scopes themes + which gates loosen).
2. Pick **macrostructure** (the page shape) — state it out loud before coding.
3. Pick **nav + footer archetype** (part of the fingerprint, not optional chrome).
4. Pick **section-head + feature + CTA + proof archetypes** as the page needs them.
5. Pick **theme** (catalog default; custom only on signal).
6. Decide **enrichment** (typography-only is the default and a strong end-state, not a fallback) + optional hero **polish**.
7. Diversify: no two consecutive builds in one project share macrostructure, theme (on all 3 axes), nav, footer, or enrichment archetype.

Macrostructure and theme are prime Grill Gate material — surface them to the user as direction choices (`references/process.md`), with the recommended pick first.

## Genre — pick first (silent default: editorial)

| Genre | Fires on | Theme cluster (rotates) | Nav default | Footer default |
| --- | --- | --- | --- | --- |
| **editorial** (default) | no other signal; portfolio, manifesto, agency, magazine, artisan brand | Specimen · Newsprint · Atelier · Garden · Almanac · Studio · Riso · Sport · Brutal · Manifesto · Editorial · Carnival | N6 Masthead | Ft1 Mast-headed |
| **modern-minimal** | SaaS, enterprise, API, platform, dev tool, infra, B2B, dashboard | Coral · Cobalt | N1b SaaS three-section | Ft2 Inline single line |
| **atmospheric** | AI tool, generative, music/video/voice, late-night, dark mode, cinematic | Bloom · Midnight · Terminal · Aurora · Lumen | N5 Floating pill | Ft5 Statement |
| **playful** | fun, consumer, casual, friendly, onboarding, community | Hum | N1b SaaS three-section | Ft8 Marquee scroll |

Two non-default signals → ask one follow-up. State the genre out loud at the pick.

## The 21 macrostructures — selection table

Pick one. The first ten cover ~80% of briefs; reach for 11–21 only on their specific signal. **Specimen (10) is not a default** — reach for it only when the brief is explicitly editorial/foundry/specimen. Then load only `library/hallmark/references/macrostructures/<NN-slug>.md`.

| # | Shape | Pick when the brief… | Structural signature (one line) | Notable value |
| --- | --- | --- | --- | --- |
| 01 | Bento Grid | has many equally-valid entry points; SaaS feature page | centred fixed-height hero · 8–15 mixed-span tiles (1×1…2×2) · 12–24px gap, no rules · tile-internal links · cropped in-tile images | 8–15 tiles; gap 12–24px |
| 02 | Long Document | tells a story, not a feature list; case study, founder post, mission | inline heads from flow · single column line-height ≥1.65 · negative-space dividers · in-paragraph typographic link | measure 60–65ch |
| 03 | Marquee Hero | the brand/person *is* the message; portfolio, single-voice product | display fills fold 8–14vw hugging edges · below-fold becomes a list/block · thick rule or colour-change divider · no CTA in fold | type 8–14vw; hero macro |
| 04 | Stat-Led | has one defensible metric to lead with; B2B, fundraising, impact | giant numeric 8–12rem tabular **paired with a worded headline** · stat-anchored sections · number-tick counter | figure 8–12rem; counter ~500ms |
| 05 | Workbench | sells by showing the product in use; SaaS, dev tool, IDE | small functional heading · sequence of framed screenshot blocks + captions · sticky CTA after 3rd shot | sticky CTA after shot 3 |
| 06 | Conversational FAQ | fights skepticism near pricing; support-led | each section is a question · 2–4-para answer · accordion `grid-template-rows 0fr→1fr` | accordion 200ms ease-out |
| 07 | Manifesto | sells a belief before a product; repositioning, cause | all-caps display tilted −2°…−4° or colour-block verb · one-assertion paragraphs · bleed-colour dividers | tilt −2°…−4° |
| 08 | Photographic | leads with feeling; fashion, hospitality, lifestyle | corner caption not centred display · full-bleed image bands · image-edge dividers | needs real photography; hero macro |
| 09 | Quote-Led | leads with borrowed credibility; B2B, agency, fundraising | italic display quote 36–60px + small-caps attribution · testimonial-led body | quote 36–60px; hero macro |
| 10 | Specimen *(not default)* | is explicitly editorial/foundry/type-specimen | left-margin number+label + huge serif · asymmetric spans · hairline rules · typographic CTA | banned as fall-through |
| 11 | Catalogue | is an index of variations; foundry, palette, SKUs | brand mark + tagline only · uniform 3–5-per-row cards · row hairlines · card-internal links | uniform card size |
| 12 | Letter | is a personal note; indie founder, sabbatical, appeal | serif-italic salutation 1.5–2× body · typed single column 50ch · `* * *` separators | measure 50ch; hero macro |
| 13 | Index-First | *is* a list of links; docs hub, archive, link-in-bio | one intro line · categorised link list · row hairlines · links are the buttons | no hero image |
| 14 | Narrative Workflow | is a process over time; PM, pipeline, writing tool | large numbered stage labels (1.0→2.0→…) · stage = explanation + small visual · numbered-rule dividers | needs a real sequence |
| 15 | Split Studio | wants every claim visually paired; SaaS feature, dev tool | half-width heading, half proof · alternating left/right diptych · gutter divider | direction alternates |
| 16 | Feature Stack | wants to control scroll pacing; premium SaaS | sticky left pane + scrolling right pane cycling 3–6 detail screens · section-band dividers | 3–6 screens/section |
| 17 | Type Specimen | celebrates a custom face; foundry, design system | typeface set at many sizes demonstrating itself · progressive demo · type-unmask | needs a distinctive face |
| 18 | Portfolio Grid | is work-led; studio, agency, photographer | tagline + filterable project cards · filter bar, no rules · card-internal case links | filterable cards |
| 19 | Map / Diagram | lays info out spatially; system/ecosystem/org viz | small orientation line + the diagram itself · node-by-node reveal | reveal capped to 5 nodes |
| 20 | Ecosystem Index | surfaces many things; community, marketplace, UGC | positioning line · multiple discovery rails (featured/latest/by-category/by-people) | needs many items |
| 21 | Component Playground | is code-and-preview-led; design system, framework docs | category labels · alternating preview+code blocks · per-block Copy button (silent success) | interactive previews |

**When genuinely torn:** do not default — offer three macrostructures from *categorically different* groups. Domain→trio:

| Domain words | Offer these three |
| --- | --- |
| podcast, audio, music, playlist | Photographic · Quote-Led · Letter |
| shop, store, product, commerce | Catalogue · Photographic · Bento Grid |
| docs, CLI, SDK, API, open source | Workbench · Long Document · Component Playground |
| platform, observability, dashboard SaaS, B2B tool | Bento Grid · Workbench · Stat-Led |
| agency, studio (work-led), case studies | Portfolio Grid · Split Studio · Index-First |
| personal one-pager, about-me | Long Document · Letter · Index-First |
| restaurant, café, food, menu | Photographic · Long Document · Catalogue |
| fashion, apparel, lookbook | Photographic · Catalogue · Marquee Hero |
| fintech, payments, invest, trading | Stat-Led · Workbench · Long Document |
| manifesto, campaign, cause, advocacy | Manifesto · Quote-Led · Stat-Led |
| editorial, foundry, magazine, type | Specimen · Long Document · Type Specimen |
| conference, event, keynote | Marquee Hero · Manifesto · Photographic |
| fallback (no signal) | Bento Grid · Long Document · Manifesto |

## Component fingerprints — pick one per slot

The macrostructure picks the page shape; these pick the parts inside it. No two sections on a page share an archetype. State the within-archetype knob values in the stamp. Load only the picked file from `library/hallmark/references/components/<code>-<slug>.md`.

### Hero (pick one; hero macrostructures may add one polish HP1–HP4)

| Code | Essential move | Pick when | Library |
| --- | --- | --- | --- |
| H1 Marquee | one statement fills the fold, no subhead/CTA in view | brand/person is the message | `…/components/h1-marquee.md` |
| H2 Split Diptych | headline+lede one side, image/proof other (7/5 or 6/6) | every claim pairs with a visual | `…/components/h2-split-diptych.md` |
| H3 Quote-Led | pull-quote + attribution is the hero | a real testimonial earns the front | `…/components/h3-quote-led.md` |
| H4 Stat-Led | one giant number + qualifier (never a bare number) | one defensible metric | `…/components/h4-stat-led.md` |
| H5 Letter Hero | first-person salutation, no buttons in fold | founder's voice is the brand | `…/components/h5-letter-hero.md` |
| H6 Photographic Fold | single full-bleed image, corner caption | real photography earns full-bleed | `…/components/h6-photographic-fold.md` |
| H7 Demo Video Clipped-Edge | headline left, video right clipped 10–20% past viewport | SaaS/dev-tool with real footage | `…/components/h7-demo-video-clipped-by-viewport-edge.md` |
| H8 Mockup Split | headline left, browser-frame mockup right tilted 1–3° | selling a web app with a clean shot | `…/components/h8-mockup-split-browser-framed.md` |
| H9 Custom Illustration | one hand-built SVG (enrichment tier A/B) as the element | brand has a thing worth drawing | `…/components/h9-custom-illustration-centerpiece.md` |

### Section head · Feature · CTA · Proof

| Slot | Alternatives (pick one; recipe in `library/hallmark/references/components/`) |
| --- | --- |
| Section head | S1 Left-margin numbered · S2 Hanging · S3 Sticky-pinned · S4 Inline (no break) · S5 Bottom-anchored. **Default stacked single-column; numbered heads only when content is genuinely ordinal.** |
| Feature | F1 Bento (8–15 tiles) · F2 Sticky-scroll stack (3–6 screens) · F3 Tabular spec sheet (tabular-nums) · F4 Step sequence (1.0→2.0) · F5 Annotated screenshot · F6 Product card grid (commerce) |
| CTA | C1 Outlined chip · C2 Inline form-as-CTA · C3 Typographic link · C4 Sticky bottom bar. **Min hit-target 44px; never wrap to two lines.** |
| Proof | T1 Pull-quote + marginalia · T2 Logo wall (hairline, monochrome — not the 6-box grid) · T3 Single huge quote · T4 Numbered stat strip. **Real numbers/names only; no placeholder personas.** |

### Nav (14) + Footer (8) routing — the fingerprint chrome

Default away from **N1a** (wordmark + inline links + button-right) and **Ft3** (4-column index footer) — the two most-recognised AI fingerprints. Diversify: state "Previous nav: X. This build: Y, because…" every build.

| Genre / cluster | Nav default | Nav also OK | Footer default | Footer also OK |
| --- | --- | --- | --- | --- |
| editorial | N6 Masthead | N1a, N9, N12 | Ft1 Mast-headed | Ft2, Ft4, Ft6, Ft7 |
| modern-minimal (Coral·Cobalt) | N1b SaaS three-section | N5, N11, N13, N9 | Ft2 Inline single line | Ft1, Ft5 |
| atmospheric (Bloom·Aurora·Midnight·Lumen) | N5 Floating pill | N9, N4, N13, N1b | Ft5 Statement | Ft1, Ft2 |
| playful (Hum) | N1b SaaS three-section | N5, N11, N12, N13, N7 | Ft8 Marquee scroll | Ft5, Ft3 |
| terminal / CLI (Terminal) | N8 Terminal command | N4, N13 | Ft4 Dense colophon | Ft2 |
| docs / reference (Almanac) | N3 Side-rail | N13, N1a, N4 | Ft3 Index columns | Ft1 |
| commerce / product launch | N12 Banner + retract | N1b, N11, N9 | — | — |

Full nav roster: N1a Wordmark+2-links · N1b SaaS three-section · N2 Floating chip · N3 Side-rail · N4 Hidden ⌘K · N5 Floating pill · N6 Masthead · N7 Brutal slab · N8 Terminal command · N9 Edge-aligned minimal · N10 Scroll-morph · N11 Mega-menu · N12 Banner+retract · N13 Inline ⌘K pill. Full footer roster: Ft1–Ft8 (Mast-headed · Inline-rule · Index columns · Dense colophon · Statement · Letter close · Newsletter-first · Marquee scroll).

## Themes — selection table (catalog is the default)

Rotate within the genre's cluster. Two consecutive themes must differ on **≥1 of 3 axes**: paper band (dark <30% / mid 30–85% / light >85%) · display style · accent hue. Full OKLCH token block for every theme: `library/hallmark/site/css/tokens.css`. The four with a spec file also carry signature moves + affinity in `library/hallmark/references/themes/<name>.md`.

| Theme | Genre | Paper band | Display | Accent | Voice |
| --- | --- | --- | --- | --- | --- |
| Specimen | editorial | light warm-oat | high-contrast serif | warm orange `#FC4C02` | editorial workshop |
| Newsprint | editorial | light salmon-pink | roman serif | warm burgundy | broadsheet |
| Atelier | editorial | light cool-cream | high-contrast serif (900) | warm brown | luxury fashion-house |
| Garden | editorial | light warm-oat | roman serif | leaf-green + clay | botanical almanac |
| Almanac | editorial | light cool | grotesk-sans (600) | slate blue | encyclopaedic reference |
| Studio | editorial | light cool-grey | high-contrast serif, roman | forest-green | research studio |
| Riso | editorial | light warm-peach | risograph-bold (800) | riso cyan + yellow | indie print |
| Sport | editorial | light near-white | display-condensed, roman | burnt orange | athletic |
| Brutal | editorial | light near-white | display-heavy (700) | bright red `#E63946` | stark brutalist |
| Manifesto | editorial | dark near-black | display-heavy all-caps | red `#E51A1A` | political poster |
| Editorial | editorial | light warm-cream | display-heavy (800) | coral | magazine |
| Carnival | editorial | light pink-cream | variable display | mustard + oxblood | loud maximalist |
| Coral | modern-minimal | light warm-grey | geometric-sans (600) | warm coral | warm fintech |
| Cobalt | modern-minimal | light cool-white | grotesk-sans | electric cobalt | dev-tool/API |
| Bloom | atmospheric | light warm off-white | geometric-sans (600) | restrained coral | calm airy |
| Midnight | atmospheric | dark cool-charcoal | geometric-sans (300) | cyan-blue | deep technical |
| Terminal | atmospheric | dark phosphor | mono | phosphor green | CRT terminal |
| Aurora | atmospheric | dark cool | geometric-sans (600) | cyan + teal | product-tool after dark |
| Lumen | atmospheric | dark (Night) / light (Day) | classical serif, roman | molten brass / indigo | premium AI-tool |
| Hum | playful | light cream | rounded-sans (600) | pear + cyan + coral | vibrant alive |

**Custom fork** (surface only on signal: explicit "custom", a named brand colour, a 3+-word off-catalog vibe, or an attached mood swatch). *Tuned* = one-off OKLCH palette + font pairing on these structures. *Bespoke* = design the structure too, from first principles. Both keep every gate. See `library/hallmark/references/custom-theme.md`.

## Enrichment — typography-only is the default

Run the image-need check; default is no imagery. Reach for the highest tier that ships: **0 typography-only → A pure-CSS art → B hand-SVG → C generated (post-processed) → D library (customised) → E Lottie (last resort, articulated character motion only).** Skipping tiers is the tell.

| Archetype | What sits next to the headline | Pick when |
| --- | --- | --- |
| E1 Clipped-edge demo video | video clipped 10–20% past the edge | SaaS/dev-tool with real footage |
| E2 Full-bleed muted loop | video as wallpaper under ghost overlay | the product's *feel* is the message |
| E3 Browser-framed mockup | screenshot in chrome, tilted 1–3° | selling a web app, clean shot |
| E4 Floating no-frame mockup | screenshot floats, soft shadow | the screenshot is beautiful naked |
| E5 Custom illustration | hand-SVG/CSS centrepiece | brand has a thing worth drawing |
| E6 Animated loop | small pure-CSS/SVG loop ≤4s | one still page needs one live element |
| E7 Abstract background | two-stop gradient + <0.1 grain (not aurora) | flat surface feels synthetic |
| E8 Hero photography | one tightly-cropped image | real photography earns it |

**Hero polish (one max, never two): HP1** vertical-rail title · **HP2** marquee-overflow · **HP3** cursor-spotlight (scoped to hero) · **HP4** decorative-numeral (must carry meaning). Hero space discipline: 70–90% of the fold, `padding-block-end ≥ 1.3× padding-block-start`, essential content (eyebrow+headline+lede+CTA) visible without scroll at 1280×800.

## The stamp

First line of the emitted CSS:
`/* Hallmark · genre: <g> · macrostructure: <name> · theme: <name> · enrichment: <E# or none> · nav: <N#> · footer: <Ft#> */`
Append a `.hallmark/log.json` entry (newest first, trim to 20): `{date, macrostructure, theme, enrichment, brief}`. The next build reads it and picks differently.

---
*Distilled from: hallmark (macrostructures, component-cookbook, structure, genres, tokens, hero-enrichment, custom-theme).*
