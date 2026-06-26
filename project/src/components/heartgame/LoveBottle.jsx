import { forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Sparkles from './Sparkles.jsx'

// A glowing glass bottle that fills with blue light as hearts are collected.
// `collected` is 0..total. `burst` is a counter; bump it to replay sparkles.
const LoveBottle = forwardRef(function LoveBottle({ collected, total, burst }, ref) {
  const fill = Math.min(collected / total, 1) * 100
  const glow = 0.25 + (collected / total) * 0.75

  return (
    <div className="relative flex flex-col items-center">
      {/* sparkle explosion replays whenever `burst` changes */}
      <AnimatePresence>
        {burst > 0 && <Sparkles key={burst} />}
      </AnimatePresence>

      {/* cork */}
      <div className="z-10 h-7 w-12 rounded-t-md bg-gradient-to-b from-amber-700 to-amber-900 shadow-md" />
      <div className="z-10 -mt-1 h-3 w-8 rounded-sm bg-amber-800/90" />

      {/* bottle body — the drop target */}
      <motion.div
        ref={ref}
        animate={{
          boxShadow: `0 0 ${30 + collected * 14}px ${10 + collected * 6}px rgba(56,189,248,${glow})`,
        }}
        transition={{ duration: 0.6 }}
        className="relative -mt-1 h-64 w-40 overflow-hidden rounded-b-[2.5rem] rounded-t-2xl border-2 border-white/60 bg-white/20 backdrop-blur-md sm:h-72 sm:w-44"
        style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}
      >
        {/* glowing blue liquid */}
        <motion.div
          className="absolute inset-x-0 bottom-0"
          initial={false}
          animate={{ height: `${fill}%` }}
          transition={{ type: 'spring', stiffness: 90, damping: 14 }}
          style={{
            background:
              'linear-gradient(to top, #0284c7, #38bdf8 60%, #7dd3fc)',
            boxShadow: 'inset 0 8px 24px rgba(255,255,255,0.5)',
          }}
        >
          {/* wavy shimmering top */}
          <motion.div
            className="absolute -top-2 left-0 h-4 w-full rounded-[50%] bg-sky-200/70"
            animate={{ scaleX: [1, 1.08, 1], y: [0, -2, 0] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
          />
          {/* tiny rising bubbles */}
          {[15, 45, 70, 85].map((x, i) => (
            <motion.span
              key={i}
              className="absolute bottom-2 h-1.5 w-1.5 rounded-full bg-white/70"
              style={{ left: `${x}%` }}
              animate={{ y: [0, -60, -110], opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 2.6 + i * 0.4, delay: i * 0.5 }}
            />
          ))}
        </motion.div>

        {/* glass highlight */}
        <div className="pointer-events-none absolute left-3 top-4 h-32 w-3 rounded-full bg-white/40 blur-[1px]" />
      </motion.div>

      <p className="mt-4 font-body text-sm font-semibold uppercase tracking-wider text-sky-700/80">
        {collected} / {total} hearts collected 💙
      </p>
    </div>
  )
})

export default LoveBottle
