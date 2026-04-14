import { Suspense, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, ArrowRight, CheckCircle, FlaskConical, Leaf, TrendingUp, Users, ShieldCheck, Microscope, Sprout, Fish } from 'lucide-react'
import { fadeUp, staggerContainer, scaleIn, slideLeft, slideRight } from '../lib/animations'
import Earth3D from '../components/landing/Earth3D'

/* ─── Hero ─────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-5 bg-white">
      {/* Outer wrapper with rounded corners — matches reference */}
      <div className="relative rounded-[28px] overflow-hidden bg-[#050e1a] min-h-[82vh] flex flex-col">

        {/* 3D Earth — fills the entire background */}
        <div className="absolute inset-0 z-0">
          <Suspense fallback={<div className="w-full h-full bg-[#050e1a]" />}>
            <Earth3D />
          </Suspense>
        </div>

        {/* Dark gradient overlay — stronger at left & bottom */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#050e1a]/85 via-[#050e1a]/40 to-transparent" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#050e1a]/70 via-transparent to-transparent" />

        {/* Green ambient glow on the left where the text sits */}
        <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-[#16a34a]/40 rounded-full blur-[80px] z-10 pointer-events-none" />
        <div className="absolute -left-24 top-1/2 -translate-y-1/2 w-[320px] h-[320px] bg-[#22c55e]/20 rounded-full blur-[60px] z-10 pointer-events-none" />

        {/* Content */}
        <div className="relative z-20 flex flex-col justify-between h-full flex-1 p-8 sm:p-12 lg:p-16">

          {/* Top area: tag + floating card */}
          <div className="flex items-start justify-between">
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-white/60 text-sm font-medium"
            >
              #1 Animal Nutrition Company in Bangladesh
            </motion.p>

            {/* Floating glass card — top right (matches reference) */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="hidden lg:flex flex-col bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden w-64 shadow-2xl"
            >
              {/* Mini image block */}
              <div className="h-36 bg-gradient-to-br from-green-900/60 to-blue-900/60 flex items-center justify-center text-6xl">
                🌾
              </div>
              <div className="p-4 flex items-center justify-between">
                <p className="text-white text-sm font-semibold leading-tight">
                  Discover Our<br />Global Partners
                </p>
                <Link
                  to="/about"
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors flex-shrink-0"
                >
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Bottom area: headline + CTAs */}
          <div className="mt-auto">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8 max-w-2xl"
            >
              Nourishing Bangladesh's Livestock with Global Science
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-6"
            >
              <Link
                to="/contact"
                className="group flex items-center gap-1.5 text-white font-semibold text-sm border-b border-white pb-0.5 hover:border-green-400 hover:text-green-400 transition-colors"
              >
                Get in touch <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <Link
                to="/products"
                className="group flex items-center gap-1.5 text-white/70 font-semibold text-sm border-b border-white/40 pb-0.5 hover:border-white/80 hover:text-white transition-colors"
              >
                Our products <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Stats card — floats at bottom right, partially outside (matches reference) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="relative z-20 mx-8 sm:mx-12 lg:mx-0 lg:absolute lg:bottom-0 lg:right-0 lg:w-[52%] bg-white rounded-t-3xl lg:rounded-tl-3xl lg:rounded-tr-none px-8 py-7 grid grid-cols-3 gap-4"
        >
          {[
            { value: '5+', label: 'Product categories supplied nationwide' },
            { value: '2020', label: 'Year established & AHCAB certified' },
            { value: '2', label: 'ISO-certified global supply partners' },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-1">{s.value}</div>
              <div className="text-xs text-gray-400 leading-snug">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Focus / Steps ─────────────────────────────────────────── */
function FocusSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const steps = [
    { num: '01', label: 'Import' },
    { num: '02', label: 'Quality Check' },
    { num: '03', label: 'Distribute' },
    { num: '04', label: 'Farm Support' },
  ]

  return (
    <section ref={ref} className="py-20 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div variants={slideLeft} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <p className="text-[#0d5c2e] text-sm font-semibold uppercase tracking-widest mb-3">Our Process</p>
            <h2 className="text-4xl font-bold text-gray-900 leading-tight">
              Focusing on <span className="text-[#0d5c2e]">quality,</span> that every farmer can trust
            </h2>
          </motion.div>
          <motion.p variants={slideRight} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="text-gray-500 text-base leading-relaxed">
            From sourcing globally certified products to providing on-ground technical support, every step in our process is designed to deliver real results for Bangladesh's farmers and feed mills.
          </motion.p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {steps.map((s, i) => (
            <motion.div key={i} variants={scaleIn} className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-full bg-gray-100 group-hover:bg-[#0d5c2e] border-2 border-gray-200 group-hover:border-[#0d5c2e] flex items-center justify-center text-gray-500 group-hover:text-white font-bold text-lg transition-all duration-300 mb-4">
                {s.num}
              </div>
              {/* Connector line */}
              <div className="hidden md:block absolute mt-8 w-full h-px bg-gray-200" style={{ zIndex: -1 }} />
              <span className="text-sm font-semibold text-gray-700">{s.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Services Grid ─────────────────────────────────────────── */
const services = [
  { icon: <FlaskConical size={20} />, title: 'Feed Enzymes', desc: 'Improve digestion and nutrient absorption.' },
  { icon: <Leaf size={20} />, title: 'Probiotics', desc: 'Boost gut health and natural immunity.' },
  { icon: <TrendingUp size={20} />, title: 'Growth Promoters', desc: 'Non-antibiotic, proven performance gains.' },
  { icon: <Microscope size={20} />, title: 'Biotech Additives', desc: 'Fermentation-based specialty formulas.' },
  { icon: <ShieldCheck size={20} />, title: 'Vitamin Premixes', desc: 'Complete micronutrient blends.' },
  { icon: <Fish size={20} />, title: 'Aqua Nutrition', desc: 'Tailored solutions for fish farming.' },
  { icon: <Users size={20} />, title: 'Technical Support', desc: 'Expert farm and feed mill consulting.' },
  { icon: <Sprout size={20} />, title: 'Sustainable Solutions', desc: 'Reduce chemicals, grow naturally.' },
]

function ServicesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="mb-14">
          <p className="text-[#0d5c2e] text-sm font-semibold uppercase tracking-widest mb-3">What We Offer</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-4xl font-bold text-gray-900 max-w-sm leading-tight">
              We offer quality, with the best materials and service
            </h2>
            <Link to="/products" className="flex items-center gap-2 text-[#0d5c2e] font-semibold text-sm hover:gap-3 transition-all">
              View All Products <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {services.map((s) => (
            <motion.div
              key={s.title}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-green-200 hover:shadow-md transition-all group cursor-default"
            >
              <div className="w-10 h-10 rounded-xl bg-green-50 group-hover:bg-[#0d5c2e] flex items-center justify-center text-[#0d5c2e] group-hover:text-white transition-all mb-4">
                {s.icon}
              </div>
              <h4 className="font-semibold text-gray-900 text-sm mb-1.5">{s.title}</h4>
              <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Trusted Split ─────────────────────────────────────────── */
function TrustedSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div variants={slideLeft} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <p className="text-[#0d5c2e] text-sm font-semibold uppercase tracking-widest mb-3">Why Trust Us</p>
            <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-6">
              Trusted service, for your serious farm needs
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8">
              Led by Dr. Mohammad Jasim Uddin — PhD in Animal Nutrition, Professor at Sylhet Agricultural University — we bring academic excellence and real-world experience to every solution we provide.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { label: 'ISO-Certified Partners', val: '2' },
                { label: 'Years of Experience', val: '5+' },
                { label: 'Product Categories', val: '5+' },
                { label: 'AHCAB Certified', val: '✓' },
              ].map((item) => (
                <div key={item.label} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                  <div className="text-2xl font-bold text-[#0d5c2e] mb-1">{item.val}</div>
                  <div className="text-xs text-gray-500 font-medium">{item.label}</div>
                </div>
              ))}
            </div>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 bg-[#0d5c2e] text-white font-semibold px-7 py-3.5 rounded-full hover:bg-[#1a7a3f] transition-colors group"
            >
              Learn About Us <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Right image block */}
          <motion.div variants={slideRight} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="relative">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0d5c2e] to-[#1a7a3f] aspect-[4/5] flex items-end">
              {/* Placeholder visual when no image is present */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 opacity-20">
                <div className="text-white text-9xl">🐄</div>
              </div>
              <div className="relative z-10 p-8 w-full bg-gradient-to-t from-black/60 to-transparent">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="w-10 h-10 rounded-full bg-[#0d5c2e] flex items-center justify-center text-white font-bold flex-shrink-0">J</div>
                  <div>
                    <div className="text-white font-semibold text-sm">Dr. Mohammad Jasim Uddin</div>
                    <div className="text-green-300 text-xs">PhD · Animal Nutrition Specialist</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -left-6 top-12 bg-white rounded-2xl shadow-xl p-4 border border-gray-100 max-w-[180px]"
            >
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle size={14} className="text-[#0d5c2e]" />
                <span className="text-xs font-semibold text-gray-800">100% Safe</span>
              </div>
              <p className="text-xs text-gray-500">All products certified & research-backed</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ─── Solutions Preview ─────────────────────────────────────── */
const solutions = [
  {
    category: 'Poultry',
    title: 'How enzyme supplementation cut feed costs by 18% in broiler farms',
    desc: 'By introducing targeted phytase and xylanase blends, partner farms saw a significant reduction in feed conversion ratios.',
    tag: 'Feed Enzymes',
    emoji: '🐔',
    bg: 'bg-amber-50',
  },
  {
    category: 'Cattle',
    title: 'Probiotic programs that improved dairy yield and herd immunity',
    desc: 'Multi-strain probiotic protocols provided to dairy farms resulted in measurable improvement in milk output and disease resistance.',
    tag: 'Probiotics',
    emoji: '🐄',
    bg: 'bg-blue-50',
  },
  {
    category: 'Aquaculture',
    title: 'Growth promoters driving faster harvest cycles in fish farms',
    desc: 'Non-antibiotic growth additives helped aquaculture clients achieve target weight 12% faster with lower mortality rates.',
    tag: 'Growth Promoters',
    emoji: '🐟',
    bg: 'bg-teal-50',
  },
]

function SolutionsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="mb-14 text-center">
          <p className="text-[#0d5c2e] text-sm font-semibold uppercase tracking-widest mb-3">Our Impact</p>
          <h2 className="text-4xl font-bold text-gray-900">See how we solve problems, right on farms</h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {solutions.map((s) => (
            <motion.div
              key={s.title}
              variants={scaleIn}
              whileHover={{ y: -4 }}
              className={`${s.bg} rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all`}
            >
              <div className="flex items-center justify-center text-7xl h-40 bg-white/50">
                {s.emoji}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs bg-[#0d5c2e] text-white px-2.5 py-0.5 rounded-full font-medium">{s.category}</span>
                  <span className="text-xs text-gray-400">{s.tag}</span>
                </div>
                <h3 className="font-bold text-gray-900 text-sm leading-snug mb-2">{s.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ─── CTA Banner ────────────────────────────────────────────── */
function CTABanner() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-20 bg-gray-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div variants={slideLeft} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <p className="text-green-500 text-sm font-semibold uppercase tracking-widest mb-3">Take the next step</p>
            <h2 className="text-4xl font-bold text-white leading-tight">
              It's time for better nutrition, with sustainable & science-backed resources
            </h2>
          </motion.div>
          <motion.div variants={slideRight} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="flex flex-col sm:flex-row gap-4 lg:justify-end">
            <Link to="/contact" className="flex items-center justify-center gap-2 bg-[#0d5c2e] hover:bg-green-600 text-white font-semibold px-8 py-4 rounded-full transition-colors group">
              Get in Touch <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/products" className="flex items-center justify-center gap-2 border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-full transition-colors">
              Our Products
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ─── Page ──────────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <Hero />
      <FocusSection />
      <ServicesSection />
      <TrustedSection />
      <SolutionsSection />
      <CTABanner />
    </>
  )
}