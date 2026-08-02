"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useT } from "@/components/language-provider"
import { NeuralNetworkBackground } from "@/components/neural-network-bg"
import { BookingButton } from "@/components/booking-button"

gsap.registerPlugin(ScrollTrigger)

// Faster staggered load reveal: only sets the delays; the actual motion
// lives in the global `.reveal` / `.reveal-in` utilities (which also handle
// `prefers-reduced-motion` via media query).
const REVEAL_DELAYS = {
  headline: 0,
  subheadline: 70,
  cta: 150,
  trust: 260,
}

// Word rotator cadence (ms).
const ROTATOR_INTERVAL = 2800 // time each word stays visible
const ROTATOR_FADE = 350 // fade-out before swapping (half of the 700ms CSS transition)

export function HeroSection() {
  const t = useT()

  const heroRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subheadlineRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const trustRef = useRef<HTMLParagraphElement>(null)

  // Rotating keyword: index into t.hero.rotator + visibility flag for the
  // fade/translateY swap. Starts visible with the first word (no initial
  // animation) and stays static under prefers-reduced-motion.
  const [rotatorIndex, setRotatorIndex] = useState(0)
  const [rotatorVisible, setRotatorVisible] = useState(true)

  // Flip `.reveal` → `.reveal-in` after mount so the CSS entry animation runs.
  useEffect(() => {
    const items = [headlineRef, subheadlineRef, ctaRef, trustRef]
    items.forEach((ref) => ref.current?.classList.add("reveal-in"))
  }, [])

  // Word rotator: skipped entirely when the user prefers reduced motion
  // (the first word stays). Interval is cleaned up on unmount / lang change.
  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let timeout: ReturnType<typeof setTimeout>
    const tick = () => {
      setRotatorVisible(false)
      timeout = setTimeout(() => {
        setRotatorIndex((i) => (i + 1) % t.hero.rotator.length)
        setRotatorVisible(true)
        timeout = setTimeout(tick, ROTATOR_INTERVAL)
      }, ROTATOR_FADE)
    }
    timeout = setTimeout(tick, ROTATOR_INTERVAL)
    return () => clearTimeout(timeout)
  }, [t.hero.rotator.length])

  // Apple-style hero: subtle parallax + scale-down + fade as you scroll away.
  useEffect(() => {
    const mq = gsap.matchMedia()
    mq.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        heroRef.current,
        { yPercent: 0, scale: 1, opacity: 1 },
        {
          yPercent: 24,
          scale: 0.94,
          opacity: 0.35,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom 30%",
            scrub: true,
          },
        }
      )
    })
    return () => mq.revert()
  }, [])

  const revealStyle = (delay: number) => ({
    animationDelay: `${delay}ms`,
    transitionDelay: `${delay}ms`,
  })

  const rotatorStyle = {
    opacity: rotatorVisible ? 1 : 0,
    transform: rotatorVisible ? "translateY(0)" : "translateY(14px)",
    transition:
      "opacity 700ms ease, transform 700ms cubic-bezier(0.16, 1, 0.3, 1)",
  }

  return (
    <section className="relative isolate min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0E1A]">
      {/* Aurora mesh gradient behind everything */}
      <div aria-hidden="true" className="aurora absolute inset-0 -z-10 pointer-events-none" />

      {/* Second aurora layer: lower opacity, desynced drift for extra depth (CSS-only) */}

      {/* Particle network: canvas, pauses when off-screen and under reduced motion */}
      <div aria-hidden="true" className="absolute inset-0 z-[1] pointer-events-none">
        <NeuralNetworkBackground />
      </div>
      <div
        aria-hidden="true"
        className="aurora absolute inset-0 -z-10 pointer-events-none opacity-40 before:[animation-delay:-9s] after:[animation-delay:-14s]"
      />

      {/* Gradient overlays for depth */}
      <div aria-hidden="true" className="absolute inset-0 z-[2] bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
      <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-32 z-[2] bg-gradient-to-t from-[#0A0E1A] to-transparent" />

      {/* Content */}
      <div ref={heroRef} className="container relative z-10 mx-auto px-4 lg:px-8 py-32">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Main headline with rotating keyword */}
          <h1
            ref={headlineRef}
            className="reveal text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-balance"
            style={revealStyle(REVEAL_DELAYS.headline)}
          >
            {/* Static full sentence for screen readers */}
            <span className="sr-only">
              {t.hero.titlePre}
              {t.hero.rotator[0]}
            </span>
            <span aria-hidden="true">
              {t.hero.titlePre}{" "}
              <span className="text-gradient-wiqonn relative inline-block" style={rotatorStyle}>
                {t.hero.rotator[rotatorIndex]}
                {/* Animated underline */}
                <span className="absolute left-0 w-full h-1 bg-gradient-wiqonn rounded-full transform scale-x-0 animate-[scaleX_1s_ease-out_1.5s_forwards] origin-left bottom-[-calc(0.1em_+_0.5rem)]" />
              </span>
            </span>
          </h1>

          {/* Subheadline */}
          <p
            ref={subheadlineRef}
            className="reveal text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed"
            style={revealStyle(REVEAL_DELAYS.subheadline)}
          >
            {t.hero.subheadline}
          </p>

          {/* CTA buttons */}
          <div
            ref={ctaRef}
            className="reveal flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            style={revealStyle(REVEAL_DELAYS.cta)}
          >
            <BookingButton
              className="btn-gradient glow-cyan hover:scale-105 transition-all text-base px-8 h-14 text-[#0A0E1A] font-semibold"
            />
            <Button
              size="lg"
              variant="outline"
              className="border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all h-14 px-8 focus-visible:ring-primary/80"
              asChild
            >
              <a href={t.hero.checklistHref} download>
                <ArrowRight className="mr-2 w-5 h-5 rotate-90" aria-hidden="true" />
                {t.hero.ctaSecondary}
              </a>
            </Button>
          </div>

          {/* Trust line: applied research, sober and commercial (no pills, no dots) */}
          <p
            ref={trustRef}
            className="reveal text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            style={revealStyle(REVEAL_DELAYS.trust)}
          >
            {t.hero.trustResearch}
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-muted-foreground/50 rounded-full animate-[scrollDown_1.5s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  )
}
