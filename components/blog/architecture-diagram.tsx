"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function ArchitectureDiagram() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const boxes = containerRef.current?.querySelectorAll(".arch-box")
      boxes?.forEach((box, i) => {
        gsap.fromTo(
          box,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: i * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="my-12 p-8 md:p-10 rounded-2xl bg-gradient-to-b from-card/50 to-card/20 border border-border/50"
    >
      <div className="flex flex-col items-center gap-5">
        {/* Top Layer - API */}
        <div className="arch-box w-full max-w-xl p-5 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 text-center">
          <p className="text-xl font-bold text-foreground">vLLM-Inspired API</p>
          <p className="text-base text-muted-foreground mt-1">OpenAI-compatible interface with continuous batching</p>
        </div>

        {/* Connector */}
        <div className="w-0.5 h-8 bg-gradient-to-b from-primary/60 to-primary/20" />

        {/* Platform Layer */}
        <div className="arch-box w-full max-w-xl p-5 rounded-xl bg-card/80 border border-border/50 text-center">
          <p className="text-xl font-bold text-foreground">MLXPlatform</p>
          <p className="text-base text-muted-foreground mt-1">Apple Silicon Backend</p>
        </div>

        {/* Branching Connectors */}
        <div className="relative w-full max-w-xl h-10">
          <div className="absolute left-1/2 top-0 w-0.5 h-5 bg-primary/40 -translate-x-1/2" />
          <div className="absolute top-5 left-[16.67%] right-[16.67%] h-0.5 bg-primary/40" />
          <div className="absolute top-5 left-[16.67%] w-0.5 h-5 bg-primary/40" />
          <div className="absolute top-5 left-1/2 w-0.5 h-5 bg-primary/40 -translate-x-1/2" />
          <div className="absolute top-5 right-[16.67%] w-0.5 h-5 bg-primary/40" />
        </div>

        {/* Middle Layer - Three boxes */}
        <div className="grid grid-cols-3 gap-4 w-full max-w-xl">
          <div className="arch-box p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 text-center">
            <p className="text-lg font-bold text-blue-400">mlx-lm</p>
            <p className="text-sm text-muted-foreground mt-1">LLM Inference</p>
          </div>
          <div className="arch-box p-4 rounded-xl bg-purple-500/10 border border-purple-500/30 text-center">
            <p className="text-lg font-bold text-purple-400">mlx-vlm</p>
            <p className="text-sm text-muted-foreground mt-1">Vision + LLM</p>
          </div>
          <div className="arch-box p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-center">
            <p className="text-lg font-bold text-green-400">mlx-audio</p>
            <p className="text-sm text-muted-foreground mt-1">TTS + STT</p>
          </div>
        </div>

        {/* Merging Connectors */}
        <div className="relative w-full max-w-xl h-10">
          <div className="absolute top-0 left-[16.67%] w-0.5 h-5 bg-primary/40" />
          <div className="absolute top-0 left-1/2 w-0.5 h-5 bg-primary/40 -translate-x-1/2" />
          <div className="absolute top-0 right-[16.67%] w-0.5 h-5 bg-primary/40" />
          <div className="absolute top-5 left-[16.67%] right-[16.67%] h-0.5 bg-primary/40" />
          <div className="absolute left-1/2 top-5 w-0.5 h-5 bg-primary/40 -translate-x-1/2" />
        </div>

        {/* Bottom Layer - MLX */}
        <div className="arch-box w-full max-w-xl p-5 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-center">
          <p className="text-xl font-bold text-amber-400">MLX Framework</p>
          <p className="text-base text-muted-foreground mt-1">Apple ML Framework with Metal GPU Kernels</p>
        </div>
      </div>
    </div>
  )
}
