import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { playPop, setDrowned } from '../audio/audioEngine.js'

export default function CertificationModal({ cert, onClose }) {
  const { t } = useLanguage()
  const backdropRef = useRef(null)

  useEffect(() => {
    if (!cert) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [cert, onClose])

  // pop + drown the music while the modal is open
  useEffect(() => {
    if (!cert) return
    playPop()
    setDrowned(true)
    return () => setDrowned(false)
  }, [cert])

  return (
    <AnimatePresence>
      {cert && (
        <>
          {/* Backdrop */}
          <motion.div
            ref={backdropRef}
            className="cm-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => { if (e.target === backdropRef.current) onClose() }}
          />

          {/* Panel */}
          <motion.div
            className="cm-panel"
            initial={{ opacity: 0, scale: 0.88, rotateX: 8 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.92, rotateX: -4 }}
            transition={{ type: 'spring', duration: 0.5, bounce: 0.15 }}
            style={{ transformOrigin: 'center top', perspective: 1000 }}
            role="dialog"
            aria-modal="true"
            aria-label={cert.title}
          >
            {/* Close */}
            <button className="cm-close" onClick={onClose} aria-label={t('certModal.close')}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>

            {/* Header */}
            <div className="cm-header">
              <span className="cm-cat">{t(`certCat.${cert.category}`)}</span>
              <h2 className="cm-title">{cert.title}</h2>
              <p className="cm-issuer">{cert.issuer}</p>
            </div>

            {/* Document viewer */}
            <div className="cm-viewer">
              {cert.isPdf ? (
                <iframe
                  src={`${cert.file}#toolbar=0&navpanes=0&view=FitH`}
                  title={cert.title}
                  className="cm-iframe"
                />
              ) : (
                <img
                  src={cert.file}
                  alt={cert.title}
                  className="cm-img-cert"
                />
              )}
            </div>

            {/* Footer actions */}
            <div className="cm-footer">
              <a
                href={cert.file}
                download
                className="cm-btn cm-btn--primary"
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M7.5 2v8M4 7l3.5 3.5L11 7"/><path d="M2 13h11"/>
                </svg>
                {t('certModal.download')}
              </a>
              <a
                href={cert.file}
                target="_blank"
                rel="noopener noreferrer"
                className="cm-btn cm-btn--ghost"
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 3H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V9"/>
                  <path d="M9 2h4v4"/><path d="M14 2L8 8"/>
                </svg>
                {t('certModal.openFull')}
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
