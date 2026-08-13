import type React from "react"
import type { Metadata } from "next"
import { Lato, Open_Sans, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider"
import { LanguageProvider } from "@/components/language-provider"
import { SeoManager } from "@/components/seo-manager"
import "./globals.css"

const lato = Lato({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-lato",
})

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})

const SITE_URL = "https://www.wiqonn.com"

// Metadata estática por defecto en español; el idioma activo se gestiona
// en cliente vía LanguageProvider (localStorage `wiqonn-lang` + navigator.language).
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Laboratorio de IA aplicada | Sistemas de IA a la medida | Wiqonn",
  description:
    "Wiqonn investiga, adapta, entrena, evalúa y despliega sistemas de IA a la medida para organizaciones de cualquier tamaño en todo el mundo.",
  keywords:
    "consultoría de IA Colombia, implementación de IA, inteligencia artificial, AI lab, applied research IA, investigación aplicada en IA, modelos de IA personalizados, fine-tuning de LLM, modelos de lenguaje grandes, agentes de IA personalizados, machine learning, deep learning, LLM/RAG, visión por computador, MLOps, business intelligence, dashboards, cloud computing, infraestructura cloud, automatización de procesos, análisis de datos, Barranquilla, Colombia, nearshore AI",
  alternates: {
    canonical: "/",
    languages: {
      es: "/",
      en: "/",
    },
  },
  openGraph: {
    title: "Laboratorio de IA aplicada | Sistemas de IA a la medida | Wiqonn",
    description:
      "Investigamos, adaptamos, entrenamos, evaluamos y desplegamos sistemas de IA a la medida para organizaciones de cualquier tamaño.",
    url: SITE_URL,
    siteName: "Wiqonn",
    type: "website",
    locale: "es_CO",
    alternateLocale: "en_US",
    images: [
      {
        url: "/wiqonn-icon.png",
        width: 500,
        height: 500,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Laboratorio de IA aplicada | Sistemas de IA a la medida | Wiqonn",
    description:
      "Del modelo y los datos a sistemas de IA que funcionan en el mundo real.",
    images: ["/wiqonn-icon.png"],
  },
  icons: {
    icon: "/wiqonn-icon.png",
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${openSans.variable} ${lato.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <LanguageProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
          <SeoManager />
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
