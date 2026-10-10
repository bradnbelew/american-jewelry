# 10 — Arsenal: skills, tools, assets, research, inspiration

Verified 2026-10-10 for the American Jewelry remake (Hydrogen on Oxygen: React 19 + React Router 7 + Vite 8 + Tailwind 4; r3f 9 + drei 10 + three 0.186; GSAP 3.15; Lenis). Every item below was checked this session by npm registry, GitHub API, the skills.sh registry CLI, or a live HTTP fetch. Anything that could not be verified was dropped. Star counts, licenses and "last push" dates are as returned on 2026-10-09/10.

The brief that governs every verdict: calm, one subject per screen, restrained motion, Libre Caslon + Public Sans on warm paper, navy velvet, gold hairlines, one signature 3D moment (the house's parametric ring assembling itself on scroll), no cookie-cutter UI. The owner's words: stunning, non cookie-cutter, classy, high-end house-of-jewelry style.

A warning before the lists. Anthropic's own `frontend-design` skill (fetched from the repo) now names "a warm cream background with a high-contrast serif display" as the single most common AI-generated tell, alongside tracked-out ALL-CAPS eyebrows, middle-dot meta strings and "→" appended to links. Our palette sits one step away from that cluster. What keeps it from reading as generated is not the palette; it is the photography, the ring, the restraint and the absence of the chrome listed above. Treat that paragraph of the skill as a lint rule.

---

## 0. Install this now

Ten things, in order. Commands are exact; run from `D:\american-jewelry` (or wherever the Hydrogen repo lives).

1. **Anthropic frontend-design** (taste + anti-template lint, 968K installs)
   `npx skills add anthropics/skills@frontend-design`
2. **Vercel web-design-guidelines** (reviews UI code against the Web Interface Guidelines; `file:line` findings)
   `npx skills add vercel-labs/agent-skills@web-design-guidelines`
3. **Vercel react-view-transitions** (the React Router 7 `viewTransition` pattern, which is our page-transition strategy)
   `npx skills add vercel-labs/agent-skills@react-view-transitions`
4. **GreenSock official GSAP skills** (core + ScrollTrigger + React + performance; written by the GSAP team)
   `npx skills add greensock/gsap-skills@gsap-scrolltrigger && npx skills add greensock/gsap-skills@gsap-react && npx skills add greensock/gsap-skills@gsap-performance`
5. **Emil Kowalski animation-vocabulary + review-animations** (Linear design engineer; the "is this motion earned" reviewer)
   `npx skills add emilkowalski/skills@animation-vocabulary && npx skills add emilkowalski/skills@review-animations`
6. **ibelick fixing-motion-performance + fixing-accessibility** (small, surgical, MIT)
   `npx skills add ibelick/ui-skills@fixing-motion-performance && npx skills add ibelick/ui-skills@fixing-accessibility`
7. **Addy Osmani core-web-vitals** (Lighthouse/CWV-grounded perf audit)
   `npx skills add addyosmani/web-quality-skills@core-web-vitals`
8. **EnzeD r3f-skills** (react-three-fiber specific: materials, lighting, postprocessing, shaders)
   `npx skills add enzed/r3f-skills@r3f-materials && npx skills add enzed/r3f-skills@r3f-lighting && npx skills add enzed/r3f-skills@r3f-postprocessing`
9. **Libraries** (all MIT unless noted; versions current as of today)
   `npm i lenis@1.3.26 @gsap/react@2.1.2 @react-three/postprocessing@3.1.3 three-custom-shader-material@6.4.0 motion@14.1.0`
   `npm i -D @gltf-transform/cli@4.5.1 sharp@0.35.5 vite-imagetools@12.0.1 satori@0.47.1 @resvg/resvg-js@2.6.2 @capsizecss/core@4.1.3`
10. **Assets** (all CC0; download once into `public/3d/env` and `public/textures`)
    HDRI: `polyhaven.com/a/studio_small_09` (2K .hdr) and `polyhaven.com/a/brown_photostudio_02` (2K .hdr)
    Velvet: `polyhaven.com/a/velour_velvet` (2K, Diffuse + Normal GL + Rough + Anisotropy maps)
    Paper: `ambientcg.com/view?id=Paper006` (2K Color + Normal + Roughness)
    Leather: `polyhaven.com/a/brown_leather` or `ambientcg.com/view?id=Leather038`

Do **not** install: `obra/superpowers` (a general dev-methodology framework, 297K stars but nothing about design; it adds process, not taste), `Leonxlnx/taste-skill` (already present locally as design-taste-frontend / high-end-visual-design / minimalist-ui / redesign-existing-projects; same repo), `cloudai-x/threejs-skills` (vanilla three.js, no license file; redundant with r3f-skills), `devmartinese/awwwards-animations-skill` (15 stars, no license, last push Feb 2026), `mengto/skills@cinematic-gsap-lenis-motion-system` (its catalogue is 3D-material recipes and "awwwards-quality" generic effects: exactly the motion density we are avoiding).

---

## 1. Agent skills (installable)

Registry: skills.sh (`npx skills search <term>` / `npx skills add owner/repo@skill`). Install counts are registry figures on 2026-10-10. Stars and dates are GitHub.

### Install

| Skill | Repo | What it gives us | Install | Verdict |
|---|---|---|---|---|
| **frontend-design** | github.com/anthropics/skills (180K stars, license in LICENSE.txt, pushed 2026-10-09) | The best single piece of anti-template reasoning in the ecosystem: ground design in subject matter, spend boldness in one place, the explicit list of AI tells (cream+serif+terracotta, caps eyebrows, numbered 01/02/03 markers, "→" on links, scattered fade-ups). Two-pass plan-then-build with self-critique. | `npx skills add anthropics/skills@frontend-design` | **Install.** Read the "calibration" paragraph before every screen. |
| **web-design-guidelines** | github.com/vercel-labs/agent-skills (32K stars, pushed 2026-08-28) → pulls rules live from github.com/vercel-labs/web-interface-guidelines (951 stars, MIT, pushed 2026-10-05; the public version of interfaces.rauno.me) | A reviewer, not a generator: "review my UI" returns `file:line` findings on focus rings, hit areas, 16px inputs on iOS, mousedown menus, disabled-after-submit, reduced motion. | `npx skills add vercel-labs/agent-skills@web-design-guidelines` | **Install.** Run on every PR touching UI. |
| **react-view-transitions** | same repo | Patterns for the View Transitions API in React; maps directly onto React Router 7's `<Link viewTransition>` + `useViewTransitionState` (verified in RR docs) for the grid-to-detail move. | `npx skills add vercel-labs/agent-skills@react-view-transitions` | **Install.** This is our page transition. No swup/barba needed. |
| **react-best-practices** | same repo | Vercel's React performance rules (memo discipline, waterfalls, bundle hygiene). Next-flavoured but 80% applies to RR7. | `npx skills add vercel-labs/agent-skills@react-best-practices` | Install (optional). |
| **gsap-scrolltrigger / gsap-react / gsap-performance / gsap-core** | github.com/greensock/gsap-skills (16.1K stars, MIT, pushed 2026-07-29) | Official. Correct `useGSAP` scoping and cleanup, ScrollTrigger pinning without layout thrash, `matchMedia` for reduced motion, what is and is not GPU-composited. Also `gsap-plugins` for SplitText/Flip. | `npx skills add greensock/gsap-skills@gsap-scrolltrigger` (+ `@gsap-react`, `@gsap-performance`, `@gsap-plugins`) | **Install.** The ring assembly is a single ScrollTrigger timeline; these skills keep it correct. |
| **animation-vocabulary / review-animations / improve-animations** | github.com/emilkowalski/skills (44.8K stars, MIT, pushed 2026-10-02) | Emil Kowalski (Linear, Sonner, Vaul, animations.dev). Vocabulary of easing/duration/choreography; a reviewer that flags motion that does not communicate change. | `npx skills add emilkowalski/skills@animation-vocabulary` (+ `@review-animations`) | **Install.** Use `review-animations` as the restraint gate: if a motion does not answer "what changed", delete it. |
| **fixing-motion-performance / fixing-accessibility / baseline-ui / create-design-md** | github.com/ibelick/ui-skills (9.6K stars, MIT, pushed 2026-10-09) | Small, tightly scoped. `create-design-md` writes a DESIGN.md tokens file the other skills read; `fixing-motion-performance` catches transform/opacity vs layout-animating properties. | `npx skills add ibelick/ui-skills@fixing-motion-performance` (+ `@fixing-accessibility`, `@create-design-md`) | **Install.** |
| **core-web-vitals / performance / accessibility** | github.com/addyosmani/web-quality-skills (2.9K stars, MIT, pushed 2026-08-24) | Lighthouse-grounded: LCP image priority, CLS from fonts and images, INP from long tasks (our WebGL canvas is an INP risk). | `npx skills add addyosmani/web-quality-skills@core-web-vitals` | **Install.** |
| **r3f-materials / r3f-lighting / r3f-postprocessing / r3f-shaders** | github.com/EnzeD/r3f-skills (128 stars, no license file, pushed 2026-08-31) | The only r3f-specific skill set with a materials/lighting/postprocessing split. Low stars but current and specific. No license: fine to read as guidance, do not vendor its text. | `npx skills add enzed/r3f-skills@r3f-materials` (+ `@r3f-lighting`, `@r3f-postprocessing`) | Install (guidance only). |
| **frontend-design-deslop** | github.com/samber/cc-skills (227 stars, MIT, pushed 2026-10-01) | "De-slopify": OKLCH tokens, DESIGN.md, typography; explicitly targets "the Claude-esque default look". Overlaps Anthropic's skill but adds OKLCH palette discipline. | `npx skills add samber/cc-skills@frontend-design-deslop` | Install (optional, second opinion). |
| **shopify-hydrogen / hydrogen-cookbooks / hydrogen-upgrades** | github.com/Weaverse/shopify-hydrogen-skills (91 stars, no license, pushed 2026-10-09) | Third-party Hydrogen skills with cookbook recipes (markets, analytics, upgrades). Shopify's own `shopify-ai-toolkit@shopify-hydrogen` (592 stars, MIT) is already installed here and is authoritative; Weaverse adds upgrade and cookbook recipes only. | `npx skills add weaverse/shopify-hydrogen-skills@hydrogen-cookbooks` | Optional. |
| **web-perf** | github.com/cloudflare/skills (3K stars, Apache-2.0, pushed 2026-10-09) | Edge-runtime performance guidance; Oxygen is a workers-style runtime so the caching/streaming advice transfers. | `npx skills add cloudflare/skills@web-perf` | Optional. |

### Already present locally (public equivalents noted; do not reinstall)

- `design-taste-frontend`, `high-end-visual-design`, `minimalist-ui`, `redesign-existing-projects` are all from **Leonxlnx/taste-skill** (94K stars, MIT, pushed 2026-10-09; directories `taste-skill`, `minimalist-skill`, `redesign-skill`, `brandkit`, …). Public, same content. Keep using them; `high-end-visual-design` is the closest thing in the registry to a "luxury" skill and is the one to pair with Anthropic's.
- `three`, `gsap`, `waapi`, `css-animations`, `tailwind`, `typegpu`, `lottie` here are **heygen-com/hyperframes** adapters (HyperFrames is a deterministic video-render framework). They teach seek-driven, render-safe animation, not web-page animation. They are not wrong, but do not let them drive site motion decisions; use greensock/gsap-skills and emilkowalski/skills for that.
- `shopify-ai-toolkit@shopify-hydrogen` (Shopify/Shopify-AI-Toolkit, 592 stars, MIT, pushed 2026-10-08) is the authoritative Hydrogen skill. Keep.

### Skip, with reasons

- **pbakaus/impeccable** (79K stars, Apache-2.0, pushed 2026-10-09; `impeccable`, `frontend-design`, `audit`, `overdrive`). Well made and current, but it is a whole "design language" harness with its own CLI, plugin dirs for 20 editors and a Rust crate. It wants to own the design system. We already have ours. Its `overdrive` skill is an explicit "push motion further" mode: the opposite brief.
- **nextlevelbuilder/ui-ux-pro-max-skill** (389K installs): a styles/components catalogue. Catalogues produce templates.
- **cloudai-x/threejs-skills** (3.5K stars, no license): vanilla three.js, pushed 2026-07-09. r3f-skills covers us.
- **freshtechbro/claudedesignskills@react-three-fiber** (1K stars, MIT): last push 2025-11-20; stale against r3f 9 / drei 10.
- **mengto/skills** (6.7K stars, MIT): dozens of 3D material recipes (`3d-metal-material`, `3d-cloth-material`, `3d-paper-material`) and `build-awwwards-quality-sites`. Tempting for a ring, but these are effect-first. If one recipe is wanted, read it in the repo rather than installing the set.
- **bergside/awesome-design-skills** (3.1K stars, MIT, pushed 2026-06-28): an index of 67 DESIGN.md/SKILL.md files. Bookmark as a directory; nothing to install.
- **obra/superpowers**: see §0.
- **devmartinese/awwwards-animations-skill**: see §0.

---

## 2. Libraries and techniques

Versions/licenses from `npm view` on 2026-10-10; stars/pushes from GitHub API. "Cost" is unpacked size as a proxy where bundle figures are not published.

### 3D: the ring and the stones

| Package | Version / license / activity | Use for | Verdict |
|---|---|---|---|
| **@react-three/drei** | 10.7.9, MIT, pmndrs/drei 9.9K stars, pushed 2026-10-05 (1.75 MB unpacked, tree-shakeable) | Everything below. | **Use** (already in stack). |
| drei **MeshRefractionMaterial** | docs: drei.docs.pmnd.rs/shaders/mesh-refraction-material | The diamond. Props: `envMap` (required), `bounces` (default 2), `ior` (2.4 = diamond), `fresnel`, `aberrationStrength`, `color`, `fastChroma`. Docs warn that bounces > 2 and aberration are expensive. | **Use for the centre stone only**, `bounces=2`, `aberrationStrength≈0.01`, `fastChroma` on; side stones get a plain `MeshPhysicalMaterial`. Needs an env map, so pair with Environment below. |
| drei **Environment** + **Lightformer** | docs: /staging/environment, /staging/lightformer | Lightformer draws rect/ring/circle emitters inside an `<Environment>`; this is how you fake a jewellery light-tent (two soft rectangles above, one strip at the side) at near-zero cost, and the reflections in the gold are what sell metal. | **Use.** Prefer a 2K studio HDRI (§3) for `files` plus 2-3 Lightformers for the specular highlights. |
| drei **PresentationControls** | docs: /controls/presentation-controls | Hand-feel rotate-with-limits + spring-back, no orbit UI. | **Use on the product page** (user-triggered motion is allowed). Clamp polar/azimuth so the ring never shows its underside. |
| drei **ScrollControls** vs **GSAP ScrollTrigger** | — | ScrollControls creates its own scroll container inside the canvas (fixed canvas, fake scroll). That fights Lenis, native anchors, and the document. | **Use GSAP ScrollTrigger** driving a single `progress` ref read in `useFrame`; keep the canvas in normal DOM flow (or `position: fixed` with a tall spacer). Do not use ScrollControls. |
| **@react-three/postprocessing** | 3.1.3, MIT, pushed 2026-10-09; wraps **postprocessing** 6.39.5 (Zlib, pmndrs/postprocessing 2.9K stars) | `<Bloom>` (docs: /effects/bloom) for stone fire at low `intensity` with a high `luminanceThreshold`; `<DepthOfField>` (docs: /effects/depth-of-field) for a macro-lens look; `<Noise>` (docs: /effects/noise) for film grain. | **Use sparingly**: Bloom + Noise only, `multisampling={0}` on mobile, and disable the whole EffectComposer under `prefers-reduced-motion` or on low-end GPUs. DoF is pretty but it doubles the fragment cost and blurs the one thing we want sharp; skip unless the hero is a static render. |
| **three-custom-shader-material** | 6.4.0, MIT, 1.3K stars, pushed 2025-10-12 (145 KB) | Inject GLSL into `MeshPhysicalMaterial` (brushed-metal anisotropy, hand-engraving normal detail, a reveal sweep) without rewriting PBR. | **Use** if we do the "engraving appears" beat; otherwise plain `MeshPhysicalMaterial` with `anisotropy`, `clearcoat`, `sheen` for velvet. |
| **pmndrs/examples** | 132 stars, MIT, pushed 2026-10-09 | Verified example dirs: `diamond-refraction`, `diamond-ring`, `floating-diamonds`, `gltf-animations-tied-to-scroll`, `camera-scroll`, `building-live-envmaps`, `bloom-hdr-workflow-gltf`, `caustics`, `frosted-glass`. | **Read `diamond-ring` and `gltf-animations-tied-to-scroll` first.** They are the closest public starting points to our signature feature. |
| **14islands/r3f-scroll-rig** | 980 stars, MIT, pushed 2025-12-17 | Syncs 3D meshes to DOM elements' scroll positions (the studio behind Cartier 365). | Consider only if the ring must track a DOM slot across sections; otherwise ScrollTrigger + a fixed canvas is simpler. |
| **@gltf-transform/cli** | 4.5.1, MIT, donmccurdy/glTF-Transform 2K stars, pushed 2026-10-06 | `gltf-transform optimize ring.glb ring.min.glb --compress meshopt --texture-compress webp`; also `dedup`, `prune`, `draco`. **meshoptimizer** (zeux, 8.5K stars, MIT) is the compressor it calls. | **Use** as a build step. Budget: ring GLB under 600 KB with meshopt, textures as KTX2 or WebP. |
| gltfjsx | 6.5.3, MIT, 5.9K stars, last push 2024-11-04 | Turns a GLB into a typed r3f component. | Use once at authoring time; it is a dev tool, not a dependency. |
| maath | 0.10.8, MIT, pushed 2026-08-17 | `damp`, easing helpers in `useFrame`. | Use. |
| leva / r3f-perf | 0.10.1 (2025-10) / 7.2.3 (2024-11), MIT | Dev-only tweak panel and perf HUD. | Dev-only. Never shipped. |

### Scroll and motion

| Package | Version / license / activity | Use for | Verdict |
|---|---|---|---|
| **gsap** + **@gsap/react** | 3.15.0 / 2.1.2, "Standard no-charge" license (gsap.com/standard-license: free in commercial sites as long as end users are not charged to access the product; all former Club plugins free since 3.13, April 2025, per gsap.com/blog/3-13) | ScrollTrigger for the ring; **SplitText** for one line-mask headline reveal; **Flip** for grid-to-detail if View Transitions are not enough; **ScrollSmoother** exists but we have Lenis; **MorphSVG** irrelevant (no ornaments). `useGSAP` handles cleanup under React strict mode. | **Use.** One timeline per screen at most. |
| **lenis** | 1.3.26, MIT, darkroomengineering/lenis 16.3K stars, pushed 2026-10-02 (457 KB unpacked, ~6 KB gz) | Smooth scroll with native scrollbar. README-verified integration: `lenis.on('scroll', ScrollTrigger.update)`, `gsap.ticker.add(t => lenis.raf(t*1000))`, `gsap.ticker.lagSmoothing(0)`. Honors `prefers-reduced-motion` by disabling smoothing; anchors need `anchors: true`. `lenis/react` provides `<ReactLenis>`. | **Use, lightly**: `lerp: 0.12`, no `smoothTouch`. It is not scroll-jacking because the scrollbar and wheel distance stay native; it only eases. If it feels floaty at any point, lower the lerp rather than add inertia. |
| **motion** (motion.dev) | 14.1.0, MIT, motiondivision/motion 33.9K stars, pushed 2026-10-09 (757 KB unpacked; `motion/react-mini` ≈ 2.5 KB) | Layout animations and `AnimatePresence` for cart drawer, filters, menu. | **Use for UI state motion only**; GSAP owns scroll. Do not run both on the same element. |
| CSS scroll-driven animations | developer.chrome.com/docs/css-ui/scroll-driven-animations (Chrome 115+, Safari 26 per the page; Firefox behind a flag) | `animation-timeline: view()` for the small things (image fade/parallax-free reveals) with zero JS. | **Use with a JS fallback**; not for the ring. |
| View Transitions (React Router 7) | reactrouter.com/how-to/view-transitions; developer.chrome.com/docs/web-platform/view-transitions (same-doc: Chrome/Edge 111+, Safari 18+, Firefox 144+) | `<Link viewTransition>` + `view-transition-name` on the product image gives the grid-to-PDP morph natively; cross-fade everywhere else. | **Use.** This is the page transition. |
| swup 4.10.0 (MIT) / @barba/core 2.10.3 (MIT, last push 2024-08) / @unseenco/taxi 2.0.0 (BSD-3) | — | Page-transition routers for MPAs. | **Skip.** RR7 is already a client router; adding a second one is redundant and the API-level View Transitions do the job. |
| Locomotive Scroll | — | Older smooth-scroll (transform-based, scroll-jacking). | **Skip.** Lenis replaced it; Locomotive's own site now asks "should you use it?". |

### Typography and text

| Package | Version / license / activity | Use for | Verdict |
|---|---|---|---|
| **@capsizecss/core** | 4.1.3, MIT, seek-oss/capsize 1.7K stars, pushed 2026-09-15 (48 KB) | Trims Caslon's generous ascender/descender space so cap-height sits on the grid; essential when a serif headline must align with a hairline. | **Use** in the type tokens. |
| **Utopia** (utopia.fyi/type/calculator; `utopia-core` 1.6.0 ISC, pushed 2024-09) | — | Fluid `clamp()` scale; generate once, paste into `@theme`. | Use the calculator; no runtime package needed. |
| `text-wrap: balance` / `pretty` | MDN, baseline in modern browsers | Headline balancing without JS. | **Use native.** `react-wrap-balancer` (1.1.1, MIT, last push 2024-05) is unnecessary now. |
| SplitType 0.3.4 (ISC, last push 2023-10) | — | Splits text for reveals. | **Skip**; GSAP SplitText is free and maintained. |

### Images, OG, Lottie

| Package | Version / license / activity | Use for | Verdict |
|---|---|---|---|
| **Hydrogen `<Image>`** | @shopify/hydrogen 2026.10.0, MIT | Shopify CDN srcset/sizes, `aspectRatio` to kill CLS, `loading="eager"` + `fetchpriority="high"` on the LCP image (shopify.dev hydrogen-performance guide). | **Use for all catalogue images.** Shopify's CDN does the resizing; sharp is for non-catalogue assets only. |
| **sharp** | 0.35.5, Apache-2.0, 32.7K stars, pushed 2026-10-09 | Build-time AVIF/WebP of editorial imagery, LQIP generation. | Use in a build script. |
| **vite-imagetools** | 12.0.1, MIT, 1.1K stars, pushed 2026-10-07 (55 KB) | `?w=800;1600&format=avif;webp&as=picture` imports for the editorial (non-Shopify) images in Vite. | **Use.** |
| **lqip-modern** 3.0.0 (MIT, pushed 2026-08) / thumbhash 0.1.1 (MIT) | — | Tiny placeholders. | Use thumbhash for the editorial images; Shopify handles the catalogue. |
| @squoosh/lib 0.5.3 | Apache-2.0, last push 2023-01 | — | **Skip**: archived; sharp covers it. |
| **satori** + **@resvg/resvg-js** | 0.47.1 (MPL-2.0, vercel/satori 14K stars, pushed 2026-10-09) / 2.6.2 (MPL-2.0) | Build-time OG images in Caslon on paper; render SVG → PNG once per product at build, not at the edge. | **Use at build.** `@vercel/og` 1.0.3 targets Vercel's edge; on Oxygen prefer build-time satori + resvg (or resvg-wasm) to avoid runtime font loading. |
| **@lottiefiles/dotlottie-react** | 0.20.0, MIT, dotlottie-web 892 stars, pushed 2026-10-07 (530 KB unpacked; WASM player) | Only if a hand-drawn hallmark/wordmark animation is commissioned. | Probably skip. A house of this kind animates a ring, not a mascot. |
| **@unpic/react** | 1.0.2, MIT, ascorbic/unpic-img 2K stars, pushed 2026-10-09 | CDN-agnostic responsive image. | Skip; Hydrogen's `<Image>` already knows Shopify's CDN. |

### WebGL image effects (verdict: mostly no)

| Package | Status | Verdict |
|---|---|---|
| **ogl** 1.0.11 (Unlicense, 4.7K stars, last push 2025-04) | Minimal WebGL lib used for curtain/hover-distortion effects. | **Skip.** We already carry three.js; a second renderer is pure weight. |
| **curtainsjs** 8.1.6 (MIT, 1.8K stars, last push 2025-04) | DOM-synced WebGL planes for image distortion. | **Skip.** Hover-warped images are the single most recognisable 2019 agency tell; a jewellery house shows the photograph still. |
| three + a custom plane shader | — | If one image effect is ever wanted (a slow, 2-second refraction sweep over the hero photograph, once), do it in the existing r3f canvas. | Only if it earns its place. |

### Codrops demo repos worth reading (github.com/codrops/*, demo code is Codrops' MIT-style "use freely, credit appreciated"; check each repo's LICENSE)

- **OnScrollTypographyAnimations** (346 stars, 2023-12) and **ScrollTextMotion** (49 stars, 2025-12): line-mask and weight-shift text reveals with GSAP. Steal one: the mask reveal.
- **ScrollBasedLayoutAnimations** (335 stars, 2023-07): GSAP Flip layout switches on scroll; the grid-to-detail idea.
- **ContentLayoutTransition** (61 stars, 2023-12): image stack animates to gallery. Closest to a collection → piece move.
- **astro-shop-view-transitions** (118 stars, 2024-02): a minimalist shop using the View Transitions API. Framework differs; the `view-transition-name` choreography transfers directly to RR7.
- **interlude** (22 stars, 2026-10-07): newest Codrops starter for custom page transitions on the View Transitions router.
- **StickySections** (133 stars, 2024-02): sticky sections that animate as they exit. Relevant for "one subject per screen".
- **SlideshowAnimations** (305 stars, 2025-04): slideshow ideas; take only the slowest.
- **PageTransitions** (2.3K stars, 2024-08): CSS-only transition catalogue; reference, do not copy.
- **ElasticGridScroll**, **RotatingOnScrollAnimations**, **3DStackMotion**, **Staggered3DGridAnimations**: **do not use**. They are effect-first and read as agency template.

Codrops' site itself (tympanus.net/codrops) returned 403 to the fetcher; the GitHub org listing above was pulled via the API and is current to 2026-10-09.

---

## 3. Assets (free, license-clear)

### HDRIs (Poly Haven, all CC0; polyhaven.com/license says CC0 outright)

Pulled from the Poly Haven API (`t=hdris&c=studio`, 96 results, ranked by downloads):

- **studio_small_09** (708K downloads, medium contrast, artificial light) — the default for metal; soft rectangular panels give long clean highlights on gold.
- **brown_photostudio_02** (778K, mixed natural + artificial, medium contrast) — warmer; closer to our paper palette. Try first for the hero.
- **studio_small_08** (595K, low contrast) — for the velvet/box shots where the metal should not blow out.
- **photo_studio_01** (357K) and **photo_studio_loft_hall** (207K, natural light) — editorial variants.
- **studio_small_03** (585K, high contrast) — for stone fire tests; too hot for gold.
- **cyclorama_hard_light** (103K) — hard key, for a single dramatic render only.

Use 1K `.hdr` for `<Environment files>` in production (≈ 1–2 MB), 2K for prerendered stills. Download at `polyhaven.com/a/<slug>`.

### Textures

- **velour_velvet** — polyhaven.com/a/velour_velvet, CC0, Rico Cilliers + colormass. 1K–8K; includes Diffuse, Normal (GL), Rough, AO, Displacement, **Anisotropy Rotation/Strength** maps. Our navy velvet: tint the diffuse, keep the anisotropy, set `sheen` on `MeshPhysicalMaterial`.
- **brown_leather**, **fabric_leather_01/02**, **leather_white**, **leather_red_02/03** — Poly Haven, CC0 (box interiors, tray).
- **crepe_satin** — Poly Haven, CC0 (ribbon/liner).
- **Paper006 / Paper005** — ambientcg.com/view?id=Paper006, CC0 (ambientcg.com/license verified CC0 1.0). Subtle tooth for the warm paper background, used as a normal map at very low strength or as a 2% opacity overlay.
- **Leather038 / Leather039** (2025) — ambientCG, CC0.
- **marble_01** — Poly Haven, CC0, if a counter surface is ever needed.

### Ring and gem references

- **pmndrs/examples** `diamond-ring`, `diamond-refraction`, `floating-diamonds` (MIT) — the diamond code path (MeshRefractionMaterial + CubeCamera). Verified directory names.
- Procedural gem: a round brilliant is best built parametrically (crown/pavilion/girdle as lathe + facets), not downloaded. There is no license-clear, high-quality public GLB ring worth shipping; the GitHub searches ("diamond react-three-fiber", "jewelry ring three.js") returned only 0–2-star hobby configurators. Model the house ring ourselves (Blender → GLB → gltf-transform).
- Cushion/oval stones: lathe + `MeshRefractionMaterial` handles them; do not reach for a mesh library.

### Typefaces (all OFL-1.1 unless noted)

Primary (already chosen, verified on Google Fonts and GitHub):
- **Libre Caslon Display** — fonts.google.com/specimen/Libre+Caslon+Display; github.com/impallari/Libre-Caslon-Display (OFL). One weight; use for headlines only, 40px and up.
- **Libre Caslon Text** — fonts.google.com/specimen/Libre+Caslon+Text; github.com/impallari/Libre-Caslon-Text (OFL). Regular/Italic/Bold; body and captions.
- **Public Sans** — fonts.google.com/specimen/Public+Sans; github.com/uswds/public-sans (4.7K stars, pushed 2026-10-01; repo license is a mixed OFL/CC0 declaration). Variable weight 100–900; UI and data.

Alternates, verified:
- **Fraunces** — github.com/undercasetype/Fraunces (767 stars, OFL, pushed 2026-02); variable with `opsz`, `SOFT`, `WONK` axes. The strongest alternate if Caslon Display ever feels thin at hero size; its optical-size axis is what Caslon lacks.
- **Cormorant / Cormorant Garamond** — github.com/CatharsisFonts/Cormorant (642 stars, OFL, pushed 2026-10-06). Lighter, more fashion; use only as a tested alternate for the display cut.
- **EB Garamond** — github.com/georgd/EB-Garamond (1K stars, OFL). The safest serif body alternate if Caslon Text's x-height proves too small on phones.
- **Newsreader** — github.com/productiontype/Newsreader (258 stars, OFL, 2021). Editorial optical sizes; a good long-form alternate.
- **Bodoni Moda** — github.com/indestructible-type/Bodoni (172 stars, OFL). Too fashion-magazine for this house; listed only to reject.

Rejected/paid (verified existence only): **Caslon Ionic** (commercialtype.com/catalog/caslon_ionic, Commercial Type, paid), **Big Caslon** (fontsinuse.com/typefaces/2/big-caslon, Carter & Cone, paid), Williams Caslon Text (Font Bureau; the old fontbureau.com URL now 404s, buy via Type Network if ever wanted). Instrument Serif was rejected earlier in the project. Keep the paid Caslons as a future upgrade path once the site has proven itself; the Libre pair is honest and free.

Loading: self-host WOFF2 subsets (`pyftsubset` or `glyphhanger`), `font-display: swap` with Capsize `size-adjust` metrics to prevent CLS; preload only the Display face.

### Icons

None as a system. The only glyphs the site needs are a cart count, a close X, a chevron and a search glass; draw those four as 1px-stroke SVGs in the gold hairline weight. No icon library (Lucide/Phosphor read as SaaS). No SVG ornaments (banned).

### Film grain / paper noise

- **SVG `<feTurbulence>`** — MDN reference verified (last modified 2025-10-27); `type="fractalNoise" baseFrequency="0.8" numOctaves="3"` on a fixed overlay at 3–5% opacity. The technique is written up at css-tricks.com/grainy-gradients (verified live). Zero JS, works under reduced motion, cheap.
- **GLSL**: `<Noise>` from @react-three/postprocessing (docs verified) for grain inside the canvas, or hash-noise from thebookofshaders.com/11 (verified). Keep grain static or very slow (do not animate per frame; animated grain is a 2020 tell).

### Colour and contrast tools

- **oklch.com** (evilmartians/oklch-picker, 2K stars, pushed 2026-10-05) — build the navy/paper/gold ramps in OKLCH so lightness steps are even; Tailwind 4 `@theme` accepts `oklch()` natively.
- **apcacontrast.com** (Myndex/apca-w3, 213 stars) — perceptual contrast for gold-on-navy and gold-on-paper hairlines/text; WCAG 2 ratios undervalue light-on-dark serif.
- **color.js** (color-js/color.js, 2.3K stars, MIT) — if ramps are generated in code.

### Photography references (public, free to read)

- **shopify.com/blog/jewelry-photography** (verified): light tent, key light softened at ~45°, white foam bounce, black cards to define edges on polished metal, macro lens, focus stacking. This matches the Lightformer setup in §2: two soft rectangles + one dark side.
- Immersive Garden's Cartier Watches & Wonders 2024 case study (immersive-g.com/projects/cartier-watches-and-wonders-24): each piece in its own themed environment, product hotspots, scroll storytelling. The reference for "one subject per screen" in 3D.

---

## 4. Research and reading

Each verified live this session.

**Taste and anti-template**
- github.com/anthropics/skills → `skills/frontend-design/SKILL.md`. The calibration list of AI tells and the "spend your boldness in one place" rule. Read before every screen.
- interfaces.rauno.me (and its MIT twin github.com/vercel-labs/web-interface-guidelines). Rauno Freiberg's living list: instant toggles, disabled-after-submit, mousedown menus, 16px inputs, box-shadow focus rings. The quality floor.
- rauno.me/craft and rauno.me/craft/interaction-design. Prototypes (Blur Reveal, Toolbar Morph, X-Ray) and the essay on invisible interaction details; the standard for motion that explains rather than decorates.
- 925studios.co/blog/ai-slop-web-design-guide and noqta.tn/blog/ai-design-slop-overused-ui-patterns-fix-2026. Agency write-ups of the slop vocabulary (Inter, purple gradient, three cards with icons, pulsing pills, one thick coloured card border). Useful as a second lint list; treat their statistics as anecdotal.
- linear.app/now/how-we-redesigned-the-linear-ui (2024-03-28). Reduce visual noise, alignment, hierarchy, neutral and timeless; evolve rather than overhaul. The nearest thing to a luxury brief written by a software team.
- vercel.com/blog/design-engineering-at-vercel. Why design and engineering are one role on sites like this.

**Motion**
- emilkowal.ski/ui/great-animations and emilkowal.ski/ui/the-magic-of-clip-path. The three questions (does it feel right, is it fast, is it needed) and clip-path reveals that run on the compositor.
- animations.dev (Emil Kowalski; paid course, enrolment closed until 2027, two free preview lessons). The theory behind the skills we installed.
- joshwcomeau.com/animation/css-transitions. Easing fundamentals: ease-out entering, ease-in leaving, custom cubic-bezier.
- developer.chrome.com/docs/css-ui/scroll-driven-animations and developer.chrome.com/docs/web-platform/view-transitions. The two native APIs we lean on instead of libraries.
- gsap.com/blog/3-13 and gsap.com/standard-license. What became free and under what terms.
- lenis.darkroom.engineering and the Lenis README (ScrollTrigger integration, reduced-motion behaviour).

**Typography**
- utopia.fyi/type/calculator. Fluid scale.
- seek-oss.github.io/capsize. Metrics-based leading trim.
- fontsinuse.com/typefaces/2/big-caslon and fontsinuse.com search "caslon jewelry". Fonts In Use has no Libre Caslon jewellery entry (verified: the search returns Saltygirl, Capsul, Maya, Attrē, Floios, Leman, none in Caslon), and the only live-site Caslon jewellery uses found are Ariel Gordon (Caslon 540) and Ellen Mote (Adobe Caslon). Typewolf has no Libre Caslon page (404). Takeaway: a Caslon jewellery identity on the web is rare, which is a point in our favour.
- typewolf.com/site-of-the-day. Current pairings on award sites (Grenette/Styrene, Cardinal/Sweet Sans/Baskerville, Signifier/Switzer): the pattern is one characterful serif plus a quiet grotesque, which is exactly Caslon + Public Sans.

**Performance and Hydrogen**
- shopify.dev/docs/storefronts/themes/best-practices/performance/hydrogen-performance. Loaders with `Promise.all`, stream non-critical data with `Suspense`/`Await`, `CacheShort`/`CacheLong`/`CacheNone` per query or full-page `Oxygen-Cache-Control`, `<Image aspectRatio>` + eager LCP, and the warning that every imported SDK ships with the route bundle (our three.js must be a lazy, route-split, idle-loaded chunk).
- web.dev/articles/vitals. LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 at p75. The WebGL canvas is the INP risk; mount it after first paint and never on the main thread's first 200 ms.
- reactrouter.com/how-to/view-transitions. The exact API we will use for page transitions.

**Luxury e-commerce UX**
- baymard.com/research-articles/2021-luxury-ecommerce-benchmark (free): 15 pitfalls from benchmarking Bang & Olufsen, Chanel, Gucci, Jimmy Choo, Louis Vuitton, TAG Heuer, Van Cleef & Arpels. The ones that bite jewellery: no direct footer link to Return/Shipping, hard-to-understand returns, no estimated delivery date, no "feature" search (carat, metal), thematic filters missing, inadequate hit areas. Baymard's finding that luxury homepages and PDPs score well while search scores poorly is the strongest argument for a small, well-filtered catalogue over a search box.
- baymard.com/blog/luxury-goods-benchmark-2024 (summary free; detail paywalled): the same seven sites against 500+ parameters.
- shopify.com/blog/jewelry-photography. Packshot standards (§3).

---

## 5. Inspiration index

Only sites that were actually fetched or whose award/case-study pages were fetched. Where the brand site itself blocked the fetcher (Aesop, Jacquemus, Bottega Veneta, Zegna, Van Cleef, Tiffany, Graff, Rolex, Chanel, Bulgari, Jaeger-LeCoultre, Repossi, Loro Piana timed out) it is omitted, as instructed.

1. **Cartier — "365, A Year of Cartier"** by 14islands (14islands.com/work/cartier365; awwwards.com/sites/365-a-year-of-cartier-2). Awwwards SOTD + FWA + Lovie silver; 2024 and 2025 editions, up to 32 articles, EN/FR/ZH. Technique: a yearbook of chapters with one intro animation built around a single motif (the panther in 2025), scroll storytelling. Steal: one motif owns the intro; chapters, not sections.
2. **Cartier — Watches & Wonders 2024/2026** by Immersive Garden (immersive-g.com/projects/cartier-watches-and-wonders-24; awwwards.com/sites/cartier-watches-wonders-2026, SOTD 2026-05-25, tags Three.js, GLSL, Blender, Scrolling, 3D, Dev Award 7.85). Technique: each timepiece in its own environment, real-time 3D, hotspots that reveal details, sound. Steal: the product sits alone in a lit room; details arrive on request, not on scroll.
3. **cartier.com** (fetched). Technique: none. A text-led hero ("Endless love"), static stills, Salesforce Commerce Cloud mega-menu. Lesson: the flagship commerce site of the most important house in the category is deliberately plain; the spectacle lives on the campaign microsites. Our site must be both, which is why the ring is the only 3D moment.
4. **boucheron.com** (fetched). Full-width hero with a Play control, "Price on demand" on product cards, Magento/Hyvä. Steal: price-on-request as a legitimate PDP state for high pieces; a tiny, quiet "size guide / shipping / care" utility row.
5. **chaumet.com** (fetched). Full-bleed collection hero, image-led cards grouping Haute Joaillerie by theme (tiaras, coloured stones), Shopify. Steal: collections curated by story rather than by product type.
6. **hermes.com** (fetched). Runway video hero with real play/pause, image-led mega-menu panels, lazy-loading placeholders. Steal: video only when it is the subject, with visible controls; no autoplay loops as wallpaper.
7. **loewe.com** (fetched). 16:9 campaign still as the hero, text-link header (Women, Men, Gifts, Art & Craft, Stories), skip links. Steal: a text header with five words is enough; "Stories" as a first-class nav item.
8. **brunellocucinelli.com** (fetched; also on Awwwards' luxury list as "Brunello Cucinelli AI E-com" SOTD). Image slide hero with a Kant quotation and one EXPLORE link; numbered menu; four languages. Steal: a single sentence of philosophy on the hero instead of a tagline; restraint as the brand.
9. **aman.com** (fetched). "New & Noteworthy" still as hero, card grids, a Menu toggle with a multi-level destinations panel, a single Reserve button. Steal: one verb in the header (Reserve → for us, "Visit" or "Book an appointment").
10. **sothebys.com** (fetched). Three editorial cards as the hero, region tabs, lazy quick-cards. Steal: the auction-house tone of writing about objects (provenance, maker, material) for the house's heritage pieces.
11. **phillips.com** (fetched). Image carousel hero with "Register to bid", a text nav (Auctions, Calendar, Departments, Editorial). Steal: Editorial as a nav item; dated, titled objects.
12. **patek.com** (fetched). Video hero with a visible timer, Menu button, and a "Reduce motion" toggle on the page. Steal: the reduce-motion toggle in the footer, surfaced, not hidden in OS settings.
13. **harrywinston.com** (fetched). Text-led hero ("Majestic Escapes"), mega-menu with Back controls, newsletter and QR popups. Lesson: when the hero is text-led it must be set beautifully; theirs is not. Ours is Caslon Display at 72px with Capsize trim.
14. **buccellati.com** (fetched). Rotating banners (Fall Edit), seven-section mega-menu, "Loading…". Lesson: the rotating banner is what we are not doing; one subject per screen.
15. **mikimoto.com** (fetched). Large product photography with short overlaid headlines, a Main-menu toggle with Jewellery/Bridal/Lifestyle/Gifts. Steal: Bridal and Gifts as top-level nav for a house that does weddings.
16. **davidyurman.com** (fetched). Video hero with play/pause/mute and a cover image, Demandware mega-menu. Lesson: the American reference point; competent, templated. We beat it on type and stillness.
17. **messika.com** (fetched). Image hero with mobile/desktop crops, hamburger slide-out, accordion menu, Shopify. Lesson: a Shopify jewellery site at scale; its menu accordion is the pattern to avoid on desktop.
18. **darkroom.engineering** (fetched). Studio behind Lenis, Satus, Hamo, Tempus; WebGL + motion + headless commerce. Steal: their Satus starter (github.com/darkroomengineering/satus, 1K stars, MIT, pushed 2026-10-09) is the cleanest public example of Lenis + GSAP + r3f wired together in a React app; read its scroll and canvas providers.
19. **lusion.co** (fetched). "Scroll to explore", large display type, Play Reel, Porsche Dream Machine, Synthetic Human. Steal: the confidence to put one line of type on a full screen. Do not steal: the density of 3D; Lusion is a showreel, we are a shop.
20. **unseen.co** (fetched). "Drag to explore", click-and-hold, sound toggle, type-led intro. Lesson: gesture-gated entry is wrong for commerce; note it only as the far end of the spectrum.
21. **dogstudio.co** (fetched). Letter-spaced split headlines, sound toggle, showreel. Lesson: tracked-out words as decoration are on the AI-tell list now; skip.
22. **locomotive.ca** (fetched). Lightship, Drake Hotel, Scout Motors; promotes its own Locomotive Scroll and asks whether you should use it. Lesson: even its author hedges on smooth scroll; keep Lenis light.
23. **14islands.com** and **immersive-g.com** (fetched). Portfolios listing Cartier, Louis Vuitton, Longines. Bookmark as the two studios whose luxury work is the bar.

Also on Awwwards' luxury inspiration list (fetched): Odyssée, Tengile Malamala Collection, MIU MIU "A House that we shaped", The Watch, Vero New-York, House of Honey, Julien Calot (all SOTD). Worth opening by hand for stills; not fetched individually here.

---

## What NOT to use, consolidated

- **Scroll-jacking** of any kind: drei ScrollControls, Locomotive Scroll, horizontal-scroll sections, snap sections. Lenis at a low lerp is the ceiling.
- **Hover-distorted images** (curtains.js, ogl shaders) and **cursor followers**. Agency tells.
- **Scattered motion**: fade-up on every section, hover-lift on every card, parallax on every image. One orchestrated reveal per page (the ring) plus motion that answers a click.
- **Depth of field** in the live canvas, **chromatic aberration** above 0.01, **animated grain**, **bloom** without a threshold. Cost more than they give; blur the one thing we want sharp.
- **SVG ornaments, flourishes, dividers, numbered 01/02/03 markers, ALL-CAPS tracked eyebrows, "→" on links, middle-dot meta strings.** All on the AI-tell list.
- **Rotating hero banners, autoplay wallpaper video, mega-menus with promotional tiles.** Every templated luxury commerce site has them; none of the sites we admire do.
- **Icon libraries, Lottie mascots, swup/barba, a second WebGL renderer, @squoosh/lib, SplitType, react-wrap-balancer.** Redundant or stale.
- **Skill sets that add motion** (impeccable `overdrive`, mengto `cinematic-gsap-lenis-motion-system`, `awwwards-animations-skill`).

---

## Sources

Skills registry: skills.sh via `npx skills search` (frontend-design, gsap, three.js, react-three-fiber, lenis, typography, web-design-guidelines, scroll animation, motion design, accessibility, web performance, hydrogen, tailwind, image optimization, awwwards, shader, luxury).
GitHub API (stars/license/pushed): anthropics/skills, vercel-labs/agent-skills, vercel-labs/web-interface-guidelines, pbakaus/impeccable, Leonxlnx/taste-skill, emilkowalski/skills, greensock/gsap-skills, CloudAI-X/threejs-skills, EnzeD/r3f-skills, addyosmani/web-quality-skills, cloudflare/skills, MengTo/Skills, DevMartinese/awwwards-animations-skill, ibelick/ui-skills, Weaverse/shopify-hydrogen-skills, obra/superpowers, bergside/awesome-design-skills, samber/cc-skills, wondelai/skills, antfu/skills, Shopify/Shopify-AI-Toolkit, freshtechbro/claudedesignskills, pmndrs/drei, pmndrs/react-postprocessing, pmndrs/postprocessing, pmndrs/examples, pmndrs/react-three-fiber, pmndrs/gltfjsx, pmndrs/math, FarazzShaikh/THREE-CustomShaderMaterial, darkroomengineering/lenis, darkroomengineering/satus, motiondivision/motion, seek-oss/capsize, trys/utopia-core, lovell/sharp, JonasKruckenberg/imagetools, vercel/satori, LottieFiles/dotlottie-web, oframe/ogl, martinlaxenaire/curtainsjs, donmccurdy/glTF-Transform, zeux/meshoptimizer, shuding/react-wrap-balancer, ascorbic/unpic-img, lukePeavey/SplitType, Shopify/hydrogen, 14islands/r3f-scroll-rig, undercasetype/Fraunces, uswds/public-sans, impallari/Libre-Caslon-Text, impallari/Libre-Caslon-Display, CatharsisFonts/Cormorant, indestructible-type/Bodoni, georgd/EB-Garamond, productiontype/Newsreader, Myndex/apca-w3, evilmartians/oklch-picker, color-js/color.js, codrops org repo listing.
npm registry (`npm view`): @react-three/drei, @react-three/postprocessing, postprocessing, three-custom-shader-material, @gltf-transform/cli, lenis, gsap, @gsap/react, motion, @capsizecss/core, sharp, vite-imagetools, satori, @resvg/resvg-js, @vercel/og, @lottiefiles/dotlottie-react, ogl, curtainsjs, swup, @barba/core, @unseenco/taxi, react-wrap-balancer, utopia-core, maath, leva, r3f-perf, @react-three/fiber, three, three-stdlib, @pmndrs/vanilla, gltfjsx, @shopify/hydrogen, @unpic/react, @squoosh/lib, lqip-modern, thumbhash, blurhash, split-type, tempus, react-router.
Poly Haven API (api.polyhaven.com/assets, t=hdris&c=studio; t=textures) and polyhaven.com/license; polyhaven.com/a/velour_velvet; ambientCG API (api/v2/full_json) and ambientcg.com/license.
Fetched pages: raw SKILL.md for anthropics frontend-design, vercel-labs web-design-guidelines, samber frontend-design-deslop; gsap.com/blog/3-13; gsap.com/standard-license; drei docs (mesh-refraction-material, lightformer, environment, presentation-controls, scroll-controls); react-postprocessing docs (bloom, depth-of-field, noise); developer.chrome.com scroll-driven-animations and view-transitions; reactrouter.com/how-to/view-transitions; emilkowal.ski (great-animations, the-magic-of-clip-path); rauno.me/craft, rauno.me/craft/interaction-design, interfaces.rauno.me; joshwcomeau.com/animation/css-transitions; animations.dev; linear.app/now/how-we-redesigned-the-linear-ui; vercel.com/blog/design-engineering-at-vercel; web.dev/articles/vitals; shopify.dev hydrogen-performance; baymard.com 2021-luxury-ecommerce-benchmark and luxury-goods-benchmark-2024; shopify.com/blog/jewelry-photography; utopia.fyi; seek-oss.github.io/capsize; MDN feTurbulence and text-wrap; css-tricks.com/grainy-gradients; thebookofshaders.com/11; oklch.com; apcacontrast.com; fontsinuse.com (search, big-caslon); typewolf.com/site-of-the-day; commercialtype.com/catalog/caslon_ionic; Google Fonts specimens (Libre Caslon Display/Text, Public Sans, Fraunces, Cormorant Garamond, EB Garamond, Newsreader, Bodoni Moda); Lenis README; 14islands.com/work/cartier365; immersive-g.com/projects/cartier-watches-and-wonders-24; awwwards.com (365-a-year-of-cartier-2, cartier-watches-wonders-2026, inspiration_search/luxury); brand and studio sites listed in §5.
Web searches: Baymard luxury UX; Hydrogen performance docs; "AI slop" web design essays; Fonts In Use Caslon jewellery; Cartier 365 Awwwards; Awwwards jewellery SOTD 2025–2026.
