/* eslint-disable @next/next/no-img-element */

export default function CaseStudySongArchitect() {
  return (
    <section className="bg-white px-4 pb-24 md:px-8 md:pb-32">
      <div className="reveal-on-scroll mx-auto max-w-6xl rounded-3xl bg-brand-ink p-6 md:p-10">
        <p className="text-sm text-white/60">featured case study</p>

        <div className="mt-4 flex justify-center">
          <span className="flex flex-col items-center text-center font-sans text-xl font-bold leading-tight text-white md:text-2xl">
            <span>song</span>
            <span className="underline decoration-2 underline-offset-2">architect</span>
          </span>
        </div>

        <div className="mt-8 grid items-center gap-8 md:grid-cols-[1.3fr_1fr]">
          {/* Carousel creative + organic stats */}
          <div className="mx-auto flex w-full max-w-lg flex-col items-center gap-6">
            <img
              src="/media/sa-carousels.png"
              alt="Song Architect organic carousel creative"
              className="w-full object-contain"
            />
            <img
              src="/media/sa-ig-stats.png"
              alt="Song Architect Instagram views analytics"
              className="w-full max-w-[280px] rounded-2xl object-contain shadow-2xl ring-1 ring-white/10"
            />
          </div>

          {/* Copy */}
          <div className="text-white">
            <p className="font-serif text-3xl leading-tight md:text-4xl">1,000,000+</p>
            <p className="mt-1 text-xl text-white/80 md:text-2xl">organic views in 30 days</p>
            <p className="mt-6 text-base leading-relaxed text-white/80">
              Song Architect is our own music brand. We grew it with organic carousels alone. No
              ads. Over one million organic views in a single month, with one how to carousel
              passing 400,000 views on its own. Inside twelve months we became the leading voice in
              the niche and built a community of 10,000 people, and our work helped an artist reach
              over 10 million streams.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
