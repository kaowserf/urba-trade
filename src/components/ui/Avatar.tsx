'use client'
import { useState } from 'react'

interface AvatarProps {
  email: string
  name?: string | null
  size?: number          // px — used for both width/height
  tierColor?: string
  className?: string
}

function getInitial(name?: string | null, email?: string) {
  return ((name ?? email ?? 'U')[0] ?? 'U').toUpperCase()
}

function dicebearUrl(seed: string) {
  return `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(seed)}&backgroundColor=0d1421&backgroundType=solid&radius=50`
}

export function Avatar({ email, name, size = 28, tierColor = '#00ff88', className = '' }: AvatarProps) {
  const [imgError, setImgError] = useState(false)
  const initial = getInitial(name, email)

  return (
    <div
      className={`rounded-full flex-shrink-0 overflow-hidden flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {!imgError ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={dicebearUrl(email)}
          alt={name ?? email}
          width={size}
          height={size}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover rounded-full"
          draggable={false}
        />
      ) : (
        // Fallback: initials gradient
        <div
          className="w-full h-full rounded-full flex items-center justify-center font-bold text-[#070b14]"
          style={{
            background: `linear-gradient(135deg, #00ff88, ${tierColor})`,
            fontSize: size * 0.36,
          }}
        >
          {initial}
        </div>
      )}
    </div>
  )
}
