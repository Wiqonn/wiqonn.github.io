import type { MetadataRoute } from "next"

export const dynamic = "force-static"

const SITE_URL = "https://www.wiqonn.com"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/blog/dgx-spark-finetune`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/blog/vllm-mlx`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/brochure/`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/brochure/es/`, changeFrequency: "monthly", priority: 0.5 },
  ]
}
