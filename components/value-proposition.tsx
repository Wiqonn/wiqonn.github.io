import { Rocket, Shield, Handshake } from "lucide-react"
import { Card } from "@/components/ui/card"

export function ValueProposition() {
  const values = [
    {
      icon: Rocket,
      title: "Agile Implementation",
      description:
        "From idea to product in weeks, not months. Proven methodology that accelerates your time to market and reduces implementation risks.",
      stat: "3x",
      statLabel: "faster delivery",
    },
    {
      icon: Shield,
      title: "Guaranteed ROI",
      description:
        "Solutions designed to generate measurable returns. We define clear KPIs from the start and optimize until your objectives are met.",
      stat: "340%",
      statLabel: "average ROI",
    },
    {
      icon: Handshake,
      title: "Strategic Partner",
      description:
        "We don't just deliver software, we become your technology partner. Continuous support and constant evolution of your solutions.",
      stat: "98%",
      statLabel: "client retention",
    },
  ]

  return (
    <section className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
            Why <span className="text-gradient-wiqonn">Wiqonn</span>?
          </h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            We transform your technology investment into real competitive advantage
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <Card key={index} className="p-8 bg-card hover:bg-card/80 transition-colors border-border/50 group">
                <div className="mb-6 inline-flex p-4 rounded-2xl bg-gradient-wiqonn/10 group-hover:bg-gradient-wiqonn/20 transition-colors">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">{value.description}</p>
                <div className="pt-4 border-t border-border/50">
                  <span className="text-3xl font-bold text-gradient-wiqonn">{value.stat}</span>
                  <span className="text-sm text-muted-foreground ml-2">{value.statLabel}</span>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
