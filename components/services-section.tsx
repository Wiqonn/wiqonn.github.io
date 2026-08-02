"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  Bot,
  Cloud,
  Code,
  ArrowRight,
  CheckCircle2,
} from "lucide-react"
import { Reveal } from "@/components/reveal"
import { ScrollParallax } from "@/components/scroll-parallax"
import { useT } from "@/components/language-provider"
import { bookingUrl, hasBooking } from "@/lib/forms"

export function ServicesSection() {
  const t = useT()

  const services = [
    {
      icon: Bot,
      title: t.services.items[0].title,
      tagline: t.services.items[0].tagline,
      description: t.services.items[0].description,
      results: t.services.items[0].results,
    },
    {
      icon: BarChart3,
      title: t.services.items[1].title,
      tagline: t.services.items[1].tagline,
      description: t.services.items[1].description,
      results: t.services.items[1].results,
    },
    {
      icon: Cloud,
      title: t.services.items[2].title,
      tagline: t.services.items[2].tagline,
      description: t.services.items[2].description,
      results: t.services.items[2].results,
    },
    {
      icon: Code,
      title: t.services.items[3].title,
      tagline: t.services.items[3].tagline,
      description: t.services.items[3].description,
      results: t.services.items[3].results,
    },
  ]

  return (
    <section id="services" className="py-16 md:py-20 bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="aurora" aria-hidden="true" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative">
        <Reveal className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-primary font-medium mb-4 uppercase tracking-wider text-sm">
            {t.services.eyebrow}
          </p>
          <ScrollParallax>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
              {t.services.titlePre}{" "}
              <span className="text-gradient-wiqonn">{t.services.titleAccent}</span>
            </h2>
          </ScrollParallax>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            {t.services.description}
          </p>
        </Reveal>

        {/* Grid 2x2 uniforme */}
        <div className="grid md:grid-cols-2 gap-5 lg:gap-6 max-w-5xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Reveal key={index} delay={index * 80} className="h-full">
                <Card className="relative overflow-hidden h-full flex flex-col border-border/50 bg-white/5 backdrop-blur-sm transition-all duration-500 group hover:-translate-y-1 hover:border-primary/40 p-6 md:p-8">
                  {/* Hover gradient wash */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative flex flex-col h-full gap-4 md:gap-5">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="inline-flex p-3 rounded-xl bg-gradient-wiqonn/10 group-hover:bg-gradient-wiqonn transition-all duration-500">
                        <Icon className="w-6 h-6 text-primary group-hover:text-background transition-colors" />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl md:text-2xl font-bold mb-1">{service.title}</h3>
                      <p className="text-primary font-medium text-sm md:text-base">{service.tagline}</p>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                      {service.description}
                    </p>

                    {/* Results */}
                    <ul className="space-y-2.5 mt-auto pt-2">
                      {service.results.map((result, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-sm md:text-base text-muted-foreground group-hover:text-foreground/80 transition-colors"
                        >
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          {result}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <div className="pt-2">
                      <Button
                        variant="ghost"
                        className="p-0 h-auto text-primary hover:text-primary/80 hover:bg-transparent group/btn"
                        asChild
                      >
                        <a
                          href={bookingUrl(service.title)}
                          target={hasBooking() ? "_blank" : undefined}
                          rel={hasBooking() ? "noopener noreferrer" : undefined}
                        >
                          {t.hero.ctaPrimary}
                          <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>
              </Reveal>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <Reveal className="mt-12 text-center">
          <p className="text-muted-foreground mb-6">{t.services.bottom}</p>
          <Button
            size="lg"
            className="bg-gradient-wiqonn hover:opacity-90 transition-all hover:scale-105 text-base px-8 h-14 text-background font-semibold group"
            asChild
          >
            <a
              href={bookingUrl()}
              target={hasBooking() ? "_blank" : undefined}
              rel={hasBooking() ? "noopener noreferrer" : undefined}
            >
              {t.services.start}
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
