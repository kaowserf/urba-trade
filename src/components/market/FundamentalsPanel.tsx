import type { FAIndicators } from '@/types/market'
import { formatPercent } from '@/lib/utils'

function FundRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-[#152032] last:border-0">
      <span className="text-xs text-[#94a3b8]">{label}</span>
      <span className="text-xs font-mono text-[#f1f5f9]">{value}</span>
    </div>
  )
}

export function FundamentalsPanel({ fa }: { fa: FAIndicators }) {
  return (
    <div className="card p-4">
      <h3 className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wider mb-3">Fundamentals</h3>
      <FundRow label="P/E Ratio" value={fa.pe > 0 ? fa.pe.toFixed(1) : 'N/A'} />
      <FundRow label="ROE" value={`${fa.roe.toFixed(1)}%`} />
      <FundRow label="Revenue Growth" value={formatPercent(fa.revenueGrowth * 100)} />
      <FundRow label="Profit Margin" value={`${(fa.profitMargin * 100).toFixed(1)}%`} />
      <FundRow label="Debt/Equity" value={fa.debtEquity.toFixed(2)} />
      <FundRow label="EPS Growth" value={formatPercent(fa.epsGrowth * 100)} />
      <FundRow label="Dividend Yield" value={fa.dividendYield > 0 ? `${(fa.dividendYield * 100).toFixed(2)}%` : 'None'} />
    </div>
  )
}
