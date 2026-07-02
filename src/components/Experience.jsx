import { experience } from '../data.js'
import SectionHeader from './SectionHeader.jsx'
import Reveal from './Reveal.jsx'

export default function Experience() {
  return (
    <section className="section container" id="experience">
      <SectionHeader
        num="02"
        label="experience"
        kicker={experience.kicker}
        heading={experience.heading}
      />
      <ol className="timeline">
        {experience.jobs.map((job, i) => (
          <Reveal as="li" key={job.title} delay={i * 100} className="timeline__item">
            <div className="timeline__marker" aria-hidden="true" />
            <div className="timeline__head">
              <span className="mono timeline__period">{job.period}</span>
              <span className="mono timeline__badge">{job.badge}</span>
            </div>
            <h3 className="timeline__title">{job.title}</h3>
            <p className="mono timeline__meta">{job.meta}</p>
            <p className="timeline__summary">{job.summary}</p>
            <ul className="timeline__points">
              {job.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
            <div className="tags">
              {job.tags.map((t) => (
                <span key={t} className="tag mono">
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}
