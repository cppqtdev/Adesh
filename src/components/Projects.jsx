import { projects } from '../data.js'
import { useTilt } from '../hooks.js'
import SectionHeader from './SectionHeader.jsx'
import Reveal from './Reveal.jsx'

function ProjectCard({ p }) {
  const tiltRef = useTilt(5)
  return (
    <a ref={tiltRef} href={p.url} target="_blank" rel="noreferrer" className="project-card">
      <span className="project-card__num mono">{p.num}</span>
      <div className="project-card__body">
        <h3 className="project-card__title">{p.title}</h3>
        <p className="project-card__desc">{p.description}</p>
        <div className="tags">
          {p.tags.map((t) => (
            <span key={t} className="tag mono">
              {t}
            </span>
          ))}
        </div>
      </div>
      <span className="project-card__arrow mono" aria-hidden="true">
        ↗
      </span>
    </a>
  )
}

export default function Projects() {
  return (
    <section className="section container" id="projects">
      <SectionHeader
        num="03"
        label="projects"
        kicker={projects.kicker}
        heading={projects.heading}
      />
      <div className="projects__list">
        {projects.items.map((p, i) => (
          <Reveal key={p.num} delay={i * 100}>
            <ProjectCard p={p} />
          </Reveal>
        ))}
      </div>
      <Reveal className="projects__more">
        <span className="mono comment">// explore more of my projects</span>
        <a href={projects.allUrl} target="_blank" rel="noreferrer" className="btn btn--ghost">
          See all projects ↗
        </a>
      </Reveal>
    </section>
  )
}
