import Link from 'next/link'

export const metadata = { title: 'Pricing' }

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    color: '#94a3b8',
    features: ['AI Stock Picker', '5 scans/day', 'Basic screener', 'News feed', '3 strategies'],
    cta: 'Get Started Free',
    href: '/auth/register',
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    color: '#00d4ff',
    popular: true,
    features: ['Everything in Free', 'Unlimited scans', 'Intraday scanner', 'AI Chat', 'All 6 strategies', 'Live data (API key)', 'Auto-trading'],
    cta: 'Start Pro Trial',
    href: '/auth/register',
  },
  {
    name: 'Enterprise',
    price: '$99',
    period: '/month',
    color: '#a855f7',
    features: ['Everything in Pro', 'Multi-account', 'Admin panel', 'Priority support', 'Custom strategies', 'API access', 'White-label'],
    cta: 'Contact Sales',
    href: '/auth/register',
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#070b14] py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <Link href="/" className="text-sm text-[#94a3b8] hover:text-[#f1f5f9] mb-6 inline-block">← Back to home</Link>
          <h1 className="text-4xl font-bold text-[#f1f5f9] mb-4">Simple, Transparent Pricing</h1>
          <p className="text-[#94a3b8]">Start free, upgrade when you need more power.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((plan) => (
            <div key={plan.name} className={`card p-6 flex flex-col ${plan.popular ? 'border-[#00d4ff]/40' : ''}`} style={plan.popular ? { boxShadow: '0 0 30px rgba(0,212,255,0.1)' } : {}}>
              {plan.popular && <div className="text-xs font-semibold text-[#00d4ff] mb-2 uppercase tracking-wider">Most Popular</div>}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-[#f1f5f9]">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-3xl font-bold" style={{ color: plan.color }}>{plan.price}</span>
                  <span className="text-sm text-[#475569]">{plan.period}</span>
                </div>
              </div>
              <ul className="space-y-2.5 flex-1 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-[#94a3b8]">
                    <span style={{ color: plan.color }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link href={plan.href} className={`btn w-full text-center ${plan.name === 'Pro' ? 'btn-primary' : 'btn-secondary'}`}>{plan.cta}</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
