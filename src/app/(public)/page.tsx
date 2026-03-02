import Link from 'next/link'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { CountUp } from '@/components/ui/CountUp'

const TICKER_ITEMS = [
  { sym: 'AAPL',  price: '$187.42', change: '+0.84%',  up: true },
  { sym: 'NVDA',  price: '$875.35', change: '+2.45%',  up: true },
  { sym: 'TSLA',  price: '$248.71', change: '-0.32%',  up: false },
  { sym: 'MSFT',  price: '$415.20', change: '+1.23%',  up: true },
  { sym: 'AMD',   price: '$168.92', change: '+1.87%',  up: true },
  { sym: 'GOOGL', price: '$175.48', change: '+1.12%',  up: true },
  { sym: 'META',  price: '$541.23', change: '+3.21%',  up: true },
  { sym: 'AMZN',  price: '$193.55', change: '+0.67%',  up: true },
  { sym: 'SPY',   price: '$521.43', change: '+0.54%',  up: true },
  { sym: 'QQQ',   price: '$447.82', change: '+0.89%',  up: true },
  { sym: 'NFLX',  price: '$628.14', change: '+2.15%',  up: true },
  { sym: 'COIN',  price: '$224.60', change: '+4.32%',  up: true },
  { sym: 'PLTR',  price: '$24.87',  change: '+1.76%',  up: true },
  { sym: 'CRM',   price: '$302.15', change: '-0.45%',  up: false },
  { sym: 'SOFI',  price: '$8.42',   change: '+0.92%',  up: true },
]

const FEATURES = [
  { icon: '🤖', title: 'AI Stock Picker',    color: '#00ff88', desc: 'Composite AI scoring (0–100) combining technical (45%), fundamental (40%), and sentiment (15%) for every stock.' },
  { icon: '⚡', title: 'Intraday Scanner',   color: '#00d4ff', desc: 'Dual-mode scanner — Standard & Aggressive Small-Cap. ATR-based entry, stop, and target levels auto-calculated.' },
  { icon: '🔍', title: 'AI Batch Scanner',   color: '#a855f7', desc: 'Analyze up to 25 symbols simultaneously with sorted results, confidence rankings, and signal breakdowns.' },
  { icon: '📊', title: 'Smart Screener',     color: '#facc15', desc: 'Filter 150+ stocks by AI score, signal type, sector, risk level, and price range — updated in real-time.' },
  { icon: '📈', title: '6 Quant Strategies', color: '#fb923c', desc: 'Pre-built quantitative strategies with win rates, average returns, drawdown stats, and risk parameters.' },
  { icon: '💬', title: 'AI Chat',            color: '#00ff88', desc: 'Ask about any ticker in plain English. Get instant AI analysis without learning complex tools.' },
]

const STEPS = [
  { step: '01', color: '#00ff88', title: 'Connect & Configure', desc: 'Sign up free in seconds. Optionally add your Polygon.io API key for live market data. No credit card required.' },
  { step: '02', color: '#00d4ff', title: 'Scan & Analyze',      desc: 'Run the AI Scanner on any symbols. Get composite scores, intraday setups, and quantitative signal rankings instantly.' },
  { step: '03', color: '#a855f7', title: 'Trade with Confidence', desc: 'Use AI-generated entry, stop-loss, and target levels with R:R ≥ 2.0. Enable Auto mode to log trades automatically.' },
]

const STATS = [
  { value: '94.2%', label: 'AI Score Accuracy' },
  { value: '150+',  label: 'Stocks Covered' },
  { value: '2,400+', label: 'Daily Signals' },
  { value: '6',     label: 'Quant Strategies' },
]

export default function LandingPage() {
  const tickerAll = [...TICKER_ITEMS, ...TICKER_ITEMS]

  return (
    <div className="min-h-screen bg-[#070b14] overflow-x-hidden">

      {/* ── Nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#1e2d40] bg-[#070b14]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="UrbaTrade" className="h-8 w-auto" />
            <span className="text-lg font-bold text-[#f1f5f9]">UrbaTrade</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-[#94a3b8]">
            <Link href="/pricing" className="hover:text-[#f1f5f9] transition-colors">Pricing</Link>
            <Link href="/company" className="hover:text-[#f1f5f9] transition-colors">About</Link>
            <Link href="/contact" className="hover:text-[#f1f5f9] transition-colors">Contact</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth/login" className="btn btn-secondary btn-sm">Sign In</Link>
            <Link href="/auth/register" className="btn btn-primary btn-sm btn-beam">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div className="hero-orb w-[500px] h-[500px] bg-[#00ff88]/8 top-0 left-[-100px]" />
        <div className="hero-orb w-[400px] h-[400px] bg-[#00d4ff]/6 top-20 right-[-80px]" />
        <div className="hero-orb w-[300px] h-[300px] bg-[#a855f7]/5 bottom-0 left-1/2" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text — CSS fade-up (no JS needed, plays on load) */}
            <div>
              <div className="fade-up-1 inline-flex items-center gap-2 bg-[#0d1421] border border-[#1e2d40] rounded-full px-4 py-1.5 mb-6">
                <div className="live-dot" />
                <span className="text-xs text-[#94a3b8]">AI-Powered Intraday Trading Platform</span>
              </div>
              <h1 className="fade-up-2 text-5xl sm:text-6xl font-black text-[#f1f5f9] mb-6 leading-[1.08] tracking-tight">
                Trade Smarter<br />with <span className="gradient-text">AI-Driven</span><br />Insights
              </h1>
              <p className="fade-up-3 text-lg text-[#94a3b8] mb-8 max-w-lg leading-relaxed">
                Quantitative technical & fundamental analysis, automated trade execution, and real-time market signals — all in one platform built for serious traders.
              </p>
              <div className="fade-up-4 flex flex-wrap items-center gap-4 mb-8">
                <Link href="/auth/register" className="btn btn-primary btn-lg btn-beam">Start Trading Free</Link>
                <Link href="/pricing" className="btn btn-secondary btn-lg">View Pricing →</Link>
              </div>
              <div className="fade-up-4 flex flex-wrap items-center gap-5 text-xs text-[#475569]">
                {['No credit card required', 'Free plan available', '150+ stocks covered'].map((t) => (
                  <div key={t} className="flex items-center gap-1.5">
                    <span className="text-[#00ff88]">✓</span>{t}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Floating preview cards */}
            <div className="relative hidden lg:flex items-center justify-center h-[460px]">
              <div className="animate-float absolute left-0 top-8 w-[260px] card card-glow-green p-5 z-20">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-[#475569] mb-0.5">AI Analysis</p>
                    <p className="text-base font-bold text-[#f1f5f9]">AAPL</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[#475569]">AI Score</p>
                    <p className="text-2xl font-black gradient-text">87</p>
                  </div>
                </div>
                <div className="mb-4"><div className="score-bar-track"><div className="progress-fill" style={{ width: '87%' }} /></div></div>
                <div className="inline-flex items-center gap-2 badge-strong-buy px-3 py-1.5 rounded-full text-xs font-semibold mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88]" />STRONG BUY
                </div>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {[{ label: 'Technical', val: '91' }, { label: 'Fundamental', val: '82' }, { label: 'Sentiment', val: '88' }].map((s) => (
                    <div key={s.label} className="bg-[#111827] rounded-lg p-2 text-center">
                      <p className="text-xs font-bold text-[#00ff88]">{s.val}</p>
                      <p className="text-[10px] text-[#475569]">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="animate-float-delayed absolute right-0 top-0 w-[220px] card p-4 z-10">
                <div className="flex items-center gap-2 mb-3">
                  <div className="live-dot" />
                  <p className="text-xs font-semibold text-[#94a3b8]">Live Signals</p>
                </div>
                {[
                  { sym: 'NVDA', score: 92, signal: 'STRONG BUY', cls: 'badge-strong-buy' },
                  { sym: 'MSFT', score: 78, signal: 'BUY',         cls: 'badge-buy' },
                  { sym: 'AMD',  score: 71, signal: 'BUY',         cls: 'badge-buy' },
                  { sym: 'TSLA', score: 44, signal: 'HOLD',        cls: 'badge-hold' },
                ].map((s) => (
                  <div key={s.sym} className="flex items-center justify-between py-1.5 border-b border-[#1e2d40]/50 last:border-0">
                    <div>
                      <p className="text-xs font-semibold text-[#f1f5f9]">{s.sym}</p>
                      <p className="text-[10px] text-[#475569]">Score {s.score}</p>
                    </div>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${s.cls}`}>{s.signal}</span>
                  </div>
                ))}
              </div>

              <div className="animate-float absolute right-4 bottom-8 w-[210px] card card-glow-blue p-4 z-20">
                <p className="text-xs font-semibold text-[#94a3b8] mb-3">Intraday Setup</p>
                <p className="text-sm font-bold text-[#f1f5f9] mb-2">NVDA · Bull Flag</p>
                <div className="space-y-1.5 text-xs">
                  {[{ l: 'Entry', v: '$872.50', c: '#f1f5f9' }, { l: 'Stop', v: '$864.20', c: '#ff4444' }, { l: 'Target', v: '$889.10', c: '#00ff88' }].map((r) => (
                    <div key={r.l} className="flex justify-between">
                      <span className="text-[#475569]">{r.l}</span>
                      <span className="font-medium" style={{ color: r.c }}>{r.v}</span>
                    </div>
                  ))}
                  <div className="flex justify-between border-t border-[#1e2d40] pt-1.5 mt-1">
                    <span className="text-[#475569]">R:R</span>
                    <span className="text-[#00d4ff] font-bold">2.0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Ticker scroll ── */}
      <div className="border-y border-[#1e2d40] bg-[#0d1421]/60 py-3 overflow-hidden">
        <div className="ticker-track">
          {tickerAll.map((item, i) => (
            <div key={i} className="flex items-center gap-6 px-6 flex-shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#94a3b8]">{item.sym}</span>
                <span className="text-xs text-[#f1f5f9]">{item.price}</span>
                <span className={`text-xs font-semibold ${item.up ? 'text-[#00ff88]' : 'text-[#ff4444]'}`}>{item.change}</span>
              </div>
              <span className="text-[#1e2d40]">·</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Stats ── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map((s, i) => (
            <ScrollReveal key={s.label} direction="scale" delay={i * 100}>
              <div className="card p-6">
                <div className="text-4xl font-black gradient-text mb-2">
                  <CountUp value={s.value} />
                </div>
                <div className="text-sm text-[#475569]">{s.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal direction="up" className="text-center mb-12">
            <p className="text-xs font-semibold text-[#00ff88] uppercase tracking-widest mb-3">Platform Features</p>
            <h2 className="text-4xl font-black text-[#f1f5f9] mb-4">Everything You Need to Trade</h2>
            <p className="text-[#94a3b8] max-w-xl mx-auto">One platform. Six powerful tools. Institutional-grade analysis built for individual traders.</p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <ScrollReveal key={f.title} direction="up" delay={i * 90}>
                <div className="card card-hover p-6 group h-full">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${f.color}15` }}
                  >
                    {f.icon}
                  </div>
                  <h3 className="text-base font-bold text-[#f1f5f9] mb-2">{f.title}</h3>
                  <p className="text-sm text-[#94a3b8] leading-relaxed">{f.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal direction="up" className="text-center mb-12">
            <p className="text-xs font-semibold text-[#00d4ff] uppercase tracking-widest mb-3">Simple Process</p>
            <h2 className="text-4xl font-black text-[#f1f5f9] mb-4">How It Works</h2>
            <p className="text-[#94a3b8] max-w-xl mx-auto">Get up and running in minutes. No complicated setup required.</p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map((step, i) => (
              <ScrollReveal
                key={step.step}
                direction={i === 0 ? 'left' : i === 2 ? 'right' : 'up'}
                delay={i * 150}
              >
                <div className="relative card p-7 h-full">
                  {i < STEPS.length - 1 && (
                    <div className="hidden md:block absolute top-10 right-[-24px] w-12 h-px bg-gradient-to-r from-[#1e2d40] to-transparent z-10" />
                  )}
                  <div className="text-4xl font-black mb-4" style={{ color: `${step.color}40` }}>{step.step}</div>
                  <h3 className="text-base font-bold mb-2" style={{ color: step.color }}>{step.title}</h3>
                  <p className="text-sm text-[#94a3b8] leading-relaxed">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Signal reference ── */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal direction="up">
            <div className="card p-8">
              <ScrollReveal direction="fade" className="text-center mb-8">
                <p className="text-xs font-semibold text-[#475569] uppercase tracking-widest mb-2">Signal System</p>
                <h2 className="text-2xl font-bold text-[#f1f5f9]">AI Signal Color Guide</h2>
              </ScrollReveal>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {[
                  { label: 'STRONG BUY',  cls: 'badge-strong-buy',  score: '80–100', desc: 'High conviction long setup' },
                  { label: 'BUY',         cls: 'badge-buy',         score: '65–79',  desc: 'Positive momentum signal' },
                  { label: 'HOLD',        cls: 'badge-hold',        score: '45–64',  desc: 'Neutral / wait for clarity' },
                  { label: 'SELL',        cls: 'badge-sell',        score: '30–44',  desc: 'Weakening — consider exit' },
                  { label: 'STRONG SELL', cls: 'badge-strong-sell', score: '0–29',   desc: 'High conviction short/exit' },
                ].map((s, i) => (
                  <ScrollReveal key={s.label} direction="up" delay={i * 80}>
                    <div className="text-center">
                      <div className={`inline-flex px-3 py-1.5 rounded-full text-xs font-bold mb-2 ${s.cls}`}>{s.label}</div>
                      <p className="text-xs text-[#f1f5f9] font-semibold mb-0.5">Score {s.score}</p>
                      <p className="text-[10px] text-[#475569] leading-tight">{s.desc}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6">
        <ScrollReveal direction="scale" className="max-w-3xl mx-auto">
          <div className="text-center card p-14 glow-green relative overflow-hidden">
            <div className="hero-orb w-[300px] h-[300px] bg-[#00ff88]/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-[#00ff88]/10 border border-[#00ff88]/20 rounded-full px-4 py-1.5 mb-6">
                <div className="live-dot" />
                <span className="text-xs text-[#00ff88]">Platform live · 150+ stocks</span>
              </div>
              <h2 className="text-4xl font-black text-[#f1f5f9] mb-4">Start Trading with AI Today</h2>
              <p className="text-[#94a3b8] mb-8 max-w-md mx-auto">
                Free plan available. No credit card required. Get your first AI signals in under 2 minutes.
              </p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <Link href="/auth/register" className="btn btn-primary btn-lg btn-beam">Create Free Account</Link>
                <Link href="/pricing" className="btn btn-secondary btn-lg">See Pricing</Link>
              </div>
              <p className="text-xs text-[#475569] mt-6">Pro plan from $29/mo · Enterprise at $99/mo · Cancel anytime</p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-[#1e2d40] bg-[#070b14] pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.png" alt="UrbaTrade" className="h-9 w-auto" />
                <span className="text-base font-bold text-[#f1f5f9]">UrbaTrade</span>
              </div>
              <p className="text-sm text-[#475569] leading-relaxed mb-5">
                AI-powered intraday trading intelligence. Quantitative analysis, automated signals, and smart screening — built for serious traders.
              </p>
              <div className="inline-flex items-center gap-2 bg-[#0d1421] border border-[#1e2d40] rounded-full px-3 py-1.5">
                <div className="live-dot" />
                <span className="text-xs text-[#94a3b8]">Live signals · 150+ stocks</span>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-[#f1f5f9] uppercase tracking-wider mb-4">Platform</p>
              <ul className="space-y-3">
                {[
                  { label: 'AI Stock Picker', href: '/picker' },
                  { label: 'Intraday Scanner', href: '/intraday' },
                  { label: 'Smart Screener', href: '/screener' },
                  { label: 'Quant Strategies', href: '/strategies' },
                  { label: 'AI Chat', href: '/chat' },
                  { label: 'Pricing', href: '/pricing' },
                ].map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-[#475569] hover:text-[#94a3b8] transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold text-[#f1f5f9] uppercase tracking-wider mb-4">Company</p>
              <ul className="space-y-3">
                {[
                  { label: 'About HHDM LLC', href: '/company' },
                  { label: 'Contact Us', href: '/contact' },
                  { label: 'Privacy Policy', href: '/privacy' },
                  { label: 'Terms & Conditions', href: '/terms' },
                ].map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-[#475569] hover:text-[#94a3b8] transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold text-[#f1f5f9] uppercase tracking-wider mb-4">Get Started</p>
              <p className="text-sm text-[#475569] leading-relaxed mb-4">
                Free plan available. No credit card required. Start analyzing stocks with AI today.
              </p>
              <div className="space-y-2">
                <Link href="/auth/register" className="btn btn-primary btn-sm btn-beam w-full text-center block">Create Free Account</Link>
                <Link href="/auth/login" className="btn btn-secondary btn-sm w-full text-center block">Sign In</Link>
              </div>
              <p className="text-xs text-[#475569] mt-4">
                Need help?{' '}
                <Link href="/contact" className="text-[#00d4ff] hover:underline">Contact support</Link>
              </p>
            </div>
          </div>

          <div className="border-t border-[#1e2d40] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs text-[#475569]">
              <span>© 2026 UrbaTrade by</span>
              <Link href="/company" className="text-[#94a3b8] hover:text-[#f1f5f9] transition-colors font-medium">HHDM LLC</Link>
              <span className="text-[#1e2d40]">·</span>
              <span>New York, USA</span>
            </div>
            <p className="text-xs text-[#475569] text-center md:text-right max-w-md">
              For informational purposes only. Not financial advice. Trading involves risk of loss.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
