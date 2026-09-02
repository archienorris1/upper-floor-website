'use client'

import { useEffect, useState } from 'react'

/**
 * Mobile-only bottom bar so the CTA is never more than a thumb away.
 * Hides itself while the booking section is on screen — no point
 * pointing at a calendar the visitor is already looking at.
 */
export default function StickyCta() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const target = document.getElementById('book')
    if (!target) return
    const io = new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting), {
      threshold: 0.05,
    })
    io.observe(target)
    return () => io.disconnect()
  }, [])

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-brand-ink/90 p-3 backdrop-blur-md transition-transform duration-300 md:hidden ${
        hidden ? 'translate-y-full' : 'translate-y-0'
      }`}
      style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
    >
      <a
        href="#book"
        className="flex w-full items-center justify-center rounded-full bg-brand-green px-6 py-3.5 text-sm font-semibold text-white"
      >
        Book a call · see if you qualify
      </a>
    </div>
  )
}
