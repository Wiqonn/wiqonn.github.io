"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useLanguage, useT } from "@/components/language-provider"
import { BookingButton } from "@/components/booking-button"
import type { Lang } from "@/lib/i18n"

/** Toggle ES/EN: dos botones segmentados (44px de área táctil mínima,
 *  aria-pressed, focus-visible). Persistencia vía LanguageProvider. */
function LanguageToggle() {
  const { lang, setLang } = useLanguage()
  const t = useT()

  const options: { value: Lang; label: string; aria: string }[] = [
    { value: "es", label: "ES", aria: "Español" },
    { value: "en", label: "EN", aria: "English" },
  ]

  return (
    <div
      role="group"
      aria-label={t.nav.langLabel}
      className="flex items-center rounded-full border border-border/50 bg-background/60 p-1"
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => setLang(opt.value)}
          aria-pressed={lang === opt.value}
          aria-label={opt.aria}
          className={`h-11 min-w-11 px-3 rounded-full text-xs font-bold uppercase tracking-wide transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
            lang === opt.value
              ? "bg-gradient-wiqonn text-[#0A0E1A]"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

export function Navigation() {
  const t = useT()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const links: { label: string; href: string }[] = [
    { label: t.nav.links[0], href: "/" },
    { label: t.nav.links[1], href: "/#services" },
    { label: t.nav.links[2], href: "/blog" },
    { label: t.nav.links[3], href: "/#contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Show/hide based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
      setIsScrolled(currentScrollY > 20)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${isScrolled ? "bg-background-navy/95 border-b border-border/50 shadow-lg shadow-black/20" : "bg-transparent"}`}
    >
      <nav className="container mx-auto px-4 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="Wiqonn">
          <Image
            src="/wiqonn-logo.png"
            alt="Wiqonn"
            width={150}
            height={60}
            className="w-auto h-10 md:h-14 object-contain"
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Language toggle (desktop) */}
          <div className="hidden md:block">
            <LanguageToggle />
          </div>

          {/* CTA */}
          <BookingButton
            size="sm"
            label={t.nav.cta}
            className="hidden md:inline-flex bg-gradient-wiqonn hover:opacity-90 transition-all text-background font-semibold h-10 px-4"
          />

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            aria-label={t.nav.menuLabel}
            aria-expanded={isMobileMenuOpen}
            className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-md text-foreground hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-border/50 bg-background-navy/95 backdrop-blur-md">
          <div className="container mx-auto px-4 py-6 space-y-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 text-base font-medium text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center justify-between pt-4 border-t border-border/50">
              <LanguageToggle />
              <BookingButton
                size="sm"
                label={t.nav.cta}
                className="bg-gradient-wiqonn hover:opacity-90 transition-all text-background font-semibold h-10 px-4"
              />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
