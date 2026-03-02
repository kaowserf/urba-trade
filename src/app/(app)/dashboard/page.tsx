import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { PortfolioCard } from '@/components/trading/PortfolioCard'
import { AutoTradeLog } from '@/components/trading/AutoTradeLog'
import Link from 'next/link'

export const metadata = { title: 'Dashboard' }

export default async function DashboardPage() {
  const session = await auth()
  const userId = (session!.user as { id?: string }).id ?? ''

  const [positions, recentTrades] = await Promise.all([
    prisma.position.findMany({ where: { userId }, orderBy: { openedAt: 'desc' } }),
    prisma.trade.findMany({ where: { userId }, orderBy: { openedAt: 'desc' }, take: 10 }),
  ])

  const totalValue = positions.reduce((s, p) => s + p.currentPrice * p.quantity, 0)
  const totalCost = positions.reduce((s, p) => s + p.avgCost * p.quantity, 0)
  const unrealizedPnl = totalValue - totalCost

  const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0)
  const todayPnl = recentTrades
    .filter((t) => t.closedAt && new Date(t.closedAt) >= todayStart)
    .reduce((s, t) => s + (t.pnl ?? 0), 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#f1f5f9]">Dashboard</h1>
        <span className="text-sm text-[#475569]">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <PortfolioCard label="Portfolio Value" value={totalValue || 0} type="currency" />
        <PortfolioCard label="Unrealized P&L" value={unrealizedPnl} type="pnl" />
        <PortfolioCard label="Today's P&L" value={todayPnl} type="pnl" />
        <PortfolioCard label="Open Positions" value={positions.length} type="count" />
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { href: '/picker', label: 'AI Stock Picker', color: '#00ff88' },
          { href: '/scanner', label: 'Run AI Scan', color: '#00d4ff' },
          { href: '/intraday', label: 'Intraday Scanner', color: '#a855f7' },
          { href: '/screener', label: 'Stock Screener', color: '#facc15' },
        ].map((action) => (
          <Link key={action.href} href={action.href} className="card card-hover p-4 text-center text-sm font-medium" style={{ borderColor: `${action.color}30`, color: action.color }}>
            {action.label}
          </Link>
        ))}
      </div>

      {/* Recent Trades */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-4">
          <h2 className="text-sm font-semibold text-[#94a3b8] mb-4 uppercase tracking-wider">Recent Trades</h2>
          <AutoTradeLog trades={recentTrades as any[]} />
        </div>
        <div className="card p-4">
          <h2 className="text-sm font-semibold text-[#94a3b8] mb-4 uppercase tracking-wider">Getting Started</h2>
          <div className="space-y-3 text-sm text-[#94a3b8]">
            <p>1. Use <Link href="/picker" className="text-[#00d4ff] hover:underline">AI Stock Picker</Link> to analyze individual stocks</p>
            <p>2. Run the <Link href="/scanner" className="text-[#00d4ff] hover:underline">AI Scanner</Link> on a watchlist of symbols</p>
            <p>3. Check <Link href="/intraday" className="text-[#00d4ff] hover:underline">Intraday Scanner</Link> for day-trading setups</p>
            <p>4. Use the <Link href="/screener" className="text-[#00d4ff] hover:underline">Screener</Link> to filter 150+ stocks by AI score</p>
            <p>5. Configure API keys in <Link href="/settings" className="text-[#00d4ff] hover:underline">Settings</Link> for live data</p>
          </div>
        </div>
      </div>
    </div>
  )
}
