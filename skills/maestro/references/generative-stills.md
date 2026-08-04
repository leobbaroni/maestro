# Generative Stills

*Prompting image models for character and environment assets: a base reference, a multi-angle sheet off it, plates, and detail portraits — in that order, because each one locks what the next inherits. The shared grammar, ledger, pre-flight, and failure table live in `generative-direction.md`; read that first.*

## The order is the discipline

Four asset kinds, and the sequence is not a preference:

| # | Asset | Produces | Gate |
|---|---|---|---|
| 0 | **Character lock** | The ledger entry — face, hair, body, default makeup and expression | Before any prompt exists |
| 1 | **Base reference** | One image, full styling readable, on pure white seamless | Character locked and confirmed |
| 2 | **Multi-angle sheet** | One frame, six panels, same character from six angles | An approved base exists |
| 3 | **Plate** | Character in a realized environment, or the environment alone | Only when asked — never proposed |
| 4 | **Detail portrait** | Chest-up or face, maximum fidelity | Only when asked, and only on a higher-fidelity model |

Steps 1 and 2 are strictly ordered: **no sheet before a base.** The sheet's whole job is to hold one already-approved look steady across six angles; without a base it is six negotiations at once, and nothing in it can be trusted as reference. Steps 3 and 4 are always available and never volunteered — offering a scene plate to someone who asked for an outfit reference is scope creep with a rendering bill attached.

### Step 0 — lock the character

Ask first: **does this character already exist, or are we building them?**

**Exists** → ask for the reference images. Study and lock face, bone structure, skin tone, hair colour and texture, identity markers, body proportions. Mirror the lock back in plain language, wait for confirmation or correction, then write it to `CHARACTERS.md`.

**New** → development is free-form. Let the user describe the character in their own words — vibe, era, role, energy, references, whatever they have. Listen, then mirror back a written spec covering apparent age register *described by build rather than a number*, face (bone structure, eye shape and colour, brow, nose, lip, skin tone and finish), hair (every colour nuance, length, texture, style), body (build, proportions, posture, distinguishing markers), default makeup, and default expression and energy. Iterate until they say it's locked, then write it down.

Either way the lock is confirmed before a single prompt is composed, and it lives in the ledger rather than in the conversation.

## The pre-prompt check

Every prompt gets a short "here's what I'm about to prompt" before the full text. Long prompts are expensive in attention and copy-paste effort; nobody should read a wall of text to discover it missed.

**Clean bullets, no prose wrapper, no quote block:**

```
Pre-prompt check:
- **Character:** rose-pink braided hair, warm fair skin, sharp almond eyes, level expression
- **Outfit:** cropped white ribbed tank, light-wash baggy cargos, tan suede work boots, silver hip chain
- **Backdrop:** pure white seamless studio
- **Framing:** full body

Sound good?
```

Character · outfit · setting · framing (framing only when it isn't the default). Close with one short question. Then wait, then deliver the prompt as a **single fenced code block** — no preamble inside it, no commentary after it unless asked.

**The exception: minor iteration on a prompt already approved in this thread.** A framing shift, pose change, lighting nudge, one swapped accessory, repositioned subjects — deliver the revised prompt directly. The character is locked, the wardrobe is locked, only the named variable moved, and re-confirming a tiny delta is friction.

**Still triggers a full check:** a new character entering frame · a full outfit swap (not a tweak) · a change of asset kind · a new environment · the user asking to be walked through it.

When in doubt on a clear minor delta, deliver. When the change touches anything load-bearing, check.

## Step 1 — the base reference

The first image of any character-and-outfit pairing is always one figure on a **pure white seamless** backdrop, full styling readable head to toe. This is what every later asset quotes.

Get the outfit described — every garment, accessory, styling choice. If a wardrobe reference image exists, read it visual-only and mirror the spec back.

Then **ask which path**, because the prompt structure differs:

- **Direct path** — the styling is written from scratch in the prompt, one generation, one locked output. Full control over every detail; heavier prompt.
- **Composite path** — two steps: build the outfit on a neutral model first, then composite it onto the locked character. Cleanly separates garment design from character casting; lighter prompts, more variety per generation, faster iteration.

### Direct path

Identity-forward, environment-minimal, lighting-controlled. Subject centred, weight on one hip, body angled 15–30° from camera, chin level or slightly tucked. **Full body by default** — it's an outfit reference. Backdrop pure white seamless, locked. Lighting soft cinematic key from one side at 45°, gentle fill opposite, subtle rim separating shoulder and hair — three-point classical, always motivated, never flat. Expression neutral and controlled, a closed-lip smirk at most; **no teeth-showing smile unless asked for.**

```
[Character descriptor — hair, makeup, full wardrobe head-to-toe, jewelry, body markers, from the ledger]. [Pose — body angle, weight distribution, hand position, expression].

Pure white seamless studio background. Soft cinematic key light from camera-left at 45 degrees with gentle fill from camera-right, subtle rim light defining the shoulder and hair separation. Three-point classical portrait lighting. [Framing].

[The photoreal stack].
```

**Building a series of bases for one character: vary exactly one parameter per shot** — pose, or framing, or expression, or key direction. Backdrop stays locked. Face, skin, and identity markers never vary; that's what makes them a series rather than four different people.

### Composite path — two steps, and the first is not optional

**Step A — the outfit on a neutral model.** Build the garment set on a slim, plain model so it exists as a clean visual reference. No locked character yet.

The model spec is fixed: slim build with refined proportions · plain natural hair appropriate to the model's gender, neutral colour · clean even features, neutral or no makeup, blank model expression · straight-on stance, weight even, arms relaxed, body squared to camera, eyes to camera · gender matched to the garments. **Lighting is deliberately flat and even here** — soft front key, no dramatic three-point, no rim. Mood lighting at this stage hides the clothes, which are the entire point.

```
A slim [woman / man] standing straight-on to camera in a relaxed neutral stance, weight evenly distributed, arms hanging relaxed at the sides, shoulders level, body squared to camera, head level. [Plain natural hair — medium-length straight or slight wave / short clean cut, natural medium brown]. Clean even features, neutral skin tone, [light natural makeup, soft brow, neutral lip / no makeup, groomed brows], blank neutral model expression, eyes to camera, lips closed. Slim model build, refined proportions. The figure wears [full outfit — every garment top to bottom with fabric, colour, fit, structural detail, layering, hem positions, footwear, jewelry, accessories].

Pure white seamless studio background, no shadow falloff to grey, no visible seam line, perfectly even backdrop. Soft natural studio lighting, even and diffused, key from camera-front at a slight upward angle with soft fill, no harsh shadows, no dramatic rim. Clean balanced exposure across the figure and the wardrobe. Full body framing from head to just below the footwear.

[The photoreal stack].
```

The user keeps that output — it is the wardrobe reference for Step B.

**Step B — composite onto the locked character.** Two reference images go into the platform UI: the locked character sheet, and the outfit reference from Step A. The prompt is almost nothing:

```
Place the face and body from reference image 1 onto the outfit from reference image 2. Pure white seamless studio background. Soft studio lighting.
```

**That is the whole prompt, and the brevity is the technique.** Don't add styling description — image 2 carries it. Don't add character description — image 1 carries it. Don't add the photoreal stack — the model is preserving reference fidelity natively, and describing texture it's already copying is precisely what makes it drift. Don't add framing unless the user wants something other than full body. Every sentence added here is a chance for the model to blend text with image instead of copying image.

**Push back to the direct path** when the user wants character and outfit resolved in one generation, or wants fine control over how a garment reads on that specific body. The composite path's strength is separation, not control.

## Step 2 — the multi-angle sheet

One prompt, one frame, six panels in a 3×2 grid. **Never six separate prompts** — the point of a sheet is that one generation holds identity constant across all six cells, which six generations cannot.

Default layout, top row then bottom:

1. **Full body front** — straight-on neutral, full styling readable head to boots
2. **Full body 3/4** — body angled 30°, weight on the back hip
3. **Full body back** — hair fall, garment drape, accessories from behind
4. **Waist-up portrait** — face and upper styling lock-in
5. **Hands detail** — both hands forward, ring stack, nail finish, any held prop
6. **Face detail** — collarbone up: earrings, lips, skin texture, eyes

Swap panels by name when the user wants a different mix — side profile, midriff and tattoos, boot detail, back of head for a hair clip — but keep the 3×2 grid and the single prompt.

```
A 6-panel character reference sheet arranged as a 3-column by 2-row grid in a single horizontal frame, separated by thin clean white gutters between panels. Each panel shows the same single character — [full descriptor: build, face, hair, makeup, wardrobe head-to-toe, accessories, jewelry, body markers, held props].

Panel 1 (top-left): Full body front — [stance, framing, what's readable].
Panel 2 (top-centre): Full body 3/4 turn — [stance, angle, framing].
Panel 3 (top-right): Full body back — [stance, what's visible from behind].
Panel 4 (bottom-left): Waist-up portrait — [framing].
Panel 5 (bottom-centre): Hands detail close-up — [hand positioning, what's visible].
Panel 6 (bottom-right): Face detail close-up — [crop, what fills the frame].

Pure white seamless studio backdrop applied uniformly across all six panels. Soft three-point classical lighting — key from camera-left at 45 degrees, gentle fill from camera-right, subtle rim defining shoulder and hair separation — applied uniformly across all six panels. Sharp focus across every panel. Identical character identity locked across all six panels — same face, same skin, same hair, same wardrobe, same accessories, same proportions in every cell.

[The photoreal stack].
```

Two structural rules carry this format, and both are the fix for the failures in `generative-direction.md`'s recovery table: **the identity is described once, in the opening paragraph** — each panel then names only what differs, because a per-panel description reads as six different people. And **every panel carries its explicit position label**, because that is what lets the model compose a grid rather than a collage.

## Step 3 — plates

Only when asked. Two kinds: a **character-in-environment** plate, and a **pure environment** plate with nobody in frame. Both are reference assets in their own right, and a plate is often what a generated video shot is built on — which is why it inherits that shot's cinema mode from the manifest rather than choosing its own.

Composition follows real cinematography: leading lines, genuine foreground/midground/background depth, shallow focus on a character when present, environmental detail falling off behind. Framing comes from the scene — wide establishing, medium two-shot, tight character-in-environment.

```
A cinematic anamorphic still photograph, the kind of frame a director of photography grabs on set between takes.

[If characters: full descriptor — hair, makeup, wardrobe, jewelry, body markers, pose, what they are doing in this moment].

[Environment in full: location, architecture, materials, time of day, weather, light direction and colour temperature, set dressing, props, atmosphere, palette].

[Camera, lens, filtration, and grade pulled whole from the scene's cinema mode]. [Framing]. [Depth of field and focus plane].

[The photoreal stack].
```

For a pure environment plate, drop the human lines from the stack and close on the mode's own no-humans language.

## Step 4 — detail portraits

Chest-up, shoulders-up, or face-only, on whatever higher-fidelity model the platform offers. **Only when the user asks for that level of close-up**, never suggested for anything else — and when a higher-fidelity model costs more, say so once in the session, get the go-ahead, then stop mentioning it.

Lighting is classical beauty rather than three-point: soft key slightly above and camera-left, soft fill at chest level opposite, subtle hair light behind, gentle underlight bounce lifting the eye sockets.

```
[Character descriptor — hair, makeup, wardrobe visible from the chest up, jewelry at collar and ears, eye colour, lip detail, skin finish]. [Head angle, shoulder angle, expression].

[Pure white seamless studio, or the specified moody backdrop]. Classical beauty lighting — soft key from slightly above and camera-left at 35 degrees, soft fill at chest level from camera-right, subtle hair light behind defining the crown, soft underlight bounce lifting the eye sockets. [Framing].

Extreme face fidelity. Real skin texture with visible pores, fine peach fuzz along the jawline and upper lip, subtle subsurface scattering on the nose bridge cheeks and ears, micro-expression detail at the eyes and mouth corners, individual lash separation, real moisture and reflection in the iris with visible iris pattern, real lip texture with natural lip lines, hair strand by strand at the hairline with baby hairs and flyaways, fabric weave visible at the collar and shoulder.

[The photoreal stack].
```

The extra fidelity earns its cost only when the face *is* the image. For full body, sheets, and scenes, the general model is the better tool.

## Platform adapters

**Everything above is engine-neutral, and deliberately so.** The four steps, the ordering, the pre-prompt check, and the prompt skeletons hold on any image model. What changes per platform is a short, mechanical list — and you fill it in for whichever engine the user picked at the model gate, rather than assuming the one written below.

Fill this in per platform, once, and keep it in `MODELS.md`:

| Adapter slot | What to establish |
|---|---|
| Engine per step | Which reachable engine runs the direct path, the composite path, the sheet, plates, and detail portraits — they need not be the same one, and often should not be |
| Reference attachment | UI upload · `@image` tag · `<<<image_n>>>` placeholder · API field. **Getting this wrong silently ruins every composite prompt** |
| Aspect ratio | UI setting, or a prompt-body parameter. If it is a UI setting, framing stays plain language in the text |
| Negative prompts | Supported and useful · supported and harmful · absent |
| Fidelity tiers | Whether a higher-fidelity tier exists for detail portraits, and what it costs relative to the base model |

**Say the cost difference once**, get the go-ahead, then stop mentioning it.

### Worked example — Higgsfield

One filled-in instance of the table above, not a default. Verify it still holds before relying on it; platform lineups change without notice.

| This module's term | Higgsfield, as of this writing |
|---|---|
| Direct path (Step 1) | **Banana Pro** (Nano Banana) |
| Composite path (Step 1, two steps) | **Soul Cinema** — Step A then Step B, both generations run here |
| Multi-angle sheet, plates | **Banana Pro** |
| Detail portrait model | **GPT-2** — higher fidelity at face-and-shoulders range, costs more credits than Banana Pro |

Platform rules on this one: **reference images attach in the Higgsfield UI**, never as `@image` tags or `<<<image_n>>>` placeholders in the prompt text. **Aspect ratio is set in the UI**, never written into the prompt body — describe framing in words ("full body", "chest-up portrait", "wide establishing"). Sheets are typically 16:9, plates 21:9 or 2.39:1, portraits 4:5 or 1:1, but all of that is a UI setting. **No negative prompt blocks** — this workflow doesn't use them.

The full original director, with its worked examples, is `library/higgsfield-directors/banana-pro-director.md`. Read it for the *method*; treat its model names as one platform's answer, not the answer.

---
*Distilled from: banana-pro-director (authoritative — asset order, mode structures, prompt scaffolds).*
