import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, CheckCircle, FlaskConical, Microscope, TrendingUp, Dna, Leaf, Fish, ShieldCheck, Sprout, Activity, Wheat, Package } from 'lucide-react'
import { fadeUp, staggerContainer, scaleIn } from '../lib/animations'
import { THEMES } from './admin/AdminProducts'
import { apiBase } from '../lib/api'

const PRODUCT_ICON_MAP: Record<string, React.ReactNode> = {
  FlaskConical: <FlaskConical size={26} />,
  Microscope:   <Microscope size={26} />,
  TrendingUp:   <TrendingUp size={26} />,
  Dna:          <Dna size={26} />,
  Leaf:         <Leaf size={26} />,
  Fish:         <Fish size={26} />,
  ShieldCheck:  <ShieldCheck size={26} />,
  Sprout:       <Sprout size={26} />,
  Activity:     <Activity size={26} />,
  Wheat:        <Wheat size={26} />,
  Package:      <Package size={26} />,
}
import { useContent } from '../contexts/SiteContent'

interface ApiProduct {
  id: string; title: string; tagline: string; desc: string
  benefits: string; tag: string; theme: string; iconName: string
  position: number; isVisible: boolean
}


const HARDCODED_CATEGORIES = [
  { title: 'Feed Enzymes', tagline: 'Unlock more nutrition from every kilogram of feed', desc: 'Our enzyme complexes — including phytase, xylanase, and amylase — break down anti-nutritional factors in feed, dramatically improving digestibility and reducing feed costs.', benefits: ['Improved feed conversion ratio (FCR)', 'Reduced feed ingredient costs', 'Better nutrient absorption', 'Suitable for poultry and ruminants'], tag: 'Best Seller', theme: 'green', iconName: 'FlaskConical' },
  { title: 'Probiotics & Prebiotics', tagline: 'Gut health is the foundation of farm productivity', desc: 'Multi-strain probiotic formulas containing Lactobacillus, Bacillus, and Saccharomyces deliver measurable improvements in gut health, immunity, and overall animal wellbeing.', benefits: ['Enhanced gut microbiota balance', 'Reduced mortality rates', 'Natural antibiotic alternative', 'Improved feed utilisation'], tag: 'Popular', theme: 'blue', iconName: 'Microscope' },
  { title: 'Growth Promoters', tagline: 'Reach target weight faster — without antibiotics', desc: 'Science-backed, non-antibiotic growth enhancement solutions designed to improve weight gain, body condition, and production yields in poultry, cattle, and aquaculture.', benefits: ['Faster time to target weight', 'Improved body weight uniformity', 'No antibiotic residue risk', 'Compliant with international standards'], tag: 'Antibiotic-Free', theme: 'amber', iconName: 'TrendingUp' },
  { title: 'Specialty Biotech Products', tagline: 'Cutting-edge fermentation science for superior results', desc: 'Fermentation-derived additives and specialty amino acid formulations developed by our partner Tex Biosciences — delivering innovation directly from global biotech labs to your farm.', benefits: ['Fermentation-based active ingredients', 'Amino acid optimisation', 'Developed with ISO-certified partners', 'Precision-targeted nutrition'], tag: 'Advanced', theme: 'purple', iconName: 'Dna' },
  { title: 'Mineral & Vitamin Premixes', tagline: 'Complete micronutrition for balanced animal diets', desc: 'Scientifically formulated mineral and vitamin blends ensuring animals receive every essential micronutrient needed for optimal health, reproduction, and productivity.', benefits: ['Complete trace mineral coverage', 'Fat and water-soluble vitamins', 'Customisable for species & life stage', 'Improves reproductive performance'], tag: 'Essential', theme: 'lime', iconName: 'Leaf' },
]

function normaliseProduct(p: ApiProduct | typeof HARDCODED_CATEGORIES[0]) {
  const theme = THEMES[p.theme] ?? THEMES.green
  let benefits: string[]
  if ('benefits' in p && typeof p.benefits === 'string') {
    try { benefits = JSON.parse(p.benefits) } catch { benefits = p.benefits.split('\n').filter(Boolean) }
  } else {
    benefits = p.benefits as unknown as string[]
  }
  return { ...p, benefits, tagColor: theme.tagColor, border: theme.border, accent: theme.accent, icon: PRODUCT_ICON_MAP[p.iconName] ?? <Package size={26} /> }
}

const partners = [
  { name: 'Tex Biosciences (P) Ltd', origin: 'India', desc: 'World-class manufacturer of enzymes & probiotics', badge: 'ISO 9001:2015', logo: 'TB', bg: 'bg-green-700' },
  { name: 'Zenex Animal Health', origin: 'India', desc: 'High-quality animal healthcare solutions', badge: 'Premium Partner', logo: 'ZA', bg: 'bg-blue-700' },
]

function PageHero() {
  const headline = useContent('products.hero.headline', 'Premium Nutrition Solutions')
  const tagline  = useContent('products.hero.tagline',  'Imported from ISO-certified global partners — every product we supply is scientifically validated and field-proven.')
  return (
    <section className="relative py-24 bg-gradient-to-br from-[#0a3d1f] to-[#0d5c2e] overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_70%_50%,white,transparent_60%)]" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="text-green-300 text-sm font-semibold uppercase tracking-widest mb-3">Our Products</p>
          <h1 className="text-5xl font-extrabold text-white mb-5 max-w-2xl leading-tight">{headline}</h1>
          <p className="text-green-100 text-lg max-w-xl leading-relaxed">{tagline}</p>
        </motion.div>
      </div>
    </section>
  )
}

function ProductList() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [apiProducts, setApiProducts] = useState<ApiProduct[] | null>(null)

  useEffect(() => {
    fetch(`${apiBase}/products`)
      .then(r => r.ok ? r.json() : [])
      .then((data: ApiProduct[]) => setApiProducts(data.length > 0 ? data : null))
      .catch(() => setApiProducts(null))
  }, [])

  const categories = (apiProducts ?? HARDCODED_CATEGORIES).map(normaliseProduct)

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div variants={staggerContainer} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="space-y-8">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              variants={fadeUp}
              custom={i}
              className={`rounded-2xl border ${cat.border} overflow-hidden hover:shadow-lg transition-shadow`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3">
                {/* Left accent block */}
                <div className="lg:col-span-1 p-8 flex flex-col justify-between" style={{ backgroundColor: `${cat.accent}10` }}>
                  <div>
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                    style={{ background: `${cat.accent}18`, color: cat.accent }}>
                    {cat.icon}
                  </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${cat.tagColor}`}>{cat.tag}</span>
                    <h3 className="text-2xl font-bold text-gray-900 mt-3 mb-2">{cat.title}</h3>
                    <p className="text-sm font-medium" style={{ color: cat.accent }}>{cat.tagline}</p>
                  </div>
                </div>

                {/* Right content */}
                <div className="lg:col-span-2 p-8 bg-white">
                  <p className="text-gray-600 leading-relaxed mb-6">{cat.desc}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {cat.benefits.map((b) => (
                      <div key={b} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle size={14} className="flex-shrink-0 mt-0.5" style={{ color: cat.accent }} />
                        {b}
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all" style={{ color: cat.accent }}>
                      Enquire about this product <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function PartnersBadge() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-16 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="text-center mb-10">
          <p className="text-[#0d5c2e] text-sm font-semibold uppercase tracking-widest mb-2">Sourced From</p>
          <h2 className="text-2xl font-bold text-gray-900">Our Global Supply Partners</h2>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {partners.map((p) => (
            <motion.div key={p.name} variants={scaleIn} className="bg-white rounded-2xl border border-gray-100 p-6 flex items-center gap-4 shadow-sm">
              <div className={`w-12 h-12 rounded-xl ${p.bg} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>{p.logo}</div>
              <div>
                <div className="font-semibold text-gray-900 text-sm">{p.name}</div>
                <div className="text-xs text-gray-500 mt-0.5">{p.desc}</div>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full">{p.badge}</span>
                  <span className="text-xs text-gray-400">{p.origin}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="py-20 bg-gray-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Not sure which product is right for you?</h2>
        <p className="text-gray-400 mb-8 max-w-xl mx-auto">Our technical team, led by Dr. Jasim Uddin, will help you identify the right solution for your specific farm or feed mill needs.</p>
        <Link to="/contact" className="inline-flex items-center gap-2 bg-[#0d5c2e] hover:bg-green-600 text-white font-semibold px-8 py-4 rounded-full transition-colors group">
          Talk to an Expert <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  )
}

export default function Products() {
  return (
    <>
      <PageHero />
      <ProductList />
      <PartnersBadge />
      <CTA />
    </>
  )
}