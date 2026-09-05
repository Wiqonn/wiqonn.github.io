"use client"

import { createContext, useContext, type ReactNode } from "react"
import { es, en, HOME_PATHS, type Dict, type Lang } from "@/lib/i18n"

interface LanguageContextValue {
  lang: Lang
  homeHref: string
  showLanguageSwitch: boolean
  t: Dict
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "es",
  homeHref: HOME_PATHS.es,
  showLanguageSwitch: true,
  t: es,
})

// The URL's server-selected language stays stable during hydration.
export function LanguageProvider({ children, lang, showLanguageSwitch = true }: {
  children: ReactNode
  lang: Lang
  showLanguageSwitch?: boolean
}) {
  return (
    <LanguageContext.Provider value={{
      lang,
      homeHref: HOME_PATHS[lang],
      showLanguageSwitch,
      t: lang === "en" ? en : es,
    }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextValue {
  return useContext(LanguageContext)
}

export function useT(): Dict {
  return useContext(LanguageContext).t
}
