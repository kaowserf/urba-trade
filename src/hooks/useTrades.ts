'use client'
import useSWR from 'swr'
import type { Trade } from '@/types/trading'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function useTrades() {
  const { data, error, isLoading, mutate } = useSWR<{ data: Trade[] }>(
    '/api/trades',
    fetcher
  )

  async function createTrade(payload: {
    symbol: string
    direction: 'LONG' | 'SHORT'
    type?: 'MANUAL' | 'AUTO' | 'INTRADAY'
    quantity: number
    entryPrice: number
    stopLoss?: number
    takeProfit?: number
    strategy?: string
    notes?: string
  }) {
    const res = await fetch('/api/trades', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      throw new Error(body.error ?? 'Failed to create trade')
    }
    await mutate()
    return res.json()
  }

  return {
    trades: data?.data ?? [],
    isLoading,
    error,
    createTrade,
    refresh: mutate,
  }
}
