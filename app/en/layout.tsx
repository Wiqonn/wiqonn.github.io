import type { ReactNode } from "react"
import { SiteLayout } from "@/components/site-layout"
import { homeMetadata } from "@/lib/seo"

export const metadata = homeMetadata("en")

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <SiteLayout lang="en">{children}</SiteLayout>
}
