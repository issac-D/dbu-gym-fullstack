import { Link, useNavigate } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { useAuth } from '../auth/AuthProvider'
import { uploadMemberAvatar } from '../lib/api'

function DumbbellIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 9v6" />
      <path d="M7 7v10" />
      <path d="M10 8h4" />
      <path d="M10 16h4" />
      <path d="M14 8h0" />
      <path d="M14 16h0" />
      <path d="M17 7v10" />
      <path d="M20 9v6" />
      <rect x="9" y="10" width="6" height="4" rx="2" />
    </svg>
  )
}

function MailIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  )
}

function LockIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="11" width="16" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  )
}

function UserIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
    </svg>
  )
}

export default function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [memberType, setMemberType] = useState('university')
  const [avatarFile, setAvatarFile] = useState(null)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    phone: '',
    gender: '',
    membership_type: '',
    university_id: '',
    department: '',
    national_id: '',
    address: '',
  })

  const isUniversity = memberType === 'university'
  const submitLabel = useMemo(() => (submitting ? 'Submitting…' : 'Proceed to Payment'), [submitting])
  const previewMemberId = useMemo(() => {
    const prefix = isUniversity ? 'DBU' : 'EXT'
    const year = new Date().getFullYear()
    const seq = String(Math.floor(Math.random() * 9000) + 1000)
    return `${prefix}-${year}-${seq}`
  }, [isUniversity])

  const estimatedTotal = useMemo(() => {
    const prices = {
      Monthly: 300,
      '3Months': 800,
      '6Months': 1500,
      '1Year': 2500,
    }
    const base = prices[formValues.membership_type] || 0
    return isUniversity ? Math.round(base * 0.8) : base
  }, [formValues.membership_type, isUniversity])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormValues((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    setAvatarFile(file || null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const payload = {
      ...formValues,
      member_type: memberType,
      terms_accepted: termsAccepted,
    }

    if (!payload.name || !payload.email || !payload.password || !payload.password_confirmation) {
      setError('Please complete all required fields.')
      return
    }

    if (!payload.phone || !payload.gender || !payload.membership_type) {
      setError('Please complete all required fields.')
      return
    }

    if (isUniversity && (!payload.university_id || !payload.department)) {
      setError('Please enter your university ID and department.')
      return
    }

    if (!isUniversity && (!payload.national_id || !payload.address)) {
      setError('Please enter your national ID and address.')
      return
    }

    if (payload.password !== payload.password_confirmation) {
      setError('Passwords do not match.')
      return
    }

    if (!payload.terms_accepted) {
      setError('Please accept the terms and conditions.')
      return
    }

    setError('')
    setSubmitting(true)

    try {
      await register({
        ...payload,
        membership_plan: payload.membership_type,
      })
      if (avatarFile) {
        await uploadMemberAvatar(avatarFile)
      }
      navigate('/members/dashboard')
    } catch (err) {
      setError(err?.message || 'Registration failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center opacity-25" />
      <div className="absolute inset-0 bg-black/70" />

      <main className="relative z-10 flex min-h-screen items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <div className="mb-6 text-center">
            <Link
              to="/"
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-[var(--accent)] shadow-[0_0_30px_var(--accent-glow)]"
            >
              <DumbbellIcon className="h-8 w-8" />
            </Link>
            <h1 className="font-display text-3xl font-semibold text-white">
              Join DBU Gym
            </h1>
            <p className="mt-2 text-sm text-white/70">Create your account</p>
          </div>

          <div className="glass-panel rounded-3xl p-6 shadow-2xl md:p-8">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white/70">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.3em] text-white/50">Gym Member ID</div>
                    <div className="mt-1 text-sm font-semibold text-white">{previewMemberId}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] uppercase tracking-[0.3em] text-white/50">Estimated Total</div>
                    <div className="mt-1 text-sm font-semibold text-[var(--accent)]">{estimatedTotal} ETB</div>
                  </div>
                </div>
                <p className="mt-2 text-[11px] text-white/50">
                  Final member ID is generated after registration.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setMemberType('university')}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                    isUniversity
                      ? 'bg-[var(--accent)] text-black'
                      : 'border border-white/20 text-white/80'
                  }`}
                >
                  University Member
                </button>
                <button
                  type="button"
                  onClick={() => setMemberType('external')}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                    !isUniversity
                      ? 'bg-[var(--accent)] text-black'
                      : 'border border-white/20 text-white/80'
                  }`}
                >
                  External Member
                </button>
              </div>

              <label className="block text-sm text-white/70">
                Full Name
                <div className="mt-2 flex items-center gap-3 rounded-2xl border border-white/20 bg-black/40 px-4 py-3 text-white">
                  <UserIcon className="h-5 w-5 text-[var(--accent)]" />
                  <input
                    type="text"
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                  />
                </div>
              </label>

              <label className="block text-sm text-white/70">
                Email Address
                <div className="mt-2 flex items-center gap-3 rounded-2xl border border-white/20 bg-black/40 px-4 py-3 text-white">
                  <MailIcon className="h-5 w-5 text-[var(--accent)]" />
                  <input
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                  />
                </div>
              </label>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="block text-sm text-white/70">
                  Password
                  <div className="mt-2 flex items-center gap-3 rounded-2xl border border-white/20 bg-black/40 px-4 py-3 text-white">
                    <LockIcon className="h-5 w-5 text-[var(--accent)]" />
                    <input
                      type="password"
                      name="password"
                      value={formValues.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                    />
                  </div>
                </label>
                <label className="block text-sm text-white/70">
                  Confirm Password
                  <div className="mt-2 flex items-center gap-3 rounded-2xl border border-white/20 bg-black/40 px-4 py-3 text-white">
                    <LockIcon className="h-5 w-5 text-[var(--accent)]" />
                    <input
                      type="password"
                      name="password_confirmation"
                      value={formValues.password_confirmation}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                    />
                  </div>
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="block text-sm text-white/70">
                  Phone Number
                  <input
                    type="tel"
                    name="phone"
                    value={formValues.phone}
                    onChange={handleChange}
                    placeholder="09... or +251..."
                    className="mt-2 w-full rounded-2xl border border-white/20 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none"
                  />
                </label>
                <label className="block text-sm text-white/70">
                  Gender
                  <select
                    name="gender"
                    value={formValues.gender}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-white/20 bg-black/40 px-4 py-3 text-sm text-white focus:outline-none"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </label>
              </div>

              <label className="block text-sm text-white/70">
                Membership Plan
                <select
                  name="membership_type"
                  value={formValues.membership_type}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-white/20 bg-black/40 px-4 py-3 text-sm text-white focus:outline-none"
                >
                  <option value="">Select Plan Duration</option>
                  <option value="Monthly">Monthly</option>
                  <option value="3Months">3 Months</option>
                  <option value="6Months">6 Months</option>
                  <option value="1Year">1 Year</option>
                </select>
              </label>

              {isUniversity ? (
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block text-sm text-white/70">
                    University ID
                    <input
                      type="text"
                      name="university_id"
                      value={formValues.university_id}
                      onChange={handleChange}
                      className="mt-2 w-full rounded-2xl border border-white/20 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none"
                    />
                  </label>
                  <label className="block text-sm text-white/70">
                    Department/College
                    <input
                      type="text"
                      name="department"
                      value={formValues.department}
                      onChange={handleChange}
                      className="mt-2 w-full rounded-2xl border border-white/20 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none"
                    />
                  </label>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block text-sm text-white/70">
                    National ID / Passport
                    <input
                      type="text"
                      name="national_id"
                      value={formValues.national_id}
                      onChange={handleChange}
                      className="mt-2 w-full rounded-2xl border border-white/20 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none"
                    />
                  </label>
                  <label className="block text-sm text-white/70">
                    Address
                    <input
                      type="text"
                      name="address"
                      value={formValues.address}
                      onChange={handleChange}
                      className="mt-2 w-full rounded-2xl border border-white/20 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none"
                    />
                  </label>
                </div>
              )}

              <label className="block text-sm text-white/70">
                Profile Picture
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mt-2 w-full rounded-2xl border border-white/20 bg-black/40 px-4 py-3 text-sm text-white file:mr-3 file:rounded-full file:border-0 file:bg-[var(--accent)] file:px-3 file:py-1 file:text-xs file:font-semibold file:text-black"
                />
              </label>

              <label className="flex items-center gap-2 text-xs text-white/70">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(event) => setTermsAccepted(event.target.checked)}
                  className="h-4 w-4 rounded border-white/30 bg-black/40 text-[var(--accent)]"
                />
                I agree to the Terms and Conditions.
              </label>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-black shadow-[0_15px_40px_var(--accent-glow)] transition hover:-translate-y-0.5 hover:bg-[var(--accent-strong)] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitLabel}
              </button>
            </form>

            {error ? (
              <div className="mt-4 rounded-2xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-xs text-red-100">
                {error}
              </div>
            ) : null}

            <p className="mt-6 text-center text-sm text-white/60">
              Already have an account?{' '}
              <Link to="/login" className="text-[var(--accent)] hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
