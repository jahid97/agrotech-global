import { Router } from 'express'
import { getContent, updateContent } from '../controllers/content.controller'
import { requireAuth } from '../middleware/auth'

const router = Router()

router.get('/', getContent as any)                              // public
router.put('/', requireAuth as any, updateContent as any)      // admin only

export default router
