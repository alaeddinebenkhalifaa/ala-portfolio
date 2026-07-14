import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { certifications } from '../data/content.js'
import { useReveal } from '../hooks/useReveal.js'
import CertificationModal from './CertificationModal.jsx'

const CATS = ['All', 'IEEE', 'Competition', 'Cloud', 'Programming', 'Technology', 'Language', 'Training', 'Academic', 'Leadership']

const CATEGORY_COLORS = {
  IEEE:        '#3b82f6',
  Competition: '#b8ff3c',
  Cloud:       '#f97316',
  Programming: '#a855f7',
  Technology:  '#06b6d4',
  Language:    '#ec4899',
  Training:    '#eab308',
  Academic:    '#10b981',
  Leadership:  '#f43f5e',
}

function CertCard({ cert, index, onOpen }) {
  const ref = useReveal()
  const color = CATEGORY_COLORS[cert.category] || '#b8ff3c'

  return (
    <motion.div
      ref={ref}
      className="cert-card rv"
      data-d={String((index % 4) + 1)}
      onClick={() => onOpen(cert)}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', duration: 0.35, bounce: 0.2 }}
    >
      {/* Top accent stripe */}
      <div className="cert-stripe" style={{ background: color }} />

      {/* Category pill */}
      <div className="cert-cat-pill" style={{ color, borderColor: color, background: `${color}18` }}>
        {cert.category}
      </div>

      {/* Doc icon */}
      <div className="cert-icon" style={{ color }}>
        {cert.isPdf ? (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
          </svg>
        ) : (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
        )}
      </div>

      <div className="cert-info">
        <h3 className="cert-title">{cert.title}</h3>
        <p className="cert-issuer">{cert.issuer}</p>
      </div>

      {/* Hover reveal arrow */}
      <div className="cert-arrow">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M3 9h12M10 4l5 5-5 5"/>
        </svg>
      </div>

      {/* Corner glow */}
      <div className="cert-glow" style={{ background: `radial-gradient(circle at 100% 0%, ${color}22 0%, transparent 65%)` }} />
    </motion.div>
  )
}

export default function Certifications() {
  const labelRef = useReveal()
  const [active, setActive] = useState(null)
  const [cat, setCat] = useState('All')

  const filtered = cat === 'All' ? certifications : certifications.filter(c => c.category === cat)

  return (
    <section className="section" id="certifications" aria-label="Certifications">
      <span className="s-label rv" ref={labelRef}>Certifications</span>

      {/* Filter bar */}
      <div className="cert-filters">
        {CATS.filter(c => c === 'All' || certifications.some(cert => cert.category === c)).map(c => (
          <button
            key={c}
            className={`cert-filter-btn ${cat === c ? 'active' : ''}`}
            onClick={() => setCat(c)}
            style={cat === c && c !== 'All' ? {
              borderColor: CATEGORY_COLORS[c],
              color: CATEGORY_COLORS[c],
              background: `${CATEGORY_COLORS[c]}18`,
            } : {}}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div className="cert-grid" layout>
        <AnimatePresence mode="popLayout">
          {filtered.map((cert, i) => (
            <motion.div
              key={cert.id}
              layout
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.88 }}
              transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1], delay: i * 0.03 }}
            >
              <CertCard cert={cert} index={i} onOpen={setActive} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <CertificationModal cert={active} onClose={() => setActive(null)} />
    </section>
  )
}
