import SiteNav from '@/components/site/SiteNav'
import Hero from '@/components/site/Hero'
import TrustedBy from '@/components/site/TrustedBy'
import CaseStudyNootropic from '@/components/site/CaseStudyNootropic'
import AdsShowcase from '@/components/site/AdsShowcase'
import CaseStudySongArchitect from '@/components/site/CaseStudySongArchitect'
import Booking from '@/components/site/Booking'
import SiteFooter from '@/components/site/SiteFooter'

export default function Home() {
  return (
    <main>
      <SiteNav />
      <Hero />
      <TrustedBy />
      <CaseStudyNootropic />
      <AdsShowcase />
      <CaseStudySongArchitect />
      <Booking />
      <SiteFooter />
    </main>
  )
}
