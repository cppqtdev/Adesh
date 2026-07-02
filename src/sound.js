/** Tiny WebAudio UI sounds — no audio files, just oscillators. */

let ctx = null
let enabled = localStorage.getItem('sound') !== 'off'

const getCtx = () => {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return null
    ctx = new AC()
  }
  if (ctx.state === 'suspended') ctx.resume().catch(() => {})
  return ctx
}

function blip(freq, duration, volume, type = 'sine') {
  if (!enabled) return
  const ac = getCtx()
  if (!ac || ac.state !== 'running') return
  const osc = ac.createOscillator()
  const gain = ac.createGain()
  osc.type = type
  osc.frequency.value = freq
  gain.gain.setValueAtTime(volume, ac.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + duration)
  osc.connect(gain).connect(ac.destination)
  osc.start()
  osc.stop(ac.currentTime + duration)
}

export const playClick = () => blip(720, 0.07, 0.05, 'square')
export const playHover = () => blip(1250, 0.035, 0.02, 'sine')

export const isSoundOn = () => enabled
export const setSoundOn = (on) => {
  enabled = on
  localStorage.setItem('sound', on ? 'on' : 'off')
  if (on) {
    getCtx()
    blip(880, 0.08, 0.05, 'sine') // confirmation beep
  }
}
