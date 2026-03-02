import { NextRequest } from 'next/server'
import { z } from 'zod'
import { ok, err } from '@/lib/api/response'
import { getSymbolProfile } from '@/lib/algorithms/stockUniverse'
import { generateHistoricalCandles, generateFundamentals } from '@/lib/algorithms/dataSimulator'
import { generateSentimentScore } from '@/lib/algorithms/sentimentEngine'
import { computeTA } from '@/lib/algorithms/taEngine'
import { computeFA } from '@/lib/algorithms/faEngine'
import { computeComposite } from '@/lib/algorithms/compositeEngine'

const ScanSchema = z.object({
  symbols: z.array(z.string().min(1).max(5)).min(1).max(25),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = ScanSchema.safeParse(body)
    if (!parsed.success) return err(parsed.error.issues[0].message, 422)

    const results = []
    for (const rawSymbol of parsed.data.symbols) {
      const sym = rawSymbol.toUpperCase().trim()
      const profile = getSymbolProfile(sym)
      if (!profile) continue

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

        const composite = computeComposite(
          sym, profile.name, last.close, change, changePercent,
          profile.sector, ta, fa, sentiment, profile.volatility
        )
        results.push(composite)
      } catch {
        // skip failed symbols
      }
    }

    results.sort((a, b) => b.aiScore - a.aiScore)
    return ok(results)
  } catch (e) {
    console.error('[scan]', e)
    return err('Scan failed', 500)
  }
}
