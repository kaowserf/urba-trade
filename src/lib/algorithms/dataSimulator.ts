import type { OHLCV, FundamentalData } from '@/types/market'
import type { StockProfile } from '@/types/market'

/** Mulberry32 PRNG — deterministic, fast */
function mulberry32(seed: number) {
  return function () {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed)
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t
    return ((t ^ t >>> 14) >>> 0) / 4294967296
  }
}

/** Stable seed from symbol + calendar date */
function makeSeed(symbol: string, dayOffset = 0): number {
  const today = new Date()
  today.setDate(today.getDate() + dayOffset)
  const dateStr = today.toDateString() + symbol
  let hash = 0
  for (let i = 0; i < dateStr.length; i++) {
    hash = (Math.imul(31, hash) + dateStr.charCodeAt(i)) | 0
  }
  return Math.abs(hash) || 1
}

/** Generate deterministic historical OHLCV candles */
export function generateHistoricalCandles(profile: StockProfile, count = 200): OHLCV[] {
  const rand = mulberry32(makeSeed(profile.symbol, -count))
  const candles: OHLCV[] = []
  let price = profile.basePrice * (0.85 + rand() * 0.3)
  const now = Date.now()
  const MS_PER_DAY = 86400000

  for (let i = count - 1; i >= 0; i--) {
    const drift = (rand() - 0.48) * profile.volatility
    const dailyVol = profile.volatility * (0.5 + rand() * 1.5)

    const open = price * (1 + (rand() - 0.5) * dailyVol * 0.3)
    const close = price * (1 + drift + (rand() - 0.5) * dailyVol)
    const high = Math.max(open, close) * (1 + rand() * dailyVol * 0.5)
    const low = Math.min(open, close) * (1 - rand() * dailyVol * 0.5)
    const volume = Math.round(profile.avgVolume * (0.5 + rand() * 1.5))

    candles.push({
      timestamp: now - i * MS_PER_DAY,
      open: Math.max(0.01, open),
      high: Math.max(0.01, high),
      low: Math.max(0.01, low),
      close: Math.max(0.01, close),
      volume,
    })

    price = Math.max(0.01, close)
  }

  return candles
}

/** Generate intraday candles (5-min bars) */
export function generateIntradayCandles(profile: StockProfile, minuteInterval = 5): OHLCV[] {
  const rand = mulberry32(makeSeed(profile.symbol))
  const candles: OHLCV[] = []
  const dailyCandles = generateHistoricalCandles(profile, 2)
  let price = dailyCandles[dailyCandles.length - 1].close

  const marketOpen = new Date()
  marketOpen.setHours(9, 30, 0, 0)
  const barsPerDay = (6.5 * 60) / minuteInterval // 6.5 trading hours

  for (let i = 0; i < barsPerDay; i++) {
    const intradayVol = profile.volatility * 0.3 * (1 + rand() * 2)
    const drift = (rand() - 0.49) * intradayVol
    const open = price * (1 + (rand() - 0.5) * intradayVol * 0.2)
    const close = open * (1 + drift)
    const high = Math.max(open, close) * (1 + rand() * intradayVol * 0.3)
    const low = Math.min(open, close) * (1 - rand() * intradayVol * 0.3)
    const volume = Math.round((profile.avgVolume / barsPerDay) * (0.3 + rand() * 2))
    const timestamp = marketOpen.getTime() + i * minuteInterval * 60000

    candles.push({
      timestamp,
      open: Math.max(0.01, open),
      high: Math.max(0.01, high),
      low: Math.max(0.01, low),
      close: Math.max(0.01, close),
      volume,
    })

    price = Math.max(0.01, close)
  }

  return candles
}

/** Generate fundamental data within realistic ranges for the profile */
export function generateFundamentals(profile: StockProfile): FundamentalData {
  const rand = mulberry32(makeSeed(profile.symbol + 'fa'))
  const jitter = (base: number, pct: number) => base * (1 + (rand() - 0.5) * pct)

  const pe = profile.pe ? jitter(profile.pe, 0.3) : 0
  const roe = profile.roe ? jitter(profile.roe, 0.25) : 0
  const revenueGrowth = profile.revenueGrowthRate !== undefined
    ? jitter(profile.revenueGrowthRate, 0.2) : rand() * 0.2 - 0.05
  const profitMargin = profile.profitMarginBase !== undefined
    ? jitter(profile.profitMarginBase, 0.3) : rand() * 0.15
  const debtEquity = profile.debtEquityBase !== undefined
    ? Math.max(0, jitter(profile.debtEquityBase, 0.2)) : rand() * 2
  const epsGrowth = profile.epsGrowthRate !== undefined
    ? jitter(profile.epsGrowthRate, 0.25) : rand() * 0.3 - 0.1
  const dividendYield = profile.dividendYieldBase !== undefined
    ? Math.max(0, jitter(profile.dividendYieldBase, 0.1)) : 0

  const price = generateHistoricalCandles(profile, 2).pop()?.close ?? profile.basePrice
  const eps = pe > 0 ? price / pe : (rand() - 0.5) * 5
  const revenue = profile.avgVolume * price * 0.001 * (0.5 + rand())
  const marketCap = price * profile.floatSharesM * 1_000_000
  const bookValue = pe > 0 && roe !== 0 ? (price / pe) / (roe / 100) : price * 0.5
  const freeCashFlow = revenue * profitMargin * (0.7 + rand() * 0.6)

  return {
    pe,
    roe,
    revenueGrowth,
    profitMargin,
    debtEquity,
    epsGrowth,
    dividendYield,
    marketCap,
    revenue,
    eps,
    bookValue,
    freeCashFlow,
  }
}
