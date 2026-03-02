'use client'
import useSWR from 'swr'
import type { PortfolioSummary } from '@/types/trading'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function usePortfolio() {
  const { data, error, isLoading, mutate } = useSWR<{ data: PortfolioSummary }>(
    '/api/trades/positions',
    fetcher,
    { refreshInterval: 30_000 }
  )

  return {
    portfolio: data?.data ?? null,
    isLoading,
    error,
    refresh: mutate,
  }
}
