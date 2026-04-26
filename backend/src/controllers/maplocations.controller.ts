import type { Request, Response } from 'express'
import { db } from '../lib/db'
import type { AuthRequest } from '../middleware/auth'

/** GET /api/map-locations — public */
export async function listMapLocations(_req: Request, res: Response) {
  const locations = await db.mapLocation.findMany({
    where: { isVisible: true },
    orderBy: { position: 'asc' },
  })
  return res.json(locations)
}

/** GET /api/map-locations/all — admin */
export async function listAllMapLocations(_req: Request, res: Response) {
  const locations = await db.mapLocation.findMany({ orderBy: { position: 'asc' } })
  return res.json(locations)
}

/** POST /api/map-locations — admin */
export async function createMapLocation(req: AuthRequest, res: Response) {
  const { name, longitude, latitude, color, tooltip, isVisible } = req.body
  if (!name) return res.status(400).json({ error: 'name is required' })
  if (longitude === undefined || latitude === undefined)
    return res.status(400).json({ error: 'longitude and latitude are required' })

  const maxPos = await db.mapLocation.aggregate({ _max: { position: true } })
  const nextPos = (maxPos._max.position ?? -1) + 1

  const loc = await db.mapLocation.create({
    data: {
      name,
      longitude: parseFloat(longitude),
      latitude:  parseFloat(latitude),
      color:     color     || '#f59e0b',
      tooltip:   tooltip   || '',
      isVisible: isVisible ?? true,
      position:  nextPos,
    },
  })
  return res.status(201).json(loc)
}

/** PUT /api/map-locations/:id — admin */
export async function updateMapLocation(req: AuthRequest, res: Response) {
  const id = req.params.id as string
  const { name, longitude, latitude, color, tooltip, isVisible } = req.body

  const existing = await db.mapLocation.findUnique({ where: { id } })
  if (!existing) return res.status(404).json({ error: 'Location not found' })

  const loc = await db.mapLocation.update({
    where: { id },
    data: {
      ...(name      !== undefined && { name }),
      ...(longitude !== undefined && { longitude: parseFloat(longitude) }),
      ...(latitude  !== undefined && { latitude:  parseFloat(latitude)  }),
      ...(color     !== undefined && { color }),
      ...(tooltip   !== undefined && { tooltip }),
      ...(isVisible !== undefined && { isVisible }),
    },
  })
  return res.json(loc)
}

/** DELETE /api/map-locations/:id — admin */
export async function deleteMapLocation(req: AuthRequest, res: Response) {
  const id = req.params.id as string
  const existing = await db.mapLocation.findUnique({ where: { id } })
  if (!existing) return res.status(404).json({ error: 'Location not found' })
  await db.mapLocation.delete({ where: { id } })
  return res.status(204).send()
}

/** POST /api/map-locations/reorder — admin */
export async function reorderMapLocations(req: AuthRequest, res: Response) {
  const { order } = req.body as { order: string[] }
  if (!Array.isArray(order)) return res.status(400).json({ error: 'order must be a string[]' })
  await Promise.all(
    order.map((id, index) => db.mapLocation.update({ where: { id }, data: { position: index } }))
  )
  return res.json({ ok: true })
}

/** POST /api/map-locations/seed — admin */
export async function seedMapLocations(req: AuthRequest, res: Response) {
  const count = await db.mapLocation.count()
  if (count > 0) return res.status(409).json({ error: 'Locations already exist' })

  await db.mapLocation.createMany({
    data: [
      { name: 'India', longitude: 78.96, latitude: 20.59, color: '#f59e0b', tooltip: 'Tex Biosciences · Zenex Animal Health', position: 0 },
    ],
  })
  const locations = await db.mapLocation.findMany({ orderBy: { position: 'asc' } })
  return res.status(201).json(locations)
}
