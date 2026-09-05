import { blogMetadata } from "@/lib/seo"

export const metadata = blogMetadata({
  title: "DGX Spark Fine-Tuning with LoRA & NVFP4 | Wiqonn",
  description:
    "Fine-tune 3B LLMs on NVIDIA DGX Spark with LoRA and NVFP4. Compare memory use, export models and serve them with TensorRT-LLM.",
  path: "/blog/dgx-spark-finetune",
  publishedTime: "2026-08-02",
})

export default function DgxSparkFineTuneLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
