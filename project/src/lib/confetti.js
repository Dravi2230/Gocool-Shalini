import confetti from 'canvas-confetti'

const heart = confetti.shapeFromText({ text: '❤️', scalar: 2 })

export function burstHearts() {
  const defaults = {
    spread: 360,
    ticks: 120,
    gravity: 0.5,
    decay: 0.94,
    startVelocity: 28,
    shapes: [heart],
    scalar: 2,
    colors: ['#f06595', '#cc5de8', '#b76e79', '#ff8787'],
  }
  confetti({ ...defaults, particleCount: 40, origin: { x: 0.5, y: 0.4 } })
  setTimeout(() => confetti({ ...defaults, particleCount: 25, origin: { x: 0.2, y: 0.5 } }), 200)
  setTimeout(() => confetti({ ...defaults, particleCount: 25, origin: { x: 0.8, y: 0.5 } }), 400)
}

export function celebrate(duration = 2500) {
  const end = Date.now() + duration
  const colors = ['#f06595', '#cc5de8', '#b76e79', '#ffd9e8', '#ff8787']
  ;(function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 70,
      origin: { x: 0, y: 0.7 },
      colors,
    })
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 70,
      origin: { x: 1, y: 0.7 },
      colors,
    })
    if (Date.now() < end) requestAnimationFrame(frame)
  })()
  burstHearts()
}
