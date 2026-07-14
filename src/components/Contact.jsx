import { useReveal } from '../hooks/useReveal.js'

const LINKS = [
  { label: 'GitHub',   href: 'https://github.com/AlaBenKhalifa' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ala-eddine-ben-khalifa/' },
]

export default function Contact() {
  const hRef = useReveal()
  const bRef = useReveal()

  return (
    <section className="contact-section" id="contact" aria-label="Contact">
      <span className="s-label">Let's connect</span>

      <h2 className="contact-h rv" ref={hRef}>
        Let's build<br />something<br />remarkable.
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
