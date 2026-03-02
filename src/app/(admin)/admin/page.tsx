export const metadata = { title: 'Admin Dashboard' }

async function getStats() {
  try {
    const { prisma } = await import('@/lib/prisma')
    const [totalUsers, proUsers, enterpriseUsers, totalTrades] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { tier: 'PRO' } }),
      prisma.user.count({ where: { tier: 'ENTERPRISE' } }),
      prisma.trade.count(),
    ])
    return { totalUsers, proUsers, enterpriseUsers, totalTrades }
  } catch {
    return { totalUsers: 0, proUsers: 0, enterpriseUsers: 0, totalTrades: 0 }
  }
}

export default async function AdminDashboardPage() {
  const stats = await getStats()

  const cards = [
    { label: 'Total Users', value: stats.totalUsers, color: '#00d4ff' },
    { label: 'PRO Subscribers', value: stats.proUsers, color: '#00ff88' },
    { label: 'Enterprise', value: stats.enterpriseUsers, color: '#a855f7' },
    { label: 'Total Trades', value: stats.totalTrades, color: '#facc15' },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#f1f5f9]">Admin Dashboard</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="card p-4">
            <div className="text-xs text-[#94a3b8] mb-1">{c.label}</div>
            <div className="text-2xl font-bold" style={{ color: c.color }}>{c.value.toLocaleString()}</div>
          </div>
        ))}
      </div>
      <div className="card p-4">
        <h2 className="text-sm font-semibold text-[#94a3b8] mb-3">System Status</h2>
        <div className="flex items-center gap-2">
          <div className="live-dot" />
          <span className="text-sm text-[#4ade80]">All systems operational</span>
        </div>
      </div>
    </div>
  )
}
