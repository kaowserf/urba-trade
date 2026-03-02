'use client'
import { useState } from 'react'
import { signIn, getSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import type { AuthUser } from '@/types/auth'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const result = await signIn('credentials', { email, password, redirect: false })
    if (result?.error) {
      setError('Invalid email or password')
      setLoading(false)
    } else {
      const session = await getSession()
      const role = (session?.user as unknown as AuthUser)?.role
      router.push(role === 'ADMIN' ? '/admin' : '/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-[#070b14] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="UrbaTrade" className="h-12 w-auto mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[#f1f5f9]">Welcome back</h1>
          <p className="text-sm text-[#94a3b8] mt-1">Sign in to UrbaTrade</p>
        </div>

        <form onSubmit={handleSubmit} className="card p-6 space-y-4">
          {error && <div className="text-xs text-[#ff4444] bg-[#ff4444]/10 border border-[#ff4444]/20 rounded-lg px-3 py-2">{error}</div>}
          <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
          <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
          <Button type="submit" variant="primary" disabled={loading} className="w-full">
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <p className="text-center text-sm text-[#475569] mt-4">
          No account?{' '}
          <Link href="/auth/register" className="text-[#00d4ff] hover:underline">Create one free</Link>
        </p>
      </div>
    </div>
  )
}
