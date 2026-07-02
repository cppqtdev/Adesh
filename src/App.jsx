import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SiteBackground from './components/SiteBackground.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Experience from './components/Experience.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'
import GitHub from './components/GitHub.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import ProjectDetail from './components/ProjectDetail.jsx'
import Cursor from './components/Cursor.jsx'
import Boot from './components/Boot.jsx'
import { playClick, playHover } from './sound.js'

function getInitialTheme() {
  const saved = localStorage.getItem('theme')
  if (saved === 'light' || saved === 'dark') return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <GitHub />
      <Contact />
    </main>
  )
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  // UI sounds via event delegation
  useEffect(() => {
    const onClick = (e) => {
      if (e.target.closest?.('a, button')) playClick()
    }
    let lastHover = 0
    const onOver = (e) => {
      const now = Date.now()
      if (now - lastHover < 80) return
      if (e.target.closest?.('a, button, .skill-chip')) {
        lastHover = now
        playHover()
      }
    }
    document.addEventListener('click', onClick)
    document.addEventListener('mouseover', onOver, { passive: true })
    return () => {
      document.removeEventListener('click', onClick)
      document.removeEventListener('mouseover', onOver)
    }
  }, [])

  return (
    <BrowserRouter>
      <div id="top">
        <Boot />
        <Cursor />
        <SiteBackground />
        <Nav theme={theme} onToggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/projects/:slug"
            element={
              <main>
                <ProjectDetail />
              </main>
            }
          />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
