import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from '../components/Reveal.jsx'
import { burstHearts } from '../lib/confetti.js'

export default function GiftBox() {
  const [open, setOpen] = useState(false)

  const reveal = () => {
    if (!open) burstHearts()
    setOpen(true)
  }

  return (
    <section className="relative bg-gradient-to-b from-[#fff5fa] to-[#f3e9ff] px-4 py-24 text-center">
      <Reveal className="mx-auto max-w-xl">
        <h2 className="mb-10 font-display text-3xl font-bold text-gradient sm:text-5xl">A Little Surprise 🎁</h2>

        {!open ? (
          <motion.button
            onClick={reveal}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            animate={{ rotate: [0, -3, 3, -3, 0] }}
            transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
            className="text-8xl"
            aria-label="Open the gift"
          >
            🎁
          </motion.button>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 160 }}
              className="glass rounded-3xl p-8 sm:p-10"
            >
              <div className="text-6xl">💖</div>
              <p className="mt-5 font-script text-2xl leading-relaxed text-rose-800 sm:text-3xl">
                Thank you for being part of my life.
                <br />
                You turned years of friendship into the most beautiful chapter of my story.
                <br />
                <span className="font-bold text-pink-600">I Love You ❤️</span>
              </p>
            </motion.div>
          </AnimatePresence>
        )}

        {!open && <p className="mt-6 font-body text-rose-700/70">tap the gift 💕</p>}
      </Reveal>
    </section>
  )
}
