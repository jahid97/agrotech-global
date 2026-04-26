import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/shared/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import Contact from './pages/Contact'
import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './components/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminLeads from './pages/admin/AdminLeads'
import AdminContent   from './pages/admin/AdminContent'
import AdminProducts  from './pages/admin/AdminProducts'
import AdminSettings  from './pages/admin/AdminSettings'
import AdminAnalytics from './pages/admin/AdminAnalytics'
import AdminPartners  from './pages/admin/AdminPartners'
import AdminMapLocations from './pages/admin/AdminMapLocations'
import { AdminAuthProvider } from './contexts/AdminAuth'
import { SiteContentProvider } from './contexts/SiteContent'

function App() {
  return (
    <AdminAuthProvider>
      <SiteContentProvider>
        <BrowserRouter>
          <Routes>
            {/* ── Admin (no site navbar/footer) ─────────────────── */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="leads"     element={<AdminLeads />} />
              <Route path="content"   element={<AdminContent />} />
              <Route path="products"   element={<AdminProducts />} />
              <Route path="settings"   element={<AdminSettings />} />
              <Route path="analytics"  element={<AdminAnalytics />} />
              <Route path="partners"   element={<AdminPartners />} />
              <Route path="map-locations" element={<AdminMapLocations />} />
            </Route>

            {/* ── Public site ───────────────────────────────────── */}
            <Route element={<Layout />}>
              <Route path="/"         element={<Home />} />
              <Route path="/about"    element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/contact"  element={<Contact />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SiteContentProvider>
    </AdminAuthProvider>
  )
}

export default App
