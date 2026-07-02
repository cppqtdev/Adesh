import { useEffect, useRef, useState } from 'react'

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Types out words one by one — type, hold, delete, next. */
export function useTypeCycle(words, { type = 55, del = 28, hold = 1900 } = {}) {
  const [text, setText] = useState(reduced() ? words[0] : '')

  useEffect(() => {
    if (reduced()) return
    let word = 0
    let i = 0
    let deleting = false
    let t

    const tick = () => {
      const cur = words[word]
      if (!deleting) {
        i += 1
        setText(cur.slice(0, i))
        if (i === cur.length) {
          deleting = true
          t = setTimeout(tick, hold)
          return
        }
        t = setTimeout(tick, type)
      } else {
        i -= 1
        setText(cur.slice(0, i))
        if (i === 0) {
          deleting = false
          word = (word + 1) % words.length
        }
        t = setTimeout(tick, del)
      }
    }

    t = setTimeout(tick, type)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return text
}

/** 3D tilt — the element leans toward the cursor like a floating panel. */
export function useTilt(max = 7) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || reduced()) return

    const move = (e) => {
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      el.style.transform = `perspective(800px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(
        px * max
      ).toFixed(2)}deg) translateY(-4px)`
    }
    const leave = () => {
      el.style.transform = ''
    }

    el.addEventListener('mousemove', move)
    el.addEventListener('mouseleave', leave)
    return () => {
      el.removeEventListener('mousemove', move)
      el.removeEventListener('mouseleave', leave)
    }
  }, [max])

  return ref
}

/** Magnetic pull — the element drifts toward the cursor while hovered. */
export function useMagnetic(strength = 0.3) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || reduced()) return

    const move = (e) => {
      const r = el.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)
      el.style.transform = `translate(${(dx * strength).toFixed(1)}px, ${(dy * strength).toFixed(
        1,
      )}px)`
    }
    const leave = () => {
      el.style.transform = ''
    }

    el.addEventListener('mousemove', move)
    el.addEventListener('mouseleave', leave)
    return () => {
      el.removeEventListener('mousemove', move)
      el.removeEventListener('mouseleave', leave)
    }
  }, [strength])

  return ref
}
