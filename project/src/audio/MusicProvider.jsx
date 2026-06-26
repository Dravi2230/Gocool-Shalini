import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { createAmbient } from './ambient.js'

// Plays the romantic background song and keeps it alive across page
// navigation (this provider sits ABOVE the router, so it never unmounts).
//
// The romantic track lives in public/music. If it's missing or unplayable,
// a gentle generative melody plays instead, so the site is never silent.
const SONG_SRC = '/music/deema%20song.mpeg'

const MusicCtx = createContext(null)
export const useMusic = () => useContext(MusicCtx)

export function MusicProvider({ children }) {
  const audioRef = useRef(null)
  const ambientRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [hasSong, setHasSong] = useState(true) // assume real file until it errors

  useEffect(() => {
    ambientRef.current = createAmbient()
    return () => ambientRef.current?.stop()
  }, [])

  // Begin playback (call from a user gesture so browsers allow it).
  const start = () => {
    if (playing) return
    const a = audioRef.current
    if (hasSong && a) {
      a.volume = 0.55
      a.play()
        .then(() => setPlaying(true))
        .catch(() => {
          // Autoplay blocked or file unplayable — fall back to ambient.
          setHasSong(false)
          ambientRef.current?.start()
          setPlaying(true)
        })
    } else {
      ambientRef.current?.start()
      setPlaying(true)
    }
  }

  const pause = () => {
    audioRef.current?.pause()
    ambientRef.current?.stop()
    setPlaying(false)
  }

  const toggle = () => (playing ? pause() : start())

  return (
    <MusicCtx.Provider value={{ start, pause, toggle, playing }}>
      <audio
        ref={audioRef}
        src={SONG_SRC}
        loop
        preload="auto"
        onError={() => setHasSong(false)}
        onPause={() => setPlaying(false)}
      />
      {children}
    </MusicCtx.Provider>
  )
}
