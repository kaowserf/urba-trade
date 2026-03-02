export const metadata = { title: 'Strategies' }

const STRATEGIES = [
  { name: 'Gap and Go', winRate: '62%', avgReturn: '3.2%', risk: 'MEDIUM', desc: 'Buy stocks gapping up 5%+ with RVOL ≥1.5x. Ride the momentum into the open.', signals: ['Gap ≥5%', 'RVOL ≥1.5x', 'Price ≥$5'] },
  { name: 'VWAP Reclaim', winRate: '58%', avgReturn: '2.8%', risk: 'LOW', desc: 'Enter when price reclaims VWAP with AI Score ≥60. A mean-reversion play.', signals: ['Below VWAP', 'AI Score ≥60', 'Volume surge'] },
  { name: 'Fade the Gap', winRate: '55%', avgReturn: '2.1%', risk: 'HIGH', desc: 'Short overextended gaps ≥8% with AI Score <50. Counter-trend with strict stops.', signals: ['Gap ≥8%', 'AI Score <50', 'Overbought RSI'] },
  { name: 'Range Expansion', winRate: '52%', avgReturn: '2.4%', risk: 'MEDIUM', desc: 'Breakout from tight consolidation with ATR expansion ≥3%. Trend continuation.', signals: ['ATR% ≥3%', 'Low BBW', 'Volume breakout'] },
  { name: 'Opening Breakout', winRate: '54%', avgReturn: '1.9%', risk: 'LOW', desc: 'Buy the opening range breakout with above-average volume confirmation.', signals: ['First 15 min ORB', 'RVOL ≥1.3x', 'R:R ≥2:1'] },
  { name: 'Momentum Ignition', winRate: '61%', avgReturn: '4.1%', risk: 'HIGH', desc: 'Aggressive entry on explosive volume + price action with AI Score ≥75.', signals: ['AI Score ≥75', 'RVOL ≥3x', 'Catalyst required'] },
]

const RISK_COLOR: Record<string, string> = { LOW: '#4ade80', MEDIUM: '#facc15', HIGH: '#ff4444' }

export default function StrategiesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#f1f5f9]">Quant Strategies</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {STRATEGIES.map((s) => (
          <div key={s.name} className="card card-hover p-5 space-y-3">
            <div className="flex items-start justify-between">
              <h3 className="font-bold text-[#f1f5f9]">{s.name}</h3>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full border" style={{ color: RISK_COLOR[s.risk], borderColor: `${RISK_COLOR[s.risk]}40`, background: `${RISK_COLOR[s.risk]}15` }}>{s.risk}</span>
            </div>
            <p className="text-xs text-[#94a3b8] leading-relaxed">{s.desc}</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-[#111827] rounded-lg p-2 text-center">
                <div className="text-[#94a3b8]">Win Rate</div>
                <div className="text-[#00ff88] font-bold">{s.winRate}</div>
              </div>
              <div className="bg-[#111827] rounded-lg p-2 text-center">
                <div className="text-[#94a3b8]">Avg Return</div>
                <div className="text-[#00d4ff] font-bold">{s.avgReturn}</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-1">
              {s.signals.map((sig) => (
                <span key={sig} className="text-xs bg-[#1e2d40] text-[#94a3b8] rounded px-2 py-0.5">{sig}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
