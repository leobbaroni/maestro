# Generative Engines

*Which engine actually runs this, and on whose money. The reachability layer under every generative task: probe what this machine can reach, route OSS against paid deliberately, gate on local hardware, and know the silent failures. `generative-direction.md` owns the prompt grammar; this module owns the engine.*

## Upstream is the baseline here

Two first-party corpora are vendored, and **they outrank maestro's prose on anything mechanical** — command syntax, model IDs, flags, parameter enums, error strings, routing between a vendor's own products:

| Corpus | Vendored | Authoritative for |
|---|---|---|
| **higgsfield-skills** (`library/higgsfield-skills/`) | 8 skills + 12 reference modules, MIT | The `higgsfield` CLI, model IDs and their flags, Marketing Studio, Soul ID identity locking, Virality Predictor, per-model media-role tables |
| **comfy-skills** (`library/comfy-skills/`) | 12 skills + the OpenClaw router, MIT | ComfyUI workflow mechanics, template vs node routing, the OSS/partner split, `search_*` discovery, MiniMax H3 specifics |

Read the vendored file before answering a mechanical question. A flag spelled out here is a convenience copy that can rot; **the corpus is the source, and the live tool is above them both.** Where this module and a vendored skill disagree on mechanics, the corpus wins and this file is the bug.

**Where maestro overrides upstream is narrow and deliberate** — see *The three overrides* at the end. Everything not named there follows upstream exactly.

## Probe before you propose

`generative-direction.md`'s model gate says *"read what is actually reachable."* This is how — tool calls, not an assumption, and never a recitation of models the user may not have.

| Surface | Probe | What comes back |
|---|---|---|
| **ComfyUI, local** | comfy-mcp `server_info` | `server.running` + `url`, the workspace path, and `hardware` — GPU, VRAM, RAM. Gates everything below |
| **ComfyUI, hosted** | The Comfy Cloud MCP at `https://cloud.comfy.org/mcp`, or `/plugin install comfy-cloud@comfy-skills` | A standardized catalog rather than the user's live install — it cannot see their custom nodes or local models, which is exactly the difference that matters when a workflow depends on one |
| **ComfyUI, free local models** | `search_templates(query, exclude_api=true)` | Templates that run on the user's own GPU at no charge |
| **ComfyUI, hosted partners** | `list_partner_models()` | The partner alias catalog `partner_generate` serves — one call, one table, real names |
| **Higgsfield** | `higgsfield model list --json`, or the MCP's `models_explore` | The live catalog with per-model `parameters`, `aspect_ratios`, `durations`, and media `roles` |
| **Neither reachable** | — | Say so in one line and route to a code-rendered engine (`video-canvas.md`, `video-remotion.md`, `video-hyperframes.md`), which need no credits at all |

**The probe replaces the recitation.** Do not name a model from memory and do not inherit one from an example in these modules — every model name written anywhere in maestro is a filled-in adapter, and engine lineups turn over faster than a document can track. The probe is cheap, current, and specific to this user; a remembered lineup is none of those.

**Absence from a catalog is not proof of absence.** Comfy's partner list is a pinned allowlist compiled into the installed CLI — a missing model means *upgrade comfy-cli*, not *the model does not exist*. Say "I don't see it on this install" and name the upgrade, never "that model isn't available."

### The evidence precedence rule

Borrowed from comfy-skills and worth stating as maestro law, because it resolves the case that actually bites — two lookups disagreeing inside one session:

- **A lookup that returns something outranks your older evidence.** If a fresh result shows a route moved or was renamed, follow the live result.
- **Older direct evidence outranks a later empty lookup.** A successful run, or files a call already showed present, is not undone by a query that came back blank.
- **Never deny a route on an empty result alone.** Broaden the query — drop version numbers, try the bare family name — before telling a user a capability is missing.

*"Never tell a user the OSS route doesn't exist for a family that has one — that's a wrong answer, not a cautious one."* Cautious-sounding and wrong is still wrong.

## The route gate — OSS against paid, chosen by the user

Many model families ship **twice**: open weights that run on the user's own hardware, and a paid partner endpoint behind the same display name. Routing that choice silently is the expensive failure this gate prevents.

| The family exists as… | Do this |
|---|---|
| **Partner/API only** | Route directly. Say the per-run price is the partner's, on top of any compute |
| **OSS only** | Route to it. Don't guess a partner slug for a model that has none |
| **Both** | **Stop and ask.** Never auto-route to the paid path — name both with the honest trade and let the user pick |

When both exist, state the trade plainly: **OSS** carries no partner fee, runs slower, and needs the hardware — *and it is only free of charge when the user runs it on their own machine*; on a hosted runner it still spends that platform's compute credits. **Paid partner** is fast, indifferent to local hardware, and bills per run.

That "free" distinction is the one users get wrong, so say it before submitting rather than after. Skip the ask only when the user already chose ("the free one", "local", "OSS", or naming a paid product outright), or when one route is genuinely unavailable right now — and when a route is unavailable, say which and why.

**Telling them apart is by origin, not by naming instinct.** Template names carry the convention — `video_*` is the OSS template, `api_*` the paid one — while node class names are CamelCase on both routes and are separated by `category`: `partner/…` is paid, `model/…` is open. Filter `search_nodes` by category to list one route alone. One empty lookup is inconclusive.

## The local-hardware gate

An OSS video model on the user's own GPU is the cheapest path and the one most likely to fail. **Quote the estimate before running, so a user on a small card decides with full information.**

| Check | Source | Why it gates |
|---|---|---|
| VRAM and system RAM | `server_info` → `hardware` | Offloading widens what a card can attempt but never guarantees it; headroom is VRAM *and* RAM *and* resolution *and* duration together |
| Comfortable range | comfy-skills, 2026-08 | A 30-series-or-newer GPU with **16+ GB VRAM**, and enough system RAM that offloaded weights don't starve the host |
| Reference timings | comfy-skills, 2026-08 | ~**9 minutes** for 5s at 480p on a 3060; ~**15 minutes** for 5s on a 16 GB card |
| Scaling | — | Generation time scales with **pixel count, not linearly**. Re-estimate for the resolution actually asked for; never scale those numbers by hand |

Below the comfortable range, out-of-memory is a real outcome rather than a slow success. When it happens, drop resolution or duration — don't re-run the same job hoping. For production quality, generate at the model's native canvas and upscale afterward rather than requesting a large canvas directly.

**Say the number, then let them choose.** "That's about fifteen minutes on your card, and may OOM at 720p" is a decision the user can make. Starting the run and reporting the outcome afterward is not.

## Silent failures — the ones that bill you for nothing

Generative failure is usually loud. These are quiet, and quiet is what wastes money:

| Failure | What you see | Fix |
|---|---|---|
| **No save node wired** | The job completes successfully and produces nothing retrievable | Partner/API nodes emit a tensor but ship **no save node by default**. Confirm an output node (`VHS_VideoCombine`, `SaveVideo`, `SaveAnimatedWEBP`, or the node's own save) is wired to the final tensor before submitting. Never skip this check |
| **No input node** | A workflow that runs but ignores the brief | Confirm the user's intent has a path in — `CLIPTextEncode` for the prompt, `LoadImage` for image-to-video |
| **A template that isn't runnable here** | Fetch succeeds, run fails | The gallery catalog is cached independently of the install. Clear `local_check` before running; `{"checked": false}` means *could not compare*, not *fine* — validate it yourself |
| **A disconnected helper left on purpose** | Validation flags the OSS image-to-video template | Expected. Prune the helper pair or wire an IMAGE link in, then proceed — not a dead end |

## Engine surfaces, by what they're good for

Capabilities rather than names, because names churn and capabilities don't:

| The job needs | Reach for |
|---|---|
| Iteration at no marginal cost, full graph control, LoRAs, ControlNet, character replacement, motion transfer | **ComfyUI local** — free per run, bounded by the GPU |
| One breadth catalog across many vendors without per-vendor accounts | **ComfyUI partner models** — one surface, per-run partner pricing |
| ComfyUI workflows with no local GPU at all | **Comfy Cloud** — the hosted runner; discovery tools are free, execution needs a subscription and spends compute credits even on open-weight models |
| Identity that survives across many assets | **Higgsfield Soul ID** — a trained reusable identity, chained by `reference_id` into later generations |
| Branded ads, UGC, unboxing, presenter video from a product URL | **Higgsfield Marketing Studio** — avatars, products, hooks, settings, ad references |
| Scoring a *finished* cut for hook and retention | **Higgsfield Virality Predictor** (`brain_activity`) — video in, text report out |
| Frame-exact, versionable, re-renderable output | **None of the above.** A model cannot hit a spec twice — code-rendered engines only |

That last row is the standing boundary and it does not move: photoreal humans, real locations, and material texture are what generation is for; anything that must render identically twice stays in code.

## The three overrides

Upstream is the baseline everywhere except here. Each override exists because a first-party product skill is written for a context where spending is the point, and maestro runs inside a process pack where an unapproved spend is a defect.

**1. Cost is stated before a paid batch, always.** higgsfield-generate's UX rule 5 says not to pre-estimate cost or optimize for cheaper models unless asked. That is right for a vendor's own console and wrong here: cockpit's standing rule is that paid actions state estimated cost and get confirmation before anything non-trivial, and `generative-direction.md` prices the asset manifest before the first prompt runs. Follow the vendor's *mechanics*; keep maestro's *consent*. Comfy's own route gate already agrees — when it says name both options and let the user pick, that is this rule in upstream's own words.

**2. The engine is the user's pick, not a default.** Upstream ships sensible defaults, and they are genuinely good starting proposals. They are **proposals**, not selections. The model gate in `generative-direction.md` holds: propose concretely, offer the real alternatives, and let a load-bearing asset earn a bake-off. A default silently adopted is the failure that gate exists to prevent, and avoiding it is the user's standing instruction.

**3. Continuity outlives the tool.** Upstream locks identity inside the platform — Soul ID, ad references, brand kits, all excellent and all living in the vendor's account. maestro's ledger (`CHARACTERS.md`, `WORLD.md`, `MODELS.md`, `ASSETS.md`) still gets written, because a lock held only in a vendor's database dies at a platform migration and cannot be read back by the next session. **Record the platform handle in the ledger next to the description** — `soul_ref_id`, product id, brand-kit id — so the two stay joined and either can rebuild the other.

Everything else — every model ID, every flag, every mode slug, every error string, the Marketing Studio object model, the OSS/partner split, the discovery guardrail — comes from the vendored corpora, and drifts when they drift.

---
*Distilled from: higgsfield-ai/skills (vendored in `library/higgsfield-skills/`) and Comfy-Org/comfy-skills (vendored in `library/comfy-skills/`), both MIT; plus live capability probes against comfy-mcp and the Higgsfield MCP. Model names and benchmarks are the upstreams' 2026-08 reference points — probe, don't recall.*
