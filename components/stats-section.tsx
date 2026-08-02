"use client"

import { useEffect, useRef, useState } from "react"
import { useT } from "@/components/language-provider"

// Compromisos de servicio verificables: diagnóstico 30 min, respuesta 24 h,
// propuesta 48 h hábiles, KPI desde el día uno. Cero cifras inventadas.
const STATS = [
  { value: "30", suffix: " min", animate: false },
  { value: "24", suffix: " h", animate: false },
  { value: "48", suffix: " h", animate: false },
  { value: "1", suffix: "", animate: true },
]

const COUNT_DURATION_MS = 1500

/** easeOutCubic: decelerates towards the end of the animation. */
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

/** Live `prefers-reduced-motion` subscription (safe on the server). */
function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() => {
    if (typeof window === "undefined") return false
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
  })

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches)
    setReduced(mq.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  return reduced
}

function AnimatedStat({ end, reduced }: { end: number; reduced: boolean }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (reduced) {
      setCount(end)
      return
    }

    let rafId: number | null = null
    let started = false

    const animate = () => {
      const startTime = performance.now()
      const step = (now: number) => {
        const progress = Math.min((now - startTime) / COUNT_DURATION_MS, 1)
        setCount(Math.round(end * easeOutCubic(progress)))
        if (progress < 1) rafId = requestAnimationFrame(step)
      }
      rafId = requestAnimationFrame(step)
    }

    if (typeof IntersectionObserver === "undefined") {
      animate()
      return () => {
        if (rafId !== null) cancelAnimationFrame(rafId)
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (started || !entries.some((entry) => entry.isIntersecting)) return
        started = true
        observer.disconnect()
        animate()
      },
      { threshold: 0.3 }
    )
    observer.observe(element)

    return () => {
      observer.disconnect()
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [end, reduced])

  return <span ref={ref}>{count.toLocaleString()}</span>
}

function StatValue({ stat, reduced }: { stat: { value: string; suffix: string; animate: boolean }; reduced: boolean }) {
  if (!stat.animate) {
    return (
      <span>
        {stat.value}
        {stat.suffix}
      </span>
    )
  }
  return (
    <span>
      <AnimatedStat end={Number(stat.value)} reduced={reduced} />
      {stat.suffix}
    </span>
  )
}

export function StatsSection() {
  const t = useT()
  const sectionRef = useRef<HTMLElement>(null)
  const revealRefs = useRef<(HTMLDivElement | null)[]>([])
  const revealedRef = useRef(false)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const reveal = () => {
      revealRefs.current.forEach((element) =>
        element?.classList.add("reveal-in")
      )
    }

    if (reduced || typeof IntersectionObserver === "undefined") {
      reveal()
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (revealedRef.current || !entries.some((entry) => entry.isIntersecting))
          return
        revealedRef.current = true
        observer.disconnect()
        reveal()
      },
      { threshold: 0.15 }
    )
    observer.observe(section)

    return () => observer.disconnect()
  }, [reduced])

  return (
    <section
      ref={sectionRef}
      className="relative bg-background-navy py-16 md:py-24 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 pointer-events-none"
      />

      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-4 text-center mb-4">
            <h2 className="text-3xl md:text-5xl font-bold text-balance text-foreground">
              {t.stats.titlePre}
              <span className="text-gradient-wiqonn">{t.stats.titleAccent}</span>
            </h2>
            <p className="text-lg text-muted-foreground mt-4">
              {t.stats.subtitle}
            </p>
          </div>

          {STATS.map((stat, index) => (
            <div
              key={t.stats.labels[index]}
              ref={(element: HTMLDivElement | null) => {
                revealRefs.current[index] = element
              }}
              className="reveal text-center"
            >
              <div className="text-6xl md:text-7xl font-bold text-primary mb-3">
                <StatValue stat={stat} reduced={reduced} />
              </div>
              <p className="text-base md:text-lg text-muted-foreground text-pretty max-w-xs mx-auto">
                {t.stats.labels[index]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection
