import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Phone, Mail, Send, Clock } from 'lucide-react'
import { fadeUp, slideLeft, slideRight } from '../lib/animations'

function PageHero() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-[#0a2a50] to-[#1a3f8f] overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_50%,white,transparent_60%)]" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="text-blue-300 text-sm font-semibold uppercase tracking-widest mb-3">Contact Us</p>
          <h1 className="text-5xl font-extrabold text-white mb-5 max-w-2xl leading-tight">
            Let's Grow Together
          </h1>
          <p className="text-blue-100 text-lg max-w-xl leading-relaxed">
            Reach out for product enquiries, technical consulting, distribution partnerships, or any questions about our solutions.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

const contactInfo = [
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
    href: 'tel:+8801752827682',
    color: 'bg-blue-100 text-[#1a3f8f]',
  },
  {
    icon: <Mail size={20} />,
    label: 'Email',
    value: 'drjasim1979@gmail.com',
    href: 'mailto:drjasim1979@gmail.com',
    color: 'bg-red-100 text-[#c41e1e]',
  },
  {
    icon: <Clock size={20} />,
    label: 'Business Hours',
    value: 'Sunday – Thursday: 9:00 AM – 6:00 PM',
    color: 'bg-amber-100 text-amber-700',
  },
]

function ContactSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, message: `[${form.subject}] ${form.message}` }),
      })
      setStatus(res.ok ? 'success' : 'error')
      if (res.ok) setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Contact info — 2 cols */}
          <motion.div variants={slideLeft} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="lg:col-span-2 space-y-4">
            <div className="mb-8">
              <p className="text-[#0d5c2e] text-sm font-semibold uppercase tracking-widest mb-2">Get in Touch</p>
              <h2 className="text-3xl font-bold text-gray-900">We'd love to hear from you</h2>
            </div>

            {contactInfo.map((item) => (
              <div key={item.label} className="flex items-start gap-4 bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${item.color}`}>
                  {item.icon}
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">{item.label}</div>
                  {item.href ? (
                    <a href={item.href} className="text-sm font-medium text-gray-800 hover:text-[#0d5c2e] transition-colors">{item.value}</a>
                  ) : (
                    <div className="text-sm font-medium text-gray-800">{item.value}</div>
                  )}
                </div>
              </div>
            ))}

            {/* Map placeholder */}
            <div className="mt-4 bg-gray-100 rounded-2xl h-44 flex items-center justify-center border border-gray-200">
              <div className="text-center text-gray-400">
                <MapPin size={28} className="mx-auto mb-2" />
                <p className="text-sm font-medium">Mirpur, Dhaka-1216</p>
                <p className="text-xs mt-0.5">Bangladesh</p>
              </div>
            </div>
          </motion.div>

          {/* Form — 3 cols */}
          <motion.div variants={slideRight} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="lg:col-span-3">
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
              {status === 'success' ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Received!</h3>
                  <p className="text-gray-500">Our team will get back to you within 24 hours.</p>
                  <button onClick={() => setStatus('idle')} className="mt-6 text-[#0d5c2e] font-semibold text-sm hover:underline">
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Send us a message</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Full Name *</label>
                        <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                          placeholder="Dr. John Doe"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0d5c2e]/20 focus:border-[#0d5c2e] transition" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Phone</label>
                        <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                          placeholder="+88 017XXXXXXXX"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0d5c2e]/20 focus:border-[#0d5c2e] transition" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Email *</label>
                      <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                        placeholder="you@company.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0d5c2e]/20 focus:border-[#0d5c2e] transition" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Subject</label>
                      <select value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0d5c2e]/20 focus:border-[#0d5c2e] transition text-gray-600">
                        <option value="">Select a topic…</option>
                        <option>Product Enquiry</option>
                        <option>Technical Consulting</option>
                        <option>Distribution Partnership</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Message *</label>
                      <textarea required rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                        placeholder="Tell us about your farm, feed mill, or what you need…"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0d5c2e]/20 focus:border-[#0d5c2e] transition resize-none" />
                    </div>
                    {status === 'error' && <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>}
                    <motion.button type="submit" disabled={status === 'loading'}
                      whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                      className="w-full flex items-center justify-center gap-2 bg-[#0d5c2e] hover:bg-[#1a7a3f] text-white font-semibold py-3.5 rounded-xl transition-colors disabled:opacity-60">
                      <Send size={15} />
                      {status === 'loading' ? 'Sending…' : 'Send Message'}
                    </motion.button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function PartnerCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <section ref={ref} className="py-16 bg-gray-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="bg-[#0d5c2e]/20 border border-[#0d5c2e]/30 rounded-3xl p-10 text-center">
          <div className="text-3xl mb-3">🤝</div>
          <h3 className="text-2xl font-bold text-white mb-3">Interested in becoming a distributor?</h3>
          <p className="text-gray-400 max-w-lg mx-auto mb-6 text-sm">
            We are expanding our distribution network across Bangladesh. If you are interested in partnering with us to supply premium animal nutrition products in your region, we'd love to talk.
          </p>
          <a href="mailto:drjasim1979@gmail.com" className="inline-flex items-center gap-2 bg-[#0d5c2e] hover:bg-green-600 text-white font-semibold px-7 py-3.5 rounded-full transition-colors text-sm">
            <Mail size={14} /> Email Us Directly
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default function Contact() {
  return (
    <>
      <PageHero />
      <ContactSection />
      <PartnerCTA />
    </>
  )
}