'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import CalEmbed from '@/components/site/CalEmbed'
import { CAL_LINK } from '@/lib/booking'
import { calLeadEventId, metaBrowserIds, trackMeta } from '@/lib/meta'

/**
 * The conversion: real free times on screen the moment the page is, then name, email,
 * phone and a spend band. The times come baked into the HTML (page.tsx fetches them
 * on the server) and refresh quietly after load; booking goes through /api/book to
 * Cal's API, so the heavy Cal embed never has to boot. The day strip scrolls through
 * the next few weeks; only if the times can't be loaded at all does it fall back to
 * that embed, so a booking is always possible.
 *
 * Same Cal event as the rest of the site, and the same Meta events as CalEmbed:
 * Schedule + Lead, the Lead carrying the booking uid so Signal's CAPI copy dedupes.
 */

const SPEND_BANDS = ['£0 - 1k', '£1 - 15k', '£15 - 50k', '£50k and above'] as const
const SPEND_LABELS: Record<(typeof SPEND_BANDS)[number], string> = {
  '£0 - 1k': 'Under £1k',
  '£1 - 15k': '£1k–15k',
  '£15 - 50k': '£15k–50k',
  '£50k and above': '£50k+',
}

const MAX_DAYS = 12
const FIRST_TIMES = 6
/** Server render and first client render use this, so hydration matches. */
const DEFAULT_TZ = 'Europe/London'

type Day = { date: string; slots: string[] }

function groupByDay(slots: string[], tz: string): Day[] {
  const days = new Map<string, string[]>()
  for (const s of slots) {
    const date = new Date(s).toLocaleDateString('en-CA', { timeZone: tz })
    days.set(date, [...(days.get(date) ?? []), s])
  }
  return Array.from(days, ([date, list]) => ({ date, slots: list }))
}

function dayLabel(date: string, tz: string) {
  // `date` is a calendar date (YYYY-MM-DD) in `tz`. Noon UTC keeps it on that date.
  const d = new Date(`${date}T12:00:00Z`)
  const today = new Date().toLocaleDateString('en-CA', { timeZone: tz })
  const tomorrow = new Date(Date.now() + 86_400_000).toLocaleDateString('en-CA', { timeZone: tz })
  const bottom = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' })
  if (date === today) return { top: 'Today', bottom }
  if (date === tomorrow) return { top: 'Tomorrow', bottom }
  return { top: d.toLocaleDateString('en-GB', { weekday: 'short', timeZone: 'UTC' }), bottom }
}

function timeLabel(iso: string, tz: string) {
  return new Date(iso)
    .toLocaleTimeString('en-GB', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: tz })
    .replace(' ', '')
    .replace(':00', '')
}

function whenLabel(iso: string, tz: string) {
  const day = new Date(iso).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: tz,
  })
  return `${day} at ${timeLabel(iso, tz)}`
}

function tzLabel(tz: string) {
  return tz.split('/').pop()?.replace(/_/g, ' ') ?? tz
}

async function fetchSlots(): Promise<string[]> {
  try {
    const res = await fetch('/api/slots', { cache: 'no-store' })
    const body = (await res.json()) as { slots?: string[] }
    return body.slots ?? []
  } catch {
    return []
  }
}

export default function BookCall({ initialSlots }: { initialSlots: string[] }) {
  const [slots, setSlots] = useState(initialSlots)
  const [loaded, setLoaded] = useState(initialSlots.length > 0)
  const [tz, setTz] = useState(DEFAULT_TZ)
  const [day, setDay] = useState(0)
  const [allTimes, setAllTimes] = useState(false)
  const [picked, setPicked] = useState<string | null>(null)
  const [spend, setSpend] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'booking'>('idle')
  const [error, setError] = useState('')
  const [booked, setBooked] = useState<{ start: string; email: string } | null>(null)
  const nameRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    try {
      const local = Intl.DateTimeFormat().resolvedOptions().timeZone
      if (local) setTz(local)
    } catch {
      /* keep London */
    }
    // The baked-in times can be up to a minute old; swap in fresh ones quietly.
    let live = true
    fetchSlots().then((fresh) => {
      if (!live) return
      if (fresh.length) setSlots(fresh)
      setLoaded(true)
    })
    return () => {
      live = false
    }
  }, [])

  useEffect(() => {
    if (picked) nameRef.current?.focus({ preventScroll: true })
  }, [picked])

  const days = useMemo(() => groupByDay(slots, tz).slice(0, MAX_DAYS), [slots, tz])

  if (loaded && days.length === 0) {
    return (
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
        <CalEmbed
          calLink={CAL_LINK}
          id="cal-book-workwithus"
          theme="dark"
          minHeight={720}
          hideEventTypeDetails
        />
      </div>
    )
  }

  if (booked) {
    return (
      <Card>
        <div className="py-6 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-green text-xl font-bold">
            ✓
          </span>
          <p className="mt-5 font-serif text-3xl leading-tight">You&rsquo;re booked in.</p>
          <p className="mt-3 text-white/80">{whenLabel(booked.start, tz)}</p>
          <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-white/60">
            The Google Meet invite is on its way to {booked.email}. Have your ad account handy and
            we&rsquo;ll take it from there.
          </p>
        </div>
      </Card>
    )
  }

  if (days.length === 0) {
    return (
      <Card>
        <Heading />
        <div className="mt-5 grid grid-cols-3 gap-2" aria-busy="true" aria-label="Loading free times">
          {Array.from({ length: FIRST_TIMES }).map((_, i) => (
            <div key={i} className="h-12 animate-pulse rounded-xl bg-white/[0.07]" />
          ))}
        </div>
      </Card>
    )
  }

  const current = days[Math.min(day, days.length - 1)]
  const visible = allTimes ? current.slots : current.slots.slice(0, FIRST_TIMES)

  async function book(form: HTMLFormElement) {
    if (!picked) return
    const data = new FormData(form)
    const name = String(data.get('name') || '').trim()
    const email = String(data.get('email') || '').trim()
    const phone = String(data.get('phone') || '').trim()
    if (!name || !email || !phone) {
      setError('Add your name, email and phone so we can send the invite.')
      return
    }
    if (!spend) {
      setError('Pick your monthly Meta spend so we can prep the audit.')
      return
    }
    setError('')
    setStatus('booking')
    let res: Response | null = null
    try {
      res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          start: picked,
          name,
          email,
          phone,
          spend,
          timeZone: tz,
          meta: metaBrowserIds(),
          _gotcha: data.get('_gotcha'),
        }),
      })
    } catch {
      /* handled below */
    }
    const body = res ? await res.json().catch(() => ({})) : {}
    if (res?.ok && body.ok) {
      trackMeta('Schedule')
      trackMeta('Lead', undefined, body.uid ? calLeadEventId(body.uid) : undefined)
      setBooked({ start: body.start || picked, email })
      return
    }
    setStatus('idle')
    if (res?.status === 409) {
      setError('Someone just took that time. Pick another one.')
      setPicked(null)
      const fresh = await fetchSlots()
      if (fresh.length) setSlots(fresh)
      return
    }
    setError(
      body.reason === 'phone'
        ? 'Check your phone number. Include the country code if you’re outside the UK.'
        : res?.status === 400
        ? 'Check your email address and try again.'
        : 'That didn’t go through. Try again, or pick a time in the full calendar below.',
    )
  }

  if (picked) {
    return (
      <Card>
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault()
            void book(e.currentTarget)
          }}
        >
          <div className="flex items-baseline justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                Free ad account audit · 30 min
              </p>
              <p className="mt-1.5 text-lg font-semibold">{whenLabel(picked, tz)}</p>
            </div>
            <button
              type="button"
              className="shrink-0 text-sm text-white/60 underline underline-offset-4 hover:text-white"
              onClick={() => {
                setPicked(null)
                setError('')
              }}
            >
              Change
            </button>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <input
              ref={nameRef}
              name="name"
              className={FIELD}
              placeholder="Your name"
              autoComplete="name"
              required
              aria-label="Your name"
            />
            <input
              name="email"
              type="email"
              className={FIELD}
              placeholder="Email, for the invite"
              autoComplete="email"
              required
              aria-label="Email"
            />
            <input
              name="phone"
              type="tel"
              className={`${FIELD} sm:col-span-2`}
              placeholder="Phone, in case the link plays up"
              autoComplete="tel"
              inputMode="tel"
              required
              aria-label="Phone"
            />
          </div>

          <fieldset className="mt-5">
            <legend className="text-sm text-white/70">Monthly Meta ad spend</legend>
            <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {SPEND_BANDS.map((band) => {
                const on = spend === band
                return (
                  <button
                    key={band}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setSpend(band)}
                    className={`h-11 rounded-xl border text-sm font-semibold transition-colors ${
                      on
                        ? 'border-brand-green bg-brand-green/20 text-white'
                        : 'border-white/15 bg-white/[0.04] text-white/80 hover:border-white/40'
                    }`}
                  >
                    {SPEND_LABELS[band]}
                  </button>
                )
              })}
            </div>
          </fieldset>

          <label className="sr-only" aria-hidden="true">
            Leave this blank
            <input name="_gotcha" tabIndex={-1} autoComplete="off" />
          </label>

          {error && (
            <p className="mt-4 text-sm text-[#ffb4a8]" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'booking'}
            className="mt-5 flex w-full items-center justify-center rounded-full bg-brand-green px-6 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:bg-brand-green-dark disabled:opacity-70"
          >
            {status === 'booking' ? 'Booking…' : 'Book my free audit →'}
          </button>
          <p className="mt-3 text-center text-xs text-white/45">
            Google Meet · the invite lands in your inbox straight away
          </p>
        </form>
      </Card>
    )
  }

  return (
    <Card>
      <Heading />

      <div
        className="-mx-1 mt-4 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="Pick a day"
      >
        {days.map((d, i) => {
          const l = dayLabel(d.date, tz)
          const on = d.date === current.date
          return (
            <button
              key={d.date}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => {
                setDay(i)
                setAllTimes(false)
              }}
              className={`min-w-[4.75rem] shrink-0 rounded-xl border px-3 py-2 text-left transition-colors ${
                on ? 'border-brand-green bg-brand-green/20' : 'border-white/15 hover:border-white/40'
              }`}
            >
              <span className="block text-sm font-semibold">{l.top}</span>
              <span className="block text-xs text-white/55">{l.bottom}</span>
            </button>
          )
        })}
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2" role="tabpanel" aria-label="Pick a time">
        {visible.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => {
              setPicked(s)
              setError('')
            }}
            className="h-12 rounded-xl border border-white/15 bg-white/[0.05] text-base font-semibold transition-all hover:-translate-y-0.5 hover:border-brand-green hover:bg-brand-green/20"
          >
            {timeLabel(s, tz)}
          </button>
        ))}
      </div>

      {error && (
        <p className="mt-3 text-sm text-[#ffb4a8]" role="alert">
          {error}
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-xs text-white/50">
        <span>Times in {tzLabel(tz)}</span>
        {current.slots.length > FIRST_TIMES && !allTimes && (
          <button
            type="button"
            onClick={() => setAllTimes(true)}
            className="underline decoration-brand-green underline-offset-4 hover:text-white"
          >
            More times on {dayLabel(current.date, tz).top}
          </button>
        )}
      </div>
    </Card>
  )
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-brand-ink/95 p-5 text-left shadow-2xl backdrop-blur-md md:p-6">
      {children}
    </div>
  )
}

function Heading() {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-green">
        Free audit · 30 min · Google Meet
      </p>
      <p className="mt-1.5 text-lg font-semibold leading-snug">Pick a time that suits you:</p>
    </div>
  )
}

const FIELD =
  'h-12 w-full rounded-xl border border-white/20 bg-white/[0.07] px-4 text-base text-white placeholder:text-white/40 outline-none transition-colors focus:border-brand-green'
