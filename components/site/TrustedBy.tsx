import LogoMarquee from './LogoMarquee'

export default function TrustedBy() {
  return (
    <section className="bg-brand-green py-10 md:py-14">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <h2 className="text-center text-xl font-medium text-white md:text-3xl">Trusted by</h2>
      </div>
      <LogoMarquee />
    </section>
  )
}
