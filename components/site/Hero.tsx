/* eslint-disable @next/next/no-img-element */

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-end justify-center overflow-hidden bg-brand-ink">
      {/* Background media — drop a hero clip at /public/media/hero.mp4 to replace the gradient.
          If the file is missing the gradient + image layer below still render cleanly. */}
      <video
        className="hero-zoom absolute inset-0 h-full w-full object-cover opacity-70"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/media/hero-poster.jpg"
      >
        <source src="/media/hero.mp4" type="video/mp4" />
      </video>

      {/* Fallback / overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(27,138,63,0.25),transparent_60%)]" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-5 pb-16 pt-28 text-center md:pb-24">
        {/* Wordmark */}
        <img
          src="/media/logo-white.png"
          alt="Upper Floor"
          className="hero-load hero-load-1 mb-2 w-44 md:w-52"
        />

        <h1 className="hero-headline sr-only">good products deserve better content</h1>
        <img
          src="/media/hero-headline.png"
          alt="good products deserve better content"
          aria-hidden="true"
          className="hero-load hero-load-2 w-full max-w-[340px] md:max-w-[640px]"
        />

        <a
          href="/#book"
          className="hero-load hero-load-4 mt-7 inline-block rounded-full bg-brand-green px-7 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-green-dark hover:shadow-xl"
        >
          Let&rsquo;s Talk
        </a>
      </div>
    </section>
  )
}
