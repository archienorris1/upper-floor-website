'use client'

import { useState, useEffect, useRef } from 'react'

export default function EpisodePreviewModal() {
  const [open, setOpen] = useState(false)
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

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.88)' }}
      onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}
    >
      <div
        className="bg-[#111111] w-full sm:max-w-lg sm:rounded-[20px] rounded-t-[20px] overflow-y-auto"
        style={{ padding: 'clamp(24px, 5vw, 48px)', maxHeight: '95vh' }}
      >
        {/* Close */}
        <button
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute top-4 right-5 text-white text-3xl leading-none hover:text-[#E07BA3] transition-colors sm:static sm:flex sm:justify-end w-full mb-2 hidden"
        />
        <div className="flex items-start justify-between mb-6">
          <p className="text-[#E07BA3] text-[10px] font-black uppercase tracking-[0.18em]">
            Get Your Free Episode Preview
          </p>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="text-white text-2xl leading-none hover:text-[#E07BA3] transition-colors -mt-1 ml-4 flex-shrink-0"
          >
            ×
          </button>
        </div>

        <p className="text-[#BFBFBF] text-sm leading-relaxed mb-8">
          Send us a recent recording and we&apos;ll produce a full sample episode + short-form clips at no cost. No commitment required. The Upper Floor team will personally review your recording and send your preview within 48–72 hours.
        </p>

        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          <input
            ref={firstInputRef}
            type="text"
            placeholder="First Name"
            required
            className="bg-[#1a1a1a] text-white border border-[#333] rounded-lg text-sm focus:outline-none focus:border-[#E07BA3] transition-colors"
            style={{ padding: '14px' }}
          />
          <input
            type="email"
            placeholder="Email Address"
            required
            className="bg-[#1a1a1a] text-white border border-[#333] rounded-lg text-sm focus:outline-none focus:border-[#E07BA3] transition-colors"
            style={{ padding: '14px' }}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="bg-[#1a1a1a] text-white border border-[#333] rounded-lg text-sm focus:outline-none focus:border-[#E07BA3] transition-colors"
            style={{ padding: '14px' }}
          />
          <input
            type="text"
            placeholder="Podcast / Show Name or Topic"
            className="bg-[#1a1a1a] text-white border border-[#333] rounded-lg text-sm focus:outline-none focus:border-[#E07BA3] transition-colors"
            style={{ padding: '14px' }}
          />

          <div>
            <label className="block text-[#BFBFBF] text-xs mb-2">
              Upload your recording{' '}
              <span className="text-white/40">.mp3 .mp4 .wav .mov. Max 500MB</span>
            </label>
            <input
              type="file"
              accept=".mp3,.mp4,.wav,.mov"
              className="w-full bg-[#1a1a1a] text-white border border-[#333] rounded-lg text-sm focus:outline-none focus:border-[#E07BA3] transition-colors cursor-pointer file:bg-transparent file:border-0 file:text-[#E07BA3] file:text-xs file:font-bold file:mr-4 file:cursor-pointer file:py-0"
              style={{ padding: '14px' }}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#E07BA3] text-black font-black text-sm rounded-full hover:bg-[#cc6d95] transition-colors duration-200 mt-2"
            style={{ padding: '16px' }}
          >
            Send My Recording →
          </button>

          <p className="text-[#BFBFBF] text-xs text-center leading-relaxed">
            The Upper Floor team will personally review your recording and be in touch within 48–72 hours.
          </p>
        </form>
      </div>
    </div>
  )
}
