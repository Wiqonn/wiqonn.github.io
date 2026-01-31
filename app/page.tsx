import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { TechMarquee } from "@/components/tech-marquee"
import { ValueProposition } from "@/components/value-proposition"
import { ServicesSection } from "@/components/services-section"
import { TeamSection } from "@/components/team-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Navigation />
      <HeroSection />
      <TechMarquee />
      <ValueProposition />
      <ServicesSection />
      <TeamSection />
      <CTASection />
      <Footer />
    </main>
  )
}
