import { useMusic } from '../audio/MusicProvider.jsx'

// Floating control to play / pause the romantic background song.
export default function MusicToggle() {
  const { toggle, playing } = useMusic()

  return (
    <button
      onClick={toggle}
      aria-label={playing ? 'Pause music' : 'Play romantic music'}
      title={playing ? 'Pause music' : 'Play romantic music'}
      className="glass fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full text-xl shadow-lg transition-transform hover:scale-110"
    >
      {playing ? '🎵' : '🔇'}
    </button>
  )
}
