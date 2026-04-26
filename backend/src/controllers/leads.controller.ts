import { Request, Response } from 'express'
import { db } from '../lib/db'

export async function createLead(req: Request, res: Response): Promise<void> {
  try {
    const { name, email, phone, message } = req.body
    if (!name || !email || !message) {
      res.status(400).json({ error: 'Name, email, and message are required' })
      return
    }
    const lead = await db.lead.create({
      data: { name, email, phone: phone || null, message },
    })
    res.status(201).json(lead)
  } catch {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function listLeads(req: Request, res: Response): Promise<void> {
  try {
    const leads = await db.lead.findMany({ orderBy: { createdAt: 'desc' } })
    res.json(leads)
  } catch {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function markRead(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params['id'] as string
    const lead = await db.lead.update({ where: { id }, data: { isRead: true } })
    res.json(lead)
  } catch {
    res.status(500).json({ error: 'Lead not found' })
  }
}

export async function deleteLead(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params['id'] as string
    await db.lead.delete({ where: { id } })
    res.status(204).send()
  } catch {
    res.status(500).json({ error: 'Lead not found' })
  }
}
