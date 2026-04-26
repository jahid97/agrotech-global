import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { db } from '../lib/db'
import { AuthRequest } from '../middleware/auth'

export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      res.status(400).json({ error: 'Email and password required' })
      return
    }
    const admin = await db.admin.findUnique({ where: { email } })
    if (!admin) {
      res.status(401).json({ error: 'Invalid credentials' })
      return
    }
    const valid = await bcrypt.compare(password, admin.password)
    if (!valid) {
      res.status(401).json({ error: 'Invalid credentials' })
      return
    }
    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    )
    res.json({ token, admin: { id: admin.id, name: admin.name, email: admin.email } })
  } catch {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function changePassword(req: AuthRequest, res: Response): Promise<void> {
  try {
    const { currentPassword, newPassword } = req.body
    if (!currentPassword || !newPassword) {
      res.status(400).json({ error: 'currentPassword and newPassword are required' }); return
    }
    if (newPassword.length < 8) {
      res.status(400).json({ error: 'New password must be at least 8 characters' }); return
    }
    const admin = await db.admin.findUnique({ where: { id: req.adminId } })
    if (!admin) { res.status(404).json({ error: 'Admin not found' }); return }

    const valid = await bcrypt.compare(currentPassword, admin.password)
    if (!valid) { res.status(401).json({ error: 'Current password is incorrect' }); return }

    const hashed = await bcrypt.hash(newPassword, 10)
    await db.admin.update({ where: { id: req.adminId }, data: { password: hashed } })
    res.json({ ok: true })
  } catch {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function me(req: AuthRequest, res: Response): Promise<void> {
  try {
    const admin = await db.admin.findUnique({
      where: { id: req.adminId },
      select: { id: true, name: true, email: true },
    })
    if (!admin) { res.status(404).json({ error: 'Not found' }); return }
    res.json(admin)
  } catch {
    res.status(500).json({ error: 'Internal server error' })
  }
}
