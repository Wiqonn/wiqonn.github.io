# Análisis de animaciones — marianmarton.com

> Análisis a fondo del portfolio de **Marian Marton** (diseñador/desarrollador freelance, Castellón, España).
> Objetivo: extraer **técnicas de animación concretas y reutilizables** (estructura HTML, CSS, JS) para una landing
> Next.js de un laboratorio de IA (**Wiqonn**, navy `#0A0E1A` + gradiente cyan→teal→green).
> Fuente: HTML, CSS y JS reales descargados del sitio (no suposiciones).

---

## 0. Resumen del sitio y stack

| Aspecto | Detalle |
|---|---|
| **Plataforma** | Webflow + `custom code` masivo (head/body) |
| **Stack animación** | GSAP 3.15 (`ScrollSmoother`, `ScrollTrigger`, `SplitText`, `TextPlugin`) — de los 4 plugins, **solo `ScrollSmoother` se usa en home**; los demás están registrados para subpáginas |
| **WebGL** | 3 sistemas: `darkveil` (shader CPPN generativo), `metaballs` (WebGL2), `lightcone` (ribbon del cursor). Un canvas 2D extra para grain/scanlines |
| **Runtime DOM** | `IntersectionObserver` + `gsap.ticker` + `requestAnimationFrame` para todo el motion no-scroll |
| **Detección de dispositivo** | `_isTouch` (maxTouchPoints), `_softGL` (detecta SwiftShader/llvmpipe → desactiva WebGL), `.has-hover` (solo añade cursor custom al primer mousemove) |
| **Fuentes** | ClashGrotesk Variable (display) + Figtree Variable (body) + fallbacks con `size-adjust`/`ascent-override` (anti-CLS) |
| **Design tokens** | `--negro:#050505`, `--verde-lima:#bcf448` (lime), `--morado:#8a38f5`, `--light-grey:#e2e2e2`, `--very-light-grey:#f1f1f1`, `--grey:#4a5a45` |

**Estructura de la página (10 secciones):**

```
smooth-wrapper (#smooth-wrapper, fixed, overflow hidden)   ← ScrollSmoother
└─ smooth-content (#smooth-content)
   ├─ page-content (z-index:1)
   │  ├─ hero-section      (negro, framed)   → darkveil (shader CPPN)
   │  ├─ manifiesto-section (blanco, 12rem padding, heading-2 gigantes)
   │  ├─ projects-section   (negro)           → project-card + overlay label cursor
   │  ├─ services-section   (negro, rotada 180°) → darkveil + servicios-container blanco (difference)
   │  ├─ process-section    (blanco)          → metaballs-bg
   │  ├─ reviews-section    (blanco)          → bento-grid (IX2 scroll reveal)
   │  ├─ about-section      (negro)           → photo-blob (SVG blob morph + cursor)
   │  ├─ blog-section       (bento blog, gradient overlays)
   │  ├─ cta-section        (negro, rotada 180°) → darkveil
   │  └─ marquee + footer
└─ footer-section (sticky bottom, z-index:0)  → metaballs-bg + marquee
```

**Patrón de rendimiento transversal (importante para copiar):**
- **Canvas a baja resolución**: `pixelRatio` reducido (0.6 desktop / 0.35 móvil), fps capado (30fps desktop / 12fps móvil vía `TARGET_MS`).
- **Pausa por visibilidad**: cada sistema registra `IntersectionObserver(threshold:0)` + `document.hidden` → si no está en pantalla no dibuja.
- **Init perezoso**: `IntersectionObserver` con `rootMargin:'300px'` compila el shader solo cuando la sección se acerca al viewport.
- **Compositor-only**: movimiento DOM solo con `transform`/`opacity`; `will-change` se activa al primer `mousemove` (no en el HTML).
- **`contain`**: `contain: strict` en canvas, `contain: layout style` en marquee.
- **`prefers-reduced-motion: reduce`**: mata animaciones CSS (`transition/transform/animation: none`).

---

## 1. Hero

**Cómo es la entrada:** NO hay preloader y NO hay reveal de texto animado (no usa SplitText en home).
La entrada es un **"pop-in en bloque"** al arrancar el runtime: un guard CSS esconde todo el chrome del hero
(`visibility:hidden`) hasta que Webflow IX2 inicializa (`html` pasa de `w-mod-js` a `w-mod-ix3`) y lo muestra entero.
Lo memorable NO es la entrada del texto, sino el **encuadre** (hero "framed") + el **canvas generativo** que ya está
vivo detrás + smooth-scroll de toda la página.

**Lo que se anima realmente:** el **fondo** — un shader WebGL `darkveil` tipo CPPN (red neuronal generativa) que
muta orgánicamente (warp sinusoidal, hue-shift, scanlines CRT, grano). Es el alma del hero.

### 1a. Estructura HTML del hero

```html
<section class="hero-section">
  <div class="hero-wrapper darkveil">        <!-- marco negro, canvas generativo insertado por JS -->
    <div class="hero-info-container">         <!-- mix-blend-mode: difference -->
      <div class="heading-1">Tu presencia digital en buenas manos</div>
      <div class="text-container">
        <h1 class="h1-text">Diseño y desarrollo web · Castellón</h1>   <!-- kicker lime, uppercase, 14px -->
        <p class="paragraph">Ayudo a empresas…</p>
        <div class="button-wrapper">
          <a class="button w-button">Ver proyectos</a>
          <a class="button ghost w-button">Cuéntame tu proyecto</a>
        </div>
      </div>
    </div>
  </div>
</section>
```

### 1b. CSS del "framed hero" (efecto marco flotante)

```css
.hero-wrapper.darkveil {
  background-color: var(--negro);
  border-radius: 10px;
  width: calc(100vw - 32px);      /* 16px de margen por lado → "card" flotante */
  height: calc(100vh - 32px);
  margin: 16px;
  display: flex; flex-direction: column; justify-content: flex-end;
  padding: 48px;
  position: relative;
}
.heading-1 {                       /* tipografía hero */
  color: #fff; text-transform: uppercase;
  font-family: 'Clashgrotesk Variable', sans-serif;
  font-size: clamp(3.2rem, 7.5vw, 10rem);
  line-height: clamp(2.5rem, 7vw, 8rem);
  font-weight: 500;
}
.h1-text {                         /* kicker lime */
  color: var(--verde-lima);
  letter-spacing: 3px; text-transform: uppercase;
  font-size: 14px; font-weight: 500;
}
.hero-info-container { mix-blend-mode: difference; }  /* texto se invierte sobre el shader */
```

### 1c. JS del shader darkveil (el corazón del hero y de las secciones oscuras)

```html
<script>gsap.registerPlugin(SplitText, ScrollTrigger, ScrollSmoother, TextPlugin);</script>
```

```js
// Guard: espera a que GSAP exista (máx 5s), luego ejecuta callback
window._waitForGSAP = function (cb, maxWait) {
  maxWait = maxWait || 5000; var t0 = Date.now();
  (function check() {
    if (typeof gsap !== 'undefined') { cb(); return; }
    if (Date.now() - t0 > maxWait) { console.warn('GSAP no cargó'); return; }
    requestAnimationFrame(check);
  })();
};

window._waitForGSAP(function () {
  var isMobile = window._isTouch;
  var TARGET_MS   = isMobile ? 83 : 33;   // ~30fps desktop, ~12fps móvil
  var PIXEL_RATIO = isMobile ? 0.35 : 0.6;
  var NOISE_AMOUNT = isMobile ? 0.0 : 0.08;
  var SCAN_AMOUNT  = isMobile ? 0.0 : 0.3;
  var WARP_AMOUNT  = isMobile ? 0.2 : 0.5;

  function initDarkveil(section) {
    if (section.dataset.dvInit) return; section.dataset.dvInit = '1';
    var canvas = document.createElement('canvas');
    canvas.className = 'darkveil-canvas';
    section.prepend(canvas);
    var gl = canvas.getContext('webgl', { antialias:false, powerPreference:'low-power' });
    if (!gl) return;
    /* vertex: fullscreen triangle; fragment: CPPN (matrices sigmoid) + efectos CRT */

    var size = function () { canvas.width = Math.round(section.offsetWidth*PIXEL_RATIO);
                             canvas.height = Math.round(section.offsetHeight*PIXEL_RATIO);
                             gl.viewport(0,0,canvas.width,canvas.height); };
    new ResizeObserver(function(){ clearTimeout(rs); rs = setTimeout(size,200); }).observe(section);

    var visible = true;
    new IntersectionObserver(function(e){ visible = e[0].isIntersecting; }, {threshold:0}).observe(section);

    // Render loop: usa gsap.ticker (compartido con ScrollSmoother) y cap de fps
    gsap.ticker.add(function(time){
      if (!visible || document.hidden) return;
      var ts = time*1000; if (ts-last < TARGET_MS) return; last = ts;
      gl.uniform1f(uTime, (performance.now()-start)/2000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    });
  }

  // Init perezoso: compilar el shader solo al acercarse 300px al viewport
  var lazyIO = new IntersectionObserver(function(entries){
    entries.forEach(function(en){ if(en.isIntersecting){ lazyIO.unobserve(en.target); initDarkveil(en.target); } });
  }, { rootMargin:'300px' });
  window.addEventListener('load', function(){
    document.querySelectorAll('.darkveil').forEach(function(s){ lazyIO.observe(s); });
  });
});
```

El shader CPPN (fragment) combina, en orden: warp de UV (`uv += uWarp * sin/cos`), la red generativa sigmoid de 8 capas
(patrón orgánico único por pixel), `hueShiftRGB` (rotación en espacio YIQ), scanlines (`sin(gl_FragCoord.y*uScanFreq)`),
y grano (`rand(gl_FragCoord.xy+uTime)`). Tres frecuencias temporales distintas (`sin(0.3·t)`, `sin(0.69·t)`, `sin(0.44·t)`)
alimentan la red para que nunca se repita. **Este es el "elemento vivo" del hero.**

### 1d. Nav (parte del hero)

```css
.navbar { position: fixed; top: 32px; left: 0; right: 0; z-index: 99; background: transparent; }
.navbar-container { mix-blend-mode: difference; padding: 0 64px; }
.nav-link { transition: all .4s ease; letter-spacing: .25px; }
.nav-link:hover { color: var(--verde-lima); letter-spacing: 2px; font-weight: 500; }  /* micro: type expand */
```

```js
// "Nav es dark" al inicio (scrollY === 0)
const navbar = document.querySelector('.navbar');
const onScroll = () => navbar.classList.toggle('nav--dark-start', window.scrollY === 0);
window.addEventListener('scroll', onScroll); if (window.scrollY === 0) onScroll();
```

**Easing/timing:** el hero no usa easing (aparece). El **smooth-scroll** es `ScrollSmoother.create({ smooth: 0.8 })`
(lerp exponencial, sin easing explícito). Los micro-motion usan `cubic-bezier(0.16, 1, 0.3, 1)` ("easeOutExpo") en CSS
y lerp manual en JS.

---

## 2. Scroll animations

### 2a. ScrollSmoother (la base de TODO el feel)

```js
window._waitForGSAP(function(){
  if (window._isTouch || window._disableScrollSmoother) {
    gsap.ticker.lagSmoothing(500, 0.05);   // fallback touch: solo suaviza ticks
  } else {
    document.addEventListener('DOMContentLoaded', function(){
      gsap.ticker.lagSmoothing(0);
      ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 0.8,        // suavizado de scroll (lerp)
        effects: true,      // habilita data-speed / data-lag en subpáginas
        smoothTouch: 0.1,
      });
    });
  }
  requestAnimationFrame(function(){ document.documentElement.classList.add('gsap-loaded'); });
});
```

```css
#smooth-wrapper { overflow: hidden; position: fixed; width: 100%; height: 100%; top: 0; left: 0; min-height: 100vh; }
#smooth-content { overflow: visible; width: 100%; min-height: 100vh; }
/* < 991px se anula: vuelve a scroll nativo */
@media (max-width: 991px) {
  #smooth-wrapper { overflow: auto !important; position: relative !important; height: auto !important; }
  #smooth-content { transform: none !important; }
}
```

### 2b. Scroll reveal "Bento Item Animation" (Webflow IX2, GSAP bajo el capó)

Única animación IX2 de la home. Es un **continuous SCROLL_PROGRESS**: mapea keyframes según el avance del elemento
por el viewport (equivalente a `ScrollTrigger` con `scrub`). Aplicada a `.bento-item` (reseñas) y a la card de
proyecto destacada.

Config (extraída del chunk JS real):

```js
{
  actionListId: "a-3",
  continuousParameterGroups: [{
    type: "SCROLL_PROGRESS",
    smoothing: 50,
    startsEntering: true, addStartOffset: false, addOffsetValue: 50,
    continuousActionGroups: [
      { keyframe: 0,  actionItems: [ opacity:0, translateY:+50px, scale:0.95 ] },
      { keyframe: 30, actionItems: [ opacity:1, translateY:0px,  scale:1 ] }
    ]
  }]
}
```

Equivalente directo en GSAP "a mano":

```js
gsap.utils.toArray('.bento-item, .project-card').forEach(el => {
  gsap.fromTo(el, { opacity: 0, y: 50, scale: 0.95 },
    { opacity: 1, y: 0, scale: 1,
      ease: 'none',                       // scrub → linear
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'center 40%', scrub: true } });
});
```

**Aprendizaje:** la interpolación **opacity + y:50px + scale:0.95 → 1** entre "entra por abajo" y "llega al 40% del
viewport" es la receta base de reveal que funciona en cualquier grid de cards.

### 2c. Footer sticky (reveal por z-index, sin JS)

El footer vive **detrás** del contenido y se revela al hacer scroll hasta el final.

```css
.footer-section { position: sticky; bottom: 0; z-index: 0; }   /* fijado abajo, "bajo" la página */
.page-content   { position: relative; z-index: 1; border-radius: 20px; }
```
```js
gsap.set('.footer-section', { zIndex: 0 });   // refuerzo runtime
gsap.set('.page-content',   { zIndex: 1 });
```

### 2d. Secciones alternadas sin costura

Cada sección tiene `margin-top: -1px` y `z-index` creciente para superponerse sin línea de separación, alternando
blanco/negro a sangre completa. El `border-radius` del `.page-content` (20px) redondea el paquete completo.

### 2e. Bento "spotlight" en touch (scroll-driven centrado)

En móvil las cards de reseñas quedan a `opacity:0.75`; al hacer scroll, la card cuyo **centro está más cerca del centro
del viewport** gana `.is-centered` (opacity 1). Efecto de "foco que sigue al scroll".

```js
window.addEventListener('scroll', getCenteredItem, { passive: true });
function getCenteredItem(){
  const viewportCenter = innerHeight/2; let closest=null, best=Infinity;
  items.forEach(it => {
    const r = it.getBoundingClientRect();
    if (r.bottom<0 || r.top>innerHeight) return;
    const d = Math.abs((r.top + r.height/2) - viewportCenter);
    if (d<best){ best=d; closest=it; }
  });
  if (closest!==centered){ centered?.classList.remove('is-centered'); closest?.classList.add('is-centered'); centered=closest; }
}
```
```css
@media (hover:none) and (pointer:coarse){
  .bento-item:has(.blog-bento-card){ opacity:.75; transition:opacity .6s ease; }
  .bento-item.is-centered{ opacity:1; }
}
```

---

## 3. Micro-interacciones

### 3a. Sistema de cursor custom ("light cone") — el más sofisticado

Solo activo con `.has-hover` (desktop). **4 capas**: dot + ring (DOM), ribbon (WebGL) + blur zone (DOM con backdrop-filter).
Todo se mueve con `translate3d` (compositor). Color auto-invertido según el fondo bajo el cursor.

```css
.has-hover *, .has-hover *::before, .has-hover *::after { cursor: none !important; }
#lc-dot, #lc-ring, #lc-canvas, #lc-blur { position: fixed; pointer-events: none; visibility: hidden; opacity: 0; }
.has-hover #lc-dot, .has-hover #lc-ring, .has-hover #lc-canvas, .has-hover #lc-blur { visibility: visible; opacity: 1; }
#lc-dot  { width:4px; height:4px; border-radius:50%; background:#fff; transition:background .15s ease; }
#lc-ring { width:16px; height:16px; border-radius:50%; border:1px solid rgba(255,255,255,.85); transition:border-color .15s ease; }
#lc-canvas { mix-blend-mode: difference; filter: blur(4px); contain: strict; }   /* ribbon WebGL */
```

```js
/* Mueve dot instantáneamente + guarda trail */
dot.style.transform = 'translate3d('+mx+'px,'+my+'px,0) translate(-50%,-50%)';
trail.unshift({x,y,vx,vy,life:1}); if(trail.length>64) trail.pop();
document.addEventListener('mousemove', () => { ringTarget = 1.55; });   // ring se expande al mover

/* Anillo: lerp de vuelta a 1 */
ringScale += (ringTarget-ringScale)*0.16; ringTarget += (1-ringTarget)*0.10;
ring.style.transform = 'translate3d('+mx+'px,'+my+'px,0) translate(-50%,-50%) scale('+ringScale+')';

/* Blur zone (lupa de desenfoque): tamaño y blur según velocidad */
smoothSpeed = smoothSpeed*0.8 + rawSpeed*0.2; rawSpeed *= 0.85;
if (smoothSpeed>1){ sz=Math.min(8+smoothSpeed*2,55); blr=Math.min(smoothSpeed*0.18,3.5);
  blurZone.style.width=sz+'px'; blurZone.style.height=sz+'px';
  blurZone.style.backdropFilter='blur('+blr+'px)';
  blurZone.style.opacity=Math.min(smoothSpeed/10,1); }

/* WebGL ribbon: strip de quads a lo largo del trail, grosor ∝ velocidad */
/*  - alpha decae 0.91/frame; life<0.01 se descarta */
for (let i=0;i<trail.length;i++) trail[i].life *= 0.91;

/* Color auto-invertido: lee el fondo bajo el cursor cada 20 frames y lerp 0.12 */
if (colorFrame % 20 === 0) targetColor = invert(getBgAt(mx,my));
cursorColor = lerpC(cursorColor, targetColor, 0.12);
dot.style.background = css; ring.style.borderColor = css;
// getBgAt: elementFromPoint → sube por padres hasta encontrar backgroundColor != transparent
```

`will-change` se activa solo tras el primer `mousemove` (`activateWillChange()`).

### 3b. Etiqueta flotante en hover (project / service / blog cards)

`<div class="project-tag outstanding">ver proyecto</div>` sigue al cursor dentro de la card con lerp.

```css
.project-tag.outstanding {
  position:absolute; top:50%; left:50%;
  mix-blend-mode: difference;            /* se invierte sobre la imagen */
  color: var(--verde-lima); text-transform: uppercase;
  font-size:1vw; font-weight:500; white-space:nowrap;
  opacity:0; transition:opacity .3s; z-index:99999;
}
.overlay-effect { position:absolute; inset:0; z-index:99999; pointer-events:none; mix-blend-mode:difference; }
```
```js
// Lerp-follow: etiqueta persigue el puntero dentro del wrapper (0.10 = suave)
wrapper.addEventListener('mouseenter', () => { active=true; label.style.opacity='1'; loop(); });
wrapper.addEventListener('mousemove', e => {
  const r = wrapper.getBoundingClientRect();
  targetX = (e.clientX-r.left)/r.width*100; targetY = (e.clientY-r.top)/r.height*100;
});
function loop(){ if(!active) return;
  lerpX += (targetX-lerpX)*0.10; lerpY += (targetY-lerpY)*0.10;
  label.style.left = lerpX+'%'; label.style.top = lerpY+'%';
  requestAnimationFrame(loop); }
```

**Imagen de proyecto:** hover de la imagen es solo CSS.
```css
.project-cover-image.card-image:hover { transform: scale(1.08); }  /* + .image-wrapper { overflow:hidden } */
```

### 3c. Bento blog hover (con `:has()`)

```css
@media (hover:hover) and (pointer:fine){
  .bento-item:has(.blog-bento-card){ transform-origin:center;
    transition: transform 1.65s cubic-bezier(.25,.46,.45,.94), opacity 1.65s ease, box-shadow 1.65s ease; }
  .bento-item:has(.blog-bento-card):hover { transform:scale(1.03); z-index:3; box-shadow:0 24px 60px rgba(0,0,0,.28); }
  /* atenúa a las hermanas */
  .bento-grid:has(.blog-bento-card):has(.bento-item:hover) .bento-item { opacity:.5; }
  .bento-grid:has(.blog-bento-card):has(.bento-item:hover) .bento-item:hover { opacity:1; }
}
```

### 3d. Marquee (footer) — CSS keyframes + JS solo para medir/pausar

**Estructura:** los ítems se duplican exactamente (el loop es `translateX(-50%)`).

```html
<div class="marquee-track">
  <div class="marquee-inner">
    <a data-emoji="👋" class="marquee-item">WhatsApp</a>
    <a data-emoji="✉️" class="marquee-item">contact@marianmarton.com</a>
    … (duplicados exactos) …
  </div>
</div>
```

```css
.marquee-inner{
  display:flex; width:max-content; contain:layout style;
  animation: mq-scroll var(--mq-dur, 30s) linear infinite;
  animation-play-state: paused;          /* JS la arranca tras medir */
}
@keyframes mq-scroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }
.marquee-item { flex-shrink:0; padding:0 3rem; white-space:nowrap; font-size:max(2rem,4vw); }
```

```js
// Velocidad constante en píxel/seg: duración = (mitad del ancho) / 180
var SPEED = 180;
function measure(){
  var half = inner.scrollWidth/2;
  if (half > 0) inner.style.setProperty('--mq-dur', (half/SPEED)+'s');
  syncPlayState();
}
function syncPlayState(){ inner.style.animationPlayState = (hoverPaused||!visible) ? 'paused' : 'running'; }
new IntersectionObserver(e => { visible = e[0].isIntersecting; syncPlayState(); }, {threshold:0}).observe(track);
track.addEventListener('mouseenter', () => { hoverPaused=true; syncPlayState(); /* emoji cursor on */ });
track.addEventListener('mouseleave', () => { hoverPaused=false; syncPlayState(); /* emoji cursor off */ });
window.addEventListener('load', measure);          // re-medir en resize (debounce 200ms)
```

**Emoji cursor (desktop):** un `#marquee-emoji-cursor` fijo (300px, font-size 260px, emoji 256px) que sigue al puntero
con lerp `0.12`, y muestra el emoji del ítem hover (leído de `data-emoji`). `scale(0.6)→1` al entrar.
**Touch:** flota un emoji sobre cada ítem con `y = sin(time*speed+phase)*12` en `gsap.ticker`.

```css
#marquee-emoji-cursor{ position:fixed; width:300px; font-size:260px; pointer-events:none; z-index:9999;
  opacity:0; transform:translate(-50%,-50%) scale(.6); transition:opacity .2s ease, transform .2s ease; }
.has-hover #marquee-emoji-cursor{ display:block; }
.has-hover #marquee-emoji-cursor.visible{ opacity:1; transform:translate(-50%,-50%) scale(1); }
```

### 3e. Botones y links

```css
.button { background:#fff; color:#000; border-radius:10px; padding:10px 24px; }
.button:hover { background: rgba(255,255,255,0.66); }        /* fade a translúcido */
.button.ghost { background:transparent; color:#fff; border:1px solid #fff; }  /* outline */
.nav-link { transition:all .4s ease; }                        /* letter-spacing expand al hover */
.heading-3.link { transition:all 1s; }
.heading-3.link:hover { text-decoration:underline; text-decoration-thickness:2px; text-underline-offset:8px; }
```

### 3f. Menú móvil full-screen (stagger coreografiado)

Overlay fijo con: backdrop (fade 0.5s), **sweep** (línea lime `scaleX(0→1)`, gradiente, 0.65s), items que entran
`translateX(50px)→0` con **delays escalonados** (`0.10, .17, .24, .31`), CTA `.40`, langs `.43`, footer `.46`;
en cierre los delays se invierten. Easing: `cubic-bezier(0.16,1,0.3,1)`.

```css
.mm-nav-item{ transform:translateX(50px); opacity:0;
  transition: transform .6s cubic-bezier(.16,1,.3,1), opacity .5s ease, color .2s ease; }
#mm-overlay.is-open .mm-nav-item{ transform:translateX(0); opacity:1; }
#mm-overlay.is-open .mm-nav-item:nth-child(1){ transition-delay:.10s; }
#mm-overlay.is-open .mm-nav-item:nth-child(2){ transition-delay:.17s; }
#mm-overlay.is-open .mm-nav-item:nth-child(3){ transition-delay:.24s; }
#mm-overlay.is-open .mm-nav-item:nth-child(4){ transition-delay:.31s; }
.mm-line{ transition: transform .38s cubic-bezier(.16,1,.3,1); }
.mm-burger.is-open .mm-line:nth-child(1){ transform: rotate(45deg); }
.mm-burger.is-open .mm-line:nth-child(2){ transform: rotate(-45deg); }
```

### 3g. Puntos "metapulse"

Puntos lime desenfocados (`filter:blur(5px)`) que pulsan `scale(1→1.4)` / `opacity(.8→1)` con delays escalonados.

```css
@keyframes metapulse { 0%,100%{transform:scale(1);opacity:.8} 50%{transform:scale(1.4);opacity:1} }
.metapulse { animation:metapulse 2.5s ease-in-out infinite; background:var(--verde-lima); filter:blur(5px);
  width:16px; height:16px; border-radius:50%; }
li:nth-child(1) .metapulse{animation-delay:0s}
li:nth-child(2) .metapulse{animation-delay:.7s}   /* etc. stagger */
```

---

## 4. Elementos signature (lo que hace memorable el sitio)

1. **Darkveil CPPN shader** — fondo generativo orgánico que nunca se repite, con textura CRT (scanlines, grano, warp,
   hue-shift). Es el motivo visual recurrente en todas las secciones oscuras. **Este es EL elemento firma.**
2. **Metaballs lime** (`#BCF448`) — WebGL2, fondo blanco de proceso/footer; esferas gooey que orbitan, con una "bola
   cursor" que el puntero desplaza suavemente (lerp `0.12`), canvas con `filter:blur(20px)` + grano + scanlines.
3. **Cursor luz** — el ribbon WebGL con `mix-blend-mode: difference` + auto-inversión de color según el fondo:
   "el cursor es parte del diseño".
4. **Photo-blob** — el retrato en "about" es un SVG recortado con un path **blob de 28 puntos que se deforma en tiempo
   real** (3 sinusoides por punto), cuya **amplitud crece con la velocidad del ratón** (hasta 22px) y que **sigue al
   cursor** con lerp. Una foto viva.

### 4a. Photo-blob — implementación

```html
<div class="about-photo-container">
  <div class="w-embed">
    <svg id="photo-cursor" viewBox="0 0 120 120">
      <filter id="drop"><feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#000" flood-opacity="0.45"/></filter>
      <image id="photo-img" href="foto.jpg" width="120" height="120"
             preserveAspectRatio="xMidYMid slice" clip-path="url(#blob-clip)" filter="url(#drop)"/>
    </svg>
  </div>
</div>
```
```js
var N=28, R=50, CX=60, CY=60, TENSION=0.38;      // 28 puntos en círculo radio 50
var AMP_IDLE=3.2, AMP_MAX=22, SPEED_K=2.4;        // amplitud reposo / máx / ∝ velocidad
var LERP_POS=0.10, LERP_AMP=0.07;
// cada punto: 3 ondas (f1, f2, f3) con pesos .50/.33/.17
var waves = Array.from({length:N}, () => ({ f1:.55+Math.random()*.7, p1:Math.random()*Math.PI*2,
  f2:1.3+Math.random()*1.1, p2:Math.random()*Math.PI*2, f3:2.7+Math.random()*1.4, p3:Math.random()*Math.PI*2 }));

function buildPath(amp,t){ /* radios = R + noise*amp; curva catmull-rom (TENSION) → path d="M…C…Z" */ }
function tick(time){
  lerpX += (mouseX-lerpX)*LERP_POS; lerpY += (mouseY-lerpY)*LERP_POS;
  var vx=lerpX-prevX, vy=lerpY-prevY; prevX=lerpX; prevY=lerpY;
  ampTgt = clamp(AMP_IDLE + Math.hypot(vx,vy)*SPEED_K, AMP_IDLE, AMP_MAX);
  ampCur += (ampTgt-ampCur)*LERP_AMP;
  cursor.style.transform = 'translate('+(clamp(lerpX,CX,w-CX)-CX)+'px,'+(lerpY-CY)+'px)';
  blobPath.setAttribute('d', buildPath(ampCur, time));
}
gsap.ticker.add(tick);        // activar/desactivar con IntersectionObserver(threshold:.05) + document.hidden
```

### 4b. Metaballs — implementación

```js
var CFG = { ballCount:15, animationSize:30, clumpFactor:1, speed:0.3, cursorBallSize:2,
  hoverSmoothness:0.12, enableMouse:true, color:'#BCF448', enableTransparency:true,
  noiseEnabled:true, noiseOpacity:0.04, scanlineOpacity:0.05, scanlineSpacing:2,
  canvasBlur:20 };
// Fragment shader (WebGL2 GLSL300): f = smoothstep(-1,1,(suma 1/(d²) - 1.3)/fwidth)
//  - balls: r²/(dot(d,d)) en cada píxel; renderizado con border-radius de goo
//  - posición por bola: th = t*speed*dtF; x=cos(th)*bs, y=sin(th+dt*tog)*bs (orbitas asíncronas)
//  - cursor ball: iMouse, suavizada con sX+=(tx-sX)*hoverSmoothness
//  - overlay 2D prebakeado: scanlines + frames de grano (canvas precocinados, no por-frame)
var nsCv; noiseFrames = prebakeNoiseFrames(w,h,10);   // 10 frames de ruido, rotados cada 42ms
var scan = prebakeScanlines(w,h);                     // rayas precomputadas
gsap.ticker.add(function(time){
  if(!visible||document.hidden) return; if(ts-last<META_MS) return;
  /* uniform setup + drawArrays TRIANGLES + drawImage(nsCv) */
});
// lazyIO rootMargin 300px igual que darkveil; MutationObserver re-escanea el DOM
```

---

## 5. Tipografía cinética

**Hallazgo honesto:** en la home **no hay split-text, stagger de chars/palabras ni reveal por líneas**.
`SplitText` y `TextPlugin` están registrados pero **sin uso en la página principal** (solo en subpáginas/proyectos).
La "cinética tipográfica" de la home se logra con:

1. **Titulares gigantes** ClashGrotesk: `.heading-1` `clamp(3.2rem→10rem)`, `.decorative-text` `max(2rem,16vw)` con
   `line-height:70%` (letras que se solapan verticalmente).
2. **`mix-blend-mode: difference`** en titulares → el texto se invierte sobre lo que tenga detrás (efecto "tipografía
   viva" sin animar nada).
3. **Marquee de texto** (sección 3d): el único texto animado continuo, vía `translateX` CSS.
4. **Micro-typography:** `letter-spacing` que se expande en hover (`nav-link`), `h1-text` kicker lime con `letter-spacing:3px`.
5. **Manifiesto:** 5 líneas de `.heading-2` apiladas (tipografía como sección entera), cada una con `<p>` grande.

Para Wiqonn (que SÍ quiere cinética), el patrón a importar es el flujo "SplitText + ScrollTrigger scrub" estándar que
esta web reserva para subpáginas:

```js
const split = SplitText.create('.hero-title', { type:'lines,words,chars', linesClass:'split-line' });
gsap.from(split.chars, { yPercent:110, opacity:0, stagger:0.02, ease:'power4.out', duration:1,
  scrollTrigger: { trigger:'.hero-title', start:'top 85%' } });
```
```css
.split-line { overflow:hidden; display:block; }   /* máscara por línea */
```

---

## 6. Color / layering

- **Paleta 4 colores** (brand): negro `#050505`, lime `#BCF448`, morado `#8A38F5`, grises `#E2E2E2`/`#F1F1F1`.
  Todo el sitio se construye con esa base + **blend modes**.
- **Alternancia full-bleed** blanco/negro con `margin-top:-1px` y z-index en cascada (secciones "pegadas", sin borde).
- **`mix-blend-mode: difference`** — EL patrón de layering del sitio:
  - `.navbar-container`, `.hero-info-container`, `.services-container` (blanco sobre negro → invierte el shader),
    `.project-tag.outstanding`, `.overlay-effect`, `.heading-2.bold.light`.
  - Resultado: el texto blanco sobre sección negra se ve blanco; sobre sección blanca se ve negro. **Tipografía que
    se adapta sola** al fondo.
- **Texture viva detrás del contenido:** canvas generativo `z-index:0` + contenido `z-index:1`
  (`.darkveil > * { position:relative; z-index:1 }`).
- **Grano + scanlines:** canvas 2D prebakeados (`rgba(255,255,255,0.04)` ruido, `rgba(0,0,0,0.05)` scanlines) sobre
  el WebGL. Da acabado "CRT/analógico".
- **Texto sobre imágenes (blog bento):**
  ```css
  .blog-bento-card::after{ content:''; position:absolute; inset:0; z-index:1;
    background: linear-gradient(to top, rgba(0,0,0,.85) 0%, rgba(0,0,0,.3) 50%, rgba(0,0,0,0) 100%); }
  .blog-bento-card-content{ position:relative; z-index:2; }
  .blog-bento-card-content .project-tag{ background:rgba(255,255,255,.15); backdrop-filter:blur(8px);
    color:#bcf448; padding:4px 16px; border-radius:999px; }   /* pill glass */
  ```
- **Secciones "flipped" (firma):** `.services-section.darkveil` y `.cta-section.darkveil` están `rotate(180deg)` y su
  contenedor interno **contra-rotado** `rotate(180deg)` (`.services-container`, `.cta-info-wrapper`). Resultado: el
  contenido se lee bien pero el **shader generativo queda espejado** respecto a la sección anterior → transición
  visual "de voltear página" entre secciones oscuras.
- **`mix-blend-mode: multiply`** en `.process-info-wrapper` (blanco) y `.footer-container` para integrar el canvas de
  metaballs detrás.
- **Botones:** filled blanco sobre oscuro / filled negro sobre claro / ghost outline. CTA siempre `difference`.

---

## 7. Tabla — patrón → cómo aplicarlo a Wiqonn

**Tokens Wiqonn:** navy `#0A0E1A` (sustituye a `--negro`), gradiente `cyan→teal→green` (sustituye al lime/morado
como acento). `--wiq-cyan:#22D3EE`, `--wiq-teal:#2DD4BF`, `--wiq-green:#34D399`, `--wiq-navy:#0A0E1A`.

| # | Patrón (Marian Marton) | Cómo aplicarlo a Wiqonn | Prioridad |
|---|---|---|---|
| 1 | **Darkveil CPPN shader** (fondo generativo CRT, 30fps, lazy init) | Hero + sección CTA: shader WebGL con **paleta Wiqonn** (hue-shift entre cyan/teal/green en vez del hue aleatorio; `uHueShift` animado lentamente `0.02·t`). Mismo cap de fps/píxel-ratio/lazy/intersection. Es tu "elemento firma" | ★★★ |
| 2 | **Metaballs lime** sobre sección blanca | Sección "proceso/capacidades" o footer sobre **navy claro**: esferas gooey con gradiente cyan→teal→green (`iColor` interpolado en CPU por `t`). Acento vivo sin romper el navy | ★★★ |
| 3 | **Cursor luz** (ribbon difference + auto-color + blur) | Cursor ribbon con color del gradiente según posición X (mapear `mx/width` → cyan/teal/green). Mantén `mix-blend-mode: difference` + dot/ring | ★★ |
| 4 | **ScrollSmoother** (smooth 0.8, wrapper fixed) | El esqueleto de scroll de Wiqonn: wrapper+content, `smooth:0.8`, anular < 991px. Aporta el "feel premium" al instante | ★★★ |
| 5 | **Bento scroll reveal** (opacity + y50 + scale .95 → 1, scrub, keyframe 0→30%) | Grid de **modelos/casos de uso de la IA** (cards) + sección de papers/results. `gsap.fromTo` + ScrollTrigger scrub por card | ★★★ |
| 6 | **Sticky footer reveal** (footer z:0 sticky, content z:1) | Footer Wiqonn (contacto) que se revela bajo el contenido; fondo de metaballs/gradiente suave | ★★ |
| 7 | **Etiqueta que sigue al cursor** (`project-tag` lerp 0.10, difference) | Cards de proyecto/modelo: label tipo "ver modelo →" que persigue al puntero dentro de la card | ★★ |
| 8 | **Marquee + emoji cursor** (CSS keyframes, `--mq-dur` = width/180, pause on hover) | Marquee de "IA · AGENTS · RAG · INFERENCE · FINE-TUNING ·" con símbolo/ícono flotante en hover. Zero JS por frame | ★★ |
| 9 | **Photo/avatar blob** (SVG 28pts, amp ∝ velocidad, sigue cursor) | Avatar/logo Wiqonn como blob vivo en la hero o sección "equipo" | ★ |
| 10 | **`mix-blend-mode: difference`** en nav + titulares + CTA | Nav fija sobre hero: con navy el `difference` sigue funcionando. Ojo: sobre gradiente se ve raro → usar difference solo sobre secciones navy sólidas | ★★★ |
| 11 | **Secciones flipped** (rotate 180 + contra-rotar contenido) | Entre hero navy y CTA navy: flip del shader para sensación de "voltear página" | ★ |
| 12 | **Nav type-expand hover** (letter-spacing .25→2px, 0.4s) | Micro-interacción barata y elegante para links del nav Wiqonn | ★★ |
| 13 | **FOUC guard + pop-in** (`w-mod-js:not(.w-mod-ix3)` hidden → visible al boot del JS) | En Next.js: `useEffect` → añadir clase `js-ready` al `<html>`; ocultar hero hasta entonces (evita parpadeo de CSS antes de hidratar) | ★★ |
| 14 | **Spotlight is-centered** (card central del viewport) | Carrusel/scrollytelling de resultados donde la card activa del centro se ilumina | ★ |
| 15 | **Grano + scanlines prebakeados** sobre los shaders | Overlay `rgba(255,255,255,.04)` ruido + `rgba(0,0,0,.05)` scanlines sobre el fondo WebGL de la hero → acabado "laboratorio/tech" | ★★ |
| 16 | **Gradient overlay sobre imagen** (`rgba(0,0,0,.85→0)` + pill glass) | Cards de papers/datasets sobre imagen con gradiente navy→transparente + tag pill con `backdrop-blur` | ★★ |
| 17 | **Metapulse** (puntos blur pulsando, delays stagger) | "Status dots" en la hero (estado del laboratorio / modelos online) con gradiente cyan→green | ★ |
| 18 | **Bento :has() hover** (scale 1.03 + atenuar hermanas) | Grid de cards de modelos: hover escala la card y atenúa el resto (solo CSS, sin JS) | ★★★ |
| 19 | **Prefers-reduced-motion + fallback fonts + pixel-ratio** | Mantener los tres: accesibilidad + CLS + batería. Es lo que hace que el sitio se sienta "pro" | ★★★ |

### Receta mínima para Wiqonn (prioridades ★★★)

1. **Hero framed navy** (`width:calc(100vw-32px); height:calc(100vh-32px); margin:16px; radius:10px`) + **darkveil
   shader con hue-shift cyan→teal→green** detrás (z:0) + titular ClashGrotesk-style con `difference`.
2. **ScrollSmoother** wrapper/content (0.8) — el feel global.
3. **Bento reveal scrub** para el grid de productos IA.
4. **Marquee** de keywords con símbolo flotante.
5. **Cursor ribbon WebGL** con color de gradiente por posición X.
6. Todos los guards de rendimiento (fps cap, lazy 300px, `contain`, reduced-motion).

---

## 8. Notas técnicas útiles copiadas del sitio

- **Loader JS resistente:** `_waitForGSAP` con `requestAnimationFrame` y timeout de 5s (las libs de terceros pueden fallar).
- **Detección de renderer software:** `getExtension('WEBGL_debug_renderer_info')` + regex `swiftshader|llvmpipe|software`
  → desactiva todos los WebGL si la GPU es virtual (perfecto para VMs/CI).
- **`gsap.ticker.lagSmoothing(0)`** al activar ScrollSmoother (evita saltos tras pestañas en background).
- **Canvas `getContext('webgl2', {premultipliedAlpha:false})`** + `gl.blendFunc(SRC_ALPHA, ONE_MINUS_SRC_ALPHA)` para
  transparencia limpia sobre el DOM.
- **ResizeObserver debounced (200ms)** en vez de `window.resize` para los canvas.
- **MutationObserver** re-escanea el DOM por si entran cards nuevas (CMS dinámico) y les aplica las animaciones.
- La duplicación de ítems del marquee debe ser **exacta** (mismo DOM) para que `translateX(-50%)` haga loop sin salto.
