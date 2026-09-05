"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface BarRow {
  label: string
  value: string
  detail: string
  width: number
  className: string
}

function BarChart({
  title,
  subtitle,
  rows,
  maxWidth,
  note,
}: {
  title: string
  subtitle: string
  rows: BarRow[]
  maxWidth: number
  note?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)

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
            delay: i * 0.12,
            ease: "power2.out",
            transformOrigin: "left center",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
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
      className="my-8 p-6 md:p-8 rounded-2xl bg-card/30 border border-border/50"
    >
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-8">{subtitle}</p>

      <div className="space-y-7">
        {rows.map((row, idx) => (
          <div key={idx}>
            <div className="flex items-baseline justify-between gap-3 mb-2">
              <span className="text-sm font-medium text-foreground">{row.label}</span>
              <span className="font-mono text-primary font-bold whitespace-nowrap">
                {row.value}
              </span>
            </div>
            <div className="h-8 bg-[#1a1a1a] rounded-lg overflow-hidden">
              <div
                className={`bar-fill h-full min-w-[24px] rounded-lg ${row.className}`}
                style={{ width: `${(row.width / maxWidth) * 100}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground/70 mt-1.5">{row.detail}</p>
          </div>
        ))}
      </div>

      {note && (
        <p className="text-xs text-muted-foreground/70 mt-6 border-t border-border/30 pt-3">
          {note}
        </p>
      )}
    </div>
  )
}

export function VramChart() {
  return (
    <BarChart
      title="Training VRAM by Backend (3B Model)"
      subtitle="Memory footprint during LoRA fine-tuning. Lower is better: NVFP4 wins because quantization happens natively in the Transformer Engine."
      maxWidth={50}
      rows={[
        {
          label: "Transformer Engine NVFP4 (4-bit)",
          value: "~41GB",
          detail: "Blackwell native: autocast runs FP4 matmuls in the tensor core, no dequantized copy in memory.",
          width: 41,
          className: "bg-primary",
        },
        {
          label: "bitsandbytes FP4 (4-bit)",
          value: "~45GB",
          detail: "Any CUDA GPU: dequantized to bf16 for every matmul, which costs the extra ~4GB.",
          width: 45,
          className: "bg-blue-500",
        },
        {
          label: "Transformer Engine MXFP8 (8-bit)",
          value: "~50GB",
          detail: "Higher precision: same autocast machinery with an E4M3 block-scaling recipe.",
          width: 50,
          className: "bg-secondary",
        },
      ]}
    />
  )
}

export function ArtifactChart() {
  return (
    <BarChart
      title="Artifact Sizes After Training"
      subtitle="The same fine-tune in three deployable forms. The NVFP4 export is 4x smaller than the merged bf16 model."
      maxWidth={77.5}
      rows={[
        {
          label: "LoRA adapter (bf16)",
          value: "~240MB",
          detail: "rank-64 adapters only: experimentation and versioning.",
          width: 15.5,
          className: "bg-blue-500",
        },
        {
          label: "NVFP4 export (FP4)",
          value: "~1.5GB",
          detail: "TensorRT-LLM ready: the deployment artifact.",
          width: 38.7,
          className: "bg-primary",
        },
        {
          label: "Merged model (bf16)",
          value: "~6GB",
          detail: "full weights + adapter: the full-precision fallback.",
          width: 77.5,
          className: "bg-secondary",
        },
      ]}
      note="Bar length uses a square-root scale: the real sizes span two orders of magnitude (240MB → 6GB), which would make the adapter invisible on a linear axis."
    />
  )
}

export function LoRAParameterChart() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const segments = containerRef.current?.querySelectorAll(".bar-segment")
      segments?.forEach((segment, i) => {
        gsap.fromTo(
          segment,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.9,
            delay: i * 0.2,
            ease: "power2.out",
            transformOrigin: "left center",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
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
      className="my-8 p-6 md:p-8 rounded-2xl bg-card/30 border border-border/50"
    >
      <h3 className="text-xl font-bold mb-2">Trainable Parameters with LoRA</h3>
      <p className="text-sm text-muted-foreground mb-8">
        Out of SmolLM3-3B&apos;s ~3.1B parameters, LoRA only updates a fraction: the A/B
        adapters on q/k/v/o and the SwiGLU projections (gate/up/down), at rank 64.
      </p>

      {/* Stacked bar: 99.5% frozen vs 0.5% trainable */}
      <div className="flex h-10 rounded-lg overflow-hidden border border-border/50">
        <div
          className="bar-segment h-full bg-zinc-500"
          style={{ width: "99.5%" }}
        />
        <div
          className="bar-segment h-full bg-primary"
          style={{ width: "0.5%", minWidth: 28 }}
        />
      </div>

      <div className="mt-5 grid md:grid-cols-2 gap-3 text-sm text-muted-foreground">
        <div className="flex items-start gap-2.5">
          <span
            aria-hidden="true"
            className="mt-1.5 w-3.5 h-3.5 shrink-0 rounded-sm bg-zinc-500"
          />
          <span>
            <span className="font-semibold text-foreground">Frozen base weights</span>{" "}
            : ~99.5% of parameters, stored at 4-bit during training, never updated.
          </span>
        </div>
        <div className="flex items-start gap-2.5">
          <span
            aria-hidden="true"
            className="mt-1.5 w-3.5 h-3.5 shrink-0 rounded-sm bg-primary"
          />
          <span>
            <span className="font-semibold text-foreground">LoRA trainable</span>{" "}
            : ~0.5%, the only matrices receiving gradients, kept in bf16.
          </span>
        </div>
      </div>
    </div>
  )
}
