import { formatCurrency, formatNumber, pnlColor } from '@/lib/utils'

interface PortfolioCardProps {
  label: string
  value: number
  type: 'currency' | 'pnl' | 'count' | 'percent'
  delta?: number
  deltaLabel?: string
}

export function PortfolioCard({ label, value, type, delta, deltaLabel }: PortfolioCardProps) {
  const formatted = type === 'currency' ? formatCurrency(value) :
    type === 'pnl' ? formatCurrency(value) :
    type === 'percent' ? `${value.toFixed(2)}%` :
    formatNumber(value, 0)

  const valueColor = type === 'pnl' ? pnlColor(value) : '#f1f5f9'

  return (
    <div className="card p-4">
      <div className="text-xs text-[#94a3b8] font-medium mb-2">{label}</div>
      <div className="text-2xl font-bold" style={{ color: valueColor }}>{formatted}</div>
      {delta !== undefined && (
        <div className="text-xs text-[#475569] mt-1">
          <span style={{ color: pnlColor(delta) }}>{delta >= 0 ? '+' : ''}{delta}</span>
          {deltaLabel && <span className="ml-1">{deltaLabel}</span>}
        </div>
      )}
    </div>
  )
}
