# Design DNA

*Turn reference UIs (screenshots, images, URLs) into a quantified Design DNA JSON, then generate new matching UI from that DNA plus new content.*

## Model: Three Dimensions

A Design DNA profile captures design identity in three layers. All three must be populated — a profile with tokens but no style or effects reproduces the skeleton of a design, not its identity.

| Dimension | Captures | Nature |
|---|---|---|
| `design_system` | Measurable tokens: exact hex values, px/rem sizes, radii, shadows, durations | What you can measure |
| `design_style` | Qualitative perception: mood, personality, composition strategy, brand voice | What you can feel |
| `visual_effects` | Rendering beyond plain CSS: Canvas, WebGL, 3D, particles, shaders, scroll/cursor effects, SVG animation, glassmorphism | What you can see but can't express in CSS alone |

## Workflow

Three phases; run any combination based on what the user supplies.

| Input | Phases |
|---|---|
| "Show me the schema/structure" | 1 only |
| Reference images/screenshots/URLs | 2 (analyze → DNA JSON) |
| References + content to design | 2 → 3 |
| Existing DNA JSON + content | 3 only |
| Content only, no DNA and no reference | Ask: analyze a reference first, or extract DNA from a described style, then generate |

**Phase 1 — Structure.** Present the schema below with the three-dimension explanation. Ask if the user wants to customize or extend dimensions.

**Phase 2 — Analyze.** For each reference: analyze images/screenshots visually; fetch URLs and inspect both rendered design and source. Extract or infer a value for **every field** in the schema — no empty strings. When references conflict, record the dominant pattern and note variants. Output the complete DNA JSON, then ask: "Want to adjust any values before using this for generation?"

**Phase 3 — Generate.** Parse the DNA, build CSS custom properties from `design_system`, let `design_style` steer subjective calls, implement `visual_effects` at the declared performance tier, populate with the user's content, run the quality checks. When the design needs assets and the user provided a URL, fetch the real assets from that URL — never recreate or approximate them.

## Schema

Every field below must appear in the output JSON.

### `meta`
`name` · `description` · `source_references` · `created_at`

### `design_system` — measurable tokens

| Group | Fields |
|---|---|
| `color` | `palette_type` · `primary.{hex,role}` · `secondary.{hex,role}` · `accent.{hex,role}` · `neutral.{scale,usage}` · `semantic.{success,warning,error,info}` · `surface.{background,card,elevated}` · `contrast_strategy` |
| `typography` | `type_scale.{display,heading_1,heading_2,heading_3,body,body_small,caption,overline}` — each with `{size,weight,line_height,tracking}` · `font_families.{heading,body,mono}` · `font_style_notes` |
| `spacing` | `base_unit` · `scale` · `content_density` · `section_rhythm` |
| `layout` | `grid_system` · `max_content_width` · `columns` · `gutter` · `breakpoints` · `alignment_tendency` |
| `shape` | `border_radius.{small,medium,large,pill}` · `border_usage` · `divider_style` |
| `elevation` | `shadow_style` · `levels.{low,medium,high}` · `depth_cues` |
| `iconography` | `style` · `stroke_weight` · `size_scale` · `preferred_set` |
| `motion` | `easing` · `duration_scale.{micro,normal,macro}` · `entrance_pattern` · `exit_pattern` · `philosophy` |
| `components` | `button_style` · `input_style` · `card_style` · `navigation_pattern` · `modal_style` · `list_style` · `component_notes` |

### `design_style` — qualitative perception

| Group | Fields |
|---|---|
| `aesthetic` | `mood` · `visual_metaphor` · `era_influence` · `genre` · `personality_traits` · `adjectives` |
| `visual_language` | `complexity` · `ornamentation` · `whitespace_usage` · `visual_weight_distribution` · `focal_strategy` · `contrast_level` · `texture_usage` |
| `composition` | `hierarchy_method` · `balance_type` · `flow_direction` · `grouping_strategy` · `negative_space_role` |
| `imagery` | `photo_treatment` · `illustration_style` · `graphic_elements` · `pattern_usage` · `image_shape` |
| `interaction_feel` | `feedback_style` · `hover_behavior` · `transition_personality` · `loading_style` · `microinteraction_density` |
| `brand_voice_in_ui` | `tone` · `formality` · `cta_style` · `empty_state_approach` · `error_tone` |

### `visual_effects` — special rendering

| Group | Fields |
|---|---|
| `overview` | `effect_intensity` · `performance_tier` · `fallback_strategy` · `primary_technology` |
| `background_effects` | `type` · `description` · `technology` · `params.{color_palette,speed,density,opacity,blend_mode}` |
| `particle_systems` | `enabled` · `type` · `description` · `technology` · `params.{count,shape,size_range,movement_pattern,color_behavior,interaction,spawn_area}` |
| `3d_elements` | `enabled` · `type` · `description` · `technology` · `params.{renderer,lighting,camera,materials,geometry,post_processing,interaction_model}` |
| `shader_effects` | `enabled` · `type` · `description` · `technology` · `params.{uniforms,vertex_manipulation,fragment_output,noise_type,distortion}` |
| `scroll_effects.parallax` | `enabled` · `layers` · `depth_range` · `speed_curve` |
| `scroll_effects.scroll_triggered_animations` | `enabled` · `trigger_points` · `animation_type` · `scrub_behavior` |
| `scroll_effects.scroll_morphing` | `enabled` · `description` |
| `text_effects` | `type` · `description` · `technology` · `params.{split_strategy,animation_per_unit,stagger,effect_style}` |
| `cursor_effects` | `enabled` · `type` · `description` · `params.{shape,size,blend_mode,trail,interaction_zone}` |
| `image_effects` | `type` · `description` · `technology` · `params.{filter_pipeline,hover_transform,reveal_animation,distortion_type}` |
| `glassmorphism_neumorphism` | `enabled` · `style` · `params.{blur_radius,transparency,border_treatment,shadow_type,light_source_angle}` |
| `canvas_drawings` | `enabled` · `type` · `description` · `technology` · `params.{draw_method,animation_loop,color_scheme,responsiveness,interaction}` |
| `svg_animations` | `enabled` · `type` · `description` · `params.{animation_method,path_morphing,stroke_animation,filter_effects}` |
| `composite_notes` | Free text: layered-effect interplay, implementation ambiguity, performance trade-offs, screenshot-only observations |

### Field vocabulary

Use these enumerations; free text elsewhere should stay descriptive and concrete.

| Field | Values / convention |
|---|---|
| `color.palette_type` | "monochromatic" · "complementary" · "analogous" · "triadic" · "split-complementary" |
| `color.contrast_strategy` | e.g. "high contrast", "subtle layers", "dark-on-light dominant" |
| `spacing.content_density` | "compact" · "comfortable" · "spacious" |
| `layout.alignment_tendency` | "strict grid" · "centered" · "asymmetric" · "mixed" |
| `shape.border_usage` | "none" · "subtle 1px" · "bold borders" · "only on inputs" |
| `elevation.shadow_style` | "none" · "soft diffused" · "hard drop" · "layered" |
| `elevation.depth_cues` | "shadows" · "overlapping layers" · "blur/glass" · "color intensity" |
| `motion.philosophy` | "minimal functional" · "playful bouncy" · "cinematic" · "none" |
| `aesthetic.mood` | array of 3–5 mood words |
| `aesthetic.genre` | e.g. "corporate SaaS", "indie creative", "luxury editorial", "neo-brutalist" |
| `aesthetic.personality_traits` | design-as-a-person adjectives, e.g. ["confident","approachable","meticulous"] |
| `visual_language.complexity` | "minimal" · "moderate" · "rich" · "maximal" |
| `visual_language.ornamentation` | "none" · "subtle accents" · "decorative" · "heavily ornamented" |
| `visual_language.focal_strategy` | "single hero element" · "distributed interest" · "progressive reveal" |
| `composition.hierarchy_method` | "scale contrast" · "color weight" · "spatial isolation" · "typographic hierarchy" |
| `composition.balance_type` | "symmetric" · "asymmetric" · "radial" · "mosaic" |
| `interaction_feel.transition_personality` | "snappy" · "smooth glide" · "bouncy elastic" · "fade-subtle" |
| `brand_voice_in_ui.cta_style` | "direct imperative" · "friendly invitation" · "urgent scarcity" · "subtle suggestion" |
| `overview.effect_intensity` | "none" · "subtle-accent" · "moderate" · "heavy-immersive" |
| `overview.performance_tier` | "lightweight" (CSS + simple JS) · "medium" (Canvas 2D, SVG anim) · "heavy" (WebGL, Three.js, shaders) |
| `overview.fallback_strategy` | "disable effects" · "reduce to CSS" · "static snapshot" |
| `overview.primary_technology` | "CSS only" · "Canvas 2D" · "WebGL/Three.js" · "GSAP" · "Lottie" · "SVG SMIL" · "Pixi.js" |
| `background_effects.type` | "gradient-animation" · "noise-field" · "mesh-gradient" · "video-bg" · "generative-art" · "none" |
| `particle_systems.type` | "floating-dots" · "confetti" · "snow" · "fireflies" · "connected-nodes" · "custom" |
| `particle_systems.params.interaction` | "mouse-repel" · "mouse-attract" · "click-burst" · "none" |
| `3d_elements.type` | "hero-model" · "product-viewer" · "scene-bg" · "text-extrusion" · "abstract-geometry" |
| `3d_elements.params.post_processing` | e.g. ["bloom","FXAA","depth-of-field","chromatic-aberration"] |
| `shader_effects.type` | "noise-distortion" · "wave" · "morph" · "color-shift" · "custom-GLSL" |
| `shader_effects.params.noise_type` | "perlin" · "simplex" · "worley" · "fbm" |
| `scroll_triggered_animations.animation_type` | "fade-up" · "scale-in" · "clip-reveal" · "counter" · "draw-SVG" |
| `text_effects.type` | "split-letter-animate" · "typewriter" · "glitch" · "gradient-fill" · "3d-extrude" · "none" |
| `text_effects.params.split_strategy` | "by-char" · "by-word" · "by-line" |
| `cursor_effects.type` | "custom-cursor" · "magnetic-buttons" · "spotlight" · "trail" · "none" |
| `image_effects.type` | "hover-distortion" · "reveal-clip" · "parallax-tilt" · "rgb-shift" · "none" |
| `image_effects.params.distortion_type` | "barrel" · "wave" · "liquid" · "glitch" |
| `glassmorphism_neumorphism.style` | "glass" · "neumorphic-light" · "neumorphic-dark" · "frosted-layers" · "none" |
| `canvas_drawings.type` | "generative-lines" · "interactive-blobs" · "data-visualization" · "pattern-fill" · "none" |
| `svg_animations.type` | "path-draw" · "morph-shapes" · "logo-reveal" · "decorative-loop" · "none" |

## Extraction Procedure

### design_system
- **color**: sample visually. Primary = area dominance; secondary = supporting role; accent = CTA usage. Neutral scale from lightest background to darkest text. Extract exact hex where visible; estimate otherwise.
- **typography**: identify families by visual class (geometric, humanist, serif). Estimate scale ratios from heading/body size relationships.
- **spacing**: density from element proximity; rhythm from section-gap consistency.
- **layout**: infer grid from content alignment; note max-width, column count, asymmetry.
- **shape**: radius relative to element height; note border and divider presence.
- **elevation**: classify shadow softness, spread, layering.
- **motion**: only if observable (video/interactive) — note easing feel and duration bands.
- **components**: describe observed patterns concretely, e.g. "ghost buttons with thick borders, rounded inputs with inner shadow".

### design_style
Synthesize holistic impressions: mood, personality, composition strategy. Compare against genre archetypes (SaaS, editorial, brutalist, luxury, indie). Note ornamentation level and whitespace philosophy.

### visual_effects
- **From code**: scan for `<canvas>`, WebGL contexts, Three.js/Pixi.js imports, GSAP/Lottie usage, custom shaders, IntersectionObserver scroll triggers, SVG `<animate>`.
- **From screenshots**: describe visible beyond-CSS effects — glowing particles, 3D renders, noise textures, gradient animation, parallax depth, cursor trails, text distortion, glassmorphic surfaces. Put anything whose implementation can't be determined in `composite_notes`.
- **From video/interaction demos**: note scroll behaviors, hover distortions, transition choreography, loading sequences.
- Set `enabled: false` for every effect category not present. Rate `overview.effect_intensity` and `overview.performance_tier` from what is actually observed, not aspiration.

## Generation

### Priority order
1. **Color & typography** — 80% of visual identity
2. **Spacing & layout** — structural rhythm
3. **Shape & elevation** — surface treatment
4. **design_style qualitative fields** — mood, personality, composition
5. **visual_effects** — special rendering layer
6. **Motion & interaction** — last, once static layout and effects are solid

### Tokens → code
Emit a `:root` block mapping every `design_system` token to a CSS custom property (`--color-primary`, `--font-heading`, `--radius-md`, `--shadow-low`, `--ease`, `--duration-micro`, …). In Tailwind projects, map the same values into the theme config instead. Component decisions: `components.*` → component classes/variants; `interaction_feel.hover_behavior` → `:hover`/`:focus` states; `motion.easing` + `duration_scale` → transition properties.

### Style → subjective decisions

| DNA field | Guides |
|---|---|
| `aesthetic.mood` | Overall emotional feel — warm tones vs cool precision |
| `visual_language.whitespace_usage` | Padding/margin generosity |
| `visual_language.contrast_level` | How much elements pop vs blend |
| `composition.hierarchy_method` | Which tool to use for emphasis |
| `composition.balance_type` | Symmetric layout vs dynamic asymmetry |
| `imagery.graphic_elements` | Decorative SVGs, gradients, patterns |
| `brand_voice_in_ui.tone` | Microcopy phrasing |
| `interaction_feel.microinteraction_density` | How many hover/click effects |

### Effects → implementation
Choose technology by `overview.performance_tier`: lightweight → CSS animations, SVG SMIL, vanilla JS; medium → Canvas 2D, GSAP, Lottie, anime.js; heavy → Three.js, custom GLSL, Pixi.js. Load heavy libraries via CDN `<script>`/importmap.

| Effect | Implementation |
|---|---|
| gradient-animation | CSS `@keyframes` on linear/conic gradient |
| noise-field / generative-art | Canvas 2D with Perlin/simplex noise |
| video-bg | `<video autoplay muted loop>` with poster fallback |
| particles, count < 100 | vanilla JS + Canvas 2D; `requestAnimationFrame` loop with cleanup |
| particles, count ≥ 100 or complex interaction | Pixi.js or Three.js Points; map `interaction` to pointer handlers |
| 3D elements | Three.js by default; apply `lighting`/`camera`/`materials` params; post-processing via EffectComposer; resize via ResizeObserver |
| shaders | vertex/fragment per `type`; pass `uniforms` (time, resolution, mouse); animate `u_time` via rAF |
| parallax | `transform: translateY(scrollOffset × layerSpeed)` per layer |
| scroll-triggered | IntersectionObserver with threshold array; "scrubbed" → progress = scroll progress, "triggered" → play once on enter |
| split-letter-animate | span-per-char/word, staggered CSS animation |
| typewriter | CSS `steps()` or JS interval |
| glitch | layered clip-path + color offset |
| gradient-fill text | `background-clip: text` with animated gradient |
| custom cursor | `cursor: none` + element following `pointermove`; magnetic = transform pull on hover proximity; spotlight = radial-gradient mask; trail = spawn fading elements |
| glass | `backdrop-filter: blur(radius)` + rgba background at `transparency` |
| neumorphic | dual box-shadow (light + dark offset), inverted for dark |
| path-draw | animate `stroke-dashoffset` from path length to 0 |
| morph-shapes | interpolate SVG `d` between paths |

### Fallback — always implement
```js
const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const isLowEnd = navigator.hardwareConcurrency <= 2;
if (prefersReduced || isLowEnd) { /* apply overview.fallback_strategy */ }
```

### Output format
Default: one self-contained HTML file with inline CSS/JS (unless the user specifies a framework), containing: token `:root` block → component styles → layout per `design_system.layout` → user content → effects per spec → motion (only if `motion.philosophy` ≠ "none") → fallback handling.

## Quality Checks

Before delivering generated output, verify:

- Every color traces back to the DNA palette; fonts match `font_families`; spacing rhythm matches `spacing.scale`; radii match `shape` tokens
- Overall mood matches `design_style.aesthetic.mood`; components match `components` descriptions
- Contrast meets WCAG AA (4.5:1 body, 3:1 large text)
- Effects match `visual_effects` spec (type, technology, params); nothing renders when `enabled: false`
- Fallback strategy implemented; `prefers-reduced-motion` respected
- Canvas/WebGL contexts sized correctly and handle resize; all loops use `requestAnimationFrame`, never `setInterval`

For a systematic post-generation review (severity-ranked critique, anti-pattern scan, a11y audit, edge-case hardening), see `references/design-audit.md`.

---
*Distilled from: design-dna.*
