import type { Request, Response } from 'express'
import { db } from '../lib/db'

/** GET /api/content — public, returns all key→value pairs */
export async function getContent(_req: Request, res: Response) {
  const rows = await db.siteContent.findMany()
  const map: Record<string, string> = {}
  rows.forEach(r => { map[r.key] = r.value })
  return res.json(map)
}

/** PUT /api/admin/content — admin only, upserts key/value pairs */
export async function updateContent(req: Request, res: Response) {
  const updates: { key: string; value: string }[] = req.body.updates
  if (!Array.isArray(updates)) {
    return res.status(400).json({ error: 'updates must be an array of {key, value}' })
  }

  for (const { key, value } of updates) {
    if (typeof key !== 'string' || typeof value !== 'string') continue
    await db.siteContent.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    })
  }

  return res.json({ ok: true })
}
