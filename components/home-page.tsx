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
import { es, en, HOME_PATHS, type Lang } from "@/lib/i18n"

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
    "Wiqonn combina IA aplicada, software, transformación digital y marketing medible para organizaciones de cualquier tamaño y sector.",
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
    "Custom AI Models",
    "Large Language Models",
    "Multimodal AI",
    "Vision-Language Models",
    "RAG",
    "Computer Vision",
    "Model Evaluation",
    "Business Intelligence",
    "MLOps",
    "Cloud Infrastructure",
    "Edge AI",
    "IoT",
    "Digital Transformation",
    "Transformación Digital",
    "Digital Marketing",
    "Marketing Digital",
    "SEO",
    "GEO",
    "AEO",
    "Content Marketing",
    "Marketing Automation",
  ],
}

export function HomePage({ lang }: { lang: Lang }) {
  const t = lang === "en" ? en : es
  const pageUrl = `${SITE_URL}${HOME_PATHS[lang]}`
  const organizationJsonLd = {
    ...jsonLd,
    description: t.seo.description,
    inLanguage: lang,
    audience: {
      "@type": "Audience",
      audienceType:
        lang === "en"
          ? "Public, private, academic and research organizations of every size and sector"
          : "Organizaciones públicas, privadas, académicas y de investigación de cualquier tamaño y sector",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: t.footer.servicesTitle,
      itemListElement: t.services.items.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
          inLanguage: lang,
        },
      })),
    },
  }
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    inLanguage: lang,
    mainEntity: t.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  }

  return (
    <main className="min-h-screen bg-background-navy">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        id="faq-jsonld"
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
