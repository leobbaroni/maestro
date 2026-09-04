# Brand Systems

*Generated brand and commerce assets: identity systems, product imagery, thumbnails, and listing cards. The surface where generation stops being art direction and starts making claims on a company's behalf — so the discipline here is about truth and approval as much as craft. `design-direction.md` owns the taste; this module owns the system and its guardrails.*

## What this covers, and what it doesn't

| Job | Here? |
|---|---|
| Logo system, palette, typography, brandbook, packaging, signage, merchandise | **Yes** — the identity track |
| Product photography: studio, lifestyle, hero banner, carousel, ad pack, try-on | **Yes** — the product track |
| Thumbnails and video covers | **Yes** — the thumbnail track |
| Marketplace listing cards and A+ content modules | **Yes** — the listing track |
| A website that presents the brand | `design-direction.md`, with the Brand Lock below as its input |
| The brand's *taste* — what it should look like at all | `design-direction.md`, and the direction round in `process.md` §3 |
| One-off images with no brand attached | `generative-stills.md` |

**Which engine runs it is `generative-engines.md`'s question, not this module's.** Everything below is the method; the probe decides the surface, and the route gate decides who pays.

## Rule 0 — you are making claims on someone's behalf

Every other generative surface in maestro produces a picture. This one produces **assertions a company is legally and commercially answerable for**, and that changes the failure mode from ugly to actionable.

**Never invent** positioning, values, claims, ingredients, prices, certifications, statistics, awards, regulatory or compliance content, or outcomes. Not as a placeholder, not as a plausible default, not "to be replaced later" — a placeholder claim that survives one careless approval is a false advertisement.

**Preserve the user's exact copy.** Brand names, taglines, and product descriptions are transcribed, never improved. A spelling you think is wrong gets asked about, not corrected: `Chsse` may be the brand.

**A thumbnail's promise must be true of the video.** The information gap that earns a click is legitimate; a gap that misrepresents what the viewer will get is a lie with a retention penalty attached. Never depict an outcome, statistic, screenshot, product, or person that the content does not actually contain.

**Never infer approval from silence, from a successful generation, or from your own preference.** A render completing is not a decision. Approval is a person saying yes to a specific artifact.

## The three request kinds — classify before asking anything

Most wasted work here comes from running a full identity process for a task that needed one asset. Classify first:

| Kind | Means | Do |
|---|---|---|
| **apply-existing** | The brand exists and official assets were supplied | Use them **as fixed constraints**. Do not redesign, recolor, redraw, or "clean up" an official mark |
| **extend-partial** | The brand exists but the requested output needs a slot it doesn't have | Create **only** the missing slots that output actually uses |
| **create-identity** | A new mark or identity is genuinely wanted | Run the identity track — and only when explicitly requested, never inferred from a thin brief |

Then require **only the slots the deliverable uses.** Forcing a complete identity questionnaire on someone who asked for one mockup is the characteristic failure of this surface:

| Deliverable | Slots it needs |
|---|---|
| Logo alone | Palette + logo for a new mark; the official logo alone for an existing one |
| Palette alone / typography alone | That slot only |
| Copy-free mockup or merchandise | Logo; add palette only when the application is colour-dependent |
| Anything bearing text — social, packaging, poster, signage | Logo + palette + typography |
| Brandbook or presentation deck | All three |

Once a slot is approved, **continue the original request** — never send the user back through scope selection they already completed.

## The Brand Lock

The identity equivalent of `generative-direction.md`'s continuity ledger, and it earns its own file for the same reason: a lock held in conversation dies at the next context reset.

Write `BRAND.md` at the project root and treat it as the source every prompt is composed from:

```markdown
# Brand Lock · locked 2026-08-28

Name:            exact spelling, exact casing — transcribed, never corrected
Official assets: refs/logo-primary.svg, refs/logo-mono.svg   (supplied — fixed, do not redraw)
Palette:         #1B4332 ground · #D8F3DC surface · #FF6B35 accent   (supplied)
Typography:      Söhne (display) · Söhne Mono (code)   (licensed — confirmed by user)
Layout rules:    mark never rotated · minimum clear space = cap height · never on photography
Forbidden:       no gradients on the mark · no drop shadow · never the 2019 wordmark
Requested:       packaging (3 SKUs), signage, one hero banner
Platform handles: brand-kit id bk_… · soul_ref_id … (see generative-engines.md override 3)
```

Two fields carry more weight than they look. **Forbidden treatments** is where a brand's actual identity lives — most brands are defined more sharply by what they refuse than by what they specify. And **Official assets are fixed constraints**: a supplied logo is input, not a draft.

Record every approval as it lands, and when a foundation slot changes, **regenerate only what depends on it** — a palette change invalidates the packaging, not the typography study.

## The product track — pick the mode, don't freehand the prompt

Product imagery routes through **named modes**, each carrying its own photography vocabulary and structural template. Pick by *intent*, and when two could apply, take the more specific one:

| Mode | The user wants |
|---|---|
| `product_shot` | Neutral, studio, catalog, white background, storefront-ready |
| `lifestyle_scene` | The product in a real environment — kitchen, outdoors, café, gym, in use |
| `closeup_product_with_person` | Tight crop with hands or partial face — application, holding, demonstrating |
| `moodboard_pin` | Vertical 2:3, Pinterest-native, moodboard register |
| `hero_banner` | Wide format for a site header, landing page, or email |
| `social_carousel` | 3–10 connected slides that must read as one set |
| `ad_creative_pack` | Coordinated static variants for paid social |
| `virtual_model_tryout` | Worn or used by a rendered model — lookbook, on-body |
| `conceptual_product` | Levitating, splash, frozen motion, surreal, sculptural, CGI |
| `restyle` | An existing image transformed to a new aesthetic or season |

**Where a platform's mode enhancer assembles the final prompt, let it.** A mode is not a label on your own prose — it selects a tuned template that outperforms freehand text on that surface. maestro's contribution there is choosing the mode, supplying the Brand Lock's constraints, and judging the output; overwriting the enhancer with a hand-written prompt discards the reason to use the mode at all.

That is a **narrow** exemption from `generative-direction.md`'s prompt craft, and it applies only where a real mode enhancer exists. On a raw image model with no mode system, the full grammar applies as written.

**Ask at most four questions, with labelled options, never open-ended** — and skip any whose answer is already in the brief, an uploaded image, or the Brand Lock.

## The thumbnail track

Small surface, unusually strict rules, because a thumbnail is the one asset judged on click-through against a truth constraint.

**Identity, and who gets to appear.** Up to three referenced identities can be preserved. When a concept needs a person and no photo was supplied, **ask** whether it should be the user, another named person, or a generic generated character. Never choose silently — putting an invented face on someone's channel is a decision only they can make.

**A style reference is for analysis only.** When the user supplies a thumbnail they admire, read it with your own vision for energy, framing, split layout, palette, and emotional register — then **never pass it to the model as a reference image.** Copying its identity or exact composition is off the table: that is someone else's creative work and, with a face in it, someone else's likeness.

**One concept, one generation.** Distinct concepts, emotions, or camera takes each get their own prompt and their own call. A batch-count flag produces variations of one idea, which is not the same as alternatives — and cap the total, because thumbnail exploration is where generation budgets quietly disappear.

**Default to a clean image with no text.** Bake a headline into the render only when explicitly asked; otherwise apply text as a deterministic overlay, where it stays editable, spell-correct, and legible at the size it will actually be seen. Two to four words is the working ceiling.

**Ratio follows the destination** — 16:9 for a standard video, 9:16 for a vertical short, 4:5 for a feed post.

## Delivery

The same discipline the rest of maestro applies to renders, restated because this surface tempts a JSON dump:

- **Deliver the artifact and a one-line label.** Not job IDs, not raw API payloads, not internal model names unless the user asked.
- **Keep editable deliverables local.** Brandbooks, decks, SVG marks, and overlay compositions belong in the project as files that can be re-exported — a hosted URL is a copy, not a source.
- **Say what each variant is** so feedback can name one. "Variant B — shock, split layout" beats three unlabelled images.
- **Stop after each foundation review and wait.** Palette, logo, and typography are gates; the work below them is worthless if the slot above changes.

---
*Distilled from: higgsfield-brandkit, higgsfield-product-photoshoot, higgsfield-youtube-thumbnail, and higgsfield-marketplace-cards (vendored in `library/higgsfield-skills/`, MIT). Mode names and slot rules are that platform's; the truth constraints, the Brand Lock, and the approval discipline are maestro's reading of what makes them safe. Engine selection and cost consent stay with `generative-engines.md`.*
