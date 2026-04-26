import type { Request, Response } from 'express'
import path from 'path'
import fs from 'fs'
import multer from 'multer'

const uploadDir = process.env.UPLOAD_DIR
  ? path.resolve(process.env.UPLOAD_DIR)
  : path.join(__dirname, '../../uploads')

// Ensure the directory exists
fs.mkdirSync(uploadDir, { recursive: true })

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase()
    const name = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`
    cb(null, name)
  },
})

export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true)
    else cb(new Error('Only image files are allowed'))
  },
})

export async function uploadImage(req: Request, res: Response) {
  const file = req.file as Express.Multer.File | undefined
  if (!file) return res.status(400).json({ error: 'No file uploaded' })
  return res.json({ url: `/uploads/${file.filename}` })
}
