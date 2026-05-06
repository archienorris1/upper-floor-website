import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import TrustedBy from '@/components/TrustedBy'
import WhatWeDo from '@/components/WhatWeDo'
import CaseStudyEpisode from '@/components/CaseStudyEpisode'
import Testimonials from '@/components/Testimonials'
import WhoWeAre from '@/components/WhoWeAre'
import Process from '@/components/Process'
import Insights from '@/components/Insights'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import EpisodePreviewModal from '@/components/EpisodePreviewModal'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <TrustedBy />
      <WhatWeDo />
      <CaseStudyEpisode />
      <Testimonials />
      <WhoWeAre />
      <Process />
      <Insights />
      <CTA />
      <Footer />
      <EpisodePreviewModal />
    </main>
  )
}
