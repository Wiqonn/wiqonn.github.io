"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { HeroSection } from "@/components/hero-section"
import { LightTunnel } from "@/components/cinematic/light-tunnel"
import { useLanguage } from "@/components/language-provider"

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value))
const mix = (from: number, to: number, amount: number) => from + (to - from) * amount
const smoothstep = (start: number, end: number, value: number) => {
  const amount = clamp((value - start) / Math.max(0.0001, end - start))
  return amount * amount * (3 - 2 * amount)
}
const damp = (current: number, target: number, rate: number, delta: number) =>
  mix(current, target, 1 - Math.exp(-rate * delta))

function createRandom(seed: number) {
  let state = seed >>> 0
  return () => {
    state += 0x6d2b79f5
    let value = state
    value = Math.imul(value ^ (value >>> 15), value | 1)
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61)
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296
  }
}

type NetworkNode = {
  layer: number
  row: number
  position: THREE.Vector3
}

function createNetworkNodes(compact: boolean) {
  const random = createRandom(42)
  const layerSizes = compact ? [3, 5, 6, 5, 3] : [4, 6, 8, 7, 5]
  const nodes: NetworkNode[] = []
  const layers: NetworkNode[][] = []

  layerSizes.forEach((size, layer) => {
    const layerNodes: NetworkNode[] = []
    const x = mix(-4.4, 3.2, layer / (layerSizes.length - 1))
    for (let row = 0; row < size; row += 1) {
      const y = size === 1 ? 0 : mix(-3.1, 3.1, row / (size - 1))
      const node = {
        layer,
        row,
        position: new THREE.Vector3(
          x + (random() - 0.5) * 0.16,
          y + (random() - 0.5) * 0.2,
          (random() - 0.5) * 0.65
        ),
      }
      nodes.push(node)
      layerNodes.push(node)
    }
    layers.push(layerNodes)
  })

  return { nodes, layers }
}

function createParticleGeometry(count: number, nodes: NetworkNode[]) {
  const random = createRandom(2026)
  const starts = new Float32Array(count * 3)
  const network = new Float32Array(count * 3)
  const final = new Float32Array(count * 3)
  const seeds = new Float32Array(count)
  const sizes = new Float32Array(count)

  for (let index = 0; index < count; index += 1) {
    const offset = index * 3
    const lane = index % 4
    starts[offset] = mix(-6.15, -4.65, random())
    starts[offset + 1] = mix(-2.65, 2.65, lane / 3) + (random() - 0.5) * 0.4
    starts[offset + 2] = (random() - 0.5) * 1.4

    const node = nodes[Math.floor(random() * nodes.length)]
    const cluster = random() < 0.24 ? 0.16 : 0.48
    network[offset] = node.position.x + (random() - 0.5) * cluster
    network[offset + 1] = node.position.y + (random() - 0.5) * cluster
    network[offset + 2] = node.position.z + (random() - 0.5) * 0.55

    const metric = index % 5
    const metricHeight = 1.2 + metric * 0.72
    final[offset] = mix(-2.8, 2.8, metric / 4) + (random() - 0.5) * 0.46
    final[offset + 1] = -3.15 + random() * metricHeight
    final[offset + 2] = (random() - 0.5) * 0.7
    seeds[index] = random()
    sizes[index] = 0.72 + random() * 1.7
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute("position", new THREE.BufferAttribute(starts, 3))
  geometry.setAttribute("aNetwork", new THREE.BufferAttribute(network, 3))
  geometry.setAttribute("aFinal", new THREE.BufferAttribute(final, 3))
  geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1))
  geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1))
  return geometry
}

function createParticleMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: {
      uProgress: { value: 0 },
      uTime: { value: 0 },
      uPointScale: { value: 1 },
      uOpacity: { value: 1 },
    },
    vertexShader: [
      "uniform float uProgress;", "uniform float uTime;", "uniform float uPointScale;",
      "attribute vec3 aNetwork;", "attribute vec3 aFinal;", "attribute float aSeed;",
      "attribute float aSize;", "varying float vSeed;", "varying float vProgress;",
      "void main() {",
      "float organize = smoothstep(0.08, 0.52, uProgress);",
      "float deploy = smoothstep(0.56, 0.96, uProgress);",
      "vec3 p = mix(position, aNetwork, organize); p = mix(p, aFinal, deploy);",
      "float drift = (1.0 - organize) * (0.16 + aSeed * 0.16);",
      "p.x += sin(uTime * (0.22 + aSeed * 0.22) + aSeed * 19.0) * drift;",
      "p.y += cos(uTime * (0.18 + aSeed * 0.2) + aSeed * 13.0) * drift;",
      "p.z += sin(uTime * 0.16 + aSeed * 31.0) * drift * 0.65;",
      "vec4 mv = modelViewMatrix * vec4(p, 1.0); gl_Position = projectionMatrix * mv;",
      "gl_PointSize = aSize * uPointScale * clamp(72.0 / -mv.z, 2.0, 10.0);",
      "vSeed = aSeed; vProgress = uProgress;",
      "}",
    ].join("\n"),
    fragmentShader: [
      "uniform float uOpacity;", "varying float vSeed;", "varying float vProgress;", "void main() {",
      "vec2 uv = gl_PointCoord - 0.5;",
      "float angle = (vSeed - 0.5) * 1.8;",
      "mat2 rotation = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));",
      "vec2 packetUv = rotation * uv;",
      "float packetDistance = max(abs(packetUv.x) * 0.72, abs(packetUv.y) * 1.9);",
      "float packet = 1.0 - smoothstep(0.25, 0.48, packetDistance);",
      "float d = length(uv);",
      "float core = 1.0 - smoothstep(0.0, 0.18, d);",
      "float halo = 1.0 - smoothstep(0.12, 0.5, d);",
      "vec3 cyan = vec3(0.0, 0.678, 0.925); vec3 teal = vec3(0.11, 0.698, 0.624);",
      "vec3 green = vec3(0.224, 0.71, 0.29);",
      "vec3 color = mix(cyan, teal, smoothstep(0.16, 0.62, vProgress));",
      "color = mix(color, green, smoothstep(0.62, 1.0, vProgress));",
      "color *= 0.82 + vSeed * 0.35;",
      "float neuralShape = core * 0.92 + halo * 0.34;",
      "float alpha = packet * 0.82 * uOpacity;",
      "if (alpha < 0.015) discard; gl_FragColor = vec4(color, alpha);",
      "}",
    ].join("\n"),
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })
}

function createNetworkLines(layers: NetworkNode[][]) {
  const positions: number[] = []
  const edges: Array<[THREE.Vector3, THREE.Vector3]> = []
  for (let layer = 0; layer < layers.length - 1; layer += 1) {
    const current = layers[layer]
    const next = layers[layer + 1]
    current.forEach((node, row) => {
      const projected = Math.round((row / Math.max(1, current.length - 1)) * (next.length - 1))
      const targets = [...new Set([projected - 1, projected, projected + 1].map((target) =>
        clamp(target, 0, next.length - 1)
      ))]
      targets.forEach((targetRow) => {
        const target = next[clamp(targetRow, 0, next.length - 1)]
        positions.push(
          node.position.x, node.position.y, node.position.z,
          target.position.x, target.position.y, target.position.z
        )
        edges.push([node.position, target.position])
      })
    })
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3))
  const material = new THREE.LineBasicMaterial({
    color: 0x39b54a, transparent: true, opacity: 0,
    blending: THREE.AdditiveBlending, depthWrite: false,
  })
  return { lines: new THREE.LineSegments(geometry, material), material, edges }
}

function createGlowPointMaterial(color: number, size: number) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color(color) },
      uOpacity: { value: 0 },
      uSize: { value: size },
    },
    vertexShader: [
      "uniform float uSize;", "void main() {",
      "vec4 mv = modelViewMatrix * vec4(position, 1.0);",
      "gl_Position = projectionMatrix * mv;",
      "gl_PointSize = uSize * clamp(76.0 / -mv.z, 2.0, 13.0);", "}",
    ].join("\n"),
    fragmentShader: [
      "uniform vec3 uColor;", "uniform float uOpacity;", "void main() {",
      "float d = length(gl_PointCoord - 0.5);",
      "float halo = 1.0 - smoothstep(0.12, 0.5, d);",
      "float core = 1.0 - smoothstep(0.0, 0.16, d);",
      "float ring = smoothstep(0.33, 0.27, d) * smoothstep(0.17, 0.23, d);",
      "float alpha = (halo * 0.28 + core * 0.92 + ring * 0.7) * uOpacity;",
      "if (alpha < 0.01) discard; gl_FragColor = vec4(uColor, alpha);", "}",
    ].join("\n"),
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })
}

export function WiqonnScrollWorld() {
  const { lang } = useLanguage()
  const journeyRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const phaseRefs = useRef<(HTMLSpanElement | null)[]>([])
  const chapters = lang === "es"
    ? [
        { eyebrow: "01 / CONTEXTO", title: "Tu dominio y tus datos" },
        { eyebrow: "02 / MODELO", title: "Investigación aplicada" },
        { eyebrow: "03 / PRODUCCIÓN", title: "Un sistema que funciona" },
      ]
    : [
        { eyebrow: "01 / CONTEXT", title: "Your domain and data" },
        { eyebrow: "02 / MODEL", title: "Applied research" },
        { eyebrow: "03 / PRODUCTION", title: "A system that works" },
      ]

  useEffect(() => {
    const journey = journeyRef.current
    const canvas = canvasRef.current
    const rail = railRef.current
    const stage = canvas?.parentElement
    if (!journey || !canvas || !rail || !stage) return

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const coarsePointer = window.matchMedia("(pointer: coarse)")
    let compact = stage.clientWidth <= 768
    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        canvas, alpha: true, antialias: false, powerPreference: "high-performance",
      })
    } catch {
      journey.dataset.webgl = "fallback"
      return
    }

    journey.dataset.webgl = "ready"
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.05
    renderer.setClearColor(0x0a0e1a, 0)

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x0a0e1a, 0.025)
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 80)
    const world = new THREE.Group()
    scene.add(world)

    const { nodes, layers } = createNetworkNodes(compact)
    const particleGeometry = createParticleGeometry(compact ? 520 : 1050, nodes)

    const particleMaterial = createParticleMaterial()
    const particles = new THREE.Points(particleGeometry, particleMaterial)
    particles.frustumCulled = false
    world.add(particles)

    const network = createNetworkLines(layers)
    world.add(network.lines)

    const neuralColors = [0x00adec, 0x10b3d1, 0x1cb29f, 0x2db36f, 0x39b54a]
    const neuronGeometries: THREE.BufferGeometry[] = []
    const neuronMaterials = layers.map((layer, layerIndex) => {
      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(layer.flatMap((node) => node.position.toArray()), 3)
      )
      const material = createGlowPointMaterial(neuralColors[layerIndex], 2.05)
      neuronGeometries.push(geometry)
      world.add(new THREE.Points(geometry, material))
      return material
    })

    const pulseCount = compact ? 10 : 18
    const pulsePositions = new Float32Array(pulseCount * 3)
    const pulseGeometry = new THREE.BufferGeometry()
    const pulsePosition = new THREE.BufferAttribute(pulsePositions, 3)
    pulseGeometry.setAttribute("position", pulsePosition)
    const pulseMaterial = createGlowPointMaterial(0x8bdce4, 0.8)
    const pulses = new THREE.Points(pulseGeometry, pulseMaterial)
    pulses.frustumCulled = false
    world.add(pulses)

    const output = new THREE.Group()
    const metricHeights = [1.2, 1.92, 2.64, 3.36, 4.08]
    const outputFillMaterial = new THREE.MeshBasicMaterial({
      color: 0x39b54a, transparent: true, opacity: 0, depthWrite: false,
    })
    const outputLineMaterial = new THREE.LineBasicMaterial({
      color: 0x8bdce4, transparent: true, opacity: 0,
      blending: THREE.AdditiveBlending, depthWrite: false,
    })
    const outputGeometries: THREE.BufferGeometry[] = []
    metricHeights.forEach((height, index) => {
      const x = mix(-2.8, 2.8, index / (metricHeights.length - 1))
      const box = new THREE.BoxGeometry(0.72, height, 0.72)
      const edges = new THREE.EdgesGeometry(box)
      const fill = new THREE.Mesh(box, outputFillMaterial)
      const outline = new THREE.LineSegments(edges, outputLineMaterial)
      fill.position.set(x, -3.15 + height / 2, 0)
      outline.position.copy(fill.position)
      output.add(fill, outline)
      outputGeometries.push(box, edges)
    })
    const metricPathGeometry = new THREE.BufferGeometry().setFromPoints(
      metricHeights.map((height, index) => new THREE.Vector3(
        mix(-2.8, 2.8, index / (metricHeights.length - 1)),
        -3.15 + height,
        0.48
      ))
    )
    const metricPathMaterial = new THREE.LineBasicMaterial({
      color: 0x39b54a, transparent: true, opacity: 0,
      blending: THREE.AdditiveBlending, depthWrite: false,
    })
    output.add(new THREE.Line(metricPathGeometry, metricPathMaterial))
    world.add(output)

    const grid = new THREE.GridHelper(34, 34, 0x1cb29f, 0x163a48)
    const gridMaterial = grid.material as THREE.LineBasicMaterial
    gridMaterial.transparent = true
    gridMaterial.opacity = 0.1
    grid.position.y = -4.2
    grid.position.z = -2
    world.add(grid)

    let targetProgress = 0
    let displayProgress = 0
    let frameId = 0
    let lastFrame = performance.now()
    let lastRender = 0
    let running = false
    let visible = true

    const resize = () => {
      const width = Math.max(1, stage.clientWidth)
      const height = Math.max(1, stage.clientHeight)
      compact = width <= 768
      const dprCap = compact || coarsePointer.matches ? 1.25 : 1.7
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, dprCap))
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.fov = compact ? 49 : 42
      camera.updateProjectionMatrix()
      particleMaterial.uniforms.uPointScale.value = compact ? 0.78 : 1
      neuronMaterials.forEach((material) => {
        material.uniforms.uSize.value = compact ? 1.55 : 2.05
      })
      pulseMaterial.uniforms.uSize.value = compact ? 0.7 : 0.92
      world.position.set(compact ? 0 : 2.45, compact ? 2.1 : 0.15, 0)
    }

    const readProgress = () => {
      if (reducedMotion.matches) {
        targetProgress = 0.58
        return
      }
      const rect = journey.getBoundingClientRect()
      const scrollable = Math.max(1, journey.offsetHeight - window.innerHeight)
      targetProgress = clamp(-rect.top / scrollable)
    }

    const updateInterface = (progress: number) => {
      journey.style.setProperty("--journey-progress", progress.toFixed(4))
      rail.style.transform = "scaleX(" + progress.toFixed(4) + ")"
      const starts = [0.27, 0.5, 0.73]
      const ends = [0.5, 0.73, 0.99]
      phaseRefs.current.forEach((phase, index) => {
        if (!phase) return
        const enter = smoothstep(starts[index], starts[index] + 0.08, progress)
        const exit = 1 - smoothstep(ends[index] - 0.08, ends[index], progress)
        const opacity = enter * exit
        phase.style.visibility = opacity > 0.01 ? "visible" : "hidden"
        phase.style.opacity = opacity.toFixed(3)
        phase.style.transform = "translate3d(0," + ((1 - enter) * 24).toFixed(1) + "px,0)"
      })
    }

    const render = (now: number, delta: number) => {
      const progress = displayProgress
      const organize = smoothstep(0.12, 0.55, progress)
      const deploy = smoothstep(0.56, 0.96, progress)
      const heroNetworkPresence = (1 - smoothstep(0.18, 0.38, progress)) * 0.62
      const appliedNetworkPresence = smoothstep(0.32, 0.5, progress) * (1 - smoothstep(0.7, 0.8, progress))
      const dataPresence = 1 - smoothstep(0.34, 0.48, progress)
      const metricDataPresence = smoothstep(0.72, 0.86, progress)
      const particlePresence = Math.max(dataPresence, metricDataPresence)
      const networkPresence = Math.max(heroNetworkPresence, appliedNetworkPresence)
      const outputPresence = smoothstep(0.7, 0.88, progress)
      particleMaterial.uniforms.uProgress.value = progress
      particleMaterial.uniforms.uTime.value = reducedMotion.matches ? 8.4 : now * 0.001
      particleMaterial.uniforms.uOpacity.value = particlePresence
      network.material.opacity = networkPresence * 0.68
      neuronMaterials.forEach((material) => {
        material.uniforms.uOpacity.value = Math.min(1, networkPresence * 1.08)
      })
      pulseMaterial.uniforms.uOpacity.value = networkPresence * 0.96

      if (networkPresence > 0.01) {
        for (let index = 0; index < pulseCount; index += 1) {
          const edge = network.edges[index % network.edges.length]
          const pulseProgress = reducedMotion.matches
            ? (index + 1) / (pulseCount + 1)
            : (now * 0.00024 + index / pulseCount) % 1
          const offset = index * 3
          pulsePositions[offset] = mix(edge[0].x, edge[1].x, pulseProgress)
          pulsePositions[offset + 1] = mix(edge[0].y, edge[1].y, pulseProgress)
          pulsePositions[offset + 2] = mix(edge[0].z, edge[1].z, pulseProgress)
        }
        pulsePosition.needsUpdate = true
      }

      outputFillMaterial.opacity = outputPresence * 0.08
      outputLineMaterial.opacity = outputPresence * 0.72
      metricPathMaterial.opacity = outputPresence * 0.9
      output.position.y = (1 - outputPresence) * -0.35
      particles.rotation.y = -0.08 + organize * 0.08 + deploy * 0.12
      gridMaterial.opacity = 0.045 + organize * 0.11
      grid.position.z = -2 + progress * 2.5
      camera.position.set(
        mix(-0.65, 0.75, progress),
        mix(compact ? 1.4 : 0.65, compact ? 2.35 : 1.2, progress),
        mix(compact ? 15.8 : 14.2, compact ? 13.4 : 11.4, progress)
      )
      camera.lookAt(
        mix(compact ? 0 : 1.15, compact ? 1.8 : 3.15, progress),
        compact ? 1.05 : 0.15,
        0
      )
      updateInterface(progress)
      renderer.render(scene, camera)
    }

    const tick = (now: number) => {
      if (!running) return
      const frameInterval = compact || coarsePointer.matches ? 30 : 16
      if (!document.hidden && now - lastRender >= frameInterval) {
        const delta = Math.min((now - lastFrame) / 1000, 1 / 30)
        lastFrame = now
        lastRender = now
        displayProgress = reducedMotion.matches
          ? targetProgress
          : damp(displayProgress, targetProgress, 5.2, delta)
        render(now, delta)
      }
      frameId = window.requestAnimationFrame(tick)
    }

    const start = () => {
      if (reducedMotion.matches) {
        displayProgress = targetProgress
        render(performance.now(), 0)
        return
      }
      if (running || document.hidden || !visible) return
      running = true
      lastFrame = performance.now()
      frameId = window.requestAnimationFrame(tick)
    }
    const stop = () => {
      running = false
      window.cancelAnimationFrame(frameId)
    }
    const handleVisibility = () => {
      if (document.hidden) stop()
      else start()
    }
    const handleMotionChange = () => {
      readProgress()
      stop()
      start()
    }
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) { readProgress(); start() } else stop()
      },
      { rootMargin: "180px" }
    )
    const resizeObserver = new ResizeObserver(resize)

    resize()
    readProgress()
    intersectionObserver.observe(journey)
    resizeObserver.observe(stage)
    window.addEventListener("scroll", readProgress, { passive: true })
    reducedMotion.addEventListener("change", handleMotionChange)
    coarsePointer.addEventListener("change", resize)
    document.addEventListener("visibilitychange", handleVisibility)
    start()

    return () => {
      stop()
      intersectionObserver.disconnect()
      resizeObserver.disconnect()
      window.removeEventListener("scroll", readProgress)
      reducedMotion.removeEventListener("change", handleMotionChange)
      coarsePointer.removeEventListener("change", resize)
      document.removeEventListener("visibilitychange", handleVisibility)
      particleGeometry.dispose()
      particleMaterial.dispose()
      network.lines.geometry.dispose()
      network.material.dispose()
      neuronGeometries.forEach((geometry) => geometry.dispose())
      neuronMaterials.forEach((material) => material.dispose())
      pulseGeometry.dispose()
      pulseMaterial.dispose()
      outputGeometries.forEach((geometry) => geometry.dispose())
      outputFillMaterial.dispose()
      outputLineMaterial.dispose()
      metricPathGeometry.dispose()
      metricPathMaterial.dispose()
      grid.geometry.dispose()
      gridMaterial.dispose()
      renderer.dispose()
      delete journey.dataset.webgl
    }
  }, [])

  return (
    <section ref={journeyRef} id="journey" className="cinematic-journey">
      <div className="cinematic-stage">
        <canvas ref={canvasRef} className="cinematic-canvas" aria-hidden="true" />
        <div className="cinematic-scrim" aria-hidden="true" />
        <LightTunnel className="cinematic-tunnel" />
        <div className="cinematic-grid" aria-hidden="true" />
        <HeroSection />
        <div className="cinematic-world-mark" aria-hidden="true">
          <span>WIQONN / LIVE SYSTEM</span>
          <div><i /> DATA <i /> MODEL <i /> PROD</div>
        </div>
        <div className="cinematic-phases" aria-hidden="true">
          {chapters.map((chapter, index) => (
            <span
              key={chapter.eyebrow}
              ref={(element) => { phaseRefs.current[index] = element }}
              className="cinematic-phase"
            >
              <small>{chapter.eyebrow}</small>
              <span className="cinematic-phase-copy">{chapter.title}</span>
            </span>
          ))}
        </div>
        <div className="cinematic-progress" aria-hidden="true">
          <span>{lang === "es" ? "Explora" : "Explore"}</span>
          <div className="cinematic-progress-track">
            <div ref={railRef} className="cinematic-progress-rail" />
          </div>
        </div>
      </div>
    </section>
  )
}
