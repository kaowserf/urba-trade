'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Progress } from '@/components/ui/Progress'
import { SetupCard } from '@/components/intraday/SetupCard'
import type { IntradaySetup } from '@/types/market'

export default function IntradayPage() {
  const [mode, setMode] = useState<'standard' | 'aggressive'>('standard')
  const [setups, setSetups] = useState<IntradaySetup[]>([])
  const [isScanning, setIsScanning] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleScan = async () => {
    setIsScanning(true)
    setProgress(0)
    setSetups([])
    const interval = setInterval(() => setProgress((p) => Math.min(p + 6, 90)), 200)
    try {
      const res = await fetch('/api/market/intraday', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mode }) })
      const json = await res.json()
      setSetups(json.data ?? [])
      setProgress(100)
    } finally {
      clearInterval(interval)
      setIsScanning(false)
    }
  }

  const modeInfo = {
    standard: { label: 'Standard', desc: 'Vol≥2M, Price≥$5, Gap 2-12%, RVOL≥1.3x, Max 5 positions' },
    aggressive: { label: 'Aggressive Small-Cap', desc: 'Price $2-25, Gap≥8%, RVOL≥2x, ATR≥4%, Max 3 positions' },
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#f1f5f9]">Intraday Scanner</h1>
        <p className="text-sm text-[#94a3b8] mt-1">{modeInfo[mode].desc}</p>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex rounded-lg overflow-hidden border border-[#1e2d40]">
          {(['standard', 'aggressive'] as const).map((m) => (
            <button key={m} onClick={() => setMode(m)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${mode === m ? 'bg-[#00ff88]/10 text-[#00ff88]' : 'bg-[#0d1421] text-[#94a3b8] hover:text-[#f1f5f9]'}`}>
              {modeInfo[m].label}
            </button>
          ))}
        </div>
        <Button onClick={handleScan} disabled={isScanning} variant="primary">
          {isScanning ? 'Scanning Market...' : 'Run Intraday Scan'}
        </Button>
        {isScanning && <Progress value={progress} className="w-48" />}
        {!isScanning && setups.length > 0 && <span className="text-sm text-[#94a3b8]">{setups.length} setups found</span>}
      </div>

      {setups.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {setups.map((setup) => <SetupCard key={setup.symbol} setup={setup} />)}
        </div>
      )}

      {!isScanning && setups.length === 0 && (
        <div className="card p-16 text-center text-[#475569]">
          Run a scan to find intraday setups matching {modeInfo[mode].label} criteria
        </div>
      )}
    </div>
  )
}
