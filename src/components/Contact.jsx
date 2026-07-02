import { useState } from 'react'
import { contact, profile } from '../data.js'
import { useTilt, useMagnetic } from '../hooks.js'
import SectionHeader from './SectionHeader.jsx'
import Reveal from './Reveal.jsx'

function ContactCard({ c }) {
  const tiltRef = useTilt(8)
  return (
    <a ref={tiltRef} href={c.href} target="_blank" rel="noreferrer" className="contact-card">
      <span className="mono contact-card__label">{c.label}</span>
      <span className="contact-card__value">{c.value}</span>
      <span className="mono contact-card__mark" aria-hidden="true">
        {c.mark}
      </span>
    </a>
  )
}

const cards = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, mark: '↗' },
  {
    label: 'LinkedIn',
    value: '/in/adesh-singh-9a882316a',
    href: profile.links.linkedin,
    mark: '↗',
  },
  { label: 'GitHub', value: '@cppqtdev', href: profile.links.github, mark: '↗' },
  { label: 'YouTube', value: '@techcoderhub', href: profile.links.youtube, mark: '↗' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', project: '', message: '', company: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState('')
  const sendRef = useMagnetic(0.25)

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const mailtoFallback = () => {
    const subject = encodeURIComponent(`Project inquiry — ${form.project || 'Qt/QML'}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nProject: ${form.project}\n\n${form.message}`,
    )
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  const submit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    setErrorMsg('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', email: '', project: '', message: '', company: '' })
        return
      }
      const data = await res.json().catch(() => ({}))
      setErrorMsg(data.error || 'Something went wrong.')
      setStatus('error')
    } catch {
      // No API available (e.g. running locally without vercel dev) — open mail app
      mailtoFallback()
      setStatus('idle')
    }
  }

  return (
    <section className="section container" id="contact">
      <SectionHeader
        num="06"
        label="contact"
        kicker={contact.kicker}
        heading={
          <>
            {contact.headingA} <em className="accent">{contact.headingEm}</em> {contact.headingB}
          </>
        }
      />
      <Reveal>
        <p className="contact__blurb">{contact.blurb}</p>
      </Reveal>
      <div className="contact__cards">
        {cards.map((c, i) => (
          <Reveal key={c.label} delay={i * 80}>
            <ContactCard c={c} />
          </Reveal>
        ))}
      </div>
      <Reveal delay={150}>
        <form className="contact__form" onSubmit={submit}>
          <div className="contact__form-row">
            <label className="field">
              <span className="mono">Name</span>
              <input value={form.name} onChange={set('name')} required placeholder="Ada Lovelace" />
            </label>
            <label className="field">
              <span className="mono">Email</span>
              <input
                type="email"
                value={form.email}
                onChange={set('email')}
                required
                placeholder="you@company.com"
              />
            </label>
          </div>
          <label className="field">
            <span className="mono">Project / role</span>
            <input
              value={form.project}
              onChange={set('project')}
              placeholder="Automotive cluster · HMI · Qt for MCU…"
            />
          </label>
          <label className="field">
            <span className="mono">What's on your mind?</span>
            <textarea
              rows={5}
              value={form.message}
              onChange={set('message')}
              required
              placeholder="Tell me about your hardware target, Qt version and scope…"
            />
          </label>
          {/* Honeypot — hidden from humans, bots fill it */}
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={set('company')}
            className="hp-field"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
          {status === 'sent' ? (
            <p className="form-status form-status--ok mono">
              ✓ Sent — check your inbox for a confirmation. I'll reply within 24h.
            </p>
          ) : (
            <button ref={sendRef} type="submit" className="btn btn--primary" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send it'}
            </button>
          )}
          {status === 'error' && (
            <p className="form-status form-status--err mono">
              ✗ {errorMsg}{' '}
              <a href={`mailto:${profile.email}`}>Email me directly ↗</a>
            </p>
          )}
        </form>
      </Reveal>
    </section>
  )
}
