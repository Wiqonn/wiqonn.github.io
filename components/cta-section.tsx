import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

export function CTASection() {
  return (
    <section
      id="contact"
      className="py-24 md:py-32 bg-gradient-to-br from-primary/10 via-background to-secondary/10 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />

      <div className="container relative mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-balance">
            Ready to Transform Your <span className="text-gradient-wiqonn">Business?</span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Your data holds untapped potential. Let's unlock it together with research-backed AI solutions that deliver
            measurable results.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="bg-gradient-wiqonn hover:opacity-90 transition-opacity text-base px-8 h-12"
              asChild
            >
              <a href="mailto:contact@wiqonn.com?subject=Schedule Free Consultation">
                <Calendar className="mr-2 w-5 h-5" />
                Schedule Free Consultation
              </a>
            </Button>
          </div>

          <div className="pt-12 grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gradient-wiqonn">5+</div>
              <div className="text-sm text-muted-foreground">Years of Experience</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gradient-wiqonn">50+</div>
              <div className="text-sm text-muted-foreground">Projects Delivered</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gradient-wiqonn">100%</div>
              <div className="text-sm text-muted-foreground">Client Satisfaction</div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground pt-8">Don't let your competitors gain the AI advantage</p>
        </div>
      </div>
    </section>
  )
}
