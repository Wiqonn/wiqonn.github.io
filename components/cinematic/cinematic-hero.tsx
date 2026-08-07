"use client"

import { useEffect, useRef } from "react"
import { HeroSection } from "@/components/hero-section"
import { LightTunnel } from "@/components/cinematic/light-tunnel"
import { useLanguage, useT } from "@/components/language-provider"

type GraphNode = {
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
  radius: number
  parents: number[]
  skipParents: number[]
  layer: number
  layerProgress: number
  strength: number
}

const CYAN = [0, 173, 236] as const
const TEAL = [28, 178, 159] as const
const GREEN = [57, 181, 74] as const

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value))

const smoothstep = (start: number, end: number, value: number) => {
  const t = clamp((value - start) / Math.max(0.0001, end - start))
  return t * t * (3 - 2 * t)
}

const mix = (a: number, b: number, amount: number) => a + (b - a) * amount

const seeded = (seed: number) => {
  const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  return value - Math.floor(value)
}

function colorAt(position: number) {
  const firstHalf = position <= 0.5
  const amount = firstHalf ? position * 2 : (position - 0.5) * 2
  const from = firstHalf ? CYAN : TEAL
  const to = firstHalf ? TEAL : GREEN
  return [
    Math.round(mix(from[0], to[0], amount)),
    Math.round(mix(from[1], to[1], amount)),
    Math.round(mix(from[2], to[2], amount)),
  ] as const
}

function createGraph(width: number, height: number) {
  const mobile = width <= 768
  const layerSizes = mobile ? [3, 5, 7, 6, 4] : [4, 7, 11, 13, 10, 7, 3]
  const networkStart = mobile ? 0.08 : 0.49
  const networkEnd = mobile ? 0.94 : 0.965
  const networkTop = mobile ? 0.09 : 0.11
  const networkBottom = mobile ? 0.72 : 0.89
  const nodes: GraphNode[] = []
  const layers: number[][] = []

  layerSizes.forEach((layerSize, layer) => {
    const layerNodes: number[] = []
    const layerProgress = layer / (layerSizes.length - 1)

    for (let row = 0; row < layerSize; row += 1) {
      const index = nodes.length
      const verticalProgress = layerSize === 1 ? 0.5 : row / (layerSize - 1)
      const jitterX = (seeded(index * 3.17) - 0.5) * width * 0.018
      const jitterY = (seeded(index * 5.91) - 0.5) * height * 0.045
      const previousLayer = layers[layer - 1] ?? []
      const parents: number[] = []
      const skipParents: number[] = []

      if (previousLayer.length > 0) {
        const projected = Math.round(verticalProgress * (previousLayer.length - 1))
        const connectionCount = Math.min(
          previousLayer.length,
          mobile ? (layer % 2 === 0 ? 3 : 2) : layer % 2 === 0 ? 4 : 3
        )

        for (let connection = 0; connection < connectionCount; connection += 1) {
          const spread = connection === 0 ? 0 : connection % 2 === 0 ? -Math.ceil(connection / 2) : Math.ceil(connection / 2)
          const parentRow = Math.min(previousLayer.length - 1, Math.max(0, projected + spread))
          const parent = previousLayer[parentRow]
          if (!parents.includes(parent)) parents.push(parent)
        }
      }

      const residualLayer = layers[layer - 2] ?? []
      if (!mobile && residualLayer.length > 0 && (index + layer) % 3 === 0) {
        const residualRow = Math.round(verticalProgress * (residualLayer.length - 1))
        skipParents.push(residualLayer[residualRow])
      }

      const targetX = width * mix(networkStart, networkEnd, layerProgress) + jitterX
      const targetY = height * mix(networkTop, networkBottom, verticalProgress) + jitterY
      const sourceSpreadX = width * (mobile ? 0.045 : 0.024)
      const sourceSpreadY = height * (mobile ? 0.08 : 0.095)

      nodes.push({
        sourceX: targetX + (seeded(index * 2.13 + 9) - 0.5) * sourceSpreadX,
        sourceY: targetY + (seeded(index * 4.71 + 3) - 0.5) * sourceSpreadY,
        targetX,
        targetY,
        radius: (mobile ? 1.4 : 1.7) + seeded(index * 8.9) * (mobile ? 1.25 : 1.65),
        parents,
        skipParents,
        layer,
        layerProgress,
        strength: 0.72 + seeded(index * 11.7 + 4) * 0.28,
      })
      layerNodes.push(index)
    }

    layers.push(layerNodes)
  })

  return { nodes, layers }
}

export function CinematicHero() {
  const t = useT()
  const { lang } = useLanguage()
  const journeyRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const phaseRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const journey = journeyRef.current
    const canvas = canvasRef.current
    const rail = railRef.current
    const context = canvas?.getContext("2d")
    if (!journey || !canvas || !rail || !context) return

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const coarsePointer = window.matchMedia("(pointer: coarse)")
    let nodes: GraphNode[] = []
    let width = 0
    let height = 0
    let dpr = 1
    let targetProgress = 0
    let displayProgress = 0
    let animationFrame = 0
    let visible = true
    let running = false
    let lastFrame = 0
    let layerCount = 1
    let compactCanvas = false

    const resize = () => {
      width = Math.max(1, canvas.clientWidth)
      height = Math.max(1, canvas.clientHeight)
      compactCanvas = width <= 768
      dpr = Math.min(window.devicePixelRatio || 1, compactCanvas ? 1.35 : 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      const graph = createGraph(width, height)
      nodes = graph.nodes
      layerCount = graph.layers.length
    }

    const readProgress = () => {
      if (reducedMotion.matches) {
        targetProgress = 0.72
        return
      }

      const rect = journey.getBoundingClientRect()
      const scrollable = Math.max(1, journey.offsetHeight - window.innerHeight)
      targetProgress = clamp(-rect.top / scrollable)
    }

    const draw = (progress: number, now: number) => {
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      context.clearRect(0, 0, width, height)

      const assembly = 0.76 + smoothstep(0.02, 0.6, progress) * 0.24
      const signalStrength = 0.34 + smoothstep(0.08, 0.7, progress) * 0.66
      const cameraScale = 0.985 + progress * 0.045
      const cycle = reducedMotion.matches ? 0.72 : (now * 0.000135) % 1
      context.save()
      context.translate(width * 0.5, height * 0.5)
      context.scale(cameraScale, cameraScale)
      context.translate(-width * 0.5, -height * 0.5)

      const positions = nodes.map((node) => ({
        x: mix(node.sourceX, node.targetX, assembly),
        y: mix(node.sourceY, node.targetY, assembly),
      }))

      const pointOnCurve = (
        from: { x: number; y: number },
        controlX: number,
        controlY: number,
        to: { x: number; y: number },
        amount: number
      ) => {
        const inverse = 1 - amount
        return {
          x: inverse * inverse * from.x + 2 * inverse * amount * controlX + amount * amount * to.x,
          y: inverse * inverse * from.y + 2 * inverse * amount * controlY + amount * amount * to.y,
        }
      }

      const drawSynapse = (
        parentIndex: number,
        nodeIndex: number,
        connectionIndex: number,
        residual = false
      ) => {
        const parent = nodes[parentIndex]
        const node = nodes[nodeIndex]
        const from = positions[parentIndex]
        const to = positions[nodeIndex]
        const color = colorAt(node.layerProgress)
        const controlX = mix(from.x, to.x, residual ? 0.42 : 0.5)
        const controlY =
          (from.y + to.y) * 0.5 +
          Math.sin(nodeIndex * 1.73 + connectionIndex * 2.4) * height * (residual ? 0.035 : 0.016)
        const baseAlpha = residual ? 0.028 : 0.105
        const activeAlpha = residual ? 0.11 : 0.34
        const alpha = (baseAlpha + activeAlpha * signalStrength) * node.strength

        context.beginPath()
        context.moveTo(from.x, from.y)
        context.quadraticCurveTo(controlX, controlY, to.x, to.y)
        if (compactCanvas) {
          context.strokeStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha * 0.78})`
        } else {
          const gradient = context.createLinearGradient(from.x, from.y, to.x, to.y)
          gradient.addColorStop(0, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha * 0.35})`)
          gradient.addColorStop(0.55, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`)
          gradient.addColorStop(1, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha * 0.72})`)
          context.strokeStyle = gradient
        }
        context.lineWidth = residual ? 0.5 : 0.72 + signalStrength * 0.62
        context.stroke()

        if (residual || reducedMotion.matches || (nodeIndex + connectionIndex * 3) % 3 !== 0) return

        const edgeStart = parent.layerProgress
        const edgeEnd = node.layerProgress
        const waves = [cycle, (cycle + 0.48) % 1]
        waves.forEach((wave) => {
          if (wave < edgeStart - 0.025 || wave > edgeEnd + 0.025) return
          const pulse = clamp((wave - edgeStart) / Math.max(0.001, edgeEnd - edgeStart))
          const point = pointOnCurve(from, controlX, controlY, to, pulse)
          const pulseRadius = 1.15 + signalStrength * 1.55

          context.save()
          context.globalCompositeOperation = "lighter"
          context.beginPath()
          context.arc(point.x, point.y, pulseRadius * (compactCanvas ? 1.15 : 3.2), 0, Math.PI * 2)
          if (compactCanvas) {
            context.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${0.78 * signalStrength})`
          } else {
            const glow = context.createRadialGradient(
              point.x,
              point.y,
              0,
              point.x,
              point.y,
              pulseRadius * 3.2
            )
            glow.addColorStop(0, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${0.86 * signalStrength})`)
            glow.addColorStop(1, `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0)`)
            context.fillStyle = glow
          }
          context.fill()
          context.restore()
        })
      }

      nodes.forEach((node, nodeIndex) => {
        node.skipParents.forEach((parentIndex, connectionIndex) =>
          drawSynapse(parentIndex, nodeIndex, connectionIndex, true)
        )
      })

      nodes.forEach((node, nodeIndex) => {
        node.parents.forEach((parentIndex, connectionIndex) =>
          drawSynapse(parentIndex, nodeIndex, connectionIndex)
        )
      })

      const inputNodes = nodes.filter((node) => node.layer === 0)
      inputNodes.forEach((node, index) => {
        const to = positions[nodes.indexOf(node)]
        const from = {
          x: to.x - width * (width < 768 ? 0.13 : 0.085),
          y: to.y + Math.sin(index * 2.1) * height * 0.045,
        }
        const controlX = mix(from.x, to.x, 0.55)
        const controlY = mix(from.y, to.y, 0.5) + Math.cos(index * 1.8) * height * 0.025
        context.beginPath()
        context.moveTo(from.x, from.y)
        context.quadraticCurveTo(controlX, controlY, to.x, to.y)
        context.strokeStyle = `rgba(${CYAN[0]}, ${CYAN[1]}, ${CYAN[2]}, ${0.11 + signalStrength * 0.22})`
        context.lineWidth = 0.75 + signalStrength * 0.5
        context.stroke()

        if (!reducedMotion.matches) {
          const pulse = (now * 0.00018 + index * 0.23) % 1
          const point = pointOnCurve(from, controlX, controlY, to, pulse)
          context.beginPath()
          context.arc(point.x, point.y, 1.2 + signalStrength, 0, Math.PI * 2)
          context.fillStyle = `rgba(${CYAN[0]}, ${CYAN[1]}, ${CYAN[2]}, ${0.55 + signalStrength * 0.35})`
          context.fill()
        }
      })

      nodes.forEach((node, index) => {
        const position = positions[index]
        const color = colorAt(node.layerProgress)
        const firstWaveDistance = Math.abs(cycle - node.layerProgress)
        const secondWaveDistance = Math.abs(((cycle + 0.48) % 1) - node.layerProgress)
        const waveDistance = Math.min(
          firstWaveDistance,
          1 - firstWaveDistance,
          secondWaveDistance,
          1 - secondWaveDistance
        )
        const activation = reducedMotion.matches ? 0.18 : 1 - smoothstep(0.015, 0.09, waveDistance)
        const reveal = 0.72 + signalStrength * 0.2
        const nodeRadius = node.radius * (0.92 + activation * 0.55)

        context.beginPath()
        context.arc(position.x, position.y, nodeRadius * (2.7 + activation * 1.2), 0, Math.PI * 2)
        context.strokeStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${0.12 + activation * 0.32})`
        context.lineWidth = 0.7 + activation * 0.55
        context.stroke()

        context.beginPath()
        context.arc(position.x, position.y, nodeRadius * 1.65, 0, Math.PI * 2)
        context.fillStyle = "rgba(7, 15, 27, 0.9)"
        context.fill()

        context.beginPath()
        context.arc(position.x, position.y, nodeRadius, 0, Math.PI * 2)
        context.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${reveal})`
        context.shadowBlur = compactCanvas ? activation * 7 : 8 + activation * 18
        context.shadowColor = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.65)`
        context.fill()
        context.shadowBlur = 0
      })

      const outputNodes = nodes.filter((node) => node.layer === layerCount - 1)
      const outputPoint = { x: width * 0.995, y: height * 0.5 }
      outputNodes.forEach((node, index) => {
        const from = positions[nodes.indexOf(node)]
        const controlX = mix(from.x, outputPoint.x, 0.56)
        const controlY = mix(from.y, outputPoint.y, 0.5)
        context.beginPath()
        context.moveTo(from.x, from.y)
        context.quadraticCurveTo(controlX, controlY, outputPoint.x, outputPoint.y)
        context.strokeStyle = `rgba(${GREEN[0]}, ${GREEN[1]}, ${GREEN[2]}, ${0.12 + signalStrength * 0.28})`
        context.lineWidth = 0.8 + signalStrength * 0.65
        context.stroke()

        if (!reducedMotion.matches) {
          const pulse = (now * 0.00016 + index * 0.27) % 1
          const point = pointOnCurve(from, controlX, controlY, outputPoint, pulse)
          context.beginPath()
          context.arc(point.x, point.y, 1.25 + signalStrength, 0, Math.PI * 2)
          context.fillStyle = `rgba(${GREEN[0]}, ${GREEN[1]}, ${GREEN[2]}, ${0.52 + signalStrength * 0.38})`
          context.fill()
        }
      })

      if (!compactCanvas) {
        const outputGlow = context.createRadialGradient(
          outputPoint.x,
          outputPoint.y,
          0,
          outputPoint.x,
          outputPoint.y,
          width * 0.09
        )
        outputGlow.addColorStop(0, `rgba(${GREEN[0]}, ${GREEN[1]}, ${GREEN[2]}, ${0.13 + signalStrength * 0.12})`)
        outputGlow.addColorStop(1, `rgba(${GREEN[0]}, ${GREEN[1]}, ${GREEN[2]}, 0)`)
        context.fillStyle = outputGlow
        context.fillRect(outputPoint.x - width * 0.09, outputPoint.y - width * 0.09, width * 0.18, width * 0.18)
      }

      context.restore()

      journey.style.setProperty("--journey-progress", progress.toFixed(4))
      rail.style.transform = `scaleX(${progress})`

      const phaseStarts = [0.28, 0.5, 0.72]
      const phaseEnds = [0.5, 0.72, 0.96]
      const activePhase = phaseStarts.findIndex(
        (start, index) => progress >= start && progress < phaseEnds[index]
      )

      phaseRefs.current.forEach((phase, phaseIndex) => {
        if (!phase) return
        const active = phaseIndex === activePhase
        phase.style.visibility = active ? "visible" : "hidden"
        phase.style.opacity = active ? "1" : "0"
        if (!active) return

        const localProgress = clamp(
          (progress - phaseStarts[phaseIndex]) /
            (phaseEnds[phaseIndex] - phaseStarts[phaseIndex])
        )
        const words = phase.querySelectorAll<HTMLElement>(".cinematic-phase-word")
        words.forEach((word, wordIndex) => {
          const reveal = smoothstep(
            0.01 + wordIndex * 0.045,
            0.25 + wordIndex * 0.055,
            localProgress
          )
          const exit = 1 - smoothstep(0.88, 0.99, localProgress)
          const opacity = reveal * exit
          word.style.opacity = opacity.toFixed(3)
          word.style.transform = `translate3d(${(1 - reveal) * 58}px, ${(1 - reveal) * 25}px, 0) scale(${0.99 + reveal * 0.01})`
        })
      })
    }

    const tick = (now: number) => {
      if (!running) return
      const frameInterval = compactCanvas ? 20 : 28
      if (!document.hidden && now - lastFrame >= frameInterval) {
        lastFrame = now
        const ease = compactCanvas ? 0.24 : coarsePointer.matches ? 0.18 : 0.12
        displayProgress += (targetProgress - displayProgress) * ease
        if (Math.abs(targetProgress - displayProgress) < 0.0005) {
          displayProgress = targetProgress
        }
        draw(displayProgress, now)
      }
      animationFrame = window.requestAnimationFrame(tick)
    }

    const start = () => {
      if (reducedMotion.matches) {
        displayProgress = targetProgress
        draw(displayProgress, performance.now())
        return
      }
      if (running || document.hidden) return
      running = true
      animationFrame = window.requestAnimationFrame(tick)
    }

    const stop = () => {
      running = false
      window.cancelAnimationFrame(animationFrame)
    }

    const handleVisibility = () => {
      if (document.hidden) stop()
      else if (visible) start()
    }

    const handleMotionChange = () => {
      readProgress()
      stop()
      if (visible) start()
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) {
          readProgress()
          start()
        } else {
          stop()
        }
      },
      { rootMargin: "200px" }
    )

    resize()
    readProgress()
    observer.observe(journey)
    window.addEventListener("scroll", readProgress, { passive: true })
    window.addEventListener("resize", resize)
    coarsePointer.addEventListener("change", readProgress)
    reducedMotion.addEventListener("change", handleMotionChange)
    document.addEventListener("visibilitychange", handleVisibility)
    start()

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", readProgress)
      window.removeEventListener("resize", resize)
      reducedMotion.removeEventListener("change", handleMotionChange)
      coarsePointer.removeEventListener("change", readProgress)
      document.removeEventListener("visibilitychange", handleVisibility)
      stop()
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

        <div className="cinematic-phases" aria-hidden="true">
          {t.hero.rotator.slice(0, 3).map((phrase, index) => {
            const words = phrase.split(" ")
            return (
              <span
                key={phrase}
                ref={(element) => {
                  phaseRefs.current[index] = element
                }}
                className="cinematic-phase"
              >
                <small>0{index + 1}</small>
                <span className="cinematic-phase-copy">
                  {words.map((word, wordIndex) => (
                    <span key={`${word}-${wordIndex}`} className="cinematic-phase-word">
                      {word}
                      {wordIndex < words.length - 1 ? "\u00a0" : ""}
                    </span>
                  ))}
                </span>
              </span>
            )
          })}
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
