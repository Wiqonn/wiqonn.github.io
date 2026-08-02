"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { useT } from "@/components/language-provider"

function setMeta(attr: "name" | "property", key: string, value: string) {
  const selector = attr === "name" ? `meta[name="${key}"]` : `meta[property="${key}"]`
  const el = document.querySelector<HTMLMetaElement>(selector)
  if (el) el.setAttribute("content", value)
}

export function SeoManager() {
  const t = useT()
  const pathname = usePathname()

  useEffect(() => {
    if (pathname !== "/") return
    document.title = t.seo.title
    setMeta("name", "description", t.seo.description)
    setMeta("property", "og:title", t.seo.title)
    setMeta("property", "og:description", t.seo.description)
    setMeta("property", "og:locale", t.seo.locale)
    setMeta("name", "twitter:title", t.seo.title)
    setMeta("name", "twitter:description", t.seo.description)
  }, [pathname, t])

  return null
}
