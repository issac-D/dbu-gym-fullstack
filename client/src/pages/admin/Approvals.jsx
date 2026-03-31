import { useMemo, useState } from 'react'
import AdminNavbar from '../../components/AdminNavbar'
import Footer from '../../components/Footer'

const initialPending = [
  {
    id: 'p1',
    joinDate: '2026-03-20',
    fullName: 'Selam Tesfaye',
    email: 'selam@example.com',
    membershipId: 'DBU-2026-0101',
    membershipType: 'Monthly',
    isUniversityMember: true,
    universityId: 'DBU-2024-7788',
    nationalId: '',
    phone: '+251911101010',
  },
  {
    id: 'p2',
    joinDate: '2026-03-18',
    fullName: 'Kalkidan Abebe',
    email: 'kalkidan@example.com',
    membershipId: 'EXT-2026-0033',
    membershipType: '3Months',
    isUniversityMember: false,
    universityId: '',
    nationalId: '1234567890123456',
    phone: '+251911202020',
  },
]

export default function Approvals() {
  const [theme, setTheme] = useState(
    document.documentElement.dataset.theme || 'dark'
  )
  const [pending, setPending] = useState(initialPending)
  const [selected, setSelected] = useState(null)

  const pendingCount = pending.length

  const handleToggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.dataset.theme = next
    window.localStorage.setItem('dbu-theme', next)
  }

  const handleApprove = () => {
    if (!selected) return
    setPending((prev) => prev.filter((member) => member.id !== selected.id))
    setSelected(null)
  }

  const handleReject = () => {
    if (!selected) return
    setPending((prev) => prev.filter((member) => member.id !== selected.id))
    setSelected(null)
  }

  const proofId = useMemo(() => {
    if (!selected) return ''
    return selected.isUniversityMember
      ? selected.universityId
      : selected.nationalId || 'N/A'
  }, [selected])

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
            <h1 className="text-2xl font-semibold">Pending Registrations</h1>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              Review and approve new member applications.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-red-500/15 px-3 py-1 text-xs text-red-200">
              Pending: {pendingCount}
            </span>
            <button
              type="button"
              onClick={() => setPending([...pending])}
              className="rounded-full border border-[var(--border)] px-4 py-2 text-xs font-semibold text-[var(--text)]"
            >
              Refresh
            </button>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto rounded-3xl border border-[var(--border)] bg-[var(--surface)]">
          <table className="w-full text-left text-sm">
            <thead className="bg-[var(--surface-strong)] text-xs uppercase text-[var(--text-soft)]">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th>Name</th>
                <th>Type</th>
                <th>ID Number</th>
                <th>Plan</th>
                <th className="text-right pr-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pending.length ? (
                pending.map((member) => (
                  <tr key={member.id} className="border-t border-[var(--border)]">
                    <td className="px-4 py-3 text-[var(--text-soft)]">
                      {member.joinDate}
                    </td>
                    <td className="font-semibold">{member.fullName}</td>
                    <td>
                      <span className="rounded-full border border-[var(--border)] px-2 py-1 text-xs">
                        {member.isUniversityMember ? 'Uni' : 'Ext'}
                      </span>
                    </td>
                    <td className="font-mono text-xs text-[var(--text-soft)]">
                      {member.isUniversityMember
                        ? member.universityId
                        : member.nationalId || 'N/A'}
                    </td>
                    <td>{member.membershipType}</td>
                    <td className="text-right pr-4">
                      <button
                        type="button"
                        onClick={() => setSelected(member)}
                        className="rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-semibold text-black"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-4 py-10 text-center text-[var(--text-soft)]">
                    All caught up! No pending approvals.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      <Footer />

      {selected ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-md rounded-3xl border border-[var(--border)] bg-[var(--bg)] p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Review Application</h3>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="text-[var(--text-soft)]"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 flex flex-col items-center text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[var(--accent)] bg-[var(--surface)] text-2xl text-[var(--accent)]">
                {selected.fullName
                  .split(' ')
                  .map((part) => part[0])
                  .join('')
                  .slice(0, 2)}
              </div>
              <h4 className="mt-4 text-lg font-semibold">{selected.fullName}</h4>
              <p className="text-sm text-[var(--text-soft)]">{selected.email}</p>
            </div>

            <div className="mt-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-4 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-[var(--text-soft)]">Membership ID</span>
                <span className="font-semibold">{selected.membershipId}</span>
              </div>
              <div className="mt-2 flex justify-between gap-4">
                <span className="text-[var(--text-soft)]">Type</span>
                <span className="font-semibold">
                  {selected.isUniversityMember ? 'University' : 'External'}
                </span>
              </div>
              <div className="mt-2 flex justify-between gap-4">
                <span className="text-[var(--text-soft)]">ID / Dept</span>
                <span className="font-semibold">{proofId}</span>
              </div>
              <div className="mt-2 flex justify-between gap-4">
                <span className="text-[var(--text-soft)]">Phone</span>
                <span className="font-semibold">{selected.phone}</span>
              </div>
              <div className="mt-2 flex justify-between gap-4">
                <span className="text-[var(--text-soft)]">Payment</span>
                <span className="font-semibold text-emerald-200">Paid</span>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={handleReject}
                className="w-full rounded-full border border-red-400/60 px-4 py-2 text-sm font-semibold text-red-200"
              >
                Reject
              </button>
              <button
                type="button"
                onClick={handleApprove}
                className="w-full rounded-full bg-emerald-500/90 px-4 py-2 text-sm font-semibold text-black"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
