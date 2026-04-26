import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { slideLeft, slideRight, fadeUp } from '../../lib/animations'
import { apiBase } from '../../lib/api'
import { MapPin, Phone, Mail, Send } from 'lucide-react'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch(`${apiBase}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', phone: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <span className="inline-block bg-red-50 text-[#c41e1e] text-sm font-semibold px-4 py-1.5 rounded-full border border-red-200 mb-4">
            Contact Us
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Let's Grow Together</h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Reach out to our team for product inquiries, technical consulting, or to become a distributor.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Info side */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <div className="space-y-6 mb-10">
              {[
                {
                  icon: <MapPin size={20} />,
                  label: 'Head Office',
                  value: 'Holding-28, Road-16, Flat-B-1, Rupnagar, Mirpur, Dhaka-1216, Bangladesh',
                  color: 'bg-green-100 text-[#0d5c2e]',
                },
                {
                  icon: <Phone size={20} />,
                  label: 'Phone',
                  value: '+88 01752-827682',
                  color: 'bg-blue-100 text-[#1a3f8f]',
                },
                {
                  icon: <Mail size={20} />,
                  label: 'Email',
                  value: 'drjasim1979@gmail.com',
                  color: 'bg-red-100 text-[#c41e1e]',
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${item.color}`}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">{item.label}</div>
                    <div className="text-gray-800 font-medium text-sm">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="bg-gray-100 rounded-2xl h-52 flex items-center justify-center border border-gray-200">
              <div className="text-center text-gray-400">
                <MapPin size={32} className="mx-auto mb-2" />
                <p className="text-sm">Mirpur, Dhaka-1216</p>
                <p className="text-xs mt-1">Bangladesh</p>
              </div>
            </div>
          </motion.div>

          {/* Form side */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-500 text-sm">We'll get back to you within 24 hours.</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-5 text-[#0d5c2e] text-sm font-semibold hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Dr. John Doe"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0d5c2e]/30 focus:border-[#0d5c2e] transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Phone</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+88 017XXXXXXXX"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0d5c2e]/30 focus:border-[#0d5c2e] transition"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Email *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@company.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0d5c2e]/30 focus:border-[#0d5c2e] transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Message *</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us about your farm, feed mill, or product inquiry..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0d5c2e]/30 focus:border-[#0d5c2e] transition resize-none"
                    />
                  </div>
                  {status === 'error' && (
                    <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>
                  )}
                  <motion.button
                    type="submit"
                    disabled={status === 'loading'}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 bg-[#0d5c2e] text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-[#1a7a3f] transition-colors disabled:opacity-60 shadow-sm"
                  >
                    <Send size={16} />
                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
