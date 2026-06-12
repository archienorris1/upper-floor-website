import ReadMore from './ReadMore'
import StatNumber from './StatNumber'
import VideoCard from './VideoCard'

export default function CaseStudyToasty() {
  return (
    <section className="bg-brand-green px-4 py-14 md:px-8 md:py-20">
      <div className="reveal-on-scroll mx-auto max-w-6xl rounded-3xl bg-brand-ink p-6 md:p-10">
        <div className="flex items-center justify-between">
          <p className="text-sm text-white/60">featured case study</p>
          <span className="rounded-full border border-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/70">
            ugc ads
          </span>
        </div>

        <div className="mt-4 flex justify-center">
          <span className="font-serif text-2xl font-semibold lowercase tracking-tight text-white md:text-3xl">
            toastybody
          </span>
        </div>

        <div className="mt-8 grid items-center gap-8 md:grid-cols-[1fr_1.3fr]">
          {/* Copy — leads on desktop to alternate the rhythm */}
          <div className="order-2 text-white md:order-1">
            <p className="font-serif text-3xl leading-tight md:text-4xl">
              <StatNumber value={28500} prefix="$" />
            </p>
            <p className="mt-1 text-xl text-white/80 md:text-2xl">in a single day</p>
            <ReadMore className="mt-6">
              <p className="text-base leading-relaxed text-white/80">
                Toasty Body is proof that one winning creative changes everything. We script and
                produce UGC built for paid. Real faces, native delivery, hooks that earn the
                first three seconds and CTAs that close. The result: a $28,500 day.
              </p>
            </ReadMore>
          </div>

          {/* UGC clip */}
          <div className="order-1 mx-auto w-full max-w-[260px] md:order-2 md:max-w-[300px]">
            <VideoCard src="/media/toasty-ugc.mp4" poster="/media/poster-toasty-ugc.jpg" />
          </div>
        </div>
      </div>
    </section>
  )
}
