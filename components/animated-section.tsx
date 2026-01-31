"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right"
}

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = sectionRef.current
    if (!element) return

    const directionMap = {
      up: { y: 60, x: 0 },
      down: { y: -60, x: 0 },
      left: { y: 0, x: 60 },
      right: { y: 0, x: -60 },
    }

    const { x, y } = directionMap[direction]

    gsap.fromTo(
      element,
      {
        opacity: 0,
        y,
        x,
      },
      {
        opacity: 1,
        y: 0,
        x: 0,
        duration: 1,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse",
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [delay, direction])

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  )
}
