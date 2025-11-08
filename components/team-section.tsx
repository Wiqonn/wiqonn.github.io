import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function TeamSection() {
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

  return (
    <section id="team" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
            World-Class <span className="text-gradient-wiqonn">Leadership Team</span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            Expert leadership driving technical innovation and proven results
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {team.map((member, index) => (
            <Card
              key={index}
              className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all group"
            >
              <div className="flex items-start gap-4">
                <Avatar className="w-16 h-16 bg-gradient-wiqonn text-background text-lg font-bold">
                  <AvatarFallback className="bg-gradient-wiqonn text-background">{member.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-sm text-primary mb-3">{member.role}</p>
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
