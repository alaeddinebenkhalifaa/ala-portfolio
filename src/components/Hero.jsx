import { useEffect, useRef, useState } from 'react'

const WORDS = ['ALA', 'EDDINE', 'BEN', 'KHALIFA']
const TAGS  = ['AI Engineer', 'Full-Stack', 'DevOps', 'ESPRIT', 'Available']

export default function Hero() {
  const [up, setUp]   = useState(false)
  const portraitRef   = useRef(null)
  const rafId         = useRef(null)

  // name slide-up on mount
  useEffect(() => {
    const t = setTimeout(() => setUp(true), 120)
    return () => clearTimeout(t)
  }, [])

  // portrait parallax
  useEffect(() => {
    const el = portraitRef.current
    if (!el) return
    const onScroll = () => {
      const y = window.scrollY
      if (rafId.current) cancelAnimationFrame(rafId.current)
      rafId.current = requestAnimationFrame(() => {
        el.style.transform = `translateY(${y * 0.28}px)`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <section className="hero" id="hero" aria-label="Introduction">
      {/* portrait */}
      <div className="hero-right" aria-hidden="true">
        <div className="hero-portrait" ref={portraitRef} />
      </div>

      {/* text */}
      <div className="hero-left">
        <h1 className="hero-name" aria-label="Ala Eddine Ben Khalifa">
          {WORDS.map((w, i) => (
            <span className="name-row" key={w}>
              <span
                className={`name-word${up ? ' up' : ''}`}
                style={{ transitionDelay: `${0.06 + i * 0.12}s` }}
              >
                {w}
              </span>
            </span>
          ))}
        </h1>

        <p className={`hero-role${up ? ' up' : ''}`}>
          IT Engineer &nbsp;·&nbsp; AI · Full-Stack · DevOps
        </p>

        <div className={`hero-tags${up ? ' up' : ''}`}>
          {TAGS.map(t => (
            <span className="gtag" key={t}>{t}</span>
          ))}
        </div>

        <div className={`scroll-hint${up ? ' up' : ''}`}>
          <span className="s-arr" aria-hidden="true" />
          Scroll to explore
        </div>
      </div>
    </section>
  )
}
