import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, ArrowRight, CheckCircle, FlaskConical, Leaf, TrendingUp, Users, ShieldCheck, Microscope, Sprout, Fish, Wheat, Activity } from 'lucide-react'
import { fadeUp, staggerContainer, scaleIn, slideLeft, slideRight } from '../lib/animations'
import { useContent } from '../contexts/SiteContent'
import { apiBase } from '../lib/api'

/* ─── Flip Column ───────────────────────────────────────────── */

function FadeColumn({ photos, delay, priority }: { photos: string[]; delay: number; priority?: boolean }) {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const start = setTimeout(() => {
      const interval = setInterval(() => {
        setIdx(prev => (prev + 1) % photos.length)
      }, 20000)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(start)
  }, [delay, photos.length])

  return (
    <div className="relative flex-1 overflow-hidden">
      {/* Keep all images mounted so browser caches them — only opacity changes */}
      {photos.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          fetchPriority={priority && i === 0 ? 'high' : 'low'}
          loading={priority && i === 0 ? 'eager' : 'lazy'}
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[1800ms] ease-in-out"
          style={{ opacity: i === idx ? 1 : 0 }}
        />
      ))}
    </div>
  )
}

/* ─── Hero ─────────────────────────────────────────────────── */
function Hero() {
  const badge = useContent('home.hero.badge', 'Imported Animal Nutrition · Growing Across Bangladesh')
  const headline = useContent('home.hero.headline', 'Bringing Global Animal Nutrition')
  const highlight = useContent('home.hero.headline_highlight', "to Bangladesh's Farms")

  const p1 = useContent('home.photo.1', '/photo_1.jpg')
  const p2 = useContent('home.photo.2', '/photo_2.jpg')
  const p3 = useContent('home.photo.3', '/photo_3.jpg')
  const p4 = useContent('home.photo.4', '/photo_4.jpg')
  const p5 = useContent('home.photo.5', '/photo_5.jpg')
  const p6 = useContent('home.photo.6', '/photo_6.jpg')

  const columnPhotos = [[p1, p4], [p2, p5], [p3, p6]]

  const s0v = useContent('home.stat.0.value', '5+')
  const s0l = useContent('home.stat.0.label', 'Product categories nationwide')
  const s1v = useContent('home.stat.1.value', '2020')
  const s1l = useContent('home.stat.1.label', 'Established & AHCAB certified')
  const s2v = useContent('home.stat.2.value', '2')
  const s2l = useContent('home.stat.2.label', 'ISO-certified global partners')

  const stats = [
    { value: s0v, label: s0l },
    { value: s1v, label: s1l },
    { value: s2v, label: s2l },
  ]

  return (
    <section className="bg-white">
      {/* Outer wrapper — full width, rounded bottom corners (hinge) */}
      <div className="relative rounded-b-[28px] overflow-hidden bg-[#071a14] h-[85vh] flex flex-col">

        {/* ── 3-column flipping photo grid ── */}
        <div className="absolute inset-0 z-0 flex">
          {columnPhotos.map((photos, i) => (
            <FadeColumn key={i} photos={photos} delay={i * 7000} priority={i === 0} />
          ))}
        </div>

        {/* Thin dividers between columns */}
        <div className="absolute inset-0 z-[1] pointer-events-none flex">
          <div className="flex-1" />
          <div className="w-px bg-white/15 h-full" />
          <div className="flex-1" />
          <div className="w-px bg-white/15 h-full" />
          <div className="flex-1" />
        </div>

        {/* Dark tint */}
        <div className="absolute inset-0 z-[2] bg-[#071a14]/50 pointer-events-none" />
        {/* Green brand shade */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-br from-green-900/40 via-green-950/20 to-transparent pointer-events-none" />
        {/* Bottom fade */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-[#071a14]/75 via-transparent to-transparent pointer-events-none" />

        {/* Content */}
        <div className="relative z-[10] flex flex-col justify-between flex-1 px-8 pt-10 pb-8 sm:px-12 lg:px-16">

          {/* Badge row */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2.5 bg-white/[0.07] backdrop-blur-md border border-white/[0.12] rounded-full px-4 py-1.5 w-fit"
          >
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-white/75 text-xs font-medium tracking-wide">
              {badge}
            </span>
          </motion.div>

          {/* Headline + CTAs */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5 max-w-2xl"
            >
              {headline}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
                {highlight}
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap items-center gap-3"
            >
              <Link
                to="/contact"
                className="group flex items-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] text-[#071a14] hover:text-white font-bold text-sm px-5 py-2.5 rounded-full transition-all"
              >
                Get in touch
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <Link
                to="/products"
                className="group flex items-center gap-2 border border-white/20 hover:border-white/45 text-white/65 hover:text-white font-semibold text-sm px-5 py-2.5 rounded-full transition-all backdrop-blur-sm"
              >
                Our products
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Stats card — hinge at bottom right */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative z-[10] mx-6 sm:mx-10 lg:mx-0 lg:absolute lg:bottom-0 lg:right-0 lg:w-[50%] bg-white rounded-t-3xl lg:rounded-tl-3xl lg:rounded-tr-none overflow-hidden"
        >
          <div className="h-[3px] bg-gradient-to-r from-[#22c55e] via-[#16a34a] to-transparent" />
          <div className="px-6 py-5 grid grid-cols-3 gap-4">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">{s.value}</div>
                <div className="text-xs text-gray-400 leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Focus / Steps ─────────────────────────────────────────── */
function FocusSection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [step, setStep]       = useState(0)
  const [instant, setInstant] = useState(false)   // skip transition on wrap-back

  useEffect(() => {
    if (!inView) return
    const t = setInterval(() => {
      setStep(prev => {
        if (prev === 3) {
          // snap dot back to start without animation, then re-enable
          setInstant(true)
          setTimeout(() => setInstant(false), 80)
        }
        return (prev + 1) % 4
      })
    }, 1800)
    return () => clearInterval(t)
  }, [inView])

  const steps = [
    { num: '01', label: 'Import' },
    { num: '02', label: 'Quality Check' },
    { num: '03', label: 'Distribute' },
    { num: '04', label: 'Farm Support' },
  ]

  // The track runs from the center of col-1 to the center of col-4.
  // In a 4-col equal grid each col is 25% wide → centers at 12.5%, 37.5%, 62.5%, 87.5%.
  // Track: left=12.5%, right=12.5% → dot stops at 0%, 33.33%, 66.67%, 100% of track width.
  const DOT_STOPS = [0, 33.33, 66.67, 100]
  const ease      = 'easeInOut' as const
  const tx        = instant ? { duration: 0 } : { duration: 0.55, ease }

  return (
    <section ref={ref} className="py-20 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Section header */}
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

        {/* Steps row */}
        <div className="mt-14 relative">

          {/* ── Animated track — desktop only ── */}
          <div
            className="hidden md:block absolute"
            style={{ left: '12.5%', right: '12.5%', top: '31px', height: '2px' }}
          >
            {/* Gray base track */}
            <div className="absolute inset-0 rounded-full bg-gray-200" />

            {/* Green fill — grows with each step */}
            <motion.div
              className="absolute left-0 top-0 h-full rounded-full bg-[#0d5c2e] origin-left"
              animate={{ scaleX: DOT_STOPS[step] / 100 }}
              transition={tx}
            />

            {/* Moving dot */}
            <motion.div
              className="absolute w-[18px] h-[18px] rounded-full bg-[#0d5c2e] ring-[3px] ring-white shadow-[0_0_0_4px_rgba(13,92,46,0.18)]"
              animate={{ left: `${DOT_STOPS[step]}%` }}
              transition={tx}
              style={{ top: '50%', marginTop: '-9px', marginLeft: '-9px' }}
            />
          </div>

          {/* Circles + labels */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {steps.map((s, i) => {
              const isActive    = step === i
              const isCompleted = step > i
              return (
                <motion.div key={i} variants={scaleIn} className="flex flex-col items-center text-center">
                  <div
                    className={[
                      'relative z-10 w-16 h-16 rounded-full border-2 flex items-center justify-center font-bold text-lg mb-4 transition-all duration-500',
                      isActive    ? 'bg-[#0d5c2e] border-[#0d5c2e] text-white shadow-[0_0_0_6px_rgba(13,92,46,0.12)]' :
                      isCompleted ? 'bg-green-50 border-[#0d5c2e] text-[#0d5c2e]' :
                                    'bg-white border-gray-200 text-gray-400',
                    ].join(' ')}
                  >
                    {isCompleted
                      ? <CheckCircle size={22} className="text-[#0d5c2e]" />
                      : s.num
                    }
                  </div>
                  <span className={`text-sm font-semibold transition-colors duration-300 ${step >= i ? 'text-gray-900' : 'text-gray-400'}`}>
                    {s.label}
                  </span>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

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
              {/* Abstract organic background pattern */}
              <div className="absolute inset-0 flex items-center justify-center opacity-15">
                <div className="w-64 h-64 rounded-full bg-white/30 blur-2xl" />
              </div>
              <div className="absolute top-8 right-8 w-32 h-32 rounded-full bg-white/10 border border-white/20" />
              <div className="absolute top-20 right-20 w-16 h-16 rounded-full bg-white/10 border border-white/20" />
              <div className="absolute bottom-24 left-8 w-24 h-24 rounded-full bg-emerald-400/20 blur-xl" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Sprout size={96} className="text-white/10" strokeWidth={1} />
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

/* ─── Partners Strip ────────────────────────────────────────── */
interface ApiPartner { id: string; name: string; logoUrl: string | null; initial: string; bgColor: string; website: string | null }

const FALLBACK_PARTNERS: ApiPartner[] = [
  { id: '1', name: 'Tex Biosciences', logoUrl: null, initial: 'TB', bgColor: '#1d4ed8', website: null },
  { id: '2', name: 'Zenex Animal Health', logoUrl: null, initial: 'ZA', bgColor: '#0d5c2e', website: null },
]

function PartnersStrip() {
  const [partners, setPartners] = useState<ApiPartner[]>([])

  useEffect(() => {
    fetch(`${apiBase}/partners`)
      .then(r => r.ok ? r.json() : [])
      .then((data: ApiPartner[]) => setPartners(data.length > 0 ? data : FALLBACK_PARTNERS))
      .catch(() => setPartners(FALLBACK_PARTNERS))
  }, [])

  if (partners.length === 0) return null

  // Duplicate enough times so the marquee always fills the screen
  const times = Math.max(1, Math.ceil(8 / partners.length))
  const items = Array.from({ length: times * 2 }, (_, t) =>
    partners.map(p => ({ ...p, _key: `${t}-${p.id}` }))
  ).flat()

  return (
    <section className="py-10 bg-white border-y border-gray-100 overflow-hidden">
      {/* Label row */}
      <p className="text-center text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-6">
        Our Global Partners
      </p>

      {/* Marquee track */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div
          className="flex w-max"
          style={{ animation: 'partners-scroll 28s linear infinite' }}
          onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')}
          onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}
        >
          {items.map(p => (
            <div key={p._key} className="flex items-center gap-3 mx-10 opacity-60 hover:opacity-100 transition-opacity duration-300 cursor-default select-none">
              {/* Logo or initial badge */}
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-xs font-black flex-shrink-0 overflow-hidden"
                style={{ backgroundColor: p.bgColor }}
              >
                {p.logoUrl
                  ? <img src={p.logoUrl} alt={p.name} className="w-full h-full object-contain p-0.5" />
                  : p.initial || p.name.slice(0, 2).toUpperCase()
                }
              </div>
              <span className="text-sm font-semibold text-gray-600 whitespace-nowrap">{p.name}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes partners-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}

/* ─── Solutions Preview ─────────────────────────────────────── */
const solutions = [
  {
    category: 'Poultry',
    title: 'Enzyme supplements designed to improve feed efficiency in broiler farms',
    desc: 'Targeted phytase and xylanase blends help improve feed conversion ratios and nutrient absorption — supporting healthier broiler growth while reducing feed waste.',
    tag: 'Feed Enzymes',
    icon: <Wheat size={40} strokeWidth={1.2} />,
    headerBg: 'from-amber-600 to-amber-800',
    bg: 'bg-amber-50',
  },
  {
    category: 'Cattle',
    title: 'Probiotic programs to support dairy yield and herd immunity',
    desc: 'Multi-strain probiotic protocols for dairy farms, designed to support milk output, strengthen gut health, and improve natural disease resistance.',
    tag: 'Probiotics',
    icon: <Activity size={40} strokeWidth={1.2} />,
    headerBg: 'from-blue-600 to-blue-800',
    bg: 'bg-blue-50',
  },
  {
    category: 'Aquaculture',
    title: 'Growth promoters to support faster, healthier harvest cycles',
    desc: 'Non-antibiotic growth additives formulated to help aquaculture operations reach target weights sooner while keeping mortality rates low.',
    tag: 'Growth Promoters',
    icon: <Fish size={40} strokeWidth={1.2} />,
    headerBg: 'from-teal-600 to-teal-800',
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
          <p className="text-[#0d5c2e] text-sm font-semibold uppercase tracking-widest mb-3">What We Import</p>
          <h2 className="text-4xl font-bold text-gray-900">Products built to solve real challenges on Bangladesh's farms</h2>
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
              <div className={`h-40 bg-gradient-to-br ${s.headerBg} flex items-center justify-center text-white/40`}>
                {s.icon}
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
              Access globally certified nutrition products, backed by real science and local support
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
      <PartnersStrip />
      <CTABanner />
    </>
  )
}