'use client'

import { useState, useEffect, useRef } from 'react'

const inputClass =
  'bg-[#1a1a1a] text-white border border-[#333] rounded-lg text-sm focus:outline-none focus:border-[#E07BA3] transition-colors w-full'
const inputStyle = { padding: '14px' }

export default function EpisodePreviewModal() {
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    firstName: '',
    email: '',
    phone: '',
    brandName: '',
    podcastLink: '',
    industry: '',
    goal: '',
  })
  const firstInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener('open-preview-modal', handler)
    return () => window.removeEventListener('open-preview-modal', handler)
  }, [])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      firstInputRef.current?.focus()
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    if (open) window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open])

  const close = () => {
    setOpen(false)
    setTimeout(() => {
      setSubmitted(false)
      setForm({ firstName: '', email: '', phone: '', brandName: '', podcastLink: '', industry: '', goal: '' })
    }, 300)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/free-episode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.88)' }}
      onClick={(e) => { if (e.target === e.currentTarget) close() }}
    >
      <div
        className="bg-[#111111] w-full sm:max-w-lg sm:rounded-[20px] rounded-t-[20px] overflow-y-auto"
        style={{ padding: 'clamp(24px, 5vw, 48px)', maxHeight: '95vh' }}
      >
        {/* Header row */}
        <div className="flex items-start justify-between mb-2">
          <p className="text-[#E07BA3] text-[10px] font-black uppercase tracking-[0.18em]">
            Free Podcast Audit
          </p>
          <button
            onClick={close}
            aria-label="Close"
            className="text-white text-2xl leading-none hover:text-[#E07BA3] transition-colors -mt-1 ml-4 flex-shrink-0"
          >
            ×
          </button>
        </div>

        {submitted ? (
          <div
            style={{
              background: '#111111',
              border: '1px solid #E07BA3',
              borderRadius: '12px',
              padding: '24px',
              marginTop: '16px',
            }}
          >
            <h2 className="text-white font-black text-2xl mb-3">We&apos;ve got it.</h2>
            <p className="text-[#BFBFBF] text-sm leading-relaxed mb-4">
              Thanks {form.firstName} — we&apos;ll review your details and send your free podcast audit within 48 hours. Keep an eye on {form.email}.
            </p>
            <button
              onClick={close}
              className="text-[#E07BA3] text-sm font-black uppercase tracking-wider hover:underline"
            >
              Close ×
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-white font-black text-2xl uppercase tracking-tight leading-tight">
              GET YOUR FREE PODCAST AUDIT
            </h2>
            <p style={{ color: '#BFBFBF', fontSize: '15px', lineHeight: 1.6, margin: '12px 0 32px' }}>
              Tell us about your show and we&apos;ll send you a personalised audit — covering positioning, growth opportunities, and what we&apos;d do differently.
            </p>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                ref={firstInputRef}
                type="text"
                placeholder="Your name"
                required
                value={form.firstName}
                onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                className={inputClass}
                style={inputStyle}
              />
              <input
                type="email"
                placeholder="you@company.com"
                required
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className={inputClass}
                style={inputStyle}
              />
              <input
                type="tel"
                placeholder="Phone number (inc. country code, e.g. +44 7700 900000)"
                required
                value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                className={inputClass}
                style={inputStyle}
              />
              <input
                type="text"
                placeholder="Your podcast or brand name"
                required
                value={form.brandName}
                onChange={e => setForm(f => ({ ...f, brandName: e.target.value }))}
                className={inputClass}
                style={inputStyle}
              />
              <div>
                <input
                  type="url"
                  placeholder="YouTube, Spotify or website link"
                  required
                  value={form.podcastLink}
                  onChange={e => setForm(f => ({ ...f, podcastLink: e.target.value }))}
                  className={inputClass}
                  style={inputStyle}
                />
                <p className="text-[#666] text-xs mt-1.5">Anywhere we can find your show...</p>
              </div>
              <select
                required
                value={form.industry}
                onChange={e => setForm(f => ({ ...f, industry: e.target.value }))}
                className={inputClass}
                style={{ ...inputStyle, color: form.industry ? '#fff' : '#666' }}
              >
                <option value="" disabled>Select your industry</option>
                <option value="SaaS">SaaS</option>
                <option value="Fintech">Fintech</option>
                <option value="Professional Services">Professional Services</option>
                <option value="Healthcare">Healthcare</option>
                <option value="B2B Services">B2B Services</option>
                <option value="Marketing & Agency">Marketing &amp; Agency</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Other">Other</option>
              </select>
              <textarea
                placeholder="What&apos;s your main goal for the podcast? (growth, leads, authority...)"
                required
                rows={3}
                value={form.goal}
                onChange={e => setForm(f => ({ ...f, goal: e.target.value }))}
                className={inputClass}
                style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#E07BA3] text-black font-black text-sm rounded-full hover:bg-[#cc6d95] transition-colors duration-200 mt-2 disabled:opacity-60"
                style={{ padding: '16px' }}
              >
                {loading ? 'Sending...' : 'Get My Audit →'}
              </button>

              <p style={{ color: '#666', fontSize: '12px', textAlign: 'center' }}>
                Free. No commitment. Delivered within 48 hours.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
