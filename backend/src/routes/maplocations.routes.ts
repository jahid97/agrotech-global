import { Router } from 'express'
import {
  listMapLocations, listAllMapLocations, createMapLocation,
  updateMapLocation, deleteMapLocation, reorderMapLocations, seedMapLocations,
} from '../controllers/maplocations.controller'
import { requireAuth } from '../middleware/auth'

const router = Router()

router.get('/',         listMapLocations as any)
router.get('/all',      requireAuth as any, listAllMapLocations as any)
router.post('/seed',    requireAuth as any, seedMapLocations as any)
router.post('/reorder', requireAuth as any, reorderMapLocations as any)
router.post('/',        requireAuth as any, createMapLocation as any)
router.put('/:id',      requireAuth as any, updateMapLocation as any)
router.delete('/:id',   requireAuth as any, deleteMapLocation as any)

export default router
