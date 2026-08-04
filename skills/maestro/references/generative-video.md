# Generative Video

*Prompting a video model from a scene description and reference images: one continuous paragraph in three labelled parts, a camera block pulled whole from the scene's cinema mode, a runtime stated in three places, and diegetic audio only. The shared grammar, ledger, pre-flight, and failure table live in `generative-direction.md`; read that first.*

## The loop

1. **Reference material in** — character images, environment plates, wardrobe shots, mood references. A purely environmental scene needs none.
2. **The scene described** — who is in frame, what they do, where, what happens, how long. The mode follows from the scene unless the user names one.
3. **Pre-prompt confirmation** — five lines, then wait.
4. **The prompt out** — a title line naming the runtime, then one fenced code block.
5. **Run it on the platform** — the same reference images attach there, not in the prompt text.

The prompt is text only. It pairs with the reference library; it never replaces it.

### The character gate — once per session

The first time a video prompt is asked for, ask once:

> Any recurring characters in this batch? If so, are they already built — do you have reference images locked — or do we develop them first?

**Built** → get the references, study and lock, mirror the spec back, write it to `CHARACTERS.md`, carry it for the session. **Needs developing** → run the character-lock flow in `generative-stills.md` first; a character invented inline in a video prompt cannot be reproduced in the next shot. **No recurring characters — one-off, extras, pure environment** → skip the gate.

Asked once. Character context carries, and the ledger carries it further than the session does.

## The pre-prompt confirmation

Every **new** scene gets five lines before the full prompt:

```
Here's what I'm about to prompt:
— Mode: [M1 Narrative / M2 Studio / M3 Action / M4 Performance / M5 Atmospheric]
— Scene: [one line]
— Characters: [who's in frame by visual marker, or "none / environment plate"]
— Camera: [lens length, key movement — e.g. "55mm anamorphic, handheld with slight breath"]
— Runtime: [Xs single shot, or Xs across N shots with per-shot beats]
Sound good?
```

**Skip it** when the user is iterating on a prompt just delivered (tighter camera, different time of day, all-black wardrobe, push the lens to 75mm, add a slow push-in), when they pre-confirmed a batch as a whole, or when they said to skip it. For a new scene it is not optional.

**Never assume a runtime.** If it wasn't specified, the Runtime line reads `[need to confirm — how long?]` and the message ends by asking. There is no sensible default: 5s and 15s are different films.

## Output format

One **continuous paragraph** with three inline bolded labels, then the camera block, then the audio line. No line breaks inside it once delivered, no headers, no dividers — the labels are the only structure.

```
Style & Mood: [genre register, emotional tone, visual reference points in one or two sentences].

Dynamic Description: [everything that happens across the duration — action, gesture, camera move, focus rack, light change. Multi-shot sequences label each shot inline with its time range and use an explicit cut trigger. Describe physics, not commentary. One continuous flow.]

Static Description: [everything that does not change — characters in full visual detail from the references, environment in full visual detail, anchored props. This is where the ledger's descriptors land.]

[The camera block for the chosen mode, lens length and runtime filled in.]

[The diegetic audio line.]
```

Delivered under a title line that states the runtime:

- `**Video prompt — 15s**`
- `**Video prompt — 15s, 3 shots**`
- `**Video prompt — 15s, EN+ZH**`

**English by default.** Bilingual only on request, and then as **two separate code blocks** under one title — never two languages blended inside one prompt. The second block is a faithful translation with every camera, mode, and audio spec preserved.

## Runtime and per-shot timing

The runtime appears in **three places and they are the same number**: the title line, the pre-prompt confirmation, and the camera block at the end of the prompt. The title is for the user's glance; the spec block is for the model.

When one prompt holds several shots stitched with hard cuts, **label each shot inline in the Dynamic Description with its time range**, and make them sum to the total:

> Dynamic Description: Shot 1 (0–3s): the woman in the cropped white tank steps off the curb onto wet pavement, camera tracking at chest level with a slight handheld breath. Hard cut to Shot 2 (3–8s): tight close-up on her hands in her front pockets, fabric grain visible, streetlight raking an amber rim along her knuckles. Hard cut to Shot 3 (8–15s): pull back to a wide low angle as she crosses the empty intersection, tail lights smearing through soft focus…

Cut triggers are explicit — *hard cut to*, *smash cut to*, *match cut on*. A sequence that doesn't name its cuts gets edited by the model's guess.

**Stacked modes get one camera block each.** A sequence intercutting a white void with a kitchen, or action with performance, writes each shot's block to its own mode. The contrast across the cut is the effect; averaging the two grades deletes it. Shots sharing one mode share one block, with the per-shot timings inline.

### One prompt or several?

A sequence can be written as one multi-shot prompt or as several single-shot prompts, and the choice is not cosmetic — it decides what the model is allowed to keep consistent.

**One prompt, several shots** when the cuts are the point: the shots share a location and a continuous action, the timing between them matters, and you want the model to carry lighting and identity across the cut. This is the default for a beat that reads as one moment.

**Separate prompts, one shot each** when the shots are independent takes — different locations, different characters, non-adjacent moments — or when any single shot needs its own iteration. A shot you'll re-roll four times should not be trapped in a prompt with three shots you were happy with.

**Always separate** when the shots use different cinema modes and you want a hard tonal break, or when the sequence is long enough that per-shot control matters more than continuity. Splitting costs continuity; keeping them together costs control. Choose whichever loss the scene can absorb.

### A worked prompt

M1, three shots, 15 seconds, one location:

> **Video prompt — 15s, 3 shots**

```
Style & Mood: Documentary-grit cinematic realism with a slow-burn observational register, the camera as a witness rather than a participant, patient framing that lets the moment arrive rather than chasing it. Dynamic Description: Shot 1 (0–4s): the rose-pink braided woman in the cropped white ribbed tank steps off the curb onto wet pavement, weight settling into the first stride, the camera tracking her at chest level with a slight handheld breath, focus holding on her shoulders as the street lights streak behind. Hard cut to Shot 2 (4–9s): tight close-up on her hands pushed into her front pockets, the cargo fabric grain visible under a raking amber streetlight, knuckles catching the rim, a slow focus rack from the fabric to the silver hip chain. Hard cut to Shot 3 (9–15s): pull back to a wide low angle as she crosses the empty intersection, tail lights smearing through soft focus in the background, her silhouette holding the centre third while the camera drifts a few inches left with the operator's natural sway. Static Description: The figure wears a cropped white ribbed cotton tank with a raw hem, light-wash baggy cargo trousers stacking over tan suede work boots, a silver hip chain at the left hip, small silver hoops. Rose-pink box braids to mid-back, centre parted, baby hairs at the hairline. Warm fair skin with a matte finish, sharp almond eyes, soft brow, neutral gloss lip, level closed-lip expression. The location is a four-way city intersection after rain, asphalt holding standing water and reflecting sodium streetlight, low commercial storefronts with shuttered grilles on both corners, a traffic signal on a cantilever arm overhead, scattered litter at the kerb line, no pedestrians, deep night with the sky washed out by light pollution. Shot on ARRI Alexa 35 in ProRes 4444 LogC4, Panavision Ultra Vintage 2x anamorphic 55mm at T2.3 with Tiffen Black Pro-Mist 1/4 filter, handheld with natural breath and slight shake, photoreal cinematic grit with oval bokeh and horizontal streak flares, warm anamorphic falloff toward frame edges, Kodak Vision3 250D film emulation grade with slight halation on highlights and 800 ASA grain structure, teal-amber color split with cool teal-blue shadows and warm amber highlights, organic lens breathing on focus racks, shallow depth of field, 24fps base shutter 180 degrees, total runtime roughly fifteen seconds. Audio: diegetic only — boots on wet pavement, fabric whip on movement, a sharp inhale on the first stride, distant traffic hum with layered horns, faint subway rumble below grade, water dripping from a shutter grille, wind cutting between buildings, no music, no dialogue except what is physically spoken in frame.
```

Read what that example is doing: identity and location live entirely in Static Description and come straight out of the ledger; Dynamic Description carries only what changes, with each shot's time range labelled and each cut named; the camera block is quoted whole from M1 with the lens and runtime dropped in; and the audio names seven physical sources and no feelings. The timings sum to fifteen, which matches the block and the title.

## Diegetic audio only

Video models generate audio natively, and the audio line describes **only what the scene physically produces**. Never music, lyrics, song or artist names, soundtrack cues, or score. Music arrives later as a separate track the user lays under the cut.

**In scope:** footsteps with the surface named (wet pavement, gravel, polished floor, wood) · fabric movement, rustle, whip on motion · breath — steady, ragged, held, sharp inhale · body sounds — hand on skin, grip on metal, jewelry chime, hair movement · object sounds — door, glass, paper, ceramic, electronics, mechanisms · environmental ambient — room tone, wind, rain, traffic hum, distant horns, subway rumble, water, fire · sci-fi diegetic — servo whine, charging hum, impact, debris fall · crowd — cheering, gasps, unison footsteps, phone notifications · stage — strobe hum, mic handling noise, in-ear cable rustle, floor creak, haze machine hiss · weather — rain on the lens, wind through structures, distant thunder, snowfall hush.

**Out of scope:** song, artist, or album names · lyrics or sung vocals · "music plays", "soundtrack swells", "the song builds" · score descriptors — orchestral, synth pad, dramatic strings · genre cues — a beat dropping, a guitar line.

```
Audio: diegetic only — [4–8 specific sounds with adjectives], no music, no dialogue except what is physically spoken in frame.
```

> Audio: diegetic only — boots on wet pavement, fabric whip on movement, sharp inhale, distant traffic hum with layered horns, faint subway rumble below grade, rain hiss against the lens, wind cutting between buildings, no music, no dialogue except what is physically spoken in frame.

A mood word is the usual leak — "tense", "triumphant", "eerie" pull the model toward score. Name the source, not the feeling. Sound *design* for a programmatically rendered film is a different discipline entirely: `video-sound.md`.

## Prompt rules specific to this surface

The pre-flight in `generative-direction.md` applies in full. On top of it:

1. **Energy over position.** Describe what bodies and forces are *doing*, not where they sit in frame. Physics beats geometry — a video model animates verbs.
2. **Every prompt is standalone.** No "as established", no "matching the previous scene". Re-state every visual detail fresh, pulled from the ledger.
3. **No commentary on the shot.** Not "the contrast is the read", not "this sells the moment", not "vlog energy". Every word names something visible.
4. **The camera block is quoted, not paraphrased.** It is tuned text; a reworded version is a different instruction.
5. **Slow motion is an intercut, not a base rate.** `intercut a 96fps high-speed slow-motion frame at [the moment], holding shutter at 180 degrees for natural motion blur even in slow motion` — inside the camera block, leaving 24fps intact.

## Pairing with a still

When a plate already exists for this scene, **the video inherits the plate's cinema mode** — that shared grammar is why the two families exist as one. Ask which mode the plate used if it isn't in `WORLD.md`, then lock the matching block. A plate and a shot in different modes read as two productions.

Working the other way, a shot that needs an environment nobody has plated yet is a signal to build the plate first: it is cheaper to iterate a still than a video, and the approved plate becomes the reference image the shot is generated against.

## Platform adapters

**The prompt format above is engine-neutral.** Shot structure, the camera block, the diegetic audio rule, runtime discipline, and the standalone-prompt rule hold on any video model. What varies per engine is a short list — establish it for whichever engine the user picked at the model gate (`generative-direction.md`), and record it in `MODELS.md`:

| Adapter slot | What to establish | Why it bites |
|---|---|---|
| Reference attachment | UI upload · library selection · `@image` tag · API field | A shot generated without its plate attached is a different shot |
| Aspect ratio | UI setting or prompt parameter | If it is a UI setting, framing stays plain language |
| **Native audio** | Generated, absent, or optional | **Decides whether the diegetic rule is load-bearing or dead weight.** An engine with no audio track means the audio line is wasted prompt budget; one that generates audio means a leaked genre word scores your scene |
| Max runtime per generation | The hard ceiling | Sets where a sequence has to be cut into separate generations |
| Image-to-video | Supported, and how the still is passed | Determines whether "plate first, then shot" is available at all |
| Camera control | Prompt-described, or explicit parameters | Some engines take movement as structured input rather than prose |

**Runtime and image-to-video support are the two that reshape the plan**, not just the prompt — check them before the manifest is priced, not after a shot comes back truncated.

### Worked example — Higgsfield Seedance

One filled-in instance, not a default. Verify before relying on it.

- **Prompts are text-only.** Reference images attach in the Higgsfield UI, or are selected from the character/environment library there. No `@image` tags, no `<<<image_n>>>` placeholders.
- **Aspect ratio is a UI setting**, never a line in the prompt.
- **Audio is generated natively** — which is exactly why the diegetic rule is load-bearing rather than stylistic here.
- The five camera blocks are in `library/higgsfield-directors/cinema-worldbuilder.md`, written for Seedance and pasted verbatim with the lens length and runtime filled in. **On another engine they are a starting point, not tuned text** — a block tuned for one model is prose to another, so re-verify that the camera actually did what it says before trusting it across a sequence.
- Stills built on the same platform feed it directly as reference assets: `generative-stills.md`.

The full original director is `library/higgsfield-directors/cinema-worldbuilder.md`.

---
*Distilled from: cinema-worldbuilder (authoritative — prompt format, runtime discipline, diegetic audio, mode stacking).*
