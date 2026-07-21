# Motion Principles

*Engine-agnostic motion design: what to animate, how long, with what curve, and why — before any implementation choice.*

Implementation layers live in `references/motion-web.md` (CSS, WAAPI, Motion/Framer Motion, anime.js) and `references/gsap.md` (GSAP). This file is the design authority they all obey.

## Core Philosophy

**Motion must have purpose.** Every animation does at least one of: give feedback, reveal/conceal, transition state, direct attention, explain a spatial relationship, or express brand. If removing the animation changes nothing, delete it. Animation fatigue is a real cost — spend the budget on moments that earn it.

**Frequency rule.** The more often a motion plays, the shorter and subtler it must be. A hover seen 1000x/day = 100ms opacity. A once-ever onboarding reveal = 600ms+ full choreography.

**Three pillars** — answer before any technical decision:

| Pillar | Question | Drives |
|---|---|---|
| Emotional intent | What should the viewer FEEL? | Easing, timing, amplitude |
| Visual narrative | What's the micro-story? | Setup → action → resolution |
| Motion craft | How is it believable? | Physics, secondary motion, arcs |

**Three motion layers** (primary-only animation feels flat):

| Layer | Role | Amplitude | Timing offset |
|---|---|---|---|
| Primary | Main action the viewer follows | 100% | — |
| Secondary | Supporting richness (shadows, icons, siblings) | 30-50% | 50-100ms after primary, different easing |
| Ambient | Background life (gradients, pulses) | 10-20% | Continuous, slow, never demands attention |

**Narrative arc.** Every motion, even a 200ms tooltip, has implicit phases: setup/build (20-30%) → action (30-50%) → resolution/settle (25-40%). Leave 100-200ms stillness after resolution before new motion. Skip anticipation for interactions under 150ms.

**Attention budget.** One hero motion per scene moment. Max 2-3 elements in active motion simultaneously (ambient doesn't count). Stagger rather than synchronize.

**The 1/3 rules.** Distance: no motion travels more than 1/3 of the container without a keyframe change (direction, speed, or arc shift). Elements: with 3+ animated elements, no more than 1/3 in active motion at once.

## Disney's 12 Principles, UI-Adapted

| Principle | UI translation | Numbers |
|---|---|---|
| Squash & stretch | Scale distortion on impact, volume preserved | Squash ~[1.2, 0.8]; impact 30-65ms, recover 65-130ms. Skip for premium |
| Anticipation | Small counter-motion before the action | 100-200ms, 10-20% of main magnitude. Skip under 150ms |
| Staging | Dim non-hero elements; one action per beat | Dim to 40-60% opacity, optional 2-4px blur |
| Straight-ahead vs pose-to-pose | Particles/generative = straight-ahead; UI transitions = pose-to-pose | — |
| Follow-through & overlap | Children trail parents; parts stop at different times | Child delay 50-150ms; stop offsets 100-200ms |
| Slow in / slow out | Directional easing (see Easing) | NEVER linear on spatial movement |
| Arcs | Perpendicular offset at path midpoint | 5px corporate, 10-20px+ playful; straight = intentionally mechanical |
| Secondary action | Shadow grows as card enters, ripple on press | 30-50% amplitude, 50-100ms after, different easing |
| Timing | Duration = weight (see Timing table) | Heavy 400-800ms, light 100-250ms |
| Exaggeration | Overshoot budget by personality | Playful 15-25%, Energetic 20-30%, Corporate 0-5%, Premium 0% |
| Solid drawing | Consistent proportions; shadow matches light source | Scale + rotation together for depth |
| Appeal | Smooth curves, consistent personality | Killers: jerky motion, uniform timing, abrupt stops |

## Timing

Unified duration table. Sources vary ±20% around these values — the ranges below are the consensus envelope; the bold value is the default.

| Element / event | Duration | Notes |
|---|---|---|
| Hover / focus feedback | **100ms** (80-150) | Must feel instant; under ~80ms reads as immediate |
| Button press / toggle | **150ms** (120-180) | Press <150ms, release/settle 200-300ms |
| Icon / small state change | **200ms** (150-250) | |
| Tooltip / popover | **150ms** in, **100ms** out | |
| Card / list item enter | **250ms** (200-350) | |
| Menu / dropdown / tab switch | **250ms** (200-300) | |
| Modal / drawer / dialog | **300ms** (250-400) | |
| Page / route transition | **400ms** (300-600) | |
| Hero / dramatic reveal | **700ms** (500-1200) | Once-only moments; the animation IS the content |
| Error shake | **350ms** (300-400) | 2-3 oscillations, decreasing amplitude |
| Ambient loop | 2000-20000ms/cycle | Breathing 2-4s, floating 3-5s, gradients 8-20s |

**Hard rules:**
- Never exceed 500ms on an interactive UI response (modal, dropdown, tab) — users are waiting.
- Exits = ~70% of entrances (65-75%). Users care about what appears, not what leaves.
- Drag start <50ms; touch feedback <100ms.

**Distance scales duration:** 50px = 0.8x, 100px = 1.0x (base), 200px = 1.3x, 400px = 1.6x, full-screen = 1.8-2.0x.

**Weight scales duration:** heavy (modals, overlays) 300-500ms, 0% overshoot; medium (cards, panels) 200-350ms, 3-5%; light (tooltips, badges) 80-200ms, 5-15%.

## Easing

**Directional rules — not optional:**

| Motion | Easing family | Why |
|---|---|---|
| Entering | ease-out (fast start, gentle landing) | Arrives responsively. Ease-in on an entrance feels broken |
| Exiting | ease-in (gentle start, fast departure) | Gets out of the way. Ease-out on an exit feels reluctant |
| Moving between on-screen states | ease-in-out | Smooth start and stop |
| Scroll-synced / progress-driven | linear / none | Matches 1:1 with input; any curve reads as lag |
| Looping ambient | sine ease-in-out | Seamless cycle |
| Spinners, progress bars, timers | linear | Only legitimate linear on autonomous motion |

**Named curves** (unified from Material 3, Apple HIG, Vercel, and practice — the first three cover 90% of work):

| Name | cubic-bezier | Use |
|---|---|---|
| Standard / snappy (default) | (0.2, 0, 0, 1) | On-screen state changes, fast decisive UI |
| Emphasized out | (0.16, 1, 0.3, 1) | Entrances, hero moments — confident, soft landing |
| Accelerate | (0.3, 0, 1, 1) | Exits, dismissals |
| Gentle / Material standard | (0.4, 0, 0.2, 1) | Premium, ambient, page transitions |
| Decelerate | (0, 0, 0.2, 1) | Alternative entrance curve |
| Apple HIG | (0.25, 0.1, 0.25, 1) | iOS-flavored smoothness |
| Quart out | (0.25, 1, 0.5, 1) | Smooth natural deceleration |
| Overshoot | (0.34, 1.56, 0.64, 1) | Playful entrances only — see policy below |
| Bounce settle | (0.175, 0.885, 0.32, 1.275) | Playful settle only |

**Overshoot policy (resolved from conflicting sources):** default to **zero overshoot** for product UI — bounce/elastic on everyday controls reads as dated and draws attention to the animation itself. Overshoot is personality-gated: allow 5-15% for playful/energetic brands, success moments, and celebrations; never on errors (errors feel firm), never for premium/luxury, never above 25-30% anywhere. When in doubt, none.

**Easing is emotion.** The transition is the verb; the easing is the adverb. Same slide-in: expo-out = confident, sine-in-out = dreamy, elastic = playful. Choose deliberately, and don't use the same ease on every tween in a scene.

**Material metaphor** (scales duration and overshoot): rigid/metal 1.2x + 0%; elastic/rubber 0.8x + 15-25%; fluid/water 1.5x + 5%; paper/cards 1.0x + 3-5%; gas/smoke 2.0x + 0%; glass 0.9x + 0%.

**Springs:** feel table and per-engine parameters live in `references/motion-web.md`. Shorthand: stiffness 400/damping 30 = snappy no-overshoot UI; 300/20 = lively entrance; 120/14 = gentle card.

## Motion Personality

Select ONE archetype per project; apply to 90%+ of animations (specific moments may borrow another — e.g. a corporate dashboard borrows Playful for its success state only).

| Archetype | Duration (quick/std/slow) | Signature easing | Overshoot | Paths | Use for |
|---|---|---|---|---|---|
| Playful | 150 / 250 / 400ms | ease-out-back, bouncy springs | 10-20% | Arcs, never straight | Social, kids, games, celebrations, creative tools |
| Premium | 350 / 500 / 800ms | (0.4, 0, 0.2, 1) | 0% | Smooth curves, subtle parallax | Luxury, fashion, finance, editorial, portfolios |
| Corporate | 200 / 300 / 450ms | (0.2, 0, 0, 1) | 0-3% | Mostly straight | Enterprise, dashboards, admin, healthcare, banking |
| Energetic | 100 / 180 / 300ms | ease-out-expo, elastic | 15-30% | Dramatic arcs, diagonals | Gaming, sports, music, events, fitness |

Default: **Corporate for UI, Playful for illustration.** Keyword match: fun/whimsical/bouncy → Playful; elegant/minimal/luxury → Premium; clean/professional/dashboard → Corporate; bold/dynamic/exciting → Energetic.

**Brand motion identity — define three constants:** (1) one signature easing for 80% of animations, (2) a three-tier duration palette (quick/standard/slow), (3) one consistent entrance pattern (Playful: bounce up from below; Premium: slow fade + scale 98→100%; Corporate: slide + opacity; Energetic: snap from edge + overshoot).

**Designer lenses** — a second axis for calibrating intensity:

| Lens | Character | Numbers | When |
|---|---|---|---|
| Kowalski (invisible) | Motion the user never consciously notices | opacity + translateY(2-6px), 100-200ms, stiff springs (400+/30+), stagger 30-50ms | Frequent interactions, SaaS, dev tools. Default when in doubt |
| Krehel (cinematic) | Camera-movement storytelling; blur as depth cue | opacity + translateY(8-16px) + blur(4-8px), 300-500ms, springs 150-250/15-25, stagger 60-100ms | Landing pages, portfolios, heroes, editorial |
| Jhey (joyful) | Scale + rotation, elastic physics, surprise | 400-800ms, bounce/elastic, color shifts, SVG morphs | Playful brands, onboarding, easter eggs, celebrations |

Mixing rules: never mix lenses within one animation; transition at section boundaries (Krehel hero → Kowalski content is fine); the more interactive the element, the more Kowalski it must be; buttons/inputs/toggles are always snappy.

## Emotion Mapping

| Emotion | Character | Path | Easing | Duration |
|---|---|---|---|---|
| Joy / delight | Bouncy, arcs, overshoot | Curved, upward | ease-out-back | 200-400ms |
| Calm | Smooth, flowing | Gentle curves | sine ease-in-out | 500-1000ms |
| Urgency / alert | Sharp, fast, direct | Straight lines | ease-out | 100-200ms |
| Sadness / weight | Slow, downward | Drooping curves | cubic ease-in-out | 600-1200ms |
| Surprise | Sudden, expanding | Radial outward | ease-out-expo | 150-300ms |
| Elegance | Slow, controlled | Long smooth arcs | (0.4, 0, 0.2, 1) | 400-700ms |
| Confidence | Direct, decisive | Straight, horizontal | ease-out | 200-400ms |
| Tenderness | Soft, gentle | Very subtle curves | soft ease-in-out | 600-1000ms |

**Path as language:** angular = tense/mechanical; curved = friendly/organic; spiral = whimsical; diagonal = purposeful; vertical up = growth; vertical down = settling; horizontal = progress; radial out = release; radial in = focus.

**Direction as meaning:** up = growth/aspiration; down = completion/grounding; right = progression/arrival; left = regression/departure; scale up = importance/emergence; scale down = dismissal.

**Color pairing:** transition TO green for success (don't start green); flash red then settle for errors (don't sustain); pulse amber for warnings; use opacity, not color, for neutral changes.

**Context defaults:** form success = joy + confidence; validation error = mild urgency; page load / dashboard = calm + confidence; onboarding = curiosity + delight; delete = calm (respectful departure).

## Choreography & Stagger

**Coordinated entry:** lead with the hero (largest displacement, most prominent easing); all elements enter from the same direction or shared origin (mixed directions = chaos); stagger in order of importance, not DOM order — the element that moves first reads as most important.

**Counter-motion:** hero slides right → background drifts left at 20-30% speed; hero scales up → shadow spreads; hero lifts → shadow drops and softens; hero rotates CW → ambient drifts CCW at 15-25%.

**Depth through speed:** foreground 1.0x, midground 0.5x, background 0.2x displacement.

**Stagger budgets** — total sequence must stay under 500ms regardless of item count:

| Pattern | Per-item delay | Total budget | Use |
|---|---|---|---|
| Micro cascade | 20-40ms | <200ms | List items, grid cells, nav |
| Standard | 50-80ms | <400ms | Cards, panels |
| Dramatic | 100-150ms | <500ms | Hero sections |
| Wave (sine) | 30-60ms | <500ms | Data bars |

Stagger direction: top-to-bottom (lists), reading order (grids, +20ms per row), center-out (hero content), random (organic), reverse (exits). All staggered elements share one easing family — vary only start time. Optional: last element gets slight overshoot as punctuation. Overlap entries (25-50% overlap) rather than waiting for completion.

**Shared events:** when multiple elements react to one trigger, all start within 50ms (staggered landings are fine), with motion originating from the trigger point — closer elements first.

## Motion Budget (page-level)

Two complementary caps — both hold:

- **≤3 distinct motion primitives per page** (a counter + a hover-lift + a marquee = three; a fourth is the slop pull). Cut motion before adding motion. A showpiece tier is still ≤3 primitives — each must earn its place.
- **2–3 elements in simultaneous active motion** (the existing rule above) — primitives count across the page; this counts what moves at one instant.

Page-shape defaults (`references/page-anatomy.md` shapes): motion **default-on** (ship 2–3 purposeful microinteractions) for bento-grid, stat-led, workbench, marquee-hero, FAQ-accordion pages; **default-off** (stillness is the brand, motion opt-in) for editorial, manifesto, letter, quote-led, type-specimen, long-document, index pages. Some themes multiply durations: stark print-like themes run 0× (static is correct, not a bug); heavy display themes ~0.7×; luxury editorial ~1.2–1.3×.

Interaction details: tooltip delays are asymmetric — pointer hover 800–1000ms, keyboard focus 0ms. Success that is visible needs no announcement (label swap, not toast); optimistic updates roll back with an Undo on failure. Focus rings appear instantly, never animated in.

Hallmark-derived themes name their easing tokens `--ease-out (0.16,1,0.3,1)` / `--ease-in (0.7,0,0.84,0)` / `--ease-in-out (0.65,0,0.35,1)` with 120/220/420ms buckets — `--ease-out` maps to this module's "emphasized out"; keep this module's named-curve table as the one vocabulary, don't fork a second.

## Pattern Recipes

### Entrances (ease-out, personality-scaled)
- **Slide in** (default for content): offset 20-40px + opacity 0 → rest. 200-350ms. From below = arrival; from right = forward; from above = dropdown.
- **Scale in** (modals, popovers, toasts): scale 90-95% + opacity 0 → 100%. 250-400ms. Playful starts 70-80%, Premium 95-98%.
- **Reveal** (heroes, editorial): clip-path/mask wipe, 300-500ms. Top-down = dramatic, L-to-R = reading order, center-out = focus.
- **Assembled** (logos, data viz): parts from different origins, 50-100ms stagger, 300-600ms total.
- Never scale from 0 (elements vanish into a black hole) — minimum 0.8, usually 0.95 + opacity.
- Card entrance, full: start 20px below + opacity 0, slight arc, ease-out; shadow arrives 50ms after; content fades 100ms after landing.

### Exits (ease-in, ~70% of entrance, always define one)
- **Slide out**: 20-40px offset + fade, 150-250ms. **Dissolve**: opacity + optional scale to 98%. **Collapse** (deletion, dismissal): scale to 90-95% + fade. **Transfer** (add-to-cart): move toward destination + shrink, 250-400ms, ease-in-out.
- Entrance-exit continuity: exit point near the next entry point; 100-150ms overlap between exit and entrance; same easing family for the pair.

### State feedback
- **Button press**: scale to 0.95-0.97 (60-80ms) → release to 1.0 (100-150ms); shadow shrinks during press; overshoot only if playful (to 1.05).
- **Hover**: enter <100ms (scale 1.02-1.05 or color/shadow shift); exit 150-200ms — slower exit reads as polished.
- **Success**: container scale 0.9→1.0 pop (200ms, slight overshoot) + checkmark stroke-draw (150ms, 100ms delay) + transition to green. 400-500ms total.
- **Error shake**: horizontal ±10-15px, 2-3 cycles with decreasing amplitude, ease-in-out, 300-400ms, red tint, zero overshoot, settles exactly at origin.
- **Loading**: spinner 360° linear 1000-1500ms/rev; skeleton shimmer sweep 1500-2000ms; indeterminate bar oscillates 1500-2500ms — continuous, never frantic. Skeletons > spinners (they preview content shape).
- **Toggle**: thumb slides 120-180ms ease-in-out, track color simultaneous.
- **Disable/enable**: opacity to 50-60% / back to 100%, 200ms.

### Ambient (10-20% of primary amplitude, never competes)
- **Breathing**: scale 0.98-1.02 (max ±5% before it demands attention), sine, 2000-4000ms/cycle.
- **Floating**: Y ±5-15px, sine, 3000-5000ms; layer multiple elements with different durations (4000/5500/3500ms) so they never sync.
- **Gradient shift**: position or angle, 8000-20000ms, imperceptible at a glance.
- **Shimmer**: gradient sweep 1500-2500ms with 2000-5000ms pause between sweeps.
- **Parallax**: layers at 1.0x / 0.5x / 0.2x / 0.1x scroll speed; total displacement <100px; never parallax text; avoid on mobile.
- **Particles**: <20 elements, transform + opacity only.

## Property Selection

**Transform + opacity first.** They composite on the GPU; layout properties reflow every frame.

| Goal | Primary | Secondary | Avoid |
|---|---|---|---|
| Entrance / exit | position (translate) | opacity | rotation |
| Emphasis | scale | subtle rotation, opacity pulse | — |
| Button press | scale | color | position |
| Hover | scale or color | opacity | position |
| Success | scale | color + opacity | position |
| Error | position (shake) | color | scale |
| Loading | rotation | opacity | position |
| Depth / 3D | scale + shadow | position (parallax) | — |
| Delete | scale + opacity | position | growing |

**Rules:** never opacity-only for important state changes — combine with position or scale. Minimum properties needed: one = direct, **two = the sweet spot**, three+ = potentially overwhelming. Transform/opacity are the reliable default, not the whole palette — blur/filters for depth and focus pulls, clip-path for wipes, shadow/glow for energy — but keep expensive effects bounded to small areas and verify smoothness (see `references/motion-web.md` performance section).

## Context Adaptation

**Register — the biggest fork:**
- **Product / productivity UI:** 150-250ms on most transitions. Motion conveys state only. No page-load choreography — users are mid-task. Kowalski lens.
- **Marketing / brand:** one well-rehearsed hero animation beats scattered micro-interactions. Fade-and-rise on every scrolled section is the saturated AI default — a tell, not choreography. Reserve scroll-triggered motion for moments that earn it. Krehel lens for heroes.

**Platform scaling:** desktop 1.0x (hover states, cursor tracking, full choreography); tablet 0.9x; mobile 0.8x (1-2 properties, touch feedback <100ms, stagger budgets -30%, no parallax); TV/kiosk 1.3x.

**Content type:** financial/healthcare = corporate/calm, 250-600ms, low density; enterprise SaaS = corporate, 200-400ms, low; social = playful, 150-300ms, medium; gaming = energetic, 100-250ms, high; editorial = premium, 350-600ms, low.

**Responsive:** small viewports animate sequentially, one element at a time; displacement caps at ~20-25% of container width. **Dark mode:** reduce intensity 10-20% (bright-on-dark hits harder); no pure-white flashes.

## Accessibility (Non-Negotiable)

**`prefers-reduced-motion` is mandatory** — every project, no exceptions. Reduced means: replace spatial movement with opacity fades, remove springs/parallax/auto-playing loops, cut durations 50%+, keep opacity transitions.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- **Vestibular triggers** (avoid or provide alternatives): large-scale zoom, full-screen positional transitions, spinning elements >100px, parallax >2 layers, rapid direction changes.
- **Cognitive:** same interaction = same animation every time; pause control for anything >5s; never convey critical information through motion alone.
- Focus indicators must never be hidden by animation; text must meet contrast at every frame of a transition; don't block interaction during animation unless intentional.

## Quality Checklist

**CRITICAL — never ship:**
- [ ] No linear easing on spatial movement (linear only for spinners/progress/scroll-sync)
- [ ] No opacity-only for important state changes
- [ ] No unbroken motion >1/3 of container
- [ ] No stagger sequence >500ms total
- [ ] No layout-property animation causing jank
- [ ] No missing `prefers-reduced-motion` handling

**HIGH:**
- [ ] Duration matches element-type table; entrance ≥ exit
- [ ] Ease-out entrances, ease-in exits
- [ ] Secondary layer present (follow-through, children offset 50-150ms)
- [ ] One personality applied consistently; same interaction = same motion
- [ ] Every entrance has a defined exit

**POLISH:**
- [ ] Ambient layer where the scene needs life
- [ ] Anticipation on large motions (100-200ms wind-up)
- [ ] Counter-motion balancing the hero
- [ ] Arcs on organic paths
- [ ] Appropriate on the 100th viewing

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Looks robotic | Linear easing, straight paths, everything synced | Directional easing; 10-20px arc at midpoint; offset starts/stops 50-150ms |
| Feels too slow | Duration over budget; ease-in-out where ease-out works; long overshoot settle | Check duration table; ease-out reads faster; raise damping |
| Feels too fast / jarring | Below minimum duration; no easing; no settle | Modals ≥250ms, pages ≥300ms; add ease-out; add 50-100ms resolution |
| Feels cheap / flat | Primary-only; opacity-only; identical easing everywhere | Add secondary + ambient layers; pair opacity with transform; vary eases |
| Too distracting | Too many movers; amplitude too large; ambient too loud | 1/3 element rule; minimum amplitude; ambient ≤20%, slower |
| No personality | Generic easing, uniform durations | Apply one archetype's signature easing + duration palette |
| Inconsistent feel | Mixed easings/durations for same motion type; entry direction wanders | Standardize per motion type; one origin everywhere |
| Dropped frames | Layout properties; too many elements; heavy shadows/filters | transform + opacity; <20 animated elements per viewport; stagger to spread load; see `references/motion-web.md` |
| Everything enters the same way | Default y+opacity on every element | Vary: from left, from right, from scale, opacity-only, letter-spacing |

---
*Distilled from: LottieFiles motion-design-skill, genjutsu motion-principles, hyperframes-creative, impeccable, hallmark (motion budget).*
