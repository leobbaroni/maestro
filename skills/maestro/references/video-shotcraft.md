# Video Shotcraft

*The lead for product demo and promo video: a 106-card shot vocabulary with tuned reference implementations, a mode gate, an eight-stage pipeline, and a real-screenshot doctrine. Renders through Remotion — this is the craft layer above `video-remotion.md`, not a replacement for it.*

## When shotcraft leads

| Job | Lead |
|---|---|
| Product demo, launch promo, feature tour built from a real app or site | **This module** — pick a mode, then run the pipeline |
| One cinematic moment inside any other video | **This module's shot cards** — pull one card, adapt it, ignore the rest |
| Story/beat/pacing planning before an engine is chosen | `video-direction.md` (engine-neutral; still the planning layer) |
| HTML-native composition, agent-driven CLI loop, HyperFrames project | `video-hyperframes.md` |
| Remotion API surface, determinism mechanics, rendering | `video-remotion.md` (shotcraft builds on it) |
| Sound design and beat-sync for any of the above | `video-sound.md` |

Shotcraft's focus is web/desktop product film. The cards themselves are general motion vocabulary — a single card is worth pulling into any video regardless of engine, as long as you adapt rather than transplant.

## The mode gate — settle it before anything else

Three modes for a full promo. They do not merge. Decide before asset capture, storyboard, or a line of code; if the user already chose, execute that and do not re-ask or silently switch.

| Mode | The user gets | The agent does |
|---|---|---|
| **Template** | Close to the reference film | Follow `library/video-shotcraft/template/TEMPLATE.md`'s replace-guide shot by shot — swap screenshots, copy, brand. The template's source is vendored and readable; rendering it needs the upstream clone for its textures |
| **Autonomous** | A new direction, no interruptions | Derive visual direction, shot mapping, storyboard, assets, and audio; record decisions and run straight through to the cut without stage-gates |
| **Co-creation** | Control of the creative calls | Propose with evidence, then pause for user sign-off at product brief → requirement decisions → visual direction → shot mapping → final storyboard; then continue into the pipeline's asset capture |

When the user supplies a project, URL, recording, or screenshots but hasn't chosen: run one **minimal read-only product inspection** (positioning, core features, page visuals, presentable states, asset risks — no edits to their project, no sensitive data, no video code). Then present all three modes with a specific recommendation and its trade-offs, and point them at the hosted gallery to pick shots by watching them: <https://vincentwei1021.github.io/video-shotcraft/>. Wait for the pick — never default one.

Two standing exceptions: naming the template means template mode is chosen; naming specific shot cards fixes those as constraints (resolve the names, read each card in full, locate its exact demo) but still leaves autonomous-vs-co-creation open for a full film. In co-creation, "you decide" or "skip the confirmations" switches the run to autonomous — record the switch and stop asking; don't claim autonomy while still gating.

## Core doctrine

1. **Real pages demand real screenshots.** To show an existing product, start a local dev server and capture full-page 2× textures, element-level cutouts, and a coordinate table. Hand-built UI is allowed only for non-reproduction scenes (abstract openers, brand segments, standalone display components) and only if it reaches publication quality and reads unambiguously; otherwise fall back to capture. Handle page data by risk: public demo data only after the brief confirms it; customer, personal, internal, credential, or live data must be fictionalized or masked, and frozen before capture.
2. **The film's visual language grows from the product.** Before styleframes, extract a design spec from the product's own system, source, or computed styles — families, weights, size ramp, line-height/tracking, grid, spacing, alignment, density, radii, and background/surface/body/accent/state colors, gradients, materials. Every title, caption, number, card, transition, particle, and light effect reuses or conservatively extends those tokens. From a template or a card, inherit only shot structure, motion grammar, rhythm, and tuned parameters — reskin type, layout, color, and material to the target product. Deviating from the product's visuals for narrative reasons needs a stated reason (user-confirmed in co-creation, written into the spec in autonomous).
3. **Cinematic comes from camera, light, rhythm, and sound — not from tricky animation.** What repeatedly earns approval: one protagonist with a complete action arc (spotlight → push-in → hover → reseat), acceleration driven by a physical metaphor (dealing cards), an oblique orbiting close-up, and the riser → impact → sparkle sound phrase. Batch entrances land through motion itself, not per-item glints — decorative glow sprayed across a group reads cheap; one high-quality light moment does not.
4. **One move per shot; after key information lands, breathe.** A given technique (fly-in, stacking, page-turn) headlines exactly once per film; cut repeated shots and repeated taglines. The pacing bias is one-directional: every round of real feedback said *slower / hold longer*, never "too slow". Budget the rest frames **before** laying in motion — brand lockup holds ≥1s, batch moves end with 0.5s of stillness, an opening protagonist gets a full 3s arc.
5. **Using a card means reading its exact demo source.** The card gives semantics and a parameter table; the tuned demo is where the truth lives (easing, duration ratios, mask timing, the workaround for each known trap). Resolve the card name, read the card in full, then open the implementation it names. Adapting is expected; downgrading a parameter the card flags as load-bearing is not — quality ratchets up only. Writing fresh from the card name alone discards every round of tuning behind it.
6. **Strong-beat BGM means everything cuts on the beat.** If the user picked music, analyze rhythm before storyboarding and write the timeline in beat numbers — full method in `video-sound.md`.
7. **Determinism.** No `Date.now()`, no `Math.random()`; seed every pseudo-random value (hash or `mulberry32`, seed derived from index) so frames reproduce exactly. This is maestro constitution rule 11 and the Remotion module's law both.
8. **Verification runs throughout, and the final review is somebody else's job.** From implementation onward, still-frame each shot and re-render + extract frames after each revision round. Before delivery, hand a clean-context reviewer the cut, key frames, the brief, decisions, visual direction, shot mapping, card names and variants, the exact demo sources, the storyboard, and the aesthetic rules — the maker is biased about their own output, so the first review is never the user's job.

## Shot cards — the vocabulary

106 cards in `library/video-shotcraft/references/shots/`, each with frontmatter carrying **name · one-line description · when to use · duration · energy**, then intent, motion core, a parameter table with tuning feel, sound notes, and known traps. Read in full only the ones you pick.

**The cards and every other vendored file are Chinese-language source** (the frontmatter keys below are `name` / `一句话` / `适用` / `时长` / `能量`). Read them in the original — the parameter tables and known-traps sections are the value, and a translation round-trip is where precision goes missing.

Don't open 106 files to choose. Harvest every frontmatter in one pass, then filter:

```bash
# one-line summary of every card: name, what it's for, duration, energy
awk '/^---$/{f=!f; next} f' library/video-shotcraft/references/shots/*.md
# or narrow first — cards are named after what they do
ls library/video-shotcraft/references/shots/ | grep -E 'transition|camera|type|title'
```

Card names are descriptive and cluster by job — `*-transitions` and `*-wipe` for seam work, `*-camera-moves` and `crane`/`crash-zoom`/`graze`/`steep-tilt` for lensing, `type-*`/`typewriter`/`letterspace`/`text-*` for typography, `*-title`/`brand-*` for openers, `*-moves` for reusable technique families. When a user picks from the hosted gallery they'll hand you a card name (optionally `card · style`); resolve it to the file and its demo rather than reinterpreting the name.

Defaults per segment (a single-instance precedent, labelled as such upstream — starting points, not mandates): brand open → `brand-ink-open`; protagonist → `spotlight-hero-card`; feature climb → `deck-deal-flyin`, `type-and-filter`, `list-stack-press`, `row-embed`, `document-typewriter-reveal`; breather → `paper-title-card`; finale → `outro-group-photo-launch`. Seams between chosen shots get their transition style picked last, from the transition cards, with those frames drawn from the neighbouring shots' budgets.

Where each card's implementation lives: 96 cards resolve to `library/video-shotcraft/demos/<name>/`; ten — including most of the defaults above, plus `hires-rasterize-3d-text` — are implemented in the reference film instead, at `library/video-shotcraft/template/src/...`. Every card names its own path in its *参考实现* section; both locations are vendored, so the read-the-implementation rule holds for all 106.

Selection order: pick the film's energy skeleton first, then fill each slot from the cards. The default skeleton for a 30–60s multi-feature product film (`library/video-shotcraft/references/sequences/promo-energy-arc.md`):

| Segment | Share | Energy | Job |
|---|---|---|---|
| Brand open | 8–12% | Low | Wordmark stamps, holds ≥1s, hands off to the product |
| Single protagonist | 12–15% | Medium, slowest and richest | One subject, one complete ≥3s arc — establishes the product's atomic unit |
| Feature climb | 55–65% | Alternating high/low | One unique feature per shot, one technique headlining once, breather title cards between |
| Finale | 13–16% | Peak | Elements from every shown feature assemble around the wordmark; sign-off holds ≥1s |

Breather title cards run 50–55 frames (~1.8s), 2–4 per film, one after every 1–2 feature shots. Allocate frames by subtracting the fixed segments and the cards first, then splitting the remainder across feature shots — and inside each shot, carve out the hold/rest frames before laying in motion. Alternate high-energy shots with steady ones; the densest shot (documents, reports) sits second or third from the end. Treat the ratios as a well-evidenced default, not a law — short films should merge segments deliberately, but never drop the opening hold or the peak finale.

## Aesthetic rules — the standard

`library/video-shotcraft/references/aesthetic-rules.md` codifies the standard as precedents in five families: **R** rhythm, **Q** texture/camera/composition, **S** sound, **C** copy, **P** process. The load-bearing ones beyond the doctrine above:

- **Camera stays steady** — no handheld shake by default on product film. Frame for readability: dense shots face-on, text close-ups laterally level, stylized tilts validated per shot.
- **Object close-up needs all four**: oblique tilt angle, perceptible height, an orbit, and a contrasting dark material background. The source's self-check is whether the subject reads as having volume and standing out from its surroundings.
- **Under 3D perspective, rasterize UI textures at 2–4× their display size and downsample** — and scale up with layout-level CSS `zoom`, never `transform: scale`. Blurry text is a texture-resolution problem first, and the zoom-vs-scale distinction is the actual fix.
- **Fly-in endpoints are real layout slots**, never floating above the page.
- **Document/report mock content must be publication-grade**: native typography, text filling its measure, complete layout in frame.
- **Copy gets rewritten against the locked cut**, and taglines name team + feature + concrete benefit rather than abstract metaphor.
- **Ambiguous feedback gets its referent confirmed** before acting; a wrong change gets a clean revert, not a patch on top.

## Asset capture — the three-piece set

Real-page shots are built on captured geometry, not on screenshots alone. Capture only *after* the storyboard is released — capturing earlier means recapturing, because page states and scope aren't settled yet. Start the product's dev server (or use a window-capture tool for desktop apps) and produce three artifacts per page:

| Artifact | Spec | Feeds |
|---|---|---|
| **Full-page 2× texture** | 1920×1080 viewport at `deviceScaleFactor: 2`; wait for `document.fonts.ready` plus ~600ms settle, and 1.5–2s more on live-syncing pages | The page surface the camera flies over |
| **Per-element cutouts** | One capture per semantic selector; transparent background for floating pieces; also grab an empty backplate when a shot flies cards into a bare board | Elements that animate independently of the page |
| **`layout.json`** | Every element's `{x, y, w, h}` in full-page coordinates, plus each page's height | Flight targets, mask positions, entry zones — all read from here |

Freeze, fictionalize, or mask live data *before* the final capture, per the brief's data policy. Support incremental recapture per page and per element. The two recurring failures: capturing before the storyboard is released, and grabbing full-page images without recording the layout coordinates — which forces every position to be eyeballed later.

**`PageCam` is the foundation of every real-page shot**: full-page texture + keyframed 2.5D camera + page-space overlays, with children positioned in the page's own CSS pixels sharing `layout.json`'s coordinate system.

Per shot, the read order is a hard rule: resolve the card name and style key → read the card in full → open and read the exact demo implementation it names → copy the needed `assets/lib/` components in. Keep the gallery sample for that style on hand for comparison during implementation and final review. Styles marked reference-only aren't recommended by default — implement them only when the user names them, and flag the risk; styles with no preview must never be described as reproduced from a sample.

**Still-frame acceptance is the highest-frequency action.** Write two acceptance frame numbers into the plan for each shot, and the moment the shot is built render those stills (`npx remotion still src/index.ts <Comp> out/qa/<name>.png --frame=<N>`) and inspect composition, clipping, and text sharpness yourself. A shot isn't finished until its stills pass.

## Pipeline

Eight stages in `library/video-shotcraft/references/pipeline.md` — 0 product understanding and constraints · 1 visual direction and styleframe · 2 feature-to-shot mapping · 3 storyboard and production go-ahead · 4 final asset capture · 5 shot-by-shot implementation · 6 sound design · 7 acceptance. Autonomous runs 0→7 continuously; co-creation confirms 0–3 via `guided-free-creation.md` then resumes at stage 4 without re-asking or redesigning. Note that a feature-to-shot mapping is *not* a storyboard: after mapping is agreed, still produce shot order, durations, concrete frames, page states, asset sources, captions, transitions, and SFX before capture begins.

Stage 6 is `video-sound.md`. Stage 7 is `library/video-shotcraft/references/final-review.md`, run by an independent reviewer against product goal, feature completeness, visual direction, card fidelity, storyboard consistency, data safety, audio/rhythm, and technical quality — reporting per item with frame-number evidence.

## Assets

`library/video-shotcraft/assets/lib/` components are **copied into the target project** and modified freely, never imported as a dependency: `PageCam` (the 2.5D page camera every real-page shot is built on), `DigitRoll`, `FlashCut`, `Caption`, `FlatPanel`, `VerticalTicker`, plus `helpers/` (rand, shake, camera, motion). `FlatPanel` and `helpers/camera` need `three` + `@react-three/fiber` + `@remotion/three`; the rest need only Remotion.

`library/video-shotcraft/demos/` holds the tuned implementation for 96 cards — copy into a Remotion project and run; most are self-contained, nine import real-page textures that stay upstream. The remaining ten live in `library/video-shotcraft/template/src/`, whose `aifl/Main.tsx` also carries the central SFX pin table behind `video-sound.md`. The page-capture script stage 4 uses is at `library/video-shotcraft/assets/scripts/capture-template.mjs`.

Left upstream: the preview gallery, the template's rendered output and page textures, and the SFX/BGM binaries — `companions.md` has the retrieval routes, `library/video-shotcraft/VENDOR-NOTES.md` the full split, and `library/video-shotcraft/assets/audio/ATTRIBUTION.md` the manifest of what audio exists and under which license.

---
*Distilled from: video-shotcraft (authoritative — shot cards, pipeline, aesthetic rules).*
