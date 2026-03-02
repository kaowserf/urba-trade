'use client'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import type { OHLCV } from '@/types/market'

export function VolumeChart({ candles, height = 80 }: { candles: OHLCV[]; height?: number }) {
  const data = candles.slice(-60).map((c) => ({
    date: new Date(c.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    volume: c.volume,
    isUp: c.close >= c.open,
  }))
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <XAxis dataKey="date" hide />
        <YAxis hide />
        <Tooltip contentStyle={{ backgroundColor: '#0d1421', border: '1px solid #1e2d40', borderRadius: '8px', color: '#f1f5f9', fontSize: '12px' }} formatter={(v: unknown) => [Number(v).toLocaleString(), 'Volume']} />
        <Bar dataKey="volume" radius={[2, 2, 0, 0]}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.isUp ? 'rgba(0,255,136,0.5)' : 'rgba(255,68,68,0.5)'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
