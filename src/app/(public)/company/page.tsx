import Link from 'next/link'
import type { Metadata } from 'next'
import { Code2, Cpu, Globe, ShieldCheck, Rocket, Users, Star, Award, Zap, Mail, Twitter, Github, Linkedin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About HHDM LLC — Software Development Company',
  description: 'HHDM LLC is a software development company building cutting-edge AI-powered financial technology products.',
}

const VALUES = [
  { icon: Cpu, color: '#00ff88', title: 'AI-First Engineering', desc: 'We embed intelligent systems at the core of every product — not as an afterthought, but as the foundation.' },
  { icon: ShieldCheck, color: '#00d4ff', title: 'Security by Design', desc: 'Security is built into our development process from day one, not bolted on at the end.' },
  { icon: Zap, color: '#facc15', title: 'Performance Obsessed', desc: 'We optimize relentlessly — fast load times, low latency, and efficient algorithms across the stack.' },
  { icon: Globe, color: '#a855f7', title: 'Built to Scale', desc: 'Our architecture is designed for global scale from the start, handling millions of requests with ease.' },
]

const STATS = [
  { value: '3+', label: 'Years in Business' },
  { value: '15+', label: 'Projects Delivered' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '100%', label: 'Client Satisfaction' },
]

const SERVICES = [
  { icon: Code2, color: '#00ff88', title: 'Full-Stack Development', desc: 'End-to-end web and mobile applications built with modern frameworks — Next.js, React Native, Node.js, and more.' },
  { icon: Cpu, color: '#00d4ff', title: 'AI & Machine Learning', desc: 'Custom AI models, NLP pipelines, predictive analytics, and intelligent automation systems.' },
  { icon: ShieldCheck, color: '#a855f7', title: 'FinTech Solutions', desc: 'Secure financial platforms, trading systems, payment integrations, and regulatory-compliant data pipelines.' },
  { icon: Rocket, color: '#facc15', title: 'Product Strategy', desc: 'From idea to MVP in weeks. We help startups and enterprises validate, design, and launch digital products fast.' },
  { icon: Globe, color: '#fb923c', title: 'Cloud Infrastructure', desc: 'DevOps, CI/CD pipelines, cloud architecture on AWS/GCP/Vercel, database optimization, and monitoring.' },
  { icon: Users, color: '#00ff88', title: 'Team Augmentation', desc: 'Embed experienced engineers directly into your team to accelerate delivery and fill technical gaps.' },
]

const TEAM = [
  {
    name: 'MR. E',
    role: 'Chief Executive Officer',
    photo: '/CEO.jpg',
    color: '#00ff88',
    initials: 'ME',
    bio: 'Visionary entrepreneur and technology executive with deep expertise in AI-driven financial technology. MR. E founded HHDM LLC with the mission of democratizing access to institutional-grade trading intelligence. He leads product strategy, business development, and investor relations.',
    tags: ['Product Strategy', 'AI/ML', 'FinTech', 'Fundraising'],
    socials: [
      { icon: Twitter, href: '#', label: 'Twitter' },
      { icon: Linkedin, href: '#', label: 'LinkedIn' },
      { icon: Mail, href: 'mailto:ceo@hhdmllc.com', label: 'Email' },
    ],
  },
  {
    name: 'Kaowserpro',
    role: 'Lead Software Developer',
    photo: '/Developer.jpg',
    color: '#00d4ff',
    initials: 'KP',
    bio: 'Full-stack engineer and architect behind UrbaTrade\'s core platform. Kaowserpro specializes in building scalable, high-performance web applications with a deep focus on AI integration, algorithmic systems, and developer experience. He leads all engineering efforts at HHDM LLC.',
    tags: ['Next.js', 'TypeScript', 'AI Integration', 'System Design'],
    socials: [
      { icon: Github, href: '#', label: 'GitHub' },
      { icon: Twitter, href: '#', label: 'Twitter' },
      { icon: Mail, href: 'mailto:dev@hhdmllc.com', label: 'Email' },
    ],
  },
]

const MILESTONES = [
  { year: '2022', title: 'Company Founded', desc: 'HHDM LLC was incorporated with a focus on AI-powered financial software.' },
  { year: '2023', title: 'First Product Launch', desc: 'Shipped our first internal trading analytics tool, serving a closed beta of 200 traders.' },
  { year: '2024', title: 'Platform Expansion', desc: 'Grew the product suite, onboarding enterprise clients and expanding the engineering team.' },
  { year: '2025', title: 'UrbaTrade Launch', desc: 'Publicly launched UrbaTrade — our flagship AI trading platform — to thousands of users globally.' },
  { year: '2026', title: 'Scaling Up', desc: 'Expanding AI capabilities, adding live data integrations, and pursuing Series A funding.' },
]

export default function CompanyPage() {
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
            <Link href="/contact" className="hover:text-[#f1f5f9] transition-colors">Contact</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth/login" className="btn btn-secondary btn-sm">Sign In</Link>
            <Link href="/auth/register" className="btn btn-primary btn-sm">Get Started</Link>
          </div>
        </div>
      </nav>

      <main className="pt-28 pb-20 px-6">
        <div className="max-w-5xl mx-auto">

          {/* Hero */}
          <div className="text-center mb-16">
            <Link href="/" className="text-xs text-[#475569] hover:text-[#94a3b8] transition-colors mb-4 inline-block">← Back to home</Link>

            {/* Company logo / badge */}
            <div className="flex items-center justify-center mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="HHDM LLC" className="w-20 h-20 object-contain rounded-2xl" />
            </div>

            <div className="inline-flex items-center gap-2 bg-[#0d1421] border border-[#1e2d40] rounded-full px-4 py-1.5 mb-5">
              <Award size={13} className="text-[#00ff88]" />
              <span className="text-xs text-[#94a3b8]">Software Development Company · Est. 2022</span>
            </div>

            <h1 className="text-5xl font-black text-[#f1f5f9] mb-4 tracking-tight">
              HHDM <span className="gradient-text">LLC</span>
            </h1>
            <p className="text-lg text-[#94a3b8] max-w-2xl mx-auto leading-relaxed">
              We build intelligent software that gives people an unfair advantage. From AI trading platforms to enterprise automation — we engineer products that matter.
            </p>

            <div className="flex items-center justify-center gap-4 mt-8">
              <a href="mailto:hello@hhdmllc.com" className="btn btn-primary">Get in Touch</a>
              <Link href="/contact" className="btn btn-secondary">Contact Support</Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {STATS.map((s) => (
              <div key={s.label} className="card p-5 text-center">
                <p className="text-3xl font-black gradient-text mb-1">{s.value}</p>
                <p className="text-xs text-[#475569]">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Mission */}
          <div className="card p-8 mb-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00ff88]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-4">
                <Star size={16} className="text-[#00ff88]" />
                <span className="text-xs font-semibold text-[#00ff88] uppercase tracking-wider">Our Mission</span>
              </div>
              <h2 className="text-2xl font-bold text-[#f1f5f9] mb-4 max-w-2xl">
                Democratizing institutional-grade software for everyone.
              </h2>
              <p className="text-[#94a3b8] leading-relaxed max-w-3xl">
                At HHDM LLC, we believe the best technology should be accessible — not locked behind venture-backed walls or enterprise contracts. We build products with the precision of a big tech lab and the speed of a startup, shipping solutions that genuinely move the needle for our clients and end users.
              </p>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: 'New York, USA', sub: 'Headquarters' },
                  { label: 'Remote-First', sub: 'Work culture' },
                  { label: 'hello@hhdmllc.com', sub: 'Business inquiries' },
                ].map((item) => (
                  <div key={item.label} className="bg-[#1e2d40]/40 rounded-xl px-4 py-3">
                    <p className="text-sm font-semibold text-[#f1f5f9]">{item.label}</p>
                    <p className="text-xs text-[#475569]">{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Meet the Team */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <span className="text-xs font-semibold text-[#475569] uppercase tracking-wider">The People Behind HHDM</span>
              <h2 className="text-3xl font-bold text-[#f1f5f9] mt-2">Meet the Team</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {TEAM.map((member) => (
                <div key={member.name} className="card overflow-hidden">
                  {/* Photo */}
                  <div className="relative w-full h-72 bg-[#0d1421] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover object-top"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1421] via-transparent to-transparent" />
                    {/* Name over photo */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className="text-xl font-bold text-[#f1f5f9]">{member.name}</p>
                      <p className="text-sm font-medium" style={{ color: member.color }}>{member.role}</p>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <p className="text-sm text-[#94a3b8] leading-relaxed mb-5">{member.bio}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {member.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-[#1e2d40] text-[#94a3b8]">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Socials */}
                    <div className="flex items-center gap-3 pt-4 border-t border-[#1e2d40]">
                      {member.socials.map((s) => {
                        const Icon = s.icon
                        return (
                          <a
                            key={s.label}
                            href={s.href}
                            aria-label={s.label}
                            className="w-8 h-8 rounded-lg bg-[#1e2d40] flex items-center justify-center text-[#475569] hover:text-[#f1f5f9] hover:bg-[#1e2d40]/80 transition-colors"
                          >
                            <Icon size={14} />
                          </a>
                        )
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <span className="text-xs font-semibold text-[#475569] uppercase tracking-wider">What We Build</span>
              <h2 className="text-3xl font-bold text-[#f1f5f9] mt-2">Our Services</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {SERVICES.map((svc) => {
                const Icon = svc.icon
                return (
                  <div key={svc.title} className="card card-hover p-5">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${svc.color}15` }}>
                      <Icon size={20} style={{ color: svc.color }} />
                    </div>
                    <h3 className="text-sm font-semibold text-[#f1f5f9] mb-2">{svc.title}</h3>
                    <p className="text-xs text-[#94a3b8] leading-relaxed">{svc.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Values */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <span className="text-xs font-semibold text-[#475569] uppercase tracking-wider">How We Work</span>
              <h2 className="text-3xl font-bold text-[#f1f5f9] mt-2">Our Core Values</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {VALUES.map((v) => {
                const Icon = v.icon
                return (
                  <div key={v.title} className="card p-6 flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${v.color}15` }}>
                      <Icon size={22} style={{ color: v.color }} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-[#f1f5f9] mb-1.5">{v.title}</h3>
                      <p className="text-sm text-[#94a3b8] leading-relaxed">{v.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <span className="text-xs font-semibold text-[#475569] uppercase tracking-wider">Our Journey</span>
              <h2 className="text-3xl font-bold text-[#f1f5f9] mt-2">Company Timeline</h2>
            </div>
            <div className="relative">
              {/* Line */}
              <div className="absolute left-[72px] top-0 bottom-0 w-px bg-[#1e2d40] hidden md:block" />
              <div className="space-y-6">
                {MILESTONES.map((m, i) => (
                  <div key={m.year} className="flex gap-6 items-start">
                    <div className="flex-shrink-0 w-[72px] text-right hidden md:block">
                      <span className="text-xs font-bold text-[#00ff88] bg-[#00ff88]/10 px-2 py-1 rounded-md">{m.year}</span>
                    </div>
                    <div className="hidden md:flex w-px items-start justify-center relative">
                      <div className="w-3 h-3 rounded-full border-2 border-[#00ff88] bg-[#070b14] mt-1 -ml-1.5 flex-shrink-0" />
                    </div>
                    <div className="card p-4 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-[#00ff88] md:hidden">{m.year}</span>
                        <p className="text-sm font-semibold text-[#f1f5f9]">{m.title}</p>
                      </div>
                      <p className="text-xs text-[#94a3b8] leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="card p-10 text-center glow-green">
            <h2 className="text-2xl font-bold text-[#f1f5f9] mb-3">Work With Us</h2>
            <p className="text-[#94a3b8] mb-6 max-w-md mx-auto">
              Have a project in mind? Whether you need a full product build, AI integration, or a dedicated engineering team — we'd love to hear about it.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <a href="mailto:hello@hhdmllc.com" className="btn btn-primary btn-lg">Start a Project</a>
              <Link href="/contact" className="btn btn-secondary btn-lg">Contact Support</Link>
            </div>
            <p className="text-xs text-[#475569] mt-5">hello@hhdmllc.com · New York, USA · Remote-first worldwide</p>
          </div>

        </div>
      </main>

      <footer className="border-t border-[#1e2d40] py-6 px-6 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-[#475569]">
            <span>© 2026 HHDM LLC. All rights reserved.</span>
            <span className="text-[#1e2d40]">·</span>
            <span className="text-[#475569]">Makers of <Link href="/" className="text-[#00d4ff] hover:underline">UrbaTrade</Link></span>
          </div>
          <div className="flex gap-6 text-sm text-[#475569]">
            <Link href="/privacy" className="hover:text-[#94a3b8] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#94a3b8] transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-[#94a3b8] transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
