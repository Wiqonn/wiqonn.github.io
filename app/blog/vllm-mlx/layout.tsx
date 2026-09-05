import { blogMetadata } from "@/lib/seo"

export const metadata = blogMetadata({
  title: "vLLM-MLX: Local LLM Benchmarks on Apple Silicon | Wiqonn",
  description:
    "Run LLMs locally on Apple Silicon with vLLM-MLX. Explore M4 Max benchmarks, continuous batching and vision caching for private AI inference.",
  path: "/blog/vllm-mlx",
  publishedTime: "2026-01-15",
})

export default function VllmMlxLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
