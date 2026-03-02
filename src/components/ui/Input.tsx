'use client'
import { cn } from '@/lib/utils'
import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-xs text-[#94a3b8] font-medium">{label}</label>}
      <input className={cn('input-base', error && 'border-[#ff4444]', className)} {...props} />
      {error && <span className="text-xs text-[#ff4444]">{error}</span>}
    </div>
  )
}
