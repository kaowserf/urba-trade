'use client'
import { LineChart, Line, ResponsiveContainer } from 'recharts'

export function Sparkline({ data, positive }: { data: number[]; positive: boolean }) {
  return (
    <ResponsiveContainer width={80} height={32}>
      <LineChart data={data.map((v) => ({ v }))}>
        <Line type="monotone" dataKey="v" stroke={positive ? '#4ade80' : '#ff4444'} strokeWidth={1.5} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}
