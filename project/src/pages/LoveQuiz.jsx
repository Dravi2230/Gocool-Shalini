import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import FloatingHearts from '../components/FloatingHearts.jsx'
import { quizQuestions, HER_NAME } from '../data.js'
import { celebrate } from '../lib/confetti.js'
import { useMusic } from '../audio/MusicProvider.jsx'

const STAGE = { LOCK: 'lock', WELCOME: 'welcome', QUIZ: 'quiz', SUCCESS: 'success' }

const PIN_CODE = '2727'

const slide = {
  initial: { opacity: 0, y: 40, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -40, scale: 0.96 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
}

export default function LoveQuiz() {
  const navigate = useNavigate()
  const { start: startMusic } = useMusic()
  const [stage, setStage] = useState(STAGE.LOCK)
  const [index, setIndex] = useState(0)
  const [textValue, setTextValue] = useState('')
  const [error, setError] = useState('')
  const [pin, setPin] = useState('')
  const [pinError, setPinError] = useState(false)

  const q = quizQuestions[index]

  const pressDigit = (d) => {
    if (pin.length >= 4) return
    setPinError(false)
    const next = pin + d
    setPin(next)
    if (next.length === 4) {
      if (next === PIN_CODE) {
        // Kick off the song right here — we're inside her tap, so the browser
        // allows the audio to start. It keeps playing through the whole site.
        startMusic()
        setTimeout(() => setStage(STAGE.WELCOME), 250)
      } else {
        setTimeout(() => {
          setPinError(true)
          setPin('')
        }, 250)
      }
    }
  }

  const pressDelete = () => {
    setPinError(false)
    setPin((p) => p.slice(0, -1))
  }

  const advance = () => {
    setTextValue('')
    setError('')
    if (index + 1 < quizQuestions.length) {
      // The romantic song kicks in as she reaches the final question, and it
      // keeps playing all the way through the surprise. This advance() runs
      // inside her click, so browsers allow the audio to start.
      if (index + 1 === quizQuestions.length - 1) startMusic()
      setIndex((i) => i + 1)
    } else {
      setStage(STAGE.SUCCESS)
      celebrate(3500)
    }
  }

  const submitText = (e) => {
    e.preventDefault()
    const guess = textValue.trim().toLowerCase()
    if (!guess) {
      setError('A little something, my love? 🥹')
      return
    }
    if (guess === q.answer) {
      advance()
    } else {
      setError("Aww, try again sweetheart 💕 (hint: it's who you truly are)")
    }
  }

  const chooseOption = (opt) => {
    if (q.type === 'choice-any') {
      advance()
      return
    }
    if (opt === q.answer) {
      advance()
    } else {
      setError('Not quite 😅 You know the right one in your heart 💖')
    }
  }

  return (
    <div className="romantic-gradient animate-shimmer relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-4 py-10">
      <FloatingHearts count={16} />

      <div className="relative z-10 w-full max-w-xl">
        <AnimatePresence mode="wait">
          {stage === STAGE.LOCK && (
            <motion.div key="lock" {...slide} className="glass rounded-3xl p-8 text-center sm:p-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
                className="mb-3 text-5xl"
              >
                🔒
              </motion.div>
              <h1 className="font-display text-3xl font-bold text-gradient sm:text-4xl">Enter Passcode</h1>
              <p className="mx-auto mt-3 max-w-xs font-body text-base text-rose-900/70">
                This surprise is just for you, my love. Enter your secret code 💕
              </p>
              <p className="mx-auto mt-2 max-w-xs font-body text-sm italic text-rose-700/70">
                Hint: your boyfriend's GPay PIN 😉
              </p>

              <motion.div
                animate={pinError ? { x: [0, -10, 10, -8, 8, 0] } : { x: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-7 flex justify-center gap-4"
              >
                {[0, 1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className={`h-4 w-4 rounded-full border-2 transition-all ${
                      i < pin.length
                        ? 'border-pink-500 bg-pink-500'
                        : pinError
                        ? 'border-rose-400'
                        : 'border-rose-300/70'
                    }`}
                  />
                ))}
              </motion.div>

              <AnimatePresence>
                {pinError && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 font-body text-sm font-medium text-rose-600"
                  >
                    Wrong passcode 🥺 try again, sweetheart
                  </motion.p>
                )}
              </AnimatePresence>

              <div className="mx-auto mt-7 grid max-w-[16rem] grid-cols-3 gap-3">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((d) => (
                  <motion.button
                    key={d}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => pressDigit(d)}
                    className="glass flex h-16 items-center justify-center rounded-full font-display text-2xl font-semibold text-rose-900 transition hover:bg-white/50"
                  >
                    {d}
                  </motion.button>
                ))}
                <span />
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={() => pressDigit('0')}
                  className="glass flex h-16 items-center justify-center rounded-full font-display text-2xl font-semibold text-rose-900 transition hover:bg-white/50"
                >
                  0
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={pressDelete}
                  className="flex h-16 items-center justify-center rounded-full font-body text-xl text-rose-700/80 transition hover:text-rose-900"
                  aria-label="Delete"
                >
                  ⌫
                </motion.button>
              </div>
            </motion.div>
          )}

          {stage === STAGE.WELCOME && (
            <motion.div key="welcome" {...slide} className="glass rounded-3xl p-8 text-center sm:p-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="mb-4 text-6xl"
              >
                💝
              </motion.div>
              <h1 className="font-display text-4xl font-bold text-gradient sm:text-5xl">Hey Beautiful ❤️</h1>
              <p className="mx-auto mt-5 max-w-md font-body text-lg text-rose-900/80">
                Before you enter your birthday surprise, let's see how well you know your boyfriend 😘
              </p>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setStage(STAGE.QUIZ)}
                className="btn-romantic mt-8 text-lg"
              >
                Start the Love Quiz ❤️
              </motion.button>
            </motion.div>
          )}

          {stage === STAGE.QUIZ && (
            <motion.div key={`q-${q.id}`} {...slide} className="glass rounded-3xl p-8 sm:p-10">
              <div className="mb-6 flex items-center justify-between">
                <span className="font-body text-sm font-semibold uppercase tracking-wider text-rose-700/70">
                  Question {index + 1} / {quizQuestions.length}
                </span>
                <div className="flex gap-1.5">
                  {quizQuestions.map((_, i) => (
                    <span
                      key={i}
                      className={`h-2 rounded-full transition-all ${
                        i <= index ? 'w-6 bg-pink-500' : 'w-2 bg-pink-300/50'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <h2 className="font-display text-2xl font-bold leading-snug text-rose-900 sm:text-3xl">
                {q.question}
              </h2>

              {q.type === 'text' ? (
                <form onSubmit={submitText} className="mt-7">
                  <input
                    autoFocus
                    value={textValue}
                    onChange={(e) => {
                      setTextValue(e.target.value)
                      setError('')
                    }}
                    placeholder={q.placeholder}
                    className="w-full rounded-2xl border border-white/60 bg-white/60 px-5 py-4 text-lg text-rose-900 placeholder-rose-400/70 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-300"
                  />
                  <motion.button whileTap={{ scale: 0.97 }} type="submit" className="btn-romantic mt-5 w-full">
                    Continue 💕
                  </motion.button>
                </form>
              ) : (
                <div className="mt-7 grid gap-3">
                  {q.options.map((opt) => (
                    <motion.button
                      key={opt}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => chooseOption(opt)}
                      className="glass rounded-2xl px-5 py-4 text-left font-body text-lg font-medium text-rose-900 transition hover:bg-white/50"
                    >
                      {opt}
                    </motion.button>
                  ))}
                </div>
              )}

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 text-center font-body text-sm font-medium text-rose-600"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {stage === STAGE.SUCCESS && (
            <motion.div key="success" {...slide} className="glass rounded-3xl p-8 text-center sm:p-12">
              <motion.div
                animate={{ scale: [1, 1.15, 1], rotate: [0, 8, -8, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="mb-4 text-7xl"
              >
                ❤️
              </motion.div>
              <h1 className="font-display text-3xl font-bold text-gradient sm:text-4xl">
                Access Granted, My Love ❤️
              </h1>
              <p className="mt-5 font-body text-lg text-rose-900/80">
                Congratulations {HER_NAME}, you know your boyfriend perfectly.
              </p>
              <p className="mt-2 font-script text-2xl text-rose-700">
                Your birthday surprise is waiting for you...
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/ready')}
                className="btn-romantic mt-8 text-lg"
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
