export const metadata = { title: 'System Health' }
async function getHealth() {
  try {
    const { prisma } = await import('@/lib/prisma')
    const start = Date.now()
    await prisma.$queryRaw`SELECT 1`
    return { dbLatency: Date.now() - start, uptime: process.uptime() }
  } catch { return { dbLatency: -1, uptime: 0 } }
}
export default async function HealthPage() {
  const health = await getHealth()
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-[#f1f5f9]">System Health</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="card p-4">
          <div className="text-xs text-[#94a3b8] mb-1">DB Latency</div>
          <div className="text-2xl font-bold text-[#00ff88]">{health.dbLatency >= 0 ? `${health.dbLatency}ms` : 'Error'}</div>
        </div>
        <div className="card p-4">
          <div className="text-xs text-[#94a3b8] mb-1">Uptime</div>
          <div className="text-2xl font-bold text-[#00d4ff]">{Math.round(health.uptime / 60)}m</div>
        </div>
        <div className="card p-4">
          <div className="text-xs text-[#94a3b8] mb-1">Status</div>
          <div className="text-2xl font-bold text-[#4ade80]">OK</div>
        </div>
      </div>
    </div>
  )
}
