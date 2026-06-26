import Reveal from '../components/Reveal.jsx'
import { wishes } from '../data.js'

export default function Wishes() {
  return (
    <section className="relative bg-gradient-to-b from-[#f3e9ff] to-[#ffeef6] px-4 py-24">
      <Reveal className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="font-display text-3xl font-bold text-gradient sm:text-5xl">Birthday Wishes</h2>
        <p className="mt-3 font-body text-rose-800/70">From my heart to yours 🎁</p>
      </Reveal>

      <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2">
        {wishes.map((wish, i) => (
          <Reveal key={i} delay={(i % 2) * 0.08}>
            <div className="glass h-full rounded-2xl p-7">
              <span className="text-3xl">{['🌟', '🌈', '🎈', '💫'][i % 4]}</span>
              <p className="mt-3 font-body text-lg leading-relaxed text-rose-900/85">{wish}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
