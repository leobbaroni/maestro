# Generative & Creative Coding

*Canvas 2D generative techniques: noise, particles, flow fields, fractals, physics-ish motion, palettes, seeding, and knowing when to leave canvas.*

## Canvas Setup (non-negotiable)

DPR-aware sizing — buffer at physical pixels, CSS at logical, or everything is blurry on Retina:

```js
function setupCanvas(canvas, width, height) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = width * dpr;  canvas.height = height * dpr;
  canvas.style.width = `${width}px`;  canvas.style.height = `${height}px`;
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  return ctx;
}
```

Resize via `ResizeObserver` on the parent (re-set buffer size, re-scale, redraw). Animation loop: cap delta to avoid the spiral of death — `const dt = Math.min((time - prev) / 1000, 0.1)`; keep `update(dt)` and `render(ctx)` separate; store the `requestAnimationFrame` id for cancellation.

Trail effects: **never `clearRect` every frame** — fade instead: `ctx.fillStyle = "rgba(0,0,0,0.03)"; ctx.fillRect(0,0,w,h)`. Lower alpha = longer trails.

## Noise

| Type | Character | Reach for |
|---|---|---|
| Perlin | Smooth, slight grid bias, cheapest | Terrain, clouds, gentle textures |
| Simplex | Isotropic, no grid artifacts | Flow fields, organic motion — the default |
| Worley (cellular) | Distance-to-nearest-point | Voronoi, cracks, caustics, cells |

Usage rules that matter more than the algorithm:
- **Scale coordinates down** — `noise2D(x * 0.003, y * 0.003)`. Raw pixel coords = static.
- **Animate with a third dimension** — `noise3D(x*s, y*s, z)` and advance `z += 0.002` per frame; slides the whole field smoothly.
- **Seed it** (see Seeding) — Fisher–Yates-shuffle the permutation table with a seeded PRNG.
- Output is [-1, 1]; remap deliberately (`n * Math.PI * 2` for angles, `n * 0.5 + 0.5` for [0,1]).

fBm — layered octaves for organic detail:

```js
function fbm(x, y, octaves = 4, lacunarity = 2, gain = 0.5) {
  let v = 0, amp = 1, freq = 1, max = 0;
  for (let i = 0; i < octaves; i++) {
    v += amp * noise2D(x * freq, y * freq);
    max += amp;  amp *= gain;  freq *= lacunarity;
  }
  return v / max; // normalized [-1, 1]
}
```

## Particle Systems

Fixed pool, zero runtime allocation. Kill via swap-with-last (keeps alive particles contiguous):

```js
const N = 10000;
// Struct-of-Arrays: flat typed arrays are cache-friendly and GC-free
const x = new Float32Array(N), y = new Float32Array(N),
      vx = new Float32Array(N), vy = new Float32Array(N),
      life = new Float32Array(N), maxLife = new Float32Array(N);
let count = 0;

function spawn(px, py, pvx, pvy, ttl) {
  if (count >= N) return;
  const i = count++;
  x[i] = px; y[i] = py; vx[i] = pvx; vy[i] = pvy; life[i] = 0; maxLife[i] = ttl;
}
function update(dt, gravity = 0, friction = 1) {
  for (let i = count - 1; i >= 0; i--) {
    vy[i] += gravity * dt;  vx[i] *= friction;  vy[i] *= friction;
    x[i] += vx[i];  y[i] += vy[i];
    if (++life[i] >= maxLife[i]) {          // swap-and-shrink
      count--;
      x[i]=x[count]; y[i]=y[count]; vx[i]=vx[count]; vy[i]=vy[count];
      life[i]=life[count]; maxLife[i]=maxLife[count];
    }
  }
}
```

Fade alpha by `1 - life/maxLife`; radial burst = evenly spaced angles with jittered speed and lifespan; stagger initial ages so respawns don't pulse in sync.

## Flow Fields

The classic generative recipe: a grid of noise-derived angles steers particles into organic line drawings.

1. Grid: `cols × rows` `Float32Array`, cell ≈ 20px, `field[r*cols+c] = noise3D(c*s, r*s, z) * Math.PI * 2`; advance `z` each frame to evolve the field.
2. Lookup: particle position → cell index → angle (return 0 out of bounds).
3. Steer: `vx += cos(a)*force; vy += sin(a)*force`, clamp speed to `maxSpeed`, apply friction `*= 0.96`.
4. Draw the segment from previous to current position (store `px, py` before moving) — lines, not dots.
5. Respawn on age-out or leaving the canvas; combine with trail-fade background.

Good defaults: force 0.2–0.3, maxSpeed 2, noiseScale 0.003–0.005, 1000–2000 particles. Color by field angle: `hue = angle/(2π) * 360`.

## L-Systems & Fractals

String rewriting + turtle graphics: axiom, production rules, turn angle, iterations (string grows exponentially — keep iterations 4–7).

```js
function lsystem(axiom, rules, n) {
  let s = axiom;
  while (n--) s = [...s].map((c) => rules[c] || c).join("");
  return s;
}
// Turtle: F=forward+draw, f=forward, +=turn right, -=turn left,
// [=push {x,y,angle}, ]=pop (branching). Fade alpha/width with stack depth for organic plants.
```

| Preset | Axiom | Rules | Angle | Iter |
|---|---|---|---|---|
| Plant | `X` | `X→F+[[X]-X]-F[-FX]+X`, `F→FF` | 25° | 6 |
| Koch snowflake | `F--F--F` | `F→F+F--F+F` | 60° | 4 |
| Sierpinski | `F-G-G` | `F→F-G+F+G-F`, `G→GG` | 120° | 6 |
| Dragon curve | `FX` | `X→X+YF+`, `Y→-FX-Y` | 90° | 12 |
| Binary tree | `F` | `F→FF+[+F-F-F]-[-F+F+F]` | 22.5° | 4 |

Strange attractors (Lorenz: `dx=σ(y−x)`, `dy=x(ρ−z)−y`, `dz=xy−βz`; classic σ=10, ρ=28, β=8/3): integrate with **RK4, not Euler** — chaotic systems diverge fast under crude integration. Keep a ring-buffer trail, project 3D→2D (x→screen.x, z→screen.y), step 5–10× per frame, color/alpha along the trail.

## Physics-ish Motion

- Euler integration is fine for particles: `v += a*dt; p += v*dt` with friction `v *= 0.96–0.99`.
- Spring toward a target: `v += -k*(p - target)*dt - damping*v*dt; p += v*dt` (k≈100, damping≈10) — overshoot and settle.
- Smooth follow: `p += (target - p) * 0.05` per frame (frame-rate-safe: `1 - Math.exp(-rate*dt)`).
- Clamp speed after applying forces; cap `dt`; use RK4 only when trajectories must be accurate (attractors, orbits).

## Palettes

- Constrain: 2–4 hues beats a rainbow. Derive variation from data, not extra colors — map angle/velocity/age to hue *within a narrow band* (`hsla(${200 + n*60}, 70%, 60%, a)`).
- Encode state in the non-hue channels: age → alpha, speed → lightness, depth → saturation.
- Dark backgrounds (`#0a0a0f`-ish, not pure black) + additive-feeling strokes (`globalCompositeOperation = "lighter"`) flatter luminous particle work.
- Code-defined ramps for heat-map looks: piecewise `mix(shadow, mid, t*2)` / `mix(mid, highlight, (t-.5)*2)` — same trick as shader gradient maps.
- Keep stroke alpha low (0.05–0.3) and let density build the image; accumulation is the palette's best friend.

## Seeding & Reproducibility

Every random source must be seedable or the piece can't be reproduced, tuned, or rendered deterministically to video.

```js
function mulberry32(seed) {          // seeded PRNG — replaces Math.random everywhere
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(42);
```

- Seed noise too: shuffle the simplex permutation table with the seeded PRNG (Fisher–Yates driven by an LCG or mulberry32).
- One master seed at the top; derive sub-seeds (`seed+1`, `seed*31+i`) per subsystem so tweaking one doesn't reshuffle all.
- Surface the seed in the URL/UI — "reroll" = new seed, "keep" = share the number.
- For deterministic video: seed everything, drive from frame time (not wall clock), and never call unseeded `Math.random` in the loop.

## Performance

- **Never allocate in the hot loop** — no `new`, object literals, closures, or array methods per particle. Pre-allocate; reuse scratch vars; prefer typed arrays (SoA).
- **Never `getImageData` in the loop** — it's a GPU readback that stalls the pipeline. Sample once, cache the buffer.
- **Batch canvas state**: group draws by `fillStyle`/`strokeStyle`; one `beginPath()` + many segments + one `stroke()` where color allows; minimize `save()/restore()`.
- **Double buffer**: draw to an offscreen canvas, blit with one `drawImage` — kills flicker, enables layered trail effects.
- **OffscreenCanvas + Worker**: `canvas.transferControlToOffscreen()` moves render work off the main thread for heavy sims.
- Indexed loops over `forEach`; cap particle counts; measure before micro-optimizing.

## Canvas vs SVG vs WebGL/Shaders

| Medium | Choose when | Avoid when |
|---|---|---|
| **Canvas 2D** | Thousands of particles, trails/accumulation, per-frame full redraws, pixel-y generative work | Need crisp scaling, DOM events per shape, export-to-vector |
| **SVG** | Few hundred elements, needs CSS/DOM interaction, resolution-independent output, print/export | Per-frame updates of many nodes (DOM churn kills it) |
| **CSS `transform3d`** | Simple 3D tilt/parallax on UI elements | Anything needing a real scene or lighting |
| **WebGL / shaders** | 10k+ particles, per-pixel effects (fBm fields, feedback), true 3D, blur/glow at scale | Simple sketches — the boilerplate isn't worth it |

Rules of thumb: Canvas 2D comfortably drives ~10k simple particles at 60fps; past that, move the simulation into shaders/GPU. If the visual is *math per pixel* (plasma, metaballs, reaction–diffusion) it's a fragment shader, not a canvas loop. If it's *shapes users click*, it's SVG. Prototype in Canvas 2D, port the winner.

---

*Distilled from: genjutsu canvas-generative (SKILL + algorithms reference), genjutsu threejs-r3f.*
