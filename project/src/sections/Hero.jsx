import { motion } from 'framer-motion'
import { HER_NAME, HIS_NAME } from '../data.js'
import { burstHearts } from '../lib/confetti.js'

export default function Hero() {
  const scrollDown = () => {
    burstHearts()
    document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="romantic-gradient animate-shimmer relative flex min-h-[100dvh] flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 160, delay: 0.2 }}
        className="text-7xl sm:text-8xl"
      >
        🎂
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="mt-4 font-display text-4xl font-bold text-gradient sm:text-6xl md:text-7xl"
      >
        Happy Birthday, {HER_NAME} ❤️
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.7 }}
        className="mt-5 max-w-xl font-script text-2xl text-rose-700 sm:text-3xl"
      >
        A special surprise made with love by {HIS_NAME}
      </motion.p>

      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={scrollDown}
        className="btn-romantic mt-9 text-lg"
      >
        Open My Heart 💖
      </motion.button>

      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 1.6 }}
        className="absolute bottom-8 text-3xl text-rose-500"
      >
        ⌄
      </motion.div>
    </section>
  )
}
