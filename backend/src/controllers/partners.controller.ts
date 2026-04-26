import type { Request, Response } from 'express'
import { db } from '../lib/db'
import type { AuthRequest } from '../middleware/auth'

/** GET /api/partners — public */
export async function listPartners(_req: Request, res: Response) {
  const partners = await db.partner.findMany({
    where: { isVisible: true },
    orderBy: { position: 'asc' },
  })
  return res.json(partners)
}

/** GET /api/partners/all — admin */
export async function listAllPartners(_req: Request, res: Response) {
  const partners = await db.partner.findMany({ orderBy: { position: 'asc' } })
  return res.json(partners)
}

/** POST /api/partners — admin */
export async function createPartner(req: AuthRequest, res: Response) {
  const { name, website, logoUrl, initial, bgColor, isVisible } = req.body
  if (!name) return res.status(400).json({ error: 'name is required' })

  const maxPos = await db.partner.aggregate({ _max: { position: true } })
  const nextPos = (maxPos._max.position ?? -1) + 1

  const partner = await db.partner.create({
    data: {
      name,
      website: website || null,
      logoUrl: logoUrl || null,
      initial: (initial || name.slice(0, 2)).toUpperCase(),
      bgColor: bgColor || '#0d5c2e',
      position: nextPos,
      isVisible: isVisible ?? true,
    },
  })
  return res.status(201).json(partner)
}

/** PUT /api/partners/:id — admin */
export async function updatePartner(req: AuthRequest, res: Response) {
  const id = req.params.id as string
  const { name, website, logoUrl, initial, bgColor, position, isVisible } = req.body

  const existing = await db.partner.findUnique({ where: { id } })
  if (!existing) return res.status(404).json({ error: 'Partner not found' })

  const partner = await db.partner.update({
    where: { id },
    data: {
      ...(name      !== undefined && { name }),
      ...(website   !== undefined && { website: website || null }),
      ...(logoUrl   !== undefined && { logoUrl: logoUrl || null }),
      ...(initial   !== undefined && { initial: initial.toUpperCase() }),
      ...(bgColor   !== undefined && { bgColor }),
      ...(position  !== undefined && { position }),
      ...(isVisible !== undefined && { isVisible }),
    },
  })
  return res.json(partner)
}

/** DELETE /api/partners/:id — admin */
export async function deletePartner(req: AuthRequest, res: Response) {
  const id = req.params.id as string
  const existing = await db.partner.findUnique({ where: { id } })
  if (!existing) return res.status(404).json({ error: 'Partner not found' })
  await db.partner.delete({ where: { id } })
  return res.status(204).send()
}

/** POST /api/partners/reorder — admin */
export async function reorderPartners(req: AuthRequest, res: Response) {
  const { order } = req.body as { order: string[] }
  if (!Array.isArray(order)) return res.status(400).json({ error: 'order must be a string[]' })
  await Promise.all(
    order.map((id, index) => db.partner.update({ where: { id }, data: { position: index } }))
  )
  return res.json({ ok: true })
}

/** POST /api/partners/seed — admin, loads defaults if empty */
export async function seedPartners(req: AuthRequest, res: Response) {
  const count = await db.partner.count()
  if (count > 0) return res.status(409).json({ error: 'Partners already exist' })

  await db.partner.createMany({
    data: [
      { name: 'Tex Biosciences',    initial: 'TB', bgColor: '#1d4ed8', website: '', position: 0 },
      { name: 'Zenex Animal Health', initial: 'ZA', bgColor: '#0d5c2e', website: '', position: 1 },
    ],
  })
  const partners = await db.partner.findMany({ orderBy: { position: 'asc' } })
  return res.status(201).json(partners)
}
