import { useEffect, useState } from 'react'

const LINES = [
  '> boot adesh.dev',
  '> loading qml engine .......... ok',
  '> mounting hex grid ........... ok',
  '> welcome.',
]

/** Terminal-style boot screen — shows once per session. */
export default function Boot() {
  const [visible, setVisible] = useState(
    () =>
      !sessionStorage.getItem('booted') &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [shown, setShown] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    if (!visible) return
    document.body.style.overflow = 'hidden'
    const lineTimer = setInterval(() => {
      setShown((n) => {
        if (n >= LINES.length) {
          clearInterval(lineTimer)
          return n
        }
        return n + 1
      })
    }, 320)
    const fadeTimer = setTimeout(() => setFading(true), 320 * LINES.length + 400)
    const doneTimer = setTimeout(() => {
      setVisible(false)
      sessionStorage.setItem('booted', '1')
      document.body.style.overflow = ''
    }, 320 * LINES.length + 950)
    return () => {
      clearInterval(lineTimer)
      clearTimeout(fadeTimer)
      clearTimeout(doneTimer)
      document.body.style.overflow = ''
    }
  }, [visible])

  if (!visible) return null

  return (
    <div className={`boot ${fading ? 'boot--fading' : ''}`} aria-hidden="true">
      <div className="boot__terminal mono">
        {LINES.slice(0, shown).map((l) => (
          <p key={l}>{l}</p>
        ))}
        <span className="hero__caret" />
      </div>
    </div>
  )
}
