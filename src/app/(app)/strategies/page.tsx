'use client'
import { useState } from 'react'

const STRATEGIES = [
  { id: 'gap-and-go', name: 'Gap and Go', winRate: '62%', avgReturn: '3.2%', risk: 'MEDIUM', desc: 'Buy stocks gapping up 5%+ with RVOL ≥1.5x. Ride the momentum into the open.', signals: ['Gap ≥5%', 'RVOL ≥1.5x', 'Price ≥$5'] },
  { id: 'vwap-reclaim', name: 'VWAP Reclaim', winRate: '58%', avgReturn: '2.8%', risk: 'LOW', desc: 'Enter when price reclaims VWAP with AI Score ≥60. A mean-reversion play.', signals: ['Below VWAP', 'AI Score ≥60', 'Volume surge'] },
  { id: 'fade-the-gap', name: 'Fade the Gap', winRate: '55%', avgReturn: '2.1%', risk: 'HIGH', desc: 'Short overextended gaps ≥8% with AI Score <50. Counter-trend with strict stops.', signals: ['Gap ≥8%', 'AI Score <50', 'Overbought RSI'] },
  { id: 'range-expansion', name: 'Range Expansion', winRate: '52%', avgReturn: '2.4%', risk: 'MEDIUM', desc: 'Breakout from tight consolidation with ATR expansion ≥3%. Trend continuation.', signals: ['ATR% ≥3%', 'Low BBW', 'Volume breakout'] },
  { id: 'opening-breakout', name: 'Opening Breakout', winRate: '54%', avgReturn: '1.9%', risk: 'LOW', desc: 'Buy the opening range breakout with above-average volume confirmation.', signals: ['First 15 min ORB', 'RVOL ≥1.3x', 'R:R ≥2:1'] },
  { id: 'momentum-ignition', name: 'Momentum Ignition', winRate: '61%', avgReturn: '4.1%', risk: 'HIGH', desc: 'Aggressive entry on explosive volume + price action with AI Score ≥75.', signals: ['AI Score ≥75', 'RVOL ≥3x', 'Catalyst required'] },
]

const RISK_COLOR: Record<string, string> = { LOW: '#4ade80', MEDIUM: '#facc15', HIGH: '#ff4444' }

export default function StrategiesPage() {
  const [deployed, setDeployed] = useState<Record<string, boolean>>({})
  const [showConfirm, setShowConfirm] = useState<string | null>(null)

  function handleDeploy(id: string) {
    setShowConfirm(id)
  }

  function confirmDeploy(id: string) {
    setDeployed((prev) => ({ ...prev, [id]: !prev[id] }))
    setShowConfirm(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#f1f5f9]">Quant Strategies</h1>
        <div className="text-sm text-[#94a3b8]">
          {Object.values(deployed).filter(Boolean).length} / {STRATEGIES.length} deployed
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {STRATEGIES.map((s) => {
          const isDeployed = deployed[s.id] ?? false
          const isConfirming = showConfirm === s.id

          return (
            <div key={s.id} className={`card card-hover p-5 space-y-3 transition-all ${isDeployed ? 'border-[#00ff88]/40' : ''}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-[#f1f5f9]">{s.name}</h3>
                  {isDeployed && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#00ff88] bg-[#00ff88]/10 border border-[#00ff88]/30 px-1.5 py-0.5 rounded">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff88] opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ff88]" />
                      </span>
                      Live
                    </span>
                  )}
                </div>
                <span
                  className="text-xs font-medium px-2 py-0.5 rounded-full border"
                  style={{
                    color: RISK_COLOR[s.risk],
                    borderColor: `${RISK_COLOR[s.risk]}40`,
                    background: `${RISK_COLOR[s.risk]}15`,
                  }}
                >
                  {s.risk}
                </span>
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

              {/* Deploy / Undeploy button */}
              {isConfirming ? (
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-xs text-[#94a3b8]">
                    {isDeployed ? 'Stop this strategy?' : 'Deploy this strategy?'}
                  </span>
                  <button
                    onClick={() => confirmDeploy(s.id)}
                    className="text-xs font-medium px-3 py-1.5 rounded bg-[#00ff88] text-[#070b14] hover:bg-[#00ff88]/80 transition-colors"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setShowConfirm(null)}
                    className="text-xs font-medium px-3 py-1.5 rounded border border-[#1e2d40] text-[#94a3b8] hover:border-[#334155] transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleDeploy(s.id)}
                  className={`w-full text-sm font-medium py-2 rounded transition-colors ${
                    isDeployed
                      ? 'bg-[#ff4444]/10 border border-[#ff4444]/30 text-[#ff4444] hover:bg-[#ff4444]/20'
                      : 'bg-[#00ff88]/10 border border-[#00ff88]/30 text-[#00ff88] hover:bg-[#00ff88]/20'
                  }`}
                >
                  {isDeployed ? 'Stop Strategy' : 'Deploy Strategy'}
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
