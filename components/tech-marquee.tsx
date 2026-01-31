"use client"

import Image from "next/image"
import { Marquee } from "./marquee"
import {
  SiPytorch,
  SiPython,
  SiCplusplus,
  SiNvidia,
  SiKubernetes,
  SiDocker,
  SiAmazonwebservices,
  SiGooglecloud,
  SiFlutter,
  SiGo,
  SiRedis,
  SiLinux,
  SiTensorflow,
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiSnowflake,
  SiMysql,
} from "react-icons/si"
import {
  BrainCircuit,
  Cpu,
  Workflow,
  BarChart3,
  Server,
} from "lucide-react"
import type { IconType } from "react-icons"
import type { LucideIcon } from "lucide-react"

type TechItem = {
  name: string
  color: string
} & (
  | { icon: IconType | LucideIcon; image?: never }
  | { image: string; icon?: never }
)

const technologies: TechItem[] = [
  // AI/ML Frameworks
  { name: "PyTorch", icon: SiPytorch, color: "#EE4C2C" },
  { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" },
  { name: "LLMs", icon: BrainCircuit, color: "#00ADEC" },

  // Languages
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "C++", icon: SiCplusplus, color: "#00599C" },
  { name: "Go", icon: SiGo, color: "#00ADD8" },

  // Microsoft Ecosystem
  { name: "Azure", image: "/icons/icons8-azure-48.png", color: "#0078D4" },
  { name: "Dynamics 365", image: "/icons/icons8-dynamics-365-50.png", color: "#002050" },
  { name: "Power BI", icon: BarChart3, color: "#F2C811" },
  { name: "SQL Server", icon: Server, color: "#CC2927" },
  { name: "Logic Apps", icon: Workflow, color: "#0078D4" },

  // Cloud & Infrastructure
  { name: "AWS", icon: SiAmazonwebservices, color: "#FF9900" },
  { name: "Google Cloud", icon: SiGooglecloud, color: "#4285F4" },
  { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },

  // Databases & Data
  { name: "Snowflake", icon: SiSnowflake, color: "#29B5E8" },
  { name: "Redis", icon: SiRedis, color: "#DC382D" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  { name: "Linux", icon: SiLinux, color: "#FCC624" },

  // Frontend & Mobile
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "Flutter", icon: SiFlutter, color: "#02569B" },

  // GPU & HPC
  { name: "NVIDIA CUDA", icon: SiNvidia, color: "#76B900" },
  { name: "HPC", icon: Cpu, color: "#00ADEC" },
]

function TechIcon({ tech }: { tech: TechItem }) {
  if (tech.image) {
    return (
      <Image
        src={tech.image}
        alt={tech.name}
        width={20}
        height={20}
        className="w-5 h-5 transition-transform group-hover:scale-110"
      />
    )
  }

  if (tech.icon) {
    const Icon = tech.icon
    return (
      <Icon
        className="w-5 h-5 transition-transform group-hover:scale-110"
        style={{ color: tech.color }}
      />
    )
  }

  return null
}

export function TechMarquee() {
  return (
    <section className="py-12 md:py-16 bg-[#0a0a0a] border-y border-border/30 overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground/60">
          Powered by Industry-Leading Technology
        </p>
      </div>

      {/* First row - left to right */}
      <Marquee direction="left" speed={30} className="mb-4">
        {technologies.map((tech, index) => (
          <div
            key={index}
            className="flex items-center gap-3 px-5 py-2.5 bg-white/[0.03] rounded-full border border-white/[0.06] hover:border-white/20 hover:bg-white/[0.06] transition-all cursor-default group"
          >
            <TechIcon tech={tech} />
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
              {tech.name}
            </span>
          </div>
        ))}
      </Marquee>

      {/* Second row - right to left */}
      <Marquee direction="right" speed={25}>
        {[...technologies].reverse().map((tech, index) => (
          <div
            key={index}
            className="flex items-center gap-3 px-5 py-2.5 bg-white/[0.03] rounded-full border border-white/[0.06] hover:border-white/20 hover:bg-white/[0.06] transition-all cursor-default group"
          >
            <TechIcon tech={tech} />
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
              {tech.name}
            </span>
          </div>
        ))}
      </Marquee>
    </section>
  )
}
