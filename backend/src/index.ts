import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import authRoutes from './routes/auth.routes'
import leadsRoutes from './routes/leads.routes'
import adminRoutes from './routes/admin.routes'
import contentRoutes from './routes/content.routes'
import uploadRoutes from './routes/upload.routes'
import productsRoutes   from './routes/products.routes'
import analyticsRoutes  from './routes/analytics.routes'
import partnersRoutes      from './routes/partners.routes'
import mapLocationsRoutes  from './routes/maplocations.routes'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim())
  : ['http://localhost:3000', 'http://localhost:5173']

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}))
app.use(express.json())

// Serve uploaded images
const uploadDir = process.env.UPLOAD_DIR
  ? path.resolve(process.env.UPLOAD_DIR)
  : path.join(__dirname, '../uploads')
app.use('/uploads', express.static(uploadDir))

app.use('/api/auth',    authRoutes)
app.use('/api/leads',   leadsRoutes)
app.use('/api/admin',   adminRoutes)
app.use('/api/content',  contentRoutes)
app.use('/api/upload',   uploadRoutes)
app.use('/api/products',   productsRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/partners',      partnersRoutes)
app.use('/api/map-locations', mapLocationsRoutes)

app.get('/api', (_req, res) => {
  res.json({ message: 'AgroTech API is running', version: '1.0.0' })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
