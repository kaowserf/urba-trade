import AdminSparkChart from '@/components/admin/AdminSparkChart'

export const metadata = { title: 'Subscriptions & Billing — Admin' }

const KPIs = [
  { l: 'Active Subscribers',        v: '1,247',  ch: '+38 this week',           up: true,  c: '#3b82f6' },
  { l: 'Monthly Recurring Revenue',  v: '$48,320', ch: '+12.4% vs last month',   up: true,  c: '#22c55e' },
  { l: 'Churn Rate',                 v: '2.1%',   ch: '-0.3% from last month',   up: true,  c: '#22c55e' },
  { l: 'Avg Revenue Per User',       v: '$38.75', ch: 'ARPU this month',         up: true,  c: '#a78bfa' },
]

const PLAN_REV = [
  { p: 'Pro ($29/mo)',        subs: '892', mrr: '$25,868', arpu: '$29.00', growth: '+12.4%', c: '#a78bfa' },
  { p: 'Enterprise ($99/mo)', subs: '355', mrr: '$35,145', arpu: '$99.00', growth: '+8.7%',  c: '#3b82f6' },
]

const INVOICES = [
  { id: 'in_1Qx8a2eZ', email: 'sarah.chen@email.com',     a: '$99.00', st: 'paid',    dt: 'Feb 8, 2026' },
  { id: 'in_1Qw7b3fA', email: 'david.park@email.com',     a: '$29.00', st: 'paid',    dt: 'Feb 7, 2026' },
  { id: 'in_1Qv6c4gB', email: 'lisa.nguyen@email.com',    a: '$29.00', st: 'paid',    dt: 'Feb 6, 2026' },
  { id: 'in_1Qu5d5hC', email: 'james.mitchell@email.com', a: '$99.00', st: 'pending', dt: 'Feb 5, 2026' },
  { id: 'in_1Qt4e6iD', email: 'marcus.j@email.com',       a: '$99.00', st: 'paid',    dt: 'Feb 4, 2026' },
  { id: 'in_1Qs3f7jE', email: 'aisha.w@email.com',        a: '$29.00', st: 'paid',    dt: 'Feb 3, 2026' },
  { id: 'in_1Qr2g8kF', email: 'robert.kim@email.com',     a: '$99.00', st: 'paid',    dt: 'Feb 1, 2026' },
  { id: 'in_1Qq1h9lG', email: 'priya.s@email.com',        a: '$29.00', st: 'failed',  dt: 'Jan 12, 2026' },
]

const WEBHOOKS = [
  { t: '14:32', ev: 'invoice.paid',                   data: 'sarah.chen@email.com — $99.00',      st: 'processed' },
  { t: '14:30', ev: 'customer.subscription.updated',  data: 'david.park@email.com → Pro',          st: 'received'  },
  { t: '14:28', ev: 'invoice.payment_failed',         data: 'james.mitchell@email.com — $99.00',   st: 'error'     },
  { t: '14:25', ev: 'invoice.paid',                   data: 'lisa.nguyen@email.com — $29.00',      st: 'processed' },
  { t: '14:22', ev: 'customer.subscription.updated',  data: 'marcus.j@email.com renewed',          st: 'received'  },
  { t: '14:18', ev: 'invoice.paid',                   data: 'robert.kim@email.com — $99.00',       st: 'processed' },
  { t: '14:15', ev: 'customer.subscription.deleted',  data: 'priya.s@email.com canceled',          st: 'received'  },
  { t: '14:08', ev: 'checkout.session.completed',     data: 'tom.baker@email.com → Pro trial',     st: 'processed' },
  { t: '14:02', ev: 'customer.created',               data: 'new_user@email.com',                  st: 'received'  },
  { t: '13:58', ev: 'invoice.payment_action_required',data: 'anna.k@email.com — $99.00',           st: 'error'     },
]

export default function BillingPage() {
  return (
    <div>
      {/* Stripe Connection Banner */}
      <div className="adm-card adm-card-p" style={{ marginBottom: 24, borderColor: 'rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--adm-text3)" strokeWidth="2" strokeLinecap="round">
              <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Connect Stripe</h3>
            <p style={{ fontSize: 12, color: 'var(--adm-text3)', marginBottom: 16 }}>Enter your Stripe credentials to enable live subscription management, invoice generation, and payment processing.</p>
            <div className="adm-g2" style={{ gap: 12, marginBottom: 12 }}>
              <div>
                <label style={{ fontSize: 11, color: 'var(--adm-text3)', display: 'block', marginBottom: 5 }}>Secret Key</label>
                <input className="adm-input" type="password" placeholder="sk_live_... or sk_test_..."/>
              </div>
              <div>
                <label style={{ fontSize: 11, color: 'var(--adm-text3)', display: 'block', marginBottom: 5 }}>Webhook Secret</label>
                <input className="adm-input" type="password" placeholder="whsec_..."/>
              </div>
            </div>
            <div className="adm-g2" style={{ gap: 12, marginBottom: 16 }}>
              <div>
                <label style={{ fontSize: 11, color: 'var(--adm-text3)', display: 'block', marginBottom: 5 }}>Pro Price ID</label>
                <input className="adm-input" placeholder="price_... ($29/mo)"/>
              </div>
              <div>
                <label style={{ fontSize: 11, color: 'var(--adm-text3)', display: 'block', marginBottom: 5 }}>Enterprise Price ID</label>
                <input className="adm-input" placeholder="price_... ($99/mo)"/>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="adm-btn adm-btn-primary adm-btn-sm">Save &amp; Connect</button>
              <button className="adm-btn adm-btn-ghost adm-btn-sm">Test Connection</button>
              <button className="adm-btn adm-btn-ghost adm-btn-sm" style={{ color: 'var(--adm-red)' }}>Disconnect</button>
            </div>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="adm-stat-grid" style={{ marginBottom: 24 }}>
        {KPIs.map((s, i) => (
          <div key={i} className="adm-card adm-card-p">
            <p style={{ fontSize: 12, color: 'var(--adm-text3)', marginBottom: 10 }}>{s.l}</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 800 }}>{s.v}</p>
            <p style={{ fontSize: 11, color: s.c, marginTop: 6 }}>{s.up ? '↑' : '↓'} {s.ch}</p>
          </div>
        ))}
      </div>

      {/* MRR Growth Chart */}
      <div className="adm-card" style={{ marginBottom: 24 }}>
        <div className="adm-card-header">
          <h3>MRR Growth (30-Day)</h3>
          <div style={{ display: 'flex', gap: 6 }}>
            {['1M', '3M', '6M', '1Y'].map((t, i) => (
              <button key={t} className={`adm-btn adm-btn-xs ${i === 0 ? 'adm-btn-primary' : 'adm-btn-ghost'}`}>{t}</button>
            ))}
          </div>
        </div>
        <div className="adm-card-p">
          <AdminSparkChart
            data={[34200,35800,35100,37400,36900,39200,38700,41500,40800,43200,42600,45100,44800,48320]}
            labels={['Feb 1','Feb 3','Feb 5','Feb 7','Feb 9','Feb 11','Feb 13','Feb 15','Feb 17','Feb 19','Feb 21','Feb 23','Feb 25','Feb 28']}
            color="#22c55e"
            gradientId="mrr-billing-g"
            height={140}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
            {[{ l: 'MRR', v: '$48.3K' }, { l: 'ARR', v: '$579K' }, { l: 'ARPU', v: '$38.75' }, { l: 'LTV', v: '$890' }].map(m => (
              <div key={m.l}><p style={{ fontSize: 11, color: 'var(--adm-text3)' }}>{m.l}</p><p style={{ fontSize: 16, fontWeight: 700 }}>{m.v}</p></div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue Breakdown Table */}
      <div className="adm-card" style={{ marginBottom: 24 }}>
        <div className="adm-card-header"><h3>Revenue by Plan</h3></div>
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Plan</th>
                <th style={{ textAlign: 'right' }}>Subscribers</th>
                <th style={{ textAlign: 'right' }}>MRR</th>
                <th style={{ textAlign: 'right' }}>ARPU</th>
                <th style={{ textAlign: 'right' }}>Growth</th>
              </tr>
            </thead>
            <tbody>
              {PLAN_REV.map(r => (
                <tr key={r.p}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span className="adm-dot" style={{ background: r.c }}/>
                      <span style={{ fontWeight: 550 }}>{r.p}</span>
                    </div>
                  </td>
                  <td className="adm-mono" style={{ textAlign: 'right' }}>{r.subs}</td>
                  <td className="adm-mono" style={{ textAlign: 'right', fontWeight: 600 }}>{r.mrr}</td>
                  <td className="adm-mono" style={{ textAlign: 'right', color: 'var(--adm-text2)' }}>{r.arpu}</td>
                  <td className="adm-mono" style={{ textAlign: 'right', color: '#22c55e' }}>{r.growth}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoices + Webhook Events */}
      <div className="adm-g2" style={{ marginBottom: 24 }}>
        {/* Recent Invoices */}
        <div className="adm-card">
          <div className="adm-card-header">
            <h3>Recent Invoices</h3>
            <button className="adm-btn adm-btn-ghost adm-btn-xs">View All in Stripe ↗</button>
          </div>
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Invoice ID</th>
                  <th>Customer</th>
                  <th style={{ textAlign: 'right' }}>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {INVOICES.map(inv => (
                  <tr key={inv.id}>
                    <td className="adm-mono" style={{ fontSize: 11, color: 'var(--adm-text3)' }}>{inv.id}</td>
                    <td style={{ fontSize: 12 }}>{inv.email}</td>
                    <td className="adm-mono" style={{ textAlign: 'right', fontWeight: 600 }}>{inv.a}</td>
                    <td>
                      <span className={inv.st === 'paid' ? 'adm-badge adm-b-green' : inv.st === 'pending' ? 'adm-badge adm-b-amber' : 'adm-badge adm-b-red'}>
                        {inv.st}
                      </span>
                    </td>
                    <td style={{ fontSize: 11, color: 'var(--adm-text3)' }}>{inv.dt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Webhook Events */}
        <div className="adm-card">
          <div className="adm-card-header">
            <h3>Webhook Events</h3>
            <span className="adm-badge adm-b-green"><span className="adm-pulse">●</span> Listening</span>
          </div>
          <div className="adm-card-p adm-scroll-y" style={{ maxHeight: 360 }}>
            {WEBHOOKS.map((w, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                <span className="adm-mono" style={{ fontSize: 11, color: 'var(--adm-text3)', width: 38, flexShrink: 0 }}>{w.t}</span>
                <span className="adm-dot" style={{ background: w.st === 'processed' ? '#22c55e' : w.st === 'error' ? '#ef4444' : '#3b82f6', flexShrink: 0 }}/>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p className="adm-mono" style={{ fontSize: 11, fontWeight: 500 }}>{w.ev}</p>
                  <p style={{ fontSize: 11, color: 'var(--adm-text3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{w.data}</p>
                </div>
                <span className={w.st === 'processed' ? 'adm-badge adm-b-green' : w.st === 'error' ? 'adm-badge adm-b-red' : 'adm-badge adm-b-blue'} style={{ fontSize: 10, flexShrink: 0 }}>
                  {w.st}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stripe Quick Actions */}
      <div className="adm-card adm-card-p">
        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 14 }}>Stripe Quick Actions</h3>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button className="adm-btn adm-btn-primary adm-btn-sm">↻ Sync All Subscriptions</button>
          <button className="adm-btn adm-btn-ghost adm-btn-sm">Retry Failed Payments</button>
          <button className="adm-btn adm-btn-ghost adm-btn-sm">Open Customer Portal Config ↗</button>
          <button className="adm-btn adm-btn-ghost adm-btn-sm">Export Invoices CSV</button>
          <button className="adm-btn adm-btn-ghost adm-btn-sm">Send Test Webhook</button>
        </div>
      </div>
    </div>
  )
}
