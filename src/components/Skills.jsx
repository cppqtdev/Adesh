import { useEffect, useState } from 'react'
import { skills } from '../data.js'
import SectionHeader from './SectionHeader.jsx'
import Reveal from './Reveal.jsx'
import SkillsGraph from './SkillsGraph.jsx'

const CAT_COLORS = {
  Languages: '#22c55e',
  'Qt ecosystem': '#a855f7',
  'Embedded & IoT': '#eab308',
  'Build & tooling': '#3b82f6',
  'Data & storage': '#8b5cf6',
  Platforms: '#ef4444',
}

export default function Skills() {
  const [active, setActive] = useState(null)
  const [hover, setHover] = useState(null)
  const [useGraph, setUseGraph] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setUseGraph(fine && !reduced && window.innerWidth > 760)
  }, [])

  const allChips = skills.categories.flatMap((cat) =>
    cat.items.map((item) => ({ item, cat: cat.name })),
  )

  return (
    <section className="section container" id="skills">
      <SectionHeader num="04" label="skills" kicker={skills.kicker} heading={skills.heading} />
      <Reveal>
        {useGraph ? (
          <div className="skills-layout">
            <div className="skills-info">
              <p className="mono skills-info__cat" style={{ color: hover ? CAT_COLORS[hover.cat] : undefined }}>
                {(hover?.cat || active || 'the toolbox').toUpperCase()}
              </p>
              <h3 className="skills-info__name">{hover?.item || '30+ tools'}</h3>
              <p className="mono skills__hint">drag · hover · explore</p>
            </div>
            <div className="skills-graph-wrap">
              <SkillsGraph activeCat={active} catColors={CAT_COLORS} onHover={setHover} />
            </div>
          </div>
        ) : (
          <div className="skills__cloud">
            {allChips.map(({ item, cat }) => (
              <span
                key={item}
                className={`skill-chip mono ${
                  active && active !== cat ? 'skill-chip--dim' : ''
                } ${active === cat ? 'skill-chip--lit' : ''}`}
                onMouseEnter={() => setActive(cat)}
                onMouseLeave={() => setActive(null)}
                title={cat}
              >
                {item}
              </span>
            ))}
          </div>
        )}
      </Reveal>
      <div className="skills__cats">
        {skills.categories.map((cat, i) => (
          <Reveal key={cat.name} delay={i * 60}>
            <button
              className={`skills__cat mono ${active === cat.name ? 'skills__cat--active' : ''}`}
              style={{ '--cat-color': CAT_COLORS[cat.name] }}
              onMouseEnter={() => setActive(cat.name)}
              onMouseLeave={() => setActive(null)}
              type="button"
            >
              {cat.name.toUpperCase()}
            </button>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
