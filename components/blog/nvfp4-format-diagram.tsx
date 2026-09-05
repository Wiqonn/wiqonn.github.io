"use client"

const VALUES = [
  { v: -6, n: 6 },
  { v: -4, n: 4 },
  { v: -3, n: 3 },
  { v: -2, n: 2 },
  { v: -1.5, n: 1.5 },
  { v: -1, n: 1 },
  { v: -0.5, n: 0.5 },
  { v: 0, n: 0 },
  { v: 0.5, n: 0.5 },
  { v: 1, n: 1 },
  { v: 1.5, n: 1.5 },
  { v: 2, n: 2 },
  { v: 3, n: 3 },
  { v: 4, n: 4 },
  { v: 6, n: 6 },
]

const MAX = 6

export function NVFP4FormatDiagram() {
  return (
    <div className="my-10 rounded-2xl bg-card/30 border border-border/50 p-6 md:p-8 overflow-hidden">
      <h3 className="text-xl font-bold mb-2">NVFP4 (E2M1): What One Value Looks Like</h3>
      <p className="text-sm text-muted-foreground mb-8">
        1 sign bit · 2 exponent bits · 1 mantissa bit - only 8 representable magnitudes, but
        with float exponent spacing, not a linear integer grid.
      </p>

      {/* Bit layout */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-4 mb-10">
        {[
          { label: "S", name: "sign", bits: "1 bit", className: "bg-red-500/15 border-red-500/40 text-red-400" },
          { label: "E", name: "exponent", bits: "2 bits", className: "bg-primary/15 border-primary/40 text-primary" },
          { label: "E", name: "exponent", bits: "2 bits", className: "bg-primary/15 border-primary/40 text-primary" },
          { label: "M", name: "mantissa", bits: "1 bit", className: "bg-secondary/15 border-secondary/40 text-secondary" },
        ].map((bit, i) => (
          <div key={i} className="flex flex-col items-center">
            <div
              className={`w-12 h-12 rounded-lg border flex items-center justify-center text-lg font-bold ${bit.className}`}
            >
              {bit.label}
            </div>
            <span className="text-[10px] text-muted-foreground mt-1.5">{bit.name}</span>
          </div>
        ))}

        <span className="text-2xl text-muted-foreground/50">×</span>

        <div className="flex flex-col items-center">
          <div className="w-14 h-12 rounded-lg bg-amber-500/15 border border-amber-500/40 flex items-center justify-center">
            <span className="text-amber-400 font-bold text-xs">E4M3</span>
          </div>
          <span className="text-[10px] text-muted-foreground mt-1.5">block scale</span>
        </div>

        <span className="text-2xl text-muted-foreground/50">=</span>

        <div className="flex flex-col items-center">
          <div className="flex">
            <div className="w-10 h-12 rounded-l-lg bg-primary/15 border border-primary/40 flex items-center justify-center">
              <span className="text-primary font-bold text-xs">FP4</span>
            </div>
            <div className="w-10 h-12 rounded-r-lg bg-primary/15 border border-primary/40 border-l-0 flex items-center justify-center">
              <span className="text-primary font-bold text-xs">FP4</span>
            </div>
          </div>
          <span className="text-[10px] text-muted-foreground mt-1.5">2 values / 1 byte</span>
        </div>
      </div>

      {/* Symmetric value ladder */}
      <div className="mb-2 flex items-center gap-1 h-36">
        {VALUES.map((item, i) => (
          <div key={i} className="flex-1 flex flex-col items-center justify-end gap-1 h-full">
            {item.v !== 0 && (
              <div
                className={`w-full rounded-t-md ${
                  item.v < 0 ? "bg-red-500/70" : "bg-primary/70"
                }`}
                style={{ height: `${(item.n / MAX) * 100}%` }}
              />
            )}
            {item.v === 0 && <div className="w-full h-0.5 bg-border/60 rounded" />}
            <span className="text-[10px] font-mono text-muted-foreground">
              {item.v}
            </span>
          </div>
        ))}
      </div>
      <div className="flex justify-between text-[10px] text-muted-foreground/60 mb-8 -mt-1 px-1">
        <span>negative values (mirror)</span>
        <span>zero</span>
        <span>positive values</span>
      </div>

      <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <p className="font-semibold text-foreground mb-1">Dynamic range</p>
          <p>
            ±6.0 max with float spacing (0.5, 1, 1.5, 2, 3, 4, 6) - enough exponent headroom
            for LLM weight distributions. No NaN/Inf: out-of-range values saturate.
          </p>
        </div>
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <p className="font-semibold text-foreground mb-1">Dual-level scaling</p>
          <p>
            A global FP32 scale fixes the range; per-16-element micro-blocks get an FP8 E4M3
            scale factor. Two FP4 values pack into one byte - executed natively on Blackwell
            tensor cores.
          </p>
        </div>
      </div>
    </div>
  )
}
