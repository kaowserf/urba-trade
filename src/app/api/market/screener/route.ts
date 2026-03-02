import { NextResponse } from 'next/server'
import { STOCK_UNIVERSE } from '@/lib/algorithms/stockUniverse'
import { generateHistoricalCandles, generateFundamentals } from '@/lib/algorithms/dataSimulator'
import { generateSentimentScore } from '@/lib/algorithms/sentimentEngine'
import { computeTA } from '@/lib/algorithms/taEngine'
import { computeFA } from '@/lib/algorithms/faEngine'
import { computeComposite } from '@/lib/algorithms/compositeEngine'

export const revalidate = 300 // Cache for 5 minutes

export async function GET() {
  const results = STOCK_UNIVERSE.map((profile) => {
    try {
      const candles = generateHistoricalCandles(profile, 200)
      const fundamentals = generateFundamentals(profile)
      const sentiment = generateSentimentScore(profile)
      const ta = computeTA(candles)
      const fa = computeFA(fundamentals)
      const last = candles[candles.length - 1]
      const prev = candles[candles.length - 2]
      const change = last.close - prev.close
      const changePercent = (change / prev.close) * 100
      return computeComposite(
        profile.symbol, profile.name, last.close, change, changePercent,
        profile.sector, ta, fa, sentiment, profile.volatility
      )
    } catch {
      return null
    }
  }).filter(Boolean)

  return NextResponse.json({ success: true, data: results })
}
