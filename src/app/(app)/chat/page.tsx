'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { SignalBadge } from '@/components/market/SignalBadge'
import { AIScoreBar } from '@/components/market/AIScoreBar'
import { formatCurrency, formatPercent, pnlColor } from '@/lib/utils'
import type { CompositeScore } from '@/types/market'

interface Message {
  role: 'user' | 'assistant'
  text: string
  data?: CompositeScore
}

function extractSymbol(text: string): string | null {
  const tickers = text.match(/\b[A-Z]{1,5}\b/g)
  return tickers?.[0] ?? null
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: 'Hello! I\'m the UrbaTrade AI. Ask me about any stock — e.g., "Analyze AAPL" or "What do you think about NVDA?"' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    const text = input.trim()
    if (!text) return
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', text }])
    setLoading(true)

    const symbol = extractSymbol(text.toUpperCase())
    if (symbol) {
      try {
        const res = await fetch(`/api/market/analyze/${symbol}`)
        const json = await res.json()
        if (json.success) {
          const d: CompositeScore = json.data.data
          const reply = `Here's my analysis of **${d.symbol}** (${d.name}):\n\n${d.explanation}\n\nAI Score: ${d.aiScore.toFixed(0)}/100 | Signal: ${d.signal.replace('_', ' ')}`
          setMessages((prev) => [...prev, { role: 'assistant', text: reply, data: d }])
        } else {
          setMessages((prev) => [...prev, { role: 'assistant', text: `I couldn't find data for ${symbol}. Please check the ticker symbol.` }])
        }
      } catch {
        setMessages((prev) => [...prev, { role: 'assistant', text: 'Sorry, I encountered an error. Please try again.' }])
      }
    } else {
      setMessages((prev) => [...prev, { role: 'assistant', text: 'Please mention a stock ticker (e.g., AAPL, MSFT) in your question and I\'ll analyze it for you.' }])
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-[#f1f5f9] mb-4">AI Chat</h1>
      <div className="card flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-xl px-4 py-2.5 text-sm ${msg.role === 'user' ? 'bg-[#00d4ff]/10 text-[#f1f5f9] border border-[#00d4ff]/20' : 'bg-[#111827] text-[#94a3b8]'}`}>
                <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>
                {msg.data && (
                  <div className="mt-3 pt-3 border-t border-[#1e2d40] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[#f1f5f9] font-bold">{formatCurrency(msg.data.price)}</span>
                      <span style={{ color: pnlColor(msg.data.changePercent) }}>{msg.data.changePercent >= 0 ? '+' : ''}{formatPercent(msg.data.changePercent)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <SignalBadge signal={msg.data.signal} size="sm" />
                    </div>
                    <AIScoreBar score={msg.data.aiScore} />
                  </div>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-[#111827] rounded-xl px-4 py-2.5 text-sm text-[#475569]">Analyzing...</div>
            </div>
          )}
        </div>
        <div className="p-4 border-t border-[#1e2d40] flex gap-2">
          <Input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Ask about a stock: 'Analyze NVDA'" className="flex-1" />
          <Button onClick={handleSend} disabled={loading || !input.trim()} variant="primary">Send</Button>
        </div>
      </div>
    </div>
  )
}
