import { useState } from 'react'
import AdminNavbar from '../../components/AdminNavbar'
import Footer from '../../components/Footer'

export default function AdminSettings() {
  const [theme, setTheme] = useState(
    document.documentElement.dataset.theme || 'dark'
  )

  const handleToggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.dataset.theme = next
    window.localStorage.setItem('dbu-theme', next)
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <AdminNavbar
        adminName="Admin Dawit"
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      <main className="mx-auto w-full max-w-6xl px-6 py-10 md:px-8">
        <h1 className="text-2xl font-semibold">System Settings</h1>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          Placeholder page. We’ll connect the full admin settings next.
        </p>

        <div className="mt-6 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <p className="text-sm text-[var(--text-muted)]">
            This page will include system configuration, backups, and audit logs.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
