"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/10 via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />

      <div className="container relative mx-auto px-4 lg:px-8">
        <div ref={contentRef} className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-balance">
            Ready to Build{" "}
            <span className="text-gradient-wiqonn relative">
              Something Great?
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-wiqonn rounded-full opacity-50" />
            </span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Tell us about your challenge. We&apos;ll tell you honestly if we can help — and how.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="bg-gradient-wiqonn hover:opacity-90 transition-all hover:scale-105 text-base px-8 h-14 text-background font-semibold group"
              asChild
            >
              <a href="mailto:contact@wiqonn.com?subject=Let's Talk">
                <Calendar className="mr-2 w-5 h-5" />
                Let&apos;s Talk
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>

          <div className="pt-8 flex flex-col items-center gap-4">
            <p className="text-sm text-muted-foreground">
              No pressure. No pitch. Just a real conversation.
            </p>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((_, idx) => (
                <div
                  key={idx}
                  className="w-2 h-2 rounded-full bg-gradient-wiqonn animate-pulse"
                  style={{ animationDelay: `${idx * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
