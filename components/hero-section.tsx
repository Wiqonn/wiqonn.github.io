"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20" />

      {/* Neural network animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse animation-delay-2000" />
      </div>

      <div className="container relative z-10 mx-auto px-4 lg:px-8 py-32">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Innovation</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-balance">
            Scale Your Business with <span className="text-gradient-wiqonn">AI That Delivers</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            We help companies increase revenue, cut costs, and outpace competitors with custom AI solutions that generate measurable ROI from day one
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="bg-gradient-wiqonn hover:opacity-90 transition-opacity text-base px-8 h-12"
              asChild
            >
              <a href="mailto:contact@wiqonn.com?subject=Schedule Consultation">
                Schedule Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="pt-12 flex flex-col items-center gap-4">
            <p className="text-sm text-muted-foreground uppercase tracking-wider">Trusted by Industry Leaders</p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
              <div className="text-muted-foreground font-medium">Health</div>
              <div className="w-px h-6 bg-border" />
              <div className="text-muted-foreground font-medium">Energy</div>
              <div className="w-px h-6 bg-border" />
              <div className="text-muted-foreground font-medium">Education</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
