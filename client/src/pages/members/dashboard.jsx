import { useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import MemberNavbar from '../../components/MemberNavbar'
import { useAuth } from '../../auth/AuthProvider'
import { getMemberDashboard, renewMembership } from '../../lib/api'

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
  const { user } = useAuth()
  const displayName = user?.name || member.name
  const avatarUrl = user?.avatar_url || ''
  const [dashboard, setDashboard] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [renewing, setRenewing] = useState(false)

  useEffect(() => {
    let active = true

    const loadDashboard = async () => {
      try {
        const data = await getMemberDashboard()
        if (!active) return
        setDashboard(data?.data || null)
      } catch (err) {
        if (active) setError(err?.message || 'Unable to load dashboard data.')
      } finally {
        if (active) setLoading(false)
      }
    }

    loadDashboard()

    return () => {
      active = false
    }
  }, [])

  const memberInfo = dashboard?.member || {}
  const planInfo = dashboard?.plan || {}
  const resolvedName = memberInfo.name || displayName

  const handleRenew = async () => {
    setError('')
    setRenewing(true)
    try {
      const data = await renewMembership({
        membership_type: planInfo.type || member.planType,
      })
      setDashboard(data?.data || dashboard)
    } catch (err) {
      setError(err?.message || 'Failed to renew membership.')
    } finally {
      setRenewing(false)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <MemberNavbar memberName={resolvedName} avatarUrl={memberInfo.avatar_url || avatarUrl} />

      <main className="mx-auto w-full max-w-6xl px-6 py-10 md:px-8">
        <h1 className="text-2xl font-semibold">
          Welcome Back, <span className="text-[var(--accent)]">{resolvedName}</span>!
        </h1>
        {loading ? (
          <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text-muted)]">
            Loading dashboard data...
          </div>
        ) : null}
        {error ? (
          <div className="mt-4 rounded-2xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            {error}
          </div>
        ) : null}

        <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <h2 className="text-lg font-semibold">Account Details</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-soft)]">
                    Full Name
                  </p>
                  <p className="mt-2 text-lg font-semibold">{resolvedName}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-soft)]">
                    Gym Member ID
                  </p>
                  <p className="mt-2 text-lg font-semibold text-[var(--accent)]">
                    {memberInfo.member_id || member.memberId}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-soft)]">
                    Account Type
                  </p>
                  <span className="mt-2 inline-flex rounded-full border border-[var(--border)] px-3 py-1 text-sm text-[var(--text-muted)]">
                    {memberInfo.member_type || member.accountType}
                  </span>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-soft)]">
                    Membership Status
                  </p>
                  <span className="mt-2 inline-flex rounded-full bg-emerald-500/15 px-3 py-1 text-sm text-emerald-200">
                    {memberInfo.status || member.status}
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
                    <p className="mt-2 text-sm font-semibold">{memberInfo.university_id || member.uniId}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-soft)]">
                      Department
                    </p>
                    <p className="mt-2 text-sm font-semibold">{memberInfo.department || member.department}</p>
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
                  <p className="mt-2 text-sm font-semibold">{planInfo.type || member.planType}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-soft)]">
                    Start Date
                  </p>
                  <p className="mt-2 text-sm font-semibold">
                    {planInfo.start_date ? new Date(planInfo.start_date).toLocaleDateString() : member.startDate}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-soft)]">
                    Expiry Date
                  </p>
                  <p className="mt-2 text-sm font-semibold">
                    {planInfo.expiry_date ? new Date(planInfo.expiry_date).toLocaleDateString() : member.expiryDate}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-soft)]">
                    Plan Cost
                  </p>
                  <p className="mt-2 text-lg font-semibold text-[var(--accent)]">
                    {planInfo.cost ? `${planInfo.cost} ETB` : member.planCost}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-soft)]">
                    Payment Status
                  </p>
                  <span className="mt-2 inline-flex rounded-full bg-emerald-500/15 px-3 py-1 text-sm text-emerald-200">
                    {planInfo.payment_status || member.paymentStatus}
                  </span>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-soft)]">
                    Remaining Days
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {typeof planInfo.remaining_days === 'number' ? planInfo.remaining_days : member.remainingDays}
                  </p>
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
                <button
                  type="button"
                  onClick={handleRenew}
                  disabled={renewing}
                  className="rounded-2xl border border-[var(--border)] px-4 py-3 text-sm font-semibold text-[var(--text-soft)] transition hover:border-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {renewing ? 'Renewing...' : 'Renew Membership'}
                </button>
              </div>
            </section>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  )
}
