export interface OHLCV {
  timestamp: number
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export type SignalType = 'STRONG_BUY' | 'BUY' | 'HOLD' | 'SELL' | 'STRONG_SELL'
export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH'
export type SentimentTag = 'BULLISH' | 'BEARISH' | 'NEUTRAL'

export interface TAIndicators {
  rsi: number
  macd: number
  macdSignal: number
  macdHist: number
  sma20: number
  sma50: number
  bbPercent: number    // Bollinger %B
  adx: number
  stoch: number
  vwapDev: number      // VWAP deviation %
  volumeRatio: number
}

export interface TAResult {
  taScore: number
  indicators: TAIndicators
  sma20Series: number[]
  sma50Series: number[]
}

export interface FAIndicators {
  pe: number
  roe: number
  revenueGrowth: number
  profitMargin: number
  debtEquity: number
  epsGrowth: number
  dividendYield: number
}

export interface FAResult {
  faScore: number
  indicators: FAIndicators
}

export interface CompositeScore {
  symbol: string
  name: string
  sector: string
  price: number
  change: number
  changePercent: number
  aiScore: number
  taScore: number
  faScore: number
  sentimentScore: number
  signal: SignalType
  confidence: number
  riskLevel: RiskLevel
  taIndicators: TAIndicators
  faIndicators: FAIndicators
  explanation: string
}

export type IntradayMode = 'standard' | 'aggressive'
export type StrategyType = 'GAP_AND_GO' | 'VWAP_RECLAIM' | 'FADE' | 'RANGE_EXPANSION' | 'OPENING_BREAKOUT'
export type BiasType = 'Long' | 'Short'

export interface IntradaySetup {
  symbol: string
  company: string
  bias: BiasType
  entryPrice: number
  stopLoss: number
  target1: number
  target2?: number
  rrRatio: number
  confidence: number
  catalyst: string
  technicalSetup: string
  volumeProfile: string
  strategyType: StrategyType
  estimatedWinRate: number
  positionSizePct: string
  gap: number
  rvol: number
  atrPercent: number
  float: string
  mode: IntradayMode
}

export interface NewsItem {
  id: string
  symbol: string
  title: string
  summary: string
  source: string
  sentiment: SentimentTag
  sentimentScore: number
  publishedAt: number
  url: string
}

export interface StockProfile {
  symbol: string
  name: string
  sector: string
  industry: string
  basePrice: number
  volatility: number       // daily vol as decimal e.g. 0.02 = 2%
  floatSharesM: number     // float in millions
  avgVolume: number        // average daily volume
  pe?: number
  roe?: number
  revenueGrowthRate?: number
  profitMarginBase?: number
  debtEquityBase?: number
  epsGrowthRate?: number
  dividendYieldBase?: number
}

export interface FundamentalData {
  pe: number
  roe: number
  revenueGrowth: number
  profitMargin: number
  debtEquity: number
  epsGrowth: number
  dividendYield: number
  marketCap: number
  revenue: number
  eps: number
  bookValue: number
  freeCashFlow: number
}

export interface MarketOverview {
  sentiment: 'Bullish' | 'Bearish' | 'Mixed'
  spyBias: 'Bullish' | 'Bearish' | 'Neutral'
  volatilityRegime: 'High' | 'Moderate' | 'Low'
  macroDrivers: string[]
  generatedAt: string
  mode: string
}
