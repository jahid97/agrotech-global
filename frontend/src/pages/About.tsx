import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { GraduationCap, Building2, Award, Globe, CheckCircle, ArrowRight } from 'lucide-react'
import { fadeUp, staggerContainer, slideLeft, slideRight, scaleIn } from '../lib/animations'

/* ─── Page Hero ──────────────────────────────────────────────── */
function PageHero() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-[#0a3d1f] to-[#0d5c2e] overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_50%,white,transparent_60%)]" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="text-green-300 text-sm font-semibold uppercase tracking-widest mb-3">About Us</p>
          <h1 className="text-5xl font-extrabold text-white mb-5 max-w-2xl leading-tight">
            Trusted Science, Local Impact
          </h1>
          <p className="text-green-100 text-lg max-w-xl leading-relaxed">
            Bridging global biotechnological advancements with Bangladesh's livestock industry since 2020.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Story ──────────────────────────────────────────────────── */
function Story() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={slideLeft} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <p className="text-[#0d5c2e] text-sm font-semibold uppercase tracking-widest mb-3">Our Story</p>
            <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-6">
              From global labs to Bangladesh's farms
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Agrotech Global BD Nutrition was founded with a clear purpose — to solve the challenge of rising feed costs and declining productivity in Bangladesh's livestock industry by making world-class nutritional science accessible to every farmer.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              We import exclusively from ISO-certified global partners and work closely with feed mills, poultry farms, dairy operations, and aquaculture businesses to deliver measurable results.
            </p>
            <p className="text-gray-600 leading-relaxed">
              As an active member of AHCAB since 2020, we uphold the highest standards in animal health and nutrition across Bangladesh.
            </p>
          </motion.div>

          <motion.div variants={slideRight} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { val: '2020', label: 'Year Established', color: 'bg-green-50 border-green-200' },
                { val: '5+', label: 'Product Categories', color: 'bg-blue-50 border-blue-200' },
                { val: '2', label: 'Global Partners', color: 'bg-red-50 border-red-200' },
                { val: 'AHCAB', label: 'Certified Member', color: 'bg-amber-50 border-amber-200' },
              ].map((item) => (
                <div key={item.label} className={`rounded-2xl p-6 border ${item.color}`}>
                  <div className="text-3xl font-extrabold text-gray-900 mb-1">{item.val}</div>
                  <div className="text-sm text-gray-500 font-medium">{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ─── Leadership ─────────────────────────────────────────────── */
function Leadership() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const credentials = [
    { icon: <GraduationCap size={18} />, text: 'PhD in Animal Nutrition' },
    { icon: <Building2 size={18} />, text: 'Professor, Sylhet Agricultural University' },
    { icon: <Award size={18} />, text: 'AHCAB Active Member since 2020' },
    { icon: <Globe size={18} />, text: 'Global Biotech Partnerships' },
  ]
  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="text-center mb-14">
          <p className="text-[#0d5c2e] text-sm font-semibold uppercase tracking-widest mb-3">Leadership</p>
          <h2 className="text-4xl font-bold text-gray-900">Meet Our Founder</h2>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="max-w-3xl mx-auto">
          <motion.div variants={scaleIn} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-[#0d5c2e] to-[#1a7a3f] p-8 text-white">
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-2xl bg-white/20 border-2 border-white/30 flex items-center justify-center text-4xl font-bold flex-shrink-0">J</div>
                <div>
                  <h3 className="text-2xl font-bold">Dr. Mohammad Jasim Uddin</h3>
                  <p className="text-green-200 mt-0.5">Founder & Managing Director</p>
                  <p className="text-green-300 text-sm mt-1">PhD · Animal Nutrition Specialist</p>
                </div>
              </div>
            </div>
            <div className="p-8">
              <p className="text-gray-600 leading-relaxed mb-6">
                Dr. Jasim is a highly respected figure in Bangladesh's animal nutrition landscape. Combining deep academic expertise as a professor at Sylhet Agricultural University with hands-on industry experience, he founded Agrotech Global BD Nutrition to create a direct bridge between global science and local farming needs.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {credentials.map((c) => (
                  <div key={c.text} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                    <span className="text-[#0d5c2e]">{c.icon}</span>
                    <span className="text-sm text-gray-700 font-medium">{c.text}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-gray-500 text-sm italic border-l-4 border-[#0d5c2e] pl-4">
                "Our goal is to make world-class animal nutrition accessible to every farmer in Bangladesh — backed by science, driven by impact."
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Mission & Values ───────────────────────────────────────── */
function Values() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const values = [
    { icon: '🎯', title: 'Our Motive', desc: 'Bridge the gap between global biotech advancements and Bangladesh\'s livestock industry by solving the challenge of rising feed costs.' },
    { icon: '🚀', title: 'Our Objective', desc: 'Supply 100% safe, research-backed supplements. Promote sustainable farming. Provide technical consulting to maximise ROI.' },
    { icon: '🌿', title: 'Our Commitment', desc: 'Reduce reliance on harmful chemicals, support natural growth, and build a healthier, more sustainable future for Bangladesh\'s farms.' },
  ]
  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="text-center mb-14">
          <p className="text-[#0d5c2e] text-sm font-semibold uppercase tracking-widest mb-3">What Drives Us</p>
          <h2 className="text-4xl font-bold text-gray-900">Mission & Values</h2>
        </motion.div>
        <motion.div variants={staggerContainer} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v) => (
            <motion.div key={v.title} variants={fadeUp} className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-4xl mb-5">{v.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">{v.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ─── CTA ────────────────────────────────────────────────────── */
function CTA() {
  return (
    <section className="py-20 bg-gray-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Ready to transform your farm?</h2>
        <p className="text-gray-400 mb-8 max-w-xl mx-auto">Talk to our team and discover how our products can improve your yields, reduce costs, and support sustainable growth.</p>
        <Link to="/contact" className="inline-flex items-center gap-2 bg-[#0d5c2e] hover:bg-green-600 text-white font-semibold px-8 py-4 rounded-full transition-colors group">
          Get in Touch <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  )
}

export default function About() {
  return (
    <>
      <PageHero />
      <Story />
      <Leadership />
      <Values />
      <CTA />
    </>
  )
}