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
  HardDrive,
  Boxes,
  GitBranch,
  BookOpen,
  Lightbulb,
  Layers,
  Zap,
  Binary,
  Scale,
} from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { CodeBlock } from "@/components/blog/code-block"
import { NVFP4FormatDiagram } from "@/components/blog/nvfp4-format-diagram"
import { VramChart, ArtifactChart, LoRAParameterChart } from "@/components/blog/quant-charts"
import { BookingButton } from "@/components/booking-button"

gsap.registerPlugin(ScrollTrigger)

const TE_TRAINER_CMD = `# finetune.py: the custom trainer that makes 4-bit training work
if use_te:
    from transformer_engine.pytorch import fp8_autocast

    class TETrainer(SFTTrainer):
        """Custom trainer that wraps forward pass with Transformer Engine autocast"""
        def training_step(self, model, inputs, num_items_in_batch=None):
            with fp8_autocast(enabled=True, fp8_recipe=te_recipe):
                return super().training_step(model, inputs, num_items_in_batch)

    trainer = TETrainer(
        model=model,
        args=training_args,
        train_dataset=dataset,
        processing_class=tokenizer,
    )
else:
    trainer = SFTTrainer(
        model=model,
        args=training_args,
        train_dataset=dataset,
        processing_class=tokenizer,
    )`

const QUANT_CONFIG_CMD = `# finetune.py: bitsandbytes FP4 (any CUDA GPU)
def get_quantization_config():
    return BitsAndBytesConfig(
        load_in_4bit=True,
        bnb_4bit_quant_type="fp4",      # NVFP4 format (E2M1)
        bnb_4bit_compute_dtype=torch.bfloat16,  # dequantized matmuls run in bf16
        bnb_4bit_use_double_quant=True, # nested quantization: quantize the scales too
    )`

const LORA_CONFIG_CMD = `# finetune.py: LoRA targeting every linear in the transformer block
def get_lora_config():
    return LoraConfig(
        r=64,               # LoRA rank
        lora_alpha=128,     # LoRA alpha scaling (alpha / r = 2.0)
        lora_dropout=0.05,
        bias="none",
        task_type="CAUSAL_LM",
        target_modules=[
            "q_proj", "k_proj", "v_proj", "o_proj",   # attention
            "gate_proj", "up_proj", "down_proj",      # MLP (SwiGLU)
        ],
    )`

const SFT_CONFIG_CMD = `# finetune.py: training hyperparameters
training_args = SFTConfig(
    output_dir=output_dir,
    num_train_epochs=3,
    per_device_train_batch_size=16,
    gradient_accumulation_steps=1,   # Effective batch = 16
    gradient_checkpointing=True,     # recompute activations, not store them
    gradient_checkpointing_kwargs={"use_reentrant": False},
    optim="paged_adamw_8bit" if not use_te else "adamw_torch",
    learning_rate=2e-4,
    lr_scheduler_type="cosine",
    warmup_ratio=0.1,
    logging_steps=1,
    save_strategy="epoch",
    save_total_limit=2,
    bf16=True,
    tf32=True,
    max_grad_norm=0.3,
    max_length=MAX_SEQ_LENGTH,       # 8192
    packing=False,
    report_to="tensorboard",
    logging_dir=os.path.join(output_dir, "logs"),
    seed=42,
)`

const EXPORT_CMD = `# inference.py --export-nvfp4: calibration with ModelOpt
def export_nvfp4_tensorrt(merged_path, output_path, calib_size=256):
    # 1. Load the merged bf16 model
    model = AutoModelForCausalLM.from_pretrained(merged_path, torch_dtype=torch.bfloat16)

    # 2. Build 256 calibration samples from wikitext-2 (512 tokens each)
    dataset = load_dataset("wikitext", "wikitext-2-raw-v1", split="train")
    calib_data = []
    for i, sample in enumerate(dataset):
        if i >= calib_size:
            break
        if sample["text"].strip():
            tokens = tokenizer(sample["text"], return_tensors="pt",
                               max_length=512, truncation=True, padding="max_length")
            calib_data.append(tokens["input_ids"].to(model.device))

    # 3. Measure activation ranges during a no-grad forward pass
    def forward_loop(model):
        for batch in calib_data:
            with torch.no_grad():
                model(batch)

    # 4. Quantize: per-block FP4 scales are fitted to observed ranges
    model = mtq.quantize(model, mtq.NVFP4_DEFAULT_CFG, forward_loop)

    # 5. Export the quantized checkpoint for TensorRT-LLM
    with torch.inference_mode():
        export_hf_checkpoint(model, dtype=torch.bfloat16, export_dir=output_path)`

const THINK_CMD = `# inference.py: /think is not a prompt trick, it's a system-prompt switch
def generate_response(model, tokenizer, prompt, enable_thinking=True):
    thinking_flag = "/think" if enable_thinking else "/no_think"
    system_content = f"{thinking_flag}\\nYou are a helpful AI assistant."

    messages = [
        {"role": "system", "content": system_content},
        {"role": "user", "content": prompt},
    ]
    input_text = tokenizer.apply_chat_template(
        messages, tokenize=False, add_generation_prompt=True
    )

    # With the TE backend, the forward pass runs under autocast with the recipe
    if use_nvfp4_te and hasattr(model, '_nvfp4_recipe'):
        with torch.no_grad(), te.autocast(recipe=recipe):
            outputs = model.generate(
                **inputs,
                max_new_tokens=max_new_tokens,
                temperature=temperature,
                top_p=top_p,
                do_sample=True,
                pad_token_id=tokenizer.eos_token_id,
            )`

const SERVE_CMD = `# run_serve.sh: OpenAI-compatible serving on the official container
CONTAINER="nvcr.io/nvidia/tensorrt-llm/release:spark-single-gpu-dev"

docker run \\
    --rm -it --gpus all --ipc=host --network host \\
    --ulimit memlock=-1 --ulimit stack=67108864 \\
    -v "$ABS_MODEL_PATH:/workspace/model" \\
    -e HF_TOKEN="\${HF_TOKEN:-}" \\
    $CONTAINER \\
    trtllm-serve /workspace/model \\
        --backend pytorch \\
        --max_batch_size $MAX_BATCH_SIZE \\
        --port $PORT

# Endpoints exposed:
#   GET  /health                     health check
#   GET  /v1/models                  list models
#   POST /v1/chat/completions        OpenAI chat API
#   POST /v1/completions             raw completions`

const MEMORY_CMD = `# In finetune.py - for CUDA out of memory errors:
MAX_SEQ_LENGTH = 4096          # Reduce from 8192
per_device_train_batch_size = 1 # Reduce from 16
gradient_accumulation_steps = 8  # Increase to maintain effective batch`

export default function DgxSparkFineTunePost() {
  const articleRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mq = gsap.matchMedia()

      mq.add("(prefers-reduced-motion: no-preference)", () => {
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
    })

    return () => ctx.revert()
  }, [])

  // Flip `.reveal` → `.reveal-in` for the hero (CSS utility, reduced-motion safe).
  useEffect(() => {
    heroRef.current?.classList.add("reveal-in")
  }, [])

  return (
    <main className="min-h-screen bg-background-navy">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-8 relative overflow-hidden">
        <div aria-hidden="true" className="aurora absolute inset-0 pointer-events-none" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative">
          <div ref={heroRef} className="reveal max-w-4xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>

            <div className="flex flex-wrap gap-2 mb-6">
              <Badge className="bg-gradient-wiqonn text-background">Open Source</Badge>
              <Badge variant="outline" className="border-primary/50 text-primary">
                Blackwell GB10
              </Badge>
              <Badge variant="outline" className="border-primary/50 text-primary">
                NVFP4 · MXFP8
              </Badge>
              <Badge variant="outline" className="border-primary/50 text-primary">
                LoRA
              </Badge>
              <Badge variant="outline" className="border-primary/50 text-primary">
                TensorRT-LLM
              </Badge>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-tight">
              Fine-Tune LLMs on a DGX Spark:{" "}
              <span className="text-gradient-wiqonn">LoRA + NVFP4 in Practice</span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              A desktop machine fine-tuning 3B models at 4-bit with native Blackwell
              precision. This post walks the actual code: the E2M1 format, the Transformer
              Engine autocast, the calibration step, and the Train → Export → Serve pipeline
              with real VRAM numbers.
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Wayner Barrios
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                August 2026
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                14 min read
              </span>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button asChild className="bg-gradient-wiqonn text-background hover:opacity-90">
                <a
                  href="https://github.com/waybarrios/dgx-spark-finetune-llm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-4 h-4 mr-2" />
                  View on GitHub
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a
                  href="https://github.com/NVIDIA/dgx-spark-playbooks"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  NVIDIA DGX Spark Playbooks
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <article ref={articleRef}>
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl pb-24">
          {/* Key stats */}
          <div className="animate-section grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[
              { icon: HardDrive, label: "VRAM NVFP4 (3B)", value: "~41GB" },
              { icon: Boxes, label: "LoRA Adapter", value: "~240MB" },
              { icon: Binary, label: "NVFP4 Export", value: "~1.5GB" },
              { icon: GitBranch, label: "Quant Backends", value: "3" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-card/50 border border-border/50 text-center group hover:border-primary/50 transition-colors"
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Why 4-bit training works */}
          <section className="animate-section mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Why 4-bit <span className="text-gradient-wiqonn">Training</span> Works at All
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The naive assumption is that 4-bit quantization belongs to inference, that
              training needs full precision because gradients are tiny and easily destroyed.
              That&apos;s half true, and the other half is what makes this pipeline work.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              With LoRA, the <span className="font-semibold text-foreground">base weights are never updated</span>{" "}
              because they&apos;re frozen. What gets gradients are the small A/B adapter matrices,
              which live in bf16. The 4-bit weights only participate in the forward pass,
              where their quantization error is absorbed by the optimizer the same way
              bf16 precision loss is absorbed. The result: quantized memory footprint,
              precise gradients.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The Transformer Engine goes one step further with{" "}
              <span className="font-semibold text-foreground">FP4 autocast</span>: it doesn&apos;t
              quantize weights once at load time (bitsandbytes style). Instead, it converts
              activations and weights to FP4 on the fly inside each matmul, using per-block
              scales, then accumulates in higher precision. Blackwell&apos;s tensor cores
              execute FP4 matmuls natively, so you pay roughly half the memory bandwidth of
              FP8 for the same tensor, and the quantization is recomputed every forward,
              staying optimal as weights evolve during training.
            </p>
          </section>

          {/* NVFP4 format */}
          <section className="animate-section mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              NVFP4: The E2M1 Format, Up Close
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              NVFP4 is NVIDIA&apos;s 4-bit floating-point format for Blackwell. It&apos;s not
              a linear 4-bit integer grid. It&apos;s a real float format with a sign bit,
              two exponent bits and one mantissa bit, which gives it a dynamic range that
              integer formats lack. The repo ships a pure-PyTorch reference implementation
              of the exact algorithm (nvfp4.py), which is the best way to read how it works.
            </p>

            <NVFP4FormatDiagram />

            <div className="overflow-x-auto rounded-xl border border-border/50 mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50 bg-card/50">
                    <th className="text-left py-4 px-4 font-semibold">Format</th>
                    <th className="text-left py-4 px-4 font-semibold">Bits</th>
                    <th className="text-left py-4 px-4 font-semibold">Exponent / Mantissa</th>
                    <th className="text-left py-4 px-4 font-semibold">Max Value</th>
                    <th className="text-left py-4 px-4 font-semibold">Role in Pipeline</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border/30">
                    <td className="py-3 px-4 font-medium text-foreground">FP32</td>
                    <td className="py-3 px-4">32</td>
                    <td className="py-3 px-4">8 / 23</td>
                    <td className="py-3 px-4">~3.4e38</td>
                    <td className="py-3 px-4">Global scale factor</td>
                  </tr>
                  <tr className="border-b border-border/30 bg-card/20">
                    <td className="py-3 px-4 font-medium text-foreground">BF16</td>
                    <td className="py-3 px-4">16</td>
                    <td className="py-3 px-4">8 / 7</td>
                    <td className="py-3 px-4">~3.4e38</td>
                    <td className="py-3 px-4">Weights, gradients, compute</td>
                  </tr>
                  <tr className="border-b border-border/30">
                    <td className="py-3 px-4 font-medium text-foreground">FP8 E4M3</td>
                    <td className="py-3 px-4">8</td>
                    <td className="py-3 px-4">4 / 3</td>
                    <td className="py-3 px-4">448</td>
                    <td className="py-3 px-4">Per-block scales</td>
                  </tr>
                  <tr className="border-b border-border/30 bg-card/20">
                    <td className="py-3 px-4 font-medium text-foreground text-primary">NVFP4 E2M1</td>
                    <td className="py-3 px-4">4</td>
                    <td className="py-3 px-4">2 / 1</td>
                    <td className="py-3 px-4">6.0</td>
                    <td className="py-3 px-4">Weights + activations in matmul</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-4">
              The two-scale trick in the reference implementation: a{" "}
              <span className="font-mono text-sm text-primary">global FP32 scale</span> ({" "}
              <span className="font-mono text-sm text-primary">s_enc = 6 × 448 / amax_x</span>{" "}
              ) keeps the whole tensor in range, and per-16-element micro-blocks get their
              own FP8 E4M3 scale so local outliers don&apos;t wreck the grid. Dequantization
              is just unpacking nibbles and multiplying by the inverse scales, which is
              exactly what the tensor cores do in hardware during training.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Worth noting from the repo&apos;s code: values outside ±6.0{" "}
              <span className="font-semibold text-foreground">saturate</span> (no NaN/Inf in
              the format), and the quantization uses midpoint rounding: each FP32 value
              maps to the nearest of the 8 representable magnitudes. For training, the
              reference implementation also includes a straight-through estimator (STE)
              variant, which passes gradients through the quantizer unchanged, the standard
              trick that makes quantization-aware training converge.
            </p>
          </section>

          {/* Three backends deep dive */}
          <section className="animate-section mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Three Backends, Three Different Places Where Quantization Happens
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              All three flags train the same model with the same data, but the
              quantization engine, and where it runs, is different in a way that shows up
              directly in VRAM.
            </p>

            <div className="overflow-x-auto rounded-xl border border-border/50 mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50 bg-card/50">
                    <th className="text-left py-4 px-4 font-semibold">Backend</th>
                    <th className="text-left py-4 px-4 font-semibold">Bits</th>
                    <th className="text-right py-4 px-4 font-semibold">VRAM (3B)</th>
                    <th className="text-left py-4 px-4 font-semibold">When Quantization Runs</th>
                    <th className="text-left py-4 px-4 font-semibold">GPU Support</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border/30">
                    <td className="py-3 px-4 font-medium text-foreground">bitsandbytes FP4</td>
                    <td className="py-3 px-4">4-bit</td>
                    <td className="py-3 px-4 text-right">~45GB</td>
                    <td className="py-3 px-4">Once, at load time</td>
                    <td className="py-3 px-4">Any CUDA GPU</td>
                  </tr>
                  <tr className="border-b border-border/30 bg-card/20">
                    <td className="py-3 px-4 font-medium text-foreground">
                      Transformer Engine NVFP4
                    </td>
                    <td className="py-3 px-4">4-bit</td>
                    <td className="py-3 px-4 text-right font-bold text-primary">~41GB</td>
                    <td className="py-3 px-4">Every forward, in autocast</td>
                    <td className="py-3 px-4">Blackwell</td>
                  </tr>
                  <tr className="border-b border-border/30">
                    <td className="py-3 px-4 font-medium text-foreground">
                      Transformer Engine MXFP8
                    </td>
                    <td className="py-3 px-4">8-bit</td>
                    <td className="py-3 px-4 text-right">~50GB</td>
                    <td className="py-3 px-4">Every forward, in autocast</td>
                    <td className="py-3 px-4">Blackwell</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <VramChart />

            <p className="text-muted-foreground leading-relaxed mb-4">
              <span className="font-semibold text-foreground">bitsandbytes</span> quantizes
              the weights once when the model loads, stores the FP4 tensors in memory, and
              dequantizes them back to bf16 for every matmul. Simple and portable, but the
              dequantized copy lives in memory during the forward pass, which is where the
              extra ~4GB over NVFP4 comes from.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <span className="font-semibold text-foreground">Transformer Engine</span>{" "}
              loads weights in bf16 and keeps the FP4 representation inside its own
              operators: FP4 conversion, scaling and accumulation all happen in the tensor
              core, in-place, under{" "}
              <span className="font-mono text-sm text-primary">fp8_autocast</span>. No
              dequantized copy is materialized for the matmul, so the footprint stays at the
              4-bit size of the weights.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">MXFP8</span> is the same
              autocast machinery with an E4M3 8-bit recipe (the repo uses{" "}
              <span className="font-mono text-sm text-primary">MXFP8BlockScaling</span>{" "}
              with block scaling): double the bits, roughly double the weight memory. The
              safe choice when you need the highest fidelity.
            </p>
          </section>

          {/* Training loop */}
          <section className="animate-section mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              The Training Loop, Line by Line
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              The interesting part of the repo is a 12-line custom trainer. With the TE
              backends, every training step wraps the forward pass in{" "}
              <span className="font-mono text-sm text-primary">fp8_autocast</span> with the
              recipe built from the CLI flag:
            </p>

            <CodeBlock
              filename="finetune.py"
              language="python"
              code={TE_TRAINER_CMD}
            />

            <p className="text-muted-foreground leading-relaxed mb-4">
              The recipe construction happens at load time. For NVFP4 it&apos;s{" "}
              <span className="font-mono text-sm text-primary">NVFP4BlockScaling()</span>:
              the default recipe with micro-block scaling. For MXFP8 it&apos;s{" "}
              <span className="font-mono text-sm text-primary break-all">
                MXFP8BlockScaling(fp8_format=Format.E4M3)
              </span>
              . Both require Transformer Engine ≥ 2.9, which is why the scripts run inside
              the official NVIDIA PyTorch container.
            </p>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-card/50 to-secondary/10 border border-primary/20 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Scale className="w-5 h-5 text-primary" />
                <p className="font-bold text-foreground">Why only the forward pass?</p>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Gradients are computed by backpropagation through the same FP4 matmuls, but
                the optimizer state (AdamW moments) and the LoRA adapter weights stay in
                bf16. Quantizing gradients would double the error accumulation. That&apos;s
                the line nobody crosses in QAT. Note the repo uses{" "}
                <span className="font-mono text-sm text-primary">paged_adamw_8bit</span>{" "}
                for the bitsandbytes path and plain{" "}
                <span className="font-mono text-sm text-primary">adamw_torch</span> under TE
                The paged version spills optimizer pages to CPU when memory is tight.
              </p>
            </div>
          </section>

          {/* LoRA deep dive */}
          <section className="animate-section mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              LoRA: Why ~0.5% of Parameters Is Enough
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              LoRA freezes the base model and inserts two small matrices per target linear
              layer. For a weight matrix <span className="font-mono text-sm text-primary">W</span>{" "}
              of shape <span className="font-mono text-sm text-primary">(d_in, d_out)</span>,
              it learns <span className="font-mono text-sm text-primary">A ∈ (d_in, r)</span>{" "}
              and <span className="font-mono text-sm text-primary">B ∈ (r, d_out)</span>, and
              the effective weight becomes{" "}
              <span className="font-mono text-sm text-primary">W + (α/r)·B·A</span>.
            </p>

            <CodeBlock
              filename="finetune.py"
              language="python"
              code={LORA_CONFIG_CMD}
            />

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="p-5 rounded-xl bg-card/50 border border-border/50">
                <p className="font-bold text-foreground mb-2">r = 64, α = 128</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The effective update scale is{" "}
                  <span className="font-mono text-sm text-primary">α/r = 2.0</span>. Rank 64
                  on a 3B model is on the generous side, with enough capacity for a
                  reasoning-style dataset without turning the adapters into a second model.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-card/50 border border-border/50">
                <p className="font-bold text-foreground mb-2">Why all 7 projections?</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  q/k/v/o cover attention; gate/up/down are the SwiGLU MLP. SmolLM3 uses
                  SwiGLU, so the gated projections carry most of the learned behavior.
                  Targeting all of them is the standard recipe for causal LMs and only adds
                  a few hundred MB of adapters.
                </p>
              </div>
            </div>

            <LoRAParameterChart />

            <p className="text-muted-foreground leading-relaxed">
              The memory math is why this all fits: with the base weights at 4-bit, the
              trainable LoRA parameters at bf16, and gradient checkpointing avoiding stored
              activations, the 41GB budget breaks down roughly as base weights (~1.5GB at
              FP4) + LoRA adapters and their gradients (~2GB) + optimizer state (~3GB) +
              activations for batch 16 × 8192 tokens (~25GB, checkpointed) + TE workspace
              and framework overhead. The exact split depends on sequence length, which is
              why the OOM recipe at the end of this post targets exactly those three knobs.
            </p>
          </section>

          {/* Config file */}
          <section className="animate-section mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              The Full Configuration, Explained
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              The repo ships a <span className="font-mono text-sm text-primary">config.yaml</span>{" "}
              mirroring every knob in <span className="font-mono text-sm text-primary">finetune.py</span>.
              Each choice below has a reason:
            </p>

            <CodeBlock
              filename="finetune.py: SFTConfig"
              language="python"
              code={SFT_CONFIG_CMD}
            />

            <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground mb-6">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="font-semibold text-foreground mb-1">cosine + warmup 0.1</p>
                <p>
                  Cosine decay with 10% warmup is the current standard for LLM fine-tunes.
                  warmup lets the LoRA weights stabilize before the schedule starts decaying.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="font-semibold text-foreground mb-1">max_grad_norm 0.3</p>
                <p>
                  Tighter than the classic 1.0. Reasoning datasets have long sequences and
                  rare hard examples; clipping at 0.3 stabilizes the loss curve.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="font-semibold text-foreground mb-1">packing=False</p>
                <p>
                  Sequences are not concatenated into fixed-length blocks, so every example
                  is padded to the same length instead of blending across samples, which is better
                  for instruction/reasoning formats with clear boundaries.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="font-semibold text-foreground mb-1">bf16 + tf32</p>
                <p>
                  bf16 for weights and activations, TF32 for matrix accumulation in the
                  non-TE path, the same precision class Ampere+ uses for training.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="font-semibold text-foreground mb-1">gradient_checkpointing</p>
                <p>
                  Activations are recomputed in the backward pass instead of stored, so the
                  single biggest VRAM saver at sequence length 8192.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="font-semibold text-foreground mb-1">seed 42</p>
                <p>
                  Reproducibility: everything else being equal, the same seed gives the same
                  loss curve and the same adapter.
                </p>
              </div>
            </div>

            <CodeBlock
              filename="finetune.py: bitsandbytes path"
              language="python"
              code={QUANT_CONFIG_CMD}
            />
            <p className="text-sm text-muted-foreground leading-relaxed mt-2 mb-6">
              Double quantization quantizes the FP4 scale factors themselves (a second
              quantization level), saving another ~0.4 bits per weight on average. For a 3B
              model that&apos;s roughly 150MB, the difference between fitting and not
              fitting on the GB10&apos;s budget.
            </p>
          </section>

          {/* Pipeline */}
          <section className="animate-section mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              The Complete Pipeline: Train → Export → Serve
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Training produces a LoRA adapter, which is not directly deployable. The
              export step merges it into the base model, quantizes the merged weights to
              NVFP4 with NVIDIA ModelOpt, and the serving container loads the result through
              TensorRT-LLM. Three commands, one pipeline:
            </p>

            <div className="my-8 grid md:grid-cols-3 gap-3">
              {[
                {
                  step: "1 · Train",
                  cmd: "./run_training_docker.sh nvfp4",
                  sub: "LoRA + TE NVFP4 · ~41GB VRAM",
                },
                {
                  step: "2 · Export",
                  cmd: "./run_export_nvfp4.sh",
                  sub: "Merge + ModelOpt calibration",
                },
                {
                  step: "3 · Serve",
                  cmd: "./run_serve.sh",
                  sub: "TensorRT-LLM · localhost:8000",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-stretch gap-3">
                  <div className="flex-1 p-5 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/40 transition-colors">
                    <p className="font-bold text-foreground mb-2 flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gradient-wiqonn text-background text-sm font-bold">
                        {idx + 1}
                      </span>
                      {item.step}
                    </p>
                    <p className="font-mono text-xs text-primary mb-2 break-all">
                      {item.cmd}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.sub}</p>
                  </div>
                  {idx < 2 && (
                    <span
                      aria-hidden="true"
                      className="hidden md:flex items-center text-2xl text-primary/50 self-center"
                    >
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>

            <h3 className="text-xl font-bold mt-10 mb-4">
              The Export Step: Calibration, Not Guesswork
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              FP4 quantization of the merged model needs per-block scale factors that match
              the real activation ranges, and the only way to get them is to measure.
              ModelOpt&apos;s <span className="font-mono text-sm text-primary">NVFP4_DEFAULT_CFG</span>{" "}
              takes a forward loop over 256 calibration samples (512 tokens each, drawn from
              wikitext-2) to fit the scales:
            </p>

            <CodeBlock
              filename="inference.py: export_nvfp4_tensorrt()"
              language="python"
              code={EXPORT_CMD}
            />

            <div className="overflow-x-auto rounded-xl border border-border/50 my-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50 bg-card/50">
                    <th className="text-left py-4 px-4 font-semibold">Artifact</th>
                    <th className="text-right py-4 px-4 font-semibold">Size</th>
                    <th className="text-left py-4 px-4 font-semibold">Used For</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border/30">
                    <td className="py-3 px-4 font-medium text-foreground">LoRA adapter (bf16)</td>
                    <td className="py-3 px-4 text-right">~240MB</td>
                    <td className="py-3 px-4">Experimentation, multiple versions</td>
                  </tr>
                  <tr className="border-b border-border/30 bg-card/20">
                    <td className="py-3 px-4 font-medium text-foreground">NVFP4 export (FP4)</td>
                    <td className="py-3 px-4 text-right font-bold text-primary">~1.5GB</td>
                    <td className="py-3 px-4">TensorRT-LLM deployment</td>
                  </tr>
                  <tr className="border-b border-border/30">
                    <td className="py-3 px-4 font-medium text-foreground">Merged model (bf16)</td>
                    <td className="py-3 px-4 text-right">~6GB</td>
                    <td className="py-3 px-4">Full-precision fallback</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <ArtifactChart />

            <h3 className="text-xl font-bold mt-10 mb-4">Serving: One Official Container</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Serving uses NVIDIA&apos;s reference container for the DGX Spark and{" "}
              <span className="font-mono text-sm text-primary">trtllm-serve</span> with the
              PyTorch backend, with no custom Dockerfiles. You get a fully OpenAI-compatible
              API, which means any existing client code keeps working:
            </p>

            <CodeBlock
              filename="run_serve.sh"
              language="bash"
              code={SERVE_CMD}
            />

            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-card/50 to-secondary/10 border border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-5 h-5 text-primary" />
                <p className="font-bold text-foreground">The drop-in migration trick</p>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Point your OpenAI SDK at <span className="font-mono text-sm text-primary">localhost:8000</span>{" "}
                instead of the cloud endpoint and the model name changes. That&apos;s it.
                The fine-tuned model becomes a private drop-in replacement, and the
                deployment size is small enough to ship on a laptop if you ever need to move.
              </p>
            </div>
          </section>

          {/* Extended thinking */}
          <section className="animate-section mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Extended Thinking: /think and /no_think
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              The training dataset is{" "}
              <span className="font-mono text-sm text-primary break-all">
                TeichAI/claude-4.5-opus-high-reasoning-250x
              </span>{" "}
              a collection of high-quality reasoning traces. The model learns to produce
              long chains of thought, which is ideal for hard problems and wasteful for
              simple ones. The repo implements the toggle at the system-prompt level:
            </p>

            <CodeBlock
              filename="inference.py: generate_response()"
              language="python"
              code={THINK_CMD}
            />

            <p className="text-muted-foreground leading-relaxed mb-4">
              Because the flag lives in the system prompt, it works on any chat template and
              can be toggled per message in interactive mode without reloading the model.
              Under the hood this is just the chat template doing its job, but it&apos;s a
              neat demonstration of why system prompts are the right lever for controlling
              reasoning effort instead of decoding tricks like max-token capping.
            </p>
          </section>

          {/* OOM */}
          <section className="animate-section mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              When You Hit Out of Memory
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              The three knobs that dominate VRAM in this pipeline are sequence length,
              batch size, and stored activations. The documented OOM path attacks exactly
              those, in order of impact:
            </p>

            <CodeBlock
              filename="finetune.py"
              language="python"
              code={MEMORY_CMD}
            />

            <div className="grid md:grid-cols-3 gap-4 text-sm text-muted-foreground mt-6">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="font-semibold text-foreground mb-1">Sequence length</p>
                <p>
                  8192 → 4096 halves activation memory for a single sequence, the fastest
                  lever.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="font-semibold text-foreground mb-1">Batch size</p>
                <p>
                  16 → 1 drops activation memory by 16x. Gradient accumulation preserves the
                  effective batch, just slower.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="font-semibold text-foreground mb-1">Effective batch</p>
                <p>
                  accumulation 1 → 8 with batch 1 keeps the same 16-sample effective batch
                  the defaults were tuned for.
                </p>
              </div>
            </div>
          </section>

          {/* Takeaways */}
          <section className="animate-section mb-16">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-card/50 to-secondary/10 border border-primary/20">
              <div className="flex items-center gap-3 mb-6">
                <Lightbulb className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-bold">Takeaways</h2>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">1.</span>
                  <span>
                    4-bit <span className="font-semibold text-foreground">training</span> is
                    viable because LoRA keeps gradients in bf16 while only the frozen weights
                    live at FP4. Quantization error lands in the forward pass, not the
                    optimizer.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">2.</span>
                  <span>
                    NVFP4 is a real float format (E2M1) with block scaling, not a linear
                    grid. That dynamic range is why it holds up where INT4 grinds.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">3.</span>
                  <span>
                    Where quantization runs matters: TE autocast (every forward) beats
                    load-time bitsandbytes by ~4GB on the same 3B model.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">4.</span>
                  <span>
                    A fine-tuned model that fits on a laptop: ~240MB adapter for
                    experimentation, ~1.5GB NVFP4 artifact for serving, zero cloud
                    dependency.
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Wiqonn conversion CTA */}
          <section className="animate-section mt-16">
            <div className="relative p-8 md:p-12 rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
              <div className="relative z-10 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Want private AI in your company?
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  We fine-tune and deploy private models on your own hardware, with scope,
                  price and an evidence plan defined in writing for each phase. Book a free
                  30-minute technical conversation.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <BookingButton className="btn-gradient glow-cyan hover:scale-105 transition-all text-base px-8 h-14 text-[#0A0E1A] font-semibold" />
                  <Button size="lg" variant="outline" asChild className="h-14 px-8 text-lg">
                    <a href="/#services">
                      Explore our AI capabilities
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* GitHub CTA */}
          <section className="animate-section">
            <div className="relative p-8 md:p-12 rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background-navy to-secondary/20" />
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/30 rounded-full blur-[100px]" />
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/30 rounded-full blur-[100px]" />

              <div className="relative z-10 text-center">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  Run it on Your Own Hardware
                </h3>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Open source, MIT licensed, work in progress. Star the repo and contribute.
                  or adapt the pipeline for your own model and dataset.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button size="lg" asChild className="bg-gradient-wiqonn text-background hover:opacity-90 h-14 px-8 text-lg">
                    <a
                      href="https://github.com/waybarrios/dgx-spark-finetune-llm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-5 h-5 mr-2" />
                      Get Started on GitHub
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="h-14 px-8 text-lg">
                    <a
                      href="https://github.com/NVIDIA/TransformerEngine"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <BookOpen className="w-5 h-5 mr-2" />
                      Transformer Engine
                    </a>
                  </Button>
                </div>
                <p className="mt-6 text-sm text-muted-foreground/60">
                  NVIDIA DGX Spark (Blackwell GB10) · SmolLM3-3B · LoRA rank 64 · bf16 compute
                </p>
              </div>
            </div>
          </section>
        </div>
      </article>

      <Footer />
    </main>
  )
}
