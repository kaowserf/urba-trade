import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import type { AuthUser } from '@/types/auth'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminUserMenu from '@/components/admin/AdminUserMenu'
import { Outfit, JetBrains_Mono } from 'next/font/google'

const outfit = Outfit({ subsets: ['latin'], display: 'swap' })
const jetbrains = JetBrains_Mono({ subsets: ['latin'], display: 'swap', variable: '--adm-font-mono' })

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user) redirect('/auth/login')
  if ((session.user as AuthUser).role !== 'ADMIN') redirect('/dashboard')

  return (
    <div className={`admin-shell ${outfit.className} ${jetbrains.variable}`} style={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar />

      {/* Main */}
      <div style={{ flex: 1, marginLeft: 240, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Topbar */}
        <header style={{
          height: 56,
          borderBottom: '1px solid var(--adm-border)',
          background: 'rgba(9,9,11,0.85)',
          backdropFilter: 'blur(16px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 28px',
          position: 'sticky',
          top: 0,
          zIndex: 40,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <h2 style={{ fontSize: 15, fontWeight: 700 }}>Admin Panel</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ position: 'relative' }}>
              <input
                className="adm-input"
                placeholder="Search..."
                style={{ width: 200, paddingLeft: 34, fontSize: 13 }}
              />
              <svg style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, stroke: 'var(--adm-text3)', fill: 'none', pointerEvents: 'none' }} viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </div>
            <button className="adm-btn-ghost adm-btn-sm adm-btn" style={{ padding: '7px 9px', position: 'relative' }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <span style={{ position: 'absolute', top: 4, right: 5, width: 7, height: 7, background: 'var(--adm-red)', borderRadius: '50%', border: '2px solid var(--adm-bg)' }} />
            </button>
            <AdminUserMenu
              name={session.user.name}
              email={session.user.email}
              role={(session.user as AuthUser).role}
            />
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, padding: 28, overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  )
}
