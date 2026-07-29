import { skills } from '../data/content.js'
import { useReveal } from '../hooks/useReveal.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function About() {
  const { lang, t } = useLanguage()
  const hRef = useReveal()
  const localizedSkills = skills.map(s => ({ ...s, ...s[lang] }))
  const heading = t('sections.aboutHeading')
  const body = t('about.body')

  return (
    <section className="section" id="about" aria-label={t('nav.about')}>
      <span className="s-label">{t('sections.about')}</span>

      <div className="about-inner">
        <div className="about-portrait-wrap">
          <img
            className="about-portrait"
            src="/assets/img/me.jpg"
            alt="Ala Eddine Ben Khalifa"
            loading="lazy"
          />
        </div>

        <div className="about-r">
          <h2 className="about-h rv" ref={hRef}>
            {heading.map((line, i) => (
              <span key={i}>{line}{i < heading.length - 1 && <br />}</span>
            ))}
          </h2>

          <div className="about-body">
            {body.map((p, i) => <p key={i}>{p}</p>)}
          </div>

          <div className="skills-grid">
            {localizedSkills.map((s) => (
              <div key={s.id}>
                <p className="skill-label">{s.label}</p>
                <p className="skill-items">{s.items}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
