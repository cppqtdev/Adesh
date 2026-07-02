import Reveal from './Reveal.jsx'

/** Section heading with word-by-word rise animation when scrolled into view. */
function AnimatedWords({ text }) {
  return text.split(' ').map((word, i) => (
    <span key={i} className="anim-word-wrap">
      <span className="anim-word" style={{ transitionDelay: `${i * 70}ms` }}>
        {word}
      </span>
    </span>
  ))
}

export default function SectionHeader({ num, label, kicker, heading }) {
  const isString = typeof heading === 'string'
  return (
    <Reveal>
      <div className="section-header">
        <div className="section-header__row">
          <span className="section-header__num mono">
            {num} / {label}
          </span>
          <span className="section-header__kicker mono">{kicker}</span>
        </div>
        <h2 className="section-header__title" aria-label={isString ? heading : undefined}>
          {isString ? <AnimatedWords text={heading} /> : heading}
        </h2>
      </div>
    </Reveal>
  )
}
