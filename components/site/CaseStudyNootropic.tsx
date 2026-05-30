/* eslint-disable @next/next/no-img-element */

export default function CaseStudyNootropic() {
  return (
    <section className="bg-brand-green px-4 pb-16 md:px-8 md:pb-20">
      <div className="reveal-on-scroll mx-auto max-w-6xl rounded-3xl bg-brand-ink p-6 md:p-10">
        <p className="text-sm text-white/60">featured case study</p>

        <div className="mt-4 flex justify-center">
          <span className="font-sans text-2xl font-semibold tracking-wide text-white md:text-3xl">
            NOOTROPICT.
          </span>
        </div>

        <div className="mt-8 grid items-center gap-8 md:grid-cols-[1.3fr_1fr]">
          {/* Composite media */}
          <div className="relative mx-auto w-full max-w-md">
            <img
              src="/media/nootropic-product-v2.png"
              alt="Nootropict product creative"
              className="w-full rounded-2xl object-cover"
            />
            <div className="absolute bottom-0 right-0 w-1/2 max-w-[200px] overflow-hidden rounded-tl-2xl rounded-br-2xl shadow-2xl ring-1 ring-white/10">
              <img
                src="/media/nootropic-roas.png"
                alt="Nootropict return on ad spend report"
                className="w-full opacity-90"
              />
              {/* Subtle dark tint so the bright screenshot reads as part of the dark scene */}
              <div className="pointer-events-none absolute inset-0 bg-black/20" />
            </div>
          </div>

          {/* Copy */}
          <div className="text-white">
            <p className="font-serif text-3xl leading-snug md:text-4xl">
              ads that stopped
              <br />
              the scroll
            </p>
            <p className="mt-6 text-2xl font-bold md:text-3xl">
              30x return
              <br />
              on ad spend
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
