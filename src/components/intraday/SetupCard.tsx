import type { IntradaySetup } from '@/types/market'
import { formatCurrency } from '@/lib/utils'

const STRATEGY_LABELS: Record<string, string> = {
  GAP_AND_GO: 'Gap and Go',
  VWAP_RECLAIM: 'VWAP Reclaim',
  FADE: 'Fade',
  RANGE_EXPANSION: 'Range Expansion',
  OPENING_BREAKOUT: 'Opening Breakout',
}

const STRATEGY_COLORS: Record<string, string> = {
  GAP_AND_GO: '#00ff88',
  VWAP_RECLAIM: '#00d4ff',
  FADE: '#ff4444',
  RANGE_EXPANSION: '#a855f7',
  OPENING_BREAKOUT: '#facc15',
}

export function SetupCard({ setup }: { setup: IntradaySetup }) {
  const rr = setup.rrRatio.toFixed(1)
  const rrColor = setup.rrRatio >= 3 ? '#00ff88' : setup.rrRatio >= 2 ? '#4ade80' : '#facc15'
  const stratColor = STRATEGY_COLORS[setup.strategyType] ?? '#94a3b8'

  return (
    <div className="card card-hover p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-[#00d4ff]">{setup.symbol}</span>
            <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${setup.bias === 'Long' ? 'bg-[#4ade80]/10 text-[#4ade80]' : 'bg-[#ff4444]/10 text-[#ff4444]'}`}>
              {setup.bias}
            </span>
          </div>
          <div className="mt-1 text-xs font-medium" style={{ color: stratColor }}>
            {STRATEGY_LABELS[setup.strategyType]}
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-bold" style={{ color: rrColor }}>R:R {rr}:1</div>
          <div className="text-xs text-[#94a3b8] mt-0.5">{setup.float}</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="bg-[#111827] rounded-lg p-2">
          <div className="text-[#94a3b8]">Entry</div>
          <div className="text-[#f1f5f9] font-mono font-medium">{formatCurrency(setup.entryPrice)}</div>
        </div>
        <div className="bg-[#ff4444]/8 rounded-lg p-2">
          <div className="text-[#94a3b8]">Stop</div>
          <div className="text-[#ff4444] font-mono font-medium">{formatCurrency(setup.stopLoss)}</div>
        </div>
        <div className="bg-[#4ade80]/8 rounded-lg p-2">
          <div className="text-[#94a3b8]">Target</div>
          <div className="text-[#4ade80] font-mono font-medium">{formatCurrency(setup.target1)}</div>
        </div>
      </div>

      <p className="text-xs text-[#94a3b8] leading-relaxed">{setup.catalyst}</p>

      <div className="flex justify-between text-xs text-[#94a3b8] pt-1 border-t border-[#1e2d40]">
        <span>RVOL: <span className="text-[#f1f5f9]">{setup.rvol.toFixed(1)}x</span></span>
        <span>ATR: <span className="text-[#f1f5f9]">{setup.atrPercent.toFixed(1)}%</span></span>
        <span>Gap: <span className="text-[#f1f5f9]">{setup.gap.toFixed(1)}%</span></span>
        <span>Conf: <span className="text-[#00ff88]">{Math.round(setup.confidence)}%</span></span>
      </div>
    </div>
  )
}
