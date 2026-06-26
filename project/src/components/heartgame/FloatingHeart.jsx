import { useRef } from 'react'
import { motion } from 'framer-motion'

// One roaming heart. Blue hearts are draggable (drop into the bottle to collect);
// red hearts are decoys that just wiggle when tapped.
//
// Two layers: an outer wrapper handles the gentle endless "wander" so it never
// fights with Framer's drag transform on the inner element.
export default function FloatingHeart({ heart, onCollect, onTapRed }) {
  const isBlue = heart.color === 'blue'

  return (
    <motion.div
      className="absolute"
      style={{ left: `${heart.left}%`, top: `${heart.top}%` }}
      animate={{ x: heart.driftX, y: heart.driftY, rotate: heart.rotate }}
      transition={{
        duration: heart.duration,
        delay: heart.delay,
        repeat: Infinity,
        repeatType: 'mirror',
        ease: 'easeInOut',
      }}
    >
      {isBlue ? (
        <motion.div
          drag
          dragSnapToOrigin
          dragMomentum={false}
          whileHover={{ scale: 1.18 }}
          whileDrag={{ scale: 1.25, zIndex: 60 }}
          onDragEnd={(e, info) => onCollect(heart.id, info)}
          className="cursor-grab touch-none select-none drop-shadow-[0_0_10px_rgba(56,189,248,0.7)] active:cursor-grabbing"
          style={{ fontSize: heart.size }}
        >
          💙
        </motion.div>
      ) : (
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8, rotate: -10 }}
          onClick={(e) => onTapRed(e)}
          className="cursor-pointer select-none drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]"
          style={{ fontSize: heart.size }}
        >
          ❤️
        </motion.div>
      )}
    </motion.div>
  )
}
