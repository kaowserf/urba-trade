'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Progress } from '@/components/ui/Progress'
import { SignalBadge } from '@/components/market/SignalBadge'
import { AIScoreBar } from '@/components/market/AIScoreBar'
import type { CompositeScore } from '@/types/market'
import { formatCurrency, formatPercent, pnlColor } from '@/lib/utils'
import Link from 'next/link'

const DEFAULT_SYMBOLS = 'AAPL,MSFT,NVDA,GOOGL,META,AMZN,TSLA,JPM,V,JNJ,UNH,LLY'

export default function ScannerPage() {
  const [input, setInput] = useState(DEFAULT_SYMBOLS)
  const [results, setResults] = useState<CompositeScore[]>([])
  const [isScanning, setIsScanning] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleScan = async () => {
    const symbols = input.split(/[\s,]+/).map((s) => s.trim().toUpperCase()).filter(Boolean).slice(0, 25)
    if (symbols.length === 0) return
    setIsScanning(true)
    setProgress(0)
    setResults([])

    const interval = setInterval(() => setProgress((p) => Math.min(p + 5, 90)), 150)
    try {
      const res = await fetch('/api/market/scan', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ symbols }) })
      const json = await res.json()
      setResults(json.data ?? [])
      setProgress(100)
    } finally {
      clearInterval(interval)
      setIsScanning(false)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#f1f5f9]">AI Scanner</h1>

      <div className="card p-4 space-y-3">
        <label className="text-xs text-[#94a3b8] font-medium">Enter symbols (comma or space separated, max 25)</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="input-base resize-none h-20 font-mono text-sm uppercase"
          placeholder="AAPL, MSFT, NVDA, GOOGL..."
        />
        <div className="flex items-center gap-4">
          <Button onClick={handleScan} disabled={isScanning} variant="primary">
            {isScanning ? 'Scanning...' : 'Run AI Scan'}
          </Button>
          {isScanning && <Progress value={progress} className="flex-1" />}
          {!isScanning && results.length > 0 && (
            <span className="text-sm text-[#94a3b8]">{results.length} results, sorted by AI Score</span>
          )}
        </div>
      </div>

      {results.length > 0 && (
        <div className="card overflow-hidden">
          <table className="table-base">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Company</th>
                <th className="text-right">Price</th>
                <th className="text-right">Change</th>
                <th style={{ width: '160px' }}>AI Score</th>
                <th>Signal</th>
                <th>Sector</th>
                <th>Risk</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr key={r.symbol}>
                  <td><Link href={`/stockdetail/${r.symbol}`} className="font-bold text-[#00d4ff] hover:underline">{r.symbol}</Link></td>
                  <td className="text-[#94a3b8] text-xs max-w-[140px] truncate">{r.name}</td>
                  <td className="text-right font-mono">{formatCurrency(r.price)}</td>
                  <td className="text-right font-mono" style={{ color: pnlColor(r.changePercent) }}>
                    {r.changePercent >= 0 ? '+' : ''}{formatPercent(r.changePercent)}
                  </td>
                  <td><AIScoreBar score={r.aiScore} /></td>
                  <td><SignalBadge signal={r.signal} size="sm" /></td>
                  <td className="text-xs text-[#94a3b8]">{r.sector}</td>
                  <td className="text-xs font-medium" style={{ color: r.riskLevel === 'HIGH' ? '#ff4444' : r.riskLevel === 'MEDIUM' ? '#facc15' : '#4ade80' }}>{r.riskLevel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
