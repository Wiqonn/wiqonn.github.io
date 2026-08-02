"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import { es, en, type Dict, type Lang } from "@/lib/i18n"

interface LanguageContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  toggleLang: () => void
  t: Dict
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "es",
  setLang: () => {},
  toggleLang: () => {},
  t: es,
})

const STORAGE_KEY = "wiqonn-lang"

function getInitialLang(): Lang {
  if (typeof window === "undefined") return "es"
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === "es" || stored === "en") return stored
  return navigator.language?.toLowerCase().startsWith("en") ? "en" : "es"
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es")

  // Init once on mount (avoids hydration mismatch on static export).
  useEffect(() => {
    setLangState(getInitialLang())
  }, [])

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* private mode: ignore */
    }
  }, [])

  const toggleLang = useCallback(() => {
    setLang(lang === "es" ? "en" : "es")
  }, [lang, setLang])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const t = lang === "en" ? en : es

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
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
