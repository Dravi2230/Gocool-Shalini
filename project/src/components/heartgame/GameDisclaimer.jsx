import { motion } from 'framer-motion'

// The intro card that sets up the little heart-collecting game.
export default function GameDisclaimer({ onStart }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glass relative z-30 w-full max-w-md rounded-3xl p-8 text-center sm:p-10"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
        className="mb-3 text-5xl"
      >
        💌
      </motion.div>
      <h1 className="font-display text-3xl font-bold text-gradient sm:text-4xl">A Little Message ❤️</h1>
      <div className="mt-5 space-y-3 font-body text-base leading-relaxed text-rose-900/80">
        <p>Every heart you catch carries a little piece of what my heart wants to tell you.</p>
        <p>
          Catch only the <span className="font-semibold text-sky-600">Blue Hearts 💙</span> and gently drag
          them into the Love Bottle.
        </p>
        <p>
          Ignore the <span className="font-semibold text-rose-600">Red Hearts ❤️</span>.
        </p>
        <p className="font-script text-2xl text-rose-700">Ready?</p>
      </div>
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={onStart}
        className="btn-romantic mt-7 text-lg"
      >
        Start Collecting ❤️
      </motion.button>
    </motion.div>
  )
}
