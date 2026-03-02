'use client'
import { useState } from 'react'
import { Bot, Hand, ChevronDown, AlertTriangle, X, Zap, Shield, TrendingUp } from 'lucide-react'
import { useTradeStore, type AutoRiskLevel } from '@/store/useTradeStore'

const RISK_LEVELS: { value: AutoRiskLevel; label: string; color: string; icon: React.ReactNode; desc: string }[] = [
  {
    value: 'CONSERVATIVE',
    label: 'Conservative',
    color: '#00d4ff',
    icon: <Shield size={12} />,
    desc: 'Low risk, small positions',
  },
  {
    value: 'BALANCED',
    label: 'Balanced',
    color: '#00ff88',
    icon: <TrendingUp size={12} />,
    desc: 'Moderate risk & reward',
  },
  {
    value: 'AGGRESSIVE',
    label: 'Aggressive',
    color: '#f97316',
    icon: <Zap size={12} />,
    desc: 'High risk, larger positions',
  },
]

export function TradingModeToggle() {
  const { tradingMode, autoRiskLevel, setTradingMode, setAutoRiskLevel } = useTradeStore()
  const [showConfirm, setShowConfirm] = useState(false)
  const [showRiskMenu, setShowRiskMenu] = useState(false)

  const isAuto = tradingMode === 'AUTO'
  const risk = RISK_LEVELS.find((r) => r.value === autoRiskLevel) ?? RISK_LEVELS[1]

  const handleModeClick = (mode: 'MANUAL' | 'AUTO') => {
    if (mode === 'AUTO' && !isAuto) {
      setShowConfirm(true) // require confirmation before enabling AUTO
    } else if (mode === 'MANUAL' && isAuto) {
      setTradingMode('MANUAL')
    }
  }

  const confirmEnableAuto = () => {
    setTradingMode('AUTO')
    setShowConfirm(false)
  }

  return (
    <>
      {/* ── Toggle pill ─────────────────────────────────────── */}
      <div className="flex items-center gap-2">
        {/* Mode buttons */}
        <div className="flex items-center rounded-lg border border-[#1e2d40] bg-[#070b14] p-0.5 gap-0.5">
          {/* MANUAL */}
          <button
            onClick={() => handleModeClick('MANUAL')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ${
              !isAuto
                ? 'bg-[#1e2d40] text-[#f1f5f9] shadow-sm'
                : 'text-[#475569] hover:text-[#94a3b8]'
            }`}
          >
            <Hand size={12} />
            Manual
          </button>

          {/* AUTO */}
          <button
            onClick={() => handleModeClick('AUTO')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ${
              isAuto
                ? 'text-[#070b14] shadow-sm'
                : 'text-[#475569] hover:text-[#94a3b8]'
            }`}
            style={isAuto ? { backgroundColor: risk.color } : {}}
          >
            {isAuto && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#070b14] animate-pulse flex-shrink-0" />
            )}
            <Bot size={12} />
            Auto
          </button>
        </div>

        {/* Risk level selector — only shown in AUTO mode */}
        {isAuto && (
          <div className="relative">
            <button
              onClick={() => setShowRiskMenu((o) => !o)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors"
              style={{
                borderColor: `${risk.color}50`,
                color: risk.color,
                backgroundColor: `${risk.color}12`,
              }}
            >
              {risk.icon}
              {risk.label}
              <ChevronDown size={11} className={`transition-transform ${showRiskMenu ? 'rotate-180' : ''}`} />
            </button>

            {showRiskMenu && (
              <div
                className="absolute left-0 top-full mt-1.5 w-48 rounded-xl border border-[#1e2d40] bg-[#0d1421] shadow-xl shadow-black/40 z-50 overflow-hidden p-1"
                onMouseLeave={() => setShowRiskMenu(false)}
              >
                {RISK_LEVELS.map((r) => (
                  <button
                    key={r.value}
                    onClick={() => { setAutoRiskLevel(r.value); setShowRiskMenu(false) }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors ${
                      autoRiskLevel === r.value ? 'bg-[#1e2d40]' : 'hover:bg-[#1e2d40]/50'
                    }`}
                  >
                    <span style={{ color: r.color }}>{r.icon}</span>
                    <div>
                      <p className="text-xs font-semibold" style={{ color: r.color }}>{r.label}</p>
                      <p className="text-[10px] text-[#475569]">{r.desc}</p>
                    </div>
                    {autoRiskLevel === r.value && (
                      <span className="ml-auto text-[10px]" style={{ color: r.color }}>✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Auto-trade confirmation modal ────────────────────── */}
      {showConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowConfirm(false)}
          />

          {/* Dialog */}
          <div className="relative w-full max-w-sm rounded-2xl border border-[#f97316]/30 bg-[#0d1421] shadow-2xl shadow-black/60 p-6">
            {/* Close */}
            <button
              onClick={() => setShowConfirm(false)}
              className="absolute top-4 right-4 text-[#475569] hover:text-[#94a3b8] transition-colors"
            >
              <X size={16} />
            </button>

            {/* Icon + title */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#f97316]/15 border border-[#f97316]/30 flex items-center justify-center flex-shrink-0">
                <AlertTriangle size={20} className="text-[#f97316]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#f1f5f9]">Enable Auto Trading?</h3>
                <p className="text-xs text-[#475569]">This will activate automated execution</p>
              </div>
            </div>

            {/* Warning list */}
            <ul className="space-y-2 mb-5">
              {[
                'Trades will execute automatically based on AI signals',
                'Real capital is at risk — ensure your risk level is correct',
                'You can switch back to Manual at any time',
              ].map((w) => (
                <li key={w} className="flex items-start gap-2 text-xs text-[#94a3b8]">
                  <span className="text-[#f97316] mt-0.5 flex-shrink-0">•</span>
                  {w}
                </li>
              ))}
            </ul>

            {/* Risk level picker inside modal */}
            <div className="mb-5">
              <p className="text-xs text-[#475569] mb-2 font-medium">Select risk level:</p>
              <div className="grid grid-cols-3 gap-2">
                {RISK_LEVELS.map((r) => (
                  <button
                    key={r.value}
                    onClick={() => setAutoRiskLevel(r.value)}
                    className="flex flex-col items-center gap-1 p-2 rounded-lg border transition-all text-center"
                    style={{
                      borderColor: autoRiskLevel === r.value ? r.color : '#1e2d40',
                      backgroundColor: autoRiskLevel === r.value ? `${r.color}15` : 'transparent',
                    }}
                  >
                    <span style={{ color: r.color }}>{r.icon}</span>
                    <span className="text-[10px] font-semibold" style={{ color: autoRiskLevel === r.value ? r.color : '#94a3b8' }}>
                      {r.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 px-4 py-2 rounded-lg border border-[#1e2d40] text-xs text-[#94a3b8] hover:bg-[#1e2d40] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmEnableAuto}
                className="flex-1 px-4 py-2 rounded-lg text-xs font-semibold text-[#070b14] transition-opacity hover:opacity-90"
                style={{ backgroundColor: risk.color }}
              >
                Enable Auto
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
