import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from '../components/Reveal.jsx'

// Our real photos live in /public/images. Each one carries a little romantic line.
const initialPhotos = [
  { src: '/images/memory-1.jpeg', caption: 'The day my whole world got brighter 🌅', h: 'h-80' },
  { src: '/images/memory-2.jpeg', caption: 'Every moment with you is my favourite 💕', h: 'h-64' },
  { src: '/images/memory-3.jpeg', caption: 'You + Me = Forever ❤️', h: 'h-72' },
  { src: '/images/memory-4.jpeg', caption: 'My heart smiles whenever you’re near 🥰', h: 'h-64' },
  { src: '/images/memory-5.jpeg', caption: 'Lost in your eyes, found in your love ✨', h: 'h-80' },
  { src: '/images/memory-6.jpeg', caption: 'Just us, and that’s everything 💞', h: 'h-56' },
  { src: '/images/memory-7.jpeg', caption: 'You make ordinary days feel magical 🌸', h: 'h-72' },
  { src: '/images/memory-8.jpeg', caption: 'Holding you is holding my whole world 🤍', h: 'h-64' },
  { src: '/images/memory-9.jpeg', caption: 'Thank you for being my happily ever after 💖', h: 'h-80' },
]

export default function Gallery() {
  const [photos, setPhotos] = useState(initialPhotos)
  const [active, setActive] = useState(null)

  const onUpload = (e) => {
    const files = Array.from(e.target.files || [])
    const added = files.map((f, i) => ({
      src: URL.createObjectURL(f),
      caption: 'Our memory 💖',
      h: ['h-56', 'h-64', 'h-72', 'h-80'][i % 4],
    }))
    setPhotos((prev) => {
      // fill empty placeholders first, then append
      const next = [...prev]
      let ai = 0
      for (let i = 0; i < next.length && ai < added.length; i++) {
        if (!next[i].src) {
          next[i] = { ...next[i], src: added[ai].src }
          ai++
        }
      }
      return [...next, ...added.slice(ai)]
    })
  }

  return (
    <section className="relative bg-gradient-to-b from-[#fff5fa] to-[#f3e9ff] px-4 py-24">
      <Reveal className="mx-auto mb-10 max-w-2xl text-center">
        <h2 className="font-display text-3xl font-bold text-gradient sm:text-5xl">Our Memory Gallery</h2>
        <p className="mt-3 font-body text-rose-800/70">Every picture tells a piece of our story 📸</p>
        <label className="btn-romantic mt-6 cursor-pointer text-base">
          Add our photos 🖼️
          <input type="file" accept="image/*" multiple className="hidden" onChange={onUpload} />
        </label>
      </Reveal>

      <div className="mx-auto max-w-5xl columns-2 gap-4 sm:columns-3 [&>*]:mb-4">
        {photos.map((p, i) => (
          <Reveal key={i} delay={(i % 3) * 0.05}>
            <figure className="glass overflow-hidden rounded-2xl">
              <button
                onClick={() => p.src && setActive(p)}
                className={`group relative block w-full overflow-hidden ${p.h}`}
              >
                {p.src ? (
                  <img
                    src={p.src}
                    alt={p.caption}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="glass flex h-full w-full flex-col items-center justify-center gap-2 text-rose-400">
                    <span className="text-4xl">🖼️</span>
                    <span className="font-body text-xs">photo placeholder</span>
                  </div>
                )}
                {/* heart-shaped hover overlay */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-pink-600/30 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                  <span className="text-5xl drop-shadow-lg">❤️</span>
                </div>
              </button>
              {p.src && (
                <figcaption className="px-4 py-3 text-center font-script text-lg leading-tight text-rose-700">
                  {p.caption}
                </figcaption>
              )}
            </figure>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur"
          >
            <motion.figure
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] max-w-3xl overflow-hidden rounded-2xl"
            >
              <img src={active.src} alt={active.caption} className="max-h-[78vh] w-full object-contain" />
              <figcaption className="bg-white/90 p-3 text-center font-script text-2xl text-rose-700">
                {active.caption}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
