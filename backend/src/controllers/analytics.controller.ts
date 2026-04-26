import type { Request, Response } from 'express'
import { db } from '../lib/db'

/* ── known bots to skip ──────────────────────────────────────── */
const BOT_PATTERN = /bot|crawl|spider|slurp|search|preview|fetch|curl|wget|python|java|libwww|httpclient/i

function isBot(ua?: string) {
  return !ua || BOT_PATTERN.test(ua)
}

function getIp(req: Request): string {
  const forwarded = req.headers['x-forwarded-for']
  if (typeof forwarded === 'string') return forwarded.split(',')[0].trim()
  return req.socket.remoteAddress ?? ''
}

/* ── POST /api/analytics/track ── public ─────────────────────── */
export async function track(req: Request, res: Response) {
  const ua = req.headers['user-agent'] ?? ''
  if (isBot(ua)) return res.status(204).send()

  const { path, referrer, sessionId } = req.body as {
    path?: string; referrer?: string; sessionId?: string
  }
  if (!path || typeof path !== 'string') return res.status(400).json({ error: 'path required' })

  // strip query strings & hashes, skip admin pages
  const cleanPath = path.split('?')[0].split('#')[0]
  if (cleanPath.startsWith('/admin')) return res.status(204).send()

  const ip = getIp(req)

  await db.pageView.create({
    data: {
      path: cleanPath,
      referrer: referrer || null,
      userAgent: ua,
      ip,
      sessionId: sessionId || null,
    },
  })

  return res.status(204).send()
}

/* ── GET /api/analytics/summary ── admin ─────────────────────── */
export async function summary(_req: Request, res: Response) {
  const now  = new Date()
  const sod  = new Date(now); sod.setHours(0, 0, 0, 0)           // start of today
  const w7   = new Date(sod.getTime() - 6  * 86400_000)           // 7 days ago
  const d30  = new Date(sod.getTime() - 29 * 86400_000)           // 30 days ago

  const [totalViews, viewsToday, views7d, views30d] = await Promise.all([
    db.pageView.count(),
    db.pageView.count({ where: { createdAt: { gte: sod } } }),
    db.pageView.count({ where: { createdAt: { gte: w7  } } }),
    db.pageView.count({ where: { createdAt: { gte: d30 } } }),
  ])

  // Unique sessions last 30d
  const sessionRows = await db.pageView.findMany({
    where: { createdAt: { gte: d30 }, sessionId: { not: null } },
    select: { sessionId: true },
    distinct: ['sessionId'],
  })
  const uniqueVisitors30d = sessionRows.length

  // Top 8 pages (30d)
  const topPagesRaw = await db.pageView.groupBy({
    by: ['path'],
    where: { createdAt: { gte: d30 } },
    _count: { path: true },
    orderBy: { _count: { path: 'desc' } },
    take: 8,
  })
  const topPages = topPagesRaw.map(r => ({ path: r.path, views: r._count.path }))

  // Top 8 referrers (30d) — skip blank/self
  const topRefsRaw = await db.pageView.groupBy({
    by: ['referrer'],
    where: {
      createdAt: { gte: d30 },
      referrer: { not: null },
    },
    _count: { referrer: true },
    orderBy: { _count: { referrer: 'desc' } },
    take: 8,
  })
  const topReferrers = topRefsRaw
    .filter(r => r.referrer && r.referrer.trim() !== '')
    .map(r => ({ referrer: r.referrer!, views: r._count.referrer }))

  // Daily views: last 30 days — fetch timestamps, group in JS
  const recent30 = await db.pageView.findMany({
    where: { createdAt: { gte: d30 } },
    select: { createdAt: true },
    orderBy: { createdAt: 'asc' },
  })

  const dailyMap: Record<string, number> = {}
  for (let i = 0; i < 30; i++) {
    const d = new Date(d30.getTime() + i * 86400_000)
    const key = d.toISOString().slice(0, 10)
    dailyMap[key] = 0
  }
  for (const { createdAt } of recent30) {
    const key = createdAt.toISOString().slice(0, 10)
    if (key in dailyMap) dailyMap[key]++
  }
  const dailyViews = Object.entries(dailyMap).map(([date, views]) => ({ date, views }))

  // Recent activity: last 20 page views
  const recentActivity = await db.pageView.findMany({
    orderBy: { createdAt: 'desc' },
    take: 20,
    select: { id: true, path: true, referrer: true, userAgent: true, createdAt: true },
  })

  return res.json({
    totalViews,
    viewsToday,
    views7d,
    views30d,
    uniqueVisitors30d,
    topPages,
    topReferrers,
    dailyViews,
    recentActivity,
  })
}

/* ── POST /api/analytics/purge ── admin ──────────────────────── */
export async function purge(_req: Request, res: Response) {
  // 1. Fetch every record before deleting
  const allRows = await db.pageView.findMany({
    orderBy: { createdAt: 'asc' },
  })

  const count = allRows.length

  // 2. Delete all records
  await db.pageView.deleteMany()

  // 3. Return the rows so the client can download them
  return res.json({ count, rows: allRows })
}
