import { about, profile } from '../data.js'
import SectionHeader from './SectionHeader.jsx'
import Reveal from './Reveal.jsx'

export default function About() {
  return (
    <section className="section container" id="about">
      <SectionHeader num="01" label="about" kicker={about.kicker} heading={about.heading} />
      <div className="about__grid">
        <Reveal className="about__text">
          {about.paragraphs.map((p, i) => (
            <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
          ))}
        </Reveal>
        <Reveal delay={120} className="about__card-wrap">
          <figure className="about__card">
            <div className="about__avatar mono" aria-hidden="true">
              {'</>'}
            </div>
            <figcaption className="mono">Hello, I'm {profile.firstName}.</figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  )
}
