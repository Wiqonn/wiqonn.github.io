"use client"

import { useLayoutEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function PremiumMotion() {
  useLayoutEffect(() => {
    const media = gsap.matchMedia()

    media.add("(prefers-reduced-motion: no-preference)", () => {
      let context: gsap.Context | undefined
      let cancelled = false
      const cardCleanups: Array<() => void> = []
      const splitParents: HTMLElement[] = []

      document.fonts.ready.then(() => {
        if (cancelled) return

        context = gsap.context(() => {
          gsap.utils.toArray<HTMLElement>(".section-frame h2").forEach((heading) => {
            const revealParent = heading.closest<HTMLElement>(".reveal")
            if (revealParent) {
              revealParent.classList.add("split-reveal-parent")
              splitParents.push(revealParent)
            }

            gsap.fromTo(
              heading,
              {
                x: 60,
                y: 25,
                scale: 0.99,
                opacity: 0,
              },
              {
                x: 0,
                y: 0,
                scale: 1,
                opacity: 1,
                duration: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: heading,
                  start: "top 92%",
                  end: "top 56%",
                  scrub: 0.65,
                },
              }
            )
          })

          const cards = window.matchMedia("(pointer: fine)").matches
            ? gsap.utils.toArray<HTMLElement>(
                ".section-frame--services [data-slot='card'], .section-frame--value [data-slot='card']"
              )
            : []

          cards.forEach((card) => {
            gsap.set(card, { transformPerspective: 900, transformOrigin: "center" })
            const rotateX = gsap.quickTo(card, "rotationX", { duration: 0.55, ease: "power3.out" })
            const rotateY = gsap.quickTo(card, "rotationY", { duration: 0.55, ease: "power3.out" })

            const move = (event: PointerEvent) => {
              const rect = card.getBoundingClientRect()
              const x = (event.clientX - rect.left) / rect.width - 0.5
              const y = (event.clientY - rect.top) / rect.height - 0.5
              rotateX(y * -7)
              rotateY(x * 7)
              card.style.setProperty("--pointer-x", `${(x + 0.5) * 100}%`)
              card.style.setProperty("--pointer-y", `${(y + 0.5) * 100}%`)
            }

            const leave = () => {
              rotateX(0)
              rotateY(0)
            }

            card.addEventListener("pointermove", move)
            card.addEventListener("pointerleave", leave)
            cardCleanups.push(() => {
              card.removeEventListener("pointermove", move)
              card.removeEventListener("pointerleave", leave)
            })
          })

          ScrollTrigger.refresh()
        })
      })

      return () => {
        cancelled = true
        cardCleanups.forEach((cleanup) => cleanup())
        context?.revert()
        splitParents.forEach((parent) => parent.classList.remove("split-reveal-parent"))
      }
    })

    return () => media.revert()
  }, [])

  return null
}
