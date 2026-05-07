'use client'

import { useEffect } from 'react'
import Image from 'next/image'

const PORTAL_URL = process.env.NEXT_PUBLIC_PORTAL_URL ?? 'https://portal.upperfloor.co'

export default function LoginRedirect() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = PORTAL_URL
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ backgroundColor: '#000000' }}
    >
      {/* Logo */}
      <a href="/" aria-label="Upper Floor — home" className="mb-12">
        <Image
          src="/logo.png"
          alt="Upper Floor"
          width={180}
          height={60}
          style={{ height: '56px', width: 'auto' }}
          priority
        />
      </a>

      {/* Headline */}
      <h1
        className="text-white font-black uppercase tracking-widest text-center mb-6"
        style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', letterSpacing: '0.15em' }}
      >
        Client Portal
      </h1>

      {/* Animated subline */}
      <div className="flex items-center gap-3 mb-10">
        <p className="text-[#BFBFBF] text-sm tracking-wide">
          Accessing your portal
        </p>
        <span className="flex items-center gap-1">
          <span className="loading-dot" />
          <span className="loading-dot" />
          <span className="loading-dot" />
        </span>
      </div>

      {/* Fallback link */}
      <a
        href={PORTAL_URL}
        className="text-[#E07BA3] text-sm hover:text-white transition-colors duration-200"
      >
        Click here if you aren&apos;t redirected →
      </a>
    </div>
  )
}
