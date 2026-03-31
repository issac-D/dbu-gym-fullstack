import { useEffect, useMemo, useState } from 'react'
import About from './components/About'
import Apparatus from './components/Apparatus'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import Pricing from './components/Pricing'

function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark'
  const stored = window.localStorage.getItem('dbu-theme')
  if (stored === 'light' || stored === 'dark') return stored
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches
  return prefersLight ? 'light' : 'dark'
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('dbu-theme', theme)
  }, [theme])

  const toggleLabel = useMemo(
    () => (theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'),
    [theme]
  )

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Header
        theme={theme}
        onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        toggleLabel={toggleLabel}
      />
      <main>
        <Hero />
        <About />
        <Apparatus />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
