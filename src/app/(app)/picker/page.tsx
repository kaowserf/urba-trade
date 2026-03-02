'use client'
import { useState } from 'react'
import { useAnalyze } from '@/hooks/useAnalyze'
import { useDebounce } from '@/hooks/useDebounce'
import { Input } from '@/components/ui/Input'
import { SignalBadge } from '@/components/market/SignalBadge'
import { AIScoreBar } from '@/components/market/AIScoreBar'
import { PriceChart } from '@/components/market/PriceChart'
import { VolumeChart } from '@/components/market/VolumeChart'
import { IndicatorPanel } from '@/components/market/IndicatorPanel'
import { FundamentalsPanel } from '@/components/market/FundamentalsPanel'
import { formatCurrency, formatPercent, pnlColor } from '@/lib/utils'

export default function PickerPage() {
  const [input, setInput] = useState('AAPL')
  const symbol = useDebounce(input.toUpperCase().trim(), 600)
  const { composite, candles, sma20, sma50, isLoading, isError } = useAnalyze(symbol.length >= 1 ? symbol : null)

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <h1 className="text-2xl font-bold text-[#f1f5f9]">AI Stock Picker</h1>
        <div className="w-36">
          <Input value={input} onChange={(e) => setInput(e.target.value.toUpperCase())} placeholder="AAPL" maxLength={5} className="uppercase font-mono" />
        </div>
        {composite && <SignalBadge signal={composite.signal} size="lg" />}
        {isLoading && <span className="text-sm text-[#475569]">Analyzing...</span>}
        {isError && <span className="text-sm text-[#ff4444]">Symbol not found</span>}
      </div>

      {composite && (
        <div className="grid grid-cols-12 gap-4">
          {/* Left: Fundamentals */}
          <div className="col-span-12 lg:col-span-3 space-y-4">
            <div className="card p-4">
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
            <div className="card p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-[#94a3b8] uppercase tracking-wider">Price Chart (100 Days)</span>
                <div className="flex items-center gap-3 text-xs text-[#475569]">
                  <span><span className="inline-block w-3 h-0.5 bg-[#00d4ff] mr-1" />SMA20</span>
                  <span><span className="inline-block w-3 h-0.5 bg-[#a855f7] mr-1" />SMA50</span>
                </div>
              </div>
              <PriceChart candles={candles} sma20={sma20} sma50={sma50} height={250} />
            </div>
            <div className="card p-3">
              <div className="text-xs text-[#94a3b8] mb-2 uppercase tracking-wider">Volume</div>
              <VolumeChart candles={candles} height={70} />
            </div>
            <div className="card p-4">
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

      {!composite && !isLoading && (
        <div className="card p-12 text-center text-[#475569]">Enter a stock symbol above to analyze it</div>
      )}
    </div>
  )
}
