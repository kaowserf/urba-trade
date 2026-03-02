'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Mail, MessageSquare, Twitter, Github, Clock, CheckCircle, Users, Star, Zap, MapPin, Phone, HeadphonesIcon } from 'lucide-react'

const TOPICS = [
  'General inquiry',
  'Technical support',
  'Billing & subscriptions',
  'Bug report',
  'Feature request',
  'Privacy / data request',
  'Partnership',
  'Other',
]

const TEAM = [
  {
    name: 'Alex Rivera',
    role: 'Head of Support',
    avatar: 'AR',
    color: '#00d4ff',
    msg: 'I personally oversee all support escalations and ensure every user gets the help they need.',
  },
  {
    name: 'Priya Sharma',
    role: 'Technical Lead',
    avatar: 'PS',
    color: '#00ff88',
    msg: 'Expert in platform integrations, API issues, and data connectivity. I love solving complex problems.',
  },
  {
    name: 'Jordan Wells',
    role: 'Billing Specialist',
    avatar: 'JW',
    color: '#a855f7',
    msg: 'All subscription, invoicing, and refund questions are handled quickly and fairly.',
  },
]

const FAQS = [
  {
    q: 'How do I reset my password?',
    a: 'Use the "Forgot password" link on the login page, or update it anytime in Settings → Account → Security.',
  },
  {
    q: 'Can I cancel my subscription?',
    a: 'Yes, cancel anytime from Settings → Billing. Your plan stays active until the end of the current billing period — no prorated charges.',
  },
  {
    q: 'Is the market data real-time?',
    a: 'The platform uses high-fidelity simulated data by default. Add your Polygon.io API key in Settings → API Keys to enable live market data.',
  },
  {
    q: 'How does the AI scoring work?',
    a: 'AI scores (0–100) combine technical analysis (45%), fundamental analysis (40%), and sentiment signals (15%) for each symbol.',
  },
  {
    q: 'Can I upgrade or downgrade my plan?',
    a: 'Absolutely. Plan changes take effect immediately. Upgrading is prorated; downgrading applies at the next billing cycle.',
  },
  {
    q: 'Is there a free trial for Pro?',
    a: 'The Free plan gives you full access to core features. Pro and Enterprise plans include a 7-day free trial — no credit card required to start.',
  },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', topic: TOPICS[0], message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setSubmitted(true)
    setLoading(false)
  }

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
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="text-center mb-10">
            <Link href="/" className="text-xs text-[#475569] hover:text-[#94a3b8] transition-colors mb-4 inline-block">← Back to home</Link>
            <h1 className="text-4xl font-bold text-[#f1f5f9] mb-3">Contact Us</h1>
            <p className="text-[#94a3b8] max-w-xl mx-auto">
              Have a question, found a bug, or want to partner with us? Our team typically responds within 24 hours.
            </p>
          </div>

          {/* Support Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { icon: <Clock size={16} className="text-[#00ff88]" />, value: '< 4 hrs', label: 'Avg. Response', bg: '#00ff88' },
              { icon: <Star size={16} className="text-[#facc15]" />, value: '97%', label: 'Satisfaction Rate', bg: '#facc15' },
              { icon: <Users size={16} className="text-[#00d4ff]" />, value: '12,000+', label: 'Users Helped', bg: '#00d4ff' },
              { icon: <Zap size={16} className="text-[#a855f7]" />, value: '24 / 7', label: 'Email Coverage', bg: '#a855f7' },
            ].map((s) => (
              <div key={s.label} className="card p-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${s.bg}18` }}>
                  {s.icon}
                </div>
                <div>
                  <p className="text-base font-bold text-[#f1f5f9]">{s.value}</p>
                  <p className="text-xs text-[#475569]">{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="space-y-4">
              {[
                {
                  icon: <Mail size={18} className="text-[#00d4ff]" />,
                  label: 'Email Support',
                  value: 'support@urbatrade.com',
                  sub: 'General inquiries & support',
                  href: 'mailto:support@urbatrade.com',
                },
                {
                  icon: <Mail size={18} className="text-[#a855f7]" />,
                  label: 'Legal & Privacy',
                  value: 'legal@urbatrade.com',
                  sub: 'Terms, privacy, data requests',
                  href: 'mailto:legal@urbatrade.com',
                },
                {
                  icon: <Twitter size={18} className="text-[#00d4ff]" />,
                  label: 'Twitter / X',
                  value: '@UrbaTrade',
                  sub: 'Updates & announcements',
                  href: '#',
                },
                {
                  icon: <Github size={18} className="text-[#94a3b8]" />,
                  label: 'GitHub',
                  value: 'github.com/urbatrade',
                  sub: 'Bug reports & open source',
                  href: '#',
                },
                {
                  icon: <MapPin size={18} className="text-[#00ff88]" />,
                  label: 'Headquarters',
                  value: 'New York, NY 10001',
                  sub: '350 Fifth Ave, Suite 4100',
                  href: '#',
                },
              ].map((c) => (
                <a key={c.label} href={c.href} className="card card-hover p-4 flex items-start gap-3 block">
                  <div className="w-9 h-9 rounded-lg bg-[#1e2d40] flex items-center justify-center flex-shrink-0">
                    {c.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#94a3b8]">{c.label}</p>
                    <p className="text-sm text-[#f1f5f9] font-medium">{c.value}</p>
                    <p className="text-xs text-[#475569]">{c.sub}</p>
                  </div>
                </a>
              ))}

              {/* Hours */}
              <div className="card p-4">
                <div className="flex items-center gap-2 mb-3">
                  <HeadphonesIcon size={14} className="text-[#00ff88]" />
                  <p className="text-xs font-semibold text-[#94a3b8]">Support Hours</p>
                </div>
                <div className="space-y-1.5 text-xs">
                  {[
                    { day: 'Mon – Fri', hours: '9:00 am – 6:00 pm EST' },
                    { day: 'Saturday', hours: '10:00 am – 3:00 pm EST' },
                    { day: 'Sunday', hours: 'Email only (48 hr SLA)' },
                  ].map((h) => (
                    <div key={h.day} className="flex justify-between">
                      <span className="text-[#475569]">{h.day}</span>
                      <span className="text-[#94a3b8]">{h.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="card p-10 flex flex-col items-center justify-center text-center h-full min-h-[400px]">
                  <div className="w-16 h-16 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/30 flex items-center justify-center mb-5">
                    <CheckCircle size={32} className="text-[#00ff88]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#f1f5f9] mb-2">Message Sent!</h3>
                  <p className="text-sm text-[#94a3b8] mb-1 max-w-sm">
                    Thanks for reaching out, <strong className="text-[#f1f5f9]">{form.name}</strong>.
                  </p>
                  <p className="text-sm text-[#94a3b8] mb-6 max-w-sm">
                    We'll reply to <strong className="text-[#f1f5f9]">{form.email}</strong> within 24 hours.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-[#475569] bg-[#1e2d40]/50 rounded-lg px-4 py-2 mb-6">
                    <Clock size={12} className="text-[#00ff88]" />
                    Ticket #{Math.floor(Math.random() * 90000) + 10000} created · {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', topic: TOPICS[0], message: '' }) }}
                    className="btn btn-secondary btn-sm"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="card p-6 space-y-5">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare size={16} className="text-[#00d4ff]" />
                    <h2 className="text-sm font-semibold text-[#f1f5f9]">Send us a message</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#94a3b8] mb-1.5">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="John Doe"
                        className="input-base w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#94a3b8] mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="you@example.com"
                        className="input-base w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#94a3b8] mb-1.5">Topic *</label>
                    <select
                      value={form.topic}
                      onChange={(e) => setForm({ ...form, topic: e.target.value })}
                      className="input-base w-full"
                    >
                      {TOPICS.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#94a3b8] mb-1.5">Message *</label>
                    <textarea
                      required
                      rows={6}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Describe your question or issue in detail…"
                      className="input-base w-full resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <p className="text-xs text-[#475569]">
                      By submitting, you agree to our{' '}
                      <Link href="/privacy" className="text-[#00d4ff] hover:underline">Privacy Policy</Link>
                    </p>
                    <button type="submit" disabled={loading} className="btn btn-primary">
                      {loading ? 'Sending…' : 'Send Message'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Meet the Team */}
          <div className="mt-14">
            <h2 className="text-lg font-bold text-[#f1f5f9] mb-5 text-center">Meet the Support Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {TEAM.map((t) => (
                <div key={t.name} className="card p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-[#070b14] flex-shrink-0"
                      style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}99)` }}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#f1f5f9]">{t.name}</p>
                      <p className="text-xs text-[#475569]">{t.role}</p>
                    </div>
                  </div>
                  <p className="text-xs text-[#94a3b8] leading-relaxed italic">"{t.msg}"</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-14">
            <h2 className="text-lg font-bold text-[#f1f5f9] mb-5 text-center">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FAQS.map((faq) => (
                <div key={faq.q} className="card p-5">
                  <p className="text-sm font-semibold text-[#f1f5f9] mb-2">{faq.q}</p>
                  <p className="text-xs text-[#94a3b8] leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-[#475569] mt-6">
              Still have questions?{' '}
              <a href="mailto:support@urbatrade.com" className="text-[#00d4ff] hover:underline">Email us directly</a>
              {' '}or use the form above.
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-[#1e2d40] py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="text-sm text-[#475569]">© 2026 UrbaTrade. All rights reserved.</div>
          <div className="flex gap-6 text-sm text-[#475569]">
            <Link href="/privacy" className="hover:text-[#94a3b8] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#94a3b8] transition-colors">Terms</Link>
            <Link href="/contact" className="text-[#00d4ff]">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
