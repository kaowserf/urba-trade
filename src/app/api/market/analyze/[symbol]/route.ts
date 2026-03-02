import { NextRequest } from 'next/server'
import { ok, err } from '@/lib/api/response'
import { getSymbolProfile } from '@/lib/algorithms/stockUniverse'
import { generateHistoricalCandles, generateFundamentals } from '@/lib/algorithms/dataSimulator'
import { generateSentimentScore } from '@/lib/algorithms/sentimentEngine'
import { computeTA } from '@/lib/algorithms/taEngine'
import { computeFA } from '@/lib/algorithms/faEngine'
import { computeComposite } from '@/lib/algorithms/compositeEngine'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ symbol: string }> }
) {
  try {
    const { symbol } = await params
    const sym = symbol.toUpperCase()
    const profile = getSymbolProfile(sym)
    if (!profile) return err(`Symbol ${sym} not found`, 404)

    const candles = generateHistoricalCandles(profile, 200)
    const fundamentals = generateFundamentals(profile)
    const sentiment = generateSentimentScore(profile)
    const ta = computeTA(candles)
    const fa = computeFA(fundamentals)

    const last = candles[candles.length - 1]
    const prev = candles[candles.length - 2]
    const change = last.close - prev.close
    const changePercent = (change / prev.close) * 100

    const composite = computeComposite(
      sym, profile.name, last.close, change, changePercent,
      profile.sector, ta, fa, sentiment, profile.volatility
    )

    return ok({
      data: composite,
      candles: candles.slice(-100),  // send last 100 candles for charting
      fundamentals,
      sma20: ta.sma20Series.slice(-100),
      sma50: ta.sma50Series.slice(-100),
    })
  } catch (e) {
    console.error('[analyze]', e)
    return err('Analysis failed', 500)
  }
}
