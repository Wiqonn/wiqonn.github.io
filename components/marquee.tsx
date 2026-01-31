"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface MarqueeProps {
  children: React.ReactNode
  direction?: "left" | "right"
  speed?: number
  className?: string
  pauseOnHover?: boolean
}

export function Marquee({
  children,
  direction = "left",
  speed = 50,
  className = "",
  pauseOnHover = true,
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const scroller = scrollerRef.current
    if (!container || !scroller) return

    // Clone children for infinite loop
    const scrollerContent = Array.from(scroller.children)
    scrollerContent.forEach((item) => {
      const clone = item.cloneNode(true)
      scroller.appendChild(clone)
    })

    const totalWidth = scroller.scrollWidth / 2
    const duration = totalWidth / speed

    const tl = gsap.timeline({ repeat: -1 })

    if (direction === "left") {
      gsap.set(scroller, { x: 0 })
      tl.to(scroller, {
        x: -totalWidth,
        duration,
        ease: "none",
      })
    } else {
      gsap.set(scroller, { x: -totalWidth })
      tl.to(scroller, {
        x: 0,
        duration,
        ease: "none",
      })
    }

    if (pauseOnHover) {
      container.addEventListener("mouseenter", () => tl.pause())
      container.addEventListener("mouseleave", () => tl.resume())
    }

    return () => {
      tl.kill()
    }
  }, [direction, speed, pauseOnHover])

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div ref={scrollerRef} className="flex gap-8 w-max">
        {children}
      </div>
    </div>
  )
}
