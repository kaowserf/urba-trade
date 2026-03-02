'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useUIStore } from '@/store/useUIStore'
import { cn } from '@/lib/utils'
import {
  Home, LayoutDashboard, Cpu, Search, SlidersHorizontal, Zap, BarChart2,
  Newspaper, MessageCircle, Settings, ChevronLeft, ChevronRight
} from 'lucide-react'

const NAV_ITEMS = [
  { href: '/dashboard',  label: 'Dashboard',       Icon: LayoutDashboard },
  { href: '/picker',     label: 'AI Stock Picker',  Icon: Cpu },
  { href: '/scanner',    label: 'AI Scanner',       Icon: Search },
  { href: '/screener',   label: 'Screener',         Icon: SlidersHorizontal },
  { href: '/intraday',   label: 'Intraday',         Icon: Zap },
  { href: '/strategies', label: 'Strategies',       Icon: BarChart2 },
  { href: '/news',       label: 'News',             Icon: Newspaper },
  { href: '/chat',       label: 'AI Chat',          Icon: MessageCircle },
  { href: '/settings',   label: 'Settings',         Icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const { sidebarCollapsed, toggleSidebar } = useUIStore()

  return (
    <aside className={cn(
      'flex flex-col bg-[#0d1421] border-r border-[#1e2d40] transition-all duration-300 flex-shrink-0',
      sidebarCollapsed ? 'w-16' : 'w-60'
    )}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-[#1e2d40] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="UrbaTrade" className="w-8 h-8 flex-shrink-0 object-contain" />
        {!sidebarCollapsed && <span className="text-lg font-bold text-[#f1f5f9] tracking-tight whitespace-nowrap">UrbaTrade</span>}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 overflow-y-auto overflow-x-hidden">
        {NAV_ITEMS.map(({ href, label, Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link key={href} href={href} className={cn('nav-item', isActive && 'active')}>
              <Icon size={18} className="flex-shrink-0" />
              {!sidebarCollapsed && <span className="truncate">{label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Home link */}
      <Link href="/" className="nav-item mx-2 mb-1 border-t border-[#1e2d40] pt-3 mt-1">
        <Home size={18} className="flex-shrink-0" />
        {!sidebarCollapsed && <span className="truncate">Home</span>}
      </Link>

      {/* Collapse toggle */}
      <button
        onClick={toggleSidebar}
        className="flex items-center justify-center p-4 border-t border-[#1e2d40] text-[#475569] hover:text-[#94a3b8] transition-colors"
      >
        {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
    </aside>
  )
}
