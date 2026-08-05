# Generative Production

*The phased pipeline for a multi-shot generative piece. Nothing generates until the whole plan is approved: config, story, cast, look, and every shot's frozen prompt reviewed as one artifact. Then stills in dependency order, then motion off those stills. The grammar, ledger, model gate, and failure table live in `generative-direction.md`; the prompt craft lives in `generative-stills.md` and `generative-video.md`.*

## Why this is phased, and not a checklist

A generative piece fails in a specific way: shot 1 gets generated because it was easy to start, and every later shot then negotiates against an accident. The fog density, the grade, the exact wardrobe drape, the camera's distance from the subject — all of it got decided by a model that was never told those decisions mattered, and by shot four the only way to keep continuity is to match the mistake.

**The fix is ordering, not effort.** Approve the whole plan while it is still text, where a change costs a sentence. After the first image exists, every change costs a regeneration and a continuity check on everything downstream of it.

| Phase | Produces | Nothing proceeds until |
|---|---|---|
| **0 · Config** | Engines, resolution, aspect, shot count, runtime, delivery | The user has approved the spend and the format |
| **1 · Story** | Beat sheet — shot list with duration and emotional function | The arc reads as a piece, not a set of frames |
| **2 · Cast & assets** | `CHARACTERS.md`, `ASSETS.md` — people, wardrobe, props, all as standalone references | Every recurring thing has a locked reference image |
| **3 · Look** | `WORLD.md` — cinema mode, palette with hex, grade, atmosphere | One look governs every shot |
| **4 · Storyboard** | Every shot as a card: references, anchor, frozen prompt, motion, duration | **The user approves the board as a whole** |
| **5 · Stills** | The keystone first, then the rest in dependency order | Each still is approved before anything inherits it |
| **6 · Motion** | One clip per still, the still as start frame | Each clip holds the frame it started from |
| **7 · Audit** | Continuity pass, assembly, ledger updated | Drift is found by comparison, not by memory |

Phases collapse for small work — a single shot with no recurring character is phases 0, 4, 5, 6 and takes one exchange. **Do not skip phases on a multi-shot piece with a recurring character. That is exactly the job this pipeline exists for.**

## Phase 0 — the config line

One line, agreed before anything else, naming the engine and output spec for each stage:

```
Stills: <engine> at <resolution> <aspect>  ·  Motion: <engine> at <resolution>  ·  7 shots · 25s total
```

The engines come from the model gate in `generative-direction.md` — asked, never assumed. What this line adds is the **output spec travelling with them**: resolution and aspect are set per engine and per stage, and a 16:9 still feeding a 9:16 video is a crop nobody planned. State the shot count and total runtime here too, because that is what the cost estimate is built from.

**Aspect belongs to this line and to the platform UI, never to a prompt body.** Framing inside a prompt stays plain language.

## Phase 1 — the beat sheet

A shot list, in order, each with a duration and a **function**. The function column is what makes it a piece rather than a gallery:

| # | Shot | Dur | Function |
|---|---|---|---|
| 1 | Wide establishing — subject small in the environment | 3s | Set the world and the scale. Everything downstream quotes this frame |
| 2 | Intimate portrait, same subject, same chair | 5s | Collapse the distance. The face the wide shot withheld |
| 3 | Product detail, no people | 3s | The object becomes the subject |
| 4 | Environment beat, no subject | 3s | Let the world breathe; buy time before the turn |
| 5 | Symbolic object, placed | 3s | Introduce the turn without stating it |
| 6 | Same object, displaced | 3s | The turn, stated visually |
| 7 | Wide again — subject absent, world unchanged | 5s | Rhyme with shot 1. The absence is the point |

Two rules earn their place here:

- **Open and close on the same framing.** A piece that returns to its first setup with one thing changed reads as authored. The change carries the meaning; the sameness is what makes it legible.
- **Durations are decided now, not at generation.** Most engines have a hard ceiling per generation, and a beat that needs longer than the ceiling is two clips — which is a storyboard decision, not something to discover mid-render.

Longer-form structure, pacing, and transition taxonomy stay in `video-direction.md`. This is the shot-level plan that sits under it.

## Phase 2 — cast and asset extraction

Characters lock per `generative-stills.md` Step 0, into `CHARACTERS.md`. **The addition here is everything that is not a person.**

A recurring prop, a garment, a vehicle, a logo-bearing object drifts exactly like a face does. Extract each one as a **standalone reference image** before any scene is composed, and record it:

**`ASSETS.md`** — one entry per recurring non-person thing:

```markdown
## prop:silver-can
Locked: 2026-08-04 · source: refs/can-front.jpg (user-supplied) · asset: assets/can-ref.png
Prompt descriptor: "a slim silver aluminium can with a red band"
Detail: brushed aluminium body, condensation beading, red horizontal band at the upper third,
        no legible text rendered
Appears in: shots 2, 3

## wardrobe:cream-quarter-zip
Locked: 2026-08-04 · source: refs/outfit-01.jpg · asset: assets/outfit-ref.png
Prompt descriptor: "an oversized cream-white quarter-zip sweatshirt"
Detail: premium heavyweight cotton, relaxed fit, soft folds, natural draping, no visible branding
Appears in: shots 1, 2, 7
```

Three reasons this is its own phase and not a line in the prompt:

- **An extracted asset is an input, not a description.** A prop described in words is re-invented every generation; a prop attached as a reference image is copied. The difference is the whole continuity story.
- **The extraction pass finds the gaps.** Listing every recurring object forces the question "what does the back of that look like?" before shot 5 needs it.
- **`Appears in` is a dependency map.** When a prop's reference changes, that column tells you exactly what has to be regenerated.

Brand-bearing objects get described **generically** in the prompt text while the reference image carries the specifics — see the pre-flight in `generative-direction.md`.

## Phase 3 — the look lock

One cinema mode for the whole piece, from `generative-direction.md`, plus the palette derived (never invented) and written to `WORLD.md` with hex values. A piece that changes mode between shots reads as two productions cut together — deliberate mode stacking exists, but it is a decision made here, not a drift discovered in phase 5.

Lock the **grade sentence** too: the one or two lines about color response that every prompt will close with. It is quoted verbatim into every shot, which is what makes seven separate generations look like one shoot.

## Phase 4 — the storyboard, and the approval that matters

**This is the artifact the user approves, and it is the point of the whole pipeline.** Every shot, fully specified, presented together — before a single generation runs.

One card per shot:

```
### Shot 2 · 5s · intimate portrait
Anchor:      shot-1 (approved)  — composition, grade, fog density, wardrobe drape
References:  character:lead · wardrobe:cream-quarter-zip · prop:silver-can · shot-1
Engine:      <stills engine>  →  <motion engine>
Still prompt:
    [the full frozen text, exactly as it will be sent]
Motion:      static shot, subject raises the can to his lips and drinks, gaze off to the fog,
             handheld tremor alive, amber bokeh behind
Function:    collapse the distance the wide shot kept
```

Four fields do the load-bearing work, and none of them are optional:

**The anchor.** One already-approved image that this shot must match for composition, lighting, color grade, and atmosphere. Naming it converts "keep it consistent" — which a model cannot act on — into an input it can copy. For shot 1 there is no anchor; that is what makes shot 1 special.

**The reference stack, listed explicitly.** Exactly which images attach for this generation, by ledger handle. `character:lead · wardrobe:cream-quarter-zip · prop:silver-can · shot-1` is a checklist at generation time and an audit trail afterwards. A shot that came back wrong is nearly always a shot whose stack was short one entry.

**The frozen prompt.** Written in full, at storyboard time, in the text the model will actually receive. Once the board is approved, **the prompt does not change** — not to "improve" it, not to fix something you notice while generating. A changed prompt is a changed shot and goes back through the board. If a prompt genuinely must change, say so, show the delta, and re-approve that card.

**The motion line, written now.** Even though it is not used until phase 6. Writing it at storyboard time is what catches the shot whose still is beautiful and whose motion is nothing — a static frame with no verb in it is a still, and should either earn a movement or be cut.

Present the whole board. Take corrections. **Then** generate.

## Phase 5 — stills, in dependency order

**The keystone first.** Shot 1 — or whichever shot the others anchor to — is generated, reviewed, and approved alone. It is not one of seven; it is the thing the other six inherit. Iterate it until it is right, because every later shot will carry its decisions.

Then the rest, each with its full reference stack, each anchored. Review each against its anchor before moving on. Two failures are worth naming because they are the common ones:

| Symptom | Cause | Fix |
|---|---|---|
| Shot 4 looks like a different day than shot 1 | Anchor named in the board but not actually attached at generation | Re-run with the anchor in the stack. This is a process failure, not a prompt failure |
| The prop is recognisably not the same prop | Prop described in text instead of attached as a reference | Attach the `ASSETS.md` reference and cut the prop's description down to placement |

Everything else in the failure table in `generative-direction.md` applies unchanged.

**Store each generated asset's exact prompt beside it.** The board is the plan; the sidecar is the record of what actually produced the file.

## Phase 6 — motion, off the approved still

**When an engine accepts a start frame, the video prompt collapses to motion only.** This is the single highest-leverage move in the pipeline and it inverts how the prompt is written.

The still already carries composition, wardrobe, lighting, grade, atmosphere, lens character, and the entire environment — all of it approved. Re-describing any of that in the video prompt invites the model to re-interpret what it should be preserving. So the video prompt says what *moves*, and nothing else:

```
(3s) static shot, he lifts his hand and takes a sip, the ship's drift almost imperceptible
(5s) static shot, subject raises the can to his lips and drinks, gaze off to the fog, handheld tremor alive
(3s) static shot, handheld tremor alive
(5s) static wide — the coupe starts, reverse lights flicker, it pulls forward and exits frame right,
     the empty chair and the beach remain, camera holds
```

Four rules for motion lines against a start frame:

- **Name the verb, not the picture.** The picture is the input. Everything you add about the picture is a chance to lose it.
- **"Handheld tremor alive" is a real instruction.** A locked-off generative shot often reads as a still with noise on it. A named micro-movement is what makes it read as footage.
- **Give near-static shots something to do**, even if it is a flag, a wave, breath, or drifting fog. A completely still shot wastes its runtime.
- **State what must *not* move.** "the ship not moving", "camera holds", "the chair remains" — a video model will happily animate the background you needed anchored.

**When the engine has no start-frame path**, fall back to the full three-part prompt in `generative-video.md` — and expect continuity to be materially harder, which is a fact worth telling the user at the model gate rather than at shot four.

## The edit prompt — a fourth asset kind

Some shots are not generated, they are **altered from a frame that already exists**. Shot 7's "the same wide, with the person gone" is not a new composition; it is the approved shot 1 with one thing removed.

The prompt for this is short and absolute:

```
Remove the person, leave the seat empty. Keep everything else exactly the same.
```

Three rules: **name one change**, **say "keep everything else exactly the same"** in those words, and **never re-describe the scene** — a re-description is an invitation to re-render it. Edits chain badly, so an edit always runs against an approved original rather than against another edit.

This is how a piece gets its rhyme shots — the same frame, one element changed — with a fidelity no re-generation can match.

## Phase 7 — the continuity audit

Before assembly, lay the stills out together and compare **across** shots rather than judging each alone:

- Wardrobe, props, and identity markers — same in every shot they appear in, per the `Appears in` columns.
- Light direction and time of day — consistent, or deliberately progressing.
- Grade — one response across all frames. This is what a viewer reads as "one production" without knowing why.
- Environment persistence — the background elements that should be fixed have not wandered.

Then assemble to the beat sheet's durations, and **update the ledger with what shipped**: which prompt produced which asset, which phrasings fixed which failures, which engine won which comparison. The next piece starts from a lock, not from a memory.

---
*Distilled from: banana-pro-director, cinema-worldbuilder (vendored in `library/higgsfield-directors/`), plus a worked multi-shot production brief supplied by the user — anchor-and-stack referencing, prompt freezing, start-frame motion collapse, and the edit prompt come from that source.*
