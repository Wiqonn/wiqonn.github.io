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
  const subheadlineRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const trustRef = useRef<HTMLDivElement>(null)

  // Flip `.reveal` → `.reveal-in` after mount so the CSS entry animation runs.
  // Idempotent and inert under reduced motion (the media query in globals.css
  // leaves `.reveal` visible), so no inline style forces animation.
  useEffect(() => {
    const items = [subheadlineRef, ctaRef, trustRef]
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
        <div className="cta-layout">
          <div className="cta-copy">
            <h2
              className="text-balance"
            >
              {t.cta.titlePre}
              <span className="text-gradient-wiqonn">{t.cta.titleAccent}</span>
            </h2>

            <p
              ref={subheadlineRef}
              className="reveal text-lg text-muted-foreground text-pretty leading-relaxed"
              style={revealStyle(REVEAL_DELAYS.subheadline)}
            >
              {t.cta.subheadline}
            </p>

            <div
              ref={trustRef}
              className="reveal cta-trust"
              style={revealStyle(REVEAL_DELAYS.trust)}
            >
              <ul className="cta-trust-list text-sm text-muted-foreground">
                <li>
                  <Clock className="text-primary" aria-hidden="true" />
                  <span>{t.cta.trust}</span>
                </li>
                <li>
                  <MapPin className="text-secondary" aria-hidden="true" />
                  <span>{t.cta.location}</span>
                </li>
              </ul>
            </div>
          </div>

          <div
            ref={ctaRef}
            className="reveal cta-form"
            style={revealStyle(REVEAL_DELAYS.cta)}
          >
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  )
}
