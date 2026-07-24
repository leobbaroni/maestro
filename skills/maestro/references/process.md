# The Maestro Method

*Process discipline for design/motion/video work: interview before building, lock the brief, fan out options behind a user gate, run the right ritual per phase, and never declare done without rendered verification.*

## Core law

The two most expensive failure modes are **building before the brief is locked** and **improving without concrete criteria**. Every rule below exists to prevent one of them. Bias toward caution over speed; for trivial tasks, use judgment.

**Quick routing:** most requests are a phase — detect it and run its ritual (§4's table). The two decisions that aren't a phase:

| Incoming request | First move |
|---|---|
| Significant new screen/page/surface | Mockup fan-out + user gate (§3) |
| Small tweak, fully-specified change | Just do it — then verify (§6) |

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

### 1a. Design authority — ask, don't assume

Maestro carries three design houses with genuinely different instincts (`references/commands.md`). On the same brief they produce different work, so **which one leads is a user decision** — one of the first questions in any substantial design grill, and the one to push hardest on, because every later answer inherits from it.

Ask by **look and feel, never by skill name**. The user is picking a result, not a vendor:

| Offer it as | Leads to | Reads as | Best when |
|---|---|---|---|
| "Structure-led: a page shaped unlike the usual — the layout itself is the idea" | hallmark | Editorial, art-directed, print-adjacent; strong shapes, committed themes | Landing pages, portfolios, brand sites, anything that must not look templated |
| "Polish-led: conventional shape, uncommonly well finished — no AI tells anywhere" | taste-skill | Confident, current, premium; the details survive zooming in | Marketing surfaces, launches, redesigns of something already close |
| "Craft-led: usability and system rigor first, taste in service of the work" | impeccable | Calm, legible, systematic; nothing shouts | Dashboards, product UI, tools, dense data, anything people use daily |
| "Blend (recommended default)" | all three composing | Structure from one, finish from another, rigor throughout | Most page work — see the composition note in `SKILL.md` |

Mechanics that make the choice real:

- **Show, don't name.** Two or three concrete sentences of what the result looks like per option — a named reference site, the type attitude, how dense it feels. A user who can't picture the outcome can't choose it.
- **Recommend one and say why** in the same breath (register usually decides it: product surface → craft-led; brand surface → structure- or polish-led).
- **Push once past a lazy answer.** "Whatever looks best" is not a pick — reply with the two most different options rendered as sentences and ask which one they'd rather land on. If they still decline, choose, state the choice and the reason, and treat it as locked.
- **Ask preference questions in the same pass:** which of their references they actually love versus merely tolerate; what they never want to see; whether they want the safe or the ambitious version of this brief.
- **A named house wins over every default and every hierarchy.** "Do it hallmark-style" ends the conversation — the standing `taste-skill > hallmark > impeccable` order only breaks ties the user did not break.
- **Lock it into the brief** (§2) and honor it downstream: it decides which protocol runs when verbs overlap (`references/commands.md`), and re-opening it mid-build is a direction change that needs the user, not a quiet swap.

## 2. Brief lock

The grill ends when the brief contains all of the following. Freeze it into a file (SPEC.md / DESIGN.md / the project's brief doc — template: `templates/BRIEF.md`), not chat — it must survive compaction and future sessions.

| Field | Locked form |
|---|---|
| **Audience / register** | One-sentence physical scene: who uses this, where, under what light, in what mood ("a gym-goer between sets, phone in one hand, sweaty thumb"). If the sentence doesn't imply light/dark, density, and tone, sharpen it until it does. |
| **Design authority** | Which house leads (structure-led / polish-led / craft-led / blend — §1a), who chose it (user or you-by-default), and the one-line reason. Governs which protocol runs when verbs overlap (`references/commands.md`). |
| **Platform** | Target surfaces and breakpoints (e.g. mobile-first ~380px + 1440px desktop; 16:9 vs 9:16 for video). |
| **Style direction** | The Design Read one-liner first (`references/design-direction.md` step 0), then 1+ concrete references (site/app/screenshot) with *what to steal from each*, plus 2–3 **banned qualities** ("no card grid", "not so text-dense", "no corporate blue"). |
| **Page shape + theme** | For page-scale work: the picked macrostructure, nav/footer archetypes, and theme (or the custom fork) from `references/page-anatomy.md` — plus what the previous build used, so this one differs. |
| **Motion tier** | *calm* (subtle fades, hover states only) · *lively* (micro-interactions, staggered entrances, one animated accent) · *showpiece* (scroll-driven sections, animated hero, page-transition feel). The tier shapes everything downstream. |
| **Dials** | Brand surfaces also lock DESIGN_VARIANCE / MOTION_INTENSITY / VISUAL_DENSITY values with a one-line reason (inference table: `references/design-direction.md`). DENSITY drives the spacing bands; MOTION crosswalks to the tier above. |
| **Constraints** | Tech stack, existing tokens/components to honor, real content (actual headline/copy/data — lorem ipsum is auto-rejected), budget/paid-action limits, non-goals. |
| **Success criteria** | One checkable done-condition ("the table fits 380px with no horizontal scroll", "the hero makes people stop"). Weak criteria ("make it work") burn turns; strong criteria let you loop independently. |

**Mid-session rule corrections:** when the user states a rule mid-session ("X should always count as Y"), that is a brief amendment — write it into the brief file immediately and cite the file in your reply.

## 3. Mockup fan-out (hard user gate)

Never build a significant new screen, page, or visual redesign from a single guess. The user picks from options before implementation.

**When to fan out vs. build straight:**

| Situation | Path |
|---|---|
| New significant surface (screen, page, hero, full redesign) | Fan out N options, gate on the pick |
| Direction itself is contested or user is undecided on style | Fan out |
| Small tweak, component-level change, or direction already picked | Straight to build |
| Brief fully constrains the design (only one reasonable outcome) | Straight to build, N=1 implicitly |

Default **N = 3**; confirm N with the user during the grill. Uninformed options are as useless as no options — the fan-out is earned by the locked brief and a moodboard first.

**Sequence:**

1. **Moodboard.** Extend the user's references to 3–5 total, searching by register, not by industry (industry-search reproduces the category reflex). Present each with one line: *what to steal from it* — a layout grammar, a type attitude, an interaction; never "the whole thing". Get a nod (bundle with open brief questions). If the user said "just go", pick it yourself and state it.
2. **Fan out.** One design agent per option, in parallel, all fed the same brief + moodboard, plus **one distinct art direction each** — a different color-strategy tier, type pairing, layout grammar. Structurally different, not N accent-color swaps. **When the user couldn't pick a design authority from description alone (§1a), spend the fan-out on that question**: one option per house (structure-led / polish-led / craft-led), each run through that house's own protocol, so the pick chooses the authority for the rest of the project as well as this screen. Label them by look, not by house name; reveal which is which after the pick.
3. **Option requirements.** Each option: one self-contained HTML/CSS/JS file (everything inline, no external requests), real fonts, real content from the brief, contrast floors respected. Each names and **demonstrates its one signature interaction live**, animated to the brief's motion tier, with a `prefers-reduced-motion` alternate. Self-checked at ~380px and 1440px for overflow and for animations actually firing. **One authoring pass each — no browser-iteration loops on throwaways.**
4. **The gate (hard stop).** Present all N with: art-direction label, one-line concept, signature interaction, and where to look for the motion ("scroll the hero"). Then **stop and wait for the pick**. No implementing, no "head start" on a likely winner.
5. **On rejection of all N:** ask for two concrete dislikes and one new reference, then regenerate. Never regenerate blind.
6. **Implement the winner** in the real app using the project's actual components, tokens, and data — the mockup is a design contract, not code to paste. Merge ideas from losing options only if the user named them in the pick ("2, but with 3's header"). Record the direction and pick in the project log.

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
4. Build. New significant UI surfaces route through the mockup gate (section 3) before implementation.
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

## 6. Verification

**Never declare design work done without rendering it and critiquing the render against the locked brief.** Passing typecheck, clean build, or "the code looks right" is not done.

- **Render or screenshot the actual output**: browser screenshot for UI (at ~380px AND desktop width minimum), rendered frames or full render for video/motion, the real device class named in the brief when it matters.
- **Critique the render against the brief**: every locked field — register, style direction, banned qualities, motion tier, success criteria. A build that drifts from the brief is a failed build even if it "looks good".
- **Verify motion actually fires.** Transitions pause on hidden tabs and headless renderers; reveal animations gated on class-triggered transitions can ship blank sections. Confirm reveals enhance an already-visible default, and check the reduced-motion alternate exists.
- **Check overflow at every breakpoint**: long headings + large clamp scales + narrow grids overflow on tablet/mobile. The viewport is part of the design.
- **Check adjacent surfaces** your change could have regressed, not just the target.
- **Verify behaviorally**: drive the actual flow (click the interaction, scroll the hero, play the video), not just its static appearance.
- Report against the brief's success criteria explicitly: met / not met, with the evidence.

For mega-requests (5+ asks in one message): echo the asks back as a numbered checklist before working, and report per-item DONE / NOT DONE / PARTIAL at the end — never silent omission.

---
*Distilled from: grilling, pilot, mockups, impeccable, taste-skill (redesign protocol, output discipline), hallmark (structure grilling).*
