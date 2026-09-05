import type { ReactNode } from "react"
import { Lato, Open_Sans, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider"
import { LanguageProvider } from "@/components/language-provider"
import { SeoManager } from "@/components/seo-manager"
import type { Lang } from "@/lib/i18n"
import "@/app/globals.css"

const lato = Lato({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-lato",
})
const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-open-sans" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" })

// Separate root layouts let static crawlers receive the correct document language.
export function SiteLayout({ children, lang, fixedLanguage = false }: {
  children: ReactNode
  lang: Lang
  fixedLanguage?: boolean
}) {
  return (
    <html lang={lang} className="dark" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${openSans.variable} ${lato.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <LanguageProvider initialLang={lang} fixedLanguage={fixedLanguage}>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
          <SeoManager />
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
