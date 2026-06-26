import { useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import GameDisclaimer from '../components/heartgame/GameDisclaimer.jsx'
import FloatingHeart from '../components/heartgame/FloatingHeart.jsx'
import LoveBottle from '../components/heartgame/LoveBottle.jsx'
import MessagePopup from '../components/heartgame/MessagePopup.jsx'
import CompletionCard from '../components/heartgame/CompletionCard.jsx'
import { heartMessages } from '../data.js'
import { celebrate } from '../lib/confetti.js'
import { playChime } from '../lib/sound.js'

const TOTAL_BLUE = 5
const RED_COUNT = 7

// Build the roaming hearts once, with randomized paths, sizes and timings so the
// movement feels natural and never repeats in lockstep.
function makeHearts() {
  const rnd = (min, max) => min + Math.random() * (max - min)
  const drift = () => [rnd(-40, 40), rnd(-50, 50), rnd(-40, 40)]

  const make = (id, color, sizeRange) => ({
    id,
    color,
    left: rnd(8, 84),
    top: rnd(6, 60),
    size: rnd(...sizeRange),
    driftX: drift(),
    driftY: drift(),
    rotate: [rnd(-15, 0), rnd(0, 15), rnd(-12, 12)],
    duration: rnd(12, 22),
    delay: rnd(0, 4),
  })

  const blue = Array.from({ length: TOTAL_BLUE }, (_, i) => make(`b${i}`, 'blue', [40, 60]))
  const red = Array.from({ length: RED_COUNT }, (_, i) => make(`r${i}`, 'red', [30, 52]))
  // shuffle so blues aren't all on top
  return [...blue, ...red].sort(() => Math.random() - 0.5)
}

export default function HeartGame() {
  const navigate = useNavigate()
  const bottleRef = useRef(null)
  const allHearts = useMemo(makeHearts, [])

  const [phase, setPhase] = useState('disclaimer') // disclaimer | playing | complete
  const [hearts, setHearts] = useState(allHearts)
  const [collected, setCollected] = useState(0)
  const [showMessage, setShowMessage] = useState(false)
  const [burst, setBurst] = useState(0)
  const [redTaps, setRedTaps] = useState([])

  const isLast = collected >= TOTAL_BLUE

  const handleCollect = (id, info) => {
    const rect = bottleRef.current?.getBoundingClientRect()
    if (!rect) return
    const pad = 50
    const { x, y } = info.point
    const inside =
      x > rect.left - pad && x < rect.right + pad && y > rect.top - pad && y < rect.bottom + pad
    if (!inside) return // dragSnapToOrigin gently returns the heart

    setHearts((hs) => hs.filter((h) => h.id !== id))
    setCollected((c) => c + 1)
    setBurst((b) => b + 1)
    playChime()
    setShowMessage(true)
  }

  const handleTapRed = (e) => {
    const id = Math.random().toString(36).slice(2)
    setRedTaps((t) => [...t, { id, x: e.clientX, y: e.clientY }])
    setTimeout(() => setRedTaps((t) => t.filter((m) => m.id !== id)), 1300)
  }

  const handleNext = () => {
    setShowMessage(false)
    if (collected >= TOTAL_BLUE) {
      setPhase('complete')
      celebrate(3500)
    }
  }

  const gameOver = phase === 'complete'

  return (
    <div className="romantic-gradient animate-shimmer relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-4 py-10">
      {/* roaming hearts */}
      <AnimatePresence>
        {phase !== 'disclaimer' && !gameOver && (
          <motion.div
            key="field"
            className="absolute inset-0 z-10"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
          >
            <AnimatePresence>
              {hearts.map((h) => (
                <motion.div key={h.id} exit={{ scale: 0, opacity: 0, transition: { duration: 0.35 } }}>
                  <FloatingHeart heart={h} onCollect={handleCollect} onTapRed={handleTapRed} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* the bottle sits center stage during play */}
      {phase !== 'disclaimer' && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pointer-events-none relative z-20"
        >
          <LoveBottle ref={bottleRef} collected={collected} total={TOTAL_BLUE} burst={burst} />
          {!gameOver && (
            <p className="mt-3 text-center font-script text-xl text-rose-700/80">
              Drag the blue hearts in here 💙
            </p>
          )}
        </motion.div>
      )}

      {/* "not this one" notes when she taps a red heart */}
      <AnimatePresence>
        {redTaps.map((m) => (
          <motion.span
            key={m.id}
            className="pointer-events-none fixed z-40 -translate-x-1/2 select-none whitespace-nowrap rounded-full bg-white/70 px-3 py-1 font-body text-sm font-semibold text-rose-600 shadow"
            style={{ left: m.x, top: m.y }}
            initial={{ opacity: 0, y: 0, scale: 0.8 }}
            animate={{ opacity: 1, y: -40, scale: 1 }}
            exit={{ opacity: 0, y: -60 }}
            transition={{ duration: 0.4 }}
          >
            Hehe... not this one ❤️
          </motion.span>
        ))}
      </AnimatePresence>

      {/* overlays */}
      <AnimatePresence mode="wait">
        {phase === 'disclaimer' && (
          <GameDisclaimer key="disclaimer" onStart={() => setPhase('playing')} />
        )}
        {showMessage && (
          <MessagePopup
            key="message"
            message={heartMessages[Math.min(collected, TOTAL_BLUE) - 1]}
            isLast={isLast}
            onNext={handleNext}
          />
        )}
        {gameOver && <CompletionCard key="done" onContinue={() => navigate('/surprise')} />}
      </AnimatePresence>
    </div>
  )
}
