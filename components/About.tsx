export default function About() {
  return (
    <section id="about" className="grid grid-cols-1 lg:grid-cols-2">

      {/* Left: Pink panel */}
      <div className="bg-[#E07BA3] px-10 py-16 lg:px-16 lg:py-24 xl:px-20 xl:py-28 flex flex-col justify-center">
        <p className="text-black/50 text-xs uppercase tracking-[0.2em] mb-8">About Us</p>
        <h2 className="text-[clamp(2.5rem,4.5vw,4rem)] font-black tracking-[-0.03em] leading-[0.95] uppercase text-black mb-8">
          WE&apos;RE NOT A<br />
          PRODUCTION<br />
          HOUSE. WE&apos;RE A<br />
          GROWTH ENGINE.
        </h2>
        <p className="text-black/65 text-base lg:text-lg leading-relaxed mb-5 max-w-md">
          Most podcast agencies care about downloads. We care about revenue. Every show we build is designed around one goal: turning your audience into customers.
        </p>
        <p className="text-black/65 text-base lg:text-lg leading-relaxed mb-10 max-w-md">
          Strategy-first, production-obsessed, and always focused on what moves the needle for your business.
        </p>
        <a
          href="#services"
          className="inline-flex items-center gap-2 text-black font-black uppercase tracking-wide text-sm group"
        >
          <span>SEE HOW WE WORK</span>
          <span className="text-lg transition-transform duration-200 group-hover:translate-x-1.5">→</span>
        </a>
      </div>

      {/* Right: Image placeholders */}
      <div className="bg-black grid grid-rows-2 min-h-[500px] lg:min-h-0">
        {/* REPLACE WITH IMAGE */}
        <div className="relative bg-[#111111] overflow-hidden m-2 mb-1">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1c1008] via-[#111111] to-[#080808]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
        <div className="grid grid-cols-2 m-2 mt-1 gap-2">
          {/* REPLACE WITH IMAGE */}
          <div className="relative bg-[#111111] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tl from-[#1c1008] via-[#111111] to-[#080808]" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
          </div>
          {/* REPLACE WITH IMAGE */}
          <div className="relative bg-[#0d0d0d] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#1a1008] via-[#0f0f0f] to-[#080808]" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
          </div>
        </div>
      </div>

    </section>
  )
}
