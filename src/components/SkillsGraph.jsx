import { useEffect, useRef } from 'react'
import { skills } from '../data.js'

/**
 * Force-directed skills network — drag, hover, explore.
 * Category hubs pull their skills together; everything repels softly.
 */
export default function SkillsGraph({ activeCat, onHoverCat }) {
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
    let hubs = []
    let dragging = null
    let hovered = null
    const mouse = { x: -9999, y: -9999 }

    const colors = () =>
      document.documentElement.dataset.theme === 'dark'
        ? { text: '#e8eee4', muted: '#94a08c', accent: '#b6f09c', line: 'rgba(182,240,156,' }
        : { text: '#16181a', muted: '#667065', accent: '#17913f', line: 'rgba(23,145,63,' }

    const build = () => {
      nodes = []
      hubs = []
      const catCount = skills.categories.length
      skills.categories.forEach((cat, ci) => {
        const ang = (ci / catCount) * Math.PI * 2 - Math.PI / 2
        const hub = {
          label: cat.name,
          cat: cat.name,
          hub: true,
          x: w / 2 + Math.cos(ang) * w * 0.28,
          y: h / 2 + Math.sin(ang) * h * 0.3,
          vx: 0,
          vy: 0,
          r: 26,
        }
        hubs.push(hub)
        nodes.push(hub)
        cat.items.forEach((item, ii) => {
          const a2 = ang + (ii / cat.items.length) * Math.PI * 2
          nodes.push({
            label: item,
            cat: cat.name,
            hub: false,
            hubRef: hub,
            x: hub.x + Math.cos(a2) * 70 + (Math.random() - 0.5) * 30,
            y: hub.y + Math.sin(a2) * 70 + (Math.random() - 0.5) * 30,
            vx: 0,
            vy: 0,
            r: 13,
          })
        })
      })
    }

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = rect.width
      h = 560
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

    const pick = (p) =>
      nodes.find((n) => Math.hypot(n.x - p.x, n.y - p.y) < n.r + 14) || null

    const onDown = (e) => {
      const p = pos(e)
      dragging = pick(p)
      if (dragging) e.preventDefault()
    }
    const onMove = (e) => {
      const p = pos(e)
      mouse.x = p.x
      mouse.y = p.y
      if (dragging) {
        dragging.x = p.x
        dragging.y = p.y
        dragging.vx = 0
        dragging.vy = 0
      } else {
        const hit = pick(p)
        if (hit?.cat !== hovered?.cat) onHoverCat?.(hit ? hit.cat : null)
        hovered = hit
        canvas.style.cursor = hit ? 'grab' : ''
      }
    }
    const onUp = () => {
      dragging = null
    }

    const step = () => {
      // pairwise repulsion
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          let dx = a.x - b.x
          let dy = a.y - b.y
          let d2 = dx * dx + dy * dy
          if (d2 < 1) d2 = 1
          if (d2 > 200 * 200) continue
          const f = 1600 / d2
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
        // spring to hub / hub to center
        if (!n.hub) {
          const dx = n.hubRef.x - n.x
          const dy = n.hubRef.y - n.y
          n.vx += dx * 0.012
          n.vy += dy * 0.012
        } else {
          n.vx += (w / 2 - n.x) * 0.0015
          n.vy += (h / 2 - n.y) * 0.0015
        }
        n.vx *= 0.86
        n.vy *= 0.86
        if (n !== dragging) {
          n.x += n.vx
          n.y += n.vy
        }
        // keep inside
        n.x = Math.max(n.r + 4, Math.min(w - n.r - 4, n.x))
        n.y = Math.max(n.r + 4, Math.min(h - n.r - 4, n.y))
      }
    }

    const draw = () => {
      step()
      ctx.clearRect(0, 0, w, h)
      const c = colors()
      const active = activeRef.current

      // edges
      for (const n of nodes) {
        if (n.hub) continue
        const dim = active && n.cat !== active
        ctx.strokeStyle = `${c.line}${dim ? 0.06 : 0.22})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(n.x, n.y)
        ctx.lineTo(n.hubRef.x, n.hubRef.y)
        ctx.stroke()
      }

      // nodes
      ctx.textAlign = 'center'
      for (const n of nodes) {
        const isActive = active && n.cat === active
        const dim = active && n.cat !== active
        const alpha = dim ? 0.25 : 1

        ctx.globalAlpha = alpha
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.hub ? 7 : 4, 0, Math.PI * 2)
        ctx.fillStyle = isActive || n.hub ? c.accent : c.muted
        ctx.fill()
        if (isActive) {
          ctx.strokeStyle = `${c.line}0.5)`
          ctx.beginPath()
          ctx.arc(n.x, n.y, n.hub ? 13 : 9, 0, Math.PI * 2)
          ctx.stroke()
        }

        ctx.font = n.hub
          ? '600 12px ui-monospace, monospace'
          : '11px ui-monospace, monospace'
        ctx.fillStyle = n.hub ? c.accent : isActive ? c.text : c.muted
        ctx.fillText(n.label, n.x, n.y - (n.hub ? 14 : 10))
        ctx.globalAlpha = 1
      }

      raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    canvas.addEventListener('mousedown', onDown)
    canvas.addEventListener('mousemove', onMove)
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
      window.removeEventListener('mouseup', onUp)
      canvas.removeEventListener('touchstart', onDown)
      canvas.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onUp)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <canvas ref={canvasRef} className="skills-graph" />
}
