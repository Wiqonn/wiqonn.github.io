"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Clock, User } from "lucide-react"
import { BookingButton } from "@/components/booking-button"

const REVEAL_DELAYS = {
  hero: 0,
  card: 100,
  cta: 200,
}

const posts = [
  {
    slug: "dgx-spark-finetune",
    title: "Fine-Tune LLMs on a DGX Spark: LoRA + NVFP4 in Practice",
    description:
      "Train 3B models at 4-bit on Blackwell GB10 with three quantization backends, export to NVFP4 for TensorRT-LLM, and serve an OpenAI-compatible API — all from a desktop.",
    date: "August 2026",
    readTime: "14 min read",
    author: "Wayner Barrios",
    tags: ["DGX Spark", "NVFP4", "LoRA", "Blackwell", "Fine-Tuning"],
    featured: true,
  },
  {
    slug: "vllm-mlx",
    title: "Your Mac is Now an AI Server",
    description:
      "Stop paying for cloud APIs. Run production-grade LLMs and vision models locally with continuous batching for multiple users and zero API costs.",
    date: "January 2026",
    readTime: "10 min read",
    author: "Wayner Barrios",
    tags: ["AI", "MLX", "Apple Silicon", "Open Source"],
    featured: false,
  },
]

export default function BlogPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const items = [heroRef, cardRef, ctaRef]
    items.forEach((ref) => ref.current?.classList.add("reveal-in"))
  }, [])

  const revealStyle = (delay: number) => ({
    animationDelay: `${delay}ms`,
    transitionDelay: `${delay}ms`,
  })

  return (
    <main className="min-h-screen bg-background-navy">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div aria-hidden="true" className="aurora absolute inset-0 pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 relative">
          <div ref={heroRef} className="reveal max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 border-primary/50 text-primary">
              Research & Insights
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              Wiqonn <span className="text-gradient-wiqonn">Blog</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Applied research and engineering notes from Wiqonn: how to ship AI that reaches
              production for mid-sized companies anywhere in the world. Real benchmarks, architecture
              decisions and working code.
            </p>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-8 max-w-4xl mx-auto">
            <div ref={cardRef} className="reveal" style={revealStyle(REVEAL_DELAYS.card)}>
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500 group hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10 relative overflow-hidden">
                    {/* Hover gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative">
                      {post.featured && (
                        <Badge className="mb-4 bg-gradient-wiqonn text-background">
                          Featured
                        </Badge>
                      )}

                      <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>

                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {post.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                        <span className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {post.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="border-border/50 text-muted-foreground"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center text-primary font-medium group/link">
                        Read Article
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Conversion CTA */}
          <div ref={ctaRef} className="reveal mt-16" style={revealStyle(REVEAL_DELAYS.cta)}>
            <div className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
              <div className="relative z-10 text-center p-8 md:p-12">
                <p className="text-primary font-medium mb-4 uppercase tracking-wider text-sm">
                  Wiqonn
                </p>
                <h2 className="text-2xl md:text-4xl font-bold mb-4 text-balance">
                  Know where it hurts? We build the AI that fixes it.
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Applied AI for mid-sized companies anywhere in the world. Fixed price in
                  writing — and if it doesn&apos;t work on your data, we tell you before you
                  spend.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <BookingButton className="btn-gradient glow-cyan hover:scale-105 transition-all text-base px-8 h-14 text-[#0A0E1A] font-semibold" />
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all h-14 px-8"
                    asChild
                  >
                    <a href="/ai-readiness-checklist-en.pdf" download>
                      Get the AI Readiness Checklist
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
