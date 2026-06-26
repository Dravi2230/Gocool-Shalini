import { useEffect } from 'react'

// Trailing heart cursor effect. Only activates on devices with a fine pointer.
export default function HeartCursor() {
  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine) return

    document.body.classList.add('heart-cursor-active')

    const cursor = document.createElement('div')
    cursor.textContent = '❤️'
    Object.assign(cursor.style, {
      position: 'fixed',
      zIndex: '9999',
      pointerEvents: 'none',
      transform: 'translate(-50%, -50%)',
      fontSize: '22px',
      transition: 'transform 0.08s ease-out',
      willChange: 'left, top',
    })
    document.body.appendChild(cursor)

    let lastTrail = 0
    const onMove = (e) => {
      cursor.style.left = `${e.clientX}px`
      cursor.style.top = `${e.clientY}px`

      const now = Date.now()
      if (now - lastTrail > 70) {
        lastTrail = now
        spawnTrail(e.clientX, e.clientY)
      }
    }

    const spawnTrail = (x, y) => {
      const t = document.createElement('div')
      t.textContent = ['💕', '💖', '✨', '💗'][Math.floor(Math.random() * 4)]
      Object.assign(t.style, {
        position: 'fixed',
        left: `${x}px`,
        top: `${y}px`,
        zIndex: '9998',
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        fontSize: `${10 + Math.random() * 10}px`,
        transition: 'all 0.9s ease-out',
        opacity: '1',
      })
      document.body.appendChild(t)
      requestAnimationFrame(() => {
        t.style.top = `${y + 30 + Math.random() * 20}px`
        t.style.opacity = '0'
        t.style.transform = 'translate(-50%, -50%) scale(0.4)'
      })
      setTimeout(() => t.remove(), 950)
    }

    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.body.classList.remove('heart-cursor-active')
      cursor.remove()
    }
  }, [])

  return null
}
