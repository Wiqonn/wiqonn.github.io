"use client"

import { useEffect, useRef } from "react"
import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const root = document.documentElement
    root.classList.add("motion-ready")
    return () => root.classList.remove("motion-ready")
  }, [])

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      ScrollTrigger.refresh()
      return
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
    })

    lenisRef.current = lenis

    lenis.on("scroll", ScrollTrigger.update)

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000)
    }

    const resizeLenis = () => lenis.resize()

    gsap.ticker.add(updateLenis)
    ScrollTrigger.addEventListener("refresh", resizeLenis)

    gsap.ticker.lagSmoothing(0)

    return () => {
      ScrollTrigger.removeEventListener("refresh", resizeLenis)
      gsap.ticker.remove(updateLenis)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return <>{children}</>
}
