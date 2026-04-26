import type { Request, Response } from 'express'
import { db } from '../lib/db'
import type { AuthRequest } from '../middleware/auth'

/** GET /api/products — public, returns visible products sorted by position */
export async function listProducts(_req: Request, res: Response) {
  const products = await db.product.findMany({
    where: { isVisible: true },
    orderBy: { position: 'asc' },
  })
  return res.json(products)
}

/** GET /api/products/all — admin, returns all including hidden */
export async function listAllProducts(_req: Request, res: Response) {
  const products = await db.product.findMany({ orderBy: { position: 'asc' } })
  return res.json(products)
}

/** POST /api/products — admin, create */
export async function createProduct(req: AuthRequest, res: Response) {
  const { title, tagline, desc, benefits, tag, theme, iconName, position, isVisible } = req.body
  if (!title || !desc) return res.status(400).json({ error: 'title and desc are required' })

  // Auto-assign position at end if not given
  const maxPos = await db.product.aggregate({ _max: { position: true } })
  const nextPos = (maxPos._max.position ?? -1) + 1

  const product = await db.product.create({
    data: {
      title,
      tagline: tagline ?? '',
      desc,
      benefits: JSON.stringify(Array.isArray(benefits) ? benefits : []),
      tag: tag ?? '',
      theme: theme ?? 'green',
      iconName: iconName ?? 'FlaskConical',
      position: position ?? nextPos,
      isVisible: isVisible ?? true,
    },
  })
  return res.status(201).json(product)
}

/** PUT /api/products/:id — admin, update */
export async function updateProduct(req: AuthRequest, res: Response) {
  const id = req.params.id as string
  const { title, tagline, desc, benefits, tag, theme, iconName, position, isVisible } = req.body

  const existing = await db.product.findUnique({ where: { id } })
  if (!existing) return res.status(404).json({ error: 'Product not found' })

  const product = await db.product.update({
    where: { id },
    data: {
      ...(title     !== undefined && { title }),
      ...(tagline   !== undefined && { tagline }),
      ...(desc      !== undefined && { desc }),
      ...(benefits  !== undefined && { benefits: JSON.stringify(Array.isArray(benefits) ? benefits : []) }),
      ...(tag       !== undefined && { tag }),
      ...(theme     !== undefined && { theme }),
      ...(iconName  !== undefined && { iconName }),
      ...(position  !== undefined && { position }),
      ...(isVisible !== undefined && { isVisible }),
    },
  })
  return res.json(product)
}

/** DELETE /api/products/:id — admin */
export async function deleteProduct(req: AuthRequest, res: Response) {
  const id = req.params.id as string
  const existing = await db.product.findUnique({ where: { id } })
  if (!existing) return res.status(404).json({ error: 'Product not found' })
  await db.product.delete({ where: { id } })
  return res.status(204).send()
}

/** POST /api/products/reorder — admin, body: { order: string[] } */
export async function reorderProducts(req: AuthRequest, res: Response) {
  const { order } = req.body as { order: string[] }
  if (!Array.isArray(order)) return res.status(400).json({ error: 'order must be a string[]' })

  await Promise.all(
    order.map((id, index) =>
      db.product.update({ where: { id }, data: { position: index } })
    )
  )
  return res.json({ ok: true })
}

/** POST /api/products/seed — admin, seeds with default products if DB is empty */
export async function seedProducts(req: AuthRequest, res: Response) {
  const count = await db.product.count()
  if (count > 0) return res.status(409).json({ error: 'Products already exist — clear them first' })

  const defaults = [
    {
      title: 'Feed Enzymes',
      tagline: 'Unlock more nutrition from every kilogram of feed',
      desc: 'Our enzyme complexes — including phytase, xylanase, and amylase — break down anti-nutritional factors in feed, dramatically improving digestibility and reducing feed costs.',
      benefits: ['Improved feed conversion ratio (FCR)', 'Reduced feed ingredient costs', 'Better nutrient absorption', 'Suitable for poultry and ruminants'],
      tag: 'Best Seller', theme: 'green', iconName: 'FlaskConical', position: 0,
    },
    {
      title: 'Probiotics & Prebiotics',
      tagline: 'Gut health is the foundation of farm productivity',
      desc: 'Multi-strain probiotic formulas containing Lactobacillus, Bacillus, and Saccharomyces deliver measurable improvements in gut health, immunity, and overall animal wellbeing.',
      benefits: ['Enhanced gut microbiota balance', 'Reduced mortality rates', 'Natural antibiotic alternative', 'Improved feed utilisation'],
      tag: 'Popular', theme: 'blue', iconName: 'Microscope', position: 1,
    },
    {
      title: 'Growth Promoters',
      tagline: 'Reach target weight faster — without antibiotics',
      desc: 'Science-backed, non-antibiotic growth enhancement solutions designed to improve weight gain, body condition, and production yields in poultry, cattle, and aquaculture.',
      benefits: ['Faster time to target weight', 'Improved body weight uniformity', 'No antibiotic residue risk', 'Compliant with international standards'],
      tag: 'Antibiotic-Free', theme: 'amber', iconName: 'TrendingUp', position: 2,
    },
    {
      title: 'Specialty Biotech Products',
      tagline: 'Cutting-edge fermentation science for superior results',
      desc: 'Fermentation-derived additives and specialty amino acid formulations developed by our partner Tex Biosciences — delivering innovation directly from global biotech labs to your farm.',
      benefits: ['Fermentation-based active ingredients', 'Amino acid optimisation', 'Developed with ISO-certified partners', 'Precision-targeted nutrition'],
      tag: 'Advanced', theme: 'purple', iconName: 'Dna', position: 3,
    },
    {
      title: 'Mineral & Vitamin Premixes',
      tagline: 'Complete micronutrition for balanced animal diets',
      desc: 'Scientifically formulated mineral and vitamin blends ensuring animals receive every essential micronutrient needed for optimal health, reproduction, and productivity.',
      benefits: ['Complete trace mineral coverage', 'Fat and water-soluble vitamins', 'Customisable for species & life stage', 'Improves reproductive performance'],
      tag: 'Essential', theme: 'lime', iconName: 'Leaf', position: 4,
    },
  ]

  await db.product.createMany({
    data: defaults.map(p => ({ ...p, benefits: JSON.stringify(p.benefits) })),
  })

  const products = await db.product.findMany({ orderBy: { position: 'asc' } })
  return res.status(201).json(products)
}
