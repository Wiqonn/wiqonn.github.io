import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, BarChart3, Cpu, Eye, MessageSquare, Workflow } from "lucide-react"

export function ResearchSection() {
  const capabilities = [
    {
      icon: Brain,
      title: "Custom AI Models",
      description:
        "We build and deploy machine learning models tailored to your specific business needs, from predictive analytics to classification systems.",
      applications: ["Demand forecasting", "Risk assessment", "Customer segmentation"],
    },
    {
      icon: Eye,
      title: "Computer Vision",
      description:
        "Image and video analysis solutions for quality control, document processing, medical imaging, and visual inspection.",
      applications: ["Defect detection", "Document OCR", "Visual search"],
    },
    {
      icon: MessageSquare,
      title: "AI Agents & LLMs",
      description:
        "Intelligent conversational agents and language models that automate customer support, document analysis, and knowledge management.",
      applications: ["Customer service bots", "Document Q&A", "Content generation"],
    },
    {
      icon: BarChart3,
      title: "Business Intelligence",
      description:
        "Interactive dashboards and analytics platforms that transform raw data into actionable insights for better decision-making.",
      applications: ["Executive dashboards", "KPI tracking", "Trend analysis"],
    },
    {
      icon: Workflow,
      title: "Process Automation",
      description:
        "End-to-end automation of repetitive tasks and workflows, integrating AI to handle complex decision points.",
      applications: ["Data pipelines", "Report generation", "Approval workflows"],
    },
    {
      icon: Cpu,
      title: "MLOps & Deployment",
      description:
        "Production-grade infrastructure for deploying, monitoring, and scaling your AI solutions with reliability and performance.",
      applications: ["Model serving", "A/B testing", "Performance monitoring"],
    },
  ]

  return (
    <section id="capabilities" className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Our Capabilities</Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
            What We <span className="text-gradient-wiqonn">Build</span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            End-to-end AI solutions designed to solve real business problems
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon
            return (
              <Card key={index} className="p-6 bg-card border-border/50 hover:border-primary/50 transition-all group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-wiqonn/10 group-hover:bg-gradient-wiqonn/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold">{capability.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{capability.description}</p>
                <div className="flex flex-wrap gap-2">
                  {capability.applications.map((app, idx) => (
                    <span key={idx} className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground">
                      {app}
                    </span>
                  ))}
                </div>
              </Card>
            )
          })}
        </div>

        <div className="max-w-4xl mx-auto p-8 rounded-2xl bg-gradient-wiqonn/10 border border-primary/20">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-3">Have a specific challenge?</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Tell us about your project and we'll help you identify the right AI solution for your needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <span className="px-3 py-1 bg-background rounded-full">No upfront commitment</span>
              <span className="px-3 py-1 bg-background rounded-full">Free consultation</span>
              <span className="px-3 py-1 bg-background rounded-full">Proposal in 48h</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
