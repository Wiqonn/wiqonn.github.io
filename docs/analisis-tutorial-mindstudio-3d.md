# Análisis técnico: "How to Build Animated 3D Websites with Claude Code and AI Video Generation" (MindStudio)

> **Fuente**: https://www.mindstudio.ai/blog/animated-3d-websites-claude-code-ai-video-generation
> **Autor**: MindStudio Team · 17 marzo 2026
> **Tesis del artículo**: *"Combine Claude Code, AI-generated video assets, and scroll-triggered animations to build high-end landing pages for under $10 in tokens and credits."*

**Contexto de aplicación**: landing Next.js 16 del laboratorio de IA Wiqonn, que ya tiene scroll-driven video cinemático (video de fondo scrubbeado con scroll, panels con smoothstep, Lenis, GSAP). Este informe responde a 6 preguntas concretas sobre el tutorial.

---

## 1. Pipeline completa (paso a paso)

El tutorial define una secuencia de **6 pasos** y enfatiza el orden de los dos primeros:

| # | Paso | Qué se hace | Duración aprox. |
|---|------|-------------|-----------------|
| 1 | **Generate Video Assets First** | Generar el video de fondo ANTES de tocar código | 30–60 min |
| 2 | **Scaffold the Project with Claude Code** | `claude` + brief en lenguaje natural → `index.html`, `styles.css`, `main.js`, GSAP via CDN | 5–15 min (scaffold), 2–4 min (build) |
| 3 | **Implement Scroll-Triggered Animations** | Refinar motion design con GSAP ScrollTrigger (stagger, pin+scrub, tilt 3D) | dentro del 1–3 h de refinado |
| 4 | **Integrate the Video Background** | `<video autoplay muted loop playsinline>` + overlay oscuro + `prefers-reduced-motion` | — |
| 5 | **Add Three.js for True 3D (Optional)** | Campo de partículas (o 3D geométrico sutil), con fallback para móvil | — |
| 6 | **Debug, Polish, and Deploy** | 2–3 rondas de revisión; deploy en Vercel/Netlify/GitHub Pages | 1–3 h |

**Cita clave del orden (paso 1):**
> *"Generate video assets **before** writing any code, because the visual style of the video determines the color palette, typography, and layout of everything else."*

**Cita del tiempo total (FAQ):**
> *"Generating video assets takes 30–60 minutes including iteration. The initial Claude Code scaffold takes 5–15 minutes. Refinement and debugging typically takes 1–3 hours... A finished, deployable page in a single afternoon is realistic for most landing page projects."*

**El loop de trabajo real** (no escribe snippets sueltos, es agéntico):
> *"When something doesn't work on first run, tell Claude Code exactly what broke and it will fix it. This iterative loop is where most of the build time goes."*

> *"Claude Code produces good first drafts. Polish usually takes 2–3 rounds of revision."*

---

## 2. Herramientas de video/3D: qué es "video AI" y qué es código real

**Hallazgo central**: el tutorial es honesto y desmitificador. **El "3D" del título es en su mayoría CSS 3D + video generado por IA (2D) + GSAP.** El único WebGL real es un campo de partículas opcional. NO hay React Three Fiber, NO hay modelos GLTF, NO hay shaders custom, NO hay morphing, NO hay cámara 3D en este tutorial.

### Qué es "video AI" (assets, NO código)

Generadores de video **2D** para backgrounds cinematográficos en loop:

> *"**Runway Gen-4** produces high-quality abstract motion graphics and handles cinematic lighting well. Solid default choice. **Sora** (via ChatGPT Pro or API) is strong on fluid, photorealistic motion. **Kling** offers a useful free tier... **Hailuo / MiniMax** is worth testing for geometric and abstract styles on a budget."*

El tutorial también menciona **Veo** (solo en la sección de MindStudio Media Workbench): *"It gives you access to all major image and video models — Sora, Veo, Runway, FLUX, and more — in one place."*

**Post-procesado**: *"Use **HandBrake** (free, local) or **FFmpeg** to convert to MP4 and reduce the file size to under 5MB. A 1080p loop shouldn't need to be larger than that."*

### Qué es código real (no AI)

- **GSAP + ScrollTrigger**: *"The industry standard for this is GSAP's ScrollTrigger plugin — a battle-tested library that's free for most use cases."*
- **CSS 3D transforms**: *"The simplest form of 3D on the web uses CSS perspective and transform properties."* — *"CSS 3D uses the browser's built-in rendering pipeline and is limited to 2.5D effects."*
- **Three.js** (WebGL): *"True 3D — particles, geometric objects, shader effects — lives in WebGL territory. Three.js is the most popular abstraction layer."*

### El modelo mental del tutorial (jerarquía de esfuerzo/impacto)

> *"For most landing pages, CSS 3D combined with GSAP gets you 80% of the visual impact at 20% of the complexity."*

> *"For landing pages, CSS 3D and GSAP typically deliver better results per hour invested than Three.js."*

**Resumen para tu pregunta**: en este tutorial el video AI genera *footage de fondo* (2D cinematográfico), NO modelos 3D. Todo lo interactivo (scroll, stagger, pin, tilt, partículas) es código real que escribe Claude Code. No hay pipeline de "video 3D generado y renderizado a disco" — el renderizado interactivo es Three.js en el navegador.

---

## 3. Técnicas de Three.js que usa (y cuáles NO usa)

El tutorial tiene **un solo** caso de uso Three.js: el campo de partículas.

**Prompt literal:**
> *"Add a Three.js particle field to the hero section. Create 2,000 small white particles distributed randomly in a sphere of radius 5 units. Rotate the sphere slowly on the Y axis. Position the Three.js canvas behind the video overlay but above the video itself."*

**Qué hace Claude Code al respecto (cita):**
> *"Claude Code will write the Three.js scene setup, the particle geometry using `BufferGeometry`, and the animation loop."*

**La técnica de capas (z-order) es la parte premium**: video → partículas Three.js → overlay oscuro → contenido. Esto encaja directamente con tu stack de video scrubbeado.

**Advertencias de rendimiento (críticas para ti):**
> *"Three.js scenes can hurt performance on lower-end devices. Always test on mobile and consider a simpler CSS fallback. Add a device detection check and ask Claude Code to render a static image instead of the canvas on mobile."*

> *"**Three.js tanks on mobile.** Add a device detection check and render a static fallback on mobile. Claude Code can write this conditional for you."*

### Técnicas 3D que este tutorial NO cubre

A efectos de tu ambición "premium": **no** trata shaders custom, GLTF/glb, morph targets, camera rigs, scroll-pinned 3D con ScrollTrigger, ni React Three Fiber. Para eso el propio tutorial recomienda ser conservador: *"Be selective. A subtle particle field or an animated geometric logo is often more effective than a full 3D scene."*

---

## 4. Estructura del prompt maestro para Claude Code (citas literales)

El patrón del tutorial: **brief global en lenguaje natural → refinamientos incrementales por sección → debugging descriptivo**. No hay un "mega-prompt" único; hay prompts de 5 niveles.

### 4.1 Prompt de scaffolding (el "master brief")

> *"Create a single-page landing page for a fictional SaaS product called Vela. The page should have: a full-bleed video background in the hero section (I'll drop in a file called hero.mp4), a headline and subheadline centered over the video, a scroll-triggered section where three feature cards animate in sequentially from the bottom, a horizontal scroll section showcasing a product timeline, and a contact section at the bottom. Use GSAP and ScrollTrigger for all animations. Style it dark, minimal, and premium — dark navy background, white text, subtle blue accents. No frameworks. Plain HTML, CSS, and JavaScript."*

**Anatomía del brief** (estructura que debes replicar):
1. **Tipo de página** (single-page landing, secciones enumeradas en orden)
2. **Assets ya existentes** (hero.mp4) → el video se genera en el paso 1
3. **Comportamientos de scroll explícitos** (animate in sequentially, horizontal scroll)
4. **Biblioteca y restricciones** ("Use GSAP and ScrollTrigger... No frameworks")
5. **Dirección de estilo** (dark, minimal, premium; paleta exacta)
6. **Lenguaje de implementación** (Plain HTML, CSS, JavaScript)

### 4.2 Prompt de stagger (cards)

> *"When the features section scrolls into view, animate each card so it fades in and slides up from 40px below its final position, staggered 0.15s apart. Use GSAP ScrollTrigger. Trigger when the top of the section hits 80% of the viewport height."*

Código resultante (lo que "Claude Code escribirá"):
```js
gsap.from(".feature-card", {
  scrollTrigger: {
    trigger: ".features-section",
    start: "top 80%",
  },
  y: 40,
  opacity: 0,
  duration: 0.7,
  stagger: 0.15,
  ease: "power2.out"
});
```

### 4.3 Prompt de pinned section (pin + scrub)

> *"Pin the product demo section for a scroll distance of 300vh. As the user scrolls through the pinned section, animate three steps sequentially: first, the dashboard mockup fades in; second, a highlight ring appears on the key metric; third, a results card slides in from the right. Each step should trigger at equal intervals through the 300vh scroll distance."*

> *"Claude Code handles the ScrollTrigger `pin` and `scrub` configuration and writes the timeline for you."*

### 4.4 Prompt de tilt 3D (CSS 3D)

> *"Add a mouse-tracking 3D tilt effect to the feature cards. When the user moves their mouse over a card, the card should tilt toward the cursor by up to 15 degrees on both axes. Use JavaScript to calculate the tilt based on cursor position within the card. Add a subtle specular highlight that follows the cursor."*

### 4.5 Prompts de accesibilidad y responsive (no negociables)

> *"If the user has prefers-reduced-motion enabled, hide the video and show the poster image instead. Add the appropriate CSS media query."*

> *"Make this fully responsive and handle mobile viewport sizes."*

### 4.6 Prompt de debugging (patrón a imitar)

> *"The feature cards are animating in immediately on page load instead of waiting for scroll. The console shows no errors. The ScrollTrigger trigger element is '.features-section'."*

---

## 5. Stack completo y costos

### Stack

| Capa | Herramienta | Rol |
|------|-------------|-----|
| Agente de código | **Claude Code** (terminal) | Escribe HTML/CSS/JS, ejecuta comandos, itera |
| Video AI | **Runway Gen-4 / Sora / Kling / Hailuo-MiniMax** | Backgrounds en loop 4–8 s |
| Animación | **GSAP + ScrollTrigger** (CDN o npm) | Scroll-driven animations, pin, scrub |
| 3D (opcional) | **Three.js** (WebGL, BufferGeometry) | Campo de partículas |
| Compresión | **HandBrake / FFmpeg** | MP4 < 5MB |
| Dev server | `npx serve` / Live Server | Local |
| Deploy | **Vercel / Netlify / GitHub Pages** | Estático, free |
| A escala | **MindStudio AI Media Workbench** | Orquesta generación de assets (Sora, Veo, Runway, FLUX) en workflows automatizados |

> *"No design tools required. No Figma. No Webpack config."*

### Costo real (tabla del tutorial)

| Item | Tool | Coste |
|------|------|-------|
| Scaffolding + animaciones | Claude Code | ~$2–3 en tokens |
| Debugging + revisiones (3 rondas) | Claude Code | ~$1–2 |
| Generación de video (5 clips) | Runway / Kling / Sora | ~$2–4 |
| Compresión | HandBrake | $0 |
| Hosting | Vercel / Netlify free | $0 |
| **Total** | | **~$5–9** |

**Benchmark humano:**
> *"A senior frontend developer quoting a similar page would have charged $3,000–8,000 not long ago. The quality gap has narrowed substantially."*

**Recomendación de gasto en video:** *"Budget $2–4 and generate 3–5 variations, then pick the best one."*

**Nota para ti**: estos costes asumen un proyecto *vanilla* (HTML/CSS/JS). Tu stack Next.js 16 + Lenis + GSAP + React ya existe; el incremental sería solo los tokens de Claude Code y el coste del video/partículas.

---

## 6. Lecciones concretas aplicables a Wiqonn (Next.js 16, video scrubbeado ya implementado)

### Qué hacer PRIMERO (orden de impacto por dólar/esfuerzo)

1. **Video de fondo en loop en el hero** — la pieza de mayor impacto por dólar. Reglas de prompting del tutorial:
   > *"A stronger prompt: 'Slow-moving dark blue and violet fluid geometry, smooth looping motion, cinematic depth of field, high-contrast dark background, no text, no faces, photorealistic lighting, 6 seconds'"*
   
   Principios: *"Keep motion slow... Use dark backgrounds... Aim for loops... Go short. 4–8 seconds is enough for a hero loop."*
   
   Tu caso ya tiene video scrubbeado; el upgrade incremental sería generar el clip con estos parámetros de prompt (dark + loop + cámara lenta) para que combine con tu overlay.

2. **Tilt 3D en cards** (CSS 3D puro, ~20 líneas) — el "efecto que parece de agencia" sin Three.js. Prompt 4.4.
3. **Campo de partículas Three.js en el hero** entre el video y el overlay — la única técnica Three.js del tutorial (prompt en §3). Es la que mejor complementa tu pipeline de panels, porque rellena el espacio entre video y contenido con profundidad.
4. **Overlay oscuro + `prefers-reduced-motion` + fallback móvil** — requisitos de calidad no negociables (prompts 4.5).

### El "mayor impacto por dólar" según el tutorial (cita directa)

> *"The fastest way to add visual depth to a landing page is a looping AI-generated video in the hero section... becomes a full-bleed background that makes everything feel premium without requiring any 3D code."*

> *"CSS 3D combined with GSAP gets you 80% of the visual impact at 20% of the complexity."*

### Trampas a evitar (Common Mistakes del tutorial)

1. **Sobre-animar**: *"Over-animating everything. Movement with no purpose becomes noise. Pick 3–4 key animations and let everything else stay static."*
2. **Ignorar presupuesto de rendimiento**: *"A video background combined with a Three.js canvas and heavy scroll animations equals a slow page on mid-range devices. Test on real hardware before shipping."* → para ti: detectar dispositivo y servir imagen estática en móvil en vez del canvas 3D.
3. **Saltarse reduced-motion**: *"Always add a `prefers-reduced-motion` media query that disables or reduces animations."*
4. **Elegir mal el modelo de video**: *"Abstract backgrounds need different prompts and models than photorealistic scenes. Test a few generators before committing your budget."* → *"Test 2–3 generators with the same prompt and compare."*
5. **No commitear**: *"Claude Code sessions can be interrupted. Commit to git regularly so you don't lose progress."*

### Troubleshooting técnico que te interesa directamente

- **Jank en scroll**: *"Add `will-change: transform, opacity` to animated elements. This hints to the browser to promote them to their own compositing layer."*
- **Autoplay en móvil**: *"Make sure `muted` and `playsinline` are both present. Some older Android browsers also need `preload='auto'`."*
- **iOS Safari**: *"quirks with `position: sticky` and certain ScrollTrigger behaviors. Testing in iOS Safari before shipping is worth the extra 15 minutes."*

---

## Conclusión ejecutiva

El tutorial es un **mapa de mínimos** honesto: video AI (2D en loop) + GSAP ScrollTrigger + CSS 3D + (opcional) un campo de partículas Three.js. Para tu proyecto que ya tiene la capa de video cinematográfico, el tutorial sugiere que el siguiente escalón de impacto sea:

1. **Prompt de video mejorado** (slow, dark, loop, no text) para el hero → refuerza lo que ya tienes.
2. **Particle field Three.js** detrás del overlay (la única adición WebGL que el tutorial considera rentable).
3. **Tilt 3D + specular highlight** en cards (CSS 3D, sin Three.js).
4. **Pinned scroll sections** (pin + scrub) para walkthroughs de producto — técnica que no aparece en tu descripción actual y que el tutorial trata como "popular technique for product walkthroughs".
5. **Disciplina**: reduced-motion, fallback móvil, will-change, y elegir 3–4 animaciones clave.

Si quieres ir MÁS allá del tutorial (shaders GLSL, GLTF, camera rigs, R3F) — que es lo que probablemente significas por "3D de nivel premium" — el tutorial no lo cubre; sería la siguiente frontera de investigación. El valor de este artículo está en que te dice qué NO vale la pena añadir primero.
