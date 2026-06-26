import { motion } from 'framer-motion'

// The final card once every blue heart is safely in the bottle.
export default function CompletionCard({ onContinue }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-rose-900/25 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.15 }}
        className="glass relative z-10 w-full max-w-md rounded-3xl p-8 text-center sm:p-12"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 8, -8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mb-4 text-7xl"
        >
          💖
        </motion.div>
        <h1 className="font-display text-3xl font-bold text-gradient sm:text-4xl">One Last Thing... ❤️</h1>
        <p className="mt-5 font-body text-lg leading-relaxed text-rose-900/80">
          You've now collected every little piece of my heart.
        </p>
        <p className="mt-2 font-script text-2xl text-rose-700">
          But this is only the beginning...
        </p>
        <p className="mt-2 font-body text-lg text-rose-900/80">
          The biggest surprise is still waiting for you.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onContinue}
          className="btn-romantic mt-8 text-lg"
        >
          ✨ Continue to the Next Surprise ✨
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
