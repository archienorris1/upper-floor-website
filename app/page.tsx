import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import TrustedBy from '@/components/TrustedBy'
import WhatWeDo from '@/components/WhatWeDo'
import ThreePillars from '@/components/ThreePillars'
import CaseStudyEpisode from '@/components/CaseStudyEpisode'
import OurWork from '@/components/OurWork'
import Testimonials from '@/components/Testimonials'
import WhoWeAre from '@/components/WhoWeAre'
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
      <ThreePillars />
      <CaseStudyEpisode />
      <OurWork />
      <Testimonials />
      <WhoWeAre />
      <Process />
      <Insights />
      <CTA />
      <Footer />
    </main>
  )
}
