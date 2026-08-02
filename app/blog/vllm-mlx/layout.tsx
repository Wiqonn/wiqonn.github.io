import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Run LLMs Locally on Apple Silicon: vLLM-MLX Benchmarks (M4 Max)",
  description:
    "How vLLM-MLX turns Apple Silicon into a private AI server: production-grade LLM and vision inference with continuous batching, 464 tok/s on an M4 Max, vision caching 28x faster and zero cloud costs.",
  alternates: {
    canonical: "/blog/vllm-mlx",
    languages: {
      es: "/blog/vllm-mlx",
      en: "/blog/vllm-mlx",
    },
  },
  openGraph: {
    title: "Run LLMs Locally on Apple Silicon: vLLM-MLX Benchmarks (M4 Max)",
    description:
      "Production-grade local inference on Apple Silicon: continuous batching, vision caching 28x faster, zero API bills.",
    url: "https://www.wiqonn.com/blog/vllm-mlx",
    siteName: "Wiqonn",
    type: "article",
    publishedTime: "2026-01-15",
    authors: ["Wayner Barrios"],
  },
}

export default function VllmMlxLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
