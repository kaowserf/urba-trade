'use client'
import { cn } from '@/lib/utils'

interface SelectOption { value: string; label: string }
interface SelectProps {
  label?: string
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  className?: string
}

export function Select({ label, value, onChange, options, className }: SelectProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-xs text-[#94a3b8] font-medium">{label}</label>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn('input-base cursor-pointer', className)}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-[#111827]">{o.label}</option>
        ))}
      </select>
    </div>
  )
}
