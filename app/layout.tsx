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
  title: "Consultoría de IA en Colombia | Implementación de IA | Wiqonn",
  description:
    "AI lab en Barranquilla, Colombia. Implementamos IA, ML, agentes y BI para empresas de todo tipo en todo el mundo. Soporte local, consulta gratis.",
  keywords:
    "consultoría de IA Colombia, implementación de IA, inteligencia artificial Barranquilla, agentes de IA, machine learning, business intelligence, nearshore AI",
  alternates: {
    canonical: "/",
    languages: {
      es: "/",
      en: "/",
    },
  },
  openGraph: {
    title: "Consultoría de IA en Colombia | Implementación de IA | Wiqonn",
    description:
      "AI lab en Barranquilla, Colombia. Implementamos IA, ML, agentes y BI para empresas de todo tipo en todo el mundo.",
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
    title: "Consultoría de IA en Colombia | Implementación de IA | Wiqonn",
    description:
      "AI lab de datos y software en Barranquilla: auditamos, construimos y operamos soluciones con resultados medibles.",
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
    <html lang="es" className="dark">
      <body className={`${openSans.variable} ${lato.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <LanguageProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
          <SeoManager />
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
