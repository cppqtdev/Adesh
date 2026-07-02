import { useState } from 'react'
import { skills } from '../data.js'
import SectionHeader from './SectionHeader.jsx'
import Reveal from './Reveal.jsx'

export default function Skills() {
  const [active, setActive] = useState(null)

  const allChips = skills.categories.flatMap((cat) =>
    cat.items.map((item) => ({ item, cat: cat.name })),
  )

  return (
    <section className="section container" id="skills">
      <SectionHeader num="04" label="skills" kicker={skills.kicker} heading={skills.heading} />
      <Reveal>
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
        <p className="skills__hint mono">hover · explore{active ? ` · ${active}` : ''}</p>
      </Reveal>
      <div className="skills__cats">
        {skills.categories.map((cat, i) => (
          <Reveal key={cat.name} delay={i * 60}>
            <button
              className={`skills__cat mono ${active === cat.name ? 'skills__cat--active' : ''}`}
              onMouseEnter={() => setActive(cat.name)}
              onMouseLeave={() => setActive(null)}
              type="button"
            >
              {cat.name}
            </button>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
