import { notFound } from 'next/navigation'
import { getSymbolProfile } from '@/lib/algorithms/stockUniverse'
import { generateHistoricalCandles, generateFundamentals } from '@/lib/algorithms/dataSimulator'
import { generateSentimentScore } from '@/lib/algorithms/sentimentEngine'
import { computeTA } from '@/lib/algorithms/taEngine'
import { computeFA } from '@/lib/algorithms/faEngine'
import { computeComposite } from '@/lib/algorithms/compositeEngine'
import { SignalBadge } from '@/components/market/SignalBadge'
import { AIScoreBar } from '@/components/market/AIScoreBar'
import { FundamentalsPanel } from '@/components/market/FundamentalsPanel'
import { IndicatorPanel } from '@/components/market/IndicatorPanel'
import { formatCurrency, formatPercent, pnlColor, formatCompact } from '@/lib/utils'

export async function generateMetadata({ params }: { params: Promise<{ symbol: string }> }) {
  const { symbol } = await params
  const profile = getSymbolProfile(symbol.toUpperCase())
  return { title: profile ? `${profile.symbol} — ${profile.name}` : 'Stock Detail' }
}

export default async function StockDetailPage({ params }: { params: Promise<{ symbol: string }> }) {
  const { symbol } = await params
  const sym = symbol.toUpperCase()
  const profile = getSymbolProfile(sym)
  if (!profile) notFound()

  const candles = generateHistoricalCandles(profile, 200)
  const fundamentals = generateFundamentals(profile)
  const sentiment = generateSentimentScore(profile)
  const ta = computeTA(candles)
  const fa = computeFA(fundamentals)
  const last = candles[candles.length - 1]
  const prev = candles[candles.length - 2]
  const change = last.close - prev.close
  const changePercent = (change / prev.close) * 100

  const composite = computeComposite(sym, profile.name, last.close, change, changePercent, profile.sector, ta, fa, sentiment, profile.volatility)

  const stats = [
    { label: 'Open', value: formatCurrency(last.open) },
    { label: 'High', value: formatCurrency(last.high) },
    { label: 'Low', value: formatCurrency(last.low) },
    { label: 'Volume', value: formatCompact(last.volume) },
    { label: 'Avg Volume', value: formatCompact(profile.avgVolume) },
    { label: 'Float', value: `${profile.floatSharesM.toFixed(0)}M` },
    { label: 'Market Cap', value: formatCompact(fundamentals.marketCap) },
    { label: 'Revenue', value: formatCompact(fundamentals.revenue) },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-3xl font-bold text-[#f1f5f9]">{sym}</h1>
            <SignalBadge signal={composite.signal} size="lg" />
          </div>
          <p className="text-[#94a3b8] mt-1">{profile.name} · {profile.sector} · {profile.industry}</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-[#f1f5f9]">{formatCurrency(last.close)}</div>
          <div className="text-sm font-medium mt-1" style={{ color: pnlColor(change) }}>
            {change >= 0 ? '+' : ''}{formatCurrency(change)} ({formatPercent(changePercent)})
          </div>
        </div>
      </div>

      {/* AI Score row */}
      <div className="card p-4 grid grid-cols-3 gap-6">
        <div>
          <div className="text-xs text-[#94a3b8] mb-2">AI Score (Composite)</div>
          <AIScoreBar score={composite.aiScore} />
        </div>
        <div>
          <div className="text-xs text-[#94a3b8] mb-2">Technical (45%)</div>
          <AIScoreBar score={composite.taScore} />
        </div>
        <div>
          <div className="text-xs text-[#94a3b8] mb-2">Fundamental (40%)</div>
          <AIScoreBar score={composite.faScore} />
        </div>
      </div>

      {/* Stats + Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card p-4">
          <h2 className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wider mb-3">Market Stats</h2>
          <div className="grid grid-cols-2 gap-2">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-xs text-[#475569]">{s.label}</div>
                <div className="text-sm font-mono text-[#f1f5f9]">{s.value}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-1">
          <IndicatorPanel ta={composite.taIndicators} />
        </div>
        <div className="lg:col-span-1">
          <FundamentalsPanel fa={composite.faIndicators} />
        </div>
      </div>

      {/* AI Explanation */}
      <div className="card p-4">
        <h2 className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wider mb-2">AI Analysis</h2>
        <p className="text-sm text-[#94a3b8] leading-relaxed">{composite.explanation}</p>
        <div className="mt-2 text-xs text-[#475569]">Confidence: {composite.confidence.toFixed(0)}% · Risk: {composite.riskLevel}</div>
      </div>
    </div>
  )
}
