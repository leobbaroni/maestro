# Video Direction

*Engine-neutral craft for directing any video: story, beats, pacing, narration, typography, transitions, blueprints, and format.*

For a **product demo or launch promo built from a real app or site**, `references/video-shotcraft.md` leads — it gates the production mode, supplies the shot vocabulary, and carries a proven whole-film energy skeleton, then routes back here for story and beats. Sound for any film, any engine: `references/video-sound.md`.

## Story spine

Lead with why it's valuable, not with what it is or how it was made — the **reverse iceberg**.

1. **The hook speaks the viewer's language.** The first beat answers "why should I care" in outcome language — what the viewer gains, avoids, or finally understands. Subject-internal vocabulary is banned in the hook: file/function names for a code change, a feature list for a product, source headings for an explainer. Numbers only when they carry stakes ("40% faster cold starts"), never inventory ("23 files changed").
2. **Value before evidence.** The value claim lands by the second beat. Everything after is evidence in service of that claim — the demo, the mechanism, the proof. Implementation is the footnote of the story, not the spine. Self-check: delete every evidence beat — the remainder must still state the value; delete the value beats — if the video still "works," it was a feature tour, not a story.
3. **The storyboard is a proposal, not a listing.** Present the plan as: an echo line ("This video tells [audience] that [message]"), then a frame table (Frame | Beat | On screen | Why), then a style/duration footer, then "approve or adjust." Every frame's *Why* must trace to the message — a frame that can't is a frame to cut, not decorate. A frame change at proposal time costs 30 seconds; the same change after build costs minutes.

**Standard arc:** `Hook → Problem → Solution → Proof → CTA`. Standard beat roles: hook, pain_point, product_intro, feature_showcase, benefit_highlight, social_proof, cta, branding. Not every video uses all of them — a 15s social ad might be Hook + Proof + CTA.

## Beat planning

Each beat is a **world, not a layout**. Before specifying pixels, describe what the viewer experiences.

- Mediocre: "Dark navy background. '$1.9T' in white, 280px. Logo top-left."
- Great: "Camera mid-flight over a vast dark canvas. The gradient wave sweeps like aurora. '$1.9T' SLAMS in with such force the wave ripples in response."

Write the experience, then derive the pixels. Every beat gets five fields:

| Field | Content |
|---|---|
| **Concept** | The big idea in 2-3 sentences. What world are we in? What metaphor? What should the viewer feel? Everything else flows from this. |
| **Mood** | Cultural/design references, not hex codes: "Bauhaus color studies", "warm notebook energy", "cinematic title sequence". |
| **Choreography** | A motion verb per element (see below). If you can't name the verb, the element isn't designed yet. |
| **Transition** | How this beat hands off to the next — type + parameters (see taxonomy). |
| **Depth layers** | Foreground / midground / background contents. Minimum 2 layers per beat. |

Optionally add **SFX cues** ("on the capture pulse — a soft analog shutter click"; "on fold: drone cuts, silence, then a single clean chime").

**Motion verb vocabulary** (organized by physical character, not energy level):

| Character | Verbs |
|---|---|
| Impact / weight | SLAMS, CRASHES, PUNCHES, STAMPS, SHATTERS, DROPS |
| Directional / deliberate | SLIDES, PUSHES, PULLS, WIPES, CUTS |
| Reveals / builds | DRAWS, FILLS, GROWS, EXPANDS, ASSEMBLES, COUNTS UP |
| Organic / ambient | FLOATS, DRIFTS, BREATHES, PULSES, ORBITS, MORPHS |
| Mechanical / precise | TYPES ON, CLICKS, LOCKS IN, SNAPS, STEPS |

The verb follows from the beat's concept and content, not from an energy bucket — a wellness brand's slow beat can still DROP if the content is about letting go.

### Rhythm

Before building, declare the scene rhythm: which beats are quick hits, which are holds, where energy peaks. Name the pattern — e.g. `fast-fast-SLOW-fast-HERO-hold`. Derive it from the content and brand, not a lookup: an architecture firm's 15s ad is slow-reveal-hold-CTA; a gaming brand's is rapid-fire-SLAM-hook. Questions that drive it: What emotional journey? Where does narration land its heaviest emphasis (that's the energy peak)? Does the brand pace unhurried or urgent? How many beats can the duration support without rushing or padding? A 15s spot that hooks, shows 3 features, and CTAs is noise — sometimes hook-hold-CTA with one strong feature is right.

### Mapping narration to timed beats

Narration is the clock. Compute each beat's window from its spoken line at ~2.5 words/sec plus breathing room, then pace visual reveals *across* the window to the words — content keeps arriving through the beat instead of dumping at t=0 and freezing. When word-level timestamps exist (from a transcript), sync per-word/per-element reveals to them exactly.

## Pacing & scene-length norms

| Format | Total length | Beats | Per-beat norms |
|---|---|---|---|
| Social ad (9:16/1:1) | 10–20s | 3–5 | Hook lands in ≤2s; beats 2–5s; hard cuts dominate; end card holds 1.5–2s |
| Promo / launch (16:9) | 30–75s | 6–10 | Beats 3–12s; hero reveal gets the longest hold; CTA 4–6s |
| Explainer | 60–180s | 8–15 | Beats 5–12s; insert a calm "breather" beat every 3–4 dense ones |

Per-role duration bands (from a corpus of golden launch clips): hook 3.5–12s, problem 6–10s, product intro 4.5–11s, key feature 4–10s, benefits 3–10s, social proof 3–6s, CTA 4–6s, brand outro 3.5–7s.

Pacing rules:

- One climax. Spend the boldest transition and heaviest motion there; everything else stays quieter.
- A calm title-card beat (one restrained move, then a still hold) is a feature, not a deficiency — use it as a breather or landing.
- 3+ rapid tempo-matched switches → hard cuts, not transitions.
- End slow: wind-down and outro use the gentlest, slowest handoffs (0.6–1.0s). Never introduce new energy at the end.

## Narration & VO

**Pacing:** 2.5 words/second natural pace. 15s ≈ 37 words, 30s ≈ 75, 60s ≈ 150. The script should feel *shorter* than the video — silence between sentences is a feature. (A good 62s script runs ~140 words.)

**Tone:** write like a person, not a brochure. Contractions ("it's", "you'll"). Vary sentence length — short punches mixed with longer flows. Read it aloud; if it sounds robotic, rewrite. No jargon unless the audience expects it.

**Structure:** Hook → Story (what it does, who uses it, concrete) → Proof (real numbers, names) → CTA ("Start building at stripe dot com"). Shorter formats drop sections.

**The opening line** is the most important sentence — it must create tension, curiosity, or surprise in 3 seconds. Patterns: a bold claim ("The financial infrastructure that powers the internet economy"), a provoking question ("What if your database could think?"), a contrast ("Your AI agent already knows how to make videos. It just needs the right format."), a shocking number (sparingly). If the opening is "Welcome to X" / "Introducing our product", start over.

**TTS reads literally** — write what the voice should say; the visual shows the exact figure while the voice rounds:

| On screen | In script |
|---|---|
| 135+ | more than one hundred thirty five |
| $1.9T | nearly two trillion dollars |
| 99.999% | ninety nine point nine percent |
| 10x | ten times |
| API | A P I |
| stripe.com | stripe dot com |

## Kinetic typography

The core technique for narration-driven video: words appear one-by-one, synced to VO timestamps.

- **Per-word reveal:** each word slides + fades in at its spoken onset. Decay the slide distance across the phrase (e.g. 80→60→50→25→12px) — mimics a camera settling.
- **Beat slam:** short phrases land on a shared beat grid with *distinct* per-phrase entrances (scale-slam, side-snap, rise-rotate), optional rhythm chrome (metronome ticks, beat bar), then a locked finale. The recipe for punchy/rhythmic taglines.
- **Word swap:** a fixed line swaps one token in place by hard cut — the motion IS the words changing.
- **Typewriter:** character-by-character typing with a blinking block cursor (discrete on/off blink, not a fade). Human touches — typos, backspaces, holds — read as "someone is typing this."
- **Variable font axes:** animate weight/optical-size axes so glyphs subtly reshape — a premium, restrained move for wordmarks.
- **Emphasis marks:** hand-drawn highlight sweep, circle, underline scribble, or burst behind a keyword at its spoken moment.

Rules: one typographic engine per beat; sync to actual word timings when available; keyword emphasis (glow/scale/color) stays subtle on text (≤5% scale) or it reads as jitter.

## Scene-transition taxonomy

A transition tells the viewer how two scenes relate. A crossfade says "this continues." A push says "next point." A hard cut says "now." Choose by what the content is doing emotionally.

**Non-negotiable rules for multi-scene work:**

1. Every scene change gets a deliberate transition (a hard cut is a choice, not an omission).
2. Every scene animates its elements IN — nothing pops fully-formed onto screen.
3. Exit animations are banned except on the final scene — **the transition IS the exit**. Fading the outgoing scene out and then running the next scene's entrance is a jump cut with a dip, not a transition. Outgoing and incoming must move at the same instant, velocity-matched.
4. Pick ONE primary transition (60–70% of scene changes) + 1–2 accents. Never a different transition per scene.

**The families:**

| Family | Members | Says | Use when |
|---|---|---|---|
| **Cut** | hard cut, smash cut | "now" | Rapid-fire lists, percussive edits on the beat, comedic timing, 3+ quick tempo-matched switches; anytime 0.3–0.8s would feel slow |
| **Push** | push slide, vertical push, elastic push, squeeze, whip pan | "next point" | Editorial sequences; continuous camera-motion feel; connective tissue between related beats |
| **Dissolve** | crossfade, blur crossfade, focus pull, color dip | "this continues" / "drift with me" | Calm, premium, wind-down, outro; both scenes coexist during the blend |
| **Morph** | element morph, scale-swap, cross-warp, iris/clip reveal | "this becomes that" | One idea transforming into another; hero reveals; brand moments where the transition itself is the visual |
| **3D** | card flip, zoom-through, zoom-out, gravity drop | "another side / deeper in" | Playful or dramatic perspective shifts; product flips; entering a world |
| **Destruction** | glitch, VHS, shatter, page burn, film burn, overexposure | "break / discard" | Tense, edgy, retro, or climactic discards of the old; use once, at most twice |

**Energy → duration & easing:** calm 0.5–0.8s gentle eases; medium 0.3–0.5s power eases; high 0.15–0.3s aggressive eases. Blur intensity scales inversely with energy (calm 20–30px held slow; high 3–6px, no hold).

**Narrative position:** opening = the most distinctive transition (sets the visual language, 0.4–0.6s); between related points = the primary, consistent, ~0.3s; topic change = something structurally different (signals "new section"); climax = the boldest accent; wind-down/outro = gentlest and slowest.

**Velocity matching:** exit the outgoing scene with an accelerating ease + blur ramp; enter the incoming with a decelerating ease + blur clear. The fastest point of both curves meets at the cut — the viewer perceives one continuous camera move. Match exit and entry velocity within ~5%.

**Mood → transition type** (choose by what the transition communicates):

| Mood | Reach for | Why it works |
|---|---|---|
| Warm / inviting | Light leak, blur crossfade, focus pull, film burn | Soft edges, warm washes — nothing sharp or mechanical |
| Cold / clinical | Squeeze, zoom out, blinds, shutter, grid dissolve | Content transformed mechanically — compressed, sliced, gridded |
| Editorial / magazine | Push slide, vertical push, diagonal split, whip pan | Like turning a page — clean directional movement |
| Tech / futuristic | Grid dissolve, staggered blocks, chromatic aberration, glitch | The "data" vocabulary — scan lines, channel splits |
| Tense / edgy | Glitch, VHS, ripple, burn | Instability, digital breakdown |
| Playful / fun | Elastic push, 3D flip, circle iris, clock wipe, swirl | Overshoot, bounce, rotation, expansion |
| Dramatic / cinematic | Zoom through, gravity drop, overexposure, dip to black | Scale, weight, light extremes |
| Premium / luxury | Focus pull, blur crossfade, dip to black, slow morph | Restraint — two scenes flowing into each other |
| Retro / analog | Film burn, light leak, VHS, clock wipe | Organic imperfection, warm color bleeds |

Avoid transitions that create visible repeating geometry (uniform tile grids, hex cells, evenly spaced dots) — the eye instantly sees the grid and it reads cheap. Organic, irregular noise works because it isn't a pattern.

## Motion language

The choreography rules that make motion read as one language instead of a grab bag:

- **Ease-out for everything entering** — expo/quart-out reads confident and calm. Never ease-in on an entrance; it feels laggy. Ease-in is for exits only (accelerating away), and pairs with the incoming beat's ease-out for velocity matching.
- **Enter/exit asymmetry.** Exits run ~60% of the enter duration, travel less distance, and can be opacity-only. The viewer asked for the thing entering; they've already dismissed the thing leaving.
- **Duration scales with distance and size.** A small label gets a short tween; a full-frame panel gets a long one. Two elements traveling together: the one going further gets the longer duration, same ease family.
- **Things enter from where they conceptually come from** and exit toward where they go — a callout from its anchor, a toast from its edge, a discarded idea off the frame.
- **Stagger hierarchies, not lists.** Heading 0ms → subhead +60ms → CTA +120ms → media +150ms. Inside a long list, cap total stagger around 450ms (`delay = min(i × 40ms, 450ms)`) — a 30-item list at 60ms each is 1.8s of waiting, which is a bug, not craft.
- **Transform + opacity are 95% of the toolkit**; clip-path is the third for reveals. Layout properties (width/height/top/left) don't animate — move and scale instead.
- **One signature move per video.** A vertical odometer on numbers, a horizontal wipe on updates, a particular slam — one memorable motif, everything else quiet. Restraint everywhere plus one signature is the single highest-leverage habit.
- **At least 3 different eases per scene** across its entrances (see Frame craft) — uniform easing reads as a template.

## Camera

Even in a flat 2D frame, direct a virtual camera — it's what separates "animated slides" from film:

- **Push-in** = intimacy, focus, "look closer." **Pull-back** = scale reveal, "see the whole." **Pan** = traversal between stations on one oversized canvas. **Rack focus** (blur off-focus layers while the focal element stays sharp) = redirect attention without moving anything.
- **Micro-drift:** a continuous, barely-perceptible slow zoom or drift keeps long holds alive. A perfectly static frame reads as a rendering error.
- Zooming into a non-centered target = scale the world wrapper + counter-translate so the target stays framed. Depth layers moving at different rates during a move sell parallax.
- Camera language that reads institutional/premium: slow push-in, slow dolly, 15° orbit, locked-off hold, rack focus. Reads cheap/gamified: whip zooms everywhere, shake, lens flares, "epic" drift. One camera personality per video.

## Technique palette

Standard motion-design techniques; a competent video uses at least 2–3, matched to its energy:

| Technique | What it gives |
|---|---|
| SVG path drawing | A line/diagram/mark that draws itself, pen-like |
| Procedural canvas | Particle fields, noise, generative backgrounds evolving per-frame |
| 3D transforms | Perspective card flips, tilted planes, depth stacks |
| Per-word kinetic type | Words landing on their spoken onsets |
| Character typing | Terminal/typewriter effects with a blinking cursor |
| Variable font animation | Glyphs reshaping via weight/optical-size axes |
| Motion paths | Elements traveling along arbitrary curves |
| Velocity-matched transitions | Cuts that read as one continuous camera move |
| Audio-reactive motion | Properties driven by the track's frequency bands |
| Clip-path reveal masks | Content sliding through a fixed invisible window |
| Video compositing | Real footage framed, moved, and layered inside scenes |
| Shader/GPU backgrounds | Organic warped-noise fields far richer than 2D canvas |

| Video energy | Combine |
|---|---|
| High impact (launches, promos) | Per-word type + velocity transitions + count-ups |
| Cinematic (tours, stories) | Path drawing + video compositing + 3D transforms |
| Technical (dev tools, APIs) | Character typing + procedural canvas + motion paths |
| Premium (luxury, enterprise) | Variable fonts + slow velocity transitions + restraint |
| Data-driven (stats, metrics) | Procedural canvas + count-ups + path drawing |

Reserve the heaviest effects (GPU shader moments, 3D set pieces) for 1–3 hero beats — not every beat.

## Audio direction

Direction-level calls only; the production discipline — the central SFX pin table, relative pinning, genre-not-event vocabulary, anti-machine-gun technique, and the full beat-sync method — is `references/video-sound.md`. One order governs both: **the picture locks before the sound is pinned.**

- **SFX mark state changes.** One cue per meaningful moment — a shutter click on a capture, a chime on a resolve, a cut-to-silence before a reveal. Silence is a tool: dropping the drone right before the payoff makes the payoff.
- **Music sets the grid.** With a track, cut on downbeats and land hero moments on hits; 3+ rapid cuts should sit on consecutive beats. With VO only, the narration's stress points are the grid.
- **Audio-reactive motion** (driving properties from the track's frequency bands): keep text/logo reactions subtle (≤5% scale pulse, modest glow) — reactive motion on small elements reads as jitter; backgrounds can push 10–30%. The audio supplies *timing and intensity*; the visual vocabulary still comes from the brand. Never: equalizer bars, spectrum analyzers, waveform displays, strobing, rainbow cycling.
- **VO mix:** narration on top, music ducked under it, SFX punctuating between phrases. The script's pauses are where the visuals breathe.

## Scene blueprints

Proven time-coded shot shapes. Instantiate one per beat, or compose freely from the motion vocabulary when none fits — never force a wrong blueprint.

**Title-card reveal** *(3–5s; breather, proof, landing)* — One clean title or single brand/proof card revealed with exactly ONE restrained move (slide-up crossfade, or wipe-away-to-reveal), then a still hold. Low motion is the payload: it resets the viewer's eye between dense beats and gives a stat or lockup room to land.

**Kinetic type beats** *(3–12s; the workhorse — hook, problem, benefits, CTA, outro)* — Flat, centered, bold type where the motion IS the words: a fixed line swaps a token in place by hard cut, or a statement builds across full-screen beats — each phrase its own distinct entrance — onto a spring-pop payoff. Reach for it whenever the words carry the shot and there's no set, surface, or click.

**Data count-up** *(4–12s; hook, problem, intro, feature, proof)* — Numbers and charts are the hero: a count-up ring or headline number, a trend chart drawing itself, a tilted stat grid — traversed by a camera that pushes through (or scrolls across) to land on one hero metric. Count with rounded integers on tabular figures; optionally grow the font size with the value for escalation. Use when the data carries the argument.

**Logo assemble** *(4.5–11s; intro, CTA, outro)* — The brand mark builds itself from parts: elements orbit and assemble, letters cascade in, an outline draws on stroke-by-stroke, or the camera pushes through negative space — resolving into a centered lockup, optionally extended to a URL/CTA. The wordless premium brand sting.

**Comparison split** *(4–6s; feature)* — Two paired items of equal weight enter from opposite wings with mirrored 3D "book-open" tilts and hold side-by-side; an inner-edge badge spring-pops on each to punctuate. For an A/B or "X + Y together" — exactly two items, weighed at once, not sequential steps.

**Device showcase** *(5–11s; feature, intro)* — A device mockup or floating window held as hero while its screens cycle through a real flow, presented by a camera ranging from a static hold to a continuous 3D push. Use to show a feature experienced inside its real interface. Cousin: the cursor-driven demo, where a visible cursor clicks through a reconstructed UI and the camera chases each interaction.

**Grid assemble** *(3–10s; features, benefits, social proof)* — N items (tiles, cards, logos, list lines) self-assemble in a staggered cascade into a grid or vertical list and hold; an optional camera zoom-out reveals the array inside a vaster whole. The shape for enumerating breadth at once — a feature grid, an accumulating benefit list, a logo wall. Cap total stagger (~450ms feel) so long lists don't become waiting.

**Prompt and answer** *(5–12s; hook, intro, feature, CTA)* — A prompt, query, or command types character-by-character into a real product input — chat composer, search bar, terminal, URL bar — and the machine answers: status theater holds the beat, then streaming text, an action log, diff cards, a chart, or a generated artifact arrives. The keyboard is the actor and the product is the responder; any cursor work only primes the input or lands the submit, and every state change after that is the machine's. Cut at the submit and the ask itself is the show. Distinct from kinetic typography (nothing answers) and from a cursor demo (there the pointer causes every change). Most run 7–12s — the response needs room to arrive.

**Agent working theater** *(4–12s; feature)* — One trigger beat — a click, a menu pick, a scan already running — hands the frame to the machine, which then visibly works: a spinner holds, status phrases swap, counters tick. The receipt cascades in and then *mutates*: rows arrive and check off, badges flip, labels strike through. End mid-list — the work reads as ongoing. Use when the state change over time IS the demo; no typed prompt, and at most one igniting click before the cursor leaves.

**Panel live-sync** *(5–12s; feature)* — A bipartite stage: an inspector or editor panel bound to a target surface, where one continuous gesture — value scrub, dropdown pick, handle drag, inline retype — changes the coupled surface in the same beat. Two to four short cause→effect couplets, held on the last edit. The camera's only job is keeping both halves co-visible; it never chases. The shape for "change this, watch it change."

**Scroll to artifact** *(5–12s; feature)* — The frame travels vertically along one long full-bleed surface — a transcript, task feed, or analysis document, no device frame — by camera pan or content scroll; the traversal itself is the evidence. Then ONE focal interaction pivots to the deliverable: a chip click, a quote highlight, a row expand opening onto the artifact. Evidence first, payoff last.

**Zoom-out reveal** *(7–11s; hook, benefits)* — Open tight on one full-bleed detail — a graphic macro or a small UI region — let micro-action play in close-up, then ONE continuous decelerating zoom-out reveals the containing whole; the frame locks wide and element-level payoff carries on. Nothing assembles: the world was whole all along, and the single outward move re-scopes its meaning. The structural inverse of every push-in shape. No zoom-in anywhere in the shot.

## Frame craft

Video frames are not web pages. The brand spec is strict on identity (exact hex, fonts, weight relationships, do's/don'ts) but the *application* is yours — web-UI intensities are invisible on video.

| Element | Web | Video (1080p, scale with composition width) |
|---|---|---|
| Headlines | 32–48px | 84–120px |
| Body text | 14–16px | 44–64px |
| Labels | 12px | 32–40px |
| Decorative opacity | 3–8% | 12–25% |
| Borders | 1px | 2–4px |
| Padding | 16–32px | 60–140px |

These are readability floors, not stylistic suggestions — video is glanced at, not read; small text is decorative at this scale. Match exactly in engine-specific work: `references/video-remotion.md`.

**Measure the floor on the rendered frame, not in the code.** What matters is *effective* height — `fontSize × every ancestor scale × perspective compression` (`cos(rotY)` under a 3D camera) — so a 60px caption inside a container scaled to 0.6 is a 36px caption and fails. Type has exactly two honest states: **texture** (decorative small type inside a screenshot or backdrop, deliberately softened or dimmed so nobody tries to read it) and **meant to be read** (at size, with contrast). The middle state — reflowed "for legibility" but still under the floor — is the failure mode that survives review because it looks like it was handled. Text that can't be read is better deleted. Check by pulling one frame per captioned shot and scaling it to 480px wide: if it isn't legible on a phone in-feed, it isn't legible.

- **Density:** a beat with 3 elements looks empty; 8–10 feels alive. Every scene: background texture (radial glow, ghost type, grain, grid — never flat solid), midground content, foreground accents (dividers, labels, monospace metadata). Add ~2 decorative elements nobody asked for.
- **Color presence:** muted is fine, flat is not — at least one color that pulls the eye per scene. Accents at 15–25% for atmosphere, full saturation for focal hits. On light canvases use bolder borders, structural rules, and texture — don't switch to dark. No full-screen linear gradients on dark backgrounds (they band under H.264); use radial or solid + localized glow. Tint neutrals toward the brand hue.
- **Motion intensity:** subtle reads as static at 30fps — err toward more. Every decorative element gets ambient motion (breathe, drift, pulse, orbit), varied per scene. Scene entrances use 3+ different eases and directions; if everything enters from `y:30, opacity:0`, there is no choreography.
- **Composition:** two focal points minimum. Hero text fills 60–80% of frame width. Anchor content to edges — centered-and-floating is a web pattern. Prefer zone/split layouts over centered stacks. Structural rules and dividers create visual paths and animate well (`scaleX: 0 → 1`).

## Format & aspect

| Aspect | Canvas | Use | Composition notes |
|---|---|---|---|
| 16:9 | 1920×1080 | YouTube, web, decks | Horizontal splits; hero left / data right; widest type measure |
| 9:16 | 1080×1920 | Reels, TikTok, Shorts | Vertical stacks; one idea per screen; type larger relative to frame; hook must survive muted autoplay |
| 1:1 | 1080×1080 | Feed posts | Centered-weight compositions work here (the exception); tightest word counts |

**Safe areas:** keep essential text and logos inside ~90% of the frame on 16:9 (5% inset per edge). On 9:16, platform UI eats the edges — reserve roughly the top 10% and bottom 20%, plus a right-side gutter for action buttons; keep captions and CTAs in the middle 60% vertical band. Design for sound-off: on-screen text must carry the message alone.

Author once per aspect — don't letterbox one master into all three. Recompose: what's a side-by-side split in 16:9 becomes a vertical stack in 9:16.

---

*Distilled from: design-kit, hyperframes-creative, hyperframes-animation.*
