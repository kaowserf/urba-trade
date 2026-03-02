'use client'
import { signOut } from 'next-auth/react'
import { LogOut } from 'lucide-react'
import { useState } from 'react'

export function SignOutButton({ className }: { className?: string }) {
  const [loading, setLoading] = useState(false)

  const handleSignOut = async () => {
    setLoading(true)
    await signOut({ callbackUrl: '/' })
  }

  return (
    <button
      onClick={handleSignOut}
      disabled={loading}
      className={`flex items-center gap-1.5 text-xs text-[#475569] hover:text-[#ff4444] transition-colors disabled:opacity-50 ${className ?? ''}`}
    >
      <LogOut size={13} />
      {loading ? 'Signing out…' : 'Sign out'}
    </button>
  )
}
