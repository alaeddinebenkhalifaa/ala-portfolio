import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'motion/react'

export default function ExperienceModal({ ev, onClose }) {
  const [slide, setSlide] = useState(0)
  const [dir, setDir] = useState(1)
  const images = ev?.images?.length ? ev.images : (ev?.image ? [ev.image] : [])

  useEffect(() => {
    if (!ev) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [ev])

  function go(next) {
    setDir(next > slide ? 1 : -1)
    setSlide(next)
  }
  function prev() { go((slide - 1 + images.length) % images.length) }
  function next() { go((slide + 1) % images.length) }

  const variants = {
    enter:  (d) => ({ x: d > 0 ?  60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (d) => ({ x: d > 0 ? -60 :  60, opacity: 0 }),
  }

  const modal = (
    <AnimatePresence>
      {ev && (
        <>
          {/* Backdrop — onMouseDown so the opening click can never land here */}
          <motion.div
            className="em-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onMouseDown={onClose}
          />

          <motion.div
            className="em-panel"
            onMouseDown={e => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', duration: 0.45, bounce: 0.12 }}
            role="dialog"
            aria-modal="true"
            aria-label={ev.title}
          >
            <button className="em-close" onClick={onClose} aria-label="Close">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>

            {images.length > 0 && (
              <div className="em-gallery">
                <AnimatePresence custom={dir} mode="popLayout">
                  <motion.img
                    key={slide}
                    src={images[slide]}
                    alt={`${ev.title} — ${slide + 1}`}
                    className="em-slide"
                    custom={dir}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                  />
                </AnimatePresence>

                {images.length > 1 && (
                  <>
                    <button className="em-nav em-nav--prev" onClick={prev} aria-label="Previous image">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M13 4l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button className="em-nav em-nav--next" onClick={next} aria-label="Next image">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <div className="em-dots">
                      {images.map((_, i) => (
                        <button
                          key={i}
                          className={`em-dot ${i === slide ? 'em-dot--active' : ''}`}
                          onClick={() => go(i)}
                          aria-label={`Image ${i + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}

                {images.length > 1 && (
                  <span className="em-counter">{slide + 1} / {images.length}</span>
                )}
              </div>
            )}

            <div className="em-body">
              <div className="em-meta">
                <span className="em-cat">{ev.category}</span>
                <span className="em-year">{ev.year}</span>
              </div>
              <h2 className="em-title">{ev.title}</h2>
              <p className="em-subtitle">{ev.subtitle}</p>
              <p className="em-desc">{ev.desc}</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )

  return createPortal(modal, document.body)
}
