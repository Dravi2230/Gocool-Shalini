import Reveal from '../components/Reveal.jsx'
import Typewriter from '../components/Typewriter.jsx'
import { loveLetter } from '../data.js'

export default function Letter() {
  return (
    <section className="relative bg-gradient-to-b from-[#f3e9ff] to-[#ffeef6] px-4 py-24">
      <Reveal className="mx-auto max-w-2xl">
        <div className="glass rounded-3xl p-8 sm:p-12">
          <div className="mb-6 text-center text-4xl">💌</div>
          <Typewriter
            text={loveLetter}
            speed={22}
            className="whitespace-pre-wrap font-script text-2xl leading-relaxed text-rose-900 sm:text-3xl"
          />
        </div>
      </Reveal>
    </section>
  )
}
