"use client"

import { type CSSProperties, useEffect, useRef, useState } from "react"
import { useT } from "@/components/language-provider"

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches)
    setReduced(mq.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  return reduced
}

export function StatsSection() {
  const t = useT()
  const sectionRef = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()
  const [active, setActive] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    if (reduced || typeof IntersectionObserver === "undefined") {
      setActive(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        setActive(true)
        observer.disconnect()
      },
      { threshold: 0.22 }
    )
    observer.observe(section)

    return () => observer.disconnect()
  }, [reduced])

  return (
    <section
      ref={sectionRef}
      data-active={active}
      className="relative bg-background-navy py-16 md:py-24 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 pointer-events-none"
      />

      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-14 md:mb-20">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary mb-4">
              {t.stats.eyebrow}
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-balance text-foreground">
              {t.stats.titlePre}
              <span className="text-gradient-wiqonn">{t.stats.titleAccent}</span>
            </h2>
            <p className="text-lg text-muted-foreground text-pretty leading-relaxed mt-5">
              {t.stats.subtitle}
            </p>
          </div>

          <div className="impact-journey">
            <div className="impact-journey__rail" aria-hidden="true">
              <span className="impact-journey__progress" />
              <span className="impact-journey__signal" />
            </div>

            <ol className="impact-journey__steps">
              {t.stats.items.map((item, index) => (
                <li
                  key={item.title}
                  className="impact-journey__step"
                  style={{ "--phase-delay": `${240 + index * 260}ms` } as CSSProperties}
                >
                  <div className="impact-journey__marker" aria-hidden="true">
                    <span />
                  </div>
                  <p className="impact-journey__number" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground text-balance">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm md:text-base leading-relaxed text-muted-foreground text-pretty">
                    {item.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StatsSection
