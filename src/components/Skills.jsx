import { useEffect, useRef, useState } from 'react'
import { skillsCloud } from '../data/content.js'
import { useReveal } from '../hooks/useReveal.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'

const CATS = ['All', 'Languages', 'Backend', 'Frontend', 'DevOps', 'Databases', 'Tools']

function fibSphere(n) {
  if (n < 1) return []
  if (n === 1) return [[0, 0, 1]]
  const phi = Math.PI * (3 - Math.sqrt(5))
  return Array.from({ length: n }, (_, i) => {
    const y = 1 - (i / (n - 1)) * 2
    const r = Math.sqrt(Math.max(0, 1 - y * y))
    return [Math.cos(phi * i) * r, y, Math.sin(phi * i) * r]
  })
}

function rotPt(x, y, z, ax, ay) {
  const cy = Math.cos(ay), sy = Math.sin(ay)
  const x1 = x * cy + z * sy
  const z1 = -x * sy + z * cy
  const cx = Math.cos(ax), sx = Math.sin(ax)
  return [x1, y * cx - z1 * sx, y * sx + z1 * cx]
}

/* ── Pre-compute at module load ─────────────────────────────────────────── */
const PTS = fibSphere(skillsCloud.length)

// Global proximity edges (for "All" mode)
const GLOBAL_EDGES = (() => {
  const out = []
  const T = 0.65 * 0.65
  for (let i = 0; i < PTS.length; i++)
    for (let j = i + 1; j < PTS.length; j++) {
      const dx = PTS[i][0] - PTS[j][0]
      const dy = PTS[i][1] - PTS[j][1]
      const dz = PTS[i][2] - PTS[j][2]
      if (dx*dx + dy*dy + dz*dz < T) out.push([i, j])
    }
  return out
})()

// Per-category complete graphs — connect every active node to every other in the category
const CAT_EDGES = (() => {
  const groups = {}
  skillsCloud.forEach((s, i) => {
    if (!groups[s.category]) groups[s.category] = []
    groups[s.category].push(i)
  })
  const out = {}
  Object.entries(groups).forEach(([cat, idxs]) => {
    out[cat] = []
    for (let a = 0; a < idxs.length; a++)
      for (let b = a + 1; b < idxs.length; b++)
        out[cat].push([idxs[a], idxs[b]])
  })
  return out
})()

const MAX_LINES = Math.max(
  GLOBAL_EDGES.length,
  ...Object.values(CAT_EDGES).map(e => e.length)
)

const DAMPING = 0.88  // velocity decay per frame (0 = instant stop, 1 = no decay)
const MIN_VEL = 0.0003

export default function Skills() {
  const { t: translate } = useLanguage()
  const [cat, setCat]     = useState('All')
  const [tooltip, setTip] = useState(null)
  const [radius, setRadius] = useState(145)

  const labelRef  = useReveal()
  const catRef    = useRef('All')
  const iconRefs  = useRef([])
  const lineRefs  = useRef([])
  const wrapRef   = useRef(null)
  const angleRef  = useRef({ ax: 0.25, ay: 0 })
  const velRef    = useRef({ vx: 0, vy: 0 })   // physics velocity
  const pauseRef  = useRef(false)
  const rafRef    = useRef(null)
  const dragRef   = useRef({ active: false })

  useEffect(() => { catRef.current = cat }, [cat])

  /* responsive radius */
  useEffect(() => {
    const upd = () => {
      const wrap = wrapRef.current
      const size = wrap ? wrap.offsetWidth : 320
      setRadius(Math.round(size / 2 * 0.78))
    }
    upd()
    window.addEventListener('resize', upd)
    return () => window.removeEventListener('resize', upd)
  }, [])

  /* animation loop */
  useEffect(() => {
    cancelAnimationFrame(rafRef.current)

    const wrap = wrapRef.current
    const wrapW = wrap ? wrap.offsetWidth  : radius * 2
    const wrapH = wrap ? wrap.offsetHeight : radius * 2
    const cx = wrapW / 2
    const cy = wrapH / 2
    const pos = new Array(skillsCloud.length)

    const tick = () => {
      const isDragging = dragRef.current.active
      const vel = velRef.current

      if (!pauseRef.current && !isDragging) {
        // Apply inertia — decay velocity toward auto-spin speed
        if (Math.abs(vel.vx) > MIN_VEL || Math.abs(vel.vy) > MIN_VEL) {
          vel.vx *= DAMPING
          vel.vy *= DAMPING
          angleRef.current.ay += vel.vy
          angleRef.current.ax += vel.vx
        } else {
          // Velocity spent — resume auto-rotation
          vel.vx = 0
          vel.vy = 0
          angleRef.current.ay += 0.004
        }
      }

      const { ax, ay } = angleRef.current
      const activeCat = catRef.current

      /* icons */
      PTS.forEach(([x, y, z], i) => {
        const [rx, ry, rz] = rotPt(x, y, z, ax, ay)
        pos[i] = [rx, ry, rz]
        const el = iconRefs.current[i]
        if (!el) return
        const depth   = (rz + 2) / 3
        const isLit   = activeCat === 'All' || skillsCloud[i].category === activeCat
        const scale   = (0.42 + depth * 0.58) * (isLit ? 1 : 0.72)
        const opacity = isLit ? 0.12 + depth * 0.88 : 0.03 + depth * 0.06
        el.style.transform = `translate(${rx * radius - 22}px, ${ry * radius - 22}px) scale(${scale})`
        el.style.opacity   = opacity
        el.style.zIndex    = Math.round(rz * 500 + 500)
        el.style.filter    = activeCat !== 'All' && isLit
          ? 'drop-shadow(0 0 8px var(--accent)) brightness(2) saturate(1.2)'
          : 'brightness(1.8) drop-shadow(0 0 2px rgba(255,255,255,0.35))'
      })

      /* edges */
      const edges = activeCat === 'All' ? GLOBAL_EDGES : (CAT_EDGES[activeCat] || [])
      lineRefs.current.forEach((line, idx) => {
        if (!line) return
        const edge = edges[idx]
        if (!edge) { line.style.opacity = 0; return }
        const [i, j] = edge
        if (!pos[i] || !pos[j]) return
        const [rx1, ry1, rz1] = pos[i]
        const [rx2, ry2, rz2] = pos[j]
        const avgDepth = ((rz1 + 2) / 3 + (rz2 + 2) / 3) / 2
        line.setAttribute('x1', cx + rx1 * radius)
        line.setAttribute('y1', cy + ry1 * radius)
        line.setAttribute('x2', cx + rx2 * radius)
        line.setAttribute('y2', cy + ry2 * radius)
        line.style.opacity = activeCat === 'All'
          ? avgDepth * 0.32
          : 0.1 + avgDepth * 0.6
      })

      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [radius])

  /* drag + physics */
  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    const end = () => {
      dragRef.current.active = false
      if (document.pointerLockElement === wrap) document.exitPointerLock()
    }

    const onMouseDown = (e) => {
      e.preventDefault()
      // Zero velocity on new drag so physics don't fight the grab
      velRef.current = { vx: 0, vy: 0 }
      dragRef.current = { active: true, prevDx: 0, prevDy: 0 }
      setTip(null)
      wrap.requestPointerLock()
    }

    const onMouseMove = (e) => {
      if (!dragRef.current.active) return
      const dx = e.movementX ?? 0
      const dy = e.movementY ?? 0
      angleRef.current.ay += dx * 0.009
      angleRef.current.ax += dy * 0.009
      // Track last movement for throw velocity
      dragRef.current.prevDx = dx
      dragRef.current.prevDy = dy
    }

    const onMouseUp = () => {
      if (dragRef.current.active) {
        // Throw — seed velocity from last frame delta
        velRef.current = {
          vx: dragRef.current.prevDy * 0.009 * 0.6,
          vy: dragRef.current.prevDx * 0.009 * 0.6,
        }
      }
      end()
    }

    const onTouchStart = (e) => {
      const t = e.touches[0]
      velRef.current = { vx: 0, vy: 0 }
      dragRef.current = { active: true, lastX: t.clientX, lastY: t.clientY, prevDx: 0, prevDy: 0 }
      setTip(null)
    }
    const onTouchMove = (e) => {
      if (!dragRef.current.active) return
      e.preventDefault()
      const t = e.touches[0]
      const dx = t.clientX - dragRef.current.lastX
      const dy = t.clientY - dragRef.current.lastY
      angleRef.current.ay += dx * 0.009
      angleRef.current.ax += dy * 0.009
      dragRef.current.prevDx = dx
      dragRef.current.prevDy = dy
      dragRef.current.lastX = t.clientX
      dragRef.current.lastY = t.clientY
    }
    const onTouchEnd = () => {
      if (dragRef.current.active) {
        velRef.current = {
          vx: dragRef.current.prevDy * 0.009 * 0.6,
          vy: dragRef.current.prevDx * 0.009 * 0.6,
        }
      }
      dragRef.current.active = false
    }

    wrap.addEventListener('mousedown',  onMouseDown)
    wrap.addEventListener('touchstart', onTouchStart, { passive: false })
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup',   onMouseUp)
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend',  onTouchEnd)

    return () => {
      wrap.removeEventListener('mousedown',  onMouseDown)
      wrap.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup',   onMouseUp)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend',  onTouchEnd)
      if (document.pointerLockElement === wrap) document.exitPointerLock()
    }
  }, [])

  const onIconEnter = (e, name) => {
    if (dragRef.current.active) return
    pauseRef.current = true
    const wRect = wrapRef.current.getBoundingClientRect()
    const iRect = e.currentTarget.getBoundingClientRect()
    setTip({ name, x: iRect.left - wRect.left + iRect.width / 2, y: iRect.top - wRect.top - 10 })
  }
  const onIconLeave = () => { pauseRef.current = false; setTip(null) }

  const onListHover = (i, name) => {
    if (dragRef.current.active) return
    const el = iconRefs.current[i]
    const wrap = wrapRef.current
    if (!el || !wrap) return
    pauseRef.current = true
    const wRect = wrap.getBoundingClientRect()
    const iRect = el.getBoundingClientRect()
    setTip({ name, x: iRect.left - wRect.left + iRect.width / 2, y: iRect.top - wRect.top - 10 })
  }

  return (
    <section className="section" id="skills" aria-label={translate('sections.skills')}>
      <span className="s-label rv" ref={labelRef}>{translate('sections.skills')}</span>

      <div className="skill-filters">
        {CATS.map(c => (
          <button
            key={c}
            className={`skill-filter${cat === c ? ' active' : ''}`}
            onClick={() => { setCat(c); setTip(null) }}
          >
            {translate(`skillsCat.${c}`)}
          </button>
        ))}
      </div>

      <div className="skill-body">
      <div className="skill-cloud-wrap" ref={wrapRef}>
        <svg
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'visible' }}
        >
          {Array.from({ length: MAX_LINES }, (_, idx) => (
            <line
              key={idx}
              ref={el => { lineRefs.current[idx] = el }}
              stroke="var(--accent)"
              strokeWidth="0.7"
              strokeLinecap="round"
            />
          ))}
        </svg>

        {skillsCloud.map((skill, i) => (
          <div
            key={skill.name}
            className="skill-icon"
            ref={el => { iconRefs.current[i] = el }}
            onMouseEnter={e => onIconEnter(e, skill.name)}
            onMouseLeave={onIconLeave}
          >
            <img
              src={`https://cdn.simpleicons.org/${skill.slug}`}
              alt={skill.name}
              width={34} height={34}
              loading="lazy"
              onError={e => {
                const img = e.currentTarget
                img.style.display = 'none'
                const abbr = document.createElement('span')
                abbr.className = 'skill-icon-abbr'
                abbr.textContent = skill.name.slice(0, 2).toUpperCase()
                img.parentNode.appendChild(abbr)
              }}
            />
          </div>
        ))}

        {tooltip && (
          <div className="skill-tip" style={{ left: tooltip.x, top: tooltip.y }}>
            {tooltip.name}
          </div>
        )}
      </div>

      {/* ── Skills list sidebar ── */}
      <div className="skill-list-panel">
        <div className="skill-list-header">
          <span className="skill-list-cat">{cat === 'All' ? translate('sections.allSkills') : translate(`skillsCat.${cat}`)}</span>
          <span className="skill-list-count">
            {cat === 'All' ? skillsCloud.length : skillsCloud.filter(s => s.category === cat).length}
          </span>
        </div>
        <ul className="skill-list">
          {skillsCloud
            .map((skill, i) => ({ skill, i }))
            .filter(({ skill }) => cat === 'All' || skill.category === cat)
            .map(({ skill, i }, idx) => (
            <li
              key={skill.name}
              className="skill-list-item"
              style={{ animationDelay: `${idx * 0.04}s` }}
              onMouseEnter={() => onListHover(i, skill.name)}
              onMouseLeave={onIconLeave}
            >
              <img
                className="skill-list-icon"
                src={`https://cdn.simpleicons.org/${skill.slug}`}
                alt={skill.name}
                width={16} height={16}
                onError={e => { e.currentTarget.style.display = 'none' }}
              />
              <span className="skill-list-name">{skill.name}</span>
              {cat === 'All' && (
                <span className="skill-list-badge">{translate(`skillsCat.${skill.category}`)}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
      </div>
    </section>
  )
}
