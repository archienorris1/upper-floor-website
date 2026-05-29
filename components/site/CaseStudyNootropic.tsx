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
              src="/media/nootropic-product.png"
              alt="Nootropict product creative"
              className="w-full rounded-2xl object-cover"
            />
            <img
              src="/media/nootropic-data.png"
              alt="Nootropict store performance dashboard"
              className="absolute -right-2 top-1/2 w-1/2 max-w-[220px] -translate-y-1/2 rounded-xl shadow-2xl ring-1 ring-white/10"
            />
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
