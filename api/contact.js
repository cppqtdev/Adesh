import { ownerTemplate, replyTemplate } from './_emails.js'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

/**
 * Vercel serverless function: POST /api/contact
 * Sends two emails via Resend:
 *   1. Notification to you (CONTACT_EMAIL)
 *   2. Auto-reply to the sender (best-effort — requires a verified domain)
 *
 * Required env vars (Vercel dashboard → Settings → Environment Variables):
 *   RESEND_API_KEY  — from https://resend.com/api-keys
 *   CONTACT_EMAIL   — where inquiries land (default: adeshworkmail@gmail.com)
 *   FROM_EMAIL      — verified sender, e.g. "Adesh Singh <contact@techcoderhub.com>"
 */

const RESEND_URL = 'https://api.resend.com/emails'
const DEFAULT_FROM_EMAIL = 'Adesh Singh <contact@techcoderhub.com>'
const LOCAL_ENV_FILES = ['.env.local', '.env']

let localEnv

function parseEnvValue(value = '') {
  const trimmed = value.trim()
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1)
  }
  return trimmed
}

function loadLocalEnv() {
  if (localEnv) return localEnv

  localEnv = {}
  for (const file of LOCAL_ENV_FILES) {
    const path = resolve(process.cwd(), file)
    if (!existsSync(path)) continue

    const lines = readFileSync(path, 'utf8').split(/\r?\n/)
    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue

      const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/)
      if (!match) continue

      const [, key, value] = match
      if (!localEnv[key]) localEnv[key] = parseEnvValue(value)
    }
  }

  return localEnv
}

function env(name) {
  return process.env[name] || loadLocalEnv()[name]
}

async function send(key, payload) {
  const res = await fetch(RESEND_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new Error(`Resend ${res.status}: ${detail}`)
  }
  return res.json()
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name = '', email = '', project = '', message = '', company = '' } = req.body || {}

  // Honeypot — bots fill the hidden "company" field; pretend success.
  if (company) return res.status(200).json({ ok: true })

  if (!name.trim() || !message.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Please fill name, a valid email, and a message.' })
  }
  if (name.length > 100 || email.length > 200 || project.length > 200 || message.length > 5000) {
    return res.status(400).json({ error: 'One of the fields is too long.' })
  }

  const key = env('RESEND_API_KEY')
  if (!key) return res.status(500).json({ error: 'Email service is not configured.' })

  const to = env('CONTACT_EMAIL') || 'adeshworkmail@gmail.com'
  const from = env('FROM_EMAIL') || DEFAULT_FROM_EMAIL
  const data = { name: name.trim(), email: email.trim(), project: project.trim(), message: message.trim() }

  try {
    // 1. Notification to you — must succeed
    await send(key, {
      from,
      to: [to],
      reply_to: data.email,
      subject: `New project inquiry from ${data.name}`,
      html: ownerTemplate(data),
    })

    // 2. Auto-reply to sender — best-effort (needs verified domain on Resend)
    try {
      await send(key, {
        from,
        to: [data.email],
        subject: 'Message received — expect a reply within 24h',
        html: replyTemplate(data),
      })
    } catch {
      /* auto-reply is optional; ignore failures on unverified domains */
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error(err)
    return res.status(502).json({ error: 'Could not send right now — please email me directly.' })
  }
}
