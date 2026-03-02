'use client'

import { useState, useRef, useEffect } from 'react'
import { signOut } from 'next-auth/react'

interface Props {
  name?: string | null
  email?: string | null
  role?: string | null
}

function initials(name?: string | null, email?: string | null) {
  if (name) {
    const parts = name.trim().split(' ')
    return parts.length >= 2
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : parts[0].slice(0, 2).toUpperCase()
  }
  if (email) return email.slice(0, 2).toUpperCase()
  return 'SA'
}

export default function AdminUserMenu({ name, email, role }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const abbr = initials(name, email)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: 34, height: 34, borderRadius: '50%',
          background: 'linear-gradient(135deg,#1d4ed8,#2563eb)',
          color: '#fff', border: 'none', cursor: 'pointer',
          fontSize: 11, fontWeight: 700, letterSpacing: '0.02em',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'box-shadow 0.15s',
          boxShadow: open ? '0 0 0 2px #3b82f6' : 'none',
        }}
      >
        {abbr}
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)', right: 0,
          width: 220, background: 'var(--adm-bg2)',
          border: '1px solid var(--adm-border2)',
          borderRadius: 12, padding: 6,
          boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
          zIndex: 100,
          animation: 'adm-fadein 0.12s ease',
        }}>
          {/* User info header */}
          <div style={{ padding: '10px 12px 12px', borderBottom: '1px solid var(--adm-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{
                width: 38, height: 38, borderRadius: '50%',
                background: 'linear-gradient(135deg,#1d4ed8,#2563eb)',
                color: '#fff', fontSize: 13, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                {abbr}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {name ?? 'Super Admin'}
                </p>
                <p style={{ fontSize: 11, color: 'var(--adm-text3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {email ?? 'admin@urbatrade.com'}
                </p>
              </div>
            </div>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
              background: 'var(--adm-accent-bg)', color: 'var(--adm-accent2)',
              padding: '2px 8px', borderRadius: 6,
            }}>
              ⬡ {role ?? 'ADMIN'}
            </span>
          </div>

          {/* Menu items */}
          <div style={{ padding: '4px 0' }}>
            <MenuItem
              icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>}
              label="View Profile"
            />
            <MenuItem
              icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06A1.65 1.65 0 0 0 15 19.4a1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.26.604.852.997 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>}
              label="Settings"
              href="/admin/settings"
            />
          </div>

          {/* Divider + Logout */}
          <div style={{ borderTop: '1px solid var(--adm-border)', padding: '4px 0 2px' }}>
            <button
              onClick={() => signOut({ callbackUrl: '/auth/login' })}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                padding: '8px 12px', borderRadius: 8, border: 'none',
                background: 'transparent', cursor: 'pointer',
                color: 'var(--adm-red)', fontSize: 13, fontWeight: 500,
                transition: 'background 0.12s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--adm-red-bg)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function MenuItem({ icon, label, href }: { icon: React.ReactNode; label: string; href?: string }) {
  const base: React.CSSProperties = {
    width: '100%', display: 'flex', alignItems: 'center', gap: 10,
    padding: '8px 12px', borderRadius: 8, border: 'none',
    background: 'transparent', cursor: 'pointer',
    color: 'var(--adm-text2)', fontSize: 13, fontWeight: 500,
    textDecoration: 'none', transition: 'background 0.12s',
  }
  const iconWrap = (
    <span style={{ width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <span style={{ display: 'block', width: 16, height: 16 }}>{icon}</span>
    </span>
  )
  if (href) return (
    <a href={href} style={base}
      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
    >{iconWrap}{label}</a>
  )
  return (
    <button style={base}
      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
    >{iconWrap}{label}</button>
  )
}
