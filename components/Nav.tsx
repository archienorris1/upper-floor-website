'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import EpisodePreviewButton from './EpisodePreviewButton'

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
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
        scrolled || menuOpen ? 'bg-[#0d0d0d]' : 'bg-transparent'
      }`}
      aria-label="Main navigation"
    >
      <div className="max-w-[1400px] mx-auto pr-6 lg:pr-12 flex items-center justify-between" style={{ minHeight: '100px', paddingLeft: '40px' }}>
        <a href="#" className="flex items-center" aria-label="Upper Floor — home">
          <Image
            src="/logo.png"
            alt="Upper Floor"
            width={240}
            height={80}
            className="w-auto"
            style={{ height: '80px', width: 'auto', display: 'block' }}
            priority
          />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-white text-sm font-normal hover:text-[#BFBFBF] transition-colors duration-200"
            >
              {label}
            </a>
          ))}
          <EpisodePreviewButton className="bg-[#E07BA3] text-black font-black text-sm px-5 py-2.5 rounded-full hover:bg-[#cc6d95] transition-colors duration-200">
            Get a Free Episode Preview →
          </EpisodePreviewButton>
          <a
            href="/login"
            className="text-white text-sm font-black uppercase tracking-wider px-5 py-2.5 rounded-full border border-white hover:bg-[#E07BA3] hover:text-black hover:border-[#E07BA3] transition-all duration-200"
          >
            Client Portal →
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
        <div className="md:hidden bg-[#0d0d0d] border-t border-white/10 px-6 py-6 flex flex-col gap-5">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-white text-lg font-normal"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          <EpisodePreviewButton className="inline-block w-full bg-[#E07BA3] text-black font-black text-sm px-5 py-3 rounded-full text-center hover:bg-[#cc6d95] transition-colors duration-200">
            Get a Free Episode Preview →
          </EpisodePreviewButton>
          <a
            href="/login"
            className="inline-block text-white text-sm font-black uppercase tracking-wider px-5 py-3 rounded-full border border-white text-center hover:bg-[#E07BA3] hover:text-black hover:border-[#E07BA3] transition-all duration-200"
            onClick={() => setMenuOpen(false)}
          >
            Client Portal →
          </a>
        </div>
      )}
    </nav>
  )
}
