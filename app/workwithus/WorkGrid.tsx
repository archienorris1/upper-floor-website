'use client'

import { useState } from 'react'
import { SoundVideoCard } from '@/components/site/SoundVideo'

/**
 * File stems under /media/portfolio — a spread across every brand, best-first.
 * Twelve clips: two rows of six on desktop, three rows of four on tablet,
 * and a two-column grid on mobile that opens with six and expands on tap.
 */
const CLIPS = [
  'ion8-1',
  'kelv-2',
  'aurora-8',
  'dc-4',
  'fastframe-1',
  'toastybody-1',
  'aurora-10',
  'ion8-3',
  'fidgie-2',
  'aurora-1',
  'dc-5',
  'fastframe-3',
]

const MOBILE_VISIBLE = 6

/**
 * Reel wall. Every clip autoplays muted once on screen and unmutes on tap,
 * same behaviour as /portfolio. Rendered inside the page-level SoundProvider
 * so only one clip on the page has sound at a time.
 */
export default function WorkGrid() {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="mx-auto max-w-6xl px-4 md:px-8">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4 lg:grid-cols-6">
        {CLIPS.map((id, i) => (
          <div
            key={id}
            className={`reveal-on-scroll reveal-delay-${(i % 6) + 1} ${
              i >= MOBILE_VISIBLE && !expanded ? 'hidden md:block' : ''
            }`}
          >
            <SoundVideoCard id={id} eager={i < 2} />
          </div>
        ))}
      </div>

      {!expanded && (
        <div className="mt-5 text-center md:hidden">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="rounded-full border border-white/20 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white/90 transition-colors hover:bg-white/10"
          >
            Show {CLIPS.length - MOBILE_VISIBLE} more clips
          </button>
        </div>
      )}
    </div>
  )
}
