import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Inbox, MailOpen, CalendarDays, ArrowRight, Loader2 } from 'lucide-react'
import { adminApi } from '../../lib/adminApi'

interface Lead {
  id: string; name: string; email: string; phone: string | null
  message: string; isRead: boolean; createdAt: string
}

interface DashboardData {
  totalLeads: number; unreadLeads: number; leadsThisMonth: number
  recentLeads: Lead[]
}

function StatCard({ icon, label, value, color }: {
  icon: React.ReactNode; label: string; value: number | string; color: string
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
        {icon}
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <div className="text-sm text-gray-500">{label}</div>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const [data, setData]     = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]   = useState('')

  useEffect(() => {
    adminApi.getDashboard()
      .then(setData)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 size={28} className="animate-spin text-[#0d5c2e]" />
    </div>
  )

  if (error) return (
    <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-6 text-sm">{error}</div>
  )

  if (!data) return null

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Overview of your site activity</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard
          icon={<Inbox size={20} />}
          label="Total Leads"
          value={data.totalLeads}
          color="bg-[#0d5c2e]/10 text-[#0d5c2e]"
        />
        <StatCard
          icon={<MailOpen size={20} />}
          label="Unread Leads"
          value={data.unreadLeads}
          color="bg-amber-50 text-amber-600"
        />
        <StatCard
          icon={<CalendarDays size={20} />}
          label="This Month"
          value={data.leadsThisMonth}
          color="bg-blue-50 text-blue-600"
        />
      </div>

      {/* Recent leads */}
      <div className="bg-white rounded-2xl border border-gray-100">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Recent Leads</h2>
          <Link
            to="/admin/leads"
            className="flex items-center gap-1 text-sm text-[#0d5c2e] font-medium hover:gap-2 transition-all"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>

        {data.recentLeads.length === 0 ? (
          <div className="px-6 py-12 text-center text-sm text-gray-400">No leads yet</div>
        ) : (
          <div className="divide-y divide-gray-50">
            {data.recentLeads.map(lead => (
              <div key={lead.id} className="flex items-start gap-4 px-6 py-4">
                <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-600 flex-shrink-0">
                  {lead.name[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-gray-900">{lead.name}</span>
                    {!lead.isRead && (
                      <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
                    )}
                  </div>
                  <div className="text-xs text-gray-500 truncate">{lead.email}</div>
                  <div className="text-xs text-gray-400 mt-0.5 truncate">{lead.message}</div>
                </div>
                <div className="text-xs text-gray-400 whitespace-nowrap flex-shrink-0">
                  {new Date(lead.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
