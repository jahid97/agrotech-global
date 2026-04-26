import { useEffect, useRef, useState } from 'react'
import { adminApi } from '../../lib/adminApi'
import { Loader2, Save, Upload, CheckCircle2, AlertCircle, ImageIcon } from 'lucide-react'

/* ─── Types ──────────────────────────────────────────────────── */
type ContentMap = Record<string, string>
type SaveState = 'idle' | 'saving' | 'saved' | 'error'

/* ─── Field components ───────────────────────────────────────── */
function Field({
  label, hint, value, onChange, rows = 1,
}: {
  label: string; hint?: string; value: string
  onChange: (v: string) => void; rows?: number
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{label}</label>
      {hint && <p className="text-[11px] text-gray-400 mb-1.5">{hint}</p>}
      {rows > 1 ? (
        <textarea
          rows={rows}
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0d5c2e]/20 focus:border-[#0d5c2e] transition resize-none"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0d5c2e]/20 focus:border-[#0d5c2e] transition"
        />
      )}
    </div>
  )
}

function ImageField({
  label, hint, contentKey, value, onChange,
}: {
  label: string; hint?: string; contentKey: string
  value: string; onChange: (key: string, url: string) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [err, setErr] = useState('')

  async function handleFile(file: File) {
    setErr('')
    setUploading(true)
    try {
      const { url } = await adminApi.uploadImage(file)
      onChange(contentKey, url)
    } catch (e: any) {
      setErr(e.message ?? 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const preview = value || null

  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{label}</label>
      {hint && <p className="text-[11px] text-gray-400 mb-1.5">{hint}</p>}

      <div className="flex items-center gap-3">
        {/* Thumbnail */}
        <div className="w-20 h-14 rounded-xl border border-gray-200 bg-gray-50 overflow-hidden flex items-center justify-center flex-shrink-0">
          {preview ? (
            <img src={preview} alt={label} className="w-full h-full object-cover" />
          ) : (
            <ImageIcon size={20} className="text-gray-300" />
          )}
        </div>

        {/* Upload button */}
        <div className="flex-1">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 text-sm font-medium text-[#0d5c2e] border border-[#0d5c2e]/30 hover:bg-green-50 px-4 py-2 rounded-xl transition-colors disabled:opacity-50"
          >
            {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
            {uploading ? 'Uploading…' : 'Upload image'}
          </button>
          {err && <p className="text-xs text-red-500 mt-1">{err}</p>}
          {preview && <p className="text-[11px] text-gray-400 mt-1 truncate">{preview}</p>}
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
      />
    </div>
  )
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
      <h3 className="font-bold text-gray-900 text-sm border-b border-gray-100 pb-3">{title}</h3>
      {children}
    </div>
  )
}

/* ─── Save bar ───────────────────────────────────────────────── */
function SaveBar({ state, onSave }: { state: SaveState; onSave: () => void }) {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="text-sm">
        {state === 'saved' && (
          <span className="flex items-center gap-1.5 text-green-600 font-medium">
            <CheckCircle2 size={15} /> Saved successfully
          </span>
        )}
        {state === 'error' && (
          <span className="flex items-center gap-1.5 text-red-500 font-medium">
            <AlertCircle size={15} /> Save failed — try again
          </span>
        )}
      </div>
      <button
        onClick={onSave}
        disabled={state === 'saving'}
        className="flex items-center gap-2 bg-[#0d5c2e] hover:bg-[#1a7a3f] text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition-colors disabled:opacity-60"
      >
        {state === 'saving' ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
        {state === 'saving' ? 'Saving…' : 'Save changes'}
      </button>
    </div>
  )
}

/* ─── Page tabs ──────────────────────────────────────────────── */
const TABS = ['Home', 'About', 'Contact', 'Products'] as const
type Tab = typeof TABS[number]

/* ─── Default values (mirrors what's hardcoded in public pages) ── */
const DEFAULTS: ContentMap = {
  // Home
  'home.hero.badge':              'Imported Animal Nutrition · Growing Across Bangladesh',
  'home.hero.headline':           'Bringing Global Animal Nutrition',
  'home.hero.headline_highlight': 'to Bangladesh\'s Farms',
  'home.stat.0.value': '5+',   'home.stat.0.label': 'Product categories nationwide',
  'home.stat.1.value': '2020', 'home.stat.1.label': 'Established & AHCAB certified',
  'home.stat.2.value': '2',    'home.stat.2.label': 'ISO-certified global partners',
  'home.photo.1': '/photo_1.jpg', 'home.photo.2': '/photo_2.jpg',
  'home.photo.3': '/photo_3.jpg', 'home.photo.4': '/photo_4.jpg',
  'home.photo.5': '/photo_5.jpg', 'home.photo.6': '/photo_6.jpg',
  // About
  'about.hero.headline': 'Importing Global Standards, Supporting Local Farms',
  'about.hero.tagline':  'An authorized importer and distributor of world-class animal nutrition products — growing across Bangladesh since 2020.',
  'about.story.p1': 'Agrotech Global BD Nutrition is an authorized importer and distributor of animal nutrition products and feed supplements in Bangladesh. We were established to give local farms direct access to globally certified, research-backed nutrition solutions that were previously hard to source.',
  'about.story.p2': 'We import exclusively from ISO-certified manufacturers and distribute across poultry farms, dairy operations, feed mills, and aquaculture businesses — combining reliable supply with practical on-ground technical support.',
  'about.story.p3': 'As an active member of AHCAB since 2020 and a growing presence in the Bangladesh livestock sector, we are committed to raising the standard of animal nutrition — one farm at a time.',
  'about.founder.bio':   'Dr. Jasim is a highly respected figure in Bangladesh\'s animal nutrition landscape. Combining deep academic expertise as a professor at Sylhet Agricultural University with hands-on industry experience, he founded Agrotech Global BD Nutrition to create a direct bridge between global science and local farming needs.',
  'about.founder.quote': 'Our goal is to make world-class animal nutrition accessible to every farmer in Bangladesh — backed by science, driven by impact.',
  // Products
  'products.hero.headline': 'Premium Nutrition Solutions',
  'products.hero.tagline':  'Imported from ISO-certified global partners — every product we supply is scientifically validated and field-proven.',
  // Contact
  'contact.address': 'Holding-28, Road-16, Flat-B-1, Rupnagar, Mirpur, Dhaka-1216, Bangladesh',
  'contact.phone':   '+88 01752-827682',
  'contact.email':   'drjasim1979@gmail.com',
  'contact.hours':   'Sunday – Thursday: 9:00 AM – 6:00 PM',
}

/* ─── Tab forms ──────────────────────────────────────────────── */
function HomeTab({ local, set }: { local: ContentMap; set: (k: string, v: string) => void }) {
  const f = (key: string) => local[key] ?? DEFAULTS[key] ?? ''
  return (
    <div className="space-y-5">
      <SectionCard title="Hero Text">
        <Field label="Badge text" value={f('home.hero.badge')} onChange={v => set('home.hero.badge', v)} />
        <Field label="Headline" hint="Main line — shown in white" value={f('home.hero.headline')} onChange={v => set('home.hero.headline', v)} />
        <Field label="Headline (highlight)" hint="Second line — shown in green gradient" value={f('home.hero.headline_highlight')} onChange={v => set('home.hero.headline_highlight', v)} />
      </SectionCard>

      <SectionCard title="Stats Bar">
        {[0, 1, 2].map(i => (
          <div key={i} className="grid grid-cols-2 gap-3">
            <Field label={`Stat ${i + 1} — value`} value={f(`home.stat.${i}.value`)} onChange={v => set(`home.stat.${i}.value`, v)} />
            <Field label={`Stat ${i + 1} — label`} value={f(`home.stat.${i}.label`)} onChange={v => set(`home.stat.${i}.label`, v)} />
          </div>
        ))}
      </SectionCard>

      <SectionCard title="Hero Background Photos">
        <p className="text-xs text-gray-400 -mt-2">6 photos cycle across the 3 columns (columns use 1+4, 2+5, 3+6).</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2, 3, 4, 5, 6].map(n => (
            <ImageField
              key={n}
              label={`Photo ${n}`}
              contentKey={`home.photo.${n}`}
              value={f(`home.photo.${n}`)}
              onChange={set}
            />
          ))}
        </div>
      </SectionCard>
    </div>
  )
}

function AboutTab({ local, set }: { local: ContentMap; set: (k: string, v: string) => void }) {
  const f = (key: string) => local[key] ?? DEFAULTS[key] ?? ''
  return (
    <div className="space-y-5">
      <SectionCard title="Page Header">
        <Field label="Headline" value={f('about.hero.headline')} onChange={v => set('about.hero.headline', v)} />
        <Field label="Tagline" rows={2} value={f('about.hero.tagline')} onChange={v => set('about.hero.tagline', v)} />
      </SectionCard>

      <SectionCard title="Our Story">
        <Field label="Paragraph 1" rows={3} value={f('about.story.p1')} onChange={v => set('about.story.p1', v)} />
        <Field label="Paragraph 2" rows={3} value={f('about.story.p2')} onChange={v => set('about.story.p2', v)} />
        <Field label="Paragraph 3" rows={3} value={f('about.story.p3')} onChange={v => set('about.story.p3', v)} />
      </SectionCard>

      <SectionCard title="Founder">
        <Field label="Bio paragraph" rows={4} value={f('about.founder.bio')} onChange={v => set('about.founder.bio', v)} />
        <Field label="Quote" rows={2} value={f('about.founder.quote')} onChange={v => set('about.founder.quote', v)} />
      </SectionCard>
    </div>
  )
}

function ContactTab({ local, set }: { local: ContentMap; set: (k: string, v: string) => void }) {
  const f = (key: string) => local[key] ?? DEFAULTS[key] ?? ''
  return (
    <div className="space-y-5">
      <SectionCard title="Contact Details">
        <Field label="Address" rows={2} value={f('contact.address')} onChange={v => set('contact.address', v)} />
        <Field label="Phone number" value={f('contact.phone')} onChange={v => set('contact.phone', v)} />
        <Field label="Email address" value={f('contact.email')} onChange={v => set('contact.email', v)} />
        <Field label="Business hours" value={f('contact.hours')} onChange={v => set('contact.hours', v)} />
      </SectionCard>
    </div>
  )
}

function ProductsTab({ local, set }: { local: ContentMap; set: (k: string, v: string) => void }) {
  const f = (key: string) => local[key] ?? DEFAULTS[key] ?? ''
  return (
    <div className="space-y-5">
      <SectionCard title="Page Header">
        <Field label="Headline" value={f('products.hero.headline')} onChange={v => set('products.hero.headline', v)} />
        <Field label="Tagline" rows={2} value={f('products.hero.tagline')} onChange={v => set('products.hero.tagline', v)} />
      </SectionCard>
      <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-4 text-sm text-blue-700">
        To add, edit, or reorder product cards go to <strong>Products</strong> in the sidebar.
      </div>
    </div>
  )
}

/* ─── Main page ──────────────────────────────────────────────── */
export default function AdminContent() {
  const [tab, setTab]         = useState<Tab>('Home')
  const [remote, setRemote]   = useState<ContentMap>({})
  const [local, setLocal]     = useState<ContentMap>({})
  const [loading, setLoading] = useState(true)
  const [saveState, setSaveState] = useState<SaveState>('idle')

  useEffect(() => {
    adminApi.getContent()
      .then(data => { setRemote(data); setLocal(data) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  function set(key: string, value: string) {
    setLocal(prev => ({ ...prev, [key]: value }))
    if (saveState === 'saved' || saveState === 'error') setSaveState('idle')
  }

  async function save() {
    setSaveState('saving')
    // Only send keys that have actually changed vs remote
    const updates = Object.entries(local)
      .filter(([k, v]) => v !== (remote[k] ?? DEFAULTS[k] ?? ''))
      .map(([key, value]) => ({ key, value }))

    // Always save all fields that differ from defaults too (so first save works)
    const allLocal = { ...DEFAULTS, ...remote, ...local }
    const fullUpdates = Object.entries(allLocal)
      .filter(([k]) => local[k] !== undefined)
      .map(([key, value]) => ({ key, value }))

    try {
      await adminApi.updateContent(fullUpdates.length ? fullUpdates : updates)
      setRemote(prev => ({ ...prev, ...local }))
      setSaveState('saved')
      setTimeout(() => setSaveState('idle'), 3000)
    } catch {
      setSaveState('error')
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 size={28} className="animate-spin text-[#0d5c2e]" />
    </div>
  )

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Page Content</h1>
        <p className="text-gray-500 text-sm mt-1">Edit text and images for each page. Changes are saved to the database and appear live on the site.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit mb-6">
        {TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${
              tab === t
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === 'Home'    && <HomeTab    local={local} set={set} />}
      {tab === 'About'   && <AboutTab   local={local} set={set} />}
      {tab === 'Contact'  && <ContactTab  local={local} set={set} /> }
      {tab === 'Products' && <ProductsTab local={local} set={set} />}

      <SaveBar state={saveState} onSave={save} />
    </div>
  )
}
