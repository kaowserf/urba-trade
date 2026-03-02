import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { SignalType, RiskLevel } from '@/types/market'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number, decimals = 2): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

export function formatNumber(value: number, decimals = 2): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

export function formatCompact(value: number): string {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value)
}

export function formatPercent(value: number, decimals = 2): string {
  const sign = value >= 0 ? '+' : ''
  return `${sign}${value.toFixed(decimals)}%`
}

export function scoreToColor(score: number): string {
  if (score >= 80) return '#00ff88'
  if (score >= 65) return '#4ade80'
  if (score >= 45) return '#facc15'
  if (score >= 30) return '#fb923c'
  return '#ff4444'
}

export function signalToColor(signal: SignalType): string {
  switch (signal) {
    case 'STRONG_BUY': return '#00ff88'
    case 'BUY': return '#4ade80'
    case 'HOLD': return '#facc15'
    case 'SELL': return '#fb923c'
    case 'STRONG_SELL': return '#ff4444'
  }
}

export function signalToLabel(signal: SignalType): string {
  switch (signal) {
    case 'STRONG_BUY': return 'STRONG BUY'
    case 'BUY': return 'BUY'
    case 'HOLD': return 'HOLD'
    case 'SELL': return 'SELL'
    case 'STRONG_SELL': return 'STRONG SELL'
  }
}

export function riskToColor(risk: RiskLevel): string {
  switch (risk) {
    case 'LOW': return '#4ade80'
    case 'MEDIUM': return '#facc15'
    case 'HIGH': return '#ff4444'
  }
}

export function pnlColor(value: number): string {
  return value >= 0 ? '#4ade80' : '#ff4444'
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength - 3) + '...'
}
