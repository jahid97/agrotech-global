import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-gray-800">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <img src="/logo.png" alt="Logo" className="h-12 w-auto brightness-0 invert opacity-70" />
              <div>
                <div className="text-white font-bold text-sm leading-tight">Agrotech Global BD</div>
                <div className="text-green-500 text-xs font-semibold">Nutrition</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-500 max-w-xs">
              Importer, distributor, and solution provider for animal nutrition and feed supplements in Bangladesh. Backed by global science, trusted by local farms.
            </p>
            <div className="flex gap-2 mt-5">
              <span className="text-xs bg-green-900/40 text-green-400 border border-green-800 px-3 py-1 rounded-full">AHCAB Member</span>
              <span className="text-xs bg-blue-900/40 text-blue-400 border border-blue-800 px-3 py-1 rounded-full">Est. 2020</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', to: '/' },
                { label: 'About Us', to: '/about' },
                { label: 'Products', to: '/products' },
                { label: 'Contact', to: '/contact' },
              ].map(({ label, to }) => (
                <li key={to}>
                  <Link to={to} className="text-sm hover:text-green-400 transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <MapPin size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                Holding-28, Road-16, Flat-B-1, Rupnagar, Mirpur, Dhaka-1216
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone size={14} className="text-green-500 flex-shrink-0" />
                <a href="tel:+8801752827682" className="hover:text-green-400 transition-colors">+88 01752-827682</a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail size={14} className="text-green-500 flex-shrink-0" />
                <a href="mailto:drjasim1979@gmail.com" className="hover:text-green-400 transition-colors">drjasim1979@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-gray-600">© {new Date().getFullYear()} Agrotech Global BD Nutrition. All rights reserved.</p>
          <a href="/admin/login" className="text-xs text-gray-700 hover:text-gray-500 transition-colors">Admin</a>
        </div>
      </div>
    </footer>
  )
}
