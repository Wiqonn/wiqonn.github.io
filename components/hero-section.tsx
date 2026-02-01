"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { gsap } from "gsap"
import { NeuralNetworkBackground } from "./neural-network-bg"

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subheadlineRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const trustRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      // Initial states
      gsap.set([headlineRef.current, subheadlineRef.current, ctaRef.current, trustRef.current], {
        opacity: 0,
        y: 30,
      })

      // Staggered reveal animation
      tl.to(headlineRef.current, { opacity: 1, y: 0, duration: 1 }, 0.2)
        .to(subheadlineRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.7)
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.9)
        .to(trustRef.current, { opacity: 1, y: 0, duration: 0.8 }, 1.1)

      // Parallax effect on scroll
      gsap.to(heroRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        >
          <source src="/hero-neural.mp4" type="video/mp4" />
        </video>
        {/* Fallback gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-transparent to-[#0a0a0a]" />
      </div>

      {/* Neural Network Canvas Animation (enhancement layer) */}
      <div className="absolute inset-0 z-[1] opacity-40">
        <NeuralNetworkBackground />
      </div>

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
      <div className="absolute bottom-0 left-0 right-0 h-32 z-[2] bg-gradient-to-t from-[#0a0a0a] to-transparent" />

      {/* Content */}
      <div ref={heroRef} className="container relative z-10 mx-auto px-4 lg:px-8 py-32">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Main Headline */}
          <h1
            ref={headlineRef}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-balance"
          >
            Scale Your Business with{" "}
            <span className="text-gradient-wiqonn relative">
              AI That Delivers
              {/* Animated underline */}
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-wiqonn rounded-full transform scale-x-0 animate-[scaleX_1s_ease-out_1.5s_forwards] origin-left" />
            </span>
          </h1>

          {/* Subheadline */}
          <p
            ref={subheadlineRef}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed"
          >
            Custom AI solutions that automate what slows you down, predict what matters,
            and deliver results you can measure — not promises you can't
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="bg-gradient-wiqonn hover:opacity-90 transition-all hover:scale-105 text-base px-8 h-14 text-background font-semibold group"
              asChild
            >
              <a href="mailto:contact@wiqonn.com?subject=Schedule Consultation">
                Let's Talk
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all h-14 px-8"
              asChild
            >
              <a href="#services">See What We Build</a>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div ref={trustRef} className="pt-16 flex flex-col items-center gap-4">
            <p className="text-sm text-muted-foreground/60">
              Serving clients worldwide — from startups to enterprise
            </p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-muted-foreground/50 rounded-full animate-[scrollDown_1.5s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  )
}
