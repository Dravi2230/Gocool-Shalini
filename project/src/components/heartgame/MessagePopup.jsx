import { motion } from 'framer-motion'

// The romantic note shown after each blue heart lands in the bottle.
export default function MessagePopup({ message, isLast, onNext }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-rose-900/20 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -10 }}
        transition={{ type: 'spring', stiffness: 220, damping: 20 }}
        className="glass relative z-10 w-full max-w-md rounded-3xl p-8 text-center sm:p-10"
      >
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="mb-4 text-5xl"
        >
          ❤️‍🔥
        </motion.div>
        <p className="whitespace-pre-line font-body text-lg leading-relaxed text-rose-900/85">
          {message}
        </p>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={onNext}
          className="btn-romantic mt-8 text-lg"
        >
          {isLast ? 'See My Surprise ✨' : 'Catch Next Heart 💙'}
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
