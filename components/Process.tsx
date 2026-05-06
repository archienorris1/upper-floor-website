const steps = [
  {
    number: '01',
    title: 'Position',
    description: 'We define your audience, message and angle to build a strong foundation.',
  },
  {
    number: '02',
    title: 'Produce',
    description: 'We record, edit and publish a show your audience will love.',
  },
  {
    number: '03',
    title: 'Distribute',
    description: 'We turn episodes into content and reach your audience everywhere.',
  },
  {
    number: '04',
    title: 'Scale',
    description: 'We optimise performance and convert listeners into pipeline.',
  },
]

export default function Process() {
  return (
    <section className="px-6 lg:px-12 border-t border-white/[0.06]" style={{ paddingTop: '80px', paddingBottom: '80px' }} id="process">
      <div className="max-w-[1400px] mx-auto">
        <p className="text-[#E07BA3] text-xs font-black uppercase tracking-[0.2em] mb-12">
          Our Process
        </p>

        {/* Steps + arrows as a flat flex row on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] gap-y-10 items-start">
          {steps.map(({ number, title, description }, i) => (
            <>
              <div key={number} className="flex flex-col gap-3">
                <p
                  className="font-black text-[#E07BA3] leading-none"
                  style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)' }}
                >
                  {number}
                </p>
                <h3 className="text-white font-black text-xl">{title}</h3>
                <p className="text-[#BFBFBF] text-sm leading-relaxed max-w-[200px]">{description}</p>
              </div>
              {/* Arrow between steps — desktop only */}
              {i < steps.length - 1 && (
                <div key={`arrow-${i}`} className="hidden lg:flex items-start justify-center pt-3 px-4 text-[#BFBFBF] text-xl">
                  →
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </section>
  )
}
