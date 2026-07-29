import { motion } from 'motion/react'
import { useMemo, useState } from 'react'
import { events } from '../data/content.js'
import { useReveal } from '../hooks/useReveal.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import {
  CutoutCard,
  CutoutCardMedia,
  CutoutCardImage,
  CutoutCardOverlay,
  CutoutCardInsetLabel,
  CutoutCardPin,
  CutoutCorner,
  CutoutCardAction,
  useCutoutContentStaggerVariants,
} from './ui/CutoutCard.jsx'
import ExperienceModal from './ExperienceModal.jsx'

const CATS = ['All', 'Competition', 'Conference', 'Hackathon', 'Organisation', 'Bootcamp', 'Leadership', 'Media', 'Academic']
const SORTS = ['featured', 'az', 'newest']

function ExperienceCard({ ev, index, onOpen, categoryLabel }) {
  const ref = useReveal()
  const stagger = useCutoutContentStaggerVariants()
  const isWide = index === 0

  return (
    <div ref={ref} className={`rv cc2-wrapper ${isWide ? 'cc2-wrapper--wide' : ''}`} data-d={String((index % 3) + 1)}>
      <CutoutCard className={`cc2-surface ${isWide ? 'cc2-surface--wide' : ''}`} onClick={() => onOpen(ev)}>

        {/* ── Media ── */}
        <CutoutCardMedia className={isWide ? 'cc2-media--wide' : 'cc2-media--std'}>
          {ev.image
            ? <CutoutCardImage src={ev.image} alt={ev.title} />
            : <div className="cc2-placeholder" />
          }
          <CutoutCardOverlay />

          {/* Inset label — bottom-left chip */}
          <CutoutCardInsetLabel className="cc2-label">
            <span className="cc2-label-year">{ev.year}</span>
            <span className="cc2-label-cat">{categoryLabel}</span>
          </CutoutCardInsetLabel>

          {/* Pin — top-right dot */}
          <CutoutCardPin className="cc2-pin-wrap">
            <span className="cc2-pin-dot" />
          </CutoutCardPin>
        </CutoutCardMedia>

        {/* ── Staggered content ── */}
        <motion.div
          className="cc2-content-inner"
          variants={stagger.container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h3 className="cc2-title" variants={stagger.item}>{ev.title}</motion.h3>
          <motion.p className="cc2-sub" variants={stagger.item}>{ev.subtitle}</motion.p>
          <motion.p className="cc2-desc" variants={stagger.item}>{ev.desc}</motion.p>
        </motion.div>

        {/* ── Hover action ── */}
        <CutoutCardAction className="cc2-action-wrap">
          <span className="cc2-action-pill">{categoryLabel} ↗</span>
        </CutoutCardAction>

      </CutoutCard>
    </div>
  )
}

export default function Content() {
  const { lang, t } = useLanguage()
  const labelRef = useReveal()
  const [active, setActive] = useState(null)
  const [cat, setCat] = useState('All')
  const [sort, setSort] = useState('featured')

  const localizedEvents = useMemo(() => events.map(ev => ({ ...ev, ...ev[lang] })), [lang])

  const availableCats = useMemo(
    () => CATS.filter(c => c === 'All' || localizedEvents.some(ev => ev.category === c)),
    [localizedEvents]
  )

  const visibleEvents = useMemo(() => {
    const filtered = cat === 'All' ? localizedEvents : localizedEvents.filter(ev => ev.category === cat)
    const sorted = [...filtered].sort((a, b) => {
      if (sort === 'az') return a.title.localeCompare(b.title)
      if (sort === 'newest') return b.sortDate - a.sortDate
      return a.rank - b.rank
    })
    return sorted
  }, [localizedEvents, cat, sort])

  return (
    <section className="section" id="achievements" style={{ paddingTop: 0 }} aria-label={t('sections.achievements')}>
      <span className="s-label rv" ref={labelRef}>{t('sections.achievements')}</span>

      <div className="ach-controls">
        <div className="ach-filters">
          {availableCats.map(c => (
            <button
              key={c}
              className={`ach-filter-btn${cat === c ? ' active' : ''}`}
              onClick={() => setCat(c)}
            >
              {c === 'All' ? t('skillsCat.All') : t(`eventCat.${c}`)}
            </button>
          ))}
        </div>

        <div className="ach-sort">
          {SORTS.map(s => (
            <button
              key={s}
              className={`ach-sort-btn${sort === s ? ' active' : ''}`}
              onClick={() => setSort(s)}
            >
              {t(`achievementsSort.${s}`)}
            </button>
          ))}
        </div>
      </div>

      <div className="cc2-grid">
        {visibleEvents.map((ev, i) => (
          <ExperienceCard
            key={ev.id}
            ev={ev}
            index={i}
            onOpen={setActive}
            categoryLabel={t(`eventCat.${ev.category}`)}
          />
        ))}
      </div>
      <ExperienceModal ev={active} categoryLabel={active ? t(`eventCat.${active.category}`) : null} onClose={() => setActive(null)} />
    </section>
  )
}
