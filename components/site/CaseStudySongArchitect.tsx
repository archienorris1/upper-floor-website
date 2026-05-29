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
          {/* Carousel creative */}
          <div className="mx-auto w-full max-w-lg">
            <img
              src="/media/sa-carousels.png"
              alt="Song Architect organic carousel creative"
              className="w-full object-contain"
            />
          </div>

          {/* Copy */}
          <div className="text-white">
            <p className="font-serif text-2xl leading-snug md:text-3xl">
              organic carousels designed to build community and engagement
            </p>
            <p className="mt-6 text-2xl font-bold md:text-3xl">
              2 million+
              <br />
              organic views
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
