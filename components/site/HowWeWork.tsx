import { Fragment } from 'react'

const STEPS = [
  {
    num: '01',
    pre: '',
    key: 'Create',
    post: '',
    body: 'We build content designed to perform. UGC style video and branded statics, made for your brand, never pulled from a template. Scroll stopping by design.',
  },
  {
    num: '02',
    pre: 'Find the ',
    key: 'winners',
    post: '',
    body: 'We don’t guess. We track what actually performs, spot the hooks and angles that convert, and surface the winners, so nothing good gets buried.',
  },
  {
    num: '03',
    pre: '',
    key: 'Scale',
    post: ' them',
    body: 'Then we double down. Multiple versions of every winner, new hooks, new angles, proven frameworks, so your best content keeps working harder.',
  },
]

export default function HowWeWork() {
  return (
    <section className="bg-brand-ink px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="reveal-on-scroll text-center">
          <p className="text-sm text-white/60">how we work</p>
          <h2 className="mt-3 font-serif text-4xl text-white md:text-6xl">three steps. one engine.</h2>
        </div>

        <div className="mt-14 flex flex-col gap-10 md:mt-20 md:flex-row md:items-start md:gap-0">
          {STEPS.map((step, i) => (
            <Fragment key={step.num}>
              <div className="reveal-on-scroll flex-1">
                <p className="font-serif text-5xl text-brand-green md:text-6xl">{step.num}</p>
                <h3 className="mt-4 text-2xl text-white">
                  <span className="font-semibold">{step.pre}</span>
                  <span className="font-serif text-brand-green">{step.key}</span>
                  <span className="font-semibold">{step.post}</span>
                </h3>
                <p className="mt-3 text-base leading-relaxed text-white/70">{step.body}</p>
              </div>

              {i < STEPS.length - 1 && (
                <div
                  aria-hidden="true"
                  className="hidden text-3xl text-brand-green/40 md:flex md:items-start md:self-start md:px-6 md:pt-3"
                >
                  →
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
