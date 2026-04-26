import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { GraduationCap, Building2, Award, Globe, ArrowRight, Target, Rocket, Sprout } from 'lucide-react'
import { fadeUp, staggerContainer, slideLeft, slideRight, scaleIn } from '../lib/animations'
import { useContent } from '../contexts/SiteContent'
import { apiBase } from '../lib/api'
import { geoNaturalEarth1, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'

/* ─── Page Hero ──────────────────────────────────────────────── */
function PageHero() {
  const headline = useContent('about.hero.headline', 'Importing Global Standards, Supporting Local Farms')
  const tagline  = useContent('about.hero.tagline',  'An authorized importer and distributor of world-class animal nutrition products — growing across Bangladesh since 2020.')
  return (
    <section className="relative py-24 bg-gradient-to-br from-[#0a3d1f] to-[#0d5c2e] overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_50%,white,transparent_60%)]" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="text-green-300 text-sm font-semibold uppercase tracking-widest mb-3">About Us</p>
          <h1 className="text-5xl font-extrabold text-white mb-5 max-w-2xl leading-tight">
            {headline}
          </h1>
          <p className="text-green-100 text-lg max-w-xl leading-relaxed">
            {tagline}
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
  const p1 = useContent('about.story.p1', 'Agrotech Global BD Nutrition is an authorized importer and distributor of animal nutrition products and feed supplements in Bangladesh. We were established to give local farms direct access to globally certified, research-backed nutrition solutions that were previously hard to source.')
  const p2 = useContent('about.story.p2', 'We import exclusively from ISO-certified manufacturers and distribute across poultry farms, dairy operations, feed mills, and aquaculture businesses — combining reliable supply with practical on-ground technical support.')
  const p3 = useContent('about.story.p3', 'As an active member of AHCAB since 2020 and a growing presence in the Bangladesh livestock sector, we are committed to raising the standard of animal nutrition — one farm at a time.')
  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={slideLeft} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <p className="text-[#0d5c2e] text-sm font-semibold uppercase tracking-widest mb-3">Our Story</p>
            <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-6">
              From global labs to Bangladesh's farms
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">{p1}</p>
            <p className="text-gray-600 leading-relaxed mb-4">{p2}</p>
            <p className="text-gray-600 leading-relaxed">{p3}</p>
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
  const bio   = useContent('about.founder.bio',   "Dr. Jasim is a highly respected figure in Bangladesh's animal nutrition landscape. Combining deep academic expertise as a professor at Sylhet Agricultural University with hands-on industry experience, he founded Agrotech Global BD Nutrition to create a direct bridge between global science and local farming needs.")
  const quote = useContent('about.founder.quote', 'Our goal is to make world-class animal nutrition accessible to every farmer in Bangladesh — backed by science, driven by impact.')
  const credentials = [
    { icon: <GraduationCap size={16} />, text: 'PhD in Animal Nutrition' },
    { icon: <Building2 size={16} />, text: 'Professor, Sylhet Agricultural University' },
    { icon: <Award size={16} />, text: 'AHCAB Active Member since 2020' },
    { icon: <Globe size={16} />, text: 'Global Biotech Partnerships' },
  ]
  return (
    <section ref={ref} className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="text-center mb-16">
          <p className="text-[#0d5c2e] text-sm font-semibold uppercase tracking-widest mb-3">Leadership</p>
          <h2 className="text-4xl font-bold text-gray-900">Meet Our Founder</h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-col lg:flex-row items-center lg:items-start gap-14 max-w-4xl mx-auto"
        >
          {/* Left — circular photo */}
          <motion.div variants={fadeUp} className="flex-shrink-0 flex flex-col items-center">
            <div className="relative">
              <div className="absolute -inset-4 rounded-full border-2 border-dashed border-[#0d5c2e]/20 animate-[spin_20s_linear_infinite]" />
              <div className="absolute -inset-1.5 rounded-full border border-[#0d5c2e]/10" />
              <div className="w-44 h-44 rounded-full bg-gradient-to-br from-[#0a3d1f] via-[#0d5c2e] to-[#1a7a3f] border-4 border-gray-50 shadow-xl flex items-center justify-center relative z-10 overflow-hidden">
                <span className="text-7xl font-black text-white/90 select-none">J</span>
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/15 to-transparent" />
              </div>
            </div>
          </motion.div>

          {/* Right — info */}
          <motion.div variants={fadeUp} className="flex-1 text-center lg:text-left">
            <h3 className="text-3xl font-bold text-gray-900">Dr. Mohammad Jasim Uddin</h3>
            <p className="text-[#0d5c2e] font-semibold mt-2">Founder & Managing Director</p>
            <p className="text-gray-400 text-sm mt-0.5">PhD · Animal Nutrition Specialist</p>

            <p className="text-gray-600 leading-relaxed mt-6 text-sm">{bio}</p>

            {/* Credentials */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {credentials.map((c) => (
                <div key={c.text} className="flex items-center gap-2.5 text-sm text-gray-600">
                  <span className="text-[#0d5c2e] flex-shrink-0">{c.icon}</span>
                  <span>{c.text}</span>
                </div>
              ))}
            </div>

            {/* Quote */}
            <p className="mt-8 text-gray-500 text-sm italic border-l-2 border-[#0d5c2e] pl-4 leading-relaxed">
              "{quote}"
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Partners ───────────────────────────────────────────────── */
interface Partner {
  id: string; name: string; website: string | null
  logoUrl: string | null; initial: string; bgColor: string
}

const FALLBACK_PARTNERS: Partner[] = [
  { id: 'f1', name: 'Tex Biosciences',   website: null, logoUrl: null, initial: 'TB', bgColor: '#1d4ed8' },
  { id: 'f2', name: 'Zenex Animal Health', website: null, logoUrl: null, initial: 'ZA', bgColor: '#0d5c2e' },
]

function Partners() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [partners, setPartners] = useState<Partner[]>([])

  useEffect(() => {
    fetch(`${apiBase}/partners`)
      .then(r => r.json())
      .then(d => { if (Array.isArray(d) && d.length) setPartners(d) })
      .catch(() => {})
  }, [])

  const display = partners.length ? partners : FALLBACK_PARTNERS

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="text-center mb-12">
          <p className="text-[#0d5c2e] text-sm font-semibold uppercase tracking-widest mb-3">Global Network</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Trusted Partners</h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
            We source exclusively from ISO-certified global leaders — ensuring every product meets the highest international standards.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          <div
            className="flex gap-4 overflow-x-auto pb-3"
            style={{ scrollbarWidth: 'thin', scrollbarColor: '#d1d5db transparent' }}
          >
            {display.map(p => (
              <div
                key={p.id}
                className="flex-shrink-0 w-56 bg-gray-50 border border-gray-100 rounded-2xl p-6 flex flex-col items-center gap-4 hover:shadow-md hover:border-gray-200 transition-all"
              >
                {/* Avatar / logo */}
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl overflow-hidden shadow-sm flex-shrink-0"
                  style={{ backgroundColor: p.bgColor }}
                >
                  {p.logoUrl
                    ? <img src={p.logoUrl} alt={p.name} className="w-full h-full object-contain p-2" />
                    : <span>{p.initial || p.name.slice(0, 2).toUpperCase()}</span>
                  }
                </div>

                {/* Name */}
                <p className="text-base font-semibold text-gray-800 text-center leading-snug">{p.name}</p>

                {/* Website link */}
                {p.website && (
                  <a
                    href={p.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#0d5c2e] hover:underline"
                  >
                    Visit site →
                  </a>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Import Origins Map ─────────────────────────────────────── */
// Pure d3-geo + topojson-client — no react-simple-maps (incompatible with React 19)

const MAP_W = 980
const MAP_H = 420

interface ApiMapLocation {
  id: string; name: string; longitude: number; latitude: number
  color: string; tooltip: string; isVisible: boolean
}

const BD: [number, number] = [90.35, 23.68]

function ImportMap() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [paths, setPaths]       = useState<string[]>([])
  const projRef                 = useRef<ReturnType<typeof geoNaturalEarth1> | null>(null)
  const [ready, setReady]       = useState(false)
  const [sources, setSources]   = useState<ApiMapLocation[]>([])
  const [hovered, setHovered]   = useState<string | null>(null)

  useEffect(() => {
    // Load map geo + API locations in parallel
    Promise.all([
      fetch('/countries-110m.json').then(r => r.json()),
      fetch(`${apiBase}/map-locations`).then(r => r.json()).catch(() => []),
    ]).then(([topo, locs]: [any, ApiMapLocation[]]) => {
      const proj = geoNaturalEarth1().fitSize([MAP_W, MAP_H], { type: 'Sphere' } as any)
      projRef.current = proj
      const pg = geoPath(proj)
      const countries = feature(topo, topo.objects.countries) as any
      setPaths((countries.features as any[]).map((f: any) => pg(f) ?? ''))
      setSources(Array.isArray(locs) ? locs : [])
      setReady(true)
    }).catch(e => console.error('Map load error:', e))
  }, [])

  function pt(coords: [number, number]): [number, number] {
    return (projRef.current?.(coords) as [number, number]) ?? [0, 0]
  }

  const bdPt = ready ? pt(BD) : null

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-10"
        >
          <p className="text-[#0d5c2e] text-sm font-semibold uppercase tracking-widest mb-3">Import Origins</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Where We Source From</h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
            All products are imported directly from ISO-certified manufacturers and delivered
            to farms and feed mills across Bangladesh.
          </p>
        </motion.div>

        <motion.div
          variants={scaleIn} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="rounded-3xl overflow-hidden border border-gray-200 bg-[#e5e7eb] relative"
        >
          {/* SVG map — viewBox gives intrinsic aspect ratio; CSS scales it */}
          <div className="relative">
            <svg
              viewBox={`0 0 ${MAP_W} ${MAP_H}`}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            >
              {/* Country fills — gray */}
              {paths.map((d, i) =>
                d ? <path key={i} d={d} fill="#d1d5db" stroke="#9ca3af" strokeWidth={0.4} /> : null
              )}

              {/* Dashed import routes */}
              {ready && bdPt && sources.map(src => {
                const [x1, y1] = pt([src.longitude, src.latitude])
                const [x2, y2] = bdPt
                const cx = (x1 + x2) / 2
                const cy = Math.min(y1, y2) - Math.abs(x2 - x1) * 0.22
                const isH = hovered === src.id
                return (
                  <path
                    key={src.id}
                    d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
                    fill="none"
                    stroke={src.color}
                    strokeWidth={isH ? 2.2 : 1.4}
                    strokeDasharray="6 4"
                    strokeLinecap="round"
                    opacity={hovered ? (isH ? 0.9 : 0.15) : 0.5}
                    style={{ transition: 'opacity 0.25s' }}
                  />
                )
              })}

              {/* Source markers */}
              {ready && sources.map(src => {
                const [x, y] = pt([src.longitude, src.latitude])
                const isH = hovered === src.id
                return (
                  <g
                    key={src.id}
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={() => setHovered(src.id)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <circle cx={x} cy={y} r={8} fill={src.color} opacity={0.15} style={{ pointerEvents: 'none' }}>
                      <animate attributeName="r"       values="8;22;8"    dur="2.8s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.2;0;0.2" dur="2.8s" repeatCount="indefinite" />
                    </circle>
                    <circle cx={x} cy={y} r={isH ? 7 : 5} fill={src.color} stroke="white" strokeWidth={1.5} />
                    <text x={x} y={y - 12} textAnchor="middle"
                      style={{ fill: '#92400e', fontSize: '10px', fontWeight: 700, fontFamily: 'system-ui,sans-serif', pointerEvents: 'none' }}>
                      {src.name}
                    </text>
                    {isH && (
                      <g style={{ pointerEvents: 'none' }}>
                        <rect x={x - 82} y={y - 52} width={164} height={26} rx={5}
                          fill="white" stroke={src.color} strokeWidth={0.8} opacity={0.97} />
                        <text x={x} y={y - 35} textAnchor="middle"
                          style={{ fill: '#374151', fontSize: '9px', fontFamily: 'system-ui,sans-serif' }}>
                          {src.tooltip}
                        </text>
                      </g>
                    )}
                  </g>
                )
              })}

              {/* Bangladesh destination */}
              {ready && bdPt && (
                <g>
                  <circle cx={bdPt[0]} cy={bdPt[1]} r={10} fill="#22c55e" opacity={0.15} style={{ pointerEvents: 'none' }}>
                    <animate attributeName="r"       values="10;24;10"    dur="2.2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.25;0;0.25" dur="2.2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx={bdPt[0]} cy={bdPt[1]} r={7} fill="#16a34a" stroke="white" strokeWidth={1.5} />
                  <circle cx={bdPt[0]} cy={bdPt[1]} r={3} fill="white" opacity={0.9} />
                  <text x={bdPt[0]} y={bdPt[1] - 14} textAnchor="middle"
                    style={{ fill: '#15803d', fontSize: '10px', fontWeight: 700, fontFamily: 'system-ui,sans-serif' }}>
                    Bangladesh
                  </text>
                </g>
              )}
            </svg>
          </div>

        </motion.div>
      </div>
    </section>
  )
}

/* ─── Mission & Values (Vertical Timeline) ───────────────────── */
function Values() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const milestones = [
    {
      year: '2020',
      dotBorder: 'border-green-500',
      icon: <Target size={20} />,
      iconBg: 'bg-green-50 text-[#0d5c2e]',
      title: 'Our Motive',
      desc: "Bridge the gap between global biotech advancements and Bangladesh's livestock industry by solving the challenge of rising feed costs and declining farm productivity.",
    },
    {
      year: '2022',
      dotBorder: 'border-blue-500',
      icon: <Rocket size={20} />,
      iconBg: 'bg-blue-50 text-blue-700',
      title: 'Our Objective',
      desc: "Supply 100% safe, research-backed supplements. Promote sustainable farming practices. Provide expert technical consulting to maximise farmer ROI.",
    },
    {
      year: '2025',
      dotBorder: 'border-emerald-500',
      icon: <Sprout size={20} />,
      iconBg: 'bg-emerald-50 text-emerald-700',
      title: 'Our Commitment',
      desc: "Reduce reliance on harmful chemicals, support natural growth, and build a healthier, more sustainable future for Bangladesh's livestock and aquaculture industry.",
    },
  ]

  return (
    <section ref={ref} className="py-24 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="text-center mb-20">
          <p className="text-[#0d5c2e] text-sm font-semibold uppercase tracking-widest mb-3">What Drives Us</p>
          <h2 className="text-4xl font-bold text-gray-900">Mission & Values</h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical center line — desktop only */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200" style={{ transform: 'translateX(-0.5px)' }} />

          <div>
            {milestones.map((m, i) => {
              const isLeft = i % 2 === 0
              return (
                <motion.div
                  key={m.title}
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  transition={{ delay: i * 0.2 }}
                  className="relative md:grid md:grid-cols-2 md:pb-16 last:md:pb-0"
                >
                  {/* Content block — placed left or right via col-start */}
                  <div
                    className={[
                      /* mobile: left border + padding */
                      'relative border-l-2 border-gray-200 pl-8 pb-12 last:pb-0',
                      /* desktop: no border, col placement */
                      'md:border-0 md:pl-0 md:pb-0',
                      isLeft
                        ? 'md:col-start-1 md:pr-16 md:text-right'
                        : 'md:col-start-2 md:pl-16',
                    ].join(' ')}
                  >
                    {/* Mobile dot */}
                    <div className={`md:hidden absolute -left-[9px] top-[60px] w-4 h-4 rounded-full bg-gray-50 border-4 ${m.dotBorder}`} />

                    {/* Large muted year */}
                    <div className="text-[80px] leading-none font-black text-gray-200 select-none -mb-2">{m.year}</div>

                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${m.iconBg} mb-3 ${isLeft ? 'md:ml-auto' : ''}`}>
                      {m.icon}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{m.title}</h3>

                    {/* Description */}
                    <p className="text-gray-500 text-sm leading-relaxed">{m.desc}</p>
                  </div>

                  {/* Center dot — desktop only */}
                  <div
                    className={`hidden md:block absolute left-1/2 w-5 h-5 rounded-full bg-gray-50 border-4 ${m.dotBorder} shadow-md z-10`}
                    style={{ top: '58px', transform: 'translateX(-50%)' }}
                  />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── CTA ────────────────────────────────────────────────────── */
function CTA() {
  return (
    <section className="py-20 bg-gray-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Ready to bring better nutrition to your farm?</h2>
        <p className="text-gray-400 mb-8 max-w-xl mx-auto">Get in touch with our team to learn which imported products are right for your operation — poultry, dairy, or aquaculture.</p>
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
      <Partners />
      <ImportMap />
      <Values />
      <CTA />
    </>
  )
}
