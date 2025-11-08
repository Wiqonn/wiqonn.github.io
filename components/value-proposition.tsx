import { Brain, Target, Zap } from "lucide-react"
import { Card } from "@/components/ui/card"

export function ValueProposition() {
  const values = [
    {
      icon: Brain,
      title: "Research-Driven Excellence",
      description:
        "Our methods are validated by peer-reviewed publications in international journals, ensuring scientifically sound solutions.",
    },
    {
      icon: Target,
      title: "Proven Track Record",
      description:
        "From healthcare AI to enterprise analytics, we deliver measurable results with real-world commercial deployments.",
    },
    {
      icon: Zap,
      title: "Continuous Innovation",
      description:
        "Stay ahead with solutions powered by the latest AI breakthroughs through our ongoing research and development.",
    },
  ]

  return (
    <section className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
            Why Choose <span className="text-gradient-wiqonn">Wiqonn</span>?
          </h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            We bridge the gap between cutting-edge AI research and real-world business value
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
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
