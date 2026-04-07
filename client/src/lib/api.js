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

export async function getAdminDashboard() {
  return request('/api/admin/dashboard', {
    method: 'GET',
  })
}

export async function getAdminMembers() {
  return request('/api/admin/members', {
    method: 'GET',
  })
}

export async function createAdminMember(payload) {
  return request('/api/admin/members', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function updateAdminMember(memberId, payload) {
  return request(`/api/admin/members/${memberId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}

export async function updateAdminMemberStatus(memberId, status) {
  return request(`/api/admin/members/${memberId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ account_status: status }),
  })
}

export async function getAdminApprovals() {
  return request('/api/admin/approvals', {
    method: 'GET',
  })
}

export async function approveMember(memberId) {
  return request(`/api/admin/approvals/${memberId}/approve`, {
    method: 'POST',
  })
}

export async function rejectMember(memberId, payload) {
  return request(`/api/admin/approvals/${memberId}/reject`, {
    method: 'POST',
    body: JSON.stringify(payload || {}),
  })
}

export async function getSystemSettings() {
  return request('/api/admin/settings', {
    method: 'GET',
  })
}

export async function updateSystemSettings(payload) {
  return request('/api/admin/settings', {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}

export async function uploadSystemLogo(file) {
  const formData = new FormData()
  formData.append('logo', file)

  const response = await fetch(`${API_BASE}/api/admin/settings/logo`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      ...(getCookie('XSRF-TOKEN')
        ? { 'X-XSRF-TOKEN': getCookie('XSRF-TOKEN') }
        : {}),
    },
    body: formData,
  })

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}))
    const message = errorBody.message || 'Upload failed'
    throw new Error(message)
  }

  return response.json()
}

export async function updateAdminPassword(payload) {
  return request('/api/admin/password', {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}

export async function uploadAdminAvatar(file) {
  const formData = new FormData()
  formData.append('avatar', file)

  const response = await fetch(`${API_BASE}/api/admin/profile/avatar`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      ...(getCookie('XSRF-TOKEN')
        ? { 'X-XSRF-TOKEN': getCookie('XSRF-TOKEN') }
        : {}),
    },
    body: formData,
  })

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}))
    const message = errorBody.message || 'Upload failed'
    throw new Error(message)
  }

  return response.json()
}

export async function getMemberProfile() {
  return request('/api/member/profile', {
    method: 'GET',
  })
}

export async function updateMemberProfile(payload) {
  return request('/api/member/profile', {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}

export async function updateMemberPassword(payload) {
  return request('/api/member/password', {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}

export async function getMemberDashboard() {
  return request('/api/member/dashboard', {
    method: 'GET',
  })
}

export async function renewMembership(payload) {
  return request('/api/member/renew', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function uploadMemberAvatar(file) {
  const formData = new FormData()
  formData.append('avatar', file)

  const response = await fetch(`${API_BASE}/api/member/profile/avatar`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      ...(getCookie('XSRF-TOKEN')
        ? { 'X-XSRF-TOKEN': getCookie('XSRF-TOKEN') }
        : {}),
    },
    body: formData,
  })

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}))
    const message = errorBody.message || 'Upload failed'
    throw new Error(message)
  }

  return response.json()
}
