import type { NewsItem, SentimentTag } from '@/types/market'
import type { StockProfile } from '@/types/market'

function mulberry32(seed: number) {
  return function () {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed)
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t
    return ((t ^ t >>> 14) >>> 0) / 4294967296
  }
}

function makeSeed(symbol: string, index: number): number {
  const str = new Date().toDateString() + symbol + 'news' + index
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (Math.imul(31, hash) + str.charCodeAt(i)) | 0
  }
  return Math.abs(hash) || 1
}

const SOURCES = ['Bloomberg', 'Reuters', 'WSJ', 'CNBC', 'MarketWatch', 'Barron\'s', 'Financial Times', 'Seeking Alpha', 'Benzinga', 'The Motley Fool']

const BULLISH_TEMPLATES = [
  (sym: string, name: string) => ({ title: `${name} Reports Record Quarterly Revenue, Beats Estimates`, summary: `${sym} delivered stronger-than-expected results with revenue surpassing analyst forecasts. Management raised full-year guidance.` }),
  (sym: string, name: string) => ({ title: `${name} Announces Major Partnership Deal`, summary: `${sym} has entered into a strategic partnership that is expected to expand its addressable market significantly.` }),
  (sym: string, name: string) => ({ title: `Analysts Upgrade ${sym} to Buy, Raise Price Target`, summary: `Multiple Wall Street firms raised their outlook on ${name} citing improving fundamentals and strong growth prospects.` }),
  (sym: string, name: string) => ({ title: `${name} Launches Innovative Product Line`, summary: `${sym} unveiled a new product line that has generated significant industry buzz and strong pre-order demand.` }),
  (sym: string, name: string) => ({ title: `${sym} Buyback Program Signals Management Confidence`, summary: `${name} announced a $2B share repurchase program, signaling management's confidence in the company's valuation.` }),
]

const BEARISH_TEMPLATES = [
  (sym: string, name: string) => ({ title: `${name} Misses Earnings, Cuts Guidance`, summary: `${sym} reported earnings below expectations and lowered its full-year outlook, citing macroeconomic headwinds.` }),
  (sym: string, name: string) => ({ title: `${sym} Faces Regulatory Scrutiny`, summary: `Regulators opened an investigation into ${name}'s business practices, adding uncertainty to the stock's outlook.` }),
  (sym: string, name: string) => ({ title: `Analysts Downgrade ${sym} on Margin Concerns`, summary: `Several analysts reduced their rating on ${name} as margin pressure and competition intensify in the sector.` }),
  (sym: string, name: string) => ({ title: `${name} CFO Resignation Sparks Concern`, summary: `The sudden departure of ${sym}'s CFO has raised questions about internal financial management practices.` }),
  (sym: string, name: string) => ({ title: `${sym} Loses Key Contract Worth $500M`, summary: `${name} disclosed the loss of a major contract, which analysts estimate could reduce annual revenue by 8-12%.` }),
]

const NEUTRAL_TEMPLATES = [
  (sym: string, name: string) => ({ title: `${name} to Present at Industry Conference`, summary: `${sym} management will give a strategic overview at the upcoming sector conference, which may provide insights into future direction.` }),
  (sym: string, name: string) => ({ title: `${sym} Completes Acquisition of Tech Startup`, summary: `${name} finalized its acquisition, which is expected to be immaterial to earnings in the near term.` }),
  (sym: string, name: string) => ({ title: `${name} Announces New Board Member Appointment`, summary: `${sym} welcomed a new independent director with extensive industry experience to its board.` }),
  (sym: string, name: string) => ({ title: `${sym} Maintains Full-Year Guidance`, summary: `${name} reaffirmed its annual targets, citing stable demand environment and steady operational execution.` }),
]

export function generateNews(profile: StockProfile, count = 8): NewsItem[] {
  const items: NewsItem[] = []
  const allTemplates = { BULLISH: BULLISH_TEMPLATES, BEARISH: BEARISH_TEMPLATES, NEUTRAL: NEUTRAL_TEMPLATES }

  for (let i = 0; i < count; i++) {
    const rand = mulberry32(makeSeed(profile.symbol, i))
    const r = rand()
    let sentiment: SentimentTag
    let template: (sym: string, name: string) => { title: string; summary: string }

    if (r < 0.45) {
      sentiment = 'BULLISH'
      template = BULLISH_TEMPLATES[Math.floor(rand() * BULLISH_TEMPLATES.length)]
    } else if (r < 0.75) {
      sentiment = 'BEARISH'
      template = BEARISH_TEMPLATES[Math.floor(rand() * BEARISH_TEMPLATES.length)]
    } else {
      sentiment = 'NEUTRAL'
      template = NEUTRAL_TEMPLATES[Math.floor(rand() * NEUTRAL_TEMPLATES.length)]
    }

    const { title, summary } = template(profile.symbol, profile.name)
    const sentimentScore = sentiment === 'BULLISH' ? 0.6 + rand() * 0.35
      : sentiment === 'BEARISH' ? rand() * 0.35
      : 0.4 + rand() * 0.2

    const hoursAgo = Math.floor(rand() * 72)
    const source = SOURCES[Math.floor(rand() * SOURCES.length)]

    items.push({
      id: `${profile.symbol}-news-${i}`,
      symbol: profile.symbol,
      title,
      summary,
      source,
      sentiment,
      sentimentScore,
      publishedAt: Date.now() - hoursAgo * 3600000,
      url: '#',
    })
  }

  return items.sort((a, b) => b.publishedAt - a.publishedAt)
}

export function generateMarketNews(profiles: StockProfile[], totalCount = 30): NewsItem[] {
  const all: NewsItem[] = []
  for (const profile of profiles) {
    const count = Math.ceil(totalCount / profiles.length)
    all.push(...generateNews(profile, count))
  }
  return all.sort((a, b) => b.publishedAt - a.publishedAt).slice(0, totalCount)
}
