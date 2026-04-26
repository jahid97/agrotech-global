import { useEffect, useState } from 'react'
import { adminApi } from '../../lib/adminApi'
import {
  Loader2, Plus, Pencil, Trash2, ChevronUp, ChevronDown,
  Eye, EyeOff, Save, X, CheckCircle2, AlertCircle, PackagePlus,
  FlaskConical, Microscope, TrendingUp, Leaf, Fish, ShieldCheck,
  Sprout, Activity, Wheat, Dna, Package,
} from 'lucide-react'

/* ─── Shared types & constants ───────────────────────────────── */
interface Product {
  id: string; title: string; tagline: string; desc: string
  benefits: string; tag: string; theme: string; iconName: string
  position: number; isVisible: boolean
}

type FormData = Omit<Product, 'id' | 'position' | 'isVisible'>

export const THEMES: Record<string, { label: string; tagColor: string; border: string; accent: string }> = {
  green:  { label: 'Green',  tagColor: 'bg-green-100 text-green-700',   border: 'border-green-200',  accent: '#0d5c2e' },
  blue:   { label: 'Blue',   tagColor: 'bg-blue-100 text-blue-700',     border: 'border-blue-200',   accent: '#1a3f8f' },
  amber:  { label: 'Amber',  tagColor: 'bg-amber-100 text-amber-700',   border: 'border-amber-200',  accent: '#92400e' },
  purple: { label: 'Purple', tagColor: 'bg-purple-100 text-purple-700', border: 'border-purple-200', accent: '#5b21b6' },
  lime:   { label: 'Lime',   tagColor: 'bg-lime-100 text-lime-700',     border: 'border-lime-200',   accent: '#365314' },
  teal:   { label: 'Teal',   tagColor: 'bg-teal-100 text-teal-700',     border: 'border-teal-200',   accent: '#0f766e' },
  red:    { label: 'Red',    tagColor: 'bg-red-100 text-red-700',       border: 'border-red-200',    accent: '#991b1b' },
}

export const ICON_OPTIONS = [
  'FlaskConical', 'Microscope', 'TrendingUp', 'Dna', 'Leaf',
  'Fish', 'ShieldCheck', 'Sprout', 'Activity', 'Wheat', 'Package',
]

export const ICON_MAP: Record<string, React.ReactNode> = {
  FlaskConical: <FlaskConical size={18} />,
  Microscope:   <Microscope size={18} />,
  TrendingUp:   <TrendingUp size={18} />,
  Dna:          <Dna size={18} />,
  Leaf:         <Leaf size={18} />,
  Fish:         <Fish size={18} />,
  ShieldCheck:  <ShieldCheck size={18} />,
  Sprout:       <Sprout size={18} />,
  Activity:     <Activity size={18} />,
  Wheat:        <Wheat size={18} />,
  Package:      <Package size={18} />,
}

const EMPTY_FORM: FormData = {
  title: '', tagline: '', desc: '',
  benefits: '', tag: '', theme: 'green', iconName: 'FlaskConical',
}

/* ─── Product form (create / edit) ──────────────────────────── */
function ProductForm({
  initial, onSave, onCancel,
}: {
  initial: FormData
  onSave: (data: FormData) => Promise<void>
  onCancel: () => void
}) {
  const [form, setForm] = useState<FormData>(initial)
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState('')

  // Split benefits string (one per line) ↔ array
  const benefitsText = Array.isArray(form.benefits)
    ? (form.benefits as unknown as string[]).join('\n')
    : form.benefits

  function set(key: keyof FormData, value: string) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.title.trim() || !form.desc.trim()) { setErr('Title and description are required'); return }
    setSaving(true); setErr('')
    try {
      await onSave({ ...form, benefits: benefitsText })
    } catch (e: any) {
      setErr(e.message ?? 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  const inp = 'w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0d5c2e]/20 focus:border-[#0d5c2e] transition'

  return (
    <form onSubmit={submit} className="bg-gray-50 rounded-2xl border border-gray-200 p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Title *</label>
          <input className={inp} value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. Feed Enzymes" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Badge tag</label>
          <input className={inp} value={form.tag} onChange={e => set('tag', e.target.value)} placeholder="e.g. Best Seller" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Tagline</label>
        <input className={inp} value={form.tagline} onChange={e => set('tagline', e.target.value)} placeholder="Short catchy sub-title" />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Description *</label>
        <textarea rows={3} className={`${inp} resize-none`} value={form.desc} onChange={e => set('desc', e.target.value)} placeholder="Product description…" />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Benefits <span className="normal-case font-normal text-gray-400">(one per line)</span></label>
        <textarea rows={4} className={`${inp} resize-none`} value={benefitsText} onChange={e => set('benefits', e.target.value)} placeholder={"Benefit one\nBenefit two\nBenefit three"} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Theme picker */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Colour theme</label>
          <div className="flex flex-wrap gap-2">
            {Object.entries(THEMES).map(([key, t]) => (
              <button
                key={key} type="button"
                onClick={() => set('theme', key)}
                className={`text-xs font-semibold px-3 py-1 rounded-full border transition-all ${t.tagColor} ${form.theme === key ? `ring-2 ring-offset-1` : 'opacity-50 hover:opacity-80'}`}
                style={form.theme === key ? { outlineColor: t.accent } : {}}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Icon picker */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Icon</label>
          <div className="flex flex-wrap gap-2">
            {ICON_OPTIONS.map(name => (
              <button
                key={name} type="button"
                onClick={() => set('iconName', name)}
                title={name}
                className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all ${
                  form.iconName === name
                    ? 'bg-[#0d5c2e] text-white border-[#0d5c2e]'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
                }`}
              >
                {ICON_MAP[name]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {err && <p className="text-red-500 text-sm flex items-center gap-1"><AlertCircle size={13} />{err}</p>}

      <div className="flex items-center gap-3 pt-1">
        <button type="submit" disabled={saving}
          className="flex items-center gap-2 bg-[#0d5c2e] hover:bg-[#1a7a3f] text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors disabled:opacity-60">
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          {saving ? 'Saving…' : 'Save product'}
        </button>
        <button type="button" onClick={onCancel} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 font-medium px-3 py-2">
          <X size={14} /> Cancel
        </button>
      </div>
    </form>
  )
}

/* ─── Main page ──────────────────────────────────────────────── */
export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading]   = useState(true)
  const [editId, setEditId]     = useState<string | null>(null)
  const [creating, setCreating] = useState(false)
  const [toast, setToast]       = useState('')
  const [deletingId, setDeletingId] = useState<string | null>(null)

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  useEffect(() => {
    adminApi.getProducts()
      .then(setProducts)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  async function seed() {
    try {
      const data = await adminApi.seedProducts()
      setProducts(data)
      showToast('Default products loaded')
    } catch (e: any) {
      showToast(e.message ?? 'Seed failed')
    }
  }

  async function toggleVisible(p: Product) {
    const updated = await adminApi.updateProduct(p.id, { isVisible: !p.isVisible })
    setProducts(prev => prev.map(x => x.id === p.id ? { ...x, ...updated } : x))
  }

  async function move(index: number, dir: -1 | 1) {
    const next = [...products]
    const swap = index + dir
    if (swap < 0 || swap >= next.length) return
    ;[next[index], next[swap]] = [next[swap], next[index]]
    const reordered = next.map((p, i) => ({ ...p, position: i }))
    setProducts(reordered)
    await adminApi.reorderProducts(reordered.map(p => p.id))
  }

  async function handleCreate(form: FormData) {
    const benefits = form.benefits.split('\n').map(s => s.trim()).filter(Boolean)
    const created = await adminApi.createProduct({ ...form, benefits })
    setProducts(prev => [...prev, created])
    setCreating(false)
    showToast('Product created')
  }

  async function handleUpdate(id: string, form: FormData) {
    const benefits = form.benefits.split('\n').map(s => s.trim()).filter(Boolean)
    const updated = await adminApi.updateProduct(id, { ...form, benefits })
    setProducts(prev => prev.map(x => x.id === id ? { ...x, ...updated } : x))
    setEditId(null)
    showToast('Product updated')
  }

  async function handleDelete(id: string) {
    setDeletingId(id)
    try {
      await adminApi.deleteProduct(id)
      setProducts(prev => prev.filter(x => x.id !== id))
      showToast('Product deleted')
    } finally {
      setDeletingId(null)
    }
  }

  function getInitialForm(p: Product): FormData {
    let benefits = p.benefits
    try { const arr = JSON.parse(p.benefits); if (Array.isArray(arr)) benefits = arr.join('\n') } catch {}
    return { title: p.title, tagline: p.tagline, desc: p.desc, benefits, tag: p.tag, theme: p.theme, iconName: p.iconName }
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 size={28} className="animate-spin text-[#0d5c2e]" />
    </div>
  )

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500 text-sm mt-1">Manage product categories shown on the Products page.</p>
        </div>
        <button
          onClick={() => { setCreating(true); setEditId(null) }}
          className="flex items-center gap-2 bg-[#0d5c2e] hover:bg-[#1a7a3f] text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors"
        >
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* Toast */}
      {toast && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm mb-4">
          <CheckCircle2 size={15} /> {toast}
        </div>
      )}

      {/* Empty state */}
      {products.length === 0 && !creating && (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <PackagePlus size={36} className="mx-auto text-gray-300 mb-3" />
          <p className="font-semibold text-gray-700 mb-1">No products yet</p>
          <p className="text-sm text-gray-400 mb-5">Load the built-in defaults or create your own.</p>
          <button onClick={seed} className="inline-flex items-center gap-2 bg-[#0d5c2e] text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-[#1a7a3f] transition-colors">
            Load default products
          </button>
        </div>
      )}

      {/* Create form */}
      {creating && (
        <div className="mb-4">
          <ProductForm
            initial={EMPTY_FORM}
            onSave={handleCreate}
            onCancel={() => setCreating(false)}
          />
        </div>
      )}

      {/* Product list */}
      <div className="space-y-3">
        {products.map((p, i) => {
          const theme = THEMES[p.theme] ?? THEMES.green
          return (
            <div key={p.id}>
              {/* Product row */}
              <div className={`bg-white rounded-2xl border ${p.isVisible ? 'border-gray-100' : 'border-dashed border-gray-200 opacity-60'} p-5 flex items-center gap-4`}>
                {/* Reorder */}
                <div className="flex flex-col gap-0.5 flex-shrink-0">
                  <button onClick={() => move(i, -1)} disabled={i === 0} className="p-1 rounded text-gray-400 hover:text-gray-700 disabled:opacity-20 transition-colors">
                    <ChevronUp size={15} />
                  </button>
                  <button onClick={() => move(i, 1)} disabled={i === products.length - 1} className="p-1 rounded text-gray-400 hover:text-gray-700 disabled:opacity-20 transition-colors">
                    <ChevronDown size={15} />
                  </button>
                </div>

                {/* Icon */}
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${theme.accent}18`, color: theme.accent }}>
                  {ICON_MAP[p.iconName] ?? <Package size={18} />}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-sm text-gray-900">{p.title}</span>
                    {p.tag && <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${theme.tagColor}`}>{p.tag}</span>}
                    {!p.isVisible && <span className="text-[10px] text-gray-400 bg-gray-100 rounded-full px-2 py-0.5">Hidden</span>}
                  </div>
                  <p className="text-xs text-gray-400 truncate mt-0.5">{p.tagline}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button onClick={() => toggleVisible(p)} title={p.isVisible ? 'Hide' : 'Show'} className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
                    {p.isVisible ? <Eye size={15} /> : <EyeOff size={15} />}
                  </button>
                  <button onClick={() => { setEditId(editId === p.id ? null : p.id); setCreating(false) }} className="p-2 rounded-lg text-gray-400 hover:text-[#0d5c2e] hover:bg-green-50 transition-colors">
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    disabled={deletingId === p.id}
                    className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                  >
                    {deletingId === p.id ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
                  </button>
                </div>
              </div>

              {/* Inline edit form */}
              {editId === p.id && (
                <div className="mt-2 ml-6">
                  <ProductForm
                    initial={getInitialForm(p)}
                    onSave={form => handleUpdate(p.id, form)}
                    onCancel={() => setEditId(null)}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
