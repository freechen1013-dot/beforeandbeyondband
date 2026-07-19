import createMiddleware from 'next-intl/middleware'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { routing } from '@/i18n/routing'

const intlMiddleware = createMiddleware(routing)

const staticFileExtensions = /\.(png|jpg|jpeg|JPG|JPEG|PNG|svg|webp|mp4|webm|ogg|ico|mov|MOV)$/
const skipPaths = /^\/(_next|studio|api|favicon\.ico)/

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (skipPaths.test(pathname) || staticFileExtensions.test(pathname)) {
    return NextResponse.next()
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ['/((?!_next|studio|api|favicon.ico|.*\\..*).*)'],
}
