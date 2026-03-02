import type { CompositeScore, SignalType, RiskLevel, TAResult, FAResult } from '@/types/market'
import { clamp } from '@/lib/utils'

function scoreToSignal(score: number): SignalType {
  if (score >= 80) return 'STRONG_BUY'
  if (score >= 65) return 'BUY'
  if (score >= 45) return 'HOLD'
  if (score >= 30) return 'SELL'
  return 'STRONG_SELL'
}

function scoreToRisk(score: number, volatility?: number): RiskLevel {
  const v = volatility ?? 0.02
  if (score >= 65 && v < 0.03) return 'LOW'
  if (score >= 45 && v < 0.05) return 'MEDIUM'
  return 'HIGH'
}

function generateExplanation(signal: SignalType, ta: TAResult, fa: FAResult, sentiment: number): string {
  const { indicators: ti } = ta
  const { indicators: fi } = fa

  const parts: string[] = []

  if (ti.rsi > 60 && ti.macdHist > 0) parts.push('bullish technical momentum')
  else if (ti.rsi < 40 && ti.macdHist < 0) parts.push('bearish technical pressure')
  else parts.push('neutral technical setup')

  if (fi.revenueGrowth > 0.15) parts.push(`strong revenue growth (${(fi.revenueGrowth * 100).toFixed(0)}% YoY)`)
  if (fi.profitMargin > 0.2) parts.push(`high profit margins (${(fi.profitMargin * 100).toFixed(0)}%)`)
  if (fi.roe > 20) parts.push(`high ROE (${fi.roe.toFixed(0)}%)`)
  if (fi.debtEquity > 2) parts.push('elevated debt levels')

  if (sentiment > 70) parts.push('positive market sentiment')
  else if (sentiment < 35) parts.push('negative sentiment headwinds')

  if (ti.volumeRatio > 1.5) parts.push(`elevated volume (${ti.volumeRatio.toFixed(1)}x average)`)

  return signal === 'STRONG_BUY' || signal === 'BUY'
    ? `Bullish: ${parts.slice(0, 3).join(', ')}.`
    : signal === 'STRONG_SELL' || signal === 'SELL'
    ? `Bearish: ${parts.slice(0, 3).join(', ')}.`
    : `Neutral: ${parts.slice(0, 3).join(', ')}.`
}

export function computeComposite(
  symbol: string,
  name: string,
  price: number,
  change: number,
  changePercent: number,
  sector: string,
  ta: TAResult,
  fa: FAResult,
  sentiment: number,
  volatility?: number
): CompositeScore {
  // Weighted composite: TA 45%, FA 40%, Sentiment 15%
  const aiScore = clamp(
    ta.taScore * 0.45 + fa.faScore * 0.40 + sentiment * 0.15,
    0,
    100
  )

  const signal = scoreToSignal(aiScore)
  const riskLevel = scoreToRisk(aiScore, volatility)
  const confidence = clamp(Math.abs(aiScore - 50) * 2, 0, 100)

  return {
    symbol,
    name,
    sector,
    price,
    change,
    changePercent,
    aiScore,
    taScore: ta.taScore,
    faScore: fa.faScore,
    sentimentScore: sentiment,
    signal,
    confidence,
    riskLevel,
    taIndicators: ta.indicators,
    faIndicators: fa.indicators,
    explanation: generateExplanation(signal, ta, fa, sentiment),
  }
}
