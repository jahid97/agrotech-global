import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/shared/Layout'
import { AdminAuthProvider } from './contexts/AdminAuth'
import { SiteContentProvider } from './contexts/SiteContent'

// Public pages — lazy loaded
const Home     = lazy(() => import('./pages/Home'))
const About    = lazy(() => import('./pages/About'))
const Products = lazy(() => import('./pages/Products'))
const Contact  = lazy(() => import('./pages/Contact'))

// Admin pages — lazy loaded (heaviest chunk, never needed by visitors)
const AdminLogin        = lazy(() => import('./pages/admin/AdminLogin'))
const AdminLayout       = lazy(() => import('./components/admin/AdminLayout'))
const AdminDashboard    = lazy(() => import('./pages/admin/AdminDashboard'))
const AdminLeads        = lazy(() => import('./pages/admin/AdminLeads'))
const AdminContent      = lazy(() => import('./pages/admin/AdminContent'))
const AdminProducts     = lazy(() => import('./pages/admin/AdminProducts'))
const AdminSettings     = lazy(() => import('./pages/admin/AdminSettings'))
const AdminAnalytics    = lazy(() => import('./pages/admin/AdminAnalytics'))
const AdminPartners     = lazy(() => import('./pages/admin/AdminPartners'))
const AdminMapLocations = lazy(() => import('./pages/admin/AdminMapLocations'))

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-8 h-8 rounded-full border-2 border-[#0d5c2e] border-t-transparent animate-spin" />
    </div>
  )
}

function App() {
  return (
    <AdminAuthProvider>
      <SiteContentProvider>
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* ── Admin ─────────────────────────────────────────── */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard"    element={<AdminDashboard />} />
                <Route path="leads"        element={<AdminLeads />} />
                <Route path="content"      element={<AdminContent />} />
                <Route path="products"     element={<AdminProducts />} />
                <Route path="settings"     element={<AdminSettings />} />
                <Route path="analytics"    element={<AdminAnalytics />} />
                <Route path="partners"     element={<AdminPartners />} />
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
          </Suspense>
        </BrowserRouter>
      </SiteContentProvider>
    </AdminAuthProvider>
  )
}

export default App
