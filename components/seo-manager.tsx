"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { useT } from "@/components/language-provider"
import type { Dict } from "@/lib/i18n"

const SITE_URL = "https://www.wiqonn.com"

function setMeta(attr: "name" | "property", key: string, value: string) {
  const selector = attr === "name" ? `meta[name="${key}"]` : `meta[property="${key}"]`
  const el = document.querySelector<HTMLMetaElement>(selector)
  if (el) el.setAttribute("content", value)
}

function setFaqJsonLd(faq: Dict["faq"]) {
  const el = document.getElementById("faq-jsonld")
  if (!el) return
  el.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    inLanguage: document.documentElement.lang,
    mainEntity: faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  })
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
    setFaqJsonLd(t.faq)
  }, [pathname, title, description, keywords, locale, t])

  return null
}
