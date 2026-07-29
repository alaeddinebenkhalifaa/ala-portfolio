import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext.jsx'

function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = resolve
    img.onerror = resolve
    img.src = src
  })
}

export default function Loader({ onDone }) {
  const { t } = useLanguage()
  const [progress, setProgress] = useState(0)
  const [display, setDisplay] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const rafRef = useRef(null)

  // real asset loading — fonts + hero portrait
  useEffect(() => {
    let cancelled = false
    const started = performance.now()
    const MIN_MS = 1000
    const HARD_TIMEOUT = 6000

    const tasks = [
      () => document.fonts?.ready ?? Promise.resolve(),
      () => loadImage('/assets/img/me.jpg'),
    ]

    let doneCount = 0
    const bump = () => {
      doneCount++
      if (cancelled) return
      setProgress(Math.round((doneCount / tasks.length) * 100))
    }

    const finish = () => {
      if (cancelled) return
      const elapsed = performance.now() - started
      const wait = Math.max(0, MIN_MS - elapsed)
      setTimeout(() => {
        if (cancelled) return
        setProgress(100)
        setLeaving(true)
        setTimeout(() => { if (!cancelled) onDone?.() }, 700)
      }, wait)
    }

    const safety = setTimeout(finish, HARD_TIMEOUT)

    Promise.all(tasks.map(t => t().then(bump).catch(bump))).then(() => {
      clearTimeout(safety)
      finish()
    })

    return () => { cancelled = true; clearTimeout(safety) }
  }, [])

  // smooth tween of the displayed counter toward the real progress value
  useEffect(() => {
    cancelAnimationFrame(rafRef.current)
    const tick = () => {
      setDisplay(d => {
        const next = d + (progress - d) * 0.12
        return Math.abs(progress - next) < 0.3 ? progress : next
      })
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [progress])

  const shown = Math.round(display)
  const stage = progress === 0 ? t('loader.stage0') : progress >= 100 ? t('loader.stage2') : t('loader.stage1')

  return (
    <div className={`ld-screen${leaving ? ' ld-leaving' : ''}`} aria-hidden={leaving}>
      <svg className="ld-corner ld-corner--tl" viewBox="0 0 60 60" fill="none" aria-hidden="true">
        <path d="M60 0 L0 0 L0 60" stroke="var(--accent)" strokeWidth="1.5" strokeOpacity="0.5" fill="none"/>
      </svg>
      <svg className="ld-corner ld-corner--br" viewBox="0 0 60 60" fill="none" aria-hidden="true">
        <path d="M0 60 L60 60 L60 0" stroke="var(--accent)" strokeWidth="1.5" strokeOpacity="0.5" fill="none"/>
      </svg>

      <div className="ld-center">
        <div className="ld-logo">ABK</div>

        <div className="ld-count">
          {String(shown).padStart(2, '0')}<span>%</span>
        </div>

        <div className="ld-bar">
          <div className="ld-bar-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="ld-stage">{stage}</div>
      </div>
    </div>
  )
}
