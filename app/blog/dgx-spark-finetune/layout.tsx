import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "DGX Spark Fine-Tuning: LoRA + NVFP4 in Practice (Blackwell GB10)",
  description:
    "Fine-tune 3B LLMs on an NVIDIA DGX Spark with LoRA and 4-bit NVFP4 training: real VRAM numbers per backend, the Train → Export → Serve pipeline with TensorRT-LLM, and an OpenAI-compatible API.",
  alternates: {
    canonical: "/blog/dgx-spark-finetune",
    languages: {
      es: "/blog/dgx-spark-finetune",
      en: "/blog/dgx-spark-finetune",
    },
  },
  openGraph: {
    title: "DGX Spark Fine-Tuning: LoRA + NVFP4 in Practice (Blackwell GB10)",
    description:
      "Fine-tune 3B LLMs on a desktop DGX Spark: NVFP4/MXFP8 backends, ~41GB VRAM, ~240MB LoRA adapters, TensorRT-LLM serving.",
    url: "https://www.wiqonn.com/blog/dgx-spark-finetune",
    siteName: "Wiqonn",
    type: "article",
    publishedTime: "2026-08-02",
    authors: ["Wayner Barrios"],
  },
}

export default function DgxSparkFineTuneLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
