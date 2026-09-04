'use client'

import { SoundVideoCard } from '@/components/site/SoundVideo'

/**
 * One clip per format we ship. The point of this section is range: a visitor
 * from an ad should leave knowing we are not a one-trick UGC shop.
 */
const FORMATS = [
  {
    id: 'kelv-1',
    label: 'UGC',
    title: 'UGC ads',
    body: 'Real people, native delivery, hooks that earn the first three seconds.',
  },
  {
    id: 'dc-1',
    label: 'Talking head',
    title: 'Talking heads',
    body: 'Founder-led and expert-led video that builds trust before it asks for the sale.',
  },
  {
    id: 'dc-2',
    label: 'Animated',
    title: 'Animated explainers',
    body: 'Motion graphics that make a complicated offer feel simple in fifteen seconds.',
  },
  {
    id: 'ion8-2',
    label: 'Motion ad',
    title: 'Product motion ads',
    body: 'Studio-grade product motion for launches and always-on paid.',
  },
  {
    id: 'aurora-7',
    label: 'ASMR',
    title: 'ASMR and sensory',
    body: 'Sound-led, satisfying content that holds attention without a line of copy.',
  },
  {
    id: 'aurora-9',
    label: 'Organic',
    title: 'Trend-led organic',
    body: 'Feed-native clips on the formats already working, shipped while the trend is live.',
  },
]

export default function FormatGrid() {
  return (
    <div className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 md:mx-auto md:grid md:max-w-6xl md:snap-none md:grid-cols-3 md:gap-6 md:overflow-visible md:px-8">
      {FORMATS.map((f, i) => (
        <div
          key={f.id}
          className={`reveal-on-scroll reveal-delay-${(i % 3) + 1} w-[68vw] max-w-[300px] flex-none snap-center md:w-full md:max-w-none`}
        >
          <SoundVideoCard id={f.id} label={f.label} />
          <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-white/60">{f.body}</p>
        </div>
      ))}
      <div className="w-1 flex-none md:hidden" aria-hidden="true" />
    </div>
  )
}
