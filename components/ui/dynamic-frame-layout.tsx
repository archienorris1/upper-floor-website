'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export interface Frame {
  id: number
  video: string
  defaultPos: { x: number; y: number; w: number; h: number }
  corner: string
  edgeHorizontal: string
  edgeVertical: string
  mediaSize: number
  borderThickness: number
  borderSize: number
  isHovered: boolean
  title: string
  episode: string
  teaser: string
  link: string
}

interface FrameCardProps {
  frame: Frame
  isHovered: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
}

function FrameCard({ frame, isHovered, onMouseEnter, onMouseLeave }: FrameCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (isHovered) {
      videoRef.current?.play().catch(() => {})
    } else {
      videoRef.current?.pause()
      if (videoRef.current) videoRef.current.currentTime = 0
    }
  }, [isHovered])

  return (
    <div
      className="relative overflow-hidden w-full h-full"
      style={{
        borderRadius: '16px',
        border: isHovered ? '1px solid #E07BA3' : '1px solid #1e1e1e',
        transition: 'border-color 0.3s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative w-full h-full bg-[#0a0a0a]">

        {/* Video or dark placeholder */}
        {frame.video ? (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            src={frame.video}
            loop
            muted
            playsInline
            style={{
              transform: `scale(${frame.mediaSize})`,
              transformOrigin: 'center',
              transition: 'transform 0.3s ease',
            }}
          />
        ) : (
          <div
            className="w-full h-full"
            style={{ background: 'linear-gradient(160deg, #1a1a1a 0%, #0d0d0d 100%)' }}
          />
        )}

        {/* Episode badge */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            background: '#E07BA3',
            color: '#000',
            fontWeight: 700,
            fontSize: '10px',
            padding: '4px 10px',
            borderRadius: '100px',
            letterSpacing: '0.06em',
            zIndex: 3,
          }}
        >
          {frame.episode}
        </div>

        {/* Play button — hidden when hovered */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            border: '2px solid #E07BA3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.5)',
            zIndex: 3,
            opacity: isHovered ? 0 : 1,
            transition: 'opacity 0.3s ease',
          }}
        >
          <div
            style={{
              width: 0,
              height: 0,
              borderTop: '8px solid transparent',
              borderBottom: '8px solid transparent',
              borderLeft: '14px solid #E07BA3',
              marginLeft: '3px',
            }}
          />
        </div>

        {/* Bottom gradient */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '65%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0) 100%)',
            zIndex: 2,
          }}
        />

        {/* Bottom content */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '20px',
            zIndex: 4,
          }}
        >
          <div
            style={{
              color: '#fff',
              fontWeight: 700,
              fontSize: '13px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '6px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {frame.title}
          </div>

          <div
            style={{
              color: '#BFBFBF',
              fontSize: '12px',
              lineHeight: 1.5,
              maxHeight: isHovered ? '72px' : '0px',
              overflow: 'hidden',
              transition: 'max-height 0.4s ease',
              marginBottom: isHovered ? '10px' : '0',
            }}
          >
            {frame.teaser}
          </div>

          <Link
            href={frame.link}
            style={{
              color: '#E07BA3',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textDecoration: 'none',
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.3s ease 0.1s',
              display: 'block',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            READ THE STORY →
          </Link>
        </div>
      </div>
    </div>
  )
}

interface DynamicFrameLayoutProps {
  frames: Frame[]
  className?: string
  hoverSize?: number
  gapSize?: number
  focusedIndex?: number | null
}

export function DynamicFrameLayout({
  frames,
  className = '',
  hoverSize = 6,
  gapSize = 12,
  focusedIndex = null,
}: DynamicFrameLayoutProps) {
  const [mouseHover, setMouseHover] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const activeIndex = mouseHover ?? focusedIndex

  const getColSizes = () => {
    if (activeIndex === null) return frames.map(() => '1fr').join(' ')
    const nonHoveredSize = (12 - hoverSize) / (frames.length - 1)
    return frames
      .map((_, i) => (i === activeIndex ? `${hoverSize}fr` : `${nonHoveredSize}fr`))
      .join(' ')
  }

  if (isMobile) {
    return (
      <div className={`flex flex-col ${className}`} style={{ gap: `${gapSize}px` }}>
        {frames.map((frame, index) => (
          <motion.div
            key={frame.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.5 }}
            style={{ height: '280px' }}
          >
            <FrameCard
              frame={frame}
              isHovered={mouseHover === index}
              onMouseEnter={() => setMouseHover(index)}
              onMouseLeave={() => setMouseHover(null)}
            />
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <div
      className={`relative w-full ${className}`}
      style={{
        display: 'grid',
        gridTemplateColumns: getColSizes(),
        gridTemplateRows: '1fr',
        gap: `${gapSize}px`,
        height: '520px',
        transition: 'grid-template-columns 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {frames.map((frame, index) => (
        <motion.div
          key={frame.id}
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.08, duration: 0.5 }}
        >
          <FrameCard
            frame={frame}
            isHovered={activeIndex === index}
            onMouseEnter={() => setMouseHover(index)}
            onMouseLeave={() => setMouseHover(null)}
          />
        </motion.div>
      ))}
    </div>
  )
}
