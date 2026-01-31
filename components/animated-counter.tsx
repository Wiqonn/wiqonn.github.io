"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface AnimatedCounterProps {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
}

export function AnimatedCounter({
  end,
  duration = 2,
  prefix = "",
  suffix = "",
  className = "",
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const elementRef = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: "top 80%",
      onEnter: () => {
        if (hasAnimated.current) return
        hasAnimated.current = true

        gsap.to(
          { value: 0 },
          {
            value: end,
            duration,
            ease: "power2.out",
            onUpdate: function () {
              setCount(Math.floor(this.targets()[0].value))
            },
          }
        )
      },
    })

    return () => {
      trigger.kill()
    }
  }, [end, duration])

  return (
    <span ref={elementRef} className={className}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}
