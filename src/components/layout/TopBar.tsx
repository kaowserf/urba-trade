import type { AuthUser } from '@/types/auth'
import { UserMenu } from '@/components/layout/UserMenu'
import { TradingModeToggle } from '@/components/layout/TradingModeToggle'

export function TopBar({ user }: { user: AuthUser }) {
  return (
    <header className="h-14 flex items-center justify-between px-6 bg-[#0d1421] border-b border-[#1e2d40] flex-shrink-0">
      {/* Left — live indicator */}
      <div className="flex items-center gap-2">
        <div className="live-dot" />
        <span className="text-xs text-[#475569]">Live</span>
      </div>

      {/* Center — trading mode toggle */}
      <TradingModeToggle />

      {/* Right — user menu */}
      <UserMenu user={user} />
    </header>
  )
}
