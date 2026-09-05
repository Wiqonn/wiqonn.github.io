import type { Metadata } from "next"

const SITE_URL = "https://www.wiqonn.com"

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
