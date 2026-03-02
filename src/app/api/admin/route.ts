import { NextRequest } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { ok, err, unauthorized, forbidden } from '@/lib/api/response'
import type { AuthUser } from '@/types/auth'

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return unauthorized()
  if ((session.user as AuthUser).role !== 'ADMIN') return forbidden()

  const action = req.nextUrl.searchParams.get('action')

  try {
    switch (action) {
      case 'stats': {
        const [totalUsers, proUsers, enterpriseUsers, totalTrades, totalRevenue] = await Promise.all([
          prisma.user.count(),
          prisma.user.count({ where: { tier: 'PRO' } }),
          prisma.user.count({ where: { tier: 'ENTERPRISE' } }),
          prisma.trade.count(),
          prisma.invoice.aggregate({ _sum: { amount: true } }),
        ])
        const newUsersToday = await prisma.user.count({
          where: { createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } },
        })
        return ok({ totalUsers, proUsers, enterpriseUsers, totalTrades, newUsersToday, totalRevenue: (totalRevenue._sum.amount ?? 0) / 100 })
      }

      case 'users': {
        const page = parseInt(req.nextUrl.searchParams.get('page') ?? '1')
        const search = req.nextUrl.searchParams.get('search') ?? ''
        const pageSize = 25
        const [users, total] = await Promise.all([
          prisma.user.findMany({
            where: search ? { OR: [{ email: { contains: search, mode: 'insensitive' } }, { name: { contains: search, mode: 'insensitive' } }] } : {},
            orderBy: { createdAt: 'desc' },
            skip: (page - 1) * pageSize,
            take: pageSize,
            select: { id: true, email: true, name: true, role: true, tier: true, createdAt: true, _count: { select: { trades: true } } },
          }),
          prisma.user.count(),
        ])
        return ok({ users, total, page, pageSize })
      }

      case 'audit': {
        const logs = await prisma.auditLog.findMany({
          orderBy: { createdAt: 'desc' },
          take: 100,
          include: { user: { select: { email: true } } },
        })
        return ok(logs)
      }

      case 'health': {
        const dbStart = Date.now()
        await prisma.$queryRaw`SELECT 1`
        const dbLatency = Date.now() - dbStart
        return ok({ status: 'healthy', dbLatency, uptime: process.uptime(), timestamp: new Date().toISOString() })
      }

      default:
        return err('Unknown action', 400)
    }
  } catch (e) {
    console.error('[admin]', e)
    return err('Server error', 500)
  }
}
