import { useEffect, useState } from 'react'
import { adminApi } from '../../lib/adminApi'
import {
  Loader2, Plus, Pencil, Trash2, Save, X,
  CheckCircle2, AlertCircle, Eye, EyeOff, MapPin,
} from 'lucide-react'

interface MapLocation {
  id: string; name: string; longitude: number; latitude: number
  color: string; tooltip: string; isVisible: boolean; position: number
}

const inp = 'w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0d5c2e]/20 focus:border-[#0d5c2e] transition'

const PRESET_COLORS = [
  '#f59e0b', '#0d5c2e', '#1d4ed8', '#7c3aed',
  '#be123c', '#0f766e', '#374151', '#b45309',
]

/* ─── Form ───────────────────────────────────────────────────── */
function LocationForm({
  initial: init,
  onSave,
  onCancel,
}: {
  initial: Partial<MapLocation>
  onSave: (data: Partial<MapLocation>) => Promise<void>
  onCancel: () => void
}) {
  const [form, setForm] = useState({
    name:      init.name      ?? '',
    longitude: init.longitude?.toString() ?? '',
    latitude:  init.latitude?.toString()  ?? '',
    color:     init.color     ?? '#f59e0b',
    tooltip:   init.tooltip   ?? '',
  })
  const [saving, setSaving] = useState(false)
  const [err, setErr]       = useState('')

  function set(k: keyof typeof form, v: string) { setForm(p => ({ ...p, [k]: v })) }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name.trim()) { setErr('Name is required'); return }
    const lon = parseFloat(form.longitude)
    const lat = parseFloat(form.latitude)
    if (isNaN(lon) || lon < -180 || lon > 180) { setErr('Longitude must be between -180 and 180'); return }
    if (isNaN(lat) || lat < -90  || lat > 90)  { setErr('Latitude must be between -90 and 90');   return }
    setSaving(true); setErr('')
    try {
      await onSave({ ...form, longitude: lon, latitude: lat })
    } catch (e: any) { setErr(e.message ?? 'Save failed') }
    finally { setSaving(false) }
  }

  return (
    <form onSubmit={submit} className="bg-gray-50 rounded-2xl border border-gray-200 p-5 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Country / Place *</label>
          <input className={inp} value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. India" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Tooltip label</label>
          <input className={inp} value={form.tooltip} onChange={e => set('tooltip', e.target.value)} placeholder="e.g. Tex Biosciences · Zenex" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Longitude <span className="normal-case font-normal text-gray-400">(-180 to 180)</span>
          </label>
          <input className={inp} type="number" step="0.01" min="-180" max="180"
            value={form.longitude} onChange={e => set('longitude', e.target.value)} placeholder="78.96" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Latitude <span className="normal-case font-normal text-gray-400">(-90 to 90)</span>
          </label>
          <input className={inp} type="number" step="0.01" min="-90" max="90"
            value={form.latitude} onChange={e => set('latitude', e.target.value)} placeholder="20.59" />
        </div>
      </div>

      {/* Quick coordinate reference */}
      <div className="text-xs text-gray-400 bg-blue-50 border border-blue-100 rounded-xl px-3 py-2">
        <span className="font-semibold text-blue-600">Tip:</span> Use{' '}
        <a href="https://www.latlong.net" target="_blank" rel="noopener noreferrer" className="underline text-blue-500">latlong.net</a>
        {' '}or Google Maps (right-click → copy coordinates) to find exact lat/lng for any location.
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Dot colour</label>
        <div className="flex items-center gap-2 flex-wrap">
          {PRESET_COLORS.map(c => (
            <button key={c} type="button" onClick={() => set('color', c)}
              className={`w-7 h-7 rounded-full border-2 transition-all ${form.color === c ? 'border-gray-800 scale-110' : 'border-transparent hover:scale-105'}`}
              style={{ backgroundColor: c }} />
          ))}
          <div className="flex items-center gap-1.5 ml-1">
            <input type="color" value={form.color} onChange={e => set('color', e.target.value)}
              className="w-7 h-7 rounded cursor-pointer border border-gray-200" />
            <span className="text-xs text-gray-400">Custom</span>
          </div>
        </div>
      </div>

      {err && <p className="flex items-center gap-1.5 text-red-500 text-sm"><AlertCircle size={13} />{err}</p>}

      <div className="flex items-center gap-3 pt-1">
        <button type="submit" disabled={saving}
          className="flex items-center gap-2 bg-[#0d5c2e] hover:bg-[#1a7a3f] text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors disabled:opacity-60">
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          {saving ? 'Saving…' : 'Save location'}
        </button>
        <button type="button" onClick={onCancel}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 font-medium px-3 py-2">
          <X size={14} /> Cancel
        </button>
      </div>
    </form>
  )
}

/* ─── Main page ──────────────────────────────────────────────── */
export default function AdminMapLocations() {
  const [locations, setLocations]   = useState<MapLocation[]>([])
  const [loading, setLoading]       = useState(true)
  const [loadErr, setLoadErr]       = useState('')
  const [creating, setCreating]     = useState(false)
  const [editId, setEditId]         = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [toast, setToast]           = useState('')

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(''), 3000) }

  useEffect(() => {
    adminApi.getMapLocations()
      .then(d => setLocations(d ?? []))
      .catch(e => setLoadErr(e.message ?? 'Failed to load'))
      .finally(() => setLoading(false))
  }, [])

  async function seed() {
    try { const d = await adminApi.seedMapLocations(); setLocations(d); showToast('Default location loaded') }
    catch (e: any) { showToast(e.message ?? 'Failed') }
  }

  async function toggleVisible(loc: MapLocation) {
    const updated = await adminApi.updateMapLocation(loc.id, { isVisible: !loc.isVisible })
    setLocations(prev => prev.map(x => x.id === loc.id ? { ...x, ...updated } : x))
  }

  async function handleCreate(data: Partial<MapLocation>) {
    const created = await adminApi.createMapLocation(data)
    setLocations(prev => [...prev, created])
    setCreating(false); showToast('Location added')
  }

  async function handleUpdate(id: string, data: Partial<MapLocation>) {
    const updated = await adminApi.updateMapLocation(id, data)
    setLocations(prev => prev.map(x => x.id === id ? { ...x, ...updated } : x))
    setEditId(null); showToast('Location updated')
  }

  async function handleDelete(id: string) {
    setDeletingId(id)
    try {
      await adminApi.deleteMapLocation(id)
      setLocations(prev => prev.filter(x => x.id !== id))
      showToast('Location deleted')
    } finally { setDeletingId(null) }
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 size={28} className="animate-spin text-[#0d5c2e]" />
    </div>
  )

  if (loadErr) return (
    <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-sm text-red-600">
      Failed to load map locations: {loadErr}. Make sure the backend is running.
    </div>
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Map Locations</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage the import-origin dots shown on the world map on the About page.
          </p>
        </div>
        <button
          onClick={() => { setCreating(true); setEditId(null) }}
          className="flex items-center gap-2 bg-[#0d5c2e] hover:bg-[#1a7a3f] text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors"
        >
          <Plus size={16} /> Add Location
        </button>
      </div>

      {toast && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm mb-4">
          <CheckCircle2 size={15} /> {toast}
        </div>
      )}

      {/* Empty state */}
      {locations.length === 0 && !creating && (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <MapPin size={36} className="mx-auto text-gray-300 mb-3" />
          <p className="font-semibold text-gray-700 mb-1">No map locations yet</p>
          <p className="text-sm text-gray-400 mb-5">Load the default (India) or add your own.</p>
          <button onClick={seed}
            className="inline-flex items-center gap-2 bg-[#0d5c2e] text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-[#1a7a3f] transition-colors">
            Load default location
          </button>
        </div>
      )}

      {creating && (
        <div className="mb-4">
          <LocationForm initial={{}} onSave={handleCreate} onCancel={() => setCreating(false)} />
        </div>
      )}

      <div className="space-y-3">
        {locations.map(loc => (
          <div key={loc.id}>
            <div className={`bg-white rounded-2xl border ${loc.isVisible ? 'border-gray-100' : 'border-dashed border-gray-200 opacity-60'} p-4 flex items-center gap-4`}>
              {/* Colour dot */}
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: loc.color + '22', border: `2px solid ${loc.color}` }}>
                <MapPin size={16} style={{ color: loc.color }} />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-sm text-gray-900">{loc.name}</span>
                  {!loc.isVisible && (
                    <span className="text-[10px] text-gray-400 bg-gray-100 rounded-full px-2 py-0.5">Hidden</span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-0.5">
                  {loc.latitude.toFixed(4)}°, {loc.longitude.toFixed(4)}°
                  {loc.tooltip && <span className="ml-2 text-gray-300">·</span>}
                  {loc.tooltip && <span className="ml-2">{loc.tooltip}</span>}
                </p>
              </div>

              {/* Dot colour preview */}
              <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: loc.color }} />

              {/* Actions */}
              <div className="flex items-center gap-1 flex-shrink-0">
                <button onClick={() => toggleVisible(loc)} title={loc.isVisible ? 'Hide' : 'Show'}
                  className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
                  {loc.isVisible ? <Eye size={15} /> : <EyeOff size={15} />}
                </button>
                <button onClick={() => { setEditId(editId === loc.id ? null : loc.id); setCreating(false) }}
                  className="p-2 rounded-lg text-gray-400 hover:text-[#0d5c2e] hover:bg-green-50 transition-colors">
                  <Pencil size={15} />
                </button>
                <button onClick={() => handleDelete(loc.id)} disabled={deletingId === loc.id}
                  className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50">
                  {deletingId === loc.id ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
                </button>
              </div>
            </div>

            {editId === loc.id && (
              <div className="mt-2 ml-6">
                <LocationForm
                  initial={loc}
                  onSave={data => handleUpdate(loc.id, data)}
                  onCancel={() => setEditId(null)}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
