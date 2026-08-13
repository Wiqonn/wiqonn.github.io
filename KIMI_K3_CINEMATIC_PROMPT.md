# Kimi K3 Cinematic Website Prompt for Wiqonn (v2 — Hybrid)

**Purpose**: Transform the existing Wiqonn Next.js/React website into a **hybrid cinematic experience**: a cinematic scroll-driven hero (AI Fire style, WITHOUT the sphere) + premium Awwwards-level scroll reveals throughout the rest of the page. Preserve ALL content, bilingual support (ES/EN), visual identity, and functionality.

**Companion docs**: This prompt is the result of researching the Kimi K3 + Higgsfield + frame-interpolation pipeline (MindStudio tutorial, Buldrr prompt pack), the AI Fire demo site (charming-sawine-b4803b.netlify.app), Awwwards 2025–26 trends (Waabi, Dropbox, Kriss.ai), Marian Marton's portfolio (CPPN shaders, cursor light, metaballs), mta-brand.webflow.io (halftone WebGL, SVG data-artifact), and production scroll-video implementations (GSAP ScrollTrigger, Lenis, RIFE/FILM interpolation). **Verified against the actual repo on Aug 2026** — all facts below match the codebase.

---

## 🎯 CONTEXT: WHAT EXISTS TODAY

### Visual Identity (MUST PRESERVE)
- **Primary Navy**: `#0A0E1A` (background)
- **Brand Gradient**: `linear-gradient(135deg, #00ADEC 0%, #1CB29F 50%, #39B54A 100%)`
  - Cyan: `#00ADEC`
  - Teal: `#1CB29F`
  - Green: `#39B54A`
- **Fonts**:
  - Headings: **Lato** (loaded weights 300 / 400 / 700 / 900 via `next/font/google`)
  - Body: **Open Sans**
  - Mono: **JetBrains Mono**
- **Aurora Mesh**: Radial cyan/teal/green glows with slow `aurora-drift` animation (transform/opacity only — INP-safe)
- **Neural Network Canvas**: Particle network background (`components/neural-network-bg.tsx`) — pauses off-screen, respects `prefers-reduced-motion`. **This is the seed of the signature visual.**

### Current Page Structure (app/page.tsx — rendered in this exact order)
```
1. Navigation (sticky, hide-on-scroll-down, ES/EN toggle, Cal.com CTA)
2. HeroSection (rotating headline ×3, dual CTA, trust line, scroll indicator)
3. TechMarquee (2 rows of tech logos: left→right + right→left)
4. StatsSection (4 commitments: 30min, 24h, 48h, KPI día 1 — inline animated counters)
5. ServicesSection (4 cards: IA/ML, BI, Cloud, Dev — hover effects, results list)
6. ValueProposition (3 pillars: Data→Production, Applied Research, AI for Humans)
7. GuaranteesBand (4 promise cards with icons)
8. FAQSection (6 accordion items)
9. CTASection (LeadForm + trust line with clock/location icons)
10. Footer (brand, services, company, contact + social)
```

### Other Components
- `ResearchSection` and `TeamSection` exist in `components/` but are **NOT imported or rendered on any page** (orphaned components). Do not build for them; leave them untouched.
- Blog: `/blog` index + 2 articles (vLLM-MLX, DGX Spark fine-tune) — do not alter.

### Technical Stack (verified)
- **Next.js 16** (App Router) — `"next": "^16.2.6"`
- React 19.2, TypeScript 5
- Tailwind CSS v4 (`@tailwindcss/postcss` 4.1.9) + `tw-animate-css`
- GSAP 3.14 + ScrollTrigger (registered in several components)
- **Lenis 1.3.17** — package `lenis` (NOT `@studio-freight/lenis`); configured in `components/smooth-scroll-provider.tsx`
- i18n: `es` (source of truth) + `en` (derived via `Dict = typeof es`); all copy in `lib/i18n.ts`
- **Package manager: pnpm** (pnpm-lock.yaml; GitHub Actions uses `pnpm install` + `pnpm build`)
- **next.config.mjs ALREADY has**: `output: "export"`, `images.unoptimized: true`, `typescript.ignoreBuildErrors: true`
- **Env vars (build-time)**: `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` (lead form), `NEXT_PUBLIC_CAL_COM_URL` (booking). Both have empty-string fallbacks in `lib/forms.ts` — do NOT hardcode or remove the fallbacks.
- **Deployment: GitHub Pages** via existing `.github/workflows/deploy.yml` (pushes to `master`, uploads `./out`). `CNAME` = `www.wiqonn.com`. **There is NO Netlify/Vercel setup — do not ask for tokens.**

---

## 🎬 CINEMATIC TRANSFORMATION GOAL (HYBRID — REVISED)

**Why hybrid, not "all-video":** the AI Fire demo (all-scroll-video) is a spectacular first fold but costs a video production per section, is heavy on mobile (degrades to autoplay), and risks being a one-trick pony. Awwwards 2026 sites win with a **cinematic hero + premium reveals + ONE signature moment**. So:

1. **Hero = cinematic scroll-scrub** (video OR scroll-driven canvas neural graph — see §Concept), pinned, with panels fading per progress. THE "AI Fire" moment.
2. **The rest of the page = premium Awwwards reveals**: SplitText headings, bento grid with tilt/counters, pinned pipeline section (Train → Tune → Deploy), typographic marquee, magnetic CTAs, clip-path image reveals, custom cursor. NO background video below the hero.
3. **One recurring signature**: the **Wiqonn light-tunnel** gradient (cyan→teal→green) that threads the whole page — the Waabi-style visual motif the jury remembers.
4. **Global texture**: film-grain overlay kills the "AI-slop" look and elevates the scroll-video.
5. **Tour Mode** autoplays the hero journey with a floating control (optional, low priority).
6. **ALL content, i18n, interactions, accessibility preserved.**

---

## 📋 MASTER PROMPT FOR KIMI K3 / KIMI CODE

> **Copy everything below into Kimi K3 or Kimi Code**

---

### ROLE & CONTEXT

You are a senior creative technologist and front-end architect (Awwwards-caliber). You will transform an **existing production Next.js 16 website** (Wiqonn — AI lab in Barranquilla, Colombia) into a **hybrid cinematic experience**: a scroll-scrubbed cinematic hero + premium scroll-reveal animations throughout the rest of the page.

**Critical constraints:**
- **Preserve 100% of existing content, copy, i18n (ES/EN), interactions, and accessibility**
- **Preserve visual identity**: Navy `#0A0E1A`, brand gradient (cyan→teal→green), Lato/Open Sans fonts, aurora mesh, neural network canvas
- **Preserve all components**: Navigation, TechMarquee, Stats, Services, ValueProp, Guarantees, FAQ, CTA, Footer, LeadForm, BookingButton
- **Preserve bilingual switching** (segmented toggle, persisted via `localStorage wiqonn-lang`)
- **Preserve GSAP/ScrollTrigger animations** where they enhance (reveal, parallax, counters)
- **Preserve the existing Lenis setup** in `smooth-scroll-provider.tsx` — integrate with it, do NOT create a second Lenis instance
- **Preserve `prefers-reduced-motion` compliance** (all animations CSS-driven via `.reveal`/`.reveal-in`)
- **Preserve the env-var fallbacks** in `lib/forms.ts` (`hasBooking()`, `hasForm()` → mailto fallback). Do not break the form or booking when env vars are empty.
- **Use `pnpm` for all commands** (not npm)

**The hero asset is the background canvas; the existing UI is the overlay.** Do not rewrite content. Do not change copy. Do not remove sections.

---

### DESIGN LANGUAGE (the visual system — Awwwards 2026, applied to Wiqonn)

| Principle | Implementation |
|---|---|
| **Firma visual recurrente** | The **Wiqonn light-tunnel**: a conic/radial gradient `#00ADEC → #1CB29F → #39B54A` with `filter: blur()` + low opacity, threaded through the page at different scales (hero, section dividers, CTA). One signed element × several sections > 10 different effects. |
| **Grain / noise global** | SVG `feTurbulence` overlay, opacity ~0.05–0.08, `mix-blend-mode: overlay`, `pointer-events: none`, `position: fixed`, z-index near top. Static under `prefers-reduced-motion`. Kills the AI-slop look. |
| **Tipografía cinética** | SplitText line/word reveals (mask: lines) with `expo.out` + stagger for ALL large headings. Display scale: hero Lato 900, tracking `-0.03em`. Eyebrows: JetBrains Mono, uppercase, `letter-spacing: 0.42em`, cyan accent glow. |
| **Deep custom ease** | `power4.inOut` for section reveals, `expo.out` for hero, `elastic.out(1,0.3)` for magnetic buttons. Consistent across the site. |
| **El gradiente como acento, no como fondo** | Navy base everywhere; gradient reserved for: CTA pill backgrounds, eyebrow accents, the light-tunnel, 1px hairline dividers, the rail. |
| **Layering** | grain (top) → content → glow → gradient → navy (bottom). Legibility scrim behind hero text. |
| **Scroll = narrativa** | First scroll transforms the hero (canvas reacts / video scrubs). Below: scroll-triggered reveals with `scrub: 1` glide. |
| **Restraint** | ONE signature moment per section. Not every section is its own effect — alternate motion-heavy and near-static sections (Dropbox rhythm: "peaks and pauses"). |

---

### CONCEPT (REVISED — no sphere)

> **Macro Journey — "the neural graph awakens"**: a single continuous 8-second cinematic shot. It begins in deep midnight navy (#0A0E1A) with a sparse field of cold cyan (#00ADEC) particles drifting in near-darkness. The camera pushes forward and the particles begin to connect — glowing nodes link into a **living neural graph** (NOT a sphere): edges ignite along the gradient cyan→teal (#1CB29F), data pulses travel the links. The camera continues forward; the graph densifies, branch pathways (like fiber-optic infrastructure) extend toward a bright green (#39B54A) horizon of refined, organized intelligence. Lighting: cool cyan key from above, warm green rim from below, volumetric scattering. No cuts. Forward motion throughout. Emotional tone: precise, transformative, trustworthy — raw potential becoming reliable intelligence. **The motif is a connected graph of nodes and links — never a closed spherical/globular object.**

**Alternative hero (recommended, zero-asset):** if no video is available, the hero scrubs a **scroll-driven canvas render** built from the existing `NeuralNetworkBackground`: same narrative — particles assemble into a connected graph as scroll progress 0→1 advances, edges light up cyan→teal→green, pulses travel the links. Progress maps to canvas state exactly like `video.currentTime` maps to scroll. This keeps the AI Fire feel with zero bytes of video.

**Map sections to scroll progress (0.0 = top, 1.0 = bottom of the hero journey — hero only):**

| Section (in the pinned hero) | Scroll Progress | Trigger Behavior |
|---|---|---|
| Hero (headline, subheadline, CTAs, trust) | 0.00 – 0.22 | SplitText reveal on load; overlay fades out by 0.30 |
| Stats (commitments) — first fold | 0.28 – 0.45 | Counters animate on enter (reuse existing inline counters) |
| Services (4 cards) | 0.42 – 0.62 | Staggered card reveal |
| Value Proposition (3 pillars) | 0.60 – 0.78 | Staggered pillar reveal |
| CTA (LeadForm + trust) | 0.85 – 1.00 | Final strong hold |

> **If the pinned-hero is capped at ~4 panels (AI Fire pattern), prioritize:** Hero → Services → Value → CTA. The rest of the sections (Stats, Guarantees, FAQ) live BELOW the hero in normal page flow with premium reveals (see §Reveal system). **Do NOT cram the entire site into the pinned hero** — that is the hybrid boundary. Maximum pin distance: ~300–400vh.

---

### ⚙️ TECHNICAL REQUIREMENTS

#### 1. The Cinematic Hero — scroll binding (pick ONE; do NOT combine)

##### Option A — Vanilla `requestAnimationFrame` + spacer (the proven AI Fire algorithm)

This is the exact algorithm verified from the AI Fire demo's `main.js`. **No GSAP needed for the hero itself.**

**Structure (fixed stage + spacer):**
```tsx
// app/page.tsx — hero journey
<main className="relative bg-background-navy">
  <section id="journey" className="relative">
    <div className="stage fixed inset-0 z-0 overflow-hidden">
      <video ref={videoRef} muted playsInline preload="auto" poster="/hero-neural-poster.jpg"
        aria-hidden="true" tabIndex={-1}
        className="absolute inset-0 h-full w-full object-cover scale-[1.02]" />
      <div className="bg__scrim" aria-hidden="true" />   {/* dark left, open center-right */}
      <div className="bg__glow" id="glow" aria-hidden="true" />  {/* neural glow, opacity by progress */}
      {/* Panels absolutely positioned, data-start/data-end per progress */}
      <CinematicPanel start={0.00} end={0.22}><HeroContent /></CinematicPanel>
      <CinematicPanel start={0.28} end={0.45}><StatsContent /></CinematicPanel>
      {/* ...services, value, cta... */}
      <div className="rail" aria-hidden="true" />   {/* 3px progress bar bottom */}
      <div className="cue" aria-hidden="true">Scroll</div>
    </div>
    {/* spacer generates the scroll distance */}
    <div className="spacer" style={{ height: "var(--scroll-len)" }} aria-hidden="true" />
  </section>
  <RestOfPage />   {/* normal flow below — premium reveals, NO video */}
  <Footer />
</main>
```

**The proven scroll-scrub algorithm (copy from the AI Fire demo):**
```ts
const SCRUB_EASE = 0.14;   // how quickly video catches up to scroll target
const SETTLE_EPS = 0.004;  // seconds below which video is "caught up"
const SEEK_EPS   = 0.012;  // don't re-seek for changes smaller than this
const PANEL_FADE = 0.05;   // progress width of each panel's fade in/out

function getProgress() {
  const y = window.scrollY;
  const max = spacer.offsetHeight - window.innerHeight;
  return Math.min(1, Math.max(0, y / Math.max(1, max)));
}
// rAF loop:
//   targetTime = progress * video.duration
//   displayTime += (targetTime - displayTime) * (reduceMotion ? 1 : SCRUB_EASE)
//   if (Math.abs(targetTime - displayTime) < SETTLE_EPS) displayTime = targetTime
//   if (!video.seeking && Math.abs(video.currentTime - displayTime) > SEEK_EPS)
//       video.currentTime = displayTime
// Loop ONLY runs while moving: wake() on scroll/resize, auto-stop when settled.
```

**Scroll length** (keeps scrub speed uniform): `--scroll-len = clamp(frames * 3.6vh, 480, 900)vh` (e.g. 8s × 24fps ≈ 192 frames ≈ 692vh).

**Canvas variant** (zero-asset, recommended if no video): same progress → `neuralGraph.render(progress)` drives particle assembly + edge ignition + data pulses. Pause via IntersectionObserver off-screen, DPR cap 2, `prefers-reduced-motion` → static render.

**Performance rules (non-negotiable):**
- Scroll listener MUST be `{ passive: true }` — never `preventDefault`
- Animate ONLY `transform`, `opacity`, `scale`, `currentTime` — never `width`, `top`, `left`, `filter` (layout thrash)
- `will-change: opacity, transform` on panels; `scale(1.02)` + `object-cover` on video so crops never show edges
- Pause RAF loop when tab hidden (`visibilitychange`) or off-screen (`IntersectionObserver`)
- iOS: prime the video with `play().then(() => pause())` on first gesture so seeked frames render
- Loader until `canplay`/`canplaythrough` (+ 9s timeout fallback → poster); poster also as CSS background so a static image is always visible before load / if the video fails
- `prefers-reduced-motion`: ease=1 (direct), panels y=0, no scrub easing

##### Option B — GSAP ScrollTrigger (only if you prefer it)

```ts
gsap.to(video, {
  currentTime: video.duration,
  ease: "none",
  scrollTrigger: {
    trigger: journeyRef.current,
    start: "top top",
    end: "bottom bottom",
    scrub: 1, // 1s smoothing — matches the lerp above
  },
});
```
- The project does **NOT** have `@gsap/react` installed, so use `gsap.context(() => { ... }, sectionRef)` (the pattern already used in `research-section.tsx`) for auto-cleanup — or `pnpm add @gsap/react` and use `useGSAP`.
- Use `gsap.matchMedia()` to skip all scroll animations under `prefers-reduced-motion: reduce`.

#### 2. Section Overlay System (`CinematicPanel` wrapper)

```tsx
interface CinematicPanelProps {
  children: React.ReactNode;
  startProgress: number;  // 0–1
  endProgress: number;    // 0–1
  className?: string;
}

const smoothstep = (e0: number, e1: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
};

// opacity = smoothstep(start, start+PANEL_FADE, p) * smoothstep(end, end-PANEL_FADE, p)
// transform = `translate3d(0, ${(1-opacity) * 24}px, 0)`
// pointerEvents = opacity > 0.6 ? "auto" : "none"
// aria-hidden when fully hidden; inert/tabIndex={-1} below ~0.1 opacity so form/FAQ are reachable exactly when visible
```

- Wrap each existing section component; **do not modify section internals**
- Neutralize opaque backgrounds from the WRAPPER (e.g. `[&>section]:bg-transparent`) so the video/canvas shows through; keep text readable with existing text colors + a translucent scrim behind content
- **The glow layer** (`bg__glow`): a radial teal/green glow that rises `opacity 0 → 0.6` with `smoothstep((p - 0.45) / 0.5)` — the "neural awakening" light (replaces the demo's warm orange overlay, in Wiqonn colors)

**Chrome interpolation (the "neural temperature" trick, from the demo):**
```ts
// accent interpolates through the brand gradient as the user scrolls the hero
const t = smoothstep((p - 0.35) / 0.5);
// 3-stop lerp: cyan (0,173,236) → teal (28,178,159) → green (57,181,74)
// sets CSS var --accent used by eyebrow, rail, glow, dots
```

#### 3. Premium Reveal System (BELOW the hero — normal flow)

All wrapped in `gsap.matchMedia()` / existing `.reveal` utilities; all respect `prefers-reduced-motion`.

| Pattern | Implementation notes |
|---|---|
| **SplitText headings** | `SplitText.create(el, { type: "lines,words", mask: "lines" })` then `gsap.from(lines, { yPercent: 120, stagger: 0.08, ease: "expo.out", scrollTrigger: { trigger, start: "top 85%" } })`. Wait for `document.fonts.ready` before splitting. `aria-label` with original text on parent. `split.revert()` cleanup. Apply to hero title + every section title. |
| **Bento grid** | Services/Capabilities as bento: cells of different size, `gsap.from(".bento > *", { scale: 0.85, y: 40, autoAlpha: 0, stagger: { each: 0.08, from: "center" }, scrollTrigger })`. Mix cell types: 1 tilt, 1 count-up, 1 clip-reveal, rest soft hover. |
| **Pinned pipeline** | One section (e.g. "Cómo funciona el lab": Train → Tune → Deploy) pinned `end: "+=200%"` `scrub: 1`, timeline reveals each step while a parallax bg scales. `pinType: "transform"` if iOS flicker. Only ONE pinned section below the hero. |
| **Tilt 3D cards** | Card `rotateX/-rotateY` ±10° toward cursor with `transformPerspective: 800`, `power2.out`; glow via CSS vars `--mx/--my` + `::after` radial-gradient. Return `power3.out`. Skip on `pointer: coarse`. |
| **Counters** | Reuse existing inline StatsSection counters; if adding metrics, one `gsap.to(obj, { val, onUpdate })` proxy per counter, `expo.out`, `tabular-nums`, `once: true`. Real numbers only (params, latency, benchmarks). |
| **Typographic marquee** | Duplicate content ×2, `translateX(-50%)` loop, `mask-image` edge fades, pause on hover. Optionally velocity skew via `quickSetter("skewY")` clamped ±8° (`ScrollTrigger.getVelocity()`). Between sections as brand rhythm. |
| **Magnetic CTA** | `gsap.quickTo(x/y)` with `elastic.out(1,0.3)` on the main CTA + nav CTA, `* 0.3` offset from center. Skip on coarse pointer + reduced-motion. |
| **Clip-path image reveals** | Any lab screenshot/dashboard: `clip-path: inset(0 0 100% 0)` → `inset(0%)` + inner `scale(1.25→1)`, `expo.out`, `once: true`. |
| **Theme shift (optional)** | Pass hero navy → a light "pipeline" section → back to navy CTA, animating `document.body` bg via CSS var tween, 0.8s `power2.out`. Use HSLA vars, not hex. |

#### 4. Signature Elements (the "moment" and the texture)

1. **Light-tunnel Wiqonn** — `.light-tunnel` conic-gradient `#00ADEC→#1CB29F→#39B54A`, `filter: blur(40–60px)`, opacity ~0.35, reused at different scales across hero/section dividers/CTA. Optionally scroll-scaled (0.2→1.6) with `scrub` through the hero.
2. **Global grain** — `body::after` SVG feTurbulence, opacity 0.06, `mix-blend-mode: overlay`, animated with `steps(8)` jitter, static under reduced-motion.
3. **Custom cursor** (desktop only, `@media (pointer: fine)`) — dot + ring, `mix-blend-mode: difference`, lag via `quickTo`; grows on interactive elements. Do NOT set `cursor: none` globally on touch. Low priority if time is short.
4. **Neural graph artifact (optional, high-impact)** — an inline SVG graph (nodes + edges) where a **data pulse travels a path** via `stroke-dashoffset` + `getPointAtLength` (the mta-brand subway-train pattern) — the "data flowing through the lab" metaphor. Good in the Value/Pipeline section.

#### 5. Tour Mode (`TourMode` component — optional, low priority)

- Floating button (bottom-right, glass `bg-background-navy/60 backdrop-blur-md border border-white/10`)
- **Autoplay**: `window.scrollTo({ top: nextSectionTop, behavior: "smooth" })`, one waypoint at a time, ~2.5s per section
- **Controls**: ▶️ play / ⏸️ pause / ⏭️ next / ⏮️ prev
- **Waypoints**: hero → stats → services → value → guarantees → faq → cta → footer. **There is no "audit" section on the homepage — do not reference one.**
- **Progress ring** around button (SVG `stroke-dashoffset` bound to progress)
- **Keyboard**: `Space` = play/pause, `→` = next, `←` = prev (global listener, cleaned up)
- Integrate with the existing Lenis instance (`scrollTo`) — do not create a second Lenis

#### 6. Header & Footer Adaptations

- **Header**: `bg-background-navy/80 backdrop-blur-md` when scrolled (soften the existing `/95` swap); keep logo + lang toggle + Cal.com CTA + hide-on-scroll-down
- **Footer**: Standard static, in normal flow AFTER the hero journey + reveals — same content, `bg-background-navy border-t border-border/50`, social links, copyright. Never inside the pinned container.
- **Loader** (re-brand from AI Fire): `"Initializing neural network…"` (ES: `"Inicializando red neuronal…"`) with gradient cyan→green ring, dots animation, hidden on `canplay`, 9s timeout fallback.

#### 7. Performance & Accessibility

- Hero video: `preload="auto"` (it's the LCP hero) + poster; canvas variant: DPR cap 2, IntersectionObserver pause, lazy init `rootMargin: "300px"`
- All text overlays meet WCAG AA on navy (`text-foreground`, `text-muted-foreground`; gradient text only on large headings)
- `prefers-reduced-motion`: hero static (poster/first frame), panels visible, all `.reveal` content visible, grain static, no marquee animation, no cursor
- Semantic HTML: `<main>`, `<section>`, `<header>`, `<footer>`, proper heading hierarchy
- `aria-label` on TourMode button and progress ring
- Disable JS test: page must still read well (sections in normal flow, poster visible, content legible)

#### 8. Responsive

- **Desktop**: full scroll-scrub hero; pin+scrub pipeline; horizontal-free (keep it vertical — simpler and faster)
- **Mobile**: hero degrades to **autoplay muted loop** (no scrub) or a static poster + panels stacked legibly; native touch scroll (Lenis `smoothWheel: true`, no `smoothTouch` — do NOT hijack `touchmove`)
- iOS Safari: `playsinline muted` mandatory; test sticky/pin (`pinType: "transform"` if flicker)
- TechMarquee: horizontal scroll on mobile (already works)
- Cursor/magnetic/tilt: all disabled under `pointer: coarse`

#### 9. Deployment (GitHub Pages — do NOT touch Netlify/Vercel)

- `next.config.mjs` already has `output: "export"`; build with `pnpm build` → artifacts in `./out`
- Hero video from `/public` (keep ≤ ~15MB); poster + webm/mp4 pair if possible
- Deployment is handled by the existing `.github/workflows/deploy.yml` on push to `master`. **Do not ask for any API tokens.**
- Preserve the two build-time env secrets in the workflow (`WEB3FORMS_ACCESS_KEY`, `CAL_COM_URL`) — do not remove or rename them.

---

## 🎨 VIDEO PROMPT REFERENCE (for the Higgsfield/Kling step — NOT for Kimi Code)

Use the **MCSLA formula** (Medium, Camera, Subject, Lighting, Atmosphere). This is the prompt to paste into **Higgsfield Cinema Studio 3.0 / Kling 2.0** (not into the site-build prompt):

```
[M] 8-second 1080p 16:9 single continuous shot, no cuts, forward motion throughout
[C] 100mm macro lens equivalent, slow continuous push-in, no drift, no zoom
[S] Journey through a Wiqonn-branded AI landscape — a living neural graph (NEVER a sphere):
    1. Begin in deep midnight navy (#0A0E1A) with a sparse field of cold cyan (#00ADEC)
       particles drifting in near-darkness
    2. Push forward as particles connect into glowing nodes forming a connected graph;
       edges ignite cyan (#00ADEC) → teal (#1CB29F)
    3. Data pulses travel the links; the graph densifies into branching fiber-optic
       pathways extending toward a bright green (#39B54A) horizon of refined intelligence
    4. The organized graph fills the frame — raw potential becomes reliable intelligence.
       The motif is a network of nodes and links, NEVER a closed sphere or orb.
[L] Cool cyan key light from above, warm green rim light from below, volumetric scattering,
    atmospheric haze rising 20% → 70% density as the camera advances
[Atmosphere] Hyper-detailed, visible micro-particles, subtle film grain, precise and
    trustworthy emotional tone, teal-green color grade matching Wiqonn brand
```

**Settings:**
- Resolution: **1080p**; Aspect: **16:9** (desktop) + **9:16** (mobile variant)
- Duration: **8 seconds**; Mode: **Smart/single continuous shot**; Cost: ~80 credits/clip — generate 2–3 variants, pick best
- **Frame interpolation (30fps → 60fps) — DO NOT SKIP** (via ByteDance AIGC, RIFE, or FILM). Note: the AI Fire demo shipped 24fps all-intra and still felt smooth — the all-intra encoding matters more than fps. Interpolate if budget allows; **never skip the all-intra re-encode.**

```bash
# CRITICAL: every frame becomes a keyframe → instant seeks while scrubbing
# input = the interpolated 60fps file; output = the scrub-ready file (different names!)
ffmpeg -i hero-neural-interpolated.mp4 -g 1 -an -crf 20 -pix_fmt yuv420p \
  -movflags +faststart hero-neural-60fps.mp4
# -g 1   = keyframe every frame (instant random access)
# -an    = strip audio (not needed for scrub)
# -crf 20 = high quality (18–23 range)
```

**Video spec summary:**
```
Resolution: 1920×1080 (desktop) / 1080×1920 (mobile)
Framerate:  60fps (interpolated from 30fps) — or 24fps all-intra if no interpolation budget
Codec:      H.264 MP4 (h.264 + yuv420p for max compatibility)
Keyframes:  -g 1 (every frame)
Faststart:  -movflags +faststart
Duration:   8 seconds
Target:     ≤ 15MB per format
```

---

## 🧱 FILES TO MODIFY / CREATE

**Modify:**
1. `app/page.tsx` — Add cinematic hero journey at top (fixed stage + spacer + panels); rest of page stays in normal flow; wrap section titles/reveals
2. `app/globals.css` — Add `.grain`, `.light-tunnel`, `.cinematic-panel`, `.rail`, `.cue`, `.glass`, marquee + grain utilities, `--accent`/`--scroll-len` variables
3. `components/navigation.tsx` — Soften scrolled background to `bg-background-navy/80 backdrop-blur-md`; loader logic
4. `components/hero-section.tsx` — Adapt to cinematic panel (SplitText headline, keep rotating keyword as crossfade or static); neutralize its `bg-[#0A0E1A]` from wrapper
5. `components/smooth-scroll-provider.tsx` — Ensure Lenis↔GSAP ticker sync (`gsap.ticker` already synced; add `ScrollTrigger.addEventListener("refresh", () => lenis.resize())` if pinning)

**Create:**
1. `components/cinematic/CinematicHero.tsx` — Fixed stage + video/canvas + spacer + scrub loop (or wrap in hero journey section)
2. `components/cinematic/CinematicPanel.tsx` — Opacity wrapper with smoothstep + pointer-events/inert gating
3. `components/cinematic/ScrollProgressProvider.tsx` — Normalized scroll progress (0–1), RAF + lerp, passive listener
4. `components/cinematic/GrainOverlay.tsx` — Global film grain (or pure CSS `body::after`)
5. `components/cinematic/LightTunnel.tsx` — The Wiqonn gradient signature
6. `components/cinematic/CinematicCursor.tsx` — Custom dot+ring cursor (desktop only) — optional
7. `components/cinematic/TourMode.tsx` — Floating autoplay control + progress ring — optional
8. `components/reveal-split.tsx` — SplitText-based heading reveal wrapper (wait fonts, aria-label, revert)
9. `hooks/useScrollProgress.ts` — Normalized scroll progress (0–1), RAF + lerp, passive listener
10. `public/hero-neural-60fps.mp4` + `public/hero-neural-poster.jpg` — (place interpolated video here; or skip if using canvas variant)

**Preserve As-Is (do not modify internals):**
- All section components except hero: `TechMarquee`, `StatsSection`, `ServicesSection`, `ValueProposition`, `GuaranteesBand`, `FAQSection`, `CTASection`, `Footer`
- `lib/i18n.ts` — ALL copy lives here
- `components/ui/*` — Button, Card, Avatar, etc.
- `components/marquee.tsx` — the infinite marquee (NOT in `ui/`)
- `components/reveal.tsx` — the reveal wrapper (NOT in `ui/`)
- `components/neural-network-bg.tsx` — Keep as the seed/reference for the canvas hero variant; can remain low-opacity in normal sections
- `components/animated-counter.tsx` — exists but is **currently unused** (StatsSection implements its own inline counter). Leave it untouched.
- `components/booking-button.tsx`, `components/lead-form.tsx` — Keep functional, including the mailto/env-var fallbacks

---

## 🛠 IMPLEMENTATION SEQUENCE

1. **Create cinematic infrastructure** (CinematicHero, CinematicPanel, ScrollProgressProvider, GrainOverlay, LightTunnel, reveal-split, hook)
2. **Update `app/globals.css`** with grain/tunnel/panel/rail/cue/marquee utilities + `--accent`/`--scroll-len` variables
3. **Refactor `app/page.tsx`** — cinematic hero journey at top + wrap remaining sections' titles/reveals
4. **Adapt `HeroSection`** for SplitText + cinematic panel; neutralize wrapper bg
5. **Add premium reveals** to below-hero sections (SplitText titles, bento/tilt/counters on Services/Stats, pinned pipeline if applicable, marquee)
6. **Adapt `Navigation`** for glassmorphism header + loader
7. **Verify Footer** sits correctly after the hero journey
8. **Test locally**: `pnpm dev` — verify scrub binding, panels, reveals, i18n switch, reduced motion, mobile
9. **Build**: `pnpm build` — verify static export works (`./out`)
10. **Type-check**: `pnpm exec tsc --noEmit` — NOTE: `next.config.mjs` sets `typescript.ignoreBuildErrors: true`, so `pnpm build` alone will NOT catch type errors — run `tsc` explicitly
11. **Deploy**: commit + push to `master` → GitHub Actions deploys to GitHub Pages (`www.wiqonn.com`). No tokens needed.

---

## ✅ VERIFICATION CHECKLIST (run after build)

- [ ] Hero video/canvas scrubs smoothly forward/backward with scroll (no jank, no stutter)
- [ ] Hero panels (data-start/data-end) appear at correct scroll positions with cross-fades
- [ ] Below-hero sections reveal with SplitText/bento/counters and DO NOT have video background
- [ ] ONLY the visible panel is interactive (form/FAQ reachable exactly when visible)
- [ ] Global grain visible, `mix-blend-mode: overlay`, no click blocking
- [ ] Light-tunnel Wiqonn visible across sections in brand gradient
- [ ] Internal staggers (counters, cards, reveals) still work within sections
- [ ] ES/EN toggle switches all copy instantly (no reload)
- [ ] `prefers-reduced-motion`: hero static, all reveals visible, grain static, no cursor/marquee
- [ ] Mobile: native touch scroll, hero autoplay/poster fallback, no scrub jank
- [ ] Header glassmorphism on scroll, hide-on-scroll-down works
- [ ] LeadForm submits (Web3Forms when `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` set; mailto fallback otherwise)
- [ ] BookingButton opens Cal.com (when `NEXT_PUBLIC_CAL_COM_URL` set) or mailto fallback
- [ ] TypeScript: `pnpm exec tsc --noEmit` passes with zero errors
- [ ] Lint: `pnpm lint` passes
- [ ] Build: `pnpm build` produces `./out` successfully
- [ ] Deployed URL (`www.wiqonn.com`) works
- [ ] Performance: DevTools → Performance → record 10s of scrolling → no long tasks, frame time ≈ 16ms
- [ ] JS-disabled: page reads well (poster visible, sections in normal flow)

---

## 📦 ASSETS NEEDED FROM YOU

1. `hero-neural-60fps.mp4` — 8s, 1080p, 60fps (or 24fps all-intra), H.264, `-g 1` encoded, `faststart` (place in `public/`) — **OR** use the canvas neural-graph hero (zero asset)
2. Optional: `hero-neural-9x16.mp4` — mobile portrait variant
3. Optional: `hero-neural-poster.jpg` — static poster (also used as reduced-motion/fallback)
4. **No deployment tokens** — the repo deploys to GitHub Pages automatically on push to `master`

---

## 🧠 PIPELINE CHEAT SHEET (for the human running this)

| Step | Tool | Output |
|------|------|--------|
| 1. Concept | Kimi K3 (chat) | 10 concepts → pick 1 (already done: Wiqonn neural-graph awakening, no sphere) |
| 2. Video prompt | MCSLA formula above | Paste into Higgsfield/Kling |
| 3. Video gen | Higgsfield Cinema Studio 3.0 / Kling 2.0 | `hero-neural.mp4` (1080p, 16:9 + 9:16) |
| 4. Interpolate | ByteDance AIGC via MCP (or RIFE) | `hero-neural-interpolated.mp4` (60fps) |
| 5. Re-encode | `ffmpeg -g 1 -an -crf 20 -movflags +faststart` | `hero-neural-60fps.mp4` (scrub-ready) |
| 6. Build site | **This prompt** → Kimi Code | Next.js hybrid cinematic site |
| 7. Deploy | git push to `master` → GitHub Actions | Live on `www.wiqonn.com` |

**Cost estimate**: ~80 credits video (~$1–2) + interpolation (~$0.2–0.5) + Kimi session (~$1–2) ≈ **$2–5 total** — or **$0** with the canvas neural-graph hero. The `--yolo` flag runs Kimi Code unattended.

---

## 🚨 COMMON PITFALLS TO AVOID

| Pitfall | Solution |
|---------|----------|
| **Skipping the all-intra re-encode** | The #1 amateur signal for scrub — never ship without `-g 1` + faststart |
| **Video has cuts** | Single continuous shot only — cuts break the scroll illusion |
| **ffmpeg in/out same file** | Always write to a different filename (`-i in.mp4 ... out.mp4`) |
| **A sphere in the video/canvas** | The motif is a connected graph (nodes + links), NEVER a closed sphere/orb |
| **Cramming the whole site into the pinned hero** | Hybrid boundary: hero pins only ~4 panels (≤400vh); the rest is normal flow + reveals |
| **Rewriting section content** | **Never touch** `lib/i18n.ts` or section component JSX — only wrap |
| **Breaking i18n** | Keep `useT()` in every section; provider wraps whole page |
| **Opaque section bg hides hero video** | Neutralize `bg-*` from the wrapper (`[&>section]:bg-transparent`) + translucent scrim |
| **Invisible overlays trap focus** | `inert`/`tabIndex={-1}` when hidden; `pointer-events: none` below 0.5 opacity |
| **Janky scroll** | RAF + lerp (0.14 damping), throttled seeks (`>0.012s` drift), `will-change`, `scale(1.02)` |
| **Animating layout props** | Only `transform`, `opacity`, `scale`, `currentTime` — never width/top/filter |
| **Keyframe interval too high** | Video must be `-g 1` encoded or scrubbing stutters |
| **Non-passive scroll handler** | `addEventListener("scroll", fn, { passive: true })` |
| **Over-animating** | Pick 3–4 key animations per section; "peaks and pauses". One signature moment, not 20 effects |
| **Ignoring mobile budget** | Hero degrades to autoplay/poster; no scrub on touch; cursor/tilt/magnetic off on coarse pointer |
| **Video not loading** | `preload="auto"` (LCP hero) + poster; `playsinline muted` mandatory on iOS |
| **Reduced motion ignored** | Rely on CSS media query in `globals.css`; `gsap.matchMedia()` guard |
| **Creating a second Lenis** | Integrate with the existing `smooth-scroll-provider.tsx` only |
| **TypeScript silently broken** | `next.config.mjs` has `ignoreBuildErrors: true` — run `pnpm exec tsc --noEmit` explicitly |
| **Asks for Netlify/Vercel tokens** | There is no Netlify/Vercel — deploy is GitHub Pages via `deploy.yml` on push to `master` |
| **Using npm instead of pnpm** | Repo uses pnpm — use `pnpm install/dev/build/lint` |

---

## 📞 FINAL NOTE

This is a **refactor, not a rebuild**. The Wiqonn site is already production-grade with strong content, i18n, accessibility, and brand identity. Your job is to **elevate the presentation**: a cinematic hero that sells the lab in one scrub, plus Awwwards-level reveal craft in the sections that follow — while **changing nothing substantive**.

The hybrid keeps the AI Fire "wow" in the first fold without paying the cost of an all-video page, and the Wiqonn light-tunnel + grain give it the signature identity the jury remembers.

**When ready, ask for the video file (or confirm canvas hero) and concept, then build end-to-end.**

---

## 🔗 SOURCES & REFERENCE (research behind this prompt)

1. **MindStudio**: *Build Cinematic Scroll-Driven Websites with Kimi K3* — scroll-to-video binding, 30→60fps interpolation rationale, Kimi Code + Higgsfield pipeline
2. **AI Fire demo** (charming-sawine-b4803b.netlify.app): the verified production implementation — fixed stage + spacer, rAF lerp (0.14) + SEEK_EPS (0.012) + SETTLE_EPS (0.004), `data-start/data-end` panels with smoothstep + 24px rise, loader, rail, cue, accent interpolation (cold→warm → remapped to Wiqonn cyan→teal→green). Video verified: 720p, 24fps, all-intra, faststart, no audio, `-g 1`-equivalent encoding
3. **Awwwards 2025–26**: Waabi (light-tunnel signature visual, weight-shift logo), Dropbox Brand (custom easing/timing, "peaks and pauses", one signature moment), Kriss.ai (brand motif as interaction), Sui, Hashgraph Ventures, Glitch&Grit (gradients + marquee), Lando Norris (SOTY 2025)
4. **Marian Marton** (marianmarton.com): CPPN generative shaders, cursor light cone with auto-inversion, metaballs, photo-blob, ScrollSmoother, `mix-blend-mode: difference` system, 19 patterns mapped to Wiqonn
5. **mta-brand.webflow.io**: halftone WebGL cursor lens, SVG subway map with train pulses via `getPointAtLength` + `stroke-dashoffset`, `mix-blend-mode: difference` nav/H1, Lenis config, `scale(1.1)` + `opacity(.5)` video hero
6. **Kimi showcases**: GARGANTUA raytracer, Open Sea WebGPU ocean, Atelier Veil (mood-shift by product) — 3D/WebGPU + scrollytelling as premium identity
7. **MindStudio 3D tutorial**: video-first workflow; "CSS 3D + GSAP = 80% of impact at 20% of complexity"; particle field between video and overlay; tilt 3D cards; cost $5–9
8. **GSAP + ScrollTrigger**: SplitText (free since 3.13, `mask: "lines"`), `gsap.context()`, `gsap.matchMedia()`, `quickTo`/`quickSetter`, scrub + pin; `@gsap/react` NOT installed (use `gsap.context`)
9. **Lenis (package `lenis` v1.3.17)**: already configured in `smooth-scroll-provider.tsx` — integrate, don't duplicate
10. **FFmpeg**: `-g 1` all-intra encoding, `-movflags +faststart` — frame-accurate scrubbing
11. **RIFE / FILM**: open-source interpolation alternatives to ByteDance AIGC
12. **GSAP Vault snippets**: `scroll-video-scrub`, `image-clip-reveal`, `count-up-stats`, `page-preloader`, `horizontal-scroll-section`, `hover-image-trail`, `scroll-velocity-skew`
