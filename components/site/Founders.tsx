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
      </div>
    </section>
  )
}
