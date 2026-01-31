"use client"

import { useEffect, useRef } from "react"
import { Rocket, Shield, Handshake } from "lucide-react"
import { Card } from "@/components/ui/card"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function ValueProposition() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  const values = [
    {
      icon: Rocket,
      title: "Fast Delivery",
      description:
        "From idea to working product in weeks, not months. We ship fast because your time matters.",
    },
    {
      icon: Shield,
      title: "Results You Can Measure",
      description:
        "Clear KPIs from day one. If it doesn't move the needle for your business, we don't build it.",
    },
    {
      icon: Handshake,
      title: "Your Team, Extended",
      description:
        "We work like part of your team — not consultants who disappear. Continuous support, real partnership.",
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      )

      // Cards stagger animation
      const cards = cardsRef.current?.children
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-muted/30 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative">
        <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
            Why Work With <span className="text-gradient-wiqonn">Us</span>?
          </h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            Because AI should solve problems, not create new ones
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <Card
                key={index}
                className="p-8 bg-card hover:bg-card/80 transition-all duration-500 border-border/50 group hover:border-primary/50 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="mb-6 inline-flex p-4 rounded-2xl bg-gradient-wiqonn/10 group-hover:bg-gradient-wiqonn/20 transition-all duration-500 group-hover:scale-110">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-gradient-wiqonn transition-all">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
