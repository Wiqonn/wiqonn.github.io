"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface TextRevealProps {
  children: string
  className?: string
  delay?: number
  stagger?: number
  as?: "h1" | "h2" | "h3" | "p" | "span"
}

export function TextReveal({
  children,
  className = "",
  delay = 0,
  stagger = 0.03,
  as: Component = "span",
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const words = container.querySelectorAll(".word")

    gsap.fromTo(
      words,
      {
        opacity: 0,
        y: 20,
        rotateX: -90,
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        delay,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [delay, stagger])

  const words = children.split(" ")

  return (
    <Component
      ref={containerRef as React.RefObject<HTMLHeadingElement>}
      className={`${className} perspective-1000`}
    >
      {words.map((word, index) => (
        <span key={index} className="word inline-block mr-[0.25em]" style={{ transformStyle: "preserve-3d" }}>
          {word}
        </span>
      ))}
    </Component>
  )
}
