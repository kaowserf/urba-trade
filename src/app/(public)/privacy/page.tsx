import Link from 'next/link'
import type { Metadata } from 'next'
import { ShieldCheck, EyeOff, Lock, Trash2, Download, Bell, Cookie, Database } from 'lucide-react'

export const metadata: Metadata = { title: 'Privacy Policy — UrbaTrade' }

const HIGHLIGHTS = [
  { icon: ShieldCheck, title: 'We never sell your data', desc: 'Your personal data is never sold, rented, or traded to any third party — ever.', color: '#00ff88' },
  { icon: EyeOff, title: 'No ad tracking', desc: 'We do not use third-party tracking cookies or advertising pixels of any kind.', color: '#00d4ff' },
  { icon: Lock, title: 'Encrypted everywhere', desc: 'All data is encrypted via HTTPS/TLS in transit. Passwords use bcrypt with 12+ rounds.', color: '#a855f7' },
  { icon: Trash2, title: 'Right to deletion', desc: 'Request full account and data deletion at any time. We complete requests within 30 days.', color: '#fb923c' },
]

const DATA_TABLE = [
  { type: 'Account data', examples: 'Name, email, hashed password', purpose: 'Authentication & identity', retention: 'Account lifetime + 90 days' },
  { type: 'Usage logs', examples: 'Pages visited, features used, scan queries', purpose: 'Platform improvement & analytics', retention: '12 months' },
  { type: 'Technical data', examples: 'IP address, browser, device ID, timestamps', purpose: 'Security & performance monitoring', retention: '6 months' },
  { type: 'API keys', examples: 'Polygon.io key (AES-256 encrypted)', purpose: 'Live data connectivity', retention: 'Until removed by user' },
  { type: 'Trade history', examples: 'Simulated trades, positions, P&L', purpose: 'Portfolio tracking & audit', retention: '3 years (regulatory)' },
  { type: 'Billing data', examples: 'Subscription tier, invoice history', purpose: 'Billing & receipts via Stripe', retention: '7 years (tax compliance)' },
]

const SECTIONS = [
  {
    title: '1. Information We Collect',
    icon: Database,
    iconColor: '#00d4ff',
    content: [
      'Account information: When you register, we collect your name, email address, and password (stored as a secure bcrypt hash — we never see your plaintext password).',
      'Usage data: We log pages visited, features used, AI scan queries, and trade activity within the platform to understand how users engage with UrbaTrade.',
      'Technical data: IP address, browser type, device identifiers, and access timestamps for security monitoring and abuse prevention.',
      'API keys: If you provide third-party API keys (e.g., Polygon.io), they are stored AES-256 encrypted and are never logged, shared, or accessible to staff.',
      'Payment data: Billing information is processed directly by Stripe. We never store card numbers or payment credentials on our servers.',
    ],
  },
  {
    title: '2. How We Use Your Information',
    icon: ShieldCheck,
    iconColor: '#00ff88',
    content: [
      'To provide and operate the UrbaTrade platform, including AI scoring, signals, screener, scanner, and portfolio features.',
      'To personalize your dashboard, AI signals, and trading analytics based on your activity and preferences.',
      'To process billing and subscription management through Stripe — we only receive confirmation of payment, not card details.',
      'To send transactional emails (password reset, billing receipts, security alerts) — we never send marketing emails without your explicit opt-in.',
      'To detect and prevent fraud, unauthorized access, account takeover, and other security threats.',
      'To improve our AI models and platform performance using aggregated, anonymized, non-identifiable data only.',
    ],
  },
  {
    title: '3. Data Sharing',
    icon: EyeOff,
    iconColor: '#fb923c',
    content: [
      'We do not sell, rent, or trade your personal data to any third parties — this is a core principle, not just a legal clause.',
      'Stripe: Payment data is processed directly by Stripe and governed by their privacy policy. We receive only subscription status and invoice data.',
      'Infrastructure providers: We use cloud services (Neon PostgreSQL, Vercel) who process data on our behalf under strict data processing agreements (DPAs).',
      'Legal compliance: We may disclose data only if required by valid law enforcement requests or court orders — and we will notify you when legally permitted.',
      'Business transfers: In the event of a merger or acquisition, your data would transfer subject to equivalent privacy protections, and you would be notified in advance.',
    ],
  },
  {
    title: '4. Data Retention',
    icon: Trash2,
    iconColor: '#94a3b8',
    content: [
      'Account data is retained for the duration of your account and up to 90 days after deletion, to allow recovery if deletion was accidental.',
      'Trade history and audit logs are retained for 3 years for regulatory compliance, then permanently deleted.',
      'Usage and technical logs are retained for 12 months and 6 months respectively, then automatically purged.',
      'You may request deletion of your personal data at any time by contacting privacy@urbatrade.com — we complete verified requests within 30 days.',
    ],
  },
  {
    title: '5. Security',
    icon: Lock,
    iconColor: '#a855f7',
    content: [
      'All data is transmitted over HTTPS/TLS 1.3 encryption. We enforce HSTS and reject plaintext connections.',
      'Passwords are hashed using bcrypt with a minimum cost factor of 12. Plaintext passwords are never stored or logged anywhere.',
      'Database access is restricted to authorized services only, behind a private VPC with no direct public exposure.',
      'API keys are encrypted at rest using AES-256 before storage and decrypted only in memory when needed.',
      'We conduct regular security reviews, dependency vulnerability scans, and penetration testing.',
      'In the event of a data breach, we will notify affected users within 72 hours as required by applicable law.',
    ],
  },
  {
    title: '6. Your Rights',
    icon: Download,
    iconColor: '#00d4ff',
    content: [
      'Access: Request a full copy of all personal data we hold about you at any time via privacy@urbatrade.com.',
      'Correction: Update your account information directly in Settings → Account, or request corrections via email.',
      'Deletion: Request permanent deletion of your account and all associated data by emailing privacy@urbatrade.com.',
      'Portability: Export your trade history, portfolio data, and scan history from your account dashboard in CSV or JSON format.',
      'Opt-out: Unsubscribe from non-essential communications at any time via the unsubscribe link in any email or in Settings.',
      'Restriction: Request that we restrict processing of your data in certain circumstances while a dispute is being resolved.',
    ],
  },
  {
    title: '7. Cookies & Local Storage',
    icon: Cookie,
    iconColor: '#facc15',
    content: [
      'Session cookies: We use a single secure, httpOnly session cookie for authentication. It expires when you sign out or after 30 days of inactivity.',
      'Local storage: We store UI preferences (sidebar state, trading mode) in your browser\'s localStorage — this data never leaves your device.',
      'No tracking cookies: We do not use Google Analytics, Facebook Pixel, or any other third-party tracking or advertising cookies.',
      'You can clear all local data by clearing your browser\'s site data for urbatrade.com at any time.',
    ],
  },
  {
    title: '8. Changes to This Policy',
    icon: Bell,
    iconColor: '#00ff88',
    content: [
      'We may update this Privacy Policy as our platform evolves. The "Last updated" date at the top of this page will always reflect the current version.',
      'For material changes that affect how we use your data, we will notify you via email at least 14 days before the change takes effect.',
      'Continued use of the platform after the effective date of changes constitutes acceptance of the updated policy.',
    ],
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#070b14]">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#1e2d40] bg-[#070b14]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="UrbaTrade" className="h-8 w-auto" />
            <span className="text-lg font-bold text-[#f1f5f9]">UrbaTrade</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm text-[#94a3b8]">
            <Link href="/" className="hover:text-[#f1f5f9] transition-colors">Home</Link>
            <Link href="/pricing" className="hover:text-[#f1f5f9] transition-colors">Pricing</Link>
            <Link href="/company" className="hover:text-[#f1f5f9] transition-colors">About</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth/login" className="btn btn-secondary btn-sm">Sign In</Link>
            <Link href="/auth/register" className="btn btn-primary btn-sm">Get Started</Link>
          </div>
        </div>
      </nav>

      <main className="pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="mb-10">
            <Link href="/" className="text-xs text-[#475569] hover:text-[#94a3b8] transition-colors mb-4 inline-block">← Back to home</Link>
            <h1 className="text-4xl font-bold text-[#f1f5f9] mb-3">Privacy Policy</h1>
            <p className="text-sm text-[#475569]">Last updated: January 1, 2026 &nbsp;·&nbsp; Effective: January 1, 2026</p>
            <div className="mt-4 p-4 rounded-xl border border-[#00d4ff]/20 bg-[#00d4ff]/5 text-sm text-[#94a3b8] leading-relaxed">
              UrbaTrade ("we", "us", "our") is committed to protecting your privacy. This policy explains what data we collect, how we use it, and the rights you have over your personal information.
            </div>
          </div>

          {/* Highlights */}
          <div className="mb-10">
            <p className="text-xs font-semibold text-[#475569] uppercase tracking-wider mb-4">Privacy at a Glance</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {HIGHLIGHTS.map((h) => {
                const Icon = h.icon
                return (
                  <div key={h.title} className="card p-4 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${h.color}18` }}>
                      <Icon size={18} style={{ color: h.color }} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#f1f5f9] mb-0.5">{h.title}</p>
                      <p className="text-xs text-[#94a3b8] leading-relaxed">{h.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Data table */}
          <div className="mb-10">
            <p className="text-xs font-semibold text-[#475569] uppercase tracking-wider mb-4">Data We Collect &amp; Retain</p>
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-[#1e2d40]">
                      <th className="text-left px-4 py-3 text-[#475569] font-semibold">Type</th>
                      <th className="text-left px-4 py-3 text-[#475569] font-semibold">Examples</th>
                      <th className="text-left px-4 py-3 text-[#475569] font-semibold hidden md:table-cell">Purpose</th>
                      <th className="text-left px-4 py-3 text-[#475569] font-semibold hidden sm:table-cell">Retention</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DATA_TABLE.map((row, i) => (
                      <tr key={row.type} className={i < DATA_TABLE.length - 1 ? 'border-b border-[#1e2d40]/50' : ''}>
                        <td className="px-4 py-3 font-medium text-[#f1f5f9] whitespace-nowrap">{row.type}</td>
                        <td className="px-4 py-3 text-[#94a3b8]">{row.examples}</td>
                        <td className="px-4 py-3 text-[#94a3b8] hidden md:table-cell">{row.purpose}</td>
                        <td className="px-4 py-3 text-[#475569] hidden sm:table-cell whitespace-nowrap">{row.retention}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-6">
            {SECTIONS.map((s) => {
              const Icon = s.icon
              return (
                <div key={s.title} className="card p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Icon size={16} style={{ color: s.iconColor }} />
                    <h2 className="text-base font-semibold text-[#f1f5f9]">{s.title}</h2>
                  </div>
                  <ul className="space-y-2.5">
                    {s.content.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-[#94a3b8] leading-relaxed">
                        <span className="text-[#00d4ff] mt-1 flex-shrink-0">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>

          {/* Contact */}
          <div className="mt-8 card p-6 text-center">
            <p className="text-sm text-[#94a3b8] mb-1">
              Questions about this policy?{' '}
              <Link href="/contact" className="text-[#00d4ff] hover:underline">Contact us</Link>
              {' '}or email{' '}
              <a href="mailto:privacy@urbatrade.com" className="text-[#00d4ff] hover:underline">privacy@urbatrade.com</a>
            </p>
            <p className="text-xs text-[#475569] mt-2">We respond to all privacy inquiries within 5 business days.</p>
          </div>
        </div>
      </main>

      <footer className="border-t border-[#1e2d40] py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="text-sm text-[#475569]">© 2026 UrbaTrade. All rights reserved.</div>
          <div className="flex gap-6 text-sm text-[#475569]">
            <Link href="/privacy" className="text-[#00d4ff]">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#94a3b8] transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-[#94a3b8] transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
