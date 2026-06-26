import { useMemo } from 'react'

const EMOJIS = ['❤️', '💕', '💖', '💗', '🌸', '✨', '💞']

export default function FloatingHearts({ count = 18, zClass = 'z-0' }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 12 + Math.random() * 26,
        duration: 9 + Math.random() * 12,
        delay: Math.random() * 12,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      })),
    [count],
  )

  return (
    <div className={`pointer-events-none fixed inset-0 overflow-hidden ${zClass}`} aria-hidden="true">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute bottom-[-40px] animate-float select-none"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  )
}
