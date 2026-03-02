'use client'
import { useEffect, useRef, useState } from 'react'

function parse(value: string): { num: number; suffix: string } {
  const match = value.match(/^([\d,.]+)(.*)$/)
  if (!match) return { num: 0, suffix: value }
  return { num: parseFloat(match[1].replace(/,/g, '')), suffix: match[2] }
}

function format(num: number, original: string): string {
  // Preserve decimal if original has it
  if (original.includes('.')) return num.toFixed(1)
  // Add comma for thousands
  if (num >= 1000) return num.toLocaleString()
  return String(Math.floor(num))
}

export function CountUp({ value, className = '' }: { value: string; className?: string }) {
  const { num, suffix } = parse(value)
  const [display, setDisplay] = useState('0')
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 1600
          const startTime = performance.now()

          const tick = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            const current = eased * num
            setDisplay(format(current, value))
            if (progress < 1) requestAnimationFrame(tick)
          }

          requestAnimationFrame(tick)
          observer.unobserve(el)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [num, value])

  return (
    <span ref={ref} className={className}>
      {display}{suffix}
    </span>
  )
}
