import { useEffect, useRef } from 'react'
import { skills } from '../data.js'

/**
 * Force-directed skills network, jagmeet.cloud style:
 * one central cluster of gray nodes + faint links, hovered node highlighted,
 * hovered skill reported up for the side info panel. Drag to fling nodes.
 */
export default function SkillsGraph({ activeCat, catColors, onHover }) {
  const canvasRef = useRef(null)
  const activeRef = useRef(activeCat)
  activeRef.current = activeCat

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf = 0
    let w = 0
    let h = 0
    let nodes = []
    let edges = []
    let dragging = null
    let hovered = null

    const theme = () =>
      document.documentElement.dataset.theme === 'dark'
        ? { text: '#e8eee4', muted: 'rgba(148,160,140,', node: 'rgba(148,160,140,' }
        : { text: '#16181a', muted: 'rgba(102,112,101,', node: 'rgba(120,128,120,' }

    const build = () => {
      nodes = []
      edges = []
      const cx = w / 2
      const cy = h / 2
      const R = Math.min(w, h) * 0.3
      const catCount = skills.categories.length
      skills.categories.forEach((cat, ci) => {
        const ang = (ci / catCount) * Math.PI * 2 - Math.PI / 2
        // invisible anchor per category — keeps the blob loosely organised
        const anchor = {
          x: cx + Math.cos(ang) * R * 0.55,
          y: cy + Math.sin(ang) * R * 0.55,
        }
        const start = nodes.length
        cat.items.forEach((item, ii) => {
          const a2 = ang + (ii / cat.items.length) * Math.PI * 2
          nodes.push({
            label: item,
            cat: cat.name,
            anchor,
            x: anchor.x + Math.cos(a2) * 60 + (Math.random() - 0.5) * 40,
            y: anchor.y + Math.sin(a2) * 60 + (Math.random() - 0.5) * 40,
            vx: 0,
            vy: 0,
          })
        })
        // link each node to the next two in its category → web look
        const n = cat.items.length
        for (let i = 0; i < n; i++) {
          edges.push([start + i, start + ((i + 1) % n)])
          if (n > 3) edges.push([start + i, start + ((i + 2) % n)])
        }
      })
    }

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = rect.width
      h = Math.min(560, Math.max(420, rect.width * 0.7))
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      build()
    }

    const pos = (e) => {
      const r = canvas.getBoundingClientRect()
      const t = e.touches ? e.touches[0] : e
      return { x: t.clientX - r.left, y: t.clientY - r.top }
    }

    const pick = (p) => nodes.find((n) => Math.hypot(n.x - p.x, n.y - p.y) < 18) || null

    const onDown = (e) => {
      dragging = pick(pos(e))
      if (dragging) e.preventDefault()
    }
    const onMove = (e) => {
      const p = pos(e)
      if (dragging) {
        dragging.x = p.x
        dragging.y = p.y
        dragging.vx = 0
        dragging.vy = 0
        return
      }
      const hit = pick(p)
      if (hit !== hovered) {
        hovered = hit
        onHover?.(hit ? { item: hit.label, cat: hit.cat } : null)
        canvas.style.cursor = hit ? 'grab' : ''
      }
    }
    const onUp = () => {
      dragging = null
    }
    const onLeave = () => {
      hovered = null
      onHover?.(null)
    }

    const step = () => {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          let dx = a.x - b.x
          let dy = a.y - b.y
          let d2 = dx * dx + dy * dy
          if (d2 < 1) d2 = 1
          if (d2 > 150 * 150) continue
          const f = 1300 / d2
          const d = Math.sqrt(d2)
          dx /= d
          dy /= d
          a.vx += dx * f
          a.vy += dy * f
          b.vx -= dx * f
          b.vy -= dy * f
        }
      }
      for (const n of nodes) {
        n.vx += (n.anchor.x - n.x) * 0.006
        n.vy += (n.anchor.y - n.y) * 0.006
        n.vx += (w / 2 - n.x) * 0.0012
        n.vy += (h / 2 - n.y) * 0.0012
        n.vx *= 0.88
        n.vy *= 0.88
        if (n !== dragging) {
          n.x += n.vx
          n.y += n.vy
        }
        n.x = Math.max(14, Math.min(w - 14, n.x))
        n.y = Math.max(14, Math.min(h - 14, n.y))
      }
    }

    const draw = () => {
      step()
      ctx.clearRect(0, 0, w, h)
      const c = theme()
      const active = activeRef.current

      // links
      ctx.lineWidth = 1
      for (const [i, j] of edges) {
        const a = nodes[i]
        const b = nodes[j]
        const lit = active && a.cat === active
        const dim = active && a.cat !== active
        ctx.strokeStyle = `${c.muted}${lit ? 0.35 : dim ? 0.05 : 0.14})`
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.stroke()
      }

      // nodes + labels
      ctx.textAlign = 'left'
      ctx.font = '11px ui-monospace, SFMono-Regular, Menlo, monospace'
      for (const n of nodes) {
        const isHover = n === hovered
        const lit = active && n.cat === active
        const dim = active && n.cat !== active
        const color = catColors[n.cat]

        ctx.globalAlpha = dim ? 0.22 : 1

        if (isHover) {
          // dark core + ring, like the reference
          ctx.beginPath()
          ctx.arc(n.x, n.y, 5.5, 0, Math.PI * 2)
          ctx.fillStyle = c.text
          ctx.fill()
          ctx.beginPath()
          ctx.arc(n.x, n.y, 10.5, 0, Math.PI * 2)
          ctx.strokeStyle = c.text
          ctx.lineWidth = 1.5
          ctx.stroke()
        } else {
          ctx.beginPath()
          ctx.arc(n.x, n.y, 4.5, 0, Math.PI * 2)
          ctx.fillStyle = lit ? color : `${c.node}0.75)`
          ctx.fill()
        }

        ctx.fillStyle = isHover ? c.text : lit ? color : `${c.muted}0.9)`
        ctx.fillText(n.label, n.x + 10, n.y + 4)
        ctx.globalAlpha = 1
      }

      raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    canvas.addEventListener('mousedown', onDown)
    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseleave', onLeave)
    window.addEventListener('mouseup', onUp)
    canvas.addEventListener('touchstart', onDown, { passive: false })
    canvas.addEventListener('touchmove', onMove, { passive: true })
    window.addEventListener('touchend', onUp)
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousedown', onDown)
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('mouseup', onUp)
      canvas.removeEventListener('touchstart', onDown)
      canvas.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onUp)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <canvas ref={canvasRef} className="skills-graph" />
}
