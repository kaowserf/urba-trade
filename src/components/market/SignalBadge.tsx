import type { SignalType } from '@/types/market'
import { signalToLabel } from '@/lib/utils'
import { cn } from '@/lib/utils'

const BADGE_CLASS: Record<SignalType, string> = {
  STRONG_BUY: 'badge-strong-buy',
  BUY: 'badge-buy',
  HOLD: 'badge-hold',
  SELL: 'badge-sell',
  STRONG_SELL: 'badge-strong-sell',
}

interface SignalBadgeProps {
  signal: SignalType
  size?: 'sm' | 'md' | 'lg'
}

export function SignalBadge({ signal, size = 'md' }: SignalBadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center font-semibold rounded-full',
      BADGE_CLASS[signal],
      size === 'sm' && 'px-2 py-0.5 text-xs',
      size === 'md' && 'px-2.5 py-1 text-xs',
      size === 'lg' && 'px-3 py-1 text-sm',
    )}>
      {signalToLabel(signal)}
    </span>
  )
}
