import { skills } from '../data/content.js'
import { useReveal } from '../hooks/useReveal.js'

export default function About() {
  const hRef = useReveal()

  return (
    <section className="section" id="about" aria-label="About">
      <span className="s-label">About</span>

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
            Engineer.<br />Builder.<br />Human.
          </h2>

          <div className="about-body">
            <p>
              I'm Ala Eddine Ben Khalifa, an IT Engineering student at ESPRIT School of Engineering (Tunis),
              graduating in 2025. I specialise at the intersection of AI, full-stack development, and DevOps —
              shipping real products that solve real problems.
            </p>
            <p>
              Beyond the code, I co-founded a theatre club, organised large-scale student events, competed
              internationally with Hult Prize (Top 16 of 15,000+ teams, Boston 2023), and was invited as a VIP
              to Harvard's Africa Business Conference. I believe the best engineers are also great communicators
              and collaborators.
            </p>
            <p>
              Currently building IMMObox AI — Tunisia's first intelligent real estate pricing engine — as my
              final-year project with IDA Conseil (Canada). Open to full-time roles across AI, cloud, and
              product engineering.
            </p>
          </div>

          <div className="skills-grid">
            {skills.map((s) => (
              <div key={s.label}>
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
