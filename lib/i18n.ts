/**
 * Wiqonn: diccionario i18n (ES / EN)
 *
 * Regla: toda cadena visible al usuario final vive aquí. `es` es la fuente
 * de verdad estructural; `Dict` se deriva de `typeof es` para que cualquier
 * clave faltante en `en` sea un error de tipos.
 *
 * Hechos usados (sin inventar): papers.md (publicaciones de IA multimodal),
 * services.md (17 capacidades declaradas por el dueño), icp.md (empresas
 * empresas de todo tipo en todo el mundo), identidad visual oficial.
 */

export type Lang = "es" | "en"

export const es = {
  seo: {
    title: "Consultoría de IA en Colombia | Implementación de IA | Wiqonn",
    description:
      "AI lab en Barranquilla, Colombia. Implementamos IA, ML, agentes y BI para empresas de todo tipo en todo el mundo. Soporte local, consulta gratis.",
    locale: "es_CO",
  },
  nav: {
    links: ["Inicio", "Servicios", "Blog", "Contacto"],
    cta: "Empecemos",
    menuLabel: "Abrir menú",
    langLabel: "Cambiar idioma",
  },
  hero: {
    titlePre: "Convierte tus datos en resultados con ",
    subheadline:
      "IA que funciona con tus datos reales, no con un demo. Empezamos con un diagnóstico de 30 minutos y, si no podemos ayudarte, te lo decimos antes de que gastes.",
    rotator: ["IA en producción", "agentes que trabajan 24/7", "modelos que generan retorno"],
    trustResearch:
      "Evaluamos cada modelo con tus datos reales. Publicamos papers, no promesas.",
    ctaPrimary: "Agenda tu diagnóstico de 30 min",
    ctaSecondary: "Descargar AI Readiness Checklist",
    checklistHref: "/ai-readiness-checklist-es.pdf",
    emailBody: "Hola Wiqonn, quiero agendar un diagnóstico de 30 minutos sobre IA para mi empresa",
    emailSubject: "Diagnóstico de IA · 30 min",
  },
  value: {
    eyebrow: "Qué hace Wiqonn",
    titlePre: "Convertimos tus datos en productos de IA que generan ",
    titleAccent: "resultados",
    description:
      "De la analítica a la IA en producción y hasta el hardware: ML, LLM y RAG, visión por computador, agentes de IA, MLOps, BI, nube, IoT y sistemas embebidos, bajo un mismo techo.",
    pillars: [
      {
        title: "De los datos a la producción",
        description:
          "Empezamos donde están tus datos y llegamos hasta el producto en producción: modelos de ML y LLM/RAG, visión por computador, agentes de IA, MLOps, BI, nube, IoT y sistemas embebidos. Sin costuras entre etapas ni equipos dispersos.",
        highlights: [
          "ML, LLM/RAG y visión por computador",
          "Agentes de IA que operan de forma continua",
          "MLOps, BI y arquitectura de datos",
          "Nube, IoT y hardware embebido",
        ],
      },
      {
        title: "Investigación aplicada en cada proyecto",
        description:
          "Investigación aplicada integrada a la entrega: publicamos y evaluamos cada modelo con rigor académico. Si no funciona con tus datos, lo decimos antes de que gastes.",
        highlights: [
          "Investigación aplicada en cada entrega",
          "Papers publicados y metodologías validadas por pares",
          "Evaluación rigurosa de modelos con datos reales",
          "Sin promesas vacías de marketing",
        ],
      },
      {
        title: "IA para humanos, en tu idioma y tu mercado",
        description:
          "Tecnología al servicio de personas y negocio, con vocabulario claro y soporte local. AI lab en Barranquilla, Colombia: entendemos tu mercado y trabajamos en tu idioma.",
        highlights: [
          "Atención cercana, en español",
          "Precios accesibles frente a agencias de USA y Europa",
          "Diseñamos para personas, no solo para modelos",
          "Soporte local en Barranquilla, Colombia",
        ],
      },
    ],
  },
  services: {
    eyebrow: "Lo que construimos",
    titlePre: "IA que ",
    titleAccent: "genera retorno",
    description:
      "Cada solución que construimos tiene un solo trabajo: hacer mejor tu negocio. Si no aporta valor, no la lanzamos.",
    inquirySubject: "Consulta sobre",
    learnMore: "Explorar servicios",
    items: [
      {
        title: "IA y Machine Learning",
        tagline: "Tareas repetitivas que se hacen solas. Tu equipo, enfocado en lo que vende.",
        description:
          "IA personalizada que hace el trabajo para el que no tienes tiempo: desde agentes inteligentes hasta modelos predictivos.",
        results: [
          "Agentes de IA que trabajan las 24 horas",
          "Modelos predictivos a la medida de tus datos",
          "Visión por computador para calidad y automatización",
          "Integraciones LLM que realmente funcionan",
        ],
      },
      {
        title: "Business Intelligence",
        tagline: "Decide con números, no con intuición — en tiempo real.",
        description:
          "Dashboards y analítica que te dicen qué está pasando, por qué y qué hacer al respecto.",
        results: [
          "Dashboards ejecutivos en tiempo récord",
          "Reportes automatizados que ahorran horas",
          "Seguimiento de KPIs en tiempo real",
          "Arquitectura de datos que escala",
        ],
      },
      {
        title: "Cloud e Infraestructura",
        tagline: "Infraestructura que aguanta tu crecimiento sin explotar el presupuesto.",
        description:
          "Infraestructura segura, escalable y construida para cargas de IA, sin la complejidad.",
        results: [
          "Flexibilidad multi-cloud",
          "Alta disponibilidad y uptime",
          "Seguridad y cumplimiento listos para producción",
          "Optimizada en costo y rendimiento",
        ],
      },
      {
        title: "Desarrollo a la medida",
        tagline: "Productos que llegan a producción y trabajan para ti, con IA integrada.",
        description:
          "Apps web, móviles y plataformas diseñadas alrededor de cómo trabajas, con IA integrada.",
        results: [
          "Apps en React y React Native",
          "Sistemas backend escalables",
          "Diseño de APIs limpio",
          "Pipelines de MLOps y despliegue",
        ],
      },
    ],
    bottom: "¿No sabes por dónde empezar? Lo descubrimos juntos.",
    start: "Inicia una conversación",
  },
  businessModel: {
    eyebrow: "Modelo de negocio",
    titlePre: "Wiqonn convierte datos en productos de IA que ",
    titleAccent: "generan ingresos",
    description:
      "Del diagnóstico al retainer gestionado: cinco vías de ingreso diseñadas para que la IA deje de ser un gasto puntual y se convierta en un activo que se paga solo.",
    engineBadge: "Motor del negocio",
    badges: {
      recurrente: "Recurrente",
      proyecto: "Proyecto",
      licencia: "Licencia",
    },
    streams: {
      audit: {
        title: "AI Readiness Audit",
        price: "Proyecto",
        priceNote: "según alcance",
        description:
          "Auditoría dirigida por nuestro equipo de IA para mapear dónde la IA genera valor real en tu operación y qué construir primero.",
        bullets: [
          "Dirigida por especialistas senior de IA",
          "Priorización de casos de uso por ROI",
          "Roadmap con fases y costos",
        ],
        hint: "La cuña de entrada: alimenta el motor de conversión →",
      },
      ops: {
        title: "Managed AI Ops",
        subtitle: "IA como servicio · operación gestionada",
        price: "Recurrente",
        priceNote: "según alcance",
        description:
          "Operación gestionada de tus soluciones de IA: monitorización, reentrenamiento, evolución del modelo y soporte continuo. El cerebro de tu operación, sin contratar un equipo interno.",
        bullets: [
          "Monitorización y reentrenamiento de modelos",
          "Agentes de IA operando de forma continua",
          "Soporte prioritario con SLA",
          "Evolución continua de la solución",
        ],
      },
      fractional: {
        title: "Fractional AI Leadership",
        price: "Recurrente",
        priceNote: "según alcance",
        description:
          "AI leadership as a service: dirección de IA y CTO-as-a-service para equipos que no pueden contratar full-time.",
        bullets: [
          "Estrategia de IA alineada al negocio",
          "Arquitectura y selección de stack",
          "Gestión de proyectos y equipos de IA",
          "Governance, riesgo y compliance",
        ],
      },
      pilotos: {
        title: "Pilotos Outcome-Based",
        price: "Proyecto",
        priceNote: "según alcance",
        description:
          "Pilotos con compromiso de resultado: definimos el KPI, construimos la solución y demostramos valor con métricas reales antes de escalar.",
        bullets: [
          "KPI definido y medible desde el día uno",
          "Entregas en ciclos cortos",
          "Resultados demostrados antes de escalar",
        ],
      },
      ip: {
        title: "IP / White-Label",
        price: "Licencia",
        priceNote: "según consumo",
        description:
          "Nuestras soluciones de IA empaquetadas y licenciadas para que integradores y consultoras las vendan bajo su propia marca. Cero desarrollo desde cero.",
        bullets: [
          "Soluciones validadas listas para vender",
          "Soporte técnico incluido",
          "Modelo de ingresos compartidos",
        ],
      },
    },
    meta: {
      eyebrow: "Meta de negocio",
      titlePre: "El objetivo: ",
      titleAccent: "ingreso recurrente",
      description:
        "Los retainers gestionados y las licencias son el objetivo. Las auditorías y los pilotos existen para sembrar esa recurrencia.",
      chips: {
        recurrent: "Recurrente · MRR",
        project: "Proyecto",
        license: "Licencia",
      },
    },
    funnel: {
      eyebrow: "El motor de conversión",
      title: "Cada auditoría termina donde empieza el ingreso recurrente",
      steps: {
        audit: { label: "AI Readiness Audit", sub: "Proyecto · según alcance" },
        plan: { label: "Plan + propuesta", sub: "ROI y roadmap priorizado" },
        pilot: { label: "Piloto outcome-based", sub: "Proyecto · resultado demostrado" },
        retainer: { label: "Retainer gestionado", sub: "Ingreso recurrente · MRR" },
      },
      footer:
        "Proyecto → recurrente: las auditorías y los pilotos existen para sembrar retainers.",
    },
    why: {
      eyebrow: "Por qué Wiqonn",
      title: "Rigor de investigación, raíces LatAm. El AI lab que cubre del dato al hardware.",
      description:
        "Tres razones por las que los proyectos con Wiqonn llegan a producción y no se quedan en demos.",
      items: {
        research: {
          title: "Investigación real, no marketing",
          description:
            "Investigación aplicada en IA: LLMs multimodales, visión por computador y sistemas de IA distribuidos. Evaluamos cada promesa de modelo con rigor. Si no funciona con tus datos, lo decimos antes de que gastes.",
        },
        fullstack: {
          title: "Full-stack: del dato al hardware",
          description:
            "Cubrimos el espectro completo: de ML/IA y analítica a apps web/móviles, IoT, visión por computador y sistemas embebidos. Un solo AI lab, cero integradores de por medio.",
        },
        humans: {
          title: "Data and engineering for humans",
          description:
            "El tagline oficial no es decoración: tecnología al servicio de personas y negocio, con KPIs claros y resultados que se pueden medir.",
        },
        latam: {
          title: "Raíces LatAm, estándar global",
          description:
            "AI lab en Barranquilla, Colombia: entendemos el mercado local y ofrecemos pricing accesible frente a agencias de USA y Europa, sin sacrificar calidad.",
        },
      },
    },
  },
  stats: {
    titlePre: "Compromisos, ",
    titleAccent: "no promesas",
    subtitle: "Plazos y reglas que cumplimos en cada proyecto",
    labels: [
      "Diagnóstico de 30 minutos, gratis y sin compromiso",
      "Respuesta a tu mensaje en menos de 24 h",
      "Propuesta por escrito con precio fijo, en 48 h hábiles",
      "KPI definido y medible desde el día uno en cada piloto",
    ],
  },
  research: {
    badge: "Nuestras capacidades",
    titlePre: "Capacidades que ",
    titleAccent: "resuelven problemas reales",
    description: "Soluciones de IA de punta a punta diseñadas para resolver problemas de negocio reales.",
    capabilities: [
      {
        title: "Modelos de IA personalizados",
        description:
          "Construimos y desplegamos modelos de machine learning a la medida de tus necesidades de negocio, desde analítica predictiva hasta sistemas de clasificación.",
        applications: ["Pronóstico de demanda", "Evaluación de riesgo", "Segmentación de clientes"],
      },
      {
        title: "Visión por computador",
        description:
          "Soluciones de análisis de imagen y video para control de calidad, procesamiento de documentos, imágenes médicas e inspección visual.",
        applications: ["Detección de defectos", "OCR de documentos", "Búsqueda visual"],
      },
      {
        title: "Agentes de IA y LLMs",
        description:
          "Agentes conversacionales inteligentes y modelos de lenguaje que automatizan atención al cliente, análisis de documentos y gestión del conocimiento.",
        applications: ["Bots de servicio al cliente", "Q&A sobre documentos", "Generación de contenido"],
      },
      {
        title: "Inteligencia de negocio",
        description:
          "Dashboards interactivos y plataformas de analítica que transforman datos crudos en información accionable para mejores decisiones.",
        applications: ["Dashboards ejecutivos", "Seguimiento de KPIs", "Análisis de tendencias"],
      },
      {
        title: "Automatización de procesos",
        description:
          "Automatización integral de tareas y flujos repetitivos, integrando IA para manejar puntos de decisión complejos.",
        applications: ["Pipelines de datos", "Generación de reportes", "Flujos de aprobación"],
      },
      {
        title: "MLOps y despliegue",
        description:
          "Infraestructura de nivel producción para desplegar, monitorear y escalar tus soluciones de IA con confiabilidad y rendimiento.",
        applications: ["Serving de modelos", "Pruebas A/B", "Monitoreo de rendimiento"],
      },
    ],
    ctaTitle: "¿Tienes un desafío específico?",
    ctaDescription:
      "Cuéntanos tu proyecto y te ayudaremos a identificar la solución de IA adecuada para tus necesidades.",
    ctaChips: ["Sin compromiso previo", "Consulta gratuita", "Propuesta en 48 h hábiles"],
  },
  team: {
    titlePre: "Nuestro equipo de liderazgo ",
    titleAccent: "con experiencia práctica",
    description: "Liderazgo con experiencia real en IA, datos y operaciones.",
    members: [
      {
        name: "Wayner Barrios",
        role: "CEO & Founder",
        expertise:
          "Experiencia en IA multimodal, visión por computador y sistemas de IA distribuidos. Lidera la práctica de IA y datos de Wiqonn.",
      },
      {
        name: "Martha Quiroga",
        role: "Directora Financiera",
        expertise:
          "Supervisión financiera estratégica que asegura crecimiento sostenible y excelencia operativa.",
      },
      {
        name: "Jaime Cotes",
        role: "Director de Operaciones",
        expertise:
          "Experto en Marketing Digital y planificación de operaciones, asegurando una ejecución impecable de cada proyecto.",
      },
      {
        name: "Sergio Molinares",
        role: "Arquitecto de Infraestructura",
        expertise:
          "Experto en infraestructura cloud, pruebas de penetración y análisis OSINT para entornos de alto riesgo.",
      },
      {
        name: "Kenneth Barrios",
        role: "Desarrollador Full-Stack",
        expertise:
          "Especialista en React Native con habilidad comprobada para integrar agentes de IA en plataformas móviles.",
      },
      {
        name: "Emmanuel Escaffi",
        role: "Administrador de Sistemas IT",
        expertise: "Asegura la eficiencia operativa óptima en todos los sistemas de infraestructura.",
      },
    ],
  },
  cta: {
    badge: "Hablemos",
    titlePre: "¿Funciona la IA con tus datos? ",
    titleAccent: "Te lo decimos en 30 min",
    subheadline:
      "Cuéntanos tu reto en 30 minutos. Te diremos con honestidad si podemos ayudarte, cómo — y si no, también. Antes de que gastes.",
    emailButton: "Agendar mi diagnóstico",
    emailBody: "Hola Wiqonn, quiero agendar un diagnóstico de 30 minutos sobre IA para mi empresa",
    emailSubject: "Diagnóstico de IA · 30 min",
    trust: "Respuesta en menos de 24 h · Sin compromiso · Propuesta en 48 h hábiles",
    location: "Barranquilla, Colombia",
    form: {
      name: "Nombre",
      namePlaceholder: "Tu nombre",
      email: "Email corporativo",
      emailPlaceholder: "nombre@empresa.com",
      company: "Empresa",
      companyPlaceholder: "Nombre de tu empresa",
      size: "Tamaño",
      sizePlaceholder: "Empleados",
      message: "Tu reto (opcional)",
      messagePlaceholder: "¿Qué quieres automatizar o resolver con IA?",
      sending: "Enviando…",
      successTitle: "¡Recibido!",
      successBody: "Respondemos en menos de 24 h hábiles.",
      error: "No se pudo enviar. Intenta de nuevo o escríbenos a ",
    },
  },
  guarantees: {
    eyebrow: "Nuestra palabra, por escrito",
    title: "Trabajar con nosotros no es una apuesta",
    items: [
      "Precio fijo por escrito: lo que cotizamos es lo que pagas.",
      "Si no funciona con tus datos, te lo decimos antes de que gastes.",
      "Propuesta en 48 h hábiles desde la primera conversación.",
      "Respuesta a tu mensaje en menos de 24 h.",
    ],
  },
  faq: {
    eyebrow: "Preguntas frecuentes",
    title: "Lo que nos preguntan antes de empezar",
    items: [
      {
        q: "¿Cuánto cuesta implementar IA en mi empresa?",
        a: "El costo depende del alcance y del caso de uso. Empezamos con un AI Readiness Audit (proyecto, según alcance) que prioriza casos por ROI y entrega un roadmap con fases y costos antes de que inviertas. Precio fijo por escrito, sin costos ocultos.",
      },
      {
        q: "¿En cuánto tiempo veo resultados?",
        a: "La propuesta llega en 48 h hábiles. Los pilotos outcome-based trabajan en ciclos cortos con un KPI definido desde el día uno; si la solución no funciona con tus datos, te lo decimos antes de que gastes.",
      },
      {
        q: "¿Qué tamaño de empresas atienden?",
        a: "Empresas de todo tipo en cualquier parte del mundo. Cubrimos del dato al hardware: IA/ML, BI, cloud, IoT y desarrollo a la medida bajo un mismo techo.",
      },
      {
        q: "¿Quedaremos dependientes de ustedes?",
        a: "No. Entregamos código, documentación y acceso a la infraestructura; el retainer es opcional y se cancela cuando quieras, sin lock-in. La mayoría lo mantiene porque los modelos necesitan evolucionar, no porque estén atados.",
      },
      {
        q: "¿Qué pasa con la seguridad de nuestros datos?",
        a: "Tus datos son tuyos: no se usan para otros clientes ni para entrenar modelos ajenos. Firmamos NDA y acuerdos de confidencialidad, y acordamos estándares de seguridad por escrito antes de empezar.",
      },
      {
        q: "¿Cómo empezamos?",
        a: "Con un diagnóstico de 30 minutos, gratis y sin compromiso: te escuchamos, te decimos con honestidad si podemos ayudarte y cómo, y en 48 h hábiles recibes una propuesta por escrito con precio fijo y alcance.",
      },
    ],
  },
  footer: {
    description:
      "Soluciones de IA y tecnología con respaldo de investigación para un impacto real en tu negocio.",
    servicesTitle: "Servicios",
    services: [
      "Business Intelligence",
      "IA y Machine Learning",
      "Infraestructura Cloud",
      "Desarrollo Full-Stack",
    ],
    companyTitle: "Compañía",
    company: ["Nosotros", "Equipo", "Carreras"],
    getInTouch: "Contáctanos",
    schedule: "Agenda una consulta gratuita",
    rights: "Todos los derechos reservados.",
    privacy: "Política de Privacidad",
    terms: "Términos del Servicio",
  },
  marquee: {
    title: "Stack con el que trabajamos",
  },
}

export type Dict = typeof es

export const en: Dict = {
  seo: {
    title: "AI Consulting for Mid-Sized Companies | Nearshore AI | Wiqonn",
    description:
      "AI lab in Barranquilla, Colombia. We implement AI, ML, agents and BI for companies of any size, anywhere in the world. Local support, free consultation call.",
    locale: "en_US",
  },
  nav: {
    links: ["Home", "Services", "Blog", "Contact"],
    cta: "Get Started",
    menuLabel: "Toggle menu",
    langLabel: "Switch language",
  },
  hero: {
    titlePre: "Turn your data into results with ",
    subheadline:
      "AI that works on your real data, not a demo. We start with a 30-minute diagnosis — and if we can't help you, we tell you before you spend.",
    rotator: ["AI in production", "agents that work 24/7", "models that generate returns"],
    trustResearch:
      "We evaluate every model on your real data. We publish papers, not promises.",
    ctaPrimary: "Book your 30-min diagnosis",
    ctaSecondary: "Get the AI Readiness Checklist",
    checklistHref: "/ai-readiness-checklist-en.pdf",
    emailBody: "Hi Wiqonn, I'd like to book a 30-minute AI diagnosis for my company",
    emailSubject: "AI diagnosis · 30 min",
  },
  value: {
    eyebrow: "What Wiqonn Does",
    titlePre: "We turn your data into AI products that drive ",
    titleAccent: "results",
    description:
      "From analytics to production AI and all the way to hardware: ML, LLM and RAG, computer vision, AI agents, MLOps, BI, cloud, IoT and embedded systems, all under one roof.",
    pillars: [
      {
        title: "From data to production",
        description:
          "We start where your data lives and go all the way to a production product: ML and LLM/RAG models, computer vision, AI agents, MLOps, BI, cloud, IoT and embedded systems. No seams between stages, no scattered teams.",
        highlights: [
          "ML, LLM/RAG and computer vision",
          "AI agents operating around the clock",
          "MLOps, BI and data architecture",
          "Cloud, IoT and embedded hardware",
        ],
      },
      {
        title: "Applied research on every project",
        description:
          "Applied research embedded in delivery: we publish and evaluate every model with academic rigor. If it doesn't work on your data, we tell you before you spend.",
        highlights: [
          "Applied research in every delivery",
          "Published papers and peer-reviewed methodologies",
          "Rigorous model evaluation with real data",
          "No empty marketing promises",
        ],
      },
      {
        title: "AI for humans, in your language and your market",
        description:
          "Technology at the service of people and business, with clear language and local support. An AI lab in Barranquilla, Colombia: we understand your market and work in your language.",
        highlights: [
          "Close, personal attention",
          "Affordable pricing vs. US and European agencies",
          "We design for people, not just models",
          "Local support in Barranquilla, Colombia",
        ],
      },
    ],
  },
  services: {
    eyebrow: "What We Build",
    titlePre: "AI That ",
    titleAccent: "Generates Returns",
    description:
      "Every solution we build has one job: make your business better. If it doesn't add value, we don't ship it.",
    inquirySubject: "Inquiry about",
    learnMore: "Explore services",
    items: [
      {
        title: "AI & Machine Learning",
        tagline: "Repetitive work that does itself. Your team, focused on what sells.",
        description:
          "Custom AI that handles the work you don't have time for: from intelligent agents to predictive models.",
        results: [
          "AI Agents that work around the clock",
          "Predictive models tailored to your data",
          "Computer vision for quality & automation",
          "LLM integrations that actually work",
        ],
      },
      {
        title: "Business Intelligence",
        tagline: "Decide with numbers, not gut feel — in real time.",
        description:
          "Dashboards and analytics that tell you what's happening, why, and what to do about it.",
        results: [
          "Executive dashboards in record time",
          "Automated reports that save hours",
          "Real-time KPI tracking",
          "Data architecture that scales",
        ],
      },
      {
        title: "Cloud & Infrastructure",
        tagline: "Infrastructure that scales with you without blowing the budget.",
        description:
          "Secure, scalable infrastructure built for AI workloads, without the complexity.",
        results: [
          "Multi-cloud flexibility",
          "High availability and uptime",
          "Production-ready security & compliance",
          "Optimized for cost and performance",
        ],
      },
      {
        title: "Custom Development",
        tagline: "Products that ship and work for you, with AI built in.",
        description:
          "Web, mobile and platform applications designed around how you work, with AI built in.",
        results: [
          "Apps in React and React Native",
          "Scalable backend systems",
          "Clean API design",
          "MLOps and deployment pipelines",
        ],
      },
    ],
    bottom: "Not sure where to start? Let's figure it out together.",
    start: "Start a Conversation",
  },
  businessModel: {
    eyebrow: "Business model",
    titlePre: "Wiqonn turns data into AI products that ",
    titleAccent: "generate revenue",
    description:
      "From diagnosis to managed retainer: five revenue streams designed to turn AI from a one-off expense into an asset that pays for itself.",
    engineBadge: "Business engine",
    badges: {
      recurrente: "Recurring",
      proyecto: "Project",
      licencia: "License",
    },
    streams: {
      audit: {
        title: "AI Readiness Audit",
        price: "Project",
        priceNote: "based on scope",
        description:
          "An audit led by our AI team to map where AI creates real value in your operation and what to build first.",
        bullets: [
          "Led by senior AI specialists",
          "Use-case prioritization by ROI",
          "Roadmap with phases and costs",
        ],
        hint: "The entry wedge: it feeds the conversion engine →",
      },
      ops: {
        title: "Managed AI Ops",
        subtitle: "AI as a service · managed operations",
        price: "Recurring",
        priceNote: "based on scope",
        description:
          "Managed operations for your AI solutions: monitoring, retraining, model evolution and continuous support. The brain of your operation, without hiring an in-house team.",
        bullets: [
          "Model monitoring and retraining",
          "AI agents operating around the clock",
          "Priority support with SLAs",
          "Continuous solution evolution",
        ],
      },
      fractional: {
        title: "Fractional AI Leadership",
        price: "Recurring",
        priceNote: "based on scope",
        description:
          "AI leadership as a service: AI direction and CTO-as-a-service for teams that can't hire full-time.",
        bullets: [
          "Business-aligned AI strategy",
          "Architecture and stack selection",
          "AI project and team management",
          "Governance, risk and compliance",
        ],
      },
      pilotos: {
        title: "Outcome-Based Pilots",
        price: "Project",
        priceNote: "based on scope",
        description:
          "Pilots with a commitment to results: we define the KPI, build the solution and demonstrate value with real metrics before scaling.",
        bullets: [
          "KPI defined and measurable from day one",
          "Short delivery cycles",
          "Results proven before scaling",
        ],
      },
      ip: {
        title: "IP / White-Label",
        price: "License",
        priceNote: "usage-based",
        description:
          "Our packaged AI solutions licensed so integrators and consultancies can sell them under their own brand. Zero build-from-scratch.",
        bullets: [
          "Validated solutions ready to sell",
          "Technical support included",
          "Shared revenue model",
        ],
      },
    },
    meta: {
      eyebrow: "Business goal",
      titlePre: "The goal: ",
      titleAccent: "recurring revenue",
      description:
        "Managed retainers and licenses are the goal. Audits and pilots exist to plant the seeds of that recurring revenue.",
      chips: {
        recurrent: "Recurring · MRR",
        project: "Project",
        license: "License",
      },
    },
    funnel: {
      eyebrow: "The conversion engine",
      title: "Every audit ends where recurring revenue begins",
      steps: {
        audit: { label: "AI Readiness Audit", sub: "Project · based on scope" },
        plan: { label: "Plan + proposal", sub: "ROI and prioritized roadmap" },
        pilot: { label: "Outcome-based pilot", sub: "Project · proven outcome" },
        retainer: { label: "Managed retainer", sub: "Recurring revenue · MRR" },
      },
      footer:
        "Project → recurring: audits and pilots exist to seed retainers.",
    },
    why: {
      eyebrow: "Why Wiqonn",
      title:
        "Research rigor, LatAm roots. The AI lab that covers from data to hardware.",
      description:
        "Three reasons why projects with Wiqonn reach production — and don't stay demos.",
      items: {
        research: {
          title: "Real research, not marketing",
          description:
            "Applied AI research: multimodal LLMs, computer vision and distributed AI systems. We evaluate every model promise with rigor. If it doesn't work on your data, we tell you before you spend.",
        },
        fullstack: {
          title: "Full-stack: from data to hardware",
          description:
            "We cover the complete spectrum: from ML/AI and analytics to web/mobile apps, IoT, computer vision and embedded systems. One AI lab, zero middlemen.",
        },
        humans: {
          title: "Data and engineering for humans",
          description:
            "The official tagline isn't decoration: technology at the service of people and business, with clear KPIs and measurable results.",
        },
        latam: {
          title: "LatAm roots, global standard",
          description:
            "An AI lab in Barranquilla, Colombia: we understand the local market and offer accessible pricing versus US and European agencies, without sacrificing quality.",
        },
      },
    },
  },
  stats: {
    titlePre: "Commitments, ",
    titleAccent: "not promises",
    subtitle: "Deadlines and rules we honor on every project",
    labels: [
      "Free 30-minute diagnosis, no commitment",
      "Reply to your message within 24 hours",
      "Written proposal with fixed price within 48 business hours",
      "KPI defined and measurable from day one on every pilot",
    ],
  },
  research: {
    badge: "Our Capabilities",
    titlePre: "Capabilities that ",
    titleAccent: "solve real problems",
    description:
      "End-to-end AI solutions designed to solve real business problems.",
    capabilities: [
      {
        title: "Custom AI Models",
        description:
          "We build and deploy machine learning models tailored to your specific business needs, from predictive analytics to classification systems.",
        applications: ["Demand forecasting", "Risk assessment", "Customer segmentation"],
      },
      {
        title: "Computer Vision",
        description:
          "Image and video analysis solutions for quality control, document processing, medical imaging and visual inspection.",
        applications: ["Defect detection", "Document OCR", "Visual search"],
      },
      {
        title: "AI Agents & LLMs",
        description:
          "Intelligent conversational agents and language models that automate customer support, document analysis and knowledge management.",
        applications: ["Customer service bots", "Document Q&A", "Content generation"],
      },
      {
        title: "Business Intelligence",
        description:
          "Interactive dashboards and analytics platforms that turn raw data into actionable insight for better decisions.",
        applications: ["Executive dashboards", "KPI tracking", "Trend analysis"],
      },
      {
        title: "Process Automation",
        description:
          "End-to-end automation of repetitive tasks and workflows, integrating AI to handle complex decision points.",
        applications: ["Data pipelines", "Report generation", "Approval workflows"],
      },
      {
        title: "MLOps & Deployment",
        description:
          "Production-grade infrastructure to deploy, monitor and scale your AI solutions with reliability and performance.",
        applications: ["Model serving", "A/B testing", "Performance monitoring"],
      },
    ],
    ctaTitle: "Have a specific challenge?",
    ctaDescription:
      "Tell us about your project and we'll help you identify the right AI solution for your needs.",
    ctaChips: ["No upfront commitment", "Free consultation", "Proposal in 48 business hours"],
  },
  team: {
    titlePre: "Our leadership team, ",
    titleAccent: "with hands-on experience",
    description: "Leadership with real hands-on experience across AI, data and operations.",
    members: [
      {
        name: "Wayner Barrios",
        role: "CEO & Founder",
        expertise:
          "Experience in multimodal AI, computer vision and distributed AI systems. Leads Wiqonn's AI and data practice.",
      },
      {
        name: "Martha Quiroga",
        role: "Financial Director",
        expertise:
          "Strategic financial oversight ensuring sustainable growth and operational excellence.",
      },
      {
        name: "Jaime Cotes",
        role: "Operations Director",
        expertise:
          "Digital Marketing and operations planning expert, ensuring flawless project execution.",
      },
      {
        name: "Sergio Molinares",
        role: "Infrastructure Architect",
        expertise:
          "Expert in cloud infrastructure, penetration testing and OSINT analysis for high-risk environments.",
      },
      {
        name: "Kenneth Barrios",
        role: "Full-Stack Developer",
        expertise:
          "React Native specialist with proven ability to integrate AI agents into mobile platforms.",
      },
      {
        name: "Emmanuel Escaffi",
        role: "IT Systems Administrator",
        expertise:
          "Ensures optimal operational efficiency across all infrastructure systems.",
      },
    ],
  },
  cta: {
    badge: "Let's talk",
    titlePre: "Will AI work with your data? ",
    titleAccent: "We'll tell you in 30 minutes",
    subheadline:
      "Tell us your challenge in 30 minutes. We'll honestly tell you if we can help and how — and if we can't, we'll say so before you spend.",
    emailButton: "Book my diagnosis",
    emailBody: "Hi Wiqonn, I'd like to book a 30-minute AI diagnosis for my company",
    emailSubject: "AI diagnosis · 30 min",
    trust: "Reply in under 24h · No commitment · Proposal in 48 business hours",
    location: "Barranquilla, Colombia",
    form: {
      name: "Name",
      namePlaceholder: "Your name",
      email: "Work email",
      emailPlaceholder: "name@company.com",
      company: "Company",
      companyPlaceholder: "Your company name",
      size: "Company size",
      sizePlaceholder: "Employees",
      message: "Your challenge (optional)",
      messagePlaceholder: "What do you want to automate or solve with AI?",
      sending: "Sending…",
      successTitle: "Received!",
      successBody: "We reply within 24 business hours.",
      error: "Couldn't send. Try again or write to ",
    },
  },
  guarantees: {
    eyebrow: "Our word, in writing",
    title: "Working with us is not a gamble",
    items: [
      "Fixed price in writing: the number we quote is the number you pay.",
      "If it doesn't work on your data, we tell you before you spend.",
      "Proposal within 48 business hours of our first conversation.",
      "We reply within 24 hours.",
    ],
  },
  faq: {
    eyebrow: "Frequently asked questions",
    title: "What clients ask us before starting",
    items: [
      {
        q: "How much does AI implementation cost for my company?",
        a: "It depends on scope and use case. We start with an AI Readiness Audit (project, based on scope) that prioritizes cases by ROI and delivers a roadmap with phases and costs before you invest. Fixed price in writing, no hidden costs.",
      },
      {
        q: "How soon will I see results?",
        a: "You get a proposal within 48 business hours. Outcome-based pilots work in short cycles with a KPI defined on day one; if the solution doesn't work on your data, we tell you before you spend.",
      },
      {
        q: "What size companies do you work with?",
        a: "Mid-sized companies anywhere in the world. We cover from data to hardware: AI/ML, BI, cloud, IoT and custom development under one roof.",
      },
      {
        q: "Will we become dependent on you?",
        a: "No. We hand over code, documentation and infrastructure access; the retainer is optional and cancellable anytime, no lock-in. Most clients keep it because models need to evolve — not because they're locked in.",
      },
      {
        q: "What about the security of our data?",
        a: "Your data stays yours: it's never used for other clients or to train unrelated models. We sign NDAs and confidentiality agreements, and agree security standards in writing before we start.",
      },
      {
        q: "How do we get started?",
        a: "With a free 30-minute diagnosis, no commitment: we listen, honestly tell you whether we can help and how, and within 48 business hours you get a written proposal with fixed price and scope.",
      },
    ],
  },
  footer: {
    description:
      "Research-backed AI and technology solutions for real-world impact.",
    servicesTitle: "Services",
    services: [
      "Business Intelligence",
      "AI & Machine Learning",
      "Cloud Infrastructure",
      "Full-Stack Development",
    ],
    companyTitle: "Company",
    company: ["About Us", "Team", "Careers"],
    getInTouch: "Get in Touch",
    schedule: "Schedule a free consultation",
    rights: "All rights reserved.",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
  },
  marquee: {
    title: "The stack we work with",
  },
}
