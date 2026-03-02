import useSWR from 'swr'
import type { CompositeScore, OHLCV, FundamentalData } from '@/types/market'

const fetcher = (url: string) => fetch(url).then((r) => {
  if (!r.ok) throw new Error('Fetch failed')
  return r.json()
})

interface AnalyzeResult {
  data: CompositeScore
  candles: OHLCV[]
  fundamentals: FundamentalData
  sma20: number[]
  sma50: number[]
}

export function useAnalyze(symbol: string | null) {
  const { data, error, isLoading } = useSWR<{ data: AnalyzeResult }>(
    symbol ? `/api/market/analyze/${symbol}` : null,
    fetcher,
    { revalidateOnFocus: false, dedupingInterval: 60_000 }
  )
  return {
    composite: data?.data?.data ?? null,
    candles: data?.data?.candles ?? [],
    fundamentals: data?.data?.fundamentals ?? null,
    sma20: data?.data?.sma20 ?? [],
    sma50: data?.data?.sma50 ?? [],
    isLoading,
    isError: !!error,
  }
}
