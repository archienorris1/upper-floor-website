'use client'

import { useEffect, useRef, useState } from 'react'

const statsData = [
  { target: 250, suffix: 'M+', label: 'Downloads' },
  { target: 100, suffix: '+', label: 'Shows Built' },
  { target: 50, suffix: '+', label: 'Industries Served' },
  { target: 1, suffix: '', label: 'Goal: Grow Your Brand' },
]

function CountUp({
  target,
  suffix,
  isVisible,
}: {
  target: number
  suffix: string
  isVisible: boolean
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    let startTime: number | null = null
    const duration = 1800

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(animate)
      else setCount(target)
    }

    requestAnimationFrame(animate)
  }, [isVisible, target])

  return (
    <>
      {count}
      {suffix}
    </>
  )
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="bg-[#060606] border-t border-b border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {statsData.map((stat, i) => (
            <div
              key={stat.label}
              className={`py-12 px-4 lg:px-8 text-center ${
                i < statsData.length - 1 ? 'border-r border-white/10' : ''
              }`}
            >
              <div className="text-[clamp(2rem,4vw,3.5rem)] font-black tracking-[-0.03em] leading-none text-white mb-3 reveal-scale">
                <CountUp target={stat.target} suffix={stat.suffix} isVisible={isVisible} />
              </div>
              <div className="text-[#BFBFBF] text-xs uppercase tracking-[0.15em] leading-snug">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
