import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { staggerContainer, fadeUp } from '../../lib/animations'
import { FlaskConical, Leaf, Users, TrendingUp, ShieldCheck, Microscope } from 'lucide-react'

const reasons = [
  {
    icon: <FlaskConical size={24} />,
    color: 'bg-emerald-100 text-emerald-700',
    title: 'Research-Backed Products',
    description: 'Every product we supply is scientifically validated — imported from ISO-certified global partners with proven field results.',
  },
  {
    icon: <Leaf size={24} />,
    color: 'bg-lime-100 text-lime-700',
    title: 'Sustainable Farming',
    description: 'We promote a shift away from harmful chemicals, supporting farms to grow naturally with safer, eco-friendly alternatives.',
  },
  {
    icon: <Users size={24} />,
    color: 'bg-blue-100 text-blue-700',
    title: 'Expert Technical Support',
    description: 'Get direct consulting from Dr. Jasim Uddin, a PhD-qualified animal nutrition professor with real-world industry expertise.',
  },
  {
    icon: <TrendingUp size={24} />,
    color: 'bg-orange-100 text-orange-700',
    title: 'Maximise Your ROI',
    description: 'Our tailored nutrition programs are designed to maximise your return on investment — improving yields while cutting unnecessary costs.',
  },
  {
    icon: <ShieldCheck size={24} />,
    color: 'bg-red-100 text-red-700',
    title: '100% Safe & Certified',
    description: 'All products pass rigorous quality checks. We only supply what we trust — certified, safe, and compliant with international standards.',
  },
  {
    icon: <Microscope size={24} />,
    color: 'bg-purple-100 text-purple-700',
    title: 'Cutting-Edge Biotech',
    description: 'Access the latest in fermentation science, enzyme technology, and probiotic innovations — from global biotech leaders to your farm.',
  },
]

export default function WhyUs() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="whyus" ref={ref} className="py-24 bg-gradient-to-br from-[#f0faf4] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <span className="inline-block bg-white text-[#0d5c2e] text-sm font-semibold px-4 py-1.5 rounded-full border border-green-200 mb-4 shadow-sm">
            Why Choose Us
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            The Agrotech Advantage
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            We combine academic expertise, global partnerships, and on-ground experience
            to deliver solutions that genuinely work for Bangladesh's livestock farmers.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {reasons.map((reason) => (
            <motion.div
              key={reason.title}
              variants={fadeUp}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl p-7 border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className={`inline-flex p-3 rounded-xl ${reason.color} mb-5`}>
                {reason.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">{reason.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{reason.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
