import { useState } from 'react'
import { adminApi } from '../../lib/adminApi'
import { Loader2, Save, CheckCircle2, AlertCircle, KeyRound } from 'lucide-react'
import { useAdminAuth } from '../../contexts/AdminAuth'

export default function AdminSettings() {
  const { admin } = useAdminAuth()
  const [form, setForm] = useState({ current: '', next: '', confirm: '' })
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [err, setErr] = useState('')

  function set(key: keyof typeof form, value: string) {
    setForm(prev => ({ ...prev, [key]: value }))
    if (status !== 'idle') { setStatus('idle'); setErr('') }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (form.next.length < 8) { setErr('New password must be at least 8 characters'); return }
    if (form.next !== form.confirm) { setErr('Passwords do not match'); return }
    setStatus('saving'); setErr('')
    try {
      await adminApi.changePassword(form.current, form.next)
      setStatus('saved')
      setForm({ current: '', next: '', confirm: '' })
      setTimeout(() => setStatus('idle'), 4000)
    } catch (e: any) {
      setErr(e.message ?? 'Failed to change password')
      setStatus('error')
    }
  }

  const inp = 'w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0d5c2e]/20 focus:border-[#0d5c2e] transition'

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your admin account.</p>
      </div>

      <div className="max-w-md space-y-5">
        {/* Account info */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-bold text-gray-900 text-sm mb-4 border-b border-gray-100 pb-3">Account</h2>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#0d5c2e] flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
              {admin?.name?.[0]?.toUpperCase() ?? 'A'}
            </div>
            <div>
              <div className="font-semibold text-gray-900">{admin?.name ?? 'Admin'}</div>
              <div className="text-sm text-gray-500">{admin?.email}</div>
            </div>
          </div>
        </div>

        {/* Change password */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-3">
            <KeyRound size={16} className="text-[#0d5c2e]" />
            <h2 className="font-bold text-gray-900 text-sm">Change Password</h2>
          </div>

          {status === 'saved' && (
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm mb-4">
              <CheckCircle2 size={15} /> Password changed successfully.
            </div>
          )}

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Current password</label>
              <input type="password" required className={inp} value={form.current} onChange={e => set('current', e.target.value)} placeholder="••••••••" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">New password</label>
              <input type="password" required className={inp} value={form.next} onChange={e => set('next', e.target.value)} placeholder="Min. 8 characters" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Confirm new password</label>
              <input type="password" required className={inp} value={form.confirm} onChange={e => set('confirm', e.target.value)} placeholder="••••••••" />
            </div>

            {err && (
              <p className="flex items-center gap-1.5 text-red-500 text-sm">
                <AlertCircle size={13} /> {err}
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'saving'}
              className="flex items-center gap-2 bg-[#0d5c2e] hover:bg-[#1a7a3f] text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors disabled:opacity-60"
            >
              {status === 'saving' ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              {status === 'saving' ? 'Saving…' : 'Update password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
