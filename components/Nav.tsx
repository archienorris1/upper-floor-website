'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const navLinks = [
  { label: 'WORK', href: '#work' },
  { label: 'ABOUT', href: '#about' },
  { label: 'SERVICES', href: '#services' },
  { label: 'RESOURCES', href: '#resources' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled || menuOpen ? 'bg-black' : 'bg-transparent'
      }`}
      aria-label="Main navigation"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">
        <a href="#" className="flex items-center" aria-label="Upper Floor — home">
          <Image
            src="/logo.png"
            alt="Upper Floor"
            width={96}
            height={96}
            className="h-11 w-auto"
            priority
          />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-white text-sm font-medium tracking-wide hover:text-[#BFBFBF] transition-colors duration-200"
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-[#E07BA3] text-black text-sm font-black px-5 py-2.5 uppercase tracking-wide hover:bg-[#cc6d95] transition-colors duration-200"
          >
            BOOK A CALL ↗
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span
              className={`block h-0.5 bg-white transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
            />
            <span
              className={`block h-0.5 bg-white transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block h-0.5 bg-white transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-black border-t border-white/10 px-6 py-6 flex flex-col gap-5">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-white text-lg font-black uppercase tracking-[-0.02em]"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            className="inline-block bg-[#E07BA3] text-black text-sm font-black px-5 py-3 uppercase tracking-wide text-center mt-2"
            onClick={() => setMenuOpen(false)}
          >
            BOOK A CALL ↗
          </a>
        </div>
      )}
    </nav>
  )
}
