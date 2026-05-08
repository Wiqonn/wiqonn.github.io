"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, BarChart3, Cpu, Eye, MessageSquare, Workflow } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function ResearchSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  const capabilities = [
    {
      icon: Brain,
      title: "Custom AI Models",
      description:
        "We build and deploy machine learning models tailored to your specific business needs, from predictive analytics to classification systems.",
      applications: ["Demand forecasting", "Risk assessment", "Customer segmentation"],
    },
    {
      icon: Eye,
      title: "Computer Vision",
      description:
        "Image and video analysis solutions for quality control, document processing, medical imaging, and visual inspection.",
      applications: ["Defect detection", "Document OCR", "Visual search"],
    },
    {
      icon: MessageSquare,
      title: "AI Agents & LLMs",
      description:
        "Intelligent conversational agents and language models that automate customer support, document analysis, and knowledge management.",
      applications: ["Customer service bots", "Document Q&A", "Content generation"],
    },
    {
      icon: BarChart3,
      title: "Business Intelligence",
      description:
        "Interactive dashboards and analytics platforms that transform raw data into actionable insights for better decision-making.",
      applications: ["Executive dashboards", "KPI tracking", "Trend analysis"],
    },
    {
      icon: Workflow,
      title: "Process Automation",
      description:
        "End-to-end automation of repetitive tasks and workflows, integrating AI to handle complex decision points.",
      applications: ["Data pipelines", "Report generation", "Approval workflows"],
    },
    {
      icon: Cpu,
      title: "MLOps & Deployment",
      description:
        "Production-grade infrastructure for deploying, monitoring, and scaling your AI solutions with reliability and performance.",
      applications: ["Model serving", "A/B testing", "Performance monitoring"],
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
    <section ref={sectionRef} id="capabilities" className="py-24 md:py-32 bg-muted/30 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative">
        <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors">
            Our Capabilities
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
            What We <span className="text-gradient-wiqonn">Build</span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            End-to-end AI solutions designed to solve real business problems
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
            <h3 className="text-2xl font-bold mb-3">Have a specific challenge?</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Tell us about your project and we&apos;ll help you identify the right AI solution for your needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              {["No upfront commitment", "Free consultation", "Proposal in 48h"].map((item, idx) => (
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
