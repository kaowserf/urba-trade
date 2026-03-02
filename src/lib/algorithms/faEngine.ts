import type { FundamentalData, FAResult, FAIndicators } from '@/types/market'
import { clamp } from '@/lib/utils'

function scorePE(pe: number): number {
  if (pe <= 0) return 30       // negative earnings
  if (pe < 10) return 80       // very cheap
  if (pe < 20) return 72
  if (pe < 30) return 62
  if (pe < 50) return 50
  if (pe < 80) return 38
  return 25                    // very expensive
}

function scoreROE(roe: number): number {
  if (roe >= 40) return 92
  if (roe >= 25) return 82
  if (roe >= 15) return 70
  if (roe >= 10) return 58
  if (roe >= 0) return 42
  return 20                    // negative ROE
}

function scoreRevenueGrowth(growth: number): number {
  if (growth >= 0.5) return 92
  if (growth >= 0.25) return 82
  if (growth >= 0.15) return 72
  if (growth >= 0.08) return 62
  if (growth >= 0) return 48
  if (growth >= -0.1) return 38
  return 22
}

function scoreProfitMargin(margin: number): number {
  if (margin >= 0.4) return 92
  if (margin >= 0.25) return 82
  if (margin >= 0.15) return 72
  if (margin >= 0.08) return 60
  if (margin >= 0) return 45
  if (margin >= -0.2) return 30
  return 15
}

function scoreDebtEquity(de: number): number {
  if (de < 0) return 50        // negative equity
  if (de === 0) return 88
  if (de < 0.3) return 82
  if (de < 0.7) return 72
  if (de < 1.5) return 60
  if (de < 3) return 45
  return 28
}

function scoreEPSGrowth(growth: number): number {
  if (growth >= 1.0) return 92
  if (growth >= 0.5) return 82
  if (growth >= 0.2) return 72
  if (growth >= 0.1) return 62
  if (growth >= 0) return 50
  if (growth >= -0.2) return 35
  return 20
}

function scoreDividendYield(yield_: number): number {
  // Growth stocks: no dividend is fine
  if (yield_ === 0) return 55
  if (yield_ > 0 && yield_ < 0.01) return 58
  if (yield_ < 0.02) return 62
  if (yield_ < 0.04) return 70
  if (yield_ < 0.06) return 65
  return 55                    // very high yield may indicate distress
}

export function computeFA(fundamentals: FundamentalData): FAResult {
  const indicators: FAIndicators = {
    pe: fundamentals.pe,
    roe: fundamentals.roe,
    revenueGrowth: fundamentals.revenueGrowth,
    profitMargin: fundamentals.profitMargin,
    debtEquity: fundamentals.debtEquity,
    epsGrowth: fundamentals.epsGrowth,
    dividendYield: fundamentals.dividendYield,
  }

  // Weighted scoring (weights sum to 1.0)
  const scores = {
    pe: { score: scorePE(fundamentals.pe), weight: 0.18 },
    roe: { score: scoreROE(fundamentals.roe), weight: 0.18 },
    revenueGrowth: { score: scoreRevenueGrowth(fundamentals.revenueGrowth), weight: 0.20 },
    profitMargin: { score: scoreProfitMargin(fundamentals.profitMargin), weight: 0.18 },
    debtEquity: { score: scoreDebtEquity(fundamentals.debtEquity), weight: 0.12 },
    epsGrowth: { score: scoreEPSGrowth(fundamentals.epsGrowth), weight: 0.08 },
    dividendYield: { score: scoreDividendYield(fundamentals.dividendYield), weight: 0.06 },
  }

  const faScore = clamp(
    Object.values(scores).reduce((sum, { score, weight }) => sum + score * weight, 0),
    0,
    100
  )

  return { faScore, indicators }
}
