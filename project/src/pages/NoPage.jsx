import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import BrokenHearts from '../components/BrokenHearts.jsx'
import CatCharacter from '../components/CatCharacter.jsx'
import { HER_NAME, HIS_NAME } from '../data.js'
import { playMeow } from '../lib/sound.js'

export default function NoPage() {
  const navigate = useNavigate()
  const [forgiven, setForgiven] = useState(false)

  const pet = () => {
    playMeow()
    setForgiven(true)
  }

  return (
    <div className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#ffd9e8] via-[#ffe0ef] to-[#ffd0e4] px-4 py-10 text-center">
      <BrokenHearts count={forgiven ? 0 : 18} />

      <div className="relative z-10 flex w-full max-w-lg flex-col items-center">
        {/* speech bubble */}
        <motion.div
          key={forgiven ? 'happy-bubble' : 'sad-bubble'}
          initial={{ opacity: 0, scale: 0.7, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="relative mb-2 rounded-2xl bg-white px-6 py-3 font-body text-lg font-semibold text-rose-700 shadow-lg"
        >
          {forgiven ? 'Purr~ good choice! 😻❤️' : 'Meow! Try again, princess! 👑❤️'}
          <span className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-white" />
        </motion.div>

        <CatCharacter mood={forgiven ? 'happy' : 'sad'} />

        <AnimatePresence mode="wait">
          {!forgiven ? (
            <motion.div
              key="sad"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-6"
            >
              <h1 className="font-display text-3xl font-bold text-rose-600 sm:text-4xl">
                😾 HOW DARE YOU SAY NO?! 😾
              </h1>
              <p className="mt-4 font-body text-lg text-rose-800/85">
                {HIS_NAME} spent days preparing this surprise for you, {HER_NAME}! 💔
              </p>
              <p className="mt-1 font-body text-rose-800/70">The cat is disappointed...</p>
              <p className="mt-1 font-script text-2xl text-rose-700">
                Please go back and make the right choice 😤💕
              </p>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/ready')}
                  className="btn-romantic text-lg"
                >
                  🔙 Go Back
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={pet}
                  className="glass rounded-full px-8 py-4 font-body text-lg font-semibold text-rose-700"
                >
                  🐾 Pet the Cat
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="happy"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6"
            >
              <h1 className="font-display text-3xl font-bold text-gradient sm:text-4xl">
                Aww, all is forgiven! 😻
              </h1>
              <p className="mt-4 font-script text-2xl text-rose-700">
                "Okay, I forgive you. Now go open the surprise! ❤️"
              </p>
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/surprise')}
                className="btn-romantic mt-7 text-lg"
              >
                Open My Surprise ❤️
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
