"use client"

import * as React from "react"
import { useReveal } from "@/hooks/use-reveal"

export type RevealProps<T extends React.ElementType = "div"> = {
  /** Wrapper element/tag. Defaults to "div". */
  as?: T
  /** Transition delay in ms: use increasing values to stagger siblings (0, 80, 160...). */
  delay?: number
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
} & Omit<
  React.ComponentPropsWithoutRef<T>,
  "as" | "delay" | "className" | "style" | "children"
>

/**
 * Scroll-reveal wrapper. Applies the shared `.reveal` / `.reveal-in` CSS
 * classes (defined in globals.css) and toggles `.reveal-in` via
 * IntersectionObserver (see hooks/use-reveal). Animates only opacity and
 * transform, so it never causes layout shift (CLS-safe) and respects
 * prefers-reduced-motion.
 */
export function Reveal<T extends React.ElementType = "div">({
  as,
  delay = 0,
  className,
  style,
  children,
  ...rest
}: RevealProps<T>) {
  const { ref, visible } = useReveal<HTMLElement>()
  const Tag = (as ?? "div") as React.ElementType

  return (
    <Tag
      ref={ref}
      {...rest}
      className={["reveal", visible ? "reveal-in" : "", className]
        .filter(Boolean)
        .join(" ")}
      style={{ ...style, transitionDelay: delay > 0 ? `${delay}ms` : undefined }}
    >
      {children}
    </Tag>
  )
}
