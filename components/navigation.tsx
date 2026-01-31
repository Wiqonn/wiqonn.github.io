"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

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

  const navLinks = [
    { href: "#services", label: "Services" },
    { href: "#team", label: "Team" },
    { href: "#contact", label: "Contact" },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-black/5"
          : "bg-transparent"
      } ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 transition-transform duration-300 hover:scale-105"
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wiqonn-id-special-NRxy7eDlL66Iza3JiqzIjzztpOzC8e.png"
              alt="Wiqonn"
              width={180}
              height={45}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-wiqonn transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <Button
              size="lg"
              className="bg-gradient-wiqonn hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
              asChild
            >
              <a href="mailto:contact@wiqonn.com?subject=Get Started">Get Started</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground p-2 hover:bg-muted rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <Menu
                size={24}
                className={`absolute inset-0 transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
                }`}
              />
              <X
                size={24}
                className={`absolute inset-0 transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-background/95 backdrop-blur-xl border-t border-border/50 overflow-hidden transition-all duration-500 ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base font-medium text-muted-foreground hover:text-foreground transition-all py-3 px-4 rounded-lg hover:bg-muted"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                transitionDelay: isMobileMenuOpen ? `${index * 0.05}s` : "0s",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Button
            size="lg"
            className="bg-gradient-wiqonn hover:opacity-90 transition-opacity w-full mt-2"
            asChild
          >
            <a href="mailto:contact@wiqonn.com?subject=Get Started">Get Started</a>
          </Button>
        </div>
      </div>
    </nav>
  )
}
