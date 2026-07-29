import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { playPop, setDrowned } from '../audio/audioEngine.js'


export default function WelcomeCard({ revealed, onDismiss }) {
  const { t } = useLanguage()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // pop + drown once the card is actually revealed (i.e. the loader has cleared)
  useEffect(() => {
    if (!revealed || !visible) return
    playPop()
    setDrowned(true)
    return () => setDrowned(false)
  }, [revealed, visible])

  const close = () => {
    setVisible(false)
    setTimeout(onDismiss, 500)
  }

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  }
  const item = {
    hidden: { opacity: 0, y: 18 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="wc-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="wc-card"
            initial={{ opacity: 0, scale: 0.88, y: 32 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -24 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* accent dot */}
            <motion.div
              className="wc-dot"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15, type: 'spring', bounce: 0.4 }}
            />

            <motion.div
              className="wc-body"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <motion.p className="wc-hello" variants={item}>
                {t('welcome.hello')}
              </motion.p>

              <motion.h1 className="wc-name" variants={item}>
                Ala Eddine<br />Ben Khalifa
              </motion.h1>

              <motion.p className="wc-role" variants={item}>
                {t('welcome.role')}
              </motion.p>

              <motion.div className="wc-divider" variants={item} />

              <motion.p className="wc-tagline" variants={item}>
                {t('welcome.tagline')}
              </motion.p>

              <motion.button
                className="wc-btn"
                variants={item}
                onClick={close}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {t('welcome.cta')}
                <span className="wc-arrow" aria-hidden="true">→</span>
              </motion.button>
            </motion.div>

            {/* corner decoration */}
            <svg className="wc-corner" viewBox="0 0 60 60" fill="none" aria-hidden="true">
              <path d="M60 0 L0 0 L0 60" stroke="var(--accent)" strokeWidth="1.5" strokeOpacity="0.5" fill="none"/>
            </svg>
            <svg className="wc-corner wc-corner--br" viewBox="0 0 60 60" fill="none" aria-hidden="true">
              <path d="M0 60 L60 60 L60 0" stroke="var(--accent)" strokeWidth="1.5" strokeOpacity="0.5" fill="none"/>
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
