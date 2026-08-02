"use client"

import { useEffect, useRef } from "react"
import { Clock, MapPin } from "lucide-react"
import { useT } from "@/components/language-provider"
import { LeadForm } from "@/components/lead-form"

// Staggered load reveal (~100ms between elements). Only sets the delays.
// the actual motion lives in the global `.reveal` / `.reveal-in` utilities
// (which also handle `prefers-reduced-motion` via media query).
const REVEAL_DELAYS = {
  badge: 0,
  headline: 100,
  subheadline: 220,
  cta: 340,
  trust: 460,
}

export function CTASection() {
  const t = useT()
  const badgeRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subheadlineRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const trustRef = useRef<HTMLDivElement>(null)

  // Flip `.reveal` → `.reveal-in` after mount so the CSS entry animation runs.
  // Idempotent and inert under reduced motion (the media query in globals.css
  // leaves `.reveal` visible), so no inline style forces animation.
  useEffect(() => {
    const items = [badgeRef, headlineRef, subheadlineRef, ctaRef, trustRef]
    items.forEach((ref) => ref.current?.classList.add("reveal-in"))
  }, [])

  const revealStyle = (delay: number) => ({
    animationDelay: `${delay}ms`,
    transitionDelay: `${delay}ms`,
  })

  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden bg-[#0A0E1A] py-16 md:py-20"
    >
      {/* Animated aurora gradient field (cyan → green drift, INP-safe) */}
      <div aria-hidden="true" className="aurora absolute inset-0 -z-10 pointer-events-none" />

      {/* Grid pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10 pointer-events-none"
      />

      <div className="container relative mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Trust badge */}
          <div ref={badgeRef} className="reveal" style={revealStyle(REVEAL_DELAYS.badge)}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(57,181,74,0.9)]"
              />
              {t.cta.badge}
            </span>
          </div>

          {/* Main headline */}
          <h2
            ref={headlineRef}
            className="reveal text-3xl md:text-5xl lg:text-6xl font-bold text-balance"
            style={revealStyle(REVEAL_DELAYS.headline)}
          >
            {t.cta.titlePre}
            <span className="text-gradient-wiqonn relative">
              {t.cta.titleAccent}
              <span className="absolute left-0 w-full h-1 bg-gradient-wiqonn rounded-full opacity-50 bottom-[-calc(0.1em_+_0.5rem)]" />
            </span>
          </h2>

          {/* Subheadline */}
          <p
            ref={subheadlineRef}
            className="reveal text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed"
            style={revealStyle(REVEAL_DELAYS.subheadline)}
          >
            {t.cta.subheadline}
          </p>

          {/* CTA: form de contacto (fallback mailto si no hay form configurado) */}
          <div
            ref={ctaRef}
            className="reveal pt-4"
            style={revealStyle(REVEAL_DELAYS.cta)}
          >
            <LeadForm />
          </div>

          {/* Trust line */}
          <div
            ref={trustRef}
            className="reveal pt-8 flex flex-col items-center gap-3"
            style={revealStyle(REVEAL_DELAYS.trust)}
          >
            <p className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
              <Clock className="w-4 h-4 text-primary" aria-hidden="true" />
              {t.cta.trust}
              <span aria-hidden="true" className="text-muted-foreground/40">
                ·
              </span>
              <MapPin className="w-4 h-4 text-secondary" aria-hidden="true" />
              {t.cta.location}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
