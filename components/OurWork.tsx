'use client'

import { useState } from 'react'
import { DynamicFrameLayout, Frame } from '@/components/ui/dynamic-frame-layout'

const workFrames: Frame[] = [
  {
    id: 1, video: '',
    defaultPos: { x: 0, y: 0, w: 4, h: 4 },
    corner: '', edgeHorizontal: '', edgeVertical: '',
    mediaSize: 1, borderThickness: 0, borderSize: 100, isHovered: false,
    title: 'BUILT DIFFERENT',
    episode: 'EP 01',
    teaser: 'How a SaaS founder turned a weekly podcast into their #1 inbound channel.',
    link: '/case-studies/built-different',
  },
  {
    id: 2, video: '',
    defaultPos: { x: 4, y: 0, w: 4, h: 4 },
    corner: '', edgeHorizontal: '', edgeVertical: '',
    mediaSize: 1, borderThickness: 0, borderSize: 100, isHovered: false,
    title: 'VISIONARIES',
    episode: 'EP 02',
    teaser: 'A fintech brand went from 0 to 50K monthly downloads in under 6 months.',
    link: '/case-studies/visionaries',
  },
  {
    id: 3, video: '',
    defaultPos: { x: 8, y: 0, w: 4, h: 4 },
    corner: '', edgeHorizontal: '', edgeVertical: '',
    mediaSize: 1, borderThickness: 0, borderSize: 100, isHovered: false,
    title: 'UNFILTERED',
    episode: 'EP 03',
    teaser: 'How raw leadership conversations built a community of 10,000 loyal listeners.',
    link: '/case-studies/unfiltered',
  },
  {
    id: 4, video: '',
    defaultPos: { x: 0, y: 4, w: 4, h: 4 },
    corner: '', edgeHorizontal: '', edgeVertical: '',
    mediaSize: 1, borderThickness: 0, borderSize: 100, isHovered: false,
    title: 'THE GROWTH LAB',
    episode: 'EP 04',
    teaser: 'A B2B consultancy that became the go-to voice in their space through podcasting.',
    link: '/case-studies/the-growth-lab',
  },
  {
    id: 5, video: '',
    defaultPos: { x: 4, y: 4, w: 4, h: 4 },
    corner: '', edgeHorizontal: '', edgeVertical: '',
    mediaSize: 1, borderThickness: 0, borderSize: 100, isHovered: false,
    title: 'PIPELINE',
    episode: 'EP 05',
    teaser: 'Sales content that generated 120+ qualified inbound leads.',
    link: '/case-studies/pipeline',
  },
  {
    id: 6, video: '',
    defaultPos: { x: 8, y: 4, w: 4, h: 4 },
    corner: '', edgeHorizontal: '', edgeVertical: '',
    mediaSize: 1, borderThickness: 0, borderSize: 100, isHovered: false,
    title: 'DEEP WORK',
    episode: 'EP 06',
    teaser: 'Focus content that built an audience of senior decision makers.',
    link: '/case-studies/deep-work',
  },
]

export default function OurWork() {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)

  const handleArrow = (dir: number) => {
    setFocusedIndex(prev => {
      const current = prev ?? (dir > 0 ? -1 : 0)
      return ((current + dir) + workFrames.length) % workFrames.length
    })
  }

  return (
    <section
      className="border-t border-white/[0.06]"
      id="our-work"
      style={{ paddingTop: '80px', paddingBottom: '80px', backgroundColor: '#000000' }}
    >
      {/* Header */}
      <div className="px-6 lg:px-12 max-w-[1400px] mx-auto flex items-end justify-between mb-10">
        <div>
          <p className="text-[#E07BA3] text-xs font-black uppercase tracking-[0.2em] mb-4">
            Our Work
          </p>
          <h2 className="text-white font-black text-3xl lg:text-4xl uppercase tracking-tight">
            Shows We&apos;ve Built.
          </h2>
        </div>

        {/* Arrow nav */}
        <div className="flex gap-3">
          <button
            onClick={() => handleArrow(-1)}
            aria-label="Previous show"
            className="w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-200 flex-shrink-0"
            style={{ background: '#111111', border: '1px solid #333' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#E07BA3')}
            onMouseLeave={e => (e.currentTarget.style.background = '#111111')}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 3L5 8L10 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={() => handleArrow(1)}
            aria-label="Next show"
            className="w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-200 flex-shrink-0"
            style={{ background: '#111111', border: '1px solid #333' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#E07BA3')}
            onMouseLeave={e => (e.currentTarget.style.background = '#111111')}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M6 3L11 8L6 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Dynamic frame grid */}
      <div className="px-6 lg:px-12 max-w-[1400px] mx-auto">
        <DynamicFrameLayout
          frames={workFrames}
          hoverSize={7}
          gapSize={12}
          focusedIndex={focusedIndex}
        />
      </div>
    </section>
  )
}
