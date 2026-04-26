import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { db } from '../lib/db'

export async function getDashboard(req: Request, res: Response): Promise<void> {
  try {
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    const [totalLeads, unreadLeads, leadsThisMonth, recentLeads] = await Promise.all([
      db.lead.count(),
      db.lead.count({ where: { isRead: false } }),
      db.lead.count({ where: { createdAt: { gte: startOfMonth } } }),
      db.lead.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
    ])

    res.json({ totalLeads, unreadLeads, leadsThisMonth, recentLeads })
  } catch {
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Dev-only: seed the first admin account
export async function seedAdmin(req: Request, res: Response): Promise<void> {
  if (process.env.NODE_ENV === 'production') {
    res.status(404).send()
    return
  }
  try {
    const hashed = await bcrypt.hash('admin123', 10)
    const admin = await db.admin.upsert({
      where: { email: 'admin@agrotech.com' },
      update: {},
      create: { email: 'admin@agrotech.com', password: hashed, name: 'Admin' },
    })
    res.json({ message: 'Admin seeded', email: admin.email, password: 'admin123' })
  } catch {
    res.status(500).json({ error: 'Internal server error' })
  }
}
