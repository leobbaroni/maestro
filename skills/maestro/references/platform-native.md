# Native Platforms

*Use this module when the target is a native app (iOS/Android/desktop) rather than the web: touch-first mobile UX, keyboard-first desktop UX, and the SwiftUI/Compose motion + graphics APIs.*

## Mobile: Touch Targets

| Platform | Minimum | Recommended | Spec |
|---|---|---|---|
| iOS | 44pt | 44pt + 8pt spacing | Apple HIG |
| Android | 48dp | 48dp + 8dp spacing | Material |
| Web mobile | 44px | 44px + 8px spacing | WCAG 2.5.5 |

Any target below minimum is a usability bug. Hit area may extend past the visible glyph (padding, `hitSlop`, 48dp `IconButton` around a 24dp icon), but the interactive surface must reach the minimum. Spacing matters as much as size — two 44pt buttons touching edges are still mistappable.

## Mobile: No-Hover Doctrine

`:hover` does not exist on touch; hover-only affordances are invisible on every phone. Visible-by-default is the rule. Replacements: SwiftUI `.onTapGesture` + `.contextMenu` for secondary actions; Compose `Modifier.combinedClickable(onClick, onLongClick)`. On hybrid/web surfaces gate hover styles behind `@media (hover: hover) and (pointer: fine)`.

## Mobile: Thumb Zones (Hoober)

Portrait phone use is overwhelmingly one-handed; the thumb pivots from the bottom corner.

- **Bottom third (EASY):** primary CTA, send, confirm, FAB, tab bar.
- **Middle (OK):** content, secondary actions.
- **Top (HARD):** back, close, search, profile — deliberate reaches, not reflex taps.

Never put a "Pay"-class primary action in the top corner of a phone screen.

## Mobile: Safe Areas

| Platform | API |
|---|---|
| SwiftUI | `.safeAreaInset(edge: .bottom) { PrimaryCTA() }` — keeps CTA above home indicator |
| Compose | `Modifier.windowInsetsPadding(WindowInsets.safeDrawing)` — system bars, IME, cutouts |
| Web | `viewport-fit=cover` + `env(safe-area-inset-*)` in `calc()` |

A bottom CTA without safe-area handling sits under the home indicator on every modern iPhone.

## Mobile: Canonical Gestures

Reuse the five gestures users already know; reinventing them is friction.

| Gesture | Contract |
|---|---|
| Swipe-back | iOS left-edge swipe pops the nav stack. Never override; iOS reserves the left ~20pt edge. Mirror on Android via predictive back (14+). |
| Pull-to-refresh | Downward drag at scroll top. Use platform primitives: SwiftUI `.refreshable { await refresh() }` (iOS 15+); Compose M3 `PullToRefreshBox`. |
| Drag-to-dismiss | Sheets/viewers close past a ~100–150pt downward threshold. |
| Pinch-to-zoom | Images, maps, canvases. Respect min/max scale. |
| Row swipe actions | Horizontal swipe reveals contextual actions; leading vs trailing = different action sets. |

### Gesture conflicts and resolution

- **Vertical scroll vs horizontal swipe:** first axis to cross threshold wins, other is locked out for the sequence. System lists already do this — align with it.
- **Long-press vs drag:** SwiftUI `LongPressGesture().sequenced(before: DragGesture())`; Compose `detectDragGesturesAfterLongPress`.
- **Native back-swipe vs custom horizontal pan:** your gesture must yield near the iOS left edge — bind to a non-edge area or filter pointer-downs by x.
- SwiftUI knobs: `.simultaneousGesture(g, including: .gesture)` keeps parent scroll alive while a row swipe is detected; operators `.simultaneously(with:)` / `.sequenced(before:)` / `.exclusively(before:)`.
- Compose knobs: `NestedScrollConnection` (`onPreScroll` runs before the child consumes) for collapsing toolbars, sheet drag, pull-to-refresh; high-level `Modifier.draggable`/`transformable` for 90% of cases, `awaitPointerEventScope` only for custom state machines.

### Momentum / fling

Content must decelerate, not stop dead. SwiftUI: project `DragGesture.Value.predictedEndTranslation`, then settle with a spring (`.interpolatingSpring(stiffness: 200, damping: 25)`). Compose: `Animatable.animateDecay(velocity, rememberSplineBasedDecay())` reproduces the system fling curve.

## Mobile: Accessibility

- **VoiceOver:** custom controls need `.accessibilityElement()` + `accessibilityLabel` / `Value` / `Hint`, `.accessibilityAddTraits(.isAdjustable)` + `.accessibilityAdjustableAction` for slider-likes.
- **TalkBack:** Compose semantics via modifiers; `clearAndSetSemantics { contentDescription; role = Role.Button; stateDescription }` to announce a custom composable as one element; `traversalIndex` for reading order.
- **Dynamic type:** SwiftUI system styles scale free; custom fonts via `.font(.custom(_, size:, relativeTo: .body))`. Compose: Material typography + read `LocalDensity.current.fontScale` to relax `maxLines` above ~1.3.
- **Contrast (WCAG AA):** 4.5:1 normal text, 3:1 large text (≥18pt or ≥14pt bold) and non-text UI. Never color alone — pair with icon/label/pattern.
- **Reduced motion:** SwiftUI `@Environment(\.accessibilityReduceMotion)`; UIKit `UIAccessibility.isReduceMotionEnabled`. Android nuance: `Settings.Global.ANIMATOR_DURATION_SCALE == 0f` is only the developer-options toggle; the user-facing setting (Android 14+, "Remove animations") is `AccessibilityManager.areTransitionsEnabled()` (API 34+) — check that first, fall back to the scale. Under reduce: keep opacity/cross-fades, kill large translations, scale-from-zero, parallax, loops (`snap()` in Compose, `.none`/zero offsets in SwiftUI).
- **Checklist:** every interactive element labeled with role; 200% font scale without truncation/overlap; every gesture has a non-gesture alternative (button, menu); no time-limited-only interactions.

## Mobile: Performance Budgets

Cold start <2s on mid-range (Pixel 4a / iPhone SE 2 baselines). Frame budget 16.67ms @60fps, 8.33ms @120fps. Binary <30MB APK / <50MB IPA before heavy media libs (Lottie/Rive add 0.5–2MB). No continuous background CPU — `WorkManager` (Android) / `BGTaskScheduler` (iOS). Respect metered-network hints.

## Desktop: Hover and Pointer Precision

Hover is mandatory on desktop — the inverse of mobile. Every clickable surface gets a distinct hover style with a 100–200ms transition. SwiftUI: `.onHover { hovering = $0 }` (+ `.hoverEffect` for iPadOS pointer). Compose Desktop: `Modifier.hoverable(interactionSource)` + `collectIsHoveredAsState()`.

Pointers are precise: 24–32px icon buttons are fine; WCAG 2.5.8 floor is 24×24px. Fitts's Law: screen edges/corners are infinite-depth targets — put high-frequency global controls there (menubar/taskbar are the textbook cases).

## Desktop: Keyboard First

Missing `⌘F` in a list-heavy app is a bug, not minimalism.

| Action | macOS | Windows/Linux |
|---|---|---|
| New / Open / Save | `⌘N` / `⌘O` / `⌘S` | `Ctrl+N` / `Ctrl+O` / `Ctrl+S` |
| Save As | `⌘⇧S` | `Ctrl+Shift+S` |
| Close window / Quit | `⌘W` / `⌘Q` | `Ctrl+W` / `Alt+F4` |
| Undo / Redo | `⌘Z` / `⌘⇧Z` | `Ctrl+Z` / `Ctrl+Y` |
| Find / Replace | `⌘F` / `⌘⌥F` | `Ctrl+F` / `Ctrl+H` |
| Settings | `⌘,` | `Ctrl+,` |
| Command palette | `⌘K` or `⌘⇧P` | `Ctrl+K` or `Ctrl+Shift+P` |
| Toggle sidebar | `⌘B` | `Ctrl+B` |
| New tab / Go back | `⌘T` / `⌘[` | `Ctrl+T` / `Alt+Left` |

- SwiftUI: `.keyboardShortcut("k", modifiers: .command)` — platform layer handled for you. Compose Desktop: `KeyShortcut(Key.K, meta = true)` in `MenuBar` items; raw handling branches on `isMetaPressed` vs `isCtrlPressed` by host OS.
- **Chords** (`⌘K, ⌘S`): leader combo arms a buffer, next combo within ~300ms fires, else reset. SwiftUI needs `NSEvent.addLocalMonitorForEvents`; web/Compose: small state machine with a 300ms timeout.
- **Conflicts:** never override OS shortcuts (`⌘Q`, `⌘Tab`, `Alt+Tab`, `Win+L`) or browser shortcuts globally. No modifier-less single-letter shortcuts — they kill text input.
- **Discoverability, layered:** shortcut shown in the menu next to the command (native menu APIs render it automatically); tooltip after 1s delay formatted `Action name (⌘N)`; a searchable `⌘/` overlay listing all shortcuts grouped by domain.

## Desktop: Multi-Window

Use a new window only for: document peers (one window = one document, own undo stack and dirty state); long-running secondary tasks the user watches while working (export, log tail, render preview); companion inspectors/palettes summoned by shortcut. Everything else is a tab, sidebar, sheet, or popover — every extra window doubles state surface and testing matrix.

- SwiftUI: `WindowGroup` for peers, `Window("Inspector", id:)` for singletons (`.windowResizability(.contentSize)` for palettes); open via `@Environment(\.openWindow)`, `openWindow(id:value:)` reuses a matching window.
- Compose Desktop: each `Window` composable in the `application` block is one OS window; removing it from composition closes it. `rememberWindowState(size, position)` to persist geometry; `::exitApplication` on the main window only.
- **State sharing:** windows are views over one model — singleton observable, DI container, or SwiftUI `@Observable` via `.environment(model)`. Rule: secondary windows never own primary state; inspectors observe the document window's model.
- **Lifecycle gotchas:** SwiftUI "save on focus loss" needs `scenePhase`, not `onDisappear`; Compose Desktop has no `onResume`/`onPause` — observe `WindowState` (`isMinimized`, `placement`) via `LaunchedEffect`. Persist size/position/was-open, and clamp restored positions to the current screen list (a window saved on an unplugged monitor reopens offscreen).

## Desktop: Focus, Density, Motion Restraint

- Tab order must be sane; focus rings visible. SwiftUI `@FocusState` + `.focused(_, equals:)` + `.onSubmit` to chain fields; Compose `FocusRequester` + `KeyboardActions(onNext = ...)`. Web: `:focus-visible` ring, never bare `outline: none`.
- Density: desktop users want more per viewport — 8px grid, persistent sidebars (never a hamburger at 1440px), command palette, dense tables. Touchstones: Linear, Things 3, Notion.
- Subtle-animation doctrine: desktop UI is stared at for hours. Opacity and small translations under 200ms; no bounces or overshoots on routine interactions; save expressive motion for one-shot moments (onboarding, success).

## SwiftUI Motion

| Need | API |
|---|---|
| Single value | `withAnimation { }` or `.animation(_, value:)` |
| 3+ ordered states | `phaseAnimator` (iOS 17+) — sequential phases, settles on last |
| Parallel time-based tracks | `keyframeAnimator` (iOS 17+) — one `KeyframeTrack` per keypath |
| Custom drawing interpolation | `animatableData` / `@Animatable` macro (iOS 17+) |
| Shared element / hero | `matchedGeometryEffect(id:in:)` — same id, same `Namespace` |
| Gesture-driven | `DragGesture`/`MagnifyGesture` + `.offset`/`.scaleEffect` |
| Loop | `.repeatForever(autoreverses:)` — use `.linear`/`.easeInOut`, not springs |

Start with `withAnimation`; escalate only when needed. Prefer explicit `withAnimation` for user-triggered changes, implicit `.animation(_, value:)` when any change should always animate — never both on one property. `phaseAnimator` without `trigger:` auto-advances once on appear. Keyframe types: `LinearKeyframe`, `SpringKeyframe`, `CubicKeyframe`, `MoveKeyframe` (jump cut).

### Spring cheatsheet

`response` = settle time (lower = snappier); `dampingFraction` = overshoot in 0…1 (1 = none; 0 = never settles — never ship). Stay in `response 0.2–0.5` × `damping 0.7–1.0` for 95% of UI. iOS 17+ equivalent API: `.spring(duration:bounce:)` where bounce 0 = critically damped.

| Use case | Spec |
|---|---|
| Tap feedback | `.snappy` = `(response: 0.3, dampingFraction: 0.85)` |
| Sheet present | `(0.45, 0.85)` — slight overshoot = "object arrives" |
| Sheet dismiss | `.smooth` = `(0.5, 1.0)` — exits subtler than entrances |
| Drag follow | `.interactiveSpring()` = `(0.15, 0.86)` — only while gesture-driven |
| Hero/page transition | `(0.5, 0.85)` |
| Bouncy reveal (sparingly) | `.bouncy` = `(0.5, 0.7)` — cap at 1–2 places per app |
| Loading loop | `.linear(duration: 1.5).repeatForever(autoreverses: true)` |

Define 3–5 named springs as `Animation` static extensions and reuse; mixing many ad-hoc springs = inconsistent feel. `response > 0.6` feels sluggish outside hero moments.

### Transitions and anti-patterns

- Transitions fire on view insertion/removal inside `if`/`switch`/`ForEach` when the parent's animation context fires — wrap the state mutation in `withAnimation`. Combinators: `.move`, `.opacity`, `.scale`, `.push`, `.asymmetric(insertion:removal:)`, `.combined(with:)`.
- Never `.transition(.scale)` to 0 — use `.scale(scale: 0.95).combined(with: .opacity)`.
- Never bare `.animation(.easeInOut)` without `value:` (deprecated, animates everything).
- Don't animate `.frame()` sizes — layout pass every frame; animate `scaleEffect`/`offset`, or use `matchedGeometryEffect` for real layout transitions.
- Never call `withAnimation` inside `body`; trigger from actions or `.onChange`.
- `matchedGeometryEffect` gotchas: stable ids (not array indices), one namespace, both branches under the same parent.

## SwiftUI Graphics

| Need | API |
|---|---|
| Pixel color manipulation | `.colorEffect(ShaderLibrary.fn(...))` — cheapest |
| Pixel displacement | `.distortionEffect` — returns new sample position |
| Full-layer sampling | `.layerEffect` + `maxSampleOffset` — most expensive |
| Geometry-reactive modifier | `.visualEffect { content, proxy in }` — scroll parallax/scale, read-only |
| Custom vector drawing | `Canvas { context, size in }` |
| iOS 26+ glassmorphism | `.glassEffect()` / `GlassEffectContainer`; pre-26 fall back to `.ultraThinMaterial` |

Escalation order: built-in modifiers → `.visualEffect` → `Canvas` → Metal shader. **Canvas:** immediate-mode paths/gradients/text; animate by wrapping in `TimelineView(.animation)` so the closure re-runs at refresh rate (use `minimumInterval` for slow animations); isolate from unrelated parent state or it redraws on every recomposition.

**Metal shaders (iOS 17+), one paragraph:** author MSL functions marked `[[ stitchable ]]` in a `.metal` file; SwiftUI auto-binds them via `ShaderLibrary.<name>(.float(...), .float2(...), .color(...))`. `.colorEffect` receives `(position, color)`, `.distortionEffect` `(position)`, `.layerEffect` `(position, SwiftUI::Layer)` — your args start after the injected ones. Drive time with `TimelineView(.animation)`. Rules: one combined shader instead of stacked passes (each modifier = a full render pass), pass colors as arguments instead of hardcoding, size `maxSampleOffset` honestly, reserve `.glassEffect` for hero/chrome surfaces, and profile with GPU Frame Capture before optimizing.

## Compose Motion

| Need | API |
|---|---|
| Single value | `animateFloatAsState` / `Dp` / `Color` / `Offset`… (always set `label`) |
| Mount/unmount | `AnimatedVisibility(visible, enter = slideInVertically() + fadeIn(), exit = ...)` |
| Simple fade swap | `Crossfade` (does NOT animate size) |
| Layout swap with anim | `AnimatedContent(target) { }` + `togetherWith` transitionSpec |
| Multi-property coordinated | `updateTransition(target).animateDp/animateColor { }` — shared timeline |
| Interrupt / chain / velocity / decay | `Animatable` + `animateTo` / `animateDecay` / `stop()` |
| Loop | `rememberInfiniteTransition().animateFloat(...)` |
| Hero / shared element | `SharedTransitionLayout` + `Modifier.sharedElement(rememberSharedContentState(key), animatedVisibilityScope)` (1.7+); keys must match across screens |
| Swipe/snap points | `Modifier.anchoredDraggable` (replaces `swipeable`) |

`animate*AsState` covers 70% of cases; climb the ladder only when needed. Exit transitions shorter/simpler than enters. Springs ignore `durationMillis` — use `tween` for deterministic timing.

### Spring physics defaults

| Use | Spec |
|---|---|
| UI snap (modal, drawer, tab) | `spring(stiffness = StiffnessMediumLow, dampingRatio = DampingRatioNoBouncy)` |
| Tactile (press, toggle) | `spring(stiffness = StiffnessMedium, dampingRatio = 0.85f)` |
| Bouncy reveal (FAB, toast) | `spring(stiffness = StiffnessLow, dampingRatio = DampingRatioMediumBouncy)` |
| Drag follow | `spring(stiffness = StiffnessHigh, dampingRatio = 1f)` |

Stiffness: VeryLow 200, Low 400, MediumLow 700, Medium 1500, High 10000. Damping < 1.0 overshoots (MediumBouncy 0.5, LowBouncy 0.75).

### Compose anti-patterns

- Don't animate layout size (`animateDpAsState` on width) — animate scale via `graphicsLayer { scaleX = ... }`; if layout truly must change, `Modifier.animateContentSize()` or `AnimatedContent`.
- `LaunchedEffect(true)` with captured varying state is stale-prone — key on the actual trigger.
- `LazyColumn` items need stable `key = { it.id }` + `Modifier.animateItem()` (1.7+) for reorder animation; without keys, items animate to wrong slots.
- Heavy containers (`AnimatedContent`, `SharedTransitionLayout`) belong at screen scope, never per list row — animate only the changing property on rows.

## Compose Graphics

| Need | API |
|---|---|
| Spring physics with brand personality | `MaterialTheme(motionScheme = MotionScheme.expressive())` |
| Pixel shader (Android 13+) | `RuntimeShader(AGSL)` + `graphicsLayer { renderEffect = ... }` |
| Generative drawing | `Canvas { drawCircle/drawPath/drawArc/drawText }` |
| Blur / GPU effects | `Modifier.blur(...)` or `graphicsLayer { renderEffect }` |
| Shape morphing | `androidx.graphics.shapes` `Morph(MaterialShapes.Circle, MaterialShapes.Cookie4Sided).toPath(progress)` |

**M3 Expressive:** spring-based motion tokens on the theme — spatial specs (`fast/default/slowSpatialSpec()`, ~<200/350/600ms) for position/size, effects specs (`fast/default/slowEffectsSpec()`) for alpha/color. Springs for spatial, tween-like for effects — the tokens encode this. Scope `expressive()` to hero moments (1–3% of UI, override locally); `standard()` for chrome and lists, or the app feels like a bouncy castle.

**AGSL, one paragraph:** Android's GLSL-like shader language (Android 13+ only — always gate on `SDK_INT >= 33` with a graceful fallback, never crash). `RuntimeShader(source)`, set uniforms (`setFloatUniform("time", t)`, resolution from `onSizeChanged`), bind via `RenderEffect.createRuntimeShaderEffect(shader, "image").asComposeRenderEffect()` inside `graphicsLayer`; `image.eval(coord)` samples the underlying view. Drive time with `produceState` + `withFrameMillis`. One combined shader beats chaining four `graphicsLayer` passes; pair with `Modifier.blur()` upstream for glassmorphism (cheaper than blurring in-shader) — Android has no native Liquid Glass.

**Canvas/DrawScope perf:** Canvas recomposes on any state it reads — hoist reads behind `derivedStateOf`. Frame loops: `LaunchedEffect + withFrameMillis`, never `delay(16)` (drifts). Reuse a `remember { Path() }` and `rewind()` per frame — allocating in DrawScope causes GC stutter. Precompute static paths, animate transforms only. ~200 simple draws/frame is fine; 2000+ lags.

## Reduced Motion Lookup (all platforms)

| Platform | Signal |
|---|---|
| SwiftUI | `@Environment(\.accessibilityReduceMotion)` |
| UIKit | `UIAccessibility.isReduceMotionEnabled` |
| Android 14+ | `AccessibilityManager.areTransitionsEnabled()` (API 34+, user-facing) |
| Android <14 | `Settings.Global.ANIMATOR_DURATION_SCALE == 0f` (dev-options fallback) |
| Web | `@media (prefers-reduced-motion: reduce)` / `matchMedia` |

---
*Distilled from: genjutsu.*
