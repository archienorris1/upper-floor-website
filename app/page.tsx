import SiteNav from '@/components/site/SiteNav'
import Hero from '@/components/site/Hero'
import TrustedBy from '@/components/site/TrustedBy'
import CaseStudyAurora from '@/components/site/CaseStudyAurora'
import CaseStudyNootropic from '@/components/site/CaseStudyNootropic'
import AdsShowcase from '@/components/site/AdsShowcase'
import CaseStudyToasty from '@/components/site/CaseStudyToasty'
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
      <TrustedBy />
      <CaseStudyAurora />
      <CaseStudyNootropic />
      <AdsShowcase />
      <CaseStudyToasty />
      <CaseStudySongArchitect />
      <HowWeWork />
      <Founders />
      <Booking />
      <SiteFooter />
    </main>
  )
}
