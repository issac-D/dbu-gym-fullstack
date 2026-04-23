import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { verifyChapaPayment } from '../lib/api'

export default function PaymentReturn() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState('verifying')
  const [message, setMessage] = useState('Verifying your payment...')

  const txRef = useMemo(
    () => searchParams.get('tx_ref') || searchParams.get('trx_ref') || searchParams.get('reference') || '',
    [searchParams]
  )

  useEffect(() => {
    let active = true

    const verifyPayment = async () => {
      if (!txRef) {
        if (!active) return
        setStatus('failed')
        setMessage('Missing transaction reference. Please try registration again.')
        return
      }

      try {
        const response = await verifyChapaPayment(txRef)
        if (!active) return

        if (response?.data?.status === 'success') {
          setStatus('success')
          setMessage('Payment verified. Redirecting to pending approval page...')
          window.setTimeout(() => {
            navigate(`/pending-approval?tx_ref=${encodeURIComponent(txRef)}`, { replace: true })
          }, 1200)
          return
        }

        setStatus('failed')
        setMessage('Payment could not be verified. Please contact support or try again.')
      } catch (err) {
        if (!active) return
        setStatus('failed')
        setMessage(err?.message || 'Payment verification failed. Please try again.')
      }
    }

    verifyPayment()

    return () => {
      active = false
    }
  }, [navigate, txRef])

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <main className="mx-auto flex min-h-screen w-full max-w-xl items-center justify-center px-6 py-16">
        <div className="glass-panel w-full rounded-3xl border border-white/10 p-8 text-center shadow-2xl">
          <h1 className="font-display text-2xl font-semibold text-white">Payment Status</h1>
          <p className="mt-4 text-sm text-white/75">{message}</p>

          {status === 'verifying' ? (
            <div className="mt-6 inline-flex items-center gap-2 text-sm text-[var(--accent)]">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--accent)]/60 border-t-transparent"></span>
              Checking transaction
            </div>
          ) : null}

          {status === 'failed' ? (
            <div className="mt-6 space-y-3">
              <Link
                to="/register"
                className="inline-flex rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-semibold text-black"
              >
                Back to Registration
              </Link>
              <p className="text-xs text-white/55">Reference: {txRef || 'N/A'}</p>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  )
}
