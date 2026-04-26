import { Router } from 'express'
import { login, me, changePassword } from '../controllers/auth.controller'
import { requireAuth } from '../middleware/auth'

const router = Router()

router.post('/login',    login as any)
router.get('/me',        requireAuth as any, me as any)
router.patch('/password', requireAuth as any, changePassword as any)

export default router
