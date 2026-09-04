# Notice & Attribution

Maestro has two layers with different licensing postures:

- **Distilled modules** (`skills/maestro/references/`) are rewritten, merged, and
  editorially resolved guidance informed by the upstream projects below — no verbatim
  redistribution. Where a module tracks one source closely (schemas, API contracts), that
  source is named in the module's footer.
- **Vendored library** (`skills/maestro/library/`) contains **unmodified verbatim copies**
  of **nine** permissively licensed corpora, each shipped with its own license file:
  [taste-skill](https://github.com/Leonxlnx/taste-skill),
  [genjutsu](https://github.com/AThevon/genjutsu),
  [gsap-skills](https://github.com/greensock/gsap-skills),
  [design-dna](https://github.com/zanwei/design-dna),
  [motion-design-skill](https://github.com/lottiefiles/motion-design-skill),
  [higgsfield-ai/skills](https://github.com/higgsfield-ai/skills) and
  [Comfy-Org/comfy-skills](https://github.com/Comfy-Org/comfy-skills) (all MIT);
  [impeccable](https://github.com/pbakaus/impeccable)'s reference corpus
  (Apache-2.0, © Paul Bakaus — its upstream NOTICE.md is carried alongside per §4(d)); and
  a subset of [video-shotcraft](https://github.com/Vincentwei1021/video-shotcraft)
  (Apache-2.0, © Wei Yihao — shot cards, pipeline, demos and components; its preview
  gallery, template project, and audio binaries are not redistributed. Third-party audio
  it references carries separate per-file licensing recorded in its ATTRIBUTION manifest).
  A tenth directory, `higgsfield-directors/`, is the author's own material and tracks no
  upstream. **hallmark is no longer vendored** as of 5.0.0; the knowledge it contributed
  remains distilled in the judgment layer and is attributed in the table below.

| Upstream | What maestro drew from it | License |
|---|---|---|
| [impeccable](https://github.com/pbakaus/impeccable) by Paul Bakaus | Design craft, typography, layout, color, critique/audit, brand, delight, hardening, process discipline | Apache-2.0 (reference corpus also vendored) |
| [genjutsu](https://github.com/AThevon/genjutsu) by Adrien Thevon | Motion principles, CSS/Framer Motion/GSAP patterns, Three.js/R3F, generative canvas, design audit, native platforms (SwiftUI/Compose/mobile/desktop) | MIT |
| [gsap-skills](https://github.com/greensock/gsap-skills) by GreenSock/Webflow | Authoritative GSAP API guidance: core, timelines, ScrollTrigger, plugins, React, performance | MIT |
| [threejs-skills](https://github.com/CloudAI-X/threejs-skills) by CloudAI-X | Three.js fundamentals through shaders and postprocessing | No license published; content rewritten, credited here |
| [design-dna](https://github.com/zanwei/design-dna) by zanwei | The Design DNA schema and extraction/generation workflow | MIT |
| [motion-design-skill](https://github.com/lottiefiles/motion-design-skill) by LottieFiles | Universal motion principles: timing, easing, choreography, Disney principles for UI | MIT |
| [remotion](https://github.com/remotion-dev/remotion) by Remotion | Official Remotion best practices: markup, timing, sequencing, captions, rendering | Remotion License (see upstream) |
| [hyperframes](https://github.com/heygen-com/hyperframes) by HeyGen | The HTML-to-video composition contract, animation rules/blueprints, video direction craft | See upstream LICENSE |
| [taste-skill](https://github.com/Leonxlnx/taste-skill) by Leonxlnx | Anti-slop frontend framework, style sub-skills (brutalist/minimalist/soft/brandkit), redesign and image-to-code protocols | MIT (also vendored) |
| [hallmark](https://github.com/nutlope/hallmark) by Together AI | **Retired as a tracked source in 5.0.0** and no longer vendored — its macrostructure catalog was the convergence ceiling maestro removed. Contributions that remain absorbed in the judgment layer, and which this attribution covers: slop-test gates, type/colour/overflow gates, the motion budget, microinteractions, roman headers, the diversification rule, the study protocol, and structure grilling | MIT |
| [video-shotcraft](https://github.com/Vincentwei1021/video-shotcraft) by Wei Yihao | Product-video shot vocabulary, production pipeline, aesthetic-rule precedents, sound design and music beat-sync | Apache-2.0 (partially vendored) |
| [skills](https://github.com/higgsfield-ai/skills) by Higgsfield AI | **The baseline for generative-media mechanics**: CLI surface, model IDs and flags, Marketing Studio object model, Soul ID identity chaining, Virality Predictor, product-photoshoot modes, brandkit slot system, thumbnail truth constraints, generated-asset system | MIT (vendored) |
| [comfy-skills](https://github.com/Comfy-Org/comfy-skills) by Comfy-Org | **The baseline for ComfyUI mechanics**: template vs node routing, the OSS/partner split and its consent gate, `search_*` discovery, save-node validation, hardware gating, and the evidence-precedence rule | MIT (vendored) |

Maestro's process rituals additionally fold in the interview-first ("grilling"),
phase-ritual ("pilot"), and mockup-fan-out ("mockups") disciplines from the author's
local skill library, and design-source curation from a local "design-kit" library.

Using a library mentioned in these modules (GSAP, Remotion, Three.js, HyperFrames,
Motion, anime.js, Lottie) is governed by **that library's own license**, not maestro's.
