# gsap-skills — vendor notes (maestro-authored)

*maestro's manifest, not upstream material. Everything else in this tree is an unmodified copy.*

Source: [greensock/gsap-skills](https://github.com/greensock/gsap-skills), MIT (`LICENSE`
carried). GreenSock's own skill set — **authoritative on GSAP API facts**, which is why
`../../references/gsap.md` defers to it on any conflict rather than the other way round.

## Contents

`skills/<name>/SKILL.md`, eight of them: `gsap-core` · `gsap-timeline` · `gsap-plugins` ·
`gsap-scrolltrigger` · `gsap-react` · `gsap-frameworks` · `gsap-performance` · `gsap-utils`.
Plus `skills/llms.txt`, the machine-readable index.

Load one when the distilled module points here, when a plugin's exact API surface matters, or
when a GSAP behaviour contradicts what `gsap.md` says — the upstream wins on API facts.

Left upstream: the framework `examples/` (Nuxt, React, Vue, vanilla starters) and `assets/`.
They are runnable demos rather than reference material; clone the repo when you want them.

Don't edit vendored files — local judgment belongs in the distilled modules.
