import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { login as apiLogin, logout as apiLogout, me as apiMe, register as apiRegister } from '../lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [sessionExpired, setSessionExpired] = useState(false)

  useEffect(() => {
    let active = true

    const loadUser = async () => {
      setLoading(true)
      try {
        const data = await apiMe()
        if (active) {
          setUser(data.user)
          if (data?.user?.role) {
            window.localStorage.setItem('dbu-last-role', data.user.role)
          }
          setSessionExpired(false)
        }
      } catch {
        if (active) {
          setUser(null)
          const hadRole = !!window.localStorage.getItem('dbu-last-role')
          setSessionExpired(hadRole)
        }
      } finally {
        if (active) setLoading(false)
      }
    }

    loadUser()

    return () => {
      active = false
    }
  }, [])

  const refreshUser = async () => {
    setLoading(true)
    try {
      const data = await apiMe()
      setUser(data.user)
      if (data?.user?.role) {
        window.localStorage.setItem('dbu-last-role', data.user.role)
      }
      setSessionExpired(false)
      return data.user
    } catch {
      setUser(null)
      const hadRole = !!window.localStorage.getItem('dbu-last-role')
      setSessionExpired(hadRole)
      window.localStorage.removeItem('dbu-last-role')
      return null
    } finally {
      setLoading(false)
    }
  }

  const role = useMemo(() => {
    if (user?.role) return user.role
    const cached = window.localStorage.getItem('dbu-last-role')
    return cached || null
  }, [user])

  const login = async (payload) => {
    const data = await apiLogin(payload)
    setUser(data.user)
    setSessionExpired(false)
    if (data?.user?.role) {
      window.localStorage.setItem('dbu-last-role', data.user.role)
    }
    return data.user
  }

  const register = async (payload) => {
    const data = await apiRegister(payload)
    setUser(data.user)
    setSessionExpired(false)
    if (data?.user?.role) {
      window.localStorage.setItem('dbu-last-role', data.user.role)
    }
    return data.user
  }

  const logout = async () => {
    await apiLogout()
    setUser(null)
    setSessionExpired(false)
    window.localStorage.removeItem('dbu-last-role')
  }

  const value = useMemo(
    () => ({
      user,
      role,
      loading,
      login,
      register,
      logout,
      refreshUser,
      sessionExpired,
      clearSessionExpired: () => setSessionExpired(false),
    }),
    [user, role, loading, sessionExpired]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
