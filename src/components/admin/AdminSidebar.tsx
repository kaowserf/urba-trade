'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavItem = {
  href: string
  label: string
  exact?: boolean
  count?: string
  countColor?: string
  icon: React.ReactNode
}

const NAV: { section: string; items: NavItem[] }[] = [
  {
    section: 'Overview',
    items: [
      { href: '/admin', label: 'Dashboard', exact: true, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg> },
      { href: '/admin/analytics', label: 'Analytics', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> },
    ],
  },
  {
    section: 'Management',
    items: [
      { href: '/admin/users', label: 'User Management', count: '14.8K', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
      { href: '/admin/billing', label: 'Subscriptions & Billing', count: '3.2K', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg> },
      { href: '/admin/strategies', label: 'AI Strategy Management', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> },
    ],
  },
  {
    section: 'Monitoring',
    items: [
      { href: '/admin/signals', label: 'Signals & AI Models', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
      { href: '/admin/api-management', label: 'API Management', count: '2', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> },
      { href: '/admin/auto-trading', label: 'Auto-Trading Monitor', countColor: 'green', count: 'Live', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> },
      { href: '/admin/intraday', label: 'Intraday Monitor', countColor: 'cyan', count: 'New', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
      { href: '/admin/ai-config', label: 'AI Insights Config', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> },
    ],
  },
  {
    section: 'System',
    items: [
      { href: '/admin/content', label: 'Content & News', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> },
      { href: '/admin/health', label: 'System Health', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg> },
      { href: '/admin/audit', label: 'Audit Logs', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="14" y2="12"/><line x1="4" y1="18" x2="18" y2="18"/></svg> },
      { href: '/admin/settings', label: 'Settings', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.26.604.852.997 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> },
    ],
  },
]

const COUNT_STYLES: Record<string, React.CSSProperties> = {
  green: { background: 'var(--adm-green-bg)', color: 'var(--adm-green)' },
  cyan:  { background: 'var(--adm-cyan-bg)',  color: 'var(--adm-cyan)' },
}

export default function AdminSidebar() {
  const pathname = usePathname()

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <nav
      style={{
        width: 240,
        background: 'var(--adm-bg1)',
        borderRight: '1px solid var(--adm-border)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0, left: 0, bottom: 0,
        zIndex: 50,
      }}
    >
      {/* Header */}
      <div style={{ padding: '20px', borderBottom: '1px solid var(--adm-border)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg,#1d4ed8,#2563eb)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
          </svg>
        </div>
        <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.02em' }}>
          UrbaTrade
          <span style={{ fontSize: 9, background: 'var(--adm-accent-bg)', color: 'var(--adm-accent2)', padding: '2px 6px', borderRadius: 4, fontWeight: 600, marginLeft: 6 }}>ADMIN</span>
        </span>
      </div>

      {/* Nav */}
      <div style={{ flex: 1, padding: '4px 8px', overflowY: 'auto' }}>
        {NAV.map((group) => (
          <div key={group.section}>
            <div style={{ padding: '16px 12px 8px', fontSize: 10, color: 'var(--adm-text3)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
              {group.section}
            </div>
            {group.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={'adm-sidebar-link' + (isActive(item.href, item.exact) ? ' active' : '')}
              >
                {item.icon}
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.count && (
                  <span style={{
                    fontSize: 11,
                    padding: '1px 7px',
                    borderRadius: 10,
                    fontWeight: 600,
                    ...(item.countColor ? COUNT_STYLES[item.countColor] : { background: 'var(--adm-bg3)', color: 'var(--adm-text2)' }),
                  }}>
                    {item.count}
                  </span>
                )}
              </Link>
            ))}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ padding: 12, borderTop: '1px solid var(--adm-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 4 }}>
          <div className="adm-avatar" style={{ background: 'linear-gradient(135deg,#1d4ed8,#2563eb)', color: '#fff' }}>SA</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 13, fontWeight: 600 }}>Super Admin</p>
            <p style={{ fontSize: 11, color: 'var(--adm-text3)' }}>admin@urbatrade.com</p>
          </div>
        </div>
      </div>
    </nav>
  )
}
