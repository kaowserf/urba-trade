'use client'
import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export default function SettingsPage() {
  const [polygonKey, setPolygonKey] = useState('')
  const [webullKey, setWebullKey] = useState('')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    if (polygonKey) localStorage.setItem('ut_polygon_key', polygonKey)
    if (webullKey) localStorage.setItem('ut_webull_key', webullKey)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="text-2xl font-bold text-[#f1f5f9]">API &amp; Settings</h1>

      <div className="card p-6 space-y-4">
        <h2 className="text-sm font-semibold text-[#94a3b8] uppercase tracking-wider">Market Data APIs</h2>
        <div className="text-xs text-[#475569] bg-[#111827] rounded-lg p-3 border border-[#1e2d40]">
          The platform uses simulated data by default. Add API keys below to switch to live market data.
        </div>
        <Input label="Polygon.io API Key" type="password" value={polygonKey} onChange={(e) => setPolygonKey(e.target.value)} placeholder="Enter your Polygon.io API key" />
        <Input label="Webull App Key" type="password" value={webullKey} onChange={(e) => setWebullKey(e.target.value)} placeholder="Enter your Webull App key" />
        <Button onClick={handleSave} variant="primary">{saved ? 'Saved!' : 'Save API Keys'}</Button>
      </div>

      <div className="card p-6 space-y-4">
        <h2 className="text-sm font-semibold text-[#94a3b8] uppercase tracking-wider">Platform Info</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-[#94a3b8]">Version</span>
            <span className="text-[#f1f5f9]">1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#94a3b8]">Data Mode</span>
            <span className="text-[#00ff88]">Simulated (AI-Generated)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#94a3b8]">Stocks Universe</span>
            <span className="text-[#f1f5f9]">150+ symbols</span>
          </div>
        </div>
      </div>
    </div>
  )
}
