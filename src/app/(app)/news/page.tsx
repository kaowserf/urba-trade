import { STOCK_UNIVERSE } from '@/lib/algorithms/stockUniverse'
import { generateMarketNews } from '@/lib/algorithms/newsSimulator'
import type { SentimentTag } from '@/types/market'

export const metadata = { title: 'News' }

const SENT_CONFIG: Record<SentimentTag, { label: string; color: string }> = {
  BULLISH: { label: 'Bullish', color: '#4ade80' },
  BEARISH: { label: 'Bearish', color: '#ff4444' },
  NEUTRAL: { label: 'Neutral', color: '#94a3b8' },
}

export default function NewsPage() {
  const top30 = STOCK_UNIVERSE.slice(0, 30)
  const news = generateMarketNews(top30, 30)

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-[#f1f5f9]">Market News</h1>
      <div className="space-y-3">
        {news.map((item) => {
          const sent = SENT_CONFIG[item.sentiment]
          const hoursAgo = Math.round((Date.now() - item.publishedAt) / 3600000)
          return (
            <div key={item.id} className="card card-hover p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-xs font-bold text-[#00d4ff]">{item.symbol}</span>
                    <span className="text-xs px-1.5 py-0.5 rounded-full font-medium" style={{ color: sent.color, background: `${sent.color}15` }}>{sent.label}</span>
                    <span className="text-xs text-[#475569]">{item.source}</span>
                    <span className="text-xs text-[#475569]">{hoursAgo}h ago</span>
                  </div>
                  <h3 className="text-sm font-medium text-[#f1f5f9] mb-1">{item.title}</h3>
                  <p className="text-xs text-[#94a3b8] leading-relaxed">{item.summary}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
