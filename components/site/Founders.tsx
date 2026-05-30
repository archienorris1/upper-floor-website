/* eslint-disable @next/next/no-img-element */

export default function Founders() {
  return (
    <section className="bg-white px-5 py-16 md:py-24">
      <div className="reveal-on-scroll mx-auto max-w-3xl text-center">
        <p className="text-sm text-brand-ink/60">Founders</p>
        <div className="mt-6 overflow-hidden rounded-3xl">
          <img
            src="/media/me-jack.png"
            alt="Archie Norris and Jack Buster-Weston"
            className="w-full object-cover"
          />
        </div>
        <p className="mt-6 font-serif text-2xl text-brand-ink md:text-3xl">
          Archie Norris and Jack Buster-Weston
        </p>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-brand-ink/70">
          We are experts in growing strong brands and communities, and in creating content that
          provokes emotion and sells more.
        </p>
      </div>
    </section>
  )
}
