import Link from 'next/link'
import EpisodePreviewButton from '@/components/EpisodePreviewButton'

export default function CaseStudyPage() {
  return (
    <main
      className="px-6 lg:px-12 py-32"
      style={{ backgroundColor: '#000000', minHeight: '100vh' }}
    >
      <div className="max-w-[800px] mx-auto flex flex-col gap-8">
        <Link
          href="/#our-work"
          className="text-[#E07BA3] text-sm hover:underline"
        >
          ← Back
        </Link>
        <p className="text-[#E07BA3] text-xs font-black uppercase tracking-[0.2em]">
          Case Study
        </p>
        <h1
          className="text-white font-black uppercase leading-none tracking-tight"
          style={{ fontSize: 'clamp(3rem, 8vw, 5rem)' }}
        >
          COMING SOON.
        </h1>
        <p className="text-[#BFBFBF] text-base leading-relaxed max-w-[480px]">
          We&apos;re building out our full case study library. Check back soon — or get in touch to hear about our work directly.
        </p>
        <EpisodePreviewButton className="self-start bg-[#E07BA3] text-black font-black text-sm px-6 py-3 rounded-full hover:bg-[#cc6d95] transition-colors duration-200">
          Get a Free Episode Preview →
        </EpisodePreviewButton>
      </div>
    </main>
  )
}
