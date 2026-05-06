'use client'

interface Props {
  className?: string
  children: React.ReactNode
}

export default function EpisodePreviewButton({ className, children }: Props) {
  return (
    <button
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent('open-preview-modal'))}
    >
      {children}
    </button>
  )
}
