import AdsCarousel from './AdsCarousel'

const CLIPS = [
  { src: '/media/portfolio/ion8-2.mp4', poster: '/media/portfolio/ion8-2-poster.jpg' },
  { src: '/media/card-collander.mp4', poster: '/media/poster-card-collander.jpg' },
  { src: '/media/portfolio/kelv-1.mp4', poster: '/media/portfolio/kelv-1-poster.jpg' },
  { src: '/media/card-views.mp4', poster: '/media/poster-card-views.jpg' },
  { src: '/media/portfolio/aurora-7.mp4', poster: '/media/portfolio/aurora-7-poster.jpg' },
  { src: '/media/aurora-gaming.mp4', poster: '/media/poster-aurora-gaming.jpg' },
  { src: '/media/portfolio/dc-2.mp4', poster: '/media/portfolio/dc-2-poster.jpg' },
  { src: '/media/card-jersey.mp4', poster: '/media/poster-card-jersey.jpg' },
  { src: '/media/portfolio/fidgie-3.mp4', poster: '/media/portfolio/fidgie-3-poster.jpg' },
  { src: '/media/card-travel.mp4', poster: '/media/poster-card-travel.jpg' },
]

export default function AdsShowcase() {
  return (
    <section className="bg-white py-14 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <h2 className="big-text-section text-center leading-[0.95]">
          <span className="block font-serif text-5xl font-bold text-brand-ink md:text-7xl">
            because the best ads
          </span>
          <span className="mt-2 block font-serif text-4xl font-normal text-brand-ink/80 md:text-6xl">
            don&rsquo;t feel like ads
          </span>
        </h2>

        <p className="reveal-on-scroll mx-auto mt-6 max-w-xl text-center text-base leading-relaxed text-brand-ink/60 md:text-lg">
          We are a marketing agency for ecom brands: we run the Meta ads and make the creative that
          feeds them. Paid ads carry the CTA. Organic blends into the
          feed and builds the brand. Two different crafts. We make both.
        </p>

        <AdsCarousel clips={CLIPS} />
      </div>
    </section>
  )
}
