import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { ok, err, unauthorized } from '@/lib/api/response'
import { getSymbolProfile } from '@/lib/algorithms/stockUniverse'
import { generateHistoricalCandles } from '@/lib/algorithms/dataSimulator'
import type { PortfolioSummary, PositionWithPnl } from '@/types/trading'

export async function GET() {
  const session = await auth()
  if (!session?.user) return unauthorized()

  try {
    const [positions, trades] = await Promise.all([
      prisma.position.findMany({ where: { userId: session.user.id } }),
      prisma.trade.findMany({
        where: { userId: session.user.id, status: 'CLOSED', closedAt: { gte: new Date(Date.now() - 86400000) } },
      }),
    ])

    // Update current prices from simulator
    const enriched: PositionWithPnl[] = positions.map((pos) => {
      const profile = getSymbolProfile(pos.symbol)
      let currentPrice = pos.currentPrice
      if (profile) {
        const candles = generateHistoricalCandles(profile, 2)
        currentPrice = candles[candles.length - 1].close
      }
      const marketValue = currentPrice * pos.quantity
      const unrealizedPnl = (currentPrice - pos.avgCost) * pos.quantity
      const unrealizedPnlPercent = pos.avgCost > 0 ? (unrealizedPnl / (pos.avgCost * pos.quantity)) * 100 : 0
      return { ...pos, currentPrice, marketValue, unrealizedPnl, unrealizedPnlPercent }
    })

    const totalValue = enriched.reduce((s, p) => s + p.marketValue, 0)
    const totalCost = enriched.reduce((s, p) => s + p.avgCost * p.quantity, 0)
    const unrealizedPnl = totalValue - totalCost
    const unrealizedPnlPercent = totalCost > 0 ? (unrealizedPnl / totalCost) * 100 : 0
    const todayPnl = trades.reduce((s, t) => s + (t.pnl ?? 0), 0)

    const openTradeCount = await prisma.trade.count({
      where: { userId: session.user.id, status: 'OPEN' },
    })

    const summary: PortfolioSummary = {
      totalValue,
      totalCost,
      unrealizedPnl,
      unrealizedPnlPercent,
      todayPnl,
      positions: enriched,
      openTradeCount,
    }

    return ok(summary)
  } catch (e) {
    console.error('[positions]', e)
    return err('Server error', 500)
  }
}
