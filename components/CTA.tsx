export default function CTA() {
  return (
    <section id="contact" className="bg-[#E07BA3] py-24 lg:py-32 px-6 lg:px-12 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-start lg:items-center gap-12">

        {/* Decorative squiggles — left side */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none" aria-hidden="true">
          <svg width="60" height="120" viewBox="0 0 60 120" fill="none">
            {/* Z/lightning squiggle 1 */}
            <path
              d="M10 10 L50 40 L10 70 L50 100"
              stroke="black"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          <svg width="60" height="120" viewBox="0 0 60 120" fill="none" className="-mt-8 ml-6">
            {/* Z/lightning squiggle 2 */}
            <path
              d="M10 10 L50 40 L10 70 L50 100"
              stroke="black"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h2
            className="text-black font-black tracking-tight leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            Let&apos;s build your podcast into a growth channel.
          </h2>
        </div>

        {/* Button */}
        <div className="flex-shrink-0">
          <a
            href="mailto:hello@upperfloor.co.uk"
            className="inline-block bg-black text-white font-black text-sm px-8 py-4 rounded-full hover:bg-[#1a1a1a] transition-colors duration-200"
          >
            Book a strategy call ↗
          </a>
        </div>

      </div>
    </section>
  )
}
