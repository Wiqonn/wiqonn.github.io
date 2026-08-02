"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, BarChart3, Cpu, Eye, MessageSquare, Workflow } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useT } from "@/components/language-provider"

gsap.registerPlugin(ScrollTrigger)

export function ResearchSection() {
  const t = useT()
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  // Iconos por capability: el orden coincide con t.research.capabilities.
  const capabilityIcons = [Brain, Eye, MessageSquare, BarChart3, Workflow, Cpu]

  const capabilities = t.research.capabilities.map((capability, index) => ({
    icon: capabilityIcons[index],
    title: capability.title,
    description: capability.description,
    applications: capability.applications,
  }))

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
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }

      // CTA animation
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="capabilities" className="py-16 md:py-20 bg-muted/30 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative">
        <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-10">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors">
            {t.research.badge}
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
            {t.research.titlePre}
            <span className="text-gradient-wiqonn">{t.research.titleAccent}</span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            {t.research.description}
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon
            return (
              <Card
                key={index}
                className="p-6 bg-card border-border/50 hover:border-primary/50 transition-all duration-500 group hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-wiqonn/10 group-hover:bg-gradient-wiqonn group-hover:scale-110 transition-all duration-500">
                    <Icon className="w-6 h-6 text-primary group-hover:text-background transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold">{capability.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{capability.description}</p>
                <div className="flex flex-wrap gap-2">
                  {capability.applications.map((app, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1 bg-muted rounded-full text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </Card>
            )
          })}
        </div>

        <div
          ref={ctaRef}
          className="max-w-4xl mx-auto p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-card to-secondary/10 border border-primary/20 backdrop-blur-sm"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-3">{t.research.ctaTitle}</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {t.research.ctaDescription}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              {t.research.ctaChips.map((item, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-background rounded-full border border-border/50 hover:border-primary/30 transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
