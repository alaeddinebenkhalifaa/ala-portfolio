import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { motion, useReducedMotion } from 'motion/react'

// ─── Corner SVG path (bezier quarter-circle) ────────────────────────────────
const CORNER_PATH = 'M0 200C155.996 199.961 200.029 156.308 200 0V200H0Z'

// ─── Context ────────────────────────────────────────────────────────────────
const CutoutCardContext = createContext(null)

export function useCutoutCard() {
  const ctx = useContext(CutoutCardContext)
  if (!ctx) throw new Error('useCutoutCard must be used within <CutoutCard>')
  return ctx
}

// ─── Stagger variants hook ───────────────────────────────────────────────────
export function useCutoutContentStaggerVariants() {
  const reduceMotion = useReducedMotion()
  return useMemo(() => {
    if (reduceMotion) {
      return {
        container: { hidden: {}, show: { transition: { staggerChildren: 0.03 } } },
        item: { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.2 } } },
      }
    }
    return {
      container: {
        hidden: {},
        show: { transition: { staggerChildren: 0.055, delayChildren: 0.06 } },
      },
      item: {
        hidden: { opacity: 0, y: 12, filter: 'blur(5px)' },
        show: {
          opacity: 1, y: 0, filter: 'blur(0px)',
          transition: { type: 'spring', duration: 0.48, bounce: 0.14 },
        },
      },
    }
  }, [reduceMotion])
}

// ─── Root ────────────────────────────────────────────────────────────────────
export function CutoutCard({
  className = '',
  hovered: hoveredProp,
  defaultHovered = false,
  onHoveredChange,
  trackPointerHover = true,
  onMouseEnter,
  onMouseLeave,
  children,
  style,
  ...props
}) {
  const reduceMotion = useReducedMotion()
  const [internalHovered, setInternalHovered] = useState(defaultHovered)
  const hovered = hoveredProp !== undefined ? hoveredProp : internalHovered

  const setHovered = useCallback((next) => {
    setInternalHovered(next)
    onHoveredChange?.(next)
  }, [onHoveredChange])

  const ctx = useMemo(() => ({ hovered, setHovered }), [hovered, setHovered])

  return (
    <CutoutCardContext.Provider value={ctx}>
      <motion.div
        className={`cc2-card ${className}`}
        data-state={hovered ? 'hovered' : 'idle'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={reduceMotion
          ? { duration: 0.22 }
          : { duration: 0.36, ease: [0.23, 1, 0.32, 1] }
        }
        onMouseEnter={(e) => { onMouseEnter?.(e); if (trackPointerHover) setHovered(true) }}
        onMouseLeave={(e) => { onMouseLeave?.(e); if (trackPointerHover) setHovered(false) }}
        style={style}
        {...props}
      >
        {children}
      </motion.div>
    </CutoutCardContext.Provider>
  )
}

// ─── Media ───────────────────────────────────────────────────────────────────
export function CutoutCardMedia({ className = '', children, ...props }) {
  return (
    <div className={`cc2-media ${className}`} {...props}>
      {children}
    </div>
  )
}

// ─── Image (native <img> instead of next/image) ──────────────────────────────
export function CutoutCardImage({ className = '', src, alt = '', ...props }) {
  return (
    <img
      src={src}
      alt={alt}
      className={`cc2-img ${className}`}
      {...props}
    />
  )
}

// ─── Overlay ─────────────────────────────────────────────────────────────────
export function CutoutCardOverlay({ className = '', ...props }) {
  return <div className={`cc2-overlay ${className}`} {...props} />
}

// ─── Content ─────────────────────────────────────────────────────────────────
export function CutoutCardContent({ className = '', children, ...props }) {
  return (
    <div className={`cc2-content ${className}`} {...props}>
      {children}
    </div>
  )
}

// ─── Footer ──────────────────────────────────────────────────────────────────
export function CutoutCardFooter({ className = '', ...props }) {
  return <div className={`cc2-footer ${className}`} {...props} />
}

// ─── Corner SVG ──────────────────────────────────────────────────────────────
export function CutoutCorner({ className = '', size = 32, ...props }) {
  return (
    <svg
      aria-hidden
      className={`cc2-corner ${className}`}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d={CORNER_PATH} fill="currentColor" />
    </svg>
  )
}

// ─── Inset Label ─────────────────────────────────────────────────────────────
export function CutoutCardInsetLabel({ className = '', ...props }) {
  return <div className={`cc2-inset-label ${className}`} {...props} />
}

// ─── Pin ─────────────────────────────────────────────────────────────────────
export function CutoutCardPin({ className = '', ...props }) {
  return <div className={`cc2-pin ${className}`} {...props} />
}

// ─── Action (hover-reveal) ───────────────────────────────────────────────────
export function CutoutCardAction({ className = '', revealOnHover = true, children, ...props }) {
  const { hovered } = useCutoutCard()
  const reduceMotion = useReducedMotion()
  const visible = !revealOnHover || hovered

  return (
    <motion.div
      className={`cc2-action ${className}`}
      animate={visible
        ? { opacity: 1, y: 0 }
        : { opacity: 0, y: 8 }
      }
      transition={reduceMotion
        ? { duration: 0.15 }
        : { duration: 0.24, ease: [0.23, 1, 0.32, 1] }
      }
      style={{ pointerEvents: revealOnHover && !visible ? 'none' : 'auto' }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
