import { Router } from 'express'
import { upload, uploadImage } from '../controllers/upload.controller'
import { requireAuth } from '../middleware/auth'

const router = Router()

router.post('/', requireAuth as any, upload.single('file'), uploadImage as any)

export default router
