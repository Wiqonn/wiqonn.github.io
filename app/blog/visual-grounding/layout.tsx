import { blogMetadata } from "@/lib/seo"

export const metadata = blogMetadata({
  title: "Visual Grounding in Vision-Language Models | Wiqonn",
  description:
    "An empirical study of coordinate interfaces, crop selection and answer reliability for visual agents and Physical AI.",
  path: "/blog/visual-grounding",
  publishedTime: "2026-10-08",
})

export default function VisualGroundingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
