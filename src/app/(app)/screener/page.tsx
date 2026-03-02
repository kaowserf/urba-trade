'use client'
import { useEffect, useState } from 'react'
import { Select } from '@/components/ui/Select'
import { SignalBadge } from '@/components/market/SignalBadge'
import { AIScoreBar } from '@/components/market/AIScoreBar'
import type { CompositeScore } from '@/types/market'
import { formatCurrency, formatPercent, pnlColor } from '@/lib/utils'
import { SECTORS } from '@/lib/algorithms/stockUniverse'
import Link from 'next/link'

export default function ScreenerPage() {
  const [results, setResults] = useState<CompositeScore[]>([])
  const [loading, setLoading] = useState(true)
  const [minScore, setMinScore] = useState('0')
  const [signal, setSignal] = useState('ALL')
  const [sector, setSector] = useState('ALL')
  const [risk, setRisk] = useState('ALL')

  useEffect(() => {
    fetch('/api/market/screener').then((r) => r.json()).then((j) => { setResults(j.data ?? []); setLoading(false) })
  }, [])

  const filtered = results.filter((r) => {
    if (r.aiScore < parseInt(minScore)) return false
    if (signal !== 'ALL' && r.signal !== signal) return false
    if (sector !== 'ALL' && r.sector !== sector) return false
    if (risk !== 'ALL' && r.riskLevel !== risk) return false
    return true
  })

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-[#f1f5f9]">AI Screener</h1>

      <div className="card p-4 flex flex-wrap gap-4 items-end">
        <Select label="Min AI Score" value={minScore} onChange={setMinScore} options={[
          { value: '0', label: 'Any Score' },
          { value: '45', label: '45+ HOLD' },
          { value: '65', label: '65+ BUY' },
          { value: '80', label: '80+ STRONG BUY' },
        ]} />
        <Select label="Signal" value={signal} onChange={setSignal} options={[
          { value: 'ALL', label: 'All Signals' },
          { value: 'STRONG_BUY', label: 'Strong Buy' },
          { value: 'BUY', label: 'Buy' },
          { value: 'HOLD', label: 'Hold' },
          { value: 'SELL', label: 'Sell' },
          { value: 'STRONG_SELL', label: 'Strong Sell' },
        ]} />
        <Select label="Sector" value={sector} onChange={setSector} options={[
          { value: 'ALL', label: 'All Sectors' },
          ...SECTORS.map((s) => ({ value: s, label: s })),
        ]} />
        <Select label="Risk Level" value={risk} onChange={setRisk} options={[
          { value: 'ALL', label: 'All Risk Levels' },
          { value: 'LOW', label: 'Low' },
          { value: 'MEDIUM', label: 'Medium' },
          { value: 'HIGH', label: 'High' },
        ]} />
        <div className="ml-auto text-sm text-[#94a3b8] self-end pb-0.5">
          {loading ? 'Loading...' : `${filtered.length} / ${results.length} stocks`}
        </div>
      </div>

      <div className="card overflow-hidden">
        <table className="table-base">
          <thead><tr>
            <th>Symbol</th><th>Company</th><th className="text-right">Price</th>
            <th className="text-right">Change</th><th style={{ width: '160px' }}>AI Score</th>
            <th>Signal</th><th>Sector</th><th>Risk</th>
          </tr></thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.symbol}>
                <td><Link href={`/stockdetail/${r.symbol}`} className="font-bold text-[#00d4ff] hover:underline">{r.symbol}</Link></td>
                <td className="text-[#94a3b8] text-xs max-w-[140px] truncate">{r.name}</td>
                <td className="text-right font-mono text-sm">{formatCurrency(r.price)}</td>
                <td className="text-right font-mono text-sm" style={{ color: pnlColor(r.changePercent) }}>
                  {r.changePercent >= 0 ? '+' : ''}{formatPercent(r.changePercent)}
                </td>
                <td><AIScoreBar score={r.aiScore} /></td>
                <td><SignalBadge signal={r.signal} size="sm" /></td>
                <td className="text-xs text-[#94a3b8]">{r.sector}</td>
                <td className="text-xs font-medium" style={{ color: r.riskLevel === 'HIGH' ? '#ff4444' : r.riskLevel === 'MEDIUM' ? '#facc15' : '#4ade80' }}>{r.riskLevel}</td>
              </tr>
            ))}
            {filtered.length === 0 && !loading && (
              <tr><td colSpan={8} className="text-center text-[#475569] py-8">No stocks match your filters</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
