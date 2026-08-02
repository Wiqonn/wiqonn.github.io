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
  const title = t.seo.title
  const description = t.seo.description
  const keywords = t.seo.keywords
  const locale = t.seo.locale

  useEffect(() => {
    if (pathname !== "/") return
    document.title = title
    setMeta("name", "description", description)
    setMeta("name", "keywords", keywords)
    setMeta("property", "og:title", title)
    setMeta("property", "og:description", description)
    setMeta("property", "og:locale", locale)
    setMeta("name", "twitter:title", title)
    setMeta("name", "twitter:description", description)
  }, [pathname, title, description, keywords, locale])

  return null
}
