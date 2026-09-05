import type { ReactNode } from "react"
import { SiteLayout } from "@/components/site-layout"
import { homeMetadata } from "@/lib/seo"

export const metadata = homeMetadata("es")

export default function RootLayout({ children }: { children: ReactNode }) {
  return <SiteLayout lang="es">{children}</SiteLayout>
}
