import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info'
  className?: string
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
      variant === 'success' && 'bg-[#4ade80]/10 text-[#4ade80] border border-[#4ade80]/30',
      variant === 'warning' && 'bg-[#facc15]/10 text-[#facc15] border border-[#facc15]/30',
      variant === 'danger' && 'bg-[#ff4444]/10 text-[#ff4444] border border-[#ff4444]/30',
      variant === 'info' && 'bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/30',
      variant === 'default' && 'bg-[#1e2d40] text-[#94a3b8]',
      className
    )}>
      {children}
    </span>
  )
}
