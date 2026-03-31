import { useEffect, useMemo, useState } from 'react'
import AdminNavbar from '../../components/AdminNavbar'
import Footer from '../../components/Footer'

const defaultSettings = {
  systemName: 'DBU Gym System',
  language: 'en',
  timezone: 'UTC+3',
  maintenanceMode: false,
  twoFA: true,
  passwordPolicy: {
    minLength: 8,
    expiryDays: 90,
    specialChars: true,
  },
  sessionTimeout: 30,
  maxLoginAttempts: 3,
  emailNotifications: true,
  smsNotifications: false,
  senderEmail: 'support@dbugym.com',
  apiKey: '*************',
  autoBackup: true,
  backupFrequency: 'weekly',
  theme: 'dark',
  accentColor: '#51CCF9',
  layoutStyle: 'comfortable',
}

export default function AdminSettings() {
  const [settings, setSettings] = useState(defaultSettings)
  const [saving, setSaving] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [theme, setTheme] = useState(
    document.documentElement.dataset.theme || 'dark'
  )

  useEffect(() => {
    setSettings((prev) => ({ ...prev, theme }))
  }, [theme])

  const handleToggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.dataset.theme = next
    window.localStorage.setItem('dbu-theme', next)
  }

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const updatePasswordPolicy = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      passwordPolicy: { ...prev.passwordPolicy, [key]: value },
    }))
  }

  const handleSave = () => {
    setSaving(true)
    document.documentElement.dataset.theme = settings.theme
    window.localStorage.setItem('dbu-theme', settings.theme)
    setTheme(settings.theme)

    setTimeout(() => {
      setSaving(false)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 2200)
    }, 900)
  }

  const handleReload = () => {
    setSettings(defaultSettings)
  }

  const handleDownloadBackup = () => {
    const data = {
      users: [],
      admins: [],
      settings,
      logs: [],
      passwordResets: [],
    }
    const dataStr = JSON.stringify(data, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    const date = new Date().toISOString().split('T')[0]
    link.download = `dbu_gym_backup_${date}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const previewTheme = useMemo(() => settings.theme, [settings.theme])

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <AdminNavbar
        adminName="Admin Dawit"
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      <main className="mx-auto w-full max-w-6xl px-6 py-10 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">
              <i className="fas fa-cog mr-2 text-[var(--text-soft)]"></i>
              Configuration
            </h1>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              Review and update operational parameters for the system.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleReload}
              className="rounded-full border border-[var(--border)] px-4 py-2 text-xs font-semibold text-[var(--text)]"
            >
              <i className="fas fa-sync-alt mr-2"></i>Reload
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="rounded-full bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-black"
            >
              {saving ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-3 w-3 animate-spin rounded-full border-2 border-black border-t-transparent"></span>
                  Saving
                </span>
              ) : (
                <span>
                  <i className="fas fa-save mr-2"></i>Save Changes
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)]">
              <div className="border-b border-[var(--border)] px-6 py-4 font-semibold">
                <i className="fas fa-desktop mr-2 text-[var(--text-soft)]"></i>
                General System Settings
              </div>
              <div className="grid gap-4 p-6 md:grid-cols-2">
                <label className="text-sm text-[var(--text-muted)]">
                  System Name
                  <input
                    type="text"
                    value={settings.systemName}
                    onChange={(event) => updateSetting('systemName', event.target.value)}
                    className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm"
                  />
                </label>
                <label className="text-sm text-[var(--text-muted)]">
                  System Logo
                  <input
                    type="file"
                    disabled
                    className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3 text-sm"
                  />
                  <span className="text-xs text-[var(--text-soft)]">
                    Upload disabled in simulated backend
                  </span>
                </label>
                <label className="text-sm text-[var(--text-muted)]">
                  Default Language
                  <select
                    value={settings.language}
                    onChange={(event) => updateSetting('language', event.target.value)}
                    className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm"
                  >
                    <option value="en">English (US)</option>
                    <option value="am">Amharic</option>
                    <option value="es">Spanish</option>
                  </select>
                </label>
                <label className="text-sm text-[var(--text-muted)]">
                  Default Timezone
                  <select
                    value={settings.timezone}
                    onChange={(event) => updateSetting('timezone', event.target.value)}
                    className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm"
                  >
                    <option value="UTC">UTC</option>
                    <option value="UTC+3">EAT (UTC+3)</option>
                    <option value="EST">EST (UTC-5)</option>
                  </select>
                </label>
                <div className="md:col-span-2">
                  <label className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
                    <input
                      type="checkbox"
                      checked={settings.maintenanceMode}
                      onChange={(event) => updateSetting('maintenanceMode', event.target.checked)}
                    />
                    <span className="font-semibold text-[var(--text)]">Maintenance Mode</span>
                  </label>
                  <p className="mt-1 text-xs text-[var(--text-soft)]">
                    System access restricted to administrators.
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)]">
              <div className="border-b border-[var(--border)] px-6 py-4 font-semibold">
                <i className="fas fa-shield-alt mr-2 text-[var(--text-soft)]"></i>
                Security Settings
              </div>
              <div className="p-6">
                <label className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
                  <input
                    type="checkbox"
                    checked={settings.twoFA}
                    onChange={(event) => updateSetting('twoFA', event.target.checked)}
                  />
                  <span className="font-semibold text-[var(--text)]">
                    Enable Two-Factor Authentication (2FA)
                  </span>
                </label>

                <h6 className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--text-soft)]">
                  Password Policy
                </h6>
                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  <label className="text-sm text-[var(--text-muted)]">
                    Min Length
                    <input
                      type="number"
                      min="6"
                      value={settings.passwordPolicy.minLength}
                      onChange={(event) =>
                        updatePasswordPolicy('minLength', Number(event.target.value))
                      }
                      className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm"
                    />
                  </label>
                  <label className="text-sm text-[var(--text-muted)]">
                    Expiry (Days)
                    <input
                      type="number"
                      min="1"
                      value={settings.passwordPolicy.expiryDays}
                      onChange={(event) =>
                        updatePasswordPolicy('expiryDays', Number(event.target.value))
                      }
                      className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm"
                    />
                  </label>
                  <label className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
                    <input
                      type="checkbox"
                      checked={settings.passwordPolicy.specialChars}
                      onChange={(event) =>
                        updatePasswordPolicy('specialChars', event.target.checked)
                      }
                    />
                    Require Symbols
                  </label>
                </div>

                <h6 className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--text-soft)]">
                  Session Management
                </h6>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <label className="text-sm text-[var(--text-muted)]">
                    Timeout (Minutes)
                    <input
                      type="number"
                      min="5"
                      value={settings.sessionTimeout}
                      onChange={(event) => updateSetting('sessionTimeout', Number(event.target.value))}
                      className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm"
                    />
                  </label>
                  <label className="text-sm text-[var(--text-muted)]">
                    Max Attempts
                    <input
                      type="number"
                      min="1"
                      value={settings.maxLoginAttempts}
                      onChange={(event) => updateSetting('maxLoginAttempts', Number(event.target.value))}
                      className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm"
                    />
                  </label>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)]">
              <div className="border-b border-[var(--border)] px-6 py-4 font-semibold">
                <i className="fas fa-bell mr-2 text-[var(--text-soft)]"></i>
                Notification Settings
              </div>
              <div className="p-6">
                <div className="flex gap-6">
                  <label className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
                    <input
                      type="checkbox"
                      checked={settings.emailNotifications}
                      onChange={(event) => updateSetting('emailNotifications', event.target.checked)}
                    />
                    Email
                  </label>
                  <label className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
                    <input
                      type="checkbox"
                      checked={settings.smsNotifications}
                      onChange={(event) => updateSetting('smsNotifications', event.target.checked)}
                    />
                    SMS
                  </label>
                </div>
                <label className="mt-4 block text-sm text-[var(--text-muted)]">
                  Sender Email
                  <input
                    type="email"
                    value={settings.senderEmail}
                    onChange={(event) => updateSetting('senderEmail', event.target.value)}
                    className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm"
                  />
                </label>
                <label className="mt-4 block text-sm text-[var(--text-muted)]">
                  API Key
                  <input
                    type="password"
                    value={settings.apiKey}
                    onChange={(event) => updateSetting('apiKey', event.target.value)}
                    className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm"
                  />
                </label>
              </div>
            </section>

            <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)]">
              <div className="border-b border-[var(--border)] px-6 py-4 font-semibold">
                <i className="fas fa-database mr-2 text-[var(--text-soft)]"></i>
                Backup & Data
              </div>
              <div className="p-6">
                <label className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
                  <input
                    type="checkbox"
                    checked={settings.autoBackup}
                    onChange={(event) => updateSetting('autoBackup', event.target.checked)}
                  />
                  Auto Backup
                </label>
                <label className="mt-4 block text-sm text-[var(--text-muted)]">
                  Frequency
                  <select
                    value={settings.backupFrequency}
                    onChange={(event) => updateSetting('backupFrequency', event.target.value)}
                    className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </label>
                <div className="mt-4 grid gap-3">
                  <button
                    type="button"
                    onClick={handleDownloadBackup}
                    className="rounded-full border border-emerald-400/50 px-4 py-2 text-sm font-semibold text-emerald-200"
                  >
                    <i className="fas fa-download mr-2"></i>Download Latest Backup
                  </button>
                  <button
                    type="button"
                    className="rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--text)]"
                  >
                    <i className="fas fa-redo mr-2"></i>Trigger New Backup
                  </button>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)]">
              <div className="border-b border-[var(--border)] px-6 py-4 font-semibold">
                <i className="fas fa-palette mr-2 text-[var(--text-soft)]"></i>
                UI Preferences
              </div>
              <div className="p-6">
                <p className="text-sm text-[var(--text-muted)]">Theme</p>
                <div className="mt-3 flex gap-3">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="theme"
                      value="light"
                      checked={previewTheme === 'light'}
                      onChange={() => updateSetting('theme', 'light')}
                    />
                    Light
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="theme"
                      value="dark"
                      checked={previewTheme === 'dark'}
                      onChange={() => updateSetting('theme', 'dark')}
                    />
                    Dark
                  </label>
                </div>

                <label className="mt-4 block text-sm text-[var(--text-muted)]">
                  Accent Color
                  <input
                    type="color"
                    value={settings.accentColor}
                    onChange={(event) => updateSetting('accentColor', event.target.value)}
                    className="mt-2 h-10 w-full rounded-xl border border-[var(--border)] bg-transparent"
                  />
                </label>

                <label className="mt-4 block text-sm text-[var(--text-muted)]">
                  Layout Style
                  <select
                    value={settings.layoutStyle}
                    onChange={(event) => updateSetting('layoutStyle', event.target.value)}
                    className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm"
                  >
                    <option value="comfortable">Comfortable</option>
                    <option value="compact">Compact</option>
                  </select>
                </label>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />

      {showToast ? (
        <div className="fixed bottom-6 right-6 rounded-2xl bg-emerald-500/90 px-4 py-3 text-sm font-semibold text-black shadow-xl">
          <i className="fas fa-check-circle mr-2"></i>Settings saved successfully!
        </div>
      ) : null}
    </div>
  )
}
