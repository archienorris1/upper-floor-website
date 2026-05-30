'use client'

import { useState } from 'react'

export default function ReadMore({
  children,
  className = '',
  label = 'Read more',
  labelOpen = 'Read less',
}: {
  children: React.ReactNode
  className?: string
  label?: string
  labelOpen?: string
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green transition-colors hover:text-white"
      >
        {open ? labelOpen : label}
        <span
          aria-hidden="true"
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          ↓
        </span>
      </button>
      <div className={open ? 'mt-4' : 'hidden'}>{children}</div>
    </div>
  )
}
