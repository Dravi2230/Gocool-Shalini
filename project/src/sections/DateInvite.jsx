import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import NightSky from '../components/NightSky.jsx'
import { HER_NAME, HIS_NAME } from '../data.js'
import { celebrate } from '../lib/confetti.js'

// Playful nudges shown on the "No" button each time she taps it — it keeps
// shrinking while "Yes" grows, until "No" gives up entirely. 🥺
const NO_LABELS = ['No 🙈', 'Are you sure? 🥺', 'Pretty please? 💗', 'Think again? 🌹', 'Last chance... 💞']

export default function DateInvite() {
  const [accepted, setAccepted] = useState(false)
  const [noClicks, setNoClicks] = useState(0)

  const sayYes = () => {
    setAccepted(true)
    celebrate(4000)
  }

  const noGone = noClicks >= NO_LABELS.length
  const yesScale = 1 + noClicks * 0.18

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#5a2a4d] via-[#3d1f47] to-[#2a1a3e] px-4 text-center">
      <NightSky count={70} />

      <div className="relative z-10 w-full max-w-xl">
        <AnimatePresence mode="wait">
          {!accepted ? (
            <motion.div
              key="ask"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.7 }}
              className="glass-dark rounded-3xl p-8 sm:p-12"
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2.4 }}
                className="text-6xl"
              >
                🌹
              </motion.div>
              <h2 className="mt-5 font-display text-3xl font-bold text-white drop-shadow sm:text-4xl">
                One more thing, {HER_NAME}...
              </h2>
              <p className="mx-auto mt-5 max-w-md font-script text-2xl text-pink-100 sm:text-3xl">
                Will you come out with me this Monday? 💕
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
                <motion.button
                  whileHover={{ scale: yesScale * 1.05 }}
                  whileTap={{ scale: yesScale * 0.96 }}
                  animate={{ scale: yesScale }}
                  onClick={sayYes}
                  className="btn-romantic text-lg"
                >
                  Yes ❤️
                </motion.button>

                {!noGone && (
                  <motion.button
                    key={noClicks}
                    onClick={() => setNoClicks((n) => n + 1)}
                    animate={{ scale: Math.max(1 - noClicks * 0.18, 0.25) }}
                    whileHover={{ rotate: [0, -6, 6, 0] }}
                    className="rounded-full bg-white/15 px-6 py-3 font-body text-base font-semibold text-pink-100 backdrop-blur"
                  >
                    {NO_LABELS[noClicks]}
                  </motion.button>
                )}
              </div>

              {noClicks > 0 && !noGone && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 font-body text-sm text-pink-200/70"
                >
                  Come on... you know you want to say yes 😏💖
                </motion.p>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="yes"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 160, damping: 16 }}
              className="glass-dark rounded-3xl p-8 sm:p-12"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.6 }}
                className="text-7xl"
              >
                🥹❤️
              </motion.div>
              <h2 className="mt-5 font-display text-4xl font-bold text-white drop-shadow-lg sm:text-5xl">
                Yay! You said yes 💖
              </h2>
              <p className="mx-auto mt-6 max-w-md font-script text-2xl text-pink-100 sm:text-3xl">
                I'll be counting down every single moment until Monday.
              </p>
              <motion.p
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="mt-8 font-display text-2xl font-semibold text-rose-200 sm:text-3xl"
              >
                I'll be waiting for you, {HER_NAME} 🌹
              </motion.p>
              <p className="mt-10 font-body text-sm text-pink-200/70">
                Always yours, {HIS_NAME} 💞
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
