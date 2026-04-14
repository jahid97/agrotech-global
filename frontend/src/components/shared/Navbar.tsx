import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => setOpen(false), [location])

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-sm' : 'bg-white'} border-b border-gray-100`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-[68px] flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
          <img src="/logo.png" alt="Agrotech" className="h-9 w-auto" />
          <span className="font-bold text-gray-900 text-base hidden sm:block">Agrotech</span>
        </Link>

        {/* Center nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          {navLinks.map(({ label, href }) => {
            const active = location.pathname === href
            return (
              <Link
                key={href}
                to={href}
                className={`px-4 py-2 text-sm transition-colors rounded-lg ${
                  active ? 'text-gray-900 font-semibold' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-2">
          <a href="tel:+8801752827682" className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium">
            Log in
          </a>
          <Link
            to="/contact"
            className="bg-[#0d5c2e] hover:bg-[#1a7a3f] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
          >
            Get in touch
          </Link>
        </div>

        {/* Mobile */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-gray-600">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-white border-t border-gray-100"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map(({ label, href }) => (
                <Link key={href} to={href} className="py-3 px-3 text-sm font-medium text-gray-700 hover:text-[#0d5c2e] rounded-lg hover:bg-gray-50">
                  {label}
                </Link>
              ))}
              <Link to="/contact" className="mt-2 bg-[#0d5c2e] text-white text-sm font-semibold px-5 py-3 rounded-xl text-center">
                Get in touch
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}