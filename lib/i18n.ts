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
    title: "Laboratorio de IA aplicada | Sistemas de IA a la medida | Wiqonn",
    description:
      "Wiqonn investiga, adapta, entrena, evalúa y despliega sistemas de IA a la medida para organizaciones de cualquier tamaño en todo el mundo.",
    keywords:
      "consultoría de IA Colombia, implementación de IA, inteligencia artificial, AI lab, applied research IA, investigación aplicada en IA, modelos de IA personalizados, fine-tuning de LLM, modelos de lenguaje grandes, agentes de IA personalizados, machine learning, deep learning, LLM/RAG, visión por computador, MLOps, business intelligence, dashboards, cloud computing, infraestructura cloud, automatización de procesos, análisis de datos, Barranquilla, Colombia, nearshore AI",
    locale: "es_CO",
  },
  nav: {
    links: ["Inicio", "Servicios", "Blog", "Contacto"],
    cta: "Empecemos",
    menuLabel: "Abrir menú",
    langLabel: "Cambiar idioma",
  },
  hero: {
    labMark: "LABORATORIO DE IA APLICADA / BARRANQUILLA, CO",
    titlePre: "IA construida para ",
    subheadline:
      "Los modelos generales son potentes, pero tus retos más difíciles viven en datos propios, flujos especializados y restricciones reales. Investigamos, adaptamos y desplegamos el sistema de IA que ese contexto exige.",
    rotator: ["tu dominio", "tus datos", "el mundo real"],
    trustResearch:
      "Un mismo equipo lleva cada sistema de la investigación a producción.",
    ctaPrimary: "Hablemos de tu caso de uso",
    ctaSecondary: "Explorar nuestras capacidades",
    checklistHref: "/#services",
    emailBody: "Hola Wiqonn, quiero agendar un diagnóstico de 30 minutos sobre IA para mi empresa",
    emailSubject: "Diagnóstico de IA · 30 min",
  },
  value: {
    eyebrow: "Qué hace Wiqonn",
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
    eyebrow: "De la investigación al sistema",
    titlePre: "IA a la medida, lista para ",
    titleAccent: "el mundo real",
    description:
      "Elegimos la arquitectura según el problema y construimos los modelos, evaluaciones, sistemas de datos e infraestructura que necesita para funcionar.",
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
    titlePre: "Compromisos, ",
    titleAccent: "no promesas",
    subtitle: "Plazos y reglas que cumplimos en cada proyecto",
    labels: [
      "Diagnóstico de 30 minutos, gratis y sin compromiso",
      "Respuesta a tu mensaje en menos de 24 h",
      "Propuesta por escrito con alcance y precio por fase, en 48 h hábiles",
      "Un plan de evidencia acordado antes de cada validación",
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
    titlePre: "Tu problema merece la arquitectura ",
    titleAccent: "correcta",
    subheadline:
      "En 30 minutos revisamos el problema, los datos disponibles y las restricciones reales. Te diremos qué conviene validar primero y si somos el equipo adecuado.",
    emailButton: "Hablar de mi caso de uso",
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
      "Alcance, entregables y precio definidos por escrito para cada fase.",
      "Evaluación con datos representativos antes de una inversión mayor.",
      "Propuesta en 48 h hábiles desde la primera conversación.",
      "Sin lock-in contractual y con transferencia de conocimiento.",
    ],
  },
  faq: {
    eyebrow: "Preguntas frecuentes",
    title: "Lo que nos preguntan antes de empezar",
    items: [
      {
        q: "¿Cuánto cuesta un sistema de IA a la medida?",
        a: "Depende del problema, la preparación de los datos, las integraciones y el grado de personalización del modelo. Empezamos con una fase acotada de descubrimiento o viabilidad y entregamos una propuesta escrita con entregables, supuestos, hitos y precio definido por fase. Sin costos ocultos.",
      },
      {
        q: "¿Cuándo sabremos si funciona?",
        a: "Recibes una propuesta escrita en 48 h hábiles. Después trabajamos en ciclos cortos y evaluamos el sistema con datos representativos, una línea base y criterios de aceptación acordados. Cada fase termina con una recomendación clara para avanzar, refinar o detener antes de una inversión mayor.",
      },
      {
        q: "¿Con qué tamaño de organizaciones trabajan?",
        a: "Con organizaciones de cualquier tamaño y en cualquier parte del mundo, desde startups y equipos de investigación hasta empresas en crecimiento, grandes corporaciones e instituciones públicas. El encaje depende del problema, los datos y el entorno de despliegue, no del número de empleados.",
      },
      {
        q: "¿Solo construyen agentes de IA?",
        a: "No. Los agentes son una arquitectura posible, no nuestra categoría principal. Desarrollamos y adaptamos modelos predictivos, LLMs, modelos multimodales y visión por computador, junto con las evaluaciones, los sistemas de datos y la infraestructura necesarios para producción. Elegimos, afinamos o entrenamos el modelo según lo que el problema justifique.",
      },
      {
        q: "¿Quedaremos dependientes de ustedes?",
        a: "No hay lock-in contractual. Entregamos el código, la documentación, los artefactos de modelo y los accesos de infraestructura acordados. También revelamos antes de implementar cualquier dependencia de modelos, nube o hardware de terceros. El soporte continuo es opcional.",
      },
      {
        q: "¿Qué pasa con la seguridad de nuestros datos?",
        a: "Tus datos son tuyos: no se usan para otros clientes ni para entrenar modelos ajenos. Firmamos NDA y acuerdos de confidencialidad, y acordamos estándares de seguridad por escrito antes de empezar.",
      },
      {
        q: "¿Cómo empezamos?",
        a: "Con una conversación técnica gratuita de 30 minutos. Revisamos el problema, los datos disponibles y las restricciones operativas. Si no somos el equipo adecuado, te lo decimos. En 48 h hábiles recibes una recomendación escrita y, cuando aplica, una propuesta con alcance, entregables, supuestos, calendario y precio.",
      },
    ],
  },
  footer: {
    description:
      "Laboratorio de investigación e ingeniería aplicada en IA. De los modelos y los datos a sistemas que funcionan en el mundo real.",
    servicesTitle: "Servicios",
    services: [
      "IA de lenguaje y multimodal",
      "Visión y sistemas predictivos",
      "Evaluación y MLOps",
      "Ingeniería de productos de IA",
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
    title: "Applied AI Research Lab | Custom AI Systems | Wiqonn",
    description:
      "Wiqonn researches, adapts, trains, evaluates and deploys custom AI systems for organizations of every size, anywhere in the world.",
    keywords:
      "AI consulting Colombia, AI implementation, artificial intelligence, AI lab, applied AI research, custom AI models, LLM fine-tuning, large language models, custom AI agents, machine learning, deep learning, RAG, computer vision, MLOps, business intelligence, dashboards, cloud infrastructure, process automation, data analytics, Barranquilla, Colombia, nearshore AI",
    locale: "en_US",
  },
  nav: {
    links: ["Home", "Services", "Blog", "Contact"],
    cta: "Get Started",
    menuLabel: "Toggle menu",
    langLabel: "Switch language",
  },
  hero: {
    labMark: "APPLIED AI RESEARCH LAB / BARRANQUILLA, CO",
    titlePre: "AI built around ",
    subheadline:
      "General-purpose models are powerful, but your hardest problems live in proprietary data, specialized workflows and real operating constraints. We research, adapt and deploy the AI system that context requires.",
    rotator: ["your domain", "your data", "the real world"],
    trustResearch:
      "One team takes every system from research to production.",
    ctaPrimary: "Discuss your use case",
    ctaSecondary: "Explore our capabilities",
    checklistHref: "/#services",
    emailBody: "Hi Wiqonn, I'd like to book a 30-minute AI diagnosis for my company",
    emailSubject: "AI diagnosis · 30 min",
  },
  value: {
    eyebrow: "What Wiqonn Does",
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
    eyebrow: "From research to working systems",
    titlePre: "Custom AI, engineered for ",
    titleAccent: "the real world",
    description:
      "We choose the architecture for the problem, then build the models, evaluations, data systems and infrastructure it needs to perform.",
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
    titlePre: "Commitments, ",
    titleAccent: "not promises",
    subtitle: "Deadlines and rules we honor on every project",
    labels: [
      "Free 30-minute diagnosis, no commitment",
      "Reply to your message within 24 hours",
      "Written proposal with scope and price per phase within 48 business hours",
      "One evidence plan agreed before every validation",
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
    titlePre: "Your problem deserves the ",
    titleAccent: "right architecture",
    subheadline:
      "In 30 minutes, we review the problem, available data and real operating constraints. We tell you what to validate first and whether we are the right team.",
    emailButton: "Discuss my use case",
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
      "Scope, deliverables and price defined in writing for each phase.",
      "Evaluation on representative data before a larger investment.",
      "Proposal within 48 business hours of our first conversation.",
      "No contractual lock-in, with knowledge transfer included.",
    ],
  },
  faq: {
    eyebrow: "Frequently asked questions",
    title: "What clients ask us before starting",
    items: [
      {
        q: "How much does a custom AI system cost?",
        a: "Cost depends on the problem, data readiness, integrations and the level of model customization required. We begin with a scoped discovery or feasibility phase, then provide a written proposal with deliverables, assumptions, milestones and a defined price for each phase. No hidden fees.",
      },
      {
        q: "How soon will we know whether it works?",
        a: "You receive a written proposal within 48 business hours. We then work in short cycles and evaluate the system on representative data against an agreed baseline and acceptance criteria. Each phase ends with a clear recommendation to proceed, refine or stop before a larger investment.",
      },
      {
        q: "What size organizations do you work with?",
        a: "Organizations of every size, anywhere in the world, from startups and research teams to growing companies, global enterprises and public institutions. Fit depends on the problem, data and deployment environment, not employee count.",
      },
      {
        q: "Do you only build AI agents?",
        a: "No. Agents are one possible architecture, not our core category. We develop and adapt predictive models, LLMs, multimodal models and computer vision systems, together with the evaluations, data systems and infrastructure required for production. We select, fine-tune or train models according to what the problem justifies.",
      },
      {
        q: "Will we become dependent on you?",
        a: "There is no contractual lock-in. We hand over the agreed code, documentation, model artifacts and infrastructure access. We also disclose any third-party model, cloud or hardware dependencies before implementation. Ongoing support is optional.",
      },
      {
        q: "What about the security of our data?",
        a: "Your data stays yours: it's never used for other clients or to train unrelated models. We sign NDAs and confidentiality agreements, and agree security standards in writing before we start.",
      },
      {
        q: "How do we get started?",
        a: "Start with a free 30-minute technical conversation. We review the problem, available data and operating constraints. If we are not the right team, we say so. Within 48 business hours, you receive a written recommendation and, when appropriate, a proposal with scope, deliverables, assumptions, timeline and price.",
      },
    ],
  },
  footer: {
    description:
      "An applied AI research and engineering lab. From models and data to systems that work in the real world.",
    servicesTitle: "Services",
    services: [
      "Language & Multimodal AI",
      "Vision & Predictive Systems",
      "Evaluation & MLOps",
      "AI Product Engineering",
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
