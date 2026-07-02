import { useEffect, useState } from 'react'
import { profile } from '../data.js'
import { useTilt } from '../hooks.js'
import SectionHeader from './SectionHeader.jsx'
import Reveal from './Reveal.jsx'

const USER = 'cppqtdev'
// YouTube channel UCRnQVTzuAAwPpsRIJ7fHatw → uploads playlist (UU prefix)
const YT_UPLOADS = 'UURnQVTzuAAwPpsRIJ7fHatw'

function RepoCard({ repo }) {
  const tiltRef = useTilt(6)
  return (
    <a ref={tiltRef} href={repo.html_url} target="_blank" rel="noreferrer" className="repo-card">
      <span className="mono repo-card__name">
        {repo.name}
        <span className="repo-card__arrow" aria-hidden="true">
          ↗
        </span>
      </span>
      <p className="repo-card__desc">{repo.description || 'Qt/QML project'}</p>
      <div className="mono repo-card__meta">
        {repo.language && <span className="accent">● {repo.language}</span>}
        <span>★ {repo.stargazers_count}</span>
        <span>⑂ {repo.forks_count}</span>
      </div>
    </a>
  )
}

export default function GitHub() {
  const [repos, setRepos] = useState(null)
  const [stats, setStats] = useState(null)

  useEffect(() => {
    let cancelled = false
    Promise.all([
      fetch(`https://api.github.com/users/${USER}`).then((r) => (r.ok ? r.json() : null)),
      fetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=updated`).then((r) =>
        r.ok ? r.json() : null,
      ),
    ])
      .then(([user, allRepos]) => {
        if (cancelled || !user || !Array.isArray(allRepos)) return
        const own = allRepos.filter((r) => !r.fork)
        const totalStars = own.reduce((s, r) => s + r.stargazers_count, 0)
        setStats({
          followers: user.followers,
          repos: user.public_repos,
          stars: totalStars,
        })
        setRepos(
          own
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 6),
        )
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section className="section container" id="opensource">
      <SectionHeader
        num="05"
        label="open source"
        kicker="github.com/cppqtdev"
        heading="Code in the open."
      />
      {stats && (
        <Reveal>
          <div className="gh-stats mono">
            <span>
              <strong>{stats.repos}</strong> public repos
            </span>
            <span>
              <strong>{stats.stars}</strong> stars earned
            </span>
            <span>
              <strong>{stats.followers}</strong> followers
            </span>
            <span className="gh-stats__live">
              <span className="nav__clock-dot" /> live from GitHub
            </span>
          </div>
        </Reveal>
      )}
      <div className="repo-grid">
        {(repos || Array.from({ length: 6 }, () => null)).map((repo, i) => (
          <Reveal key={repo ? repo.id : i} delay={i * 70}>
            {repo ? (
              <RepoCard repo={repo} />
            ) : (
              <div className="repo-card repo-card--skeleton" aria-hidden="true">
                <span className="mono repo-card__name">loading…</span>
              </div>
            )}
          </Reveal>
        ))}
      </div>
      <Reveal>
        <p className="mono comment yt-label">// latest from @techcoderhub</p>
        <div className="yt-embed">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/videoseries?list=${YT_UPLOADS}`}
            title="TechCoderHub — latest YouTube uploads"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </Reveal>
      <Reveal className="gh-more">
        <span className="mono comment">// tutorials & UI breakdowns on YouTube</span>
        <div className="gh-more__links">
          <a href={profile.links.youtube} target="_blank" rel="noreferrer" className="btn btn--ghost">
            ▶ @techcoderhub on YouTube
          </a>
          <a
            href={`https://github.com/${USER}`}
            target="_blank"
            rel="noreferrer"
            className="btn btn--ghost"
          >
            All repositories ↗
          </a>
        </div>
      </Reveal>
    </section>
  )
}
