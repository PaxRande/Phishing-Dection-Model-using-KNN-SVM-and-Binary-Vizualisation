"use client"

import { useEffect, useRef, useState } from "react"

interface BinaryVisualizationProps {
  data: number[][]
  highlightMode?: boolean
}

export function BinaryVisualization({ data, highlightMode = false }: BinaryVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null)

  useEffect(() => {
    if (!canvasRef.current || !data || data.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set dimensions
    const rows = data.length
    const cols = data[0].length
    const cellSize = Math.min(canvas.width / cols, canvas.height / rows)

    // Draw binary visualization
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const x = j * cellSize
        const y = i * cellSize
        const isHovered = hoveredCell?.row === i && hoveredCell?.col === j

        if (data[i][j] === 1) {
          // Active cell
          const gradient = ctx.createRadialGradient(
            x + cellSize / 2,
            y + cellSize / 2,
            0,
            x + cellSize / 2,
            y + cellSize / 2,
            cellSize / 1.5,
          )

          if (highlightMode) {
            gradient.addColorStop(0, "#10b981") // Emerald center
            gradient.addColorStop(1, "#065f46") // Darker emerald edge
          } else {
            gradient.addColorStop(0, "#10b981") // Emerald center
            gradient.addColorStop(1, "#047857") // Darker emerald edge
          }

          ctx.fillStyle = gradient

          // Draw rounded rectangle
          const radius = cellSize * 0.2
          ctx.beginPath()
          ctx.moveTo(x + radius, y)
          ctx.lineTo(x + cellSize - radius, y)
          ctx.quadraticCurveTo(x + cellSize, y, x + cellSize, y + radius)
          ctx.lineTo(x + cellSize, y + cellSize - radius)
          ctx.quadraticCurveTo(x + cellSize, y + cellSize, x + cellSize - radius, y + cellSize)
          ctx.lineTo(x + radius, y + cellSize)
          ctx.quadraticCurveTo(x, y + cellSize, x, y + cellSize - radius)
          ctx.lineTo(x, y + radius)
          ctx.quadraticCurveTo(x, y, x + radius, y)
          ctx.closePath()
          ctx.fill()

          // Add glow effect
          if (isHovered || highlightMode) {
            ctx.shadowColor = "#10b981"
            ctx.shadowBlur = 15
            ctx.fill()
            ctx.shadowBlur = 0
          }
        } else {
          // Inactive cell
          ctx.fillStyle = isHovered ? "#1e293b" : "#0f172a"

          // Draw rounded rectangle
          const radius = cellSize * 0.2
          ctx.beginPath()
          ctx.moveTo(x + radius, y)
          ctx.lineTo(x + cellSize - radius, y)
          ctx.quadraticCurveTo(x + cellSize, y, x + cellSize, y + radius)
          ctx.lineTo(x + cellSize, y + cellSize - radius)
          ctx.quadraticCurveTo(x + cellSize, y + cellSize, x + cellSize - radius, y + cellSize)
          ctx.lineTo(x + radius, y + cellSize)
          ctx.quadraticCurveTo(x, y + cellSize, x, y + cellSize - radius)
          ctx.lineTo(x, y + radius)
          ctx.quadraticCurveTo(x, y, x + radius, y)
          ctx.closePath()
          ctx.fill()
        }

        // Cell border
        ctx.strokeStyle = "#1e293b"
        ctx.lineWidth = 1
        ctx.stroke()
      }
    }

    // Add animated pulse effect to active cells
    let alpha = 0.5
    let increasing = true

    const animate = () => {
      // Update alpha for pulsing effect
      if (increasing) {
        alpha += 0.01
        if (alpha >= 0.8) increasing = false
      } else {
        alpha -= 0.01
        if (alpha <= 0.5) increasing = true
      }

      // Redraw active cells with updated alpha
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          if (data[i][j] === 1) {
            const x = j * cellSize
            const y = i * cellSize
            const isHovered = hoveredCell?.row === i && hoveredCell?.col === j

            if (!isHovered && !highlightMode) {
              // Pulse effect
              const radius = cellSize * 0.2
              ctx.beginPath()
              ctx.moveTo(x + radius, y)
              ctx.lineTo(x + cellSize - radius, y)
              ctx.quadraticCurveTo(x + cellSize, y, x + cellSize, y + radius)
              ctx.lineTo(x + cellSize, y + cellSize - radius)
              ctx.quadraticCurveTo(x + cellSize, y + cellSize, x + cellSize - radius, y + cellSize)
              ctx.lineTo(x + radius, y + cellSize)
              ctx.quadraticCurveTo(x, y + cellSize, x, y + cellSize - radius)
              ctx.lineTo(x, y + radius)
              ctx.quadraticCurveTo(x, y, x + radius, y)
              ctx.closePath()

              const gradient = ctx.createRadialGradient(
                x + cellSize / 2,
                y + cellSize / 2,
                0,
                x + cellSize / 2,
                y + cellSize / 2,
                cellSize / 1.5,
              )

              gradient.addColorStop(0, `rgba(16, 185, 129, ${alpha})`) // Emerald center with alpha
              gradient.addColorStop(1, `rgba(4, 120, 87, ${alpha * 0.7})`) // Darker emerald edge with alpha

              ctx.fillStyle = gradient
              ctx.fill()
            }
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    const animationRef = { current: requestAnimationFrame(animate) }

    // Handle mouse movement for hover effect
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const scaleX = canvas.width / rect.width
      const scaleY = canvas.height / rect.height

      const x = (e.clientX - rect.left) * scaleX
      const y = (e.clientY - rect.top) * scaleY

      const col = Math.floor(x / cellSize)
      const row = Math.floor(y / cellSize)

      if (row >= 0 && row < rows && col >= 0 && col < cols) {
        setHoveredCell({ row, col })
      } else {
        setHoveredCell(null)
      }
    }

    const handleMouseLeave = () => {
      setHoveredCell(null)
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      cancelAnimationFrame(animationRef.current)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [data, hoveredCell, highlightMode])

  return (
    <div className="relative">
      <canvas ref={canvasRef} width={300} height={300} className="w-full aspect-square rounded-md" />
      {hoveredCell && (
        <div className="absolute bottom-2 right-2 bg-slate-800/80 text-xs text-slate-300 px-2 py-1 rounded">
          Cell: [{hoveredCell.row}, {hoveredCell.col}]
        </div>
      )}
    </div>
  )
}
