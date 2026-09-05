import type { Metadata } from "next"
import { es, en, HOME_PATHS, type Lang } from "@/lib/i18n"

const SITE_URL = "https://www.wiqonn.com"

export const homeAlternates = {
  es: `${SITE_URL}${HOME_PATHS.es}`,
  en: `${SITE_URL}${HOME_PATHS.en}`,
  "x-default": `${SITE_URL}${HOME_PATHS.es}`,
}

export function homeMetadata(lang: Lang): Metadata {
  const { seo } = lang === "en" ? en : es
  const url = `${SITE_URL}${HOME_PATHS[lang]}`
  return {
    metadataBase: new URL(SITE_URL),
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical: url, languages: homeAlternates },
    icons: { icon: "/wiqonn-icon.png" },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url,
      siteName: "Wiqonn",
      type: "website",
      locale: seo.locale,
      alternateLocale: lang === "en" ? es.seo.locale : en.seo.locale,
      images: [{ url: "/wiqonn-icon.png", width: 500, height: 500, alt: "Wiqonn" }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: ["/wiqonn-icon.png"],
    },
  }
}

export function blogMetadata({ title, description, path, publishedTime }: {
  title: string
  description: string
  path: string
  publishedTime?: string
}): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: { canonical: `${SITE_URL}${path}` },
    icons: { icon: "/wiqonn-icon.png" },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${path}`,
      siteName: "Wiqonn",
      locale: "en_US",
      images: [{ url: "/wiqonn-icon.png", width: 500, height: 500, alt: "Wiqonn" }],
      ...(publishedTime
        ? { type: "article", publishedTime, authors: ["Wayner Barrios"] }
        : { type: "website" }),
    },
    twitter: { card: "summary_large_image", title, description, images: ["/wiqonn-icon.png"] },
  }
}
