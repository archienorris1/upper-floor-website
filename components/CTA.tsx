export default function CTA() {
  return (
    <section id="contact" className="bg-[#E07BA3] py-24 lg:py-40">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
        <p className="text-black/50 text-xs uppercase tracking-[0.2em] mb-8">Ready to Grow?</p>
        <h2 className="text-[clamp(3rem,8vw,9rem)] font-black tracking-[-0.03em] leading-none uppercase text-black mb-12">
          LET&apos;S BUILD<br />YOUR SHOW.
        </h2>
        <a
          href="mailto:hello@upperfloor.co.uk"
          className="inline-block bg-black text-white font-black uppercase tracking-wide px-10 py-5 text-base hover:bg-[#111111] transition-colors duration-200"
        >
          BOOK A CALL ↗
        </a>
      </div>
    </section>
  )
}
