import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Ticker from '@/components/Ticker'
import About from '@/components/About'
import Services from '@/components/Services'
import PodcastSamples from '@/components/PodcastSamples'
import CaseStudy from '@/components/CaseStudy'
import Pricing from '@/components/Pricing'
import Stats from '@/components/Stats'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Ticker />
      <About />
      <Services />
      <PodcastSamples />
      <CaseStudy />
      <Pricing />
      <Stats />
      <CTA />
      <Footer />
    </main>
  )
}
