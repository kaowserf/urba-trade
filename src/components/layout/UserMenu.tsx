'use client'
import { signOut } from 'next-auth/react'
import { LogOut, ChevronDown, User, Shield } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import type { AuthUser } from '@/types/auth'
import { Avatar } from '@/components/ui/Avatar'

export function UserMenu({ user }: { user: AuthUser }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const tierColor =
    user.tier === 'ENTERPRISE' ? '#a855f7' : user.tier === 'PRO' ? '#00d4ff' : '#94a3b8'
  const tierClass =
    user.tier === 'ENTERPRISE' ? 'badge-enterprise' : user.tier === 'PRO' ? 'badge-pro' : 'badge-free'

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSignOut = async () => {
    setLoading(true)
    setOpen(false)
    await signOut({ callbackUrl: '/' })
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-[#1e2d40]/60 transition-colors"
      >
        <Avatar email={user.email} name={user.name} size={28} tierColor={tierColor} />
        {/* Name */}
        <div className="hidden sm:flex flex-col items-start leading-tight">
          <span className="text-xs font-medium text-[#e2e8f0] max-w-[100px] truncate">
            {user.name ?? user.email}
          </span>
          <span className={`text-[10px] font-semibold ${tierClass}`} style={{ color: tierColor }}>
            {user.tier}
          </span>
        </div>
        <ChevronDown
          size={12}
          className={`text-[#475569] transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-[#1e2d40] bg-[#0d1421] shadow-xl shadow-black/40 z-50 overflow-hidden">
          {/* User info header */}
          <div className="px-4 py-3 border-b border-[#1e2d40]">
            <div className="flex items-center gap-2.5">
              <Avatar email={user.email} name={user.name} size={42} tierColor={tierColor} />
              <div className="min-w-0">
                {user.name && (
                  <p className="text-sm font-semibold text-[#f1f5f9] truncate">{user.name}</p>
                )}
                <p className="text-xs text-[#475569] truncate">{user.email}</p>
              </div>
            </div>
            <div className="mt-2.5 flex items-center gap-1.5">
              {user.role === 'ADMIN' ? (
                <Shield size={11} className="text-[#a855f7]" />
              ) : (
                <User size={11} className="text-[#475569]" />
              )}
              <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${tierClass}`}
                style={{ color: tierColor, background: `${tierColor}18` }}>
                {user.tier} plan
              </span>
              {user.role === 'ADMIN' && (
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full text-[#a855f7]"
                  style={{ background: '#a855f718' }}>
                  Admin
                </span>
              )}
            </div>
          </div>

          {/* Sign out */}
          <div className="p-2">
            <button
              onClick={handleSignOut}
              disabled={loading}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[#94a3b8] hover:bg-[#ff4444]/10 hover:text-[#ff4444] transition-colors disabled:opacity-50"
            >
              <LogOut size={14} />
              {loading ? 'Signing out…' : 'Sign out'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
