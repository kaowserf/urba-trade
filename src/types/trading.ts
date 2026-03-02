export interface Trade {
  id: string
  userId: string
  symbol: string
  direction: 'LONG' | 'SHORT'
  type: 'MANUAL' | 'AUTO' | 'INTRADAY'
  quantity: number
  entryPrice: number
  exitPrice?: number | null
  stopLoss?: number | null
  takeProfit?: number | null
  pnl?: number | null
  status: 'OPEN' | 'CLOSED' | 'CANCELLED'
  strategy?: string | null
  notes?: string | null
  openedAt: Date | string
  closedAt?: Date | string | null
  updatedAt: Date | string
}

export interface Position {
  id: string
  userId: string
  symbol: string
  quantity: number
  avgCost: number
  currentPrice: number
  openedAt: Date | string
  updatedAt: Date | string
}

export interface PortfolioSummary {
  totalValue: number
  totalCost: number
  unrealizedPnl: number
  unrealizedPnlPercent: number
  todayPnl: number
  positions: PositionWithPnl[]
  openTradeCount: number
}

export interface PositionWithPnl extends Position {
  marketValue: number
  unrealizedPnl: number
  unrealizedPnlPercent: number
}

export interface TradeStats {
  totalTrades: number
  winningTrades: number
  losingTrades: number
  winRate: number
  totalPnl: number
  avgPnl: number
  bestTrade: number
  worstTrade: number
}
