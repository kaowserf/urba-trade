import type { StockProfile } from '@/types/market'
import { clamp } from '@/lib/utils'

function mulberry32(seed: number) {
  return function () {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed)
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t
    return ((t ^ t >>> 14) >>> 0) / 4294967296
  }
}

function makeSeed(symbol: string): number {
  const dateStr = new Date().toDateString() + symbol + 'sent'
  let hash = 0
  for (let i = 0; i < dateStr.length; i++) {
    hash = (Math.imul(31, hash) + dateStr.charCodeAt(i)) | 0
  }
  return Math.abs(hash) || 1
}

export function generateSentimentScore(profile: StockProfile): number {
  const rand = mulberry32(makeSeed(profile.symbol))
  // Base sentiment influenced by sector and volatility
  const sectorBias: Record<string, number> = {
    'Technology': 65,
    'Healthcare': 58,
    'Financial Services': 55,
    'Consumer Cyclical': 52,
    'Consumer Defensive': 56,
    'Energy': 50,
    'Industrials': 53,
    'Communication Services': 54,
    'Basic Materials': 48,
    'Real Estate': 50,
    'Utilities': 52,
  }
  const base = sectorBias[profile.sector] ?? 55
  const noise = (rand() - 0.5) * 40
  return clamp(base + noise, 10, 95)
}
