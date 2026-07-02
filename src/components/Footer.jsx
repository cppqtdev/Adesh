import { profile } from '../data.js'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p className="mono footer__eof">End of file</p>
        <p className="footer__name">
          {profile.firstName.toUpperCase()}
          <span className="accent">.</span>
        </p>
        <div className="footer__grid">
          <div>
            <span className="mono footer__label">Elsewhere</span>
            <p>
              <a href={`mailto:${profile.email}`}>Email</a> ·{' '}
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>{' '}
              ·{' '}
              <a href={profile.links.github} target="_blank" rel="noreferrer">
                GitHub
              </a>{' '}
              ·{' '}
              <a href={profile.links.youtube} target="_blank" rel="noreferrer">
                YouTube
              </a>
            </p>
          </div>
          <div>
            <span className="mono footer__label">Built with</span>
            <p>React · Vite · a lot of care</p>
          </div>
          <div>
            <span className="mono footer__label">© {new Date().getFullYear()}</span>
            <p>
              {profile.name} ·{' '}
              <a href={profile.links.company} target="_blank" rel="noreferrer">
                TechCoderHub
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
