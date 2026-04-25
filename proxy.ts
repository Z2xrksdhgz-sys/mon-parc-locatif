import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const session = request.cookies.get('mpl-session')
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/dashboard') && !session) {
    const url = new URL('/connexion', request.url)
    url.searchParams.set('from', pathname)
    return NextResponse.redirect(url)
  }

  if (pathname === '/inscription/plan' && !session) {
    return NextResponse.redirect(new URL('/inscription', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/inscription/plan'],
}
