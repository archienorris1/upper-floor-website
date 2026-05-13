'use client'

import { useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

const inputClass =
  'w-full bg-[#1a1a1a] text-white border border-[#333333] rounded-lg text-base placeholder-[#555555] focus:outline-none focus:border-[#E07BA3] transition-colors duration-200'
const inputStyle = { padding: '14px 16px' }

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
    setFormData(prev => ({ ...prev, [field]: e.target.value }))

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
    <main
      className="min-h-screen px-6 lg:px-12 py-32"
      style={{ backgroundColor: '#000000' }}
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-16 lg:gap-24 items-start">

        {/* LEFT */}
        <div className="flex flex-col gap-6">
          <p className="text-[#E07BA3] text-xs font-black uppercase tracking-[0.1em]">
            Get in Touch
          </p>
          <h1
            className="text-white font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}
          >
            LET&apos;S<br />TALK.
          </h1>
          <p className="text-white text-base leading-relaxed max-w-[360px]">
            Whether you have a question, want to learn more about our process, or just want to say hello. We&apos;d love to hear from you.
          </p>
          <div>
            <p className="text-[#BFBFBF] text-sm mb-1">Or email us directly:</p>
            <a
              href="mailto:info@upperfloor.co"
              className="text-[#E07BA3] text-sm no-underline hover:underline transition-all duration-200"
            >
              info@upperfloor.co
            </a>
          </div>
        </div>

        {/* RIGHT — form */}
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                required
                value={formData.firstName}
                onChange={set('firstName')}
                className={inputClass}
                style={inputStyle}
              />
              <input
                type="text"
                placeholder="Last Name"
                required
                value={formData.lastName}
                onChange={set('lastName')}
                className={inputClass}
                style={inputStyle}
              />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={set('email')}
              className={inputClass}
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="Optional"
              value={formData.company}
              onChange={set('company')}
              className={inputClass}
              style={{ ...inputStyle, opacity: formData.company ? 1 : undefined }}
              aria-label="Company / Podcast Name (optional)"
            />
            <textarea
              placeholder="Tell us what you're working on..."
              required
              value={formData.message}
              onChange={set('message')}
              className={inputClass}
              style={{ ...inputStyle, minHeight: '140px', resize: 'vertical' }}
            />

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-[#E07BA3] text-black font-black text-base hover:bg-[#cc6d95] transition-colors duration-200"
              style={{
                borderRadius: '100px',
                padding: '16px 32px',
                fontSize: '16px',
                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                opacity: status === 'loading' ? 0.7 : 1,
              }}
            >
              {status === 'loading' ? 'Sending...' : 'Send Message →'}
            </button>

            {status === 'success' && (
              <div
                className="flex items-start gap-3 rounded-xl"
                style={{ background: '#111111', border: '1px solid #E07BA3', padding: '20px' }}
              >
                <span className="text-[#E07BA3] text-lg font-black flex-shrink-0">✓</span>
                <div>
                  <p className="text-white text-sm font-bold">Message sent successfully.</p>
                  <p className="text-[#BFBFBF] text-sm mt-1">
                    Thanks for reaching out. We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div
                className="rounded-xl"
                style={{ background: '#1a0000', border: '1px solid #ff4444', padding: '20px' }}
              >
                <p className="text-white text-sm">
                  Something went wrong. Please email us directly at{' '}
                  <a href="mailto:info@upperfloor.co" className="text-[#E07BA3] hover:underline">
                    info@upperfloor.co
                  </a>
                </p>
              </div>
            )}
          </form>
        </div>

      </div>
    </main>
  )
}
