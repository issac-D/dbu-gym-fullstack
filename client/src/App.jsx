import { useEffect, useMemo, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import Login from './pages/Login'
import MembersDashboard from './pages/members/dashboard'
import EditProfile from './pages/members/EditProfile'
import Register from './pages/Register'

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

  const handleToggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            theme={theme}
            onToggleTheme={handleToggleTheme}
            toggleLabel={toggleLabel}
          />
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot" element={<ForgotPassword />} />
      <Route path="/register" element={<Register />} />
      <Route path="/members/dashboard" element={<MembersDashboard />} />
      <Route path="/members/profile" element={<EditProfile />} />
    </Routes>
  )
}
