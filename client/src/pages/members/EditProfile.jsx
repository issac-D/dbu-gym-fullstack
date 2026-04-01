import { useEffect, useRef, useState } from 'react'
import Footer from '../../components/Footer'
import MemberNavbar from '../../components/MemberNavbar'
import { useAuth } from '../../auth/AuthProvider'

const member = {
  name: 'Mekdes Alemu',
  memberId: 'DBU-10245',
  membershipType: 'Student',
  universityId: 'DBU-2023-1542',
  department: 'Software Engineering',
  email: 'member@dbugym.com',
  phone: '+251 911 000 000',
}

export default function EditProfile() {
  const { user } = useAuth()
  const displayName = user?.name || member.name
  const [previewUrl, setPreviewUrl] = useState('')
  const fileInputRef = useRef(null)

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  const handlePickImage = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }

    const nextUrl = URL.createObjectURL(file)
    setPreviewUrl(nextUrl)
  }

  const handleRemoveImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    setPreviewUrl('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <MemberNavbar memberName={displayName} />

      <main className="mx-auto w-full max-w-6xl px-6 py-10 md:px-8">
        <h1 className="text-2xl font-semibold">Edit Profile & Settings</h1>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          Keep your account details up to date. (Simulation page)
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_2fr]">
          <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 text-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-[var(--border)] bg-[var(--surface-strong)] text-2xl text-[var(--accent)]">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Profile preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                'ME'
              )}
            </div>
            <h2 className="mt-4 text-lg font-semibold">{displayName}</h2>
            <p className="text-xs text-[var(--text-soft)]">ID: {member.memberId}</p>

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
              <h2 className="text-lg font-semibold">Personal Information</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <label className="text-sm text-[var(--text-muted)]">
                  Full Name
                  <input
                    type="text"
                    defaultValue={displayName}
                    className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)] focus:border-[var(--accent)] focus:outline-none"
                  />
                </label>
                <label className="text-sm text-[var(--text-muted)]">
                  Email
                  <input
                    type="email"
                    defaultValue={user?.email || member.email}
                    className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)] focus:border-[var(--accent)] focus:outline-none"
                  />
                </label>
                <label className="text-sm text-[var(--text-muted)]">
                  Phone Number
                  <input
                    type="tel"
                    defaultValue={member.phone}
                    className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)] focus:border-[var(--accent)] focus:outline-none"
                  />
                </label>
                <label className="text-sm text-[var(--text-muted)]">
                  Gym Member ID (Read Only)
                  <input
                    type="text"
                    readOnly
                    defaultValue={member.memberId}
                    className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3 text-sm text-[var(--text-soft)]"
                  />
                </label>
                <label className="text-sm text-[var(--text-muted)]">
                  Membership Type (Read Only)
                  <input
                    type="text"
                    readOnly
                    defaultValue={member.membershipType}
                    className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3 text-sm text-[var(--text-soft)]"
                  />
                </label>
                <label className="text-sm text-[var(--text-muted)]">
                  University ID (Read Only)
                  <input
                    type="text"
                    readOnly
                    defaultValue={member.universityId}
                    className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3 text-sm text-[var(--text-soft)]"
                  />
                </label>
                <label className="text-sm text-[var(--text-muted)] md:col-span-2">
                  Department
                  <input
                    type="text"
                    defaultValue={member.department}
                    className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)] focus:border-[var(--accent)] focus:outline-none"
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
