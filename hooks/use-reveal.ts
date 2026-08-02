"use client"

import * as React from "react"

/**
 * One-shot scroll-reveal hook built on IntersectionObserver.
 *
 * Attach `ref` to the element to observe. `visible` flips to `true` the first
 * time the element enters the viewport (threshold ~0.15) and stays `true` —
 * the observer is detached after the first hit, so content is never hidden
 * again when scrolling back up.
 *
 * Reduced motion: when `prefers-reduced-motion: reduce` is active the element
 * is treated as already visible, so content is never hidden from the start.
 * (globals.css also force-shows `.reveal` under that media query as a
 * no-JS safety net.)
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.15
): { ref: React.RefObject<T | null>; visible: boolean } {
  const ref = React.useRef<T | null>(null)
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    // SSR / static-prerender guard (the effect only runs in the browser).
    if (typeof window === "undefined") return

    // Respect reduced motion: reveal immediately, skip the observer entirely.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true)
      return
    }

    const node = ref.current
    if (!node) return

    // Fallback for engines without IntersectionObserver: just show content.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            // Reveal once, then stop observing this element.
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, visible }
}
