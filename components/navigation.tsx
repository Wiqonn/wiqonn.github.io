"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useLanguage, useT } from "@/components/language-provider"
import { BookingButton } from "@/components/booking-button"
import { HOME_PATHS, type Lang } from "@/lib/i18n"

/** Real language links work for crawlers and visitors without JavaScript. */
function LanguageToggle() {
  const { lang, showLanguageSwitch } = useLanguage()
  const t = useT()

  if (!showLanguageSwitch) return null

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
        <Link
          key={opt.value}
          href={HOME_PATHS[opt.value]}
          hrefLang={opt.value}
          lang={opt.value}
          aria-current={lang === opt.value ? "page" : undefined}
          aria-label={opt.aria}
          className={`inline-flex items-center justify-center h-11 min-w-11 px-3 rounded-full text-xs font-bold uppercase tracking-wide transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
            lang === opt.value
              ? "bg-primary/10 text-primary ring-1 ring-inset ring-primary/35"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {opt.label}
        </Link>
      ))}
    </div>
  )
}

export function Navigation() {
  const t = useT()
  const { homeHref } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollY = useRef(0)

  const links: { label: string; href: string }[] = [
    { label: t.nav.links[0], href: homeHref },
    { label: t.nav.links[1], href: `${homeHref}#services` },
    { label: t.nav.links[2], href: "/blog" },
    { label: t.nav.links[3], href: `${homeHref}#contact` },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Show/hide based on scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      lastScrollY.current = currentScrollY
      setIsScrolled(currentScrollY > 20)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${isScrolled ? "bg-background-navy/80 border-b border-white/10 shadow-lg shadow-black/20 backdrop-blur-xl" : "bg-transparent"}`}
    >
      <nav className="mx-auto flex h-20 w-full max-w-[1440px] items-center justify-between gap-3 px-4 lg:px-8">
        {/* Logo */}
        <Link href={homeHref} className="flex items-center gap-3 shrink-0" aria-label="Wiqonn">
          <Image
            src="/wiqonn-logo.png"
            alt="Wiqonn"
            width={150}
            height={60}
            priority
            loading="eager"
            className="h-12 w-auto object-contain lg:h-14"
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden shrink-0 items-center gap-6 lg:flex xl:gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link-cinematic rounded-sm text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2 xl:gap-3">
          {/* Language toggle (desktop) */}
          <div className="hidden md:block">
            <LanguageToggle />
          </div>

          {/* CTA */}
          <BookingButton
            size="sm"
            label={t.nav.cta}
            variant="outline"
            className="hidden h-10 whitespace-nowrap border-primary/35 bg-primary/[0.06] px-4 font-semibold text-foreground transition-colors hover:border-primary/60 hover:bg-primary/10 md:inline-flex"
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
                variant="outline"
                className="h-10 border-primary/35 bg-primary/[0.06] px-4 font-semibold text-foreground transition-colors hover:border-primary/60 hover:bg-primary/10"
              />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
