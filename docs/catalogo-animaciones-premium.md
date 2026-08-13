# Catálogo de Patrones de Animación Web Premium (Awwwards)

**Contexto de uso:** Landing Next.js 16 (App Router) de laboratorio de IA — **Wiqonn**.
Stack base ya disponible: **Lenis** + **GSAP/ScrollTrigger** (`@gsap/react`, `gsap.ticker` sincronizado con Lenis, `autoRaf: false`).

Este catálogo reúne técnicas concretas y reutilizables basadas en sitios SOTD de Awwwards y estudios top (Active Theory, /nk.studio, Basement Studio, Braid, Adoratorio, Locomotive, darkroom, Obys, Lusion). Cada ficha es autónoma: se puede copiar y adaptar.

---

## Índice rápido

| # | Patrón | Esfuerzo | Costo perf. | Ficha |
|---|--------|----------|-------------|-------|
| 1 | Scroll-video scrub (stage fijo + spacer) | Alto | Alto | [F1](#f1-scroll-video-scrub) |
| 2 | Pinned section + timeline scrubbed | Medio | Medio | [F2](#f2-pinned-section--timeline-scrubbed) |
| 3 | SplitText reveal enmascarado (líneas) | Medio | Bajo | [F3](#f3-splittext-reveal-enmascarado) |
| 4 | Text marquee infinito | Bajo | Bajo | [F4](#f4-text-marquee-infinito) |
| 5 | Botón magnético (quickTo) | Bajo | Bajo | [F5](#f5-botón-magnético) |
| 6 | Custom cursor (mix-blend-difference) | Bajo | Bajo | [F6](#f6-custom-cursor-mix-blend-difference) |
| 7 | Grain overlay (SVG feTurbulence) | Bajo | Bajo | [F7](#f7-grain-overlay-film-noise) |
| 8 | Light-tunnel / firma de gradiente | Medio | Bajo | [F8](#f8-light-tunnel--firma-de-gradiente) |
| 9 | Parallax de capas (multi-speed) | Bajo | Bajo | [F9](#f9-parallax-de-capas) |
| 10 | Image reveal (clip-path / mask) | Bajo | Bajo | [F10](#f10-image-reveal-clip-path--mask) |
| 11 | Counter metrics (count-up) | Bajo | Bajo | [F11](#f11-counter-metrics-count-up) |
| 12 | Sección horizontal (pin + translateX) | Alto | Medio | [F12](#f12-sección-horizontal-pin) |
| 13 | Tilt 3D cards (perspectiva + glow) | Bajo | Bajo | [F13](#f13-tilt-3d-cards) |
| 14 | Hover preview cards (imagen que sigue al cursor) | Medio | Medio | [F14](#f14-hover-preview-cards) |
| 15 | Preloader intro (contador + cortina) | Medio | Bajo | [F15](#f15-preloader-intro) |
| 16 | Theme shift por scroll (color de fondo) | Bajo | Bajo | [F16](#f16-theme-shift-por-scroll) |
| 17 | Bento grid (ensamblado escalonado) | Medio | Bajo | [F17](#f17-bento-grid-ensamblado) |
| 18 | Velocity skew / smear (bonus) | Medio | Bajo | [F18](#f18-velocity-skew--smear-bonus) |

**Bonus de arquitectura:** [Síntesis A vs B para Wiqonn](#síntesis-a-vs-b-para-wiqonn).

---

## Reglas transversales (las aplican todos los patrones)

1. **Sincronía Lenis↔GSAP.** Nunca dejes que corran en RAFs separados: se jitter 1–2 frames.
   ```tsx
   // "use client" — providers/LenisProvider.tsx
   import { ReactLenis } from "lenis/react";
   import { gsap } from "gsap";
   import { ScrollTrigger } from "gsap/ScrollTrigger";
   gsap.registerPlugin(ScrollTrigger);

   export function LenisProvider({ children }: { children: React.ReactNode }) {
     const lenisRef = useRef<{ lenis: Lenis }>(null);
     useEffect(() => {
       const update = (time: number) => lenisRef.current?.lenis?.raf(time * 1000);
       gsap.ticker.add(update);
       gsap.ticker.lagSmoothing(0);
       return () => gsap.ticker.remove(update);
     }, []);
     return (
       <ReactLenis ref={lenisRef} root autoRaf={false}>
         {children}
       </ReactLenis>
     );
   }
   ```
2. **Solo `transform` y `opacity`.** Cualquier `top/left/width/box-shadow` fuerza reflow. GPU-composited = sin jank.
3. **`useGSAP` de `@gsap/react`** (nunca `useEffect` a pelo): limpia triggers y tweens en unmount y respeta React StrictMode.
4. **`prefers-reduced-motion`** vía `gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", ...)`.
5. **`ScrollTrigger.refresh()`** tras montaje y tras carga de fuentes (`document.fonts.ready`) — las medidas cambian.
6. **`scrub: 1`** (número, no `true`) = el truco de "glide" que hace sentir premium una sección pinned.
7. **Límite ~30 triggers activos**; para grids usar `ScrollTrigger.batch()`, no un trigger por card.
8. `<ScrollTrigger markers: true>` solo en dev; quitarlos en prod.
9. SplitText ahora es **gratis** en GSAP 3.13+ (`SplitText.create()`), con `autoSplit` y propiedad `mask`.

---

## F1. Scroll-video scrub

**Patrón "AI Fire"** (stage fijo + spacer + panels). El video está pinned; el scroll avanza el `currentTime` del `<video>` frame a frame. Es el efecto clave de las páginas producto de Apple y de los heroes cinemáticos.

**Descripción visual:** una película avanza / retrocede según desplazas. La página "se convierte en un scrubbing de timeline". Con scrub suave (`scrub: 1`) se siente un gliding intencional, no un salto.

**Estructura (enfoque GSAP/ScrollTrigger):**
```html
<section className="reel">
  <div className="reel__stage">
    <video muted playsInline preload="auto" poster="/poster.jpg">
      <source src="/hero.mp4" type="video/mp4" />
    </video>
    <div className="reel__overlay" />   <!-- textura/gradiente sobre el video -->
  </div>
</section>
<!-- el resto de la página (panels) viene DESPUÉS; el pin reserva el spacer solo -->
```
```tsx
useGSAP(() => {
  const video = stageRef.current?.querySelector("video")!;
  let awaiting = false;

  ScrollTrigger.create({
    trigger: stageRef.current,
    start: "top top",
    end: "+=350%",
    pin: true,
    scrub: 1,
    onUpdate: (self) => {
      if (awaiting) return;
      awaiting = true;
      const t = self.progress * video.duration;
      video.currentTime = t;
      video.addEventListener("seeked", () => (awaiting = false), { once: true });
    },
  });
}, { scope: rootRef });
```

**Key técnicos:**
- El video debe ser **all-intra** (keyframe en cada frame) o los seeks se ven en bloques. Se exporta con ffmpeg `-g 1`.
- Los seeks se gatean con el evento `seeked` para no apilar decodificaciones.
- **Mobile/touch:** no scrubbear — autoplay muted + loop como backdrop. `gsap.matchMedia()` para ramificar.
- **Reduced motion:** `poster` estático + panels apilados legibles.
- El overlay se mueve en paralelo con un segundo tween dentro del mismo timeline (scale 1.15 → 1.0) para dar profundidad.
- Alternativa canvas: precargar frames y dibujarlos en `<canvas>` (Mastercard lo hace) — más pesado de assets pero más suave en móvil.

**Costo esfuerzo:** Alto (producción de video + export + throttle). **Rendimiento:** Alto (decode por frame; solo en desktop).

**Ejemplos:** Apple AirPods/AirPods Pro pages; **AI Fire** (referencia directa); `flight.runway.com`; gsapvault `scroll-video-scrub`.

**Encaje Wiqonn:** El **hero cinemático** exactamente así. Un solo `reel` de 6–10s mostrando el flujo del lab (inputs → pipeline → output). NO repetirlo en toda la página.

---

## F2. Pinned section + timeline scrubbed

**Descripción visual:** la sección se fija en viewport mientras el contenido interno ejecuta una coreografía (titulo que sube, capa de fondo que se acerca, chunks que aparecen uno a uno). Es el "sticky storytelling" de producto.

**Estructura:**
```tsx
useGSAP(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top top",
      end: "+=200%",
      pin: true,
      scrub: 1,               // número = suavizado catch-up
    },
  });
  tl.from(".headline", { yPercent: 100, opacity: 0, duration: 0.4 })
    .from(".feature", { y: 80, opacity: 0, stagger: 0.15 }, "+=0.2")
    .to(".bg", { scale: 1.2, ease: "none" }, 0);  // parallax dentro del pin
}, { scope: ref });
```

**Key técnicos:**
- `pinSpacing: true` (default) añade el spacer; no te asustes si el height se "duplica" en DevTools — es correcto.
- iOS Safari: usar `pinType: "transform"` si hay flicker en fixed.
- No pinnees elementos con `position: sticky` ni dentro de scroll containers anidados.
- Con Lenis: `ScrollTrigger.addEventListener("refresh", () => lenis.resize())` para que el pin-spacer no desincronice.

**Costo esfuerzo:** Medio. **Rendimiento:** Medio (1 pin activo a la vez; cuidar cantidad de tweens).

**Ejemplos:** Apple product pages; `hontran.dev` tutoriales pin/scrub/parallax; GSAP ScrollTrigger docs.

**Encaje Wiqonn:** Sección "¿Cómo funciona el lab?" — 3 pasos (Train → Tune → Deploy) que se revelan sobre un fondo fijo. Es el mecanismo B más potente sin video.

---

## F3. SplitText reveal enmascarado

**Descripción visual:** el titular se parte en líneas/palabras; cada unidad sube desde detrás de un clip invisible (mask) con stagger y ease expo — tipografía editorial que "se lee sola". Es el patrón tipográfico #1 de Awwwards.

**Estructura:**
```tsx
useGSAP(() => {
  const split = SplitText.create(headingRef.current, {
    type: "lines, words",
    mask: "lines",            // envoltura overflow:hidden por línea (GSAP 3.13+)
  });
  gsap.from(split.lines, {
    yPercent: 120,
    stagger: 0.08,
    duration: 1,
    ease: "expo.out",
    scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
  });
  return () => split.revert();   // limpieza obligatoria
}, { scope: ref });
```
*(Sin mask de GSAP: envolver cada línea en un `span.overflow-hidden > span` manual.)*

**Key técnicos:**
- **Espera `document.fonts.ready`** antes de splitear o las medidas usan fallback y se descuadran.
- **Accesibilidad:** `aria-label` con el texto original en el padre — los spans fragmentados rompen el lector de pantalla.
- Variantes con `type: "chars"` y stagger 0.02 para palabras cortas tipo logo ("WIQONN").
- Respetar `prefers-reduced-motion` (sin split = texto visible).

**Costo esfuerzo:** Medio. **Rendimiento:** Bajo (solo transform/opacity; ~1ms por bloque).

**Ejemplos:** `wearemotto.au` (máscaras en transiciones), `typographyprinciples.obys.agency`, GSAP SplitText demos, estudios tipo Lusion.

**Encaje Wiqonn:** Titular del hero + titulares de cada sección + quotes de resultados. Úsalo en TODO heading grande para coherencia.

---

## F4. Text marquee infinito

**Descripción visual:** una cinta tipográfica que se desplaza sin costuras (transform loop), con fade en los bordes. Da ritmo industrial/"tech". Con dirección reactiva al scroll se siente "vivo".

**Estructura (CSS puro, más barato — se puede mejorar con GSAP horizontalLoop):**
```css
.marquee-track {
  display: flex; width: max-content; gap: 2rem;
  animation: marquee 22s linear infinite;
}
.marquee-container:hover .marquee-track { animation-play-state: paused; }
.marquee-container {
  mask-image: linear-gradient(to right, transparent, #000 10%, #000 90%, transparent);
}
@keyframes marquee { to { transform: translateX(calc(-50% - var(--gap) / 2)); } }
```
```html
<div class="marquee-container">
  <div class="marquee-track">
    <div class="marquee-content" aria-hidden="false">...×2 duplicado...</div>
  </div>
</div>
```
*(Con GSAP: `gsap.utils.wrap` + ticker o la helper `horizontalLoop()` de GSAP para pausas y drag; dirección reactiva al scroll con `ScrollTrigger.getVelocity() < 0 ? "reverse" : "forward"`.)*

**Key técnicos:** contenido duplicado ×2 para el loop perfecto; el clon va `aria-hidden`. Pausar con hover. Fade edges vía `mask-image` (look premium instantáneo). Accesibilidad: texto en movimiento puede ser distractor — mantenerlo decorativo o pausable.

**Costo esfuerzo:** Bajo. **Rendimiento:** Bajo (transform composited; 0 JS si es CSS).

**Ejemplos:** estudios tipo `obys.agency`, sitios tech, `designstactic` snippet, GSAP marquee demos. Enormemente usado en 2025–26.

**Encaje Wiqonn:** Banda de separación entre hero y contenido ("LLMs • Agentes • Multimodal • RAG • …") y en footer. Ideal como firma de marca entre secciones.

---

## F5. Botón magnético

**Descripción visual:** el botón es atraído por el cursor dentro de un radio (~200px), con vuelta elástica (`elastic.out`) al salir. Micro-interacción táctil que da "craft".

**Estructura (GSAP quickTo — el método correcto):**
```tsx
function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);
  const xTo = useRef<((v: number) => void) | null>(null);
  const yTo = useRef<((v: number) => void) | null>(null);

  useGSAP(() => {
    xTo.current = gsap.quickTo(ref.current, "x", { duration: 0.8, ease: "elastic.out(1,0.3)" });
    yTo.current = gsap.quickTo(ref.current, "y", { duration: 0.8, ease: "elastic.out(1,0.3)" });
  }, { scope: ref });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    xTo.current?.((e.clientX - (r.left + r.width / 2)) * 0.3);
    yTo.current?.((e.clientY - (r.top + r.height / 2)) * 0.3);
  };
  const onLeave = () => { xTo.current?.(0); yTo.current?.(0); };

  return <button ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}>{children}</button>;
}
```

**Key técnicos:** `quickTo` es O(1) por frame — no acumula tweens. `data-magnetic-strength/radius` por elemento si quieres config. Ignorar en `pointer: coarse` y reduced-motion. El wrapper es importante (el efecto necesita espacio alrededor). Press state `scale(0.96)` con CSS.

**Costo esfuerzo:** Bajo. **Rendimiento:** Bajo.

**Ejemplos:** casi cualquier agencia top (Locomotive, /nk.studio, oivierlarose.com magnetic-button). gsapvault `magnetic-cursor`.

**Encaje Wiqonn:** CTA principal "Try the Lab" + nav links + botones de cards. Es el micro-detail más barato que sube el nivel percibido.

---

## F6. Custom cursor (mix-blend-difference)

**Descripción visual:** un círculo blanco (`mix-blend-mode: difference`) sigue al cursor con lag controlado; se agranda al pasar sobre elementos interactivos. Sobre fondos claros y oscuros siempre queda visible (invierte el color). Sensación de sitio "hecho a mano".

**Estructura:**
```css
* { cursor: none; }                    /* solo en pointer:fine */
.custom-cursor {
  position: fixed; inset: 0 auto auto 0;
  width: 32px; height: 32px; border-radius: 50%;
  background: #fff; mix-blend-mode: difference;
  pointer-events: none; z-index: 1000;
  transform: translate(-50%, -50%);
}
.custom-cursor.is-active { width: 64px; height: 64px; }  /* hover link/btn */
```
```tsx
// sigue con lerp simple (sin librería) o gsap.quickTo para el lag
useEffect(() => {
  const dot = cursorRef.current!;
  const dx = gsap.quickTo(dot, "x", { duration: 0.25, ease: "power3.out" });
  const dy = gsap.quickTo(dot, "y", { duration: 0.25, ease: "power3.out" });
  const move = (e: MouseEvent) => { dx(e.clientX); dy(e.clientY); };
  window.addEventListener("mousemove", move);
  return () => window.removeEventListener("mousemove", move);
}, []);
```

**Key técnicos:** solo en `(hover: hover) and (pointer: fine)` — en móvil no existe cursor. `cursor: none` con `@media (pointer: fine)`. Añadir etiqueta de texto/emojis opcional (view ports, "drag", etc.). El lag diferencia "follower" (dot instantáneo + ring con lag).

**Costo esfuerzo:** Bajo. **Rendimiento:** Bajo (transform-only).

**Ejemplos:** `awwwards.com` diría mil; Lusion, Cuberto, `hontran.dev`, `wasim2934/custom-cursor`.

**Encaje Wiqonn:** Firma de identidad "lab": dot + anillo; al pasar sobre cards del lab se expande con la etiqueta "View →". Aplica diferencia sobre el hero cinemático oscuro.

---

## F7. Grain overlay (film noise)

**Descripción visual:** una capa de grano analógico sutil (opacidad ~0.1, `mix-blend-mode: overlay/soft-light`) sobre fondos y gradientes. Rompe el banding de gradientes CSS y hace que superficies planas "se sientan impresas/material". El grano animado con `steps()` (no smooth) se lee como celuloide real.

**Estructura (0 assets, SVG feTurbulence como data-URI):**
```css
.grain::after {
  content: "";
  position: absolute; inset: -100%;          /* oversized para steps jitter */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E");
  mix-blend-mode: overlay;
  opacity: var(--grain-opacity, 0.12);
  pointer-events: none;
  animation: grain 0.7s steps(8) infinite;
}
@keyframes grain {
  to { transform: translate(2%, -2%) translate(-2%, 2%); }
}
```

**Key técnicos:** `fractalNoise` + `baseFrequency ~0.9–6` = grano fino parecido a emulsión (no TV-static). `inset: -100%` + `steps(8)` = el grano "renace" cada frame en vez de deslizarse (eso delata que es un patrón). `pointer-events: none` obligatorio. Congelar fuera de viewport con IntersectionObserver si es global. Respetar `prefers-reduced-motion` (grano estático).

**Costo esfuerzo:** Bajo. **Rendimiento:** Bajo (compositor; data-URI ~400B, sin requests).

**Ejemplos:** Fey (cards premium), Linear, Stripe blog art, "todo hero oscuro con gradiente" de los últimos 3 años. gggrain/nnnoise como generadores.

**Encaje Wiqonn:** Capa global `body::after` sutil (0.06–0.1) para calidez analógica; reforzada (0.15) sobre el hero y los gradientes "light-tunnel". Es el "finishing move" del look lab premium.

---

## F8. Light-tunnel / firma de gradiente

**Descripción visual:** un cono de luz o gradiente radial que se revela/recorre al hacer scroll — como un "portal" que acompaña la narrativa. En labs de IA es la metáfora perfecta del pipeline: input → procesamiento → output.

**Estructura (div de gradiente con scroll-scaled):**
```css
.tunnel {
  position: absolute; left: 50%; top: 0;
  width: 120vmax; height: 120vmax; /* enorme, centrado */
  transform: translate(-50%, -50%);
  background: radial-gradient(circle at center,
    rgba(124, 92, 255, 0.25), transparent 45%);
  filter: blur(40px);
  pointer-events: none;
}
```
```tsx
useGSAP(() => {
  gsap.fromTo(".tunnel",
    { scale: 0.2, opacity: 0 },
    {
      scale: 1.6, opacity: 0.9,
      ease: "none",
      scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1 },
    });
}, { scope: ref });
```

**Key técnicos:** gradiente + `blur` es 100% compositor. Puedes hacer "light-tunnel" real con `clip-path: polygon(...)` sobre un cono girado y `filter: blur`, animado con ScrollTrigger scrub. Acoplar a velocidad de scroll: `self.getVelocity()` mueve el hue del gradiente (via CSS var `--tunnel-x`) para un "follow" vivo.

**Costo esfuerzo:** Medio. **Rendimiento:** Bajo (filtros blur grandes = algo de composito, pero puntual).

**Ejemplos:** heroes de labs/saas de IA 2025–26 (un pasillo de luz que acompaña el scroll). No es un patrón "nominado" de estudio sino un **tropo de industria AI** — muy apropiado aquí.

**Encaje Wiqonn:** Atravesar la página con un túnel de luz que conecta hero → sección pipeline → CTA. Es la metáfora visual del lab.

---

## F9. Parallax de capas

**Descripción visual:** capas (fondo, medio, frente) se mueven a velocidades distintas — el fondo menos, el frente más — creando profundidad tridimensional con un simple `yPercent` distinto por capa.

**Estructura (un one-liner por capa):**
```tsx
useGSAP(() => {
  gsap.utils.toArray<HTMLElement>(".parallax-layer").forEach((layer, i) => {
    gsap.to(layer, {
      yPercent: layer.dataset.speed,       // ej: -20, -40, -60
      ease: "none",
      scrollTrigger: {
        trigger: layer.closest(".scene"),
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });
}, { scope: ref });
```
```html
<div class="scene">
  <div class="parallax-layer" data-speed="-15">...fondo (redes/partículas)...</div>
  <div class="parallax-layer" data-speed="-35">...middle (cards)...</div>
  <div class="parallax-layer" data-speed="-60">...front (texto)...</div>
</div>
```

**Key técnicos:** los valores pequeños (-10 a -40) se ven premium; -100+ se ve "tutorial". Imagen/div debe ser más grande que su contenedor (overflow hidden) o aparecen bordes. Alternativa data-speed estilo ScrollSmoother. GPU: solo transform.

**Costo esfuerzo:** Bajo. **Rendimiento:** Bajo.

**Ejemplos:** GSAP ScrollTrigger demos, `frnq.studio` patterns, Lusion layers, `chain-labs` (Orpetron top-10), Active Theory (WebGL parallax).

**Encaje Wiqonn:** Hero con partículas/tensor en background a -15, panel central a -35, titular a -60. Reusar en cards de secciones.

---

## F10. Image reveal (clip-path / mask)

**Descripción visual:** la imagen se destapa con un wipe de `clip-path` (inset/polygon) mientras el contenido interno escala de 1.25 → 1 (Ken Burns). Editornial, limpio, "premium sin florituras".

**Estructura:**
```css
[data-clip-reveal] { overflow: hidden; clip-path: inset(0 0 100% 0); }
[data-clip-reveal] img { display: block; width: 100%; height: 100%; object-fit: cover; transform: scale(1.25); }
```
```tsx
useGSAP(() => {
  document.querySelectorAll<HTMLElement>("[data-clip-reveal]").forEach((wrap) => {
    const img = wrap.querySelector("img")!;
    gsap.timeline({
      scrollTrigger: { trigger: wrap, start: "top 85%", once: true },
    })
      .to(wrap, { clipPath: "inset(0%)", duration: 1.1, ease: "expo.out" }, 0)
      .to(img, { scale: 1, duration: 1.1, ease: "expo.out" }, 0);
  });
}, { scope: ref });
```
*Variantes: `clip-path: inset(100% 0 0 0)` (arriba→abajo), `polygon()` para formas diagonales, SVG mask para persianas/curtain.*

**Key técnicos:** estado inicial en CSS (no flash antes de JS). `once: true` para no repetir. Para grids grandes, `ScrollTrigger.batch()` en vez de un trigger por imagen. El doble tween (clip + scale) simultáneo a `0` es lo que lo hace "caro" visualmente.

**Costo esfuerzo:** Bajo. **Rendimiento:** Bajo.

**Ejemplos:** GSAP Vault free `image-clip-reveal`, Codrops (SVG mask transitions, blinds/random grid), portfolios editoriales, Elegant Seagulls (hero mask).

**Encaje Wiqonn:** Los screenshots/resultados del lab (interfaces, dashboards de entrenamiento) deben entrar SIEMPRE así, nunca con fade plano.

---

## F11. Counter metrics (count-up)

**Descripción visual:** números que suben de 0 a su valor al entrar en viewport con ease expo, a menudo con barra de progreso sincronizada y stagger. Convierte datos en "prueba".

**Estructura (proxy + onUpdate — número y barra nunca se desincronizan):**
```tsx
useGSAP(() => {
  const obj = { val: 0 };
  gsap.to(obj, {
    val: target, duration: 1.6, ease: "expo.out",
    scrollTrigger: { trigger: metricRef.current, start: "top 85%", once: true },
    onUpdate: () => {
      numRef.current.textContent = Math.round(obj.val).toLocaleString("en-US") + suffix;
      barRef.current.style.transform = `scaleX(${obj.val / target})`;
    },
  });
}, { scope: ref });
```

**Key técnicos:** un solo `gsap.to` + `onUpdate` evita dos animaciones que se desalineen. Tabular figures (`font-variant-numeric: tabular-nums`) para que el ancho no vibre. `once: true`. Para métricas muy rápidas usa `Snap.to`. Accesibilidad: el valor final debe estar en el DOM para lectores.

**Costo esfuerzo:** Bajo. **Rendimiento:** Bajo.

**Ejemplos:** GSAP Vault `count-up-stats`, YumeUI animated counter, Webflow count-up demos, cualquier landing SaaS.

**Encaje Wiqonn:** Sección de "impacto/proof" del lab: parámetros entrenados, inferencias/s, benchmarks (MMLU, HumanEval), latencia. Con los números como producto estrella.

---

## F12. Sección horizontal (pin)

**Descripción visual:** la página se fija y los paneles se deslizan en horizontal mientras sigues scrolleando vertical — el patrón signature de portfolios y agencies. Al final el pin se libera y el scroll vertical continúa.

**Estructura:**
```tsx
useGSAP(() => {
  const track = trackRef.current!;
  const getAmount = () => track.scrollWidth - window.innerWidth;
  const tween = gsap.to(track, {
    x: () => -getAmount(),
    ease: "none",
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top top",
      end: () => `+=${getAmount()}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,   // recalcula en resize/fonts
    },
  });
}, { scope: ref });
```
```html
<section class="hscroll" ref={sectionRef}>
  <div class="hscroll__track" ref={trackRef} style={{ display: "flex", width: "max-content" }}>
    <div class="hscroll__panel">…</div>  <!-- paneles de ~60–100vw -->
  </div>
</section>
```

**Key técnicos:** `scrollWidth - innerWidth` (medido, no hardcodeado). `containerAnimation` para animaciones internas a cada panel (parallax interno keyed al track, no al scroll de página). `snap` para que los paneles asienten (`ScrollTrigger.create({ snap: 1 / (panels - 1) })`). Fallback móvil: paneles apilados vertical (matchMedia). Barra de progreso del recorrido. Accesibilidad: tabs/focus deben traducirse a scroll (con Lenis `scrollTo`).

**Costo esfuerzo:** Alto (gestionar resize, snap, móvil, focus). **Rendimiento:** Medio.

**Ejemplos:** `typographyprinciples.obys.agency`, Rauno portfolio 2025, `rauno.me`, GSAP demos horizontal, Casadevall/Milk Coop (Fandes).

**Encaje Wiqonn:** **Modelos/capabilities** como fila horizontal de cards (LLMs, visión, agentes, audio) o el "pipeline del lab" como viaje lateral. UNO solo, no dos.

---

## F13. Tilt 3D cards

**Descripción visual:** la card rota en perspectiva (rotateX/rotateY ±10–20°) hacia el cursor, con un glow radial que lo sigue; al salir, vuelve a plano con ease lento. Física de objeto real bajo la luz.

**Estructura:**
```tsx
// onMouseMove en la card
const r = cardRef.current.getBoundingClientRect();
const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);   // -1..1
const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
gsap.to(cardRef.current, {
  rotateX: -dy * 10, rotateY: dx * 10, transformPerspective: 800, duration: 0.4, ease: "power2.out",
});
// glow: set CSS vars --mx/--my como % y un ::after radial-gradient(radial at var(--mx) var(--my))
// onMouseLeave: gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.8, ease: "power3.out" });
```

**Key técnicos:** `transformPerspective` en el propio elemento (o `perspective` en el padre + `transform-style: preserve-3d` para contenido interno con `translateZ` flotante). El glow con CSS vars es más barato que un nodo extra por frame. Solo transform + custom props = compositor puro. Descarta en `pointer: coarse`.

**Costo esfuerzo:** Bajo. **Rendimiento:** Bajo.

**Ejemplos:** FWD Tools tilt/glow card, PaceKit TiltCard, Zentry (clone GSAP showcase), SaaS dev-tool landings.

**Encaje Wiqonn:** Cards de features/modelos y pricing. Combina con F5 (botón magnético dentro).

---

## F14. Hover preview cards (imagen que sigue al cursor)

**Descripción visual:** en una lista (work/case studies), el cursor dispara una imagen preview que sigue el puntero con tilt por velocidad y fade; se reutiliza un pool fijo de elementos (la DOM no crece). Es la interacción más característica de portfolios Awwwards 2024–26.

**Estructura (GSAP core, pool round-robin):**
```tsx
// Un div fijo .preview oculto; en mouseenter de cada fila:
useGSAP(() => {
  document.querySelectorAll("[data-preview]").forEach((row) => {
    const src = (row as HTMLElement).dataset.preview;
    row.addEventListener("mouseenter", () => {
      previewImgRef.current!.src = src;
      gsap.to(previewRef.current, { autoAlpha: 1, scale: 1, duration: 0.3 });
    });
    row.addEventListener("mousemove", (e) => {
      gsap.quickTo(previewRef.current, "x", { duration: 0.4 })(e.clientX);
      gsap.quickTo(previewRef.current, "y", { duration: 0.4 })(e.clientY);
    });
    row.addEventListener("mouseleave", () =>
      gsap.to(previewRef.current, { autoAlpha: 0, scale: 0.9, duration: 0.25 }));
  });
}, { scope: ref });
```

**Key técnicos:** un solo preview global = 1 nodo reutilizado, cero reflow. **Precargar** las imágenes (`new Image().src = ...`) para que no parpadeen. Fallback keyboard: al enfocar una fila, mostrar la preview estática. `mix-blend-mode: difference` opcional sobre la lista.

**Costo esfuerzo:** Medio. **Rendimiento:** Medio (imágenes pesadas → preload + `loading="lazy"` para el resto).

**Ejemplos:** GSAP Vault `hover-image-trail`, casi todo portfolio studio 2025–26 (interactive work grids).

**Encaje Wiqonn:** Lista de "Experimentos/Casos de uso" del lab — cada fila muestra un resultado visual al pasar. Perfecto para demo de modelos.

---

## F15. Preloader intro

**Descripción visual:** overlay con contador (0→100, figuras tabulares) y barra; al completar, el overlay sale con una cortina (curtain wipe / split doors / iris) mientras el hero entra con stagger detrás. Apertura de "marca" en vez de un flash de pintura.

**Estructura (GSAP core, proxy único):**
```tsx
const obj = { v: 0 };
const tl = gsap.timeline();
tl.to(obj, {
  v: 100, duration: 1.8, ease: "power2.inOut",
  onUpdate: () => { countRef.current!.textContent = String(Math.round(obj.v)).padStart(3, "0"); },
})
  .to(".preloader__panel", { yPercent: -100, stagger: 0.12, duration: 0.9, ease: "expo.inOut" }, "+=0.2")
  .set(preloaderRef.current, { display: "none" })
  .from(".hero [data-reveal]", { y: 60, autoAlpha: 0, stagger: 0.08, duration: 0.8 }, "<");
```

**Key técnicos:** modo "real": el contador **se detiene en 90 hasta el `window.load`** y luego sprint a 100 — cubre la carga real de assets. `sessionStorage` para saltarlo en visitas repetidas. Scroll-lock mientras el overlay está arriba (Lenis `stop()`). `aria-hidden` el contador + `role="status"` para SR. Sin JS: overlay `display:none` y página legible.

**Costo esfuerzo:** Medio. **Rendimiento:** Bajo (1.8s de bloqueo inicial — medir INP; si el hero es video, el preloader cubre el buffering).

**Ejemplos:** GSAP Vault `page-preloader` (4 estilos de salida), valvetui counter-reveal, portfolios studios.

**Encaje Wiqonn:** 1.2–1.8s, marca "WIQONN" + contador tech, salida en split doors → hero SplitText reveal. Da el "primer frame premium". (Si LCP manda, quitarlo o hacerlo skip-once.)

---

## F16. Theme shift por scroll (color de fondo)

**Descripción visual:** el fondo de página entero (o del header) cambia de tema (dark ↔ light, o a una paleta por sección) al cruzar de sección en sección — como "cambiar de habitación". Con scrub suave se siente un fundido continuo, no un flash.

**Estructura:**
```tsx
// data-theme="dark|light" en cada sección
useGSAP(() => {
  const sections = gsap.utils.toArray<HTMLElement>("[data-theme]");
  sections.forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top center",
      end: "bottom center",
      onEnter: () => setTheme(section.dataset.theme!),
      onEnterBack: () => setTheme(section.dataset.theme!),
    });
  });
  const setTheme = (t: string) => {
    gsap.to(document.body, {
      backgroundColor: t === "dark" ? "#050505" : "#f5f5f2",
      color: t === "dark" ? "#f5f5f2" : "#050505",
      duration: 0.8, ease: "power2.out",
    });
  };
}, { scope: ref });
```

**Key técnicos:** si usas variables CSS (HSLA), el tween interpola limpiamente; evitar HEX con saturación que produce transiciones raras. Alternativa "scrubbed": un `body` fixed de color con `scrub: true` sobre toda la página. Cuidado: header fijo debe compartir tema — animar sus variables también.

**Costo esfuerzo:** Bajo. **Rendimiento:** Bajo.

**Ejemplos:** fwdtools `scroll-color-sections`, GSAP forum color-shift demos, portfolios dark↔light (Lusion, /nk.studio usan muchos), `victor_trunov_` pen.

**Encaje Wiqonn:** Pasar de hero oscuro-cinematográfico a una sección "pipeline" en fondo claro (contraste editorial), y volver a oscuro en el CTA. Estructura la narrativa.

---

## F17. Bento grid (ensamblado)

**Descripción visual:** tarjetas de distinto tamaño (grid) que entran con stagger direccional (desde el borde más cercano), a veces con micro-charts y contadores dentro. Layout "feature-cards" moderno que también estructura jerarquía de contenido.

**Estructura (stagger desde el origen):**
```tsx
useGSAP(() => {
  gsap.from(".bento > *", {
    scale: 0.85, y: 40, autoAlpha: 0,
    duration: 0.7, ease: "expo.out",
    stagger: { each: 0.08, from: "center" },        // o "start"/"edges"
    scrollTrigger: { trigger: ".bento", start: "top 80%", once: true },
  });
}, { scope: ref });
```

**Key técnicos:** no todos los cells con el mismo hover — mezcla: 1 tilt (F13), 1 con count-up (F11), 1 con clip-reveal de screenshot (F10), el resto con hover suave. Los cells grandes = prueba/producto; los pequeños = detalles. Responsive: `gsap.matchMedia()` para reflow a 2 columnas. El stagger direccional es el 80% del look.

**Costo esfuerzo:** Medio. **Rendimiento:** Bajo (o batch si hay >12 cells).

**Ejemplos:** motion.dev bento grids, Triage (rocket.new), Zentry clone, shadcn/motion bento-staggered.

**Encaje Wiqonn:** La sección estrella de features del lab: cell grande con demo de generación + cells de métricas + cell de "capacidades" con marquee interno. Es donde Wiqonn muestra producto.

---

## F18. Velocity skew / smear (bonus)

**Descripción visual:** cuando haces un flick de scroll, las imágenes/títulos se inclinan (skew) y desenfocan con la velocidad, y se asientan nítidos al parar. Traduce la física del scroll a la tipografía — el "smear" de los sites más caros.

**Estructura:**
```tsx
useGSAP(() => {
  const proxy = { skew: 0 };
  const skewSetter = gsap.quickSetter("[data-velocity]", "skewY", "deg");
  ScrollTrigger.create({
    start: 0, end: "max",
    onUpdate: (self) => {
      const v = gsap.utils.clamp(-8, 8, self.getVelocity() / -200);
      if (Math.abs(v) > Math.abs(proxy.skew)) { proxy.skew = v; gsap.to(proxy, { skew: 0, duration: 0.8, ease: "power3", overwrite: true, onUpdate: () => skewSetter(proxy.skew) }); }
    },
  });
}, { scope: ref });
```

**Key técnicos:** usar `quickSetter` (más barato que tween por frame). Clampear ±8° o se ve "roto". Solo aplica a headings/marquee, nunca a todo el body. Ideal en el marquee (F4) y titulares — el par con el velocity y el marquee es un combo característico de sitios premiados 2025–26.

**Costo esfuerzo:** Medio. **Rendimiento:** Bajo (transform-only, quickSetter).

**Ejemplos:** GSAP Vault `scroll-velocity-skew`, portfolios de studios recientes, el reel de gsapvault scroll-video-scrub (skew por velocity).

**Encaje Wiqonn:** Aplica al marquee de separación y a los titulares grandes — el "toque final" que hace que la página se sienta viva con el scroll.

---

## Síntesis A vs B para Wiqonn

**A. Todo scroll-video cinemático (AI Fire)** — stage fijo + spacer + panels durante toda la página.
- **Pros:** máximo impacto, demo visual del lab imposible de olvidar.
- **Contras:** costo de producción de video alto; un site entero de scrub es pesado en móvil (donde se degrada a autoplay); si el video envejece, envejece la página; LCP/INP difíciles; riesgo de "one-trick pony".

**B. Hero cinemático + reveals premium Awwwards** — video-scrub solo en el hero; el resto del recorrido con pin+scrub, SplitText, marquee, counters, bento.
- **Pros:** mismo wow en el primer pliegue; coste y mantenimiento mucho menores; cada sección puede evolucionar; mejor CWV; el resto del catálogo (F2–F18) luce sin video.
- **Contras:** si el hero es el único momento "grande", hay que cuidar que la página no decaiga — aquí entran los reveals premium.

**Recomendación (híbrida, opción B con un segundo momento A):**
1. **Hero = F1 (scroll-video scrub)** con F8 light-tunnel + F3 SplitText + F15 preloader antes.
2. **Pipeline = F2 (pin + scrub)** sobre fondo del lab (F9 parallax), 3 pasos coreografiados.
3. **Features = F17 bento** con F13 tilt, F11 counters, F10 clip-reveals.
4. **Capabilities = F12 horizontal** (un solo pasaje lateral).
5. **Proof = F11 count-up** (benchmarks) + F3 en titulares.
6. **Texture global:** F7 grain + F6 custom cursor + F5 magnetic en CTAs.
7. **Transiciones:** F16 theme shift para marcar actos narrativos; F18 velocity en marquee (F4).

Esta combinación da el "AI Fire" del primer segundo sin pagar el coste de una página 100% cinematográfica, y es exactamente el repertorio que usan los studios top con GSAP+Lenis en Next.js.

---

## Referencias de investigación

- GSAP docs: ScrollTrigger, SplitText (gratis desde 3.13), ScrollSmoother, demos.
- darkroom / Lenis docs + showcase; integración Next.js con `gsap.ticker` (`devdreaming` guide).
- Codrops: *SVG Mask Transitions on Scroll* (Watanabe, 2026); *Animated Product Grid Preview* (Gwen Bogaert); *Shader Uniforms to Clip-Path Wipes* (Guignand).
- GSAP Vault: free snippets `image-clip-reveal`, `count-up-stats`, `page-preloader`, `scroll-video-scrub`, `horizontal-scroll-section`, `hover-image-trail`, `scroll-velocity-skew`.
- Hon Tran (jury Awwwards, SOTD×9): tutoriales pin/scrub/parallax y Next.js+Lenis.
- Orpetron/Medium: *10 Award-Winning Websites Perfecting Animation on Scroll* (Chain-Labs, etc.).
- Studios: Active Theory (Hydra/WebGL, LCP ~1.3s), Adoratorio (Awwwards Studio of the Year, letter-by-letter typography), Obys, Basement, Lusion, Fey (grain feTurbulence en cards), Linear/Vercel (grain en heroes).
