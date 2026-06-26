import { useEffect } from 'react'
import { motion } from 'framer-motion'
import NightSky from '../components/NightSky.jsx'
import { HER_NAME, HIS_NAME } from '../data.js'
import { celebrate } from '../lib/confetti.js'

export default function Finale() {
  useEffect(() => {
    const el = document.getElementById('finale')
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          celebrate(3000)
          obs.disconnect()
        }
      },
      { threshold: 0.5 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      id="finale"
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#2a1a3e] via-[#3d1f47] to-[#5a2a4d] px-4 text-center"
    >
      <NightSky count={80} />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className="text-7xl"
        >
          ❤️
        </motion.div>
        <h2 className="mt-5 font-display text-4xl font-bold text-white drop-shadow-lg sm:text-6xl">
          Happy Birthday, My Love ❤️
        </h2>
        <p className="mt-5 font-script text-2xl text-pink-200 sm:text-3xl">
          From Childhood Friends to a Beautiful Love Story
        </p>
        <p className="mt-8 font-display text-xl font-semibold text-rose-200 sm:text-2xl">
          Forever Yours, {HIS_NAME} ❤️
        </p>
        <p className="mt-10 font-body text-sm text-pink-200/60">
          made with endless love, for {HER_NAME} 💞
        </p>
      </motion.div>
    </section>
  )
}
