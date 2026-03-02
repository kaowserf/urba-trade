'use client'

import { useState, useRef, useCallback } from 'react'

interface Props {
  data: number[]
  labels?: string[]
  color?: string
  height?: number
  gradientId?: string
  formatValue?: (v: number) => string
}

export default function AdminSparkChart({
  data,
  labels,
  color = '#3b82f6',
  height = 140,
  gradientId,
  formatValue,
}: Props) {
  const [hover, setHover] = useState<{ x: number; y: number; value: number; label: string; idx: number } | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  const W = 540
  const H = height
  const PAD_T = 12
  const PAD_B = 8

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1

  function px(i: number) { return (i / (data.length - 1)) * W }
  function py(v: number) { return PAD_T + ((1 - (v - min) / range) * (H - PAD_T - PAD_B)) }

  const pts = data.map((v, i) => `${px(i)},${py(v)}`).join(' ')
  const poly = `${pts} ${W},${H} 0,${H}`
  const gid = gradientId ?? `spark-grad-${color.replace('#', '')}`

  const fmt = formatValue ?? ((v: number) => {
    if (v >= 1_000_000) return '$' + (v / 1_000_000).toFixed(1) + 'M'
    if (v >= 1_000)     return '$' + (v / 1_000).toFixed(1) + 'K'
    return v % 1 === 0 ? String(v) : v.toFixed(2)
  })

  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current
    if (!svg) return
    const rect = svg.getBoundingClientRect()
    const relX = ((e.clientX - rect.left) / rect.width) * W
    const idx = Math.min(data.length - 1, Math.max(0, Math.round((relX / W) * (data.length - 1))))
    const x = px(idx)
    const y = py(data[idx])
    const label = labels?.[idx] ?? `Point ${idx + 1}`
    setHover({ x, y, value: data[idx], label, idx })
  }, [data, labels]) // eslint-disable-line

  return (
    <svg
      ref={svgRef}
      width="100%"
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      style={{ overflow: 'visible', cursor: 'crosshair', display: 'block' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHover(null)}
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
        <filter id={`${gid}-glow`}>
          <feGaussianBlur stdDeviation="2.5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Area fill */}
      <polygon points={poly} fill={`url(#${gid})`}/>

      {/* Line */}
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Hover layer */}
      {hover && (
        <>
          {/* Vertical crosshair */}
          <line
            x1={hover.x} y1={PAD_T}
            x2={hover.x} y2={H}
            stroke={color}
            strokeWidth="1"
            strokeDasharray="3 3"
            opacity="0.6"
          />

          {/* Horizontal guide */}
          <line
            x1={0} y1={hover.y}
            x2={W} y2={hover.y}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          />

          {/* Glow dot (outer ring) */}
          <circle
            cx={hover.x} cy={hover.y}
            r="8"
            fill={color}
            opacity="0.15"
          />

          {/* Main dot */}
          <circle
            cx={hover.x} cy={hover.y}
            r="4"
            fill={color}
            stroke="var(--adm-bg1, #0f0f12)"
            strokeWidth="2"
            filter={`url(#${gid}-glow)`}
          />

          {/* Tooltip box — flip sides if near right edge */}
          <g transform={`translate(${hover.x > W * 0.72 ? hover.x - 130 : hover.x + 12},${Math.max(PAD_T, hover.y - 36)})`}>
            <rect
              x="0" y="0" width="118" height="44"
              rx="7" ry="7"
              fill="var(--adm-bg2, #18181b)"
              stroke={color}
              strokeOpacity="0.35"
              strokeWidth="1"
            />
            {/* Label */}
            <text
              x="10" y="15"
              fill="var(--adm-text3, #52525b)"
              fontSize="10"
              fontFamily="system-ui, sans-serif"
              style={{ pointerEvents: 'none' }}
            >
              {hover.label}
            </text>
            {/* Value */}
            <text
              x="10" y="33"
              fill="var(--adm-text, #fafafa)"
              fontSize="14"
              fontWeight="700"
              fontFamily="'JetBrains Mono', monospace"
              style={{ pointerEvents: 'none' }}
            >
              {fmt(hover.value)}
            </text>
          </g>
        </>
      )}
    </svg>
  )
}
