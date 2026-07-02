import { Link } from 'react-router-dom'
import { projects } from '../data.js'
import { useTilt } from '../hooks.js'
import SectionHeader from './SectionHeader.jsx'
import Reveal from './Reveal.jsx'

/* Project-specific line-art illustrations (reference style) */
const ARTS = [
  // 01 — infotainment: instrument cluster with speedo needle
  <svg key="cluster" viewBox="0 0 220 130" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="30" y="20" width="160" height="90" rx="10" strokeDasharray="5 4" opacity="0.6" />
    <path d="M75 88a35 35 0 1 1 70 0" opacity="0.8" />
    <path d="M83 88a27 27 0 1 1 54 0" strokeDasharray="3 5" opacity="0.45" />
    <path d="M110 88 92 64" strokeWidth="2" opacity="0.8" />
    <circle cx="110" cy="88" r="4" fill="currentColor" stroke="none" opacity="0.6" />
    <g opacity="0.5">
      <path d="M44 34h24M44 42h16" strokeLinecap="round" />
      <path d="M152 34h24M160 42h16" strokeLinecap="round" />
      <circle cx="48" cy="94" r="6" />
      <circle cx="172" cy="94" r="6" />
    </g>
  </svg>,
  // 02 — ventilator: monitor with vitals waveform
  <svg key="vitals" viewBox="0 0 220 130" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="34" y="18" width="152" height="94" rx="10" strokeDasharray="5 4" opacity="0.6" />
    <path d="M46 70h28l8-22 10 40 10-52 10 44 8-10h54" strokeWidth="1.8" strokeLinejoin="round" opacity="0.85" />
    <g opacity="0.5">
      <path d="M46 92c10-8 20-8 30 0s20 8 30 0 20-8 30 0 20 8 30 0" strokeDasharray="3 4" />
      <path d="M46 34h20M74 34h8" strokeLinecap="round" />
      <circle cx="170" cy="34" r="5" />
    </g>
  </svg>,
  // 03 — smart home: house with connected device nodes
  <svg key="home" viewBox="0 0 220 130" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M78 62 110 34l32 28" strokeLinejoin="round" opacity="0.85" />
    <path d="M86 58v40h48V58" strokeDasharray="5 4" opacity="0.7" />
    <rect x="102" y="76" width="16" height="22" rx="3" opacity="0.6" />
    <g fill="currentColor" stroke="none" opacity="0.55">
      <circle cx="40" cy="40" r="4.5" />
      <circle cx="180" cy="40" r="4.5" />
      <circle cx="40" cy="96" r="4.5" />
      <circle cx="180" cy="96" r="4.5" />
    </g>
    <g opacity="0.35">
      <path d="M45 43l33 17M175 43l-33 17M45 93l41-9M175 93l-41-9" />
    </g>
    <path d="M104 46a8 8 0 0 1 12 0M100 40a14 14 0 0 1 20 0" strokeLinecap="round" opacity="0.5" />
  </svg>,
  // 04 — console: card grid layout
  <svg key="console" viewBox="0 0 220 130" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="34" y="18" width="152" height="94" rx="10" strokeDasharray="5 4" opacity="0.6" />
    <g opacity="0.7">
      <rect x="46" y="30" width="60" height="40" rx="5" />
      <rect x="114" y="30" width="60" height="18" rx="5" />
      <rect x="114" y="54" width="60" height="16" rx="5" />
      <rect x="46" y="78" width="36" height="22" rx="5" />
      <rect x="90" y="78" width="36" height="22" rx="5" />
      <rect x="134" y="78" width="40" height="22" rx="5" />
    </g>
    <circle cx="76" cy="50" r="7" opacity="0.5" />
  </svg>,
  // 05 — scooty: compact gauge with wheels
  <svg key="scooty" viewBox="0 0 220 130" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M78 74a32 32 0 1 1 64 0" opacity="0.8" />
    <path d="M110 74 96 54" strokeWidth="2" opacity="0.8" />
    <circle cx="110" cy="74" r="3.5" fill="currentColor" stroke="none" opacity="0.6" />
    <g opacity="0.55">
      <circle cx="66" cy="102" r="12" strokeDasharray="4 4" />
      <circle cx="154" cy="102" r="12" strokeDasharray="4 4" />
      <path d="M78 102h64" />
    </g>
    <path d="M96 28h28" strokeLinecap="round" opacity="0.5" strokeDasharray="4 4" />
  </svg>,
  // 06 — tesla: steering wheel
  <svg key="wheel" viewBox="0 0 220 130" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="110" cy="65" r="44" opacity="0.8" />
    <circle cx="110" cy="65" r="12" opacity="0.7" />
    <g opacity="0.6">
      <path d="M68 58c26-10 58-10 84 0M110 77v30" />
    </g>
    <circle cx="110" cy="65" r="52" strokeDasharray="3 6" opacity="0.35" />
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
