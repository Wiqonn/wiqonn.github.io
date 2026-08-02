"use client"

import { Layers, GraduationCap, Languages, CheckCircle2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Reveal } from "@/components/reveal"
import { useT } from "@/components/language-provider"

export function ValueProposition() {
  const t = useT()

  const pillars = [
    {
      icon: Layers,
      title: t.value.pillars[0].title,
      description: t.value.pillars[0].description,
      highlights: t.value.pillars[0].highlights,
    },
    {
      icon: GraduationCap,
      title: t.value.pillars[1].title,
      description: t.value.pillars[1].description,
      highlights: t.value.pillars[1].highlights,
    },
    {
      icon: Languages,
      title: t.value.pillars[2].title,
      description: t.value.pillars[2].description,
      highlights: t.value.pillars[2].highlights,
    },
  ]

  return (
    <section className="py-16 md:py-20 bg-background-navy relative overflow-hidden">
      {/* Fondo sutil con gradientes de marca: opacidad muy baja para no competir con el contenido (AA) */}
      <div className="aurora opacity-[0.07]" aria-hidden="true" />

      <div className="container mx-auto px-4 lg:px-8 relative">
        {/* Encabezado: qué hace Wiqonn, en segundos */}
        <Reveal className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-primary font-medium mb-4 uppercase tracking-wider text-sm">
            {t.value.eyebrow}
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance text-foreground">
            {t.value.titlePre}{" "}
            <span className="text-gradient-wiqonn">{t.value.titleAccent}</span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            {t.value.description}
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon
            return (
              <Reveal key={index} delay={120 + index * 80} className="h-full">
                <Card className="p-8 h-full bg-white/5 border-white/10 hover:border-primary/60 transition-all duration-500 group hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10">
                  <div className="mb-6 inline-flex p-4 rounded-2xl bg-gradient-wiqonn/10 group-hover:bg-gradient-wiqonn/20 transition-all duration-500 group-hover:scale-110">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {pillar.description}
                  </p>
                  <ul className="space-y-3">
                    {pillar.highlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-3 text-sm text-muted-foreground group-hover:text-foreground transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
