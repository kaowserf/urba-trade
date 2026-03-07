import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'UrbaTrade — AI-Powered Trading Platform', template: '%s | UrbaTrade' },
  description: 'AI-powered intraday trading platform with real-time market analysis, automated execution, and quantitative strategies.',
  keywords: ['trading', 'AI', 'stocks', 'intraday', 'quantitative analysis'],
  icons: { icon: '/icon.svg', apple: '/logo.png' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
