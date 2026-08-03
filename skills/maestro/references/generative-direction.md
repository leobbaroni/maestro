# Generative Direction

*The shared grammar for prompting image and video models: one cinematography vocabulary, one continuity ledger, one photoreal stack, one pre-flight. Everything here governs both output surfaces — `generative-stills.md` and `generative-video.md` — so it is stated once and never restated.*

## What this family is, and when it leads

A different discipline from the rest of maestro's video work. Everywhere else the deliverable is **code that deterministically renders frames** — Remotion compositions, HyperFrames HTML, shot cards with tuned parameters. Here the deliverable is **text a generative model interprets**, and the same text run twice returns two different images. Determinism is gone; the craft moves into locking what must not vary and describing what should.

| Job | Lead |
|---|---|
| Character reference, outfit base, model sheet, environment plate, photoreal still | `generative-stills.md` |
| Prompted video shot or sequence from a text description and reference images | `generative-video.md` |
| Story spine, beat planning, pacing, transition taxonomy for any of the above | `video-direction.md` — still the planning layer; it decides *what* the shots are, this family decides how to ask for them |
| Product demo built from a real app's screenshots | `video-shotcraft.md` — capture beats generation for a UI that already exists |
| Anything that must be frame-exact, versionable, or re-renderable | `video-remotion.md` / `video-hyperframes.md` — a generative model cannot hit a spec twice |

The two families compose rather than compete: generative plates make excellent establishing shots and backdrops *inside* a programmatic edit, and a locked character sheet is reusable art direction no renderer can produce.

**Photoreal is the default posture.** Every prompt describes a real subject in a real frame — never plastic, never CGI, never commercial gloss. Stylization is an explicit override the user asks for, noted in the ledger when they do.

## The continuity ledger — the lock has to outlive the conversation

Identity locking is the whole value of this family, and a lock held only in conversation dies at the next context reset. **Write it down.** Two files at the project root, appended as specs lock:

**`CHARACTERS.md`** — one section per character:

```markdown
## silver-runner            <- internal handle; never appears in a prompt
Locked: 2026-07-28 · from: refs/runner-01.jpg, refs/runner-face.jpg
Prompt descriptor: "the rose-pink braided woman in the cropped white ribbed tank"
Face: sharp almond eyes, cool grey iris · high straight brow · narrow nose bridge · warm fair skin, matte finish
Hair: rose-pink, mid-back length, box braids, centre part, baby hairs at the hairline
Body: slim build, long limbs, squared shoulders · small hoop in the left helix
Default makeup: skin-tint base, soft brow, sharp thin liner, neutral gloss lip
Default expression: level, closed-lip, eyes to camera
Outfits:
  - street-01: cropped white ribbed tank · light-wash baggy cargos · tan suede work boots · silver hip chain
    base reference: assets/base-street-01.png · sheet: assets/sheet-street-01.png
```

**`WORLD.md`** — one section per location: architecture and materials, time of day and weather, set dressing, the palette with hex values, the cinema mode assigned to it, and which plates exist.

Three rules make the ledger worth keeping:

- **The ledger is the source of truth; the prompt is composed from it.** At session start, read it back before composing anything. Mirror the relevant lock to the user in plain language and let them correct it — a stale ledger is worse than none.
- **Anything not in the ledger and not in the user's message is a question, not an invention.** A new scene needing an outfit the ledger doesn't have gets asked about. This is maestro's evidence discipline applied to art direction: what you didn't read, you don't know.
- **The `Prompt descriptor` line is the only name the model ever sees.** Handles are for you and the user.

Append what worked, too. When a re-roll finally lands, record the phrasing that fixed it next to the outfit — that line is worth more than the spec around it.

**The prompt travels with the asset.** The thread that wrote a prompt knows what the image contains, why, and how it is meant to sit in the work; a later session composing with that asset has none of it. So store each generated asset's exact prompt beside it — a sidecar file or a column in the ledger — and read those prompts before building anything on top of them. When a subagent produces assets, the prompt is part of what it returns, not a detail it consumed. Prefer generating anything build-critical in the thread that will use it.

**If you ever prompt for a designed page rather than a scene, state the skeleton literally.** Nav bar and its items, headline block and its scale, each section in order, the footer. A prompt that leads with atmosphere gets atmosphere back — the model paints the fish market instead of the fish market's *website*. Self-check the render: if it could hang as a poster, or reads as a photograph with some text on it, it isn't a page; regenerate with the layout scaffold stated more plainly.

## The five cinema modes

One camera vocabulary across stills and video, so a plate and the shot it feeds share visual DNA. Pick the mode from the scene, then pull its spec whole — mixing halves of two modes produces the averaged, characterless grade this grammar exists to avoid.

| Mode | Scene | Body | Lens | Movement | Filtration | Grade & palette |
|---|---|---|---|---|---|---|
| **M1 Narrative** | Real-world dramatic — streets, kitchens, cars, bars, interiors, exteriors; anywhere lived-in | Alexa 35 | Panavision Ultra Vintage 2× anamorphic 40/55/75/100mm T2.3 | Handheld with natural breath, slight shake, occasional slow dolly | Black Pro-Mist 1/4 | Kodak Vision3 250D, 800 ASA, teal-amber split — cool shadows, warm highlights, blacks not crushed |
| **M2 Studio / Editorial** | White void, clean set, editorial portrait, fashion film, hyperpop saturation — *crafted* rather than photographed | Alexa Mini LF | Cooke S4/i spherical 32/50/75/100mm T2 | Locked-off, optional 4–6″ slow push | Black Pro-Mist 1/2 + Glimmerglass on chrome and rhinestone | Saturated editorial, pushed magentas or pastels, warm-retained blacks, Cooke skin warmth, 400 ASA |
| **M3 Action / Combat** | Combat, chase, stunts, mechs, debris, smoke, destruction | Alexa 35 | Panavision Ultra Vintage 2× anamorphic 40/55/75/100mm T2.3 | Handheld and shaky **throughout** — constant micro-jitter, reactive, often orbital; no stabilized shot anywhere | Black Pro-Mist 1/4 | Kodak Vision3 250D, 800 ASA, documentary-meets-sci-fi grit, dusty haze, palette per scene |
| **M4 Performance / Concert** | Stage, arena, festival pit, jumbotron, lightstick crowd | Alexa 35 | Panavision Ultra Vintage 2× anamorphic 40/55/75/100mm T2.3 | Mixed pit-photographer handheld, low-angle shake, orbital passes, hard cuts | Black Pro-Mist 1/4 | Kodak Vision3 250D fine grain, desaturated cool with warm bloom, stage-lighting cast, heavy haze, sweat sheen |
| **M5 Atmospheric / Empty** | Abandoned, no-humans, landscape, weather, world-establishing — the environment *is* the subject | Alexa Mini LF | Panavision Ultra Vintage 2× anamorphic 35→85mm T2.3 | Locked-off or extremely slow push/pull; never handheld | Black Pro-Mist 1/4 | Kodak Vision3 250D, 400 ASA, palette-driven with named hex values, strong negative space, weathered material |

All five run **24fps at a 180° shutter**. A slow-motion beat is an intercut 96fps frame at the impact, shutter held at 180° so the blur stays natural — never a change to the base rate.

**Lens by framing, across all modes:** 32–40mm wide establishing, full body, groups · 50–55mm medium, two-shot, waist-up · 75mm tight portrait, single-character isolation · 85–100mm extreme close — eyes, lips, jewelry, fabric. Default to 55mm (M1/M3/M4) or 50mm (M2) when the framing isn't specified; M5 lives at the wide end.

The five paste-ready camera blocks — the full sentence each mode contributes to a prompt, with lens and runtime slots — are in `library/higgsfield-directors/cinema-worldbuilder.md`. Pull the one for the chosen mode verbatim; they are tuned text, not a summary to paraphrase.

**Stacking modes.** A sequence that cuts between worlds — a white void intercut with a kitchen, action intercut with performance — gets **one camera block per shot, per its own mode.** Averaging two modes into one grade destroys the cut, which was the point of cutting.

## The photoreal stack

Every prompt closes with this block. It is the texture floor, not a flourish:

```
Hyperrealistic photography. Real human skin texture with visible pores, subtle subsurface scattering on the cheeks, nose bridge, and ears, fine peach fuzz catching light along the jawline and cheekbones, slight skin imperfections — natural unevenness, not retouched. Hair rendered strand by strand with realistic flyaways, baby hairs at the hairline, individual strands catching light, light transmission through the hair ends, natural texture and movement. Fabric rendered with real weave detail, real weight, real drape, visible texture variation across the surface. Eyes with real reflection, real moisture, real depth in the iris. Jewelry with real metal surface detail and tarnish or polish appropriate to the piece. Kodak Vision3 500T film emulation, visible fine film grain, subtle chromatic aberration at the edges of the frame, soft lens vignette, cinematic color grade with warm mid-tones and slightly cooled shadows. Lived-in, not pristine. Photographic, not rendered.
```

For a plate with no people, drop the skin and hair sentences and keep fabric, light, lens, grain, and grade. When a model preserves reference fidelity natively from an uploaded image, the stack is **omitted** — describing texture it is already copying only gives it room to drift (see the composite path in `generative-stills.md`).

## Reading reference images

Extract by **visual description only**. Never a name, never a detail that isn't in the frame.

| Layer | Capture |
|---|---|
| Hair | Colour with every nuance (platinum, jet black with cool undertone, rose-pink, ash brown), length, texture, parting, styling (slicked, blown out, braided, bunned, which kind of bangs), accessories |
| Makeup | Skin finish (matte, dewy, glass, bare), coverage, brow shape and density, eye treatment, lashes, lip finish and colour, cheek work, face jewelry. Freckles and beauty marks **only if visible** |
| Wardrobe | Every garment top to bottom — fabric, colour, fit, structural detail (cutouts, ribbing, knit, denim wash, leather finish, mesh), neckline, sleeve and hem position, layering, branding described generically |
| Jewelry | Every piece — earring style, necklace count and material, rings, bracelets, body chains, belts, bag, eyewear, watch |
| Body markers | Piercings and tattoos **only if visible**, nail length and colour, distinguishing features |
| Pose and energy | Body angle, weight distribution, hand position, expression register |
| Environment | Interior/exterior, architecture, materials, scale · time of day, light direction and colour temperature, weather, atmosphere · set dressing, props, vehicles, signage, vegetation, crowd · palette |

### Deriving a palette instead of inventing one

M5 asks for named hex values, and a palette guessed from memory is the same failure as a version guessed from memory. Derive it from a source: run `design-dna.md`'s extraction against the reference image or an existing plate and take **four to eight anchors** — dominant surface, secondary surface, deepest shadow, brightest highlight, and one or two accents that carry the scene's identity. Write them into `WORLD.md` next to the location so every later plate and shot of that place quotes the same numbers. If there is no source image, say the palette is being invented and get it confirmed before it becomes the lock.

## Pre-flight — run this on the finished text, every time

Read the composed prompt back and check the output itself, not your intention:

1. **No proper names.** Models don't know them, and a name near a person description is the classic false-positive trigger for identity filtering. Descriptors survive across prompts; names never did anything.
2. **No real brand names or protected IP.** "Black three-stripe athletic sneakers", not the brand. Chat with the user freely; the prompt output stays generic.
3. **No age words.** Not *boy, girl, child, kid, young, teen, little, middle-aged, elderly, old*. They add nothing a body-and-wardrobe description doesn't, and they push an adult subject toward a minor-safety misclassification. Describe by role, build, and clothing. **These pipelines depict adults only** — a brief that would put a minor in a photoreal generated frame is one to decline, not to rephrase.
4. **No invented detail.** Every visual fact traces to a reference image, the ledger, or the user's words.
5. **Pure visual description.** No meta-commentary on why the frame is composed that way, no reference to the medium, no emotional intent. Every word names a thing visible in the frame.
6. **Self-contained.** No "as established earlier", no "matching the previous scene". Each prompt re-states everything it needs.
7. **No negative prompt block, no aspect ratio, no image placeholders** in the prompt body. Framing is plain language — "full body", "chest-up", "wide establishing". Aspect and image attachment belong to the platform UI.
8. **Wardrobe by construction, not by exposure.** Describe cut, fabric, and fit; adjectives about how much skin shows read as intent and get filtered.

A prompt failing any line gets fixed before it ships, not after the render disappoints.

## Plan the batch before composing the first prompt

A brief is rarely one asset. Composing prompts one at a time is how the cinema mode drifts between the plate and the shot it was supposed to match, and how the third outfit stops looking like the first.

**Emit an asset manifest first** — a table the user approves before any prompt is written:

| # | Asset | Kind | Character / location | Mode | Depends on |
|---|---|---|---|---|---|
| 1 | runner base, street-01 | still base reference | silver-runner | M2 | character lock |
| 2 | runner sheet, street-01 | 6-panel | silver-runner | M2 | 1 |
| 3 | rooftop night plate | environment plate | rooftop-north | M1 | palette from WORLD.md |
| 4 | rooftop approach, 8s | video shot | silver-runner @ rooftop-north | M1 | 1, 3 |

Three rules the manifest enforces that per-prompt work cannot:

- **Lock the cinema mode once, at the manifest level.** Everything that will be cut together shares it. A still that feeds a video shot inherits that shot's mode — that pairing is the reason both surfaces share one grammar.
- **Respect the dependency order.** A model sheet needs an approved base; a shot needs its character locked and its location plated. Building out of order means rebuilding.
- **Name the whole set before pricing it.** Generation costs money and time per asset; the user should see the count before the first one runs, not discover it at asset nine.

Then compose down the list, confirming each prompt before delivering it. Keep the manifest updated with what exists — it is the shot list and the progress tracker in one.

## When the model disobeys

Generative failure is normal and mostly diagnosable. Re-rolling the same prompt is the least informative response available. **Change one variable per attempt** and record the fix in the ledger.

| Symptom | Actual cause | Fix |
|---|---|---|
| Multi-panel sheet merges cells, or bleeds one pose across two | Grid under-specified — the layout was described but the panels weren't individually labelled by position | Restate every panel with its explicit position label; if it still merges, drop to four panels or split into two sheets |
| Identity drifts between panels of one sheet | Identity was described per-panel, so each description was read as a different person | Move the full identity into the opening paragraph, described once; each panel then names only what differs — stance, angle, framing |
| Studio backdrop comes back grey or gradient | "White seamless" alone under-constrains it | Add the negatives as positives: no shadow falloff to grey, no visible seam line, perfectly even backdrop |
| Wardrobe details appear that nobody specified | The gap is upstream in the spec, not in the prompt — the model filled a hole the ledger left | Re-lock the outfit with the missing layer named, then recompose |
| Face doesn't match the character reference | A composite prompt was polluted with description; the model blended the text with the image instead of copying the image | Strip the composite instruction to its minimum — reference images carry identity, text only says where to put it |
| Camera stabilizes in a mode that demands handheld | Movement words in the action description contradict the camera block | Purge "smooth", "glide", "steady", "locked" from everything except the block, and restate the shake as continuous |
| Generated audio includes music | A genre, mood, or score word leaked into the audio line | Cut it to physical sources only — see the diegetic rule in `generative-video.md` |
| Sequence runs long or short | Per-shot timings don't sum to the stated total | Re-derive the shot timings from the total and restate both |
| Texture reads plastic despite the stack | Competing instruction — a "clean", "polished", "perfect", or "flawless" adjective elsewhere is overriding it | Remove the adjective; the stack cannot outvote an explicit request for perfection |

Two escalations worth knowing: when three variations fail the same way, the problem is the spec rather than the phrasing — go back to the ledger. And when a model repeatedly refuses a legitimate brief, re-read the pre-flight above; it is almost always a name, a brand, or an age word.

---
*Distilled from: banana-pro-director, cinema-worldbuilder (both vendored in `library/higgsfield-directors/`).*
