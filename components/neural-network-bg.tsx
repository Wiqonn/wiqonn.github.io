"use client"

import { useEffect, useRef } from "react"

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

export function NeuralNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const nodesRef = useRef<Node[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initNodes()
    }

    const initNodes = () => {
      const nodeCount = Math.floor((canvas.width * canvas.height) / 25000)
      nodesRef.current = Array.from({ length: nodeCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
      }))
    }

    const drawNode = (node: Node, index: number) => {
      if (!ctx) return

      // Gradient from cyan to green based on position
      const gradientPosition = (node.x / canvas.width + node.y / canvas.height) / 2
      const cyan = { r: 0, g: 173, b: 236 }  // #00ADEC
      const green = { r: 57, g: 181, b: 74 } // #39B54A

      const r = Math.floor(cyan.r + (green.r - cyan.r) * gradientPosition)
      const g = Math.floor(cyan.g + (green.g - cyan.g) * gradientPosition)
      const b = Math.floor(cyan.b + (green.b - cyan.b) * gradientPosition)

      ctx.beginPath()
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.8)`
      ctx.fill()

      // Glow effect
      ctx.shadowBlur = 15
      ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.5)`
      ctx.fill()
      ctx.shadowBlur = 0
    }

    const drawConnections = () => {
      if (!ctx) return
      const nodes = nodesRef.current
      const connectionDistance = 150

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.3
            const gradientPosition = (nodes[i].x / canvas.width + nodes[j].x / canvas.width) / 2

            const cyan = { r: 0, g: 173, b: 236 }
            const green = { r: 57, g: 181, b: 74 }

            const r = Math.floor(cyan.r + (green.r - cyan.r) * gradientPosition)
            const g = Math.floor(cyan.g + (green.g - cyan.g) * gradientPosition)
            const b = Math.floor(cyan.b + (green.b - cyan.b) * gradientPosition)

            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }
    }

    const updateNodes = () => {
      const nodes = nodesRef.current
      const mouse = mouseRef.current

      nodes.forEach((node) => {
        // Mouse interaction
        const dx = mouse.x - node.x
        const dy = mouse.y - node.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 200 && distance > 0) {
          const force = (200 - distance) / 200
          node.vx -= (dx / distance) * force * 0.02
          node.vy -= (dy / distance) * force * 0.02
        }

        // Update position
        node.x += node.vx
        node.y += node.vy

        // Boundary check with smooth wrap
        if (node.x < 0) node.x = canvas.width
        if (node.x > canvas.width) node.x = 0
        if (node.y < 0) node.y = canvas.height
        if (node.y > canvas.height) node.y = 0

        // Apply friction
        node.vx *= 0.99
        node.vy *= 0.99

        // Add small random movement
        node.vx += (Math.random() - 0.5) * 0.01
        node.vy += (Math.random() - 0.5) * 0.01
      })
    }

    const animate = () => {
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      updateNodes()
      drawConnections()
      nodesRef.current.forEach((node, index) => drawNode(node, index))

      animationRef.current = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener("resize", resizeCanvas)
    window.addEventListener("mousemove", handleMouseMove)

    resizeCanvas()
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: "transparent" }}
    />
  )
}
