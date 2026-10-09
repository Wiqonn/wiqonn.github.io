"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef } from "react"
import {
  AlertTriangle,
  ArrowLeft,
  BoxSelect,
  Calendar,
  CheckCircle2,
  Clock,
  Cpu,
  Lightbulb,
  ScanSearch,
  User,
} from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { BookingButton } from "@/components/booking-button"
import { Footer } from "@/components/footer"
import { GroundingPipeline, OutcomeBars } from "@/components/blog/grounding-pipeline"
import { Navigation } from "@/components/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

gsap.registerPlugin(ScrollTrigger)

const stats = [
  {
    value: "34 / 64",
    label: "attempts produced a usable crop",
    note: "After matching Qwen's 0 to 1000 coordinate format.",
    icon: BoxSelect,
  },
  {
    value: "19 / 49",
    label: "targets passed the grounding threshold",
    note: "Model and reference boxes shared at least half of their combined area.",
    icon: ScanSearch,
  },
  {
    value: "1.63 GiB",
    label: "peak GPU memory",
    note: "local 4-bit inference",
    icon: Cpu,
  },
]

const productionChecks = [
  {
    title: "Validate the contract",
    text: "Test the model's actual coordinate convention, JSON envelope and object count before running the evaluation.",
  },
  {
    title: "Score semantic grounding",
    text: "A parseable box is only the first gate. Compare it with independently checked target regions or task outcomes.",
  },
  {
    title: "Measure the final decision",
    text: "Count repaired errors and correct answers lost. A crop can remove context as easily as it can add detail.",
  },
  {
    title: "Expose fallbacks and cost",
    text: "Report when the system reuses the full image, then track the extra tokens, latency and GPU time required by localization.",
  },
]

const experimentSteps = [
  "Run Qwen3-VL-2B-Instruct locally with 4-bit inference.",
  "Use 32 development images and run two draws per image, producing 64 outcomes per policy.",
  "Ask the model to localize the objects named in each question and convert the returned boxes into one crop.",
  "Answer from the full image alone, or pair the full image with a model, reference or random crop.",
  "Score both the final answer and the overlap between model boxes and published target boxes.",
]

const competingExplanations = [
  {
    title: "Pretraining prior",
    text: "When the visual relation is uncertain, learned language patterns may favor one answer before the pixels are resolved.",
    test: "Ask the question without an image, then repeat it with a blank or unrelated image.",
  },
  {
    title: "Dataset answer imbalance",
    text: "A local excess of one label can bias a binary choice even when the wider dataset is designed to be balanced.",
    test: "Audit answer frequencies in the evaluated cohort and build a balanced counterfactual set.",
  },
  {
    title: "Scene-layout prior",
    text: "The model may rely on a typical bathroom arrangement instead of measuring the relation in this image.",
    test: "Mirror the image or move one referent while keeping the question unchanged.",
  },
  {
    title: "Spatial reasoning error",
    text: "The model may detect both objects but reverse left and right, or reverse the order of the referents.",
    test: "Request object coordinates first, derive the relation separately and swap the question wording.",
  },
  {
    title: "Resolution limit",
    text: "The faucet and towel occupy small regions. Image resizing or preprocessing may erase details needed for comparison.",
    test: "Provide one high-resolution crop that contains both objects and preserves their relative positions.",
  },
  {
    title: "Attention shift from the crop",
    text: "The second image emphasized the faucet and soap dispenser but omitted the towel. The full scene remained available, yet the crop may have redirected attention.",
    test: "Compare full-only, crop-only, reversed image order, a both-object crop and an irrelevant crop.",
  },
  {
    title: "Sampling variability",
    text: "The run used stochastic decoding with different seeds. One model-crop draw changed the answer from right to left.",
    test: "Repeat with deterministic decoding, then estimate answer frequencies over more sampled seeds.",
  },
  {
    title: "Weak abstention",
    text: "The prompt allowed left, right or null, but the model may still prefer a concrete label when the evidence is weak.",
    test: "Ask for a short visual description and confidence before requiring a directional answer.",
  },
  {
    title: "Reference uncertainty",
    text: "The published answer and target boxes were not independently re-annotated, so an individual benchmark label may be ambiguous or wrong.",
    test: "Use blinded human re-annotation and report agreement before rescoring the case.",
  },
]

function FigureLabel({
  children,
  tone = "cyan",
  className = "",
}: {
  children: React.ReactNode
  tone?: "cyan" | "amber"
  className?: string
}) {
  return (
    <span
      className={`absolute rounded-md border px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] backdrop-blur-md ${className} ${
        tone === "cyan"
          ? "border-primary/60 bg-[#07101c]/85 text-primary"
          : "border-amber-400/70 bg-[#1a1206]/90 text-amber-300"
      }`}
    >
      {children}
    </span>
  )
}

export default function VisualGroundingPost() {
  const articleRef = useRef<HTMLElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    heroRef.current?.classList.add("reveal-in")

    const context = gsap.context(() => {
      const media = gsap.matchMedia()
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const sections = articleRef.current?.querySelectorAll(".animate-section")
        sections?.forEach((section) => {
          gsap.fromTo(
            section,
            { opacity: 0, y: 36 },
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            }
          )
        })
      })
    }, articleRef)

    return () => context.revert()
  }, [])

  return (
    <main className="min-h-screen overflow-hidden bg-background-navy">
      <Navigation />

      <header className="relative overflow-hidden border-b border-white/[0.06] pb-16 pt-32 md:pb-24">
        <div aria-hidden="true" className="aurora absolute inset-0 pointer-events-none" />
        <div aria-hidden="true" className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />
        <div aria-hidden="true" className="absolute -left-24 top-32 h-80 w-80 rounded-full bg-primary/15 blur-[100px]" />
        <div aria-hidden="true" className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-amber-500/10 blur-[100px]" />

        <div ref={heroRef} className="reveal container relative mx-auto px-4 lg:px-8">
          <Link
            href="/blog"
            className="mb-10 inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
            Back to Blog
          </Link>

          <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_.98fr] lg:gap-16">
            <div>
              <div className="mb-6 flex flex-wrap gap-2">
                <Badge className="bg-gradient-wiqonn text-background">Wiqonn Research</Badge>
                <Badge variant="outline" className="border-primary/40 text-primary">Multimodal AI</Badge>
                <Badge variant="outline" className="border-primary/40 text-primary">Model Evaluation</Badge>
              </div>

              <h1 className="max-w-[20ch] text-4xl font-bold leading-[1.03] tracking-[-0.04em] md:text-5xl lg:text-6xl">
                Structured Output Does Not Guarantee Visual Grounding:{" "}
                <span className="text-gradient-wiqonn">An Empirical Study of Vision-Language Model Localization.</span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                An empirical study of coordinate interfaces, crop selection and answer
                reliability for visual agents and Physical AI.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-2"><User className="h-4 w-4" aria-hidden="true" />Wayner Barrios</span>
                <span className="flex items-center gap-2"><Calendar className="h-4 w-4" aria-hidden="true" />October 2026</span>
                <span className="flex items-center gap-2"><Clock className="h-4 w-4" aria-hidden="true" />12 min read</span>
              </div>
            </div>

            <figure className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/15 to-amber-500/10 blur-2xl" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-[1.65rem] border border-white/15 bg-[#050b14] p-2 shadow-2xl shadow-black/40">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.2rem]">
                  <Image
                    src="/blog/visual-grounding/faucet-full.png"
                    alt="Bathroom image used in the experiment, with a model crop around the faucet and a larger reference region containing both the faucet and towel"
                    fill
                    loading="eager"
                    fetchPriority="high"
                    sizes="(max-width: 1024px) 100vw, 48vw"
                    className="object-cover"
                  />
                  <div className="absolute z-20 border-2 border-amber-400 shadow-[0_0_0_1px_rgba(0,0,0,.4),0_0_18px_rgba(251,191,36,.45)]" style={{ left: "68.8%", top: "59.2%", width: "12.8%", height: "16%" }} />
                  <div className="absolute z-10 border-2 border-dashed border-primary shadow-[0_0_0_1px_rgba(0,0,0,.4),0_0_18px_rgba(34,211,238,.45)]" style={{ left: "64%", top: "56%", width: "33.8%", height: "44%" }} />
                  <FigureLabel tone="amber" className="left-2 top-2">model region</FigureLabel>
                  <FigureLabel className="right-2 top-2">reference region</FigureLabel>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 px-3 pb-2 pt-4 font-mono text-xs text-muted-foreground">
                  <span>Is the faucet left or right of the towel?</span>
                  <span className="text-amber-300">IoU 0.17</span>
                </div>
              </div>
              <figcaption className="mt-4 text-sm leading-relaxed text-muted-foreground">
                The extra crop emphasized the faucet but excluded the towel. The full scene
                remained available. The model answered “right,” while the published answer is
                “left.” This case raises several explanations rather than proving one.
              </figcaption>
            </figure>
          </div>
        </div>
      </header>

      <article ref={articleRef} className="relative">
        <div className="container mx-auto max-w-5xl px-4 py-16 lg:px-8 md:py-24">
          <section className="animate-section mx-auto mb-24 max-w-4xl" aria-labelledby="physical-ai-heading">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Why this matters</p>
            <h2 id="physical-ai-heading" className="mt-3 max-w-3xl text-3xl font-bold tracking-tight md:text-4xl">
              Physical AI depends on seeing the right evidence before acting
            </h2>
            <div className="mt-7 max-w-3xl space-y-5 text-lg leading-8 text-muted-foreground">
              <p>
                Physical AI connects perception to decisions in the real world. A robot picks
                an object, an inspection system flags a defect, or a visual agent decides what
                part of an image deserves another look. Each action starts with a grounding
                question: which pixels support the decision?
              </p>
              <p>
                Visual agents often answer that question by returning coordinates, cropping
                the image and adding the crop to the next model call. The crop can clarify a
                small object. An incomplete crop can also redirect attention, even when the
                full scene remains available.
              </p>
            </div>

            <div className="mt-10 rounded-2xl border border-primary/20 bg-primary/[0.045] p-6 md:p-8">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">What we tested</p>
              <ol className="mt-6 grid gap-5 md:grid-cols-2">
                {experimentSteps.map((step, index) => (
                  <li key={step} className="flex gap-4 text-sm leading-6 text-muted-foreground">
                    <span className="font-mono text-primary">0{index + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section className="animate-section mb-24" aria-labelledby="numbers-heading">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">The repaired run in three numbers</p>
                <h2 id="numbers-heading" className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Interface success was not grounding success</h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                32 development images, two draws each and one open 2B vision model.
              </p>
            </div>

            <p className="mb-8 max-w-3xl text-base leading-7 text-muted-foreground">
              A usable localization returned the expected number of boxes with valid
              coordinates, so the system could turn them into a crop. After matching Qwen&apos;s
              coordinate format, 34 of 64 responses met that requirement. Those responses
              contained 49 target boxes to score.
            </p>

            <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
              {stats.map((stat) => {
                const Icon = stat.icon
                return (
                  <div key={stat.value} className="group bg-[#07101c] p-6 transition-colors hover:bg-[#0a1626]">
                    <Icon className="mb-8 h-5 w-5 text-primary transition-transform group-hover:scale-110" aria-hidden="true" />
                    <p className="font-mono text-3xl font-bold tracking-tight text-foreground">{stat.value}</p>
                    <p className="mt-2 font-medium text-foreground">{stat.label}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{stat.note}</p>
                  </div>
                )
              })}
            </div>
          </section>

          <div className="mx-auto max-w-4xl">
            <div className="min-w-0">
              <section className="animate-section mb-20" aria-labelledby="problem-heading">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">01 · The hidden dependency</p>
                <h2 id="problem-heading" className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">The crop was part of the model</h2>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                  A vision system that adds a localized crop is not one model call. It is a
                  chain: interpret the question, locate the relevant object, convert the box
                  into pixels, crop the source image and answer from the full scene plus the
                  crop. A failure in any link changes the evidence emphasized downstream.
                </p>
                <GroundingPipeline />
                <p className="text-lg leading-8 text-muted-foreground">
                  The first implementation asked for coordinates normalized from 0 to 1.
                  Qwen returned values in its familiar 0 to 1000 convention. The validator
                  rejected all 64 localizer responses and marked them invalid, so the policy
                  used the full image instead. The resulting 44/64 answer score came from that
                  fallback. No model-generated crop from this run was used or evaluated.
                </p>

                <p className="mt-5 border-l-2 border-amber-400 pl-5 text-base leading-7 text-muted-foreground">
                  The original 0/64 result is a parser outcome. It measures compatibility with
                  the first coordinate contract, not whether the model could visually locate
                  any of the objects.
                </p>

                <div className="my-8 overflow-hidden rounded-2xl border border-amber-400/20 bg-amber-500/[0.055]">
                  <div className="flex items-center gap-3 border-b border-amber-400/15 px-5 py-3 font-mono text-xs uppercase tracking-[0.18em] text-amber-300">
                    <AlertTriangle className="h-4 w-4" aria-hidden="true" />
                    Same concept, incompatible coordinate language
                  </div>
                  <div className="grid gap-px bg-amber-400/10 md:grid-cols-2">
                    <div className="bg-[#0c1118] p-5">
                      <p className="mb-3 text-sm font-semibold text-foreground">Requested</p>
                      <pre className="overflow-x-auto font-mono text-sm leading-7 text-muted-foreground"><code>{`{"boxes":[[0.10,0.10,0.40,0.40]]}`}</code></pre>
                      <p className="mt-3 text-xs text-muted-foreground">Normalized range: 0 to 1</p>
                    </div>
                    <div className="bg-[#0c1118] p-5">
                      <p className="mb-3 text-sm font-semibold text-foreground">Observed behavior</p>
                      <pre className="overflow-x-auto font-mono text-sm leading-7 text-amber-300"><code>{`{"boxes":[[852,427,995,520]]}`}</code></pre>
                      <p className="mt-3 text-xs text-muted-foreground">Qwen-style range: 0 to 1000</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="animate-section mb-20" aria-labelledby="repair-heading">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">02 · Repair the interface</p>
                <h2 id="repair-heading" className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Changing the contract fixed parsing, not perception</h2>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                  A separate follow-up used Qwen&apos;s native 0 to 1000 coordinate scale and
                  included a format-only box example. Usable localizations rose from 0/64 to
                  34/64. That is a real engineering improvement. It also exposed the next
                  failure layer: only 19 of 49 ordered targets reached IoU 0.5 against the
                  published target boxes.
                </p>

                <div className="my-10 grid gap-5 md:grid-cols-2">
                  <figure className="overflow-hidden rounded-2xl border border-white/10 bg-card/30">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src="/blog/visual-grounding/faucet-full.png"
                        alt="Bathroom scene with a faucet near the center and a white towel on the right"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                      <FigureLabel tone="amber" className="left-3 top-3">failed grounding</FigureLabel>
                    </div>
                    <div className="grid grid-cols-2 gap-px bg-white/10">
                      <div className="bg-[#08111d] p-4">
                        <div className="relative mx-auto h-24 w-full overflow-hidden rounded-lg bg-black/40">
                          <Image src="/blog/visual-grounding/faucet-model-crop.png" alt="Model-selected crop containing the faucet and soap dispenser but excluding the towel" fill sizes="240px" className="object-contain [image-rendering:auto]" />
                        </div>
                        <p className="mt-3 font-mono text-xs text-amber-300">Model crop · answer: right</p>
                      </div>
                      <div className="bg-[#08111d] p-4">
                        <div className="relative mx-auto h-24 w-full overflow-hidden rounded-lg bg-black/40">
                          <Image src="/blog/visual-grounding/faucet-reference.png" alt="Reference region containing both the faucet and the towel required for the comparison" fill sizes="240px" className="object-contain [image-rendering:auto]" />
                        </div>
                        <p className="mt-3 font-mono text-xs text-primary">Reference region · faucet + towel</p>
                      </div>
                    </div>
                    <figcaption className="p-5 text-sm leading-relaxed text-muted-foreground">
                      The extra crop kept the faucet but cut out the towel. The full scene was
                      still present, so this does not prove the evidence was unavailable. It
                      shows that the crop failed to isolate the full relation and the answer
                      remained wrong.
                    </figcaption>
                  </figure>

                  <figure className="overflow-hidden rounded-2xl border border-white/10 bg-card/30">
                    <div className="relative aspect-[500/375] overflow-hidden">
                      <Image
                        src="/blog/visual-grounding/hat-full.png"
                        alt="Pizza kitchen scene with a worker wearing a small green hat"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                      <FigureLabel className="left-3 top-3">successful grounding</FigureLabel>
                    </div>
                    <div className="grid grid-cols-2 gap-px bg-white/10">
                      <div className="bg-[#08111d] p-4">
                        <div className="relative mx-auto h-24 w-full overflow-hidden rounded-lg bg-black/40">
                          <Image src="/blog/visual-grounding/hat-model-crop.png" alt="Model-selected crop tightly framing the green hat" fill sizes="240px" className="object-contain [image-rendering:auto]" />
                        </div>
                        <p className="mt-3 font-mono text-xs text-primary">Model crop · answer: green</p>
                      </div>
                      <div className="bg-[#08111d] p-4">
                        <div className="relative mx-auto h-24 w-full overflow-hidden rounded-lg bg-black/40">
                          <Image src="/blog/visual-grounding/hat-reference.png" alt="Reference crop tightly framing the same green hat" fill sizes="240px" className="object-contain [image-rendering:auto]" />
                        </div>
                        <p className="mt-3 font-mono text-xs text-primary">Reference crop · answer: green</p>
                      </div>
                    </div>
                    <figcaption className="p-5 text-sm leading-relaxed text-muted-foreground">
                      Here the box overlaps the intended hat at IoU 0.538. The crop repaired
                      the first answer from black to green.
                    </figcaption>
                  </figure>
                </div>

                <p className="text-lg leading-8 text-muted-foreground">
                  These paired cases are why aggregate accuracy is not enough. The same
                  interface can add a useful visual cue in one image and an incomplete cue in
                  another.
                </p>
              </section>

              <section className="animate-section mb-20" aria-labelledby="outcomes-heading">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">03 · Measure the whole policy</p>
                <h2 id="outcomes-heading" className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">A promising accuracy row with an inconclusive comparison</h2>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                  With the repaired interface, the model-selected crop policy returned 46/64
                  correct answers, compared with 40/64 for a fresh full-image answer. It
                  repaired 6 of 22 initial errors and retained 40 of 42 initially correct
                  answers. The observed difference was +9.4 percentage points, but the
                  descriptive image-cluster interval ran from -3.1 to +21.9 points.
                </p>
                <OutcomeBars />
                <p className="text-lg leading-8 text-muted-foreground">
                  The annotation-guided crop reached 48/64, which suggests that better visual
                  evidence could help. It also lost four initially correct answers. Cropping
                  changes resolution and removes context, so even a reference region is not
                  a monotonic improvement.
                </p>
              </section>

              <section className="animate-section mb-20" aria-labelledby="format-heading">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">04 · Syntax is not semantics</p>
                <h2 id="format-heading" className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Eight valid outputs, six correctly grounded targets</h2>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                  We also ran a separate constructed grounding check with known target
                  geometry. All 8 outputs were format-usable. Only 6 of the 12 ordered targets
                  reached IoU 0.5. This isolates the lesson behind the title: a response can
                  satisfy the interface and still point at the wrong evidence.
                </p>

                <div className="my-8 grid overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2 md:gap-px">
                  {[
                    ["8 / 8", "format-usable outputs", CheckCircle2],
                    ["6 / 12", "targets correctly localized", ScanSearch],
                  ].map(([value, label, Icon]) => {
                    const MetricIcon = Icon as typeof ScanSearch
                    return (
                      <div key={String(label)} className="bg-[#08111d] p-6">
                        <MetricIcon className="mb-6 h-5 w-5 text-primary" aria-hidden="true" />
                        <p className="font-mono text-3xl font-bold text-foreground">{String(value)}</p>
                        <p className="mt-2 text-sm text-muted-foreground">{String(label)}</p>
                      </div>
                    )
                  })}
                </div>

                <div className="rounded-2xl border border-primary/20 bg-primary/[0.045] p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <Lightbulb className="mt-1 h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
                    <div>
                      <h3 className="text-xl font-bold">The evaluation needs at least three gates</h3>
                      <ol className="mt-5 space-y-4 text-muted-foreground">
                        <li><span className="mr-3 font-mono text-primary">01</span>Can the output be parsed under the declared schema?</li>
                        <li><span className="mr-3 font-mono text-primary">02</span>Does the selected region contain the intended object?</li>
                        <li><span className="mr-3 font-mono text-primary">03</span>Does the extra evidence improve the final decision without destroying correct ones?</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </section>

              <section className="animate-section mb-20" aria-labelledby="related-heading">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">05 · Secondary analysis</p>
                <h2 id="related-heading" className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Localization was not automatically a better verifier</h2>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                  This chart is not part of the core localization experiment. A separate
                  four-image, two-model feasibility study compared single
                  verification, repeated checks and candidate-blind localization. The
                  candidate-blind policy matched single and repeated verification on the
                  observed approvals. It did not establish a gain, and the sample was too
                  small for a general conclusion.
                </p>
                <figure className="my-8 overflow-hidden rounded-2xl border border-white/10 bg-white p-3 md:p-6">
                  <Image
                    src="/blog/visual-grounding/related-approval-policies.png"
                    alt="Python-generated bar chart comparing incorrect and correct approvals for five verification policies"
                    width={2048}
                    height={672}
                    sizes="(max-width: 1024px) 100vw, 900px"
                    className="h-auto w-full"
                  />
                  <figcaption className="px-2 pb-2 pt-5 text-sm leading-relaxed text-slate-600">
                    Secondary evidence only. This Python-generated figure reports eight
                    model-image units per claim type and is not a ranking of model quality.
                  </figcaption>
                </figure>
              </section>

              <section className="animate-section mb-20" aria-labelledby="production-heading">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">06 · Production checklist</p>
                <h2 id="production-heading" className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">What we would require before deployment</h2>
                <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
                  {productionChecks.map((item, index) => (
                    <div key={item.title} className="grid gap-3 py-6 md:grid-cols-[52px_220px_1fr] md:items-start">
                      <span className="font-mono text-sm text-primary">0{index + 1}</span>
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                      <p className="leading-7 text-muted-foreground">{item.text}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="animate-section mb-20" aria-labelledby="discussion-heading">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">07 · Discussion</p>
                <h2 id="discussion-heading" className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Why did the model keep answering “right”?</h2>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                  In the first faucet draw, the model answered “right” from the full image and
                  from every full-image-plus-crop condition. In the second draw, only the
                  model-selected crop changed the answer to the published “left.” Later calls
                  never received the initial answer, so simple answer anchoring does not explain
                  the pattern. The experiment still leaves several plausible causes open.
                </p>

                <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
                  {competingExplanations.map((item, index) => (
                    <article key={item.title} className="grid gap-3 py-6 md:grid-cols-[48px_190px_1fr] md:items-start">
                      <span className="font-mono text-sm text-primary">0{index + 1}</span>
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                      <div className="space-y-2 text-sm leading-6 text-muted-foreground">
                        <p>{item.text}</p>
                        <p><span className="font-semibold text-foreground">Discriminating test:</span> {item.test}</p>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="mt-8 rounded-2xl border border-amber-400/20 bg-amber-500/[0.045] p-6 md:p-8">
                  <h3 className="text-xl font-bold text-foreground">Why this is not simply a dataset problem</h3>
                  <p className="mt-4 leading-7 text-muted-foreground">
                    Reference uncertainty could change the verdict on an individual image. It
                    makes an annotation audit necessary, not an explanation to assume. It
                    cannot explain the original coordinate mismatch, and it does not remove
                    the distinction between parseable output, spatial grounding and final-answer
                    accuracy. Better annotations would sharpen those measurements. They would
                    not make the measurements interchangeable.
                  </p>
                </div>
              </section>

              <section className="animate-section" aria-labelledby="bottom-line-heading">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Conclusion</p>
                <h2 id="bottom-line-heading" className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Visual grounding is an empirical claim, not a formatting property</h2>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                  This experiment separates two questions that are often treated as one. Can
                  the model return coordinates that software can parse? Do those coordinates
                  contain the evidence required by the question? The coordinate repair made
                  34 of 64 responses usable. It did not settle the second question. Only 19 of
                  49 scored targets reached IoU 0.5 after the repair.
                </p>
                <p className="mt-5 text-lg leading-8 text-muted-foreground">
                  Model-selected crops returned 46/64 correct answers, compared with 40/64 for
                  fresh full-image answers. The observed difference was +9.4 percentage points,
                  but its descriptive image-cluster interval ranged from -3.1 to +21.9 points.
                  The data therefore does not establish that cropping is reliably better. It
                  does show that output validity, spatial grounding and answer accuracy are
                  different variables. Each one needs its own measurement.
                </p>
                <p className="mt-5 text-lg leading-8 text-muted-foreground">
                  That distinction matters for visual agents and Physical AI. These systems do
                  not act on JSON alone. They act on how localized evidence changes a decision.
                  This study cannot identify one causal mechanism behind the errors. It can
                  identify the measurements needed to separate them: interface validity,
                  localization quality, evidence presentation and downstream accuracy.
                </p>
                <p className="mt-5 text-lg leading-8 text-muted-foreground">
                  A valid box is therefore a hypothesis about where the evidence is, not proof
                  of grounded perception. The next experiment should challenge that hypothesis
                  with text-only controls, mirrored scenes, both-object crops, deterministic
                  decoding, repeated seeds and independent human annotation. Evidence for
                  grounding requires both sensitivities: the answer should change when relevant
                  pixels change and remain stable when irrelevant pixels change.
                </p>
              </section>
            </div>
          </div>

          <section className="animate-section mt-24" aria-labelledby="cta-heading">
            <div className="relative overflow-hidden rounded-3xl border border-primary/20 p-8 md:p-12">
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-secondary/10" />
              <div aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-[90px]" />
              <div className="relative z-10 max-w-3xl">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Wiqonn</p>
                <h2 id="cta-heading" className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">Evaluate what your AI is actually seeing</h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
                  We design domain-specific evaluations for multimodal systems, including
                  evidence quality, failure severity, latency and inference cost.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <BookingButton className="btn-gradient h-14 px-8 text-base font-semibold text-[#0A0E1A] glow-cyan transition-all hover:scale-105" />
                  <Button size="lg" variant="outline" asChild className="h-14 px-8 text-base">
                    <a href="/en#services">Explore our AI capabilities</a>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </article>

      <Footer />
    </main>
  )
}
