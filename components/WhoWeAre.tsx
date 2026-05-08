import Image from 'next/image'
import EpisodePreviewButton from './EpisodePreviewButton'

export default function WhoWeAre() {
  return (
    <section className="px-6 lg:px-12 border-t border-white/[0.06]" style={{ paddingTop: '80px', paddingBottom: '80px' }} id="about">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* LEFT */}
        <div className="flex flex-col gap-6">
          <p className="text-[#E07BA3] text-xs font-black uppercase tracking-[0.1em]">
            Who We Are
          </p>
          <h2 className="text-white font-black text-3xl lg:text-4xl uppercase tracking-tight leading-tight">
            A Small Team.<br />Serious Results.
          </h2>
          <p className="text-white text-base leading-relaxed">
            Upper Floor is built by a team of producers, editors, and strategists obsessed with one thing — making podcasts that actually grow businesses. We&apos;re not an agency with 200 clients. We&apos;re selective, hands-on, and genuinely invested in every show we build.
          </p>
          <p className="text-[#BFBFBF] text-base leading-relaxed">
            We&apos;d love to show you what we can do — for free.
          </p>
          <EpisodePreviewButton className="self-start bg-[#E07BA3] text-black font-black text-sm px-6 py-3 rounded-full hover:bg-[#cc6d95] transition-colors duration-200">
            Get a Free Episode Preview →
          </EpisodePreviewButton>
        </div>

        {/* RIGHT — studio photo */}
        <div className="flex flex-col gap-4">
          <div className="relative w-full rounded-[20px] overflow-hidden" style={{ aspectRatio: '4/3' }}>
            <Image
              src="/images/podcast-studio-empty.jpg"
              alt="Upper Floor podcast studio"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <p className="text-[#BFBFBF] text-xs">
            Archie &amp; the Upper Floor team — London.
          </p>
        </div>

      </div>
    </section>
  )
}
