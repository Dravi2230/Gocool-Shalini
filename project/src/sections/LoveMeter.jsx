import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Reveal from '../components/Reveal.jsx'
import { HER_NAME, HIS_NAME } from '../data.js'

export default function LoveMeter() {
  const [pct, setPct] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        let v = 0
        const id = setInterval(() => {
          v += 2
          setPct(v)
          if (v >= 100) clearInterval(id)
        }, 22)
      }
    }, { threshold: 0.4 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className="relative bg-gradient-to-b from-[#ffeef6] to-[#fff5fa] px-4 py-24">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-bold text-gradient sm:text-5xl">Love Meter</h2>

        <div className="mt-8 flex items-center justify-center gap-3 font-display text-2xl font-bold text-rose-900 sm:text-3xl">
          <span>{HIS_NAME}</span>
          <motion.span
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="text-pink-500"
          >
            ❤️
          </motion.span>
          <span>{HER_NAME}</span>
        </div>

        <div className="relative mx-auto mt-8 h-9 w-full max-w-md overflow-hidden rounded-full bg-pink-100 shadow-inner">
          <motion.div
            className="flex h-full items-center justify-end rounded-full bg-gradient-to-r from-pink-400 via-fuchsia-500 to-rose-gold pr-3"
            style={{ width: `${pct}%` }}
          >
            <span className="text-sm">❤️</span>
          </motion.div>
        </div>

        <div className="mt-6 font-display text-5xl font-bold text-gradient">{pct}% Forever</div>
        <p className="mt-2 font-script text-2xl text-rose-700">...and counting, infinitely ♾️</p>
      </Reveal>
    </section>
  )
}
