"use client"

import { ShieldCheck, FileSignature, Clock, MailCheck } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { ScrollParallax } from "@/components/scroll-parallax"
import { useT } from "@/components/language-provider"

const GUARANTEE_ICONS = [ShieldCheck, FileSignature, Clock, MailCheck]

export function GuaranteesBand() {
  const t = useT()

  return (
    <section className="py-16 md:py-20 bg-background-navy relative overflow-hidden">
      <div aria-hidden="true" className="aurora opacity-[0.05] absolute inset-0 pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative">
        <Reveal className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-primary font-medium mb-4 uppercase tracking-wider text-sm">
            {t.guarantees.eyebrow}
          </p>
          <ScrollParallax>
            <h2 className="text-3xl md:text-5xl font-bold text-balance text-foreground">
              {t.guarantees.title}
            </h2>
          </ScrollParallax>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {t.guarantees.items.map((item, index) => {
            const Icon = GUARANTEE_ICONS[index]
            return (
              <Reveal key={index} delay={index * 80} className="h-full">
                <div className="h-full p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/60 transition-all duration-500 group hover:-translate-y-1">
                  <Icon
                    className="w-6 h-6 text-primary mb-4"
                    aria-hidden="true"
                  />
                  <p className="text-sm leading-relaxed text-muted-foreground group-hover:text-foreground transition-colors">
                    {item}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
