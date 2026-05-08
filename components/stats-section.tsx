"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { AnimatedCounter } from "./animated-counter"

gsap.registerPlugin(ScrollTrigger)

export function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const stats = [
    { value: 50, suffix: "+", label: "Projects Delivered" },
    { value: 98, suffix: "%", label: "Client Satisfaction" },
    { value: 2, prefix: "$", suffix: "M+", label: "Cost Savings Generated" },
    { value: 15, suffix: "+", label: "Years Experience" },
  ]

  useEffect(() => {
    const section = sectionRef.current
    const container = containerRef.current
    if (!section || !container) return

    // Horizontal scroll animation
    const scrollWidth = container.scrollWidth - window.innerWidth

    if (window.innerWidth >= 768) {
      gsap.to(container, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-r from-[#0a0a0a] via-[#0d1117] to-[#0a0a0a] overflow-hidden"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />

      <div
        ref={containerRef}
        className="flex items-center min-h-[60vh] md:min-h-screen px-8 md:px-0"
      >
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-0 py-16 md:py-0 w-full md:w-auto">
          {/* Title */}
          <div className="md:min-w-[50vw] flex items-center justify-center px-8">
            <div className="text-center md:text-left max-w-xl">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                Proven <span className="text-gradient-wiqonn">Results</span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground">
                Numbers that speak for themselves
              </p>
            </div>
          </div>

          {/* Stats */}
          {stats.map((stat, index) => (
            <div
              key={index}
              className="md:min-w-[40vw] flex items-center justify-center px-8"
            >
              <div className="text-center group cursor-default">
                <div className="text-6xl md:text-8xl lg:text-9xl font-bold text-gradient-wiqonn mb-4 transition-transform duration-300 group-hover:scale-105">
                  <AnimatedCounter
                    end={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    duration={2.5}
                  />
                </div>
                <p className="text-lg md:text-xl text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
