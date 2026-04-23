import { Link, useSearchParams } from 'react-router-dom'

export default function PendingApproval() {
  const [searchParams] = useSearchParams()
  const txRef = searchParams.get('tx_ref') || ''

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <main className="mx-auto flex min-h-screen w-full max-w-2xl items-center justify-center px-6 py-16">
        <div className="glass-panel w-full rounded-3xl border border-white/10 p-8 shadow-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent)]">Registration Completed</p>
          <h1 className="mt-3 font-display text-3xl font-semibold text-white">Pending Admin Approval</h1>
          <p className="mt-4 text-sm text-white/75">
            Your payment was received and your account has been created. An admin will review your membership request.
            You will be able to fully access member features after approval.
          </p>

          <div className="mt-6 rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-white/80">
            <p>Status: <span className="font-semibold text-amber-300">PendingApproval</span></p>
            {txRef ? <p className="mt-1 text-xs text-white/60">Transaction Reference: {txRef}</p> : null}
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/login"
              className="rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-semibold text-black"
            >
              Go to Login
            </Link>
            <Link
              to="/"
              className="rounded-full border border-white/25 px-5 py-2 text-sm font-semibold text-white/80"
            >
              Back Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
