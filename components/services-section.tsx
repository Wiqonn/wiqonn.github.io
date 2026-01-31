"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  Bot,
  Cloud,
  Code,
  ArrowRight,
  CheckCircle2
} from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  const services = [
    {
      icon: Bot,
      title: "AI & Machine Learning",
      tagline: "Automate the repetitive. Focus on what matters.",
      description:
        "Custom AI that handles the work you don't have time for — from intelligent agents to predictive models.",
      results: [
        "AI Agents that work around the clock",
        "Predictive models tailored to your data",
        "Computer vision for quality & automation",
        "LLM integrations that actually work",
      ],
    },
    {
      icon: BarChart3,
      title: "Business Intelligence",
      tagline: "Your data, finally making sense.",
      description:
        "Dashboards and analytics that tell you what's happening, why, and what to do about it.",
      results: [
        "Executive dashboards, fast",
        "Automated reports that save hours",
        "Real-time KPI tracking",
        "Data architecture that scales",
      ],
    },
    {
      icon: Cloud,
      title: "Cloud & Infrastructure",
      tagline: "Solid foundation. Zero headaches.",
      description:
        "Infrastructure that's secure, scalable, and built for AI workloads — without the complexity.",
      results: [
        "Multi-cloud flexibility",
        "High availability & uptime",
        "Security & compliance ready",
        "Optimized for cost & performance",
      ],
    },
    {
      icon: Code,
      title: "Custom Development",
      tagline: "Built for your business. Not a template.",
      description:
        "Web apps, mobile apps, and platforms designed around how you actually work — with AI built in.",
      results: [
        "React & React Native apps",
        "Scalable backend systems",
        "Clean API design",
        "MLOps & deployment pipelines",
      ],
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

      // Cards animation with stagger
      const cards = cardsRef.current?.children
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
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
    <section ref={sectionRef} id="services" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative">
        <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-primary font-medium mb-4 uppercase tracking-wider text-sm">What We Build</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
            AI That <span className="text-gradient-wiqonn">Pays for Itself</span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            Every solution we build has one job: make your business better.
            If it doesn&apos;t deliver value, we don&apos;t ship it.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card
                key={index}
                className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500 group hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10 relative overflow-hidden"
              >
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="inline-flex p-3 rounded-xl bg-gradient-wiqonn/10 group-hover:bg-gradient-wiqonn transition-all duration-500 mb-4">
                        <Icon className="w-7 h-7 text-primary group-hover:text-background transition-colors" />
                      </div>
                      <h3 className="text-2xl font-bold mb-1">{service.title}</h3>
                      <p className="text-primary font-medium text-sm">{service.tagline}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Results list */}
                  <ul className="space-y-3 mb-6">
                    {service.results.map((result, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-3 text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                        {result}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button
                    variant="ghost"
                    className="p-0 h-auto text-primary hover:text-primary/80 hover:bg-transparent group/btn"
                    asChild
                  >
                    <a href="mailto:contact@wiqonn.com?subject=Inquiry about {service.title}">
                      Learn more
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </a>
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6">
            Not sure where to start? Let&apos;s figure it out together.
          </p>
          <Button
            size="lg"
            className="bg-gradient-wiqonn hover:opacity-90 transition-all hover:scale-105 text-base px-8 h-14 text-background font-semibold group"
            asChild
          >
            <a href="mailto:contact@wiqonn.com?subject=Let's Talk">
              Start a Conversation
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
