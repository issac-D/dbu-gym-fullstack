import { Link } from 'react-router-dom'

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

function NavPill({ to, children, active }) {
  return (
    <Link
      to={to}
      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
        active
          ? 'bg-[var(--accent)] text-black'
          : 'border border-[var(--border)] text-[var(--text-soft)] hover:border-[var(--accent)]'
      }`}
    >
      {children}
    </Link>
  )
}

export default function MemberNavbar({ memberName }) {
  return (
    <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[var(--surface-strong)]/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4 md:px-8">
        <Link to="/" className="flex items-center gap-3 text-lg font-semibold">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--surface)] text-[var(--accent)] shadow-[0_0_20px_var(--accent-glow)]">
            <DumbbellIcon className="h-6 w-6" />
          </span>
          <div>
            <p className="font-display text-2xl tracking-wide">
              <span className="text-[var(--accent)]">DBU</span> Gym
            </p>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-soft)]">
              Member Portal
            </p>
          </div>
        </Link>

        <div className="flex flex-wrap items-center gap-3">
          <NavPill to="/members/dashboard" active>
            Dashboard
          </NavPill>
          <NavPill to="#">Edit Profile</NavPill>
          <button className="rounded-full border border-red-400/60 px-4 py-2 text-sm font-semibold text-red-200 transition hover:bg-red-500/20">
            Logout
          </button>
        </div>

        <div className="flex items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-xs text-[var(--text-soft)]">
          <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
          Logged in as
          <span className="font-semibold text-[var(--text)]">{memberName}</span>
        </div>
      </div>
    </header>
  )
}
