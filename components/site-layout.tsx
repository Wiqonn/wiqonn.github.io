import type { ReactNode } from "react"
import { Lato, Open_Sans, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider"
import { LanguageProvider } from "@/components/language-provider"
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
export function SiteLayout({ children, lang, showLanguageSwitch = true }: {
  children: ReactNode
  lang: Lang
  showLanguageSwitch?: boolean
}) {
  return (
    <html lang={lang} className="dark">
      <body
        suppressHydrationWarning
        className={`${openSans.variable} ${lato.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <LanguageProvider lang={lang} showLanguageSwitch={showLanguageSwitch}>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
