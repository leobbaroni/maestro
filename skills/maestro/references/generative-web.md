# Generative Web

*Generated assets inside a shipped page: the asset kit as a system rather than a hero image, the scroll journey as the page's spine, and the bar that says a site isn't done until it does something. Where `generative-stills.md` composes one image, this module decides which images a build needs at all.*

## Scope, honestly stated

This module takes the **craft** from upstream's website builder and leaves its **infrastructure** behind, deliberately. The vendored corpus (`library/higgsfield-skills/higgsfield-websites/`) is built around one company's stack — a specific design system, SDK, edge runtime, and database — and maestro is engine-neutral by construction. Telling every user to ship on one vendor's Worker would be maestro asserting something it has no business asserting.

So: **read the corpus for the platform-specific build** when the user is actually on that platform, and read this module for the parts that hold anywhere — the asset system, the wow bar, the journey, and the licensing rule. Where the two disagree about *their* platform, the corpus wins.

## The bar — "wow" is part of done, not polish

A page that renders correctly and does nothing is not finished work; it is a wireframe with real content in it. The bar for a page anyone will publish:

1. **One signature moment**, decided at brief time rather than discovered at the end.
2. **At least one bespoke asset** that exists because this page needed it. Not stock, not a placeholder image service, not an icon-font hero, not a CSS gradient standing in for art direction.
3. **Motivated entrance motion** — scroll reveals or spring transitions that follow the reading order — with a `prefers-reduced-motion` fallback on every one of them.
4. **Registry components over hand-rolled generic sections.** `toolbox.md` names the vetted sources; hand-building a standard marketing section from scratch is slower *and* lands somewhere more generic than the library would have.
5. **Animated headline and animated numbers where they fit** — a static number that could count up is a small missed moment, and they are cheap.

**Restraint is not an escape hatch.** "Clean", "minimal", "trustworthy", "like Linear" briefs still get the signature moment — restraint means *calmer and more deliberate*, not absent. A quiet brief is a direction for how the moment behaves, never permission to skip it. Only the user explicitly choosing a static page removes it, and that is their call, recorded in the brief.

**Decide the moment first and build around it.** A page structured as a generic stack with animation planned "for later" does not get the animation later — and if it did, it would sit on top of a layout that wasn't shaped for it. The signature moment is a structural decision, so it comes before the sections do.

## The asset kit — a system, not a hero image

Treat this as designing a **brand asset kit for one build**, palette-locked and motif-locked, rather than as sourcing individual pictures. That framing is the difference between a site that looks commissioned and one that looks assembled.

**Rule 0 — the user's own assets always win.** Anything they provide — logo, brand marks, product photography, team photos, an existing icon set, licensed fonts — is used **as supplied**. Never generate a replacement for something the user gave you. Generation fills **gaps only**.

The one soft exception: when their photography genuinely clashes with the chosen direction, offer a **re-grade of their own images** — an image-edit pass with the direction's boards as the grade reference. Never substitute a generated stranger for their real product or their real team. A generated "team" on an About page is a lie about who works there.

**Every generated asset carries three things** in its prompt: the locked palette named by hex and mood word, the direction's spine motif, and **"no text, no logos, no watermark"** — because type is set in HTML where it stays selectable, translatable, spell-checkable, and correct at every breakpoint. Baked-in text is unfixable text.

**Submit the batch asynchronously and build while it renders.** Fire every asset job up front without blocking, keep the returned job ids, construct the page against placeholders, then collect and swap in. Waiting on each generation in series is the single largest avoidable delay on this kind of build.

**Then land them properly:** download into the project and reference same-origin rather than hot-linking a generation URL that expires; and downscale per tier — a hero at 2k or under, cutouts around 800px, icons around 256px. A 4k PNG behind a 600px card is a performance bug wearing an art-direction costume.

## The scroll journey

When the signature moment is a scroll-driven journey — the visitor's scroll plays a film while the page's chapters read over it — one decision dominates everything downstream, and it is a **cost lever** before it is an aesthetic one:

| Shape | What it is | When |
|---|---|---|
| **Single-shot** *(default)* | **One** continuous film, generated in one call, scrubbed end to end. No seams, because there is nothing to seam | A brand, product, service, portfolio, launch — anything whose story is one subject seen ever more closely. **When in doubt, this one** |
| **Multi-leg** *(opt in)* | 4–7 distinct worlds the visitor travels between, each leg generated from the previous leg's real last frame | Only when the brief genuinely needs several *places* rather than a closer look at one. Strictly sequential, one generation plus an encode and an inspection per leg |

**"It would look cooler with more scenes" is not a reason for multi-leg.** A tight single-shot film beats a loosely-seamed chain, costs a fraction, and reaches the user far sooner. When multi-leg genuinely is right, say the per-leg time and cost *before* the user picks it — this is `generative-engines.md`'s consent rule applied to a structural choice.

Map **3–6 chapters** onto the single film, each with a physical subject, one focal point, one short headline, and one sentence. The chapters are the page's semantics; the film is its ground. A journey whose chapters don't correspond to real moments in the footage reads as two unrelated things happening at once.

## Rendering discipline

Three rules that decide whether the moment ships or breaks the page:

- **Client-only and GPU work must not enter the server render path.** Anything touching `window`, and anything WebGL or canvas, renders behind a mounted client boundary — and the heavy ones are lazily imported and code-split so they never load on the server or block first paint. This is framework-independent: the names differ, the failure doesn't.
- **One signature effect per page.** Two stacked hero effects don't read as twice as impressive; they read as neither being the point. `motion-principles.md` owns the wider motion budget.
- **Every animated effect needs a static fallback**, wired to `prefers-reduced-motion` — not degraded, *complete*. A user with motion sensitivity gets the finished page, not the ruins of one.

## Licensing — the hard rule

**Use only sources that are free and permissively licensed** (MIT, Apache-2.0, BSD, Zlib, Unlicense), and check per component rather than per site — free and paid tiers sit side by side on nearly every one of these sites. `toolbox.md` carries the vetted list and the specific traps: the library that is MIT-with-Commons-Clause, the one whose new majors went commercial, the one with no license file at all.

Never pull a proprietary or paid-tier source into a deliverable on the user's behalf. What the user chooses to license for their own site afterwards is their decision to make with full information — which means naming the paid option and its price rather than silently substituting a free approximation, and never generating imports for a tier they haven't bought.

---
*Distilled from: higgsfield-websites (vendored in `library/higgsfield-skills/`, MIT) — specifically its asset-system, wow-maker, and scroll-scrub references. Platform-specific build mechanics (design system, SDK, edge runtime, database, game rooms) are deliberately left in the corpus rather than absorbed, since maestro does not prescribe a stack. Motion budget and reduced-motion discipline stay with `motion-principles.md`; component sourcing and license traps with `toolbox.md`.*
