import { useEffect, useRef, useState } from 'react'

/**
 * Multi-scene futuristic background engine — full-bleed canvas.
 * Rotates between four animations with a smooth crossfade:
 *   waves  — 3D dot-terrain (jagmeet.cloud style)
 *   net    — drifting constellation network
 *   rain   — matrix-style code rain
 *   warp   — starfield warp streaks
 * Theme-aware, mouse-reactive, reduced-motion safe.
 */

const SCENE_MS = 14000 // time each scene runs
const FADE_MS = 1800 // crossfade duration
const GLYPHS = '01<>/{}[];=+*#$_QMLC++'

const themeColors = () =>
  document.documentElement.dataset.theme === 'dark'
    ? { dot: [182, 240, 156], glow: [182, 240, 156], star: [232, 238, 228] }
    : { dot: [40, 50, 42], glow: [34, 197, 94], star: [60, 70, 62] }

/* ── Scene: dot-terrain waves ── */
const waves = {
  name: 'waves',
  init() {
    return {}
  },
  draw(ctx, st, { w, h, time, colors, mouse, alpha }) {
    const ROWS = 34
    const COLS = Math.max(90, Math.floor(w / 14))
    const horizon = h * 0.12 // start right below the header
    const spread = h * 0.84 // …and fill the whole hero
    for (let r = 0; r < ROWS; r++) {
      const p = r / (ROWS - 1)
      const persp = 0.25 + p * 0.75
      const rowY = horizon + p * spread
      for (let c = 0; c <= COLS; c++) {
        const nx = (c / COLS) * 2 - 1
        const x = w / 2 + nx * (w * 0.75) * persp
        const wave =
          Math.sin(nx * 4.0 + time * 1.1 + r * 0.35) * 16 +
          Math.cos(nx * 2.3 - time * 0.7 + r * 0.22) * 11 +
          Math.sin(nx * 8.0 + time * 1.7) * 4
        let y = rowY + wave * persp
        const dx = x - mouse.x
        const dy = y - mouse.y
        const distSq = dx * dx + dy * dy
        let boost = 0
        if (distSq < 170 * 170) {
          const dist = Math.sqrt(distSq) || 1
          boost = 1 - dist / 170 // dots light up around the cursor…
          y += (dy / dist) * boost * 22 // …and duck away slightly
        }
        const crest = Math.max(0, wave / 31)
        const a = ((0.12 + p * 0.45) * (0.55 + crest * 0.45) + boost * 0.5) * alpha
        const size = (0.6 + p * 1.7) * (1 + crest * 0.35 + boost * 0.6)
        const col = boost > 0.12 || crest > 0.55 ? colors.glow : colors.dot
        ctx.fillStyle = `rgba(${col[0]},${col[1]},${col[2]},${Math.min(a, 1).toFixed(3)})`
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()
      }
    }
  },
}

/* ── Scene: constellation network ── */
const net = {
  name: 'network',
  init(w, h) {
    const count = Math.min(120, Math.max(50, Math.floor((w * h) / 16000)))
    const pts = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }))
    return { pts }
  },
  draw(ctx, st, { w, h, colors, mouse, alpha, dt }) {
    const LINK = 130
    const { pts } = st
    for (const p of pts) {
      p.x += p.vx * dt * 60
      p.y += p.vy * dt * 60
      if (p.x < 0 || p.x > w) p.vx *= -1
      if (p.y < 0 || p.y > h) p.vy *= -1
    }
    const [dr, dg, db] = colors.dot
    const [gr, gg, gb] = colors.glow
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i]
      for (let j = i + 1; j < pts.length; j++) {
        const b = pts[j]
        const dx = a.x - b.x
        const dy = a.y - b.y
        const d2 = dx * dx + dy * dy
        if (d2 < LINK * LINK) {
          const la = (1 - Math.sqrt(d2) / LINK) * 0.28 * alpha
          ctx.strokeStyle = `rgba(${dr},${dg},${db},${la.toFixed(3)})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      }
      // link to mouse
      const mdx = a.x - mouse.x
      const mdy = a.y - mouse.y
      const md2 = mdx * mdx + mdy * mdy
      if (md2 < 180 * 180) {
        const la = (1 - Math.sqrt(md2) / 180) * 0.5 * alpha
        ctx.strokeStyle = `rgba(${gr},${gg},${gb},${la.toFixed(3)})`
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(mouse.x, mouse.y)
        ctx.stroke()
      }
      ctx.fillStyle = `rgba(${dr},${dg},${db},${(0.55 * alpha).toFixed(3)})`
      ctx.beginPath()
      ctx.arc(a.x, a.y, 1.6, 0, Math.PI * 2)
      ctx.fill()
    }
  },
}

/* ── Scene: matrix code rain ── */
const rain = {
  name: 'code rain',
  init(w) {
    const size = 16
    const cols = Math.ceil(w / size)
    const drops = Array.from({ length: cols }, () => ({
      y: Math.random() * -40,
      speed: 6 + Math.random() * 16,
    }))
    return { size, drops }
  },
  draw(ctx, st, { h, colors, alpha, dt }) {
    const { size, drops } = st
    const [gr, gg, gb] = colors.glow
    const rows = Math.ceil(h / size)
    ctx.font = `${size - 3}px monospace`
    for (let c = 0; c < drops.length; c++) {
      const d = drops[c]
      d.y += d.speed * dt
      if (d.y - 14 > rows) {
        d.y = Math.random() * -20
        d.speed = 6 + Math.random() * 16
      }
      const head = Math.floor(d.y)
      for (let i = 0; i < 14; i++) {
        const row = head - i
        if (row < 0 || row > rows) continue
        const ch = GLYPHS[(c * 7 + row * 13) % GLYPHS.length]
        const fade = i === 0 ? 0.85 : (1 - i / 14) * 0.4
        ctx.fillStyle = `rgba(${gr},${gg},${gb},${(fade * alpha).toFixed(3)})`
        ctx.fillText(ch, c * size, row * size)
      }
    }
  },
}

/* ── Scene: starfield warp ── */
const warp = {
  name: 'warp',
  init() {
    const stars = Array.from({ length: 180 }, () => ({
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1,
      z: 0.08 + Math.random() * 0.92,
    }))
    return { stars }
  },
  draw(ctx, st, { w, h, colors, alpha, dt }) {
    const [sr, sg, sb] = colors.star
    const [gr, gg, gb] = colors.glow
    const cx = w / 2
    const cy = h / 2
    const f = Math.min(w, h) * 0.9
    for (const s of st.stars) {
      const pz = s.z
      s.z -= dt * 0.22
      if (s.z <= 0.05) {
        s.x = Math.random() * 2 - 1
        s.y = Math.random() * 2 - 1
        s.z = 1
        continue
      }
      const x1 = cx + (s.x / pz) * f
      const y1 = cy + (s.y / pz) * f
      const x2 = cx + (s.x / s.z) * f
      const y2 = cy + (s.y / s.z) * f
      const depth = 1 - s.z
      const a = depth * 0.7 * alpha
      const col = depth > 0.75 ? [gr, gg, gb] : [sr, sg, sb]
      ctx.strokeStyle = `rgba(${col[0]},${col[1]},${col[2]},${a.toFixed(3)})`
      ctx.lineWidth = depth * 2.2
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()
    }
  },
}

/* ── Scene: synthwave perspective grid ── */
const grid = {
  name: 'grid',
  init() {
    return {}
  },
  drawLines(ctx, { w, h, time, alpha }, [cr, cg, cb], boost = 1) {
    const horizon = h * 0.06 // starts right at the header
    // horizontal lines rolling toward the viewer
    const N = 30
    for (let i = 0; i < N; i++) {
      const z = (i / N + time * 0.12) % 1
      const y = horizon + Math.pow(z, 2.2) * (h - horizon)
      const a = Math.min(z * 0.45 * boost, 0.9) * alpha
      ctx.strokeStyle = `rgba(${cr},${cg},${cb},${a.toFixed(3)})`
      ctx.lineWidth = 1 + z * 1.2
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(w, y)
      ctx.stroke()
    }
    // converging vertical lines
    const V = 26
    for (let i = 0; i <= V; i++) {
      const nx = (i / V) * 2 - 1
      const a = Math.min(0.2 * boost, 0.7) * alpha * (1 - Math.abs(nx) * 0.4)
      ctx.strokeStyle = `rgba(${cr},${cg},${cb},${a.toFixed(3)})`
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(w / 2 + nx * w * 0.04, horizon)
      ctx.lineTo(w / 2 + nx * w * 1.2, h)
      ctx.stroke()
    }
  },
  draw(ctx, st, args) {
    const { w, h, colors, mouse, alpha } = args
    const horizon = h * 0.06
    const [gr, gg, gb] = colors.glow
    // base grid
    grid.drawLines(ctx, args, colors.dot)
    // glowing horizon
    ctx.strokeStyle = `rgba(${gr},${gg},${gb},${(0.55 * alpha).toFixed(3)})`
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.moveTo(0, horizon)
    ctx.lineTo(w, horizon)
    ctx.stroke()
    // grid lights up around the cursor
    if (mouse.x > -999) {
      ctx.save()
      ctx.beginPath()
      ctx.arc(mouse.x, mouse.y, 150, 0, Math.PI * 2)
      ctx.clip()
      grid.drawLines(ctx, args, colors.glow, 3)
      const spot = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 150)
      spot.addColorStop(0, `rgba(${gr},${gg},${gb},${(0.12 * alpha).toFixed(3)})`)
      spot.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = spot
      ctx.fillRect(mouse.x - 150, mouse.y - 150, 300, 300)
      ctx.restore()
    }
  },
}

/* ── Scene: pulsing hex grid ── */
const hex = {
  name: 'hexgrid',
  init() {
    return {}
  },
  draw(ctx, st, { w, h, time, colors, alpha, mouse }) {
    const s = 34
    const dx = s * 1.732
    const dy = s * 1.5
    const [dr, dg, db] = colors.dot
    const [gr, gg, gb] = colors.glow
    ctx.lineWidth = 1
    for (let row = 0; row * dy < h + s; row++) {
      const y = row * dy
      for (let col = -1; col * dx < w + s; col++) {
        const x = col * dx + (row % 2 ? dx / 2 : 0)
        const d = Math.hypot(x - w / 2, y - h / 2)
        const pulse = 0.5 + 0.5 * Math.sin(time * 1.4 - d * 0.008)
        const md = Math.hypot(x - mouse.x, y - mouse.y)
        const boost = md < 150 ? 1 - md / 150 : 0
        const a = (0.05 + pulse * 0.09 + boost * 0.4) * alpha
        const c = boost > 0.05 ? [gr, gg, gb] : [dr, dg, db]
        ctx.strokeStyle = `rgba(${c[0]},${c[1]},${c[2]},${a.toFixed(3)})`
        ctx.beginPath()
        for (let k = 0; k <= 6; k++) {
          const ang = (Math.PI / 3) * k + Math.PI / 6
          const px = x + Math.cos(ang) * s * 0.92
          const py = y + Math.sin(ang) * s * 0.92
          if (k === 0) ctx.moveTo(px, py)
          else ctx.lineTo(px, py)
        }
        ctx.stroke()
      }
    }
  },
}

/* ── Scene: radar sweep ── */
const radar = {
  name: 'radar',
  init() {
    return {
      blips: Array.from({ length: 14 }, () => ({
        ang: Math.random() * Math.PI * 2,
        r: 0.2 + Math.random() * 0.75,
      })),
    }
  },
  draw(ctx, st, { w, h, time, colors, alpha }) {
    const cx = w / 2
    const cy = h * 0.55
    const R = Math.min(w, h) * 0.42
    const [dr, dg, db] = colors.dot
    const [gr, gg, gb] = colors.glow
    // rings + cross-hairs
    ctx.lineWidth = 1
    ctx.strokeStyle = `rgba(${dr},${dg},${db},${(0.22 * alpha).toFixed(3)})`
    for (let i = 1; i <= 4; i++) {
      ctx.beginPath()
      ctx.arc(cx, cy, (R * i) / 4, 0, Math.PI * 2)
      ctx.stroke()
    }
    ctx.beginPath()
    ctx.moveTo(cx - R, cy)
    ctx.lineTo(cx + R, cy)
    ctx.moveTo(cx, cy - R)
    ctx.lineTo(cx, cy + R)
    ctx.stroke()
    // sweep beam with fading trail
    const sweep = time * 0.9
    for (let i = 0; i < 26; i++) {
      const a = (1 - i / 26) * 0.35 * alpha
      const ang = sweep - i * 0.035
      ctx.strokeStyle = `rgba(${gr},${gg},${gb},${a.toFixed(3)})`
      ctx.lineWidth = i === 0 ? 2 : 1
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.lineTo(cx + Math.cos(ang) * R, cy + Math.sin(ang) * R)
      ctx.stroke()
    }
    // blips light up as the beam passes
    for (const b of st.blips) {
      let diff = (sweep - b.ang) % (Math.PI * 2)
      if (diff < 0) diff += Math.PI * 2
      const glowI = Math.max(0, 1 - diff / 1.4)
      if (glowI <= 0.02) continue
      const bx = cx + Math.cos(b.ang) * R * b.r
      const by = cy + Math.sin(b.ang) * R * b.r
      ctx.fillStyle = `rgba(${gr},${gg},${gb},${(glowI * 0.9 * alpha).toFixed(3)})`
      ctx.beginPath()
      ctx.arc(bx, by, 2.5 + glowI * 2, 0, Math.PI * 2)
      ctx.fill()
    }
  },
}

// hex runs site-wide (SiteBackground); grid floor removed per design
const SCENES = [waves, net, rain, warp, radar]

export default function ParticleField() {
  const canvasRef = useRef(null)
  const engineRef = useRef(null)
  const [label, setLabel] = useState(SCENES[0].name)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let raf = 0
    let w = 0
    let h = 0
    const mouse = { x: -9999, y: -9999 }
    let states = []
    let cur = 0
    let nxt = null
    let sceneStart = performance.now()
    let fadeStart = 0
    let lastT = performance.now()

    const initStates = () => {
      states = SCENES.map((s) => s.init(w, h))
    }

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      initStates()
    }

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    const frameArgs = (now, alpha) => ({
      w,
      h,
      time: now * 0.001,
      dt: Math.min((now - lastT) / 1000, 0.05),
      colors: themeColors(),
      mouse,
      alpha,
    })

    const draw = (now) => {
      ctx.clearRect(0, 0, w, h)

      if (nxt === null && now - sceneStart > SCENE_MS) {
        nxt = (cur + 1) % SCENES.length
        fadeStart = now
      }

      if (nxt !== null) {
        const f = Math.min((now - fadeStart) / FADE_MS, 1)
        SCENES[cur].draw(ctx, states[cur], frameArgs(now, 1 - f))
        SCENES[nxt].draw(ctx, states[nxt], frameArgs(now, f))
        if (f >= 1) {
          cur = nxt
          nxt = null
          sceneStart = now
          setLabel(SCENES[cur].name)
        }
      } else {
        SCENES[cur].draw(ctx, states[cur], frameArgs(now, 1))
      }

      lastT = now
      if (!reduced) raf = requestAnimationFrame(draw)
    }

    engineRef.current = {
      next() {
        if (reduced) {
          cur = (cur + 1) % SCENES.length
          setLabel(SCENES[cur].name)
          ctx.clearRect(0, 0, w, h)
          SCENES[cur].draw(ctx, states[cur], frameArgs(performance.now(), 1))
        } else if (nxt === null) {
          nxt = (cur + 1) % SCENES.length
          fadeStart = performance.now()
          setLabel(SCENES[nxt].name)
        }
      },
    }

    resize()
    window.addEventListener('resize', resize)
    canvas.parentElement.addEventListener('mousemove', onMove)
    canvas.parentElement.addEventListener('mouseleave', onLeave)

    if (reduced) {
      draw(performance.now())
    } else {
      raf = requestAnimationFrame(draw)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      canvas.parentElement?.removeEventListener('mousemove', onMove)
      canvas.parentElement?.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="particle-field" aria-hidden="true" />
      <button
        type="button"
        className="fx-switch mono"
        onClick={() => engineRef.current?.next()}
        title="Switch background animation"
      >
        fx: {label} ↻
      </button>
    </>
  )
}
