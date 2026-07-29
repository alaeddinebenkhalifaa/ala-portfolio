import { useState } from 'react'
import { work } from '../data/content.js'
import { useReveal } from '../hooks/useReveal.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'

function ProjRow({ item, isWork, viewOnGithub }) {
  const [open, setOpen] = useState(false)
  const ref = useReveal()

  const toggle = () => setOpen(o => !o)

  return (
    <li
      ref={ref}
      className={`proj-item rv${isWork ? ' work-item' : ''}${open ? ' expanded' : ''}`}
    >
      <div className="proj-head">
        <span className="proj-num">{item.num}</span>
        <span className="proj-name">{isWork ? item.company : item.name}</span>
        <div className="proj-meta">
          <span className="proj-role">{isWork ? item.role : item.stack}</span>
          <span className="proj-period">{isWork ? item.period : item.year}</span>
        </div>
      </div>

      <div className="proj-body">
        <div className="proj-body-inner">
          {(item.image) && (
            <img className="proj-thumb" src={item.image} alt="" loading="lazy" />
          )}
          <div className="proj-text">
            {item.desc && <p className="proj-desc">{item.desc}</p>}
            {item.bullets && (
              <ul className="proj-bullets">
                {item.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            )}
            {(item.tags || item.stack) && (
              <div className="proj-tags">
                {(item.tags || item.stack.split(' · ')).map(t => (
                  <span className="ptag" key={t}>{t}</span>
                ))}
              </div>
            )}
            {item.link && (
              <a
                className="proj-link"
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
              >
                {viewOnGithub}
              </a>
            )}
          </div>
        </div>
      </div>
    </li>
  )
}

export default function Projects() {
  const { lang, t } = useLanguage()
  const titleRef = useReveal()
  const localizedWork = work.map(w => ({ ...w, ...w[lang] }))

  return (
    <section className="section" id="experience" aria-label={t('sections.experience')}>
      <span className="s-label" ref={titleRef}>{t('sections.experience')}</span>

      <ul className="proj-list">
        {localizedWork.map(item => (
          <ProjRow key={item.id} item={item} isWork viewOnGithub={t('projects.viewOnGithub')} />
        ))}
      </ul>
    </section>
  )
}
