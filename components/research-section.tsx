import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Award, ExternalLink } from "lucide-react"

export function ResearchSection() {
  const publications = [
    {
      title: "Advanced Medical AI Systems",
      journal: "International Journal of Artificial Intelligence",
      year: "2021",
      focus: "Medical Imaging & Machine Learning",
      description:
        "Methodologies for building robust AI systems in highly regulated, high-stakes environments with compliance and reliability.",
      link: "https://www.researchgate.net/profile/Juan-Paniagua/publication/350411823_Influence_of_Preprocessing_and_Segmentation_on_the_Complexity_of_the_Learning_Machines_in_Medical_Imaging/links/6086ec39881fa114b42dbdac/Influence-of-Preprocessing-and-Segmentation-on-the-Complexity-of-the-Learning-Machines-in-Medical-Imaging.pdf",
    },
    {
      title: "Production-Grade Diagnostic AI",
      journal: "Frontiers in Medical Technology",
      year: "2022",
      focus: "COVID-19 Detection & Clinical Decision Support",
      description:
        "Deployed AI system analyzing 1,300+ medical studies with exceptional accuracy in production medical environments.",
      link: "https://www.frontiersin.org/journals/medical-technology/articles/10.3389/fmedt.2022.980735/full",
    },
  ]

  return (
    <section id="research" className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Peer-Reviewed Research</Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
            Proven <span className="text-gradient-wiqonn">Technical Excellence</span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            Our expertise is peer-reviewed and published in international journals
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          {publications.map((pub, index) => (
            <Card key={index} className="p-8 bg-card border-border/50 hover:border-primary/50 transition-all group">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-xl bg-gradient-wiqonn/10">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xl font-bold mb-2 hover:text-primary transition-colors"
                  >
                    {pub.title}
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                  <p className="text-sm text-muted-foreground">
                    {pub.journal} ({pub.year})
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
                {pub.focus}
              </Badge>
              <p className="text-muted-foreground leading-relaxed">{pub.description}</p>
            </Card>
          ))}
        </div>

        <div className="max-w-4xl mx-auto p-8 rounded-2xl bg-gradient-wiqonn/10 border border-primary/20">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-background">
              <Award className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3">What This Means for You</h3>
              <p className="text-muted-foreground leading-relaxed">
                Whether you're in healthcare, manufacturing, finance, or any data-intensive industry, we bring the same
                rigor, expertise, and proven methodologies to solve your toughest technical challenges with solutions
                that are both scientifically sound and commercially proven.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
