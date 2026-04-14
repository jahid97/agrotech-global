import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { staggerContainer, fadeUp, scaleIn } from '../../lib/animations'

const products = [
  {
    icon: '⚗️',
    color: 'bg-emerald-50 border-emerald-200',
    accent: 'text-emerald-700',
    title: 'Feed Enzymes',
    description:
      'Advanced enzyme complexes to improve feed digestibility and nutrient absorption in poultry and cattle — reducing feed costs while boosting performance.',
    tags: ['Phytase', 'Xylanase', 'Amylase'],
  },
  {
    icon: '🦠',
    color: 'bg-blue-50 border-blue-200',
    accent: 'text-blue-700',
    title: 'Probiotics & Prebiotics',
    description:
      'Natural gut health solutions to boost immunity and beneficial microflora. Improve feed conversion and reduce mortality without antibiotics.',
    tags: ['Lactobacillus', 'Bacillus', 'MOS/FOS'],
  },
  {
    icon: '📈',
    color: 'bg-red-50 border-red-200',
    accent: 'text-red-700',
    title: 'Growth Promoters',
    description:
      'Non-antibiotic, research-backed formulas that enhance weight gain, feed efficiency, and production yields naturally and safely.',
    tags: ['Non-Antibiotic', 'FCR Improvement', 'Natural'],
  },
  {
    icon: '🧬',
    color: 'bg-purple-50 border-purple-200',
    accent: 'text-purple-700',
    title: 'Specialty Biotech Products',
    description:
      'Fermentation-derived additives and amino acid formulations developed by our global partners for cutting-edge performance.',
    tags: ['Fermentation', 'Amino Acids', 'Biotech'],
  },
  {
    icon: '🌿',
    color: 'bg-lime-50 border-lime-200',
    accent: 'text-lime-700',
    title: 'Mineral & Vitamin Premixes',
    description:
      'Scientifically formulated micronutrient blends to ensure complete, balanced diets for maximum animal health and productivity.',
    tags: ['Trace Minerals', 'Fat-Soluble Vitamins', 'Balanced'],
  },
  {
    icon: '🔬',
    color: 'bg-orange-50 border-orange-200',
    accent: 'text-orange-700',
    title: 'Technical Consulting',
    description:
      'Expert guidance from Dr. Jasim Uddin and our team to help feed mills and farmers optimize nutrition programs for maximum ROI.',
    tags: ['Feed Mills', 'Farm Advisory', 'ROI Focused'],
  },
]

export default function Products() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="products" ref={ref} className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <span className="inline-block bg-white text-[#0d5c2e] text-sm font-semibold px-4 py-1.5 rounded-full border border-green-200 mb-4 shadow-sm">
            Our Products
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Premium Nutrition Solutions
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            We import and distribute world-class animal nutrition products from ISO-certified
            global partners — backed by science, proven in the field.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {products.map((product) => (
            <motion.div
              key={product.title}
              variants={scaleIn}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className={`bg-white rounded-2xl p-7 border ${product.color} hover:shadow-lg transition-shadow group cursor-default`}
            >
              <div className="text-4xl mb-4">{product.icon}</div>
              <h3 className={`text-lg font-bold mb-3 ${product.accent}`}>{product.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-5">{product.description}</p>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
