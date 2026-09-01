# The Maestro Method

*Process discipline for design/motion/video work: interview before building, lock the brief, fan out options behind a user gate, run the right ritual per phase, and never declare done without rendered verification.*

## Core law

The two most expensive failure modes are **building before the brief is locked** and **improving without concrete criteria**. Every rule below exists to prevent one of them. Bias toward caution over speed; for trivial tasks, use judgment.

**Quick routing:** most requests are a phase — detect it and run its ritual (§4's table). The two decisions that aren't a phase:

| Incoming request | First move |
|---|---|
| Significant new screen/page/surface | **The direction round (§3)** — dealt lead, challengers with verdicts, user gate. impeccable's `new-work` roll when installed |
| Any video | **Film kind first (§1b)** — the user picks what the film *is*; the engine follows. Then the direction round (§3a), which fans out on beat sheets and styleframes, never on rendered films |
| Small tweak, fully-specified change | Just do it — then verify (§6) |

**Surfaces and films gate differently, and the difference is cost.** A mockup option is one self-contained HTML file authored in a single pass, so three of them are cheap and the gate sits before implementation. A film option is minutes of encode, so the gate sits *before any render* and the artifacts compared are a beat sheet and one still. Do not copy §3's mechanics onto video: three rendered films to choose from is a gate nobody can afford, and it arrives after the expensive part rather than before it.

## 1. The Grill Gate

Before any substantial design, build, or redesign work, interview the user until the brief is locked.

**Mechanics:**

- Ask **ONE question at a time**. Wait for the answer before the next question. Multiple questions at once is bewildering and produces shallow answers.
- Every question ships with **your recommended answer**. The user should be able to reply "yes" or redirect — never face a blank prompt.
- Walk the **design tree branch by branch**: each answer opens or closes downstream branches. Resolve dependencies between decisions in order (platform before layout, audience before tone, motion tier before animation specifics).
- **Never ask what you can look up.** If a question is answerable by exploring the codebase, existing assets, or prior project files, explore instead of asking.
- If a named reference is behind a login or paywall, ask for a screenshot instead of silently skipping it.
- **Structure choices are grill material.** For page-scale work, surface the macrostructure and theme as explicit user choices — on a vague brief, offer the domain-matched trio of three categorically different page shapes (`references/page-anatomy.md`), recommended pick first, not seven abstract tones.
- **The design authority is the user's call, not yours** (next section). Never silently pick which house drives the look.
- **Honest-copy pause.** When a stat/proof slot has no user-supplied number, never invent one: pause and ask, mark "metric to confirm", or drop the slot.
- **Component-scope shortcut.** A brief naming one UI element (button, input, card, modal) skips page-level choices entirely — ship the component with all 8 interaction states and a state-demo wrapper.

**Skip the gate when:**

| Condition | Why |
|---|---|
| Small tweak to an existing design (spacing fix, copy change, one component) | The existing design IS the brief |
| The request arrives fully specified (audience, style, constraints, success criteria all stated) | Nothing left to resolve — confirm the brief back in one line and go |
| Mid-iteration change on an already-locked brief | The brief governs; apply the change against it |

**Stop grilling when:**

- Questions start returning answers that don't change any decision (diminishing returns), or
- The user says "just go" / "you decide" — then pick the remaining answers yourself, state them in one message as you proceed, and treat them as locked.

Twenty minutes of interviewing is cheaper than days of correction rounds. But don't ceremonialize: a grill that outlives its usefulness is its own failure.

**On a greenfield surface, the stack is the user's decision, not yours.** When there's no framework or scaffold and the request implies building, ask once — plain static HTML/CSS, a named framework, or your recommendation — plus any deploy target that constrains the answer. Record the outcome in the brief, including `delegated: <what you chose and why>` when they hand it back, so later sessions know the choice was offered rather than assumed.

### 1a. Design authority — ask, don't assume

Maestro carries three design houses with genuinely different instincts (`references/commands.md`). On the same brief they produce different work, so **which one leads is a user decision** — one of the first questions in any substantial design grill, and the one to push hardest on, because every later answer inherits from it.

Ask by **look and feel, never by skill name**. The user is picking a result, not a vendor:

| Offer it as | Leads to | Reads as | Best when |
|---|---|---|---|
| "Structure-led: a page shaped unlike the usual — the layout itself is the idea" | hallmark | Editorial, art-directed, print-adjacent; strong shapes, committed themes | Landing pages, portfolios, brand sites, anything that must not look templated |
| "Polish-led: conventional shape, uncommonly well finished — no AI tells anywhere" | taste-skill | Confident, current, premium; the details survive zooming in | Marketing surfaces, launches, redesigns of something already close |
| "Craft-led: usability and system rigor first, taste in service of the work" | impeccable | Calm, legible, systematic; nothing shouts | Dashboards, product UI, tools, dense data, anything people use daily |
| "Blend" | all three composing | Structure from one, finish from another, rigor throughout | Mixed-register work (a marketing site with a real app behind it), or a brief that pulls two ways |

Mechanics that make the choice real:

- **Show, don't name.** Two or three concrete sentences of what the result looks like per option — a named reference site, the type attitude, how dense it feels. A user who can't picture the outcome can't choose it.
- **Recommend one and say why** in the same breath. Register usually decides it: product surface → craft-led; brand surface → structure-led when the shape should surprise, polish-led when the shape is settled and the finish carries it; mixed register or a brief pulling both ways → blend, naming which house owns which layer.
- **Push once past a lazy answer.** "Whatever looks best" is not a pick — reply with the two most different options rendered as sentences and ask which one they'd rather land on. If they still decline, choose, state the choice and the reason, and treat it as locked.
- **Ask preference questions in the same pass:** which of their references they actually love versus merely tolerate; what they never want to see; whether they want the safe or the ambitious version of this brief.
- **A named house ends the question.** "Do it hallmark-style" is the answer; stop offering alternatives. Scope of the pick: it decides whose instincts lead the look and which protocol runs when verbs overlap (`references/commands.md`). It does not reopen source conflicts already resolved inside the modules — the `taste-skill > hallmark > impeccable` order was applied at distillation time and is baked into the reference prose, not a runtime dial.
- **Lock it into the brief** (§2) and honor it downstream: it decides which protocol runs when verbs overlap (`references/commands.md`), and re-opening it mid-build is a direction change that needs the user, not a quiet swap.

### 1b. Film kind — ask, don't assume

The same discipline as §1a, applied to video. **What the film physically *is* is a user decision**, and it is the one that decides everything downstream — the engine, the asset pipeline, what "good" even looks like, and what the film can and cannot show. Asking it costs one turn; discovering it after a render costs the render.

Ask by **what appears on screen, never by engine name**. "Canvas or HyperFrames?" is a question about our implementation and the user has no way to answer it. "Do we show your actual product, or an abstract film about it?" is a question about their film.

| Offer it as | Becomes | Reads as | Best when |
|---|---|---|---|
| "Your product, shown as it really is — real screens, real data, real flows" | shotcraft → Remotion (`video-shotcraft.md`) | A product demo or launch film; credible, specific, the thing itself | There is a real app or site, and **the screens themselves carry the story** |
| "Abstract — light, type, and shape carrying the idea; no UI on screen" | canvas (`video-canvas.md`) | A brand film or title sequence; atmospheric, premium, made of glow | Selling a feeling, a launch beat, or something with no UI to show yet |
| "Designed frames — layout, cards, charts, captions doing the explaining" | HyperFrames (`video-hyperframes.md`) | An explainer or a data film; clear, readable, information-led | What must land is **words or numbers the screens never show** |
| "Filmed-looking — real people, places and texture, **generated rather than shot**" | generative (`generative-direction.md`, then `generative-production.md`) | Photoreal footage; human, physical, cinematic | Humans, locations, or material texture are the subject and no camera exists |
| "Footage you already have, packaged — captions, lower-thirds, overlays on your clip" | the companion workflows in `companions.md` (`embedded-captions`, `talking-head-recut`) | Your own clip, dressed | A recording exists and the film *is* that recording |

Mechanics, matching §1a:

- **Show, don't name.** Two or three sentences of what the result looks like — never the module or engine name. The user is picking a film, not a renderer.
- **Recommend one and say why**, from what they already have. A URL or an app in the repo → the product film. A brand beat with nothing to screenshot → abstract. A script full of numbers and steps → designed frames. Humans or places with no camera → filmed-looking. A clip in hand → packaged.
- **The product film and designed frames overlap constantly** — a SaaS launch film is both. Discriminate by what carries the story: **the product film when the screens themselves are the argument; designed frames when the point is words or numbers the screens never show.** A film that needs both is a product film with designed frames inside it, not a third kind — say which one leads.
- **Push once past a lazy answer.** "Whatever looks best" gets the two most different options as sentences and a "which of these two would you rather land on?" If they still decline, choose, state the choice and the reason, write it into the brief (§2), and treat it as locked.
- **Some answers foreclose others, and say so plainly.** Photoreal humans cannot be rendered from code, and a frame-exact, re-renderable spec cannot be generated from a model — a renderer hits a spec twice and a model never does. **And filmed-looking does not mean we use your footage**: a model generates new frames, it never edits yours; footage in hand is the packaged kind. Naming the trade at the fork prevents a mid-project engine change, which is a rebuild.
- **A named kind ends the question**, and it goes in the brief (§2). Changing it later is a direction change that needs the user, not a quiet swap.

Only after the kind is locked does the **engine signal table** in `SKILL.md` run — and then only as a tiebreaker *within* the chosen kind. Production constraints live there, not in the table above: an existing React codebase to reuse, or video embedded in a product, points designed frames at Remotion rather than HyperFrames. That is plumbing the user cannot picture and should never be asked to choose. It never overrides the user's pick.

**Two things are still the agent's call**, because the user cannot evaluate them: whether the environment can render at all (headless browser, Node version, FFmpeg), and determinism. Report a blocking constraint as a constraint — "that kind needs a browser this machine doesn't have; the nearest thing that works is X" — rather than silently substituting a different film.

## 2. Brief lock

The grill ends when the brief contains all of the following. Freeze it into a file (SPEC.md / DESIGN.md / the project's brief doc — template: `templates/BRIEF.md`), not chat — it must survive compaction and future sessions.

| Field | Locked form |
|---|---|
| **Audience / register** | One-sentence physical scene: who uses this, where, under what light, in what mood ("a gym-goer between sets, phone in one hand, sweaty thumb"). If the sentence doesn't imply light/dark, density, and tone, sharpen it until it does. |
| **Design authority** | Which house leads (structure-led / polish-led / craft-led / blend — §1a), who chose it (user or you-by-default), and the one-line reason. Governs which protocol runs when verbs overlap (`references/commands.md`). |
| **Film kind** | Which kind the user picked (§1b) — product-as-it-is · abstract · designed frames · filmed-looking · packaged — who chose it, and the engine it selects. Video only. Changing it later is a direction change, not a swap |
| **Platform** | Target surfaces and breakpoints (e.g. mobile-first ~380px + 1440px desktop; 16:9 vs 9:16 for video). |
| **Style direction** | The Design Read one-liner first (`references/design-direction.md` step 0), then 1+ concrete references (site/app/screenshot) with *what to steal from each*, plus 2–3 **banned qualities** ("no card grid", "not so text-dense", "no corporate blue"). |
| **Page shape + theme** | For page-scale work: the picked macrostructure, nav/footer archetypes, and theme (or the custom fork) from `references/page-anatomy.md` — plus what the previous build used, so this one differs. |
| **Motion tier** | *calm* (subtle fades, hover states only) · *lively* (micro-interactions, staggered entrances, one animated accent) · *showpiece* (scroll-driven sections, animated hero, page-transition feel). The tier shapes everything downstream. |
| **Dials** | Brand surfaces also lock DESIGN_VARIANCE / MOTION_INTENSITY / VISUAL_DENSITY values with a one-line reason (inference table: `references/design-direction.md`). DENSITY drives the spacing bands; MOTION crosswalks to the tier above. |
| **Constraints** | Tech stack, existing tokens/components to honor, real content (actual headline/copy/data — lorem ipsum is auto-rejected), budget/paid-action limits, non-goals. |
| **Success criteria** | One checkable done-condition ("the table fits 380px with no horizontal scroll", "the hero makes people stop"). Weak criteria ("make it work") burn turns; strong criteria let you loop independently. |

**Mid-session rule corrections:** when the user states a rule mid-session ("X should always count as Y"), that is a brief amendment — write it into the brief file immediately and cite the file in your reply.

## 3. The direction round (hard user gate)

Never build a significant new screen, page, or visual redesign from a single guess. The user picks from options before implementation.

**This round is impeccable's, and it runs by the roll.** When impeccable is installed, hand off to the real protocol — `new-work` and its `concept-seed` roll, served through its decision page — because the scripts do what this prose cannot: a live approval page, per-card comps, a persisted re-roll pool. `references/commands.md` routes it. When impeccable is **not** installed, run the mechanics below, which are the same discipline without the machinery. Either way the shape is identical, so a project that installs impeccable later changes fidelity, not process.

**Surfaces only.** Video has its own round with a different artifact and a different gate point — §3a. The mechanics below assume an option costs one authoring pass; a film option costs a render, which is why they are separate sections rather than one with a caveat.

**When to run the round vs. build straight:**

| Situation | Path |
|---|---|
| New significant surface (screen, page, hero, full redesign) | Run the round, gate on the pick |
| Direction itself is contested or user is undecided on style | Run the round |
| Small tweak, component-level change, or direction already picked | Straight to build |
| Brief fully constrains the design (only one reasonable outcome) | Straight to build |
| A local extension of a surface whose world already shipped | Straight to build — shape it inside the recorded world |

### The roll — why the dice, and not your ranking

**Your top-ranked direction is what every run would ship.** That is the whole problem: a ranking is a taste function, and one taste function run a thousand times converges on the category default. So the lead direction is **dealt, not chosen** — and the dice picking which candidates reach the user is what breaks the rut while leaving the user a real choice.

This is not a randomiser bolted onto a preference. It is the mechanism, and skipping it while claiming to have run the round is running a lookalike.

**Every candidate the roll can land on must already be viable** before it enters the deal: every relationship and claim it visualises true, a real palette and component family, a distinctive composition, workable at full-surface scale within the available assets and performance budget. A candidate that fails on truth is **replaced before the roll, never rescued by it**.

**Truth binds claims, not demonstrations.** Author whatever illustrative material a concept needs at full fidelity, label it synthetic where a visitor could mistake it for real, and hand the user the list to replace. What stays uninventable is commercial and factual: prices, customers, benchmarks, capabilities the product does not have. *Refusing a bold direction because its demonstration data does not exist yet is timidity wearing honesty's clothes.*

### The hand

The deal produces a lead direction and a set of **challengers** — foreign forms from outside the category, which is where the non-obvious lives.

**Fuse each challenger before judging it.** The challenger supplies the form and its system grammar; the product supplies every fact; clarity wins conflicts. Judging an unfused challenger judges a costume.

Then a verdict per challenger, **decided before any borrowing**, on exactly two axes — *audience identification* and *product clarity*:

| Verdict | Means | Becomes |
|---|---|---|
| **Wins** | Beats the lead on both axes | The build candidate |
| **Competitive** | Holds one axis | A full alternate |
| **Declined** | Loses both | Demoted — but not discarded |

**A declined challenger is not spent.** Name the one discipline of its system the lead direction lacks — a palette's total commitment, a grid's density courage, a form's structural honesty — and **raise the lead to match before presenting it**. A donation transfers ambition and system discipline, **never the challenger's clothes**: a lifted motif is a costume note, not a raise. Write each raise into the presented direction as **its own named line, credited to its donor** — a raise nobody can read did not happen.

**The hand holds at most three full cards.** When the deal produces more, the three strongest join and the rest wait in the re-roll pool, noted in one line. Dropping a challenger from the hand takes a **named product-truth failure**, disclosed — not a preference.

### Your pick, and where it may not sit

Add **exactly one** card for your own top-ranked candidate when the deal did not already lead with it, kickered as the pick, same anatomy as every other card, carrying an **honest risk line naming its familiarity** when that is true.

- **One pick card, never two, never a ranked list.** A lineup of your candidates hands selection back to the taste function and invites the safest card.
- **The pick never takes the lead position.** When the dice happen to assign your top candidate, there is no pick card — the lead card simply notes that it topped your list.
- The strongest grounded direction is often exactly where every run in the category lands. **Showing that trade is the point**; familiar and effective is a legitimate destination, not a failure of nerve.

### Card anatomy, and the gate

Every card carries the same fields — thesis, palette, materials, first viewport, honest risk — plus, for challengers, their verdict and case line. Present them at **equal salience**: a declined challenger renders compact and quiet with its verdict and what the lead kept from it, never full-size, never silently dropped, still adoptable on request. Salience must encode the verdict, never the accident of which cards happen to have images.

Without the upstream decision page, each option is one self-contained HTML/CSS/JS file — everything inline, real fonts, real brief content, contrast floors respected — naming and **demonstrating its one signature interaction live**, animated to the brief's motion tier with a `prefers-reduced-motion` alternate, self-checked at ~380px and 1440px. One authoring pass each; no browser-iteration loops on throwaways.

**Then stop and wait for the pick.** No implementing, no "head start" on a likely winner.

**The standing exit.** Every round carries one permanent extra choice: the category standard, played straight. It is the user's door, never yours — never recommend it, never weigh it against the roll, never let it soften the dealt directions. **Those counterweights bind the default while it is unchosen, not once it is chosen**: the moment the user takes that door, convention stops being the thing you were guarding against and becomes the commitment, executed at full craft. Treating it as a lesser outcome after the user picked it is the failure mode this clause exists to name. When the user takes it, ask once for two or three products this should sit alongside, make their craft level the bar, and execute the canon at full fidelity, without irony or smuggled quirk. Record the standing preference in the brief.

### Re-roll, in three registers

Re-roll is the user's, freely, with an optional one-line steer. **It eliminates every direction already shown** — lead and challengers alike — and comes in three registers, which are the user's steering on the familiar-to-bold axis and **never yours to pre-select**:

| Register | Deals |
|---|---|
| **plain** | A fresh hand, same spread |
| **safer** | Remaining conventional grounded candidates, plus the canon against named competitors |
| **bolder** | Foreign forms only, at full commitment |

**While a direction round is open, "bolder" and "safer" mean these registers** — not the `bolder` refinement command, which is for a surface whose world already shipped. The collision is real, and resolving it wrong spends a round on the wrong protocol.

**Re-roll on your own only on named factual grounds** — the lead cannot carry the product's truth or task. Taste is never grounds. A user- or brief-pinned direction beats the roll, always. After two consecutive re-rolls, ask what quality is missing rather than dealing a third time.

### After the pick

**On rejection of everything:** ask for two concrete dislikes and one new reference, then regenerate. Never regenerate blind.

**Write the direction contract before any code.** The pick has to survive a context reset, and a decision held only in the conversation is a decision the next session will quietly re-make. Record it in the surface's brief under `## Direction contract` — **six short blocks, 150 words at most**: the thesis (the one idea this surface owns, and the category default it refuses), the form and its system grammar, the palette and materials, the first viewport, the one signature interaction, and the named raises with their donors. Keep it that short deliberately: a contract long enough to restate the design is long enough to be ignored.

**The contract is development-only, and it must never reach the browser.** Not in an HTML or framework comment, not in hidden DOM, a `<template>`, or a `data-*` attribute, not in rendered JSX output, serialized props or state, a server-component payload, or a client bundle, not in metadata or JSON-LD, not in accessibility-only text, and not in a file served next to the artifact. Compilers and bundlers move comments into shipped output more often than people expect, so **check the built artifact rather than the source** — this is design intent describing what the page is trying to get away with, and it is written for you, not for visitors or competitors.

**Build the assigned direction, not a safer interpretation of it.** The form supplies structure, reading order, component conventions, and native motion; the product supplies every fact. **Land the first build fully committed** — the later passes exist to refine a committed thing, not to work up the nerve. Commit every atom: nav, buttons, inputs, and links get rebuilt in the form's vocabulary, and a stock component sitting inside a committed form is a lapse, not a pragmatic compromise.

That last rule and "use the project's real components" are both true, and which one governs is a question about the surface rather than a contradiction. **Inside an existing app, the project's components, tokens, and data win** — the mockup is a design contract, not code to paste, and a surface that ignores the system it lives in is a redesign nobody can merge. **On a surface whose whole point is the committed form** — a landing page, a launch surface, a brand moment — the form wins and the stock component is the lapse. Say which one you are on before you build, because discovering it afterwards means rebuilding.

Merge ideas from losing options only if the user named them in the pick ("2, but with 3's header"). Record the direction, the pick, and the raises in the project log; the locked direction becomes the **world** (`references/design-direction.md`), which governs everything built inside it afterwards.

### Two build paths: comp-led and code-led

The pick can be carried into code two ways, and choosing between them honestly matters more than either one.

**Comp-led** — an approved composition exists, and it is **a spatial contract rather than a mood board**. Only the user can downgrade that authority, and only in explicit words. The path runs as measured phases: measure the comp into named regions, regenerate every raster region as an asset-resolution plate, build the hero against the measured layout, then sections, motion, and the other viewports — each gate reading the screen against the comp before the next phase opens.

Why gates rather than judgement: **models systematically believe their HTML, CSS, and SVG recreation of an image succeeded when it did not.** That failure is confident and consistent, so it cannot be caught by looking again — the check has to be a measurement against the comp, not a memory of it. maestro's own verification rule is the same instinct (`design-audit.md`); impeccable's `build-phase.mjs` is the machinery when it is installed.

**Code-led** — no comp, and no apology for it. The ambition lives in the direction contract's first-viewport block and the named signature interaction, and the finish review audits those promises *in behavior* rather than against a picture.

**Say which path before the direction round, and be honest about the model running it.** The comp-led path asks a builder to hold a measured layout, place plates at their boxes, and act on numeric readings across a dozen attempts — frontier-tier work. A smaller or faster model will produce a recognisable page and then stall at the hero gate, having spent the whole budget. When that is the model in hand, **say so up front and take the code-led path**; discovering it at the gate is the expensive version of the same conclusion. This is `cockpit`'s crew question applied to a design build: name the tier before the work, not after it fails.

## 3a. Video direction round (the film's equivalent gate)

§3 does not transfer. **Fan out on direction, not on films** — and climb a ladder, because the artifacts get more expensive at every rung. Text is free, a still costs something, a render costs the most; so the choice narrows on text and only the finalist earns a picture.

**When to fan out vs. go straight:**

| Situation | Path |
|---|---|
| A film with a real budget, a launch, or anything the user will publish | Run the ladder, gate on the pick |
| The tone is contested, or the user is undecided between two registers | Run the ladder |
| A locked house style, a film in an existing series, or a named reference to match | Straight to the beat sheet — the style already answered it (Rule 0's build-first exception), **and only where the render is local and free**; a paid, long, or remote render keeps its approval regardless |
| **The user waived the round** — shotcraft's autonomous mode, "you decide", "no check-ins" | Straight to the beat sheet. **The waiver is a delegated pick, not an absent one**: choose the direction, state it in one line before building, and record the waiver in the brief |
| A short internal or throwaway clip | Straight to the beat sheet |

**Sequence — two rounds, narrowing:**

1. **Reference pass.** Two or three films in the register — not the industry. One line each on what to steal: a pacing, a transition grammar, a type attitude.
2. **Round one — directions in text. Free.** 2–3 structurally different directions, each as: a name, a one-line visual thesis, three to five keywords, its type/colour/material stance, its camera character, and the trade it makes. Plus a beat sheet each. Structurally different means a different spine and a different pacing bias — three colour variants of one storyboard is not a fan-out.
3. **Narrow to one** (two at most) on the text alone. This is the round that does the work, and it costs nothing.
4. **Round two — one styleframe, for the finalist only.** The single frame that most carries the look. Present it with its beat sheet and runtime.
5. **The gate (hard stop).** Then **stop and wait for the pick**. Nothing renders before it — not a test encode, not "just the first beat". *Narrow exception:* where two directions differ on **pacing** in a way a still cannot show, a sub-two-second motion test is allowed **only when the render is local and free**. Never for a paid or remote engine, and never as a rendered cut of the film — using a rendered video as the style proposal is a known trap: it is expensive, and the psychological cost of changing direction once one exists is exactly what this gate is protecting.
6. **Then the storyboard proposal** in `video-direction.md` runs inside the winning direction — echo line, frame table, style/duration footer, "approve or adjust". A frame change here costs seconds; the same change after build costs minutes.
7. **Then build**, still-framing each shot as it lands rather than rendering the whole film to find beat two mistimed.

**N is 2–3, not 3+** — two genuinely different directions beat three variations of one, and for the filmed kind each extra option is a paid generation. It is not a cost cap on the code-rendered kinds, where a styleframe is free local CPU.

**Two kinds need a carve-out, and skipping it is how this round backfires:**

- **Filmed / generative.** Here a styleframe **is** a paid, metered, non-deterministic generation priced like a frame of the final film — and re-rolls are normal, so a naive three-option round can spend six to nine generations before the user has chosen anything. Run the model gate and the asset manifest in `generative-direction.md` **first**, treat the styleframes as a priced batch the user approves, and where the budget won't carry it, narrow on text alone and generate one styleframe for the leading direction only. `generative-production.md`'s "nothing generates before the board is approved" holds, with this round's single finalist styleframe as its one named exception.
- **Product / shotcraft.** A styleframe needs pixels, but shotcraft's rule is that full capture happens **only after the storyboard is released** — capture earlier and you recapture. Resolve it with a **minimal pre-capture**: the few screenshots and design tokens that one frame needs, under the brief's data policy, and explicitly *not* the three-piece set (2× textures, per-element cutouts, layout table). Full capture stays behind the released storyboard at step 6.

**On rejection of all N:** ask for two concrete dislikes and one reference film, then regenerate. Never regenerate blind.

**The standing exit applies here too**, exactly as in §3: the category-standard version, played straight, is always available and is the user's door, never yours.

## 4. Phase rituals

Detect the phase first, declare it in one line ("Phase: X — because <signal>"), then run its ritual. If the user names the phase explicitly, trust that over detection.

| Signal | Phase | Ritual |
|---|---|---|
| New app/feature/video, no spec exists | **Greenfield** | Grill → lock brief into spec files → build |
| User says improve / better / polish / refine / "feels off" | **Improvement** | Measurable criteria FIRST, then work |
| Something is broken, cause unknown, or a prior fix "still" fails | **Debugging** | Reproduce FIRST, then hypothesize |
| Work exists and matches the brief's shape | **Polish** | Critique loop against the locked brief |
| An existing live site needs a new look | **Redesign** | Detect the mode, audit before touching |

### Greenfield: grill → spec → build

1. Run the Grill Gate (section 1) until the brief locks (section 2).
2. Freeze answers into files: the brief/spec (rules, constraints, non-goals — the contract) and a build plan with acceptance criteria per step.
3. Offer a done-condition the user can drive the build with.
4. Build. New significant UI surfaces route through the mockup gate (§3) before implementation; **films fork instead to the film-kind pick (§1b) and the direction round (§3a)**, before anything renders.
5. Before designing anything in an existing project, read what's there first: existing design system, tokens, theme, at least one representative component or page. Don't reinvent what works; branch out only for a UX win.

### Improvement: criteria before work

If the ask is vague ("make it better", "polish it"), extract a concrete mini-brief FIRST — one batched question round, not a build attempt:

- **one reference** (site, app, screenshot),
- **2–3 banned qualities**,
- **one checkable done-condition**.

For performance work: **measure first** — establish a profile/timing baseline before optimizing anything. Never optimize blind. Re-verify against the done-condition before reporting.

### Debugging: reproduce before hypotheses

Cause unknown, intermittent, or a previous fix "didn't take" → build a red-capable repro loop before touching code. If the report lacks evidence, ask once (one batch) for the exact error text, file path, and repro step. If the cause is obvious on first read, fix it surgically and add the regression test — don't ceremonialize a trivial bug.

### Polish: critique loop against the brief

1. **Critique** the current state against the locked brief: hierarchy, contrast, spacing rhythm, motion tier fidelity, banned-qualities compliance, success criteria. Score findings by severity.
2. **Fix** the highest-severity findings — surgical changes only; every changed line traces to a finding.
3. **Re-render and re-critique.** Loop until the critique returns no findings above the shipping bar or hits diminishing returns.
4. Production-grade is the bar: beautiful, responsive, fast, precise, bug-free, on brief. No shortcuts unless the user asked for them (when in doubt, ask).

### Redesign: detect the mode, audit before touching

Misclassifying the mode is the biggest source of bad redesign output. Detect first; if ambiguous, ask once ("preserve the brand, or start visually from scratch?"):

| Mode | Meaning | Approach |
|---|---|---|
| Greenfield | No existing site, or full overhaul approved | Dial baselines; normal grill → direction → build |
| Redesign — preserve | Modernize without breaking the brand | Audit first, extract brand tokens, evolve gradually |
| Redesign — overhaul | New visual language over existing content | Visuals as greenfield; preserve content + IA |

**Audit before touching:** document brand tokens (colors, type, logo, radii), information architecture (page tree, nav, conversion paths), content blocks (working vs filler), signature patterns to keep, slop patterns to retire, the existing dial reading (the starting point, not the baseline), and the **SEO baseline** (ranking pages, meta, structured data, OG) — SEO migration is the #1 redesign risk.

**Never changes silently** (explicit approval required): URL structure / route slugs, primary nav labels, form field names and order (breaks analytics + autofill), the logo/wordmark, legal/consent copy. Preserve copy voice unless a rewrite was asked; honor existing a11y wins; respect analytics-tracked IDs.

**Modernisation levers, in priority order** (stop when the brief is satisfied): typography refresh (biggest lift per unit risk) → spacing & rhythm → color recalibration (desaturate, unify neutrals, keep the brand accent) → motion layer → hero/key-section recomposition → full block replacement (only when unsalvageable). IA + content + SEO sound → targeted evolution (levers 1–4 ≈ 70% of the value at 40% of the risk); structural visual debt → full redesign with strict content preservation; the brand itself changing → greenfield. Exhaustive per-category audit checklist: `library/taste-skill/skills/redesign-skill/SKILL.md`; rebuilding from a studied reference: `references/design-dna.md`.

## 5. Execution discipline (applies in every phase)

**Think before coding.** State assumptions explicitly; if uncertain, ask. If multiple interpretations exist, present them — don't pick silently. If a simpler approach exists, say so; push back when warranted. If something is unclear, stop, name what's confusing, ask.

**Simplicity first.** Minimum code that solves the problem, nothing speculative: no features beyond what was asked, no abstractions for single-use code, no unrequested "flexibility", no error handling for impossible scenarios. Test: would a senior engineer call this overcomplicated? If 200 lines could be 50, rewrite.

**Surgical changes.** Touch only what you must. Don't "improve" adjacent code, comments, or formatting; don't refactor what isn't broken; match existing style even if you'd do it differently. Remove imports/variables YOUR change orphaned; leave pre-existing dead code alone (mention it, don't delete it). Every changed line must trace to the request or a critique finding.

**Goal-driven execution.** Transform tasks into verifiable goals before starting: "add validation" → "write tests for invalid inputs, make them pass"; "fix the bug" → "failing repro test, make it pass". For multi-step work, state the plan as `step → verify: check` lines.

**Paid actions** (media-generation batches, paid APIs, cloud renders, deployments): state the estimated cost and get confirmation before anything non-trivial.

**No placeholder output.** For "ship the whole thing" tasks, banned in delivered code: `// ...`, `// rest of code`, stub TODOs, bare `...`, and prose escapes ("for brevity", "the rest follows the same pattern"). Count the deliverables the request implies, build every one, cross-check the count before responding. On a genuine length limit, stop at a clean breakpoint (end of file/function/section) and mark `[PAUSED — X of Y complete; continue from: <next>]` — never compress or skip the middle.

## 5a. Building from an approved mockup — the comp is king

When a mockup or comp has been approved, it is the specification, and the build runs in two phases. **The comp is a spatial contract, not a mood board: only the user can downgrade its authority, in explicit words, and difficulty never infers a downgrade.**

**Phase one is reproduction, not interpretation.** Rebuild the comp at its own breakpoint until a screenshot at the comp's width and height overlaps it near pixel-for-pixel — materials, components, elevation, assets, and implied design language included. Exactly three concessions exist: **fonts** (the closest obtainable face), **icons** (an exact match unless the user already chose a library), and **genuine defects in the comp itself**, like a spelling error. Everything else matches.

**The overlap comparison is the authority, never your conviction.** Models systematically believe their HTML, CSS, and SVG recreation succeeded when it did not — so put the screenshot beside the comp at identical dimensions after every region, and judge from that. When a region keeps losing the comparison, stop recreating it in code and produce it as a rendered asset composited into the page.

**Prove the hero before building past it.** Render the first viewport, capture it **at the comp's own pixel dimensions**, and set it beside the comp's first viewport *before* any later section. The hero carries the run's ambition and every following section inherits its shortfall. Judge scale and density as quantities: a field at a tenth of the comp's coverage, or type at half its weight, is a different design. Five minutes of retry here is what a rebuild verdict at the finish costs when this check is skipped.

Only once reproduction holds does **phase two** begin: static regions that should live become animated or interactive, reveals and motion go in, then responsiveness across the surface's devices. Where the comp doesn't cover the whole surface, continue inside its recorded world — a component the comp never shows inherits the system's corner language, line weights, and materials, and may not introduce container styles, border weights, or chrome the comp never uses.

## 6. Verification

**Never declare design work done without rendering it and critiquing the render against the locked brief.** Passing typecheck, clean build, or "the code looks right" is not done.

- **Render or screenshot the actual output**: browser screenshot for UI (at ~380px AND desktop width minimum, **plus the user's actual viewport width whenever the harness reports one** — an in-app browser size, a named resolution; the width that breaks is the one they see first), rendered frames or full render for video/motion, the real device class named in the brief when it matters.
- **A capture is evidence only when it is valid — validate before you judge.** Settle or disable entrance motion before capturing: an element hidden by animation timing reads as a *missing* element and gets "fixed" into a regression. Take full-page shots from the document top, and take a comp comparison at the comp's own pixel dimensions. Then open every file once and confirm it shows what its filename claims — no blank or black regions, no wrong section behind a right name, no half-loaded state. A review conducted on invalid evidence binds nothing.
- **User evidence outranks your own captures.** When the user answers a pass with evidence against it — a screenshot, a recording, a plain description of what they see — their evidence wins and the verification reopens. Say what your capture missed rather than defending it, and state the scope of any verdict honestly: a pass over three viewports is a pass over three viewports, not a pass.
- **Critique the render against the brief**: every locked field — register, style direction, banned qualities, motion tier, success criteria. A build that drifts from the brief is a failed build even if it "looks good".
- **Verify motion actually fires.** Transitions pause on hidden tabs and headless renderers; reveal animations gated on class-triggered transitions can ship blank sections. Confirm reveals enhance an already-visible default, and check the reduced-motion alternate exists.
- **Check overflow at every breakpoint**: long headings + large clamp scales + narrow grids overflow on tablet/mobile. The viewport is part of the design.
- **Check adjacent surfaces** your change could have regressed, not just the target.
- **Verify behaviorally**: drive the actual flow (click the interaction, scroll the hero, play the video), not just its static appearance.
- Report against the brief's success criteria explicitly: met / not met, with the evidence.

For mega-requests (5+ asks in one message): echo the asks back as a numbered checklist before working, and report per-item DONE / NOT DONE / PARTIAL at the end — never silent omission.

---
*Distilled from: grilling, pilot, mockups, impeccable, taste-skill (redesign protocol, output discipline), hallmark (structure grilling).*
