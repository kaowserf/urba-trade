import type { OHLCV, TAResult, TAIndicators } from '@/types/market'
import { rsi, macd, bollingerBPercent, adx, stochastic, vwapDeviation, volumeRatio, sma } from './indicators'
import { clamp } from '@/lib/utils'

function scoreRSI(value: number): number {
  if (value >= 70) return 15   // overbought
  if (value >= 60) return 65
  if (value >= 50) return 80
  if (value >= 40) return 60
  if (value >= 30) return 35
  return 20                     // oversold
}

function scoreMACDHist(hist: number, price: number): number {
  const relHist = (hist / price) * 100
  if (relHist > 0.5) return 90
  if (relHist > 0.1) return 75
  if (relHist > 0) return 60
  if (relHist > -0.1) return 45
  if (relHist > -0.5) return 25
  return 15
}

function scoreBBPercent(bb: number): number {
  if (bb > 1) return 85      // above upper band = strong momentum
  if (bb > 0.8) return 70
  if (bb > 0.5) return 60
  if (bb > 0.2) return 50
  if (bb > 0) return 40
  return 20                   // below lower band = oversold
}

function scoreADX(value: number): number {
  if (value >= 50) return 85  // very strong trend
  if (value >= 35) return 72
  if (value >= 25) return 60
  if (value >= 20) return 50
  return 35                   // weak trend / ranging
}

function scoreStoch(value: number): number {
  if (value >= 80) return 20   // overbought
  if (value >= 60) return 55
  if (value >= 40) return 70
  if (value >= 20) return 60
  return 80                    // oversold (contrarian bullish)
}

function scoreVWAPDev(dev: number): number {
  if (dev > 3) return 20       // far above VWAP = extended
  if (dev > 1) return 60
  if (dev > 0) return 75
  if (dev > -1) return 65
  if (dev > -3) return 45
  return 30
}

function scoreVolRatio(ratio: number): number {
  if (ratio >= 3) return 90
  if (ratio >= 2) return 80
  if (ratio >= 1.5) return 70
  if (ratio >= 1) return 55
  if (ratio >= 0.7) return 40
  return 25
}

function scoreSMATrend(price: number, sma20: number, sma50: number): number {
  if (price > sma20 && sma20 > sma50) return 85   // strong uptrend
  if (price > sma20 && sma20 <= sma50) return 65
  if (price > sma50 && price <= sma20) return 55
  if (price < sma20 && price > sma50) return 45
  if (price < sma20 && sma20 < sma50) return 25   // strong downtrend
  return 40
}

export function computeTA(candles: OHLCV[]): TAResult {
  const closes = candles.map((c) => c.close)
  const last = candles[candles.length - 1]
  const price = last.close

  const rsiVal = rsi(closes, 14)
  const macdResult = macd(closes, 12, 26, 9)
  const bbPct = bollingerBPercent(closes, 20, 2)
  const adxVal = adx(candles, 14)
  const stochVal = stochastic(candles, 14)
  const vwapDev = vwapDeviation(candles)
  const volRatio = volumeRatio(candles)
  const sma20Series = sma(closes, 20)
  const sma50Series = sma(closes, 50)
  const sma20 = sma20Series[sma20Series.length - 1] ?? price
  const sma50 = sma50Series[sma50Series.length - 1] ?? price

  const indicators: TAIndicators = {
    rsi: rsiVal,
    macd: macdResult.macd,
    macdSignal: macdResult.signal,
    macdHist: macdResult.histogram,
    sma20,
    sma50,
    bbPercent: bbPct,
    adx: adxVal,
    stoch: stochVal,
    vwapDev,
    volumeRatio: volRatio,
  }

  // Weighted scoring (weights sum to 1.0)
  const scores = {
    rsi: { score: scoreRSI(rsiVal), weight: 0.15 },
    macd: { score: scoreMACDHist(macdResult.histogram, price), weight: 0.18 },
    bb: { score: scoreBBPercent(bbPct), weight: 0.12 },
    adx: { score: scoreADX(adxVal), weight: 0.12 },
    stoch: { score: scoreStoch(stochVal), weight: 0.10 },
    vwap: { score: scoreVWAPDev(vwapDev), weight: 0.13 },
    volume: { score: scoreVolRatio(volRatio), weight: 0.10 },
    smaTrend: { score: scoreSMATrend(price, sma20, sma50), weight: 0.10 },
  }

  const taScore = clamp(
    Object.values(scores).reduce((sum, { score, weight }) => sum + score * weight, 0),
    0,
    100
  )

  return {
    taScore,
    indicators,
    sma20Series,
    sma50Series,
  }
}
