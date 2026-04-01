const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'

function getCookie(name) {
  if (typeof document === 'undefined') return null
  const value = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`))
    ?.split('=')[1]
  return value ? decodeURIComponent(value) : null
}

async function request(path, options = {}) {
  const xsrfToken = getCookie('XSRF-TOKEN')
  const response = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(xsrfToken ? { 'X-XSRF-TOKEN': xsrfToken } : {}),
      'X-Requested-With': 'XMLHttpRequest',
      ...(options.headers || {}),
    },
    ...options,
  })

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}))
    const message = errorBody.message || 'Request failed'
    throw new Error(message)
  }

  if (response.status === 204) return null
  return response.json()
}

export async function getCsrfCookie() {
  await fetch(`${API_BASE}/sanctum/csrf-cookie`, {
    credentials: 'include',
  })
}

export async function login(payload) {
  await getCsrfCookie()
  return request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function register(payload) {
  await getCsrfCookie()
  return request('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function logout() {
  return request('/api/auth/logout', {
    method: 'POST',
  })
}

export async function me() {
  return request('/api/auth/me', {
    method: 'GET',
  })
}

export async function getAdminProfile() {
  return request('/api/admin/profile', {
    method: 'GET',
  })
}

export async function updateAdminProfile(payload) {
  return request('/api/admin/profile', {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}
