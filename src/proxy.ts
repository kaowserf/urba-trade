import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_PATHS = ['/', '/pricing', '/auth/login', '/auth/register', '/privacy', '/terms', '/contact', '/company']
const ADMIN_PATHS = ['/admin']

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Always allow static assets, API routes, and public pages
  const isStaticFile = /\.(?:jpg|jpeg|png|gif|webp|svg|ico|avif|mp4|woff2?|ttf|otf|css|js|map)$/i.test(pathname)

  if (
    isStaticFile ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/api/') ||
    PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + '/'))
  ) {
    return NextResponse.next()
  }

  // Verify JWT session token (edge-safe — no Prisma)
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })

  if (!token) {
    const loginUrl = new URL('/auth/login', req.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Admin paths require ADMIN role
  if (ADMIN_PATHS.some((p) => pathname.startsWith(p))) {
    if (token.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
