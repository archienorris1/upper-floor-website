import SiteNav from '@/components/site/SiteNav'
import Hero from '@/components/site/Hero'
import Subheadline from '@/components/site/Subheadline'
import TrustedBy from '@/components/site/TrustedBy'
import CaseStudyNootropic from '@/components/site/CaseStudyNootropic'
import AdsShowcase from '@/components/site/AdsShowcase'
import CaseStudySongArchitect from '@/components/site/CaseStudySongArchitect'
import HowWeWork from '@/components/site/HowWeWork'
import Founders from '@/components/site/Founders'
import Booking from '@/components/site/Booking'
import SiteFooter from '@/components/site/SiteFooter'

export default function Home() {
  return (
    <main>
      <SiteNav />
      <Hero />
      <Subheadline />
      <TrustedBy />
      <CaseStudyNootropic />
      <AdsShowcase />
      <CaseStudySongArchitect />
      <HowWeWork />
      <Founders />
      <Booking />
      <SiteFooter />
    </main>
  )
}
