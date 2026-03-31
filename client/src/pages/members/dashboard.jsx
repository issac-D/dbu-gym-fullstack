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

const member = {
  name: 'Mekdes Alemu',
  memberId: 'DBU-10245',
  accountType: 'Student',
  status: 'Active',
  uniId: 'DBU-2023-1542',
  department: 'Software Engineering',
  planType: 'Monthly',
  startDate: 'Mar 01, 2026',
  expiryDate: 'Mar 31, 2026',
  planCost: '800 ETB',
  paymentStatus: 'Paid',
  remainingDays: '14',
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <header className="border-b border-[var(--border)] bg-[var(--surface-strong)]">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5 md:px-8">
          <Link to="/" className="flex items-center gap-3 text-lg font-semibold">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--surface)] text-[var(--accent)]">
              <DumbbellIcon className="h-6 w-6" />
            </span>
            <span className="font-display text-2xl tracking-wide">
              <span className="text-[var(--accent)]">DBU</span> Gym
            </span>
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/members/dashboard"
              className="rounded-full border border-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--text)]"
            >
              Dashboard
            </Link>
            <Link
              to="#"
              className="rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--text-soft)] transition hover:border-[var(--accent)]"
            >
              Edit Profile
            </Link>
            <button className="rounded-full border border-red-400/60 px-4 py-2 text-sm font-semibold text-red-200 transition hover:bg-red-500/20">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 py-10 md:px-8">
        <h1 className="text-2xl font-semibold">
          Welcome Back, <span className="text-[var(--accent)]">{member.name}</span>!
        </h1>

        <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <h2 className="text-lg font-semibold">Account Details</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-soft)]">
                    Full Name
                  </p>
                  <p className="mt-2 text-lg font-semibold">{member.name}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-soft)]">
                    Gym Member ID
                  </p>
                  <p className="mt-2 text-lg font-semibold text-[var(--accent)]">
                    {member.memberId}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-soft)]">
                    Account Type
                  </p>
                  <span className="mt-2 inline-flex rounded-full border border-[var(--border)] px-3 py-1 text-sm text-[var(--text-muted)]">
                    {member.accountType}
                  </span>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-soft)]">
                    Membership Status
                  </p>
                  <span className="mt-2 inline-flex rounded-full bg-emerald-500/15 px-3 py-1 text-sm text-emerald-200">
                    {member.status}
                  </span>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-4">
                <p className="text-sm font-semibold text-[var(--text-muted)]">
                  Identity Verification
                </p>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-soft)]">
                      University ID
                    </p>
                    <p className="mt-2 text-sm font-semibold">{member.uniId}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-soft)]">
                      Department
                    </p>
                    <p className="mt-2 text-sm font-semibold">{member.department}</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <h2 className="text-lg font-semibold">Membership Summary</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-soft)]">
                    Type / Duration
                  </p>
                  <p className="mt-2 text-sm font-semibold">{member.planType}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-soft)]">
                    Start Date
                  </p>
                  <p className="mt-2 text-sm font-semibold">{member.startDate}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-soft)]">
                    Expiry Date
                  </p>
                  <p className="mt-2 text-sm font-semibold">{member.expiryDate}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-soft)]">
                    Plan Cost
                  </p>
                  <p className="mt-2 text-lg font-semibold text-[var(--accent)]">
                    {member.planCost}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-soft)]">
                    Payment Status
                  </p>
                  <span className="mt-2 inline-flex rounded-full bg-emerald-500/15 px-3 py-1 text-sm text-emerald-200">
                    {member.paymentStatus}
                  </span>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-soft)]">
                    Remaining Days
                  </p>
                  <p className="mt-2 text-2xl font-semibold">{member.remainingDays}</p>
                </div>
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5">
              <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--text-soft)]">
                Notifications
              </h3>
              <div className="mt-4 space-y-3">
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3 text-sm">
                  Welcome to your dashboard! Your plan renews soon.
                </div>
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3 text-sm">
                  New class schedules are available for next week.
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5">
              <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--text-soft)]">
                Quick Actions
              </h3>
              <div className="mt-4 grid gap-3">
                <button className="rounded-2xl border border-[var(--accent)] px-4 py-3 text-sm font-semibold text-[var(--text)] transition hover:bg-[var(--accent)] hover:text-black">
                  Update Profile
                </button>
                <button className="rounded-2xl border border-[var(--border)] px-4 py-3 text-sm font-semibold text-[var(--text-soft)] transition hover:border-[var(--accent)]">
                  Renew Membership
                </button>
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  )
}
