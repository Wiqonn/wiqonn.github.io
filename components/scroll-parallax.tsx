"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface ScrollParallaxProps {
  children: React.ReactNode
  className?: string
  /** Vertical travel in px while scrolling through the viewport. */
  travel?: number
}

/**
 * Apple-style scroll choreography for section headings: the element drifts
 * up gently while scrolling into view. Position-only (no opacity), scrubbed
 * to scroll, dead under prefers-reduced-motion.
 */
export function ScrollParallax({
  children,
  className = "",
  travel = 30,
}: ScrollParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const mq = gsap.matchMedia()
    mq.add("(prefers-reduced-motion: no-preference)", () => {
      const tween = gsap.fromTo(
        element,
        { y: travel },
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top 95%",
            end: "top 45%",
            scrub: true,
          },
        }
      )

      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
      }
    })

    return () => mq.revert()
  }, [travel])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
