const services = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E07BA3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
    title: 'Strategy',
    description: 'We position your podcast to attract the right buyers and stand out in your category.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E07BA3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    ),
    title: 'Production',
    description: 'We handle everything — from recording and editing to publishing and show management.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E07BA3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
    title: 'Growth',
    description: 'We turn content into distribution, engagement and pipeline for your business.',
  },
]

export default function WhatWeDo() {
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-12 border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

        {/* LEFT */}
        <div>
          <p className="text-[#E07BA3] text-xs font-black uppercase tracking-[0.2em] mb-6">
            What we do
          </p>
          <h2
            className="font-black text-white tracking-tight leading-tight"
            style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
          >
            End-to-end podcast production that drives real business{' '}
            <span className="relative inline-block">
              results.
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 120 12"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M2 9 C 20 3, 40 13, 60 7 S 100 3, 118 8"
                  stroke="#E07BA3"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>
          </h2>
        </div>

        {/* RIGHT — 3 service columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {services.map(({ icon, title, description }) => (
            <div key={title} className="flex flex-col gap-4">
              <div>{icon}</div>
              <h3 className="text-white font-black text-lg">{title}</h3>
              <p className="text-[#BFBFBF] text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
