# Critique & Audit

*Systematically critique a UI with severity-ranked findings, detect AI-slop and generic-design anti-patterns, audit accessibility, and harden for real-world edge cases.*

## Severity Scale

Tag every finding. If unsure between two levels, ask: "Would a user contact support about this?" — yes means at least P1.

| Priority | Name | Definition | Action |
|---|---|---|---|
| **P0** | Blocking | Prevents task completion entirely | Fix immediately |
| **P1** | Major | Significant difficulty, confusion, or WCAG AA violation | Fix before release |
| **P2** | Minor | Annoyance with a workaround | Fix in next pass |
| **P3** | Polish | No real user impact | Fix if time permits |

## Critique Workflow

1. **Resolve one stable target** — prefer a source file path over a dev-server URL (ports drift, paths don't). "The homepage" → `index.html` or the page component.
2. **Run two independent assessments** and keep them isolated until synthesis: (A) a design-director review of source + live page; (B) mechanical evidence — grep scans from this module, browser inspection, automated tooling (Lighthouse, axe, pa11y). Finish A before reading B's output so deterministic findings don't anchor judgment.
3. **Synthesize** — weave, don't concatenate. Note where review and scans agree, what the scans caught that judgment missed, and flag scan false positives.
4. **Report** in this order: anti-patterns verdict → heuristic score table → overall impression → 2–3 specific strengths → 3–5 priority issues (each: `[P?] What / Why it matters / Fix`) → persona red flags → minor observations → provocative questions ("What would a confident version of this look like?").
5. **Ask before acting**: which issue category first, is the current tone intentional, what scope (top 3 / all / critical only). Reference actual findings — never generic questions.

Report rules: be direct and specific ("the submit button", not "some elements"); state why each issue hurts users; give concrete fixes, never "consider exploring…"; prioritize ruthlessly — if everything is important, nothing is; do not soften criticism.

**Pre-emit self-critique (before any build is shown).** Score the not-yet-delivered work 1–5 on six axes — philosophy (does it argue a point of view?), hierarchy, execution, specificity (does it fit *this* brief?), restraint, variety. Any axis <3 triggers a revision pass before the user sees it. This is the builder's own gate; the full critique workflow above is the independent pass.

## Critique Dimensions

### Nielsen's 10 heuristics — score each 0–4

Honest scoring: 4 = genuinely excellent; most real interfaces total 20–32/40.

| # | Heuristic | Check for |
|---|---|---|
| 1 | Visibility of system status | Loading indicators, action confirmation, progress, active nav states, inline validation |
| 2 | Match system / real world | Familiar terminology, logical order, recognizable icons, natural reading flow |
| 3 | User control & freedom | Undo/redo, cancel on forms/modals, back to safety, clear filters, escape from flows |
| 4 | Consistency & standards | Same term/action/pattern everywhere; platform conventions; visual consistency |
| 5 | Error prevention | Confirm destructive actions, constrained inputs, smart defaults, autosave |
| 6 | Recognition over recall | Visible options, labeled icons, contextual help, recents, autocomplete |
| 7 | Flexibility & efficiency | Keyboard shortcuts, bulk actions, power paths that don't complicate basics |
| 8 | Aesthetic & minimalist | Only necessary info per step, clear hierarchy, no decorative clutter |
| 9 | Error recovery | Plain-language errors, specific problem + fix, shown at source, work preserved |
| 10 | Help & documentation | Contextual, task-focused, searchable, reachable without leaving context |

Bands: 36–40 excellent · 28–35 good · 20–27 acceptable · 12–19 poor (overhaul) · 0–11 critical (redesign).

### Cognitive load

Three types: **intrinsic** (task complexity — structure it: steps, defaults, progressive disclosure), **extraneous** (bad design — eliminate ruthlessly), **germane** (learning effort — support with consistent patterns and feedback).

8-item checklist — count failures (0–1 low, 2–3 moderate, 4+ critical):
single focus · chunking (≤4 items/group) · visual grouping · clear hierarchy · one decision at a time · ≤4 visible options per decision point · no cross-screen memory demands · progressive disclosure.

**Working-memory rule (≤4 items)**: nav ≤5 top-level items; ≤4 form fields per group; 1 primary + 1–2 secondary buttons (rest in menu); ≤4 dashboard metrics above fold; ≤3 pricing tiers. 5–7 simultaneous items = group them; 8+ = users skip, misclick, abandon.

### Personas — walk the primary action as 2–3 of these

| Persona | Profile | Red flags to report |
|---|---|---|
| **Alex** (impatient power user) | Skips onboarding, wants shortcuts | Forced tutorials, no keyboard path, unskippable animations, one-at-a-time where batch is natural, redundant confirmations |
| **Jordan** (confused first-timer) | Reads everything, abandons rather than guess | Icon-only nav, unexplained jargon, no visible help, ambiguous next step, no success confirmation |
| **Sam** (accessibility-dependent) | Screen reader, keyboard-only, 200% zoom | Click-only interactions, missing focus indicators, color-only meaning, unlabeled controls, components that break SR flow |
| **Riley** (stress tester) | Pushes past the happy path | Silent failures, broken error states, useless empty states, data lost on refresh, inconsistent behavior between similar interactions |
| **Casey** (distracted mobile) | One thumb, interrupted, slow connection | Primary actions out of thumb zone, no state persistence, typing where selection would do, <44×44pt targets |

Selection: landing/marketing → Jordan, Riley, Casey · dashboard/admin → Alex, Sam · e-commerce → Casey, Riley, Jordan · onboarding → Jordan, Casey · data-heavy → Alex, Sam · form-heavy → Jordan, Sam, Casey. Report what specifically broke for each persona, not generic descriptions.

## Anti-Pattern Catalog

**Start every critique here**: would someone believe "AI made this" immediately? Score 0 = 5+ tells (slop gallery), 2 = 1–2 tells, 4 = distinctive intentional design.

### AI-slop tells

| Tell | Smell | Fix |
|---|---|---|
| AI color palette | Default purple/violet-to-blue gradients, indigo-on-white sameness | Derive palette from brand/content; commit to one distinctive hue strategy |
| Gradient text | Gradient-filled headlines as default decoration | Reserve for one deliberate focal moment, or drop |
| Unmotivated glassmorphism | Frosted blur cards with no light model or layering logic | Use glass only where depth layering means something |
| Hero metrics | "10k+ users / 99.9% uptime / 24/7 support" stat rows with invented numbers | Real proof or nothing |
| Card grids | Three-across feature cards with icon + title + blurb, repeated for every section | Vary section anatomy; let content dictate layout |
| Generic fonts | Stack defaults (Inter-everywhere) with no typographic voice | Choose type deliberately; pair a display voice with a working body face |
| Gray on color | Low-contrast gray text sitting on tinted/colored backgrounds | Recompute contrast per surface; use derived on-color tokens |
| Nested cards | Cards inside cards inside cards — borders and shadows stacking | Flatten; one container level per grouping |
| Bounce easing | Springy overshoot on everything | Match easing to brand personality; default to confident ease-out |
| Redundant copy | Headline restated by subhead restated by button ("Get started" / "Start now") | Every string earns its place; cut or differentiate |

Also check holistic slop signals: layout sameness across sections, generic composition (everything centered, symmetric, evenly weighted), and missed opportunities for personality.

### Brand-surface slop tells (landing / portfolio / marketing)

Production-derived, mechanical, specific to Brand-register surfaces; the general catalog above still applies. Each is P1 unless noted — they ship recognizably templated work.

**The em-dash ban (zero-tolerance).** The em-dash (`—`) and separator en-dash (`–`) are the single most-violated AI stylistic tell. Ban them everywhere user-visible: headlines, eyebrows, pills, body, quotes, captions, button text, alt text. No "sparingly" allowance. Fixes: period, comma, colon, parentheses, line break, or two sentences. Ranges use a hyphen (`2018-2026`). One `—`/`–` anywhere visible = fail. Grep: `grep -rn '—\|–' <out>`.

**Eyebrow restraint (mechanical count).** An eyebrow is the small uppercase wide-tracked label above a headline (signature `text-[11px] uppercase tracking-[0.18em]`). The AI reflex puts one over every section, producing identical rhythm. Hard cap: **max 1 eyebrow per 3 sections**; hero counts as 1. Test: count `uppercase tracking` micro-labels; fail if `count > ceil(sections/3)`. The fix is usually deletion — headline and position already categorize the section. Eyebrows also never sit in a column beside the heading (tag-left / heading-right is its own tell — the heading stacks directly beneath in the same column).

| Tell | Signature | Fix |
|---|---|---|
| Section-number eyebrows | `00 / INDEX`, `001 · Capabilities`, `01 / 4` tile pagination | Name the topic in plain words or drop the label |
| Version labels in hero | `V0.6`, `BETA`, `INVITE-ONLY`, `EARLY ACCESS` | Only if the brief is literally a launch/preview |
| Decorative status dots | Colored dot before every nav item / list row / badge | Zero by default; only real live state, one per section |
| Middle-dot overuse | `foo · bar · baz · qux` as default separator | Max 1 `·` per metadata line; prefer columns/hairlines |
| Locale / weather strips | `Lisbon 14:23 · 18°C` atmosphere text | Banned for ~99% of briefs; a footer address is fine |
| Scroll cues | `Scroll to explore`, animated mouse-wheel | Delete; the viewer is already at the hero |
| Photo-credit captions | `Field study no. 12 · <name>` under stock imagery | Only for a real credited photo; else drop |
| Version footers | `v1.4.2`, `Build 0048` on marketing pages | Banned on marketing/landing/portfolio |
| Decoration text strips | `BRAND. MOTION. SPATIAL.` mono-caps at hero bottom | Only if it carries real nav links or status |
| Floating corner sub-text | Small explainer paragraph loose in a section header's corner | Stack under the headline or build an aligned 2-col header |
| Poetic craftsman labels | `From the field`, `Currently on the bench` | Plain functional labels or none |
| Fake screenshots / re-drawn chrome | Task lists, terminals, dashboards, browser bars (URL pill + traffic dots), phone frames built from styled `<div>`s/CSS/SVG | Real screenshot in a `<figure>`, real device render, generated image, or none |
| Invented placeholder personas | Generic testimonial names with stock headshots | Real names/numbers or drop the proof slot |

**Layout-repetition caps.** A layout family (3-col cards, full-width quote, split-text-image) appears at most once per page; ≥8 sections → ≥4 distinct families. Max 2 consecutive image+text zigzag sections — the 3rd breaks the alternation. Max one marquee per page. "Left big headline + right small paragraph" as the default section header is banned — stack vertically (headline, then body ≤65ch) unless the right column carries a real visual. Bento grids: N content items → exactly N cells, no filler; ≥2–3 cells need real visual variation (image, gradient, pattern, tint), not all white-on-white type. Scoring bars with filled background tracks → a number + icon or a trackless inline bar. `border-t` + `border-b` on every row of a long list → pick one, use sparsely; >5 items wants a different component, not a longer list. Structural sameness *across pages* is the deeper fingerprint — `references/page-anatomy.md` owns macrostructure/nav/footer rotation.

**Premium-consumer palette ban.** For cookware / wellness / artisan / luxury / heritage / DTC briefs the reflex is warm beige + brass + espresso. Banned as the default reach (override only if the brand names these colors): backgrounds `#f5f1ea` `#f7f5f1` `#fbf8f1` `#efeae0` `#ece6db` `#faf7f1` `#e8dfcb`; accents `#b08947` `#b6553a` `#9a2436` `#9c6e2a` `#bc7c3a` `#7d5621`; text `#1a1714` `#1a1814` `#1b1814`. Rotate a different family, never the same one twice in a row: cold luxury (silver-grey + chrome + smoke) · forest (deep green + bone + amber) · black-and-tan · cobalt + cream · terracotta + slate · olive + brick + paper · monochrome + one saturated pop. (Rationale: `library/taste-skill/skills/taste-skill/SKILL.md` §4.2.)

**Copy self-audit (before ship).** Re-read every visible string. Flag and rewrite: grammatically-broken phrases, unclear referents, forced metaphors and cute wordplay, mock-poetic micro-meta. When unsure, a plain functional sentence — boring beats cute-but-wrong. Fake-precise numbers (`92%`, `4.1×`) are banned unless from real data or marked mock. One copy register per page — don't mix technical-mono, editorial prose, and marketing punch without a brand reason. When a stat/proof slot has no real number, emit a placeholder marker + "metric to confirm", ask, or drop the slot — never invent.

**CTA and clickable-text hygiene.** One label per intent site-wide ("Get in touch" + "Let's talk" + "Start a project" are one intent). Primary CTA ≤3 words, one line; **no button, nav, footer, or breadcrumb label wraps to 2 lines at any width 320–1920px** — shorten, `white-space: nowrap` + reflow, or collapse. Every CTA passes AA contrast; ghost buttons over photos get a scrim or stroke. Logo walls: real SVG marks (Simple Icons / devicon), monochrome on a hairline, no category labels under logos, under the hero — never the 6-box grid.

Grep sweeps for the brand-slop pass:

```bash
grep -rn '—\|–' <out>                                    # em/en-dash → zero
grep -rEn 'uppercase[^"]*tracking' <out> | wc -l          # eyebrows vs ceil(sections/3)
grep -rniE 'scroll to explore|swipe down' <out>           # scroll cues
grep -rniE 'v[0-9]+\.[0-9]+|build [0-9]{3,}|invite-only' <out>  # version tells
```

### Structural gates (mechanical, any register)

| Gate | Smell | Fix |
|---|---|---|
| Italic headers | `font-style: italic` on any heading/display element, or an italicized emphasis word inside an upright headline | Headers are roman; emphasis via weight, accent color, or a drawn underline. Italic survives only in body copy (and preserved brand identity — see `design-direction.md`) |
| Token improvisation | Inline `#hex`/`oklch()`/`font-family` outside the `:root`/`[data-theme]` token block | Every color and font references a named token; lift new values into the block first |
| Image in a bare `1fr` track | `1fr` grid track holding an `<img>` (resolves to `minmax(auto,1fr)`, overflows phones) | `minmax(0, 1fr)` |
| Display text without wrap escape | Display-size text lacking `overflow-wrap: anywhere; min-width: 0` | Add both — long compounds must break |
| All-caps line-height <1.0 | `text-transform: uppercase` with `line-height` below 1.0 (cap collision on wrap) | Floor 1.0 (1.02–1.08 recommended) or drop uppercase |
| Double sticky at top 0 | In-page `position: sticky; top: 0` beneath a sticky nav also at 0 | Offset the in-page sticky by the nav height; split z-index tiers |
| Horizontal scroll / wrong clip | Any h-scroll at 320–1920px, or `overflow-x: hidden` breaking sticky | `overflow-x: clip` on **both** html and body (never `hidden`); the overflowing element's parent stays `visible` |
| Nav fingerprint | Wordmark-left + 4–5 inline links + button-right + hairline + white bg | Rotate the nav archetype (`references/page-anatomy.md`); that shape only with 2 genuine destinations |
| Footer fingerprint | 4 columns (Product/Company/Resources/Legal) + social row + tiny copyright | Default to another footer archetype; index columns only on a genuine docs root |
| Hero doesn't fit the fold | Symmetric/top-heavy padding; essential content needs scroll at 1280×800 | `padding-block-end ≥ 1.3×` start; pull display `clamp()` max down; lede ≤2 lines |
| Decoration without purpose | Cursor/scanline/blob/badge/numeral with no semantic anchor | Every decoration is motivated (a numeral names a real thing) or cut |
| Icon tells | Mixing 2+ icon libraries; emoji (✨🚀⚡) as feature/step/tier icons | One family per project (prefer Phosphor / HugeIcons / Radix / Tabler; Lucide when the project already runs on it), or custom SVG, or typography |
| Input-state failures | Border-width shifts between states; focus ring built from `border`; input height ≠ button height; helper slot collapses; disabled by opacity alone | State changes via bg/outline/box-shadow/border-color; `outline: 2px solid` focus; shared 44px height; reserve helper space (`min-height: 1lh`); disabled = opacity + cursor + attribute |
| Tooltip delay symmetry | Same delay for hover and focus | Hover 800–1000ms; keyboard focus 0ms |
| Animated focus ring | Focus ring fades in over a transition | Focus indicators appear instantly |
| Style fall-through | The same default aesthetic (left-margin numbers + huge serif + asymmetric spans) regardless of brief; or extracted reference DNA silently overwritten by a stock theme | One shape of many, on its signal only; studied DNA stays locked once approved |

### Motion anti-patterns

- `:hover` rule with no `transition` on the base selector — instant state flips feel broken
- Lists rendered via `.map()` popping in simultaneously — should stagger
- Conditional mount/unmount with no exit animation (e.g. React conditional render without `AnimatePresence`)
- Enter/exit asymmetry in the wrong direction — correct is enter ≥ exit duration, enter `ease-out` / exit `ease-in`, full choreography in, simpler out
- Inline style changes (dynamic background/color) with no transition
- `setTimeout`/`setInterval` driving animation loops — use `requestAnimationFrame`

### Cognitive-load violations

Wall of options (10+ undifferentiated choices) · memory bridge (step 3 needs info from step 1) · hidden navigation (no breadcrumbs/active states) · jargon barrier · visual noise floor (uniform visual weight) · inconsistent pattern (same action, different UI) · multi-task demand (read + decide + navigate at once) · context switch (info for one decision scattered across screens).

## Accessibility Audit

Score 0–4: 0 = fails WCAG A · 2 = partial effort, significant gaps · 4 = AA fully met, approaching AAA.

| Check | Standard / method |
|---|---|
| Contrast | 4.5:1 body text, 3:1 large text (AA); 7:1 for AAA. DevTools color swatch, Lighthouse, `npx pa11y <url>`. Check animated text mid-transition — fading text must stay readable at every opacity above 0.4 |
| Focus | Every interactive element focusable with visible indicator. Any `outline: none` MUST pair with a custom `:focus-visible` style |
| Keyboard | Entire primary flow completable keyboard-only; logical tab order; focus trapped in modals, Esc dismisses; skip links on long pages |
| Semantics | Real `<button>`/`<a>` (a clickable `<div>`/`<span>` needs `role="button"` + `tabIndex` + `onKeyDown`); proper heading hierarchy; landmarks; labeled inputs; meaningful alt text |
| Live announcements | Screen reader announces loading/success/error via live regions |
| Color independence | Never meaning by color alone; test high-contrast mode |
| Reduced motion | An animated project with zero `prefers-reduced-motion` handling is a **critical violation** |
| Decorative motion | Background particles, ambient motion, Lottie illustrations need `aria-hidden="true"` |

Grep sweeps (adapt globs to stack):

```bash
grep -rn 'outline:\s*none\|outline:\s*0' src/              # must pair with :focus-visible
grep -rn 'onClick' src/ | grep -E '<div|<span' | grep -v 'role='   # clickable divs
grep -rn 'prefers-reduced-motion' src/                     # zero hits + animation = P0
grep -rn '<motion\.\|<Lottie\|<Canvas' src/ | grep -v 'aria-hidden' # decorative anim
```

Reduced-motion baseline:

```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important; }
}
```

## Technical Audit — five dimensions, /20

Code-level and measurable; document findings, don't fix inline. Each 0–4.

| Dimension | Check for |
|---|---|
| Accessibility | Section above |
| Performance | Animating layout properties (`width/height/top/left/margin/padding` → reflow every frame; use `transform`/`opacity`); unbounded blur/filter/shadow; `will-change` on more than ~5 permanent elements (apply dynamically instead); missing lazy loading; animation loops on `setTimeout`; unnecessary re-renders; an animation library heavier than what the motion actually needs |
| Theming | Hard-coded colors bypassing tokens; broken/missing dark mode; mixed token types; values that ignore theme switch |
| Responsive | Fixed widths that break mobile; touch targets < 44×44px; horizontal scroll on narrow viewports; layouts that break at 200% text zoom; missing breakpoints |
| Anti-patterns | Catalog above |

Bands: 18–20 excellent · 14–17 good · 10–13 acceptable · 6–9 poor · 0–5 critical.

**Consistency sweep**: inventory all durations and easings. A disciplined project has 3–5 distinct durations (e.g. 0.15/0.25/0.35/0.5s) and 3–5 named easings; 12+ scattered `cubic-bezier(...)` values is a design-system violation — centralize into motion tokens.

**Systemic findings → extraction**: when the same hard-coded value or pattern recurs 3+ times with the same intent (colors, type styles, easings, repeated components), report it as systemic and recommend extracting to tokens/shared components. Never extract one-offs or things that merely look similar but differ in intent — premature abstraction is worse than duplication.

## Hardening

Designs that only work with perfect data aren't production-ready.

### Stress inputs
Very long text (100+ char names) · empty and single-character · emoji, accents, special characters · RTL text · CJK · large numbers (millions+) · 1000+ list items · zero data · paste-from-Excel.

### State matrix — every view needs all of these
| State | Requirement |
|---|---|
| Empty | Not just "No results" — explain and offer a next action |
| Loading | Skeleton/indicator naming what's loading; time estimates for long ops |
| Error | Plain language, specific cause, retry action, user input preserved, one failing component never blocks the whole UI |
| Partial/degraded | Offline, slow 3G, images failed — progressive loading, fallbacks |
| Permission-denied | Read-only or blocked with a clear why |
| Overflowing | Extreme content handled (below) |

Map API errors: 400 → field validation · 401 → login · 403 → permission message · 404 → not-found state · 429 → rate-limit message · 500 → generic error + support path.

### Overflow CSS
```css
.truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.line-clamp { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
.wrap { overflow-wrap: break-word; hyphens: auto; }
.flex-item, .grid-item { min-width: 0; }  /* allow shrinking below content size */
```
Use `clamp()` for fluid type; minimum 14px on mobile; containers expand with text.

### i18n
- Budget +30–40% width for translations (German); never fixed-width text containers — pad, don't size (`px-4 py-2`, not `w-24`)
- Logical properties for RTL: `margin-inline-start`, `padding-inline`, `border-inline-end`; mirror directional icons under `[dir="rtl"]`
- UTF-8 everywhere; test CJK and emoji (2–4 bytes)
- Format dates, numbers, currency via `Intl.DateTimeFormat`/`Intl.NumberFormat`, never string templates
- Pluralize through an i18n library, never `` `${n} item${n!==1?'s':''}` ``

### Concurrency & resilience
Disable submit while pending (no double-submission) · optimistic updates with rollback · preserve state across refresh/interruption · debounce search (~300ms), throttle scroll (~100ms) · clean up listeners, timers, subscriptions, and pending requests on unmount · validate server-side always (client-side is UX, not security).

### Hardening verification
Test: 100+ char names · emoji in every field · RTL + CJK · offline and throttled 3G · 1000+ items · submit clicked 10× rapidly · every forced API error · all data removed · refresh mid-flow · 200% zoom.

## Output Format

Group findings by severity (P0 → P3). For each: name · location (component/file/line) · category (a11y / performance / theming / responsive / anti-pattern / hardening) · user impact · standard violated (if any) · concrete fix. Then: systemic patterns ("hard-coded colors in 15+ components → tokenize"), positive findings worth keeping, and a prioritized action list. Too many P3s is noise — report what matters. Never report an issue without its impact, and verify before reporting to avoid false positives.

**Brand-surface shipping gate (builder's pre-flight).** Before declaring a landing/portfolio/marketing build done, tick honestly — any un-tickable box means not-done: em/en-dashes zero · page theme locked · one accent everywhere · one radius scale · every CTA passes contrast · no clickable text wraps · hero headline ≤2 lines + subtext ≤20 words · eyebrow count ≤ ceil(sections/3) · ≥4 layout families per 8 sections · real images, no fake-div screenshots · reduced-motion handled · dark and light both tested. (Full 60-box matrix: `library/taste-skill/skills/taste-skill/SKILL.md` §14.) It complements the two-assessment critique — it does not replace it.

To fix style-level findings by regenerating against a quantified profile, see `references/design-dna.md`.

---
*Distilled from: impeccable (critique, audit, harden, extract), genjutsu design-audit, taste-skill (anti-slop core), hallmark (slop-test gates).*
