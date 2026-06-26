// A soft, sparkly success chime (two gentle bell tones) using Web Audio.
// Triggered when a blue heart drops into the bottle. 💙
export function playChime() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext
    const ctx = new Ctx()
    const now = ctx.currentTime
    const notes = [880, 1318.5] // A5, E6 — a warm, happy interval
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      const t = now + i * 0.09
      osc.frequency.setValueAtTime(freq, t)
      gain.gain.setValueAtTime(0, t)
      gain.gain.linearRampToValueAtTime(0.18, t + 0.03)
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.6)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(t)
      osc.stop(t + 0.65)
    })
    setTimeout(() => ctx.close(), 1200)
  } catch {
    /* audio not available — fail silently */
  }
}

// A synthesized "meow" using the Web Audio API — no audio file needed.
// Only ever triggered by a user gesture (petting the cat), so it stays
// silent until she chooses to make a sound. 🐱
export function playMeow() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext
    const ctx = new Ctx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const filter = ctx.createBiquadFilter()

    filter.type = 'bandpass'
    filter.frequency.value = 900
    filter.Q.value = 6

    osc.type = 'sawtooth'
    const now = ctx.currentTime
    osc.frequency.setValueAtTime(560, now)
    osc.frequency.linearRampToValueAtTime(920, now + 0.12)
    osc.frequency.linearRampToValueAtTime(470, now + 0.42)

    gain.gain.setValueAtTime(0, now)
    gain.gain.linearRampToValueAtTime(0.22, now + 0.05)
    gain.gain.linearRampToValueAtTime(0, now + 0.5)

    osc.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.55)
    setTimeout(() => ctx.close(), 800)
  } catch {
    /* audio not available — fail silently */
  }
}
