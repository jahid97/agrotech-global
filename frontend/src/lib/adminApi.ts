const BASE = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api'

function authHeaders(): HeadersInit {
  const token = localStorage.getItem('admin_token')
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

async function handle(res: Response) {
  if (res.status === 204) return null
  const text = await res.text()
  if (!text || !text.trim()) {
    if (!res.ok) throw new Error(`Request failed (${res.status})`)
    return null
  }
  let data: any
  try { data = JSON.parse(text) } catch { throw new Error('Invalid server response') }
  if (!res.ok) throw new Error(data?.error ?? 'Request failed')
  return data
}

export const adminApi = {
  login: (email: string, password: string) =>
    fetch(`${BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }).then(handle),

  me: () =>
    fetch(`${BASE}/auth/me`, { headers: authHeaders() }).then(handle),

  getDashboard: () =>
    fetch(`${BASE}/admin/dashboard`, { headers: authHeaders() }).then(handle),

  getLeads: () =>
    fetch(`${BASE}/leads`, { headers: authHeaders() }).then(handle),

  markRead: (id: string) =>
    fetch(`${BASE}/leads/${id}/read`, {
      method: 'PATCH',
      headers: authHeaders(),
    }).then(handle),

  deleteLead: (id: string) =>
    fetch(`${BASE}/leads/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    }).then(handle),

  getContent: (): Promise<Record<string, string>> =>
    fetch(`${BASE}/content`).then(handle),

  updateContent: (updates: { key: string; value: string }[]) =>
    fetch(`${BASE}/content`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify({ updates }),
    }).then(handle),

  uploadImage: (file: File): Promise<{ url: string }> => {
    const token = localStorage.getItem('admin_token')
    const form = new FormData()
    form.append('file', file)
    return fetch(`${BASE}/upload`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: form,
    }).then(handle)
  },

  // Products
  getProducts: () =>
    fetch(`${BASE}/products/all`, { headers: authHeaders() }).then(handle),

  createProduct: (data: object) =>
    fetch(`${BASE}/products`, {
      method: 'POST', headers: authHeaders(), body: JSON.stringify(data),
    }).then(handle),

  updateProduct: (id: string, data: object) =>
    fetch(`${BASE}/products/${id}`, {
      method: 'PUT', headers: authHeaders(), body: JSON.stringify(data),
    }).then(handle),

  deleteProduct: (id: string) =>
    fetch(`${BASE}/products/${id}`, {
      method: 'DELETE', headers: authHeaders(),
    }).then(handle),

  reorderProducts: (order: string[]) =>
    fetch(`${BASE}/products/reorder`, {
      method: 'POST', headers: authHeaders(), body: JSON.stringify({ order }),
    }).then(handle),

  seedProducts: () =>
    fetch(`${BASE}/products/seed`, {
      method: 'POST', headers: authHeaders(),
    }).then(handle),

  // Partners
  getPartners: () =>
    fetch(`${BASE}/partners/all`, { headers: authHeaders() }).then(handle),

  createPartner: (data: object) =>
    fetch(`${BASE}/partners`, {
      method: 'POST', headers: authHeaders(), body: JSON.stringify(data),
    }).then(handle),

  updatePartner: (id: string, data: object) =>
    fetch(`${BASE}/partners/${id}`, {
      method: 'PUT', headers: authHeaders(), body: JSON.stringify(data),
    }).then(handle),

  deletePartner: (id: string) =>
    fetch(`${BASE}/partners/${id}`, {
      method: 'DELETE', headers: authHeaders(),
    }).then(handle),

  reorderPartners: (order: string[]) =>
    fetch(`${BASE}/partners/reorder`, {
      method: 'POST', headers: authHeaders(), body: JSON.stringify({ order }),
    }).then(handle),

  seedPartners: () =>
    fetch(`${BASE}/partners/seed`, {
      method: 'POST', headers: authHeaders(),
    }).then(handle),

  // Map locations
  getMapLocations: () =>
    fetch(`${BASE}/map-locations/all`, { headers: authHeaders() }).then(handle),

  createMapLocation: (data: object) =>
    fetch(`${BASE}/map-locations`, {
      method: 'POST', headers: authHeaders(), body: JSON.stringify(data),
    }).then(handle),

  updateMapLocation: (id: string, data: object) =>
    fetch(`${BASE}/map-locations/${id}`, {
      method: 'PUT', headers: authHeaders(), body: JSON.stringify(data),
    }).then(handle),

  deleteMapLocation: (id: string) =>
    fetch(`${BASE}/map-locations/${id}`, {
      method: 'DELETE', headers: authHeaders(),
    }).then(handle),

  seedMapLocations: () =>
    fetch(`${BASE}/map-locations/seed`, {
      method: 'POST', headers: authHeaders(),
    }).then(handle),

  // Analytics
  getAnalytics: () =>
    fetch(`${BASE}/analytics/summary`, { headers: authHeaders() }).then(handle),

  purgeAnalytics: (): Promise<{ count: number; rows: object[] }> =>
    fetch(`${BASE}/analytics/purge`, {
      method: 'POST', headers: authHeaders(),
    }).then(handle),

  // Auth
  changePassword: (currentPassword: string, newPassword: string) =>
    fetch(`${BASE}/auth/password`, {
      method: 'PATCH', headers: authHeaders(),
      body: JSON.stringify({ currentPassword, newPassword }),
    }).then(handle),
}
