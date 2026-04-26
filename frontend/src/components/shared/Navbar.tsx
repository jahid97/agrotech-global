import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'

const navLinks = [
  { label: 'Home',     href: '/'         },
  { label: 'About',    href: '/about'    },
  { label: 'Products', href: '/products' },
  { label: 'Contact',  href: '/contact'  },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const location                = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => setOpen(false), [location])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_12px_rgba(0,0,0,0.07)]'
          : 'bg-white border-b border-gray-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-[68px] flex items-center relative">

        {/* ── Logo ── */}
        <Link to="/" className="flex-shrink-0">
          <img
            src="/logo.png"
            alt="Agrotech Global BD Nutrition"
            className="h-[52px] w-auto object-contain"
          />
        </Link>

        {/* ── Nav links — absolutely centered ── */}
        <nav className="hidden md:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2">
          {navLinks.map(({ label, href }) => {
            const active = location.pathname === href
            return (
              <Link
                key={href}
                to={href}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  active
                    ? 'text-[#0d5c2e]'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {label}
                {active && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#0d5c2e]" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* ── Right: phone + CTA ── */}
        <div className="hidden md:flex items-center gap-3 ml-auto flex-shrink-0">
          <a
            href="tel:+8801752827682"
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 font-medium transition-colors"
          >
            <Phone size={13} className="text-[#0d5c2e]" />
            +880 175 282 7682
          </a>
          <div className="h-5 w-px bg-gray-200" />
          <Link
            to="/contact"
            className="bg-[#0d5c2e] hover:bg-[#1a7a3f] text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors"
          >
            Get in touch
          </Link>
        </div>

        {/* ── Mobile burger ── */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-gray-600 ml-auto rounded-lg hover:bg-gray-100 transition-colors"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="md:hidden bg-white border-t border-gray-100 shadow-lg"
          >
            <div className="px-4 py-3 flex flex-col gap-0.5">
              {navLinks.map(({ label, href }) => {
                const active = location.pathname === href
                return (
                  <Link
                    key={href}
                    to={href}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                      active
                        ? 'bg-green-50 text-[#0d5c2e]'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {label}
                  </Link>
                )
              })}
              <div className="h-px bg-gray-100 my-1" />
              <a
                href="tel:+8801752827682"
                className="flex items-center gap-2 px-4 py-3 text-sm text-gray-500 font-medium"
              >
                <Phone size={14} className="text-[#0d5c2e]" />
                +880 175 282 7682
              </a>
              <Link
                to="/contact"
                className="mx-1 bg-[#0d5c2e] text-white text-sm font-semibold px-5 py-3 rounded-xl text-center"
              >
                Get in touch
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
