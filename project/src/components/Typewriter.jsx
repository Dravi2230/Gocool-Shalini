import { useEffect, useRef, useState } from 'react'

// Types out text once the element scrolls into view.
export default function Typewriter({ text, speed = 28, className = '', startDelay = 200 }) {
  const [shown, setShown] = useState('')
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          obs.disconnect()
        }
      },
      { threshold: 0.25 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    let i = 0
    let timeoutId
    const tick = () => {
      setShown(text.slice(0, i))
      if (i <= text.length) {
        i += 1
        timeoutId = setTimeout(tick, speed)
      }
    }
    const startId = setTimeout(tick, startDelay)
    return () => {
      clearTimeout(startId)
      clearTimeout(timeoutId)
    }
  }, [started, text, speed, startDelay])

  const done = shown.length >= text.length

  return (
    <div ref={ref} className={className}>
      {shown}
      {!done && <span className="animate-pulse">|</span>}
    </div>
  )
}
