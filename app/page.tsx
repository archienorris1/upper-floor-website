import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import WhatWeDo from '@/components/WhatWeDo'
import OurWork from '@/components/OurWork'
import BigTextFeatures from '@/components/BigTextFeatures'
import HowWeStandOut from '@/components/HowWeStandOut'
import WhoWeAre from '@/components/WhoWeAre'
import CaseStudyEpisode from '@/components/CaseStudyEpisode'
import Testimonials from '@/components/Testimonials'
import Pricing from '@/components/Pricing'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <WhatWeDo />
      <OurWork />
      <BigTextFeatures />
      <HowWeStandOut />
      <WhoWeAre />
      <CaseStudyEpisode />
      <Testimonials />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  )
}
