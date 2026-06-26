import Reveal from '../components/Reveal.jsx'
import { timeline } from '../data.js'

export default function Timeline() {
  return (
    <section id="timeline" className="relative bg-gradient-to-b from-[#fff5fa] to-[#f3e9ff] px-4 py-24">
      <Reveal className="mx-auto mb-16 max-w-2xl text-center">
        <h2 className="font-display text-3xl font-bold text-gradient sm:text-5xl">Our Love Story</h2>
        <p className="mt-3 font-body text-rose-800/70">From childhood friends to a beautiful love story 💕</p>
      </Reveal>

      <div className="relative mx-auto max-w-3xl">
        {/* glowing vertical line */}
        <div className="absolute left-6 top-0 h-full w-1 -translate-x-1/2 rounded-full bg-gradient-to-b from-pink-400 via-fuchsia-400 to-rose-gold sm:left-1/2" />

        <div className="space-y-12">
          {timeline.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <div
                className={`relative flex items-center gap-6 sm:gap-10 ${
                  i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
              >
                {/* node */}
                <div className="absolute left-6 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-white text-2xl shadow-lg ring-4 ring-pink-200 sm:left-1/2">
                  {item.icon}
                </div>

                <div className="ml-16 w-full sm:ml-0 sm:w-[calc(50%-3rem)]">
                  <div className="glass overflow-hidden rounded-2xl">
                    {item.image && (
                      <div className="overflow-hidden bg-pink-50/40">
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          className="max-h-80 w-full object-contain transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="font-display text-xl font-bold text-rose-900">{item.title}</h3>
                      <p className="mt-2 font-body text-rose-800/80">{item.text}</p>
                    </div>
                  </div>
                </div>
                <div className="hidden sm:block sm:w-[calc(50%-3rem)]" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
