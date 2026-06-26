import { useMemo } from 'react'
import { motion } from 'framer-motion'

// A quick radial burst of sparkles. Remount with a changing `trigger` key
// (handled by the parent) to replay the explosion.
export default function Sparkles({ count = 14 }) {
  const bits = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2 + Math.random() * 0.4
        const dist = 50 + Math.random() * 70
        return {
          id: i,
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist,
          size: 10 + Math.random() * 16,
          emoji: Math.random() > 0.5 ? '✨' : '💫',
          delay: Math.random() * 0.08,
        }
      }),
    [count],
  )

  return (
    <div className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center">
      {bits.map((b) => (
        <motion.span
          key={b.id}
          className="absolute select-none"
          style={{ fontSize: b.size }}
          initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
          animate={{ opacity: 0, scale: 1.2, x: b.x, y: b.y }}
          transition={{ duration: 0.8, delay: b.delay, ease: 'easeOut' }}
        >
          {b.emoji}
        </motion.span>
      ))}
    </div>
  )
}
