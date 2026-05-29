import VideoCard from './VideoCard'

const CLIPS = [
  { src: '/media/card-collander.mp4', caption: undefined },
  { src: '/media/card-views.mp4', caption: undefined },
  { src: '/media/card-jersey.mp4', caption: undefined },
  { src: '/media/card-travel.mp4', caption: undefined },
]

export default function AdsShowcase() {
  return (
    <section className="bg-white py-14 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <h2 className="big-text-section text-center leading-[0.95]">
          <span className="block font-serif text-5xl font-bold text-brand-ink md:text-7xl">
            because the best ads
          </span>
          <span className="mt-2 block font-serif text-4xl font-normal text-brand-ink/80 md:text-6xl">
            don’t feel like ads
          </span>
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-4 md:mt-16 md:grid-cols-4 md:gap-5">
          {CLIPS.map((clip, i) => (
            <VideoCard key={clip.src} src={clip.src} caption={clip.caption} delay={(i % 4) + 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
