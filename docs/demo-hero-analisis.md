# Análisis del demo "AI Fire" (scroll-driven con video de fondo)

Fuentes analizadas:
- Demo: `https://charming-sawine-b4803b.netlify.app/` (HTML, `css/styles.css`, `js/main.js` capturados en crudo)
- Tutorial: MindStudio — "Build Cinematic Scroll-Driven Websites with Kimi K3"

---

## 1. Estructura del hero del demo (desglose de capas)

El hero NO es una sección normal: toda la experiencia vive dentro de un contenedor **`fixed` y pinnado** (`#stage`) que cubre el viewport completo, mientras un **`spacer`** genera la distancia de scroll que "conduce" la animación. Nada se autoplaya: **el scroll avanza/rebobina el `currentTime` del video**.

```html
<body>
  <!-- skip link (a11y) -->
  <a class="skip-link" href="#p-cta" data-scrollto="0.9" data-focus-email>Skip to subscribe</a>

  <!-- L0 · LOADER -->
  <div class="loader" id="loader" role="status" aria-live="polite">
    <div class="loader__ring" aria-hidden="true"></div>
    <p class="loader__label">Igniting the ember<span class="loader__dots" aria-hidden="true"></span></p>
  </div>

  <!-- STAGE PINNED: 100% del viewport -->
  <div class="stage" id="stage">
    <!-- L1 · FONDO: video scrubeable + poster de respaldo -->
    <div class="bg" id="bg">
      <video id="video" class="bg__video" muted playsinline preload="auto"
             poster="assets/ember-core-poster.jpg" aria-hidden="true" tabindex="-1">
        <source src="assets/ember-core.mp4" type="video/mp4" />
      </video>
      <!-- L2 · SCRIM de legibilidad (oscuro izq → claro sobre el centro-der) -->
      <div class="bg__scrim" aria-hidden="true"></div>
      <!-- L3 · OVERLAY CALIDO (opacity subida por JS hacia el CTA) -->
      <div class="bg__warm" id="warm" aria-hidden="true"></div>
    </div>

    <!-- L4 · NAV transparente (encima del fondo) -->
    <header class="nav" id="nav">
      <a class="nav__brand" href="#top" data-scrollto="0" aria-label="AI Fire home">
        <span class="nav__flame" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" fill="none"><path d="M12 2.5c1.6 3 4.7 4.6 4.7 8.4a4.7 4.7 0 0 1-1.6 3.6..."/></svg></span>
        <span class="nav__name">AI&nbsp;Fire</span>
      </a>
      <nav class="nav__links" aria-label="Primary">
        <a href="#p-headline" data-scrollto="0.24">The Noise</a>
        <a href="#p-value" data-scrollto="0.52">What You Get</a>
        <a href="#p-cta" data-scrollto="0.9">Join</a>
      </nav>
      <a class="btn btn--ghost nav__cta" href="#p-cta" data-scrollto="0.9" data-focus-email>Subscribe</a>
    </header>

    <span id="top"></span>

    <!-- L5 · PANELS de contenido scroll-driven -->
    <div class="panels" id="panels">
      <article class="panel panel--opening" id="p-opening" data-start="-0.05" data-end="0.13" data-tone="cool">
        <div class="panel__inner"> … </div>
      </article>
      <article class="panel panel--headline" id="p-headline" data-start="0.16" data-end="0.375" data-tone="cool">
        <div class="panel__inner"> … </div>
      </article>
      <article class="panel panel--value" id="p-value" data-start="0.41" data-end="0.675" data-tone="mid">
        <div class="panel__inner"> … </div>
      </article>
      <article class="panel panel--cta" id="p-cta" data-start="0.72" data-end="1.02" data-tone="warm">
        <div class="panel__inner"> … </div>
      </article>
    </div>

    <!-- L6 · RAIL de progreso (fino, abajo) -->
    <div class="rail" aria-hidden="true"><span class="rail__fill" id="rail"></span></div>

    <!-- L7 · SCROLL CUE ("Scroll" + línea animada) -->
    <div class="cue" id="cue" aria-hidden="true">
      <span class="cue__text">Scroll</span>
      <span class="cue__line"></span>
    </div>
  </div>

  <!-- L8 · SPACER: genera la distancia de scroll (~680vh) -->
  <div class="spacer" id="spacer" aria-hidden="true"></div>
</body>
```

### Capa a capa

| Capa | Elemento | Clases / id | Propósito |
|---|---|---|---|
| L0 Loader | `div.loader` | `#loader`, `.loader__ring`, `.loader__label`, `.loader__dots` | Pantalla de carga radial (`#0a0d16→#04050a`) con anillo giratorio (accent glow). Dice *"Igniting the ember"*. Se oculta (`.is-hidden`, fade 0.7s) cuando el video puede reproducirse (`canplay`/`canplaythrough`/`loadeddata`), con timeout de 9 s como respaldo. |
| L1 Fondo video | `div.bg` > `video.bg__video` | `#bg`, `#video`, poster `ember-core-poster.jpg`, source `ember-core.mp4` | Video **scroll-driven** (nunca autoplaya). `object-fit: cover` + `scale(1.02)` para no mostrar bordes. El poster (también en CSS como `background-image`) garantiza imagen estática antes de cargar y si el video falla (`.no-video`). |
| L2 Scrim | `div.bg__scrim` | `.bg__scrim` | Legibilidad: gradiente horizontal **oscuro a la izquierda** (0.88 → 0.00, donde vive el texto) y claro sobre el centro-derecha (donde está la esfera), + fade vertical top/bottom (0.55→0→0.55). En móvil se invierte a bottom-heavy. |
| L3 Warm overlay | `div.bg__warm` | `#warm` | Capa cálida que **JS sube de 0 a 0.6** con `smoothstep((p-0.45)/0.5)`: radial naranja `rgba(255,120,40,0.20)` centrado a la derecha + linear de base marrón. Es la "luz cálida" que aparece hacia el CTA. |
| L4 Nav | `header.nav` | `#nav`, `.nav__brand` (+ `.nav__flame` SVG), `.nav__name`, `.nav__links`, `.btn--ghost.nav__cta` | Transparente, `position: absolute top 0`, flex entre espacios. Marca = llama SVG con `drop-shadow` accent + nombre. Links con subrayado animado (`.nav__links a::after`, `right:0` al hover). CTA ghost con `backdrop-filter: blur(6px)`. Todos los links usan `data-scrollto` (0.24 / 0.52 / 0.9). |
| L5 Panels | `div.panels` > `article.panel` | `.panel`, `.panel--*`, `.panel__inner`, `data-start`, `data-end`, `data-tone` | 4 panels absolutos apilados sobre el fondo, `opacity: 0` por defecto; JS los revela según el progreso de scroll. Contenedor `.panels` tiene `pointer-events: none`; los panels lo reactivan (`auto`) solo cuando `opacity > 0.6`. `.panel__inner` columna de máx 560px con `margin-left: clamp(20px, 8vw, 120px)` (columna izquierda, limpia sobre el scrim). |
| L6 Rail | `div.rail` | `#rail` (`.rail__fill`) | Barra de progreso de 3px abajo, `width = p*100%`; gradiente accent→ámbar con glow. |
| L7 Cue | `div.cue` | `#cue`, `.cue__text`, `.cue__line` | "Scroll" en mayúsculas (tracking 0.32em) + línea vertical con animación `scaleY` pulsante. Se oculta en cuanto `p > 0.02`. |
| L8 Spacer | `div.spacer` | `#spacer` | Genera la altura de scroll: `height: var(--scroll-len)` (~680vh). Sin él no hay scrub. |

---

## 2. Las escenas / panels

Los 4 panels se revelan por **progreso de scroll `p` (0→1)**, no por scroll-y. JS usa `PANEL_FADE = 0.05`: entra con `smoothstep` (opacity 0→1 + `translate3d(0, 24px→0, 0)`), sale con `-24px`, y solo es interactivo (`pointer-events: auto`) por encima de opacity 0.6.

| # | id | `data-start` | `data-end` | `data-tone` | Momento del video | Contenido exacto |
|---|---|---|---|---|---|---|
| 1 | `p-opening` | `-0.05` | `0.13` | `cool` | Video oscuro, partículas dispersas | `<p class="eyebrow">AI Fire</p>`<br>`<p class="opening-line">Every day brings a hundred new AI updates.<br/>Almost none of them matter.</p>` |
| 2 | `p-headline` | `0.16` | `0.375` | `cool` | Las partículas se abren, aparece la esfera | `<h1 class="headline">Cut Through<br/>the AI Noise</h1>`<br>`<p class="lede">Get useful AI news, tools, and practical workflows without following every update.</p>` |
| 3 | `p-value` | `0.41` | `0.675` | `mid` | Esfera clara, la luz se vuelve cálida | `<h2 class="section-title">What you actually get</h2>`<br>`<ul class="value-grid">` con 4 `<li class="value-item">`: cada uno `span.value-item__mark` (dot 8px con glow) + `<h3>` + `<p>`. Ítems: **Useful AI news** / **Practical AI workflows** / **Clear tool recommendations** / **Simple automation ideas**. |
| 4 | `p-cta` | `0.72` | `1.02` | `warm` | El ember brilla y llena el encuadre | `<h2 class="cta-headline">Turn AI Updates<br/>Into Useful Action</h2>`<br>`<p class="cta-text">Join 75,000+ readers getting practical AI insights for free.</p>`<br>`<form class="signup">` → `input.signup__input` (email, pill) + `button.btn--primary.signup__btn` ("Join AI Fire Free") + `p.signup__note` ("No spam. Unsubscribe anytime."). |

Notas de estructura del contenido:
- Cada panel envuelve el contenido en `.panel__inner` (máx 560px, columna izquierda) — el panel es `flex; align-items: center; justify-content: flex-start`.
- Los tonos de texto vienen del atributo: `[data-tone="cool"]` → `--cool-strong` (#eef4ff), `[data-tone="mid"]` → `#f4f2ee`, `[data-tone="warm"]` → `--warm-strong` (#fff3e4).
- En móvil (≤760px) los panels se anclan abajo (`align-items: flex-end; justify-content: center`), las descripciones de los value-items se ocultan (solo quedan los 4 títulos), el cue se esconde y el scrim pasa a bottom-heavy.

---

## 3. Paleta y estilo visual (moodboard)

### Paleta base
```css
--bg: #05060a;              /* negro-navy casi absoluto */
--cool-strong: #eef4ff;     /* blanco azulado (texto fuerte) */
--cool-soft:   #a8bbdd;     /* azul grisáceo (lede, nav) */
--warm-strong: #fff3e4;     /* marfil cálido (CTA) */
--warm-soft:   #e9c39a;     /* ámbar suave (cta-text, placeholder) */
--accent: 141, 186, 255;    /* azul pálido frío (default) */
--accent-warm: 255, 157, 92;/* ámbar suave */
```

### El truco cromático (la "narrativa de temperatura")
`updateChrome(p)` **interpola el accent de frío a cálido** según el progreso y sube la capa `#warm`:

```js
var t = smoothstep((p - 0.35) / 0.5);            // 0 en el tercio inicial → 1 al final
var r = Math.round(lerp(141, 255, t));
var g = Math.round(lerp(186, 157, t));
var b = Math.round(lerp(255, 92, t));
stage.style.setProperty("--accent", r + "," + g + "," + b);   // azul pálido → ámbar
if (warm) warm.style.opacity = (smoothstep((p - 0.45) / 0.5) * 0.6).toFixed(3);
```

Todo lo que consume `var(--accent)` — eyebrow, glow del loader, subrayado del nav, dots del value-grid, rail, cue — **cambia de temperatura con el scroll**. Es el moodboard completo:

- **Arco narrativo del video "ember-core"**: un clip continuo de ~8 s donde una cámara hace *macro-journey*: empieza en **oscuridad con partículas frías dispersas** → las partículas se abren y **aparece una esfera brillante** (el "ember") → la luz **se vuelve cálida** → el ember **crece y llena el encuadre**. Narrativa: *de ruido frío a calor/luz* (tema del producto: "cut through the noise → useful action").
- **Scrim**: oscuro a la izquierda (texto legible), **abierto y claro sobre el centro-derecha** (donde se exhibe la esfera). La esfera es el "acto" visual; el texto es el contrapunto.
- **Capa cálida**: radial naranja que aparece progresivamente en la segunda mitad.
- **Estética**: fondo negro-navy ultra oscuro, texto claro sobre oscuro, acentos neón fríos que se calientan, glow/bloom en todos los elementos accent (`box-shadow` con `rgba(var(--accent), …)`), `backdrop-filter: blur()` en inputs/CTA ghost, sombras de texto para separar texto del video.
- **CTA primary**: gradiente naranja `#ffb76e→#ff8a40` con texto `#2a0f00` (botón luminoso sobre oscuro) + glow ámbar.
- `theme-color: #05060a` (barra del navegador).

---

## 4. Tipografía y jerarquía

Fuente única: **Inter** (sans). Toda la jerarquía se construye con **escala fluida (`clamp`)** + **tracking agresivo** + **text-shadow** para separar del video:

| Elemento | Clase | Tamaño | Peso | Detalles |
|---|---|---|---|---|
| Eyebrow | `.eyebrow` | 13px | 600 | **Mayúsculas, `letter-spacing: 0.42em`**, color accent con `text-shadow` glow |
| Opening line | `.opening-line` | `clamp(1.35rem, 3.4vw, 2.4rem)` | 500 | `line-height 1.28`, color `--cool-soft` |
| Headline | `.headline` | `clamp(2.6rem, 8.2vw, 5.4rem)` | 600 | `line-height 1.02`, `letter-spacing -0.03em` (apretado) |
| Lede | `.lede` | `clamp(1.05rem, 1.7vw, 1.3rem)` | — | `max-width: 30ch`, `line-height 1.55`, `--cool-soft` |
| Section title | `.section-title` | `clamp(1.8rem, 4.4vw, 3rem)` | 600 | `letter-spacing -0.02em` |
| Value-item h3 | `.value-item h3` | `clamp(1.05rem, 1.7vw, 1.22rem)` | 600 | título corto de cada ítem |
| Value-item p | `.value-item p` | 0.98rem | — | `line-height 1.5`, `#c7c1b6` (gris cálido) |
| CTA headline | `.cta-headline` | `clamp(2.2rem, 6.4vw, 4.2rem)` | 600 | `line-height 1.04` |
| CTA text | `.cta-text` | `clamp(1.05rem, 1.8vw, 1.3rem)` | — | `max-width: 34ch`, `--warm-soft` |
| Cue | `.cue__text` | 12px | — | Mayúsculas, `letter-spacing 0.32em` |

Marcas de valor: `.value-item__mark` = **dot de 8px** (`border-radius: 50%`) de color accent con `box-shadow` glow (`0 0 14px rgba(var(--accent), 0.8)`), posicionado absoluto a la izquierda de cada ítem.

Jerarquía visual: **eyebrow (etiqueta) → headline (hero) → lede (sub)**, luego en valor **section-title → lista con marcas → descripciones**, y en CTA **headline → texto → form pill**.

---

## 5. Interacciones

### Loader "Igniting the ember"
Radial `#0a0d16→#04050a`, anillo de 46px con `border-top-color` accent + glow, label en mayúsculas con **dots animados por `@keyframes dots`** (`steps(4, end)` — "…"). Se oculta con `.is-hidden` (fade 0.7s) cuando el video está listo (múltiples eventos `canplay`/`canplaythrough`/`loadeddata`, + `READY_TIMEOUT = 9000` ms como fallback; si falla, cae al poster con clase `.no-video`).

### Scroll-driven video (el corazón del patrón)
- **Nunca autoplaya.** `getProgress()` = `scrollY / (spacer.height − viewport)`, y `video.currentTime = progress * duration` (8 s).
- Ease con rAF: `displayTime += (targetTime − displayTime) * SCRUB_EASE (0.14)`, se detiene cuando |target − display| < `SETTLE_EPS` y `p` no cambió (bucle idle). El **bucle solo corre mientras algo se mueve** (`wake()` en scroll/resize).
- El video debe estar **encodificado all-intra** (keyframe en cada frame, `ffmpeg -g 1`) para que `currentTime` busque sin saltos.
- iOS: se "prima" el video con `play()+pause()` en el primer gesto para que los frames buscados se rendericen.
- Longitud de scroll: `--scroll-len = clamp(frames * 3.6vh, 480, 900)vh` (aprox. 8 s × 24 fps ≈ 192 frames ≈ 692vh) — la velocidad de scrub se siente uniforme.

### Nav
Transparente fijo arriba; los links usan `data-scrollto` → `scrollToProgress()` (scroll suave proporcional). El link a CTA enfoca el email tras 650 ms (`data-focus-email`).

### Rail de progreso
3px abajo; `rail.style.width = (p*100)%`; gradiente `accent → #ff9d5c` con glow.

### Scroll cue
"Scroll" + línea pulsante (`@keyframes cue`: `scaleY(0.5→1)` con `transform-origin: top`). Se oculta a `p > 0.02`.

### Formulario de suscripción
Validación client-side (regex email); estados `.is-success` (note verde `#8ff0b0`, botón → "Subscribed ✓") y `.is-error` (borde `#ff7a7a` + ring). Envío TODO comentado (integrar provider). Input pill 52px con `backdrop-filter: blur(8px)` y placeholder ámbar.

### Responsive & accesibilidad
- Móvil: nav links ocultos, panels bottom-anchored, descripciones de valor ocultas, cue oculto, signup en 1 columna.
- `prefers-reduced-motion`: loader ring lento, cue sin animación, video sin scale, ease directo (sin scrub suave).
- `noscript`: panels estáticos legibles + poster como fondo.

---

## 6. Conclusiones para adaptar a Wiqonn (sin esfera)

**Contexto Wiqonn (verificado en repo):** navy `#0A0E1A`, gradiente brand `#00ADEC → #1CB29F → #39B54A` (cyan→teal→green), tipografías Lato (headings) / Open Sans (body) / JetBrains Mono, Next.js 16 + Tailwind v4 + **GSAP/ScrollTrigger + Lenis ya instalados**, canvas `neural-network-bg.tsx` existente, deploy GitHub Pages (estático).

### 6.1 Lo que se reutiliza TAL CUAL (el patrón, no el tema)
- **Arquitectura stage + spacer**: contenedor `fixed inset-0` + `--scroll-len` en vh. En Next.js se sustituye el JS vanilla por GSAP ScrollTrigger + Lenis (ya presentes), pero la lógica es idéntica: progreso 0→1 → scrubeo del asset y revelado de panels.
- **Sistema de 4 panels con `data-start/data-end`**: es la columna vertebral. Wiqonn ya tiene las secciones (hero, services, value, CTA) → se mapean a `p-opening` / `p-headline` / `p-value` / `p-cta`.
- **Loader + rail + cue + scrim**: mismos componentes, re-brandeados.
- **PANEL_FADE / smoothstep / ease**: mismo math; solo cambia el "asset" que se scrubea.

### 6.2 Sustituir la esfera por elementos de IA (sin video opcional)

Opciones de "núcleo visual" en orden de fidelidad al patrón original:

1. **Red neuronal como macro-journey (video, mismo patrón)**: generar un clip ~8 s (Higgsfield/Cinematic Studio o Kling) con *camera push-through de una red neuronal*: oscuridad con **nodos/partículas frías dispersas** → la cámara entra y los **nodos se conectan en un grafo** (el "núcleo", no esfera) → **los enlaces se iluminan con el gradiente cyan→teal→green** → el grafo llena el encuadre. Mismo arco narrativo "ruido frío → inteligencia viva" que el demo ("cut through the noise → useful action"), con la red neuronal como metáfora del laboratorio de IA. Encodear all-intra (`-g 1`), poster estático como fallback.
2. **Canvas procedural scrubeado (sin video, 100% Wiqonn)**: reutilizar `neural-network-bg.tsx` pero **conducido por progreso de scroll** en vez de tiempo: la constelación de partículas se ensambla progresivamente en un grafo conectado, con flujo de datos (`dashoffset`/líneas animadas) recorriendo las aristas. El "progreso" del canvas = `p` del scroll (mismo mapeo que `video.currentTime`). Ventaja: peso cero, sin asset, y ya existe la infraestructura.
3. **"Núcleo de datos"**: un cluster de nodos + flujo de partículas convergiendo (no esfera cerrada), o un haz de **streams de datos** (líneas en curva, estilo islas de datos) que se aceleran e iluminan hacia el CTA.

Para las 3: **la esfera es reemplazada por un "grafo vivo"** — la misma función escenográfica (elemento central brillante a la derecha, texto a la izquierda sobre scrim), pero sin geometría esférica.

### 6.3 Re-mapa del arco cromático con la identidad Wiqonn
El demo interpola el accent **de frío (azul pálido) a cálido (ámbar)**. Wiqonn debe interpolar **dentro de su gradiente brand**, manteniendo la temperatura visual:
- `--accent` inicial: cyan `#00ADEC` (frío, "datos/ruido") → medio: teal `#1CB29F` → final: green `#39B54A` ("inteligencia/acción"). Interpolación con la misma `lerp` + `smoothstep` en el back-half.
- `--bg` = `#0A0E1A` (navy Wiqonn, no `#05060a`).
- `--cool-strong/soft` → blancos con tinte cyan (`#eef4ff` ya pega); `--warm-*` del demo → verde/mint claro (`#d9ffe9` etc.) para el CTA.
- **Capa `#warm` del demo → capa de "resplandor de red"**: en vez de radial naranja, un radial teal/green que sube de 0→0.6 con `smoothstep((p−0.45)/0.5)`. La "luz que llega" es la red iluminándose.
- CTA primary: gradiente **cyan→teal→green** (`#00ADEC→#1CB29F→#39B54A`) con texto `#04121f`/navy oscuro (equivalente al naranja con texto `#2a0f00`), glow del color brand.
- Rail, dots del value-grid, eyebrow, subrayado de nav: todo `rgb` del accent interpolado (mantener glow/bloom).

### 6.4 Adaptación tipográfica
Mantener la **jerarquía idéntica** (eyebrow caps con tracking 0.42em → headline clamp → lede 30ch), pero con las fuentes Wiqonn: Lato para headlines/section-title/CTA-headline (600/700), Open Sans para lede/texto, JetBrains Mono para el eyebrow (o para la etiqueta técnica tipo `// wiqonn_ai`). El eyebrow mono con tracking amplio + glow cyan refuerza el tema de laboratorio.

### 6.5 Copy de las interacciones (re-brand)
- Loader: *"Igniting the ember"* → *"Initializing neural network…"* / *"Spinning up inference…"* con anillo en gradiente cyan→green.
- Cue: "Scroll" → se mantiene, o "Explore".
- Panels (mapeo a contenido real Wiqonn):
  1. `p-opening` (cool, cyan): eyebrow `WIQONN` + línea tipo *"Cada día hay más IA. Casi nada importa."*
  2. `p-headline` (cool): headline + lede del hero actual (rotating headline ×3 puede mantenerse como crossfade).
  3. `p-value` (mid, teal): services/value prop con value-grid de 4 ítems (IA/ML, BI, Cloud, Dev) con dots cyan→green.
  4. `p-cta` (green): CTA + `LeadForm` existente (web3forms) en vez del form del demo, pill con blur.
- Nav transparente con los anchors de Wiqonn + toggle ES/EN (ya existe) + CTA Cal.com.

### 6.6 Checklist técnico para Wiqonn
- Sustituir el bloque vanilla JS por GSAP ScrollTrigger (o mantener el loop rAF si se usa video); Lenis ya está en `smooth-scroll-provider.tsx`.
- `--scroll-len` ≈ 680vh generado por spacer (mismo clamp 480–900vh).
- Video: 16:9 desktop + 9:16 móvil si se usa asset; encodear all-intra + poster; fallback `.no-video` con poster estático y panels legibles; `noscript` estático.
- Reducir `--accent` interpolation a cyan→teal→green (3 paradas, `lerp` por tramos).
- Aplicar `prefers-reduced-motion` y pausar canvas fuera de viewport (ya es práctica del repo).
- No tocar Netlify/Vercel: es estático en GitHub Pages.
