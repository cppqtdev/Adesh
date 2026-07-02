/**
 * Email templates — clean, centered-card style (Enpass-inspired).
 * Table-based HTML with inline styles for maximum email-client support.
 */

const ACCENT = '#17913f'
const SITE = process.env.SITE_URL || 'https://adeshsingh.vercel.app'

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const shell = (content) => `<!doctype html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#f4f5f2;font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f2;padding:32px 12px;">
<tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;">
<tr><td style="padding:40px 48px 32px;">

<!-- logo -->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr><td align="center" style="padding-bottom:28px;">
  <table role="presentation" cellpadding="0" cellspacing="0"><tr>
    <td style="background:#131513;border-radius:12px;width:52px;height:52px;text-align:center;vertical-align:middle;font-family:'Courier New',monospace;font-size:22px;font-weight:bold;color:${ACCENT};">A.</td>
  </tr></table>
</td></tr>
</table>

${content}

</td></tr>

<!-- footer -->
<tr><td style="padding:0 48px;">
  <hr style="border:none;border-top:1px solid #e5e8e2;margin:0;">
</td></tr>
<tr><td style="padding:24px 48px 36px;text-align:center;">
  <p style="margin:0 0 6px;font-size:12px;color:#8a938b;">This is an automated email from <a href="${SITE}" style="color:${ACCENT};text-decoration:none;">adeshsingh — portfolio</a>.</p>
  <p style="margin:0 0 12px;font-size:12px;color:#8a938b;">&copy; ${new Date().getFullYear()} Adesh Singh &middot; TechCoderHub. All rights reserved.</p>
  <p style="margin:0;font-size:12px;">
    <a href="https://github.com/cppqtdev" style="color:#8a938b;text-decoration:none;">GitHub</a> &nbsp;&middot;&nbsp;
    <a href="https://in.linkedin.com/in/adesh-singh-9a882316a" style="color:#8a938b;text-decoration:none;">LinkedIn</a> &nbsp;&middot;&nbsp;
    <a href="https://www.youtube.com/@techcoderhub" style="color:#8a938b;text-decoration:none;">YouTube</a> &nbsp;&middot;&nbsp;
    <a href="https://techcoderhub.com" style="color:#8a938b;text-decoration:none;">TechCoderHub</a>
  </p>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`

/** Notification sent to Adesh when someone submits the form. */
export function ownerTemplate({ name, email, project, message }) {
  return shell(`
<h1 style="margin:0 0 6px;font-size:24px;font-weight:700;color:#16181a;text-align:center;">New project inquiry</h1>
<p style="margin:0 0 28px;font-size:14px;color:#667065;text-align:center;">Someone reached out through your portfolio</p>

<p style="margin:0 0 8px;font-size:15px;color:#16181a;">Hello Adesh,</p>
<p style="margin:0 0 20px;font-size:15px;color:#16181a;">You received a new message from <strong>${esc(name)}</strong> (<a href="mailto:${esc(email)}" style="color:${ACCENT};text-decoration:none;">${esc(email)}</a>).</p>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr><td style="background:#dcdcdc;border-radius:6px;padding:16px 20px;text-align:center;font-size:18px;font-weight:700;color:#16181a;">
${esc(project) || 'General inquiry'}
</td></tr>
</table>
<p style="margin:8px 0 24px;font-size:13px;font-style:italic;color:#667065;text-align:center;">Project / role</p>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr><td style="background:#f4f5f2;border-left:3px solid ${ACCENT};border-radius:6px;padding:18px 20px;font-size:15px;line-height:1.6;color:#16181a;white-space:pre-wrap;">${esc(message)}</td></tr>
</table>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr><td align="center" style="padding:28px 0 8px;">
  <a href="mailto:${esc(email)}?subject=${encodeURIComponent('Re: your project inquiry')}" style="background:#131513;color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:13px 32px;border-radius:999px;display:inline-block;">Reply to ${esc(name)}</a>
</td></tr>
</table>
`)
}

/** Auto-reply sent to the person who submitted the form. */
export function replyTemplate({ name, message }) {
  const preview = message.length > 300 ? `${message.slice(0, 300)}…` : message
  return shell(`
<h1 style="margin:0 0 6px;font-size:24px;font-weight:700;color:#16181a;text-align:center;">Message received</h1>
<p style="margin:0 0 28px;font-size:14px;color:#667065;text-align:center;">Expected response time: within 24 hours</p>

<p style="margin:0 0 8px;font-size:15px;color:#16181a;">Hello ${esc(name)},</p>
<p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#16181a;">Thanks for reaching out — your message landed safely in my inbox. I personally read every inquiry and will get back to you within one business day.</p>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr><td style="background:#f4f5f2;border-radius:6px;padding:18px 20px;font-size:14px;line-height:1.6;color:#667065;white-space:pre-wrap;">${esc(preview)}</td></tr>
</table>
<p style="margin:8px 0 24px;font-size:13px;font-style:italic;color:#667065;text-align:center;">A copy of your message</p>

<p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#16181a;">In the meantime, feel free to explore my <a href="https://github.com/cppqtdev" style="color:${ACCENT};text-decoration:none;">open-source Qt/QML work</a> or <a href="https://techcoderhub.com/projects" style="color:${ACCENT};text-decoration:none;">TechCoderHub case studies</a>.</p>

<p style="margin:0;font-size:15px;color:#16181a;">Best regards,<br><strong>Adesh Singh</strong><br><span style="font-size:13px;color:#667065;">Qt QML Engineer &middot; Founder, TechCoderHub</span></p>
`)
}
