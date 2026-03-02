import { NextRequest } from 'next/server'
import { ok } from '@/lib/api/response'
import { searchProfiles } from '@/lib/algorithms/stockUniverse'

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') ?? ''
  const limit = parseInt(req.nextUrl.searchParams.get('limit') ?? '10')
  const results = searchProfiles(q, Math.min(limit, 20))
  return ok(results.map((p) => ({ symbol: p.symbol, name: p.name, sector: p.sector })))
}
