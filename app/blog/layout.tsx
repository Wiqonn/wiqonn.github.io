import { SiteLayout } from "@/components/site-layout"
import { blogMetadata } from "@/lib/seo"

export const metadata = blogMetadata({
  title: "Applied AI Research & Engineering Blog | Wiqonn",
  description:
    "Explore Wiqonn's applied AI research: LLM fine-tuning, local inference benchmarks, architecture decisions and practical guides for production systems.",
  path: "/blog",
})

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <SiteLayout lang="en" fixedLanguage>{children}</SiteLayout>
}
