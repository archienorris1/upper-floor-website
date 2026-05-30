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
            <p className="font-serif text-3xl leading-tight md:text-4xl">30.86x ROAS</p>
            <p className="mt-1 text-xl text-white/80 md:text-2xl">on a top performing ad set</p>
            <p className="mt-6 text-base leading-relaxed text-white/80">
              Nootropict is a wellness gummy for men, built to reduce stress and lift libido. A
              trending product, launched at the right moment. The ads in the market were weak. Soft
              hooks, flat CTAs, no real reason to stop scrolling. We saw the gap. We made the
              creative ourselves, a mix of UGC and static, built around stronger hooks and sharper
              CTAs. The result was a revenue spike of 2600% in seven days and a 195% increase in
              conversions.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
