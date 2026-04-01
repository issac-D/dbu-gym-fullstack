import { useEffect, useRef, useState } from 'react'
import AdminNavbar from '../../components/AdminNavbar'
import Footer from '../../components/Footer'
import { getAdminProfile } from '../../lib/api'

const fallbackProfile = {
  name: 'Admin Dawit',
  adminId: 'ADM-1001',
  role: 'System Admin',
  username: 'admin.dawit',
  email: 'admin@dbugym.com',
  phone: '+251 911 222 333',
}

export default function AdminProfile() {
  const [theme, setTheme] = useState(
    document.documentElement.dataset.theme || 'dark'
  )
  const [previewUrl, setPreviewUrl] = useState('')
  const [adminProfile, setAdminProfile] = useState(fallbackProfile)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)

  useEffect(() => {
    let active = true

    const loadProfile = async () => {
      try {
        const data = await getAdminProfile()
        if (!active) return
        const user = data?.user
        if (user) {
          setAdminProfile((current) => ({
            ...current,
            name: user.name || current.name,
            email: user.email || current.email,
            role: user.role === 'admin' ? 'System Admin' : current.role,
          }))
        }
      } catch (err) {
        if (active) setError(err?.message || 'Unable to load admin profile.')
      } finally {
        if (active) setLoading(false)
      }
    }

    loadProfile()

    return () => {
      active = false
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  const handleToggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.dataset.theme = next
    window.localStorage.setItem('dbu-theme', next)
  }

  const handlePickImage = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (previewUrl) URL.revokeObjectURL(previewUrl)
    const nextUrl = URL.createObjectURL(file)
    setPreviewUrl(nextUrl)
  }

  const handleRemoveImage = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setPreviewUrl('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <AdminNavbar
        adminName={adminProfile.name}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      <main className="mx-auto w-full max-w-6xl px-6 py-10 md:px-8">
        <h1 className="text-2xl font-semibold">Admin Profile & Settings</h1>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          Update your admin details and system access preferences.
        </p>
        {loading ? (
          <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text-muted)]">
            Loading admin profile...
          </div>
        ) : null}
        {error ? (
          <div className="mt-4 rounded-2xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            {error}
          </div>
        ) : null}

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_2fr]">
          <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 text-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-[var(--border)] bg-[var(--surface-strong)] text-2xl text-[var(--accent)]">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Admin preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                adminProfile.name
                  .split(' ')
                  .map((part) => part[0])
                  .join('')
                  .slice(0, 2)
              )}
            </div>
            <h2 className="mt-4 text-lg font-semibold">{adminProfile.name}</h2>
            <p className="text-xs text-[var(--text-soft)]">ID: {adminProfile.adminId}</p>

            <div className="mt-6 space-y-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={handlePickImage}
                className="w-full rounded-full border border-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--text)] transition hover:bg-[var(--accent)] hover:text-black"
              >
                Update Picture
              </button>
              <button
                type="button"
                onClick={handleRemoveImage}
                className="w-full rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--text-soft)] transition hover:border-[var(--accent)]"
              >
                Remove Picture
              </button>
            </div>
          </section>

          <section className="space-y-6">
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <h2 className="text-lg font-semibold">Profile Information</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <label className="text-sm text-[var(--text-muted)]">
                  Full Name
                  <input
                    type="text"
                    defaultValue={adminProfile.name}
                    className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)] focus:border-[var(--accent)] focus:outline-none"
                  />
                </label>
                <label className="text-sm text-[var(--text-muted)]">
                  Username
                  <input
                    type="text"
                    defaultValue={adminProfile.username}
                    className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)] focus:border-[var(--accent)] focus:outline-none"
                  />
                </label>
                <label className="text-sm text-[var(--text-muted)]">
                  Email
                  <input
                    type="email"
                    defaultValue={adminProfile.email}
                    className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)] focus:border-[var(--accent)] focus:outline-none"
                  />
                </label>
                <label className="text-sm text-[var(--text-muted)]">
                  Phone Number
                  <input
                    type="tel"
                    defaultValue={adminProfile.phone}
                    className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)] focus:border-[var(--accent)] focus:outline-none"
                  />
                </label>
                <label className="text-sm text-[var(--text-muted)]">
                  Admin ID (Read Only)
                  <input
                    type="text"
                    readOnly
                    defaultValue={adminProfile.adminId}
                    className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3 text-sm text-[var(--text-soft)]"
                  />
                </label>
                <label className="text-sm text-[var(--text-muted)]">
                  Role (Read Only)
                  <input
                    type="text"
                    readOnly
                    defaultValue={adminProfile.role}
                    className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3 text-sm text-[var(--text-soft)]"
                  />
                </label>
              </div>
              <button className="mt-6 w-full rounded-full bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-black transition hover:bg-[var(--accent-strong)]">
                Save Profile Changes
              </button>
            </div>

            <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <h2 className="text-lg font-semibold">Change Password</h2>
              <div className="mt-4 grid gap-4">
                <label className="text-sm text-[var(--text-muted)]">
                  Old Password
                  <input
                    type="password"
                    className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)] focus:border-[var(--accent)] focus:outline-none"
                  />
                </label>
                <label className="text-sm text-[var(--text-muted)]">
                  New Password
                  <input
                    type="password"
                    className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)] focus:border-[var(--accent)] focus:outline-none"
                  />
                </label>
                <label className="text-sm text-[var(--text-muted)]">
                  Confirm New Password
                  <input
                    type="password"
                    className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)] focus:border-[var(--accent)] focus:outline-none"
                  />
                </label>
              </div>
              <button className="mt-6 w-full rounded-full border border-[var(--accent)] px-4 py-3 text-sm font-semibold text-[var(--text)] transition hover:bg-[var(--accent)] hover:text-black">
                Update Password
              </button>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
