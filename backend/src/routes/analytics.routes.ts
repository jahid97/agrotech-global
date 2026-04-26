import { Router } from 'express'
import { track, summary, purge } from '../controllers/analytics.controller'
import { requireAuth } from '../middleware/auth'

const router = Router()

router.post('/track',   track as any)                                          // public — called by frontend
router.get('/summary',  requireAuth as any, summary as any)                    // admin only
router.post('/purge',   requireAuth as any, purge as any)                      // admin only

export default router
