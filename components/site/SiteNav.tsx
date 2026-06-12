'use client'

/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from 'react'

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-brand-ink/85 shadow-lg shadow-black/20 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <a href="/" className="flex items-center">
          <img src="/media/logo-white.png" alt="Upper Floor" className="h-12 w-auto md:h-14" />
        </a>
        <a
          href="/#book"
          className="rounded-full bg-brand-green px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-green-dark hover:shadow-lg"
        >
          Let’s Talk
        </a>
      </div>
    </header>
  )
}
