import { Card } from "@/components/ui/card"
import { BarChart3, Bot, Cloud, Code } from "lucide-react"

export function ServicesSection() {
  const services = [
    {
      icon: BarChart3,
      title: "Business Intelligence & Analytics",
      description:
        "Transform data chaos into strategic clarity with interactive dashboards, predictive analytics, and enterprise data management.",
      features: ["Power BI Dashboards", "SQL & Data Lakes", "Predictive Modeling", "Strategic Insights"],
    },
    {
      icon: Bot,
      title: "Artificial Intelligence & ML",
      description:
        "Deploy intelligent systems powered by cutting-edge AI agents, custom ML models, and computer vision solutions.",
      features: ["AI Agents & LLMs", "Custom ML Models", "Computer Vision", "Intelligent Automation"],
    },
    {
      icon: Cloud,
      title: "Cloud Infrastructure",
      description:
        "Build resilient, scalable infrastructure with multi-cloud architecture, edge computing, and robust security.",
      features: ["Cloud Architecture", "Edge Computing", "Network Optimization", "Security & Compliance"],
    },
    {
      icon: Code,
      title: "Full-Stack Development",
      description:
        "Complete engineering solutions from modern web apps to scalable backend systems with seamless AI integration.",
      features: ["React & React Native", "Backend Systems", "AI Integration", "MLOps Deployment"],
    },
  ]

  return (
    <section id="services" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
            Comprehensive <span className="text-gradient-wiqonn">AI Solutions</span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            End-to-end technology services that deliver measurable business impact
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card
                key={index}
                className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all group"
              >
                <div className="mb-6 inline-flex p-4 rounded-2xl bg-gradient-wiqonn/10 group-hover:bg-gradient-wiqonn/20 transition-colors">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-wiqonn" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
