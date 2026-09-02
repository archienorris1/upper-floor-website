'use client'

import { useEffect, useState } from 'react'

const EMBED_JS = 'https://app.cal.com/embed/embed.js'
const ORIGIN = 'https://app.cal.com'

/** Give up on the ready signal and reveal the calendar anyway. */
const SKELETON_TIMEOUT_MS = 12000

type CalFn = ((...args: unknown[]) => void) & {
  loaded?: boolean
  ns: Record<string, CalFn>
  q: unknown[][]
}

declare global {
  interface Window {
    Cal?: CalFn
  }
}

/**
 * Cal.com's loader stub, written out longhand instead of pasted as a minified
 * one-liner. It defines window.Cal as a queue and appends embed.js; every call
 * made before the script lands is replayed once it does. embed.js throws if this
 * queue isn't already in place, so it has to run before anything else touches Cal.
 *
 * The script itself is preloaded in the root layout, so this append normally hits
 * a warm cache rather than starting a fresh download.
 */
function installCalStub() {
  if (window.Cal) return

  const enqueue = (target: CalFn, args: unknown[]) => {
    target.q.push(args)
  }

  const cal = function (...args: unknown[]) {
    if (!cal.loaded) {
      cal.ns = {}
      cal.q = cal.q || []
      const script = document.createElement('script')
      script.src = EMBED_JS
      script.async = true
      document.head.appendChild(script)
      cal.loaded = true
    }

    if (args[0] === 'init') {
      const namespace = args[1]
      if (typeof namespace === 'string') {
        if (!cal.ns[namespace]) {
          const api = function (...nsArgs: unknown[]) {
            enqueue(api, nsArgs)
          } as CalFn
          api.q = []
          api.ns = {}
          cal.ns[namespace] = api
        }
        enqueue(cal.ns[namespace], args)
        enqueue(cal, ['initNamespace', namespace])
        return
      }
    }

    enqueue(cal, args)
  } as CalFn

  cal.q = []
  cal.ns = {}
  window.Cal = cal
}

type Props = {
  /** Cal.com booking link, e.g. "upper-floor/upper-floor-intro-call". */
  calLink: string
  /** Stable DOM id the calendar mounts into. Must be unique on the page. */
  id: string
  /** Match the surrounding section so the calendar doesn't glare. */
  theme?: 'light' | 'dark'
  /** Reserved height, so the page doesn't jump while the calendar loads. */
  minHeight?: number
  className?: string
}

export default function CalEmbed({
  calLink,
  id,
  theme = 'light',
  minHeight = 700,
  className,
}: Props) {
  // Cal's own app takes several seconds to boot inside the iframe. Without this
  // the visitor stares at an empty white box and assumes the page is broken.
  const [ready, setReady] = useState(false)

  useEffect(() => {
    installCalStub()

    const cal = window.Cal
    if (!cal) return

    // One namespace per mount point, so two embeds never fight over the same one.
    const namespace = id

    cal('init', namespace, { origin: ORIGIN })
    cal.ns[namespace]('inline', {
      elementOrSelector: `#${id}`,
      calLink,
      // theme is set here as well as in ui() below: this one themes the container
      // and loading skeleton, ui() themes the calendar inside the iframe.
      config: { layout: 'month_view', theme },
    })
    cal.ns[namespace]('ui', {
      theme,
      layout: 'month_view',
      hideEventTypeDetails: false,
      cssVarsPerTheme: {
        light: { 'cal-brand': '#1B8A3F' },
        dark: { 'cal-brand': '#1B8A3F' },
      },
    })
  }, [calLink, id, theme])

  // Drop the skeleton once Cal flags the embed as loaded. Cal sets loading="done"
  // on its <cal-inline> element after the iframe reports its real dimensions.
  useEffect(() => {
    const mount = document.getElementById(id)
    if (!mount) return

    const isDone = () =>
      mount.querySelector('cal-inline')?.getAttribute('loading') === 'done'

    if (isDone()) {
      setReady(true)
      return
    }

    const observer = new MutationObserver(() => {
      if (isDone()) {
        setReady(true)
        observer.disconnect()
      }
    })
    observer.observe(mount, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['loading'],
    })

    // Never let a missed signal strand the visitor on a skeleton forever.
    const timer = window.setTimeout(() => setReady(true), SKELETON_TIMEOUT_MS)

    return () => {
      observer.disconnect()
      window.clearTimeout(timer)
    }
  }, [id])

  const dark = theme === 'dark'
  const block = dark ? 'bg-white/10' : 'bg-black/[0.07]'

  return (
    <div className={`relative ${className ?? ''}`} style={{ minHeight }}>
      <div id={id} style={{ minHeight, width: '100%' }} />

      {/* Calendar-shaped placeholder — same skeleton in both themes, so the
          section reads as "a calendar loading" rather than a blank panel. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 flex flex-col gap-8 p-6 transition-opacity duration-500 md:flex-row md:gap-10 md:p-8 ${
          ready ? 'opacity-0' : 'opacity-100'
        }`}
        hidden={ready}
      >
        {/* Left: event details */}
        <div className="flex animate-pulse flex-col gap-3 md:w-1/3">
          <div className={`h-8 w-8 rounded-full ${block}`} />
          <div className={`h-3 w-24 rounded ${block}`} />
          <div className={`h-5 w-44 rounded ${block}`} />
          <div className="mt-2 flex flex-col gap-2">
            <div className={`h-3 w-full rounded ${block}`} />
            <div className={`h-3 w-11/12 rounded ${block}`} />
            <div className={`h-3 w-4/5 rounded ${block}`} />
          </div>
          <div className="mt-4 flex flex-col gap-2.5">
            <div className={`h-3 w-20 rounded ${block}`} />
            <div className={`h-3 w-28 rounded ${block}`} />
            <div className={`h-3 w-24 rounded ${block}`} />
          </div>
        </div>

        {/* Right: month grid */}
        <div className="flex flex-1 animate-pulse flex-col gap-4">
          <div className={`h-4 w-32 rounded ${block}`} />
          <div className="grid grid-cols-7 gap-1.5 md:gap-2">
            {Array.from({ length: 35 }).map((_, i) => (
              <div key={i} className={`aspect-square rounded ${block}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
