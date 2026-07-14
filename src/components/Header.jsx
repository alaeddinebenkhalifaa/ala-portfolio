import { useEffect, useState } from 'react'
import { Music2, Maximize2, Minimize2 } from 'lucide-react'

const NAV = [
  { label: 'Projects',       href: '#projects'       },
  { label: 'Skills',         href: '#skills'         },
  { label: 'About',          href: '#about'          },
  { label: 'Experience',     href: '#experience'     },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact',        href: '#contact'        },
]

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1"  x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22"  y1="4.22"  x2="5.64"  y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1"  y1="12" x2="3"  y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22"  y1="19.78" x2="5.64"  y2="18.36"/>
      <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"/>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}

export default function Header({ theme, onToggleTheme, playerOpen, onTogglePlayer, musicPlaying }) {
  const [glass, setGlass]       = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setGlass(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ESC closes overlay
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  // lock body scroll while overlay is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const [isFs, setIsFs] = useState(false)

  useEffect(() => {
    const onFsChange = () => setIsFs(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', onFsChange)
    return () => document.removeEventListener('fullscreenchange', onFsChange)
  }, [])

  const toggleFs = () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen()
    else document.exitFullscreen()
  }

  const close  = () => setMenuOpen(false)
  const toggle = () => setMenuOpen(o => !o)

  return (
    <>
      <header className={`hdr${glass ? ' glass' : ''}`}>
        <span className="hdr-logo">ABK</span>

        {/* ── Desktop nav ── */}
        <nav className="hdr-nav">
          {NAV.map(n => <a key={n.href} href={n.href}>{n.label}</a>)}
        </nav>

        {/* ── Right action buttons ── */}
        <div className="hdr-actions">
          <button
            className={`hdr-icon-btn hdr-music-btn${playerOpen ? ' active' : ''}${musicPlaying ? ' playing' : ''}`}
            onClick={onTogglePlayer}
            aria-label="Toggle music player"
          >
            {musicPlaying ? (
              <span className="hdr-wave" aria-hidden="true">
                <span /><span /><span /><span />
              </span>
            ) : (
              <Music2 size={16} />
            )}
          </button>

          <button
            className="hdr-icon-btn"
            onClick={toggleFs}
            aria-label={isFs ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {isFs ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>

          <button
            className="theme-btn"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>

        {/* ── Hamburger (mobile only) ── */}
        <button
          className={`mob-btn${menuOpen ? ' open' : ''}`}
          onClick={toggle}
          aria-expanded={menuOpen}
          aria-label="Navigation menu"
        >
          <span /><span /><span />
        </button>
      </header>

      {/* ── Mobile overlay — clip-path circle expand from button ── */}
      <div
        className={`mob-overlay${menuOpen ? ' open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <ul className="mob-nav">
          {NAV.map((item, i) => (
            <li
              key={item.label}
              className={`mob-item${menuOpen ? ' visible' : ''}`}
              style={{ transitionDelay: menuOpen ? `${0.04 + i * 0.08}s` : '0s' }}
            >
              <a href={item.href} onClick={close}>{item.label}</a>
            </li>
          ))}
        </ul>

        <button
          className={`mob-theme-btn${menuOpen ? ' visible' : ''}`}
          style={{ transitionDelay: menuOpen ? '0.46s' : '0s' }}
          onClick={onToggleTheme}
        >
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </>
  )
}
