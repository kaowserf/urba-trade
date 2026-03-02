import type { TAIndicators } from '@/types/market'
import { scoreToColor } from '@/lib/utils'

function IndicatorRow({ label, value, display, score }: { label: string; value: number; display: string; score: number }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-[#152032] last:border-0">
      <span className="text-xs text-[#94a3b8]">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-xs font-mono text-[#f1f5f9]">{display}</span>
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: scoreToColor(score) }} />
      </div>
    </div>
  )
}

function indicatorScore(label: string, value: number): number {
  switch (label) {
    case 'RSI': return value > 70 ? 20 : value > 50 ? 75 : value > 30 ? 55 : 80
    case 'MACD': return value > 0 ? 75 : 35
    case 'BB%B': return value > 0.8 ? 70 : value > 0.5 ? 60 : value > 0.2 ? 55 : 40
    case 'ADX': return value > 35 ? 80 : value > 25 ? 65 : 45
    case 'Stoch': return value > 80 ? 25 : value > 50 ? 65 : value > 20 ? 70 : 80
    case 'RVOL': return value > 2 ? 90 : value > 1.5 ? 75 : value > 1 ? 55 : 30
    default: return 50
  }
}

export function IndicatorPanel({ ta }: { ta: TAIndicators }) {
  return (
    <div className="card p-4">
      <h3 className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wider mb-3">Technical Indicators</h3>
      <IndicatorRow label="RSI(14)" value={ta.rsi} display={ta.rsi.toFixed(1)} score={indicatorScore('RSI', ta.rsi)} />
      <IndicatorRow label="MACD Hist" value={ta.macdHist} display={ta.macdHist.toFixed(3)} score={indicatorScore('MACD', ta.macdHist)} />
      <IndicatorRow label="BB %B" value={ta.bbPercent} display={`${(ta.bbPercent * 100).toFixed(0)}%`} score={indicatorScore('BB%B', ta.bbPercent)} />
      <IndicatorRow label="ADX(14)" value={ta.adx} display={ta.adx.toFixed(1)} score={indicatorScore('ADX', ta.adx)} />
      <IndicatorRow label="Stoch %K" value={ta.stoch} display={ta.stoch.toFixed(1)} score={indicatorScore('Stoch', ta.stoch)} />
      <IndicatorRow label="RVOL" value={ta.volumeRatio} display={`${ta.volumeRatio.toFixed(2)}x`} score={indicatorScore('RVOL', ta.volumeRatio)} />
      <IndicatorRow label="VWAP Dev" value={ta.vwapDev} display={`${ta.vwapDev.toFixed(2)}%`} score={ta.vwapDev > 0 ? 65 : 45} />
      <div className="mt-3 pt-3 border-t border-[#1e2d40]">
        <div className="text-xs text-[#94a3b8]">SMA20</div>
        <div className="text-sm font-mono text-[#f1f5f9]">${ta.sma20.toFixed(2)}</div>
      </div>
      <div className="mt-2">
        <div className="text-xs text-[#94a3b8]">SMA50</div>
        <div className="text-sm font-mono text-[#f1f5f9]">${ta.sma50.toFixed(2)}</div>
      </div>
    </div>
  )
}
