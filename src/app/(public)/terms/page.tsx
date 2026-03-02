import Link from 'next/link'
import type { Metadata } from 'next'
import { AlertTriangle, FileText, CreditCard, UserCheck, Shield, Scale, Cpu, Lock } from 'lucide-react'

export const metadata: Metadata = { title: 'Terms & Conditions — UrbaTrade' }

const KEY_POINTS = [
  { icon: AlertTriangle, color: '#f97316', title: 'Not financial advice', desc: 'All AI signals and analysis are for informational purposes only. You trade at your own risk.' },
  { icon: UserCheck, color: '#00d4ff', title: 'Age 18+ required', desc: 'You must be at least 18 years old to create an account and use the platform.' },
  { icon: CreditCard, color: '#a855f7', title: 'Cancel anytime', desc: 'Subscriptions can be cancelled at any time. Access continues until the end of the billing period.' },
  { icon: Shield, color: '#00ff88', title: 'Your data is yours', desc: 'We never sell your data. You can export or delete your data at any time from Settings.' },
]

const SECTIONS = [
  {
    title: '1. Acceptance of Terms',
    icon: FileText,
    iconColor: '#00d4ff',
    content: [
      'By accessing or using the UrbaTrade platform ("Service"), you agree to be bound by these Terms and Conditions ("Terms").',
      'If you do not agree to these Terms, you must not use the Service.',
      'We reserve the right to modify these Terms at any time. We will provide at least 14 days\' notice of material changes via email or in-platform notification.',
      'Continued use of the Service after modifications constitutes your acceptance of the updated Terms.',
      'These Terms constitute the entire agreement between you and UrbaTrade regarding your use of the Service.',
    ],
  },
  {
    title: '2. Description of Service',
    icon: Cpu,
    iconColor: '#00ff88',
    content: [
      'UrbaTrade provides an AI-powered trading analysis platform including stock screening, signal generation, intraday setup identification, quantitative strategies, and portfolio tracking.',
      'The platform offers AI composite scoring (0–100) based on technical analysis (45%), fundamental analysis (40%), and market sentiment (15%).',
      'The Service is intended for informational and educational purposes only.',
      'UrbaTrade does not provide licensed financial advice, investment recommendations, or brokerage services.',
      'Market data is provided via high-fidelity simulation by default. Live data requires a Polygon.io API key configured in Settings.',
    ],
  },
  {
    title: '3. No Financial Advice',
    icon: AlertTriangle,
    iconColor: '#f97316',
    content: [
      'IMPORTANT: All AI signals, scores, and analysis provided by UrbaTrade are for informational purposes only and do not constitute financial, investment, or trading advice.',
      'Past performance of any strategy or signal does not guarantee or predict future results.',
      'You are solely responsible for all trading decisions and any resulting gains or losses.',
      'We strongly recommend consulting a licensed financial advisor before making investment decisions.',
      'Trading in financial markets involves significant risk of loss. Never trade with money you cannot afford to lose.',
      'The AI scoring system is a quantitative tool — it does not account for all market factors, news events, or macroeconomic conditions.',
    ],
  },
  {
    title: '4. User Accounts',
    icon: UserCheck,
    iconColor: '#00d4ff',
    content: [
      'You must be at least 18 years of age to create an account and use the Service.',
      'You are responsible for maintaining the confidentiality of your account credentials. Use a strong, unique password.',
      'You agree to notify us immediately at security@urbatrade.com of any unauthorized use of your account.',
      'One person may not maintain more than one free account. Duplicate accounts may be terminated without notice.',
      'You are responsible for all activity that occurs under your account.',
      'We reserve the right to suspend or terminate accounts that violate these Terms, with or without prior notice.',
    ],
  },
  {
    title: '5. Subscriptions and Billing',
    icon: CreditCard,
    iconColor: '#a855f7',
    content: [
      'Paid subscriptions (Pro at $29/mo, Enterprise at $99/mo) are billed in advance on a monthly or annual basis.',
      'Annual plans receive a 20% discount compared to monthly billing.',
      'Subscription fees are non-refundable except as required by applicable consumer protection law.',
      'You may cancel your subscription at any time; access continues until the end of the current billing period.',
      'We reserve the right to change pricing with 30 days\' notice to existing subscribers via email.',
      'Payment processing is handled by Stripe. We do not store credit card numbers or payment credentials.',
      'Failed payments will result in a 3-day grace period before service downgrade to the Free plan.',
    ],
  },
  {
    title: '6. Acceptable Use',
    icon: Shield,
    iconColor: '#00ff88',
    content: [
      'You may not use the Service to engage in market manipulation, wash trading, insider trading, or any illegal financial activity.',
      'You may not attempt to reverse engineer, decompile, scrape, or systematically extract data from the platform via automated means.',
      'You may not share your account credentials, sell access to your account, or use automation to circumvent usage limits.',
      'You may not use the Service to harass, harm, defraud, or impersonate other users or third parties.',
      'You may not use the platform to train competing AI models or commercially exploit UrbaTrade\'s proprietary algorithms.',
      'Violation of these restrictions may result in immediate account termination without refund and potential legal action.',
    ],
  },
  {
    title: '7. Intellectual Property',
    icon: Lock,
    iconColor: '#facc15',
    content: [
      'All content, algorithms, AI models, scoring systems, and software comprising UrbaTrade are the exclusive property of UrbaTrade or its licensors.',
      'You are granted a limited, non-exclusive, non-transferable, revocable license to use the Service for personal or internal business purposes.',
      'You may not reproduce, distribute, publicly display, or create derivative works from any UrbaTrade content without express written permission.',
      'Feedback or suggestions you provide about the Service may be used by UrbaTrade without obligation to you.',
      'UrbaTrade, the UrbaTrade logo, and related marks are trademarks of UrbaTrade. Do not use them without permission.',
    ],
  },
  {
    title: '8. Limitation of Liability',
    icon: Scale,
    iconColor: '#94a3b8',
    content: [
      'UrbaTrade shall not be liable for any trading losses, lost profits, or financial damages arising from use of or reliance on the Service.',
      'Our total liability to you for any claim shall not exceed the amount you paid for the Service in the 3 months preceding the claim.',
      'We are not liable for service interruptions, data inaccuracies, or third-party failures beyond our reasonable control.',
      'We are not liable for losses caused by unauthorized access to your account due to your failure to maintain credential security.',
      'THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.',
    ],
  },
  {
    title: '9. Governing Law & Disputes',
    icon: Scale,
    iconColor: '#00d4ff',
    content: [
      'These Terms are governed by and construed in accordance with the laws of the State of New York, USA.',
      'You agree to first attempt to resolve any dispute informally by contacting us at legal@urbatrade.com.',
      'Any unresolved disputes shall be resolved through binding arbitration administered by the American Arbitration Association.',
      'You waive any right to participate in class action lawsuits or class-wide arbitration against UrbaTrade.',
      'Notwithstanding the above, either party may seek injunctive relief in a court of competent jurisdiction.',
    ],
  },
  {
    title: '10. Contact',
    icon: FileText,
    iconColor: '#94a3b8',
    content: [
      'For questions about these Terms, contact us at legal@urbatrade.com or through our Contact page.',
      'For general support, email support@urbatrade.com or use the in-app Help feature.',
      'For privacy-related inquiries, email privacy@urbatrade.com.',
      'Registered address: UrbaTrade, 350 Fifth Ave, Suite 4100, New York, NY 10001, USA.',
    ],
  },
]

export default function TermsPage() {
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
            <h1 className="text-4xl font-bold text-[#f1f5f9] mb-3">Terms &amp; Conditions</h1>
            <p className="text-sm text-[#475569]">Last updated: January 1, 2026 &nbsp;·&nbsp; Effective: January 1, 2026</p>
            <div className="mt-4 p-4 rounded-xl border border-[#f97316]/20 bg-[#f97316]/5 text-sm text-[#94a3b8] leading-relaxed">
              <span className="font-semibold text-[#f97316]">Risk Disclaimer:</span> Trading in financial markets involves substantial risk of loss. UrbaTrade provides analytical tools only — not financial advice. Please read these terms carefully before using the platform.
            </div>
          </div>

          {/* Key points */}
          <div className="mb-10">
            <p className="text-xs font-semibold text-[#475569] uppercase tracking-wider mb-4">Key Points at a Glance</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {KEY_POINTS.map((k) => {
                const Icon = k.icon
                return (
                  <div key={k.title} className="card p-4 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${k.color}18` }}>
                      <Icon size={18} style={{ color: k.color }} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#f1f5f9] mb-0.5">{k.title}</p>
                      <p className="text-xs text-[#94a3b8] leading-relaxed">{k.desc}</p>
                    </div>
                  </div>
                )
              })}
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
                        <span className="text-[#00ff88] mt-1 flex-shrink-0">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>

          {/* Contact card */}
          <div className="mt-8 card p-6 text-center">
            <p className="text-sm text-[#94a3b8] mb-1">
              Questions about these terms?{' '}
              <Link href="/contact" className="text-[#00d4ff] hover:underline">Contact us</Link>
              {' '}or email{' '}
              <a href="mailto:legal@urbatrade.com" className="text-[#00d4ff] hover:underline">legal@urbatrade.com</a>
            </p>
            <p className="text-xs text-[#475569] mt-2">We respond to all legal inquiries within 5 business days.</p>
          </div>
        </div>
      </main>

      <footer className="border-t border-[#1e2d40] py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="text-sm text-[#475569]">© 2026 UrbaTrade. All rights reserved.</div>
          <div className="flex gap-6 text-sm text-[#475569]">
            <Link href="/privacy" className="hover:text-[#94a3b8] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-[#00d4ff]">Terms</Link>
            <Link href="/contact" className="hover:text-[#94a3b8] transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
