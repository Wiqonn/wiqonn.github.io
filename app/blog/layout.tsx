import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Wiqonn Blog: AI in Production, No Hype",
  description:
    "Applied research and engineering notes from Wiqonn: how to ship AI that reaches production for companies of any size, anywhere in the world. Real benchmarks, architecture decisions and working code.",
  alternates: {
    canonical: "/blog",
    languages: {
      es: "/blog",
      en: "/blog",
    },
  },
  openGraph: {
    title: "Wiqonn Blog: AI in Production, No Hype",
    description:
      "Applied research and engineering notes from Wiqonn: how to ship AI that reaches production for companies of any size, anywhere in the world.",
    url: "https://www.wiqonn.com/blog",
    siteName: "Wiqonn",
    type: "website",
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
