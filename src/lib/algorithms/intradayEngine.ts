import type { IntradaySetup, IntradayMode, StrategyType, OHLCV } from '@/types/market'
import { atr, vwap, volumeRatio } from './indicators'

export interface IntradayCandidate {
  symbol: string
  price: number
  open: number
  previousClose: number
  volume: number
  avgVolume: number
  floatShares: number
  candles: OHLCV[]  // historical daily candles
  intradayCandles?: OHLCV[]  // today's intraday candles
}

function calcGap(open: number, prevClose: number): number {
  if (prevClose === 0) return 0
  return ((open - prevClose) / prevClose) * 100
}

function calcRVOL(volume: number, avgVolume: number): number {
  if (avgVolume === 0) return 1
  return volume / avgVolume
}

function floatCategory(floatShares: number): string {
  if (floatShares < 10_000_000) return 'Micro Float'
  if (floatShares < 50_000_000) return 'Small Float'
  if (floatShares < 200_000_000) return 'Mid Float'
  return 'Large Float'
}

function classifyStrategy(
  gap: number,
  rvol: number,
  aiScore: number,
  atrPct: number,
  price: number,
  vwapVal: number
): StrategyType {
  if (gap >= 5 && rvol >= 1.5) return 'GAP_AND_GO'
  if (price < vwapVal && aiScore >= 60) return 'VWAP_RECLAIM'
  if (gap >= 8 && aiScore < 50) return 'FADE'
  if (atrPct >= 3) return 'RANGE_EXPANSION'
  return 'OPENING_BREAKOUT'
}

function estimateWinRate(strategy: StrategyType, rvol: number, gap: number): number {
  const base: Record<StrategyType, number> = {
    GAP_AND_GO: 62,
    VWAP_RECLAIM: 58,
    FADE: 55,
    RANGE_EXPANSION: 52,
    OPENING_BREAKOUT: 54,
  }
  let rate = base[strategy]
  if (rvol >= 2) rate += 5
  if (Math.abs(gap) >= 8) rate += 3
  return Math.min(75, rate)
}

function generateCatalyst(gap: number, rvol: number, strategy: StrategyType): string {
  if (gap >= 10) return 'Strong pre-market catalyst with high institutional interest'
  if (gap >= 5) return 'Pre-market breakout with above-average volume surge'
  if (strategy === 'VWAP_RECLAIM') return 'Potential VWAP reclaim setup on pullback'
  if (strategy === 'FADE') return 'Overextended gap with fade opportunity'
  if (rvol >= 2) return 'Unusual volume activity — possible news catalyst'
  return 'Technical breakout with volume confirmation'
}

function generateSetup(candidate: IntradayCandidate, strategy: StrategyType, gap: number, rvol: number, atrVal: number): string {
  const atrPct = (atrVal / candidate.price) * 100
  const map: Record<StrategyType, string> = {
    GAP_AND_GO: `Gap ${gap.toFixed(1)}% with RVOL ${rvol.toFixed(1)}x — buy above pre-market high for continuation`,
    VWAP_RECLAIM: `Price below VWAP, watching for reclaim — ATR ${atrPct.toFixed(1)}%`,
    FADE: `Overextended ${gap.toFixed(1)}% gap — short thesis on failed follow-through`,
    RANGE_EXPANSION: `ATR expansion ${atrPct.toFixed(1)}% — breakout from consolidation range`,
    OPENING_BREAKOUT: `Opening range breakout with ${rvol.toFixed(1)}x volume on ${atrPct.toFixed(1)}% ATR`,
  }
  return map[strategy]
}

function generateVolumeProfile(rvol: number, avgVolume: number): string {
  if (rvol >= 3) return `Massive volume surge (${rvol.toFixed(1)}x avg) — institutional interest`
  if (rvol >= 2) return `Strong above-average volume (${rvol.toFixed(1)}x avg)`
  if (rvol >= 1.5) return `Elevated volume (${rvol.toFixed(1)}x avg) confirms move`
  return `Moderate volume (${rvol.toFixed(1)}x avg) — watch for expansion`
}

/** Standard mode filters */
function passesStandard(candidate: IntradayCandidate, gap: number, rvol: number, atrPct: number): boolean {
  return (
    candidate.avgVolume >= 2_000_000 &&
    candidate.price >= 5 &&
    gap >= 2 && gap <= 12 &&
    rvol >= 1.3 &&
    atrPct >= 1.5
  )
}

/** Aggressive small-cap mode filters */
function passesAggressive(candidate: IntradayCandidate, gap: number, rvol: number, atrPct: number): boolean {
  return (
    candidate.price >= 2 && candidate.price <= 25 &&
    gap >= 8 &&
    rvol >= 2.0 &&
    atrPct >= 4
  )
}

export function generateSetups(candidate: IntradayCandidate, mode: IntradayMode): IntradaySetup | null {
  const candles = candidate.candles
  if (candles.length < 14) return null

  const atrVal = atr(candles, 14)
  const vwapVal = vwap(candles)
  const gap = calcGap(candidate.open, candidate.previousClose)
  const rvol = calcRVOL(candidate.volume, candidate.avgVolume)
  const atrPct = (atrVal / candidate.price) * 100

  const passes = mode === 'standard'
    ? passesStandard(candidate, gap, rvol, atrPct)
    : passesAggressive(candidate, gap, rvol, atrPct)

  if (!passes) return null

  // ATR-based levels: Risk = ATR × 0.5, Reward = ATR × 1.2
  const risk = atrVal * 0.5
  const reward = atrVal * 1.2
  const rrRatio = reward / risk  // typically ~2.4

  if (rrRatio < 2) return null  // enforce minimum R:R

  const isLong = gap >= 0 || rvol >= 2
  const entryPrice = candidate.price
  const stopLoss = isLong ? entryPrice - risk : entryPrice + risk
  const target1 = isLong ? entryPrice + reward : entryPrice - reward
  const target2 = isLong ? entryPrice + reward * 2 : entryPrice - reward * 2

  const aiScore = 50  // placeholder — actual aiScore fed from caller when available
  const strategy = classifyStrategy(gap, rvol, aiScore, atrPct, candidate.price, vwapVal)
  const winRate = estimateWinRate(strategy, rvol, gap)

  const confidence = Math.min(95,
    50 +
    (rvol >= 2 ? 15 : rvol >= 1.5 ? 8 : 0) +
    (Math.abs(gap) >= 8 ? 12 : gap >= 5 ? 7 : 0) +
    (atrPct >= 4 ? 10 : atrPct >= 2 ? 5 : 0)
  )

  const positionSizePct = mode === 'aggressive' ? '2-4%' : '1-2%'

  return {
    symbol: candidate.symbol,
    company: candidate.symbol,  // name injected by caller
    bias: isLong ? 'Long' : 'Short',
    entryPrice,
    stopLoss,
    target1,
    target2,
    rrRatio,
    confidence,
    catalyst: generateCatalyst(gap, rvol, strategy),
    technicalSetup: generateSetup(candidate, strategy, gap, rvol, atrVal),
    volumeProfile: generateVolumeProfile(rvol, candidate.avgVolume),
    strategyType: strategy,
    estimatedWinRate: winRate,
    positionSizePct,
    gap,
    rvol,
    atrPercent: atrPct,
    float: floatCategory(candidate.floatShares),
    mode,
  }
}
