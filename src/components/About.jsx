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
            <div className="about__avatar">
              <img src="/avatar.jpg" alt={profile.name} loading="lazy" />
            </div>
            <figcaption className="mono">
              <span className="nav__clock-dot" /> Hello, I'm {profile.firstName}.
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  )
}
