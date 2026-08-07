import { Navigation } from "@/components/navigation"
import { TechMarquee } from "@/components/tech-marquee"
import { StatsSection } from "@/components/stats-section"
import { ServicesSection } from "@/components/services-section"
import { ValueProposition } from "@/components/value-proposition"
import { GuaranteesBand } from "@/components/guarantees-band"
import { FAQSection } from "@/components/faq-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { CinematicHero } from "@/components/cinematic/cinematic-hero"
import { GrainOverlay } from "@/components/cinematic/grain-overlay"
import { LightTunnel } from "@/components/cinematic/light-tunnel"
import { PremiumMotion } from "@/components/cinematic/premium-motion"
import { es } from "@/lib/i18n"

const SITE_URL = "https://www.wiqonn.com"

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  "@id": `${SITE_URL}/#organization`,
  name: "Wiqonn",
  legalName: "Wiqonn",
  slogan: "Data and engineering for humans",
  url: `${SITE_URL}/`,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/wiqonn-icon.png`,
  },
  image: `${SITE_URL}/wiqonn-icon.png`,
  email: "contact@wiqonn.com",
  priceRange: "$$",
  description:
    "AI lab de datos y software en Barranquilla, Colombia. Auditamos, construimos y operamos soluciones de IA para empresas de todo tipo en todo el mundo.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Barranquilla",
    addressRegion: "Atlántico",
    addressCountry: "CO",
  },
  areaServed: {
    "@type": "Place",
    name: "World",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "contact@wiqonn.com",
    availableLanguage: ["es", "en"],
  },
  knowsAbout: [
    "Inteligencia Artificial",
    "Machine Learning",
    "LLM/RAG",
    "Computer Vision",
    "AI Agents",
    "Business Intelligence",
    "MLOps",
    "Cloud Infrastructure",
    "IoT",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de IA y tecnología",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": `${SITE_URL}/#service-ai`,
          name: "IA y Machine Learning",
          description:
            "Agentes de IA, LLM/RAG, visión por computador y modelos predictivos a la medida.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": `${SITE_URL}/#service-bi`,
          name: "Business Intelligence",
          description:
            "Dashboards ejecutivos, reportes automatizados y seguimiento de KPIs en tiempo real.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": `${SITE_URL}/#service-cloud`,
          name: "Cloud e Infraestructura",
          description:
            "Infraestructura multi-cloud segura, escalable y optimizada para cargas de IA.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": `${SITE_URL}/#service-dev`,
          name: "Desarrollo a la medida",
          description: "Apps web y móviles, APIs y pipelines de MLOps con IA integrada.",
        },
      },
    ],
  },
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE_URL}/#faq`,
  mainEntity: es.faq.items.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
}

export default function Page() {
  return (
    <main className="min-h-screen bg-background-navy">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navigation />
      <GrainOverlay />
      <PremiumMotion />
      <CinematicHero />
      <div className="section-frame section-frame--marquee">
        <TechMarquee />
      </div>
      <div className="section-frame section-frame--stats">
        <LightTunnel className="light-tunnel--stats" />
        <StatsSection />
      </div>
      <div className="section-frame section-frame--services">
        <ServicesSection />
      </div>
      <div className="section-frame section-frame--value">
        <LightTunnel className="light-tunnel--value" />
        <ValueProposition />
      </div>
      <div className="section-frame section-frame--guarantees">
        <GuaranteesBand />
      </div>
      <div className="section-frame section-frame--faq">
        <FAQSection />
      </div>
      <div className="section-frame section-frame--cta">
        <LightTunnel className="light-tunnel--cta" />
        <CTASection />
      </div>
      <Footer />
    </main>
  )
}
