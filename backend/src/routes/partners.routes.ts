import { Router } from 'express'
import {
  listPartners, listAllPartners, createPartner,
  updatePartner, deletePartner, reorderPartners, seedPartners,
} from '../controllers/partners.controller'
import { requireAuth } from '../middleware/auth'

const router = Router()

router.get('/',         listPartners as any)
router.get('/all',      requireAuth as any, listAllPartners as any)
router.post('/seed',    requireAuth as any, seedPartners as any)
router.post('/reorder', requireAuth as any, reorderPartners as any)
router.post('/',        requireAuth as any, createPartner as any)
router.put('/:id',      requireAuth as any, updatePartner as any)
router.delete('/:id',   requireAuth as any, deletePartner as any)

export default router
