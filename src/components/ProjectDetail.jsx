import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { projects } from '../data.js'
import Reveal from './Reveal.jsx'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.items.find((p) => p.slug === slug)

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = project
      ? `${project.title} — Adesh Singh`
      : 'Project not found — Adesh Singh'
    return () => {
      document.title = 'Adesh Singh — Qt QML Engineer'
    }
  }, [project])

  if (!project) {
    return (
      <section className="section container detail">
        <p className="mono comment">// 404 — project not found</p>
        <h1 className="detail__title">Nothing at this address.</h1>
        <Link to="/" className="btn btn--ghost">
          ← Back home
        </Link>
      </section>
    )
  }

  const d = project.details

  return (
    <section className="section container detail">
      <Reveal>
        <Link to="/#projects" className="mono detail__back">
          ← cd ../projects
        </Link>
        <p className="mono detail__num">
          {project.num} / {projects.items.length < 10 ? '0' : ''}
          {projects.items.length}
        </p>
        <h1 className="detail__title">{project.title}</h1>
        <p className="mono detail__role">{d.role}</p>
      </Reveal>

      <Reveal delay={100}>
        <div className="tags detail__tags">
          {d.stack.map((t) => (
            <span key={t} className="tag mono">
              {t}
            </span>
          ))}
        </div>
        <h2 className="detail__h2">Overview</h2>
        <p className="detail__text">{d.overview}</p>
      </Reveal>

      <Reveal delay={150}>
        <h2 className="detail__h2">Key features</h2>
        <ul className="timeline__points detail__points">
          {d.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={200}>
        <div className="detail__actions">
          <a href={project.url} target="_blank" rel="noreferrer" className="btn btn--primary">
            Full case study on TechCoderHub ↗
          </a>
          <a href="/#contact" className="btn btn--ghost">
            Build something similar →
          </a>
        </div>
      </Reveal>
    </section>
  )
}
