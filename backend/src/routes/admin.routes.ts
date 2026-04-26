import { Router } from 'express'
import { getDashboard, seedAdmin } from '../controllers/admin.controller'
import { requireAuth } from '../middleware/auth'

const router = Router()

router.get('/dashboard', requireAuth as any, getDashboard as any)
router.post('/seed', seedAdmin as any)  // dev only — creates default admin account

export default router
