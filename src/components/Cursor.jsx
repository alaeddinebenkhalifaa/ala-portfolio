import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const pos     = useRef({ x: -100, y: -100 })
  const ring    = useRef({ x: -100, y: -100 })
  const rafId   = useRef(null)

  useEffect(() => {
    // hide on touch
    if (!window.matchMedia('(hover: hover)').matches) return

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }

    const onEnter = () => {
      if (ringRef.current) ringRef.current.classList.add('hov')
    }
    const onLeave = () => {
      if (ringRef.current) ringRef.current.classList.remove('hov')
    }

    document.addEventListener('mousemove', onMove)

    const addHov = () => {
      document.querySelectorAll('a, button, .proj-item, .ev-card').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }
    addHov()

    const tick = () => {
      const lerp = (a, b, t) => a + (b - a) * t
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.14)
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.14)

      if (dotRef.current) {
        dotRef.current.style.left = pos.current.x + 'px'
        dotRef.current.style.top  = pos.current.y + 'px'
      }
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px'
        ringRef.current.style.top  = ring.current.y + 'px'
      }
      rafId.current = requestAnimationFrame(tick)
    }
    rafId.current = requestAnimationFrame(tick)

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <>
      <div className="cursor-dot"  ref={dotRef}  style={{ zIndex: 2147483647 }} />
      <div className="cursor-ring" ref={ringRef} style={{ zIndex: 2147483647 }} />
    </>
  )
}
