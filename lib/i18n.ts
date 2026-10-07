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

export const HOME_PATHS: Record<Lang, string> = { es: "/", en: "/en" }

export const es = {
  seo: {
    title: "IA Aplicada y Transformación Digital | Wiqonn",
    description:
      "Laboratorio de IA aplicada en Barranquilla. Diseñamos software, datos e infraestructura para transformar organizaciones y formar a sus equipos.",
    keywords:
      "IA aplicada, transformación digital, consultoría de transformación digital, ingeniería digital, consultoría de IA Colombia, implementación de IA, inteligencia artificial, AI lab, investigación aplicada en IA, modelos de IA personalizados, agentes de IA, machine learning, LLM/RAG, visión por computador, MLOps, business intelligence, software a la medida, automatización de procesos, análisis de datos, infraestructura tecnológica, formación tecnológica, capacitación en IA, marketing digital, marketing de contenidos, SEO, GEO, AEO, automatización de marketing, Barranquilla, Colombia",
    locale: "es_CO",
  },
  nav: {
    links: ["Inicio", "Servicios", "Blog", "Contacto"],
    cta: "Empecemos",
    menuLabel: "Abrir menú",
    langLabel: "Cambiar idioma",
  },
  hero: {
    titlePre: "Tecnología construida para ",
    subheadline:
      "Diseñamos, construimos y desplegamos software, sistemas de datos, inteligencia artificial e infraestructura para transformar procesos reales. Formamos a tus equipos para asegurar adopción, autonomía y transferencia de conocimiento.",
    rotator: ["tu dominio", "tus datos", "el mundo real"],
    trustResearch:
      "Un mismo equipo lleva cada sistema de la investigación a producción.",
    ctaPrimary: "Hablemos de tu caso de uso",
    ctaSecondary: "Explorar nuestras capacidades",
    checklistHref: "/#services",
    emailBody: "Hola Wiqonn, quiero agendar un diagnóstico de 30 minutos para mi organización",
    emailSubject: "Diagnóstico inicial · 30 min",
  },
  value: {
    eyebrow: "Nuestro enfoque en IA",
    titlePre: "Investigación y producto, ",
    titleAccent: "sin paredes entre ellos",
    description:
      "Desarrollamos la capacidad completa detrás de un sistema de IA diferenciado: modelos, datos, evaluación, infraestructura e integración en el entorno donde debe funcionar.",
    pillars: [
      {
        title: "El modelo correcto para el problema",
        description:
          "Comparamos modelos disponibles, los adaptamos o afinamos cuando mejora el desempeño y entrenamos modelos específicos cuando los datos y el caso lo justifican.",
        highlights: [
          "LLMs y modelos multimodales",
          "Visión por computador y percepción",
          "Pronóstico y sistemas de decisión",
          "Agentes solo cuando aportan valor",
        ],
      },
      {
        title: "Evaluación antes de escalar",
        description:
          "Acordamos una línea base, datos representativos, criterios de aceptación y límites operativos. Cada fase termina con evidencia para avanzar, refinar o detener.",
        highlights: [
          "Calidad y severidad de errores",
          "Robustez, latencia y costo de inferencia",
          "Seguridad e impacto en el flujo de trabajo",
          "Limitaciones documentadas",
        ],
      },
      {
        title: "Ingeniería para el mundo real",
        description:
          "Llevamos el sistema a tu nube, infraestructura local o edge, lo integramos con tu operación y transferimos el conocimiento para que mantengas el control.",
        highlights: [
          "MLOps y optimización de inferencia",
          "Cloud, on-premise, edge e IoT",
          "Código, artefactos y documentación acordados",
          "Operación continua opcional",
        ],
      },
    ],
  },
  services: {
    eyebrow: "De la estrategia a resultados medibles",
    titlePre: "Tecnología y transformación digital con",
    titleAccent: "IA aplicada",
    description:
      "Unimos software, datos, IA e infraestructura para transformar procesos reales. En cada área podemos formar a tu equipo para que adopte, opere y mejore lo construido.",
    inquirySubject: "Consulta sobre",
    learnMore: "Explorar servicios",
    items: [
      {
        title: "IA de lenguaje y multimodal",
        tagline: "Modelos que entienden tu dominio, no solo el internet público.",
        description:
          "Adaptamos, afinamos y desplegamos modelos de lenguaje y multimodales alrededor de tus datos, conocimiento y restricciones.",
        results: [
          "LLMs y modelos visión-lenguaje",
          "RAG privado e inteligencia documental",
          "Fine-tuning y post-training",
          "Sistemas agentic cuando el caso lo exige",
        ],
      },
      {
        title: "Visión y sistemas predictivos",
        tagline: "IA que percibe, anticipa y apoya mejores decisiones.",
        description:
          "Modelos para imágenes, video, señales y datos tabulares, diseñados para tu entorno operativo.",
        results: [
          "Detección, segmentación, OCR e inspección",
          "Pronóstico y detección de anomalías",
          "Recomendación, riesgo y optimización",
          "Inferencia en cloud, on-premise o edge",
        ],
      },
      {
        title: "Datos, evaluación y MLOps",
        tagline: "La capa que convierte un modelo prometedor en un sistema confiable.",
        description:
          "Construimos pipelines de datos, evaluaciones específicas al dominio y operación de modelos para producción.",
        results: [
          "Datasets, líneas base y evals reproducibles",
          "Serving y optimización de inferencia",
          "Monitoreo de calidad, drift y costo",
          "Seguridad, guardrails y observabilidad",
        ],
      },
      {
        title: "Ingeniería de productos de IA",
        tagline: "El modelo, la aplicación y la infraestructura como un solo sistema.",
        description:
          "Integramos la capacidad de IA en productos, APIs y flujos de trabajo que tu equipo puede adoptar y operar.",
        results: [
          "Aplicaciones web, móviles y plataformas",
          "APIs y sistemas backend escalables",
          "Cloud, IoT y sistemas embebidos",
          "Despliegue, transferencia y soporte",
        ],
      },
      {
        title: "Transformación Digital",
        tagline: "Procesos, tecnología y equipos alineados con objetivos medibles.",
        description:
          "Diagnosticamos cómo opera tu organización y convertimos la estrategia digital en una hoja de ruta que se pueda ejecutar.",
        results: [
          "Modelos de negocio y hojas de ruta digitales",
          "Rediseño y automatización de procesos",
          "Canales, datos y herramientas integradas",
          "Gobernanza, métricas y gestión del cambio",
        ],
      },
      {
        title: "Marketing Digital",
        tagline: "Estrategia, contenido y adquisición guiados por datos.",
        description:
          "Diseñamos sistemas de marketing para que las personas encuentren, entiendan y adopten tu oferta, servicio o iniciativa.",
        results: [
          "SEO, GEO y AEO",
          "Brand, Product y Funnel Content",
          "Canales, campañas y automatización",
          "Analítica, KPIs y optimización continua",
        ],
      },
      {
        title: "Formación y adopción tecnológica",
        tagline: "El conocimiento que tu equipo necesita para mantener el control.",
        description:
          "Diseñamos programas prácticos alrededor de las tecnologías, procesos y herramientas que tu organización necesita adoptar.",
        results: [
          "IA, datos, software e infraestructura",
          "Transformación digital y automatización",
          "Marketing digital, SEO y contenido",
          "Talleres por rol, documentación y acompañamiento",
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
        title: "Evaluación de oportunidad y viabilidad de IA",
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
          "Rendimiento y confiabilidad del sistema",
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
        title: "Validación guiada por evidencia",
        price: "Proyecto",
        priceNote: "según alcance",
        description:
          "Validamos la viabilidad técnica y operativa con datos representativos, una línea base y criterios de aceptación acordados antes de escalar.",
        bullets: [
          "Plan de evidencia acordado antes de construir",
          "Evaluación del modelo y del sistema",
          "Decisión clara: avanzar, refinar o detener",
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
        audit: { label: "Evaluación de viabilidad", sub: "Proyecto · según alcance" },
        plan: { label: "Plan + propuesta", sub: "ROI y roadmap priorizado" },
        pilot: { label: "Validación con evidencia", sub: "Proyecto · decisión informada" },
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
            "Investigación aplicada en IA: LLMs multimodales, visión por computador y sistemas de IA distribuidos. Evaluamos cada promesa de modelo con rigor y documentamos la evidencia antes de recomendar una implementación mayor.",
        },
        fullstack: {
          title: "Full-stack: del dato al hardware",
          description:
            "Cubrimos el espectro completo: de ML/IA y analítica a apps web/móviles, IoT, visión por computador y sistemas embebidos. Un solo AI lab, cero integradores de por medio.",
        },
        humans: {
          title: "Data and engineering for humans",
          description:
            "El tagline oficial no es decoración: tecnología al servicio de personas y negocio, con criterios claros, evidencia verificable y transferencia de conocimiento.",
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
    eyebrow: "Cómo trabajamos",
    titlePre: "De la estrategia al ",
    titleAccent: "impacto",
    subtitle:
      "Conectamos estrategia, software, datos, IA e infraestructura en un proceso medible. En cada etapa transferimos conocimiento para que tu equipo pueda adoptar y sostener lo construido.",
    items: [
      {
        title: "Entendemos el reto",
        description: "Procesos, usuarios, datos y objetivos.",
      },
      {
        title: "Diseñamos la ruta",
        description: "Prioridades, arquitectura y métricas.",
      },
      {
        title: "Construimos y activamos",
        description: "Software, datos, IA, automatización e infraestructura.",
      },
      {
        title: "Transferimos y mejoramos",
        description: "Formación, documentación, adopción y decisiones para la siguiente etapa.",
      },
    ],
  },
  research: {
    badge: "Nuestras capacidades",
    titlePre: "Capacidades que ",
    titleAccent: "resuelven problemas reales",
    description: "Soluciones de IA de punta a punta diseñadas para resolver problemas de negocio reales.",
    capabilities: [
      {
        title: "Modelos a la medida y específicos al dominio",
        description:
          "Seleccionamos, adaptamos, afinamos o entrenamos modelos según lo que exijan tus datos, dominio y entorno operativo.",
        applications: ["Fine-tuning", "Post-training", "Modelos predictivos"],
      },
      {
        title: "Visión por computador y percepción",
        description:
          "Soluciones de análisis de imagen y video para control de calidad, procesamiento de documentos, imágenes médicas e inspección visual.",
        applications: ["Detección de defectos", "OCR de documentos", "Búsqueda visual"],
      },
      {
        title: "LLMs e IA multimodal",
        description:
          "Modelos de lenguaje y multimodales para razonamiento específico al dominio, inteligencia documental, voz y tareas visión-lenguaje.",
        applications: ["LLMs de dominio", "RAG privado", "Modelos visión-lenguaje"],
      },
      {
        title: "Pronóstico y sistemas de decisión",
        description:
          "Modelos que convierten datos operativos en pronósticos, alertas, recomendaciones y decisiones mejor informadas.",
        applications: ["Pronóstico", "Anomalías", "Riesgo y optimización"],
      },
      {
        title: "Evaluación y seguridad de modelos",
        description:
          "Evaluaciones reproducibles sobre datos representativos para medir calidad, robustez, seguridad, latencia y costo.",
        applications: ["Evals de dominio", "Red teaming", "Guardrails"],
      },
      {
        title: "Infraestructura de IA y MLOps",
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
        role: "Director de Operaciones y Transformación Digital",
        expertise:
          "Lidera transformación digital y marketing con experiencia en estrategia, contenido, SEO, automatización y formación de equipos.",
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
    titlePre: "Tu reto necesita un ",
    titleAccent: "plan que se pueda ejecutar",
    subheadline:
      "En 30 minutos revisamos el objetivo, el contexto y las restricciones reales. Te decimos qué conviene validar primero y si somos el equipo adecuado.",
    emailButton: "Hablar de mi caso de uso",
    emailBody: "Hola Wiqonn, quiero agendar un diagnóstico de 30 minutos para mi organización",
    emailSubject: "Diagnóstico inicial · 30 min",
    trust: "Respuesta en menos de 24 h · Sin compromiso · Propuesta en 48 h hábiles",
    location: "Barranquilla, Colombia",
    form: {
      name: "Nombre",
      namePlaceholder: "Tu nombre",
      email: "Email corporativo",
      emailPlaceholder: "nombre@organizacion.com",
      company: "Organización",
      companyPlaceholder: "Nombre de tu organización",
      size: "Tamaño de la organización",
      sizePlaceholder: "Personas",
      message: "Tu reto (opcional)",
      messagePlaceholder: "¿Qué necesita cambiar en tu organización?",
      sending: "Enviando…",
      successTitle: "¡Recibido!",
      successBody: "Respondemos en menos de 24 horas.",
      error: "No se pudo enviar. Intenta de nuevo o escríbenos a ",
    },
  },
  guarantees: {
    eyebrow: "Nuestra palabra, por escrito",
    title: "Trabajar con nosotros no es una apuesta",
    items: [
      "Alcance, entregables y precio definidos por escrito para cada fase.",
      "Evaluación con datos representativos antes de una inversión mayor.",
      "Propuesta en 48 h hábiles desde la primera conversación.",
      "Sin lock-in contractual y con transferencia de conocimiento.",
    ],
  },
  faq: {
    eyebrow: "Preguntas frecuentes",
    title: "Lo que las organizaciones preguntan antes de empezar",
    items: [
      {
        q: "¿Cuánto cuesta un proyecto digital o de IA?",
        a: "Depende del alcance. Primero definimos el problema, los usuarios, los datos, los canales y el resultado esperado. Después entregamos una propuesta por fases con alcance, entregables y precio por escrito.",
      },
      {
        q: "¿Qué tan pronto veré resultados?",
        a: "Recibes una propuesta por escrito con precio fijo y alcance dentro de 48 h hábiles desde nuestra primera conversación. Después trabajamos en ciclos cortos: cada fase se evalúa con datos representativos y criterios de aceptación acordados, y termina con una recomendación clara de avanzar, refinar o detener. Ves progreso medible antes de comprometer más presupuesto.",
      },
      {
        q: "¿Con qué tipo de organizaciones trabajan?",
        a: "Trabajamos con entidades públicas, empresas grandes y pequeñas, universidades, centros de investigación y organizaciones sociales de cualquier sector. Adaptamos el trabajo al problema, los datos, los usuarios y las reglas de cada entorno.",
      },
      {
        q: "¿Solo construyen agentes de IA?",
        a: "No. Construimos software, sistemas de datos, infraestructura y soluciones de IA, y acompañamos procesos de transformación digital. El marketing digital es una capacidad complementaria. También formamos a los equipos en cualquiera de estas áreas cuando el proyecto lo requiere.",
      },
      {
        q: "¿Quedaremos dependientes de ustedes?",
        a: "No. Entregamos el código, la documentación y los accesos de infraestructura acordados. El acompañamiento continuo es opcional y puedes cancelarlo cuando quieras. También transferimos conocimiento para que tu equipo mantenga el control.",
      },
      {
        q: "¿Qué pasa con la seguridad de nuestros datos?",
        a: "Tus datos son tuyos: nunca se usan para otros clientes ni para entrenar modelos ajenos. Firmamos NDA y acuerdos de confidencialidad, y acordamos estándares de seguridad por escrito antes de empezar.",
      },
      {
        q: "¿Cómo empezamos?",
        a: "Agenda un diagnóstico gratuito de 30 minutos, sin compromiso. Escuchamos tu caso y te decimos con honestidad si podemos ayudarte y cómo. En 48 horas hábiles recibes una propuesta inicial con alcance y precio por fase.",
      },
    ],
  },
  footer: {
    description:
      "Tecnología y transformación digital con IA aplicada, ingeniería y transferencia de conocimiento.",
    servicesTitle: "Servicios",
    services: [
      "IA de lenguaje y multimodal",
      "Visión y sistemas predictivos",
      "Evaluación y MLOps",
      "Ingeniería de productos de IA",
      "Transformación Digital",
      "Marketing Digital",
      "Formación y adopción tecnológica",
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
    title: "Applied AI & Digital Transformation | Wiqonn",
    description:
      "Applied AI lab in Barranquilla. We build software, data systems and infrastructure to transform organizations and train their teams.",
    keywords:
      "applied AI, digital transformation, digital transformation consulting, digital engineering, AI consulting Colombia, AI implementation, artificial intelligence, AI lab, applied AI research, custom AI models, AI agents, machine learning, LLM/RAG, computer vision, MLOps, business intelligence, custom software, process automation, data analytics, technology infrastructure, technology training, AI training, digital marketing, content marketing, SEO, GEO, AEO, marketing automation, Barranquilla, Colombia",
    locale: "en_US",
  },
  nav: {
    links: ["Home", "Services", "Blog", "Contact"],
    cta: "Get Started",
    menuLabel: "Toggle menu",
    langLabel: "Switch language",
  },
  hero: {
    titlePre: "Technology built around ",
    subheadline:
      "We design, build and deploy software, data systems, artificial intelligence and infrastructure to transform real processes. We train your teams to ensure adoption, autonomy and lasting knowledge transfer.",
    rotator: ["your domain", "your data", "the real world"],
    trustResearch:
      "One team takes every system from research to production.",
    ctaPrimary: "Discuss your use case",
    ctaSecondary: "Explore our capabilities",
    checklistHref: "/en#services",
    emailBody: "Hi Wiqonn, I'd like to book a 30-minute diagnosis for my organization",
    emailSubject: "Initial diagnosis · 30 min",
  },
  value: {
    eyebrow: "Our approach to AI",
    titlePre: "Research and product, with ",
    titleAccent: "no walls between them",
    description:
      "We develop the complete capability behind differentiated AI: models, data, evaluation, infrastructure and integration in the environment where it must perform.",
    pillars: [
      {
        title: "The right model for the problem",
        description:
          "We benchmark available models, adapt or fine-tune them when it improves performance, and train purpose-built models when the data and use case justify it.",
        highlights: [
          "LLMs and multimodal models",
          "Computer vision and perception",
          "Forecasting and decision systems",
          "Agents only when they add value",
        ],
      },
      {
        title: "Evaluate before you scale",
        description:
          "We agree on a baseline, representative data, acceptance criteria and operating constraints. Every phase ends with evidence to proceed, refine or stop.",
        highlights: [
          "Quality and error severity",
          "Robustness, latency and inference cost",
          "Safety and workflow impact",
          "Documented limitations",
        ],
      },
      {
        title: "Engineering for the real world",
        description:
          "We deploy to your cloud, on-premise infrastructure or edge environment, integrate with operations and transfer the knowledge so you remain in control.",
        highlights: [
          "MLOps and inference optimization",
          "Cloud, on-premise, edge and IoT",
          "Agreed code, artifacts and documentation",
          "Optional ongoing operations",
        ],
      },
    ],
  },
  services: {
    eyebrow: "From strategy to measurable outcomes",
    titlePre: "Technology and digital transformation with",
    titleAccent: "applied AI",
    description:
      "We combine software, data, AI and infrastructure to transform real processes. In every area, we can train your team to adopt, operate and improve what we build.",
    inquirySubject: "Inquiry about",
    learnMore: "Explore services",
    items: [
      {
        title: "Language & Multimodal AI",
        tagline: "Models that understand your domain, not only the public internet.",
        description:
          "We adapt, fine-tune and deploy language and multimodal models around your data, knowledge and constraints.",
        results: [
          "LLMs and vision-language models",
          "Private RAG and document intelligence",
          "Fine-tuning and post-training",
          "Agentic systems when the use case calls for them",
        ],
      },
      {
        title: "Vision & Predictive Systems",
        tagline: "AI that perceives, anticipates and supports better decisions.",
        description:
          "Models for images, video, signals and tabular data, designed for your operating environment.",
        results: [
          "Detection, segmentation, OCR and inspection",
          "Forecasting and anomaly detection",
          "Recommendation, risk and optimization",
          "Cloud, on-premise or edge inference",
        ],
      },
      {
        title: "Data, Evaluation & MLOps",
        tagline: "The layer that turns a promising model into a dependable system.",
        description:
          "We build data pipelines, domain-specific evaluations and production operations for AI models.",
        results: [
          "Datasets, baselines and reproducible evals",
          "Serving and inference optimization",
          "Quality, drift and cost monitoring",
          "Security, guardrails and observability",
        ],
      },
      {
        title: "AI Product Engineering",
        tagline: "The model, application and infrastructure as one system.",
        description:
          "We integrate AI capabilities into products, APIs and workflows your team can adopt and operate.",
        results: [
          "Web, mobile and platform applications",
          "APIs and scalable backend systems",
          "Cloud, IoT and embedded systems",
          "Deployment, handover and support",
        ],
      },
      {
        title: "Digital Transformation",
        tagline: "Processes, technology and teams aligned around measurable goals.",
        description:
          "We examine how your organization operates and turn its digital strategy into an actionable roadmap.",
        results: [
          "Digital business models and roadmaps",
          "Process redesign and automation",
          "Connected channels, data and tools",
          "Governance, metrics and change management",
        ],
      },
      {
        title: "Digital Marketing",
        tagline: "Strategy, content and acquisition guided by data.",
        description:
          "We build marketing systems that help people find, understand and adopt your product, service or initiative.",
        results: [
          "SEO, GEO and AEO",
          "Brand, Product and Funnel Content",
          "Channels, campaigns and automation",
          "Analytics, KPIs and continuous improvement",
        ],
      },
      {
        title: "Technology Training & Adoption",
        tagline: "The knowledge your team needs to stay in control.",
        description:
          "We design practical programs around the technologies, processes and tools your organization needs to adopt.",
        results: [
          "AI, data, software and infrastructure",
          "Digital transformation and automation",
          "Digital marketing, SEO and content",
          "Role-based workshops, documentation and support",
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
        title: "AI Opportunity & Feasibility Assessment",
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
          "System performance and reliability",
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
        title: "Evidence-Led Validation",
        price: "Project",
        priceNote: "based on scope",
        description:
          "We validate technical and operational feasibility with representative data, a baseline and agreed acceptance criteria before scaling.",
        bullets: [
          "Evidence plan agreed before development",
          "Model and system evaluation",
          "Clear decision: proceed, refine or stop",
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
        audit: { label: "Feasibility assessment", sub: "Project · based on scope" },
        plan: { label: "Plan + proposal", sub: "ROI and prioritized roadmap" },
        pilot: { label: "Evidence-led validation", sub: "Project · informed decision" },
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
        "Three reasons why projects with Wiqonn reach production, and don't stay demos.",
      items: {
        research: {
          title: "Real research, not marketing",
          description:
            "Applied AI research: multimodal LLMs, computer vision and distributed AI systems. We evaluate every model claim with rigor and document the evidence before recommending a larger implementation.",
        },
        fullstack: {
          title: "Full-stack: from data to hardware",
          description:
            "We cover the complete spectrum: from ML/AI and analytics to web/mobile apps, IoT, computer vision and embedded systems. One AI lab, zero middlemen.",
        },
        humans: {
          title: "Data and engineering for humans",
          description:
            "The official tagline isn't decoration: technology at the service of people and business, with clear criteria, verifiable evidence and knowledge transfer.",
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
    eyebrow: "How we work",
    titlePre: "From strategy to ",
    titleAccent: "impact",
    subtitle:
      "We connect strategy, software, data, AI and infrastructure through a measurable process. At every stage, we transfer knowledge so your team can adopt and sustain what we build.",
    items: [
      {
        title: "Understand the challenge",
        description: "Processes, users, data and goals.",
      },
      {
        title: "Design the path",
        description: "Priorities, architecture and metrics.",
      },
      {
        title: "Build and activate",
        description: "Software, data, AI, automation and infrastructure.",
      },
      {
        title: "Transfer and improve",
        description: "Training, documentation, adoption and decisions for the next stage.",
      },
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
        title: "Custom & Domain-Specific Models",
        description:
          "We select, adapt, fine-tune or train models according to your data, domain and operating environment.",
        applications: ["Fine-tuning", "Post-training", "Predictive models"],
      },
      {
        title: "Computer Vision & Perception",
        description:
          "Image and video analysis solutions for quality control, document processing, medical imaging and visual inspection.",
        applications: ["Defect detection", "Document OCR", "Visual search"],
      },
      {
        title: "LLMs & Multimodal AI",
        description:
          "Language and multimodal models for domain-specific reasoning, document intelligence, speech and vision-language tasks.",
        applications: ["Domain-specific LLMs", "Private RAG", "Vision-language models"],
      },
      {
        title: "Forecasting & Decision Systems",
        description:
          "Models that turn operational data into forecasts, alerts, recommendations and better-informed decisions.",
        applications: ["Forecasting", "Anomaly detection", "Risk and optimization"],
      },
      {
        title: "Model Evaluation & Safety",
        description:
          "Reproducible evaluations on representative data to measure quality, robustness, safety, latency and cost.",
        applications: ["Domain evals", "Red teaming", "Guardrails"],
      },
      {
        title: "AI Infrastructure & MLOps",
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
        role: "Operations & Digital Transformation Director",
        expertise:
          "Leads digital transformation and marketing with experience in strategy, content, SEO, automation and team training.",
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
    titlePre: "Your challenge needs an ",
    titleAccent: "actionable plan",
    subheadline:
      "In 30 minutes, we review the goal, context and real constraints. We tell you what to validate first and whether we are the right team.",
    emailButton: "Discuss my use case",
    emailBody: "Hi Wiqonn, I'd like to book a 30-minute diagnosis for my organization",
    emailSubject: "Initial diagnosis · 30 min",
    trust: "Reply in under 24h · No commitment · Proposal in 48 business hours",
    location: "Barranquilla, Colombia",
    form: {
      name: "Name",
      namePlaceholder: "Your name",
      email: "Work email",
      emailPlaceholder: "name@organization.com",
      company: "Organization",
      companyPlaceholder: "Your organization name",
      size: "Organization size",
      sizePlaceholder: "People",
      message: "Your challenge (optional)",
      messagePlaceholder: "What needs to change in your organization?",
      sending: "Sending…",
      successTitle: "Received!",
      successBody: "We reply within 24 hours.",
      error: "Couldn't send. Try again or write to ",
    },
  },
  guarantees: {
    eyebrow: "Our word, in writing",
    title: "Working with us is not a gamble",
    items: [
      "Scope, deliverables and price defined in writing for each phase.",
      "Evaluation on representative data before a larger investment.",
      "Proposal within 48 business hours of our first conversation.",
      "No contractual lock-in, with knowledge transfer included.",
    ],
  },
  faq: {
    eyebrow: "Frequently asked questions",
    title: "What organizations ask before getting started",
    items: [
      {
        q: "How much does a digital or AI project cost?",
        a: "It depends on the scope. We first define the problem, users, data, channels and expected outcome. We then provide a phased proposal with the scope, deliverables and price in writing.",
      },
      {
        q: "How soon will I see results?",
        a: "You receive a written proposal with fixed price and scope within 48 business hours of our first call. From there we work in short cycles: every phase is evaluated on representative data against agreed acceptance criteria and ends with a clear recommendation to proceed, refine or stop. You see measurable progress before committing more budget.",
      },
      {
        q: "What types of organizations do you work with?",
        a: "We work with public institutions, companies large and small, universities, research centers and social organizations across sectors. We adapt the work to each environment's problem, data, users and rules.",
      },
      {
        q: "Do you only build AI agents?",
        a: "No. We build software, data systems, infrastructure and AI solutions, and support digital transformation programs. Digital marketing is a complementary capability. We can also train teams in any of these areas when the project requires it.",
      },
      {
        q: "Will we become dependent on you?",
        a: "No. We hand over the agreed code, documentation and infrastructure access. Ongoing support is optional and can be cancelled at any time. We also transfer knowledge so your team remains in control.",
      },
      {
        q: "What about the security of our data?",
        a: "Your data stays yours: it is never used for other clients or to train unrelated models. We sign NDAs and confidentiality agreements, and agree on security standards in writing before any work begins.",
      },
      {
        q: "How do we get started?",
        a: "Book a free 30-minute diagnosis with no commitment. We listen and tell you honestly whether we can help and how. Within 48 business hours, you receive an initial proposal with scope and pricing by phase.",
      },
    ],
  },
  footer: {
    description:
      "Technology and digital transformation with applied AI, engineering and knowledge transfer.",
    servicesTitle: "Services",
    services: [
      "Language & Multimodal AI",
      "Vision & Predictive Systems",
      "Evaluation & MLOps",
      "AI Product Engineering",
      "Digital Transformation",
      "Digital Marketing",
      "Technology Training & Adoption",
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
