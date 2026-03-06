'use client'
import { useEffect, useState } from 'react'
import { useAnalyze } from '@/hooks/useAnalyze'
import { Input } from '@/components/ui/Input'
import { SignalBadge } from '@/components/market/SignalBadge'
import { AIScoreBar } from '@/components/market/AIScoreBar'
import { PriceChart } from '@/components/market/PriceChart'
import { VolumeChart } from '@/components/market/VolumeChart'
import { IndicatorPanel } from '@/components/market/IndicatorPanel'
import { FundamentalsPanel } from '@/components/market/FundamentalsPanel'
import { formatCurrency, formatPercent, pnlColor } from '@/lib/utils'
import type { CompositeScore } from '@/types/market'

export default function PickerPage() {
  const [stocks, setStocks] = useState<CompositeScore[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<string | null>(null)

  // Fetch all stocks on mount
  useEffect(() => {
    fetch('/api/market/screener')
      .then((r) => r.json())
      .then((j) => {
        setStocks(j.data ?? [])
        setLoading(false)
      })
  }, [])

  // Analyze selected stock for detailed view
  const { composite, candles, sma20, sma50, isLoading: analyzing } = useAnalyze(selected)

  // Filter stocks by search
  const filtered = stocks.filter((s) => {
    if (!search) return true
    const q = search.toUpperCase()
    return s.symbol.includes(q) || s.name.toUpperCase().includes(q)
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <h1 className="text-2xl font-bold text-[#f1f5f9]">AI Stock Picker</h1>
        <div className="w-64">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search symbol or company..."
          />
        </div>
        <div className="ml-auto text-sm text-[#94a3b8]">
          {loading ? 'Loading stocks...' : `${filtered.length} stocks`}
        </div>
      </div>

      {/* Selected stock detail panel */}
      {selected && (
        <div className="card p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold text-[#f1f5f9]">{selected}</h2>
              {composite && <SignalBadge signal={composite.signal} size="lg" />}
              {analyzing && <span className="text-sm text-[#475569]">Analyzing...</span>}
            </div>
            <button
              onClick={() => setSelected(null)}
              className="text-[#94a3b8] hover:text-[#f1f5f9] text-sm px-3 py-1 rounded border border-[#1e2d40] hover:border-[#334155] transition-colors"
            >
              Close
            </button>
          </div>

          {composite && (
            <div className="grid grid-cols-12 gap-4">
              {/* Left: Fundamentals */}
              <div className="col-span-12 lg:col-span-3 space-y-4">
                <div className="bg-[#070b14] rounded-lg p-4 border border-[#1e2d40]">
                  <div className="text-xs text-[#94a3b8] mb-1">{composite.name}</div>
                  <div className="text-xs text-[#475569]">{composite.sector}</div>
                  <div className="text-3xl font-bold text-[#f1f5f9] mt-2">{formatCurrency(composite.price)}</div>
                  <div className="text-sm font-medium mt-1" style={{ color: pnlColor(composite.change) }}>
                    {composite.change >= 0 ? '+' : ''}{formatCurrency(composite.change)} ({formatPercent(composite.changePercent)})
                  </div>
                </div>
                <FundamentalsPanel fa={composite.faIndicators} />
              </div>

              {/* Center: Charts + Score */}
              <div className="col-span-12 lg:col-span-6 space-y-4">
                <div className="bg-[#070b14] rounded-lg p-4 border border-[#1e2d40]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-[#94a3b8] uppercase tracking-wider">Price Chart (100 Days)</span>
                    <div className="flex items-center gap-3 text-xs text-[#475569]">
                      <span><span className="inline-block w-3 h-0.5 bg-[#00d4ff] mr-1" />SMA20</span>
                      <span><span className="inline-block w-3 h-0.5 bg-[#a855f7] mr-1" />SMA50</span>
                    </div>
                  </div>
                  <PriceChart candles={candles} sma20={sma20} sma50={sma50} height={250} />
                </div>
                <div className="bg-[#070b14] rounded-lg p-3 border border-[#1e2d40]">
                  <div className="text-xs text-[#94a3b8] mb-2 uppercase tracking-wider">Volume</div>
                  <VolumeChart candles={candles} height={70} />
                </div>
                <div className="bg-[#070b14] rounded-lg p-4 border border-[#1e2d40]">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-xs text-[#94a3b8] mb-1">AI Score</div>
                      <AIScoreBar score={composite.aiScore} />
                    </div>
                    <div>
                      <div className="text-xs text-[#94a3b8] mb-1">Technical (45%)</div>
                      <AIScoreBar score={composite.taScore} />
                    </div>
                    <div>
                      <div className="text-xs text-[#94a3b8] mb-1">Fundamental (40%)</div>
                      <AIScoreBar score={composite.faScore} />
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-[#1e2d40] text-xs text-[#94a3b8] leading-relaxed">
                    {composite.explanation}
                  </div>
                </div>
              </div>

              {/* Right: TA Indicators */}
              <div className="col-span-12 lg:col-span-3">
                <IndicatorPanel ta={composite.taIndicators} />
              </div>
            </div>
          )}
        </div>
      )}

      {/* All stocks grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {loading && Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="card p-4 animate-pulse">
            <div className="h-4 bg-[#1e2d40] rounded w-16 mb-2" />
            <div className="h-3 bg-[#1e2d40] rounded w-32 mb-3" />
            <div className="h-6 bg-[#1e2d40] rounded w-20" />
          </div>
        ))}

        {filtered.map((stock) => (
          <button
            key={stock.symbol}
            onClick={() => setSelected(stock.symbol === selected ? null : stock.symbol)}
            className={`card p-4 text-left transition-all hover:border-[#334155] hover:bg-[#111827] ${
              selected === stock.symbol ? 'border-[#00d4ff] bg-[#111827]' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-[#00d4ff] text-sm">{stock.symbol}</span>
              <SignalBadge signal={stock.signal} size="sm" />
            </div>
            <div className="text-xs text-[#94a3b8] truncate mb-2">{stock.name}</div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-bold text-[#f1f5f9] font-mono">{formatCurrency(stock.price)}</span>
              <span className="text-xs font-mono font-medium" style={{ color: pnlColor(stock.changePercent) }}>
                {stock.changePercent >= 0 ? '+' : ''}{formatPercent(stock.changePercent)}
              </span>
            </div>
            <AIScoreBar score={stock.aiScore} />
            <div className="flex items-center justify-between mt-2">
              <span className="text-[10px] text-[#475569]">{stock.sector}</span>
              <span
                className="text-[10px] font-medium"
                style={{ color: stock.riskLevel === 'HIGH' ? '#ff4444' : stock.riskLevel === 'MEDIUM' ? '#facc15' : '#4ade80' }}
              >
                {stock.riskLevel} RISK
              </span>
            </div>
          </button>
        ))}

        {!loading && filtered.length === 0 && (
          <div className="col-span-full card p-12 text-center text-[#475569]">
            No stocks match &ldquo;{search}&rdquo;
          </div>
        )}
      </div>
    </div>
  )
}
