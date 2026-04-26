import { Router } from 'express'
import {
  listProducts, listAllProducts, createProduct,
  updateProduct, deleteProduct, reorderProducts, seedProducts,
} from '../controllers/products.controller'
import { requireAuth } from '../middleware/auth'

const router = Router()

router.get('/',         listProducts as any)                              // public
router.get('/all',      requireAuth as any, listAllProducts as any)       // admin
router.post('/seed',    requireAuth as any, seedProducts as any)          // admin
router.post('/reorder', requireAuth as any, reorderProducts as any)       // admin
router.post('/',        requireAuth as any, createProduct as any)         // admin
router.put('/:id',      requireAuth as any, updateProduct as any)         // admin
router.delete('/:id',   requireAuth as any, deleteProduct as any)         // admin

export default router
