import { useReveal } from '../hooks/useReveal.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'

const LINKS = [
  { label: 'GitHub',   href: 'https://github.com/AlaBenKhalifa' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ala-eddine-ben-khalifa/' },
]

export default function Contact() {
  const { t } = useLanguage()
  const hRef = useReveal()
  const bRef = useReveal()
  const heading = t('sections.contactHeading')

  return (
    <section className="contact-section" id="contact" aria-label={t('nav.contact')}>
      <span className="s-label">{t('sections.letsConnect')}</span>

      <h2 className="contact-h rv" ref={hRef}>
        {heading.map((line, i) => (
          <span key={i}>{line}{i < heading.length - 1 && <br />}</span>
        ))}
      </h2>

      <div className="rv" ref={bRef} data-d="1">
        <a
          className="contact-email"
          href="mailto:alaeddine.benkhalifa@esprit.tn"
        >
          alaeddine.benkhalifa@esprit.tn
        </a>

        <div className="contact-links">
          {LINKS.map(l => (
            <a
              key={l.label}
              className="c-link"
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
