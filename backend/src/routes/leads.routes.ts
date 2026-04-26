import { Router } from 'express'
import { createLead, listLeads, markRead, deleteLead } from '../controllers/leads.controller'
import { requireAuth } from '../middleware/auth'

const router = Router()

router.post('/', createLead as any)                              // public — contact form
router.get('/', requireAuth as any, listLeads as any)           // admin only
router.patch('/:id/read', requireAuth as any, markRead as any)  // admin only
router.delete('/:id', requireAuth as any, deleteLead as any)    // admin only

export default router
