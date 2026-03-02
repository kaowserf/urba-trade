'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type TradingMode = 'MANUAL' | 'AUTO'
export type AutoRiskLevel = 'CONSERVATIVE' | 'BALANCED' | 'AGGRESSIVE'

interface TradeLogEntry {
  id: string
  symbol: string
  direction: 'LONG' | 'SHORT'
  quantity: number
  entryPrice: number
  type: 'AUTO' | 'INTRADAY'
  timestamp: number
  pnl?: number
}

interface TradeState {
  tradingMode: TradingMode
  autoRiskLevel: AutoRiskLevel
  // legacy aliases kept for backward compat
  autoTradeEnabled: boolean
  autoTradeMode: AutoRiskLevel
  tradeLog: TradeLogEntry[]
  setTradingMode: (m: TradingMode) => void
  setAutoRiskLevel: (l: AutoRiskLevel) => void
  setAutoTradeEnabled: (v: boolean) => void
  setAutoTradeMode: (m: AutoRiskLevel) => void
  addTradeLog: (entry: TradeLogEntry) => void
  clearTradeLog: () => void
}

export const useTradeStore = create<TradeState>()(
  persist(
    (set) => ({
      tradingMode: 'MANUAL',
      autoRiskLevel: 'BALANCED',
      autoTradeEnabled: false,
      autoTradeMode: 'BALANCED',
      tradeLog: [],
      setTradingMode: (m) =>
        set({ tradingMode: m, autoTradeEnabled: m === 'AUTO' }),
      setAutoRiskLevel: (l) =>
        set({ autoRiskLevel: l, autoTradeMode: l }),
      setAutoTradeEnabled: (v) =>
        set({ autoTradeEnabled: v, tradingMode: v ? 'AUTO' : 'MANUAL' }),
      setAutoTradeMode: (m) =>
        set({ autoTradeMode: m, autoRiskLevel: m }),
      addTradeLog: (entry) =>
        set((s) => ({ tradeLog: [entry, ...s.tradeLog].slice(0, 50) })),
      clearTradeLog: () => set({ tradeLog: [] }),
    }),
    { name: 'ut_trades' }
  )
)
