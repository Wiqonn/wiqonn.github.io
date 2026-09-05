"use client"

import Image from "next/image"
import Link from "next/link"
import { Linkedin, Mail, Github } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { useT } from "@/components/language-provider"
import { BookingButton } from "@/components/booking-button"

export function Footer() {
  const t = useT()

  const services = t.footer.services
  const company = t.footer.company

  return (
    <footer className="bg-background-navy border-t border-border/50 relative overflow-hidden">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />

      <Reveal className="container mx-auto px-4 lg:px-8 py-16 relative">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Image
              src="/wiqonn-logo.png"
              alt="Wiqonn"
              width={150}
              height={60}
              className="h-14 w-auto transition-transform duration-300 hover:scale-105"
            />
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.footer.description}
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: Linkedin, href: "https://www.linkedin.com/company/wiqonn", label: "LinkedIn" },
                { icon: Mail, href: "mailto:contact@wiqonn.com", label: "Email" },
                { icon: Github, href: "https://github.com/wiqonn", label: "GitHub" },
              ].map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 p-2 rounded-lg hover:bg-primary/10"
                  aria-label={label}
                >
                  <Icon size={20} />
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="font-bold mb-4 text-foreground">{t.footer.servicesTitle}</p>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    href="/#services"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:translate-x-1 inline-block"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="font-bold mb-4 text-foreground">{t.footer.companyTitle}</p>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item}>
                  <span className="text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
              {[
                { href: "/blog", label: "Wiqonn AI Blog" },
                { href: "/brochure/es/", label: "Servicios de IA (Español)", lang: "es" },
                { href: "/brochure/", label: "AI services (English)", lang: "en" },
              ].map((item) => (
                <li key={item.href}>
                  <a href={item.href} lang={item.lang} hrefLang={item.lang} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-bold mb-4 text-foreground">{t.footer.getInTouch}</p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href="mailto:contact@wiqonn.com"
                  className="hover:text-primary transition-colors inline-flex items-center gap-2 group"
                >
                  <Mail size={16} className="group-hover:scale-110 transition-transform" />
                  contact@wiqonn.com
                </a>
              </li>
              <li className="pt-3">
                <BookingButton
                  size="sm"
                  label={t.footer.schedule}
                  className="btn-gradient h-10 px-4 font-semibold"
                />
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Wiqonn. {t.footer.rights}
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span className="cursor-default">{t.footer.privacy}</span>
            <span className="cursor-default">{t.footer.terms}</span>
          </div>
        </div>
      </Reveal>
    </footer>
  )
}
