/* eslint-disable @next/next/no-img-element */

import ReadMore from './ReadMore'
import StatNumber from './StatNumber'
import VideoCard from './VideoCard'

const CLIPS = [
  { src: '/media/aurora-trend.mp4', poster: '/media/poster-aurora-trend.jpg' },
  { src: '/media/aurora-lighting.mp4', poster: '/media/poster-aurora-lighting.jpg' },
  { src: '/media/aurora-unboxing.mp4', poster: '/media/poster-aurora-unboxing.jpg' },
]

export default function CaseStudyAurora() {
  return (
    <section className="bg-brand-green px-4 pb-6 md:px-8 md:pb-8">
      <div className="reveal-on-scroll mx-auto max-w-6xl rounded-3xl bg-brand-ink p-6 md:p-10">
        <div className="flex items-center justify-between">
          <p className="text-sm text-white/60">featured case study</p>
          <span className="rounded-full border border-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/70">
            organic + paid
          </span>
        </div>

        <div className="mt-4 flex justify-center">
          <img
            src="/media/aurora-logo-white.png"
            alt="Aurora"
            className="h-6 w-auto md:h-8"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="mt-8 grid items-center gap-8 md:grid-cols-[1.3fr_1fr]">
          {/* Clip trio */}
          <div className="mx-auto grid w-full max-w-lg grid-cols-3 gap-2.5 md:gap-3">
            {CLIPS.map((clip, i) => (
              <VideoCard key={clip.src} src={clip.src} poster={clip.poster} delay={(i % 3) + 1} />
            ))}
          </div>

          {/* Copy */}
          <div className="text-white">
            <p className="font-serif text-3xl leading-tight md:text-4xl">
              <StatNumber value={700} prefix="$" suffix="k" />
            </p>
            <p className="mt-1 text-xl text-white/80 md:text-2xl">in a single month</p>
            <ReadMore className="mt-6">
              <p className="text-base leading-relaxed text-white/80">
                Aurora turns any room into a night sky. The product demos itself on camera. Our
                job is making people stop to watch. We ship a constant stream of feed-native video
                for Aurora: trends, room transformations, unboxings and UGC. Organic that builds
                the brand. Ads that close the sale. Within a month, Aurora hit $700,000 in
                revenue.
              </p>
            </ReadMore>
          </div>
        </div>
      </div>
    </section>
  )
}
