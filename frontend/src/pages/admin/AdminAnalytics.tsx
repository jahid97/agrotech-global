import { useEffect, useState } from 'react'
import { adminApi } from '../../lib/adminApi'
import {
  Loader2, Eye, Users, TrendingUp, Calendar,
  Globe, FileText, RefreshCw, Clock, Trash2, Download, AlertTriangle, CheckCircle2,
} from 'lucide-react'

/* ─── Types ──────────────────────────────────────────────────── */
interface DailyView  { date: string; views: number }
interface TopPage    { path: string; views: number }
interface TopRef     { referrer: string; views: number }
interface Activity   { id: string; path: string; referrer: string | null; userAgent: string | null; createdAt: string }

interface Summary {
  totalViews: number; viewsToday: number; views7d: number; views30d: number
  uniqueVisitors30d: number
  topPages: TopPage[]; topReferrers: TopRef[]
  dailyViews: DailyView[]; recentActivity: Activity[]
}

/* ─── Helpers ────────────────────────────────────────────────── */
function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1)  return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

function friendlyPath(path: string) {
  if (path === '/') return 'Home'
  return path.replace(/^\//, '').replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
}

function friendlyRef(ref: string) {
  try {
    const url = new URL(ref)
    return url.hostname.replace(/^www\./, '')
  } catch {
    return ref || 'Direct'
  }
}

function parseDevice(ua: string | null) {
  if (!ua) return 'Unknown'
  if (/mobile|android|iphone|ipad/i.test(ua)) return 'Mobile'
  if (/tablet/i.test(ua)) return 'Tablet'
  return 'Desktop'
}

function parseBrowser(ua: string | null) {
  if (!ua) return ''
  if (/edg/i.test(ua))     return 'Edge'
  if (/chrome/i.test(ua))  return 'Chrome'
  if (/safari/i.test(ua))  return 'Safari'
  if (/firefox/i.test(ua)) return 'Firefox'
  return 'Other'
}

/* ─── Stat card ──────────────────────────────────────────────── */
function StatCard({ icon, label, value, sub, color }: {
  icon: React.ReactNode; label: string; value: number | string
  sub?: string; color: string
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>{icon}</div>
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-0.5">{value.toLocaleString()}</div>
      <div className="text-sm text-gray-500">{label}</div>
      {sub && <div className="text-xs text-gray-400 mt-1">{sub}</div>}
    </div>
  )
}

/* ─── Bar chart (last 30 days) ───────────────────────────────── */
function BarChart({ data }: { data: DailyView[] }) {
  const max = Math.max(...data.map(d => d.views), 1)
  const today = new Date().toISOString().slice(0, 10)

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-gray-900 text-sm">Page Views — Last 30 Days</h3>
        <span className="text-xs text-gray-400">{data.reduce((a, d) => a + d.views, 0).toLocaleString()} total</span>
      </div>
      <div className="flex items-end gap-0.5 h-28">
        {data.map(d => {
          const pct = (d.views / max) * 100
          const isToday = d.date === today
          return (
            <div key={d.date} className="group relative flex-1 flex flex-col items-center justify-end h-full" title={`${d.date}: ${d.views} views`}>
              <div
                className={`w-full rounded-t-sm transition-all ${isToday ? 'bg-[#0d5c2e]' : 'bg-[#0d5c2e]/25 group-hover:bg-[#0d5c2e]/50'}`}
                style={{ height: `${Math.max(pct, 2)}%` }}
              />
              {/* Tooltip on hover */}
              <div className="absolute bottom-full mb-1.5 bg-gray-900 text-white text-[10px] rounded px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                {d.date.slice(5)}: {d.views}
              </div>
            </div>
          )
        })}
      </div>
      <div className="flex justify-between mt-2 text-[10px] text-gray-400">
        <span>{data[0]?.date.slice(5)}</span>
        <span>{data[14]?.date.slice(5)}</span>
        <span>{data[29]?.date.slice(5)}</span>
      </div>
    </div>
  )
}

/* ─── Top list (pages / referrers) ──────────────────────────── */
function TopList({ title, icon, items, labelFn, maxVal }: {
  title: string; icon: React.ReactNode
  items: { label: string; views: number }[]
  labelFn?: (s: string) => string; maxVal: number
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-[#0d5c2e]">{icon}</span>
        <h3 className="font-bold text-gray-900 text-sm">{title}</h3>
        <span className="ml-auto text-xs text-gray-400">last 30 days</span>
      </div>
      {items.length === 0 ? (
        <p className="text-xs text-gray-400 text-center py-4">No data yet</p>
      ) : (
        <div className="space-y-3">
          {items.map((item, i) => {
            const pct = maxVal > 0 ? (item.views / maxVal) * 100 : 0
            const display = labelFn ? labelFn(item.label) : item.label
            return (
              <div key={i}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-700 font-medium truncate max-w-[70%]" title={item.label}>{display}</span>
                  <span className="text-gray-500 font-semibold ml-2 flex-shrink-0">{item.views.toLocaleString()}</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#0d5c2e] rounded-full transition-all" style={{ width: `${pct}%` }} />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

/* ─── Recent activity ────────────────────────────────────────── */
function RecentActivity({ rows }: { rows: Activity[] }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-5">
        <Clock size={15} className="text-[#0d5c2e]" />
        <h3 className="font-bold text-gray-900 text-sm">Recent Activity</h3>
        <span className="ml-auto flex items-center gap-1 text-xs text-gray-400">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
          Live
        </span>
      </div>
      {rows.length === 0 ? (
        <p className="text-xs text-gray-400 text-center py-4">No visits recorded yet</p>
      ) : (
        <div className="space-y-0 divide-y divide-gray-50">
          {rows.map(row => (
            <div key={row.id} className="flex items-center gap-3 py-2.5">
              {/* Device icon */}
              <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 text-gray-500">
                {parseDevice(row.userAgent) === 'Mobile' ? '📱' : '🖥️'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-semibold text-gray-800">{friendlyPath(row.path)}</span>
                  <span className="text-[10px] bg-gray-100 text-gray-500 rounded px-1.5 py-0.5">{parseBrowser(row.userAgent)}</span>
                </div>
                {row.referrer && (
                  <div className="text-[10px] text-gray-400 truncate">from {friendlyRef(row.referrer)}</div>
                )}
              </div>
              <span className="text-[10px] text-gray-400 whitespace-nowrap flex-shrink-0">{timeAgo(row.createdAt)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ─── Purge confirm modal ────────────────────────────────────── */
function PurgeModal({
  totalViews, onConfirm, onCancel, purging,
}: {
  totalViews: number
  onConfirm: () => void
  onCancel: () => void
  purging: boolean
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl w-full max-w-md p-6">
        {/* Icon */}
        <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle size={22} className="text-red-500" />
        </div>

        <h2 className="text-lg font-bold text-gray-900 text-center mb-1">Clear all analytics?</h2>
        <p className="text-sm text-gray-500 text-center mb-5">
          This will permanently delete{' '}
          <span className="font-semibold text-gray-800">{totalViews.toLocaleString()} page view{totalViews !== 1 ? 's' : ''}</span>{' '}
          from the database. A JSON backup will be downloaded automatically before deletion.
        </p>

        {/* What happens */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-5 space-y-1.5">
          <div className="flex items-center gap-2 text-xs text-amber-800">
            <Download size={12} className="flex-shrink-0" />
            <span>Your browser will download <strong>analytics-export.json</strong></span>
          </div>
          <div className="flex items-center gap-2 text-xs text-amber-800">
            <Trash2 size={12} className="flex-shrink-0" />
            <span>All records are then permanently removed</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onCancel}
            disabled={purging}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={purging}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors disabled:opacity-60"
          >
            {purging
              ? <><Loader2 size={14} className="animate-spin" /> Exporting &amp; clearing…</>
              : <><Download size={14} /> Export &amp; clear</>
            }
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─── Main page ──────────────────────────────────────────────── */
export default function AdminAnalytics() {
  const [data, setData]           = useState<Summary | null>(null)
  const [loading, setLoading]     = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [showPurge, setShowPurge] = useState(false)
  const [purging, setPurging]     = useState(false)
  const [toast, setToast]         = useState('')

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(''), 4000) }

  async function load(isRefresh = false) {
    if (isRefresh) setRefreshing(true)
    else setLoading(true)
    try {
      const d = await adminApi.getAnalytics()
      setData(d)
    } catch {}
    setLoading(false)
    setRefreshing(false)
  }

  useEffect(() => { load() }, [])

  async function handlePurge() {
    setPurging(true)
    try {
      const result = await adminApi.purgeAnalytics()

      // Build export payload
      const exportPayload = {
        exportedAt: new Date().toISOString(),
        totalRows: result.count,
        rows: result.rows,
      }

      // Auto-download JSON
      const blob = new Blob([JSON.stringify(exportPayload, null, 2)], { type: 'application/json' })
      const url  = URL.createObjectURL(blob)
      const a    = document.createElement('a')
      a.href     = url
      a.download = `analytics-export-${new Date().toISOString().slice(0, 10)}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      setShowPurge(false)
      showToast(`Exported ${result.count.toLocaleString()} records and cleared analytics.`)
      await load()
    } catch (e: any) {
      showToast(e.message ?? 'Purge failed')
    } finally {
      setPurging(false)
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 size={28} className="animate-spin text-[#0d5c2e]" />
    </div>
  )

  if (!data) return (
    <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-sm text-red-600">
      Failed to load analytics. Make sure the backend is running.
    </div>
  )

  const topPagesMax  = data.topPages[0]?.views ?? 1
  const topRefsMax   = data.topReferrers[0]?.views ?? 1

  return (
    <div>
      {showPurge && (
        <PurgeModal
          totalViews={data.totalViews}
          onConfirm={handlePurge}
          onCancel={() => !purging && setShowPurge(false)}
          purging={purging}
        />
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-500 text-sm mt-1">Real visitor data tracked directly on your server.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => load(true)}
            disabled={refreshing}
            className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 border border-gray-200 hover:border-gray-400 px-4 py-2 rounded-xl transition-colors disabled:opacity-50"
          >
            <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
            Refresh
          </button>
          <button
            onClick={() => setShowPurge(true)}
            className="flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-700 border border-red-200 hover:border-red-400 hover:bg-red-50 px-4 py-2 rounded-xl transition-colors"
          >
            <Trash2 size={14} />
            Clear data
          </button>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm mb-5">
          <CheckCircle2 size={15} /> {toast}
        </div>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <StatCard icon={<Eye size={18} />}       label="Total views"    value={data.totalViews}       color="bg-[#0d5c2e]/10 text-[#0d5c2e]" />
        <StatCard icon={<Calendar size={18} />}  label="Today"          value={data.viewsToday}       color="bg-blue-50 text-blue-600" />
        <StatCard icon={<TrendingUp size={18} />} label="Last 7 days"   value={data.views7d}          color="bg-amber-50 text-amber-600" />
        <StatCard icon={<Globe size={18} />}      label="Last 30 days"  value={data.views30d}         color="bg-purple-50 text-purple-600" />
        <StatCard icon={<Users size={18} />}      label="Unique visitors" value={data.uniqueVisitors30d} sub="last 30 days" color="bg-teal-50 text-teal-600" />
      </div>

      {/* Bar chart */}
      <div className="mb-6">
        <BarChart data={data.dailyViews} />
      </div>

      {/* Top pages + referrers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <TopList
          title="Top Pages"
          icon={<FileText size={15} />}
          items={data.topPages.map(p => ({ label: p.path, views: p.views }))}
          labelFn={friendlyPath}
          maxVal={topPagesMax}
        />
        <TopList
          title="Top Referrers"
          icon={<Globe size={15} />}
          items={data.topReferrers.map(r => ({ label: r.referrer, views: r.views }))}
          labelFn={friendlyRef}
          maxVal={topRefsMax}
        />
      </div>

      {/* Recent activity */}
      <RecentActivity rows={data.recentActivity} />
    </div>
  )
}
