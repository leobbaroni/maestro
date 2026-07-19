# Three.js & WebGL

*Correct-by-default Three.js: scene setup, PBR, deterministic animation, shaders, R3F, and the performance discipline that keeps 60fps.*

## Scene Fundamentals

Renderer setup done right — every project:

```js
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // ALWAYS clamp DPR
renderer.outputColorSpace = THREE.SRGBColorSpace;             // r152+ default, be explicit
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
```

Camera: `new THREE.PerspectiveCamera(fov, aspect, near, far)`. fov 35–45 = cinematic, 60–75 = immersive, 20–30 = telephoto/compressed. Call `camera.updateProjectionMatrix()` after changing fov/aspect/near/far. OrthographicCamera for isometric/2D-in-3D: compute left/right/top/bottom from a `frustumSize * aspect`.

Resize handler — the three-line ritual, never skip a line:

```js
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
```

Animation loop — delta-driven, never per-frame constants:

```js
const clock = new THREE.Clock();
function animate() {
  const delta = clock.getDelta();          // seconds since last frame
  const t = clock.getElapsedTime();        // total seconds
  mesh.rotation.y += delta * 0.5;          // framerate-independent
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
```

Scene extras: `scene.background` (Color | texture | cubemap), `scene.environment` (env map lighting for all PBR materials), `scene.fog = new THREE.Fog(color, near, far)` or `FogExp2(color, density)`.

Coordinate system is right-handed: +X right, +Y up, +Z toward viewer. `new THREE.AxesHelper(5)` → red=X, green=Y, blue=Z.

Object3D essentials: `.position/.rotation/.quaternion/.scale`, `.add/.remove`, `.visible`, `.traverse(cb)`, `.getWorldPosition(target)`, `.layers` for selective render/raycast, `.renderOrder` for transparency ordering. Group = empty container; transform the group, not each child.

Math you reach for constantly: `Vector3.lerp/normalize/distanceTo/dot/cross`, `Quaternion.slerp`, `MathUtils.clamp/lerp/mapLinear/degToRad/smoothstep`, `v.project(camera)` (world→NDC) / `v.unproject(camera)` (NDC→world).

## Geometry

| Constructor | Notes |
|---|---|
| `BoxGeometry(w,h,d)` | Segments optional |
| `SphereGeometry(r, 32, 32)` | 16 = perf mode, 64 = high quality; partial phi/theta = hemisphere |
| `PlaneGeometry(w,h,segW,segH)` | High segments (128×128) required for vertex displacement |
| `CylinderGeometry(rTop,rBot,h,radial)` | rTop=0 → cone; 6 radial → hex prism |
| `TorusGeometry(r, tube, 16, 100)` / `TorusKnotGeometry` | Classic demo shapes |
| `IcosahedronGeometry(r, detail)` | Best sphere for displacement shaders (uniform vertices) |
| `CapsuleGeometry`, `RingGeometry`, `CircleGeometry` | — |
| `ExtrudeGeometry(shape, {depth, bevelEnabled, ...})` | 2D `THREE.Shape` → 3D with bevels |
| `LatheGeometry(points, segments)` | Revolve a 2D profile |
| `TubeGeometry(curve, 64, r, 8)` | Along a `CatmullRomCurve3` |
| `TextGeometry(str, {font, size, depth, bevel...})` | Needs `FontLoader` + typeface JSON; `geometry.center()` after |

Custom BufferGeometry: `setAttribute("position", new THREE.BufferAttribute(float32Array, 3))`, `setIndex(...)` to reuse vertices, `setAttribute("normal", ...)` required for lighting (or `computeVertexNormals()`), `"uv"` (itemSize 2) for texturing, `"color"` (itemSize 3) + `material.vertexColors = true`. After mutating attributes: `attr.needsUpdate = true`, then `computeVertexNormals()` / `computeBoundingSphere()` as needed.

Points/lines: `THREE.Points(geometry, PointsMaterial({size, sizeAttenuation}))`; `THREE.Line/LineLoop/LineSegments` with `LineBasicMaterial` (linewidth >1 is unsupported on most platforms). Dashed lines need `line.computeLineDistances()`.

`EdgesGeometry(geo, thresholdAngle)` for hard-edge outlines; `WireframeGeometry` for all triangles.

Utilities (`three/addons/utils/BufferGeometryUtils.js`): `mergeGeometries([...])` to collapse static meshes into one draw call, `computeTangents()` before normal-mapping custom geometry. Also `geometry.center()`, `geometry.scale/rotateX/translate`.

## Materials — PBR Decision Table

| Material | Use when | Cost |
|---|---|---|
| `MeshBasicMaterial` | Unlit flat color, wireframe, UI planes | Lowest |
| `MeshLambertMaterial` | Matte + cheap, mobile fallback | Low |
| `MeshPhongMaterial` | Cheap specular highlight, plastic | Low-mid |
| `MeshStandardMaterial` | **Default choice** — PBR roughness/metalness | Mid |
| `MeshPhysicalMaterial` | Glass, clearcoat, sheen, iridescence, anisotropy | High |
| `MeshToonMaterial` | Cel shading (+ NearestFilter gradientMap for steps) | Low |
| `MeshNormalMaterial` | Debug normals | — |
| `ShaderMaterial` / `RawShaderMaterial` | Custom GLSL | Yours |

Standard PBR: `roughness` 0=mirror→1=diffuse, `metalness` 0=dielectric→1=metal. Full texture set: `map` (sRGB), `normalMap` + `normalScale`, `roughnessMap`/`metalnessMap` (grayscale, values multiply the scalar), `aoMap` (**requires** `geometry.setAttribute("uv2", geometry.attributes.uv)`), `emissiveMap` + `emissive` + `emissiveIntensity`, `displacementMap` + `displacementScale`, `envMapIntensity`.

Physical presets worth memorizing:

```js
// Glass
new THREE.MeshPhysicalMaterial({ metalness: 0, roughness: 0, transmission: 1, thickness: 0.5, ior: 1.5 });
// Car paint
new THREE.MeshPhysicalMaterial({ color: 0xff0000, metalness: 0.9, roughness: 0.5, clearcoat: 1, clearcoatRoughness: 0.1 });
```

Shared properties: `transparent`+`opacity` (forces sorting — prefer `alphaTest` when possible), `side: THREE.DoubleSide` (2× fragment cost), `depthWrite: false` for stacked transparents, `blending: THREE.AdditiveBlending` for glows, `polygonOffset` to fix z-fighting. `material.needsUpdate = true` only when toggling flags like flatShading/transparent or swapping shader code, not for color/uniform changes.

Multi-material: `new THREE.Mesh(geometry, [m0, m1])` + `geometry.addGroup(start, count, materialIndex)`.

## Textures

**Color space is the #1 texture bug.** Color/albedo and emissive maps: `texture.colorSpace = THREE.SRGBColorSpace`. Data maps (normal, roughness, metalness, AO, displacement): leave default (no color space). Get this wrong and everything looks washed-out or too dark.

Config cheatsheet: `wrapS/wrapT = THREE.RepeatWrapping` + `repeat.set(4,4)` to tile; `offset`, `rotation` + `center.set(0.5,0.5)`; `minFilter = LinearMipmapLinearFilter` (default) or `NearestFilter` for pixel art; `anisotropy = renderer.capabilities.getMaxAnisotropy()` for sharp grazing angles. Non-power-of-2: `generateMipmaps = false; minFilter = LinearFilter`.

Special types: `CanvasTexture(canvas)` (set `needsUpdate = true` after redraw), `VideoTexture(video)` (auto-updates; set sRGB), `DataTexture(typedArray, w, h)` for procedural data.

Compression — KTX2/Basis is the production path (≈1/4 VRAM, GPU-native):

```js
const ktx2 = new KTX2Loader().setTranscoderPath(".../basis/").detectSupport(renderer);
gltfLoader.setKTX2Loader(ktx2); // or ktx2.load("t.ktx2", cb) standalone
```

Environment / IBL:

```js
new RGBELoader().load("env.hdr", (tex) => {
  tex.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = tex;               // lights all PBR materials
  scene.background = tex;                // optional; also backgroundBlurriness 0–1
});
// Sharper reflections: PMREMGenerator.fromEquirectangular(tex).texture, then dispose source
```

Render targets: `new THREE.WebGLRenderTarget(w, h)` → `renderer.setRenderTarget(rt); renderer.render(scene, cam); renderer.setRenderTarget(null)`; use `rt.texture` as a map. Add `samples: 4` for MSAA, `rt.depthTexture` for depth effects.

## Lighting

| Light | Use | Shadows | Cost |
|---|---|---|---|
| `AmbientLight` | Flat fill | No | ~0 |
| `HemisphereLight(sky, ground, i)` | Outdoor ambient gradient | No | ~0 |
| `DirectionalLight` | Sun / key light | Yes (ortho cam) | Low |
| `PointLight(c, i, distance, decay=2)` | Bulb | Yes (cube, 6×) | Mid |
| `SpotLight(c, i, dist, angle, penumbra, decay)` | Stage/flashlight | Yes | Mid |
| `RectAreaLight` | Window/softbox (Standard/Physical only, needs `RectAreaLightUniformsLib.init()`) | No | High |

Setups: **three-point** = key (1.0, 45° high), fill (0.5, opposite), rim (0.3, behind), low ambient. **Outdoor** = warm DirectionalLight sun + `HemisphereLight(0x87ceeb, 0x8b4513, 0.6)`. **Easiest good-looking** = HDRI via `scene.environment` + one shadow-casting directional. **Dramatic** = single SpotLight (penumbra 0.8) + colored PointLight kicker, no ambient, black fog.

Shadows without artifacts — the full checklist:

```js
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
light.castShadow = true;
mesh.castShadow = true;  floor.receiveShadow = true;      // floors usually don't cast

light.shadow.mapSize.set(2048, 2048);                      // 1024 mid, 4096 expensive
// TIGHT frustum = quality. Cover only the scene:
const d = 10;
light.shadow.camera.left = -d; light.shadow.camera.right = d;
light.shadow.camera.top = d;   light.shadow.camera.bottom = -d;
light.shadow.camera.near = 0.5; light.shadow.camera.far = 30;
// Acne fixes:
light.shadow.bias = -0.0001;       // strips of self-shadow
light.shadow.normalBias = 0.02;    // acne on curved surfaces
light.shadow.radius = 4;           // soften (PCFSoft only)
```

Debug with `new THREE.CameraHelper(light.shadow.camera)`. Cheap alternative for product shots: drei `<ContactShadows>` or a `shadowMaterial` ground plane — no shadow maps at all. Use `light.layers` / selective `castShadow` to exclude clutter.

## Animation

Mixer system: **AnimationClip** (keyframe data) → **AnimationMixer(root)** (player) → **AnimationAction** (playback control).

```js
const mixer = new THREE.AnimationMixer(model);
const clip = THREE.AnimationClip.findByName(gltf.animations, "Walk");
const action = mixer.clipAction(clip);
action.play();
// loop: mixer.update(clock.getDelta());   // REQUIRED every frame
```

Action controls: `timeScale` (negative = reverse), `loop = THREE.LoopOnce | LoopRepeat | LoopPingPong`, `clampWhenFinished = true` to hold the last frame, `reset().fadeIn(0.5).play()`, `a.crossFadeTo(b, 0.5, true)`, `setEffectiveWeight(0..1)` to blend idle/walk/run by speed, `blendMode = THREE.AdditiveAnimationBlendMode` (+ `AnimationUtils.makeClipAdditive(clip)`) for breathing-style layers. Mixer fires `"finished"` and `"loop"` events.

Custom tracks: `NumberKeyframeTrack(".material.opacity", times, values)`, `VectorKeyframeTrack(".position", ...)`, `QuaternionKeyframeTrack(".quaternion", ...)`, `ColorKeyframeTrack`; wrap in `new THREE.AnimationClip(name, duration, tracks)`. `track.setInterpolation(THREE.InterpolateSmooth | InterpolateDiscrete)`.

Skeletal: `skinnedMesh.skeleton.bones.find(b => b.name === "Head")` — mutate bone transforms directly, attach props with `handBone.add(weapon)`. Morph targets: `mesh.morphTargetInfluences[mesh.morphTargetDictionary["smile"]] = 1`.

**Deterministic frame-driven animation (video rendering).** When rendering to video or seeking a timeline, wall-clock time is the enemy. Rules:

- Drive everything from an externally supplied `time`, never `Date.now()`, `performance.now()`, or clock deltas.
- No `requestAnimationFrame`/`setAnimationLoop` as source of truth — expose `renderAt(time)` and call it per seek/frame.
- Seek mixers absolutely: `mixer.setTime(time)` (all mixers from the same `time`), then `renderer.render(scene, camera)`.
- Derive procedural motion from `time` (`mesh.rotation.y = time * 0.7`), seed all randomness.
- Preload models/textures/HDRIs before the first frame; never fetch at seek time.
- Pin output size and `setPixelRatio(1)` — no DPR-dependent output.
- Avoid postprocessing that accumulates previous-frame history unless reconstructable from `time`.

Procedural motion patterns: sine bob `y = Math.sin(t*2)*0.5`; circular orbit `x = cos(t)*r, z = sin(t)*r`; smooth follow `pos.lerp(target, 1 - Math.exp(-k * delta))`. For interactive spring-follow targets (constants, tuning): `references/creative-coding.md`.

## Interaction

Raycasting — the picking pattern:

```js
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
function onClick(e) {
  const rect = renderer.domElement.getBoundingClientRect();      // canvas-relative, not window
  mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObjects(clickables, true);     // pass a LIST, not scene.children
  if (hits.length) { /* hits[0]: .object .point .distance .uv .normal .instanceId */ }
}
```

Discipline: raycast against an explicit clickables array (or `raycaster.layers`), throttle hover raycasts (~20fps), use invisible low-poly proxy meshes for complex models, set `params.Points/Line.threshold` when picking points/lines. `hits[0].instanceId` identifies the instance in an InstancedMesh.

Controls (`three/addons/controls/*`): **OrbitControls** (set `enableDamping = true; dampingFactor = 0.05` and call `controls.update()` every frame; clamp `min/maxDistance`, `maxPolarAngle = Math.PI/2` to stay above ground), MapControls (pan-centric), PointerLockControls (FPS), FlyControls, TransformControls (gizmo — disable orbit during `dragging-changed`), DragControls.

Coordinate bridges: world→screen = `v.project(camera)` then map NDC to pixels (HTML labels over 3D); screen→world on a plane = `raycaster.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0,1,0), 0), out)`.

## Loaders

GLTF/GLB is the web format. Full production loader stack:

```js
const draco = new DRACOLoader().setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/");
const ktx2 = new KTX2Loader().setTranscoderPath(".../basis/").detectSupport(renderer);
const loader = new GLTFLoader()
  .setDRACOLoader(draco)          // compressed geometry (70–90% smaller)
  .setKTX2Loader(ktx2)            // compressed GPU textures
  .setMeshoptDecoder(MeshoptDecoder); // gltfpack/meshopt-compressed assets

loader.load("model.glb", (gltf) => {
  gltf.scene.traverse((c) => { if (c.isMesh) { c.castShadow = c.receiveShadow = true; } });
  // Normalize size/position:
  const box = new THREE.Box3().setFromObject(gltf.scene);
  gltf.scene.position.sub(box.getCenter(new THREE.Vector3()));
  const s = box.getSize(new THREE.Vector3());
  gltf.scene.scale.setScalar(1 / Math.max(s.x, s.y, s.z));
  scene.add(gltf.scene);
  // gltf.animations → AnimationMixer; gltf.cameras; gltf.userData
});
```

`LoadingManager` coordinates progress across loaders (`onProgress(url, loaded, total)`, `onLoad` fires when all complete). Promisify loaders (`new Promise((res, rej) => loader.load(url, res, undefined, rej))`) and `Promise.all` the asset set. `loader.parse(arrayBuffer, "", cb)` for fetched buffers. Other formats: FBX (usually needs `scale.setScalar(0.01)`), OBJ+MTL, STL/PLY (raw geometry → wrap in a Mesh, `computeVertexNormals()`). `THREE.Cache.enabled = true` for repeat loads; cache models in a Map and `.clone()` per placement.

## Custom Shaders

`ShaderMaterial` auto-provides matrices (`modelMatrix`, `modelViewMatrix`, `projectionMatrix`, `viewMatrix`, `normalMatrix`, `cameraPosition`) and attributes (`position`, `normal`, `uv`). `RawShaderMaterial` provides nothing.

Uniform pattern:

```js
const material = new THREE.ShaderMaterial({
  uniforms: {
    uTime:  { value: 0 },
    uColor: { value: new THREE.Color("#ff6600") },  // vec3 in GLSL
    uMap:   { value: texture },                      // sampler2D
    uRes:   { value: new THREE.Vector2(w, h) },
  },
  vertexShader, fragmentShader, transparent: true,
});
material.uniforms.uTime.value = clock.getElapsedTime();  // per frame; mutate .value, never replace object
```

Canonical vertex shader (pass varyings, optionally displace):

```glsl
varying vec2 vUv; varying vec3 vNormal; varying vec3 vWorldPos;
uniform float uTime;
void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);
  vec3 pos = position + normal * (snoise(position.xy * 1.5 + uTime * 0.4) * 0.3); // displacement
  vec4 wp = modelMatrix * vec4(pos, 1.0);
  vWorldPos = wp.xyz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}
```

GLSL building blocks (fragment side):

```glsl
// Fresnel — edge glow for glass/energy/holograms (power 2–5)
float fresnel = pow(1.0 - dot(normalize(cameraPosition - vWorldPos), vNormal), 3.0);

// Hash + value noise (cheap, self-contained)
float random(vec2 st){ return fract(sin(dot(st, vec2(12.9898,78.233))) * 43758.5453); }

// fBm — layer any noise for organic clouds/terrain (4–6 octaves)
float fbm(vec2 p){ float v=0., a=.5; for(int i=0;i<6;i++){ v += a*snoise(p); p*=2.; a*=.5; } return v; }

// Gradients: mix(colA, colB, smoothstep(0.,1.,vUv.y));  radial: distance(vUv, vec2(.5))
// Dissolve: if (texture2D(uNoise, vUv).r < uProgress) discard;  edge = smoothstep band
// Scrolling UV: uv.y += uTime*0.1; uv = fract(uv);
// Polar: angle = atan(p.y,p.x); radius = length(p);
// rotate2D: mat2(c,-s,s,c)*uv;   remap(v,a,b,c,d);   sdCircle/sdBox for shapes
```

Displacement needs dense geometry: `planeGeometry(2,2,128,128)` or `icosahedronGeometry(1, 64)`.

Extend built-ins instead of rewriting lighting — `onBeforeCompile`:

```js
material.onBeforeCompile = (shader) => {
  shader.uniforms.uTime = { value: 0 };
  material.userData.shader = shader;                 // keep ref for updates
  shader.vertexShader = "uniform float uTime;\n" + shader.vertexShader.replace(
    "#include <begin_vertex>",
    "#include <begin_vertex>\n transformed.y += sin(position.x*10.0+uTime)*0.1;");
};
```

Per-instance data: `geometry.setAttribute("offset", new THREE.InstancedBufferAttribute(arr, 3))` + `attribute vec3 offset;` in the vertex shader. Prefer `mix/step/smoothstep` over branches; precompute in JS; bake complex functions into lookup textures. Debug by outputting `vec4(vUv,0.,1.)` or `vec4(vNormal*.5+.5,1.)`; set `renderer.debug.checkShaderErrors = true`.

## Postprocessing

```js
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));   // always first
composer.addPass(bloomPass);                       // effects in order
// loop: composer.render();  // replaces renderer.render()
// resize: composer.setSize(w, h) alongside renderer + pass-specific resolutions
```

Chains worth using (order matters): **Render → Bloom → color/vignette → gamma → AA last.**

| Pass | Signature / knobs |
|---|---|
| `UnrealBloomPass(res, strength 1.5, radius 0.4, threshold 0.85)` | Threshold near 1 + emissive materials = selective glow |
| `BokehPass(scene, cam, {focus, aperture, maxblur})` | DOF; animate `uniforms.focus` |
| `SSAOPass(scene, cam, w, h)` | `kernelRadius 16`; contact darkening |
| `OutlinePass(res, scene, cam)` | `selectedObjects = [...]` selection highlight |
| `ShaderPass(FXAAShader)` | Set `resolution` uniform to `1/(size*dpr)`; cheapest AA |
| `SMAAPass` | Better AA, pricier |
| `FilmPass`, `GlitchPass`, `HalftonePass`, `RenderPixelatedPass` | Stylization |
| `ShaderPass(VignetteShader)` | `offset`, `darkness` |

Custom full-screen pass: a shader object with `tDiffuse: { value: null }` uniform (composer injects the previous pass), passthrough vertex shader, distort/color in fragment. Chromatic aberration = sample R/G/B at radially shifted UVs.

Costs: each pass is a full-screen render. Halve bloom resolution, toggle `pass.enabled`, skip heavy passes on mobile. True selective bloom = layers + swap non-bloomed materials to black, composite two renders.

## React Three Fiber

```tsx
<Canvas camera={{ position: [0, 2, 5], fov: 45 }} dpr={[1, 2]} shadows
        gl={{ antialias: true, powerPreference: "high-performance" }}>
  <Suspense fallback={null}>
    <Environment preset="studio" />
    <OrbitControls makeDefault enableDamping />
    <Scene />
  </Suspense>
</Canvas>
```

R3F common mistakes:

1. **setState in `useFrame`** → 60 re-renders/sec. Mutate refs: `meshRef.current.rotation.y += delta * 0.5`.
2. **Allocating in the loop** → GC stutter. `useMemo` scratch `Vector3`s, `.set()` + `.copy()` them.
3. **Skipping dispose** — GPU resources outlive React unmounts. JSX-created resources auto-dispose; manual loads get cleanup in `useEffect` return.
4. **Re-rendering the Canvas parent** — isolate `<Canvas>` in its own component; parent state changes remount the whole scene.
5. **Loaders without `<Suspense>`** — `useGLTF`/`useTexture`/`useLoader` throw promises.

Hooks: `useFrame((state, delta) => …)` (use `delta`; `state.clock.elapsedTime` for shader uniforms; `state.pointer` is normalized ±1), `useThree()` → `{ gl, scene, camera, size, viewport, invalidate }` (destructure minimally).

drei essentials: `Environment` (presets: studio/sunset/city/dawn/forest/night/warehouse…), `useGLTF` + `useGLTF.preload(url)` (typed `{ nodes, materials }`; generate components at gltf.pmnd.rs), `useTexture`, `Float` (idle hover), `Text3D`, `Center`, `MeshTransmissionMaterial` (hero glass), `PresentationControls` (bounded drag-to-rotate with snap), `ContactShadows`, `Instances` (declarative instancing), `Detailed distances={[0,50,100]}` (LOD), `shaderMaterial` helper + `extend` (uniforms become JSX props), `PerformanceMonitor` (adaptive DPR).

R3F perf: `frameloop="demand"` + `invalidate()` for static scenes; `dispose={null}` on `<primitive>` sharing cached scenes; postprocessing via `@react-three/postprocessing` `<EffectComposer><Bloom luminanceThreshold={1} …/></EffectComposer>` — merged into one pass, and `luminanceThreshold={1}` means only colors pushed above 1.0 glow.

## Performance

Targets: **< 100 draw calls, < 1M triangles**, 60fps on mid-range GPU. Read `renderer.info.render.calls/triangles` and `renderer.info.memory`.

**Draw calls** — one per mesh per material. Reduce by:
- `mergeGeometries([...])` for static geometry sharing one material.
- `InstancedMesh(geometry, material, count)` for 100+ identical objects:

```js
const dummy = new THREE.Object3D();
for (let i = 0; i < count; i++) {
  dummy.position.set(...); dummy.rotation.set(...); dummy.scale.setScalar(...);
  dummy.updateMatrix();
  im.setMatrixAt(i, dummy.matrix);
  im.setColorAt(i, color);              // optional per-instance color
}
im.instanceMatrix.needsUpdate = true;   // after every batch edit (+ instanceColor)
```

- Reuse material instances (same material batches better); atlas textures; pool materials keyed by params.

**Disposal discipline** — GPU memory is manual. Removing from scene frees nothing:

```js
mesh.geometry.dispose();
(Array.isArray(mesh.material) ? mesh.material : [mesh.material]).forEach((m) => {
  for (const k of ["map","normalMap","roughnessMap","metalnessMap","aoMap","emissiveMap","alphaMap","envMap"])
    m[k]?.dispose();
  m.dispose();
});
scene.remove(mesh);
// teardown: renderer.dispose(); also renderTarget.dispose(), pmremGenerator.dispose()
```

Everything else, in priority order: clamp `setPixelRatio(Math.min(dpr, 2))`; `THREE.LOD` / drei `Detailed` for distance swaps; fewer lights (each adds shader cost) and fewer/smaller shadow maps with tight frustums; avoid `transparent` (sorting + overdraw) — prefer `alphaTest`; cap texture sizes (2048 desktop, 1024 mobile, power-of-2, KTX2); Draco + meshopt on delivery; object pooling instead of create/destroy; cache `getWorldPosition` results outside loops; frustum culling is on by default — keep bounding volumes correct after vertex edits (`computeBoundingSphere()`).

---

*Distilled from: threejs-skills (fundamentals, geometry, materials, textures, lighting, animation, interaction, loaders, shaders, postprocessing), genjutsu threejs-r3f, hyperframes-animation Three.js adapter.*
