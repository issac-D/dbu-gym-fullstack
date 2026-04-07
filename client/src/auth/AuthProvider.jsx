import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { login as apiLogin, logout as apiLogout, me as apiMe, register as apiRegister } from '../lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    const loadUser = async () => {
      setLoading(true)
      try {
        const data = await apiMe()
        if (active) setUser(data.user)
      } catch {
        if (active) setUser(null)
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
      return data.user
    } catch {
      setUser(null)
      return null
    } finally {
      setLoading(false)
    }
  }

  const role = useMemo(() => {
    if (!user?.role) return null
    return user.role
  }, [user])

  const login = async (payload) => {
    const data = await apiLogin(payload)
    setUser(data.user)
    return data.user
  }

  const register = async (payload) => {
    const data = await apiRegister(payload)
    setUser(data.user)
    return data.user
  }

  const logout = async () => {
    await apiLogout()
    setUser(null)
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
    }),
    [user, role, loading]
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
