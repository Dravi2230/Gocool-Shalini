import { useMemo } from 'react'

// Broken hearts that rain DOWN from the top (vs. FloatingHearts which rise).
export default function BrokenHearts({ count = 16, emoji = '💔' }) {
  const drops = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 16 + Math.random() * 22,
        duration: 4 + Math.random() * 5,
        delay: Math.random() * 6,
      })),
    [count],
  )

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {drops.map((d) => (
        <span
          key={d.id}
          className="absolute top-[-40px] select-none"
          style={{
            left: `${d.left}%`,
            fontSize: `${d.size}px`,
            animation: `fall ${d.duration}s linear ${d.delay}s infinite`,
          }}
        >
          {emoji}
        </span>
      ))}
      <style>{`
        @keyframes fall {
          0%   { transform: translateY(0) rotate(0deg); opacity: 0; }
          10%  { opacity: 0.9; }
          100% { transform: translateY(110vh) rotate(220deg); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
