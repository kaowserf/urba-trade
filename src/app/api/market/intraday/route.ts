import { NextRequest } from 'next/server'
import { z } from 'zod'
import { ok, err } from '@/lib/api/response'
import { STOCK_UNIVERSE } from '@/lib/algorithms/stockUniverse'
import { generateHistoricalCandles } from '@/lib/algorithms/dataSimulator'
import { generateSetups } from '@/lib/algorithms/intradayEngine'
import type { IntradayCandidate } from '@/lib/algorithms/intradayEngine'

const IntradaySchema = z.object({
  mode: z.enum(['standard', 'aggressive']).default('standard'),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = IntradaySchema.safeParse(body)
    if (!parsed.success) return err('Invalid mode', 422)

    const { mode } = parsed.data
    const setups = []

    for (const profile of STOCK_UNIVERSE) {
      try {
        const candles = generateHistoricalCandles(profile, 200)
        const last = candles[candles.length - 1]
        const prev = candles[candles.length - 2]
        const avgVolume = candles.slice(-20).reduce((s, c) => s + c.volume, 0) / 20

        // Simulate pre-market gap: last 5 sessions average daily range
        const avgRange = candles.slice(-5).reduce((s, c) => s + (c.high - c.low), 0) / 5
        const gapFactor = (Math.random() - 0.4) * avgRange
        const open = prev.close + gapFactor

        const candidate: IntradayCandidate = {
          symbol: profile.symbol,
          price: last.close,
          open,
          previousClose: prev.close,
          volume: last.volume,
          avgVolume,
          floatShares: profile.floatSharesM * 1_000_000,
          candles,
        }

        const setup = generateSetups(candidate, mode)
        if (setup) {
          setups.push({ ...setup, company: profile.name })
        }
      } catch {
        // skip
      }
    }

    setups.sort((a, b) => b.confidence - a.confidence)
    const maxPositions = mode === 'standard' ? 5 : 3
    return ok(setups.slice(0, maxPositions))
  } catch (e) {
    console.error('[intraday]', e)
    return err('Intraday scan failed', 500)
  }
}
