# Design Foundations

*Universal craft layer for any UI: typography, spacing and layout, color, visual hierarchy, UX copy, and the polish details that separate professional output from generic output.*

## Register: Brand vs Product

Decide the register first; it changes every downstream default.

| Dimension | Brand (marketing, portfolio, editorial) | Product (app, dashboard, tool) |
|---|---|---|
| Type scale | Fluid `clamp()`, ratio ≥ 1.25 | Fixed `rem`, ratio 1.125–1.2 |
| Fonts | Personality-led; expressive pairing allowed | One well-tuned family; system stacks legitimate |
| Spacing | Fluid `clamp()`, asymmetric composition, grid-breaking for emphasis | Predictable grids, consistent density; consistency IS an affordance |
| Color | Palette is voice; a dominant color can own the page | Restrained + semantic; accent reserved for primary action, selection, state |
| Responsive | Fluid everything | Structural (collapse sidebar, restack table), not fluid type |

## Typography

### Scale

Fewer sizes, more contrast. 5 sizes cover most UIs; sizes 14/15/16/18px together = muddy hierarchy.

| Role | Size | Use |
|---|---|---|
| xs | 0.75rem | Captions, legal |
| sm | 0.875rem | Secondary UI, metadata |
| base | 1rem | Body (never smaller) |
| lg | 1.25–1.5rem | Subheadings, lead text |
| xl+ | 2–4rem (brand: up to 8–12rem display) | Headlines, hero |

- Pick ONE ratio and commit: 1.25 (major third), 1.333 (perfect fourth), or 1.5 (perfect fifth). Product UIs: 1.125–1.2.
- Fluid type (`clamp(min, 5vw + 1rem, max)`) for headings on brand/content pages only. Bound it: max ≤ 2.5 × min. Body text stays fixed everywhere; no major product design system uses fluid type in app UI.
- Award-grade brand surfaces run 8–15x size contrast between display and body. Big type is the cheapest professional signal.
- Use `rem` for font sizes, never `px` (respects user settings). Never disable zoom (`user-scalable=no`).

### Selection & pairing

- Max 2–3 families; 2 is the practical ceiling. The third is an **outlier used in ≤2 slots** (wordmark + one hero stat is the canonical pair). Mono counts as a family in any non-code use; the same family at different weights counts once. Four families = fail. One family in 3–4 weights often beats two competing typefaces.
- Pair on exactly ONE loud contrast axis, agree on the rest: high-contrast serif display + neutral grotesk body (editorial); mono display + humanist sans body (technical); compressed/wide display + normal body (poster). Never two similar grotesks (Inter + Manrope = generic tell).
- Anti-reflexes: technical brief ≠ needs a serif "for warmth"; premium ≠ the trending expressive serif; kids ≠ rounded display font; "modern" ≠ geometric sans. Don't default to Inter/Roboto/Open Sans when personality matters.
- System stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui`) is legitimate for product UIs where performance > personality.
- Weights: 3–4 max (Regular, Medium, Semibold, Bold). Define a role per weight and hold it. Medium-vs-Regular contrast is barely visible; use Bold-vs-Regular for hierarchy.

### Rhythm & readability

- Body ≥ 16px / 1rem. Measure 45–75ch: `max-width: 65ch` on text containers.
- Line-height: headings 1.1–1.2, body 1.5–1.7. Narrow columns tighter, wide columns looser.
- Vertical rhythm: base line-height (16px × 1.5 = 24px) becomes the unit for vertical spacing multiples.
- Light-on-dark compensation is three-axis: line-height +0.05–0.1, letter-spacing +0.01–0.02em, body weight up one notch (400 → 450) or in dark mode down (400 → 350 — light text reads heavier).
- Paragraphs: space between OR first-line indent, never both. Digital defaults to space.

### Optical details

- ALL-CAPS and small-caps labels: add `letter-spacing: 0.05em`–`0.12em`. Large display text: default or slightly negative tracking. All-caps display line-height floors at **1.0** (1.02–1.08 recommended) — tighter collides cap-height on wrap.
- Display italic words with descenders (`y g j p q`) clip under `leading-none`; minimum `line-height: 1.1` plus a small padding reserve. (Italic *headers* are banned outright — `references/design-audit.md` structural gates; this rule covers surviving body/brand italics.)
- Display-size text always gets `overflow-wrap: anywhere; min-width: 0` so long compounds can break.
- `font-variant-numeric: tabular-nums` for tables and any aligned numbers.
- `text-wrap: balance` on headlines, `text-wrap: pretty` on body (kills orphans/widows).
- `font-kerning: normal`; `font-optical-sizing: auto` for variable fonts; `font-variant-ligatures: none` in code blocks.

### Loading

- `font-display: swap` + metric-matched fallback (`size-adjust`, `ascent-override`, `descent-override`) to eliminate swap CLS. `font-display: optional` when zero shift matters more than showing the brand font on slow networks.
- Preload only the critical above-the-fold weight. 3+ weights → one variable font file; 1–2 weights → static files.
- Subset fonts (`unicode-range`), self-host.

## Spacing & Layout

### Spacing scale

- 4pt base scale: **4, 8, 12, 16, 24, 32, 48, 64, 96px**. (8pt alone is too coarse — you will need 12.) Every gap comes from the scale; a random 13px gap is a defect.
- Semantic tokens (`--space-xs`…`--space-xl`), not value names (`--spacing-8`).
- Use `gap` for sibling spacing, not margins (kills margin-collapse hacks).
- Brand surfaces: `clamp()` on section padding so spacing breathes at large viewports.

### Rhythm & grouping

- Tight within groups: 8–12px between related siblings. Generous between groups: 48–96px between sections. Equal spacing everywhere = no hierarchy.
- Density bands (the VISUAL_DENSITY dial, `references/design-direction.md`): 1–3 art-gallery → section gaps `py-32`–`py-48`, airy and expensive; 4–7 daily-app → `py-16`–`py-24`; 8–10 cockpit → tight padding, no card boxes, 1px rules separate data, `font-variant-numeric: tabular-nums` on all stacked numbers.
- Proximity does the grouping; borders and cards are the fallback, not the default.
- Vary section structure. Identical icon+heading+text card grids repeated down a page is the generic tell. Alternatives: index/table rows with hairline rules and oversized numerals; sticky split (one pane pinned, other scrolls); editorial asymmetric 12-col with overlaps; full-bleed pinned chapters (≤ 2 per page).
- Cards: only for truly distinct, actionable content. Never nest cards in cards. Never wrap everything in a card.

### Layout tools

- Flexbox for 1D (nav bars, button rows, card internals). Grid for 2D (page structure, dashboards). `grid-template-areas` for complex pages, redefined per breakpoint. `subgrid` to align internals across sibling cards.
- Container queries for components, viewport queries for pages:

```css
.card-wrap { container-type: inline-size; }
@container (min-width: 28rem) { .card { grid-template-columns: 120px 1fr; } }
```

### Optical adjustments

- Geometrically centered glyphs often look off: play icons nudge right, arrows nudge toward their direction. Adjust only when it visibly reads wrong.
- Left-aligned text optically indents due to letterform whitespace; `margin-left: -0.05em` on large headings fixes it.
- Touch targets ≥ 44×44px (48 preferred), ≥ 8px between adjacent targets, even when the visual is smaller — expand hit area with padding or `::before { inset: -10px }`.

### Responsive

- Design at 380px first; widen from there. Mobile layouts are *composed* (big type, full-bleed imagery, index rows), not shrunken desktop.
- Thumb zones: bottom third = primary actions; middle = content; top = low-frequency/destructive. Never primary CTA top-right on mobile.
- No horizontal scroll at any width 320–1920px; no text below 14px on mobile; layout survives 200% zoom. Any deliberately-overflowing element (marquee, clipped-edge media) pairs with `html, body { overflow-x: clip; }` — `clip`, never `hidden` (hidden breaks sticky/fixed); the overflowing element's own parent stays `overflow: visible`.
- `touch-action: manipulation` on buttons/links (kills tap delay and double-tap zoom).

## Color

### Work in OKLCH

`oklch(L C H)` is perceptually uniform — equal lightness steps look equal (HSL lies). Build shade ramps by holding chroma+hue and varying lightness; reduce chroma near white/black. Derive the palette from 2–3 seeds:

```css
:root {
  --brand: oklch(0.62 0.19 255);
  --brand-hover: oklch(from var(--brand) calc(l - 0.08) c h);
  --surface-2: color-mix(in oklch, var(--surface), var(--brand) 4%);
}
```

Hue is a brand decision, never a default. Blue (~250) and warm orange (~60) are the two dominant AI-default hues — reaching for them by reflex is the tell.

### Palette structure

| Role | Purpose | Sizing |
|---|---|---|
| Primary | Brand, CTAs, key actions | 1 color, 3–5 shades |
| Neutral | Text, backgrounds, borders | 9–11 shade ramp |
| Semantic | Success / error / warning / info | 4 colors, 2–3 shades each |
| Surface | Cards, modals, overlays | 2–3 elevation levels |

- Skip secondary/tertiary accents unless genuinely needed. One accent covers most apps; 2–4 colors beyond neutrals is the ceiling.
- Tinted neutrals: pure gray is dead next to a colored brand. Add chroma 0.005–0.015 to neutrals, hued toward THIS brand's color (teal brand → teal-leaning grays). Not reflex-warm, not reflex-cool — and never default cream/sand paper (`oklch(97% 0.01 60)` is the recognized AI tell).

### Strategy tiers (pick one, commit)

1. **Near-monochrome + one accent** — 90%+ of pixels from one hue's lightness ramp; one high-chroma accent at **≤3% of any viewport (5% hard cap)** — the accent is a highlighter (active nav item, focus ring, link underline, CTA border, one heading mark), never a background fill. Safest path to "designed."
2. **Dominant-hue world** — the background itself is a committed color (deep green, oxblood, cobalt). High risk, high reward.
3. **Duotone/tritone** — two hues at fixed lightness relationships (L 0.22 ink + L 0.97 paper + L 0.65 accent). Print-like; great for data-heavy UIs.

### 60-30-10 (visual weight, not pixel count)

60% neutral backgrounds/whitespace, 30% secondary (text, borders, inactive), 10% accent (CTAs, highlights, focus). Accents work *because* they're rare; using the brand color everywhere kills it.

### Semantic color

Success = green family, error = red/rose, warning = amber/orange, info = blue, inactive = gray. Same color = same meaning on every screen. Never color as the only indicator — pair with icon, label, or pattern (8% of men are red-green colorblind).

### Contrast (WCAG)

| Content | AA min | AAA target |
|---|---|---|
| Body text | 4.5:1 | 7:1 |
| Large text (18px+, or 14px bold) | 3:1 | 4.5:1 |
| UI components, icons, focus rings | 3:1 | 4.5:1 |

Known failures: light gray on white; gray text on colored backgrounds (use a darker shade of that background color instead); red on green; yellow on white; thin light text over images (scrim it: `color-mix(in oklch, var(--surface) 65%, transparent)`). Check both themes — OKLCH lightness that passes on white often fails on near-black. Verify with a checker, not eyes.

### Dark mode

Not inverted light mode:

| Light | Dark |
|---|---|
| Shadows convey depth | Lighter surfaces convey depth (3-step ramp, e.g. L 15% / 20% / 25%, same hue+chroma as brand) |
| Dark on light | Light on dark — reduce body weight (400 → 350) |
| Vibrant accents | Slightly desaturated accents |
| White background | Deep brand-tinted near-black (L 12–18%) or pure black |

Token hierarchy: primitives (`--blue-500`) + semantic (`--color-primary`). Dark mode redefines only the semantic layer. `color-scheme: light dark` + `light-dark()` for cheap dual-theme values.

### Alpha is a smell

Heavy rgba/hsla usually means an incomplete palette: unpredictable contrast, inconsistency. Define explicit overlay colors per context. Exceptions: focus rings, scrims, genuinely see-through interaction states.

## Visual Hierarchy

The squint test: blur the page — primary element, secondary element, and groupings must still read. Combine 2–3 dimensions; a heading that is larger AND bolder AND has more space above reads primary without effort:

| Tool | Strong | Weak |
|---|---|---|
| Size | ≥ 3:1 ratio | < 2:1 |
| Weight | Bold vs Regular | Medium vs Regular |
| Color | High contrast | Similar tones |
| Position | Top/left (LTR primary) | Buried bottom/right |
| Space | Generous isolation | Crowded |

- Space alone can carry hierarchy; add color/size contrast only when simpler means fail.
- Elevation: one consistent shadow ramp (sm→xl), subtle, reinforcing hierarchy — never decoration.
- ONE primary action per view; few secondary; everything else tertiary or hidden. Five competing CTAs = zero CTAs.
- Distill ruthlessly: remove redundant info, decorative borders/backgrounds that serve no hierarchy, and containers that exist only to contain. Progressive disclosure (accordion, modal, step-through) over showing 40 fields at once. Match disclosure depth to neighboring features. Simplicity = removing obstacles, not features; don't oversimplify complex domains and don't create mystery-meat minimalism.

### Hero discipline (brand surfaces)

The hero is a single moment, not a feature list. Hard rules on landing/brand surfaces:

| Rule | Value |
|---|---|
| Headline | ≤2 lines desktop; a 4-line headline is a font-size error, never a copy-length error |
| Headline size by copy length | ≤20 chars → full display scale; 21–50 → standard display; 51–90 → step down one size; >90 → rewrite the copy or cap at heading scale. Author-written headlines: ≤7 words |
| Subtext | ≤20 words AND ≤3–4 lines |
| Text stack | ≤4 elements total: (eyebrow OR brand-strip OR neither) + headline + subtext + CTAs (1 primary + ≤1 secondary) |
| Banned in hero | Tagline below CTAs, trust micro-strip, pricing teaser, feature bullets, avatar row, "used by" logos — all move below |
| Fold fit | Essential content (headline + subtext + CTA) visible without scroll at 1280×800; hero occupies 70–90% of the fold |
| Padding | Top ≤~6rem desktop; bottom-heavy asymmetry (`padding-block-end ≥ 1.3× padding-block-start`) — a hero floating halfway down reads as a bug |
| Viewport | `min-h-[100dvh]`, never `h-screen` (iOS address-bar jump) |
| Nav | Single line at desktop; height ≤80px (default 64–72px) |

Plan headline size and hero-asset size *together*: if copy overflows the fold, cut copy or reduce scale — never let the CTA sink below the fold. Hero *composition* archetypes: `references/page-anatomy.md`.

## UX Copy & Clarity

Copy is a design surface. Microcopy (buttons, empty states, errors) carries voice more than the hero tagline does.

### Buttons

Never "OK", "Submit", "Yes/No", "Click here". Verb + object, outcome-focused:

| Bad | Good |
|---|---|
| OK | Save changes |
| Submit | Create account |
| Yes / No | Delete message / Keep message |
| Cancel | Keep editing |
| Click here | Download PDF |

Destructive: name the destruction and the count — "Delete 5 items", not "Remove selected".

### Errors — the formula

Answer: what happened, why, how to fix. "Email address needs an @ symbol. Try: name@example.com" — never "Invalid input". Templates:

| Situation | Template |
|---|---|
| Format | "[Field] needs to be [format]. Example: [example]" |
| Missing required | "Please enter [what's missing]" |
| Permission | "You don't have access to [thing]. [What to do instead]" |
| Network | "We couldn't reach [thing]. Check your connection and [action]." |
| Server | "Something went wrong on our end. We're looking into it. [Alternative]" |

Never blame the user ("You entered an invalid date" → "Please enter a date as MM/DD/YYYY"). Never humor in errors.

### States

- Empty states are onboarding: value + next action. "No projects yet. Create your first to get started." — never bare "No items".
- Loading: specific ("Saving your draft…"), with expectation for long waits ("usually 30–60 seconds") and progress when possible.
- Success: confirm what happened + what happens next. "Settings saved — changes take effect immediately."
- Confirmations: use sparingly (prefer undo). When used: name the action, state consequences, specific buttons — "Delete 'Project Alpha'? This can't be undone." with "Delete project / Keep project".

### Voice, tone, consistency

- Voice constant; tone shifts: success = brief + celebratory, error = empathetic + helpful, destructive confirm = serious.
- One term per concept, enforced: Delete (not Remove/Trash), Settings (not Preferences/Options), Sign in, Create. A "Workspace" here can't be a "Project" three screens away.
- Active voice, specific nouns, cut every non-pulling word. If a headline could sit on a competitor's site unchanged, it isn't written yet.
- Banned tells: "seamless", "effortless", "powerful", "supercharge", "unlock", "elevate"; generic CTAs ("Learn more", "Get started"); headers restating intros.
- Labels over placeholders (placeholders vanish on input). Instructions before the field. Format via placeholder example.
- Accessibility: links meaningful standalone ("View pricing plans"); alt text carries the information ("Revenue up 40% in Q4", not "Chart"); `alt=""` for decorative; `aria-label` on icon buttons.
- Translation: German/Finnish +30%, French +20%, Portuguese +20% — test nav labels and buttons against expanded strings. Keep numbers separate ("New messages: 3"), full sentences as single strings, no abbreviations.

## Polish & Craft Checklist

The final pass. Polish comes after functional completeness and after aligning to whatever design system exists — polish on drift is decoration. For each deviation name the root cause: missing token, one-off reimplementation, or conceptual misalignment; the fix differs.

### Interaction states — every interactive element needs all of them

Default, hover, focus-visible, active, disabled, loading, error, success. Plus per-view: empty, overflow/long-content, first-run. Missing states are broken experiences, not missing polish.

- Focus: `:focus-visible { outline: 2px solid var(--brand); outline-offset: 3px; }` — never `outline: none` without replacement, styled to match the direction.
- Transitions on state change: 150–300ms, ease-out family (quart/quint/expo). Never bounce/elastic for UI state. Respect `prefers-reduced-motion` (deeper motion craft: `references/motion-principles.md`).

### Generic-output tells not already in the audit catalog

Full anti-pattern catalog (gradients, card grids, generic fonts, fake metrics): `references/design-audit.md`. Two more worth grepping for here:

- Colored `border-left`/`border-right` > 1px accent stripes (use a full hairline border, 4–8% surface tint, or a leading glyph instead)
- Lorem ipsum, placeholder images, dead links, emoji as icons, mixed icon sets

### Consistency locks — three page-wide locks, each auditable before ship

- **Theme lock:** one theme (light / dark / auto) per page; no warm-paper section sandwiched into a dark page. A deliberate one-time theme switch on scroll is the only exception. Same-family section tints (`bg-zinc-950` beside `bg-zinc-900`) are fine.
- **Color lock:** one accent, used identically in every section — no blue CTA surfacing in section 7 of a warm-grey site.
- **Shape lock:** one corner-radius system per page (all-sharp / all-soft 12–16px / all-pill). Mixing only under a documented rule ("buttons pill, cards 16px, inputs 8px") applied everywhere.

### Image & asset strategy (brand surfaces)

Landing pages and portfolios are visual products; a text-only page with div "screenshots" is incomplete work, not minimalism — but **typography-only is a legitimate committed direction** when chosen deliberately (`references/page-anatomy.md` enrichment tiers). When imagery is warranted, priority order:

1. **Image-gen tool first** when available — hero photography, product shots, texture, generated at the section's aspect ratio.
2. **Real photography second:** `https://picsum.photos/seed/{descriptive-seed}/{w}/{h}` (seed describes the section); supplied brand/stock URLs — verify every hotlink resolves.
3. **Last resort:** a labelled placeholder slot (`<!-- TODO: hero product photo, 1600x1200 -->`) plus a note to the user — never hand-rolled decorative SVG filler or fake-div screenshots.

Even restrained sites that opt into imagery want ≥2–3 real images (hero + one product/lifestyle + one supporting). Logos for social proof: `https://cdn.simpleicons.org/{slug}/{color}` or devicon; invented brands get a simple monogram SVG; check both themes.

### Craft details

- All spacing on the scale; alignment true at every breakpoint; baseline grid holds
- Typography: same role = same style everywhere; no widows on last lines (`text-wrap`); no FOUT reflow
- Color: tokens only, zero hard-coded values; same meaning per color throughout; both themes pass contrast
- Icons: one family, consistent sizes, optically aligned with adjacent text
- Forms: real labels, clear required indicators, logical tab order, consistent validation timing (on blur vs on submit — pick one)
- Copy: consistent terminology, capitalization scheme, punctuation scheme
- Images/media: explicit `width`/`height` or `aspect-ratio` on everything that loads late (the #1 CLS source); AVIF/WebP; `loading="lazy"` below fold; `fetchpriority="high"` on the LCP image; useful alt text

### Performance floor

| Metric | Target (throttled mid-tier phone: 4x CPU, Slow 4G) |
|---|---|
| LCP | ≤ 2.5s |
| INP | ≤ 200ms |
| CLS | ≤ 0.05 (strict; 0.1 is the standard "good") |

Animate only `transform` and `opacity` (`clip-path`/`filter` sparingly); never width/height/top/left. `will-change` added just before animating, removed after. `content-visibility: auto; contain-intrinsic-size: auto 600px;` on long below-fold sections.

### Final verification

- [ ] Squint test passes: primary, secondary, groupings legible when blurred
- [ ] Keyboard-only traversal works end to end; focus visible everywhere
- [ ] 200% zoom and 380px width both hold composition
- [ ] Every state reachable and designed (empty / error / loading / long content / offline where relevant)
- [ ] Contrast verified in both themes with a checker
- [ ] Zero console errors, zero layout shift on 5 cache-disabled reloads
- [ ] Reduced-motion emulated: fully readable, nothing stuck invisible
- [ ] Real content only; nothing you'd be embarrassed to zoom to 400%
- [ ] Tested on a real device, not just DevTools

Quality must be consistent — never perfect one corner while another stays rough. If spacing is off everywhere, fix the system, not one screen.

---
*Distilled from: impeccable, design-kit, taste-skill (hero discipline, consistency locks, asset strategy), hallmark (type/color/overflow gates).*
