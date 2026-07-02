import { profile } from '../data.js'
import { useMagnetic, useTypeCycle } from '../hooks.js'
import ParticleField from './ParticleField.jsx'

/** Splits text into letters that rise in one by one. */
function AnimatedLetters({ text, baseDelay = 0, step = 42 }) {
  return text.split('').map((ch, i) => (
    <span
      key={i}
      className="anim-ch"
      style={{ animationDelay: `${baseDelay + i * step}ms` }}
      aria-hidden="true"
    >
      {ch === ' ' ? ' ' : ch}
    </span>
  ))
}

export default function Hero() {
  const typed = useTypeCycle(profile.roles)
  const primaryRef = useMagnetic(0.25)
  const ghostRef = useMagnetic(0.2)

  const title = `Hi, I'm ${profile.firstName}`

  return (
    <section className="hero">
      <ParticleField />
      <div className="hero__inner container">
        <p className="hero__whoami mono">
          <span className="accent">$</span> whoami —&nbsp;
          <span className="hero__typed">{typed}</span>
          <span className="hero__caret" aria-hidden="true" />
        </p>
        <h1 className="hero__title" aria-label={title}>
          <AnimatedLetters text={title} baseDelay={150} />
          <span
            className="accent anim-ch"
            style={{ animationDelay: `${150 + title.length * 42}ms` }}
          >
            .
          </span>
        </h1>
        <p className="hero__tagline">{profile.tagline}</p>
        <div className="hero__actions">
          <a ref={primaryRef} href="#contact" className="btn btn--primary">
            Start a project&nbsp;↗
          </a>
          <a ref={ghostRef} href={profile.resumeUrl} target="_blank" rel="noreferrer" className="btn btn--ghost">
            View résumé&nbsp;↗
          </a>
        </div>
      </div>
      <div className="hero__scroll mono" aria-hidden="true">
        scroll
        <span className="hero__scroll-line" />
      </div>
    </section>
  )
}
