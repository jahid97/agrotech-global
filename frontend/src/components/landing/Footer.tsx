import { MapPin, Phone, Mail } from 'lucide-react'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Products', href: '#products' },
  { label: 'Partners', href: '#partners' },
  { label: 'Why Us', href: '#whyus' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-gray-800">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="Logo" className="h-12 w-auto brightness-0 invert opacity-80" />
            </div>
            <h3 className="text-white font-bold text-lg leading-tight mb-1">
              Agrotech Global BD Nutrition
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mt-3">
              Bridging global biotechnological advancements with Bangladesh's livestock industry.
              Importer, distributor & solution provider for animal nutrition.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <span className="text-xs bg-[#0d5c2e]/40 text-green-400 px-3 py-1 rounded-full border border-green-800">
                AHCAB Member
              </span>
              <span className="text-xs bg-[#1a3f8f]/40 text-blue-400 px-3 py-1 rounded-full border border-blue-800">
                Est. 2020
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-green-400 text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-5">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin size={15} className="text-green-500 flex-shrink-0 mt-0.5" />
                Holding-28, Road-16, Flat-B-1, Rupnagar, Mirpur, Dhaka-1216, Bangladesh
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Phone size={15} className="text-green-500 flex-shrink-0" />
                <a href="tel:+8801752827682" className="hover:text-green-400 transition-colors">
                  +88 01752-827682
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Mail size={15} className="text-green-500 flex-shrink-0" />
                <a href="mailto:drjasim1979@gmail.com" className="hover:text-green-400 transition-colors">
                  drjasim1979@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Agrotech Global BD Nutrition. All rights reserved.
          </p>
          <a
            href="/admin/login"
            className="text-gray-600 hover:text-gray-400 text-xs transition-colors"
          >
            Admin
          </a>
        </div>
      </div>
    </footer>
  )
}
