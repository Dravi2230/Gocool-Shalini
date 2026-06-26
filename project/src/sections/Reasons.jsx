import { motion } from 'framer-motion'
import Reveal from '../components/Reveal.jsx'
import { reasons } from '../data.js'

export default function Reasons() {
  return (
    <section className="relative bg-gradient-to-b from-[#ffeef6] to-[#fff5fa] px-4 py-24">
      <Reveal className="mx-auto mb-14 max-w-2xl text-center">
        <h2 className="font-display text-3xl font-bold text-gradient sm:text-5xl">20 Reasons I Love You</h2>
        <p className="mt-3 font-body text-rose-800/70">Hover a card to flip it 💕</p>
      </Reveal>

      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {reasons.map((reason, i) => (
          <Reveal key={reason.text} delay={(i % 4) * 0.05}>
            <div className="group h-32 [perspective:1000px]">
              <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* front */}
                <div className="glass absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-2xl [backface-visibility:hidden]">
                  <span className="text-3xl">{reason.emoji}</span>
                  <span className="font-display text-lg font-bold text-rose-400/80">#{i + 1}</span>
                </div>
                {/* back */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-2xl bg-gradient-to-br from-pink-500 to-fuchsia-500 p-3 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <span className="text-xl">{reason.emoji}</span>
                  <span className="font-body text-sm font-semibold text-white">{reason.text}</span>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
