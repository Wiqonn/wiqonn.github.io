"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function TeamSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  const team = [
    {
      name: "Wayner J. Barrios",
      role: "Founder",
      expertise:
        "PhD researcher at Dartmouth College specializing in Multimodal Large Language Models, Computer Vision, and AI/ML pipelines for real-time distributed systems",
      initials: "WJB",
    },
    {
      name: "Wayner Barrios",
      role: "CEO",
      expertise:
        "Specialist in Business Analytics, Systems and Computer Networking, driving company strategy and executing leadership responsibilities",
      initials: "WB",
    },
    {
      name: "Martha Quiroga",
      role: "Financial Director",
      expertise: "Strategic financial oversight ensuring sustainable growth and operational excellence",
      initials: "MQ",
    },
    {
      name: "Jaime Cotes",
      role: "Operations Director",
      expertise: "Expert in Digital Marketing and operations planning, ensuring seamless execution",
      initials: "JC",
    },
    {
      name: "Sergio Molinares",
      role: "Infrastructure Architect",
      expertise: "Cloud infrastructure, penetration testing, and OSINT analysis expert",
      initials: "SM",
    },
    {
      name: "Kenneth Barrios",
      role: "Full-Stack Developer",
      expertise: "React Native specialist skilled in integrating AI agents into mobile platforms",
      initials: "KB",
    },
    {
      name: "Emmanuel Escaffi",
      role: "IT Systems Administrator",
      expertise: "Ensures optimal operational efficiency across all infrastructure systems",
      initials: "EE",
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      )

      // Cards stagger animation
      const cards = cardsRef.current?.children
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="team" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-transparent to-muted/30" />

      <div className="container mx-auto px-4 lg:px-8 relative">
        <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
            World-Class <span className="text-gradient-wiqonn">Leadership Team</span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            Expert leadership driving technical innovation and proven results
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {team.map((member, index) => (
            <Card
              key={index}
              className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500 group hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="flex items-start gap-4">
                <Avatar className="w-16 h-16 text-lg font-bold transition-transform duration-500 group-hover:scale-110">
                  <AvatarFallback className="bg-gradient-wiqonn text-background">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1 group-hover:text-gradient-wiqonn transition-all">
                    {member.name}
                  </h3>
                  <p className="text-sm text-primary mb-3 font-medium">{member.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{member.expertise}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
