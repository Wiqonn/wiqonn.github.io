import type React from "react"
import type { Metadata } from "next"
import { SiteLayout } from "@/components/site-layout"

const SITE_URL = "https://www.wiqonn.com"

// Metadata estática por defecto en español; el idioma activo se gestiona
// en cliente vía LanguageProvider (localStorage `wiqonn-lang` + navigator.language).
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Wiqonn",
  description:
    "Wiqonn investiga, adapta, entrena, evalúa y despliega sistemas de IA a la medida para organizaciones de cualquier tamaño en todo el mundo.",
  keywords:
    "consultoría de IA Colombia, implementación de IA, inteligencia artificial, AI lab, applied research IA, investigación aplicada en IA, modelos de IA personalizados, fine-tuning de LLM, modelos de lenguaje grandes, agentes de IA personalizados, machine learning, deep learning, LLM/RAG, visión por computador, MLOps, business intelligence, dashboards, cloud computing, infraestructura cloud, automatización de procesos, análisis de datos, Barranquilla, Colombia, nearshore AI",
  alternates: {
    canonical: `${SITE_URL}/`,
  },
  openGraph: {
    title: "Wiqonn",
    description:
      "Investigamos, adaptamos, entrenamos, evaluamos y desplegamos sistemas de IA a la medida para organizaciones de cualquier tamaño.",
    url: `${SITE_URL}/`,
    siteName: "Wiqonn",
    type: "website",
    locale: "es_CO",
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
    title: "Wiqonn",
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
  return <SiteLayout lang="es">{children}</SiteLayout>
}
