"use client"

import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Reveal } from "@/components/reveal"
import { useT } from "@/components/language-provider"

export function TeamSection() {
  const t = useT()

  // Iniciales de nombres propios: independientes del idioma.
  const INITIALS = ["WJB", "WB", "MQ", "JC", "SM", "KB", "EE"]

  const team = t.team.members.map((member, index) => ({
    ...member,
    initials: INITIALS[index],
  }))

  return (
    <section id="team" className="py-16 md:py-20 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-transparent to-muted/30" />

      <div className="container mx-auto px-4 lg:px-8 relative">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
            {t.team.titlePre}
            <span className="text-gradient-wiqonn">{t.team.titleAccent}</span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            {t.team.description}
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {team.map((member, index) => (
            <Reveal key={index} delay={index * 80} className="h-full">
            <Card
              className="p-6 h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500 group hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/5"
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
