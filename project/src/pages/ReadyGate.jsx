import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import FloatingHearts from '../components/FloatingHearts.jsx'
import { HER_NAME } from '../data.js'

const MAX_DODGES = 6

export default function ReadyGate() {
  const navigate = useNavigate()
  const [dodges, setDodges] = useState(0)
  const [pos, setPos] = useState(null) // null = in normal flow; {top,left} = escaped
  const [yesDodges, setYesDodges] = useState(0)
  const [yesPos, setYesPos] = useState(null) // null = in normal flow; {top,left} = scattered

  const runAway = () => {
    if (dodges >= MAX_DODGES) return // give up — let her catch it
    setDodges((d) => d + 1)
    setPos({
      top: 10 + Math.random() * 70, // %
      left: 8 + Math.random() * 78,
    })
  }

  // The Yes button playfully scatters 3 times, then on the 4th click lets her in.
  const onYes = () => {
    if (yesDodges >= 3) {
      navigate('/hearts')
      return
    }
    setYesDodges((d) => d + 1)
    setYesPos({
      top: 10 + Math.random() * 70, // %
      left: 8 + Math.random() * 78,
    })
  }

  const caught = dodges >= MAX_DODGES

  const yesButton = (
    <motion.button
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      onClick={onYes}
      className="btn-romantic text-lg"
      style={
        yesPos
          ? { position: 'absolute', top: `${yesPos.top}%`, left: `${yesPos.left}%`, zIndex: 20 }
          : undefined
      }
    >
      Yes ❤️
    </motion.button>
  )

  const noButton = (
    <motion.button
      onMouseEnter={runAway}
      onTouchStart={(e) => {
        if (!caught) {
          e.preventDefault()
          runAway()
        }
      }}
      onClick={() => navigate('/no')}
      whileHover={{ scale: 1.05 }}
      className="glass rounded-full px-8 py-4 font-body text-lg font-semibold text-rose-700"
      style={
        pos
          ? { position: 'absolute', top: `${pos.top}%`, left: `${pos.left}%`, zIndex: 20 }
          : undefined
      }
      animate={pos ? { scale: 1 } : {}}
    >
      No 🙈
    </motion.button>
  )

  return (
    <div className="romantic-gradient animate-shimmer relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-4">
      <FloatingHearts count={16} />

      <div className="relative z-10 w-full max-w-lg text-center">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="glass rounded-3xl p-8 sm:p-12"
        >
          <motion.div
            animate={{ rotate: [0, -8, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mb-3 text-6xl"
          >
            🎁
          </motion.div>
          <h1 className="font-display text-3xl font-bold text-gradient sm:text-4xl">
            Are you ready to open your surprise, {HER_NAME}? ❤️
          </h1>
          <p className="mt-4 font-body text-rose-800/70">
            {caught ? 'Okay okay, you really clicked it... 😼' : 'Choose wisely, princess 👑'}
          </p>

          <div className="relative mt-8 flex min-h-[64px] flex-wrap items-center justify-center gap-4">
            {!yesPos && yesButton}
            {!pos && noButton}
          </div>
        </motion.div>
      </div>

      {/* the runaway buttons live at page level once they escape */}
      {yesPos && yesButton}
      {pos && noButton}
    </div>
  )
}
