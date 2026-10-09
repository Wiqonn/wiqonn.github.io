import { ArrowRight, Braces, Crop, Eye, ScanSearch } from "lucide-react"

const steps = [
  {
    icon: Braces,
    label: "Contract",
    value: "Return target boxes",
  },
  {
    icon: ScanSearch,
    label: "Localize",
    value: "Select visible evidence",
  },
  {
    icon: Crop,
    label: "Crop",
    value: "Preserve source pixels",
  },
  {
    icon: Eye,
    label: "Answer",
    value: "Use full scene + crop",
  },
]

export function GroundingPipeline() {
  return (
    <div className="my-8 rounded-2xl border border-border/60 bg-[#09111f]/80 p-4 md:p-6">
      <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] md:items-stretch">
        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <div className="contents" key={step.label}>
              <div className="group rounded-xl border border-white/10 bg-white/[0.035] p-4 transition-colors hover:border-primary/50">
                <div className="mb-5 flex items-center justify-between">
                  <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
                </div>
                <p className="mb-1 font-mono text-xs uppercase tracking-[0.18em] text-primary">
                  {step.label}
                </p>
                <p className="text-sm font-medium text-foreground">{step.value}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="flex items-center justify-center text-primary/50" aria-hidden="true">
                  <ArrowRight className="hidden h-5 w-5 md:block" />
                  <span className="font-mono text-lg md:hidden">↓</span>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

const comparison = [
  { label: "Full-image answer", correct: 40, wrong: 24, note: "Fresh answer, no crop" },
  { label: "Model-selected crop", correct: 46, wrong: 18, note: "Native coordinate contract" },
  { label: "Reference crop", correct: 48, wrong: 16, note: "Annotation-guided upper bound" },
  { label: "Random crop", correct: 37, wrong: 27, note: "Same extra-call budget" },
]

export function OutcomeBars() {
  return (
    <figure className="my-8 rounded-2xl border border-border/60 bg-card/30 p-5 md:p-7">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">64 outcomes per arm</p>
          <h3 className="mt-2 text-xl font-bold">Answers after the interface repair</h3>
        </div>
        <div className="flex gap-4 font-mono text-xs text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-sm bg-primary" /> Correct
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-sm bg-amber-500" /> Wrong
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {comparison.map((row) => (
          <div key={row.label}>
            <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <p className="font-semibold text-foreground">{row.label}</p>
                <p className="text-xs text-muted-foreground">{row.note}</p>
              </div>
              <p className="font-mono text-xs text-muted-foreground">
                <span className="text-primary">{row.correct} correct</span> / {row.wrong} wrong
              </p>
            </div>
            <div className="flex h-3.5 overflow-hidden rounded-full bg-white/5" aria-label={`${row.label}: ${row.correct} correct and ${row.wrong} wrong`}>
              <span className="bg-primary" style={{ width: `${(row.correct / 64) * 100}%` }} />
              <span className="bg-amber-500" style={{ width: `${(row.wrong / 64) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>

      <figcaption className="mt-6 text-sm leading-relaxed text-muted-foreground">
        Descriptive development results from two draws over 32 images. The model-crop result
        is promising, but its image-cluster interval includes no improvement and the reference
        labels have not received independent human review.
      </figcaption>
    </figure>
  )
}
