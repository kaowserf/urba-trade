import type { PositionWithPnl } from '@/types/trading'
import { formatCurrency, pnlColor, formatPercent } from '@/lib/utils'

export function HoldingsTable({ positions }: { positions: PositionWithPnl[] }) {
  if (positions.length === 0) {
    return <div className="text-center text-[#475569] py-8 text-sm">No open positions</div>
  }
  return (
    <div className="overflow-x-auto">
      <table className="table-base">
        <thead>
          <tr>
            <th>Symbol</th>
            <th className="text-right">Qty</th>
            <th className="text-right">Avg Cost</th>
            <th className="text-right">Current</th>
            <th className="text-right">Market Value</th>
            <th className="text-right">P&L</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((pos) => (
            <tr key={pos.id}>
              <td><span className="font-bold text-[#00d4ff]">{pos.symbol}</span></td>
              <td className="text-right">{pos.quantity.toLocaleString()}</td>
              <td className="text-right">{formatCurrency(pos.avgCost)}</td>
              <td className="text-right">{formatCurrency(pos.currentPrice)}</td>
              <td className="text-right">{formatCurrency(pos.marketValue)}</td>
              <td className="text-right">
                <span style={{ color: pnlColor(pos.unrealizedPnl) }}>
                  {formatCurrency(pos.unrealizedPnl)} ({formatPercent(pos.unrealizedPnlPercent)})
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
