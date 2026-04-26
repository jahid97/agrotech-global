import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

interface AdminUser { id: string; name: string | null; email: string }

interface AdminAuthState {
  token: string | null
  admin: AdminUser | null
}

interface AdminAuthCtx extends AdminAuthState {
  login: (token: string, admin: AdminUser) => void
  logout: () => void
}

const Ctx = createContext<AdminAuthCtx>({
  token: null, admin: null,
  login: () => {}, logout: () => {},
})

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AdminAuthState>(() => {
    try {
      const token = localStorage.getItem('admin_token')
      const raw   = localStorage.getItem('admin_user')
      return { token, admin: raw ? JSON.parse(raw) : null }
    } catch {
      return { token: null, admin: null }
    }
  })

  function login(token: string, admin: AdminUser) {
    localStorage.setItem('admin_token', token)
    localStorage.setItem('admin_user', JSON.stringify(admin))
    setState({ token, admin })
  }

  function logout() {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    setState({ token: null, admin: null })
  }

  return <Ctx.Provider value={{ ...state, login, logout }}>{children}</Ctx.Provider>
}

export const useAdminAuth = () => useContext(Ctx)
