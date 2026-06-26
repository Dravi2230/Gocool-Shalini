import { useMemo } from 'react'

// A dreamy animated night sky of twinkling stars, used as a section background.
export default function NightSky({ count = 60 }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 1 + Math.random() * 2.5,
        duration: 2 + Math.random() * 4,
        delay: Math.random() * 4,
      })),
    [count],
  )

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute animate-twinkle rounded-full bg-white"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
            boxShadow: '0 0 6px 1px rgba(255,255,255,0.7)',
          }}
        />
      ))}
    </div>
  )
}
