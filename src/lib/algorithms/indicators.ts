import type { OHLCV } from '@/types/market'

/** Simple Moving Average */
export function sma(data: number[], period: number): number[] {
  const result: number[] = []
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) { result.push(NaN); continue }
    let sum = 0
    for (let j = i - period + 1; j <= i; j++) sum += data[j]
    result.push(sum / period)
  }
  return result
}

/** Exponential Moving Average */
export function ema(data: number[], period: number): number[] {
  const k = 2 / (period + 1)
  const result: number[] = []
  let prev = data[0]
  for (let i = 0; i < data.length; i++) {
    if (i === 0) { result.push(data[0]); prev = data[0]; continue }
    prev = data[i] * k + prev * (1 - k)
    result.push(prev)
  }
  return result
}

/** RSI (Relative Strength Index) */
export function rsi(data: number[], period = 14): number {
  if (data.length < period + 1) return 50
  let gains = 0, losses = 0
  for (let i = data.length - period; i < data.length; i++) {
    const diff = data[i] - data[i - 1]
    if (diff > 0) gains += diff
    else losses -= diff
  }
  const avgGain = gains / period
  const avgLoss = losses / period
  if (avgLoss === 0) return 100
  const rs = avgGain / avgLoss
  return 100 - 100 / (1 + rs)
}

/** MACD (Moving Average Convergence/Divergence) */
export function macd(
  data: number[],
  fast = 12,
  slow = 26,
  signal = 9
): { macd: number; signal: number; histogram: number } {
  const fastEma = ema(data, fast)
  const slowEma = ema(data, slow)
  const macdLine = fastEma.map((v, i) => v - slowEma[i])
  const signalLine = ema(macdLine.filter((v) => !isNaN(v)), signal)
  const lastMacd = macdLine[macdLine.length - 1]
  const lastSignal = signalLine[signalLine.length - 1]
  return {
    macd: lastMacd,
    signal: lastSignal,
    histogram: lastMacd - lastSignal,
  }
}

/** Bollinger Bands %B */
export function bollingerBPercent(data: number[], period = 20, stdDev = 2): number {
  if (data.length < period) return 0.5
  const slice = data.slice(-period)
  const mean = slice.reduce((s, v) => s + v, 0) / period
  const variance = slice.reduce((s, v) => s + (v - mean) ** 2, 0) / period
  const std = Math.sqrt(variance)
  const upper = mean + stdDev * std
  const lower = mean - stdDev * std
  const last = data[data.length - 1]
  if (upper === lower) return 0.5
  return (last - lower) / (upper - lower)
}

/** ADX (Average Directional Index) */
export function adx(candles: OHLCV[], period = 14): number {
  if (candles.length < period + 1) return 25
  const trueRanges: number[] = []
  const plusDMs: number[] = []
  const minusDMs: number[] = []

  for (let i = 1; i < candles.length; i++) {
    const c = candles[i], p = candles[i - 1]
    const tr = Math.max(c.high - c.low, Math.abs(c.high - p.close), Math.abs(c.low - p.close))
    const plusDM = c.high - p.high > p.low - c.low ? Math.max(c.high - p.high, 0) : 0
    const minusDM = p.low - c.low > c.high - p.high ? Math.max(p.low - c.low, 0) : 0
    trueRanges.push(tr)
    plusDMs.push(plusDM)
    minusDMs.push(minusDM)
  }

  const smoothTR = trueRanges.slice(-period).reduce((s, v) => s + v, 0)
  const smoothPDM = plusDMs.slice(-period).reduce((s, v) => s + v, 0)
  const smoothMDM = minusDMs.slice(-period).reduce((s, v) => s + v, 0)

  if (smoothTR === 0) return 25
  const pdi = (smoothPDM / smoothTR) * 100
  const mdi = (smoothMDM / smoothTR) * 100
  const dx = Math.abs(pdi - mdi) / (pdi + mdi) * 100
  return dx
}

/** Stochastic %K */
export function stochastic(candles: OHLCV[], period = 14): number {
  if (candles.length < period) return 50
  const slice = candles.slice(-period)
  const highestHigh = Math.max(...slice.map((c) => c.high))
  const lowestLow = Math.min(...slice.map((c) => c.low))
  const last = candles[candles.length - 1].close
  if (highestHigh === lowestLow) return 50
  return ((last - lowestLow) / (highestHigh - lowestLow)) * 100
}

/** VWAP Deviation % */
export function vwapDeviation(candles: OHLCV[]): number {
  if (candles.length === 0) return 0
  const slice = candles.slice(-20)
  let sumPV = 0, sumV = 0
  for (const c of slice) {
    const typicalPrice = (c.high + c.low + c.close) / 3
    sumPV += typicalPrice * c.volume
    sumV += c.volume
  }
  if (sumV === 0) return 0
  const vwap = sumPV / sumV
  const last = candles[candles.length - 1].close
  return ((last - vwap) / vwap) * 100
}

/** Volume Ratio (current vs 20-day avg) */
export function volumeRatio(candles: OHLCV[]): number {
  if (candles.length < 21) return 1
  const avg = candles.slice(-21, -1).reduce((s, c) => s + c.volume, 0) / 20
  if (avg === 0) return 1
  return candles[candles.length - 1].volume / avg
}

/** ATR (Average True Range) */
export function atr(candles: OHLCV[], period = 14): number {
  if (candles.length < period + 1) return candles[candles.length - 1].high - candles[candles.length - 1].low
  let trSum = 0
  for (let i = candles.length - period; i < candles.length; i++) {
    const c = candles[i], p = candles[i - 1]
    const tr = Math.max(c.high - c.low, Math.abs(c.high - p.close), Math.abs(c.low - p.close))
    trSum += tr
  }
  return trSum / period
}

/** VWAP value */
export function vwap(candles: OHLCV[]): number {
  const slice = candles.slice(-20)
  let sumPV = 0, sumV = 0
  for (const c of slice) {
    const tp = (c.high + c.low + c.close) / 3
    sumPV += tp * c.volume
    sumV += c.volume
  }
  return sumV === 0 ? candles[candles.length - 1].close : sumPV / sumV
}
