'use client'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import type { OHLCV } from '@/types/market'

interface PriceChartProps {
  candles: OHLCV[]
  sma20?: number[]
  sma50?: number[]
  height?: number
}

export function PriceChart({ candles, sma20, sma50, height = 280 }: PriceChartProps) {
  const data = candles.map((c, i) => ({
    date: new Date(c.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    price: parseFloat(c.close.toFixed(2)),
    sma20: sma20?.[i] != null && !isNaN(sma20[i]) ? parseFloat(sma20[i].toFixed(2)) : undefined,
    sma50: sma50?.[i] != null && !isNaN(sma50[i]) ? parseFloat(sma50[i].toFixed(2)) : undefined,
  }))

  const firstPrice = data[0]?.price ?? 0
  const lastPrice = data[data.length - 1]?.price ?? 0
  const lineColor = lastPrice >= firstPrice ? '#00ff88' : '#ff4444'

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e2d40" vertical={false} />
        <XAxis dataKey="date" stroke="#475569" tick={{ fontSize: 10, fill: '#475569' }} tickLine={false} interval="preserveStartEnd" />
        <YAxis stroke="#475569" tick={{ fontSize: 10, fill: '#475569' }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} domain={['auto', 'auto']} width={55} />
        <Tooltip contentStyle={{ backgroundColor: '#0d1421', border: '1px solid #1e2d40', borderRadius: '8px', color: '#f1f5f9', fontSize: '12px' }} formatter={(v: unknown) => [`${Number(v).toFixed(2)}`, 'Price']} />
        <Line type="monotone" dataKey="price" stroke={lineColor} strokeWidth={2} dot={false} activeDot={{ r: 3, fill: lineColor }} />
        {sma20 && <Line type="monotone" dataKey="sma20" stroke="#00d4ff" strokeWidth={1} dot={false} strokeDasharray="4 2" />}
        {sma50 && <Line type="monotone" dataKey="sma50" stroke="#a855f7" strokeWidth={1} dot={false} strokeDasharray="4 2" />}
      </LineChart>
    </ResponsiveContainer>
  )
}
