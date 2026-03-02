'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })
      const json = await res.json()
      if (!res.ok) { setError(json.error ?? 'Registration failed'); setLoading(false); return }
      await signIn('credentials', { email, password, redirect: false })
      router.push('/dashboard')
    } catch {
      setError('Something went wrong')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#070b14] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="UrbaTrade" className="h-12 w-auto mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[#f1f5f9]">Create account</h1>
          <p className="text-sm text-[#94a3b8] mt-1">Start trading with AI for free</p>
        </div>

        <form onSubmit={handleSubmit} className="card p-6 space-y-4">
          {error && <div className="text-xs text-[#ff4444] bg-[#ff4444]/10 border border-[#ff4444]/20 rounded-lg px-3 py-2">{error}</div>}
          <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
          <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
          <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min 8 characters" required minLength={8} />
          <Button type="submit" variant="primary" disabled={loading} className="w-full">
            {loading ? 'Creating account...' : 'Create Account'}
          </Button>
        </form>

        <p className="text-center text-sm text-[#475569] mt-4">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-[#00d4ff] hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
