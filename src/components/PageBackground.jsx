import { useEffect, useRef } from 'react'

const N = 52

function makeBubble(W, H, spread = false) {
  const tier = Math.random()
  return {
    x:       Math.random() * W,
    y:       spread ? Math.random() * H : H + Math.random() * H * 0.4,
    r:       tier < 0.16 ? 30 + Math.random() * 45   // large rings
           : tier < 0.55 ? 5  + Math.random() * 16   // medium circles
           :                1.5 + Math.random() * 3.5, // tiny dots
    speed:   0.12 + Math.random() * 0.52,
    drift:   (Math.random() - 0.5) * 0.38,
    opacity: tier < 0.16 ? 0.04 + Math.random() * 0.07
           : tier < 0.55 ? 0.07 + Math.random() * 0.13
           :                0.22 + Math.random() * 0.38,
    kind:    tier < 0.16 ? 'ring' : tier < 0.55 ? 'circle' : 'dot',
    accent:  Math.random() < 0.26,
    vx: 0, vy: 0,
  }
}

export default function PageBackground({ theme = 'dark', interactive = true }) {
  const cvs   = useRef(null)
  const state = useRef({ theme, mx: -9999, my: -9999, bubbles: [] })

  // keep theme ref current without restarting the loop
  useEffect(() => { state.current.theme = theme }, [theme])

  useEffect(() => {
    const canvas = cvs.current
    const ctx    = canvas.getContext('2d')
    const s      = state.current

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    s.bubbles = Array.from({ length: N }, () =>
      makeBubble(canvas.width, canvas.height, true)
    )

    const onMove = (e) => { s.mx = e.clientX; s.my = e.clientY }
    if (interactive) window.addEventListener('mousemove', onMove)

    const REPEL = 140
    let raf

    const tick = () => {
      const W = canvas.width, H = canvas.height
      ctx.clearRect(0, 0, W, H)

      const dark  = s.theme === 'dark'
      const acc   = dark ? '184,255,60'  : '58,100,0'
      const base  = dark ? '240,238,232' : '8,8,14'

      s.bubbles.forEach(b => {
        // mouse repulsion
        const dx = b.x - s.mx
        const dy = b.y - s.my
        const d  = Math.hypot(dx, dy)
        if (interactive && d < REPEL && d > 0.5) {
          const f = ((REPEL - d) / REPEL) * 2.8
          b.vx += (dx / d) * f * 0.11
          b.vy += (dy / d) * f * 0.11
        }
        b.vx *= 0.90
        b.vy *= 0.90

        b.x += b.drift + b.vx
        b.y -= b.speed - b.vy

        // wrap around edges
        if (b.y < -b.r * 3)    { Object.assign(b, makeBubble(W, H)); b.y = H + b.r }
        if (b.x < -b.r * 3)    b.x = W + b.r
        if (b.x > W + b.r * 3) b.x = -b.r

        const rgb = b.accent ? acc : base

        ctx.beginPath()
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)

        if (b.kind === 'dot') {
          ctx.fillStyle = `rgba(${rgb},${b.opacity})`
          ctx.fill()
        } else if (b.kind === 'ring') {
          ctx.strokeStyle = `rgba(${rgb},${b.opacity})`
          ctx.lineWidth = 1
          ctx.stroke()
        } else {
          ctx.strokeStyle = `rgba(${rgb},${b.opacity})`
          ctx.lineWidth = 0.75
          ctx.stroke()
          ctx.fillStyle = `rgba(${rgb},${b.opacity * 0.15})`
          ctx.fill()
        }
      })

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      if (interactive) window.removeEventListener('mousemove', onMove)
    }
  }, [interactive])

  return (
    <canvas
      ref={cvs}
      style={{
        position: 'fixed', inset: 0,
        zIndex: 0, pointerEvents: 'none', display: 'block',
      }}
    />
  )
}
