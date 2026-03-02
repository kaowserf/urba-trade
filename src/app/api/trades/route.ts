import { NextRequest } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { ok, err, unauthorized } from '@/lib/api/response'

const TradeSchema = z.object({
  symbol: z.string().min(1).max(10).toUpperCase(),
  direction: z.enum(['LONG', 'SHORT']),
  type: z.enum(['MANUAL', 'AUTO', 'INTRADAY']).default('MANUAL'),
  quantity: z.number().positive(),
  entryPrice: z.number().positive(),
  stopLoss: z.number().positive().optional(),
  takeProfit: z.number().positive().optional(),
  strategy: z.string().optional(),
  notes: z.string().optional(),
})

export async function GET() {
  const session = await auth()
  if (!session?.user) return unauthorized()

  try {
    const trades = await prisma.trade.findMany({
      where: { userId: (session.user as { id?: string }).id! },
      orderBy: { openedAt: 'desc' },
      take: 100,
    })
    return ok(trades)
  } catch (e) {
    console.error('[trades GET]', e)
    return err('Server error', 500)
  }
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return unauthorized()

  try {
    const body = await req.json()
    const parsed = TradeSchema.safeParse(body)
    if (!parsed.success) return err(parsed.error.issues[0].message, 422)

    const trade = await prisma.trade.create({
      data: { ...parsed.data, userId: (session.user as { id?: string }).id! },
    })

    // Update or create position
    const existing = await prisma.position.findFirst({
      where: { userId: (session.user as { id?: string }).id!, symbol: parsed.data.symbol },
    })

    if (existing) {
      const totalCost = existing.avgCost * existing.quantity + parsed.data.entryPrice * parsed.data.quantity
      const totalQty = existing.quantity + parsed.data.quantity
      await prisma.position.update({
        where: { id: existing.id },
        data: { avgCost: totalCost / totalQty, quantity: totalQty, currentPrice: parsed.data.entryPrice },
      })
    } else {
      await prisma.position.create({
        data: {
          userId: (session.user as { id?: string }).id!,
          symbol: parsed.data.symbol,
          quantity: parsed.data.quantity,
          avgCost: parsed.data.entryPrice,
          currentPrice: parsed.data.entryPrice,
        },
      })
    }

    return ok(trade, 201)
  } catch (e) {
    console.error('[trades POST]', e)
    return err('Server error', 500)
  }
}
