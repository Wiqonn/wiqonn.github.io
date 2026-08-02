# Restaurar partículas del hero + barrer em-dashes — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restaurar el fondo de partículas animadas (canvas) en el hero del sitio wiqonn.github.io (el dueño lo prefiere sobre la aurora estática) y eliminar TODOS los em-dashes (—, U+2014) del código fuente porque el dueño los prohibió.

**Architecture:** El componente `components/neural-network-bg.tsx` ya existe completo y fue desconectado del árbol por el rediseño del hero. Se reintegra al `HeroSection` entre las capas aurora y los overlays de gradiente, con dos mejoras de rendimiento que no tenía: pausa del loop cuando el hero sale del viewport (IntersectionObserver) y dibujo de un frame estático bajo `prefers-reduced-motion`. En paralelo se reemplaza cada em-dash por puntuación correcta (dos puntos, coma, punto, paréntesis o "n/a") según el contexto de copy, en ES y EN por igual.

**Tech Stack:** Next.js 16, TypeScript, React 19, Tailwind v4, GSAP + ScrollTrigger, canvas 2D. Sin dependencias nuevas.

## Global Constraints

- **Prohibido usar em-dashes (—, U+2014)** en cualquier archivo del repo. En su lugar: dos puntos, coma, punto, paréntesis o "n/a" según el contexto.
- **CERO commits**: el dueño debe autorizar antes. No correr `git commit` bajo ninguna circunstancia.
- `npx tsc --noEmit` debe terminar con **0 errores** (el TS2554 actual de `neural-network-bg.tsx:15` se arregla en Task 1).
- `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000` → `200` (dev server vivo con hot reload).
- NO tocar: `package.json`, `globals.css`, `ui/*`, `page.tsx`, `app/layout.tsx` (fuera de alcance).
- Respetar `prefers-reduced-motion`: bajo esa media query el canvas dibuja UN frame estático, no anima.
- Los diccionarios ES/EN deben permanecer sincronizados (`en: Dict` obliga a que toda clave exista en ambos).
- Copy ES y EN: los em-dashes se reemplazan con puntuación equivalente, manteniendo el significado y tono del copy.

---

### Task 1: Arreglar TS2554 + mejoras de rendimiento en el canvas

**Files:**
- Modify: `components/neural-network-bg.tsx:15` (TS2554) y el `useEffect` (pause + reduced-motion)
- Test: `npx tsc --noEmit` (debe salir 0 errores tras esta tarea)

**Interfaces:**
- Consumes: nada nuevo (componente autocontenido, `export function NeuralNetworkBackground()`)
- Produces: `NeuralNetworkBackground` (misma firma, sin props) — lo consume Task 2. El canvas NO necesita `pointer-events` porque el mousemove escucha `window`.

- [ ] **Step 1: Arreglar el TS2554**

`useRef<number>()` requiere 1 argumento. Cambiar línea 15:

```diff
-  const animationRef = useRef<number>()
+  const animationRef = useRef<number | undefined>(undefined)
```

- [ ] **Step 2: Añadir pause fuera de viewport + reduced-motion al useEffect**

Dentro del `useEffect` existente, después de obtener `ctx`, añadir:

```ts
    let animationId: number | undefined
    let running = false
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

    const paintStaticFrame = () => {
      // single pass: draw nodes + connections, no loop
      nodesRef.current.forEach((node, index) => drawNode(node, index))
      drawConnections()
    }

    const stop = () => {
      running = false
      if (animationId !== undefined) {
        cancelAnimationFrame(animationId)
        animationId = undefined
      }
    }
```

Reemplazar la función `animate` (y su arranque) para que respete `running` y `reducedMotion`:

```ts
    const animate = () => {
      if (!running) return
      updateNodes()
      drawConnections()
      nodesRef.current.forEach((node, index) => drawNode(node, index))
      animationId = requestAnimationFrame(animate)
    }

    const start = () => {
      if (reducedMotion.matches) {
        paintStaticFrame()
        return
      }
      if (!running) {
        running = true
        animationId = requestAnimationFrame(animate)
      }
    }
```

En el mismo effect, tras `resizeCanvas()` inicial y antes del cleanup, añadir el IntersectionObserver (pausa el loop cuando el hero sale de pantalla):

```ts
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) start()
          else stop()
        })
      },
      { threshold: 0 }
    )
    observer.observe(canvas)
    start()
```

Actualizar el cleanup para remover el observer y parar el loop:

```ts
    return () => {
      observer.disconnect()
      stop()
      window.removeEventListener("resize", resizeCanvas)
    }
```

(Nota: verificar los listeners que el archivo actual registra — mousemove/resize — y mantener su cleanup existente; fusionar, no duplicar.)

- [ ] **Step 3: Verificar compilación**

Run: `cd /code/wiqonn.github.io && npx tsc --noEmit`
Expected: 0 errores (el único error previo, `neural-network-bg.tsx:15`, debe desaparecer).

- [ ] **Step 4: NO commit** (pendiente de autorización del dueño — constraint global)

---

### Task 2: Reintegrar el canvas en el HeroSection

**Files:**
- Modify: `components/hero-section.tsx` (import + render)
- Test: `npx tsc --noEmit` + `curl http://localhost:3000` → 200

**Interfaces:**
- Consumes: `NeuralNetworkBackground` (de Task 1)
- Produces: hero con fondo de partículas visible bajo el contenido

- [ ] **Step 1: Importar el componente**

Tras el import de `useT`:

```diff
+import { NeuralNetworkBackground } from "@/components/neural-network-bg"
```

- [ ] **Step 2: Renderizarlo entre la segunda aurora y los overlays de gradiente**

En el JSX del hero, localizar la segunda capa `.aurora` (la de `opacity-40`) y, justo después de su `</div>`, insertar:

```tsx
      {/* Particle network — pauses when off-screen / reduced motion */}
      <div aria-hidden="true" className="absolute inset-0 z-[1] pointer-events-none">
        <NeuralNetworkBackground />
      </div>
```

El `z-[1]` lo coloca sobre las auroras (`-z-10`) y bajo los overlays de gradiente (`z-[2]`) y el contenido (`z-10`): las partículas se ven sobre el fondo navy y el fade inferior del overlay las atenúa suavemente. `pointer-events-none` evita que el canvas bloquee los botones CTA (el mousemove usa `window`, así que la interacción sigue funcionando).

- [ ] **Step 3: Verificar**

Run: `cd /code/wiqonn.github.io && npx tsc --noEmit` (0 errores) y `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000` (200).
Visual: recargar `http://localhost:3000` — las partículas cian/verde se mueven y conectan; al hacer scroll hacia abajo el loop se pausa; con `prefers-reduced-motion` se dibuja un frame estático.

- [ ] **Step 4: NO commit**

---

### Task 3: Barrer em-dashes de lib/i18n.ts (29 ocurrencias)

**Files:**
- Modify: `lib/i18n.ts` (claves ES y EN)
- Test: `grep -c '—' lib/i18n.ts` → 0

**Interfaces:**
- Consumes: nada (el dict tipado `es`/`en` queda con las mismas claves, solo cambia puntuación)
- Produces: diccionario sin em-dashes; los componentes que leen `t.*` no cambian de clave

- [ ] **Step 1: Reemplazar cada em-dash por la puntuación exacta indicada**

Aplicar UNO A UNO los siguientes reemplazos (antes → después), en el orden del archivo:

**Sección ES:**
| Línea aprox. | Antes (fragmento) | Después |
|---|---|---|
| 2 (comentario) | `Wiqonn — diccionario i18n (ES / EN)` | `Wiqonn: diccionario i18n (ES / EN)` |
| 25 (hero.subheadline) | `producción — analítica, machine learning, cloud e IoT — para empresas` | `producción: analítica, machine learning, cloud e IoT, para empresas` |
| 56 (value pillar 2) | `rigor académico — si no funciona con tus datos` | `rigor académico. Si no funciona con tus datos` |
| 90 (value p1) | `no tienes tiempo — desde agentes` | `no tienes tiempo: desde agentes` |
| 114 (services) | `cargas de IA — sin la complejidad.` | `cargas de IA, sin la complejidad.` |
| 126 (services) | `cómo trabajas — con IA integrada.` | `cómo trabajas, con IA integrada.` |
| 156 (businessModel) | `tu operación — y qué construir primero.` | `tu operación y qué construir primero.` |
| 253 (businessModel) | `eligen a Wiqonn — y por los que es difícil de copiar.` | `eligen a Wiqonn y por los que es difícil de copiar.` |
| 258 (businessModel) | `con rigor — si no funciona con tus datos` | `con rigor. Si no funciona con tus datos` |
| 263 (businessModel) | `espectro completo — de ML/IA y analítica` | `espectro completo: de ML/IA y analítica` |
| 273 (businessModel) | `USA y Europa — sin sacrificar calidad.` | `USA y Europa, sin sacrificar calidad.` |
| 285 (stats) | `Empleados — tamaño de empresas` | `Empleados: tamaño de empresas` |
| 390 (cta) | `si podemos ayudarte — y cómo.` | `si podemos ayudarte y cómo.` |

**Sección EN (mismas claves, copy en inglés):**
| Línea aprox. | Antes (fragmento) | Después |
|---|---|---|
| 432 (hero.subheadline) | `production-ready AI products — analytics, machine learning, cloud and IoT — for` | `production-ready AI products: analytics, machine learning, cloud and IoT, for` |
| 435 (hero.trustResearch) | `evaluates models — embedded in everything we ship.` | `evaluates models, embedded in everything we ship.` |
| 445 (hero.tagline) | `embedded systems — all under one roof` | `embedded systems, all under one roof` |
| 463 (value pillar 2) | `with academic rigor — if it doesn't work on your data` | `with academic rigor. If it doesn't work on your data` |
| 497 (value p1) | `you don't have time for — from intelligent agents` | `you don't have time for: from intelligent agents` |
| 521 (services) | `AI workloads — without the complexity.` | `AI workloads, without the complexity.` |
| 533 (services) | `around how you work — with AI built in.` | `around how you work, with AI built in.` |
| 563 (businessModel) | `in your operation — and what to build first.` | `in your operation and what to build first.` |
| 661 (businessModel) | `choose Wiqonn — and why it's hard to copy.` | `choose Wiqonn and why it's hard to copy.` |
| 666 (businessModel) | `with rigor — if it doesn't work on your data` | `with rigor. If it doesn't work on your data` |
| 671 (businessModel) | `the complete spectrum — from ML/AI` | `the complete spectrum: from ML/AI` |
| 681 (businessModel) | `European agencies — without sacrificing quality.` | `European agencies, without sacrificing quality.` |
| 693 (stats) | `Employees — size of companies` | `Employees: size of companies` |
| 801 (cta) | `if we can help — and how.` | `if we can help and how.` |

(Nota: las líneas exactas pueden desplazarse ±5 por ediciones previas del agente i18n; localizar por el fragmento, no por el número.)

- [ ] **Step 2: Verificar**

Run: `grep -c '—' /code/wiqonn.github.io/lib/i18n.ts`
Expected: `0`

- [ ] **Step 3: NO commit**

---

### Task 4: Barrer em-dashes de los componentes (18 ocurrencias)

**Files:**
- Modify: `components/business-model-section.tsx`, `components/cta-section.tsx`, `components/hero-section.tsx`, `components/language-provider.tsx`, `components/navigation.tsx`, `components/research-section.tsx`, `components/reveal.tsx`, `components/services-section.tsx`, `components/stats-section.tsx`, `components/value-proposition.tsx`, `components/blog/performance-charts.tsx`
- Test: `grep -rn '—' components/` → 0

**Interfaces:**
- Consumes: nada
- Produces: componentes sin em-dashes, mismo comportamiento

- [ ] **Step 1: Reemplazar los em-dashes de strings visibles de business-model-section.tsx**

Los textos visibles deben coincidir con el dict (Task 3) o con su copy hardcodeado actual — aplicar el mismo criterio (coma / dos puntos / punto). Las ocurrencias esperadas (líneas aprox. 84, 141, 191, 197, 209) siguen el patrón: `...operación — y qué construir primero.` → `...operación y qué construir primero.`; `...resultado claro — y diseñados...` → `...resultado claro y diseñados...`; `...con rigor — si no funciona...` → `...con rigor. Si no funciona...`; `...espectro completo — de ML/IA...` → `...espectro completo: de ML/IA...`; `...USA y Europa — sin sacrificar...` → `...USA y Europa, sin sacrificar...`. Si alguna línea ya fue movida al dict y el componente solo la lee, verificar que no quede em-dash en el componente.

- [ ] **Step 2: Reemplazar em-dashes en comentarios de código (no visibles, pero prohibidos igual)**

| Archivo | Antes | Después |
|---|---|---|
| `cta-section.tsx:12` | `Staggered load reveal (~100ms between elements). Only sets the delays —` | `Staggered load reveal (~100ms between elements). Only sets the delays:` |
| `hero-section.tsx` (comentarios ~12, 47, 66, 101, 174) | cualquier `—` en comentarios `//` o `/* */` | `:` o `.` según el texto |
| `language-provider.tsx:49` | `/* private mode — ignore */` | `/* private mode: ignore */` |
| `navigation.tsx:11` | `Toggle ES/EN — dos botones` | `Toggle ES/EN: dos botones` |
| `research-section.tsx:20` | `// Iconos por capability — el orden` | `// Iconos por capability: el orden` |
| `reveal.tsx:9` | `Transition delay in ms — use increasing` | `Transition delay in ms: use increasing` |
| `services-section.tsx` (~84, 126) | `Bento grid — featured card` / `Results — two columns` | `Bento grid: featured card` / `Results: two columns` |
| `stats-section.tsx` (~10, 18) | `// Hechos reales y verificables — cero cifras` / `easeOutCubic — decelerates` | `// Hechos reales y verificables: cero cifras` / `easeOutCubic: decelerates` |
| `value-proposition.tsx:34` | `gradientes de marca — opacidad` | `gradientes de marca: opacidad` |
| `blog/performance-charts.tsx:183` | `: "—"` (placeholder de tabla "sin datos") | `: "n/a"` |

- [ ] **Step 2b: Barrer el resto del repo (fuera de components/ y lib/)**

Run: `grep -rn '—' /code/wiqonn.github.io --include='*.tsx' --include='*.ts' --include='*.css' --include='*.json' | grep -v node_modules | grep -v '.next'`
Expected: revisar cualquier hallazgo restante (p.ej. `app/*`) y aplicar el mismo criterio. Los archivos `.md` (reportes WIQONN-*.md) NO se tocan.

- [ ] **Step 3: Verificar**

Run: `grep -rn '—' /code/wiqonn.github.io/components/ /code/wiqonn.github.io/lib/ /code/wiqonn.github.io/app/`
Expected: 0 resultados (sin contar node_modules/.next).

- [ ] **Step 4: NO commit**

---

### Task 5: Validación integral final

**Files:**
- Test-only: ninguna edición

- [ ] **Step 1: Compilación**

Run: `cd /code/wiqonn.github.io && npx tsc --noEmit`
Expected: `0` errores.

- [ ] **Step 2: Servidor**

Run: `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000`
Expected: `200`

- [ ] **Step 3: Barrera de em-dashes**

Run: `grep -rn '—' components/ lib/ app/ | wc -l`
Expected: `0`

- [ ] **Step 4: Partículas en el árbol**

Run: `grep -c 'NeuralNetworkBackground' components/hero-section.tsx`
Expected: `2` (1 import + 1 uso)

- [ ] **Step 5: Sin commits**

Run: `git -C /code/wiqonn.github.io log --oneline -1`
Expected: sigue siendo `a48e251 updates` (HEAD intacto — ningún commit nuevo de los agents).

---

## Self-Review

**1. Spec coverage:**
- Restaurar partículas → Task 1 (arreglo + mejoras) + Task 2 (reintegración en hero). ✓
- Prohibido em-dashes → Task 3 (i18n.ts, 29) + Task 4 (componentes, 18) + barrera en Task 5. ✓
- No commits → constraint global + paso explícito en cada tarea. ✓
- Mejoras de rendimiento (la razón por la que se había quitado el canvas) → pause con IntersectionObserver + reduced-motion estático en Task 1. ✓

**2. Placeholder scan:** Ningún "TBD"/"TODO". Task 4 Step 1 tiene una instrucción semi-descriptiva para business-model porque el agente i18n pudo haber movido ese copy al dict durante su ejecución (el número de línea es inestable); se ordena verificar el texto real antes de editar. Los demás reemplazos tienen antes/después exactos.

**3. Type consistency:** `NeuralNetworkBackground` mantiene su firma sin props (Task 1 → Task 2). `animationRef` pasa a `useRef<number | undefined>(undefined)` y `animationId` local del effect no choca con el ref existente: verificar al implementar que el effect usa UNA sola fuente de id de animación (el ref `animationRef` o la local `animationId`, no ambas) para evitar doble bucle.

**Riesgo residual:** Si el archivo `neural-network-bg.tsx` usa `animationRef.current` en el cleanup actual, la refactorización de Task 1 debe migrarlo a la variable local `animationId` (o reasignar el ref) — el paso 2 cubre stop() con `cancelAnimationFrame(animationId)`; adaptar al código real del archivo, no copiar a ciegas.

---

## Execution Handoff

Plan completo y guardado en `docs/superpowers/plans/2026-08-02-particulas-y-barrer-em-dashes.md`. Dos opciones de ejecución:

**1. Subagent-Driven (recomendado)** — despacho un subagent por tarea, reviso entre tareas, iteración rápida

**2. Inline Execution** — ejecuto las tareas en esta sesión con checkpoints

**¿Cuál prefieres?** (recordatorio: sin commits hasta tu autorización)
