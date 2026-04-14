import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { GraduationCap, Award, Building2, Globe } from 'lucide-react'
import { slideLeft, slideRight, staggerContainer, fadeUp } from '../../lib/animations'

const credentials = [
  { icon: <GraduationCap size={20} />, text: 'PhD in Animal Nutrition' },
  { icon: <Building2 size={20} />, text: 'Professor, Sylhet Agricultural University' },
  { icon: <Award size={20} />, text: 'AHCAB Member since 2020' },
  { icon: <Globe size={20} />, text: 'Global Biotech Partnerships' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section label */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <span className="inline-block bg-green-50 text-[#0d5c2e] text-sm font-semibold px-4 py-1.5 rounded-full border border-green-200 mb-4">
            About Us
          </span>
          <h2 className="text-4xl font-bold text-gray-900">
            Trusted Science, Local Impact
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Company info */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              <strong className="text-gray-900">Agrotech Global BD Nutrition</strong> is a leading importer, distributor,
              and solution provider for animal nutrition and feed supplements in Bangladesh.
              Since 2020, we have been committed to transforming the livestock industry by
              bringing world-class biotechnological innovations to local farms.
            </p>
            <p className="text-gray-600 leading-relaxed mb-10">
              Our mission is to bridge the gap between global advancements and the unique
              needs of Bangladesh's farmers — providing 100% safe, research-backed nutritional
              supplements that improve growth, health, and sustainability.
            </p>

            {/* Motive & Objective cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#0d5c2e] text-white rounded-2xl p-6">
                <div className="text-2xl mb-3">🎯</div>
                <h4 className="font-bold text-lg mb-2">Our Motive</h4>
                <p className="text-green-100 text-sm leading-relaxed">
                  To solve the challenge of rising feed costs by providing high-efficiency
                  additives that improve growth and health naturally.
                </p>
              </div>
              <div className="bg-[#1a3f8f] text-white rounded-2xl p-6">
                <div className="text-2xl mb-3">🚀</div>
                <h4 className="font-bold text-lg mb-2">Our Objective</h4>
                <p className="text-blue-100 text-sm leading-relaxed">
                  Promote sustainable farming, reduce harmful chemical use, and provide
                  technical consulting to maximize ROI for farms and feed mills.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right — Dr. Jasim profile */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {/* Profile card */}
            <div className="relative bg-gradient-to-br from-gray-50 to-green-50 rounded-3xl p-8 border border-gray-100 shadow-sm overflow-hidden">
              {/* Decorative accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#0d5c2e]/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#c41e1e]/5 rounded-full translate-y-1/2 -translate-x-1/2" />

              <div className="relative">
                {/* Avatar placeholder */}
                <div className="w-20 h-20 rounded-2xl bg-[#0d5c2e] flex items-center justify-center text-white text-3xl font-bold mb-5 shadow-lg">
                  J
                </div>
                <h3 className="text-xl font-bold text-gray-900">Dr. Mohammad Jasim Uddin</h3>
                <p className="text-[#0d5c2e] font-semibold text-sm mt-1 mb-1">Founder & Managing Director</p>
                <p className="text-gray-500 text-sm mb-6">PhD | Animal Nutrition Specialist</p>

                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  className="space-y-3"
                >
                  {credentials.map((c) => (
                    <motion.div
                      key={c.text}
                      variants={fadeUp}
                      className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-50"
                    >
                      <span className="text-[#0d5c2e]">{c.icon}</span>
                      <span className="text-sm text-gray-700 font-medium">{c.text}</span>
                    </motion.div>
                  ))}
                </motion.div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-gray-500 text-sm italic">
                    "Our goal is to make world-class animal nutrition accessible to every farmer in Bangladesh."
                  </p>
                  <p className="text-[#0d5c2e] text-xs font-semibold mt-2">— Dr. Mohammad Jasim Uddin</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
