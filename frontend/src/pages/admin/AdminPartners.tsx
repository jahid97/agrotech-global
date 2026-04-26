import { useEffect, useRef, useState } from 'react'
import { adminApi } from '../../lib/adminApi'
import {
  Loader2, Plus, Pencil, Trash2, ChevronUp, ChevronDown,
  Eye, EyeOff, Save, X, CheckCircle2, AlertCircle,
  Handshake, Upload, ImageIcon,
} from 'lucide-react'

interface Partner {
  id: string; name: string; website: string | null; logoUrl: string | null
  initial: string; bgColor: string; position: number; isVisible: boolean
}

const PRESET_COLORS = [
  '#0d5c2e', '#1d4ed8', '#7c3aed', '#be123c',
  '#b45309', '#0f766e', '#374151', '#1e3a5f',
]

const inp = 'w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0d5c2e]/20 focus:border-[#0d5c2e] transition'

/* ─── Logo upload field ──────────────────────────────────────── */
function LogoField({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const ref = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [err, setErr] = useState('')

  async function handleFile(file: File) {
    setErr(''); setUploading(true)
    try {
      const { url } = await adminApi.uploadImage(file)
      onChange(url)
    } catch (e: any) { setErr(e.message ?? 'Upload failed') }
    finally { setUploading(false) }
  }

  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Logo image <span className="normal-case font-normal text-gray-400">(optional)</span></label>
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-xl border border-gray-200 bg-gray-50 overflow-hidden flex items-center justify-center flex-shrink-0">
          {value ? <img src={value} alt="logo" className="w-full h-full object-contain p-1" /> : <ImageIcon size={20} className="text-gray-300" />}
        </div>
        <div>
          <button type="button" onClick={() => ref.current?.click()} disabled={uploading}
            className="flex items-center gap-2 text-sm font-medium text-[#0d5c2e] border border-[#0d5c2e]/30 hover:bg-green-50 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50">
            {uploading ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
            {uploading ? 'Uploading…' : 'Upload logo'}
          </button>
          {value && <button type="button" onClick={() => onChange('')} className="ml-2 text-xs text-gray-400 hover:text-red-500 transition-colors">Remove</button>}
          {err && <p className="text-xs text-red-500 mt-1">{err}</p>}
        </div>
      </div>
      <input ref={ref} type="file" accept="image/*" className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }} />
    </div>
  )
}

/* ─── Partner form ───────────────────────────────────────────── */
function PartnerForm({
  initial: init, onSave, onCancel,
}: {
  initial: Partial<Partner>
  onSave: (data: Partial<Partner>) => Promise<void>
  onCancel: () => void
}) {
  const [form, setForm] = useState({
    name:    init.name    ?? '',
    website: init.website ?? '',
    initial: init.initial ?? '',
    bgColor: init.bgColor ?? '#0d5c2e',
    logoUrl: init.logoUrl ?? '',
  })
  const [saving, setSaving] = useState(false)
  const [err, setErr]       = useState('')

  function set(k: keyof typeof form, v: string) { setForm(p => ({ ...p, [k]: v })) }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name.trim()) { setErr('Name is required'); return }
    setSaving(true); setErr('')
    try {
      await onSave({
        ...form,
        logoUrl: form.logoUrl || null,
        website: form.website || null,
        initial: (form.initial || form.name.slice(0, 2)).toUpperCase(),
      })
    } catch (e: any) { setErr(e.message ?? 'Save failed') }
    finally { setSaving(false) }
  }

  return (
    <form onSubmit={submit} className="bg-gray-50 rounded-2xl border border-gray-200 p-5 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Partner name *</label>
          <input className={inp} value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Tex Biosciences" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Initials <span className="normal-case font-normal text-gray-400">(1–2 chars)</span></label>
          <input className={inp} value={form.initial} maxLength={2} onChange={e => set('initial', e.target.value)} placeholder="TB" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Website URL</label>
        <input className={inp} type="url" value={form.website} onChange={e => set('website', e.target.value)} placeholder="https://example.com" />
      </div>

      <LogoField value={form.logoUrl} onChange={v => set('logoUrl', v)} />

      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Badge colour</label>
        <div className="flex items-center gap-2 flex-wrap">
          {PRESET_COLORS.map(c => (
            <button key={c} type="button" onClick={() => set('bgColor', c)}
              className={`w-7 h-7 rounded-full border-2 transition-all ${form.bgColor === c ? 'border-gray-800 scale-110' : 'border-transparent hover:scale-105'}`}
              style={{ backgroundColor: c }} />
          ))}
          <div className="flex items-center gap-1.5 ml-1">
            <input type="color" value={form.bgColor} onChange={e => set('bgColor', e.target.value)}
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
          {saving ? 'Saving…' : 'Save partner'}
        </button>
        <button type="button" onClick={onCancel} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 font-medium px-3 py-2">
          <X size={14} /> Cancel
        </button>
      </div>
    </form>
  )
}

/* ─── Main page ──────────────────────────────────────────────── */
export default function AdminPartners() {
  const [partners, setPartners]   = useState<Partner[]>([])
  const [loading, setLoading]     = useState(true)
  const [editId, setEditId]       = useState<string | null>(null)
  const [creating, setCreating]   = useState(false)
  const [toast, setToast]         = useState('')
  const [deletingId, setDeletingId] = useState<string | null>(null)

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(''), 3000) }

  useEffect(() => {
    adminApi.getPartners()
      .then(setPartners).catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  async function seed() {
    try { const d = await adminApi.seedPartners(); setPartners(d); showToast('Default partners loaded') }
    catch (e: any) { showToast(e.message ?? 'Failed') }
  }

  async function toggleVisible(p: Partner) {
    const u = await adminApi.updatePartner(p.id, { isVisible: !p.isVisible })
    setPartners(prev => prev.map(x => x.id === p.id ? { ...x, ...u } : x))
  }

  async function move(i: number, dir: -1 | 1) {
    const next = [...partners]
    const swap = i + dir
    if (swap < 0 || swap >= next.length) return
    ;[next[i], next[swap]] = [next[swap], next[i]]
    const reordered = next.map((p, idx) => ({ ...p, position: idx }))
    setPartners(reordered)
    await adminApi.reorderPartners(reordered.map(p => p.id))
  }

  async function handleCreate(data: Partial<Partner>) {
    const created = await adminApi.createPartner(data)
    setPartners(prev => [...prev, created])
    setCreating(false); showToast('Partner added')
  }

  async function handleUpdate(id: string, data: Partial<Partner>) {
    const updated = await adminApi.updatePartner(id, data)
    setPartners(prev => prev.map(x => x.id === id ? { ...x, ...updated } : x))
    setEditId(null); showToast('Partner updated')
  }

  async function handleDelete(id: string) {
    setDeletingId(id)
    try { await adminApi.deletePartner(id); setPartners(prev => prev.filter(x => x.id !== id)); showToast('Partner deleted') }
    finally { setDeletingId(null) }
  }

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 size={28} className="animate-spin text-[#0d5c2e]" /></div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Partners</h1>
          <p className="text-gray-500 text-sm mt-1">Manage the partners shown in the horizontal scroll strip on the About page.</p>
        </div>
        <button onClick={() => { setCreating(true); setEditId(null) }}
          className="flex items-center gap-2 bg-[#0d5c2e] hover:bg-[#1a7a3f] text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors">
          <Plus size={16} /> Add Partner
        </button>
      </div>

      {toast && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm mb-4">
          <CheckCircle2 size={15} /> {toast}
        </div>
      )}

      {/* Empty state */}
      {partners.length === 0 && !creating && (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <Handshake size={36} className="mx-auto text-gray-300 mb-3" />
          <p className="font-semibold text-gray-700 mb-1">No partners yet</p>
          <p className="text-sm text-gray-400 mb-5">Load the defaults or add your own.</p>
          <button onClick={seed} className="inline-flex items-center gap-2 bg-[#0d5c2e] text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-[#1a7a3f] transition-colors">
            Load default partners
          </button>
        </div>
      )}

      {creating && (
        <div className="mb-4">
          <PartnerForm initial={{}} onSave={handleCreate} onCancel={() => setCreating(false)} />
        </div>
      )}

      <div className="space-y-3">
        {partners.map((p, i) => (
          <div key={p.id}>
            <div className={`bg-white rounded-2xl border ${p.isVisible ? 'border-gray-100' : 'border-dashed border-gray-200 opacity-60'} p-4 flex items-center gap-4`}>
              {/* Reorder */}
              <div className="flex flex-col gap-0.5 flex-shrink-0">
                <button onClick={() => move(i, -1)} disabled={i === 0} className="p-1 rounded text-gray-400 hover:text-gray-700 disabled:opacity-20"><ChevronUp size={15} /></button>
                <button onClick={() => move(i, 1)} disabled={i === partners.length - 1} className="p-1 rounded text-gray-400 hover:text-gray-700 disabled:opacity-20"><ChevronDown size={15} /></button>
              </div>

              {/* Logo / avatar */}
              <div className="w-11 h-11 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0 text-white font-bold text-sm"
                style={{ backgroundColor: p.bgColor }}>
                {p.logoUrl
                  ? <img src={p.logoUrl} alt={p.name} className="w-full h-full object-contain p-1" />
                  : p.initial || p.name.slice(0, 2).toUpperCase()
                }
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-gray-900">{p.name}</span>
                  {!p.isVisible && <span className="text-[10px] text-gray-400 bg-gray-100 rounded-full px-2 py-0.5">Hidden</span>}
                </div>
                {p.website && <p className="text-xs text-gray-400 truncate">{p.website}</p>}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 flex-shrink-0">
                <button onClick={() => toggleVisible(p)} title={p.isVisible ? 'Hide' : 'Show'} className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
                  {p.isVisible ? <Eye size={15} /> : <EyeOff size={15} />}
                </button>
                <button onClick={() => { setEditId(editId === p.id ? null : p.id); setCreating(false) }} className="p-2 rounded-lg text-gray-400 hover:text-[#0d5c2e] hover:bg-green-50 transition-colors">
                  <Pencil size={15} />
                </button>
                <button onClick={() => handleDelete(p.id)} disabled={deletingId === p.id} className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50">
                  {deletingId === p.id ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
                </button>
              </div>
            </div>

            {editId === p.id && (
              <div className="mt-2 ml-6">
                <PartnerForm
                  initial={p}
                  onSave={data => handleUpdate(p.id, data)}
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
