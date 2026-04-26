import { NavLink, Outlet, Navigate, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Inbox, LogOut, Menu, X, FileEdit, Package, Settings, ExternalLink, BarChart2, Handshake, MapPin } from 'lucide-react'
import { useState } from 'react'
import { useAdminAuth } from '../../contexts/AdminAuth'

const navItems = [
  { to: '/admin/dashboard',  icon: <LayoutDashboard size={18} />, label: 'Dashboard'  },
  { to: '/admin/analytics',  icon: <BarChart2 size={18} />,       label: 'Analytics'  },
  { to: '/admin/leads',      icon: <Inbox size={18} />,           label: 'Leads'      },
  { to: '/admin/content',    icon: <FileEdit size={18} />,        label: 'Content'    },
  { to: '/admin/products',   icon: <Package size={18} />,         label: 'Products'   },
  { to: '/admin/partners',      icon: <Handshake size={18} />, label: 'Partners'      },
  { to: '/admin/map-locations', icon: <MapPin size={18} />,    label: 'Map Locations' },
  { to: '/admin/settings',   icon: <Settings size={18} />,        label: 'Settings'   },
]

export default function AdminLayout() {
  const { token, admin, logout } = useAdminAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (!token) return <Navigate to="/admin/login" replace />

  function handleLogout() {
    logout()
    navigate('/admin/login')
  }

  const Sidebar = () => (
    <aside className="flex flex-col h-full bg-white border-r border-gray-200 w-64">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-gray-100">
        <img src="/logo.png" alt="Agrotech" className="h-9 w-auto" />
        <div className="leading-tight">
          <div className="text-xs font-bold text-gray-900">Agrotech Global</div>
          <div className="text-[10px] text-[#0d5c2e] font-semibold uppercase tracking-widest">Admin</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
        {navItems.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-[#0d5c2e] text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`
            }
          >
            {icon}
            {label}
          </NavLink>
        ))}
      </nav>

      {/* View Site */}
      <div className="px-3 pb-2">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
        >
          <ExternalLink size={18} />
          View Site
        </a>
      </div>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-gray-100">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-[#0d5c2e] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            {admin?.name?.[0] ?? 'A'}
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-gray-800 truncate">{admin?.name ?? 'Admin'}</div>
            <div className="text-[10px] text-gray-400 truncate">{admin?.email}</div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut size={16} />
          Log out
        </button>
      </div>
    </aside>
  )

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden md:flex flex-col h-full">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="flex flex-col h-full">
            <Sidebar />
          </div>
          <div className="flex-1 bg-black/40" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-200">
          <button onClick={() => setSidebarOpen(true)} className="p-1 text-gray-600">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <span className="font-semibold text-gray-900 text-sm">Admin Panel</span>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
