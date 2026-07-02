import { useEffect, useRef } from 'react'

/**
 * Site-wide fixed background: pulsing honeycomb grid that lights up
 * around the cursor, with a soft cursor spotlight and gentle scroll
 * parallax. Runs behind every section. Theme-aware, reduced-motion safe.
 */
export default function SiteBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let raf = 0
    let w = 0
    let h = 0
    const mouse = { x: -9999, y: -9999 }
    let scrollOffset = 0

    const colors = () =>
      document.documentElement.dataset.theme === 'dark'
        ? { dot: [182, 240, 156], glow: [182, 240, 156], dim: 0.75 }
        : { dot: [40, 50, 42], glow: [34, 197, 94], dim: 1 }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }
    const onScroll = () => {
      scrollOffset = window.scrollY * 0.12
    }

    const draw = (now) => {
      ctx.clearRect(0, 0, w, h)
      const time = reduced ? 0 : now * 0.001
      const { dot, glow, dim } = colors()
      const [dr, dg, db] = dot
      const [gr, gg, gb] = glow

      // soft spotlight following the cursor
      if (mouse.x > -999) {
        const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 260)
        grad.addColorStop(0, `rgba(${gr},${gg},${gb},0.05)`)
        grad.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, w, h)
      }

      // honeycomb
      const s = 36
      const dx = s * 1.732
      const dy = s * 1.5
      const yShift = scrollOffset % dy
      ctx.lineWidth = 1
      for (let row = -1; row * dy - yShift < h + s; row++) {
        const y = row * dy - yShift
        for (let col = -1; col * dx < w + s; col++) {
          const x = col * dx + (row % 2 ? dx / 2 : 0)
          const d = Math.hypot(x - w / 2, y - h / 2)
          const pulse = 0.5 + 0.5 * Math.sin(time * 1.2 - d * 0.007)
          const md = Math.hypot(x - mouse.x, y - mouse.y)
          const boost = md < 170 ? 1 - md / 170 : 0
          const a = (0.03 + pulse * 0.055 + boost * 0.38) * dim
          const c = boost > 0.04 ? glow : dot
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
          // tiny node at hex centre when cursor is near
          if (boost > 0.25) {
            ctx.fillStyle = `rgba(${gr},${gg},${gb},${(boost * 0.5).toFixed(3)})`
            ctx.beginPath()
            ctx.arc(x, y, 1.8, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }

      if (!reduced) raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseout', onLeave)
    window.addEventListener('scroll', onScroll, { passive: true })

    if (reduced) {
      draw(0)
    } else {
      raf = requestAnimationFrame(draw)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseout', onLeave)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return <canvas ref={canvasRef} className="site-bg" aria-hidden="true" />
}
