import AdminSparkChart from '@/components/admin/AdminSparkChart'

export const metadata = { title: 'Admin Dashboard' }

const RECENT_USERS = [
  { name: 'Sarah Chen',       email: 'sarah.chen@gmail.com',  plan: 'Enterprise', status: 'Active',   trades: 487,  joined: 'Jan 8, 2026',  avatar: 'SC', color: '#3b82f6' },
  { name: 'Marcus Johnson',   email: 'm.johnson@outlook.com', plan: 'Enterprise', status: 'Active',   trades: 2341, joined: 'Dec 15, 2025', avatar: 'MJ', color: '#8b5cf6' },
  { name: 'Elena Rodriguez',  email: 'elena.r@yahoo.com',     plan: 'Free',       status: 'Active',   trades: 23,   joined: 'Feb 2, 2026',  avatar: 'ER', color: '#22c55e' },
  { name: 'David Park',       email: 'dpark@company.io',      plan: 'Pro',        status: 'Active',   trades: 892,  joined: 'Nov 20, 2025', avatar: 'DP', color: '#f59e0b' },
  { name: 'Aisha Williams',   email: 'aisha.w@proton.me',     plan: 'Pro',        status: 'Active',   trades: 156,  joined: 'Jan 22, 2026', avatar: 'AW', color: '#ef4444' },
  { name: 'James Mitchell',   email: 'j.mitchell@mail.com',   plan: 'Enterprise', status: 'Past Due', trades: 3102, joined: 'Oct 5, 2025',  avatar: 'JM', color: '#06b6d4' },
]

const ACTIVITY = [
  { time: 'Just now', event: 'New Pro subscription',             user: 'Lisa N.',   color: '#22c55e' },
  { time: '2m ago',   event: 'Strategy deployed',               user: 'Marcus J.', color: '#3b82f6' },
  { time: '5m ago',   event: 'Signal triggered: BUY NVDA',       user: 'System',    color: '#a78bfa' },
  { time: '8m ago',   event: 'Backtest completed',              user: 'David P.',  color: '#22d3ee' },
  { time: '12m ago',  event: 'API key generated',               user: 'Robert K.', color: '#f59e0b' },
  { time: '15m ago',  event: 'Account upgraded to Enterprise',  user: 'Sarah C.',  color: '#22c55e' },
  { time: '18m ago',  event: 'Password reset requested',        user: 'Elena R.',  color: '#52525b' },
  { time: '22m ago',  event: 'AI model scored 8,247 stocks',    user: 'System',    color: '#3b82f6' },
  { time: '25m ago',  event: 'New user registered',             user: 'Tom B.',    color: '#22c55e' },
  { time: '30m ago',  event: 'Webhook delivery failed',         user: 'System',    color: '#ef4444' },
]

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
    return { totalUsers: 148247, proUsers: 3102, enterpriseUsers: 3215, totalTrades: 284520 }
  }
}

function planBadge(plan: string) {
  if (plan === 'Enterprise') return 'adm-badge adm-b-blue'
  if (plan === 'Pro') return 'adm-badge adm-b-violet'
  return 'adm-badge adm-b-gray'
}
function statusBadge(s: string) {
  if (s === 'Active') return 'adm-badge adm-b-green'
  if (s === 'Past Due') return 'adm-badge adm-b-amber'
  return 'adm-badge adm-b-red'
}
function fmtK(n: number) { return n >= 1000 ? (n / 1000).toFixed(1) + 'K' : String(n) }

export default async function AdminDashboardPage() {
  const stats = await getStats()

  const STAT_CARDS = [
    {
      label: 'Total Users', value: stats.totalUsers.toLocaleString(),
      change: '+12.3%', up: true, color: '#3b82f6', bg: 'rgba(59,130,246,0.10)',
      icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></>,
    },
    {
      label: 'Monthly Revenue', value: '$284,520',
      change: '+18.7%', up: true, color: '#22c55e', bg: 'rgba(34,197,94,0.10)',
      icon: <><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></>,
    },
    {
      label: 'Active Strategies', value: '4,892',
      change: '+8.1%', up: true, color: '#a78bfa', bg: 'rgba(167,139,250,0.10)',
      icon: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,
    },
    {
      label: 'AI Signals Today', value: '1,247',
      change: '-2.4%', up: false, color: '#f59e0b', bg: 'rgba(245,158,11,0.10)',
      icon: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>,
    },
  ]

  const PLAN_DIST = [
    { label: 'Enterprise', color: '#3b82f6', pct: '22%', n: '3,215' },
    { label: 'Pro',        color: '#a78bfa', pct: '21%', n: '3,102' },
    { label: 'Free',       color: '#52525b', pct: '57%', n: '8,430' },
  ]

  return (
    <div>
      {/* Stat Grid */}
      <div className="adm-stat-grid">
        {STAT_CARDS.map((s) => (
          <div key={s.label} className="adm-card" style={{ padding: 20, position: 'relative', overflow: 'hidden' }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke={s.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
                {s.icon}
              </svg>
            </div>
            <div style={{ fontSize: 12, color: 'var(--adm-text3)', fontWeight: 500, marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: 11, fontWeight: 600, marginTop: 8, color: s.up ? 'var(--adm-green)' : 'var(--adm-red)' }}>
              {s.up ? '↑' : '↓'} {s.change}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="adm-g23" style={{ marginBottom: 24 }}>
        {/* Revenue chart placeholder */}
        <div className="adm-card">
          <div className="adm-card-header">
            <h3>Revenue Over Time</h3>
            <div style={{ display: 'flex', gap: 6 }}>
              {['7D', '1M', '3M', '1Y'].map((t, i) => (
                <button key={t} className={`adm-btn adm-btn-xs ${i === 1 ? 'adm-btn-primary' : 'adm-btn-ghost'}`}>{t}</button>
              ))}
            </div>
          </div>
          <div className="adm-card-p">
            <AdminSparkChart
              data={[218000,224000,221000,238000,235000,252000,248000,261000,258000,270000,267000,275000,272000,284520]}
              labels={['Feb 1','Feb 3','Feb 5','Feb 7','Feb 9','Feb 11','Feb 13','Feb 15','Feb 17','Feb 19','Feb 21','Feb 23','Feb 25','Feb 28']}
              color="#3b82f6"
              gradientId="rev-grad"
              height={140}
            />
          </div>
        </div>

        {/* Plan distribution */}
        <div className="adm-card">
          <div className="adm-card-header"><h3>Plan Distribution</h3></div>
          <div className="adm-card-p">
            <div style={{ width: 140, height: 140, borderRadius: '50%', margin: '0 auto 16px', background: 'conic-gradient(#3b82f6 0% 22%,#a78bfa 22% 43%,#52525b 43% 100%)', position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 30, borderRadius: '50%', background: 'var(--adm-bg1)' }} />
            </div>
            {PLAN_DIST.map((p) => (
              <div key={p.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="adm-dot" style={{ background: p.color }} />
                  <span style={{ fontSize: 12, color: 'var(--adm-text2)' }}>{p.label}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span className="adm-mono" style={{ color: 'var(--adm-text2)' }}>{p.n}</span>
                  <span className="adm-mono" style={{ fontWeight: 600 }}>{p.pct}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Users + Live Activity */}
      <div className="adm-g32" style={{ marginBottom: 24 }}>
        {/* Recent Users */}
        <div className="adm-card">
          <div className="adm-card-header">
            <h3>Recent Users</h3>
            <a href="/admin/users" className="adm-btn adm-btn-ghost adm-btn-xs">View All</a>
          </div>
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Plan</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Trades</th>
                  <th style={{ textAlign: 'right' }}>Joined</th>
                </tr>
              </thead>
              <tbody>
                {RECENT_USERS.map((u) => (
                  <tr key={u.email}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div className="adm-avatar" style={{ background: u.color, color: '#fff' }}>{u.avatar}</div>
                        <div>
                          <p style={{ fontWeight: 550 }}>{u.name}</p>
                          <p style={{ fontSize: 11, color: 'var(--adm-text3)' }}>{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td><span className={planBadge(u.plan)}>{u.plan}</span></td>
                    <td><span className={statusBadge(u.status)}>{u.status}</span></td>
                    <td style={{ textAlign: 'right' }} className="adm-mono">{fmtK(u.trades)}</td>
                    <td style={{ textAlign: 'right', color: 'var(--adm-text3)' }}>{u.joined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Activity */}
        <div className="adm-card">
          <div className="adm-card-header">
            <h3>Live Activity</h3>
            <span className="adm-badge adm-b-green"><span className="adm-pulse">●</span> Live</span>
          </div>
          <div className="adm-card-p adm-scroll-y" style={{ maxHeight: 340 }}>
            {ACTIVITY.map((a, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                <span className="adm-dot" style={{ background: a.color }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 12, fontWeight: 500 }}>{a.event}</p>
                  <p style={{ fontSize: 11, color: 'var(--adm-text3)' }}>{a.user}</p>
                </div>
                <span style={{ fontSize: 11, color: 'var(--adm-text3)', whiteSpace: 'nowrap' }}>{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
