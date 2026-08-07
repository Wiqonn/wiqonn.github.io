"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowDownRight, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BookingButton } from "@/components/booking-button"
import { useT } from "@/components/language-provider"

const ROTATOR_INTERVAL = 2800
const ROTATOR_EXIT = 180

function splitRotatorPhrase(phrase: string) {
  const words = phrase.split(" ")
  const splitAt = Math.ceil(words.length / 2)
  return [words.slice(0, splitAt).join(" "), words.slice(splitAt).join(" ")]
}

export function HeroSection() {
  const t = useT()
  const copyRef = useRef<HTMLDivElement>(null)
  const [rotatorIndex, setRotatorIndex] = useState(0)
  const [rotatorExiting, setRotatorExiting] = useState(false)
  const rotatorLines = splitRotatorPhrase(t.hero.rotator[rotatorIndex])

  useEffect(() => {
    copyRef.current?.classList.add("hero-copy-in")
  }, [])

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (reducedMotion.matches) return

    let exitTimeout = 0
    const interval = window.setInterval(() => {
      setRotatorExiting(true)
      exitTimeout = window.setTimeout(() => {
        setRotatorIndex((index) => (index + 1) % t.hero.rotator.length)
        setRotatorExiting(false)
      }, ROTATOR_EXIT)
    }, ROTATOR_INTERVAL)

    return () => {
      window.clearInterval(interval)
      window.clearTimeout(exitTimeout)
    }
  }, [t.hero.rotator.length])

  return (
    <div className="hero-cinematic-content">
      <div ref={copyRef} className="hero-cinematic-copy">
        <div className="hero-lab-mark" aria-label="Wiqonn AI Lab, Barranquilla, Colombia">
          <span aria-hidden="true" />
          AI LAB / BARRANQUILLA, CO
        </div>

        <h1 className="hero-cinematic-title text-balance">
          <span className="sr-only">
            {t.hero.titlePre}
            {t.hero.rotator[0]}
          </span>
          <span aria-hidden="true">
            <span className="hero-cinematic-title-pre">{t.hero.titlePre}</span>
            <span className="hero-rotator-viewport">
              <span
                key={`${rotatorIndex}-${t.hero.rotator[rotatorIndex]}`}
                className={`hero-cinematic-accent ${rotatorExiting ? "is-exiting" : "is-entering"}`}
              >
                {rotatorLines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </span>
            </span>
          </span>
        </h1>

        <div className="hero-cinematic-meta">
          <p>{t.hero.subheadline}</p>
          <span className="hero-index" aria-hidden="true">
            01—04
          </span>
        </div>

        <div className="hero-cinematic-actions">
          <BookingButton className="btn-gradient hero-primary-action" />
          <Button variant="outline" className="hero-secondary-action" asChild>
            <a href={t.hero.checklistHref} download>
              <ArrowRight aria-hidden="true" />
              {t.hero.ctaSecondary}
            </a>
          </Button>
        </div>

        <div className="hero-cinematic-trust">
          <ArrowDownRight aria-hidden="true" />
          <p>{t.hero.trustResearch}</p>
        </div>
      </div>
    </div>
  )
}
