import { useEffect, useRef } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './AuthProvider'

export default function ProtectedRoute({ role }) {
  const { user, loading, role: userRole, refreshUser } = useAuth()
  const hasRefreshed = useRef(false)

  useEffect(() => {
    if (hasRefreshed.current) return
    hasRefreshed.current = true
    refreshUser()
  }, [refreshUser])

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex items-center justify-center">
        Loading...
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (role && userRole !== role) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
