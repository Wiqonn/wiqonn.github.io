"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// Cache Performance Chart - Shows speedup over multiple requests
export function CachePerformanceChart() {
  const containerRef = useRef<HTMLDivElement>(null)

  const data = [
    { request: "1st", withoutCache: 21.7, withCache: 21.7, speedup: "1x" },
    { request: "2nd", withoutCache: 21.7, withCache: 1.15, speedup: "19x" },
    { request: "3rd", withoutCache: 21.7, withCache: 0.79, speedup: "28x" },
    { request: "4th", withoutCache: 21.7, withCache: 0.78, speedup: "28x" },
  ]

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const bars = containerRef.current?.querySelectorAll(".bar-fill")
      bars?.forEach((bar, i) => {
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.8,
            delay: i * 0.1,
            ease: "power2.out",
            transformOrigin: "left center",
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

  const maxValue = 25

  return (
    <div ref={containerRef} className="my-10 p-6 md:p-8 rounded-2xl bg-card/30 border border-border/50">
      <div className="mb-6">
        <h4 className="text-xl font-bold mb-2">Vision Model Cache Performance</h4>
        <p className="text-sm text-muted-foreground">
          Response time (seconds) for multiple questions about the same image
        </p>
      </div>

      <div className="space-y-6">
        {data.map((item, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{item.request} Request</span>
              <span className="text-primary font-bold">{item.speedup} faster</span>
            </div>

            {/* Without Cache Bar */}
            <div className="flex items-center gap-3">
              <span className="w-24 text-xs text-muted-foreground">No Cache</span>
              <div className="flex-1 h-8 bg-[#1a1a1a] rounded-lg overflow-hidden relative">
                <div
                  className="bar-fill h-full bg-gradient-to-r from-red-500/80 to-red-600/80 rounded-lg flex items-center justify-end pr-3"
                  style={{ width: `${(item.withoutCache / maxValue) * 100}%` }}
                >
                  <span className="text-xs font-mono text-white">{item.withoutCache}s</span>
                </div>
              </div>
            </div>

            {/* With Cache Bar */}
            <div className="flex items-center gap-3">
              <span className="w-24 text-xs text-muted-foreground">With Cache</span>
              <div className="flex-1 h-8 bg-[#1a1a1a] rounded-lg overflow-hidden relative">
                <div
                  className="bar-fill h-full bg-gradient-to-r from-green-500/80 to-emerald-500/80 rounded-lg flex items-center px-3"
                  style={{ width: `${Math.max((item.withCache / maxValue) * 100, 8)}%` }}
                >
                  <span className="text-xs font-mono text-white">{item.withCache}s</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border/30 text-center">
        <p className="text-sm text-muted-foreground">
          Model: <span className="text-foreground">Qwen3-VL-8B</span> |
          Image: <span className="text-foreground">1024×1024</span> |
          Hardware: <span className="text-foreground">M4 Max 128GB</span>
        </p>
      </div>
    </div>
  )
}

// Continuous Batching Chart - Shows throughput scaling
export function BatchingThroughputChart() {
  const containerRef = useRef<HTMLDivElement>(null)

  const data = [
    { users: 1, sequential: 145, batched: 145 },
    { users: 2, sequential: 145, batched: 220 },
    { users: 3, sequential: 145, batched: 280 },
    { users: 4, sequential: 145, batched: 340 },
    { users: 5, sequential: 145, batched: 420 },
  ]

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const bars = containerRef.current?.querySelectorAll(".throughput-bar")
      bars?.forEach((bar, i) => {
        gsap.fromTo(
          bar,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 0.6,
            delay: i * 0.08,
            ease: "back.out(1.5)",
            transformOrigin: "bottom center",
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

  const maxValue = 450

  return (
    <div ref={containerRef} className="my-10 p-6 md:p-8 rounded-2xl bg-card/30 border border-border/50">
      <div className="mb-6">
        <h4 className="text-xl font-bold mb-2">Continuous Batching: Throughput Scaling</h4>
        <p className="text-sm text-muted-foreground">
          Total tokens/second as concurrent users increase
        </p>
      </div>

      {/* Bar Chart */}
      <div className="flex items-end justify-between gap-2 h-64 px-4">
        {data.map((item, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center gap-2">
            {/* Bars */}
            <div className="w-full flex justify-center gap-1 h-52">
              {/* Sequential */}
              <div className="w-8 bg-[#1a1a1a] rounded-t-lg relative overflow-hidden">
                <div
                  className="throughput-bar absolute bottom-0 w-full bg-gradient-to-t from-red-600/80 to-red-500/60 rounded-t-lg"
                  style={{ height: `${(item.sequential / maxValue) * 100}%` }}
                />
              </div>
              {/* Batched */}
              <div className="w-8 bg-[#1a1a1a] rounded-t-lg relative overflow-hidden">
                <div
                  className="throughput-bar absolute bottom-0 w-full bg-gradient-to-t from-primary to-primary/60 rounded-t-lg"
                  style={{ height: `${(item.batched / maxValue) * 100}%` }}
                />
              </div>
            </div>
            {/* Label */}
            <div className="text-center">
              <p className="text-xs font-medium">{item.users} user{item.users > 1 ? "s" : ""}</p>
              <p className="text-[10px] text-primary font-bold">
                {item.users > 1 ? `${(item.batched / item.sequential).toFixed(1)}x` : "—"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 flex justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gradient-to-t from-red-600/80 to-red-500/60" />
          <span className="text-muted-foreground">Sequential (145 tok/s)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gradient-to-t from-primary to-primary/60" />
          <span className="text-muted-foreground">Continuous Batching</span>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-muted-foreground">
          Model: Qwen3-4B | Hardware: M4 Max 128GB
        </p>
      </div>
    </div>
  )
}

// Model Comparison Chart
export function ModelComparisonChart() {
  const containerRef = useRef<HTMLDivElement>(null)

  const models = [
    { name: "Llama-3.2-1B", speed: 464, memory: 0.7, color: "from-blue-500 to-blue-600" },
    { name: "Qwen3-0.6B", speed: 402, memory: 0.7, color: "from-purple-500 to-purple-600" },
    { name: "Llama-3.2-3B", speed: 200, memory: 1.8, color: "from-cyan-500 to-cyan-600" },
    { name: "Qwen3-4B", speed: 157, memory: 2.2, color: "from-green-500 to-green-600" },
    { name: "Qwen3-VL-4B", speed: 143, memory: 2.6, color: "from-amber-500 to-amber-600" },
    { name: "Qwen3-VL-8B", speed: 73, memory: 5.6, color: "from-red-500 to-red-600" },
  ]

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const rows = containerRef.current?.querySelectorAll(".model-row")
      rows?.forEach((row, i) => {
        gsap.fromTo(
          row,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
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

  const maxSpeed = 500

  return (
    <div ref={containerRef} className="my-10 p-6 md:p-8 rounded-2xl bg-card/30 border border-border/50">
      <div className="mb-6">
        <h4 className="text-xl font-bold mb-2">Model Performance Comparison</h4>
        <p className="text-sm text-muted-foreground">
          Tokens per second on Apple M4 Max (4-bit quantization)
        </p>
      </div>

      <div className="space-y-4">
        {models.map((model, idx) => (
          <div key={idx} className="model-row">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">{model.name}</span>
              <div className="flex items-center gap-4 text-xs">
                <span className="text-muted-foreground">{model.memory} GB</span>
                <span className="font-bold text-primary">{model.speed} tok/s</span>
              </div>
            </div>
            <div className="h-6 bg-[#1a1a1a] rounded-lg overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${model.color} rounded-lg transition-all duration-500`}
                style={{ width: `${(model.speed / maxSpeed) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border/30">
        <p className="text-xs text-muted-foreground text-center">
          Faster models use less memory and are ideal for real-time applications.
          Vision models (VL) are slower but understand images.
        </p>
      </div>
    </div>
  )
}

// Framework Comparison Visual
export function FrameworkComparison() {
  const features = [
    { name: "Native Apple GPU", mlxlm: true, llamacpp: true, vllmmlx: true },
    { name: "Continuous Batching", mlxlm: false, llamacpp: false, vllmmlx: true },
    { name: "OpenAI-Compatible API", mlxlm: false, llamacpp: false, vllmmlx: true },
    { name: "Vision Model Support", mlxlm: false, llamacpp: false, vllmmlx: true },
    { name: "Image Caching", mlxlm: false, llamacpp: false, vllmmlx: true },
    { name: "Audio (TTS/STT)", mlxlm: false, llamacpp: false, vllmmlx: true },
    { name: "MCP Tool Calling", mlxlm: false, llamacpp: false, vllmmlx: true },
  ]

  return (
    <div className="my-10 p-6 md:p-8 rounded-2xl bg-card/30 border border-border/50 overflow-x-auto">
      <div className="mb-6">
        <h4 className="text-xl font-bold mb-2">Why vLLM-MLX?</h4>
        <p className="text-sm text-muted-foreground">
          Feature comparison with other Mac inference tools
        </p>
      </div>

      <table className="w-full min-w-[500px]">
        <thead>
          <tr className="border-b border-border/50">
            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Feature</th>
            <th className="text-center py-3 px-4 font-medium text-muted-foreground">mlx-lm</th>
            <th className="text-center py-3 px-4 font-medium text-muted-foreground">llama.cpp</th>
            <th className="text-center py-3 px-4 font-medium">
              <span className="text-gradient-wiqonn">vLLM-MLX</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature, idx) => (
            <tr key={idx} className="border-b border-border/30 hover:bg-white/[0.02] transition-colors">
              <td className="py-3 px-4 text-sm">{feature.name}</td>
              <td className="py-3 px-4 text-center">
                {feature.mlxlm ? (
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 text-green-400">✓</span>
                ) : (
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-500/10 text-red-400/60">×</span>
                )}
              </td>
              <td className="py-3 px-4 text-center">
                {feature.llamacpp ? (
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 text-green-400">✓</span>
                ) : (
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-500/10 text-red-400/60">×</span>
                )}
              </td>
              <td className="py-3 px-4 text-center">
                {feature.vllmmlx ? (
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary">✓</span>
                ) : (
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-500/10 text-red-400/60">×</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// Memory vs Speed Scatter-like Visual
export function MemorySpeedChart() {
  const containerRef = useRef<HTMLDivElement>(null)

  const models = [
    { name: "Llama-1B", speed: 464, memory: 0.7, type: "text" },
    { name: "Qwen-0.6B", speed: 402, memory: 0.7, type: "text" },
    { name: "Llama-3B", speed: 200, memory: 1.8, type: "text" },
    { name: "Qwen-4B", speed: 157, memory: 2.2, type: "text" },
    { name: "Qwen-VL-4B", speed: 143, memory: 2.6, type: "vision" },
    { name: "Qwen-VL-8B", speed: 73, memory: 5.6, type: "vision" },
  ]

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const dots = containerRef.current?.querySelectorAll(".model-dot")
      dots?.forEach((dot, i) => {
        gsap.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            delay: 0.3 + i * 0.1,
            ease: "back.out(1.7)",
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
    <div ref={containerRef} className="my-10 p-6 md:p-8 rounded-2xl bg-card/30 border border-border/50">
      <div className="mb-6">
        <h4 className="text-xl font-bold mb-2">Speed vs Memory Tradeoff</h4>
        <p className="text-sm text-muted-foreground">
          Choose the right model for your hardware
        </p>
      </div>

      {/* Chart Area */}
      <div className="relative h-72 border-l-2 border-b-2 border-border/50 ml-12 mb-8">
        {/* Y-axis label */}
        <div className="absolute -left-12 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-muted-foreground whitespace-nowrap">
          Speed (tok/s)
        </div>

        {/* X-axis label */}
        <div className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
          Memory (GB)
        </div>

        {/* Grid lines */}
        {[100, 200, 300, 400].map((v) => (
          <div
            key={v}
            className="absolute left-0 right-0 border-t border-border/20"
            style={{ bottom: `${(v / 500) * 100}%` }}
          >
            <span className="absolute -left-10 -top-2 text-[10px] text-muted-foreground">{v}</span>
          </div>
        ))}

        {/* Model dots */}
        {models.map((model, idx) => (
          <div
            key={idx}
            className="model-dot absolute group cursor-pointer"
            style={{
              left: `${(model.memory / 6) * 100}%`,
              bottom: `${(model.speed / 500) * 100}%`,
              transform: "translate(-50%, 50%)",
            }}
          >
            <div
              className={`w-4 h-4 rounded-full ${
                model.type === "vision"
                  ? "bg-gradient-to-br from-purple-500 to-pink-500"
                  : "bg-gradient-to-br from-primary to-secondary"
              } shadow-lg group-hover:scale-150 transition-transform`}
            />
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-[#1a1a1a] border border-border/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
              <p className="font-medium text-sm">{model.name}</p>
              <p className="text-xs text-muted-foreground">{model.speed} tok/s · {model.memory} GB</p>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-primary to-secondary" />
          <span className="text-muted-foreground">Text Models</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
          <span className="text-muted-foreground">Vision Models</span>
        </div>
      </div>
    </div>
  )
}
