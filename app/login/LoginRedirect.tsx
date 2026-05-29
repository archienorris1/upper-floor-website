'use client'

/* eslint-disable @next/next/no-img-element */

import { useEffect } from 'react'

const PORTAL_URL = process.env.NEXT_PUBLIC_PORTAL_URL ?? 'https://portal.upperfloor.co'

export default function LoginRedirect() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = PORTAL_URL
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-ink px-6">
      {/* Logo */}
      <a href="/" aria-label="Upper Floor — home" className="mb-12">
        <img src="/media/logo-white.png" alt="Upper Floor" className="h-14 w-auto" />
      </a>

      {/* Headline */}
      <h1 className="mb-6 text-center font-serif text-3xl text-white md:text-5xl">
        Client Portal
      </h1>

      {/* Animated subline */}
      <div className="mb-10 flex items-center gap-3">
        <p className="text-sm tracking-wide text-white/70">Accessing your portal</p>
        <span className="flex items-center gap-1">
          <span className="loading-dot" />
          <span className="loading-dot" />
          <span className="loading-dot" />
        </span>
      </div>

      {/* Fallback link */}
      <a
        href={PORTAL_URL}
        className="text-sm text-brand-green transition-colors duration-200 hover:text-white"
      >
        Click here if you aren’t redirected →
      </a>
    </div>
  )
}
