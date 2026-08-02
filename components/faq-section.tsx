"use client"

import { ChevronDown } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { useT } from "@/components/language-provider"

export function FAQSection() {
  const t = useT()

  return (
    <section className="py-16 md:py-24 bg-background-navy relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent pointer-events-none"
      />

      <div className="container mx-auto px-4 lg:px-8 relative">
        <Reveal className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-primary font-medium mb-4 uppercase tracking-wider text-sm">
            {t.faq.eyebrow}
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-balance text-foreground">
            {t.faq.title}
          </h2>
        </Reveal>

        <div className="max-w-3xl mx-auto space-y-3">
          {t.faq.items.map((item, index) => (
            <Reveal key={index} delay={index * 60}>
              <details className="group rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 open:border-primary/40 open:bg-white/[0.07]">
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 text-base md:text-lg font-semibold text-foreground list-none [&::-webkit-details-marker]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/80 rounded-2xl">
                  {item.q}
                  <ChevronDown
                    className="w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <p className="px-6 pb-6 text-muted-foreground leading-relaxed text-pretty">
                  {item.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
