import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { ValueProposition } from "@/components/value-proposition"
import { ServicesSection } from "@/components/services-section"
import { ResearchSection } from "@/components/research-section"
import { TeamSection } from "@/components/team-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ValueProposition />
      <ServicesSection />
      <ResearchSection />
      <TeamSection />
      <CTASection />
      <Footer />
    </main>
  )
}
