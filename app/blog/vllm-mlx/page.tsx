"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Github,
  ExternalLink,
  Cpu,
  Zap,
  Brain,
  Layers,
  Lightbulb,
  BookOpen,
} from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArchitectureDiagram } from "@/components/blog/architecture-diagram"
import { CacheAlgorithmCode } from "@/components/blog/code-block"
import { CacheStructure } from "@/components/blog/cache-structure"

gsap.registerPlugin(ScrollTrigger)

export default function VllmMlxPost() {
  const articleRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        }
      )

      const sections = articleRef.current?.querySelectorAll(".animate-section")
      if (sections) {
        sections.forEach((section) => {
          gsap.fromTo(
            section,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          )
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-8 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative">
          <div ref={heroRef} className="max-w-4xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>

            <div className="flex flex-wrap gap-2 mb-6">
              <Badge className="bg-gradient-wiqonn text-background">Research Paper</Badge>
              <Badge variant="outline" className="border-primary/50 text-primary">
                MLX
              </Badge>
              <Badge variant="outline" className="border-primary/50 text-primary">
                Apple Silicon
              </Badge>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-tight">
              Your Mac is Now an{" "}
              <span className="text-gradient-wiqonn">AI Server</span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Stop paying for cloud APIs. Run production-grade LLMs and vision models locally
              with the same performance you&apos;d get from expensive GPU servers.
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Wayner Barrios
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                January 2026
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                10 min read
              </span>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button asChild className="bg-gradient-wiqonn text-background hover:opacity-90">
                <a
                  href="https://github.com/waybarrios/vllm-mlx"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-4 h-4 mr-2" />
                  View on GitHub
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a
                  href="https://arxiv.org/abs/2601.19139"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Read Paper
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article ref={articleRef} className="pt-8 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Key Stats */}
            <div className="animate-section grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
              {[
                { icon: Zap, label: "Concurrent Users", value: "5+" },
                { icon: Cpu, label: "Tokens/Second", value: "464" },
                { icon: Brain, label: "Models Supported", value: "200+" },
                { icon: Layers, label: "API Cost", value: "$0" },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-card/50 border border-border/50 text-center group hover:border-primary/50 transition-colors"
                >
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <div className="text-3xl font-bold text-gradient-wiqonn mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Value Proposition */}
            <section className="animate-section mb-16">
              <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-card/50 to-secondary/10 border border-primary/20">
                <div className="flex items-center gap-3 mb-6">
                  <Lightbulb className="w-6 h-6 text-primary" />
                  <h2 className="text-xl font-bold">Why This Changes Everything</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <p className="text-lg font-semibold text-foreground">No More API Bills</p>
                    <p className="text-muted-foreground">
                      Cloud APIs charge on average $0.01+ per 1K tokens. Run unlimited queries
                      on your Mac for $0. Your data never leaves your machine.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg font-semibold text-foreground">Serve Multiple Users</p>
                    <p className="text-muted-foreground">
                      Continuous batching lets your Mac handle 5+ concurrent users. Perfect for
                      team demos, internal tools, or local development.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg font-semibold text-foreground">Vision Models Too</p>
                    <p className="text-muted-foreground">
                      Not just text. Run Qwen-VL, LLaVA, and Gemma 3 for image understanding.
                      Our caching makes follow-up questions 28x faster.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg font-semibold text-foreground">Drop-in Replacement</p>
                    <p className="text-muted-foreground">
                      OpenAI-compatible API. Change one line of code to switch from cloud to
                      local. Works with LangChain, LlamaIndex, and any OpenAI SDK.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* The Cloud Problem */}
            <section className="animate-section mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">The Cloud AI Problem</h2>
              <div className="prose prose-invert prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Running AI in the cloud is expensive. A single GPT-4 Vision call costs ~$0.01.
                  Sounds cheap until you&apos;re processing thousands of images or building an app
                  with real users. Suddenly you&apos;re looking at $500+ monthly bills.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Plus, every request means sending your data to someone else&apos;s servers.
                  For sensitive documents, medical images, or proprietary data, that&apos;s a
                  non-starter.
                </p>

                <div className="my-8 grid md:grid-cols-2 gap-6 items-stretch">
                  <div className="p-6 rounded-xl bg-red-500/5 border border-red-500/20 h-full">
                    <p className="text-red-400 font-bold text-lg mb-4">Cloud APIs</p>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-center gap-3">
                        <span className="text-red-400 text-lg leading-none">×</span>
                        <span>Pay per token (adds up fast)</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="text-red-400 text-lg leading-none">×</span>
                        <span>Data leaves your network</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="text-red-400 text-lg leading-none">×</span>
                        <span>Rate limits and downtime</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="text-red-400 text-lg leading-none">×</span>
                        <span>Latency to remote servers</span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-6 rounded-xl bg-green-500/5 border border-green-500/20 h-full">
                    <p className="text-green-400 font-bold text-lg mb-4">vLLM-MLX on Your Mac</p>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-center gap-3">
                        <span className="text-green-400 text-lg leading-none">✓</span>
                        <span>Unlimited queries, zero cost</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="text-green-400 text-lg leading-none">✓</span>
                        <span>100% private, data stays local</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="text-green-400 text-lg leading-none">✓</span>
                        <span>Always available, no limits</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="text-green-400 text-lg leading-none">✓</span>
                        <span>Sub-second local latency</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Technical Deep Dive */}
            <section className="animate-section mb-16">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-6 h-6 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold">Under the Hood</h2>
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                Two core innovations make vLLM-MLX different: <strong className="text-primary">Continuous Batching</strong> for
                handling multiple users, and <strong className="text-primary">Content-Based Caching</strong> for
                faster vision model responses.
              </p>

              <div className="prose prose-invert prose-lg max-w-none">
                <h3 className="text-xl font-bold mt-8 mb-4">
                  Content-Based Prefix Caching for MLLMs
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Multimodal Large Language Models (MLLMs) like Qwen3-VL, Gemma 3, and LLaVA
                  process images through a vision encoder before the language model can reason
                  about them. This vision encoding step is computationally expensive, often taking
                  1.5 to 2 seconds per image on consumer hardware.
                </p>

                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our key insight: identical images can arrive through different delivery
                  mechanisms (URLs, base64 encoding, file paths), but the pixel content remains the
                  same. By computing a SHA-256 hash of the decoded pixel values, we can identify
                  semantically identical images regardless of their delivery format.
                </p>

                <CacheStructure />

                <h3 className="text-xl font-bold mt-8 mb-4">
                  Apple Silicon Unified Memory Architecture
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Apple Silicon&apos;s unified memory model enables zero-copy cache management.
                  Unlike discrete GPU systems where tensors must be explicitly transferred between
                  CPU and GPU memory pools, MLX arrays exist in a single address space accessible
                  by both compute units. This eliminates transfer overhead for cached embeddings.
                </p>

                <h3 className="text-xl font-bold mt-8 mb-4">System Architecture</h3>
                <ArchitectureDiagram />

                <h3 className="text-xl font-bold mt-8 mb-4">Cache-Aware Generation Algorithm</h3>
                <CacheAlgorithmCode />
              </div>
            </section>

            {/* Benchmarks */}
            <section className="animate-section mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Real Performance Numbers</h2>
              <p className="text-lg text-muted-foreground mb-6">
                No marketing fluff. Here&apos;s what you actually get on an M4 Max with 128GB RAM.
                Even older M1/M2 machines deliver impressive results.
              </p>

              {/* Table 1: Text Model Throughput Comparison */}
              <h3 className="text-xl font-bold mt-8 mb-4">Text Model Throughput Comparison</h3>
              <p className="text-muted-foreground text-sm mb-4">
                All models use 4-bit quantization. Bold indicates best throughput per row. Speedup = Ours / llama.cpp.
              </p>
              <div className="overflow-x-auto rounded-xl border border-border/50">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50 bg-card/50">
                      <th className="text-left py-4 px-4 font-semibold">Model</th>
                      <th className="text-right py-4 px-4 font-semibold text-primary">vLLM-MLX</th>
                      <th className="text-right py-4 px-4 font-semibold">vllm-metal</th>
                      <th className="text-right py-4 px-4 font-semibold">mlx-lm</th>
                      <th className="text-right py-4 px-4 font-semibold">llama.cpp</th>
                      <th className="text-right py-4 px-4 font-semibold">Speedup</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/30 bg-card/20">
                      <td colSpan={6} className="py-2 px-4 text-xs font-medium text-foreground/70 italic">Qwen3 Family</td>
                    </tr>
                    <tr className="border-b border-border/30">
                      <td className="py-3 px-4">Qwen3-0.6B</td>
                      <td className="py-3 px-4 text-right font-bold text-primary">525.5</td>
                      <td className="py-3 px-4 text-right">365.8</td>
                      <td className="py-3 px-4 text-right">356.2</td>
                      <td className="py-3 px-4 text-right">281.5</td>
                      <td className="py-3 px-4 text-right font-medium text-green-400">1.87x</td>
                    </tr>
                    <tr className="border-b border-border/30">
                      <td className="py-3 px-4">Qwen3-4B</td>
                      <td className="py-3 px-4 text-right font-bold text-primary">159.0</td>
                      <td className="py-3 px-4 text-right">137.3</td>
                      <td className="py-3 px-4 text-right">128.9</td>
                      <td className="py-3 px-4 text-right">118.2</td>
                      <td className="py-3 px-4 text-right font-medium text-green-400">1.35x</td>
                    </tr>
                    <tr className="border-b border-border/30">
                      <td className="py-3 px-4">Qwen3-8B</td>
                      <td className="py-3 px-4 text-right font-bold text-primary">93.3</td>
                      <td className="py-3 px-4 text-right">87.1</td>
                      <td className="py-3 px-4 text-right">79.9</td>
                      <td className="py-3 px-4 text-right">76.9</td>
                      <td className="py-3 px-4 text-right font-medium text-green-400">1.21x</td>
                    </tr>
                    <tr className="border-b border-border/30">
                      <td className="py-3 px-4">Qwen3-30B-A3B</td>
                      <td className="py-3 px-4 text-right">109.7</td>
                      <td className="py-3 px-4 text-right font-bold text-primary">110.3</td>
                      <td className="py-3 px-4 text-right">107.4</td>
                      <td className="py-3 px-4 text-right">89.9</td>
                      <td className="py-3 px-4 text-right font-medium text-green-400">1.17x</td>
                    </tr>
                    <tr className="border-b border-border/30 bg-card/20">
                      <td colSpan={6} className="py-2 px-4 text-xs font-medium text-foreground/70 italic">Llama 3.2 Family</td>
                    </tr>
                    <tr className="border-b border-border/30">
                      <td className="py-3 px-4">Llama-3.2-1B</td>
                      <td className="py-3 px-4 text-right font-bold text-primary">461.9</td>
                      <td className="py-3 px-4 text-right">350.9</td>
                      <td className="py-3 px-4 text-right">347.1</td>
                      <td className="py-3 px-4 text-right">331.3</td>
                      <td className="py-3 px-4 text-right font-medium text-green-400">1.39x</td>
                    </tr>
                    <tr className="border-b border-border/30">
                      <td className="py-3 px-4">Llama-3.2-3B</td>
                      <td className="py-3 px-4 text-right font-bold text-primary">203.6</td>
                      <td className="py-3 px-4 text-right">174.3</td>
                      <td className="py-3 px-4 text-right">167.5</td>
                      <td className="py-3 px-4 text-right">155.8</td>
                      <td className="py-3 px-4 text-right font-medium text-green-400">1.31x</td>
                    </tr>
                    <tr className="border-b border-border/30 bg-card/20">
                      <td colSpan={6} className="py-2 px-4 text-xs font-medium text-foreground/70 italic">Other Architectures</td>
                    </tr>
                    <tr className="border-b border-border/30">
                      <td className="py-3 px-4">Gemma 3-4B</td>
                      <td className="py-3 px-4 text-right font-bold text-primary">152.5</td>
                      <td className="py-3 px-4 text-right">117.0</td>
                      <td className="py-3 px-4 text-right">105.4</td>
                      <td className="py-3 px-4 text-right">123.2</td>
                      <td className="py-3 px-4 text-right font-medium text-green-400">1.24x</td>
                    </tr>
                    <tr className="border-b border-border/30">
                      <td className="py-3 px-4">Nemotron-30B-A3B</td>
                      <td className="py-3 px-4 text-right font-bold text-primary">121.8</td>
                      <td className="py-3 px-4 text-right">--</td>
                      <td className="py-3 px-4 text-right">101.6</td>
                      <td className="py-3 px-4 text-right">85.1</td>
                      <td className="py-3 px-4 text-right font-medium text-green-400">1.43x</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground/70 mt-2 text-right">
                Measured on M4 Max (128GB). Values in tokens/second.
              </p>

              {/* Concurrency Scaling - Figure 2 */}
              <h3 className="text-xl font-bold mt-10 mb-4">Concurrency Scaling</h3>
              <p className="text-muted-foreground text-sm mb-4">
                How throughput scales with multiple concurrent users. Sequential processing (llama.cpp) stays flat,
                while continuous batching in vLLM-MLX scales efficiently.
              </p>
              <div className="max-w-xl">
                <div className="p-6 rounded-xl bg-card/50 border border-border/50">
                  <p className="text-lg font-semibold text-foreground mb-4">Aggregate Throughput (Qwen3-0.6B)</p>
                  <div className="space-y-3">
                    {[
                      { users: "1 user", ours: "441 tok/s", scale: "1.0x", width: "27%" },
                      { users: "4 users", ours: "892 tok/s", scale: "2.0x", width: "54%" },
                      { users: "8 users", ours: "1,156 tok/s", scale: "2.6x", width: "70%" },
                      { users: "16 users", ours: "1,642 tok/s", scale: "3.7x", width: "100%" },
                    ].map((row, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{row.users}</span>
                          <span className="text-foreground font-medium">{row.ours} <span className="text-green-400">({row.scale})</span></span>
                        </div>
                        <div className="h-2 bg-card rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full" style={{ width: row.width }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Cache Performance Table */}
              <h3 className="text-xl font-bold mt-8 mb-4">Image Caching Performance</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Response time when asking multiple questions about the same image
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left py-3 px-4 font-semibold">Question #</th>
                      <th className="text-left py-3 px-4 font-semibold">Without Cache</th>
                      <th className="text-left py-3 px-4 font-semibold">With Cache</th>
                      <th className="text-left py-3 px-4 font-semibold">Improvement</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/30">
                      <td className="py-3 px-4">1st (new image)</td>
                      <td className="py-3 px-4">21.7 seconds</td>
                      <td className="py-3 px-4">21.7 seconds</td>
                      <td className="py-3 px-4">Same</td>
                    </tr>
                    <tr className="border-b border-border/30">
                      <td className="py-3 px-4">2nd</td>
                      <td className="py-3 px-4">21.7 seconds</td>
                      <td className="py-3 px-4">1.15 seconds</td>
                      <td className="py-3 px-4 text-primary font-medium">19x faster</td>
                    </tr>
                    <tr className="border-b border-border/30">
                      <td className="py-3 px-4">3rd</td>
                      <td className="py-3 px-4">21.7 seconds</td>
                      <td className="py-3 px-4">0.79 seconds</td>
                      <td className="py-3 px-4 text-primary font-medium">28x faster</td>
                    </tr>
                    <tr className="border-b border-border/30">
                      <td className="py-3 px-4">4th+</td>
                      <td className="py-3 px-4">21.7 seconds</td>
                      <td className="py-3 px-4">0.78 seconds</td>
                      <td className="py-3 px-4 text-primary font-medium">28x faster</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Image Benchmark Table */}
              <h3 className="text-xl font-bold mt-10 mb-4">Image Understanding Performance</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Qwen3-VL-8B-Instruct-4bit performance across different image resolutions
              </p>
              <div className="overflow-x-auto rounded-xl border border-border/50">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50 bg-card/50">
                      <th className="text-left py-3 px-4 font-semibold">Resolution</th>
                      <th className="text-right py-3 px-4 font-semibold">Pixels</th>
                      <th className="text-right py-3 px-4 font-semibold">Time</th>
                      <th className="text-right py-3 px-4 font-semibold">Tokens</th>
                      <th className="text-right py-3 px-4 font-semibold text-primary">Speed</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    {[
                      { res: "224x224", px: "50K", time: "1.04s", tok: "78", speed: "74.8" },
                      { res: "448x448", px: "201K", time: "1.45s", tok: "70", speed: "48.1" },
                      { res: "768x768", px: "590K", time: "2.05s", tok: "91", speed: "44.3" },
                      { res: "1024x1024", px: "1.0M", time: "2.79s", tok: "76", speed: "27.2" },
                      { res: "1280x720", px: "922K", time: "2.97s", tok: "96", speed: "32.4" },
                      { res: "1920x1080", px: "2.1M", time: "6.30s", tok: "89", speed: "14.1" },
                    ].map((row, idx) => (
                      <tr key={idx} className="border-b border-border/30">
                        <td className="py-3 px-4 font-mono">{row.res}</td>
                        <td className="py-3 px-4 text-right">{row.px}</td>
                        <td className="py-3 px-4 text-right">{row.time}</td>
                        <td className="py-3 px-4 text-right">{row.tok}</td>
                        <td className="py-3 px-4 text-right font-medium text-primary">{row.speed} tok/s</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground/70 mt-2">
                Average: 45.2 tok/s across all resolutions. Fastest at 224x224, slowest at 1920x1080.
              </p>

              {/* Video Benchmark Table */}
              <h3 className="text-xl font-bold mt-10 mb-4">Video Understanding Performance</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Qwen3-VL-8B-Instruct-4bit performance across different frame counts
              </p>
              <div className="overflow-x-auto rounded-xl border border-border/50">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50 bg-card/50">
                      <th className="text-left py-3 px-4 font-semibold">Configuration</th>
                      <th className="text-right py-3 px-4 font-semibold">Frames</th>
                      <th className="text-right py-3 px-4 font-semibold">Time</th>
                      <th className="text-right py-3 px-4 font-semibold text-primary">Speed</th>
                      <th className="text-right py-3 px-4 font-semibold">Memory</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    {[
                      { cfg: "2 @ 0.5fps", frames: "2", time: "4.48s", speed: "57.1", mem: "6.4 GB" },
                      { cfg: "4 @ 1fps", frames: "4", time: "4.65s", speed: "55.0", mem: "6.4 GB" },
                      { cfg: "8 @ 2fps", frames: "8", time: "6.45s", speed: "37.2", mem: "6.8 GB" },
                      { cfg: "16 @ 2fps", frames: "16", time: "10.96s", speed: "23.4", mem: "7.6 GB" },
                      { cfg: "32 @ 4fps", frames: "32", time: "20.00s", speed: "12.8", mem: "9.2 GB" },
                      { cfg: "64 @ 8fps", frames: "64", time: "59.81s", speed: "4.3", mem: "12.9 GB" },
                    ].map((row, idx) => (
                      <tr key={idx} className="border-b border-border/30">
                        <td className="py-3 px-4 font-mono">{row.cfg}</td>
                        <td className="py-3 px-4 text-right">{row.frames}</td>
                        <td className="py-3 px-4 text-right">{row.time}</td>
                        <td className="py-3 px-4 text-right font-medium text-primary">{row.speed} tok/s</td>
                        <td className="py-3 px-4 text-right">{row.mem}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground/70 mt-2">
                Memory scales from 6.4 GB (2 frames) to 12.9 GB (64 frames). 96+ frames may cause GPU timeout.
              </p>

              {/* Framework Comparison */}
              <h3 className="text-xl font-bold mt-10 mb-4">Feature Comparison</h3>
              <p className="text-muted-foreground text-sm mb-4">
                How vLLM-MLX compares to other tools for running AI on Mac
              </p>
              <div className="overflow-x-auto rounded-xl border border-border/50">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50 bg-card/50">
                      <th className="text-left py-3 px-4 font-semibold">Feature</th>
                      <th className="text-center py-3 px-4 font-semibold">mlx-lm</th>
                      <th className="text-center py-3 px-4 font-semibold">llama.cpp</th>
                      <th className="text-center py-3 px-4 font-semibold">vllm-metal</th>
                      <th className="text-center py-3 px-4 font-semibold text-primary">vLLM-MLX</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/30">
                      <td className="py-3 px-4">Native Apple GPU</td>
                      <td className="py-3 px-4 text-center text-green-400">Yes</td>
                      <td className="py-3 px-4 text-center text-green-400">Yes</td>
                      <td className="py-3 px-4 text-center text-green-400">Yes</td>
                      <td className="py-3 px-4 text-center text-green-400">Yes</td>
                    </tr>
                    <tr className="border-b border-border/30">
                      <td className="py-3 px-4">OpenAI-compatible API</td>
                      <td className="py-3 px-4 text-center text-green-400">Yes</td>
                      <td className="py-3 px-4 text-center text-green-400">Yes</td>
                      <td className="py-3 px-4 text-center text-green-400">Yes</td>
                      <td className="py-3 px-4 text-center text-green-400">Yes</td>
                    </tr>
                    <tr className="border-b border-border/30">
                      <td className="py-3 px-4">Continuous batching</td>
                      <td className="py-3 px-4 text-center text-red-400">No</td>
                      <td className="py-3 px-4 text-center text-red-400">No</td>
                      <td className="py-3 px-4 text-center text-green-400">Yes</td>
                      <td className="py-3 px-4 text-center text-green-400">Yes</td>
                    </tr>
                    <tr className="border-b border-border/30">
                      <td className="py-3 px-4">Vision models (MLLM)</td>
                      <td className="py-3 px-4 text-center text-red-400">No</td>
                      <td className="py-3 px-4 text-center text-green-400">Yes</td>
                      <td className="py-3 px-4 text-center text-green-400">Yes</td>
                      <td className="py-3 px-4 text-center text-green-400">Yes</td>
                    </tr>
                    <tr className="border-b border-border/30">
                      <td className="py-3 px-4">Content-based prefix caching</td>
                      <td className="py-3 px-4 text-center text-red-400">No</td>
                      <td className="py-3 px-4 text-center text-red-400">No</td>
                      <td className="py-3 px-4 text-center text-red-400">No</td>
                      <td className="py-3 px-4 text-center text-green-400">Yes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* What You Can Do With It */}
            <section className="animate-section mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">What You Can Build</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Private AI Assistant",
                    description:
                      "Run ChatGPT-like conversations on your Mac without sending data to the cloud. Great for sensitive documents and privacy.",
                  },
                  {
                    title: "Image Analysis Tools",
                    description:
                      "Build apps that understand photos, analyze charts, read documents, or describe scenes for accessibility.",
                  },
                  {
                    title: "Voice Applications",
                    description:
                      "Text-to-speech in 10+ languages and speech-to-text transcription, all running locally.",
                  },
                  {
                    title: "AI-Powered Automation",
                    description:
                      "Connect AI to external tools via MCP protocol for agentic workflows and automation.",
                  },
                  {
                    title: "Development & Testing",
                    description:
                      "Test AI integrations locally before deploying to production, without API costs.",
                  },
                  {
                    title: "Research & Experimentation",
                    description:
                      "Experiment with different AI models, fine-tuning, and prompt engineering on your own hardware.",
                  },
                ].map((feature, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-xl bg-card/50 border border-border/50 hover:border-primary/50 transition-colors"
                  >
                    <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Getting Started */}
            <section className="animate-section mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Getting Started</h2>
              <div className="prose prose-invert prose-lg max-w-none">
                <p className="text-muted-foreground mb-8">
                  You&apos;ll need a Mac with Apple Silicon (M1, M2, M3, or M4 chip) and Python
                  installed.
                </p>

                {/* Step 1 */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-wiqonn flex items-center justify-center text-background font-bold text-sm">1</div>
                    <h4 className="font-bold text-foreground">Clone the Repository</h4>
                  </div>
                  <div className="rounded-xl overflow-hidden border border-border/50">
                    <div className="flex items-center justify-between px-4 py-2 bg-[#1a1a1a] border-b border-border/30">
                      <span className="text-xs text-muted-foreground">Terminal</span>
                    </div>
                    <div className="p-4 bg-[#0d0d0d] font-mono text-sm">
                      <p><span className="text-gray-500">$</span> <span className="text-primary">git clone https://github.com/waybarrios/vllm-mlx.git</span></p>
                      <p><span className="text-gray-500">$</span> <span className="text-primary">cd vllm-mlx</span></p>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-wiqonn flex items-center justify-center text-background font-bold text-sm">2</div>
                    <h4 className="font-bold text-foreground">Install Dependencies</h4>
                  </div>
                  <div className="rounded-xl overflow-hidden border border-border/50">
                    <div className="flex items-center justify-between px-4 py-2 bg-[#1a1a1a] border-b border-border/30">
                      <span className="text-xs text-muted-foreground">Terminal</span>
                    </div>
                    <div className="p-4 bg-[#0d0d0d] font-mono text-sm">
                      <p><span className="text-gray-500">$</span> <span className="text-primary">pip install -e .</span></p>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-wiqonn flex items-center justify-center text-background font-bold text-sm">3</div>
                    <h4 className="font-bold text-foreground">Start the AI Server</h4>
                  </div>
                  <div className="rounded-xl overflow-hidden border border-border/50">
                    <div className="flex items-center justify-between px-4 py-2 bg-[#1a1a1a] border-b border-border/30">
                      <span className="text-xs text-muted-foreground">Terminal</span>
                    </div>
                    <div className="p-4 bg-[#0d0d0d] font-mono text-sm">
                      <p><span className="text-gray-500">$</span> <span className="text-primary">vllm-mlx serve mlx-community/Llama-3.2-3B-Instruct-4bit --port 8000</span></p>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-wiqonn flex items-center justify-center text-background font-bold text-sm">4</div>
                    <h4 className="font-bold text-foreground">Start Chatting</h4>
                  </div>
                  <div className="rounded-xl overflow-hidden border border-border/50">
                    <div className="flex items-center justify-between px-4 py-2 bg-[#1a1a1a] border-b border-border/30">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                      </div>
                      <span className="text-xs text-muted-foreground font-mono">chat_example.py</span>
                    </div>
                    <div className="p-4 bg-[#0d0d0d] font-mono text-sm overflow-x-auto">
                      <div className="space-y-1">
                        <p><span className="text-purple-400">from</span> <span className="text-white">openai</span> <span className="text-purple-400">import</span> <span className="text-blue-400">OpenAI</span></p>
                        <p>&nbsp;</p>
                        <p><span className="text-white">client</span> <span className="text-pink-400">=</span> <span className="text-blue-400">OpenAI</span><span className="text-white">(</span></p>
                        <p className="pl-4"><span className="text-orange-300">base_url</span><span className="text-pink-400">=</span><span className="text-green-400">&quot;http://localhost:8000/v1&quot;</span><span className="text-white">,</span></p>
                        <p className="pl-4"><span className="text-orange-300">api_key</span><span className="text-pink-400">=</span><span className="text-green-400">&quot;not-needed&quot;</span>  <span className="text-gray-500"># Running locally</span></p>
                        <p><span className="text-white">)</span></p>
                        <p>&nbsp;</p>
                        <p><span className="text-white">response</span> <span className="text-pink-400">=</span> <span className="text-white">client.chat.completions.</span><span className="text-blue-400">create</span><span className="text-white">(</span></p>
                        <p className="pl-4"><span className="text-orange-300">model</span><span className="text-pink-400">=</span><span className="text-green-400">&quot;default&quot;</span><span className="text-white">,</span></p>
                        <p className="pl-4"><span className="text-orange-300">messages</span><span className="text-pink-400">=</span><span className="text-white">[&#123;</span><span className="text-green-400">&quot;role&quot;</span><span className="text-white">:</span> <span className="text-green-400">&quot;user&quot;</span><span className="text-white">,</span> <span className="text-green-400">&quot;content&quot;</span><span className="text-white">:</span> <span className="text-green-400">&quot;Hello!&quot;</span><span className="text-white">&#125;]</span></p>
                        <p><span className="text-white">)</span></p>
                        <p>&nbsp;</p>
                        <p><span className="text-blue-400">print</span><span className="text-white">(response.choices[</span><span className="text-orange-300">0</span><span className="text-white">].message.content)</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Conclusion */}
            <section className="animate-section mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">The Bottom Line</h2>
              <div className="prose prose-invert prose-lg max-w-none">
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Your MacBook isn&apos;t just a laptop anymore. It&apos;s a private AI server that can:
                </p>
                <div className="grid md:grid-cols-3 gap-4 my-8">
                  <div className="p-5 rounded-xl bg-card/50 border border-border/50 text-center">
                    <p className="text-lg font-semibold text-foreground">Keep Data Private</p>
                    <p className="text-base text-muted-foreground mt-1">Nothing leaves your machine</p>
                  </div>
                  <div className="p-5 rounded-xl bg-card/50 border border-border/50 text-center">
                    <p className="text-lg font-semibold text-foreground">Serve Your Team</p>
                    <p className="text-base text-muted-foreground mt-1">Multiple concurrent users</p>
                  </div>
                  <div className="p-5 rounded-xl bg-card/50 border border-border/50 text-center">
                    <p className="text-lg font-semibold text-foreground">Zero API Costs</p>
                    <p className="text-base text-muted-foreground mt-1">Unlimited queries, free</p>
                  </div>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Whether you&apos;re building a startup product, running internal tools, or just
                  experimenting with AI, vLLM-MLX gives you production-grade inference without
                  the cloud bills or privacy concerns.
                </p>
              </div>
            </section>

            {/* CTA */}
            <section className="animate-section">
              <div className="relative p-8 md:p-12 rounded-3xl overflow-hidden">
                {/* Background effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-[#0a0a0a] to-secondary/20" />
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/30 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/30 rounded-full blur-[100px]" />

                <div className="relative z-10 text-center">
                  <h3 className="text-3xl md:text-4xl font-bold mb-4">
                    Ready to Run AI Locally?
                  </h3>
                  <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Open source, free forever. Get started in 5 minutes. No GPU rental,
                    no API keys, no monthly bills.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button size="lg" asChild className="bg-gradient-wiqonn text-background hover:opacity-90 h-14 px-8 text-lg">
                      <a
                        href="https://github.com/waybarrios/vllm-mlx"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-5 h-5 mr-2" />
                        Get Started Free
                      </a>
                    </Button>
                    <Button size="lg" variant="outline" asChild className="h-14 px-8 text-lg">
                      <a
                        href="https://arxiv.org/abs/2601.19139"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-5 h-5 mr-2" />
                        Read the Paper
                      </a>
                    </Button>
                  </div>
                  <p className="mt-6 text-sm text-muted-foreground/60">
                    Works on any Apple Silicon Mac (M1, M2, M3, M4)
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
