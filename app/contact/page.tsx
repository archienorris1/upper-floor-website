'use client'

import { useState } from 'react'
import SiteNav from '@/components/site/SiteNav'
import SiteFooter from '@/components/site/SiteFooter'
import CalEmbed from '@/components/site/CalEmbed'
import { CAL_LINK } from '@/lib/booking'

type Status = 'idle' | 'loading' | 'success' | 'error'

const inputClass =
  'w-full rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3.5 text-base text-white placeholder-white/40 transition-colors duration-200 focus:border-brand-green focus:outline-none'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: '',
  })
  const [status, setStatus] = useState<Status>('idle')

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setStatus('success')
        setFormData({ firstName: '', lastName: '', email: '', company: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-brand-ink px-6 py-32 lg:px-12">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-16 lg:grid-cols-[2fr_3fr] lg:gap-24">
          {/* LEFT */}
          <div className="flex flex-col gap-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">
              Get in touch
            </p>
            <h1 className="font-serif text-5xl leading-none text-white md:text-7xl">
              Let’s Talk
            </h1>
            <p className="max-w-[380px] text-base leading-relaxed text-white/80">
              Prefer email? Drop us a line below. Or if you’d rather just talk it through,{' '}
              <a href="#book-call" className="text-brand-green underline-offset-2 hover:underline">
                book a free intro call
              </a>
              .
            </p>
            <div>
              <p className="mb-1 text-sm text-white/60">Or email us directly:</p>
              <a
                href="mailto:info@upperfloor.co"
                className="text-sm text-brand-green no-underline transition-all duration-200 hover:underline"
              >
                info@upperfloor.co
              </a>
            </div>
          </div>

          {/* RIGHT — form */}
          <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="First Name"
                  required
                  value={formData.firstName}
                  onChange={set('firstName')}
                  className={inputClass}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  required
                  value={formData.lastName}
                  onChange={set('lastName')}
                  className={inputClass}
                />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={set('email')}
                className={inputClass}
              />
              <input
                type="text"
                placeholder="Company / Brand (optional)"
                value={formData.company}
                onChange={set('company')}
                className={inputClass}
                aria-label="Company or brand (optional)"
              />
              <textarea
                placeholder="Tell us what you’re working on..."
                required
                value={formData.message}
                onChange={set('message')}
                className={`${inputClass} min-h-[140px] resize-y`}
              />

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full rounded-full bg-brand-green px-8 py-4 text-base font-semibold text-white transition-transform duration-200 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === 'loading' ? 'Sending...' : 'Send Message →'}
              </button>

              {status === 'success' && (
                <div className="flex items-start gap-3 rounded-xl border border-brand-green bg-white/[0.04] p-5">
                  <span className="flex-shrink-0 text-lg font-bold text-brand-green">✓</span>
                  <div>
                    <p className="text-sm font-semibold text-white">Message sent successfully.</p>
                    <p className="mt-1 text-sm text-white/70">
                      Thanks for reaching out. We’ll get back to you within 24 hours.
                    </p>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="rounded-xl border border-red-500/60 bg-red-950/30 p-5">
                  <p className="text-sm text-white">
                    Something went wrong. Please email us directly at{' '}
                    <a href="mailto:info@upperfloor.co" className="text-brand-green hover:underline">
                      info@upperfloor.co
                    </a>
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Book a call — same Cal.com event as the home page */}
        <section
          id="book-call"
          className="mx-auto mt-24 max-w-6xl scroll-mt-24 border-t border-white/10 pt-16 lg:mt-32 lg:pt-24"
        >
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">
              Book a call
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-white md:text-5xl">
              Rather just talk it through?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/80">
              Grab a free 30-minute intro call and let’s figure out if we’re a good fit.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            <CalEmbed calLink={CAL_LINK} id="cal-book-contact" theme="dark" minHeight={720} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
