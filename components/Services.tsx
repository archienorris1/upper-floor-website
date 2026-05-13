const services = [
  {
    number: '01',
    title: 'STRATEGY',
    description:
      'Full show concept, positioning, and content calendar built around your growth goals and the audience you need to reach.',
  },
  {
    number: '02',
    title: 'PRODUCTION',
    description:
      'End-to-end audio and video production. Edited, mixed, mastered, and published on schedule. Every time.',
  },
  {
    number: '03',
    title: 'GROWTH',
    description:
      'Distribution, short-form clip strategy, SEO, and platform management to turn listeners into qualified pipeline.',
  },
]

export default function Services() {
  return (
    <section id="services" className="bg-black py-24 lg:py-36 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: Stacked words */}
          <div className="lg:sticky lg:top-28">
            <p className="text-[#BFBFBF] text-xs uppercase tracking-[0.2em] mb-10">What We Do</p>
            <div className="leading-none">
              <div className="text-[clamp(3.5rem,7vw,6.5rem)] font-black tracking-[-0.03em] text-white uppercase">
                STRATEGY.
              </div>
              <div className="text-[clamp(3.5rem,7vw,6.5rem)] font-black tracking-[-0.03em] text-[#BFBFBF] uppercase">
                PRODUCTION.
              </div>
              <div className="text-[clamp(3.5rem,7vw,6.5rem)] font-black tracking-[-0.03em] text-[#E07BA3] uppercase">
                GROWTH.
              </div>
            </div>
          </div>

          {/* Right: Service rows */}
          <div className="pt-0 lg:pt-14">
            {services.map((service, i) => (
              <div
                key={service.number}
                className={`service-row group flex items-start justify-between py-9 cursor-default ${
                  i !== services.length - 1 ? 'border-b border-white/10' : ''
                } ${i === 0 ? 'border-t border-white/10' : ''}`}
              >
                <div className="flex-1 pr-8">
                  <span className="text-[#BFBFBF] text-sm mb-4 block">{service.number}</span>
                  <h3 className="text-white text-2xl lg:text-3xl font-black uppercase tracking-[-0.02em] mb-4">
                    {service.title}
                  </h3>
                  <p className="text-[#BFBFBF] text-base leading-relaxed">{service.description}</p>
                </div>
                <span className="service-arrow text-white text-2xl flex-shrink-0 mt-1">→</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
