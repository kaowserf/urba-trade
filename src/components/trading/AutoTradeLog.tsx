import type { Trade } from '@/types/trading'
import { formatCurrency, pnlColor } from '@/lib/utils'

export function AutoTradeLog({ trades }: { trades: Trade[] }) {
  if (trades.length === 0) {
    return <div className="text-center text-[#475569] py-4 text-sm">No recent trades</div>
  }
  return (
    <div className="space-y-2">
      {trades.map((t) => (
        <div key={t.id} className="flex items-center justify-between py-2 border-b border-[#152032] last:border-0 text-xs">
          <div>
            <span className="font-bold text-[#00d4ff]">{t.symbol}</span>
            <span className={`ml-2 ${t.direction === 'LONG' ? 'text-[#4ade80]' : 'text-[#ff4444]'}`}>{t.direction}</span>
          </div>
          <div className="text-right">
            <div>{formatCurrency(t.entryPrice)}</div>
            {t.pnl != null && (
              <div style={{ color: pnlColor(t.pnl) }}>{t.pnl >= 0 ? '+' : ''}{formatCurrency(t.pnl)}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
