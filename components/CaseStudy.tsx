const stats = [
  { value: '400%', label: 'Traffic Growth' },
  { value: '250K+', label: 'Downloads' },
  { value: '3.2X', label: 'Pipeline Growth' },
]

export default function CaseStudy() {
  return (
    <section className="bg-[#060606] py-24 lg:py-36 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        <p className="text-[#BFBFBF] text-xs uppercase tracking-[0.2em] mb-10">Case Study</p>

        <h2 className="text-[clamp(2.25rem,5.5vw,5.5rem)] font-black tracking-[-0.03em] leading-[0.95] uppercase text-white mb-20 max-w-5xl">
          HELPED A FINTECH BRAND<br className="hidden lg:block" />
          GROW 400% IN 12 MONTHS.
        </h2>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 border border-white/10 mb-12">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`p-8 lg:p-12 ${
                i < stats.length - 1 ? 'border-b md:border-b-0 md:border-r border-white/10' : ''
              }`}
            >
              <div className="text-[clamp(3rem,5vw,4.5rem)] font-black tracking-[-0.03em] leading-none text-[#E07BA3] mb-3">
                {stat.value}
              </div>
              <div className="text-[#BFBFBF] text-sm uppercase tracking-[0.15em]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Context */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
          <p className="text-[#BFBFBF] text-base leading-relaxed">
            A B2B fintech brand came to us with zero audio presence. In 12 months, their podcast became their single highest-converting marketing channel.
          </p>
          <p className="text-[#BFBFBF] text-base leading-relaxed">
            Strategy-led from day one. Every episode mapped to a buyer stage. Every clip designed to drive inbound.
          </p>
        </div>

      </div>
    </section>
  )
}
