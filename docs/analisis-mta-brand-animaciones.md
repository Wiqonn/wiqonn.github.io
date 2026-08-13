# Análisis de animaciones — mta-brand.webflow.io

**Sitio:** MTA NYC Train App ("NYC Tube"), redesign de marca del metro de NY
**Autor:** Josh Loh (publicado en Made in Webflow)
**Fecha de análisis:** 2026-08-07
**Fuente:** HTML publicado + CSS (`shared.css`) + 4 bloques de JS inline + `webflow.js`. Código y assets descargados y descompilados.

---

## 0. Ficha técnica del sitio

### Stack real (lo que se ejecuta)

| Librería | Versión | ¿Se usa? | Uso |
|---|---|---|---|
| Webflow (ix3 engine) | webflow.<hash>.js | **Sí** | Reveal anti-FOUC (`w-mod-ix3`) |
| Lenis (smooth scroll) | 1.0.23 (jsdelivr bundled) | **Sí** | Scroll + reset de scroll en load/back-forward |
| halftone.js (custom) | inline, zero-dep | **Sí** | Efecto WebGL sobre 2 imágenes |
| Mapa SVG subway (custom) | inline (generado con Claude) | **Sí** | Mapa interactivo + trenes animados |
| GSAP + SplitText + ScrollTrigger | 3.15.0 | **NO** | Cargados pero sin uso real (dead code) |
| jQuery | 3.5.1 | Parcial | Selectores en el init de Lenis |

> **Hallazgo clave:** GSAP/SplitText/ScrollTrigger están cargados pero **no hay una sola llamada a GSAP en la página** (solo `gsap.ticker.add` comentado). Todas las animaciones son: Lenis + 2 custom JS (WebGL + mapa) + CSS estático + el motor ix3 de Webflow. La "wow-factor" del sitio no viene de GSAP.

### Tipografía
- Serif (cuerpo, acentos editoriales): **PP Editorial New**, `font-weight:200`, fallback Times New Roman.
- Sans (headings, nav, CTAs): **Helvetica Neue**, bold.

### Paleta
- Fondo: `#000` (navy/negro).
- Texto: `#fff`.
- Acentos (círculos numerados): pink `#f95caf`, orange `#f5780a`, green `#66e061`, yellow `#f9d959`.
- CTA nav: pill pink `#f95caf`.

### Scrollmap (una sola página)
```
nav (fixed, mix-blend:difference)
→ hero (100svh): video NY + H1 18vw + serif duplicado + app-mockup (halftone WebGL)
→ features: 4 filas grid (círculo numérico + título + texto + flecha)
→ img-section (sticky 100vh): foto NY con halftone WebGL + overlay de texto
→ map-section (100vh): mapa subway interactivo (trenes animados)
→ use-cases: 4 filas grid
→ footer: tagline + logos + doble fila de letras "MTA" superpuestas
```

---

## 1. Hero — la entrada

**Qué hace:** NO hay preloader, NO hay reveal GSAP, NO hay stagger. El hero es una pantalla completa con video en loop de fondo (generado con Kling AI) y el contenido aparece cuando la página termina de cargar todos los recursos (`readyState === 'complete'`).

### Patrón A — Reveal "anti-FOUC" por carga completa

La clave técnica: todos los elementos que importan están `visibility:hidden` por defecto y se revelan de golpe cuando `webflow.js` añade `w-mod-ix3` al `<html>` (se ejecuta en `readystatechange → complete`).

**CSS (head):**
```css
html.w-mod-js:not(.w-mod-ix3) :is(
  .app-screen, .serif-text, .video-parent, .nav-parent,
  .intro-hero-text, .heading-features, .circle-number,
  .arrow-icon, .feature-info-text, .border-line-btm,
  .footer-logo-img.one, .footer-logo-img.two,
  .logo-app, .btn-text
) { visibility: hidden !important; }
```

**JS del motor (webflow.js, interno):**
```js
window.dispatchEvent(new CustomEvent("__wf_ix3_ready"));
document.documentElement.classList.add("w-mod-ix3");
// se dispara en: "complete"===document.readyState ? e() : addEventListener("readystatechange", ...)
```

**En Next.js:** equivalente = estado `loaded` que se activa en `window load` / `readystatechange`, y una clase en `<html>` o un wrapper. Ej.:

```tsx
useEffect(() => {
  const onReady = () => document.documentElement.classList.add("is-loaded");
  if (document.readyState === "complete") onReady();
  else document.addEventListener("readystatechange", onReady);
}, []);
```
```css
/* la página arranca oculta y "aparece" solo cuando todo cargó */
html:not(.is-loaded) .reveal-ready { visibility: hidden; }
```

**Por qué funciona:** el video pesado y las imágenes grandes no dejan que el texto "flashee" antes de estar listos. La entrada se percibe como: pantalla negra → el video arranca → aparece la tipografía.

### Patrón B — Video hero full-bleed atenuado

El video se escala 1.1× y baja a opacity .5 para que la tipografía blanca destaque encima.

**HTML:**
```html
<section class="hero-parent">
  <div class="hero-content-parent">
    <div class="hero-text-item">…</div>
    <h1 class="intro-hero-text">NEW YORK</h1>
    <div class="app-screen w-embed">… halftone …</div>
  </div>
  <div class="video-parent">
    <div class="video-bg w-background-video w-background-video-atom">
      <video id="nyc-video" autoplay muted loop playsinline
             data-object-fit="cover"
             style="background-image:url('NYC_poster.jpg')">
        <source src="NYC.mp4" />
        <source src="NYC.webm" />
      </video>
    </div>
  </div>
</section>
```

**CSS:**
```css
.hero-parent { width:100%; height:100svh; display:flex;
  justify-content:center; align-items:center; position:relative; overflow:clip; }
.video-parent { width:100%; height:100%; position:absolute; }
.video-bg { width:100%; height:100%; opacity:.5; transform:scale(1.1); }
.hero-content-parent { z-index:2; position:relative; width:100%; height:100%;
  display:flex; flex-direction:column; justify-content:flex-end; align-items:center;
  padding-bottom:3rem; }
```

> `overflow:clip` + `transform:scale(1.1)` elimina el borde que el video object-fit:cover a veces deja al rebotar; `height:100svh` respeta las URL bars móviles.

### Patrón C — Tipografía hero "editorial" con mix-blend-mode

El H1 (18vw) y la nav usan `mix-blend-mode:difference`: el blanco se **invierte** contra el video, así el texto siempre contrasta sin depender del fondo.

**CSS:**
```css
.intro-hero-text {
  position:absolute; inset:auto 0% 0%; text-align:center;
  white-space:nowrap; mix-blend-mode:difference;
  font-family:Helvetica Neue, Arial, sans-serif;
  font-size:18vw; font-weight:700; line-height:.9; letter-spacing:-4px;
  padding-right:1rem; z-index:2;
}
.nav-parent { position:fixed; top:0; left:0; width:100%;
  display:flex; justify-content:space-between; padding:1rem;
  mix-blend-mode:difference; z-index:999; }
```

**En Next.js:** este es el patrón más barato y más "wow": `mix-blend-mode: difference` sobre el video/hero.

### Patrón D — Texto serif duplicado superpuesto

Dos copias del mismo texto editorial, una alineada a la izquierda y otra a la derecha, una sobre la otra (clásico de marca de lujo).

**HTML:**
```html
<div class="hero-text-item">
  <div class="serif-text align-right">Subway Guide<br/>New York</div>
  <div class="serif-text">Subway Guide<br/>New York</div>
</div>
```

**CSS:**
```css
.hero-text-item { z-index:10; width:100%; display:flex;
  justify-content:space-between; align-items:center; margin-bottom:10%; position:relative; }
.serif-text { font-family:"PP Editorial New", "Times New Roman", serif; line-height:1.1; }
.serif-text.align-right { text-align:right; }
```

---

## 2. Scroll animations

**Hallazgo:** No hay scroll-triggered reveals, ni parallax, ni `yPercent`, ni clip-path por JS. No se usa ScrollTrigger (cargado, sin configurar). Lo único de "scroll" real:

### Patrón E — Lenis smooth scroll (config exacta del sitio)

**JS (init inline):**
```js
"use strict"; // fix lenis in safari

if (Webflow.env("editor") === undefined) {
  const lenis = new Lenis({
    lerp: 0,                // 0 = sin suavizado extra (scroll "sync", nítido)
    wheelMultiplier: 0.8,   // el wheel avanza 80% → sensación más lenta/controlada
    infinite: false,
    gestureOrientation: "vertical",
    normalizeWheel: false,
    smoothTouch: false
  });

  function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);

  // Fuerza el scroll arriba al cargar (evita "saltos" por restauración de scroll)
  setTimeout(() => { lenis.scrollTo(0, { immediate: true }); }, 1);

  // Y al volver con back/forward desde bfcache
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) lenis.scrollTo(0, { immediate: true });
  });

  // Hooks para bloquear scroll en modales/overlays
  $("[data-lenis-start]").on("click", () => lenis.start());
  $("[data-lenis-stop]").on("click", () => lenis.stop());
  $("[data-lenis-toggle]").on("click", function () {
    $(this).toggleClass("stop-scroll");
    $(this).hasClass("stop-scroll") ? lenis.stop() : lenis.start();
  });

  // ScrollTrigger sync — DESACTIVADO en este sitio
  // lenis.on("scroll", ScrollTrigger.update);
  // gsap.ticker.add((time) => lenis.raf(time * 1000));
}
```

**CSS de soporte Lenis:**
```css
html.lenis { height:auto; }
.lenis.lenis-smooth { scroll-behavior:auto; }
.lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior:contain; }
.lenis.lenis-stopped { overflow:hidden; }
```

**En Next.js:** `npm i lenis` + un hook. `lerp:0` se usa deliberadamente para *no* "laggear" el scroll, pero mantiene la API de control (scrollTo inmediato, bloqueo, prevent). El detalle valioso: **reset a top con `immediate:true` en mount y en `pageshow` (bfcache)** — patrón importante para SPA/landings.

### Patrón F — Sección "sticky/pinned" (scroll-jacking sutil)

La sección de la foto de NY es `position:sticky; top:0; height:100vh`: se fija en viewport mientras la siguiente sección (mapa) se desliza por encima.

**CSS:**
```css
.img-section { position:sticky; top:0; width:100%; height:100vh;
  display:flex; justify-content:center; align-items:center; overflow:hidden; }
.img-embed { position:absolute; inset:0; width:100%; height:100%; min-height:100%; opacity:.4; }
.img-embed.full { opacity:1; }
.text-info { position:absolute; top:2rem; left:2rem; width:24rem; z-index:10;
  display:flex; flex-direction:column; gap:1rem; font-size:1.4rem; line-height:1.4; }
```

**HTML:**
```html
<section class="img-section">
  <div class="img-embed full w-embed">
    <div data-halftone data-src="Image-NYC.jpg" … style="width:100%;height:100%"></div>
  </div>
  <div class="text-info"><h3>Why NYC Tube</h3><p>…</p></div>
</section>
<section class="map-section">… subway map …</section>
```

> El "pinning" lo da solo CSS (`position:sticky`), no ScrollTrigger. El mapa que viene después cubre la imagen. Técnica directa, sin dependencias.

---

## 3. Micro-interacciones

### Patrón G — halftone.js (WebGL, "los puntos huyen del cursor")

El efecto **signature** del sitio. Un shader custom de ~60 líneas que rasteriza una imagen en puntos de semitono; cerca del cursor los puntos se desplazan y además se revela la foto real (lente halftone). Zero dependencias, auto-inicializa con `data-halftone`.

**Uso (HTML):**
```html
<div
  data-halftone
  data-src="https://…/Hand-App.png"
  data-grid="3"
  data-dot-scale="0.5"
  data-radius="500"
  data-strength="13"
  data-color="image"
  data-rest="image"
  style="width:100%;height:100%;touch-action:none;cursor:crosshair"
></div>
```
- `data-grid="3"` → puntos cada 3px (trama finísima)
- `data-dot-scale="0.5"` → radio de punto ×0.5
- `data-radius="500"` → radio de influencia del cursor (enorme, 500px)
- `data-strength="13"` → desplazamiento máx del punto (sutil)
- `data-color="image"` → los puntos toman el color de la imagen (no mono)
- `data-rest="image"` → en reposo la foto se ve limpia; el halftone es una "lente" bajo el cursor

**Núcleo del shader (fragment):**
```glsl
precision highp float;
varying vec2 vUv;
uniform vec2 uResolution;
uniform sampler2D uImage;
uniform float uGrid, uDotScale, uRadius, uStrength;
uniform vec2 uMouse;       // px, origen bottom-left
uniform float uInfluence;  // 0..1 factor "resorte"

float luma(vec3 c){ return dot(c, vec3(0.299,0.587,0.114)); }

void main(){
  vec2 frag = gl_FragCoord.xy;
  // 1) desplazamiento: los puntos "huyen" del cursor
  vec2  toFrag = frag - uMouse;
  float dist   = length(toFrag);
  vec2  dir    = dist > 0.0001 ? toFrag/dist : vec2(0.0);
  float fall   = 1.0 - smoothstep(0.0, uRadius, dist); // 1 en el cursor → 0 en el radio
  fall *= uInfluence;
  vec2  push   = dir * uStrength * fall;
  vec2  wp     = frag - push;   // muestrear la trama desde la posición "doblada"

  // 2) trama de semitono: celda por celda de la grilla
  vec2  cell   = floor(wp / uGrid);
  vec2  center = (cell + 0.5) * uGrid;
  vec3  imgc   = /* sampleImg(center) con coverUv() */;
  float l      = luma(imgc);
  float r      = (1.0 - l) * uGrid * 0.5 * uDotScale;  // oscuro = punto grande
  float d      = length(wp - center);
  float aa     = clamp(uGrid * 0.08, 0.6, 2.0);
  float dot    = 1.0 - smoothstep(r - aa, r + aa, d);

  // 3) foto limpia vs halftone: reveal donde está el cursor
  float reveal  = smoothstep(0.0, 0.85, fall);
  vec3  clearCol = sampleImg(frag);
  vec3  htCol   = mix(vec3(1.0), dotCol, dot);  // semitono sobre blanco/foto
  vec3  col     = mix(htCol, clearCol, reveal * uRestImage);
  gl_FragColor  = vec4(col, 1.0);
}
```

**JS (loop + easing del cursor):**
```js
// cursor con "resorte": sigue al puntero con lerp exponencial, EASE = 0.12
var EASE = 0.12;
function step() {
  mouse[0] += (target[0] - mouse[0]) * EASE;
  mouse[1] += (target[1] - mouse[1]) * EASE;
  influence += (influenceTarget - influence) * EASE; // entra/sale con suavidad
  draw();
}
function frame(){ raf = requestAnimationFrame(frame); step(); }
```

Detalles de ingeniería que valen oro:
- **DPR cap 2**: `dpr = Math.min(window.devicePixelRatio || 1, 2)` (performance).
- **IntersectionObserver**: pausa el rAF cuando el canvas no está en viewport.
- **ResizeObserver**: re-`resize()` el canvas.
- **Snap del cursor al entrar**: en el primer `pointermove` el mouse salta a la posición de entrada (evita que la lente "vuele" desde fuera).
- **Touch**: en `<=991px` pasa `touch-action:pan-y` (la página scrollea normal); en desktop `touch-action:none`.
- **Fallback**: si no hay WebGL, inserta un `<img>` normal.
- **API expuesta**: `el._halftone = { params, destroy, jumpTo, release, step }` para control imperativo.
- **Modos**: `data-rest="image"` (lente sobre foto) vs `data-rest="halftone"` (siempre trama), `data-color="mono"|"image"`.

### Patrón H — Mapa SVG interactivo con trenes animados

El segundo elemento signature: un mapa del subway completo (475 estaciones, 8 grupos de líneas) hecho en SVG con datos inline. Interacciones:

**1) Hover en estaciones → tooltip con foto Street View** (con flip si está cerca del top):
```css
.ns-tip { position:absolute; pointer-events:none; z-index:8;
  background:#fff; color:#000; font-size:11px; font-weight:700;
  text-transform:uppercase; letter-spacing:.04em;
  border-radius:8px; white-space:nowrap;
  transform:translate(-50%,-118%); overflow:hidden;
  opacity:0; transition:opacity .12s;
  box-shadow:0 8px 24px rgba(0,0,0,.6); }
```
```js
tip.style.left = (e.clientX - r.left) + "px";
tip.style.top  = y + "px";
// flip debajo del punto si estamos arriba del viewport
tip.style.transform = (SV_KEY && y < 215) ? "translate(-50%,16px)" : "translate(-50%,-118%)";
```
Solo reconstruye el HTML del tooltip cuando cambia de estación (`tipIdx !== i`) — así no recarga la imagen Street View en cada mousemove.

**2) Draw-on de rutas + tren que recorre la línea** (rAF con ease-out cúbico):
```js
function animateGroup(gk){
  stopTrain();
  var grp = RT.filter(function(r){ return r.g === gk; });
  grp.forEach(function(r){ r.el.style.strokeDasharray = r.len; r.el.style.strokeDashoffset = r.len; });
  var lead = grp.reduce(function(a,b){ return b.len > a.len ? b : a; }, grp[0]);
  train.setAttribute("fill", G[gk].color); train.setAttribute("opacity","1");

  var dur = 1500, start = null;
  function frame(ts){
    if (active !== gk) return;
    if (!start) start = ts;
    var t = Math.min((ts - start) / dur, 1);
    var e = 1 - Math.pow(1 - t, 3);                 // cubic ease-out
    grp.forEach(function(r){ r.el.style.strokeDashoffset = r.len * (1 - e); });
    var pt = lead.el.getPointAtLength(lead.len * e); // posición del tren en la curva
    train.setAttribute("cx", pt.x); train.setAttribute("cy", pt.y);
    if (t < 1) trainRAF = requestAnimationFrame(frame);
    else { /* reset + pulse loop */ }
  }
  trainRAF = requestAnimationFrame(frame);
}
```
Después hay un **pulse** (loop de 6s) donde el tren recorre la línea líder en loop, `pt = lead.el.getPointAtLength(lead.len * t)` con `t = ((ts-start)%dur)/dur`.

**3) Zoom al clic (×2.4) + pan por arrastre** sobre un `<g>` interno:
```css
#nsWorld { transition:transform .5s cubic-bezier(.22,.61,.36,1);
  transform-box:view-box; transform-origin:0 0; }
```
```js
function zoomIn(ux, uy){
  var wx = (ux - TX)/S, wy = (uy - TY)/S;   // punto del mundo bajo el cursor
  S = Z; TX = ux - S*wx; TY = uy - S*wy;    // queda "clavado" bajo el cursor
  clampW(); applyW(); zoomed = true;
}
```
Distingue click vs drag con umbral de 5px; captura el pointer solo cuando ya está en zoom (para que el scroll pase cuando no hay zoom).

**4) Dim de todo lo no-seleccionado:**
```css
.ns-line { transition:opacity .25s, stroke-width .2s; }
.ns-line.dim, .ns-st.dim { opacity:.08; }
```

### Patrón I — Micro-interacciones de UI (CSS puro)

Chips/buttons con hover "lift" y transiciones rápidas:
```css
.ns-chip { transition:background .15s, border-color .15s, opacity .15s, transform .1s; }
.ns-chip:hover { background:#161616; transform:translateY(-1px); }
.ns-chip.is-off { opacity:.3; }
.ns-reset { transition:background .15s, border-color .15s, opacity .15s, transform .1s;
  opacity:0; pointer-events:none; }
.ns-reset.is-visible { opacity:1; pointer-events:auto; }
.ns-reset:hover { transform:translateY(-1px); }
```
> No hay magnetic, ni tilt 3D, ni glow, ni custom cursor, ni marquee, ni counters. El sitio gana sin ellos.

---

## 4. Elementos signature (qué lo hace memorable)

1. **Lente halftone WebGL bajo el cursor** (Patrón G) — en el mockup del teléfono y en la foto de NY. Único, táctil, "vivo".
2. **Mapa de subway interactivo con trenes** (Patrón H) — artefacto data-driven que deja de ser imagen: tiene vida propia (trenes en movimiento, zoom, filtros por línea).
3. **`mix-blend-mode:difference`** en nav y H1 (Patrón C) — la tipografía se comporta como "recorte" sobre el video.
4. **Video hero generado con IA (Kling AI)** — una pieza cinematográfica (movimiento de NY) como fondo.
5. **Tipografía editorial en contraste**: serif light (PP Editorial New) vs sans 18vw bold con tracking negativo extremo (`-4px`).

---

## 5. Tipografía cinética

**Hallazgo:** No hay split text, ni animación por caracter/palabra, ni fade por líneas. SplitText se carga pero no se usa. La tipografía "se mueve" solo por:

- **mix-blend-mode:difference** — cambia visualmente según lo que hay detrás.
- **Tamaño extremo** (18vw) con `letter-spacing:-4px` y `white-space:nowrap` — el gesto de entrar al scroll es el que la "anima".
- **Texto duplicado serif** superpuesto (Patrón D).
- Un truco residual: `.heading-features { text-shadow:0 1em }` (sombra fantasma bajo el texto, apenas perceptible).

Para el reporte: el patrón transferible no es animación de letras sino **la escala + el blend + el duplicado** como identidad tipográfica.

---

## 6. Color / layering

- **Fondo negro absoluto** con texto blanco puro; contraste máximo.
- **Video a opacity .5 + scale 1.1** detrás de todo → las capas no compiten con el texto.
- **Acentos planos** (pink/orange/green/yellow) solo en los círculos numerados y el CTA — el color se reserva para "datos" (número de feature).
- **mix-blend:difference** para hacer que nav/H1 se adapten al contenido de fondo.
- **Layering sticky**: sección de imagen fija bajo el mapa que la tapa.
- **Footer con doble fila de letras** (`.one` y `.two`), la segunda fila `position:absolute; inset:0` superpuesta a la primera → efecto "doble exposición" de la wordmark MTA.
- **Grain/gradients/overlays**: **no usa ninguno**. Limpieza total: solo video, foto, trama halftone y líneas de 1px.

---

## 7. Tabla "patrón → aplicación en Wiqonn (Next.js)"

Wiqonn: lab de IA. Colores **navy `#0A0E1A`** + **gradiente cyan → teal → green**. Next.js App Router.

| # | Patrón (MTA) | Cómo aplicarlo a Wiqonn | Esfuerzo |
|---|---|---|---|
| A | Reveal por carga completa (anti-FOUC) | Hook `usePageReady` que añade `.is-loaded` al `<html>` en `load`; CSS oculta `.reveal-ready` hasta entonces. Evita flash del hero antes de que cargue el canvas/WebGL de fondo. | Bajo |
| B | Video hero full-bleed `scale(1.1)` + `opacity:.5` | Hero con video o **canvas WebGL** de fondo (partículas/red neuronal), dim a 0.4–0.5 y `scale(1.05–1.1)`; `overflow:clip` en el contenedor. Con `100svh`. | Bajo |
| C | `mix-blend-mode:difference` en nav + H1 | Nav fija y H1 (`8vw–12vw`, bold, `letter-spacing:-0.04em`, `white-space:nowrap`) en `mix-blend-mode:difference` sobre el canvas. El texto se invierte contra las partículas cyan/teal. | Muy bajo |
| D | Texto serif duplicado superpuesto | Hacer el "Wiqonn" dos veces: una en serif light (`font-weight:200`), otra desplazada/derecha, para un subtítulo tipo "AI Research Lab". Alternativa: duplicar el H1 con `color` del gradiente en `-webkit-background-clip:text` superpuesto. | Bajo |
| E | Lenis (`lerp:0`, reset a top en load + bfcache) | `npm i lenis`; init en un hook client; `scrollTo(0,{immediate:true})` en mount y `pageshow` (evita saltos con back/forward). `data-lenis-stop` en modales. | Bajo |
| F | Sección sticky (`position:sticky; top:0`) | Sección "Research": imagen/gráfico del lab `sticky top-0 h-screen`, la siguiente sección (modelos) la tapa. Solo CSS, sin librería. | Bajo |
| G | **halftone.js WebGL (lente bajo cursor)** | El patrón más transferible. Portar `halftone.js` tal cual (zero-dep, 409 líneas). Usarlo en el hero sobre un render de red neuronal o en una imagen del lab. Params Wiqonn: `data-grid="4"`, `data-radius="420"`, `data-strength="14"`, `data-color="image"`, `data-rest="image"`, y en lugar de `cursor:crosshair`, `cursor:cell` o `cursor:none` + dot custom. | Medio |
| H | Mapa/artefacto interactivo con trenes animados | **Idea Wiqonn:** un "mapa" de la arquitectura del lab — nodos (layers) conectados por aristas; al seleccionar un modelo, un "pulso" (dato) recorre el grafo con `stroke-dashoffset` + `getPointAtLength`, exactamente como el tren. Implementable en SVG puro. | Alto |
| H2 | Tooltip con flip bajo el cursor + `transition:opacity .12s` | Tooltip en tarjetas de modelos/benchmarks. El flip (`translate(-50%,-118%)` ↔ `translate(-50%,16px)`) es código copiable. | Bajo |
| I | Dim de todo lo no-seleccionado (`.is-off{opacity:.3}`) + hover `translateY(-1px)` | En la grid de modelos o papers: al hacer hover en uno, el resto baja a `.2–.3` opacity con `transition:.25s`. Foco por contraste, sin ruido. | Muy bajo |
| J | Paleta de acento plana sobre fondo negro | Sustituir el negro por navy `#0A0E1A`; usar el **gradiente cyan→teal→green** SOLO en: CTA pill (background gradient), números de feature (gradient en `background-clip`), línea de 1px `border-line-btm`. Reservar blanco `#E8ECF4` para texto. El gradiente como acento, no como fondo. | Bajo |

---

## Apéndice A — Notas de rendimiento y buenas prácticas detectadas

- `dpr = Math.min(devicePixelRatio, 2)` en todo canvas WebGL.
- `IntersectionObserver` para pausar rAF fuera de viewport.
- `ResizeObserver` para re-`resize()` del canvas.
- `requestAnimationFrame` con `cancelAnimationFrame` limpio (stop en teardown).
- Fallback `<img>` cuando no hay WebGL.
- `touch-action` por breakpoint para no atrapar el scroll en móvil.
- Reducción de re-builds: el tooltip solo se re-renderiza cuando cambia de estación.

## Apéndice B — Datos de assets (para referencia)

- Video hero: `NYC_mp4.mp4` + `NYC_webm.webm`, poster `NYC_poster.jpg` (hecho con Kling AI).
- Halftone hero: `Hand-App.png` (mockup de app).
- Halftone NY: `Image-NYC.jpg`.
- Wordmark footer: `M.svg`, `T.svg`, `A.svg` (letras sueltas).
- Fuentes: PP Editorial New (serif, w200), Helvetica Neue (sans).
