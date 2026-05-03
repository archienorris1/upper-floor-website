import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import TrustedBy from '@/components/TrustedBy'
import WhatWeDo from '@/components/WhatWeDo'
import CaseStudyEpisode from '@/components/CaseStudyEpisode'
import Process from '@/components/Process'
import Insights from '@/components/Insights'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <TrustedBy />
      <WhatWeDo />
      <CaseStudyEpisode />
      <Process />
      <Insights />
      <CTA />
      <Footer />
    </main>
  )
}
