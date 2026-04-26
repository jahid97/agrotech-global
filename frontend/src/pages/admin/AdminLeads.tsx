import { useEffect, useState } from 'react'
import { CheckCheck, Trash2, Loader2, MailOpen, Mail } from 'lucide-react'
import { adminApi } from '../../lib/adminApi'

interface Lead {
  id: string; name: string; email: string; phone: string | null
  message: string; isRead: boolean; createdAt: string
}

type Filter = 'all' | 'unread' | 'read'

export default function AdminLeads() {
  const [leads, setLeads]     = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState('')
  const [filter, setFilter]   = useState<Filter>('all')
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    adminApi.getLeads()
      .then(setLeads)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  async function handleMarkRead(id: string) {
    try {
      const updated = await adminApi.markRead(id)
      setLeads(prev => prev.map(l => l.id === id ? { ...l, isRead: updated.isRead } : l))
    } catch (e: any) {
      alert(e.message)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this lead?')) return
    try {
      await adminApi.deleteLead(id)
      setLeads(prev => prev.filter(l => l.id !== id))
    } catch (e: any) {
      alert(e.message)
    }
  }

  const filtered = leads.filter(l =>
    filter === 'all' ? true : filter === 'unread' ? !l.isRead : l.isRead
  )
  const unreadCount = leads.filter(l => !l.isRead).length

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 size={28} className="animate-spin text-[#0d5c2e]" />
    </div>
  )

  if (error) return (
    <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-6 text-sm">{error}</div>
  )

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
          <p className="text-sm text-gray-500 mt-1">
            {leads.length} total &middot; {unreadCount} unread
          </p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit mb-6">
        {(['all', 'unread', 'read'] as Filter[]).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize ${
              filter === f ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {f}
            {f === 'unread' && unreadCount > 0 && (
              <span className="ml-1.5 bg-amber-400 text-white text-xs px-1.5 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Leads list */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 px-6 py-16 text-center text-sm text-gray-400">
          No leads found
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(lead => (
            <div
              key={lead.id}
              className={`bg-white rounded-2xl border transition-all ${
                !lead.isRead ? 'border-amber-200 shadow-sm' : 'border-gray-100'
              }`}
            >
              {/* Row header */}
              <div
                className="flex items-start gap-4 p-5 cursor-pointer"
                onClick={() => setExpanded(expanded === lead.id ? null : lead.id)}
              >
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-600 flex-shrink-0">
                  {lead.name[0].toUpperCase()}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-sm text-gray-900">{lead.name}</span>
                    {!lead.isRead && (
                      <span className="text-[10px] bg-amber-100 text-amber-700 font-semibold px-2 py-0.5 rounded-full">New</span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">{lead.email}{lead.phone ? ` · ${lead.phone}` : ''}</div>
                  <div className="text-xs text-gray-400 mt-1 line-clamp-1">{lead.message}</div>
                </div>

                {/* Date + actions */}
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <span className="text-xs text-gray-400">
                    {new Date(lead.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                  <div className="flex items-center gap-1">
                    {!lead.isRead && (
                      <button
                        onClick={e => { e.stopPropagation(); handleMarkRead(lead.id) }}
                        title="Mark as read"
                        className="p-1.5 rounded-lg text-gray-400 hover:bg-green-50 hover:text-[#0d5c2e] transition-colors"
                      >
                        <CheckCheck size={15} />
                      </button>
                    )}
                    <button
                      onClick={e => { e.stopPropagation(); handleDelete(lead.id) }}
                      title="Delete"
                      className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanded message */}
              {expanded === lead.id && (
                <div className="px-5 pb-5 pt-0 border-t border-gray-50 mt-0">
                  <div className="flex items-center gap-2 mb-2 mt-3">
                    {lead.isRead
                      ? <MailOpen size={13} className="text-gray-400" />
                      : <Mail size={13} className="text-amber-500" />}
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Message</span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{lead.message}</p>
                  {lead.email && (
                    <a
                      href={`mailto:${lead.email}`}
                      className="inline-flex items-center gap-1.5 mt-4 text-xs font-semibold text-[#0d5c2e] hover:underline"
                    >
                      Reply to {lead.email}
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
