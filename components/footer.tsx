"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Linkedin, Mail, Github } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function Footer() {
  const footerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const services = ["Business Intelligence", "AI & Machine Learning", "Cloud Infrastructure", "Full-Stack Development"]
  const company = ["About Us", "Team", "Careers"]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} className="bg-[#0a0a0a] border-t border-border/50 relative overflow-hidden">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />

      <div ref={contentRef} className="container mx-auto px-4 lg:px-8 py-16 relative">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wiqonn-id-special-NRxy7eDlL66Iza3JiqzIjzztpOzC8e.png"
              alt="Wiqonn"
              width={160}
              height={40}
              className="h-10 w-auto transition-transform duration-300 hover:scale-105"
            />
            <p className="text-sm text-muted-foreground leading-relaxed">
              Research-backed AI & technology solutions for real-world impact
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Mail, href: "mailto:contact@wiqonn.com", label: "Email" },
                { icon: Github, href: "#", label: "GitHub" },
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
            <h3 className="font-bold mb-4 text-foreground">Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    href="#services"
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
            <h3 className="font-bold mb-4 text-foreground">Company</h3>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:translate-x-1 inline-block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4 text-foreground">Get in Touch</h3>
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
              <li className="pt-2">
                <span className="text-xs uppercase tracking-wider text-muted-foreground/60">
                  Schedule a free consultation
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Wiqonn. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
