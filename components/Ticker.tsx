const PHRASE = 'GROWTH FOCUSED · '
const REPEATED = PHRASE.repeat(12)

export default function Ticker() {
  return (
    <div
      className="bg-[#E07BA3] py-4 overflow-hidden"
      aria-label="Growth focused podcast agency"
    >
      <div className="ticker-track">
        <span className="text-black font-black text-sm uppercase tracking-[0.15em] whitespace-nowrap pr-0">
          {REPEATED}
        </span>
        <span className="text-black font-black text-sm uppercase tracking-[0.15em] whitespace-nowrap" aria-hidden>
          {REPEATED}
        </span>
      </div>
    </div>
  )
}
