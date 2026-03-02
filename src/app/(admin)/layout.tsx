import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import type { AuthUser } from '@/types/auth'
import { SignOutButton } from '@/components/layout/SignOutButton'

const ADMIN_NAV = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/users', label: 'Users' },
  { href: '/admin/analytics', label: 'Analytics' },
  { href: '/admin/billing', label: 'Billing' },
  { href: '/admin/strategies', label: 'AI Strategies' },
  { href: '/admin/signals', label: 'Signals' },
  { href: '/admin/auto-trading', label: 'Auto-Trading' },
  { href: '/admin/intraday', label: 'Intraday Monitor' },
  { href: '/admin/ai-config', label: 'AI Config' },
  { href: '/admin/health', label: 'System Health' },
  { href: '/admin/audit', label: 'Audit Logs' },
  { href: '/admin/settings', label: 'Settings' },
]

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user) redirect('/auth/login')
  if ((session.user as AuthUser).role !== 'ADMIN') redirect('/dashboard')

  return (
    <div className="flex h-screen bg-[#070b14] overflow-hidden">
      <aside className="w-52 flex flex-col bg-[#0d1421] border-r border-[#1e2d40] flex-shrink-0">
        <div className="px-4 py-4 border-b border-[#1e2d40]">
          <div className="text-sm font-bold text-[#a855f7]">Admin Panel</div>
          <div className="text-xs text-[#475569]">UrbaTrade</div>
        </div>
        <nav className="flex-1 py-3 overflow-y-auto">
          {ADMIN_NAV.map((item) => (
            <Link key={item.href} href={item.href} className="nav-item text-xs">{item.label}</Link>
          ))}
        </nav>
        <div className="p-4 border-t border-[#1e2d40]">
          <Link href="/dashboard" className="text-xs text-[#475569] hover:text-[#94a3b8]">← App</Link>
        </div>
      </aside>
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="h-12 flex items-center justify-between px-6 bg-[#0d1421] border-b border-[#1e2d40]">
          <span className="text-sm text-[#a855f7] font-medium">Admin Dashboard</span>
          <SignOutButton />
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
