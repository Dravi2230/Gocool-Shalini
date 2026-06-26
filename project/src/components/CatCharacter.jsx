import { motion } from 'framer-motion'

// A chubby kawaii cartoon cat. `mood` = 'sad' (shocked & pouty) or 'happy'.
export default function CatCharacter({ mood = 'sad' }) {
  const happy = mood === 'happy'

  return (
    <motion.div
      // whole-cat motion: dramatic head shake when sad, a happy bounce when forgiven
      animate={
        happy
          ? { y: [0, -16, 0], rotate: 0 }
          : { rotate: [0, -7, 7, -7, 7, 0], y: 0 }
      }
      transition={{ repeat: Infinity, duration: happy ? 0.9 : 1.4, ease: 'easeInOut' }}
      className="w-60 sm:w-72"
    >
      <svg viewBox="0 0 260 280" className="h-auto w-full drop-shadow-xl">
        {/* tail (behind body) */}
        <motion.path
          d="M205 215 q60 -10 45 -70 q-5 35 -40 35"
          fill="#ff9f4d"
          style={{ transformOrigin: '205px 215px' }}
          animate={{ rotate: [0, 18, -4, 18, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        />

        {/* ears */}
        <polygon points="60,70 38,8 112,46" fill="#ffc88a" />
        <polygon points="200,70 222,8 148,46" fill="#ffc88a" />
        <polygon points="66,62 52,26 96,48" fill="#ffb3c6" />
        <polygon points="194,62 208,26 164,48" fill="#ffb3c6" />

        {/* body */}
        <ellipse cx="130" cy="235" rx="92" ry="62" fill="#ffc88a" />
        {/* head */}
        <circle cx="130" cy="135" r="96" fill="#ffd7a0" />

        {/* tabby stripes */}
        <path d="M130 45 v34" stroke="#ff9f4d" strokeWidth="7" strokeLinecap="round" />
        <path d="M108 50 v24" stroke="#ff9f4d" strokeWidth="6" strokeLinecap="round" />
        <path d="M152 50 v24" stroke="#ff9f4d" strokeWidth="6" strokeLinecap="round" />

        {/* cheeks blush */}
        <ellipse cx="70" cy="160" rx="18" ry="11" fill="#ff9eb5" opacity={happy ? 0.9 : 0.7} />
        <ellipse cx="190" cy="160" rx="18" ry="11" fill="#ff9eb5" opacity={happy ? 0.9 : 0.7} />

        {happy ? (
          <>
            {/* happy closed eyes ^ ^ */}
            <path d="M72 138 q22 -26 44 0" stroke="#3a2a22" strokeWidth="7" fill="none" strokeLinecap="round" />
            <path d="M144 138 q22 -26 44 0" stroke="#3a2a22" strokeWidth="7" fill="none" strokeLinecap="round" />
            {/* big smile */}
            <path d="M104 168 q26 30 52 0" stroke="#3a2a22" strokeWidth="6" fill="none" strokeLinecap="round" />
          </>
        ) : (
          <>
            {/* worried eyebrows */}
            <path d="M70 100 l34 10" stroke="#3a2a22" strokeWidth="6" strokeLinecap="round" />
            <path d="M190 100 l-34 10" stroke="#3a2a22" strokeWidth="6" strokeLinecap="round" />

            {/* big shocked sparkly eyes (with a blink) */}
            {[94, 166].map((cx) => (
              <motion.g
                key={cx}
                style={{ transformOrigin: `${cx}px 140px`, transformBox: 'fill-box' }}
                animate={{ scaleY: [1, 1, 1, 0.1, 1] }}
                transition={{ repeat: Infinity, duration: 3.4, times: [0, 0.85, 0.9, 0.95, 1] }}
              >
                <ellipse cx={cx} cy="140" rx="21" ry="25" fill="#3a2a22" />
                <circle cx={cx - 7} cy="131" r="7" fill="#fff" />
                <circle cx={cx + 6} cy="146" r="3.5" fill="#fff" />
              </motion.g>
            ))}

            {/* a dramatic little tear */}
            <motion.path
              d="M180 162 q-8 14 0 20 q8 -6 0 -20"
              fill="#8ad4ff"
              animate={{ opacity: [0, 1, 1, 0], y: [0, 6, 12, 18] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'easeIn' }}
            />

            {/* pouty mouth */}
            <path
              d="M114 176 q16 -14 32 0"
              stroke="#3a2a22"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
            />
          </>
        )}

        {/* nose */}
        <path d="M124 156 h12 l-6 8 z" fill="#ff7a9c" />

        {/* whiskers */}
        <g stroke="#caa978" strokeWidth="3" strokeLinecap="round">
          <path d="M40 150 h34" />
          <path d="M42 166 h32" />
          <path d="M220 150 h-34" />
          <path d="M218 166 h-32" />
        </g>

        {/* little paws */}
        <ellipse cx="92" cy="276" rx="22" ry="13" fill="#ffd7a0" />
        <ellipse cx="168" cy="276" rx="22" ry="13" fill="#ffd7a0" />
      </svg>
    </motion.div>
  )
}
