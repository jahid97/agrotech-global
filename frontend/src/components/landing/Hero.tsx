import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown, FlaskConical, Leaf, ShieldCheck } from 'lucide-react'
import { fadeUp, staggerContainer, fadeIn } from '../../lib/animations'

const badges = [
  { icon: <FlaskConical size={14} />, label: 'Research-Backed' },
  { icon: <Leaf size={14} />, label: 'Sustainable' },
  { icon: <ShieldCheck size={14} />, label: '100% Safe' },
]

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#f0faf4] via-white to-[#eef2ff] pt-20 pb-10"
    >
      {/* Animated background orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 -left-32 w-96 h-96 bg-[#0d5c2e] rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-20 -right-32 w-96 h-96 bg-[#1a3f8f] rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c41e1e] rounded-full blur-3xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-10">
        {/* Badges */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          {badges.map((b) => (
            <motion.span
              key={b.label}
              variants={fadeUp}
              className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm border border-green-200 text-[#0d5c2e] text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm"
            >
              {b.icon} {b.label}
            </motion.span>
          ))}
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight mb-6"
        >
          Nourishing Bangladesh's{' '}
          <span className="relative inline-block">
            <span className="text-[#0d5c2e]">Livestock</span>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.6, ease: 'easeOut' }}
              className="absolute -bottom-1 left-0 right-0 h-1 bg-[#0d5c2e]/30 rounded-full origin-left"
            />
          </span>{' '}
          with{' '}
          <span className="text-[#c41e1e]">Global Science</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          Agrotech Global BD Nutrition bridges the gap between global biotechnological
          advancements and Bangladesh's livestock industry — delivering premium feed
          enzymes, probiotics, and nutrition supplements for sustainable farming.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <a
            href="#products"
            className="group flex items-center justify-center gap-2 bg-[#0d5c2e] text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-[#1a7a3f] transition-all shadow-lg hover:shadow-green-200 hover:shadow-xl"
          >
            Explore Products
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#contact"
            className="flex items-center justify-center gap-2 border-2 border-[#0d5c2e] text-[#0d5c2e] px-8 py-4 rounded-full text-base font-semibold hover:bg-[#0d5c2e] hover:text-white transition-all"
          >
            Contact Us
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {[
            { value: '2020', label: 'Established' },
            { value: '5+', label: 'Product Categories' },
            { value: '2', label: 'Global Partners' },
            { value: 'AHCAB', label: 'Member Since 2020' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              custom={i}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-white shadow-sm"
            >
              <div className="text-2xl font-bold text-[#0d5c2e]">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="text-gray-400"
        >
          <ChevronDown size={28} />
        </motion.div>
      </motion.div>
    </section>
  )
}
