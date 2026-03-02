import { NextRequest } from 'next/server'
import { ok, err } from '@/lib/api/response'
import { getSymbolProfile } from '@/lib/algorithms/stockUniverse'
import { generateNews } from '@/lib/algorithms/newsSimulator'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ symbol: string }> }
) {
  try {
    const { symbol } = await params
    const sym = symbol.toUpperCase()
    const profile = getSymbolProfile(sym)
    if (!profile) return err(`Symbol ${sym} not found`, 404)

    const news = generateNews(profile, 10)
    return ok(news)
  } catch (e) {
    console.error('[news]', e)
    return err('Failed to load news', 500)
  }
}
