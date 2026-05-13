import Image from 'next/image'
import EpisodePreviewButton from './EpisodePreviewButton'

export default function WhoWeAre() {
  return (
    <section
      className="px-6 lg:px-12"
      style={{ backgroundColor: '#FFFFFF', paddingTop: '80px', paddingBottom: '80px' }}
      id="about"
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        <div className="flex flex-col gap-6 order-1 lg:order-none reveal-on-scroll">
          <p className="text-[#E07BA3] text-xs font-black uppercase tracking-[0.1em]">
            Who We Are
          </p>
          <h2 className="text-black font-black text-3xl lg:text-4xl uppercase tracking-tight leading-tight reveal-headline">
            A Small Team.<br />Serious Results.
          </h2>
          <p className="text-[#333333] text-base leading-relaxed">
            Upper Floor is built by a team of producers, editors, and strategists obsessed with one thing. Making podcasts that actually grow businesses. We&apos;re not an agency with 200 clients. We&apos;re selective, hands-on, and genuinely invested in every show we build.
          </p>
          <p className="text-[#666666] text-base leading-relaxed">
            We&apos;d love to show you what we can do. For free.
          </p>
          <EpisodePreviewButton className="self-start bg-[#E07BA3] text-black font-black text-sm px-6 py-3 rounded-full hover:bg-[#cc6d95] transition-colors duration-200">
            Get a Free Episode Preview →
          </EpisodePreviewButton>
        </div>

        <div className="flex flex-col gap-0 order-2 lg:order-none reveal-on-scroll reveal-delay-2">
          <div className="relative w-full rounded-[20px] overflow-hidden" style={{ aspectRatio: '4/3' }}>
            <Image
              src="/images/arch-jack-studio.jpg"
              alt="Archie and Jack, the Upper Floor team, in the studio"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <p style={{ color: '#BFBFBF', fontSize: '13px', marginTop: '12px' }}>
            Archie &amp; Jack. The Upper Floor team. London.
          </p>
        </div>

      </div>
    </section>
  )
}
