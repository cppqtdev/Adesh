import { Link } from 'react-router-dom'
import { projects } from '../data.js'
import { useTilt } from '../hooks.js'
import SectionHeader from './SectionHeader.jsx'
import Reveal from './Reveal.jsx'

/* Minimal line-art illustrations, one per card (reference style) */
const ARTS = [
  // hub with dashed boxes
  <svg key="a" viewBox="0 0 220 130" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="110" cy="65" r="9" fill="currentColor" stroke="none" opacity="0.55" />
    <g strokeDasharray="5 4" opacity="0.7">
      <rect x="20" y="14" width="36" height="24" rx="5" />
      <rect x="64" y="14" width="36" height="24" rx="5" />
      <rect x="150" y="26" width="36" height="24" rx="5" />
      <rect x="150" y="58" width="36" height="24" rx="5" />
      <rect x="20" y="92" width="36" height="24" rx="5" />
      <rect x="64" y="92" width="36" height="24" rx="5" />
    </g>
    <g opacity="0.35">
      <path d="M101 58 62 38M110 54V38M119 60l31-16M119 70l31 0M101 72 62 92M110 76v16" />
    </g>
  </svg>,
  // orbit
  <svg key="b" viewBox="0 0 220 130" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="110" cy="65" r="26" opacity="0.7" />
    <circle cx="110" cy="65" r="52" strokeDasharray="4 5" opacity="0.5" />
    <circle cx="110" cy="65" r="7" fill="currentColor" stroke="none" opacity="0.6" />
    <g fill="currentColor" stroke="none" opacity="0.5">
      <circle cx="110" cy="13" r="4.5" />
      <circle cx="110" cy="117" r="4.5" />
      <circle cx="58" cy="65" r="4.5" />
      <circle cx="162" cy="65" r="4.5" />
    </g>
    <g opacity="0.4">
      <path d="M84 65h-14M146 65h-14M110 39V25M110 105V91" />
    </g>
  </svg>,
  // rounded bars
  <svg key="c" viewBox="0 0 220 130" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.8">
    <rect x="58" y="22" width="18" height="86" rx="6" transform="rotate(-4 67 65)" />
    <rect x="88" y="34" width="16" height="62" rx="6" transform="rotate(-2 96 65)" />
    <rect x="116" y="20" width="18" height="90" rx="6" transform="rotate(3 125 65)" />
    <rect x="146" y="38" width="15" height="56" rx="6" transform="rotate(6 153 66)" />
    <path d="M67 44h.1M96 52h.1M125 42h.1" strokeLinecap="round" strokeWidth="3" opacity="0.6" />
  </svg>,
]

function ProjectCard({ p, art }) {
  const tiltRef = useTilt(4)
  return (
    <Link ref={tiltRef} to={`/projects/${p.slug}`} className="project-card">
      <div className="project-card__top">
        <span className="project-card__num mono">{p.num}</span>
        <span className="project-card__go" aria-hidden="true">
          ↗
        </span>
      </div>
      <div className="project-card__art">{art}</div>
      <h3 className="project-card__title">{p.title}</h3>
      <p className="project-card__desc">{p.description}</p>
      <div className="tags">
        {p.tags.map((t) => (
          <span key={t} className="tag mono">
            {t}
          </span>
        ))}
      </div>
    </Link>
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
            <ProjectCard p={p} art={ARTS[i % ARTS.length]} />
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
