import { useEffect, useMemo, useState } from 'react'
import AdminNavbar from '../../components/AdminNavbar'
import Footer from '../../components/Footer'
import { getAdminDashboard } from '../../lib/api'

const priceMap = {
  Monthly: 300,
  '3Months': 800,
  '6Months': 1500,
  '1Year': 2500,
}

const initialMembers = [
  {
    id: '1',
    fullName: 'Mekdes Alemu',
    membershipId: 'DBU-2026-0001',
    membershipType: 'Monthly',
    isUniversityMember: true,
    phone: '+251911111111',
    joinDate: '2026-02-01',
    expiryDate: '2026-03-01',
  },
  {
    id: '2',
    fullName: 'Samuel Bekele',
    membershipId: 'EXT-2026-0001',
    membershipType: '3Months',
    isUniversityMember: false,
    phone: '+251911222222',
    joinDate: '2026-01-15',
    expiryDate: '2026-04-15',
  },
  {
    id: '3',
    fullName: 'Liya Girma',
    membershipId: 'DBU-2026-0002',
    membershipType: '6Months',
    isUniversityMember: true,
    phone: '+251911333333',
    joinDate: '2025-11-01',
    expiryDate: '2026-05-01',
  },
  {
    id: '4',
    fullName: 'Daniel Tadesse',
    membershipId: 'EXT-2026-0002',
    membershipType: '1Year',
    isUniversityMember: false,
    phone: '+251911444444',
    joinDate: '2025-06-01',
    expiryDate: '2026-06-01',
  },
  {
    id: '5',
    fullName: 'Sara Kebede',
    membershipId: 'DBU-2026-0003',
    membershipType: 'Monthly',
    isUniversityMember: true,
    phone: '+251911555555',
    joinDate: '2026-01-05',
    expiryDate: '2026-02-05',
  },
  {
    id: '6',
    fullName: 'Yonatan Fisseha',
    membershipId: 'EXT-2026-0003',
    membershipType: 'Monthly',
    isUniversityMember: false,
    phone: '+251911666666',
    joinDate: '2025-12-01',
    expiryDate: '2026-01-01',
  },
  {
    id: '7',
    fullName: 'Hana Solomon',
    membershipId: 'DBU-2026-0004',
    membershipType: '3Months',
    isUniversityMember: true,
    phone: '+251911777777',
    joinDate: '2026-02-10',
    expiryDate: '2026-05-10',
  },
  {
    id: '8',
    fullName: 'Abel Tesfaye',
    membershipId: 'EXT-2026-0004',
    membershipType: '6Months',
    isUniversityMember: false,
    phone: '+251911888888',
    joinDate: '2025-10-01',
    expiryDate: '2026-04-01',
  },
  {
    id: '9',
    fullName: 'Eden Hailu',
    membershipId: 'DBU-2026-0005',
    membershipType: '1Year',
    isUniversityMember: true,
    phone: '+251911999999',
    joinDate: '2025-03-01',
    expiryDate: '2026-03-01',
  },
]

const adminUser = {
  name: 'Admin Dawit',
}

function getStatus(expiryDate) {
  if (!expiryDate) return { computedStatus: 'unknown', badge: 'bg-slate-500/20 text-slate-200' }
  const days = Math.ceil((new Date(expiryDate) - new Date()) / (1000 * 60 * 60 * 24))
  if (days < 0) return { computedStatus: 'expired', badge: 'bg-red-500/20 text-red-200' }
  if (days <= 7) return { computedStatus: 'expiring_soon', badge: 'bg-amber-500/20 text-amber-200' }
  return { computedStatus: 'active', badge: 'bg-emerald-500/20 text-emerald-200' }
}

function getMembershipCost(member) {
  const base = priceMap[member.membershipType] || 0
  return member.isUniversityMember ? base * 0.8 : base
}

function LineChart({ labels, joined, expired, pending }) {
  const max = Math.max(...joined, ...expired, 1)
  const pendingMax = pending?.length ? Math.max(max, ...pending) : max
  const safeMax = Math.max(pendingMax, 1)
  const points = (data) =>
    data
      .map((value, index) => {
        const x = 8 + (index / (data.length - 1 || 1)) * 84
        const y = 8 + (1 - value / safeMax) * 78
        return `${x},${y}`
      })
      .join(' ')

  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      {[0, 25, 50, 75, 100].map((line) => {
        const y = 8 + (line / 100) * 78
        return (
        <line
          key={`grid-${line}`}
          x1="8"
          y1={y}
          x2="92"
          y2={y}
          stroke="var(--border)"
          strokeDasharray="2 3"
          strokeWidth="0.6"
        />
        )
      })}
      {[0, 25, 50, 75, 100].map((line) => {
        const y = 8 + (line / 100) * 78
        return (
        <text
          key={`tick-${line}`}
          x="2"
          y={y + 2}
          fontSize="4"
          fill="var(--text-soft)"
        >
          {Math.round((1 - line / 100) * safeMax)}
        </text>
        )
      })}
      <polyline
        fill="none"
        stroke="var(--accent)"
        strokeWidth="3"
        points={points(joined)}
      />
      <polyline
        fill="none"
        stroke="#ef4444"
        strokeWidth="3"
        points={points(expired)}
      />
      {pending?.length ? (
        <polyline
          fill="none"
          stroke="#f59e0b"
          strokeWidth="3"
          points={points(pending)}
        />
      ) : null}
      {joined.map((value, index) => {
        const x = 8 + (index / (joined.length - 1 || 1)) * 84
        const y = 8 + (1 - value / safeMax) * 78
        return (
          <circle key={`joined-${index}`} cx={x} cy={y} r="1.6" fill="var(--accent)">
            <title>{`${labels[index]} • Joined: ${value}`}</title>
          </circle>
        )
      })}
      {expired.map((value, index) => {
        const x = 8 + (index / (expired.length - 1 || 1)) * 84
        const y = 8 + (1 - value / safeMax) * 78
        return (
          <circle key={`expired-${index}`} cx={x} cy={y} r="1.6" fill="#ef4444">
            <title>{`${labels[index]} • Expired: ${value}`}</title>
          </circle>
        )
      })}
      {pending?.map((value, index) => {
        const x = 8 + (index / (pending.length - 1 || 1)) * 84
        const y = 8 + (1 - value / safeMax) * 78
        return (
          <circle key={`pending-${index}`} cx={x} cy={y} r="1.6" fill="#f59e0b">
            <title>{`${labels[index]} • Pending: ${value}`}</title>
          </circle>
        )
      })}
      {labels.map((label, index) => (
        <text
          key={label}
          x={8 + (index / (labels.length - 1 || 1)) * 84}
          y="98"
          fontSize="4"
          textAnchor="middle"
          fill="var(--text-soft)"
        >
          {label}
        </text>
      ))}
    </svg>
  )
}

function DoughnutChart({ uniCount, extCount }) {
  const total = uniCount + extCount || 1
  const uniPercent = (uniCount / total) * 100
  const extPercent = 100 - uniPercent

  return (
    <svg viewBox="0 0 36 36" className="h-full w-full">
      <circle
        cx="18"
        cy="18"
        r="14"
        fill="none"
        stroke="var(--border)"
        strokeWidth="6"
      />
      <circle
        cx="18"
        cy="18"
        r="14"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="6"
        strokeDasharray={`${uniPercent} ${100 - uniPercent}`}
        strokeDashoffset="25"
      />
      <circle
        cx="18"
        cy="18"
        r="14"
        fill="none"
        stroke="#94a3b8"
        strokeWidth="6"
        strokeDasharray={`${extPercent} ${100 - extPercent}`}
        strokeDashoffset={`${25 + uniPercent}`}
      />
      <text x="18" y="20" textAnchor="middle" fontSize="7" fill="var(--text)">
        {uniCount} / {extCount}
      </text>
    </svg>
  )
}

export default function AdminDashboard() {
  const [members, setMembers] = useState(initialMembers)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [page, setPage] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [memberType, setMemberType] = useState('university')
  const [dashboardStats, setDashboardStats] = useState(null)
  const [dashboardError, setDashboardError] = useState('')
  const [dashboardChart, setDashboardChart] = useState(null)
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: 'dbugym123',
    universityId: '',
    department: '',
    nationalId: '',
    address: '',
    membershipType: 'Monthly',
    gender: 'Male',
  })
  const [phoneError, setPhoneError] = useState('')
  const [theme, setTheme] = useState(
    document.documentElement.dataset.theme || 'dark'
  )
  const itemsPerPage = 8

  const enrichedMembers = useMemo(
    () =>
      members.map((member) => ({
        ...member,
        ...getStatus(member.expiryDate),
      })),
    [members]
  )

  const filteredMembers = useMemo(() => {
    const term = search.trim().toLowerCase()
    return enrichedMembers.filter((member) => {
      const matchesSearch =
        member.membershipId.toLowerCase().includes(term) ||
        member.fullName.toLowerCase().includes(term)
      const matchesStatus = !statusFilter || member.computedStatus === statusFilter
      let matchesType = true
      if (typeFilter === 'university') matchesType = member.isUniversityMember
      if (typeFilter === 'external') matchesType = !member.isUniversityMember
      return matchesSearch && matchesStatus && matchesType
    })
  }, [enrichedMembers, search, statusFilter, typeFilter])

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage) || 1
  const paginated = filteredMembers.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  )

  const stats = useMemo(() => {
    const total = enrichedMembers.length
    const active = enrichedMembers.filter((m) =>
      ['active', 'expiring_soon'].includes(m.computedStatus)
    ).length
    const expired = enrichedMembers.filter((m) => m.computedStatus === 'expired')
      .length
    const uni = enrichedMembers.filter((m) => m.isUniversityMember).length
    const ext = total - uni
    const revenue = enrichedMembers.reduce(
      (sum, m) => sum + getMembershipCost(m),
      0
    )
    return { total, active, expired, uni, ext, revenue }
  }, [enrichedMembers])

  useEffect(() => {
    let active = true

    const loadStats = async () => {
      try {
        const data = await getAdminDashboard()
        if (!active) return
        setDashboardStats(data?.data?.stats || null)
        setDashboardChart(data?.data?.chart || null)
      } catch (err) {
        if (active) setDashboardError(err?.message || 'Unable to load admin stats.')
      }
    }

    loadStats()

    return () => {
      active = false
    }
  }, [])

  const statsView = {
    total: dashboardStats?.total_members ?? stats.total,
    active: dashboardStats?.active_members ?? stats.active,
    pending: dashboardStats?.pending_members ?? 0,
    approved: dashboardStats?.approved_members ?? 0,
    rejected: dashboardStats?.rejected_members ?? 0,
    revenue: dashboardStats?.total_revenue ?? stats.revenue,
  }

  const chartData = useMemo(() => {
    if (dashboardChart?.labels?.length) {
      return {
        labels: dashboardChart.labels,
        joined: dashboardChart.joined || [],
        expired: dashboardChart.expired || [],
        pending: dashboardChart.pending || [],
      }
    }
    const labels = Array.from({ length: 6 }, (_, index) => {
      const date = new Date()
      date.setMonth(date.getMonth() - (5 - index))
      return date.toLocaleString('default', { month: 'short' })
    })
    const joined = Array(6).fill(0)
    const expired = Array(6).fill(0)

    enrichedMembers.forEach((member) => {
      const joinDate = new Date(member.joinDate)
      const diff =
        (new Date().getMonth() - joinDate.getMonth() + 12) % 12
      if (diff < 6) joined[5 - diff] += 1
      if (member.computedStatus === 'expired') expired[5] += 1
    })

    const pending = Array(6).fill(0)
    return { labels, joined, expired, pending }
  }, [enrichedMembers])

  const handleFilterChange = (setter) => (event) => {
    setter(event.target.value)
    setPage(1)
  }

  const handleAddMember = (event) => {
    event.preventDefault()
    setPhoneError('')

    const phoneValid = /^(\+251(9|7)\d{8}|0(9|7)\d{8})$/.test(form.phone)
    if (!phoneValid) {
      setPhoneError('Invalid Ethiopian phone number.')
      return
    }

    if (memberType === 'external' && form.nationalId.length !== 16) {
      alert('National ID must be 16 digits.')
      return
    }

    const prefix = memberType === 'university' ? 'DBU' : 'EXT'
    const count = members.filter((m) => m.membershipId.startsWith(prefix)).length + 1
    const membershipId = `${prefix}-${new Date().getFullYear()}-${String(count).padStart(4, '0')}`

    const expiry = new Date()
    if (form.membershipType === 'Monthly') expiry.setMonth(expiry.getMonth() + 1)
    else if (form.membershipType === '1Year') expiry.setFullYear(expiry.getFullYear() + 1)
    else if (form.membershipType === '6Months') expiry.setMonth(expiry.getMonth() + 6)
    else expiry.setMonth(expiry.getMonth() + 3)

    const newMember = {
      id: String(Date.now()),
      fullName: form.fullName,
      membershipId,
      membershipType: form.membershipType,
      isUniversityMember: memberType === 'university',
      phone: form.phone,
      joinDate: new Date().toISOString().split('T')[0],
      expiryDate: expiry.toISOString().split('T')[0],
    }

    setMembers((prev) => [newMember, ...prev])
    setShowModal(false)
    setForm({
      fullName: '',
      email: '',
      phone: '',
      password: 'dbugym123',
      universityId: '',
      department: '',
      nationalId: '',
      address: '',
      membershipType: 'Monthly',
      gender: 'Male',
    })
  }

  const handleDelete = (id) => {
    if (!window.confirm('Delete this member?')) return
    setMembers((prev) => prev.filter((m) => m.id !== id))
  }

  const modalCost = useMemo(() => {
    const base = priceMap[form.membershipType] || 0
    return memberType === 'university' ? base * 0.8 : base
  }, [form.membershipType, memberType])

  const handleToggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.dataset.theme = next
    window.localStorage.setItem('dbu-theme', next)
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <AdminNavbar
        adminName={adminUser.name}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      <main className="mx-auto w-full max-w-6xl px-6 py-10 md:px-8">
        <h1 className="text-2xl font-semibold">Admin Overview</h1>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { label: 'Total Members', value: statsView.total },
            { label: 'Active', value: statsView.active },
            { label: 'Pending', value: statsView.pending },
            { label: 'Approved', value: statsView.approved },
            { label: 'Est. Revenue', value: statsView.revenue.toLocaleString() },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 text-center"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-soft)]">
                {stat.label}
              </p>
              <p className="mt-2 text-xl font-semibold">{stat.value}</p>
            </div>
          ))}
        </div>

        {dashboardError ? (
          <div className="mt-6 rounded-2xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            {dashboardError}
          </div>
        ) : null}
        {statsView.pending > 0 ? (
          <div className="mt-4 rounded-2xl border border-[var(--danger-border)] bg-[var(--danger-bg)] px-4 py-3 text-sm text-[var(--danger-text)]">
            Attention: {statsView.pending} pending members awaiting approval.
          </div>
        ) : null}

        <section className="mt-10 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <h2 className="text-lg font-semibold">Membership Trends (6 Months)</h2>
            <div className="mt-4 h-60">
              <LineChart
                labels={chartData.labels}
                joined={chartData.joined}
                expired={chartData.expired}
                pending={chartData.pending}
              />
            </div>
          </div>
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <h2 className="text-lg font-semibold">Pending Approvals (6 Months)</h2>
            <div className="mt-4 h-48">
              <LineChart
                labels={chartData.labels}
                joined={chartData.pending}
                expired={Array(chartData.pending.length).fill(0)}
                pending={[]}
              />
            </div>
          </div>
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <h2 className="text-lg font-semibold">User Distribution</h2>
            <div className="mt-4 h-48">
              <DoughnutChart uniCount={stats.uni} extCount={stats.ext} />
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="text-lg font-semibold">Financial Summary</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-soft)]">
                Total Calculated (YTD)
              </p>
              <p className="mt-2 text-lg font-semibold text-[var(--accent)]">
                {statsView.revenue.toLocaleString()} ETB
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-soft)]">
                Pending Members
              </p>
              <p className="mt-2 text-lg font-semibold text-amber-200">
                {statsView.pending} Members
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-soft)]">
                Rejected Members
              </p>
              <p className="mt-2 text-lg font-semibold text-red-200">
                {statsView.rejected} Members
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-soft)]">
                System Status
              </p>
              <p className="mt-2 text-lg font-semibold text-emerald-200">Online</p>
            </div>
          </div>
        </section>

        <section id="member-management" className="mt-8 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-lg font-semibold">Member Management</h2>
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-black"
            >
              Add New Member
            </button>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-[2fr_1fr_1fr]">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by ID or Name..."
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-2 text-sm"
            />
            <select
              value={statusFilter}
              onChange={handleFilterChange(setStatusFilter)}
              className="rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-2 text-sm"
            >
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="expiring_soon">Expiring Soon</option>
              <option value="expired">Expired</option>
            </select>
            <select
              value={typeFilter}
              onChange={handleFilterChange(setTypeFilter)}
              className="rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-2 text-sm"
            >
              <option value="">All Types</option>
              <option value="university">University</option>
              <option value="external">External</option>
            </select>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase text-[var(--text-soft)]">
                <tr>
                  <th className="py-2">ID</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Phone</th>
                  <th>Plan</th>
                  <th>Expiry</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.length ? (
                  paginated.map((member) => (
                    <tr key={member.id} className="border-t border-[var(--border)]">
                      <td className="py-3">{member.membershipId}</td>
                      <td>{member.fullName}</td>
                      <td>
                        <span className="rounded-full border border-[var(--border)] px-2 py-1 text-xs">
                          {member.isUniversityMember ? 'Uni' : 'Ext'}
                        </span>
                      </td>
                      <td>{member.phone}</td>
                      <td>{member.membershipType}</td>
                      <td>{member.expiryDate}</td>
                      <td>
                        <span className={`rounded-full px-2 py-1 text-xs ${member.badge}`}>
                          {member.computedStatus === 'expiring_soon'
                            ? 'Expiring Soon'
                            : member.computedStatus}
                        </span>
                      </td>
                      <td>
                        <button
                          type="button"
                          onClick={() => handleDelete(member.id)}
                          className="rounded-full border border-red-400/60 px-3 py-1 text-xs text-red-200"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="py-6 text-center text-[var(--text-soft)]">
                      No members found matching criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm">
            <button
              type="button"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="rounded-full border border-[var(--border)] px-3 py-1 disabled:opacity-40"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setPage(index + 1)}
                className={`rounded-full px-3 py-1 ${
                  page === index + 1
                    ? 'bg-[var(--accent)] text-black'
                    : 'border border-[var(--border)]'
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="rounded-full border border-[var(--border)] px-3 py-1 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </section>
      </main>

      <Footer />

      {showModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-2xl rounded-3xl border border-[var(--border)] bg-[var(--bg)] p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Add New Member</h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-[var(--text-soft)]"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setMemberType('university')}
                className={`rounded-full border px-4 py-2 text-sm font-semibold ${
                  memberType === 'university'
                    ? 'border-[var(--accent)] bg-[var(--accent)] text-black'
                    : 'border-[var(--border)] text-[var(--text-soft)]'
                }`}
              >
                University Member
              </button>
              <button
                type="button"
                onClick={() => setMemberType('external')}
                className={`rounded-full border px-4 py-2 text-sm font-semibold ${
                  memberType === 'external'
                    ? 'border-[var(--accent)] bg-[var(--accent)] text-black'
                    : 'border-[var(--border)] text-[var(--text-soft)]'
                }`}
              >
                External Member
              </button>
            </div>

            <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm">
              <span className="font-semibold">ID:</span> Auto-generated ·{' '}
              <span className="font-semibold">Cost:</span> {modalCost} ETB
            </div>

            <form className="mt-4 grid gap-4" onSubmit={handleAddMember}>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="text-sm text-[var(--text-muted)]">
                  Full Name
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, fullName: event.target.value.replace(/[0-9]/g, '') }))
                    }
                    className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm"
                    required
                  />
                </label>
                <label className="text-sm text-[var(--text-muted)]">
                  Email
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                    className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm"
                    required
                  />
                </label>
                <label className="text-sm text-[var(--text-muted)]">
                  Phone
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value.replace(/[^0-9+]/g, '') }))}
                    className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm"
                    required
                  />
                  {phoneError ? (
                    <span className="text-xs text-red-200">{phoneError}</span>
                  ) : null}
                </label>
                <label className="text-sm text-[var(--text-muted)]">
                  Default Pass
                  <input
                    type="text"
                    value={form.password}
                    readOnly
                    className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-strong)] px-3 py-2 text-sm"
                  />
                </label>

                {memberType === 'university' ? (
                  <>
                    <label className="text-sm text-[var(--text-muted)]">
                      University ID
                      <input
                        type="text"
                        value={form.universityId}
                        onChange={(event) => setForm((prev) => ({ ...prev, universityId: event.target.value }))}
                        className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm"
                        required
                      />
                    </label>
                    <label className="text-sm text-[var(--text-muted)]">
                      Department
                      <input
                        type="text"
                        value={form.department}
                        onChange={(event) =>
                          setForm((prev) => ({ ...prev, department: event.target.value.replace(/[0-9]/g, '') }))
                        }
                        className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm"
                        required
                      />
                    </label>
                  </>
                ) : (
                  <>
                    <label className="text-sm text-[var(--text-muted)]">
                      National ID (16 digits)
                      <input
                        type="text"
                        value={form.nationalId}
                        onChange={(event) =>
                          setForm((prev) => ({
                            ...prev,
                            nationalId: event.target.value.replace(/\D/g, '').slice(0, 16),
                          }))
                        }
                        className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm"
                        required
                      />
                    </label>
                    <label className="text-sm text-[var(--text-muted)]">
                      Address
                      <input
                        type="text"
                        value={form.address}
                        onChange={(event) => setForm((prev) => ({ ...prev, address: event.target.value }))}
                        className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm"
                        required
                      />
                    </label>
                  </>
                )}

                <label className="text-sm text-[var(--text-muted)]">
                  Plan
                  <select
                    value={form.membershipType}
                    onChange={(event) => setForm((prev) => ({ ...prev, membershipType: event.target.value }))}
                    className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm"
                  >
                    <option value="Monthly">Monthly</option>
                    <option value="3Months">3 Months</option>
                    <option value="6Months">6 Months</option>
                    <option value="1Year">1 Year</option>
                  </select>
                </label>
                <label className="text-sm text-[var(--text-muted)]">
                  Gender
                  <select
                    value={form.gender}
                    onChange={(event) => setForm((prev) => ({ ...prev, gender: event.target.value }))}
                    className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </label>
              </div>

              <div className="mt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-full border border-[var(--border)] px-4 py-2 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-black"
                >
                  Save Member
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  )
}
