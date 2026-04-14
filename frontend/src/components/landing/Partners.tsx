import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp, staggerContainer, slideLeft, slideRight } from '../../lib/animations'
import { CheckCircle } from 'lucide-react'

const partners = [
  {
    name: 'Tex Biosciences (P) Ltd',
    origin: '🇮🇳 India',
    badge: 'ISO Certified',
    badgeColor: 'bg-green-100 text-green-700',
    description:
      'A world-class manufacturer of enzymes, probiotics, and specialty biotech products. Tex Biosciences is our primary global partner, providing cutting-edge fermentation-based solutions trusted by feed mills across Asia.',
    highlights: ['ISO 9001:2015 Certified', 'Feed Enzymes', 'Probiotics', 'Amino Acid Solutions'],
    color: 'border-l-[#0d5c2e]',
    logo: 'TB',
    bg: 'bg-green-600',
  },
  {
    name: 'Zenex Animal Health',
    origin: '🇮🇳 India',
    badge: 'Premium Partner',
    badgeColor: 'bg-blue-100 text-blue-700',
    description:
      'A trusted name in high-quality animal healthcare solutions. Zenex provides scientifically validated health supplements that complement our feed nutrition lineup for complete animal wellbeing.',
    highlights: ['Animal Healthcare', 'Growth Promoters', 'Health Supplements', 'Research-Backed'],
    color: 'border-l-[#1a3f8f]',
    logo: 'ZA',
    bg: 'bg-blue-700',
  },
]

export default function Partners() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="partners" ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <span className="inline-block bg-blue-50 text-[#1a3f8f] text-sm font-semibold px-4 py-1.5 rounded-full border border-blue-200 mb-4">
            Strategic Partnerships
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Backed by Global Leaders
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            We partner exclusively with ISO-certified, internationally recognised manufacturers
            to guarantee the highest quality in every product we deliver.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
        >
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              variants={i === 0 ? slideLeft : slideRight}
              className={`bg-gray-50 rounded-2xl p-8 border-l-4 ${partner.color} hover:shadow-lg transition-shadow`}
            >
              <div className="flex items-start gap-5">
                <div className={`w-14 h-14 rounded-2xl ${partner.bg} flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-md`}>
                  {partner.logo}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="text-xl font-bold text-gray-900">{partner.name}</h3>
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${partner.badgeColor}`}>
                      {partner.badge}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">{partner.origin}</p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-5">{partner.description}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {partner.highlights.map((h) => (
                      <div key={h} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle size={14} className="text-[#0d5c2e] flex-shrink-0" />
                        {h}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* AHCAB membership banner */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="bg-gradient-to-r from-[#0d5c2e] to-[#1a7a3f] rounded-2xl p-8 text-white text-center"
        >
          <div className="text-4xl mb-3">🏅</div>
          <h3 className="text-2xl font-bold mb-2">AHCAB Member Since 2020</h3>
          <p className="text-green-100 max-w-xl mx-auto">
            Proud active member of the Animal Health Companies Association of Bangladesh (AHCAB),
            upholding the highest standards in animal health and nutrition.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
