'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Products', href: '#products' },
  { label: 'Partners', href: '#partners' },
  { label: 'Why Us', href: '#whyus' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Top bar */}
      <div className="bg-[#0d5c2e] text-white text-sm py-2 px-4 hidden md:flex items-center justify-between">
        <span className="opacity-80">AHCAB Member Since 2020 · ISO-Certified Partners</span>
        <a href="tel:+8801752827682" className="flex items-center gap-1.5 hover:text-green-300 transition-colors">
          <Phone size={13} />
          +88 01752-827682
        </a>
      </div>

      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3">
            <img src="/logo.png" alt="Agrotech Global BD Nutrition" className="h-[64px] md:h-[76px] w-auto object-contain" />
            <div className="hidden lg:block">
              <div className="text-[#0d5c2e] font-bold text-base leading-tight">Agrotech Global BD</div>
              <div className="text-[#c41e1e] font-semibold text-sm">Nutrition</div>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#0d5c2e] transition-colors group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#0d5c2e] group-hover:w-4/5 transition-all duration-300 rounded-full" />
              </a>
            ))}
            <a
              href="#contact"
              className="ml-4 bg-[#0d5c2e] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#1a7a3f] transition-colors shadow-sm"
            >
              Get in Touch
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-[#0d5c2e]"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden bg-white border-t border-gray-100"
            >
              <div className="px-4 py-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="px-4 py-3 text-gray-700 hover:text-[#0d5c2e] hover:bg-green-50 rounded-xl font-medium transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="mt-2 bg-[#0d5c2e] text-white px-5 py-3 rounded-xl text-center font-semibold"
                >
                  Get in Touch
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}
