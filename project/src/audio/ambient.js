// Generative romantic ambient loop (Web Audio) used ONLY as a fallback when
// the real song file isn't present yet. Returns a controller with start/stop.
export function createAmbient() {
  let ctx = null
  let timer = null
  let master = null

  const chords = [
    [261.63, 329.63, 392.0], // C major
    [293.66, 349.23, 440.0], // D minor
    [349.23, 440.0, 523.25], // F major
    [392.0, 493.88, 587.33], // G major
  ]

  const start = () => {
    if (ctx) return
    const Ctx = window.AudioContext || window.webkitAudioContext
    ctx = new Ctx()
    master = ctx.createGain()
    master.gain.value = 0
    master.connect(ctx.destination)
    master.gain.linearRampToValueAtTime(0.16, ctx.currentTime + 1.5)

    let step = 0
    const playChord = () => {
      const chord = chords[step % chords.length]
      step += 1
      chord.forEach((freq, i) => {
        const osc = ctx.createOscillator()
        const g = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.value = freq
        const now = ctx.currentTime
        g.gain.setValueAtTime(0, now)
        g.gain.linearRampToValueAtTime(0.4 / (i + 1), now + 0.4)
        g.gain.linearRampToValueAtTime(0, now + 3.4)
        osc.connect(g)
        g.connect(master)
        osc.start(now)
        osc.stop(now + 3.6)
      })
    }
    playChord()
    timer = setInterval(playChord, 3200)
  }

  const stop = () => {
    if (timer) clearInterval(timer)
    timer = null
    if (ctx && master) {
      master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6)
      const c = ctx
      setTimeout(() => c.close(), 800)
    }
    ctx = null
    master = null
  }

  return { start, stop }
}
